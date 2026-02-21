# タスク化: [実績] 文言の全般的な書き換え (Issue #215)

## 前段階の確認
`.claude_workflow/design.md` を読み込みました。

## タスクリスト

### タスク1: CategorySection.astro の categoryTitle を optional 化
- [x] `categoryTitle: string` → `categoryTitle?: string` に変更
- [x] テンプレート部分: categoryTitle が空の場合 SectionGrayHeading を非表示にする条件分岐を追加

### タスク2: わくわく科学実験室のデータ修正
- [x] serviceName から `（スライム・色変パンケーキ・DNA抽出 ほか）` を削除
- [x] locations 配列の先頭に `（スライム・色変パンケーキ・DNA抽出 ほか）` を追加

### タスク3: メディア出演・その他セクションのデータ再構築
- [x] categories を1要素（categoryTitle: ''）に統合
- [x] 旧カテゴリ名（メディア出演、自主企画イベント、声の出演）をサービス名に降格
- [x] 旧サービス名（ラジオ・テレビ出演、主催イベント）を削除し場所を直接紐づけ
- [x] 「Moon Night Circus 2025 （オーディオガイド ナレーション）」を1つの場所項目に統合

### タスク4: スペース表記の統一
- [x] 全角スペース「　」+「など」を半角スペース+「など」に統一（4箇所）

### タスク5: components-guide.md のドキュメント更新
- [x] CategorySection の Props 説明に categoryTitle が optional であることを反映

### タスク6: ビルド確認
- [x] `npm run build` でエラーがないことを確認（0 errors, 0 warnings）
