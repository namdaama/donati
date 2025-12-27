# Instagram RSS連携をGraph APIに移行（コスト削減・品質向上）

## 📋 背景・課題

現在のPR #23では、Instagram RSS連携にRSS.appを使用していますが、以下の問題があります：

### RSS.appの制約
- **無料プランではInstagram連携不可**
- **Basicプラン必須**: $8.32/月（約1,200円/月）
- **7日間トライアル**: 期限後は有料プラン契約が必須
- **投稿数制限**: 最新15投稿まで
- **更新頻度**: 15-60分ごと

### 費用インパクト
- **年間コスト**: 約14,400円
- **無料枠のみでの運用不可**

---

## 💡 提案する解決策

**Instagram Graph APIへの移行** - 完全無料・高品質・安定運用

### メリット

#### 1. コスト削減
- **完全無料**: API利用料 $0
- **年間14,400円の節約**

#### 2. App Review不要
- 自社サイトで自社Instagramのみ表示
- 開発モードで使用可能
- 公開アプリではないため審査不要

#### 3. データ品質向上
- 公式API: 構造化JSON
- 画像URL直接取得（パース不要）
- 安定したデータ取得

#### 4. 機能向上
- **投稿数無制限**（ページネーション対応）
- **リアルタイム更新可能**
- いいね数・コメント数も取得可能

### デメリット

1. **セットアップやや複雑**: Meta Developer設定が必要（初回のみ2-3時間）
2. **トークン管理**: 60日ごとに手動更新が必要（カレンダーリマインダーで対応）

---

## 🎯 実装計画

### 全体所要時間: 8-11時間

| フェーズ | 担当 | 所要時間 | 内容 |
|---------|------|---------|------|
| フェーズ1: 準備 | クライアント | 2-3時間 | Instagram Business化、Facebook連携、Meta Developer設定 |
| フェーズ2: Graph API実装 | エンジニア | 3-4時間 | `instagram-graph-api.ts`作成、既存コード更新 |
| フェーズ3: トークン管理 | エンジニア | 1-2時間 | トークン更新スクリプト、環境変数設定 |
| フェーズ4: 統合・テスト | エンジニア | 1-2時間 | ビルド・機能・エラーハンドリングテスト |
| フェーズ5: デプロイ | エンジニア | 0.5時間 | Vercel環境変数設定、本番デプロイ |

---

## 📐 技術仕様

### 新規作成ファイル

#### `src/lib/instagram-graph-api.ts`
```typescript
// Instagram Graph APIクライアント
// - 投稿取得（最大50件/リクエスト）
// - トークン有効性チェック（14日前から警告）
// - InstagramPost型への変換
```

### 更新ファイル

- `src/pages/index.astro` - import変更のみ
- `src/pages/announcements/[...slug].astro` - import変更のみ
- `src/config/instagram.ts` - rssUrl削除

### 削除ファイル（移行完了後）

- `src/lib/instagram-rss.ts`
- `src/lib/utils/image-extractor.ts`
- `src/lib/utils/xml-sanitizer.ts`
- 依存パッケージ: `rss-parser`

### 環境変数（新規）

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

### トークン管理戦略

#### 長期トークン（60日有効）
- ビルド時に有効期限チェック
- 14日前から警告ログ表示
- 60日ごとに手動更新（スクリプト提供）

#### トークン更新スクリプト
```bash
npm run refresh-token
# → 新しいトークンを出力
# → Vercel環境変数を更新
```

---

## 📊 比較表: RSS.app vs Graph API

| 項目 | RSS.app（現在） | Graph API（移行後） |
|-----|----------------|-------------------|
| **コスト** | $8.32/月（年間14,400円） | **完全無料** ✅ |
| **App Review** | 不要 | **不要**（自社のみ使用） ✅ |
| **セットアップ** | 簡単（3ステップ） | やや複雑（7ステップ） |
| **投稿数** | 最新15投稿 | **無制限** ✅ |
| **更新頻度** | 15-60分 | **リアルタイム可能** ✅ |
| **メンテナンス** | なし | 60日ごとトークン更新 |
| **データ品質** | HTMLパース必要 | **構造化JSON** ✅ |
| **パフォーマンス** | XMLパース | **高速JSON** ✅ |
| **長期安定性** | 外部サービス依存 | **Meta公式API** ✅ |

---

## ✅ 実装チェックリスト

### フェーズ1: 準備（ユーザー作業）
- [ ] Instagram Business/Creatorアカウント化
- [ ] Facebookページ作成・Instagram連携
- [ ] Meta Developer登録
- [ ] Meta App作成（タイプ: Business）
- [ ] Instagram Graph API製品追加
- [ ] Graph APIエクスプローラーでトークン生成
- [ ] 短期トークン → 長期トークン変換
- [ ] Instagram Business Account ID取得
- [ ] 動作確認（Graph APIエクスプローラーでテスト）

### フェーズ2: Graph API実装
- [ ] `src/lib/instagram-graph-api.ts` 作成
- [ ] `src/pages/index.astro` 更新
- [ ] `src/pages/announcements/[...slug].astro` 更新
- [ ] `src/config/instagram.ts` 更新
- [ ] `.env.example` 更新

### フェーズ3: トークン管理
- [ ] トークン更新スクリプト作成（`scripts/refresh-instagram-token.ts`）
- [ ] package.json に `refresh-token` スクリプト追加
- [ ] ローカル `.env` ファイル設定
- [ ] Vercel環境変数設定（4つ）

### フェーズ4: 統合・テスト
- [ ] ローカルビルド成功確認
- [ ] 投稿取得確認（4件表示）
- [ ] ハッシュタグフィルタリング動作確認
- [ ] 画像表示確認（プロキシ経由）
- [ ] 詳細ページ生成・表示確認
- [ ] Instagramリンク動作確認
- [ ] エラーハンドリング確認

### フェーズ5: デプロイ
- [ ] masterブランチにマージ
- [ ] Vercel本番デプロイ
- [ ] 本番環境動作確認
- [ ] ビルドログ確認（エラーなし）

### 後処理
- [ ] 旧ファイル削除（`instagram-rss.ts`等）
- [ ] `rss-parser` パッケージアンインストール
- [ ] ドキュメント作成
  - [ ] セットアップガイド
  - [ ] トークン更新ガイド
  - [ ] トラブルシューティング
- [ ] トークン更新リマインダー設定（58日後）

---

## 📚 参考リンク

### Meta公式ドキュメント
- [Instagram Graph API - Overview](https://developers.facebook.com/docs/instagram-api/)
- [Get Started](https://developers.facebook.com/docs/instagram-api/getting-started)
- [Access Tokens](https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens)

### セットアップガイド
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)

---

## 🎯 推奨事項

**今すぐ移行すべき理由:**
1. **コスト削減**: 年間14,400円の節約
2. **データ品質**: 公式APIで安定・高速
3. **長期安定**: Meta公式サポート
4. **App Review不要**: 自社サイト限定使用のためハードルなし

**次のステップ:**
1. この提案をレビュー・承認
2. フェーズ1（準備作業）から開始
3. 段階的に実装・テスト・デプロイ

---

## 関連

- 関連PR: #23 (Instagram RSS連携の実験実装)
- Instagramアカウント: @wakuwaku_science_fuji
