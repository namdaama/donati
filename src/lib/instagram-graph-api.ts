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
