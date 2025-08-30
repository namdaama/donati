# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code)への指針を提供します。

## プロジェクト概要

「サイエンス アンド スペース ラボ DONATI」のランディングページ。科学実験ショーや宇宙関連の活動を紹介。AstroとTypeScriptで構築。

### プロジェクト関係者
- **クライアント**: フジ（DONATI - サイエンスコミュニケーター）
- **デザイナー**: ひさな
- **エンジニア**: なむ

### 開発方針
- **実装方針**: Astro優先 + HTML/CSS最大限活用
- **ワークフロー**: スクリーンショットベース開発（Figma不要）
- **役割分担**: 
  - HTML/CSS（静的デザイン）: ひさな
  - TypeScript（動的機能のみ）: なむ

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

### Vercelホスティング概要
DONATIウェブサイトはVercel上にホスティングされており、Git連携による自動デプロイが設定されています。

### デプロイメント設定

#### プレビュー環境
- **プレビューURL**: `https://donati-git-master-namdaamas-projects.vercel.app/`
- **自動デプロイ**: `master`ブランチへのプッシュで自動デプロイ
- **認証**: Vercel Authentication有効（プロジェクトメンバーのみアクセス可能）
- **アクセス方法**: Vercelアカウントでログイン後、プロジェクトメンバーとしてアクセス

#### 本番環境
- **本番URL**: カスタムドメイン設定要確認
- **デプロイトリガー**: 本番デプロイの条件要確認

### 環境変数管理
- **設定場所**: Vercelダッシュボード → Project Settings → Environment Variables
- **必須変数**:
  - `MICROCMS_SERVICE_DOMAIN`: microCMSサービスドメイン（秘密情報）
  - `MICROCMS_API_KEY`: microCMS APIキー（秘密情報）
- **公開変数**:
  - `PUBLIC_INSTAGRAM_URL`: InstagramプロフィールURL
  - `PUBLIC_GOOGLE_FORM_ID`: Googleフォーム埋め込み用ID

### Vercel Authentication
- **現在の状態**: 有効
- **適用範囲**: プレビュー環境（production以外）
- **アクセス権限**: プロジェクトメンバー（Guest/Member/Owner）
- **メンバー追加**: プロジェクトオーナー（namdaama）が管理

#### API連携時の対応
API連携でVercel Authenticationを迂回する場合：
1. Vercelダッシュボードで「Protection Bypass for Automation」を有効化
2. `VERCEL_AUTOMATION_BYPASS_SECRET`を生成
3. APIリクエストヘッダーに`x-vercel-protection-bypass`を追加

### デプロイフロー
1. **開発**: ローカルで`npm run dev`
2. **プレビュー**: 機能ブランチをpushしてプレビューURL確認
3. **リリース**: `master`ブランチにマージで自動デプロイ
4. **本番反映**: 本番環境への反映プロセス要確認

### トラブルシューティング
- **プレビュー環境にアクセスできない**: Vercelアカウントのプロジェクトメンバーシップを確認
- **環境変数が反映されない**: Vercelダッシュボードの設定とローカル`.env`の同期確認
- **ビルドエラー**: `npm run build`でローカル確認後、Vercelのビルドログを確認

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

## ページデザイン統一方針

### ヘッダーコンポーネント
- **統一ヘッダー**: `src/components/Header.astro`を全ページで使用
- **デザイン**: アイコンナビゲーション付き（旧OverViewHeader.astroの内容）
- **背景**: 半透明白（`bg-white/10 backdrop-blur-sm`）
- **ロゴ**: クリックでトップページ（/）へ戻る

### 背景画像
- **統一背景**: `/images/backGround.png`を全ページで使用
- **実装方法**: 各ページの`<style>`タグ内でbodyに背景画像を設定
```css
body {
  background-image: url('/images/backGround.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
```

## 実装予定機能

### 確定機能
- [x] Instagram RSS連携（実験実装済み - experiments/instagram-rss-sample）
- [x] マウスカーソルカスタマイズ（ガイド作成済み）
- [x] カルーセル/スライダー（ガイド作成済み）

### Instagram RSS連携の実装詳細

#### 実験的実装の場所
`experiments/instagram-rss-sample/` ディレクトリに完全に動作する実装があります。

#### 主要コンポーネント
- **基本実装**: `src/lib/instagram-rss.ts` - RSS取得とパース
- **拡張版**: `src/lib/instagram-rss-enhanced.ts` - エラーハンドリング強化
- **キャッシュ付き**: `src/lib/instagram-rss-cached.ts` - パフォーマンス最適化
- **複数ソース対応**: `src/lib/instagram-multi-source.ts` - 複数アカウント/タグ対応

#### サンプルページ
- `src/pages/index.astro` - 基本的な表示
- `src/pages/index-enhanced.astro` - エラーハンドリング付き
- `src/pages/index-ultimate.astro` - 全機能統合版（ムートン・ショット）

#### 統合方法
1. `experiments/instagram-rss-sample`の実装を参考に本体に統合
2. RSS.app（無料プラン）でInstagram → RSS変換
3. 画像プロキシはweserv.nl（無料）を使用
4. 特定ハッシュタグ（#donati_event等）でイベント告知を自動抽出

#### 実装の特徴
- **自動お知らせ抽出**: AIタイトル生成とパターンマッチング
- **堅牢なエラー処理**: Result型によるエラーハンドリング
- **多層キャッシュ**: メモリ・ファイルキャッシュによる高速化
- **セキュリティ対策**: レート制限、画像プロキシ、XSS対策

## ドキュメント構成

プロジェクトドキュメントは`docs/`ディレクトリに整理：
- `01-project-overview/`: プロジェクト概要・決定事項
- `02-pricing-estimates/`: 価格・工数見積もり
- `03-technical-specs/`: 技術仕様・実装方針
- `04-workflow-collaboration/`: ワークフロー・協業方法
- `05-implementation-guides/`: 機能実装ガイド
- `06-quality-guidelines/`: 品質管理ガイドライン

## 外部サービス利用（すべて無料プランで開始可能）

### 必須サービス
- **microCMS**: コンテンツ管理（無料プラン: API 3個、転送量10GB/月）
- **Vercel**: ホスティング（無料枠: 帯域幅100GB/月）
- **Googleフォーム**: お問い合わせ（完全無料）

### オプションサービス
- **RSS.app**: Instagram RSS変換（無料プラン: 5フィード、6時間更新）
- **weserv.nl**: 画像プロキシ（完全無料）

### 将来的な課金見込み
- 初期運用: 0円/月（すべて無料プラン）
- 成長時: 約2,650円/月（microCMS Hobby + RSS.app Personal）

## タスク実行の4段階フロー

### 1. 要件定義
- `.claude_workflow/complete.md`が存在すれば参照
- 目的の明確化、現状把握、成功基準の設定
- `.claude_workflow/requirements.md`に文書化
- **必須確認**: 「要件定義フェーズが完了しました。設計フェーズに進んでよろしいですか？」

### 2. 設計
- **必ず`.claude_workflow/requirements.md`を読み込んでから開始**
- アプローチ検討、実施手順決定、問題点の特定
- `.claude_workflow/design.md`に文書化
- **必須確認**: 「設計フェーズが完了しました。タスク化フェーズに進んでよろしいですか？」

### 3. タスク化
- **必ず`.claude_workflow/design.md`を読み込んでから開始**
- タスクを実行可能な単位に分解、優先順位設定
- `.claude_workflow/tasks.md`に文書化
- **必須確認**: 「タスク化フェーズが完了しました。実行フェーズに進んでよろしいですか？」

### 4. 実行
- **必ず`.claude_workflow/tasks.md`を読み込んでから開始**
- タスクを順次実行、進捗を`.claude_workflow/tasks.md`に更新
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