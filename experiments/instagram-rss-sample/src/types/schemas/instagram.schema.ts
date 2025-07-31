import { z } from 'zod';

/**
 * 🔥 Instagram関連のZodスキーマ - 完璧な型安全性を実現
 */

// 日付文字列を Date オブジェクトに変換するスキーマ
const dateSchema = z.string().transform((str) => new Date(str));

// URLバリデーション付きスキーマ
const urlSchema = z.string().url('有効なURLを入力してくれ！');

// ハッシュタグのバリデーション
const hashtagSchema = z.string().regex(
  /^#[^\s#]+$/,
  'ハッシュタグは#で始まり、スペースを含まない必要がある！'
);

/**
 * Instagram投稿の基本スキーマ
 */
export const InstagramPostSchema = z.object({
  id: z.string().min(1, 'IDは必須だ！'),
  title: z.string().default(''),
  content: z.string().min(1, 'コンテンツは必須だ！'),
  imageUrl: urlSchema.optional(),
  link: urlSchema,
  pubDate: dateSchema,
  hashtags: z.array(hashtagSchema).default([]),
});

export type ValidatedInstagramPost = z.infer<typeof InstagramPostSchema>;

/**
 * 告知投稿用の拡張スキーマ
 */
export const AnnouncementPostSchema = InstagramPostSchema.extend({
  category: z.enum(['workshop', 'event', 'news']),
  eventDate: dateSchema.optional(),
  location: z.string().optional(),
});

export type ValidatedAnnouncementPost = z.infer<typeof AnnouncementPostSchema>;

/**
 * RSSフィードアイテムのスキーマ
 */
export const RSSItemSchema = z.object({
  guid: z.string().optional(),
  title: z.string().optional(),
  link: z.string().optional(),
  pubDate: z.string().optional(),
  isoDate: z.string().optional(),
  content: z.string().optional(),
  description: z.string().optional(),
  mediaContent: z.array(z.object({
    $: z.object({
      url: z.string().optional(),
      medium: z.string().optional(),
    }).optional(),
  })).optional(),
  enclosure: z.object({
    url: z.string().optional(),
    type: z.string().optional(),
  }).optional(),
});

export type ValidatedRSSItem = z.infer<typeof RSSItemSchema>;

/**
 * RSS フィード全体のスキーマ
 */
export const RSSFeedSchema = z.object({
  items: z.array(RSSItemSchema),
  title: z.string().optional(),
  description: z.string().optional(),
  link: z.string().optional(),
});

export type ValidatedRSSFeed = z.infer<typeof RSSFeedSchema>;

/**
 * 環境変数のスキーマ
 */
export const EnvSchema = z.object({
  INSTAGRAM_RSS_URL: urlSchema,
  ANNOUNCEMENT_HASHTAG: hashtagSchema,
  ENABLE_HASHTAG_FILTER: z.string().transform(val => val === 'true'),
});

export type ValidatedEnv = z.infer<typeof EnvSchema>;

/**
 * API レスポンスのスキーマ
 */
export const APIResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(InstagramPostSchema).optional(),
  error: z.object({
    message: z.string(),
    code: z.string().optional(),
  }).optional(),
  timestamp: dateSchema,
});

export type ValidatedAPIResponse = z.infer<typeof APIResponseSchema>;

/**
 * キャッシュデータのスキーマ
 */
export const CacheDataSchema = z.object({
  lastUpdated: dateSchema,
  posts: z.array(InstagramPostSchema),
  metadata: z.object({
    source: z.string(),
    version: z.string(),
  }).optional(),
});

export type ValidatedCacheData = z.infer<typeof CacheDataSchema>;