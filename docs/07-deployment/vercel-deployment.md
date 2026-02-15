# Vercel デプロイメント ガイド

DONATIウェブサイトのVercelでのホスティング・デプロイメント設定・トラブルシューティングについて。

## 環境別設定

### 本番環境
- **URL**: https://donati-science.jp
- **ブランチ**: `release`
- **自動デプロイ**: releaseブランチへのプッシュで本番デプロイ
- **用途**: クライアント（フジ）向けの公開サイト
- **DNS**: カスタムドメイン（ドメイン管理者がCNAMEレコード設定）

### ステージング環境
- **URL**: https://stg.donati-science.jp
- **ブランチ**: `master`（開発統合ブランチ）
- **自動デプロイ**: masterブランチへのプッシュでデプロイ
- **認証**: Vercel Authentication有効（プロジェクトメンバーのみアクセス可能）
- **用途**: 本番前の動作確認、デザイナーレビュー、クライアント確認
- **DNS**: サブドメイン設定（CNAME で Vercel に向ける）

### プレビュー環境
- **URL**: 機能ブランチごと自動生成（例: `https://donati-git-feature-*.vercel.app/`）
- **ブランチ**: 機能ブランチ
- **自動デプロイ**: 機能ブランチへのプッシュでデプロイ
- **認証**: Vercel Authentication有効
- **用途**: PR確認、機能テスト

## 環境変数管理

### 設定場所
Vercelダッシュボード → Project Settings → Environment Variables

### 必須環境変数
```env
# microCMS（秘密情報）
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# 公開情報
PUBLIC_INSTAGRAM_URL=https://www.instagram.com/donati_science_space/
PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
```

### 環境別設定
- **MICROCMS_SERVICE_DOMAIN**, **MICROCMS_API_KEY**: 本番・ステージング・プレビュー共通
- **PUBLIC_** で始まる環境変数: 全環境で同一値

### 環境変数が反映されない場合
1. Vercelダッシュボードの設定とローカル `.env` の同期確認
2. ビルドログを確認（環境変数が読み込まれているか）
3. 変更後、Vercelダッシュボードで再デプロイをトリガー

## Vercel Authentication

### 現在の状態
- **有効状態**: オン
- **適用範囲**: プレビュー環境（production以外）
- **アクセス権限**: プロジェクトメンバー（Guest/Member/Owner）
- **メンバー追加**: プロジェクトオーナー（namdaama）が管理

### API連携でVercel Authenticationを迂回する場合
1. Vercelダッシュボードで「Protection Bypass for Automation」を有効化
2. `VERCEL_AUTOMATION_BYPASS_SECRET` を生成
3. APIリクエストヘッダーに `x-vercel-protection-bypass` を追加

## DNS設定

### 本番ドメイン `donati-science.jp` の設定手順

1. **Vercelダッシュボードで追加**
   - Project Settings → Domains
   - ドメイン `donati-science.jp` を入力

2. **Vercelが提供するDNSレコード情報を確認**
   - Vercel が「CNAME レコード設定画面」を表示
   - 例: `159884616d2e1142.vercel-dns-017.com.` など

3. **ドメイン管理者に連絡**
   - DNS設定内容: `CNAME @ → <Vercelが指示したレコード>`
   - 設定反映には数時間〜24時間要する
   - **重要**: GCP Cloud DNS や他のプロバイダーの DNS コンソールで設定が必要

4. **Vercel で確認**
   - DNS設定完了後、Vercel ダッシュボードでドメイン認証が完了
   - `https://donati-science.jp` でアクセス可能に

### ステージング環境 `stg.donati-science.jp` の設定手順

1. **Vercelダッシュボードで追加**
   - Project Settings → Domains
   - ドメイン `stg.donati-science.jp` を入力

2. **Vercelが提供するDNSレコード情報を確認**
   - Vercel が CNAME レコード値を表示

3. **ドメイン管理者に連絡**
   - サブドメイン: `stg`
   - DNS設定: CNAME で Vercel が指示した値に向ける

4. **DNS反映確認**
   - 反映後、`https://stg.donati-science.jp` でアクセス可能

### SSL証明書
- Vercel は自動的に Let's Encrypt の SSL 証明書を発行・更新
- 設定後、HTTPS でアクセス可能（自動リダイレクト）
- 本番と同様のセキュアな環境が自動構築される

### DNS設定確認コマンド
```bash
# 本番ドメイン確認
dig donati-science.jp CNAME
nslookup donati-science.jp

# ステージングドメイン確認
dig stg.donati-science.jp CNAME
nslookup stg.donati-science.jp
```

## デプロイフロー

1. **開発**: ローカルで `npm run dev`
2. **プレビュー**: 機能ブランチをpushしてプレビューURL確認
3. **ステージング**: `master` ブランチにマージで stg.donati-science.jp に自動デプロイ
4. **本番リリース**: `master` から `release` ブランチにマージで本番環境（donati-science.jp）へ自動デプロイ

## QRコード生成

### 推奨ツール

#### Google Chart API（無料、即時生成可能）
```
https://chart.googleapis.com/chart?chs=300x300&chld=M|0&cht=qr&chl=<URLエンコード済みURL>
```

**本番サイト用**
```
https://chart.googleapis.com/chart?chs=300x300&chld=M|0&cht=qr&chl=https%3A%2F%2Fdonati-science.jp
```

**ステージング環境用**
```
https://chart.googleapis.com/chart?chs=300x300&chld=M|0&cht=qr&chl=https%3A%2F%2Fstg.donati-science.jp
```

#### QR Code Generator（https://www.qr-code-generator.com/）
- ロゴ埋め込み、カスタムカラー対応
- クライアント向け配布用に推奨
- 無料プラン利用可

#### 快速 QR（https://qr.gs/）
- シンプルで高速

### 用途別推奨

| 用途 | ツール | サイズ | 用例 |
|------|--------|--------|------|
| クライアント向け配布 | QR Code Generator | カスタム | ロゴ埋め込み、チラシ |
| メール/SNS | Google Chart API | 200×200px | LINE、メール |
| 印刷物（大判） | QR Code Generator | 1000px以上 | ポスター、看板 |
| SNS（正方形） | Google Chart API | 300×300px | Instagram、Twitter |

## トラブルシューティング

### アクセス・ドメイン関連

**プレビュー環境にアクセスできない**
- Vercelアカウントのプロジェクトメンバーシップを確認
- ブラウザのキャッシュをクリア

**ステージング環境（stg.donati-science.jp）が「無効な設定」と表示**
- Vercel ダッシュボードで DNS レコード情報を確認
- ドメイン管理者に DNS 設定を依頼（CNAME レコード更新）
- DNS キャッシュ削除: `nslookup stg.donati-science.jp` で確認

**カスタムドメインが反映されない（本番・ステージング共通）**
- DNS設定の反映待機（24時間程度かかる場合あり）
- `dig donati-science.jp` で DNS レコード確認
- Vercel ダッシュボードでドメイン認証ステータスを確認

### デプロイ・ビルド関連

**環境変数が反映されない**
- Vercelダッシュボードの設定とローカル `.env` の同期確認
- ビルドログで環境変数が読み込まれているか確認
- Vercelダッシュボードで再デプロイをトリガー

**ビルドエラー**
- `npm run build` でローカル確認後、Vercelのビルドログを確認
- 型チェック: `npm run astro check`
- ビルドログのエラーメッセージを詳確認

**CSS が適用されない**
- Tailwind ビルドプロセスの確認
- `npm run build` を再実行
- ブラウザのキャッシュをクリア
- Vercelダッシュボードで再デプロイをトリガー

### その他

**デプロイが止まっている**
- Veruel ダッシュボードで「Deployments」を確認
- ビルドログでエラーの詳細を確認
- GitHub Actions（CI/CD）でエラーがないか確認

**本番環境への反映が遅い**
- Vercelの CDN キャッシュをクリア（Vercel ダッシュボード → Settings）
- DNS キャッシュをクリア（`dig donati-science.jp +noall +answer` で確認）
