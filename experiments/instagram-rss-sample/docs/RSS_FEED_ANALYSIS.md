# RSS フィード分析レポート

## 📊 現状の問題

RSS.appの無料プランでは、デフォルトで**最新5投稿**のみが取得可能という制限があるようです。

## 🔍 RSS.app の制限事項

### 無料プラン
- 最新5-10投稿まで
- 更新頻度：数時間ごと
- カスタマイズ：限定的

### 有料プラン（推測）
- より多くの投稿数（20-50件）
- リアルタイム更新
- フィルタリング機能

## 💡 投稿数を増やす方法

### 1. **RSS.app の設定確認**
RSS.appのダッシュボードで以下を確認：
- フィード設定に「投稿数」のオプションがあるか
- URLパラメータで制御可能か（例：`?limit=20`）

### 2. **代替RSSサービスの検討**

#### a) **Zapier + RSS by Zapier**
```
Instagram → Zapier → RSS Feed
```
- 投稿数：最大100件まで設定可能
- 料金：無料プランで月100タスクまで

#### b) **IFTTT (If This Then That)**
```
Instagram → IFTTT → RSS Feed
```
- 投稿数：最大50件
- 料金：無料プランあり

#### c) **RSSHub（セルフホスト）**
```javascript
// 自前でRSSHub をホストする場合
const rsshubUrl = 'https://your-rsshub.com/instagram/user/donati_science';
```
- 投稿数：制限なし
- 料金：サーバー費用のみ

### 3. **Instagram Graph API（推奨）**

最も確実な方法は、Instagram Graph APIを直接使用すること：

```typescript
// src/lib/instagram-api.ts
export async function fetchInstagramPostsViaAPI(accessToken: string) {
  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=${accessToken}`
  );
  const data = await response.json();
  return data.data; // 最大25投稿を取得可能
}
```

**メリット**：
- 最大25投稿/リクエスト
- ページネーション対応で無制限に取得可能
- リアルタイム更新
- 追加情報（いいね数、コメント等）も取得可能

**必要なもの**：
1. Facebook Developer アカウント
2. Instagram Business アカウント
3. アクセストークンの取得

## 🚀 推奨アクション

### 短期的解決策（すぐに実装可能）

1. **複数のハッシュタグで運用**
```env
ANNOUNCEMENT_HASHTAGS="#こみかる,#こみかる2024,#こみかるイベント"
```

2. **キャッシュとデータ結合**
```typescript
// 過去のデータをローカルに保存し、新しいデータと結合
const cachedPosts = await loadCachedPosts();
const newPosts = await fetchInstagramPosts(rssUrl);
const allPosts = mergePosts(cachedPosts, newPosts);
```

### 中長期的解決策（推奨）

1. **Instagram Graph API の導入**
   - 投稿数制限なし
   - より詳細なデータ取得
   - 公式サポート

2. **ハイブリッドアプローチ**
   - RSS：簡易更新用
   - API：定期的な全件取得用

## 📝 実装例：投稿数を最大化する

```typescript
// src/lib/instagram-enhanced.ts
export async function fetchAllInstagramPosts(): Promise<InstagramPost[]> {
  const sources = [
    // RSS フィード
    { type: 'rss', url: process.env.INSTAGRAM_RSS_URL },
    // 追加のRSSフィード（別サービス）
    { type: 'rss', url: process.env.INSTAGRAM_RSS_URL_2 },
    // キャッシュデータ
    { type: 'cache', path: './cache/instagram-posts.json' }
  ];
  
  const allPosts = await Promise.all(
    sources.map(source => fetchFromSource(source))
  );
  
  // 重複を除去してマージ
  return deduplicatePosts(allPosts.flat());
}
```

## 🎯 結論

現在のRSS.appの5投稿制限を回避するには：

1. **即座の対応**：RSS.appの設定を確認し、投稿数オプションを探す
2. **短期対応**：複数のRSSサービスを併用
3. **長期対応**：Instagram Graph APIへの移行

4つの告知を確実に表示するためには、Instagram Graph APIの導入が最も確実な解決策です。