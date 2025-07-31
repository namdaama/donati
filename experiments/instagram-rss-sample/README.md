# Instagram RSS 告知投稿サンプル

InstagramのRSSフィードから特定のハッシュタグを含む投稿を抽出し、自動的に告知ページを生成するAstroプロジェクトです。

## 機能

- InstagramのRSSフィードから投稿を取得
- 特定のハッシュタグ（例：#こみかる）でフィルタリング
- 投稿から日付・場所情報を自動抽出
- 各告知に個別ページを自動生成
- CORS問題を回避する画像プロキシ機能
- レスポンシブデザイン対応

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`を`.env`にコピーして、必要な値を設定：

```bash
cp .env.example .env
```

```env
# InstagramのRSSフィードURL
INSTAGRAM_RSS_URL=https://rss.app/feeds/your-feed-id.xml

# 告知投稿を識別するハッシュタグ
ANNOUNCEMENT_HASHTAG="#your-hashtag"
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

## 利用可能なスクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 型チェック後、本番用にビルド |
| `npm run preview` | ビルド結果をローカルでプレビュー |
| `npm run check` | Astroの型チェックを実行 |
| `npm run lint` | ESLintでコードをチェック |
| `npm run lint:fix` | ESLintでコードを自動修正 |
| `npm run format` | Prettierでコードをフォーマット |
| `npm run format:check` | フォーマットのチェックのみ |
| `npm run typecheck` | TypeScriptの型チェック |
| `npm run validate` | すべてのチェックを実行 |

## プロジェクト構成

```
src/
├── components/          # 再利用可能なコンポーネント
│   └── AnnouncementCard.astro
├── config/             # 設定ファイル
│   └── constants.ts    # 定数定義
├── layouts/            # レイアウトコンポーネント
│   └── BaseLayout.astro
├── lib/                # ライブラリ関数
│   ├── announcement-parser.ts  # 告知投稿のパース
│   ├── instagram-rss.ts        # RSS取得処理
│   └── utils/                  # ユーティリティ関数
│       ├── image-extractor.ts  # 画像URL抽出
│       └── xml-sanitizer.ts    # XMLサニタイズ
├── pages/              # ページコンポーネント
│   ├── index.astro     # トップページ
│   ├── announcements/  # 告知詳細ページ
│   └── api/           # APIルート
├── types/              # TypeScript型定義
│   └── instagram.ts
└── env.d.ts           # 環境変数の型定義
```

## カスタマイズ

### ハッシュタグの変更

`.env`ファイルの`ANNOUNCEMENT_HASHTAG`を変更：

```env
ANNOUNCEMENT_HASHTAG="#新しいハッシュタグ"
```

### 表示投稿数の変更

`src/config/constants.ts`の`MAX_DISPLAY_POSTS`を編集：

```typescript
export const ANNOUNCEMENT_CONFIG = {
  MAX_DISPLAY_POSTS: 4, // 表示する投稿数
  // ...
};
```

### カテゴリの追加

`src/config/constants.ts`でカテゴリキーワードを追加：

```typescript
export const CATEGORY_KEYWORDS = {
  workshop: ['workshop', 'ワークショップ'],
  event: ['event', 'イベント'],
  // 新しいカテゴリを追加
  seminar: ['seminar', 'セミナー'],
};
```

## トラブルシューティング

### 画像が表示されない

Instagram CDNの画像はCORS制限があるため、画像プロキシサービス（images.weserv.nl）を使用しています。

### RSSフィードが取得できない

1. RSS URLが正しいか確認
2. RSS.appなどでフィードが有効か確認
3. コンソールログでエラーメッセージを確認

### ハッシュタグでフィルタされない

1. ハッシュタグの形式を確認（#を含める）
2. 大文字小文字の違いに注意
3. コンソールログで取得した投稿のハッシュタグを確認

## ライセンス

MIT