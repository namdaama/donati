import { EnvSchema, type ValidatedEnv } from '../../types/schemas/instagram.schema';
import { validateEnv } from '../../types/schemas/validation';

/**
 * 🔥 環境変数の型安全な管理
 */

let cachedEnv: ValidatedEnv | null = null;

/**
 * 環境変数を型安全に取得
 */
export function getEnv(): ValidatedEnv {
  if (cachedEnv) {
    return cachedEnv;
  }
  
  try {
    cachedEnv = validateEnv(EnvSchema, {
      INSTAGRAM_RSS_URL: import.meta.env.INSTAGRAM_RSS_URL as string,
      ANNOUNCEMENT_HASHTAG: import.meta.env.ANNOUNCEMENT_HASHTAG as string,
      ENABLE_HASHTAG_FILTER: import.meta.env.ENABLE_HASHTAG_FILTER as string,
    }) as ValidatedEnv;
    
    return cachedEnv;
  } catch (error) {
    console.error('環境変数の読み込みエラー:', error);
    
    // 開発環境ではデフォルト値を使用
    if (import.meta.env.MODE === 'development') {
      console.warn('開発環境のため、デフォルト値を使用します');
      cachedEnv = {
        INSTAGRAM_RSS_URL: 'https://rss.app/feeds/example.xml',
        ANNOUNCEMENT_HASHTAG: '#donati_event' as any,
        ENABLE_HASHTAG_FILTER: true,
      };
      return cachedEnv;
    }
    
    throw error;
  }
}

/**
 * 環境変数のヘルパー関数
 */
export const env = {
  get rssUrl(): string {
    return getEnv().INSTAGRAM_RSS_URL;
  },
  
  get announcementHashtag(): string {
    return getEnv().ANNOUNCEMENT_HASHTAG;
  },
  
  get isHashtagFilterEnabled(): boolean {
    return getEnv().ENABLE_HASHTAG_FILTER;
  },
  
  /**
   * 環境変数の検証（起動時チェック用）
   */
  validate(): void {
    try {
      getEnv();
      console.log('✅ 環境変数の検証に成功しました');
    } catch (error) {
      console.error('❌ 環境変数の検証に失敗しました:', error);
      throw error;
    }
  },
  
  /**
   * 環境変数の一覧を表示（デバッグ用）
   */
  debug(): void {
    const env = getEnv();
    console.log('📋 環境変数の設定:');
    console.log('  - RSS URL:', env.INSTAGRAM_RSS_URL);
    console.log('  - ハッシュタグ:', env.ANNOUNCEMENT_HASHTAG);
    console.log('  - フィルター有効:', env.ENABLE_HASHTAG_FILTER);
  },
};