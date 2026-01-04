# 配色管理ガイド

DONATIサイトの配色・カラーシステムの管理方法。

## Figma Color Styles（デザイナー管理）

デザイナーがFigmaでColor Stylesとして定義・管理。実装時はFigma Dev Modeから正確なカラーコードを取得可能。

## Tailwind設定（エンジニア同期）

`tailwind.config.mjs` で一元管理。Figmaでの変更時は手動同期が必要。

### 技術仕様書の配色（2025年1月追加）
- **primary-color**: `#2c5aa0` - メインブルー
- **secondary-color**: `#f4a261` - アクセントオレンジ

### 既存の配色（維持）
- **deep-blue**: `#1a237e`
- **space-blue**: `#0d47a1`
- **light-blue**: `#1976d2`
- **accent-orange**: `#ff6f00`
- **accent-green**: `#00c853`

## 同期手順

Figmaで新しい色を追加・変更した場合:

1. **Figma Dev Modeから正確なカラーコード（HEX）を取得**
   - Figma Design → Dev Mode
   - Color Styles を確認
   - HEX形式でコピー（例: `#2c5aa0`）

2. **`tailwind.config.mjs` の `colors` セクションに追加/更新**
   ```javascript
   colors: {
     // 既存の色
     'deep-blue': '#1a237e',
     'primary-color': '#2c5aa0',  // 新規
     'secondary-color': '#f4a261', // 新規
     // その他
   }
   ```

3. **`npm run build` で型チェックとビルドを実行**
   ```bash
   npm run build
   ```

4. **デザイナーにプレビューURLを共有して色味を確認**
   - Vercelプレビュー: 機能ブランチをpush
   - プレビューURLを共有
   - 色味が仕様書と一致していることを確認

## Tailwindの色指定方法

### 直接指定
```html
<!-- Tailwindの標準色を使用 -->
<div class="bg-blue-500">コンテンツ</div>
```

### カスタム色を使用
```html
<!-- tailwind.config.mjs で定義した色を使用 -->
<div class="bg-primary-color">コンテンツ</div>
<h1 class="text-secondary-color">タイトル</h1>
```

### 不透明度を組み合わせ
```html
<!-- カスタム色 + 不透明度 -->
<div class="bg-primary-color/50">半透明</div>
<div class="bg-primary-color/80">少し透明</div>
```

## 実装時の注意点

### 色の選択順序
1. Figma Dev Mode で HEX コードを取得
2. `tailwind.config.mjs` で定義済みの色があるか確認
3. ない場合は新規追加（同期手順を実行）
4. CSS クラスで使用

### 色の推奨ルール
- **プロジェクトカラー**: primary-color, secondary-color を優先使用
- **UI補助色**: deep-blue, space-blue, light-blue, accent-orange, accent-green
- **テキスト**: `text-gray-800`, `text-white` など標準色
- **背景**: 透過PNGを使用（背景画像: backGround.png）

### Figma同期時の注意
- Color Styles を複数追加した場合、全て tailwind.config.mjs に反映
- 既存の色との競合がないか確認
- 色の命名は英語（例: primary-color, accent-blue）
- ビルド成功を確認してからコミット

## 色の検証方法

```bash
# ビルドで色が正しく認識されているか確認
npm run build

# 開発サーバーで実際の色を確認
npm run dev
```

デザイナーと共有するときは、以下の情報を用意:
- Figmaの色（Color Styles）
- Tailwindでの色定義名
- 実装スクリーンショット（デバイスごと）
