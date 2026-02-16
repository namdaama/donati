# Instagram Graph API 移行 — Meta Developer 登録 & セットアップガイド

## 現状

### プロジェクトの状態（2026-02 時点）

| 項目 | 状態 |
|------|------|
| **本番の Instagram 表示** | 公式 embed（blockquote）方式 |
| **Graph API 実装** | 未着手（実験コードは `/experiments/` にあり） |
| **`.env` 認証情報** | 一部設定済み（Business Account ID・Access Token・App Secret） |
| **`FACEBOOK_APP_ID`** | 未設定（空欄） |
| **トークン有効期限** | 未記録（`INSTAGRAM_TOKEN_EXPIRY_DATE` 空欄） |

### API の最新動向

| 時期 | 変更内容 |
|------|----------|
| 2024年7月 | **Instagram API with Instagram Login** 新設（Basic Display API の後継） |
| 2024年12月4日 | **Instagram Basic Display API 完全廃止**（全リクエストがエラー） |
| 2025年1月 | Graph API v21 で一部 Insights メトリクス廃止 |

**重要**: 個人アカウントではどの API も利用不可。**プロフェッショナルアカウント（Business / Creator）が必須**。

### 2つの API パス

| | Instagram Login パス | Facebook Login パス |
|---|---|---|
| **認証方法** | Instagram で直接ログイン | Facebook 経由でログイン |
| **Facebook ページ** | 不要 | 必要 |
| **セットアップ** | シンプル | やや複雑 |
| **推奨用途** | 自社フィード表示（本プロジェクト向き） | 複数アカウント管理・エンタープライズ |

**本プロジェクトの推奨: Instagram Login パス**（自社アカウントのフィードを自社サイトに表示するだけなので、シンプルな方を選択）

---

## 担当と進め方

| STEP | 担当 | 内容 | 備考 |
|------|------|------|------|
| **STEP 0** | フジさん | Instagram プロアカウント化 | スマホ操作 |
| **STEP 1** | フジさん | Meta Developer 登録 | PC操作・エンジニアがサポート |
| **STEP 2** | フジさん | Meta App 作成 | PC操作・エンジニアがサポート |
| **STEP 3** | フジさん | Instagram API 接続 & トークン取得 | IG ログインが必要 |
| **STEP 4** | エンジニア | 環境変数設定 | フジさんから値を受け取り |
| **STEP 5** | エンジニア | トークン更新運用 | 60日ごと |

> 横で一緒に進める用の簡易手順書: [setup-walkthrough.md](./setup-walkthrough.md)

---

## STEP 0: 事前準備

### 0-1. Instagram プロフェッショナルアカウントへの切り替え

> 所要時間: 5分 / 担当: フジさん / 使用端末: スマートフォン

1. Instagram アプリを開く
2. **プロフィール** → **≡（メニュー）** → **設定とプライバシー**
3. **アカウントの種類とツール** → **プロアカウントに切り替え**
4. カテゴリを選択（「科学者」「教育」など）
5. アカウントタイプ: **ビジネス** を選択
6. 連絡先情報を入力（公開メールアドレス等）→ **完了**

**確認方法**: プロフィール画面に「プロフェッショナルダッシュボード」が表示されれば成功

> **注意**: 切り替えは無料。いつでも個人アカウントに戻せます。

### 0-2. Facebook アカウントの準備

Meta Developer に登録するには Facebook アカウントが必要です。

- 既にアカウントがある場合 → そのまま使用可能
- アカウントがない場合 → https://www.facebook.com/ で作成

> **Facebook ページの作成は不要**です（Instagram Login パスを使用するため）

---

## STEP 1: Meta Developer 登録

> 所要時間: 15〜30分 / PC での作業推奨

### 1-1. Meta for Developers にアクセス

1. https://developers.facebook.com/ を開く
2. 右上の **「ログイン」** をクリック
3. Facebook アカウントでログイン

### 1-2. 開発者として登録

1. 初回ログイン時、**Meta Platform 利用規約** と **開発者ポリシー** が表示される
2. 内容を確認し **「同意する」** をクリック

### 1-3. 本人確認（Identity Verification）

以下のいずれかの方法で本人確認を行います：

| 方法 | 手順 |
|------|------|
| **電話番号認証**（推奨） | SMSで受け取った確認コードを入力 |
| **クレジットカード認証** | 少額の一時的な課金で確認（すぐ返金） |

> **つまずきポイント**: 2段階認証（2FA）を求められる場合があります。認証アプリ（Google Authenticator 等）またはSMSで設定してください。

### 1-4. 登録完了の確認

- https://developers.facebook.com/apps/ にアクセス
- **「マイアプリ」** ページが表示されれば登録完了

---

## STEP 2: Meta App の作成

> 所要時間: 10〜15分

### 2-1. アプリの作成開始

1. https://developers.facebook.com/apps/ で **「アプリを作成」** をクリック

### 2-2. ユースケースの選択

表示される選択肢の中から：

- **「その他」（Other）** を選択 → **「次へ」**

> 「Instagramのメッセージやコンテンツを管理する」も選択肢にありますが、設定項目が増えるため「その他」が最もシンプルです。

### 2-3. アプリタイプの選択

- **「ビジネス」（Business）** を選択 → **「次へ」**

### 2-4. アプリ情報の入力

| 入力項目 | 入力内容 |
|----------|----------|
| **アプリ名** | `DONATI Website` （任意の名前） |
| **連絡先メールアドレス** | 有効なメールアドレス |
| **ビジネスポートフォリオ** | 未設定でOK（スキップ可能） |

→ **「アプリを作成」** をクリック

### 2-5. 作成完了 — 認証情報の取得

アプリダッシュボードが表示されます。以下を記録してください：

1. 左サイドバー → **設定** → **ベーシック**
2. 以下の情報をメモ：

| 情報 | 場所 | 環境変数名 |
|------|------|------------|
| **アプリID** | ページ上部に表示 | `FACEBOOK_APP_ID` |
| **app secret** | 「表示」をクリックで確認 | `FACEBOOK_APP_SECRET` |

> **セキュリティ注意**: App Secret は絶対に外部に公開しないでください。

### 2-6. 基本設定の入力（推奨）

**設定 > ベーシック** で以下を入力しておくと、後の作業がスムーズです：

| 項目 | 値 |
|------|-----|
| **アプリドメイン** | `donati-science.jp` |
| **プライバシーポリシーのURL** | `https://donati-science.jp/privacy`（あれば） |

→ **「変更を保存」**

---

## STEP 3: Instagram API の追加と設定

> 所要時間: 15〜20分

### 3-1. Instagram API 製品の追加

1. アプリダッシュボードの左サイドバー → **「製品を追加」** または **「プロダクト」セクション**
2. **「Instagram」** を見つけて **「設定」** をクリック
3. **「API setup with Instagram login」** を選択

> **ここが重要**: 「API setup with Facebook login」ではなく、**Instagram login** の方を選んでください。

### 3-2. Instagram アカウントの接続

1. 「Instagram テスター」または「Instagram アカウントを追加」セクションが表示される
2. **「Instagram アカウントを追加」** をクリック
3. Instagram のログイン画面が表示される
4. **DONATI の Instagram アカウント** (`@donati_science_space`) でログイン
5. アプリの権限許可を求められる → **「許可」** をクリック
6. 「I Understand」チェックボックスにチェック → 確認

### 3-3. アクセストークンの取得

アカウント接続が完了すると、ダッシュボードにアクセストークンが表示されます。

1. 表示された **アクセストークン** をコピー
2. これは**短期トークン**（約1時間有効）

### 3-4. 長期トークンへの変換（60日有効）

ブラウザで以下の URL にアクセス（値を置き換えてください）：

```
https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret={FACEBOOK_APP_SECRET}
  &access_token={短期トークン}
```

レスポンス例：
```json
{
  "access_token": "IGQW...(長い文字列)",
  "token_type": "bearer",
  "expires_in": 5184000
}
```

- `access_token` → これが **60日有効の長期トークン**
- `expires_in` = 5184000秒 = 60日

### 3-5. Instagram Business Account ID の取得

長期トークンを使って API を呼び出します：

```
https://graph.instagram.com/v21.0/me
  ?fields=id,username
  &access_token={長期トークン}
```

レスポンス例：
```json
{
  "id": "1591678425171344",
  "username": "donati_science_space"
}
```

- `id` → これが `INSTAGRAM_BUSINESS_ACCOUNT_ID`

### 3-6. 動作確認テスト

投稿が取得できるか確認：

```
https://graph.instagram.com/v21.0/{ACCOUNT_ID}/media
  ?fields=id,caption,media_type,media_url,permalink,timestamp
  &limit=3
  &access_token={長期トークン}
```

投稿データの JSON が返ってくれば成功です。

---

## STEP 4: 環境変数の設定

### 4-1. 取得した情報の一覧

| 環境変数名 | 取得元 | 例 |
|------------|--------|-----|
| `FACEBOOK_APP_ID` | STEP 2-5 で取得 | `123456789012345` |
| `FACEBOOK_APP_SECRET` | STEP 2-5 で取得 | `abc123def456...` |
| `INSTAGRAM_ACCESS_TOKEN` | STEP 3-4 で取得 | `IGQW...` |
| `INSTAGRAM_BUSINESS_ACCOUNT_ID` | STEP 3-5 で取得 | `1591678425171344` |

### 4-2. ローカル `.env` の更新

```env
# Instagram Graph API
FACEBOOK_APP_ID=（STEP 2-5 の値）
FACEBOOK_APP_SECRET=（STEP 2-5 の値）
INSTAGRAM_ACCESS_TOKEN=（STEP 3-4 の長期トークン）
INSTAGRAM_BUSINESS_ACCOUNT_ID=（STEP 3-5 の ID）
INSTAGRAM_TOKEN_EXPIRY_DATE=（トークン取得日 + 60日の日付）
INSTAGRAM_TOKEN_REFRESH_DATE=（トークン取得日 + 50日の日付）

# ハッシュタグフィルター（既存）
ANNOUNCEMENT_HASHTAG="#donati_event"
ENABLE_HASHTAG_FILTER=true
```

### 4-3. Vercel 環境変数の設定

Vercel ダッシュボード → Project Settings → Environment Variables で上記4つを設定。

---

## STEP 5: トークン更新（60日ごとの運用）

### なぜ更新が必要か

長期トークンの有効期限は **60日間** です。期限切れになると API が停止し、サイトの Instagram 表示が消えます。

### 更新方法

期限が切れる **前に**、以下の URL にアクセス：

```
https://graph.instagram.com/refresh_access_token
  ?grant_type=ig_refresh_token
  &access_token={現在の長期トークン}
```

- 新しいトークンが返却される（さらに60日有効）
- 発行後24時間以降〜期限切れ前の間に更新可能
- **期限切れ後は更新不可** → STEP 3 のフローをやり直す必要あり

### 運用スケジュール

```
トークン取得 ─── 50日後 ─── 58日後 ─── 60日後
                  │            │           │
               リマインダー  更新期限     失効
               （メール等）   （要更新）  （APIエラー）
```

→ 将来的に `npm run refresh-token` コマンドで自動化予定

---

## よくあるトラブルと解決策

### Developer 登録時

| 症状 | 原因 | 解決策 |
|------|------|--------|
| 「ログイン」ボタンが反応しない | ブラウザの拡張機能が干渉 | シークレットモードで試す |
| 電話番号認証の SMS が届かない | キャリア制限の可能性 | 別の番号を試す / クレジットカード認証に切り替え |
| 2段階認証でロックアウト | 認証アプリ未設定 | Facebook のアカウント復旧フローを使用 |

### アプリ作成・設定時

| 症状 | 原因 | 解決策 |
|------|------|--------|
| 「Instagram」製品が見つからない | アプリタイプが不適切 | アプリを「ビジネス」タイプで再作成 |
| Instagram ログイン画面が出ない | ポップアップブロック | ブラウザの設定でポップアップを許可 |
| 「権限が不十分」エラー | 開発モード + ロール未設定 | アプリのロール設定で自分を管理者に追加 |

### トークン関連

| 症状 | 原因 | 解決策 |
|------|------|--------|
| `Invalid OAuth access token` | トークン期限切れ | 長期トークンを再取得（STEP 3-4） |
| `Cannot parse access token` | トークン文字列が欠損 | コピペミスを確認、再取得 |
| 投稿が空配列で返る | Account ID とトークンの不一致 | STEP 3-5 で ID を再確認 |
| `Session Invalid`（400エラー） | パスワード変更でトークン無効化 | 再認証 → 新しいトークン生成 |

### App Review について

**本プロジェクトでは App Review は不要です。**

理由：
- 自社サイトで自社の Instagram アカウントのみ表示
- 開発モード（Standard Access）で十分
- アプリのロールに登録されたユーザーのデータのみアクセス

もし将来的に他のユーザーのデータにアクセスする場合は App Review（Advanced Access）が必要になります。

---

## 実装チェックリスト

### Phase 1: 準備（クライアント作業）

- [ ] Instagram プロフェッショナルアカウント化（STEP 0-1）
- [ ] Meta Developer 登録（STEP 1）
- [ ] Meta App 作成（STEP 2）
- [ ] Instagram API 追加 & アカウント接続（STEP 3-1〜3-2）
- [ ] アクセストークン取得 & 長期トークン変換（STEP 3-3〜3-4）
- [ ] Business Account ID 取得（STEP 3-5）
- [ ] API 動作確認テスト（STEP 3-6）
- [ ] 環境変数を開発者に共有（STEP 4-1 の4つの値）

### Phase 2: Graph API 実装（エンジニア作業）

- [ ] `src/lib/instagram-graph-api.ts` 作成
- [ ] `src/pages/index.astro` 更新（InstagramSection → Graph API 連携）
- [ ] `.env.example` 更新
- [ ] `src/config/site.ts` 必要に応じて更新
- [ ] ローカルビルド・動作確認

### Phase 3: トークン管理

- [ ] トークン更新スクリプト作成（`scripts/refresh-instagram-token.ts`）
- [ ] `package.json` に `refresh-token` コマンド追加
- [ ] Vercel 環境変数設定（4つ）

### Phase 4: テスト & デプロイ

- [ ] `npm run build` 成功
- [ ] `npm run preview` で表示確認
- [ ] エラーハンドリング確認（トークン無効時のフォールバック等）
- [ ] master ブランチにマージ → ステージング確認
- [ ] release ブランチにマージ → 本番デプロイ

### Phase 5: 後処理

- [ ] 旧 Instagram embed コード整理
- [ ] `/experiments/instagram-rss-sample/` の扱い決定
- [ ] トークン更新リマインダー設定（50日後）
- [ ] 運用ドキュメント作成

---

## 参考リンク

### Meta 公式

- [Meta for Developers](https://developers.facebook.com/)
- [Instagram Graph API — Getting Started](https://developers.facebook.com/docs/instagram-api/getting-started)
- [Instagram API with Instagram Login](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)

### プロジェクト内ドキュメント

- [詳細移行プラン](../../docs/instagram-graph-api-migration-plan.md) — 技術仕様・データフロー・コード設計
- [コンポーネントガイド](../../docs/05-implementation-guides/components-guide.md) — InstagramSection.astro の仕様

---

## 関連

- 関連 PR: #23（Instagram RSS 連携の実験実装）
- Instagram アカウント: [@donati_science_space](https://www.instagram.com/donati_science_space/)
- 既存環境変数: `.env` に一部設定済み（`INSTAGRAM_BUSINESS_ACCOUNT_ID`, `INSTAGRAM_ACCESS_TOKEN`）
