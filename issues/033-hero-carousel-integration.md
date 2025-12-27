# Issue #37: Heroセクションへのカルーセル統合

## 概要
トップページのHeroセクションをカルーセル化し、複数のビジュアルコンテンツを自動スライド表示できるようにする。

## 優先度
**中** - UX向上とビジュアル強化

## 担当
- **エンジニア**: なむ
- **デザイナー**: ひさな（画像・SVG提供）

## 背景
現在のトップページ（`index.astro`）では、Heroセクションが静的な単一画像表示となっている。複数のビジュアルコンテンツを効果的に見せるため、既存のCarouselコンポーネント（`src/components/Carousel.astro`）を活用してHeroセクションをカルーセル化する。

---

## 現状分析

### 既存の実装
- **Heroコンポーネント**: `src/components/Hero.astro`、`src/components/OverViewHero.astro`
- **カルーセルコンポーネント**: `src/components/Carousel.astro`（既に実装済み）
- **カルーセル画像配置**: `public/images/svg/Carousel/`
- **カルーセルデータ管理**: `src/config/site.ts`の`carouselData`

### カルーセル既存機能
- 自動スライド（4秒間隔）
- ドットナビゲーション
- ホバーで一時停止
- レスポンシブ対応

---

## 実施内容

### A. Heroカルーセルコンポーネント作成
- [ ] `src/components/HeroCarousel.astro`を新規作成
  - 既存`Carousel.astro`をベースに、Hero用にカスタマイズ
  - 全画面表示対応
  - 高さ調整（デスクトップ: 600-800px、モバイル: 400-500px）

### B. カルーセル用画像準備
- [ ] デザイナーから複数のHero画像を取得
  - 推奨枚数: 3-5枚
  - 形式: SVG（軽量）またはPNG/JPG（最適化済み）
  - 配置先: `public/images/svg/Carousel/`
  - ファイル名: `Hero_01.svg`、`Hero_02.svg`など

### C. site.ts設定追加
- [ ] `src/config/site.ts`に`heroCarouselData`を追加
  ```typescript
  export const heroCarouselData = [
    { src: '/images/svg/Carousel/Hero_01.svg', alt: 'DONATIメインビジュアル1' },
    { src: '/images/svg/Carousel/Hero_02.svg', alt: 'DONATIメインビジュアル2' },
    { src: '/images/svg/Carousel/Hero_03.svg', alt: 'DONATIメインビジュアル3' },
  ];
  ```

### D. index.astroへの統合
- [ ] `src/pages/index.astro`を修正
  - 既存のHeroコンポーネントを`HeroCarousel`に置き換え
  - レイアウト調整
  - レスポンシブ対応確認

---

## 技術的注意事項

### レスポンシブ対応
- **デスクトップ**: 高さ600-800px、幅100%
- **タブレット**: 高さ500px、幅100%
- **モバイル**: 高さ400-500px、幅100%
- Tailwindクラス: `h-[600px] md:h-[700px] lg:h-[800px]`

### パフォーマンス最適化
- 画像遅延読み込み（lazy loading）
- SVG最適化（SVGO使用推奨）
- 初回表示速度の維持

### アニメーション
- フェードイン/アウト効果
- スライド速度: 4秒間隔（既存カルーセルと統一）
- トランジション: 0.5秒（スムーズな切り替え）

### アクセシビリティ
- alt属性の適切な設定
- キーボード操作対応（矢印キー）
- スクリーンリーダー対応

---

## 修正対象ファイル一覧

### 新規作成
1. `src/components/HeroCarousel.astro`

### 修正
1. `src/pages/index.astro`
2. `src/config/site.ts`（heroCarouselData追加）

### 画像追加
1. `public/images/svg/Carousel/Hero_01.svg`（デザイナー提供）
2. `public/images/svg/Carousel/Hero_02.svg`（デザイナー提供）
3. `public/images/svg/Carousel/Hero_03.svg`（デザイナー提供）

---

## 実装フロー

### Phase 1: 準備
- [ ] 既存Heroコンポーネントの実装確認
- [ ] 既存Carouselコンポーネントの動作確認
- [ ] デザイナーにHero用画像を依頼

### Phase 2: コンポーネント開発
- [ ] HeroCarouselコンポーネント作成
- [ ] site.tsへのデータ追加
- [ ] ローカルでの動作確認

### Phase 3: 統合・調整
- [ ] index.astroへの統合
- [ ] レスポンシブデザイン調整
- [ ] アニメーション調整

### Phase 4: 最終確認
- [ ] 全デバイスでの表示確認
- [ ] パフォーマンステスト
- [ ] デザイナーレビュー
- [ ] ビルドエラーなし（`npm run build`）

---

## 完了条件
- [ ] HeroCarouselコンポーネントが正常に動作
- [ ] 複数画像が自動スライド表示される
- [ ] レスポンシブ対応完了（モバイル/タブレット/デスクトップ）
- [ ] ナビゲーション（ドット）が機能
- [ ] ホバー時の一時停止が機能
- [ ] ページ読み込み速度が維持される
- [ ] デザイナーの最終承認

---

## 参考実装

### 既存Carouselコンポーネント
`src/components/Carousel.astro`をベースに、以下の調整:
- 全画面表示対応
- 高さの固定
- Heroセクション専用のスタイリング

### スタイル例
```astro
<div class="relative w-full h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden">
  <!-- カルーセルコンテンツ -->
</div>
```

---

## 関連Issue・PR
- 既存カルーセル実装: Issue #1（初期実装）
- Figmaワークフロー導入: Issue #36

---

## 備考
- 画像はFigmaから書き出し、最適化後に配置
- SVGファイルサイズに注意（391KBのような大容量は避ける）
- 既存のCarousel.astroは維持（他の箇所でも使用中）
- Hero専用のカルーセルとして独立実装
