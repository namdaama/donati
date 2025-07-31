import { SecurityError } from '../errors/custom-errors';
import { Result } from '../errors/result';
import { logger } from '../logger';

/**
 * 🔥 セキュリティバリデーター - 鉄壁の防御
 */

// 許可されたドメインのリスト
export const ALLOWED_IMAGE_DOMAINS = [
  'instagram.com',
  'cdninstagram.com',
  'fbcdn.net',
  'scontent.cdninstagram.com',
  'scontent-*.cdninstagram.com',
  'scontent.*.fbcdn.net',
] as const;

// セキュリティヘッダー
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'",
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
} as const;

/**
 * URLの安全性をチェック
 */
export function validateImageUrl(url: string): Result<URL, SecurityError> {
  try {
    const urlObj = new URL(url);
    
    // プロトコルチェック
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return Result.failure(
        new SecurityError(
          `危険なプロトコル: ${urlObj.protocol}`,
          'validation',
          { url, protocol: urlObj.protocol }
        )
      );
    }
    
    // ドメインチェック
    const isAllowedDomain = ALLOWED_IMAGE_DOMAINS.some(domain => {
      if (domain.includes('*')) {
        const pattern = domain.replace(/\*/g, '[^.]+');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(urlObj.hostname);
      }
      return urlObj.hostname.includes(domain);
    });
    
    if (!isAllowedDomain) {
      logger.warn('許可されていないドメインからの画像リクエスト', {
        hostname: urlObj.hostname,
        url
      });
      
      return Result.failure(
        new SecurityError(
          `許可されていないドメイン: ${urlObj.hostname}`,
          'domain',
          { url, hostname: urlObj.hostname }
        )
      );
    }
    
    // パスインジェクションチェック
    if (urlObj.pathname.includes('..') || urlObj.pathname.includes('//')) {
      return Result.failure(
        new SecurityError(
          'パストラバーサルの可能性あり',
          'validation',
          { url, pathname: urlObj.pathname }
        )
      );
    }
    
    return Result.success(urlObj);
  } catch (error) {
    return Result.failure(
      new SecurityError(
        '無効なURL形式',
        'validation',
        { url, error: error instanceof Error ? error.message : String(error) }
      )
    );
  }
}

/**
 * Content-Typeの検証
 */
export function validateContentType(contentType: string | null): Result<string, SecurityError> {
  if (!contentType) {
    return Result.failure(
      new SecurityError(
        'Content-Typeが指定されていない',
        'validation',
        { contentType }
      )
    );
  }
  
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ];
  
  const normalizedType = contentType.toLowerCase().split(';')[0].trim();
  
  if (!allowedTypes.includes(normalizedType)) {
    return Result.failure(
      new SecurityError(
        `許可されていないContent-Type: ${normalizedType}`,
        'validation',
        { contentType: normalizedType, allowedTypes }
      )
    );
  }
  
  return Result.success(normalizedType);
}

/**
 * ファイルサイズの検証
 */
export function validateFileSize(size: number, maxSizeMB: number = 5): Result<number, SecurityError> {
  const maxSize = maxSizeMB * 1024 * 1024; // MB to bytes
  
  if (size > maxSize) {
    return Result.failure(
      new SecurityError(
        `ファイルサイズが大きすぎる: ${(size / 1024 / 1024).toFixed(2)}MB (最大: ${maxSizeMB}MB)`,
        'validation',
        { size, maxSize, sizeMB: size / 1024 / 1024 }
      )
    );
  }
  
  return Result.success(size);
}

/**
 * レート制限用のキー生成
 */
export function generateRateLimitKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  return `ratelimit:${ip}:${userAgent.substring(0, 50)}`;
}

/**
 * リクエストの署名を生成（オプション）
 */
export function generateRequestSignature(url: string, timestamp: number): string {
  // 簡易的な署名（本番環境では適切な秘密鍵を使用）
  const data = `${url}:${timestamp}`;
  return btoa(data).replace(/[+/=]/g, '');
}