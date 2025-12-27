# Instagram Graph API 移行プラン

**作成日**: 2025-01-24
**ステータス**: 提案
**優先度**: 高
**推定工数**: 8-11時間
**コスト削減**: 年間14,400円

---

## 📋 エグゼクティブサマリー

現在のInstagram RSS連携（RSS.app）は有料プラン必須（$8.32/月）です。Instagram Graph API（完全無料）への移行により、コスト削減・データ品質向上・長期安定性を実現します。

**推奨**: 今すぐ移行すべき

---

## 📊 現状分析

### RSS.appの課題

| 項目 | 詳細 |
|------|------|
| **コスト** | Basicプラン $8.32/月（年間約14,400円） |
| **無料プラン** | Instagram連携不可 |
| **トライアル** | 7日間のみ、その後有料必須 |
| **投稿数制限** | 最新15投稿まで |
| **更新頻度** | 15-60分ごと |
| **データ品質** | HTML/XMLパース必要、不安定 |

### 費用インパクト

```
初年度: $8.32/月 × 12ヶ月 = $99.84 ≈ 14,400円
5年間: 約72,000円
```

---

## 💡 提案: Instagram Graph APIへの移行

### 主要メリット

#### 1. 💰 完全無料
- API利用料: $0
- 年間14,400円の節約
- レート制限: 200リクエスト/時（十分）

#### 2. 🚀 App Review不要
- **重要**: 自社サイトで自社Instagramのみ表示
- 開発モードで使用可能
- 公開アプリではないため審査プロセス不要

#### 3. 📈 データ品質向上
- 公式Meta API
- 構造化JSON（パース不要）
- 画像URL直接取得
- エラー率低減

#### 4. 🔧 機能向上
- 投稿数無制限（ページネーション）
- リアルタイム更新可能
- 詳細データ（いいね数、コメント数）取得可能

### デメリット・対策

| デメリット | 対策 |
|-----------|------|
| セットアップ複雑 | 詳細手順書提供（2-3時間で完了） |
| トークン管理必要 | 自動更新スクリプト + カレンダーリマインダー |
| 60日ごと更新 | 14日前から警告、ワンコマンド更新 |

---

## 🎯 実装計画

### 全体スケジュール

```
フェーズ1: 準備（2-3時間）
    ↓
フェーズ2: Graph API実装（3-4時間）
    ↓
フェーズ3: トークン管理（1-2時間）
    ↓
フェーズ4: 統合・テスト（1-2時間）
    ↓
フェーズ5: デプロイ（0.5時間）
    ↓
完了・運用開始
```

### フェーズ詳細

#### フェーズ1: 準備（クライアント作業）

**所要時間**: 2-3時間
**担当**: クライアント（フジさん）

**タスク:**
1. ✅ Instagram Business/Creatorアカウント化（30分）
   - アカウント設定 → プロフェッショナルアカウントに切り替え
   - タイプ選択: ビジネス or クリエイター

2. ✅ Facebookページ作成・連携（30分）
   - 新規Facebookページ作成（DONATI用）
   - Instagram設定 → リンク済みアカウント → Facebook連携

3. ✅ Meta Developer設定（1時間）
   - Meta Developer登録: https://developers.facebook.com/
   - 新規アプリ作成（タイプ: Business）
   - Instagram Graph API製品追加
   - App ID / App Secret取得

4. ✅ アクセストークン取得（30分）
   - Graph APIエクスプローラーでトークン生成
   - 短期トークン → 長期トークン変換（60日有効）
   - Instagram Business Account ID取得

5. ✅ 動作確認（30分）
   - Graph APIエクスプローラーで投稿取得テスト
   - トークン有効期限確認

**成果物:**
- ✅ Instagram Businessアカウント
- ✅ Facebookページ（Instagram連携済み）
- ✅ Meta Developer App（App ID + Secret）
- ✅ アクセストークン（60日有効）
- ✅ Instagram Business Account ID

---

#### フェーズ2: Graph API実装（エンジニア作業）

**所要時間**: 3-4時間
**担当**: なむ

**タスク:**

1. ✅ `src/lib/instagram-graph-api.ts` 作成（2時間）
   ```typescript
   // 主要機能:
   // - fetchInstagramPosts(): Promise<InstagramPost[]>
   // - checkTokenValidity(): Promise<boolean>
   // - extractHashtags(): string[]
   // - extractFirstLine(): string
   ```

2. ✅ 既存ページ更新（1時間）
   - `src/pages/index.astro` - import変更
   - `src/pages/announcements/[...slug].astro` - import変更
   - `src/config/instagram.ts` - rssUrl削除

3. ✅ 型定義確認（30分）
   - `src/types/instagram.ts` - 変更不要確認
   - Graph APIレスポンス → InstagramPost型マッピング検証

**技術仕様:**

**APIエンドポイント:**
```
GET https://graph.facebook.com/v21.0/{account-id}/media
  ?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url
  &limit=50
  &access_token={token}
```

**レスポンス例:**
```json
{
  "data": [
    {
      "id": "18123456789",
      "caption": "実験ショー\n2025/2/15\n場所:東京科学館\n#donati_event",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/...",
      "permalink": "https://www.instagram.com/p/ABC/",
      "timestamp": "2025-01-24T10:00:00+0000"
    }
  ]
}
```

**データ変換:**
```typescript
Graph API → InstagramPost
{
  id: item.id,
  title: extractFirstLine(item.caption),      // キャプション1行目
  content: item.caption,                      // キャプション全文
  imageUrl: item.media_url,                   // 画像URL（直接取得）
  link: item.permalink,                       // Instagram投稿URL
  pubDate: new Date(item.timestamp),          // 投稿日時
  hashtags: extractHashtags(item.caption)     // ハッシュタグ配列
}
```

---

#### フェーズ3: トークン管理（エンジニア作業）

**所要時間**: 1-2時間
**担当**: なむ

**タスク:**

1. ✅ トークン更新スクリプト作成（1時間）
   ```typescript
   // scripts/refresh-instagram-token.ts
   // - 現在のトークンから新しいトークン生成
   // - 有効期限60日延長
   // - Vercel環境変数更新コマンド出力
   ```

2. ✅ 環境変数設定（30分）
   - ローカル `.env` ファイル作成
   - Vercel環境変数設定（4つ）

**環境変数:**

```env
# Instagram Graph API（秘密情報 - Vercelに設定）
INSTAGRAM_ACCESS_TOKEN=IGQW...           # アクセストークン（60日有効）
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841...   # BusinessアカウントID
FACEBOOK_APP_ID=123456789...             # Meta App ID
FACEBOOK_APP_SECRET=abc123...            # Meta App Secret

# 既存設定（維持）
ANNOUNCEMENT_HASHTAG="#donati_event"
ENABLE_HASHTAG_FILTER=true
```

**トークン更新フロー:**

```
58日後（リマインダー）
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

---

#### フェーズ4: 統合・テスト（エンジニア作業）

**所要時間**: 1-2時間
**担当**: なむ

**テスト項目:**

1. ✅ **ビルドテスト**（30分）
   ```bash
   npm run build
   # 確認ポイント:
   # - 型チェック成功
   # - ビルドエラーなし
   # - Instagram投稿取得成功ログ
   ```

2. ✅ **機能テスト**（30分）
   ```bash
   npm run preview
   # 確認ポイント:
   # - トップページお知らせセクション（4件表示）
   # - ハッシュタグフィルタリング
   # - 画像表示（プロキシ経由）
   # - 詳細ページ生成
   # - Instagramリンク動作
   ```

3. ✅ **エラーハンドリング**（30分）
   ```
   # テストケース:
   # - トークン無効時 → 空配列返却
   # - API失敗時 → エラーログ + 空配列
   # - 投稿0件時 → 「読み込み中...」表示
   # - トークン期限14日前 → 警告ログ
   ```

**テスト結果記録:**
```markdown
## テスト結果

### ビルド
- [ ] 型チェック: ✅ Pass
- [ ] ビルド: ✅ Success
- [ ] 投稿取得: ✅ 4件取得

### 機能
- [ ] トップページ表示: ✅
- [ ] ハッシュタグフィルタ: ✅
- [ ] 画像表示: ✅
- [ ] 詳細ページ: ✅
- [ ] Instagramリンク: ✅

### エラーハンドリング
- [ ] トークン無効: ✅ フォールバック動作
- [ ] API失敗: ✅ エラーログ確認
- [ ] 投稿0件: ✅ メッセージ表示
```

---

#### フェーズ5: デプロイ（エンジニア作業）

**所要時間**: 30分
**担当**: なむ

**手順:**

1. ✅ **Vercel環境変数設定**（15分）
   ```bash
   vercel env add INSTAGRAM_ACCESS_TOKEN production
   vercel env add INSTAGRAM_BUSINESS_ACCOUNT_ID production
   vercel env add FACEBOOK_APP_ID production
   vercel env add FACEBOOK_APP_SECRET production
   vercel env add ANNOUNCEMENT_HASHTAG production
   vercel env add ENABLE_HASHTAG_FILTER production
   ```

2. ✅ **本番デプロイ**（10分）
   ```bash
   git checkout master
   git merge feature/instagram-rss-integration-issue-23
   git push origin master
   # Vercel自動デプロイ
   ```

3. ✅ **本番確認**（5分）
   ```
   確認項目:
   - [ ] お知らせセクション表示
   - [ ] 画像読み込み
   - [ ] 詳細ページアクセス
   - [ ] ビルドログ（エラーなし）
   ```

---

## 📐 技術アーキテクチャ

### ファイル構成

```
src/
├── lib/
│   ├── instagram-graph-api.ts      ← 新規作成
│   ├── announcement-parser.ts      ← 維持（変更なし）
│   ├── instagram-rss.ts            ← 削除予定
│   └── utils/
│       ├── image-extractor.ts      ← 削除予定
│       └── xml-sanitizer.ts        ← 削除予定
├── pages/
│   ├── index.astro                 ← import変更のみ
│   └── announcements/
│       └── [...slug].astro         ← import変更のみ
├── config/
│   └── instagram.ts                ← rssUrl削除
└── types/
    └── instagram.ts                ← 変更なし

scripts/
└── refresh-instagram-token.ts      ← 新規作成

docs/
└── instagram-graph-api-migration-plan.md  ← 本ドキュメント
```

### データフロー

```
ビルド時:
    Instagram Graph API
            ↓
    fetchInstagramPosts()
            ↓
    InstagramPost[] 取得
            ↓
    announcement-parser.ts
            ↓
    ハッシュタグフィルタリング
            ↓
    AnnouncementPost[] 生成
            ↓
    静的HTML生成（SSG）
```

### 既存コンポーネントとの互換性

| コンポーネント | 変更 | 理由 |
|---------------|------|------|
| `AnnouncementCard.astro` | なし | AnnouncementPost型に依存（変更なし） |
| `announcement-parser.ts` | なし | テキストパース処理のみ（入力形式同じ） |
| `src/types/instagram.ts` | なし | InstagramPost型はGraph APIと互換 |
| `src/config/instagram.ts` | 軽微 | rssUrl削除のみ |

---

## 📊 比較分析

### 詳細比較表

| 項目 | RSS.app（現在） | Instagram Graph API（移行後） | 評価 |
|-----|----------------|-------------------------------|------|
| **コスト** | $8.32/月<br>年間14,400円 | **完全無料** | ✅✅✅ |
| **App Review** | 不要 | **不要**（自社のみ） | ✅✅ |
| **セットアップ時間** | 20分 | 2-3時間 | ⚠️ |
| **セットアップ難易度** | 簡単 | やや複雑 | ⚠️ |
| **投稿数制限** | 最新15投稿 | **無制限** | ✅✅✅ |
| **更新頻度** | 15-60分 | **リアルタイム可能** | ✅✅ |
| **メンテナンス** | なし | 60日ごとトークン更新 | ⚠️ |
| **データ品質** | HTMLパース<br>不安定 | **構造化JSON**<br>安定 | ✅✅✅ |
| **パフォーマンス** | XMLパース<br>サニタイズ必要 | **高速JSON**<br>直接使用 | ✅✅✅ |
| **エラー率** | 中（パース失敗） | **低**（公式API） | ✅✅ |
| **長期安定性** | 外部サービス依存<br>仕様変更リスク | **Meta公式API**<br>長期サポート | ✅✅✅ |
| **追加データ** | なし | いいね数、コメント数等 | ✅✅ |
| **依存パッケージ** | rss-parser | **なし**（fetch のみ） | ✅✅ |

### ROI分析（投資対効果）

```
初期投資:
  - セットアップ時間: 2-3時間
  - 実装時間: 6-8時間
  - 合計: 8-11時間

年間コスト削減:
  - RSS.app Basic: 14,400円/年
  - Graph API: 0円/年
  - 削減額: 14,400円/年

投資回収:
  - 時給3,000円換算: 33,000円
  - 回収期間: 約2.3年

5年間の総節約:
  - 72,000円 - 33,000円 = 39,000円
```

### リスク分析

| リスク | 確率 | 影響度 | 対策 |
|-------|------|--------|------|
| トークン更新忘れ | 中 | 高 | カレンダーリマインダー<br>14日前警告ログ |
| Meta API仕様変更 | 低 | 中 | 公式ドキュメント監視<br>長期安定API |
| セットアップ失敗 | 低 | 中 | 詳細手順書<br>サポート体制 |
| トークン取得エラー | 低 | 低 | 詳細トラブルシューティング |

---

## ✅ 実装チェックリスト

### フェーズ1: 準備（ユーザー作業）
- [ ] Instagram Business/Creatorアカウント化
  - [ ] アカウント設定 → プロフェッショナルアカウントに切り替え
  - [ ] タイプ選択: ビジネス
- [ ] Facebookページ作成・Instagram連携
  - [ ] 新規Facebookページ作成
  - [ ] Instagram設定 → リンク済みアカウント → Facebook連携
- [ ] Meta Developer登録・設定
  - [ ] https://developers.facebook.com/ でアカウント作成
  - [ ] 新規アプリ作成（タイプ: Business）
  - [ ] Instagram Graph API製品追加
  - [ ] App ID取得
  - [ ] App Secret取得
- [ ] アクセストークン取得
  - [ ] Graph APIエクスプローラーアクセス
  - [ ] instagram_basic権限選択
  - [ ] トークン生成（短期）
  - [ ] 短期 → 長期トークン変換（60日）
  - [ ] Instagram Business Account ID取得
- [ ] 動作確認
  - [ ] Graph APIエクスプローラーで投稿取得テスト
  - [ ] トークン有効期限確認

### フェーズ2: Graph API実装
- [ ] `src/lib/instagram-graph-api.ts` 作成
  - [ ] fetchInstagramPosts() 実装
  - [ ] checkTokenValidity() 実装
  - [ ] extractHashtags() 実装
  - [ ] extractFirstLine() 実装
  - [ ] エラーハンドリング実装
  - [ ] トークン期限警告ロジック（14日前）
- [ ] ページ更新
  - [ ] `src/pages/index.astro` import変更
  - [ ] `src/pages/announcements/[...slug].astro` import変更
- [ ] 設定更新
  - [ ] `src/config/instagram.ts` rssUrl削除
- [ ] `.env.example` 更新
  - [ ] 新環境変数追加（4つ）
  - [ ] コメント記載

### フェーズ3: トークン管理
- [ ] トークン更新スクリプト作成
  - [ ] `scripts/refresh-instagram-token.ts` 作成
  - [ ] トークン交換API呼び出し実装
  - [ ] エラーハンドリング
  - [ ] Vercel更新コマンド出力
- [ ] package.json更新
  - [ ] `refresh-token` スクリプト追加
  - [ ] tsx 依存関係追加
- [ ] 環境変数設定
  - [ ] ローカル `.env` ファイル作成
  - [ ] 4つの環境変数設定
  - [ ] `.gitignore` 確認（.env含む）
- [ ] Vercel環境変数設定
  - [ ] INSTAGRAM_ACCESS_TOKEN 追加
  - [ ] INSTAGRAM_BUSINESS_ACCOUNT_ID 追加
  - [ ] FACEBOOK_APP_ID 追加
  - [ ] FACEBOOK_APP_SECRET 追加
  - [ ] ANNOUNCEMENT_HASHTAG 追加
  - [ ] ENABLE_HASHTAG_FILTER 追加

### フェーズ4: 統合・テスト
- [ ] ビルドテスト
  - [ ] `npm run build` 成功確認
  - [ ] 型チェック成功
  - [ ] Instagram投稿取得ログ確認
- [ ] 機能テスト
  - [ ] `npm run preview` 起動
  - [ ] トップページお知らせセクション表示（4件）
  - [ ] ハッシュタグフィルタリング動作確認
  - [ ] 画像表示確認（プロキシ経由）
  - [ ] 詳細ページ生成確認
  - [ ] 詳細ページレイアウト確認
  - [ ] Instagramリンク動作確認
- [ ] エラーハンドリング確認
  - [ ] トークン無効時のフォールバック
  - [ ] API呼び出し失敗時のエラーログ
  - [ ] 投稿0件時の表示
  - [ ] トークン期限14日前の警告ログ

### フェーズ5: デプロイ
- [ ] Vercel環境変数最終確認
  - [ ] 本番環境に全変数設定済み
  - [ ] トークン有効期限確認
- [ ] 本番デプロイ
  - [ ] masterブランチにマージ
  - [ ] `git push origin master`
  - [ ] Vercel自動デプロイ確認
- [ ] 本番動作確認
  - [ ] 本番サイトアクセス
  - [ ] お知らせセクション表示確認
  - [ ] 画像読み込み確認
  - [ ] 詳細ページアクセス確認
  - [ ] ビルドログ確認（エラーなし）

### 後処理
- [ ] 旧コード削除
  - [ ] `src/lib/instagram-rss.ts` 削除
  - [ ] `src/lib/utils/image-extractor.ts` 削除
  - [ ] `src/lib/utils/xml-sanitizer.ts` 削除
- [ ] 依存関係クリーンアップ
  - [ ] `npm uninstall rss-parser`
  - [ ] package.json確認
- [ ] ドキュメント作成
  - [ ] セットアップガイド作成
  - [ ] トークン更新ガイド作成
  - [ ] トラブルシューティングガイド作成
- [ ] 運用準備
  - [ ] トークン更新リマインダー設定（58日後）
  - [ ] カレンダーに登録
  - [ ] チーム共有

---

## 📚 参考資料

### Meta公式ドキュメント

#### Instagram Graph API
- [Overview](https://developers.facebook.com/docs/instagram-api/)
- [Getting Started](https://developers.facebook.com/docs/instagram-api/getting-started)
- [Reference](https://developers.facebook.com/docs/instagram-api/reference)

#### アクセストークン
- [Long-Lived Access Tokens](https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens)
- [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)

#### API仕様
- [User Media](https://developers.facebook.com/docs/instagram-api/reference/ig-user/media)
- [Rate Limits](https://developers.facebook.com/docs/graph-api/overview/rate-limiting)

### 開発ツール
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Meta Developer Dashboard](https://developers.facebook.com/apps/)

### セットアップガイド
- [Instagram Business Account Setup](https://help.instagram.com/502981923235522)
- [Facebook Page Creation](https://www.facebook.com/pages/creation/)

---

## 🎯 推奨事項と次のステップ

### 即座に移行すべき理由

1. **コスト削減**
   - 年間14,400円の節約
   - 5年間で72,000円の節約
   - 初期投資は2.3年で回収

2. **データ品質向上**
   - Meta公式API（安定・高速）
   - 構造化JSON（パース不要）
   - エラー率低減

3. **長期安定性**
   - Meta長期サポート
   - 仕様変更リスク低
   - 外部サービス依存解消

4. **App Review不要**
   - 自社サイト限定使用
   - 開発モードで運用可能
   - 審査プロセスなし

### 次のステップ

#### 1. 承認・決定（1日）
- [ ] この提案をレビュー
- [ ] 関係者承認
- [ ] 実装開始日決定

#### 2. フェーズ1開始（2-3時間）
- [ ] クライアント（フジさん）への手順共有
- [ ] Instagram Business化
- [ ] Meta Developer設定
- [ ] トークン取得

#### 3. フェーズ2-5実行（6-8時間）
- [ ] エンジニア（なむ）実装
- [ ] テスト・デプロイ
- [ ] ドキュメント作成

#### 4. 運用開始
- [ ] トークン更新リマインダー設定
- [ ] チームへの共有
- [ ] モニタリング開始

---

## 📞 サポート・問い合わせ

### 技術サポート
- エンジニア: なむ
- Meta Developer Support: https://developers.facebook.com/support/

### ドキュメント
- プロジェクトREADME: `README.md`
- セットアップガイド: 作成予定
- トラブルシューティング: 作成予定

---

**作成者**: Claude (AI Assistant)
**レビュー**: 未
**承認**: 未
**最終更新**: 2025-01-24
