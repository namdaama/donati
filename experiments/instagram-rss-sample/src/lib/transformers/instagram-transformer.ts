import { z } from 'zod';
import {
  InstagramPostSchema,
  RSSItemSchema,
  type ValidatedInstagramPost,
  type ValidatedRSSItem,
} from '../../types/schemas/instagram.schema';
import { safeParse } from '../../types/schemas/validation';
import { Result } from '../errors/result';
import { ValidationError } from '../errors/custom-errors';
import { ImageExtractorChain } from '../utils/image-extractor';

/**
 * 🔥 型安全なデータ変換 - 完璧な型変換を実現
 */

const imageExtractor = new ImageExtractorChain();

/**
 * RSSアイテムからInstagram投稿への変換
 */
export function transformRSSItemToPost(
  item: unknown
): Result<ValidatedInstagramPost, ValidationError> {
  // まずRSSアイテムとしてバリデート
  const rssResult = safeParse(RSSItemSchema, item, 'RSS Item');
  if (Result.isFailure(rssResult)) {
    return rssResult;
  }
  
  const rssItem = rssResult.data;
  
  // Instagram投稿に変換
  const post: ValidatedInstagramPost = {
    id: rssItem.guid || rssItem.link || generateId(),
    title: rssItem.title || '',
    content: cleanContent(rssItem.content || rssItem.description || ''),
    imageUrl: imageExtractor.extract(rssItem),
    link: rssItem.link || '',
    pubDate: new Date(rssItem.pubDate || rssItem.isoDate || new Date().toISOString()),
    hashtags: extractHashtags(rssItem.content || rssItem.description || ''),
  };
  
  // 直接成功として返す
  return Result.success(post);
}

/**
 * 複数のRSSアイテムを一括変換
 */
export function transformRSSItemsToPosts(
  items: unknown[]
): { 
  posts: ValidatedInstagramPost[]; 
  errors: Array<{ index: number; error: ValidationError }> 
} {
  const posts: ValidatedInstagramPost[] = [];
  const errors: Array<{ index: number; error: ValidationError }> = [];
  
  items.forEach((item, index) => {
    const result = transformRSSItemToPost(item);
    
    if (Result.isSuccess(result)) {
      posts.push(result.data);
    } else {
      errors.push({ index, error: result.error });
    }
  });
  
  return { posts, errors };
}

/**
 * 安全なハッシュタグ抽出
 */
function extractHashtags(text: string): string[] {
  const hashtagRegex = /#[^\s#]+/g;
  const matches = text.match(hashtagRegex) || [];
  
  // 各ハッシュタグをバリデート
  return matches.filter(tag => {
    try {
      z.string().regex(/^#[^\s#]+$/).parse(tag);
      return true;
    } catch {
      return false;
    }
  });
}

/**
 * コンテンツのクリーニング
 */
function cleanContent(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

/**
 * ID生成（フォールバック用）
 */
function generateId(): string {
  return `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 投稿データの正規化
 */
export function normalizePost(post: ValidatedInstagramPost): ValidatedInstagramPost {
  return {
    ...post,
    title: post.title.trim(),
    content: post.content.trim(),
    hashtags: [...new Set(post.hashtags)], // 重複を削除
    imageUrl: post.imageUrl ? normalizeImageUrl(post.imageUrl) : undefined,
  };
}

/**
 * 画像URLの正規化
 */
function normalizeImageUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // HTTPSに統一
    urlObj.protocol = 'https:';
    return urlObj.toString();
  } catch {
    return url;
  }
}

/**
 * 投稿の要約生成
 */
export function generatePostSummary(
  post: ValidatedInstagramPost,
  maxLength: number = 100
): string {
  const content = post.content;
  
  if (content.length <= maxLength) {
    return content;
  }
  
  // 単語の途中で切らないように調整
  const truncated = content.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}