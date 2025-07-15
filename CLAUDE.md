# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code)への指針を提供します。

## プロジェクト概要

「サイエンス アンド スペース ラボ DONATI」のコーポレートサイト。科学実験ショーや宇宙関連の活動を紹介。AstroとTypeScriptで構築。

## 必須コマンド

### 開発
```bash
npm run dev        # 開発サーバーを起動 (http://localhost:4321)
npm run build      # 型チェックを実行し本番用にビルド
npm run preview    # 本番ビルドをローカルでプレビュー
```

### 型チェック
```bash
npm run astro check  # Astroの組み込み型チェックを実行
```

## アーキテクチャ概要

### フレームワーク: Astro (静的サイト生成)
- **ページ**: `src/pages/`に配置 - ファイルベースルーティング
- **コンポーネント**: 再利用可能な`.astro`コンポーネントは`src/components/`
- **レイアウト**: ページテンプレートは`src/layouts/` (現在はLayout.astroのみ)
- **スタイル**: TailwindCSSを使用、カスタムテーマカラーは`tailwind.config.mjs`で定義

### コンテンツ管理
- **microCMS連携**: APIクライアントは`src/lib/microcms.ts`
  - ニュース記事: `News`型
  - 実績: `Achievement`型
  - 必要な環境変数: `MICROCMS_SERVICE_DOMAIN`と`MICROCMS_API_KEY`

### TypeScript設定
- パスエイリアス設定済み:
  - `@/*` → `src/*`
  - `@components/*` → `src/components/*`
  - `@layouts/*` → `src/layouts/*`

### 主要な設計パターン
1. **コンポーネント構造**: ほとんどのコンポーネントは`.astro`形式でfrontmatterでpropsを定義
2. **ビジュアルエフェクト**: `AuroraBackground.astro`や`Stars.astro`などの宇宙テーマのカスタムコンポーネント
3. **データ取得**: microCMSのデータはビルド時にページコンポーネントで取得

## 新機能（2025年1月実装）

### 1. カルーセル機能
- **コンポーネント**: `src/components/Carousel.astro`
- **機能**: 自動スライド（4秒間隔）、ドットナビゲーション、ホバーで一時停止
- **画像配置**: `public/images/carousel/`ディレクトリ
- **データ管理**: `src/config/site.ts`の`carouselData`

### 2. Instagram埋め込み
- **コンポーネント**: `src/components/InstagramSection.astro`
- **URL設定**: 環境変数`PUBLIC_INSTAGRAM_URL`で管理
- **表示場所**: トップページの「最新の活動」セクション

### 3. Googleフォーム統合
- **実装場所**: `src/pages/contact.astro`
- **フォームID**: 環境変数`PUBLIC_GOOGLE_FORM_ID`で管理
- **レスポンシブ対応**: モバイルで高さ600px、デスクトップで800px

### 4. 設定の一元管理
- **設定ファイル**: `src/config/site.ts`
- **管理内容**: サイト基本情報、ソーシャルメディアURL、カルーセルデータ、サービス一覧
- **型安全**: TypeScriptによる型定義

## 環境設定

プロジェクト実行前に:
1. `.env.example`を`.env`にコピー
2. 必要な環境変数を設定:
   ```env
   # microCMS（秘密情報）
   MICROCMS_SERVICE_DOMAIN=your-service-domain
   MICROCMS_API_KEY=your-api-key
   
   # 公開情報
   PUBLIC_INSTAGRAM_URL=https://www.instagram.com/donati_science/
   PUBLIC_GOOGLE_FORM_ID=your-google-form-id
   PUBLIC_TWITTER_URL=
   PUBLIC_FACEBOOK_URL=
   ```

## デプロイ

### Vercelプレビューデプロイ
- プレビューURL: `https://donati-git-master-namdaamas-projects.vercel.app/`
- `master`ブランチへのプッシュで自動デプロイ
- 環境変数はVercelダッシュボードで設定

## レスポンシブデザイン実装

### モバイル対応の技術詳細
- **Viewportメタタグ**: Layout.astro:17で設定
- **ブレークポイント**: TailwindCSSのデフォルト（sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px）
- **モバイルナビゲーション**: Header.astroにハンバーガーメニュー実装（JavaScriptトグル機能付き）

### レスポンシブパターン
1. **グリッドレイアウト**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`パターンを多用
2. **文字サイズ**: モバイルからデスクトップへ段階的に拡大（例: `text-4xl md:text-5xl lg:text-6xl`）
3. **条件付き表示**: `hidden md:block`や`hidden sm:inline-block`で要素の表示を制御
4. **パディング調整**: `py-16 md:py-24`のようにデバイスサイズに応じて余白を調整

### コンポーネント別実装
- **Header**: モバイル用ハンバーガーメニュー、デスクトップ用水平ナビゲーション
- **Hero**: レスポンシブタイポグラフィと余白
- **カード系コンポーネント**: グリッドによる自動レイアウト調整
- **Footer**: モバイルで縦積み、デスクトップで3カラム

## 配色管理

### 技術仕様書の配色（2025年1月追加）
- **primary-color**: `#2c5aa0` - メインブルー
- **secondary-color**: `#f4a261` - アクセントオレンジ

### 既存の配色（維持）
- **deep-blue**: `#1a237e`
- **space-blue**: `#0d47a1`
- **light-blue**: `#1976d2`
- **accent-orange**: `#ff6f00`
- **accent-green**: `#00c853`

## 画像管理

### public/images/
- 直接URLでアクセスする画像
- 最適化不要な画像（ファビコン、OGP画像など）
- カルーセル画像: `/images/carousel/`

### src/assets/images/（将来的に推奨）
- Astroで最適化する画像
- `astro:assets`のImageコンポーネントで使用

## 重要事項

- サイトは静的HTML（サーバーサイドレンダリングなし）
- 全ページ日本語
- カスタムテーマカラーは宇宙・科学テーマ
- Noto Sans JPフォントファミリーを使用
- 設定の一元管理により保守性向上