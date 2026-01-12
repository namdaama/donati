# レスポンシブデザイン実装ガイド

DONATIサイトのレスポンシブデザイン実装の詳細ガイド。Issue #83 で横スクロール問題を完全解決。

## 基本方針

### 幅統一方針
全セクションを **最大幅1024px（max-w-4xl）で中央寄せ** に統一。横スクロール問題を完全排除。

### Tailwindブレークポイント
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 統一された幅の一覧

- **Header**: `max-w-4xl mx-auto px-4`（Header.astro:47）
- **Hero Carousel**: `max-width: 1024px; margin: 0 auto`（各ページのスタイル）
- **セクションコンテナ**: `max-w-4xl mx-auto px-4`（すべてのセクション）
- **ウェーブライン装飾**: `max-w-4xl mx-auto px-4`（.waveline-wrapper）
- **Footer**: `.container-custom`クラス使用（Footer.astro:4, 44）

## 統一された上端padding（もくもく見出し位置統一）

全ページでもくもく見出し（PageIntroduction）の表示位置を統一するため、メインコンテナの上端paddingを`py-16`に統一しています。

### 統一ルール
- **基本padding**: `py-16`（上下padding 4rem = 64px）
- **レスポンシブ対応**: 画面サイズによってpadding値を変えない（全画面サイズで統一）

### 適用箇所（PageIntroductionコンポーネント使用ページ）
- **about.astro**: `<section class="py-16">`（about.astro:20）
- **professional-experience.astro**: `<div class="max-w-4xl mx-auto px-4 py-16 relative z-10">`（professional-experience.astro:172）
- **service-fuji.astro**: `<div class="max-w-4xl mx-auto px-4 py-16 relative z-10">`（service-fuji.astro:279）
- **service-hide.astro**: `<div class="max-w-4xl mx-auto px-4 py-16 relative z-10">`（service-hide.astro:48）
- **contact.astro**: `<section class="py-16">`（contact.astro:82）
- **faq.astro**: `<section class="py-16">`（faq.astro:15）

### その他のページ
- **index.astro**: トップページ（PageIntroduction非使用）
- **404.astro**: エラーページ（PageIntroduction非使用、独自レイアウト）

### 注意事項
- `py-24`など異なるpadding値を使用すると、もくもく見出しの位置がずれます
- 新規ページ追加時は必ず`py-16`を使用してください
- レスポンシブ対応（`md:py-24`等）は使用しないでください
- PageIntroductionを使用しないページでも、レイアウトの一貫性のため`py-16`の使用を推奨

## グローバル設定（src/styles/global.css）

### body要素
```css
body {
  @apply text-text-dark overflow-x-hidden;
}
```
- サイト全体で横スクロール防止

### ユーティリティクラス
```css
.waveline-container {
  @apply w-full overflow-x-hidden flex justify-center;
}
```
- 装飾要素（waveLine.svg等）の幅オーバーフロー防止

### セクション制約
```css
.container-custom {
  @apply max-w-4xl mx-auto px-4 sm:px-6 lg:px-8;
}

.waveline-wrapper {
  @apply max-w-4xl mx-auto px-4;
}
```

## ページ別実装パターン

### Hero Carousel（各ページ）
```css
.hero-carousel-wrapper {
  max-width: 1024px;
  margin: 0 auto 2rem auto;
  padding: 0 1rem;
}
```
- Carouselも最大幅を1024pxに制限
- 他セクションと同じ配置を実現

### ウェーブライン装飾（複数画像の場合）
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
- `flex-shrink-0` を使用しない（自動調整を許可）

## レスポンシブパターン（基本）

### グリッドレイアウト
```html
<!-- 1列→2列→4列に対応 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- カード要素 -->
</div>
```

### 文字サイズ
```html
<!-- モバイル→タブレット→デスクトップで段階的に拡大 -->
<h1 class="text-4xl md:text-5xl lg:text-6xl">タイトル</h1>
```

### 条件付き表示
```html
<!-- デバイスサイズによって表示を制御 -->
<nav class="hidden md:block">デスクトップナビゲーション</nav>
<nav class="md:hidden">モバイルハンバーガーメニュー</nav>
```

### パディング調整
```html
<!-- デバイスサイズに応じて余白を調整 -->
<section class="py-16 md:py-24">
  コンテンツ
</section>
```

## 問題発生時のチェックリスト

### 横スクロールバーが表示されている場合
- [ ] `body` に `overflow-x-hidden` が設定されているか確認
- [ ] セクション内の要素が `max-w-4xl mx-auto px-4` で制約されているか確認
- [ ] ウェーブラインなど装飾SVGが `waveline-container` クラスで制御されているか確認
- [ ] 固定幅（`width: 1000px` 等）が設定されていないか確認
- [ ] `flex-shrink-0` で縮小禁止になっていないか確認

### 新しいページ/セクションを追加する場合
- [ ] メインコンテナに `.container-custom` または `max-w-4xl mx-auto px-4` を適用
- [ ] Heroセクションに `.hero-carousel-wrapper` スタイルを適用
- [ ] 装飾SVG/画像は `waveline-container` で制御
- [ ] `npm run build` で横スクロール問題がないか確認

## 実装完了（Issue #83）

### 完成した機能
- ✅ サイト全体の横幅を1024px（max-w-4xl）に統一
- ✅ 横スクロール問題を完全排除（body: overflow-x-hidden）
- ✅ ウェーブライン装飾をレスポンシブ対応（モバイル2枚→タブレット3枚→デスクトップ5枚）
- ✅ Hero Carouselを max-w-4xl で中央寄せに統一
- ✅ 全セクションで一貫した配置

### 効果
- すべての主要要素が1024px以内に収まる
- 大画面でも左右に余白が保たれて見栄えが良い
- モバイル～デスクトップで一貫した配置
- 横スクロールバーが完全に排除される
