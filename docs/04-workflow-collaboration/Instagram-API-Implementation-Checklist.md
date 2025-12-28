# Instagram Graph API 実装チェックリスト

**作成日**: 2025年12月28日
**対象**: Meta Developer - Instagram Graph API 統合実装

---

## フェーズ 1: Meta Developer アカウント・App 設定

### ステップ 1-1: Meta Developer アカウント作成

- [ ] Meta Developer に登録済み (https://developers.facebook.com)
- [ ] 個人用 Facebook アカウントで確認済み
- [ ] Developer Dashboard にアクセス可能

### ステップ 1-2: Meta App 作成

- [ ] App 作成済み（例: 「DONATI Instagram Integration」）
- [ ] **App ID を記録**: `_______________`
- [ ] **App Secret を記録**: `_______________`
- [ ] App Secret を `.env` ファイルに保管済み（Git 除外）
- [ ] App Secret を GitHub にコミットしていない

### ステップ 1-3: Instagram Graph API Product 追加

- [ ] App に「Instagram Graph API」Product を追加
- [ ] API バージョンを確認（v19.0 以降推奨）

---

## フェーズ 2: Instagram ビジネスアカウント準備

### ステップ 2-1: Instagram アカウント Business 化

- [ ] Instagram アカウントを Business または Creator に変更
- [ ] ビジネスカテゴリを選択
- [ ] プロフィール設定完了

**アカウント情報**:
- アカウント名: `_______________`
- アカウント ID: `_______________`
- 現在のタイプ: [ ] Business [ ] Creator

### ステップ 2-2: Facebook ページ作成・連携

- [ ] Facebook ページを作成済み
- [ ] **ページ名**: `_______________`
- [ ] **ページ ID**: `_______________`
- [ ] Instagram アカウントを Facebook ページに接続済み

**確認方法**:
- [ ] Instagram Settings > Business > Business Account Settings で Facebook ページが表示される

### ステップ 2-3: ビジネスアカウント ID 取得

- [ ] Business Account ID を取得済み
- [ ] **Business Account ID**: `_______________`

**取得方法の確認**:
- [ ] Meta Business Suite で確認済み
- [ ] Accounts Center URL で確認済み

---

## フェーズ 3: API Permissions 設定

### ステップ 3-1: 必須 Permissions の設定

- [ ] `instagram_basic` を有効化
- [ ] `pages_read_engagement` を有効化
- [ ] 投稿予定なら `instagram_content_publish` を追加
- [ ] インサイト取得予定なら `instagram_manage_insights` を追加

**確認方法**:
- [ ] Meta Developers > App > Settings > Basic で確認

---

## フェーズ 4: アクセストークン取得・管理

### ステップ 4-1: 初回トークン取得

#### 短期トークン生成

- [ ] Graph API Explorer で新規トークン生成
- [ ] 必要な permissions にチェック
- [ ] トークン生成確認済み
- [ ] トークンをコピー（有効期限は数時間）
- [ ] **短期トークン**: `_______________`

#### 短期→長期トークン変換

- [ ] 長期トークン変換リクエスト実行
- [ ] レスポンスから新しいトークンを取得
- [ ] **長期トークン**: `_______________`
- [ ] **有効期限**: `_______________` (60日後)

### ステップ 4-2: 環境変数に設定

**ローカル開発**:
- [ ] `.env.local` ファイルに以下を設定:
  ```
  INSTAGRAM_BUSINESS_ACCOUNT_ID=xxx
  INSTAGRAM_ACCESS_TOKEN=xxx
  FACEBOOK_APP_ID=xxx
  FACEBOOK_APP_SECRET=xxx
  ```
- [ ] `.env.local` が `.gitignore` に含まれている

**本番環境（Vercel）**:
- [ ] Vercel Dashboard > Project Settings > Environment Variables で設定
- [ ] `INSTAGRAM_BUSINESS_ACCOUNT_ID` を追加
- [ ] `INSTAGRAM_ACCESS_TOKEN` を追加
- [ ] `FACEBOOK_APP_ID` を追加
- [ ] `FACEBOOK_APP_SECRET` を追加（秘密情報としてマーク）

### ステップ 4-3: トークン有効期限情報を記録

- [ ] トークン取得日: `_______________`
- [ ] トークン有効期限: `_______________` (60日後)
- [ ] 次回リフレッシュ予定日: `_______________` (50-55日後)

---

## フェーズ 5: API 動作確認

### ステップ 5-1: Graph API Explorer でテスト

- [ ] Graph API Explorer を開く
- [ ] アプリを選択
- [ ] 以下のリクエストを実行:

```
GET /v19.0/{INSTAGRAM_BUSINESS_ACCOUNT_ID}/media
  ?fields=id,caption,media_type,media_url,timestamp,permalink
  &limit=9
```

- [ ] 投稿が返されることを確認
- [ ] JSON レスポンスが正常形式か確認

### ステップ 5-2: トークンデバッグ

- [ ] Token Debug Tool を開く (https://developers.facebook.com/tools/debug/accesstoken/)
- [ ] トークンを入力
- [ ] 有効性を確認: [ ] Valid [ ] Invalid
- [ ] 有効期限を確認: `_______________`
- [ ] Scopes を確認

---

## フェーズ 6: TypeScript コード統合

### ステップ 6-1: ライブラリの確認

- [ ] `src/lib/instagram-graph-api.ts` が存在
- [ ] 以下の関数が実装されている:
  - [ ] `fetchInstagramPosts()`
  - [ ] `checkTokenExpiry()`
  - [ ] `refreshInstagramToken()`
  - [ ] `logTokenExpiryWarning()`

### ステップ 6-2: コンポーネント実装

- [ ] Instagram フィード表示コンポーネント確認
- [ ] エラーハンドリング実装済み
- [ ] ローディング状態の表示確認

### ステップ 6-3: ビルド・型チェック

```bash
npm run astro check    # 型チェック実行
npm run build          # ビルド確認
```

- [ ] 型チェックエラーなし
- [ ] ビルド成功

---

## フェーズ 7: トークン有効期限管理

### ステップ 7-1: 有効期限チェック機能

- [ ] トークン有効期限チェック関数が実装済み
- [ ] ビルド時に自動チェック実装（オプション）

```typescript
// ビルド時実行例
import { logTokenExpiryWarning } from '@/lib/instagram-graph-api';

await logTokenExpiryWarning(
  process.env.INSTAGRAM_ACCESS_TOKEN,
  process.env.FACEBOOK_APP_ID,
  process.env.FACEBOOK_APP_SECRET
);
```

- [ ] 実装確認済み

### ステップ 7-2: リフレッシュスケジュール設定

#### GitHub Actions ワークフロー（推奨）

- [ ] `.github/workflows/refresh-instagram-token.yml` を作成
- [ ] Cron schedule を設定 (50-55日ごと)
- [ ] GitHub Secrets に `INSTAGRAM_ACCESS_TOKEN` を登録
- [ ] テスト実行で動作確認

#### または手動リフレッシュ手順

- [ ] リフレッシュ手順書を作成
- [ ] チームメンバーに周知済み
- [ ] 50-55日ごとにリマインダー設定

### ステップ 7-3: リフレッシュ後の更新手順

- [ ] `.env.local` 更新手順を文書化
- [ ] Vercel Environment Variables 更新手順を文書化
- [ ] ドキュメント更新手順を文書化

**更新項目**:
- [ ] `.env` の `INSTAGRAM_ACCESS_TOKEN` を新しいトークンに更新
- [ ] `.env` の `INSTAGRAM_TOKEN_REFRESH_DATE` を現在日付に更新
- [ ] `.env` の `INSTAGRAM_TOKEN_EXPIRY_DATE` を60日後に更新
- [ ] Vercel で同じ値を更新
- [ ] Git にコミット（`.env.local` 除外）

---

## フェーズ 8: Rate Limiting 対策

### ステップ 8-1: キャッシング実装

- [ ] API レスポンスキャッシング実装済み
- [ ] キャッシュ期間を設定: `_______________` (推奨: 24時間)

```typescript
// 例: CachedInstagramAPI クラスを使用
const api = new CachedInstagramAPI({
  businessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID,
  accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
  cacheDuration: 24 * 60 * 60 * 1000 // 24時間
});
```

- [ ] 実装確認済み

### ステップ 8-2: リクエスト最適化

- [ ] 不要なフィールドを除外
- [ ] Pagination（`limit`）を調整
- [ ] バッチリクエスト検討

---

## フェーズ 9: エラーハンドリング

### ステップ 9-1: 予期されるエラーへの対応

- [ ] トークン無効エラー処理
- [ ] レート制限エラー処理
- [ ] API 接続エラー処理
- [ ] 権限エラー処理

**確認内容**:
- [ ] エラーメッセージがユーザーフレンドリー
- [ ] ログに詳細情報が記録
- [ ] フォールバック処理がある

### ステップ 9-2: デバッグ情報

- [ ] 環境変数不足時のエラーメッセージ
- [ ] トークン有効期限がない時の警告
- [ ] API レスポンスエラーのログ

---

## フェーズ 10: ドキュメント・運用

### ステップ 10-1: ドキュメント整備

- [ ] セットアップガイド完成
  - [ ] Meta-Developer-Instagram-Graph-API-Setup-Guide.md
- [ ] クイックリファレンス完成
  - [ ] Instagram-API-Quick-Reference.md
- [ ] 実装チェックリスト完成（このファイル）
- [ ] `.env.example` に説明を追加

### ステップ 10-2: チーム周知

- [ ] エンジニアチームにドキュメント共有済み
- [ ] トークンリフレッシュ手順を周知済み
- [ ] 有効期限切れ時の対応手順を周知済み

### ステップ 10-3: 定期メンテナンス

- [ ] 月次：トークン有効期限チェック
- [ ] 50-55日ごと：トークンリフレッシュ
- [ ] 四半期ごと：API ドキュメント最新化確認
- [ ] 年 1 回：セキュリティレビュー

---

## フェーズ 11: 本番デプロイ

### ステップ 11-1: 本番環境設定

- [ ] Vercel Environment Variables すべて設定済み
- [ ] 秘密情報が Secret としてマーク済み
- [ ] Preview URL でテスト済み

### ステップ 11-2: 本番デプロイ

- [ ] `master` ブランチにマージ
- [ ] Vercel 自動デプロイ実行
- [ ] 本番サイトで Instagram フィード表示確認
- [ ] トークン有効期限チェック実行

### ステップ 11-3: デプロイ後確認

- [ ] 本番サイトで投稿が表示される
- [ ] 画像がロードされる
- [ ] リンク先（Instagram）に飛べる
- [ ] 必要なら analytics を確認

---

## トラブルシューティング用メモ

### 問題が発生した場合

**問題**: `Invalid OAuth access token`
- [ ] トークンが有効か確認
- [ ] トークン有効期限をチェック
- [ ] 新規トークン取得を試行

**問題**: `Permission denied`
- [ ] App の permissions を確認
- [ ] 新規トークン取得を試行

**問題**: `Business Account is not linked`
- [ ] Instagram と Facebook ページの連携を確認
- [ ] Meta Business Suite で再度接続

**問題**: `Rate limit exceeded`
- [ ] キャッシング機能の確認
- [ ] 1 時間待機

---

## 最終確認

すべてのチェックボックスにチェックを入れたら、実装完了です。

**完了日**: `_______________`
**実装担当**: `_______________`
**レビュー者**: `_______________`

---

## 関連ドキュメント

1. **セットアップ完全ガイド**: docs/04-workflow-collaboration/Meta-Developer-Instagram-Graph-API-Setup-Guide.md
2. **クイックリファレンス**: docs/04-workflow-collaboration/Instagram-API-Quick-Reference.md
3. **公式ドキュメント**: https://developers.facebook.com/docs/instagram-api/
4. **CLAUDE.md**: プロジェクト全体のガイドライン

---

**最後に**: このチェックリストを完了することで、堅牢で保守性の高い Instagram Graph API 統合が実現できます。不明な点はドキュメント参照またはサポートチームに相談してください。
