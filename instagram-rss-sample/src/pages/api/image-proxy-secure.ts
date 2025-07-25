import type { APIRoute } from 'astro';
import { validateImageUrl, validateContentType, validateFileSize, SECURITY_HEADERS, generateRateLimitKey } from '../../lib/security/validators';
import { RateLimiter, defaultRateLimitConfigs } from '../../lib/security/rate-limiter';
import { Result } from '../../lib/errors/result';
import { logger } from '../../lib/logger';

/**
 * 🔥 セキュアな画像プロキシ - 鉄壁の防御を実装
 */

// レート制限インスタンス（本番環境ではRedisベースのものを使用推奨）
const rateLimiter = new RateLimiter({
  ...defaultRateLimitConfigs.imageProxy,
  keyGenerator: generateRateLimitKey,
});

export const GET: APIRoute = async ({ request }) => {
  const startTime = Date.now();
  
  try {
    // レート制限チェック
    const rateLimitResult = await rateLimiter.check(request);
    if (Result.isFailure(rateLimitResult)) {
      logger.warn('レート制限エラー', { error: rateLimitResult.error });
      return new Response('Too Many Requests', {
        status: 429,
        headers: {
          ...SECURITY_HEADERS,
          'Retry-After': String(rateLimitResult.error.details?.retryAfter || 60),
        },
      });
    }

    // URLパラメータの取得
    const url = new URL(request.url);
    const imageUrl = url.searchParams.get('url');
    
    if (!imageUrl) {
      return new Response('画像URLが指定されていない！', {
        status: 400,
        headers: SECURITY_HEADERS,
      });
    }
    
    // URL検証
    const urlValidation = validateImageUrl(imageUrl);
    if (Result.isFailure(urlValidation)) {
      logger.warn('画像URL検証エラー', {
        error: urlValidation.error.message,
        url: imageUrl,
      });
      
      return new Response(urlValidation.error.message, {
        status: 403,
        headers: SECURITY_HEADERS,
      });
    }
    
    const validUrl = urlValidation.data;
    
    // 画像の取得
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10秒タイムアウト
    
    try {
      const response = await fetch(validUrl.toString(), {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Instagram-RSS-Proxy/1.0',
          'Accept': 'image/*',
        },
      });
      
      clearTimeout(timeout);
      
      if (!response.ok) {
        logger.error('画像取得エラー', {
          status: response.status,
          statusText: response.statusText,
          url: validUrl.toString(),
        });
        
        return new Response('画像の取得に失敗した', {
          status: response.status,
          headers: SECURITY_HEADERS,
        });
      }
      
      // Content-Type検証
      const contentType = response.headers.get('content-type');
      const typeValidation = validateContentType(contentType);
      if (Result.isFailure(typeValidation)) {
        logger.warn('Content-Type検証エラー', {
          error: typeValidation.error.message,
          contentType,
          url: validUrl.toString(),
        });
        
        return new Response('サポートされていない画像形式', {
          status: 415,
          headers: SECURITY_HEADERS,
        });
      }
      
      // ファイルサイズチェック
      const contentLength = response.headers.get('content-length');
      if (contentLength) {
        const sizeValidation = validateFileSize(parseInt(contentLength, 10));
        if (Result.isFailure(sizeValidation)) {
          logger.warn('ファイルサイズ検証エラー', {
            error: sizeValidation.error.message,
            size: contentLength,
            url: validUrl.toString(),
          });
          
          return new Response(sizeValidation.error.message, {
            status: 413,
            headers: SECURITY_HEADERS,
          });
        }
      }
      
      // 画像データの取得
      const buffer = await response.arrayBuffer();
      
      // 実際のサイズを再チェック
      const actualSizeValidation = validateFileSize(buffer.byteLength);
      if (Result.isFailure(actualSizeValidation)) {
        logger.warn('実際のファイルサイズ検証エラー', {
          error: actualSizeValidation.error.message,
          size: buffer.byteLength,
          url: validUrl.toString(),
        });
        
        return new Response(actualSizeValidation.error.message, {
          status: 413,
          headers: SECURITY_HEADERS,
        });
      }
      
      const processingTime = Date.now() - startTime;
      logger.info('画像プロキシ成功', {
        url: validUrl.toString(),
        size: buffer.byteLength,
        contentType: typeValidation.data,
        processingTime,
      });
      
      // 成功レスポンス
      return new Response(buffer, {
        status: 200,
        headers: {
          ...SECURITY_HEADERS,
          'Content-Type': typeValidation.data,
          'Cache-Control': 'public, max-age=86400, immutable',
          'X-Processing-Time': `${processingTime}ms`,
        },
      });
      
    } finally {
      clearTimeout(timeout);
    }
    
  } catch (error) {
    logger.error('画像プロキシエラー', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return new Response('内部エラーが発生した', {
      status: 500,
      headers: SECURITY_HEADERS,
    });
  }
};