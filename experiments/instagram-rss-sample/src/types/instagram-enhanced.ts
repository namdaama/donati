import { z } from 'zod';
import { 
  InstagramPostSchema, 
  AnnouncementPostSchema,
  type ValidatedInstagramPost,
  type ValidatedAnnouncementPost 
} from './schemas/instagram.schema';

/**
 * 🔥 型安全性を極めたInstagram型定義
 */

// 既存の型との互換性を保ちつつ、Zodスキーマから型を生成
export type InstagramPost = ValidatedInstagramPost;
export type AnnouncementPost = ValidatedAnnouncementPost;

/**
 * ブランド型で型安全性をさらに強化
 */
export type PostId = string & { readonly __brand: 'PostId' };
export type Hashtag = string & { readonly __brand: 'Hashtag' };
export type ImageUrl = string & { readonly __brand: 'ImageUrl' };

/**
 * 型ガード関数
 */
export const TypeGuards = {
  isInstagramPost: (value: unknown): value is InstagramPost => {
    return InstagramPostSchema.safeParse(value).success;
  },
  
  isAnnouncementPost: (value: unknown): value is AnnouncementPost => {
    return AnnouncementPostSchema.safeParse(value).success;
  },
  
  isValidHashtag: (value: string): value is Hashtag => {
    return /^#[^\s#]+$/.test(value);
  },
  
  isValidImageUrl: (value: string): value is ImageUrl => {
    try {
      const url = new URL(value);
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(url.pathname);
    } catch {
      return false;
    }
  },
};

/**
 * 型変換ヘルパー
 */
export const TypeConverters = {
  toPostId: (id: string): PostId => {
    if (!id || id.trim() === '') {
      throw new Error('PostIdは空にできない！');
    }
    return id as PostId;
  },
  
  toHashtag: (tag: string): Hashtag => {
    if (!TypeGuards.isValidHashtag(tag)) {
      throw new Error(`"${tag}"は有効なハッシュタグじゃない！`);
    }
    return tag as Hashtag;
  },
  
  toImageUrl: (url: string): ImageUrl => {
    if (!TypeGuards.isValidImageUrl(url)) {
      throw new Error(`"${url}"は有効な画像URLじゃない！`);
    }
    return url as ImageUrl;
  },
};

/**
 * 投稿のフィルタリング用の型
 */
export interface PostFilter {
  hashtags?: Hashtag[];
  category?: AnnouncementPost['category'];
  dateRange?: {
    start: Date;
    end: Date;
  };
  hasImage?: boolean;
  searchText?: string;
}

/**
 * 投稿の並び替えオプション
 */
export type PostSortOption = 
  | 'date-desc'
  | 'date-asc'
  | 'title-asc'
  | 'title-desc'
  | 'category';

/**
 * ページネーション情報
 */
export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * APIレスポンスの型
 */
export interface PostsResponse<T = InstagramPost> {
  posts: T[];
  pagination: PaginationInfo;
  filters: PostFilter;
  sortedBy: PostSortOption;
  timestamp: Date;
}

/**
 * 投稿の集計情報
 */
export interface PostStatistics {
  totalPosts: number;
  postsWithImages: number;
  categoryCounts: Record<AnnouncementPost['category'], number>;
  hashtagCounts: Array<{ tag: Hashtag; count: number }>;
  dateRange: {
    earliest: Date;
    latest: Date;
  };
}