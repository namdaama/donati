# Instagram Graph API移行 - 設計

**作成日**: 2025-01-24
**前提**: `.claude_workflow/requirements.md`を読み込み済み
**ステータス**: 設計中

---

## 1. システムアーキテクチャ

### 全体構成

```
┌─────────────────────────────────────────────────┐
│         Astro SSG (ビルド時実行)                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────────────────────────────┐      │
│  │  index.astro / announcements/[slug]  │      │
│  └──────────┬───────────────────────────┘      │
│             │                                   │
│             ▼                                   │
│  ┌──────────────────────────────────────┐      │
│  │  instagram-graph-api.ts              │      │
│  │  - fetchInstagramPosts()             │      │
│  │  - checkTokenValidity()              │      │
│  └──────────┬───────────────────────────┘      │
│             │                                   │
│             ▼                                   │
│  ┌──────────────────────────────────────┐      │
│  │  Instagram Graph API                 │      │
│  │  GET /v21.0/{id}/media               │      │
│  └──────────┬───────────────────────────┘      │
│             │                                   │
│             ▼                                   │
│  ┌──────────────────────────────────────┐      │
│  │  InstagramPost[] 返却                │      │
│  └──────────┬───────────────────────────┘      │
│             │                                   │
│             ▼                                   │
│  ┌──────────────────────────────────────┐      │
│  │  announcement-parser.ts              │      │
│  │  - filterAnnouncementPosts()         │      │
│  │  - parseAnnouncementPost()           │      │
│  └──────────┬───────────────────────────┘      │
│             │                                   │
│             ▼                                   │
│  ┌──────────────────────────────────────┐      │
│  │  AnnouncementPost[] 生成             │      │
│  └──────────┬───────────────────────────┘      │
│             │                                   │
│             ▼                                   │
│  ┌──────────────────────────────────────┐      │
│  │  静的HTML生成 (SSG)                  │      │
│  └──────────────────────────────────────┘      │
│                                                 │
└─────────────────────────────────────────────────┘
```

### データフロー

```
ビルド時:
  1. Astroページコンポーネント読み込み
  2. fetchInstagramPosts() 呼び出し
     ↓
  3. トークン有効性チェック
     ↓
  4. Graph API呼び出し
     ↓
  5. InstagramPost型に変換
     ↓
  6. announcement-parser でフィルタリング
     ↓
  7. AnnouncementPost[] 生成
     ↓
  8. 静的HTML生成
```

---

## 2. ファイル構成

### 新規作成ファイル

```
src/lib/instagram-graph-api.ts         # Graph APIクライアント
scripts/refresh-instagram-token.ts     # トークン更新スクリプト
```

### 更新ファイル

```
src/pages/index.astro                  # import変更のみ
src/pages/announcements/[...slug].astro # import変更のみ
src/config/instagram.ts                # rssUrl削除
.env.example                           # 環境変数追加
package.json                           # refresh-tokenスクリプト追加
```

### 維持ファイル（変更なし）

```
src/lib/announcement-parser.ts         # テキストパース（再利用）
src/components/AnnouncementCard.astro  # UI表示
src/types/instagram.ts                 # 型定義
```

### 削除ファイル（移行完了後）

```
src/lib/instagram-rss.ts               # RSS取得（不要）
src/lib/utils/image-extractor.ts       # RSS専用（不要）
src/lib/utils/xml-sanitizer.ts         # RSS専用（不要）
```

---

## 3. API設計

### 3.1 instagram-graph-api.ts

#### 主要関数

```typescript
/**
 * Instagram Graph APIで投稿取得
 * @returns InstagramPost[] - 画像投稿のみ、最大50件
 */
export async function fetchInstagramPosts(): Promise<InstagramPost[]>

/**
 * アクセストークンの有効性チェック
 * @param token - アクセストークン
 * @returns boolean - 有効ならtrue
 */
async function checkTokenValidity(token: string): Promise<boolean>

/**
 * ハッシュタグ抽出
 * @param text - キャプションテキスト
 * @returns string[] - ハッシュタグ配列
 */
function extractHashtags(text: string): string[]

/**
 * キャプション1行目抽出（タイトル用）
 * @param text - キャプションテキスト
 * @returns string - 1行目テキスト
 */
function extractFirstLine(text: string): string
```

#### Graph API仕様

**エンドポイント:**
```
GET https://graph.facebook.com/v21.0/{account-id}/media
```

**パラメータ:**
```
fields: id,caption,media_type,media_url,permalink,timestamp,thumbnail_url
limit: 50
access_token: {INSTAGRAM_ACCESS_TOKEN}
```

**レスポンス型:**
```typescript
interface GraphAPIMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

interface GraphAPIResponse {
  data: GraphAPIMedia[];
  paging?: {
    cursors: { before: string; after: string };
    next?: string;
  };
}
```

#### データ変換マッピング

```typescript
Graph API → InstagramPost
{
  id: item.id,                          // そのまま
  title: extractFirstLine(item.caption), // キャプション1行目
  content: item.caption || '',           // キャプション全文
  imageUrl: item.media_url || '',        // 画像URL
  link: item.permalink,                  // Instagram投稿URL
  pubDate: new Date(item.timestamp),     // ISO文字列→Date
  hashtags: extractHashtags(item.caption) // 正規表現で抽出
}
```

### 3.2 トークン管理API

#### debug_token API

**エンドポイント:**
```
GET https://graph.facebook.com/v21.0/debug_token
  ?input_token={ACCESS_TOKEN}
  &access_token={APP_ID}|{APP_SECRET}
```

**レスポンス:**
```typescript
{
  data: {
    is_valid: boolean;
    expires_at: number;  // Unixタイムスタンプ
  }
}
```

#### トークン更新API

**エンドポイント:**
```
GET https://graph.facebook.com/v21.0/oauth/access_token
  ?grant_type=fb_exchange_token
  &client_id={APP_ID}
  &client_secret={APP_SECRET}
  &fb_exchange_token={CURRENT_TOKEN}
```

**レスポンス:**
```typescript
{
  access_token: string;
  expires_in: number;  // 秒（約5184000 = 60日）
}
```

---

## 4. 環境変数設計

### 新規環境変数

```env
# Instagram Graph API（秘密情報 - Vercelに設定）
INSTAGRAM_ACCESS_TOKEN=IGQW...           # 長期トークン（60日有効）
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841...   # BusinessアカウントID
FACEBOOK_APP_ID=123456789...             # Meta App ID
FACEBOOK_APP_SECRET=abc123...            # Meta App Secret

# 既存設定（維持）
ANNOUNCEMENT_HASHTAG="#donati_event"     # フィルタ用ハッシュタグ
ENABLE_HASHTAG_FILTER=true               # フィルタ有効化
```

### 環境変数使用箇所

```typescript
// src/lib/instagram-graph-api.ts
const accessToken = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
const accountId = import.meta.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
const appId = import.meta.env.FACEBOOK_APP_ID;
const appSecret = import.meta.env.FACEBOOK_APP_SECRET;

// src/config/instagram.ts
const announcementHashtag = import.meta.env.ANNOUNCEMENT_HASHTAG || '#donati_event';
const enableHashtagFilter = import.meta.env.ENABLE_HASHTAG_FILTER !== 'false';
```

---

## 5. エラーハンドリング設計

### エラーケースと対応

| エラーケース | 検出方法 | 処理 | ログ |
|------------|---------|------|------|
| 環境変数未設定 | 変数チェック | 空配列返却 | `console.error('Missing INSTAGRAM_ACCESS_TOKEN')` |
| トークン無効 | `debug_token` API | 空配列返却 | `console.warn('Token is expired or invalid')` |
| トークン期限14日以内 | `expires_at`計算 | 処理続行 | `console.warn('Token expires in X days')` |
| API呼び出し失敗 | fetch error | 空配列返却 | `console.error('Graph API Error:', error)` |
| ネットワークエラー | fetch reject | 空配列返却 | `console.error('Network error:', error)` |

### エラー処理フロー

```typescript
export async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  // 1. 環境変数チェック
  if (!accessToken || !accountId) {
    console.error('Missing required environment variables');
    return [];
  }

  try {
    // 2. トークン有効性チェック
    const isValid = await checkTokenValidity(accessToken);
    if (!isValid) {
      console.warn('⚠️ Instagram access token is expired or invalid!');
      return [];
    }

    // 3. API呼び出し
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Graph API Error:', errorData);
      return [];
    }

    // 4. データ変換
    return data.data.map(/* ... */);

  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
}
```

---

## 6. トークン管理戦略

### 管理方針

1. **手動更新**: 60日ごとに手動でトークン更新（自動化は複雑なため見送り）
2. **事前警告**: 14日前からビルド時に警告ログ表示
3. **更新スクリプト**: ワンコマンドで更新可能なスクリプト提供
4. **リマインダー**: カレンダーに58日後のリマインダー設定

### トークン更新フロー

```
58日後（リマインダー通知）
    ↓
npm run refresh-token 実行
    ↓
新しいトークン出力
    ↓
Vercel環境変数更新
vercel env rm INSTAGRAM_ACCESS_TOKEN production
vercel env add INSTAGRAM_ACCESS_TOKEN production
    ↓
完了（次回60日後）
```

### refresh-instagram-token.ts 設計

```typescript
/**
 * 現在のトークンから新しい長期トークンを生成
 *
 * 実行方法:
 * npm run refresh-token
 *
 * 出力:
 * - 新しいアクセストークン
 * - 有効期限（日数）
 * - Vercel更新コマンド
 */
async function refreshToken() {
  const APP_ID = process.env.FACEBOOK_APP_ID;
  const APP_SECRET = process.env.FACEBOOK_APP_SECRET;
  const CURRENT_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

  // トークン交換API呼び出し
  const url = `https://graph.facebook.com/v21.0/oauth/access_token?...`;
  const response = await fetch(url);
  const data = await response.json();

  // 結果出力
  console.log('✅ New access token generated:');
  console.log(data.access_token);
  console.log('\nExpires in:', Math.round(data.expires_in / 86400), 'days');
  console.log('\n🔧 Update Vercel environment variable:');
  console.log('vercel env add INSTAGRAM_ACCESS_TOKEN production');
}
```

---

## 7. 既存コードとの互換性

### 型定義の互換性

```typescript
// src/types/instagram.ts（変更なし）
interface InstagramPost {
  id: string;
  title: string;        // Graph API: caption 1行目
  content: string;      // Graph API: caption 全文
  imageUrl: string;     // Graph API: media_url
  link: string;         // Graph API: permalink
  pubDate: Date;        // Graph API: timestamp
  hashtags: string[];   // Graph API: caption から抽出
}

// AnnouncementPost も変更なし
interface AnnouncementPost extends InstagramPost {
  category: 'event' | 'news' | 'workshop';
  eventDate?: Date;
  location?: string;
}
```

### コンポーネントの互換性

```typescript
// src/components/AnnouncementCard.astro
// Props: AnnouncementPost
// → 変更不要（型が同じため）

// src/lib/announcement-parser.ts
// Input: InstagramPost[]
// Output: AnnouncementPost[]
// → 変更不要（入力型が同じため）
```

### ページの変更点

```typescript
// src/pages/index.astro
// Before:
import { fetchInstagramPosts } from '../lib/instagram-rss';
const posts = await fetchInstagramPosts(instagramConfig.rssUrl);

// After:
import { fetchInstagramPosts } from '../lib/instagram-graph-api';
const posts = await fetchInstagramPosts();
```

---

## 8. 設定ファイル更新

### src/config/instagram.ts

```typescript
// 削除:
// rssUrl: import.meta.env.INSTAGRAM_RSS_URL

// 維持:
export const instagramConfig = {
  announcementHashtag: import.meta.env.ANNOUNCEMENT_HASHTAG || '#donati_event',
  enableHashtagFilter: import.meta.env.ENABLE_HASHTAG_FILTER !== 'false',
  maxDisplayPosts: 4,

  // 画像プロキシ設定（維持 - Graph APIでも使用可能）
  imageProxy: {
    baseUrl: 'https://images.weserv.nl/',
    defaultWidth: 400,
    defaultHeight: 400,
    fit: 'cover',
  },
} as const;
```

---

## 9. パフォーマンス設計

### 目標

- ビルド時間増加: +10%以内
- API呼び出し時間: < 2秒

### 最適化戦略

1. **JSONダイレクト**: XMLパース不要（RSS比で高速）
2. **取得件数制限**: limit=50（必要以上に取得しない）
3. **並列処理なし**: トークンチェック→API呼び出しは直列（シンプル優先）
4. **キャッシュなし**: ビルド時のみ呼び出しのため不要

---

## 10. セキュリティ設計

### 秘密情報の管理

1. **環境変数**: すべての秘密情報を環境変数化
2. **.env除外**: `.gitignore`に`.env`を含める（確認済み）
3. **Vercel管理**: 本番環境はVercel環境変数で管理
4. **PUBLIC_なし**: クライアント側には公開しない（ビルド時のみ）

### アクセス制御

- **開発モード**: Meta Developer Appは開発モードで運用
- **自社限定**: 自社Instagramアカウントのみアクセス
- **App Review不要**: 公開アプリではないため

---

**次のステップ**: タスク化フェーズに進む