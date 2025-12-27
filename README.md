# サイエンス アンド スペース ラボ DONATI - Website

科学実験ショーや宇宙に関する活動を行う「サイエンス アンド スペース ラボ DONATI」のコーポレートサイトです。

## 技術スタック

- **Framework**: Astro 4.16
- **Styling**: TailwindCSS
- **CMS**: microCMS (準備済み)
- **Language**: TypeScript
- **画像管理**: 静的ファイル（public/images）
- **外部連携**: Instagram埋め込み、Web3Forms

## スマホ対応

このウェブサイトは完全にレスポンシブ対応しています：

- **モバイルファースト設計**: TailwindCSSのレスポンシブユーティリティを活用
- **ブレークポイント**: sm(640px)、md(768px)、lg(1024px)、xl(1280px)、2xl(1536px)
- **モバイルメニュー**: ハンバーガーメニューによるナビゲーション
- **柔軟なレイアウト**: グリッドシステムが画面サイズに応じて自動調整
- **最適化された表示**: 文字サイズ、余白、画像が各デバイスに最適化

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

## 機能

- **トップページカルーセル**: 自動スライド機能付きの画像カルーセル
- **Instagram連携**: 最新の活動を表示
- **お問い合わせフォーム**: Web3Formsフォーム
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **高速表示**: Astroの静的サイト生成による最適化

### 実験的機能

`experiments/instagram-rss-sample/` ディレクトリに、Instagram RSS連携の実験的実装があります：

- **RSS.app連携**: InstagramフィードをRSSで取得
- **自動お知らせ抽出**: 特定ハッシュタグ（#donati_eventなど）からイベント情報を抽出
- **画像プロキシ**: weserv.nlを使用した安全な画像表示
- **キャッシュ機能**: パフォーマンス向上のための多層キャッシュ
- **エラーハンドリング**: 堅牢なエラー処理とフォールバック機能

詳細は `experiments/instagram-rss-sample/README.md` を参照してください。

## 環境変数

`.env.example` を `.env` にコピーして、必要な情報を設定してください：

```env
# microCMS設定（秘密情報）
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# 公開情報（PUBLIC_プレフィックス付き）
PUBLIC_INSTAGRAM_URL=https://www.instagram.com/donati_science/
PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
PUBLIC_TWITTER_URL=
PUBLIC_FACEBOOK_URL=
```

## ディレクトリ構造

```
src/
├── components/        # 再利用可能なコンポーネント
│   ├── Carousel.astro        # カルーセルコンポーネント
│   ├── InstagramSection.astro # Instagram埋め込み
│   └── ...
├── config/           # サイト設定
│   └── site.ts      # URLやデータの一元管理
├── layouts/          # ページレイアウト
├── pages/            # ページファイル
│   ├── index.astro  # トップページ
│   ├── contact.astro # お問い合わせ（Web3Forms）
│   └── ...
├── styles/           # グローバルスタイル
└── lib/             # ユーティリティとAPI連携

public/
├── images/          # 静的画像ファイル
│   ├── carousel/    # カルーセル用画像
│   └── ...
└── ...

experiments/
└── instagram-rss-sample/  # Instagram RSS連携の実験的実装
    ├── src/
    │   ├── lib/          # RSS取得・解析ロジック
    │   ├── components/   # 表示コンポーネント
    │   └── pages/        # サンプルページ
    └── docs/             # 実装ドキュメント

docs/                     # プロジェクトドキュメント
├── 01-project-overview/  # プロジェクト概要
├── 02-pricing-estimates/ # 価格・工数見積もり
├── 03-technical-specs/   # 技術仕様
├── 04-workflow-collaboration/ # ワークフロー
├── 05-implementation-guides/  # 実装ガイド
└── 06-quality-guidelines/     # 品質ガイドライン
```

## デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)でアカウントを作成
2. GitHubアカウントと連携
3. 「New Project」からこのリポジトリを選択
4. 環境変数を設定:
   - `MICROCMS_SERVICE_DOMAIN`: microCMSのサービスドメイン
   - `MICROCMS_API_KEY`: microCMSのAPIキー
   - `PUBLIC_INSTAGRAM_URL`: InstagramプロフィールURL
   - `PUBLIC_WEB3FORMS_ACCESS_KEY`: Web3Forms Access Key
5. 「Deploy」をクリック

以降、`main`ブランチへのプッシュで自動的にデプロイされます。

### その他のデプロイ方法

- **Netlify**: GitHubリポジトリと連携することで自動デプロイが可能
- **GitHub Pages**: `astro.config.mjs`に`site`設定を追加後、GitHub Actionsでデプロイ
- **静的ホスティング**: `npm run build`後、`dist`フォルダの内容をアップロード