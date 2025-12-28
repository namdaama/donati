# Instagram Graph API クイックリファレンス

**最終更新日**: 2025年12月28日
**対象**: Meta Developer - Instagram Graph API 実装者向け

---

## よく使うコマンド・URL

### Meta Developer ダッシュボード

| 操作 | URL |
|---|---|
| **My Apps** | https://developers.facebook.com/apps |
| **Graph API Explorer** | https://developers.facebook.com/tools/explorer/ |
| **App Settings** | https://developers.facebook.com/apps/[APP_ID]/settings/basic |
| **Token Debug** | https://developers.facebook.com/tools/debug/accesstoken/ |

### Instagram ビジネスアカウント管理

| 操作 | URL |
|---|---|
| **Meta Business Suite** | https://business.instagram.com |
| **Accounts Center** | https://accountscenter.instagram.com |
| **Settings** | https://instagram.com/settings/account |

---

## API エンドポイント一覧

### 基本情報

```
API Version: v19.0 (または最新版)
Base URL: https://graph.instagram.com/v19.0
Authentication: access_token parameter
```

### よく使うエンドポイント

#### 1. メディア取得

```bash
GET /v19.0/{INSTAGRAM_BUSINESS_ACCOUNT_ID}/media
  ?fields=id,caption,media_type,media_url,timestamp,permalink
  &limit=50
  &access_token={TOKEN}
```

**フィールド** (使用可能):
- `id` - メディア ID
- `caption` - キャプション
- `media_type` - IMAGE/VIDEO/CAROUSEL_ALBUM
- `media_url` - メディア URL
- `thumbnail_url` - サムネイル URL
- `timestamp` - 投稿日時
- `permalink` - Instagram 投稿へのリンク
- `like_count` - いいね数
- `comments_count` - コメント数

#### 2. メディアインサイト

```bash
GET /v19.0/{MEDIA_ID}/insights
  ?metric=engagement,impressions,reach,saved
  &access_token={TOKEN}
```

**メトリクス** (使用可能):
- `engagement` - エンゲージメント数
- `impressions` - インプレッション数
- `reach` - リーチ数
- `saved` - 保存数

#### 3. アカウントインサイト

```bash
GET /v19.0/{INSTAGRAM_BUSINESS_ACCOUNT_ID}/insights
  ?metric=impressions,reach,profile_views,follower_count,website_clicks
  &access_token={TOKEN}
```

#### 4. ハッシュタグ検索

```bash
GET /v19.0/ig_hashtag_search
  ?user_id={INSTAGRAM_BUSINESS_ACCOUNT_ID}
  &search_string=donati_event
  &fields=id,name
  &access_token={TOKEN}
```

#### 5. ハッシュタグ付きメディア取得

```bash
GET /v19.0/{HASHTAG_ID}/recent_media
  ?user_id={INSTAGRAM_BUSINESS_ACCOUNT_ID}
  &fields=id,caption,media_type,media_url,timestamp,permalink
  &limit=50
  &access_token={TOKEN}
```

#### 6. トークンデバッグ

```bash
GET /v19.0/debug_token
  ?input_token={TOKEN}
  &access_token={APP_ID}|{APP_SECRET}
```

#### 7. トークンリフレッシュ

```bash
GET /v19.0/refresh_access_token
  ?grant_type=ig_refresh_token
  &access_token={LONG_LIVED_TOKEN}
```

---

## 環境変数の一覧

### 必須変数

```env
# Instagram ビジネスアカウント ID
INSTAGRAM_BUSINESS_ACCOUNT_ID=123456789

# 長期アクセストークン
INSTAGRAM_ACCESS_TOKEN=IGQVJVcW5Qal93X...
```

### 推奨される追加設定

```env
# Meta App（デバッグ・リフレッシュ用）
FACEBOOK_APP_ID=1234567890
FACEBOOK_APP_SECRET=abc123...

# トークンリフレッシュ情報
INSTAGRAM_TOKEN_REFRESH_DATE=2025-01-28
INSTAGRAM_TOKEN_EXPIRY_DATE=2025-03-29

# 表示設定
ANNOUNCEMENT_HASHTAG=#donati_event
ENABLE_HASHTAG_FILTER=true
```

---

## TypeScript コード例

### 1. 最近の投稿を取得

```typescript
import { fetchInstagramPosts } from '@/lib/instagram-graph-api';

async function displayRecentPosts() {
  const posts = await fetchInstagramPosts();
  posts.forEach(post => {
    console.log(`${post.pubDate}: ${post.title}`);
    console.log(`  ${post.link}`);
  });
}
```

### 2. トークン有効期限をチェック

```typescript
import { checkTokenExpiry } from '@/lib/instagram-graph-api';

async function checkToken() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;

  const expiry = await checkTokenExpiry(token, appId, appSecret);

  if (expiry.daysRemaining < 7) {
    console.warn(`⚠️ Token expires in ${expiry.daysRemaining} days`);
  }
}
```

### 3. トークンをリフレッシュ

```typescript
import { refreshInstagramToken } from '@/lib/instagram-graph-api';

async function refreshToken() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const result = await refreshInstagramToken(token);

  if (result.success) {
    console.log('✓ Token refreshed:', result.token);
    console.log('Expires:', result.expiryDate);
    // 新しいトークンを .env に保存
  } else {
    console.error('✗ Refresh failed:', result.error);
  }
}
```

### 4. ハッシュタグ付き投稿を取得（実装例）

```typescript
import { InstagramGraphAPI } from '@/lib/instagram-graph-api';

const api = new InstagramGraphAPI({
  businessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || '',
  accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || ''
});

async function getHashtagPosts() {
  // ハッシュタグ ID を取得
  const hashtagId = await api.searchHashtag('donati_event');

  if (hashtagId) {
    // ハッシュタグ付き投稿を取得
    const media = await api.getHashtagMedia(hashtagId, 9);
    return media;
  }

  return [];
}
```

---

## cURL コマンド例

### メディア一覧取得

```bash
curl -X GET \
  "https://graph.instagram.com/v19.0/{INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,timestamp,permalink&limit=9&access_token={TOKEN}"
```

### トークンデバッグ

```bash
curl -X GET \
  "https://graph.instagram.com/v19.0/debug_token?input_token={TOKEN}&access_token={APP_ID}|{APP_SECRET}"
```

### トークンリフレッシュ

```bash
curl -X GET \
  "https://graph.instagram.com/v19.0/refresh_access_token?grant_type=ig_refresh_token&access_token={LONG_LIVED_TOKEN}"
```

---

## エラー対応表

### よくあるエラーと対応

| エラーメッセージ | 原因 | 対応 |
|---|---|---|
| `Invalid OAuth access token` | トークンが無効/失効 | トークンをリフレッシュまたは新規取得 |
| `invalid_access_token` | トークンが存在しない | 正しいトークンを確認 |
| `(#100) Unsupported get request` | エンドポイントが違う | API パスを確認 |
| `error_code: 190` | トークン期限切れ | セクション 9 でリフレッシュ |
| `(#803) Some of the aliases you requested do not exist` | アカウント ID が違う | Business Account ID を確認 |
| `Rate limit exceeded` | 1 時間に 200 リクエスト超過 | キャッシング実装やリクエスト削減 |
| `Permissions error` | 権限が足りない | App に正しい permissions を追加 |

---

## Rate Limiting 対策

### デフォルト制限

- **200 リクエスト/時間** per Instagram Business Account
- **2,000 リクエスト/時間** with 10+ connected accounts

### 対策方法

```typescript
// キャッシング（1時間）
const cache = new Map<string, any>();
const CACHE_DURATION = 3600000; // 1時間

async function getMediaCached(id: string) {
  const cached = cache.get(id);
  if (cached && Date.now() - cached.time < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetchMedia(id);
  cache.set(id, { data, time: Date.now() });
  return data;
}
```

```typescript
// リクエストカウンター
class RateLimiter {
  private count = 0;
  private hourStart = Date.now();
  private maxPerHour = 200;

  canMakeRequest(): boolean {
    const elapsed = Date.now() - this.hourStart;
    if (elapsed > 3600000) {
      this.hourStart = Date.now();
      this.count = 0;
    }
    return this.count < this.maxPerHour;
  }

  recordRequest() {
    this.count++;
  }
}
```

---

## トークン有効期限チェック

### スケジュール

```
Day 1:    新トークン取得（60日有効）
Day 50:   リフレッシュ実行（新しい60日カウント開始）
Day 100:  リフレッシュ実行
Day 150:  リフレッシュ実行
...
```

### デバッグツール

**Token Debug Tool**: https://developers.facebook.com/tools/debug/accesstoken/

1. Token を入力
2. 「Debug Token」をクリック
3. 有効性と有効期限を確認

---

## GitHub Actions での自動リフレッシュ

### テンプレート

```yaml
name: Refresh Instagram Token

on:
  schedule:
    # 毎月 1 日の UTC 00:00 に実行
    - cron: '0 0 1 * *'
  workflow_dispatch:

jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Refresh Token
        run: |
          curl -X GET \
            "https://graph.instagram.com/v19.0/refresh_access_token?grant_type=ig_refresh_token&access_token=${{ secrets.INSTAGRAM_ACCESS_TOKEN }}" \
            | jq -r '.access_token'

      - name: Update Secret
        run: |
          # Vercel CLI で環境変数を更新
          npx vercel env set INSTAGRAM_ACCESS_TOKEN $NEW_TOKEN
```

---

## セキュリティチェックリスト

実装前に以下を確認:

- [ ] App Secret を `.env.local` または Vercel Environment Variables に設定
- [ ] App Secret を GitHub にコミットしていない
- [ ] トークンを `.env` ファイルに記載（GitHub 除外）
- [ ] HTTPS 通信のみでトークンを送信
- [ ] トークン有効期限を 50-55 日ごとにリフレッシュ
- [ ] トークンリフレッシュ失敗時の対応手順を記録

---

## よくある質問

### Q: トークンの有効期限は？

A: **60日間**です。60日以上使用しないと自動失効し、リフレッシュ不可になります。50-55日ごとのリフレッシュを推奨します。

### Q: 短期トークンと長期トークンの違いは？

A: 短期トークンは数時間で失効、長期トークンは60日有効です。本番運用には長期トークンが必須です。

### Q: トークンをリセットできますか？

A: 新しいトークンを取得できます。セクション 7.1 を参照。古いトークンは自動的に無効になります。

### Q: Rate Limit に達したら？

A: 1時間待機するか、キャッシング・Webhook導入でリクエスト削減します。

### Q: トークンが失効したら？

A: リフレッシュを試行。失敗なら新規取得（セクション 7.1）。

---

## 参考資料

- [Meta Developer - Instagram Graph API](https://developers.facebook.com/docs/instagram-api/)
- [Meta Access Tokens](https://developers.facebook.com/docs/facebook-login/access-tokens)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- **セットアップ完全ガイド**: docs/04-workflow-collaboration/Meta-Developer-Instagram-Graph-API-Setup-Guide.md

---

## 連絡先・サポート

問題が発生した場合:

1. **クイックリファレンス**: このファイルのエラー対応表を確認
2. **セットアップガイド**: Meta-Developer-Instagram-Graph-API-Setup-Guide.md を参照
3. **Meta Support**: https://www.facebook.com/help/contact/
4. **プロジェクトチーム**: namdaama (エンジニア)

---

**最終更新**: 2025年12月28日
