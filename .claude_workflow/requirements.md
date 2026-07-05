# 要件定義: Issue #232 - レスポンシブ時にもくもく見出しが左に寄る

## 目的
768px以下のレスポンシブ表示で、もくもく見出し（SectionCloudyHeading）が左に寄る問題を修正する。

## 現状
- `SectionCloudyHeading.astro` の `@media (max-width: 768px)` で以下が設定されている:
  - `object-fit: contain` — SVG背景がコンテナ全幅を使わず縮小される
  - `object-position: left center` — 縮小された背景が左寄せになる
- 768pxを下回った瞬間に、`object-fit: fill` → `contain` に切り替わり、背景が急に左に寄る

## 成功基準
- 768px以下でもくもく背景がコンテナ全幅を維持し、左寄りにならない
- 見出しテキストが背景画像内に適切に配置される
- 全ページの PageIntroduction で表示崩れがないこと
- `npm run build` が成功すること
