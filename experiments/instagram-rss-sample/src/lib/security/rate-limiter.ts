import { SecurityError } from '../errors/custom-errors';
import { Result } from '../errors/result';
import { logger } from '../logger';

/**
 * 🔥 レート制限システム - 愛のあるアクセス制御
 */

interface RateLimitConfig {
  windowMs: number;      // 時間窓（ミリ秒）
  maxRequests: number;   // 最大リクエスト数
  keyGenerator: (request: Request) => string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: any = null;

  constructor(private config: RateLimitConfig) {
    // 定期的に期限切れエントリをクリーンアップ
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.config.windowMs);
  }

  /**
   * リクエストをチェック
   */
  async check(request: Request): Promise<Result<void, SecurityError>> {
    const key = this.config.keyGenerator(request);
    const now = Date.now();
    
    let entry = this.storage.get(key);
    
    // エントリが存在しないか期限切れの場合
    if (!entry || entry.resetTime <= now) {
      entry = {
        count: 1,
        resetTime: now + this.config.windowMs,
      };
      this.storage.set(key, entry);
      return Result.success(undefined);
    }
    
    // レート制限チェック
    if (entry.count >= this.config.maxRequests) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
      
      logger.warn('レート制限に達しました', {
        key,
        count: entry.count,
        maxRequests: this.config.maxRequests,
        retryAfter,
      });
      
      return Result.failure(
        new SecurityError(
          `レート制限に達しました。${retryAfter}秒後に再試行してください。`,
          'rate-limit',
          {
            retryAfter,
            limit: this.config.maxRequests,
            windowMs: this.config.windowMs,
          }
        )
      );
    }
    
    // カウントを増やす
    entry.count++;
    this.storage.set(key, entry);
    
    return Result.success(undefined);
  }

  /**
   * 期限切れエントリのクリーンアップ
   */
  private cleanup(): void {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, entry] of this.storage.entries()) {
      if (entry.resetTime <= now) {
        this.storage.delete(key);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      logger.debug('レート制限エントリをクリーンアップ', { cleaned });
    }
  }

  /**
   * 特定のキーの状態を取得
   */
  getStatus(key: string): {
    remaining: number;
    resetTime: number;
    total: number;
  } | null {
    const entry = this.storage.get(key);
    const now = Date.now();
    
    if (!entry || entry.resetTime <= now) {
      return {
        remaining: this.config.maxRequests,
        resetTime: now + this.config.windowMs,
        total: this.config.maxRequests,
      };
    }
    
    return {
      remaining: Math.max(0, this.config.maxRequests - entry.count),
      resetTime: entry.resetTime,
      total: this.config.maxRequests,
    };
  }

  /**
   * クリーンアップを停止
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.storage.clear();
  }
}

/**
 * デフォルトのレート制限設定
 */
export const defaultRateLimitConfigs = {
  // 画像プロキシ用（1分間に30リクエストまで）
  imageProxy: {
    windowMs: 60 * 1000,
    maxRequests: 30,
  },
  
  // API用（1分間に60リクエストまで）
  api: {
    windowMs: 60 * 1000,
    maxRequests: 60,
  },
  
  // 厳格（1分間に10リクエストまで）
  strict: {
    windowMs: 60 * 1000,
    maxRequests: 10,
  },
} as const;