# 設計: Issue #232 - レスポンシブ時にもくもく見出しが左に寄る（aspect-ratio 方式）

## 前段階の確認
`.claude_workflow/requirements.md` を読み込みました。

## 原因分析

`src/components/common/SectionCloudyHeading.astro` の `<style>` セクション:

```css
/* デスクトップ（デフォルト） */
.section-cloudy-bg {
  object-fit: fill;  /* コンテナ全幅に引き伸ばし → 問題なし */
}

/* モバイル（768px以下） */
@media (max-width: 768px) {
  .section-cloudy-bg {
    object-fit: contain;        /* アスペクト比を維持して縮小 → 全幅を埋めなくなる */
    object-position: left center; /* 縮小された画像が左寄せ → 原因 */
  }
}
```

768px以下で `object-fit: fill` → `contain` に切り替わるため、SVG背景が縮小され左寄りになる。

## SVG の制約（単純削除だけでは不十分な理由）

もくもく SVG（`public/images/svg/decorations/introductionCloud.svg`）は viewBox 988×135（約7.3:1）。
モバイルの wrapper は高さ 50px 固定のため、メディアクエリを単純削除して `fill` にすると:

- 幅375px時: 比率 7.5:1 ≒ 原寸比 → 問題なし
- 幅768px時: 比率 15.4:1 → 雲が横に約2倍引き伸ばされて潰れる

## 修正方針（aspect-ratio 方式）

モバイルでは wrapper の高さを固定せず、SVG の原寸比（988/135）で伸縮させる。

1. `@media (max-width: 768px)` 内の `.section-cloudy-bg` ルール（contain/left）を削除
   → デフォルトの `object-fit: fill` が適用され全幅を維持
2. 同メディアクエリ内の `.section-cloudy-heading-wrapper` を `height: 50px` から以下に変更:

```css
.section-cloudy-heading-wrapper {
  height: auto;
  aspect-ratio: 988 / 135;
  min-height: 50px; /* 極小幅での見出しテキスト保護 */
}
```

- 幅375px → 高さ約51px（現状とほぼ同等）
- 幅768px → 高さ約105px（雲の形は原寸比を維持）
- `.section-cloudy-heading` は `height: 100%` の flex 中央揃えのため追随し変更不要

## 変更ファイル

| ファイル | 変更内容 |
|---------|---------|
| `src/components/common/SectionCloudyHeading.astro` | モバイル時の `object-fit/object-position` ルール削除、wrapper を aspect-ratio ベースに変更 |

## 影響範囲

- SectionCloudyHeading は PageIntroduction 経由で全ページの h1 に使用
- デスクトップ（>768px）は一切変更なし（height: 135px のまま）
- タブレット幅では見出しの高さが現状より高くなる（最大約105px）が、雲の形は原寸比を維持

## 検証項目

1. 768px以下でもくもく背景が全幅を維持し、左寄りにならないこと
2. どの画面幅でも雲の形が横に潰れないこと
3. 見出しテキストが背景内に適切に表示されること
4. デスクトップ表示に変化がないこと
5. `npm run build` が成功すること
