# Instagram Graph API トークン交換 - デモンストレーション

このドキュメントでは、`exchange-short-token.ts` スクリプトを使用したトークン交換の実際の流れを説明します。

## 📚 ドキュメント一覧

- [トークン管理ガイド](./README.md) - トークン管理全体の概要
- **このドキュメント** - デモンストレーション・使用例
- [セットアップガイド](../04-workflow-collaboration/Meta-Developer-Instagram-Graph-API-Setup-Guide.md) - Meta Developer 初期設定

---

## 🎯 デモンストレーション

### シナリオ: 初回トークン取得

新しくInstagram Graph API統合を始める場合のフロー。

#### ステップ 1: Meta Developer で短期トークンを取得

```
Meta Developer Dashboard
├─ My Apps > DONATI
├─ Tools > Token Generator
├─ instagram_business_account_access を選択
└─ トークンをコピー
   → IGQVJWYnh3RWx0ZAm5kdD...
```

#### ステップ 2: スクリプトで短期トークン → 長期トークンに交換

```bash
# 方法1: コマンドラインで直接指定
npm run exchange-token IGQVJWYnh3RWx0ZAm5kdD...

# 方法2: 環境変数で指定
SHORT_TOKEN="IGQVJWYnh3RWx0ZAm5kdD..." npm run exchange-token

# 方法3: .env に設定して実行
# .env に「SHORT_TOKEN=IGQVJWYnh3RWx0ZAm5kdD...」を追加
npm run exchange-token
```

#### ステップ 3: スクリプト実行結果を確認

```
ℹ 📱 Instagram Graph API - トークン交換ツール

ステップ 1: 短期トークンの検証

ℹ トークン: IGQVJWYnh3RWx0ZAm5k...
ℹ トークン交換API呼び出し中...
ℹ エンドポイント: https://graph.instagram.com/v21.0/access_token

✓ トークンは有効です
ℹ 有効期限: 2025-12-28T15:30:45.123Z
ℹ スコープ: instagram_business_basic

ステップ 2: 短期トークンを長期トークンに交換

✓ トークン交換に成功しました！

📋 新しい長期トークン情報

アクセストークン:
IGQWRFMUlkZAkFtbzR0MjlrZAzVVNZ...

有効期限:
60日0時間
(2025-02-26T15:30:45.123Z)

有効期限（秒）:
5184000 秒

🔐 セキュリティ確認

⚠ このトークンを安全に保管してください
ℹ - .env ファイルに INSTAGRAM_ACCESS_TOKEN として保存
ℹ - ソースコードには絶対に含めない
ℹ - Git リポジトリにはコミットしない

📝 .env 更新手順

1. .env ファイルを開く
2. INSTAGRAM_ACCESS_TOKEN をこの値に置き換える:

   INSTAGRAM_ACCESS_TOKEN=IGQWRFMUlkZAkFtbzR0MjlrZAzVVNZ...

3. ファイルを保存

または、Vercel にデプロイしている場合:

   vercel env add INSTAGRAM_ACCESS_TOKEN production

新しいトークンをペーストしてください。

✅ トークン更新完了

ℹ 有効期限: 2025-02-26T15:30:45.123Z
ℹ 次のリフレッシュ予定日: 約50日後
```

#### ステップ 4: .env を更新

`.env` ファイルを編集:

```env
# Instagram Graph API（秘密情報 - Vercelに設定）
INSTAGRAM_ACCESS_TOKEN=IGQWRFMUlkZAkFtbzR0MjlrZAzVVNZ...
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841405...
FACEBOOK_APP_ID=123456789
FACEBOOK_APP_SECRET=abcd1234...
```

#### ステップ 5: ビルドテスト

```bash
npm run build
```

期待される出力:
```
✓ ビルド成功
✓ Instagram投稿を取得
✓ トークン有効期限: 60日残り
```

---

## 🔄 デモンストレーション 2: トークンリフレッシュ

有効期限が近づいてきたときのフロー（約50日後）。

### ステップ 1: トークン有効期限を確認

ビルド時に自動的に確認されます:

```bash
npm run build
```

出力例:
```
⚠️ Instagram トークンが 10 日で失効します
失効予定日: 2025-02-26T15:30:45.123Z
トークンをリフレッシュしてください: ...
```

### ステップ 2: リフレッシュスクリプトを実行

```bash
npm run refresh-token
```

このコマンドで、現在の長期トークンを使用して新しい長期トークンを生成します。

出力例:
```
✓ 前のトークン有効期限: 2025-02-26 (10日残り)
✓ 新しいトークンを取得しました
✓ 新有効期限: 2025-04-26 (60日)

新しいトークンを .env に設定してください:
INSTAGRAM_ACCESS_TOKEN=IGQW...
```

### ステップ 3: .env を更新

新しいトークンを `.env` に設定:

```env
INSTAGRAM_ACCESS_TOKEN=IGQW...
```

### ステップ 4: ビルド再実行

```bash
npm run build
```

---

## ⚙️ スクリプト実装の詳細

### 処理フロー

```
入力検証
  ├─ 短期トークンの確認
  ├─ App ID/Secret の確認
  └─ エラー → 終了

トークン検証
  ├─ debug_token API で有効性確認
  ├─ 有効期限を確認
  ├─ スコープを確認
  └─ 無効 → エラーメッセージ出力して終了

トークン交換
  ├─ exchange_token API 呼び出し
  ├─ grant_type: fb_exchange_token
  ├─ client_id/client_secret 指定
  └─ 有効期限（expiresIn）を受け取る

結果出力
  ├─ 新しい長期トークン表示
  ├─ 有効期限を表示（日数・秒数・ISO日時）
  ├─ セキュリティ警告表示
  ├─ .env 更新手順を表示
  └─ 完了メッセージ
```

### 主要なコンポーネント

#### 1. トークン検証関数

```typescript
async function debugToken(
  token: string,
  appId: string,
  appSecret: string
): Promise<{
  isValid: boolean;
  expiresAt?: number;
  expiryDate?: string;
  appId?: string;
  scopes?: string[];
  error?: string;
}>
```

**用途**: トークンが有効か、有効期限はいつかを確認

**API呼び出し**:
```
GET https://graph.facebook.com/v21.0/debug_token
  ?input_token={token}
  &access_token={appId}|{appSecret}
```

#### 2. トークン交換関数

```typescript
async function exchangeShortToken(
  shortToken: string,
  appId: string,
  appSecret: string
): Promise<TokenExchangeResult>
```

**用途**: 短期トークンを長期トークンに交換

**API呼び出し**:
```
GET https://graph.instagram.com/v21.0/access_token
  ?grant_type=fb_exchange_token
  &client_id={appId}
  &client_secret={appSecret}
  &access_token={shortToken}
```

#### 3. 時間フォーマット関数

```typescript
function secondsToDaysHours(seconds: number): string
```

**用途**: 秒を「XX日YY時間」形式に変換

**例**:
- `5184000` 秒 → `60日0時間`
- `4838400` 秒 → `56日0時間`

---

## 📊 エラーハンドリング

### エラーケース 1: 短期トークンが無効

```bash
npm run exchange-token invalid-token
```

出力:
```
✗ トークンが無効です
ℹ エラー: Invalid access token
```

**対応**: 新しい短期トークンを取得

### エラーケース 2: App Secret が不正

```bash
FACEBOOK_APP_SECRET=wrong npm run exchange-token
```

出力:
```
✗ トークン交換に失敗しました
ℹ エラー: Invalid OAuth access token.
```

**対応**: App Secret を確認・再取得

### エラーケース 3: 環境変数未設定

```bash
npm run exchange-token
```

出力:
```
✗ 短期トークンが指定されていません

使用方法:
  npx tsx scripts/exchange-short-token.ts <短期トークン>

環境変数で指定する場合:
  SHORT_TOKEN=<短期トークン> npx tsx scripts/exchange-short-token.ts
```

---

## 🔐 セキュリティチェックリスト

トークン交換時に確認すべき項目:

- [ ] トークンは `.env` に保存（`.gitignore` に含まれている）
- [ ] トークンをログに出力していない
- [ ] Git リポジトリにコミットしていない
- [ ] スクリーンショットに含まれていない
- [ ] Slack / Discord に送信していない
- [ ] App Secret が公開されていない
- [ ] ログファイルから削除済み

---

## 📅 定期メンテナンススケジュール

### 短期（初回設定）
- Day 1: 短期トークン → 長期トークン交換
- Day 2: ビルドテスト実施

### 中期（トークン有効期限中）
- Day 50: トークンリフレッシュを検討
- Day 55: リフレッシュ実行
- Day 56: ビルドテスト、Vercel 環境変数更新

### 長期（継続運用）
- 毎月15日・28日: 定期リフレッシュ（GitHub Actions）
- 毎月1日: トークン有効期限確認

---

## 💡 ベストプラクティス

### ✅ 推奨事項

1. **GitHub Actions で自動リフレッシュ**
   ```yaml
   schedule:
     - cron: '0 9 15 * *'  # 毎月15日
     - cron: '0 9 28 * *'  # 毎月28日
   ```

2. **Slack 通知の設定**
   - トークン有効期限 14日以内で通知
   - リフレッシュ完了時に通知

3. **ログ監視**
   - ビルドログで「token expires in X days」を監視
   - 警告が出た場合は即座に対応

4. **バックアップトークン**
   - 別のデバイスに古いトークンを保管
   - 緊急時の復旧用

### ❌ 避けるべき事項

- App Secret を環境変数以外で保管
- トークンをハードコード
- 有効期限切れトークンのまま本番運用
- 定期リフレッシュなし

---

## 📞 サポート

トラブル時は以下を確認:

1. [トークン管理ガイド](./README.md#トラブルシューティング)
2. [セットアップガイド](../04-workflow-collaboration/Meta-Developer-Instagram-Graph-API-Setup-Guide.md)
3. [Meta Developer ドキュメント](https://developers.facebook.com/docs/instagram-api/)

---

作成日: 2025年12月28日