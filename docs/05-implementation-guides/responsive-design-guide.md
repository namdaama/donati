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

- **Header**: `max-w-4xl mx-auto px-4`（Header.astro:38）
- **Hero Carousel**: `max-width: 1024px; margin: 0 auto`（各ページのスタイル）
- **セクションコンテナ**: `max-w-4xl mx-auto px-4`（すべてのセクション）
- **ウェーブライン装飾**: `max-w-4xl mx-auto px-4`（.waveline-wrapper）
- **Footer**: `max-w-4xl mx-auto px-4`（Footer.astro）

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
