# Instagram Graph API セットアップ — 一緒にやる用の手順書

> フジさんが操作、エンジニアが横でサポートする想定です。
> 各ステップで取得した値は、下の「メモ欄」に書き込んでください。

---

## 用意するもの

- [ ] フジさんのスマートフォン（Instagram アプリ入り）
- [ ] PC（ブラウザ: Chrome 推奨）
- [ ] Instagram のログイン情報（`@donati_science_space`）
- [ ] Facebook のログイン情報

---

## メモ欄（ここに書き込む）

```
アプリID (FACEBOOK_APP_ID):

App Secret (FACEBOOK_APP_SECRET):

短期トークン:

長期トークン (INSTAGRAM_ACCESS_TOKEN):

Account ID (INSTAGRAM_BUSINESS_ACCOUNT_ID):

トークン取得日:              → 期限:            （+60日）
```

---

## 1. Instagram プロアカウント化【スマホ】

> 既にプロアカウントなら → スキップして 2 へ

1. Instagram アプリを開く
2. プロフィール → **≡** → **設定とプライバシー**
3. **アカウントの種類とツール** → **プロアカウントに切り替え**
4. カテゴリ: 「科学者」or「教育」
5. タイプ: **ビジネス**
6. 完了

**チェック**: プロフィールに「プロフェッショナルダッシュボード」が出ればOK

---

## 2. Meta Developer 登録【PC】

1. https://developers.facebook.com/ を開く
2. 右上 **「ログイン」** → Facebook アカウントでログイン
3. 利用規約が出る → **「同意する」**
4. 本人確認 → **電話番号認証（SMS）** がおすすめ
   - 2段階認証を求められたら設定する
5. https://developers.facebook.com/apps/ が開けば完了

> **うまくいかない場合**: シークレットモード（Ctrl+Shift+N）で試す

---

## 3. アプリ作成【PC】

1. https://developers.facebook.com/apps/ → **「アプリを作成」**
2. ユースケース → **「その他」** → 次へ
3. アプリタイプ → **「ビジネス」** → 次へ
4. 入力:
   - アプリ名: **`DONATI Website`**
   - メール: （フジさんのメール）
   - ビジネスポートフォリオ: スキップでOK
5. **「アプリを作成」** クリック

### → 認証情報をメモ

6. 左メニュー → **設定** → **ベーシック**
7. **アプリID** → メモ欄に記入
8. **app secret** → 「表示」→ メモ欄に記入

### → ドメイン設定（任意）

9. 同じ画面で **アプリドメイン** に `donati-science.jp` と入力
10. **「変更を保存」**

---

## 4. Instagram API を追加【PC】

1. 左メニュー or ダッシュボードの **「製品を追加」**
2. **「Instagram」** を探して **「設定」**
3. **「API setup with Instagram login」** を選ぶ
   - 「Facebook login」の方ではないので注意

---

## 5. Instagram アカウントを接続【PC】

1. **「Instagram アカウントを追加」** をクリック
2. Instagram ログイン画面が出る
3. `@donati_science_space` のIDとパスワードでログイン
4. 権限の許可画面 → **「許可」**
5. 「I Understand」にチェック → 確認

### → 短期トークンをメモ

6. ダッシュボードに表示されたトークンをコピー → メモ欄「短期トークン」に記入

---

## 6. 長期トークンに変換【PC】

ブラウザのアドレスバーに以下を貼り付け（値を差し替え）:

```
https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=【App Secretの値】&access_token=【短期トークンの値】
```

画面に JSON が表示される:

```json
{
  "access_token": "IGQW...",
  "token_type": "bearer",
  "expires_in": 5184000
}
```

→ `access_token` の値をメモ欄「長期トークン」に記入
→ 今日の日付をメモ欄「トークン取得日」に記入、+60日の日付を「期限」に記入

---

## 7. Account ID を取得【PC】

ブラウザのアドレスバーに以下を貼り付け:

```
https://graph.instagram.com/v21.0/me?fields=id,username&access_token=【長期トークンの値】
```

画面に JSON が表示される:

```json
{
  "id": "1591678425171344",
  "username": "donati_science_space"
}
```

→ `id` の値をメモ欄「Account ID」に記入

---

## 8. 動作確認テスト【PC】

ブラウザのアドレスバーに以下を貼り付け:

```
https://graph.instagram.com/v21.0/【Account IDの値】/media?fields=id,caption,media_url,permalink,timestamp&limit=3&access_token=【長期トークンの値】
```

**成功**: 投稿データの JSON が表示される（caption, media_url 等が見える）
**失敗**: エラーメッセージが表示される → トークンやIDを確認

---

## 9. 完了チェック

メモ欄が全部埋まっているか確認:

- [ ] アプリID
- [ ] App Secret
- [ ] 長期トークン
- [ ] Account ID
- [ ] トークン取得日 & 期限

**全て埋まったら → メモ欄の内容をエンジニアに共有して完了！**

> この後の環境変数設定・実装作業はエンジニアが行います。
