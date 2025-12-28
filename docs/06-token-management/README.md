# Instagram Graph API トークン管理ガイド

このガイドでは、Instagram Graph APIのアクセストークンを取得・管理する手順を説明します。

## 📋 目次

1. [トークンの種類](#トークンの種類)
2. [短期トークンから長期トークンへの交換](#短期トークンから長期トークンへの交換)
3. [トークンのリフレッシュ](#トークンのリフレッシュ)
4. [トークン有効期限の確認](#トークン有効期限の確認)
5. [トラブルシューティング](#トラブルシューティング)

---

## トークンの種類

### 短期トークン（短命トークン）

- **有効期限**: 数分～1時間
- **取得方法**: Instagram Graph API Token Generator
- **用途**: 長期トークンに交換するための中間トークン
- **セキュリティ**: 低（短時間のみ有効）

### 長期トークン（Long-Lived Token）

- **有効期限**: 60日間
- **取得方法**: 短期トークンから交換
- **用途**: 本番アプリケーションで使用
- **セキュリティ**: 高（定期的なリフレッシュが必要）

---

## 短期トークンから長期トークンへの交換

### 準備するもの

1. **Meta App ID** - Meta Developer ダッシュボードで取得
2. **Meta App Secret** - Meta Developer ダッシュボードで取得
3. **短期アクセストークン** - Instagram Graph API Token Generator で取得

### ステップ 1: Meta App ID と App Secret を確認

1. [Meta Developer ダッシュボード](https://developers.facebook.com/apps) にアクセス
2. 対象のアプリをクリック
3. **Settings > Basic** で App ID と App Secret を確認
4. これらの値をメモする

### ステップ 2: 短期トークンを取得

1. [Meta App Dashboard](https://developers.facebook.com/apps) で対象アプリを開く
2. **Tools > Token Generator** をクリック
3. **instagram_business_account_access** を選択
4. トークンをコピー

### ステップ 3: 環境変数を設定

`.env` ファイルに以下を追加（なければ作成）:

```env
# Meta App 認証情報
FACEBOOK_APP_ID=your-app-id
FACEBOOK_APP_SECRET=your-app-secret

# 一時的な短期トークン（交換後は削除）
SHORT_TOKEN=your-short-token
```

### ステップ 4: トークン交換スクリプトを実行

```bash
npm run exchange-token
```

または、コマンドラインで直接指定:

```bash
npx tsx scripts/exchange-short-token.ts YOUR_SHORT_TOKEN
```

### ステップ 5: 長期トークンを .env に保存

スクリプト実行後、出力された長期トークンを `.env` に追加:

```env
INSTAGRAM_ACCESS_TOKEN=new-long-token-here
```

---

## トークンのリフレッシュ

長期トークンは60日で自動失効するため、定期的にリフレッシュが必要です。

### 自動リフレッシュ（推奨）

#### GitHub Actions を使用（自動化）

`.github/workflows/refresh-instagram-token.yml` を作成:

```yaml
name: Refresh Instagram Token

on:
  schedule:
    # 毎月15日と最終日の午前9時(UTC)に実行
    - cron: '0 9 15 * *'
    - cron: '0 9 28 * *'

jobs:
  refresh-token:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Refresh token
        env:
          INSTAGRAM_ACCESS_TOKEN: ${{ secrets.INSTAGRAM_ACCESS_TOKEN }}
          FACEBOOK_APP_ID: ${{ secrets.FACEBOOK_APP_ID }}
          FACEBOOK_APP_SECRET: ${{ secrets.FACEBOOK_APP_SECRET }}
        run: npm run refresh-token

      - name: Update .env and push
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .env
          git commit -m "chore: refresh instagram token" || true
          git push
```

#### 手動リフレッシュ

定期的に以下のコマンドを実行:

```bash
npm run refresh-token
```

このコマンドは、現在の長期トークンを使用して新しい長期トークンを生成します。

### Vercel への環境変数更新

Vercel でホスティングしている場合:

```bash
# 新しいトークンを設定
vercel env add INSTAGRAM_ACCESS_TOKEN production

# プロンプトが表示されたら、新しいトークンをペーストして Enter
```

---

## トークン有効期限の確認

### ローカル環境での確認

```typescript
import { checkTokenExpiry } from '@/lib/instagram-graph-api';

const appId = process.env.FACEBOOK_APP_ID;
const appSecret = process.env.FACEBOOK_APP_SECRET;
const token = process.env.INSTAGRAM_ACCESS_TOKEN;

const expiry = await checkTokenExpiry(token, appId, appSecret);

console.log(`有効期限: ${expiry.expiryDate}`);
console.log(`残り日数: ${expiry.daysRemaining}日`);
```

### ビルド時の確認

ビルド時に自動的にトークン有効期限がチェックされ、14日以内に失効する場合は警告が表示されます:

```bash
npm run build
```

---

## トラブルシューティング

### エラー: "トークンが無効です"

**原因**: トークンが期限切れ、または不正な値

**対応**:
1. トークンが正しくコピーされているか確認
2. トークン有効期限を確認
3. 新しい短期トークンを取得して交換

### エラー: "Meta App ID または App Secret が見つかりません"

**原因**: 環境変数が設定されていない

**対応**:
```bash
# .env ファイルに以下を追加
FACEBOOK_APP_ID=your-id
FACEBOOK_APP_SECRET=your-secret
```

### エラー: "grant_type not supported"

**原因**: トークンが短期トークンではない、または API バージョンが古い

**対応**:
1. 短期トークンを新規取得
2. API バージョンを確認（v21.0 推奨）

### エラー: "Insufficient permissions"

**原因**: トークンに必要なスコープが含まれていない

**対応**:
1. Token Generator で以下を選択:
   - `instagram_business_account_access`
   - `instagram_graph_api`
2. 必要なパーミッション:
   - `instagram_business_basic`
   - `instagram_business_content_publish` (オプション)

---

## セキュリティベストプラクティス

### ✅ DO

- ✅ App Secret は絶対に公開しない
- ✅ トークンを `.env` に保管（`.gitignore` に含める）
- ✅ 定期的にトークンをリフレッシュ
- ✅ トークン有効期限を監視
- ✅ Vercel 環境変数で本番トークンを管理

### ❌ DON'T

- ❌ トークンをソースコードに含める
- ❌ トークンを Git リポジトリにコミット
- ❌ トークンを Slack / Discord に送信
- ❌ トークンをログに出力
- ❌ 有効期限切れのトークンを使用

---

## 参考リンク

- [Meta Developer - Instagram Graph API](https://developers.facebook.com/docs/instagram-api/)
- [Long-Lived Access Token ドキュメント](https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens)
- [Token Generator ガイド](https://developers.facebook.com/docs/facebook-login/access-tokens)

---

## トークン交換スクリプトの詳細

### コマンド: `npm run exchange-token`

**機能**:
- 短期トークンを長期トークンに交換
- トークン有効期限を確認
- 新しいトークン情報を表示

**使用例**:

```bash
# コマンドラインで指定
npm run exchange-token -- IGQVJWYnh3RWx...

# 環境変数で指定
SHORT_TOKEN=IGQVJWYnh3RWx... npm run exchange-token

# .env に SHORT_TOKEN を設定して実行
npm run exchange-token
```

**出力例**:

```
ℹ トークン交換API呼び出し中...

✓ トークンは有効です
ℹ 有効期限: 2025-12-28T12:34:56.000Z

✓ トークン交換に成功しました！

📋 新しい長期トークン情報

アクセストークン:
IGQVJa1UxYUQzLXl2cEhBNlR6...

有効期限:
60日0時間
(2025-02-26T12:34:56.000Z)

有効期限（秒）:
5184000 秒
```

---

## FAQ

### Q: トークンの有効期限が切れたらどうなる?

**A**: Graph API 呼び出しが失敗し、Instagram 投稿が表示されなくなります。ビルド時にエラーが出力されますが、ビルドは失敗しません。すぐに新しいトークンを交換・リフレッシュしてください。

### Q: 同時に複数のトークンを管理できる?

**A**: このスクリプトは単一トークン管理を想定しています。複数アカウントが必要な場合は、コードをカスタマイズしてください。

### Q: トークンをローテーションできる?

**A**: できます。以下の方法があります:
1. **予定トークン更新**: 有効期限の5日前にリフレッシュ
2. **スケジュール更新**: GitHub Actions で月2回自動更新
3. **手動更新**: 必要に応じて随時更新

### Q: App Secret を漏らしてしまった場合は?

**A**: すぐに以下の対応が必要です:
1. Meta Developer ダッシュボードで App Secret をリセット
2. `.env` を更新
3. 関連するシステムで新しい Secret を設定
4. Git 履歴から削除（`git-filter-repo` を使用）

---

最後に更新: 2025年12月28日