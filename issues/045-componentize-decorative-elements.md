# Issue #045: 装飾要素のコンポーネント化（ウェーブライン・フッター区切り線）

**作成日**: 2025-12-07
**ステータス**: Open
**優先度**: Medium
**担当**: エンジニア
**関連Issue**: Issue #44 (AboutUsページのデザイン再実装)

## 概要

OverViewページ([src/pages/index.astro](../src/pages/index.astro))で使用されている装飾要素（ウェーブラインとフッター区切り線）をコンポーネント化し、他のページでも再利用できるようにする。

## 現在の実装

### 1. ウェーブライン（WaveLine）
- 複数のwaveLine.svgを並べた装飾
- セクション区切りに使用
- **現在の実装場所**:
  - index.astro: 101-107行目（3つ並べ）
  - index.astro: 142-150行目（5つ並べ）
  - about.astro: 113-117行目（3つ並べ）
  - Header.astro: 101-122行目（レスポンシブ対応）

```html
<!-- 現在の実装例（3つ並べ） -->
<div class="waveline-wrapper">
  <div class="flex justify-center">
    <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto flex-shrink-0" />
    <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto flex-shrink-0" />
    <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto flex-shrink-0" />
  </div>
</div>
```

### 2. フッター区切り線（Footer Divider）
- 区切り線とコピーライトテキスト
- **現在の実装場所**: index.astro 244-248行目

```html
<!-- 現在の実装例 -->
<div class="py-8">
  <hr class="border-t border-overview-dark-blue/20 mb-4" />
  <p class="text-center text-overview-dark-blue/60 text-sm">© サイエンス＆スペース ラボ DONATI</p>
</div>
```

## 実装タスク

### Phase 1: WaveLineコンポーネント作成
- [ ] `src/components/WaveLine.astro` を新規作成
- [ ] Propsで本数を指定可能に（デフォルト: 3）
- [ ] レスポンシブ対応（モバイル、タブレット、デスクトップで高さ変更）
- [ ] `.waveline-wrapper` クラスをコンポーネント内に含める

**仕様**:
```astro
interface Props {
  count?: number;     // デフォルト: 3
  height?: string;    // デフォルト: 'h-4'
  spacing?: string;   // デフォルト: 'gap-0' (デフォルトは連続)
}
```

### Phase 2: FooterDividerコンポーネント作成
- [ ] `src/components/FooterDivider.astro` を新規作成
- [ ] コピーライトテキストをPropsで指定可能に
- [ ] オプションで区切り線の非表示も可能に

**仕様**:
```astro
interface Props {
  copyText?: string;  // デフォルト: '© サイエンス＆スペース ラボ DONATI'
  showDivider?: boolean;  // デフォルト: true
}
```

### Phase 3: 既存ページへの適用
- [ ] `src/pages/index.astro` を更新（WaveLine 2箇所、FooterDivider 1箇所）
- [ ] `src/pages/about.astro` を更新（WaveLine 1箇所）
- [ ] その他ページでも適用可能性を確認

### Phase 4: スタイル調整
- [ ] Header.astro の波線コンポーネント化も検討
- [ ] レスポンシブデザインの統一化

## 関連ファイル
- `src/pages/index.astro` (OverViewページ - 現在の実装)
- `src/pages/about.astro` (AboutUsページ)
- `src/components/Header.astro` (ヘッダー)

## 参考情報
- プロジェクト指針: [CLAUDE.md](../CLAUDE.md)
- Issue #44: AboutUsページのデザイン再実装

## 効果
- コード重複を削減
- メンテナンスの効率化
- 他のページでも統一的な装飾を実装可能
