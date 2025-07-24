# Instagram RSS 動的ページ生成サンプル

このサンプルは、Instagram RSSフィードから告知投稿を抽出し、動的にページを生成するAstroプロジェクトです。

## 機能

- Instagram RSSフィードから投稿を取得
- 特定のハッシュタグ（例: #donati_event）を含む告知投稿を抽出
- 各告知投稿から個別ページを自動生成
- 投稿内容から日時・場所などの情報を自動抽出

## セットアップ

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **環境変数の設定**
   - `.env.example`を`.env`にコピー
   - `INSTAGRAM_RSS_URL`にRSSフィードURLを設定
   - `ANNOUNCEMENT_HASHTAG`に告知投稿の識別ハッシュタグを設定

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

## Instagram RSSフィードの取得方法

### オプション1: RSS.app（推奨）
1. https://rss.app にアクセス
2. Instagram URLを入力してRSSフィードを生成
3. 生成されたRSS URLを環境変数に設定

### オプション2: 他のRSSサービス
- Zapier
- IFTTT
- その他のInstagram-RSS変換サービス

## ディレクトリ構造

```
instagram-rss-sample/
├── src/
│   ├── lib/
│   │   ├── instagram-rss.ts    # RSSフィード取得処理
│   │   └── announcement-parser.ts # 告知投稿の解析
│   ├── pages/
│   │   ├── index.astro         # 告知一覧ページ
│   │   └── announcements/
│   │       └── [...slug].astro # 個別告知ページ（動的生成）
│   └── types/
│       └── instagram.ts        # 型定義
├── .env.example               # 環境変数テンプレート
└── package.json
```

## 告知投稿の書き方

Instagram投稿を告知として認識させるために：

1. 設定したハッシュタグ（例: #donati_event）を含める
2. 日時は「2025年1月21日」形式で記載
3. 場所は「場所：」「会場：」「📍」のいずれかで記載

例：
```
科学実験ショー開催！

2025年2月15日（土）14:00〜16:00
場所：東京科学館 3階ホール

楽しい実験がいっぱい！
参加費無料

#donati_event #科学実験 #サイエンスショー
```

## カスタマイズ

- `announcement-parser.ts`で抽出ロジックをカスタマイズ可能
- ページデザインは各`.astro`ファイルで変更可能
- カテゴリ分類のロジックも調整可能