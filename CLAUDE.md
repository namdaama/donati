# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code)への指針を提供します。

## プロジェクト概要

「サイエンス アンド スペース ラボ DONATI」のランディングページ。科学実験ショーや宇宙関連の活動を紹介。AstroとTypeScriptで構築。

- **クライアント**: フジ（DONATI - サイエンスコミュニケーター）
- **フレームワーク**: Astro + TailwindCSS
- **言語**: 全ページ日本語
- **ページ構成**: index, about, services, service-fuji, service-hide, professional-experience, contact, 404
- **コア機能**: カルーセル、Instagram埋め込み、Web3Forms統合、FAQアコーディオン

## 必須コマンド

```bash
npm run dev        # 開発サーバーを起動 (http://localhost:4321)
npm run build      # 型チェックを実行し本番用にビルド
npm run preview    # 本番ビルドをローカルでプレビュー
npm run astro check  # Astroの組み込み型チェック
```

## アーキテクチャ概要

### ファイル構成
- **ページ**: `src/pages/` - ファイルベースルーティング
- **コンポーネント**: `src/components/` - 30個の再利用可能コンポーネント（6フォルダ構成）
  - common, overview, services, professional-experience, cards, effects
- **レイアウト**: `src/layouts/` - ページテンプレート（現在Layout.astroのみ）
- **ユーティリティ**: `src/lib/` - microCMS連携（microcms.ts）
- **設定**: `src/config/site.ts` - サイト全体の一元管理

### TypeScript設定
- パスエリアス: `@/*` → `src/*`, `@components/*` → `src/components/*`, `@layouts/*` → `src/layouts/*`

### 主要な設計パターン
- Astroコンポーネント（frontmatterでprops定義）
- microCMSデータはビルド時に取得
- TailwindCSSカスタムテーマ

## 環境設定

1. `.env.example` を `.env` にコピー
2. 環境変数を設定:
   ```env
   MICROCMS_SERVICE_DOMAIN=your-service-domain
   MICROCMS_API_KEY=your-api-key
   PUBLIC_INSTAGRAM_URL=https://www.instagram.com/donati_science_space/
   PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
   ```

## ディレクトリ構成

```
src/
├── pages/           # Astroページ
├── components/      # コンポーネント（6フォルダ）
├── layouts/         # レイアウト
├── lib/             # ユーティリティ・API
├── config/          # 設定ファイル
└── styles/          # グローバルスタイル

public/
└── images/          # 画像一元管理（102ファイル）
    ├── svg/         # SVGファイル（73ファイル）
    │   ├── Carousel/      # カルーセル用SVG（4ファイル + _old/3ファイル）
    │   ├── Screen/        # デザインモックアップ参考用（6ファイル）
    │   ├── icons/         # アイコン類（18ファイル: header/7 + sub/11）
    │   ├── text/          # テキストSVG（16ファイル）
    │   ├── steps/         # ステップ表示（6ファイル）
    │   ├── logos/         # ロゴ類（3ファイル）
    │   ├── performers/    # 出演者画像（4ファイル: fuji/2 + hide/2）
    │   ├── decorations/   # 装飾要素（9ファイル: waveline/4 + 直下5）
    │   └── conference/    # カンファレンス用（4ファイル）
    ├── picture/     # コンテンツ用写真（16ファイル）
    │   ├── About/       # Aboutページ用（5ファイル）
    │   ├── OverView/    # トップページ用（2ファイル）
    │   └── Science/     # サイエンス事業用（9ファイル: card_*/detail_*）
    ├── rough/       # ページ用背景画像（9ファイル: *.jpg, backGround.png等）
    └── forDev/      # 開発用参考画像（4ファイル）
```

詳細はドキュメント構成セクションを参照。

## 基本設計原則

### レスポンシブデザイン
- **基本方針**: max-w-4xl（1024px）で中央寄せ統一
- **Tailwindブレークポイント**: sm:640px, md:768px, lg:1024px
- **横スクロール対策**: body に `overflow-x-hidden` 適用済み（Issue #83完了）
- **詳細**: docs/05-implementation-guides/responsive-design-guide.md を参照

### 配色管理
- **管理場所**: `tailwind.config.mjs`で一元管理
- **詳細**: docs/03-technical-specs/color-management.md を参照

### 画像管理
- **配置**: `public/images/` に一元管理（Figma書き出しも直接配置）
- **構造**:
  - `svg/Carousel/`: カルーセル用SVG（4ファイル + _old/）
  - `svg/Screen/`: 全画面デザインモックアップ参考用（6ファイル）
  - `svg/icons/`: アイコン類（header/, sub/ に階層化、18ファイル）
  - `svg/text/`: テキストSVG（16ファイル）
  - `svg/steps/`: ステップ表示用星アイコン（6ファイル）
  - `svg/logos/`: ロゴ類（3ファイル）
  - `svg/performers/`: 出演者画像（fuji/, hide/ に階層化、4ファイル）
  - `svg/decorations/`: 装飾要素（waveline/ サブディレクトリ含む、9ファイル）
  - `svg/conference/`: カンファレンス用素材（4ファイル）
  - `picture/`: コンテンツ用写真（About/, OverView/, Science/ に階層化、16ファイル）
  - `rough/`: ページ用背景画像（9ファイル: AboutUs.jpg, Contact.jpg等）
  - `forDev/`: 開発用参考画像（4ファイル）
- **重要な設計判断**:
  - Issue #186でディレクトリ構造を大幅に再編成
  - SVGファイルは用途別に細分化（icons, text, steps, logos等）
  - 背景画像は `rough/` ディレクトリに集約
  - `svg/Screen/` は開発参考用のデザインモックアップ（Issue #186で追加）
- **Figmaワークフロー**: Dev Modeから数値取得、public/images/配下の適切なディレクトリに配置
- **詳細**: docs/04-workflow-collaboration/figma-workflow.md を参照

### 文言・コミュニケーション
- **基本方針**: 柔らかく親しみやすい表現（Issue #19実装済み）
- **詳細**: docs/08-operations/content-guidelines.md を参照

## 外部サービス利用

- **microCMS**: コンテンツ管理（無料プラン）
- **Vercel**: ホスティング（本番: donati-science.jp, ステージング: stg.donati-science.jp）
- **Web3Forms**: お問い合わせフォーム（無料プラン: 月250件）
- **Figma**: デザインツール（無料プラン）

## ドキュメント構成

プロジェクトドキュメントは `docs/` に整理：

- `00-manufacturing-strategy/`: 開発の優先度と方針
- `01-project-overview/`: プロジェクト概要・決定事項
  - **`glossary.md`** (新規): Donati固有名詞用語集
- `02-pricing-estimates/`: 価格・工数見積もり
- `03-technical-specs/`: 技術仕様・実装方針
  - **`color-management.md`** (新規): 配色管理
- `04-workflow-collaboration/`: ワークフロー・協業方法
  - **`figma-workflow.md`** (強化): Figmaワークフロー詳細
  - `画像からFigma作成ガイド.md`
  - `デザイナーとの協業ガイド_ソース管理編_2025.md`
- `05-implementation-guides/`: 機能実装ガイド
  - `components-guide.md`: コンポーネント詳細リファレンス
  - **`responsive-design-guide.md`** (新規): レスポンシブ実装詳細
  - **`experimental-features.md`** (新規): 実験実装ガイド
- `06-quality-guidelines/`: 品質管理ガイドライン
- **`07-deployment/`** (新規): デプロイ・インフラガイド
  - **`vercel-deployment.md`**: Vercel設定・トラブルシューティング
- **`08-operations/`** (新規): 運用・メンテナンスガイド
  - **`content-guidelines.md`**: コンテンツ文言ガイドライン

## デプロイ

### 環境別URL
- **本番**: https://donati-science.jp (ブランチ: `release`)
- **ステージング**: https://stg.donati-science.jp (ブランチ: `master`)
- **プレビュー**: 機能ブランチ自動デプロイ（Vercel）

### 環境変数管理
Vercelダッシュボード → Project Settings → Environment Variables で設定

### デプロイフロー
1. ローカルで `npm run dev` / `npm run build`
2. 機能ブランチをpushしてプレビュー確認
3. `master` ブランチにマージでステージング環境へ自動デプロイ
4. `master` から `release` ブランチにマージで本番環境へ自動デプロイ

詳細は docs/07-deployment/vercel-deployment.md を参照

## タスク実行の4段階フロー

### 1. 要件定義
- `.claude_workflow/complete.md` が存在すれば参照
- 目的の明確化、現状把握、成功基準の設定
- `.claude_workflow/requirements.md` に文書化
- **必須確認**: 「要件定義フェーズが完了しました。設計フェーズに進んでよろしいですか？」

### 2. 設計
- **必ず `.claude_workflow/requirements.md` を読み込んでから開始**
- アプローチ検討、実施手順決定、問題点の特定
- `.claude_workflow/design.md` に文書化
- **必須確認**: 「設計フェーズが完了しました。タスク化フェーズに進んでよろしいですか？」

### 3. タスク化
- **必ず `.claude_workflow/design.md` を読み込んでから開始**
- タスクを実行可能な単位に分解、優先順位設定
- `.claude_workflow/tasks.md` に文書化
- **必須確認**: 「タスク化フェーズが完了しました。実行フェーズに進んでよろしいですか？」

### 4. 実行
- **必ず `.claude_workflow/tasks.md` を読み込んでから開始**
- タスクを順次実行、進捗を `.claude_workflow/tasks.md` に更新
- 各タスク完了時に報告

## 実行ルール

### ファイル操作
- 新規タスク開始時: 既存ファイルの**内容を全て削除して白紙から書き直す**
- ファイル編集前に必ず現在の内容を確認

### フェーズ管理
- 各段階開始時: 「前段階のmdファイルを読み込みました」と報告
- 各段階の最後に、期待通りの結果になっているか確認
- 要件定義なしにいきなり実装を始めない

### 実行方針
- 段階的に進める: 一度に全てを変更せず、小さな変更を積み重ねる
- 複数のタスクを同時並行で進めない
- エラーは解決してから次へ進む
- エラーを無視して次のステップに進まない
- 指示にない機能を勝手に追加しない

## コンポーネント更新ルール

コンポーネントの追加・変更時は `docs/05-implementation-guides/components-guide.md` を同期更新:

- **新規コンポーネント追加時**: 適切なフォルダに配置、components-guide.md に追加
- **既存コンポーネント変更時**: 説明内容を更新
- **Props変更時**: 該当コンポーネントのProps定義を更新
- **依存関係変更時**: 「フォルダ間の依存関係」セクションを更新
- **フォルダ移動時**: 全てのimport文を更新（ページ + コンポーネント間）

### フォルダ配置ガイドライン
- **common/**: 複数ページで使用、または基本インフラ（Header, Footer等）
- **overview/**: index.astroページ専用
- **services/**: services.astroページ専用
- **professional-experience/**: professional-experience.astroページ専用
- **cards/**: 汎用カード（ページ非依存）
- **effects/**: 視覚効果、カーソルカスタマイズ

詳細: [docs/05-implementation-guides/components-guide.md](docs/05-implementation-guides/components-guide.md)
