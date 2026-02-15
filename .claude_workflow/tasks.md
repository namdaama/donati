# タスク化: Issue #217-219 まとめて対応

前段階の `.claude_workflow/design.md` を読み込みました。

## タスクリスト

### タスク1: サイエンス事業ページの文言修正（Issue #217）
- [ ] `src/pages/service-fuji.astro` の `serviceDescriptions[0].recommendedScenesData.overviewDescription` を差し替え（サイエンスパフォーマンスショー）
- [ ] `serviceDescriptions[1].recommendedScenesData.overviewDescription` を差し替え（わくわく科学実験室）
- [ ] `serviceDescriptions[2].recommendedScenesData.overviewDescription` を差し替え（ワークショップ）

### タスク2: Header固定化（Issue #218）
- [ ] `src/components/common/Header.astro` の `<header>` タグのクラスを `sticky top-0 z-50 bg-white` に変更

### タスク3: FooterにInstagramリンク追加（Issue #219）
- [ ] `src/components/common/Footer.astro` の frontmatter で `siteConfig` をインポート
- [ ] 左側セクション（キャッチコピーの下）にInstagramアイコンリンクを追加

### タスク4: 動作確認
- [ ] `npm run build` でビルドエラーがないことを確認

## 実行順序

1. タスク1（文言差し替え・単純作業）
2. タスク2（Header 1行変更）
3. タスク3（Footer インポート追加 + アイコン追加）
4. タスク4（ビルド確認）
