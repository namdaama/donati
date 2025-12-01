# Issue #32: Figmaワークフロー導入対応

## 概要
プロジェクトにFigma（参照用途）が導入されたことに伴い、CLAUDE.mdを更新し、新しいワークフローに対応した開発体制を整備する。

## 優先度
**中** - ドキュメント整備とワークフロー標準化

## 担当
- **エンジニア**: なむ
- **デザイナー**: ひさな

## 背景
2025年12月、デザイナーがFigmaの使用を開始。従来の「スクリーンショットベース開発」から「Figmaベース開発（参照のみ）」に移行し、フォントサイズや色などの正確な数値取得が可能になった。この変更をプロジェクトドキュメントに反映し、チーム全体で共有する必要がある。

---

## 実施内容

### ✅ 完了済み: CLAUDE.md更新

#### 1. 開発方針セクション更新 ([CLAUDE.md:14-21](c:\Users\片岡翔一\Project\Donati\donati\CLAUDE.md#L14-L21))
- **変更前**: 「ワークフロー: スクリーンショットベース開発（Figma不要）」
- **変更後**: 「ワークフロー: Figmaベース開発（参照のみ）」
- Figma Dev Modeでの数値取得方法を明記
- スクリーンショット指示も継続可能と追記

#### 2. Figmaワークフローセクション新規追加 ([CLAUDE.md:213-244](c:\Users\片岡翔一\Project\Donati\donati\CLAUDE.md#L213-L244))
以下の3つのフェーズを詳細に記載：
- **デザインフェーズ**: Figma共有リンク管理、Dev Mode確認、フィードバックフロー
- **実装フェーズ**: 数値取得方法（フォントサイズ、色、余白、角丸、影）、Tailwind classesでの実装
- **アセット書き出しフェーズ**: Export → `design/exports/` → 最適化 → `public/images/`
- **運用のポイント**: 参照用途に特化、柔軟性維持、LINEコミュニケーション継続

#### 3. ディレクトリ構成セクション新規追加 ([CLAUDE.md:308-338](c:\Users\片岡翔一\Project\Donati\donati\CLAUDE.md#L308-L338))
```
design/
├── figma/
│   └── README.md         # Figmaリンク集
└── exports/              # Figma Export済みアセット
    ├── images/          # 画像アセット（PNG/JPG）
    └── graphics/        # ベクターグラフィック（SVG）
```

#### 4. 配色管理セクション拡充 ([CLAUDE.md:246-271](c:\Users\片岡翔一\Project\Donati\donati\CLAUDE.md#L246-L271))
- Figma Color Stylesとの連携方法を追記
- Tailwind設定との同期手順を4ステップで明記:
  1. Figma Dev ModeからHEXコード取得
  2. `tailwind.config.mjs`更新
  3. `npm run build`実行
  4. デザイナーにプレビューURL共有

#### 5. ドキュメント構成セクション拡充 ([CLAUDE.md:340-350](c:\Users\片岡翔一\Project\Donati\donati\CLAUDE.md#L340-L350))
- 既存Figma関連ドキュメントへのリンク追加:
  - `画像からFigma作成ガイド.md`
  - `デザイナーとの協業ガイド_ソース管理編_2025.md`

#### 6. 外部サービス利用セクション更新 ([CLAUDE.md:352-367](c:\Users\片岡翔一\Project\Donati\donati\CLAUDE.md#L352-L367))
- Figmaを必須サービスに追加
- 無料プラン（3ファイル、無制限ビューワー）で継続可能と明記
- 課金見込みに「Figmaは無料プランで継続可能（参照用途のため）」を追記

---

## 今後のタスク

### A. ディレクトリ構造の整備
- [ ] `design/`ディレクトリを作成
  ```bash
  mkdir design
  mkdir design/figma
  mkdir design/exports
  mkdir design/exports/images
  mkdir design/exports/graphics
  ```

### B. Figmaリンク集の作成
- [ ] `design/figma/README.md`を作成
  - プロジェクトのFigma共有リンク一覧
  - アクセス権限の管理方法
  - Dev Modeの使い方簡易ガイド

### C. 既存デザインファイルの整理
- [ ] `frontEndDesign/`内のモックアップ画像を確認
  - `mainPage.jpg`
  - `subPage.jpg`
  - `OverView.jpg`
- [ ] Figmaへのインポートが必要か検討（デザイナーと相談）

### D. ワークフローの試験運用
- [ ] 次回のデザイン変更時にFigmaワークフローを試験的に適用
- [ ] Dev Modeからの数値取得を実践
- [ ] 問題点があれば改善策を検討

---

## 技術的注意事項

### Figma活用レベル: レベル1（参照のみ）
**実施する内容**:
- Figma Dev Modeで正確な数値（フォントサイズ、色、余白など）を取得
- アセットのExport機能を活用
- 共有リンクでデザイン確認

**実施しない内容**（将来的な検討事項）:
- デザインシステムの構築
- Figma Tokens / Style Dictionaryの導入
- Figma API連携による自動化
- Git LFSの導入

### Tailwind CSSとの親和性
Figmaから取得した値は以下のようにTailwindに変換:
- **フォントサイズ**: `16px` → `text-base`
- **余白**: `16px` → `p-4`（4 × 4px = 16px）
- **カラー**: `#2c5aa0` → `primary-color`（tailwind.config.mjsで定義済み）
- **角丸**: `8px` → `rounded-lg`

### 既存ワークフローとの共存
- スクリーンショットでの指示も引き続きサポート
- LINEでの迅速なコミュニケーションは維持
- Figmaは「正確な数値が必要な場合」に参照する補助ツールとして位置づけ

---

## 完了条件

### Phase 1: ドキュメント整備 ✅完了
- [x] CLAUDE.mdの更新（6箇所）
- [x] 開発方針の変更を反映
- [x] Figmaワークフローの文書化

### Phase 2: 環境整備（次のステップ）
- [ ] `design/`ディレクトリ構造の作成
- [ ] `design/figma/README.md`の作成
- [ ] 既存デザインファイルの整理方針決定

### Phase 3: 試験運用（次回のデザイン変更時）
- [ ] Figmaワークフローの実践
- [ ] 問題点の洗い出しと改善
- [ ] ワークフローの最適化

---

## 関連ドキュメント
- [CLAUDE.md](c:\Users\片岡翔一\Project\Donati\donati\CLAUDE.md) - プロジェクトガイドライン（更新済み）
- [docs/04-workflow-collaboration/画像からFigma作成ガイド.md](c:\Users\片岡翔一\Project\Donati\donati\docs\04-workflow-collaboration\画像からFigma作成ガイド.md) - Figma導入ガイド
- [docs/04-workflow-collaboration/デザイナーとの協業ガイド_ソース管理編_2025.md](c:\Users\片岡翔一\Project\Donati\donati\docs\04-workflow-collaboration\デザイナーとの協業ガイド_ソース管理編_2025.md) - ソース管理方針

---

## 期待される効果

### 実装精度の向上
- フォントサイズや余白などの数値が正確に
- 色指定のミスマッチ解消
- デザインカンプとの一致度向上

### コミュニケーション効率化
- 「もう少し大きく」→「20pxに変更」など具体的な指示が可能
- デザイナー・エンジニア間の認識のズレ削減
- Figmaコメント機能での非同期フィードバック

### アセット管理の改善
- Export機能による一貫した画像書き出し
- 複数解像度（@1x、@2x）の管理が容易
- SVGアセットの正確な取得

---

## 備考
- Figma無料プラン（3ファイル）で運用
- 参照用途のため、本格的なデザインシステム構築は不要
- 友達価格プロジェクトの効率性を損なわない範囲で活用
- 段階的に活用範囲を拡大（必要に応じてレベル2への移行も検討）

---

## 次のアクション
1. このissueをチームで共有
2. デザイナー（ひさな）にFigma共有リンクの提供を依頼
3. `design/`ディレクトリの作成（Issue #33として分離も検討）
4. 次回のデザイン変更時にワークフローを実践
