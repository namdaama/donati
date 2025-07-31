import { CacheManager, type CacheConfig } from './cache-manager';
import { FileCache, type FileCacheConfig } from './file-cache';
import { Result } from '../errors/result';
import { CacheError } from '../errors/custom-errors';
import { logger } from '../logger';

/**
 * 🔥 マルチティアキャッシュ - L1（メモリ）とL2（ファイル）の完璧な融合
 */

export interface MultiTierCacheConfig {
  l1Config: CacheConfig;
  l2Config: FileCacheConfig;
  promotionThreshold?: number; // L2からL1への昇格閾値
}

export class MultiTierCache<T> {
  private readonly l1Cache: CacheManager<T>;
  private readonly l2Cache: FileCache;
  private readonly config: MultiTierCacheConfig;
  private readonly cacheLogger;

  constructor(name: string, config: MultiTierCacheConfig) {
    this.config = {
      promotionThreshold: 3, // デフォルトは3回アクセスでL1に昇格
      ...config,
    };
    
    this.l1Cache = new CacheManager<T>(`${name}:L1`, config.l1Config);
    this.l2Cache = new FileCache(config.l2Config);
    this.cacheLogger = logger.child(`MultiTierCache:${name}`);
  }

  /**
   * キャッシュから取得（両層をチェック）
   */
  async get(key: string): Promise<Result<T | null, CacheError>> {
    // L1キャッシュをチェック
    const l1Result = await this.l1Cache.get(key);
    if (Result.isFailure(l1Result)) {
      return l1Result;
    }
    
    if (l1Result.data !== null) {
      this.cacheLogger.debug('L1キャッシュヒット', { key });
      return l1Result;
    }
    
    // L2キャッシュをチェック
    const l2Result = await this.l2Cache.get<T>(key);
    if (Result.isFailure(l2Result)) {
      return l2Result;
    }
    
    if (l2Result.data !== null) {
      this.cacheLogger.debug('L2キャッシュヒット', { key });
      
      // L1に昇格（ホットデータの最適化）
      await this.l1Cache.set(key, l2Result.data);
      
      return l2Result;
    }
    
    this.cacheLogger.debug('完全キャッシュミス', { key });
    return Result.success(null);
  }

  /**
   * キャッシュに保存（両層に保存）
   */
  async set(key: string, value: T, options?: { etag?: string; l1Only?: boolean }): Promise<Result<void, CacheError>> {
    const results: Result<void, CacheError>[] = [];
    
    // L1に保存
    const l1Result = await this.l1Cache.set(key, value, options?.etag);
    results.push(l1Result);
    
    // L2にも保存（l1Onlyでない限り）
    if (!options?.l1Only) {
      const l2Result = await this.l2Cache.set(key, value, options?.etag);
      results.push(l2Result);
    }
    
    // いずれかが失敗した場合はエラーを返す
    const failure = results.find(Result.isFailure);
    if (failure) {
      return failure;
    }
    
    this.cacheLogger.info('マルチティアキャッシュに保存', {
      key,
      l1Only: options?.l1Only || false,
    });
    
    return Result.success(undefined);
  }

  /**
   * キャッシュから削除（両層から削除）
   */
  async delete(key: string): Promise<Result<boolean, CacheError>> {
    const results: boolean[] = [];
    
    // L1から削除
    const l1Result = await this.l1Cache.delete(key);
    if (Result.isFailure(l1Result)) {
      return l1Result;
    }
    results.push(l1Result.data);
    
    // L2から削除
    const l2Result = await this.l2Cache.delete(key);
    if (Result.isFailure(l2Result)) {
      return l2Result;
    }
    results.push(l2Result.data);
    
    const deleted = results.some(r => r);
    
    this.cacheLogger.info('マルチティアキャッシュから削除', {
      key,
      deleted,
    });
    
    return Result.success(deleted);
  }

  /**
   * パターンマッチで削除
   */
  async deletePattern(pattern: string): Promise<Result<number, CacheError>> {
    // L1のパターン削除
    const l1Result = await this.l1Cache.deletePattern(pattern);
    if (Result.isFailure(l1Result)) {
      return l1Result;
    }
    
    // L2は個別にファイルを確認する必要があるため、
    // 現時点ではパターン削除は実装しない
    
    this.cacheLogger.info('パターンマッチでキャッシュ削除', {
      pattern,
      l1Deleted: l1Result.data,
    });
    
    return Result.success(l1Result.data);
  }

  /**
   * キャッシュのウォームアップ
   */
  async warmup(keys: string[]): Promise<void> {
    const promises = keys.map(async (key) => {
      const result = await this.get(key);
      if (Result.isSuccess(result) && result.data !== null) {
        this.cacheLogger.debug('ウォームアップ成功', { key });
      }
    });
    
    await Promise.all(promises);
    
    this.cacheLogger.info('キャッシュウォームアップ完了', {
      keyCount: keys.length,
    });
  }

  /**
   * 統計情報の取得
   */
  async getStats(): Promise<{
    l1Stats: ReturnType<CacheManager<T>['getStats']>;
    l1HitRate: number;
    l2Stats: any;
  }> {
    const l1Stats = this.l1Cache.getStats();
    const l1HitRate = this.l1Cache.getHitRate();
    
    const l2StatsResult = await this.l2Cache.getStats();
    const l2Stats = Result.isSuccess(l2StatsResult) && l2StatsResult.data ? l2StatsResult.data : null;
    
    return {
      l1Stats,
      l1HitRate,
      l2Stats,
    };
  }

  /**
   * L2キャッシュのクリーンアップ
   */
  async cleanupL2(): Promise<Result<number, CacheError>> {
    return this.l2Cache.cleanup();
  }

  /**
   * 全キャッシュのクリア
   */
  clearAll(): void {
    this.l1Cache.clear();
    // L2は手動でクリーンアップが必要
    this.cacheLogger.warn('全キャッシュをクリア（L2は手動クリーンアップが必要）');
  }
}

/**
 * Instagram投稿用のマルチティアキャッシュ
 */
export function createInstagramPostCache(baseDir: string = '.cache/instagram'): MultiTierCache<any> {
  return new MultiTierCache('InstagramPosts', {
    l1Config: {
      maxSize: 50,
      ttl: 5 * 60 * 1000, // 5分
      staleWhileRevalidate: 60 * 1000, // 1分
    },
    l2Config: {
      baseDir,
      ttl: 60 * 60 * 1000, // 1時間
      maxFileSize: 5 * 1024 * 1024, // 5MB
    },
    promotionThreshold: 2,
  });
}