# サイエンス アンド スペース ラボ DONATI - Website

科学実験ショーや宇宙に関する活動を行う「サイエンス アンド スペース ラボ DONATI」のコーポレートサイトです。

## 技術スタック

- **Framework**: Astro
- **Styling**: TailwindCSS
- **CMS**: microCMS (準備済み)
- **Language**: TypeScript

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 環境変数

`.env.example` を `.env` にコピーして、microCMSの認証情報を設定してください：

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

## ディレクトリ構造

```
src/
├── components/    # 再利用可能なコンポーネント
├── layouts/       # ページレイアウト
├── pages/         # ページファイル
├── styles/        # グローバルスタイル
└── lib/          # ユーティリティとAPI連携
```

## デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)でアカウントを作成
2. GitHubアカウントと連携
3. 「New Project」からこのリポジトリを選択
4. 環境変数を設定:
   - `MICROCMS_SERVICE_DOMAIN`: microCMSのサービスドメイン
   - `MICROCMS_API_KEY`: microCMSのAPIキー
5. 「Deploy」をクリック

以降、`main`ブランチへのプッシュで自動的にデプロイされます。

### その他のデプロイ方法

- **Netlify**: GitHubリポジトリと連携することで自動デプロイが可能
- **GitHub Pages**: `astro.config.mjs`に`site`設定を追加後、GitHub Actionsでデプロイ
- **静的ホスティング**: `npm run build`後、`dist`フォルダの内容をアップロード