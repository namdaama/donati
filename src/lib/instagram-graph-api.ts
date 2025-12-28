import type { InstagramPost } from '../types/instagram';

const GRAPH_API_VERSION = 'v21.0';
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

/**
 * Graph API Media型定義
 */
interface GraphAPIMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

/**
 * Graph APIレスポンス型定義
 */
interface GraphAPIResponse {
  data: GraphAPIMedia[];
  paging?: {
    cursors: { before: string; after: string };
    next?: string;
  };
}

/**
 * Instagram Graph APIで投稿取得
 * @returns InstagramPost[] - 画像投稿のみ、最大50件
 */
export async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  const accessToken = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = import.meta.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  // 環境変数チェック
  if (!accessToken || !accountId) {
    console.error('Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ACCOUNT_ID');
    return [];
  }

  try {
    // トークン有効性チェック
    const isValid = await checkTokenValidity(accessToken);
    if (!isValid) {
      console.warn('⚠️ Instagram access token is expired or invalid!');
      console.warn('Please refresh your token: https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens');
      return [];
    }

    // Graph API呼び出し
    const fields = [
      'id',
      'caption',
      'media_type',
      'media_url',
      'permalink',
      'timestamp',
      'thumbnail_url',
    ].join(',');

    const url = `${GRAPH_API_BASE}/${accountId}/media?fields=${fields}&limit=50&access_token=${accessToken}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Graph API Error:', errorData);
      return [];
    }

    const data: GraphAPIResponse = await response.json();

    // IMAGE/CAROUSEL_ALBUMのみフィルタリングし、InstagramPost型に変換
    const posts = data.data
      .filter(item => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
      .map((item): InstagramPost => ({
        id: item.id,
        title: extractFirstLine(item.caption || ''),
        content: item.caption || '',
        imageUrl: item.media_url || item.thumbnail_url || '',
        link: item.permalink,
        pubDate: new Date(item.timestamp),
        hashtags: extractHashtags(item.caption || ''),
      }));

    return posts;
  } catch (error) {
    console.error('Error fetching Instagram posts from Graph API:', error);
    return [];
  }
}

/**
 * アクセストークンの有効性チェック
 * @param token - アクセストークン
 * @returns boolean - 有効ならtrue
 */
async function checkTokenValidity(token: string): Promise<boolean> {
  const appId = import.meta.env.FACEBOOK_APP_ID;
  const appSecret = import.meta.env.FACEBOOK_APP_SECRET;

  // App ID/Secretがない場合はトークンチェックをスキップ
  if (!appId || !appSecret) {
    return true;
  }

  try {
    const url = `${GRAPH_API_BASE}/debug_token?input_token=${token}&access_token=${appId}|${appSecret}`;
    const response = await fetch(url);
    const data = await response.json();

    // トークンが無効な場合
    if (data.data?.is_valid === false) {
      return false;
    }

    // 有効期限チェック（14日以内に期限切れなら警告）
    const expiresAt = data.data?.expires_at;
    if (expiresAt) {
      const daysUntilExpiry = (expiresAt * 1000 - Date.now()) / (1000 * 60 * 60 * 24);
      if (daysUntilExpiry < 14) {
        console.warn(`⚠️ Instagram token expires in ${Math.round(daysUntilExpiry)} days. Consider refreshing.`);
      }
    }

    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    // エラー時は処理を続行（トークンチェック失敗でビルドを止めない）
    return true;
  }
}

/**
 * ハッシュタグ抽出
 * @param text - キャプションテキスト
 * @returns string[] - ハッシュタグ配列
 */
function extractHashtags(text: string): string[] {
  const hashtagRegex = /#[^\s#]+/g;
  const matches = text.match(hashtagRegex);
  return matches || [];
}

/**
 * キャプション1行目抽出（タイトル用）
 * @param text - キャプションテキスト
 * @returns string - 1行目テキスト
 */
function extractFirstLine(text: string): string {
  const lines = text.split('\n');
  return lines[0]?.trim() || 'Instagram Post';
}

/**
 * トークン有効期限情報
 */
export interface TokenExpiryInfo {
  isValid: boolean;
  daysRemaining: number;
  expiryDate: Date;
  expiresAt: number;
}

/**
 * トークン有効期限を確認
 * @param token - アクセストークン
 * @param appId - Meta App ID（オプション）
 * @param appSecret - Meta App Secret（オプション）
 * @returns TokenExpiryInfo - トークン有効期限情報
 */
export async function checkTokenExpiry(
  token: string,
  appId?: string,
  appSecret?: string
): Promise<TokenExpiryInfo> {
  const fbAppId = appId || import.meta.env.FACEBOOK_APP_ID;
  const fbAppSecret = appSecret || import.meta.env.FACEBOOK_APP_SECRET;

  if (!fbAppId || !fbAppSecret) {
    console.warn('⚠️ App ID/Secret not provided. Cannot check token expiry.');
    return {
      isValid: true,
      daysRemaining: 60,
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      expiresAt: Math.floor((Date.now() + 60 * 24 * 60 * 60 * 1000) / 1000)
    };
  }

  try {
    const url = `${GRAPH_API_BASE}/debug_token?input_token=${token}&access_token=${fbAppId}|${fbAppSecret}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(`Token debug error: ${data.error.message}`);
    }

    const expiresAt = data.data?.expires_at || 0;
    const expiryDate = new Date(expiresAt * 1000);
    const daysRemaining = Math.floor(
      (expiresAt * 1000 - Date.now()) / (1000 * 60 * 60 * 24)
    );

    return {
      isValid: data.data?.is_valid === true && daysRemaining > 0,
      daysRemaining: Math.max(0, daysRemaining),
      expiryDate,
      expiresAt
    };
  } catch (error) {
    console.error('Token expiry check error:', error);
    // デフォルト値を返す（チェック失敗時も処理を続行）
    return {
      isValid: true,
      daysRemaining: 60,
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      expiresAt: Math.floor((Date.now() + 60 * 24 * 60 * 60 * 1000) / 1000)
    };
  }
}

/**
 * トークンリフレッシュ結果
 */
export interface TokenRefreshResult {
  success: boolean;
  token?: string;
  expiresIn?: number;
  expiryDate?: Date;
  error?: string;
}

/**
 * 長期トークンをリフレッシュ
 * @param token - 現在の長期アクセストークン
 * @returns TokenRefreshResult - リフレッシュ結果
 *
 * 使用例:
 * ```typescript
 * const result = await refreshInstagramToken(currentToken);
 * if (result.success) {
 *   console.log('新しいトークン:', result.token);
 *   console.log('有効期限:', result.expiryDate);
 * } else {
 *   console.error('リフレッシュ失敗:', result.error);
 * }
 * ```
 */
export async function refreshInstagramToken(
  token: string
): Promise<TokenRefreshResult> {
  try {
    const url = `${GRAPH_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;

    const response = await fetch(url);

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP Error: ${response.status} ${response.statusText}`
      };
    }

    const data = await response.json();

    if (data.error) {
      return {
        success: false,
        error: data.error.message || JSON.stringify(data.error)
      };
    }

    if (data.access_token && data.expires_in) {
      const expiryDate = new Date();
      expiryDate.setSeconds(expiryDate.getSeconds() + data.expires_in);

      return {
        success: true,
        token: data.access_token,
        expiresIn: data.expires_in,
        expiryDate
      };
    }

    return {
      success: false,
      error: 'No token in response'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * トークン有効期限をチェックし、必要に応じて警告をログ出力
 * @param token - アクセストークン
 * @param appId - Meta App ID（オプション）
 * @param appSecret - Meta App Secret（オプション）
 */
export async function logTokenExpiryWarning(
  token: string,
  appId?: string,
  appSecret?: string
): Promise<void> {
  try {
    const expiry = await checkTokenExpiry(token, appId, appSecret);

    if (expiry.daysRemaining < 7) {
      console.warn(
        `⚠️ Instagram トークンが ${expiry.daysRemaining} 日で失効します`
      );
      console.warn(`失効予定日: ${expiry.expiryDate.toISOString()}`);
      console.warn(
        'トークンをリフレッシュしてください: https://developers.facebook.com/docs/instagram-api/getting-started'
      );
    } else if (expiry.daysRemaining < 1) {
      console.error('🚨 Instagram トークンが本日中に失効します！');
      console.error('すぐにトークンをリフレッシュしてください');
    } else {
      console.log(`✓ Instagram トークンは有効です(${expiry.daysRemaining}日残り)`);
    }
  } catch (error) {
    console.error('トークン有効期限チェックエラー:', error);
  }
}
