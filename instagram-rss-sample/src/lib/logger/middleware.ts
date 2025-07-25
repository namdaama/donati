import type { APIContext, MiddlewareNext } from 'astro';
import { createLogger } from './logger';

/**
 * 🔥 ロギングミドルウェア - リクエストとレスポンスをエレガントに記録
 */

const middlewareLogger = createLogger('Middleware');

export interface RequestLogContext {
  method: string;
  url: string;
  pathname: string;
  query: Record<string, string>;
  headers: Record<string, string>;
  ip?: string;
  userAgent?: string;
}

export interface ResponseLogContext extends RequestLogContext {
  status: number;
  duration: number;
  error?: Error;
}

/**
 * リクエスト/レスポンスロギングミドルウェア
 */
export async function loggingMiddleware(
  context: APIContext,
  next: MiddlewareNext
): Promise<Response> {
  const startTime = Date.now();
  const { request } = context;
  const url = new URL(request.url);
  
  // リクエスト情報の収集
  const requestContext: RequestLogContext = {
    method: request.method,
    url: url.pathname,
    pathname: url.pathname,
    query: Object.fromEntries(url.searchParams),
    headers: getRelevantHeaders(request.headers),
    ip: request.headers.get('x-forwarded-for')?.split(',')[0] || 
        request.headers.get('x-real-ip') || 
        'unknown',
    userAgent: request.headers.get('user-agent') || undefined,
  };
  
  // リクエストログ
  middlewareLogger.info('Incoming request', requestContext);
  
  try {
    // 次のミドルウェア/ハンドラーを実行
    const response = await next();
    
    // レスポンス情報の収集
    const duration = Date.now() - startTime;
    const responseContext: ResponseLogContext = {
      ...requestContext,
      status: response.status,
      duration,
    };
    
    // レスポンスログ
    const logLevel = response.status >= 400 ? 'warn' : 'info';
    middlewareLogger[logLevel]('Request completed', responseContext);
    
    // レスポンスヘッダーに処理時間を追加
    const headers = new Headers(response.headers);
    headers.set('X-Response-Time', `${duration}ms`);
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    // エラーログ
    middlewareLogger.error('Request failed', {
      ...requestContext,
      duration,
      error,
    });
    
    throw error;
  }
}

/**
 * 重要なヘッダーのみを抽出
 */
function getRelevantHeaders(headers: Headers): Record<string, string> {
  const relevant = [
    'content-type',
    'content-length',
    'accept',
    'accept-language',
    'referer',
    'origin',
  ];
  
  const result: Record<string, string> = {};
  
  for (const header of relevant) {
    const value = headers.get(header);
    if (value) {
      result[header] = value;
    }
  }
  
  return result;
}

/**
 * パフォーマンスロギングデコレーター（関数用）
 */
export function logPerformance<T extends (...args: any[]) => any>(
  target: T,
  name: string = target.name
): T {
  const perfLogger = createLogger(`Performance:${name}`);
  
  return ((...args: Parameters<T>) => {
    const startTime = Date.now();
    perfLogger.debug('Function started', { args: args.length });
    
    try {
      const result = target(...args);
      
      // Promiseの場合
      if (result instanceof Promise) {
        return result
          .then((value) => {
            const duration = Date.now() - startTime;
            perfLogger.info('Async function completed', { duration });
            return value;
          })
          .catch((error) => {
            const duration = Date.now() - startTime;
            perfLogger.error('Async function failed', { duration, error });
            throw error;
          });
      }
      
      // 同期関数の場合
      const duration = Date.now() - startTime;
      perfLogger.info('Function completed', { duration });
      return result;
      
    } catch (error) {
      const duration = Date.now() - startTime;
      perfLogger.error('Function failed', { duration, error });
      throw error;
    }
  }) as T;
}