import Parser from 'rss-parser';
import type { InstagramPost } from '../types/instagram';
import { RSS_CONFIG } from '../config/constants';
import { sanitizeXml, isValidRssFeed } from './utils/xml-sanitizer';
import { ImageExtractorChain } from './utils/image-extractor';
import { generateTitleWithCache } from './title-generator';
import { RSSFetchError, ValidationError } from './errors/custom-errors';
import { Result } from './errors/result';
import { logger } from './logger';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: true }],
      ['description', 'description'],
    ]
  }
});

const imageExtractor = new ImageExtractorChain();

/**
 * 🔥 愛を込めたInstagram投稿の取得 - エラーハンドリング強化版
 */
export async function fetchInstagramPostsEnhanced(
  rssUrl: string
): Promise<Result<InstagramPost[], RSSFetchError>> {
  logger.info('Instagram RSS取得開始', { rssUrl });
  
  try {
    // URLバリデーション
    try {
      new URL(rssUrl);
    } catch {
      return Result.failure(
        new RSSFetchError('無効なRSS URLだ！', undefined, rssUrl)
      );
    }

    // フェッチ処理
    const response = await fetch(rssUrl, {
      signal: AbortSignal.timeout(RSS_CONFIG.RESPONSE_TIMEOUT),
    });
    
    if (!response.ok) {
      logger.error('RSS取得失敗', { 
        status: response.status, 
        statusText: response.statusText,
        rssUrl 
      });
      
      return Result.failure(
        new RSSFetchError(
          `RSSフィードの取得に失敗した！ステータス: ${response.status}`,
          undefined,
          rssUrl,
          response.status
        )
      );
    }
    
    const xmlText = await response.text();
    
    // XMLバリデーション
    if (!isValidRssFeed(xmlText)) {
      logger.error('無効なRSSフィード', { 
        preview: xmlText.substring(0, RSS_CONFIG.XML_PREVIEW_LENGTH),
        rssUrl 
      });
      
      return Result.failure(
        new RSSFetchError(
          'これはRSSフィードじゃない！愛が足りない！',
          undefined,
          rssUrl
        )
      );
    }
    
    const sanitizedXml = sanitizeXml(xmlText);
    const feed = await parser.parseString(sanitizedXml);
    
    // 基本的な投稿データを作成
    const posts = feed.items.map((item) => ({
      id: item.guid || item.link || '',
      title: item.title || '',
      content: cleanContent(item.content || item.description || ''),
      imageUrl: imageExtractor.extract(item),
      link: item.link || '',
      pubDate: new Date(item.pubDate || item.isoDate || ''),
      hashtags: extractHashtags(item.content || item.description || ''),
    }));
    
    // タイトルが不足している投稿に対して動的にタイトルを生成
    const postsWithTitles = await Promise.all(
      posts.map(async (post) => {
        if (!post.title || post.title.trim() === '') {
          try {
            const generatedTitle = await generateTitleWithCache(post.id, post.content);
            return { ...post, title: generatedTitle };
          } catch (error) {
            logger.warn('タイトル生成失敗', { postId: post.id, error });
            return { ...post, title: extractFirstLine(post.content) };
          }
        }
        return post;
      })
    );
    
    logger.info('Instagram RSS取得成功', { 
      postCount: postsWithTitles.length,
      rssUrl 
    });
    
    return Result.success(postsWithTitles);
    
  } catch (error) {
    logger.error('予期しないエラー', { error, rssUrl });
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return Result.failure(
        new RSSFetchError('ネットワークエラーだ！接続を確認してくれ！', error, rssUrl)
      );
    }
    
    return Result.failure(
      new RSSFetchError(
        '予期しないエラーが発生した！だが俺は諦めない！',
        error,
        rssUrl
      )
    );
  }
}

/**
 * キャッシュフォールバック付き取得
 */
export async function fetchInstagramPostsWithFallback(
  rssUrl: string,
  cacheManager?: { get: (key: string) => Promise<InstagramPost[] | null> }
): Promise<InstagramPost[]> {
  const result = await fetchInstagramPostsEnhanced(rssUrl);
  
  if (Result.isSuccess(result)) {
    return result.data;
  }
  
  // エラーの場合はキャッシュから取得を試みる
  if (cacheManager) {
    logger.warn('RSSフェッチ失敗、キャッシュから復旧を試みる', { 
      error: result.error.message,
      rssUrl 
    });
    
    const cached = await cacheManager.get(rssUrl);
    if (cached && cached.length > 0) {
      logger.info('キャッシュから復旧成功', { 
        postCount: cached.length,
        rssUrl 
      });
      return cached;
    }
  }
  
  // すべて失敗した場合は空配列を返す
  logger.error('RSS取得とキャッシュ復旧の両方に失敗', { rssUrl });
  return [];
}

function extractHashtags(text: string): string[] {
  const hashtagRegex = /#[^\s#]+/g;
  const matches = text.match(hashtagRegex);
  return matches ? matches : [];
}

function extractFirstLine(text: string): string {
  const cleanText = text.replace(/<[^>]*>/g, '');
  const lines = cleanText.split('\n');
  return lines[0]?.trim() || 'Instagram Post';
}

function cleanContent(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .trim();
}