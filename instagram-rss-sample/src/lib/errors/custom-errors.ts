/**
 * 🔥 カスタムエラークラス - サンジ流エラーハンドリング
 */

export class RSSFetchError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
    public readonly rssUrl?: string,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = 'RSSFetchError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field?: string,
    public readonly value?: unknown,
    public readonly errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ValidationError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class CacheError extends Error {
  constructor(
    message: string,
    public readonly operation: 'read' | 'write' | 'delete',
    public readonly key?: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'CacheError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class SecurityError extends Error {
  constructor(
    message: string,
    public readonly type: 'domain' | 'rate-limit' | 'validation',
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'SecurityError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class TitleGenerationError extends Error {
  constructor(
    message: string,
    public readonly postId: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'TitleGenerationError';
    Error.captureStackTrace(this, this.constructor);
  }
}