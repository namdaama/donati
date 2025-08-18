# 画像からFigma作成ガイド - ステップバイステップ

## 準備段階

### ステップ1: Figmaアカウントとファイルの準備
1. **Figmaにログイン** (https://www.figma.com)
2. **新規ファイル作成**
   - ダッシュボードで「+ New design file」をクリック
   - ファイル名を設定: 「DONATI_LP_Design」

### ステップ2: 画像の準備とインポート
1. **画像をFigmaにインポート**
   - mainPage.jpgとsubPage.jpgをドラッグ&ドロップ
   - または「Place Image」ツール（Shift + Ctrl/Cmd + K）を使用
2. **画像を配置**
   - 各画像を別々のページに配置
   - 画像をロック（右クリック → Lock）してトレース作業中に動かないように

### ステップ3: フレームの設定
1. **デスクトップフレームを作成**
   - Frame Tool（F）を選択
   - Desktop → MacBook Pro 14"（1512×982px）を選択
   - または Custom Sizeで 1440×900px を設定
2. **画像に合わせてフレームを調整**
   - 画像の上にフレームを重ねる
   - 不透明度を50%に設定して作業しやすくする

## メインページのFigma化

### ステップ4: グリッドシステムの設定
1. **レイアウトグリッドを追加**
   ```
   右パネル → Layout Grid → +
   - Columns: 12
   - Margin: 80px
   - Gutter: 24px
   ```
2. **セクション用の行グリッドも追加**
   ```
   - Rows: 80px間隔
   - セクション間の余白確認用
   ```

### ステップ5: カラーパレットの作成
1. **ローカルスタイルとして色を登録**
   ```
   背景:
   - Sky Blue: #87CEEB
   - Light Sky: #E0F4FF
   - White: #FFFFFF
   
   アクセント:
   - Yellow: #FFD700
   - Yellow Light: #FFF4CC
   
   テキスト:
   - Dark: #333333
   - Gray: #666666
   ```
2. **Color Stylesとして保存**
   - 各色を選択 → 右パネルの「+」→ Create Style

### ステップ6: ヘッダーセクションの作成

#### 6-1: 背景レイヤー
```
1. Rectangle Tool (R)
2. Width: 1440px, Height: 100px
3. Fill: Yellow (#FFD700)
4. 位置: X:0, Y:0
```

#### 6-2: ロゴエリア
```
1. Frame (F) → 200×60px
2. 位置: X:80, Y:20
3. Text Tool (T) → "DONATI"
4. Font: Rounded Mplus 1c Bold (または類似の丸ゴシック)
5. Size: 24px
6. Color: Sky Blue (#87CEEB)
```

#### 6-3: ナビゲーションアイコン
```
1. 各アイコン用Frame: 60×60px
2. 間隔: 40px
3. 配置: 右寄せ (X:1000から開始)
4. アイコンタイプ:
   - 家アイコン（ホーム）
   - 星アイコン（お気に入り）
   - 人アイコン（スタッフ）
   - 封筒アイコン（お問い合わせ）
```

### ステップ7: ヒーローセクションの作成

#### 7-1: 背景とレイアウト
```
1. Frame: 1440×500px
2. Background: Linear Gradient
   - Top: #E0F4FF
   - Bottom: #87CEEB
3. 雲の装飾: Ellipse Tool (O)
   - 複数の円を重ねて雲を表現
   - Opacity: 80%
```

#### 7-2: メインコンテンツカード
```
1. Frame: 600×350px (Auto Layout推奨)
2. Background: Yellow (#FFD700)
3. Corner Radius: 32px
4. Padding: 40px
5. 内容:
   - タイトル: 32px, Bold
   - サブテキスト: 18px, Regular
   - CTAボタン: 160×48px, Corner Radius: 24px
```

#### 7-3: キャラクターイラスト
```
1. 配置エリア: 400×400px
2. プレースホルダー: 
   - Circle (地球)
   - Rectangle (キャラクター部分)
3. グループ化して配置
```

### ステップ8: お知らせセクション

#### 8-1: セクション構造
```
1. Frame: 1440×600px
2. Auto Layout設定:
   - Direction: Vertical
   - Padding: 80px
   - Item Spacing: 40px
```

#### 8-2: カードコンポーネント作成
```
1. Card Frame: 320×400px
2. 構成要素:
   - Image Area: 320×200px
   - Content Area: 320×200px
     - Padding: 20px
     - Date: 14px, Gray
     - Title: 18px, Bold
     - Category Tag: 12px
3. Component化 (Ctrl/Cmd + Alt + K)
```

#### 8-3: グリッドレイアウト
```
1. Parent Frame with Auto Layout
2. Direction: Horizontal
3. Spacing: 24px
4. Wrap: 4 columns
```

### ステップ9: その他のセクション

#### 9-1: スタッフ紹介セクション
```
1. Frame: 1440×400px
2. 2カラムレイアウト
3. 各カード: 600×350px
   - Icon/Image: 120×120px
   - Text Area: Auto Layout
```

#### 9-2: お問い合わせセクション
```
1. Frame: 1440×500px
2. Background: Light Blue
3. Contact Info Card: 600×300px
   - Phone Number: 32px
   - Business Hours: 18px
   - CTA Button: 200×56px
```

## サブページのFigma化

### ステップ10: サブページテンプレート

#### 10-1: ページ構造
```
1. ヘッダー: メインページと同じコンポーネント使用
2. Hero Section: 1440×400px
   - Title: 48px
   - Description: 18px
3. Content Sections: Auto Layout
   - Spacing: 60px
```

#### 10-2: コンテンツカード
```
1. Card Template: 1200×auto
2. Auto Layout設定
3. 画像とテキストの2カラム構成
```

## コンポーネント化と整理

### ステップ11: デザインシステムの構築

#### 11-1: コンポーネント作成
```
選択すべき要素:
1. ボタン（Primary, Secondary）
2. カード（お知らせ, スタッフ）
3. ナビゲーションアイコン
4. セクションヘッダー

手順:
1. 要素を選択
2. Create Component (Ctrl/Cmd + Alt + K)
3. 名前を付ける（例: Button/Primary）
```

#### 11-2: Variants作成
```
1. コンポーネントを選択
2. 右パネル → Add Variant
3. Properties設定:
   - State: Default, Hover, Active
   - Size: Small, Medium, Large
   - Type: Primary, Secondary
```

### ステップ12: レスポンシブ設定

#### 12-1: Constraintsの設定
```
各要素に対して:
1. 選択
2. 右パネル → Constraints
3. 設定例:
   - ヘッダー: Left & Right, Top
   - カード: Center, Scale
   - ボタン: Center
```

#### 12-2: Auto Layoutの活用
```
1. フレームを選択
2. Shift + A でAuto Layout追加
3. 設定:
   - Padding: 一括または個別
   - Spacing: 要素間の間隔
   - Alignment: 配置方法
```

## エクスポートと共有

### ステップ13: 開発者向け設定

#### 13-1: エクスポート設定
```
1. 各アセットを選択
2. 右パネル → Export
3. 設定:
   - PNG: 2x (Retina対応)
   - SVG: アイコン類
   - PDF: ドキュメント用
```

#### 13-2: Dev Mode設定
```
1. 右上の「Share」ボタン
2. 「Dev Mode」を有効化
3. 開発者に共有リンクを送信
```

### ステップ14: スタイルガイド生成

#### 14-1: Local Stylesの整理
```
Colors:
- Primary/Main
- Primary/Light
- Secondary/Main
- Text/Primary
- Text/Secondary

Typography:
- Heading/H1
- Heading/H2
- Body/Regular
- Body/Small
```

#### 14-2: ドキュメント作成
```
1. 新しいページを追加「Style Guide」
2. 各スタイルのサンプルを配置
3. 使用ルールを記載
```

## 便利なプラグイン

### 推奨プラグイン
1. **Content Reel** - ダミーテキストや画像の自動挿入
2. **Unsplash** - 無料画像の検索と挿入
3. **Iconify** - アイコンライブラリ
4. **Figma to Code** - HTML/CSSの自動生成
5. **Design Tokens** - トークンのエクスポート

### インストール方法
```
1. メニュー → Plugins → Browse plugins
2. 検索してインストール
3. 右クリック → Plugins → 選択して実行
```

## チェックリスト

### 完成度チェック
- [ ] 全セクションがフレーム化されている
- [ ] カラースタイルが定義されている
- [ ] テキストスタイルが定義されている
- [ ] 主要コンポーネントが作成されている
- [ ] Auto Layoutが適切に設定されている
- [ ] Constraintsが設定されている
- [ ] アセットがエクスポート可能な状態
- [ ] Dev Modeで確認可能
- [ ] 共有リンクが生成されている

## トラブルシューティング

### よくある問題と解決策

1. **画像の画質が悪い**
   - 解決: Place Imageで高解像度画像を使用

2. **Auto Layoutが崩れる**
   - 解決: Absolute Positionを確認、不要なら解除

3. **コンポーネントが更新されない**
   - 解決: Instance を選択 → Reset Instance

4. **エクスポートサイズが大きすぎる**
   - 解決: Export設定で圧縮率を調整

この手順に従えば、デザイン画像から正確なFigmaファイルを作成できます。