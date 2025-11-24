# Instagram Graph API - クライアント設定ガイド

**作成日**: 2025-01-24
**対象者**: フジ（DONATIクライアント）
**所要時間**: 約2-3時間
**前提**: エンジニア実装（フェーズ2-4）完了済み

---

## 📋 概要

Instagram Graph APIを使用するための準備作業です。この手順を完了すると、Instagramの投稿がWebサイトに自動的に表示されるようになります。

### 準備するもの

- Instagramアカウント: @wakuwaku_science_fuji
- Facebookアカウント（個人）
- メールアドレス（Meta Developer登録用）
- PC・スマートフォン（Instagramアプリ）

---

## ステップ1: Instagram Businessアカウント化

**所要時間**: 15分

### 1-1. Instagramアプリを開く

1. スマートフォンでInstagramアプリを起動
2. @wakuwaku_science_fuji アカウントにログイン

### 1-2. プロフェッショナルアカウントに切り替え

1. プロフィール画面の右上「≡」メニューをタップ
2. 「設定とプライバシー」をタップ
3. 「アカウントの種類とツール」をタップ
4. 「プロフェッショナルアカウントに切り替える」をタップ
5. カテゴリを選択:
   - 「教育」または「科学・技術・工学」を選択
   - 「次へ」をタップ
6. 「ビジネス」を選択（Creatorでも可）
7. 連絡先情報を入力:
   - メールアドレス
   - 電話番号（任意）
   - 住所（任意）
8. 「完了」をタップ

### 1-3. 確認

- プロフィール画面に「プロフェッショナルダッシュボード」が表示されればOK

---

## ステップ2: Facebookページ作成・連携

**所要時間**: 20分

### 2-1. Facebookページ作成

1. PC・スマホでFacebookにアクセス: https://www.facebook.com/
2. 個人アカウントでログイン
3. 左メニューから「ページ」をクリック
4. 「新しいページを作成」をクリック
5. ページ情報を入力:
   - **ページ名**: DONATI - サイエンス アンド スペース ラボ
   - **カテゴリ**: 教育、科学・技術・工学
   - **説明**: 科学実験ショーや宇宙教育を通じて、子どもたちに科学の楽しさを伝える活動をしています。
6. 「ページを作成」をクリック

### 2-2. プロフィール設定

1. プロフィール画像をアップロード（Instagramと同じものを推奨）
2. カバー写真をアップロード（任意）
3. 「保存」をクリック

### 2-3. InstagramとFacebookページを連携

**スマートフォンから:**

1. Instagramアプリを開く
2. プロフィール画面の「≡」メニューをタップ
3. 「設定とプライバシー」→「ビジネス」をタップ
4. 「リンク済みアカウント」または「Facebookページ」をタップ
5. 作成したFacebookページを選択
6. 「リンク」または「接続」をタップ

**PCから:**

1. Instagram設定: https://www.instagram.com/accounts/edit/
2. 「ビジネス設定」を開く
3. 「Facebookページをリンク」をクリック
4. 作成したFacebookページを選択

### 2-4. 確認

- Instagramプロフィール画面で「Facebookページ: DONATIページ名」が表示されればOK

---

## ステップ3: Meta Developer登録・App作成

**所要時間**: 30分

### 3-1. Meta for Developers登録

1. https://developers.facebook.com/ にアクセス
2. 個人Facebookアカウントでログイン
3. 右上「スタート」または「アプリを作成」をクリック
4. 電話番号認証（初回のみ）:
   - 電話番号を入力
   - SMSで届いた認証コードを入力
5. 利用規約に同意

### 3-2. Meta App作成

1. 「アプリを作成」をクリック
2. アプリタイプを選択:
   - 「その他」を選択
   - 「次へ」をクリック
3. アプリ情報を入力:
   - **アプリ表示名**: DONATI Instagram Integration
   - **アプリの連絡先メールアドレス**: （あなたのメールアドレス）
   - **ビジネスアカウント**: （なしでOK）
4. 「アプリを作成」をクリック
5. セキュリティチェック（reCAPTCHA）を完了

### 3-3. Instagram Graph APIを追加

1. アプリダッシュボードで「製品を追加」をクリック
2. 「Instagram Graph API」を探す
3. 「設定」をクリック

### 3-4. App ID・App Secretを確認

1. 左メニュー「設定」→「ベーシック」をクリック
2. 以下の情報をメモ:
   - **アプリID**: 12345678...（数字）
   - **app secret**: abc123...（英数字）
   - 「表示」をクリックしてパスワード入力後、コピー

⚠️ **重要**: App Secretは絶対に他人に教えない・公開しない

---

## ステップ4: アクセストークン取得

**所要時間**: 30分

### 4-1. Graph API Explorerを開く

1. https://developers.facebook.com/tools/explorer/ にアクセス
2. 右上でアプリを選択:
   - 「Meta App」→ 作成した「DONATI Instagram Integration」を選択

### 4-2. トークン生成

1. 「User or Page」を選択
2. 「Get User Access Token」をクリック
3. 権限を選択:
   - ✅ `instagram_basic`
   - ✅ `instagram_manage_insights`（任意）
   - ✅ `pages_show_list`
   - ✅ `pages_read_engagement`
4. 「Generate Access Token」をクリック
5. 権限リクエストを承認:
   - Instagramアカウント選択: @wakuwaku_science_fuji
   - Facebookページ選択: DONATIページ
   - 「続行」をクリック
6. 表示されたトークンをコピー（IGから始まる長い文字列）

### 4-3. 長期トークンに交換

**方法1: Graph API Explorerで交換（推奨）**

1. Graph API Explorerで「Access Token Tool」をクリック
2. 「Extend Access Token」をクリック
3. 延長されたトークンをコピー（IGQW...で始まる）

**方法2: APIで直接交換**

以下のURLをブラウザで開く（{...}を実際の値に置き換え）:

```
https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id={APP_ID}&client_secret={APP_SECRET}&fb_exchange_token={SHORT_TOKEN}
```

レスポンスの`access_token`をコピー

### 4-4. Instagram Business Account IDを取得

1. Graph API Explorerで以下のクエリを実行:

```
me/accounts
```

2. レスポンスからFacebookページIDをコピー（`"id": "123456789..."`）
3. 次のクエリを実行（{PAGE_ID}を置き換え）:

```
{PAGE_ID}?fields=instagram_business_account
```

4. レスポンスの`instagram_business_account.id`をコピー（17841...で始まる数字）

### 4-5. トークン有効性確認

以下のクエリでトークンが正しく動作するか確認:

```
{INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=5
```

- Instagramの投稿データが表示されればOK

---

## ステップ5: 環境変数設定（エンジニアと協力）

**所要時間**: 15分

### 5-1. 情報を整理

以下の4つの情報をまとめます:

```
INSTAGRAM_ACCESS_TOKEN=IGQW...（ステップ4-3で取得）
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841...（ステップ4-4で取得）
FACEBOOK_APP_ID=123456789...（ステップ3-4で取得）
FACEBOOK_APP_SECRET=abc123...（ステップ3-4で取得）
```

### 5-2. エンジニアに共有

⚠️ **重要**: これらの情報は機密情報です。以下の方法で安全に共有してください:

**推奨方法:**
- 1Password、Bitwarden等のパスワード管理ツール
- 暗号化されたメール
- セキュアなファイル共有サービス

**禁止:**
- ❌ 平文のメール
- ❌ Slack・Chatworkの平文メッセージ
- ❌ Googleドキュメント（閲覧権限設定なし）

### 5-3. エンジニア作業（参考）

エンジニアが以下の作業を実施します:

**ローカル環境:**
```bash
# .envファイルに追加
echo "INSTAGRAM_ACCESS_TOKEN=IGQW..." >> .env
echo "INSTAGRAM_BUSINESS_ACCOUNT_ID=17841..." >> .env
echo "FACEBOOK_APP_ID=123456789..." >> .env
echo "FACEBOOK_APP_SECRET=abc123..." >> .env
```

**Vercel本番環境:**
```bash
vercel env add INSTAGRAM_ACCESS_TOKEN production
vercel env add INSTAGRAM_BUSINESS_ACCOUNT_ID production
vercel env add FACEBOOK_APP_ID production
vercel env add FACEBOOK_APP_SECRET production
```

---

## ステップ6: 動作確認

**所要時間**: 15分

### 6-1. ローカル環境でテスト（エンジニア実施）

エンジニアがビルド・動作確認を実施:

```bash
npm run build
npm run preview
```

### 6-2. 本番環境でテスト

1. Vercelにデプロイ（エンジニア実施）
2. 本番サイトにアクセス: https://donati-git-master-namdaamas-projects.vercel.app/
3. トップページの「お知らせ」セクションを確認:
   - ✅ Instagramの投稿が4件表示される
   - ✅ 画像が表示される
   - ✅ タイトル・日付が表示される
4. お知らせカードをクリック:
   - ✅ 詳細ページが開く
   - ✅ 「Instagramで見る」リンクが動作する

### 6-3. トラブルシューティング

**投稿が表示されない場合:**

1. トークンが有効か確認:
   - Graph API Explorerで再度クエリ実行
2. ハッシュタグが正しいか確認:
   - 環境変数`ANNOUNCEMENT_HASHTAG`の値
   - Instagramの投稿にハッシュタグが付いているか
3. エンジニアにビルドログを確認してもらう

---

## ステップ7: カレンダーリマインダー設定

**所要時間**: 5分

### 7-1. リマインダー設定

アクセストークンは60日で期限切れになるため、更新リマインダーを設定:

1. Googleカレンダー・Outlookカレンダーを開く
2. 今日から58日後に予定を作成:
   - **タイトル**: Instagram Graph API トークン更新
   - **説明**: `npm run refresh-token`を実行してトークンを更新
   - **通知**: 当日・3日前
3. 「保存」をクリック

### 7-2. トークン更新手順（60日後）

60日後、以下の手順で更新:

```bash
# ローカル環境で実行
npm run refresh-token
```

新しいトークンが表示されるので、Vercel環境変数を更新:

```bash
vercel env rm INSTAGRAM_ACCESS_TOKEN production
vercel env add INSTAGRAM_ACCESS_TOKEN production
# （表示されたトークンを貼り付け）
```

---

## ✅ チェックリスト

すべて完了したか確認してください:

### ステップ1: Instagram Businessアカウント化
- [ ] Instagramアカウントがビジネスアカウントになっている
- [ ] プロフェッショナルダッシュボードが表示される

### ステップ2: Facebookページ作成・連携
- [ ] Facebookページが作成されている
- [ ] InstagramとFacebookページがリンクされている

### ステップ3: Meta Developer登録・App作成
- [ ] Meta for Developersに登録完了
- [ ] Meta Appが作成されている
- [ ] App ID・App Secretをメモした

### ステップ4: アクセストークン取得
- [ ] 長期アクセストークン（IGQW...）を取得した
- [ ] Instagram Business Account ID（17841...）を取得した
- [ ] テストクエリでInstagramの投稿が取得できた

### ステップ5: 環境変数設定
- [ ] 4つの環境変数をエンジニアに安全に共有した
- [ ] エンジニアがローカル環境に設定完了
- [ ] エンジニアがVercel環境に設定完了

### ステップ6: 動作確認
- [ ] ローカル環境でテスト完了
- [ ] 本番サイトでInstagramの投稿が表示される
- [ ] 詳細ページが正常に動作する

### ステップ7: カレンダーリマインダー設定
- [ ] 58日後のリマインダーを設定した

---

## 📞 サポート

不明点・トラブルがあれば、以下の情報をエンジニアに共有してください:

1. どのステップで詰まったか
2. エラーメッセージのスクリーンショット
3. 実施した手順の詳細

---

## 📚 参考リンク

- Instagram Graph API公式ドキュメント: https://developers.facebook.com/docs/instagram-api/
- トークン更新ガイド: https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens
- Graph API Explorer: https://developers.facebook.com/tools/explorer/

---

**設定完了お疲れ様でした！🎉**

これでInstagramの投稿が自動的にWebサイトに表示されるようになります。
