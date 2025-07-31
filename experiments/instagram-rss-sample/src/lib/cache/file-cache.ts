import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { CacheError } from '../errors/custom-errors';
import { Result } from '../errors/result';
import { logger } from '../logger';
import { z } from 'zod';

/**
 * 🔥 ファイルベースキャッシュ - 永続化レイヤー
 */

const FileCacheMetadataSchema = z.object({
  version: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  expiresAt: z.number(),
  etag: z.string().optional(),
  contentType: z.string(),
});

type FileCacheMetadata = z.infer<typeof FileCacheMetadataSchema>;

export interface FileCacheConfig {
  baseDir: string;
  ttl: number;
  maxFileSize?: number;
  compression?: boolean;
}

export class FileCache {
  private readonly config: FileCacheConfig;
  private readonly cacheLogger;
  private initialized = false;

  constructor(config: FileCacheConfig) {
    this.config = {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      compression: false,
      ...config,
    };
    this.cacheLogger = logger.child('FileCache');
  }

  /**
   * 初期化（ディレクトリ作成）
   */
  private async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      await fs.mkdir(this.config.baseDir, { recursive: true });
      this.initialized = true;
      this.cacheLogger.info('ファイルキャッシュを初期化', {
        baseDir: this.config.baseDir,
      });
    } catch (error) {
      throw new Error(`キャッシュディレクトリの作成に失敗: ${error}`);
    }
  }

  /**
   * キーからファイルパスを生成
   */
  private getFilePath(key: string): { dataPath: string; metaPath: string } {
    const hash = createHash('sha256').update(key).digest('hex');
    const dir = path.join(this.config.baseDir, hash.substring(0, 2));
    
    return {
      dataPath: path.join(dir, `${hash}.json`),
      metaPath: path.join(dir, `${hash}.meta.json`),
    };
  }

  /**
   * キャッシュから取得
   */
  async get<T>(key: string): Promise<Result<T | null, CacheError>> {
    await this.initialize();
    
    try {
      const { dataPath, metaPath } = this.getFilePath(key);
      
      // メタデータの読み込み
      let metadata: FileCacheMetadata;
      try {
        const metaContent = await fs.readFile(metaPath, 'utf-8');
        metadata = FileCacheMetadataSchema.parse(JSON.parse(metaContent));
      } catch {
        // メタデータがない場合はキャッシュミス
        return Result.success(null);
      }
      
      // 有効期限チェック
      if (metadata.expiresAt < Date.now()) {
        await this.delete(key);
        this.cacheLogger.debug('期限切れキャッシュを削除', { key });
        return Result.success(null);
      }
      
      // データの読み込み
      const dataContent = await fs.readFile(dataPath, 'utf-8');
      const data = JSON.parse(dataContent) as T;
      
      this.cacheLogger.debug('ファイルキャッシュヒット', {
        key,
        age: Date.now() - metadata.createdAt,
      });
      
      return Result.success(data);
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        return Result.success(null);
      }
      
      return Result.failure(
        new CacheError(
          'ファイルキャッシュ読み込みエラー',
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
  async set<T>(key: string, value: T, etag?: string): Promise<Result<void, CacheError>> {
    await this.initialize();
    
    try {
      const { dataPath, metaPath } = this.getFilePath(key);
      const dir = path.dirname(dataPath);
      
      // ディレクトリ作成
      await fs.mkdir(dir, { recursive: true });
      
      // データのシリアライズ
      const dataContent = JSON.stringify(value, null, 2);
      
      // ファイルサイズチェック
      const dataSize = Buffer.byteLength(dataContent);
      if (dataSize > this.config.maxFileSize!) {
        return Result.failure(
          new CacheError(
            `ファイルサイズが上限を超えています: ${dataSize} bytes`,
            'write',
            key
          )
        );
      }
      
      // メタデータの作成
      const now = Date.now();
      const metadata: FileCacheMetadata = {
        version: '1.0',
        createdAt: now,
        updatedAt: now,
        expiresAt: now + this.config.ttl,
        etag,
        contentType: 'application/json',
      };
      
      // 原子的な書き込み（一時ファイル経由）
      const tempDataPath = `${dataPath}.tmp`;
      const tempMetaPath = `${metaPath}.tmp`;
      
      await fs.writeFile(tempDataPath, dataContent, 'utf-8');
      await fs.writeFile(tempMetaPath, JSON.stringify(metadata), 'utf-8');
      
      await fs.rename(tempDataPath, dataPath);
      await fs.rename(tempMetaPath, metaPath);
      
      this.cacheLogger.info('ファイルキャッシュに保存', {
        key,
        size: dataSize,
        ttl: this.config.ttl,
      });
      
      return Result.success(undefined);
    } catch (error) {
      return Result.failure(
        new CacheError(
          'ファイルキャッシュ書き込みエラー',
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
    await this.initialize();
    
    try {
      const { dataPath, metaPath } = this.getFilePath(key);
      let deleted = false;
      
      try {
        await fs.unlink(dataPath);
        deleted = true;
      } catch (error) {
        if ((error as any).code !== 'ENOENT') throw error;
      }
      
      try {
        await fs.unlink(metaPath);
        deleted = true;
      } catch (error) {
        if ((error as any).code !== 'ENOENT') throw error;
      }
      
      if (deleted) {
        this.cacheLogger.info('ファイルキャッシュから削除', { key });
      }
      
      return Result.success(deleted);
    } catch (error) {
      return Result.failure(
        new CacheError(
          'ファイルキャッシュ削除エラー',
          'delete',
          key,
          error
        )
      );
    }
  }

  /**
   * 期限切れキャッシュのクリーンアップ
   */
  async cleanup(): Promise<Result<number, CacheError>> {
    await this.initialize();
    
    try {
      let cleanedCount = 0;
      const now = Date.now();
      
      // キャッシュディレクトリをスキャン
      const subdirs = await fs.readdir(this.config.baseDir);
      
      for (const subdir of subdirs) {
        const subdirPath = path.join(this.config.baseDir, subdir);
        const stat = await fs.stat(subdirPath);
        
        if (!stat.isDirectory()) continue;
        
        const files = await fs.readdir(subdirPath);
        
        for (const file of files) {
          if (!file.endsWith('.meta.json')) continue;
          
          const metaPath = path.join(subdirPath, file);
          
          try {
            const metaContent = await fs.readFile(metaPath, 'utf-8');
            const metadata = FileCacheMetadataSchema.parse(JSON.parse(metaContent));
            
            if (metadata.expiresAt < now) {
              const dataFile = file.replace('.meta.json', '.json');
              const dataPath = path.join(subdirPath, dataFile);
              
              await fs.unlink(metaPath);
              await fs.unlink(dataPath);
              cleanedCount++;
            }
          } catch (error) {
            // エラーは無視して次へ
            this.cacheLogger.warn('クリーンアップ中のエラー', {
              file,
              error,
            });
          }
        }
      }
      
      this.cacheLogger.info('期限切れキャッシュをクリーンアップ', {
        cleanedCount,
      });
      
      return Result.success(cleanedCount);
    } catch (error) {
      return Result.failure(
        new CacheError(
          'クリーンアップエラー',
          'delete',
          undefined,
          error
        )
      );
    }
  }

  /**
   * キャッシュの統計情報
   */
  async getStats(): Promise<Result<{
    totalFiles: number;
    totalSize: number;
    oldestFile: Date | null;
    newestFile: Date | null;
  }, CacheError>> {
    await this.initialize();
    
    try {
      let totalFiles = 0;
      let totalSize = 0;
      let oldestTime = Infinity;
      let newestTime = 0;
      
      const subdirs = await fs.readdir(this.config.baseDir);
      
      for (const subdir of subdirs) {
        const subdirPath = path.join(this.config.baseDir, subdir);
        const stat = await fs.stat(subdirPath);
        
        if (!stat.isDirectory()) continue;
        
        const files = await fs.readdir(subdirPath);
        
        for (const file of files) {
          if (file.endsWith('.json') && !file.endsWith('.meta.json')) {
            const filePath = path.join(subdirPath, file);
            const fileStat = await fs.stat(filePath);
            
            totalFiles++;
            totalSize += fileStat.size;
            
            const mtime = fileStat.mtime.getTime();
            oldestTime = Math.min(oldestTime, mtime);
            newestTime = Math.max(newestTime, mtime);
          }
        }
      }
      
      return Result.success({
        totalFiles,
        totalSize,
        oldestFile: oldestTime === Infinity ? null : new Date(oldestTime),
        newestFile: newestTime === 0 ? null : new Date(newestTime),
      });
    } catch (error) {
      return Result.failure(
        new CacheError(
          '統計情報取得エラー',
          'read',
          undefined,
          error
        )
      );
    }
  }
}