# Instagram Graph API移行 - タスク化

**作成日**: 2025-01-24
**前提**: `.claude_workflow/requirements.md`と`.claude_workflow/design.md`を読み込み済み
**ステータス**: タスク化中

---

## フェーズ2: Graph API実装（エンジニア作業）

### タスク2-1: instagram-graph-api.ts 作成
**優先度**: 高
**所要時間**: 2-3時間
**依存**: なし

- [ ] `src/lib/instagram-graph-api.ts` ファイル作成
- [ ] GraphAPIMedia型定義を実装
- [ ] GraphAPIResponse型定義を実装
- [ ] fetchInstagramPosts() 関数実装
  - [ ] 環境変数チェック（ACCESS_TOKEN, ACCOUNT_ID）
  - [ ] checkTokenValidity() 呼び出し
  - [ ] Graph API呼び出し（fields, limit=50）
  - [ ] IMAGE/CAROUSEL_ALBUMフィルタリング
  - [ ] InstagramPost型へのマッピング
  - [ ] エラーハンドリング（空配列返却）
- [ ] checkTokenValidity() 関数実装
  - [ ] debug_token API呼び出し
  - [ ] is_valid チェック
  - [ ] expires_at チェック（14日前警告）
  - [ ] エラーハンドリング
- [ ] extractHashtags() 関数実装
  - [ ] 正規表現: `/#[^\s#]+/g`
- [ ] extractFirstLine() 関数実装
  - [ ] 改行で分割、1行目取得

**成功基準**:
- ビルドエラーなし
- 型チェック通過
- 環境変数未設定時に空配列返却

---

### タスク2-2: index.astro 更新
**優先度**: 高
**所要時間**: 15分
**依存**: タスク2-1完了

- [ ] `src/pages/index.astro` を開く
- [ ] import文を変更
  - Before: `import { fetchInstagramPosts } from '../lib/instagram-rss';`
  - After: `import { fetchInstagramPosts } from '../lib/instagram-graph-api';`
- [ ] fetchInstagramPosts() 呼び出しを変更
  - Before: `const posts = await fetchInstagramPosts(instagramConfig.rssUrl);`
  - After: `const posts = await fetchInstagramPosts();`
- [ ] ビルドエラーがないことを確認

**成功基準**:
- import文が正しく変更されている
- 関数呼び出しが正しく変更されている
- ビルドエラーなし

---

### タスク2-3: announcements/[...slug].astro 更新
**優先度**: 高
**所要時間**: 15分
**依存**: タスク2-1完了

- [ ] `src/pages/announcements/[...slug].astro` を開く
- [ ] import文を変更
  - Before: `import { fetchInstagramPosts } from '../../lib/instagram-rss';`
  - After: `import { fetchInstagramPosts } from '../../lib/instagram-graph-api';`
- [ ] fetchInstagramPosts() 呼び出しを変更
  - Before: `const posts = await fetchInstagramPosts(instagramConfig.rssUrl);`
  - After: `const posts = await fetchInstagramPosts();`
- [ ] ビルドエラーがないことを確認

**成功基準**:
- import文が正しく変更されている
- 関数呼び出しが正しく変更されている
- ビルドエラーなし

---

### タスク2-4: instagram.ts 設定更新
**優先度**: 中
**所要時間**: 10分
**依存**: なし

- [ ] `src/config/instagram.ts` を開く
- [ ] rssUrl プロパティを削除
  - 削除行: `rssUrl: import.meta.env.INSTAGRAM_RSS_URL || '',`
- [ ] announcementHashtagのデフォルト値を確認
  - `import.meta.env.ANNOUNCEMENT_HASHTAG || '#donati_event'`
- [ ] その他の設定が維持されていることを確認
  - enableHashtagFilter
  - maxDisplayPosts
  - imageProxy
- [ ] ビルドエラーがないことを確認

**成功基準**:
- rssUrlが削除されている
- 他の設定は維持されている
- ビルドエラーなし

---

### タスク2-5: .env.example 更新
**優先度**: 中
**所要時間**: 10分
**依存**: なし

- [ ] `.env.example` を開く
- [ ] 既存のRSS設定をコメントアウト
  - `# INSTAGRAM_RSS_URL=https://rss.app/feeds/xxxxx.xml`
- [ ] 新しいGraph API環境変数を追加
  ```env
  # Instagram Graph API（秘密情報 - Vercelに設定）
  INSTAGRAM_ACCESS_TOKEN=IGQW...
  INSTAGRAM_BUSINESS_ACCOUNT_ID=17841...
  FACEBOOK_APP_ID=123456789...
  FACEBOOK_APP_SECRET=abc123...
  ```
- [ ] 既存の設定が維持されていることを確認
  ```env
  ANNOUNCEMENT_HASHTAG="#donati_event"
  ENABLE_HASHTAG_FILTER=true
  ```

**成功基準**:
- 新しい環境変数が追加されている
- コメントが適切に記載されている

---

## フェーズ3: トークン管理（エンジニア作業）

### タスク3-1: refresh-instagram-token.ts 作成
**優先度**: 中
**所要時間**: 1時間
**依存**: なし

- [ ] `scripts/` ディレクトリが存在するか確認（なければ作成）
- [ ] `scripts/refresh-instagram-token.ts` ファイル作成
- [ ] 環境変数読み込み
  - FACEBOOK_APP_ID
  - FACEBOOK_APP_SECRET
  - INSTAGRAM_ACCESS_TOKEN（現在のトークン）
- [ ] トークン交換API呼び出し実装
  - エンドポイント: `/oauth/access_token`
  - grant_type: fb_exchange_token
- [ ] 結果出力実装
  - 新しいアクセストークン
  - 有効期限（日数）
  - Vercel更新コマンド例
- [ ] エラーハンドリング実装

**成功基準**:
- スクリプトが実行可能
- 環境変数エラー時に適切なメッセージ表示
- API成功時に新しいトークンを出力

---

### タスク3-2: package.json にスクリプト追加
**優先度**: 中
**所要時間**: 5分
**依存**: タスク3-1完了

- [ ] `package.json` を開く
- [ ] `scripts` セクションに追加
  ```json
  "refresh-token": "tsx scripts/refresh-instagram-token.ts"
  ```
- [ ] `devDependencies` に tsx 追加（未インストールの場合）
  ```json
  "tsx": "^4.7.0"
  ```

**成功基準**:
- `npm run refresh-token` でスクリプトが実行可能

---

### タスク3-3: ローカル .env ファイル作成
**優先度**: 高
**所要時間**: 10分
**依存**: フェーズ1（準備作業）完了後

- [ ] `.env` ファイルを作成（.gitignoreに含まれることを確認）
- [ ] 4つの環境変数を設定
  ```env
  INSTAGRAM_ACCESS_TOKEN={実際のトークン}
  INSTAGRAM_BUSINESS_ACCOUNT_ID={実際のID}
  FACEBOOK_APP_ID={実際のID}
  FACEBOOK_APP_SECRET={実際のSecret}
  ```
- [ ] 既存の環境変数も設定
  ```env
  ANNOUNCEMENT_HASHTAG="#donati_event"
  ENABLE_HASHTAG_FILTER=true
  ```

**成功基準**:
- `.env`ファイルが作成されている
- 全ての環境変数が設定されている
- `.gitignore`に`.env`が含まれている

---

## フェーズ4: 統合・テスト（エンジニア作業）

### タスク4-1: ローカルビルドテスト
**優先度**: 高
**所要時間**: 30分
**依存**: タスク2-1〜2-5, タスク3-3完了

- [ ] `npm run build` を実行
- [ ] 型チェックが成功することを確認
- [ ] ビルドエラーがないことを確認
- [ ] ビルドログでInstagram投稿取得のログを確認
- [ ] トークン有効性チェックのログを確認
- [ ] 警告ログがあれば内容を確認

**成功基準**:
- ビルド成功
- 型エラーなし
- Instagram投稿取得に関するエラーログなし

---

### タスク4-2: 機能テスト
**優先度**: 高
**所要時間**: 30分
**依存**: タスク4-1完了

- [ ] `npm run preview` を実行
- [ ] ブラウザでhttp://localhost:4321にアクセス
- [ ] トップページのお知らせセクションを確認
  - [ ] 4件表示されているか
  - [ ] 画像が表示されているか（プロキシ経由）
  - [ ] タイトルが表示されているか
  - [ ] 日付が表示されているか
- [ ] お知らせカードをクリック
  - [ ] 詳細ページが表示されるか
  - [ ] 内容が正しく表示されているか
  - [ ] Instagramリンクが動作するか

**成功基準**:
- お知らせが4件表示される
- 画像が正しく表示される
- 詳細ページが正常に動作する

---

### タスク4-3: エラーハンドリング確認
**優先度**: 中
**所要時間**: 30分
**依存**: タスク4-1完了

- [ ] 環境変数未設定時のテスト
  - [ ] `.env`をリネーム
  - [ ] `npm run build` 実行
  - [ ] エラーログが出力されることを確認
  - [ ] ビルドは成功することを確認
  - [ ] `.env`を復元
- [ ] トークン無効時のテスト（オプション）
  - [ ] 無効なトークンを設定
  - [ ] 警告ログが出力されることを確認
  - [ ] ビルドは成功することを確認
  - [ ] 有効なトークンに戻す

**成功基準**:
- エラー時も適切なログが出力される
- エラー時もビルドが失敗しない

---

## 実行順序

```
フェーズ2: Graph API実装
  タスク2-1 → タスク2-2, タスク2-3 (並行可能)
  タスク2-4, タスク2-5 (並行可能)

フェーズ3: トークン管理
  タスク3-1 → タスク3-2
  タスク3-3 (フェーズ1完了後)

フェーズ4: 統合・テスト
  タスク4-1 → タスク4-2
  タスク4-3 (並行可能)
```

---

## 優先度別タスク

### 高優先度（必須）
- タスク2-1: instagram-graph-api.ts 作成
- タスク2-2: index.astro 更新
- タスク2-3: announcements/[...slug].astro 更新
- タスク3-3: ローカル .env ファイル作成
- タスク4-1: ローカルビルドテスト
- タスク4-2: 機能テスト

### 中優先度（推奨）
- タスク2-4: instagram.ts 設定更新
- タスク2-5: .env.example 更新
- タスク3-1: refresh-instagram-token.ts 作成
- タスク3-2: package.json にスクリプト追加
- タスク4-3: エラーハンドリング確認

---

## チェックポイント

### フェーズ2完了時
- [ ] 全てのファイルがビルドエラーなし
- [ ] 型チェックが通過
- [ ] import文が正しく変更されている

### フェーズ3完了時
- [ ] トークン更新スクリプトが実行可能
- [ ] ローカル環境変数が設定済み

### フェーズ4完了時
- [ ] ビルドが成功する
- [ ] トップページでお知らせが表示される
- [ ] 詳細ページが正常に動作する
- [ ] エラーハンドリングが適切に機能する

---

## 注意事項

1. **環境変数の取り扱い**
   - `.env`ファイルは絶対にコミットしない
   - テスト用のダミー値を使う場合も注意

2. **段階的な実装**
   - 一度に全てを変更せず、小さな変更を積み重ねる
   - 各タスク完了時にビルドエラーを確認

3. **エラーは無視しない**
   - エラーが発生したら解決してから次へ進む
   - ビルド警告も確認する

4. **指示にない機能は追加しない**
   - 設計書に記載されていない機能は実装しない
   - 疑問があれば確認する

---

**次のステップ**: 実行フェーズに進む（タスク2-1から開始）