# Figmaワークフロー ガイド

デザイナーとエンジニア間のFigmaを使ったワークフローの詳細。実装者がDev Modeから正確な数値を取得する方法。

## デザインフェーズ

### 1. デザイン作成
デザイナーがFigmaでデザインを作成。

### 2. 共有
Figma共有リンクをLINEまたはプロジェクトドキュメント（`docs/`）で共有。

### 3. 確認
エンジニアがFigma Dev Modeで仕様確認。

### 4. フィードバック
必要に応じてFigmaコメント機能で調整依頼。

### 5. 承認
最終デザイン確定。

## 実装フェーズ

### 1. 数値取得（Dev Modeから）

Figma Dev Modeから以下の正確な値を取得:

#### タイポグラフィ
```
- フォントサイズ （例: 16px, 24px）
- 行高 （例: 1.5, 1.2）
- フォントウェイト （例: 400, 600, 700）
- フォントファミリー （デフォルト: Noto Sans JP）
```

#### 色
```
- カラーコード （HEX形式: #2c5aa0）
- RGB値 （例: rgb(44, 90, 160)）
- 不透明度 （例: 100%, 80%）
```

#### スペーシング
```
- パディング （例: 16px, 24px）
- マージン （例: 32px, 48px）
- ギャップ （グリッド/フレックス: 8px, 16px）
```

#### その他
```
- 要素サイズ （幅: 300px, 高さ: 200px）
- 角丸 （border-radius: 8px, 16px）
- 影 （box-shadow: 0 4px 12px rgba(0,0,0,0.1)）
- ボーダー （色, 幅: 1px, 2px）
```

### 2. 実装
取得した数値をTailwind classesで実装。

```html
<!-- Tailwind実装例 -->
<h1 class="text-2xl font-bold leading-tight text-primary-color">
  タイトル
</h1>

<div class="p-6 rounded-lg shadow-md bg-gray-50">
  コンテンツ
</div>
```

### 3. プレビュー
ローカル or Vercelプレビューで確認:

```bash
npm run dev              # ローカル確認
# or
機能ブランチをpush      # Vercelプレビュー生成
```

### 4. デザイナーレビュー
デザイナーが最終チェック。

## アセット書き出しフェーズ

### 1. Export
Figmaから画像・SVGアセットをExport:

- **画像**: PNG/JPG（@1x、@2xなど）
- **アイコン**: SVG
- **解像度**: 1x（標準）, 2x（高解像度）

Figmaの Export パネルから以下の設定で書き出し:
```
Format: PNG or SVG
Resolution: 1x（最小限）
```

### 2. 最適化
必要に応じて圧縮・最適化:

```bash
# PNG最適化
pngquant input.png -o output.png

# SVG最適化（テキストエディタでも可）
SVGO, ImageOptim 等を使用
```

### 3. 配置
`public/images/` 配下の適切なディレクトリに配置:

```
public/images/
├── svg/
│   ├── Carousel/      # カルーセル用SVG（4ファイル + _old/）
│   ├── Screen/        # デザインモックアップ参考用（6ファイル）
│   ├── icons/         # アイコン類（階層構造）
│   │   ├── header/    # ヘッダー用アイコン（7ファイル）
│   │   └── sub/       # サブアイコン（11ファイル）
│   ├── text/          # テキストSVG（16ファイル）
│   ├── steps/         # ステップ表示（6ファイル）
│   ├── logos/         # ロゴ類（3ファイル）
│   ├── performers/    # 出演者画像（階層構造）
│   │   ├── fuji/      # フジさん（2ファイル）
│   │   └── hide/      # ヒデさん（2ファイル）
│   ├── decorations/   # 装飾要素（階層構造）
│   │   └── waveline/  # 波線（4ファイル + 直下5ファイル）
│   └── conference/    # カンファレンス用（4ファイル）
├── picture/           # コンテンツ用写真
│   ├── About/         # Aboutページ用（5ファイル）
│   ├── OverView/      # トップページ用（2ファイル）
│   └── Science/       # サイエンス事業用（9ファイル）
├── rough/             # ページ用背景画像（9ファイル）
└── forDev/            # 開発用参考画像（4ファイル）
```

**配置ルール**:
- **SVGアイコン**: `/images/svg/icons/` 配下に用途別配置（header/ または sub/）
- **SVGテキスト**: `/images/svg/text/` に配置
- **SVGロゴ**: `/images/svg/logos/` に配置
- **SVG装飾**: `/images/svg/decorations/` に配置（波線系は waveline/ サブディレクトリ）
- **カルーセル**: `/images/svg/Carousel/` に配置
- **写真**: `/images/picture/` 配下にページ別配置（About/, OverView/, Science/）
- **背景画像**: `/images/rough/` に配置（AboutUs.jpg, Contact.jpg等）
- **デザインモックアップ**: `/images/svg/Screen/` に配置（開発参考用）
- **開発参考用**: `/images/forDev/` に配置

### 4. Gitコミット
最適化済みファイルをコミット。

## 運用のポイント

### 参照用途
Figmaは正確な数値取得とアセット管理に活用。

### 柔軟性
スクリーンショットベースの指示も継続可能。

### コミュニケーション
LINEでの迅速なやり取りは維持。

### 段階的導入
必要な機能から徐々に活用範囲を拡大。

## Figma Dev Modeの使い方

### アクセス方法
1. Figma のファイルを開く
2. 右上 「Dev Mode」タブをクリック
3. コンポーネント/レイヤーを選択
4. 右パネルに数値が表示される

### 数値取得の例

#### テキストの数値取得
```
レイヤー選択 → 右パネル
- Font: Noto Sans JP
- Size: 24px
- Weight: 700
- Line height: 32px (1.33)
- Color: #2c5aa0
```

#### ボックスの数値取得
```
レイヤー選択 → 右パネル
- Width: 300px
- Height: 200px
- Padding: 16px
- Border radius: 8px
- Box shadow: 0 4px 12px rgba(0,0,0,0.1)
- Background: #ffffff
```

### コピーの便利機能
- 「Copy as CSS」: CSSコードを自動生成（Tailwindに手動変換）
- 「Copy all」: 全プロパティをコピー

## トラブルシューティング

### Dev Modeで数値が表示されない
- コンポーネント/レイヤーが正しく選択されているか確認
- Figma を再読み込み

### アセット書き出しが失敗
- ファイル形式が正しいか確認（PNG/SVG）
- ファイルサイズが大きすぎないか確認

### 数値と実装が異なる
- Figma Dev Mode の数値を再確認
- ブラウザのズームレベルを確認（100%か）
- Tailwindの制約値を確認

## ファイル管理

### Figmaリンク管理
Figma共有リンクはLINEまたはプロジェクトドキュメント（`docs/`）で管理。

専用の `design/` ディレクトリは作成しない。

### バージョン管理
- 完成したデザイン: 「Design - Final」等のバージョン作成
- フィードバック中: 「Design - WIP」等のステータス記載
