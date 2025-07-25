import { LRUCache } from 'lru-cache';
import { CacheError } from '../errors/custom-errors';
import { Result } from '../errors/result';
import { logger } from '../logger';
import type { InstagramPost } from '../../types/instagram';
import { z } from 'zod';

/**
 * 🔥 キャッシュマネージャー - 愛を込めたデータ保存
 */

export interface CacheConfig {
  maxSize: number;        // 最大アイテム数
  ttl: number;           // TTL（ミリ秒）
  staleWhileRevalidate?: number; // 再検証中の古いデータ使用時間
  updateAgeOnGet?: boolean;      // 取得時に有効期限を更新
}

export interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  size: number;
  maxSize: number;
}

export interface CacheEntry<T> {
  data: T;
  metadata: {
    createdAt: number;
    updatedAt: number;
    accessCount: number;
    etag?: string;
  };
}

export class CacheManager<T> {
  private cache: LRUCache<string, CacheEntry<T>>;
  private stats: CacheStats;
  private readonly name: string;
  private readonly cacheLogger;

  constructor(name: string, config: CacheConfig) {
    this.name = name;
    this.cacheLogger = logger.child(`Cache:${name}`);
    
    this.cache = new LRUCache({
      max: config.maxSize,
      ttl: config.ttl,
      updateAgeOnGet: config.updateAgeOnGet ?? false,
      // stale: config.staleWhileRevalidate, // LRU v11では未サポート
      
      // カスタムサイズ計算（JSONサイズベース）
      sizeCalculation: (value) => {
        return JSON.stringify(value).length;
      },
      
      // 削除時のコールバック
      dispose: (value, key) => {
        this.cacheLogger.debug('キャッシュエントリを削除', {
          key,
          accessCount: value.metadata.accessCount,
        });
      },
    });
    
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      size: 0,
      maxSize: config.maxSize,
    };
  }

  /**
   * キャッシュから取得
   */
  async get(key: string): Promise<Result<T | null, CacheError>> {
    try {
      const entry = this.cache.get(key);
      
      if (!entry) {
        this.stats.misses++;
        this.cacheLogger.debug('キャッシュミス', { key });
        return Result.success(null);
      }
      
      this.stats.hits++;
      entry.metadata.accessCount++;
      
      this.cacheLogger.debug('キャッシュヒット', {
        key,
        age: Date.now() - entry.metadata.createdAt,
        accessCount: entry.metadata.accessCount,
      });
      
      return Result.success(entry.data);
    } catch (error) {
      return Result.failure(
        new CacheError(
          'キャッシュ取得エラー',
          'read',
          key,
          error
        )
      );
    }
  }

  /**
   * キャッシュに保存
   */
  async set(key: string, value: T, etag?: string): Promise<Result<void, CacheError>> {
    try {
      const now = Date.now();
      const entry: CacheEntry<T> = {
        data: value,
        metadata: {
          createdAt: now,
          updatedAt: now,
          accessCount: 0,
          etag,
        },
      };
      
      this.cache.set(key, entry);
      this.stats.sets++;
      this.stats.size = this.cache.size;
      
      this.cacheLogger.info('キャッシュに保存', {
        key,
        etag,
        size: this.cache.size,
      });
      
      return Result.success(undefined);
    } catch (error) {
      return Result.failure(
        new CacheError(
          'キャッシュ保存エラー',
          'write',
          key,
          error
        )
      );
    }
  }

  /**
   * キャッシュから削除
   */
  async delete(key: string): Promise<Result<boolean, CacheError>> {
    try {
      const deleted = this.cache.delete(key);
      
      if (deleted) {
        this.stats.deletes++;
        this.stats.size = this.cache.size;
        this.cacheLogger.info('キャッシュから削除', { key });
      }
      
      return Result.success(deleted);
    } catch (error) {
      return Result.failure(
        new CacheError(
          'キャッシュ削除エラー',
          'delete',
          key,
          error
        )
      );
    }
  }

  /**
   * パターンに一致するキーを削除
   */
  async deletePattern(pattern: string): Promise<Result<number, CacheError>> {
    try {
      let deletedCount = 0;
      const regex = new RegExp(pattern);
      
      for (const key of this.cache.keys()) {
        if (regex.test(key)) {
          this.cache.delete(key);
          deletedCount++;
        }
      }
      
      this.stats.deletes += deletedCount;
      this.stats.size = this.cache.size;
      
      this.cacheLogger.info('パターンマッチでキャッシュ削除', {
        pattern,
        deletedCount,
      });
      
      return Result.success(deletedCount);
    } catch (error) {
      return Result.failure(
        new CacheError(
          'パターン削除エラー',
          'delete',
          pattern,
          error
        )
      );
    }
  }

  /**
   * キャッシュをクリア
   */
  clear(): void {
    const previousSize = this.cache.size;
    this.cache.clear();
    this.stats.size = 0;
    
    this.cacheLogger.warn('キャッシュを完全クリア', {
      previousSize,
    });
  }

  /**
   * 統計情報を取得
   */
  getStats(): CacheStats {
    return {
      ...this.stats,
      size: this.cache.size,
    };
  }

  /**
   * ヒット率を計算
   */
  getHitRate(): number {
    const total = this.stats.hits + this.stats.misses;
    return total === 0 ? 0 : (this.stats.hits / total) * 100;
  }

  /**
   * キャッシュの状態をダンプ（デバッグ用）
   */
  dump(): Array<{ key: string; metadata: CacheEntry<T>['metadata'] }> {
    const entries: Array<{ key: string; metadata: CacheEntry<T>['metadata'] }> = [];
    
    for (const [key, entry] of this.cache.entries()) {
      entries.push({
        key,
        metadata: entry.metadata,
      });
    }
    
    return entries;
  }
}

/**
 * 特定の型用のキャッシュマネージャー
 */
export class InstagramPostCacheManager extends CacheManager<InstagramPost[]> {
  constructor(config: Partial<CacheConfig> = {}) {
    super('InstagramPosts', {
      maxSize: 100,
      ttl: 5 * 60 * 1000, // 5分
      staleWhileRevalidate: 60 * 1000, // 1分
      updateAgeOnGet: false,
      ...config,
    });
  }

  /**
   * RSS URLごとにキャッシュキーを生成
   */
  generateKey(rssUrl: string, filters?: Record<string, any>): string {
    const filterStr = filters ? JSON.stringify(filters) : '';
    return `rss:${rssUrl}:${filterStr}`;
  }

  /**
   * ハッシュタグごとのキャッシュ
   */
  async getByHashtag(hashtag: string): Promise<Result<InstagramPost[] | null, CacheError>> {
    return this.get(`hashtag:${hashtag}`);
  }

  async setByHashtag(hashtag: string, posts: InstagramPost[]): Promise<Result<void, CacheError>> {
    return this.set(`hashtag:${hashtag}`, posts);
  }
}