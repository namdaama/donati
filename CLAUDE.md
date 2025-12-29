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
- **開発優先度の決定**: `docs/00-manufacturing-strategy/`内の情報をもとに開発タスクの優先度を決定
- **ワークフロー**: Figmaベース開発（参照のみ）
  - Figma Dev Modeでフォントサイズ、色、余白などの正確な数値を取得
  - スクリーンショットでの指示も引き続きサポート
- **役割分担**:
  - HTML/CSS（静的デザイン）: ひさな
  - TypeScript（動的機能のみ）: なむ

### 最新の開発状況（2025年12月現在）
- **Issue #83完了**: サイト全体の横幅を1024pxに統一、横スクロール問題を解決済み
  - ウェーブライン装飾をレスポンシブ対応（モバイル2枚→タブレット3枚→デスクトップ5枚）
  - Hero Carouselを max-w-4xl で中央寄せに統一
  - body に `overflow-x-hidden` を追加してグローバル横スクロール防止
- **Issue #77完了**: サイエンス・天文事業の専用ページを作成済み（`service-fuji.astro`, `service-hide.astro`）
- **Issue #19完了**: サイト全体の文言を柔らかく親しみやすい表現に変更済み
- **コア機能実装済み**: カルーセル、Instagram連携、Web3Forms統合
- **ページ構成**: index, about, services, service-fuji, service-hide, professional-experience, contact, 404
- **現在のブランチ**: feature/unify-width-issue-83（PR #86）

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
  - `about.astro` (私たちについて)
  - `services.astro` (サービス統合ページ)
  - `service-fuji.astro` (サイエンス専用ページ - Issue #77)
  - `service-hide.astro` (天文専用ページ - Issue #77)
  - `contact.astro` (お問い合わせ)
  - `professional-experience.astro` (活動経歴)
- **コンポーネント**: 再利用可能な`.astro`コンポーネントは`src/components/`（30個、フォルダベース構造）
  - **構成**: 6フォルダ（common, overview, services, professional-experience, cards, effects）
  - **詳細リファレンス**: [docs/05-implementation-guides/components-guide.md](docs/05-implementation-guides/components-guide.md)参照
    - 全30コンポーネントの詳細（Props、行数、複雑度）
    - フォルダ間の依存関係図
    - コンポーネント更新ルール
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
- **画像配置**: `public/images/svg/Carousel/`ディレクトリ（SVGファイル）
- **データ管理**: `src/config/site.ts`の`carouselData`

### 2. Instagram埋め込み ✅実装完了
- **コンポーネント**: `src/components/InstagramSection.astro`
- **URL設定**: 環境変数`PUBLIC_INSTAGRAM_URL`で管理
- **表示場所**: トップページの「最新の活動」セクション

### 3. Web3Forms統合 ✅実装完了
- **実装場所**: `src/pages/contact.astro`
- **Access Key**: 環境変数`PUBLIC_WEB3FORMS_ACCESS_KEY`で管理
- **レスポンシブ対応**: モバイルで高さ600px、デスクトップで800px

### 4. 設定の一元管理 ✅実装完了
- **設定ファイル**: `src/config/site.ts`
- **管理内容**:
  - `siteConfig`: サイト基本情報、ソーシャルメディアURL、外部サービス設定、画像パス
  - `carouselData`: カルーセル画像データ（3枚）
  - `heroCarouselData`: トップページHeroカルーセルデータ（5枚）
  - `servicesData`: サービス一覧カード用データ（4サービス）
  - `serviceCategories`: サイエンス・スペース分野の詳細サービス定義
  - `requestFlow`: ご依頼の流れ（6ステップ）
  - `consultationTopics`: 打ち合わせ内容（4項目）
- **型安全**: TypeScript型定義完備（ServiceItem, ServiceCategory, RequestFlowStep, ConsultationTopic）

### 5. FAQアコーディオン機能 ✅実装完了
- **実装時期**: Issue #11で追加
- **機能**: 質問クリックで回答の表示/非表示切り替え
- **TypeScriptエラー修正済み**: 型安全な実装

### 6. サービスページの分割 ✅実装完了
- **実装時期**: Issue #77
- **分割内容**:
  - `/service-fuji.astro` - サイエンス（科学分野）専用ページ
    - サイエンスショー、科学実験教室、ワークショップを掲載
  - `/service-hide.astro` - スペース（宇宙分野）専用ページ
    - 星空観望会、講演、星空写真提供を掲載
- **データ管理**: `src/config/site.ts`で統一管理
  - `serviceCategories`: サイエンス・スペース分野のサービス定義
  - `requestFlow`: ご依頼の流れ（6ステップ）
  - `consultationTopics`: 打ち合わせ内容（4項目）
- **既存ページ保持**: `services.astro`は完全保持（統合ページとして機能）

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
   PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
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
  - `PUBLIC_WEB3FORMS_ACCESS_KEY`: Web3Forms Access Key

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
2. **最適化**: 必要に応じて圧縮・最適化
3. **配置**: `public/images/`に直接配置
   - SVGアイコン・キャラクター → `svg/Parts/`
   - SVGカルーセル → `svg/Carousel/`
   - ページ用画像・背景画像 → ルート直下（整理は今後検討）
4. **Gitコミット**: 最適化済みファイルをコミット

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

### 基本方針
- **全ての画像を`public/images/`で一元管理**
- Figma書き出しも直接このディレクトリに配置
- 中間ファイル用の別ディレクトリは使用しない

### public/images/
- 本番配信用の画像（最適化済み）
- 現在の構造:
  - ルート直下: 各ページ用画像（AboutUs.jpg、OverView.jpg、ProfessionalExperience.jpg等）、背景画像（backGround.png、logoBackGround.png）
  - `svg/Carousel/`: カルーセル用SVG（5枚）
  - `svg/Parts/`: UI用SVGパーツ（アイコン、キャラクター画像、装飾等）
  - `svg/Screen/`: デザインモックアップSVG
- **注意**: 当初計画の`backgrounds/`, `carousel/`, `photos/`, `staff/`フォルダは未作成。画像は直接ルートに配置。

### 運用ルール
1. Figmaから書き出したファイルは必要に応じて最適化
2. 最適化済みファイルを`public/images/`の適切な場所に配置
3. ファイル配置後、Gitコミット
4. 旧バージョンファイルは削除（Git履歴から復元可能）

### Figmaリンク管理
Figma共有リンクはLINEまたはプロジェクトドキュメント（`docs/`）で管理。
専用の`design/`ディレクトリは作成しない。

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

### レスポンシブ幅設定（Issue #83完了）

#### 幅統一方針
全セクションを **最大幅1024px（max-w-4xl）で中央寄せ** に統一。横スクロール問題を完全排除。

**統一された幅の一覧:**
- Header: `max-w-4xl mx-auto px-4`（Header.astro:38）
- Hero Carousel: `max-width: 1024px; margin: 0 auto`（各ページのスタイル）
- セクションコンテナ: `max-w-4xl mx-auto px-4`（すべてのセクション）
- ウェーブライン装飾: `max-w-4xl mx-auto px-4`（.waveline-wrapper）
- Footer: `max-w-4xl mx-auto px-4`（Footer.astro）

**効果:**
- すべての主要要素が1024px以内に収まる
- 大画面でも左右に余白が保たれて見栄えが良い
- モバイル～デスクトップで一貫した配置
- 横スクロールバーが完全に排除される

#### グローバル設定（src/styles/global.css）

**1. body要素**
```css
body {
  @apply text-text-dark overflow-x-hidden;
}
```
- サイト全体で横スクロール防止

**2. ユーティリティクラス**
```css
.waveline-container {
  @apply w-full overflow-x-hidden flex justify-center;
}
```
- 装飾要素（waveLine.svg等）の幅オーバーフロー防止

**3. セクション制約**
```css
.container-custom {
  @apply max-w-4xl mx-auto px-4 sm:px-6 lg:px-8;
}

.waveline-wrapper {
  @apply max-w-4xl mx-auto px-4;
}
```

#### ページ別実装パターン

**Hero Carousel（各ページ）**
```css
.hero-carousel-wrapper {
  max-width: 1024px;
  margin: 0 auto 2rem auto;
  padding: 0 1rem;
}
```
- Carouselも最大幅を1024pxに制限
- 他セクションと同じ配置を実現

**ウェーブライン装飾（複数画像の場合）**
```html
<div class="waveline-wrapper">
  <div class="waveline-container py-6">
    <!-- モバイル: 2つ -->
    <div class="flex sm:hidden">
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto" />
    </div>
    <!-- タブレット: 3つ -->
    <div class="hidden sm:flex md:hidden">
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto" />
    </div>
    <!-- デスクトップ: 5つ -->
    <div class="hidden md:flex">
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto" />
    </div>
  </div>
</div>
```
- レスポンシブ枚数調整で各ブレークポイントで最適な表示
- `flex-shrink-0`を使用しない（自動調整を許可）

#### 問題発生時のチェックリスト

❓ 横スクロールバーが表示されている場合：
- [ ] `body`に`overflow-x-hidden`が設定されているか確認
- [ ] セクション内の要素が`max-w-4xl mx-auto px-4`で制約されているか確認
- [ ] ウェーブラインなど装飾SVGが`waveline-container`クラスで制御されているか確認
- [ ] 固定幅（`width: 1000px`等）が設定されていないか確認
- [ ] `flex-shrink-0`で縮小禁止になっていないか確認

❓ 新しいページ/セクションを追加する場合：
- [ ] メインコンテナに`.container-custom`または`max-w-4xl mx-auto px-4`を適用
- [ ] Heroセクションに`.hero-carousel-wrapper`スタイルを適用
- [ ] 装飾SVG/画像は`waveline-container`で制御
- [ ] `npm run build`で横スクロール問題がないか確認

## 実装状況と今後の計画

### ✅ 実装完了機能
- **カルーセル/スライダー**: 本体に統合済み（`src/components/Carousel.astro`）
- **Web3Forms統合**: contactページに実装済み
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

### 画像・アセット管理
全ての画像は`public/images/`で一元管理。Figma書き出しも直接このディレクトリに配置。

```
public/images/
├── (ルート直下)         # ページ用画像、背景画像（AboutUs.jpg, backGround.png等）
└── svg/
    ├── Carousel/        # カルーセル用SVG（5枚）
    ├── Parts/           # UI用SVGパーツ、キャラクター画像
    └── Screen/          # デザインモックアップSVG

注意: 当初計画の backgrounds/, carousel/, photos/, staff/ フォルダは未作成。
将来的な整理を検討する場合は、全ページのパス参照更新が必要。
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
│   └── images/          # 画像アセット（一元管理）
├── docs/                # プロジェクトドキュメント
└── experiments/         # 実験実装
```

## ドキュメント構成

プロジェクトドキュメントは`docs/`ディレクトリに整理：
- `00-manufacturing-strategy/`: **おおまかな製造戦略** - 開発の優先度と方針を決定する最重要情報
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
- **Web3Forms**: お問い合わせフォーム（無料プラン: 月250件まで）
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

## コンポーネント更新ルール

コンポーネントの追加・変更時は`docs/05-implementation-guides/components-guide.md`を同期更新:
- **新規コンポーネント追加時**:
  - 適切なフォルダに配置（common, overview, services, professional-experience, cards, effects）
  - `components-guide.md`に追加（複雑度に応じたセクション）
- **既存コンポーネント変更時**（Issue完了時）: 説明内容を更新
- **Props変更時**: 該当コンポーネントのProps定義を更新
- **依存関係変更時**: 「フォルダ間の依存関係」セクションを更新
- **フォルダ移動時**: 全てのimport文を更新（ページ + コンポーネント間）

### フォルダ配置ガイドライン
- **common/**: 複数ページで使用、または基本インフラ（Header, Footer等）
- **overview/**: index.astroページ専用コンポーネント
- **services/**: services.astroページ専用コンポーネント
- **professional-experience/**: professional-experience.astroページ専用コンポーネント
- **cards/**: 汎用カード（ページ非依存）
- **effects/**: 視覚効果、カーソルカスタマイズ

詳細なコンポーネントリファレンス: [docs/05-implementation-guides/components-guide.md](docs/05-implementation-guides/components-guide.md)