# タスク化: Issue #232 - レスポンシブ時にもくもく見出しが左に寄る（aspect-ratio 方式）

## 前段階の確認
`.claude_workflow/design.md` を読み込みました。

## タスクリスト

### タスク1: SectionCloudyHeading.astro のCSS修正
- [x] `@media (max-width: 768px)` 内の `.section-cloudy-bg` ルール（contain/left）を削除
- [x] `@media (max-width: 768px)` 内の `.section-cloudy-heading-wrapper` を `height: auto; aspect-ratio: 988 / 135; min-height: 50px;` に変更

### タスク2: ビルド確認
- [x] `npm run build` でエラーがないことを確認（8 pages, 0 errors）

### タスク3: 表示確認
- [x] Claude in Chrome で確認（iframe によるメディアクエリ検証）
  - 375px: object-fit: fill、背景全幅、高さ50px（min-height適用）、左寄りなし
  - 760px: object-fit: fill、背景全幅、高さ97px（原寸比 988/135 を維持、雲が潰れない）
  - 1280px（デスクトップ）: 高さ135px、変化なし

### タスク4: コミット
- [x] `fix/issue-232-cloudy-heading-responsive` ブランチにコミット
