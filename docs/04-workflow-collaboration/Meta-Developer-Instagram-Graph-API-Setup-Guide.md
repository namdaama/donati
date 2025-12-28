# Meta Developer Instagram Graph API 統合ガイド

**最終更新日**: 2025年12月28日
**対象**: Meta Developer プラットフォーム統合
**作成者**: Claude Code (claude.ai/code)

## 概要

このガイドでは、Meta Developer プラットフォームを使用して、Instagram Graph API を DONATIアプリに統合するための完全なステップバイステップ手順を提供します。

### 重要な変更（2024年12月以降）

- **Instagram Basic Display API は廃止**: 2024年12月4日に終了
- **対応するアカウント**: Business Account と Creator Account のみサポート（個人アカウント不可）
- **推奨される認証方式**: Facebook Login for Business

---

## セクション 1: Meta Developer アカウント作成・登録

### ステップ 1.1: Meta Developer アカウント登録

1. **ブラウザを開く**
   - URL: https://developers.facebook.com にアクセス

2. **ログイン/サインアップ**
   - 既存の Facebook アカウントがある場合: そのアカウントでログイン
   - 新規の場合: 「アカウント作成」をクリック
   - Meta アカウント（個人用 Facebook アカウント）が必須

3. **Developer 登録完了確認**
   - ログイン後、ダッシュボードに移動
   - 左側メニューに「My Apps」が表示されることを確認

### ステップ 1.2: 個人プロフィール情報の設定

1. **右上のプロフィールアイコンをクリック**
2. **「Settings」を選択**
3. **以下の情報を入力**
   - 名前（本人確認済み）
   - メールアドレス（複数登録可）
   - 電話番号（オプション）

---

## セクション 2: Meta App 作成

### ステップ 2.1: 新規 App 作成

1. **My Apps ダッシュボードに移動**
   - 左側メニュー > My Apps > Create App

2. **App 作成ダイアログで以下を設定**
   - **App Name**: 例）「DONATI Instagram Integration」
   - **App Contact Email**: プロジェクト担当者のメール
   - **App Purpose**: 「Business」を選択
   - **App Category**: 「Engagement」or「Social Media」

3. **「Create App」をクリック**
   - 数秒でアプリが生成されます

### ステップ 2.2: App ID と App Secret の確認

作成直後のダッシュボードで以下が表示されます:

```
App ID: [8桁の数字] 例) 123456789
App Secret: [長い英数字文字列]
```

**重要**: App Secret は絶対に公開しないこと。`.env` ファイルに安全に保管。

**確認方法**:
- アプリダッシュボード > Settings > Basic
- App ID と App Secret が表示

---

## セクション 3: Instagram アカウントの準備

### ステップ 3.1: Instagram アカウントを Business/Creator 化

1. **Instagram モバイルアプリを開く**

2. **プロフィールに移動**
   - 右下のプロフィールアイコンをタップ

3. **メニューを開く**
   - 右上の 3 本線（≡）をタップ

4. **設定を開く**
   - Settings and Privacy > Settings

5. **アカウントタイプの変更**
   - Account Type and Tools > Professional Account
   - Business または Creator を選択

6. **ビジネスカテゴリの選択**
   - DONATI の場合: 「Science」or「Arts & Entertainment」
   - Confirm

### ステップ 3.2: Instagram と Facebook ページの連携

**前提条件**: Facebook ページの作成が必須です（次のセクション参照）

1. **Instagram Settings に戻る**
   - Settings > Business > Business Account Settings

2. **「Connect Account」をタップ**
   - 既存の Facebook ページを選択
   - または新規ページを作成

3. **接続確認**
   - Instagram の About セクションに Facebook ページへのリンクが表示される

---

## セクション 4: Facebook ページの作成・連携

### ステップ 4.1: Facebook ページ作成

1. **https://www.facebook.com/pages/create へアクセス**

2. **ページタイプを選択**
   - Community or Public Figure: DONATI の場合「Public Figure」推奨
   - または「Business」を選択

3. **ページ情報を入力**
   - **Page Name**: 「DONATI - サイエンス アンド スペース ラボ」
   - **Page Category**: 「Education」or「Science」
   - **Page Description**: プロジェクトの簡単な説明

4. **ページを公開**
   - Create Page をクリック

### ステップ 4.2: Instagram との連携確認

1. **Facebook ページを開く**
2. **Settings > Instagram Accounts**
3. **Connect an Instagram Account** をクリック
4. Business Instagram アカウントを選択
5. **確認メッセージが表示される**

---

## セクション 5: Instagram Business Account ID の取得

### ステップ 5.1: Meta Business Suite から確認

1. **https://business.instagram.com へアクセス**
   - Meta 認証情報でログイン

2. **左側メニュー > Accounts**

3. **Instagram Accounts セクション**
   - 接続された Instagram ビジネスアカウントが表示
   - クリックしてアカウント詳細を開く

### ステップ 5.2: Accounts Center から確認

1. **https://accountscenter.instagram.com へアクセス**

2. **左側メニュー > Accounts**

3. **Instagram アカウントをクリック**
   - URL に含まれる ID がアカウント ID になります
   - 例: `/profiles/123456789/`
   - **ID**: `123456789`

### ステップ 5.3: Graph API テストツールで確認

1. **Meta Developers に移動**
   - https://developers.facebook.com

2. **Tools > Graph API Explorer**

3. **以下のリクエストを実行**
   ```
   GET /me?fields=instagram_business_account
   ```

4. **レスポンスで確認**
   ```json
   {
     "instagram_business_account": {
       "id": "123456789"
     },
     "id": "987654321"
   }
   ```
   - `instagram_business_account.id` がアカウント ID

---

## セクション 6: Instagram Graph API Product の追加

### ステップ 6.1: App に Product を追加

1. **Meta Developers ダッシュボードに移動**
   - My Apps > [作成したアプリ]

2. **左側メニュー > Add Product**

3. **「Instagram」を検索**

4. **「Instagram Graph API」を選択**

5. **「Set Up」をクリック**

### ステップ 6.2: 必要な Permissions を設定

1. **App > Settings > Basic**

2. **App Roles セクション**
   - Administrator ロールを確認

3. **App > Settings > Advanced**
   - App Secret を確認（短期トークン生成時に必要）

### ステップ 6.3: Required Permissions リスト

**短期トークン生成に最低限必要**:
- `instagram_basic`
- `pages_read_engagement`

**投稿操作が必要な場合**:
- `instagram_content_publish`
- `pages_manage_metadata`

**インサイト取得が必要な場合**:
- `instagram_manage_insights`

---

## セクション 7: アクセストークンの取得

### ステップ 7.1: 短期トークン生成（初回取得）

#### 方法 A: Graph API Explorer（推奨、開発初期段階）

1. **Graph API Explorer を開く**
   - https://developers.facebook.com/tools/explorer/

2. **アプリを選択**
   - 右上の App Selector > [作成したアプリ] を選択

3. **トークンを生成**
   - 左側 "Get Token" ドロップダウン
   - "Get User Access Token" をクリック

4. **Permissions を選択**
   - `instagram_basic` にチェック
   - `pages_read_engagement` にチェック
   - 投稿予定なら `instagram_content_publish` も追加

5. **「Generate Access Token」をクリック**
   - ポップアップで許可を求められる
   - "Confirm" をクリック

6. **トークンが表示**
   - コピーして安全に保管
   EAAMBtHnuBxgBQW5iCe2eLX0VzsaBL0iEfNWZC4QyJeDBD4YWlQMSkywWwf0c2oaPrz196nfNdrfYZC4tnNmZCuEBQp64ahsA71bKXdb0EoHfYQRPMJUYlWdePOxL94iIAVKE2RZCmU6uILMPesPHHeFQd9sanw8WPCl0JZCOZCWRLiPZCDMKyY66ocuLQ98gyQqDPttcPCmwJWfxHXicGxv3gZCiZBXp2S2L26idG66w48BJkZCL7NcROau7JY1SZAumLtDQYlrcqFGrp0DAhHT25ZCj

#### 方法 B: Facebook Login Flow（本番環境推奨）

1. **Facebook Login ダイアログの実装**
   ```
   GET https://www.facebook.com/v19.0/oauth/authorize
   ?client_id={APP_ID}
   &redirect_uri={REDIRECT_URI}
   &scope=instagram_basic,pages_read_engagement
   &response_type=code
   ```

2. **Authorization Code を取得**

3. **Server 側でトークン交換**
   ```
   POST https://graph.instagram.com/v19.0/oauth/access_token
   ?client_id={APP_ID}
   &client_secret={APP_SECRET}
   &grant_type=authorization_code
   &redirect_uri={REDIRECT_URI}
   &code={CODE}
   ```

### ステップ 7.2: 短期トークンから長期トークンへの変換

**短期トークンは数時間で失効します。本番運用には長期トークン（60日有効）が必須です。**

#### 変換リクエスト

```bash
GET https://graph.instagram.com/v19.0/access_token
?grant_type=ig_exchange_token
&client_secret={APP_SECRET}
&access_token={SHORT_LIVED_TOKEN}
```

#### レスポンス例

```json
{
  "access_token": "IGQVJVcW5Qal93X...",
  "token_type": "bearer",
  "expires_in": 5184000
}
```

#### 有効期間

- **短期トークン**: 数時間（通常 1-2 時間）
- **長期トークン**: 60 日
- **変換後の有効期限**: 発行日から 60 日後

---

## セクション 8: トークン有効期限管理

### 重要なトークン有効期限ルール

| トークンタイプ | 有効期限 | 備考 |
|---|---|---|
| **短期トークン** | 数時間 | 開発/テスト用。本番不向き |
| **長期トークン** | 60日間 | デフォルト有効期限 |
| **未使用での失効** | 60日間 | 60日以上使用されないと自動失効 |
| **リフレッシュ後** | 60日間 | リフレッシュ日から新たに 60 日 |

### トークン有効期限の確認方法

#### 方法 1: Graph API Explorer

```bash
GET https://graph.instagram.com/debug_token
?input_token={YOUR_TOKEN}
&access_token={APP_TOKEN}
```

レスポンス:
```json
{
  "data": {
    "app_id": "123456789",
    "type": "USER",
    "application": "DONATI",
    "data_access_expires_at": 1735689600,
    "expires_at": 1735689600,
    "is_valid": true,
    "scopes": ["instagram_basic", "pages_read_engagement"],
    "user_id": "987654321"
  }
}
```

#### 方法 2: Unix タイムスタンプ変換

取得した `expires_at` を UTC 日時に変換:

```javascript
// Node.js の例
const expiresAt = 1735689600;
const expiryDate = new Date(expiresAt * 1000);
console.log(expiryDate); // 2025-01-02T00:00:00.000Z
```

### 有効期限が迫っているかの確認

```python
import requests
from datetime import datetime, timedelta

token = "YOUR_ACCESS_TOKEN"
app_token = "YOUR_APP_TOKEN"

response = requests.get(
    "https://graph.instagram.com/debug_token",
    params={
        "input_token": token,
        "access_token": app_token
    }
)

data = response.json()["data"]
expires_at = data["expires_at"]
expiry_date = datetime.fromtimestamp(expires_at)
days_remaining = (expiry_date - datetime.now()).days

if days_remaining < 7:
    print(f"⚠️ トークンが {days_remaining} 日で失効します")
else:
    print(f"✓ トークンは有効です({days_remaining} 日残り)")
```

---

## セクション 9: トークン更新・リフレッシュ方法

### ステップ 9.1: 自動リフレッシュスケジュール

**推奨スケジュール**: 50-55日ごと（60日失効の安全マージン）

```
Day 1:    新トークン取得
Day 50:   リフレッシュ実行（初回）
Day 100:  リフレッシュ実行（2回目）
Day 150:  リフレッシュ実行（3回目）
...
```

### ステップ 9.2: トークンリフレッシュ API

#### リフレッシュリクエスト

```bash
GET https://graph.instagram.com/v19.0/refresh_access_token
?grant_type=ig_refresh_token
&access_token={LONG_LIVED_TOKEN}
```

#### レスポンス例

```json
{
  "access_token": "IGQVJVcW5Qal93X...",
  "token_type": "bearer",
  "expires_in": 5184000
}
```

#### Node.js 実装例

```javascript
// token-refresh.js
const https = require('https');

async function refreshInstagramToken(currentToken) {
  return new Promise((resolve, reject) => {
    const query = new URLSearchParams({
      grant_type: 'ig_refresh_token',
      access_token: currentToken
    });

    const url = `https://graph.instagram.com/v19.0/refresh_access_token?${query}`;

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.access_token) {
            resolve({
              token: result.access_token,
              expiresIn: result.expires_in,
              expiryDate: new Date(Date.now() + result.expires_in * 1000)
            });
          } else {
            reject(new Error(result.error?.message || 'Token refresh failed'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

module.exports = { refreshInstagramToken };
```

#### Python 実装例

```python
# token_refresh.py
import requests
from datetime import datetime, timedelta

def refresh_instagram_token(long_lived_token):
    """
    Instagram 長期トークンをリフレッシュします

    Args:
        long_lived_token (str): 現在の長期トークン

    Returns:
        dict: 新しいトークンと有効期限情報
    """
    url = "https://graph.instagram.com/v19.0/refresh_access_token"

    params = {
        'grant_type': 'ig_refresh_token',
        'access_token': long_lived_token
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()

        data = response.json()

        if 'access_token' in data:
            expiry_date = datetime.now() + timedelta(seconds=data['expires_in'])

            return {
                'token': data['access_token'],
                'expires_in': data['expires_in'],
                'expiry_date': expiry_date,
                'success': True
            }
        else:
            return {
                'error': data.get('error', {}).get('message', 'Unknown error'),
                'success': False
            }

    except requests.exceptions.RequestException as e:
        return {
            'error': str(e),
            'success': False
        }

# 使用例
if __name__ == '__main__':
    current_token = "YOUR_LONG_LIVED_TOKEN"
    result = refresh_instagram_token(current_token)

    if result['success']:
        print(f"✓ トークンリフレッシュ成功")
        print(f"  新しいトークン: {result['token'][:20]}...")
        print(f"  有効期限: {result['expiry_date']}")
    else:
        print(f"✗ リフレッシュ失敗: {result['error']}")
```

### ステップ 9.3: GitHub Actions でのスケジュール自動リフレッシュ

トークンリフレッシュを自動化する GitHub Actions ワークフロー例:

```yaml
# .github/workflows/refresh-instagram-token.yml
name: Refresh Instagram Token

on:
  schedule:
    # 毎月 1 日の UTC 00:00 に実行（50日ごと調整）
    - cron: '0 0 1 * *'
  workflow_dispatch:

jobs:
  refresh-token:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Refresh Instagram Token
        run: |
          node scripts/refresh-token.js
        env:
          CURRENT_TOKEN: ${{ secrets.INSTAGRAM_ACCESS_TOKEN }}

      - name: Update .env.production
        run: |
          # トークンを更新（スクリプトで新しいトークンを STDOUT に出力）
          NEW_TOKEN=$(node scripts/refresh-token.js --output-token)
          # GitHub Secret を更新する場合は別途パイプラインで処理
          echo "Token refreshed successfully"
```

### ステップ 9.4: Environment Variables での定期更新

**.env ファイルでのトークン管理ベストプラクティス**:

```env
# .env
# Instagram Graph API
INSTAGRAM_BUSINESS_ACCOUNT_ID=123456789
INSTAGRAM_ACCESS_TOKEN=IGQVJVcW5Qal93X...
INSTAGRAM_TOKEN_REFRESH_DATE=2025-01-28  # 最終リフレッシュ日
INSTAGRAM_TOKEN_EXPIRY_DATE=2025-03-29   # 失効予定日

# Meta App
META_APP_ID=1234567890
META_APP_SECRET=xxxxxxxxxxxxxxxxxxxx
```

**リフレッシュ後の更新手順**:

1. `INSTAGRAM_ACCESS_TOKEN` を新しいトークンに置き換え
2. `INSTAGRAM_TOKEN_REFRESH_DATE` を現在日付に更新
3. `INSTAGRAM_TOKEN_EXPIRY_DATE` を 60日後に更新
4. ファイルを保存
5. デプロイ前に `.env.production` も同じ値で更新

### ステップ 9.5: トークンリフレッシュ失敗時の対応

**失敗パターンと対応方法**:

| エラー | 原因 | 対応方法 |
|---|---|---|
| `invalid_access_token` | トークンが無効 | 新規トークンを取得 |
| `invalid_client_id` | APP_ID が間違い | Meta Developers で確認 |
| `error_code: 190` | トークン有効期限切れ | トークンを新規取得 |
| `invalid_request` | リクエスト形式が不正 | URL/パラメータを確認 |

**新規トークン取得フロー**（リフレッシュ失敗時）:

1. **Graph API Explorer で新規取得**
   - https://developers.facebook.com/tools/explorer/
   - "Get User Access Token" をクリック
   - 必要な permissions を選択
   - 新しい短期トークンを取得

2. **短期トークンを長期に変換**
   ```
   GET https://graph.instagram.com/v19.0/access_token
   ?grant_type=ig_exchange_token
   &client_secret={APP_SECRET}
   &access_token={SHORT_LIVED_TOKEN}
   ```

3. **.env を更新**
   - 新しいトークンを設定
   - リフレッシュ日を記録

---

## セクション 10: Rate Limiting 対策

### Rate Limit の理解

Instagram Graph API には以下のレート制限があります:

**デフォルト制限**:
- **200リクエスト/時間** per Instagram Business Account
- **2,000リクエスト/時間** with 10 connected Instagram accounts

**実装時の考慮事項**:

```javascript
// リクエスト数をカウント
const requestTracker = {
  hourStart: Date.now(),
  count: 0,
  maxPerHour: 200,

  canMakeRequest() {
    const now = Date.now();
    const elapsed = now - this.hourStart;

    // 1時間経過で カウントをリセット
    if (elapsed > 3600000) {
      this.hourStart = now;
      this.count = 0;
    }

    return this.count < this.maxPerHour;
  },

  recordRequest() {
    this.count++;
  }
};
```

### 最適化方法

1. **不要な API コールの削減**
   - 必要なフィールドのみ取得
   - 例: `?fields=id,caption,media_type` のみ指定

2. **キャッシング**
   - API 結果を 24-48 時間キャッシュ
   - Redis or ローカルファイルキャッシュ

3. **Webhook 購読**
   - ポーリングの代わりに Webhook でイベント受信
   - リアルタイムなコンテンツ更新

---

## セクション 11: トラブルシューティング

### よくある問題と解決方法

#### 問題 1: "Invalid OAuth access token"

**原因**: トークンが失効または無効

**対応**:
1. トークンが存在するか確認
2. トークンが 60 日以上使用されていないか確認
3. 新規トークン取得フロー実行

#### 問題 2: "Permission denied"

**原因**: 必要な permissions がない

**対応**:
1. Meta Developers で App を開く
2. Settings > Basic > Required Permissions 確認
3. 必要な permission を追加
4. 新規トークン取得

#### 問題 3: "Business Account is not linked to an Instagram Account"

**原因**: Instagram と Facebook ページが未連携

**対応**:
1. Instagram Settings を開く
2. Business > Business Account Settings
3. Facebook ページを再度接続

#### 問題 4: トークンリフレッシュが失敗

**原因**: トークンが 60 日以上未使用

**対応**:
- 新規トークン取得（リフレッシュは不可）
- 今後は 50-55 日ごとの定期リフレッシュを実施

#### 問題 5: "Rate limit exceeded"

**原因**: 1 時間に 200 を超えるリクエスト

**対応**:
- 不要な API コールを削減
- キャッシング機能を実装
- Webhook への移行を検討

---

## セクション 12: セキュリティ考慮事項

### App Secret の管理

**絶対にしてはいけないこと**:
- GitHub に公開コミット
- ソースコードに埋め込み
- クライアント側 JavaScript に含める

**推奨される管理方法**:

1. **ローカル開発**
   ```bash
   # .env.local（Git 除外）
   INSTAGRAM_ACCESS_TOKEN=xxx
   META_APP_SECRET=yyy
   ```

2. **Vercel デプロイ**
   - Vercel Settings > Environment Variables
   - 秘密情報として登録

3. **GitHub Secrets**
   ```bash
   # GitHub Actions
   env:
     META_APP_SECRET: ${{ secrets.META_APP_SECRET }}
   ```

### トークン保管のベストプラクティス

1. **Server-Side Only**
   - トークンはサーバー環境変数に
   - API Gateway 経由でのみクライアントに提供

2. **HTTPS 通信**
   - トークンを HTTP で送信しない
   - すべての通信を HTTPS で暗号化

3. **定期更新**
   - 60 日ごとにリフレッシュ
   - 古いトークンは削除

4. **監視**
   - トークン使用状況のログ記録
   - 異常なアクセスパターンの検知

---

## セクション 13: 統合チェックリスト

実装前に以下が完了しているか確認してください:

### Meta Developer 側設定

- [ ] Meta Developer アカウント作成完了
- [ ] App ID を取得
- [ ] App Secret を `.env` に保管
- [ ] Instagram Graph API product を追加
- [ ] 必要な permissions を設定

### Instagram ビジネスアカウント準備

- [ ] Instagram アカウントを Business/Creator 化
- [ ] Facebook ページを作成
- [ ] Instagram と Facebook ページを連携
- [ ] Business Account ID を確認

### アクセストークン取得

- [ ] 短期トークンを取得
- [ ] 短期トークンを長期に変換
- [ ] 長期トークンを `.env` に保管
- [ ] トークン有効期限を記録

### 運用体制

- [ ] トークンリフレッシュスケジュール設定
- [ ] リフレッシュスクリプト実装（自動化）
- [ ] トークン失効時の対応手順文書化
- [ ] Rate Limiting 対策実装
- [ ] エラーハンドリング実装

---

## 参考リンク

### 公式ドキュメント
- [Meta Developer - Instagram Graph API](https://developers.facebook.com/docs/instagram-api/)
- [Access Tokens - Meta](https://developers.facebook.com/docs/facebook-login/access-tokens)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)

### ガイド・チュートリアル
- [Instagram Graph API: Complete Developer Guide for 2025](https://elfsight.com/blog/instagram-graph-api-complete-developer-guide-for-2025/)
- [How to get Facebook Access Token in 1 minute (2025)](https://elfsight.com/blog/how-to-get-facebook-access-token/)
- [Instagram API Integration Guide for Developers (2025)](https://www.todaysmm.com/en/blog/instagram-api-integration)
- [How To Get Instagram Access Token in 2025](https://theplusaddons.com/blog/get-instagram-access-token/)

### 技術リファレンス
- [Instagram API Rate Limiting](https://developers.facebook.com/docs/graph-api/overview/rate-limiting)
- [Token Refresh Endpoint](https://reshmeeauckloo.com/posts/powerautomate_instagram-refresh-longlived-token/)
- [Instagram Business ID Guide](https://docs.matillion.com/metl/docs/6957316/)

---

## 質問・トラブル時の連絡先

セットアップ中に問題が発生した場合:

1. **Meta Support**: https://www.facebook.com/help/contact/
2. **GitHub Issues**: プロジェクトリポジトリ
3. **プロジェクトチーム**: namdaama（エンジニア）

---

**最後に**: このガイドは 2025年12月時点での最新情報に基づいています。Meta の API 仕様は変更される可能性があるため、公式ドキュメント確認を推奨します。
