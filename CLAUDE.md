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
- **ワークフロー**: Figmaベース開発（参照のみ）
  - Figma Dev Modeでフォントサイズ、色、余白などの正確な数値を取得
  - スクリーンショットでの指示も引き続きサポート
- **役割分担**:
  - HTML/CSS（静的デザイン）: ひさな
  - TypeScript（動的機能のみ）: なむ

### 最新の開発状況（2025年9月現在）
- **Issue #19完了**: サイト全体の文言を柔らかく親しみやすい表現に変更済み
- **コア機能実装済み**: カルーセル、Instagram連携、Googleフォーム統合
- **ページ構成完成**: index, about, services, achievements, contact, staff
- **現在のブランチ**: feature/soften-tone-issue-19（マージ済み）

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
  - `index.astro` (トップページ)
  - `about.astro` (概要)
  - `services.astro` (サービス)
  - `achievements.astro` (実績)
  - `contact.astro` (お問い合わせ)
  - `staff.astro` (スタッフ)
- **コンポーネント**: 再利用可能な`.astro`コンポーネントは`src/components/`
  - `Header.astro` (統一ヘッダー)
  - `Footer.astro` (フッター)
  - `Carousel.astro` (カルーセル機能)
  - `InstagramSection.astro` (Instagram連携)
  - `CustomCursor.astro` / `CustomCursor-StarTheme.astro` (カーソルカスタマイズ)
  - `AuroraBackground.astro` / `Stars.astro` (宇宙テーマエフェクト)
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

## 実装済み機能（コア機能）

### 1. カルーセル機能 ✅実装完了
- **コンポーネント**: `src/components/Carousel.astro`
- **機能**: 自動スライド（4秒間隔）、ドットナビゲーション、ホバーで一時停止
- **画像配置**: `public/images/carousel/`ディレクトリ
- **データ管理**: `src/config/site.ts`の`carouselData`

### 2. Instagram埋め込み ✅実装完了
- **コンポーネント**: `src/components/InstagramSection.astro`
- **URL設定**: 環境変数`PUBLIC_INSTAGRAM_URL`で管理
- **表示場所**: トップページの「最新の活動」セクション

### 3. Googleフォーム統合 ✅実装完了
- **実装場所**: `src/pages/contact.astro`
- **フォームID**: 環境変数`PUBLIC_GOOGLE_FORM_ID`で管理
- **レスポンシブ対応**: モバイルで高さ600px、デスクトップで800px

### 4. 設定の一元管理 ✅実装完了
- **設定ファイル**: `src/config/site.ts`
- **管理内容**: サイト基本情報、ソーシャルメディアURL、カルーセルデータ、サービス一覧
- **型安全**: TypeScriptによる型定義

### 5. FAQアコーディオン機能 ✅実装完了
- **実装時期**: Issue #11で追加
- **機能**: 質問クリックで回答の表示/非表示切り替え
- **TypeScriptエラー修正済み**: 型安全な実装

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

## 文言・コミュニケーション方針

### Issue #19実装済み: 柔らかく親しみやすい表現への統一
DONATIサイト全体で「柔らかく親しみやすい表現」を採用し、ユーザーとの距離感を縮める文言設計を実装済み。

### 基本方針
1. **親しみやすさ**: 硬い表現を避け、温かみのある言葉選びを心がける
2. **わかりやすさ**: 専門用語は最小限にし、誰にでも理解しやすい表現を使用
3. **ワクワク感**: 科学の楽しさ・興味深さが伝わる表現を重視
4. **安心感**: 気軽に参加・問い合わせできる雰囲気作りを意識

### 文言例
- **ボタンテキスト**: 「お申し込みはこちら」→「参加してみる」
- **サービス紹介**: 「提供いたします」→「お届けします」
- **お問い合わせ**: 「ご不明な点は」→「気になることがあれば」
- **実績紹介**: 「実施しました」→「みんなで楽しみました」

### 継続的な改善
- 新規コンテンツ作成時は本方針に基づいた文言を使用
- ユーザーフィードバックに基づく文言の継続的改善
- 科学の専門性を保ちつつ親近感のバランスを維持

## Figmaワークフロー

### デザインフェーズ
1. **デザイン作成**: デザイナーがFigmaでデザインを作成
2. **共有**: Figma共有リンクをLINEまたは`design/figma/README.md`で共有
3. **確認**: エンジニアがFigma Dev Modeで仕様確認
4. **フィードバック**: 必要に応じてコメント機能で調整依頼
5. **承認**: 最終デザイン確定

### 実装フェーズ
1. **数値取得**: Figma Dev Modeから以下の正確な値を取得
   - フォントサイズ、行高、フォントウェイト
   - カラーコード（HEX、RGB）
   - 余白（padding、margin）、要素サイズ
   - 角丸（border-radius）、影（box-shadow）
2. **実装**: 取得した数値をTailwind classesで実装
3. **プレビュー**: ローカル or Vercelプレビューで確認
4. **デザイナーレビュー**: デザイナーが最終チェック

### アセット書き出しフェーズ
1. **Export**: Figmaから画像・SVGアセットをExport
   - 画像: PNG/JPG（@1x、@2xなど）
   - アイコン: SVG
2. **配置**: `design/exports/`に一時保存
3. **最適化**: 必要に応じて圧縮・最適化
4. **本番配置**: `public/images/`に移動してGit管理

### 運用のポイント
- **参照用途**: Figmaは正確な数値取得とアセット管理に活用
- **柔軟性**: スクリーンショットベースの指示も継続可能
- **コミュニケーション**: LINEでの迅速なやり取りは維持
- **段階的導入**: 必要な機能から徐々に活用範囲を拡大

## 配色管理

### Figma Color Styles（デザイナー管理）
デザイナーがFigmaでColor Stylesとして定義・管理。
実装時はFigma Dev Modeから正確なカラーコードを取得可能。

### Tailwind設定（エンジニア同期）
`tailwind.config.mjs`で一元管理。Figmaでの変更時は手動同期が必要。

#### 技術仕様書の配色（2025年1月追加）
- **primary-color**: `#2c5aa0` - メインブルー
- **secondary-color**: `#f4a261` - アクセントオレンジ

#### 既存の配色（維持）
- **deep-blue**: `#1a237e`
- **space-blue**: `#0d47a1`
- **light-blue**: `#1976d2`
- **accent-orange**: `#ff6f00`
- **accent-green**: `#00c853`

### 同期手順
Figmaで新しい色を追加・変更した場合：
1. Figma Dev Modeから正確なカラーコード（HEX）を取得
2. `tailwind.config.mjs`の`colors`セクションに追加/更新
3. `npm run build`で型チェックとビルドを実行
4. デザイナーにプレビューURLを共有して色味を確認

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

## 実装状況と今後の計画

### ✅ 実装完了機能
- **カルーセル/スライダー**: 本体に統合済み（`src/components/Carousel.astro`）
- **Googleフォーム統合**: contactページに実装済み
- **Instagram埋め込み**: 基本的な埋め込み実装済み
- **FAQアコーディオン**: servicesページに実装済み
- **レスポンシブデザイン**: 全ページで実装済み

### 🔬 実験実装済み（統合検討中）
- **Instagram RSS連携**: `experiments/instagram-rss-sample/`で完全実装済み
- **マウスカーソルカスタマイズ**: `src/components/CustomCursor.astro`と`CustomCursor-StarTheme.astro`

### Instagram RSS連携の実装詳細（実験済み）

#### 実験的実装の場所
`experiments/instagram-rss-sample/` ディレクトリに完全に動作する実装があります。

#### 主要コンポーネント
- **基本実装**: `src/lib/instagram-rss.ts` - RSS取得とパース
- **拡張版**: `src/lib/instagram-rss-enhanced.ts` - エラーハンドリング強化
- **キャッシュ付き**: `src/lib/instagram-rss-cached.ts` - パフォーマンス最適化
- **複数ソース対応**: `src/lib/instagram-multi-source.ts` - 複数アカウント/タグ対応

#### 統合時の検討事項
1. RSS.app（無料プラン）でInstagram → RSS変換の導入
2. 画像プロキシはweserv.nl（無料）の活用
3. 特定ハッシュタグ（#donati_event等）でイベント告知の自動抽出
4. 既存のInstagramSectionとの置き換え方針

#### 実装の特徴
- **自動お知らせ抽出**: AIタイトル生成とパターンマッチング
- **堅牢なエラー処理**: Result型によるエラーハンドリング
- **多層キャッシュ**: メモリ・ファイルキャッシュによる高速化
- **セキュリティ対策**: レート制限、画像プロキシ、XSS対策

### 🎯 今後の検討事項
- Instagram RSS連携の本体統合
- マウスカーソルカスタマイズの本体統合
- パフォーマンス最適化
- SEO対策強化

## ディレクトリ構成

### デザイン関連
Figma導入に伴い、デザイン関連ファイルを整理するディレクトリ構成：

```
design/
├── figma/
│   └── README.md         # Figmaリンク集
└── exports/              # Figma Export済みアセット
    ├── images/          # 画像アセット（PNG/JPG）
    └── graphics/        # ベクターグラフィック（SVG）
```

### プロジェクト全体
主要なディレクトリ構成：

```
donati/
├── src/
│   ├── pages/           # Astroページ
│   ├── components/      # Astroコンポーネント
│   ├── layouts/         # レイアウトコンポーネント
│   ├── lib/             # ユーティリティ・API
│   └── config/          # 設定ファイル
├── public/
│   └── images/          # 本番画像アセット
├── design/              # デザイン関連（Figma）
├── docs/                # プロジェクトドキュメント
└── experiments/         # 実験実装
```

## ドキュメント構成

プロジェクトドキュメントは`docs/`ディレクトリに整理：
- `01-project-overview/`: プロジェクト概要・決定事項
- `02-pricing-estimates/`: 価格・工数見積もり
- `03-technical-specs/`: 技術仕様・実装方針
- `04-workflow-collaboration/`: ワークフロー・協業方法
  - `画像からFigma作成ガイド.md`: Figma導入ガイド
  - `デザイナーとの協業ガイド_ソース管理編_2025.md`: ソース管理方針
- `05-implementation-guides/`: 機能実装ガイド
- `06-quality-guidelines/`: 品質管理ガイドライン

## 外部サービス利用（すべて無料プランで開始可能）

### 必須サービス
- **microCMS**: コンテンツ管理（無料プラン: API 3個、転送量10GB/月）
- **Vercel**: ホスティング（無料枠: 帯域幅100GB/月）
- **Googleフォーム**: お問い合わせ（完全無料）
- **Figma**: デザインツール（無料プラン: 3ファイル、無制限ビューワー）

### オプションサービス
- **RSS.app**: Instagram RSS変換（無料プラン: 5フィード、6時間更新）
- **weserv.nl**: 画像プロキシ（完全無料）

### 将来的な課金見込み
- 初期運用: 0円/月（すべて無料プラン）
- 成長時: 約2,650円/月（microCMS Hobby + RSS.app Personal）
- Figmaは無料プランで継続可能（参照用途のため）

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