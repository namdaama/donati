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

## 環境設定

プロジェクト実行前に:
1. `.env.example`を`.env`にコピー
2. `.env`にmicroCMSの認証情報を追加

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

## 重要事項

- サイトは静的HTML（サーバーサイドレンダリングなし）
- 全ページ日本語
- カスタムテーマカラーは宇宙・科学テーマ（deep-blue、space-blue、accent-orangeなど）
- Noto Sans JPフォントファミリーを使用