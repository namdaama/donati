import type { InstagramPost } from '../types/instagram';
import { fetchInstagramPostsEnhanced } from './instagram-rss-enhanced';
import { defaultCache } from './cache';
import { Result } from './errors/result';
import { logger } from './logger';
import { createHash } from 'node:crypto';

/**
 * 🔥 キャッシュ付きInstagram RSS取得 - 究極のパフォーマンス
 */

const cacheLogger = logger.child('InstagramRSSCached');

/**
 * キャッシュキーの生成
 */
function generateCacheKey(rssUrl: string, filters?: Record<string, any>): string {
  const baseKey = createHash('md5').update(rssUrl).digest('hex');
  
  if (filters && Object.keys(filters).length > 0) {
    const filterStr = JSON.stringify(filters, Object.keys(filters).sort());
    const filterHash = createHash('md5').update(filterStr).digest('hex').substring(0, 8);
    return `rss:${baseKey}:${filterHash}`;
  }
  
  return `rss:${baseKey}`;
}

/**
 * キャッシュ付きでInstagram投稿を取得
 */
export async function fetchInstagramPostsCached(
  rssUrl: string,
  options?: {
    forceRefresh?: boolean;
    filters?: Record<string, any>;
  }
): Promise<InstagramPost[]> {
  const cacheKey = generateCacheKey(rssUrl, options?.filters);
  
  // 強制リフレッシュでない場合はキャッシュをチェック
  if (!options?.forceRefresh) {
    const cacheResult = await defaultCache.get(cacheKey);
    
    if (Result.isSuccess(cacheResult) && cacheResult.data !== null) {
      cacheLogger.info('キャッシュから投稿を返却', {
        rssUrl,
        postCount: cacheResult.data.length,
      });
      return cacheResult.data;
    }
  }
  
  // 新規取得
  cacheLogger.info('RSSフィードから新規取得', { rssUrl });
  const fetchResult = await fetchInstagramPostsEnhanced(rssUrl);
  
  if (Result.isFailure(fetchResult)) {
    cacheLogger.error('RSS取得エラー', {
      error: fetchResult.error,
      rssUrl,
    });
    
    // エラー時もキャッシュから返却を試みる
    if (!options?.forceRefresh) {
      const fallbackResult = await defaultCache.get(cacheKey);
      if (Result.isSuccess(fallbackResult) && fallbackResult.data !== null) {
        cacheLogger.warn('エラー時のフォールバック: 古いキャッシュを使用', {
          rssUrl,
          postCount: fallbackResult.data.length,
        });
        return fallbackResult.data;
      }
    }
    
    return [];
  }
  
  const posts = fetchResult.data;
  
  // キャッシュに保存
  const cacheSetResult = await defaultCache.set(cacheKey, posts);
  if (Result.isFailure(cacheSetResult)) {
    cacheLogger.warn('キャッシュ保存失敗', {
      error: cacheSetResult.error,
      rssUrl,
    });
  }
  
  return posts;
}

/**
 * 複数のRSSフィードから投稿を取得（並列処理）
 */
export async function fetchInstagramPostsMultipleCached(
  rssUrls: string[],
  options?: {
    forceRefresh?: boolean;
    deduplicateById?: boolean;
  }
): Promise<InstagramPost[]> {
  const fetchPromises = rssUrls.map(url =>
    fetchInstagramPostsCached(url, { forceRefresh: options?.forceRefresh })
  );
  
  const results = await Promise.all(fetchPromises);
  const allPosts = results.flat();
  
  // 重複除去
  if (options?.deduplicateById) {
    const uniquePosts = new Map<string, InstagramPost>();
    
    for (const post of allPosts) {
      if (!uniquePosts.has(post.id)) {
        uniquePosts.set(post.id, post);
      }
    }
    
    const dedupedPosts = Array.from(uniquePosts.values());
    
    cacheLogger.info('重複除去完了', {
      originalCount: allPosts.length,
      uniqueCount: dedupedPosts.length,
      duplicatesRemoved: allPosts.length - dedupedPosts.length,
    });
    
    return dedupedPosts;
  }
  
  return allPosts;
}

/**
 * キャッシュのプリウォーム
 */
export async function prewarmCache(rssUrls: string[]): Promise<void> {
  cacheLogger.info('キャッシュのプリウォーム開始', {
    urlCount: rssUrls.length,
  });
  
  const promises = rssUrls.map(async (url) => {
    try {
      await fetchInstagramPostsCached(url, { forceRefresh: true });
      cacheLogger.debug('プリウォーム成功', { url });
    } catch (error) {
      cacheLogger.error('プリウォーム失敗', { url, error });
    }
  });
  
  await Promise.all(promises);
  
  cacheLogger.info('キャッシュのプリウォーム完了');
}

/**
 * キャッシュ統計情報の取得
 */
export async function getCacheStats() {
  return defaultCache.getStats();
}

/**
 * キャッシュのクリーンアップ
 */
export async function cleanupCache(): Promise<void> {
  const result = await defaultCache.cleanupL2();
  
  if (Result.isSuccess(result)) {
    cacheLogger.info('キャッシュクリーンアップ完了', {
      cleanedCount: result.data,
    });
  } else {
    cacheLogger.error('キャッシュクリーンアップ失敗', {
      error: result.error,
    });
  }
}