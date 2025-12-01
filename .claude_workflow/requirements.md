# Instagram Graph API移行 - 要件定義

**作成日**: 2025-01-24
**タスク**: Instagram RSS連携をGraph APIに移行
**ステータス**: 要件定義中

---

## 1. 目的

### 主目的
Instagram RSS連携をRSS.appからInstagram Graph APIに移行し、コスト削減とデータ品質向上を実現する。

### 副次的目的
- 年間14,400円のコスト削減
- データ取得の安定性向上
- 投稿数制限の撤廃（15件→無制限）
- 長期的な運用の安定化

---

## 2. 現状把握

### 現在の実装状況
- **ブランチ**: `feature/instagram-rss-integration-issue-23`
- **実装済み機能**:
  - RSS.app経由でInstagram投稿取得
  - ハッシュタグフィルタリング（`#こみかる`）
  - お知らせカード表示（トップページに4件）
  - 詳細ページ自動生成（`/announcements/[slug]`）
  - 画像プロキシ対応（weserv.nl）

### 現在の課題
1. **コスト**: RSS.app Basicプラン $8.32/月（年間14,400円）が必要
2. **制限**: 無料プランではInstagram連携不可
3. **トライアル**: 7日間で期限切れ
4. **投稿数**: 最新15投稿まで
5. **更新頻度**: 15-60分ごと
6. **データ品質**: HTMLパース、XMLサニタイズが必要

### Instagramアカウント情報
- **アカウント**: @wakuwaku_science_fuji
- **URL**: https://www.instagram.com/wakuwaku_science_fuji/
- **必要な変更**: Business/Creatorアカウント化

---

## 3. 機能要件

### FR-1: Instagram投稿取得
- **要件**: Instagram Graph APIで投稿を取得
- **仕様**:
  - エンドポイント: `GET /v21.0/{account-id}/media`
  - フィールド: `id,caption,media_type,media_url,permalink,timestamp`
  - 取得件数: 最大50件/リクエスト
  - フィルタ: `media_type`が`IMAGE`または`CAROUSEL_ALBUM`のみ
- **成功基準**: ビルド時にInstagram投稿を正常に取得できる

### FR-2: データ変換
- **要件**: Graph APIレスポンスをInstagramPost型に変換
- **仕様**:
  - `caption` → `title`（1行目）と`content`（全文）
  - `media_url` → `imageUrl`
  - `permalink` → `link`
  - `timestamp` → `pubDate`
  - キャプションからハッシュタグ抽出
- **成功基準**: 既存のAnnouncementCard.astroで表示可能

### FR-3: ハッシュタグフィルタリング
- **要件**: 特定ハッシュタグの投稿のみ表示
- **仕様**:
  - 環境変数`ANNOUNCEMENT_HASHTAG`で設定
  - 既存の`announcement-parser.ts`を再利用
- **成功基準**: 指定ハッシュタグの投稿のみ表示

### FR-4: トークン有効性チェック
- **要件**: アクセストークンの有効期限チェック
- **仕様**:
  - ビルド時にトークン有効期限確認
  - 14日以内に期限切れ → 警告ログ
  - トークン無効 → 空配列返却
- **成功基準**: 期限が近い場合、警告が表示される

### FR-5: エラーハンドリング
- **要件**: API呼び出し失敗時の適切な処理
- **仕様**:
  - 環境変数未設定 → エラーログ + 空配列
  - トークン無効 → 警告ログ + 空配列
  - API失敗 → エラーログ + 空配列
  - ビルドは失敗させない
- **成功基準**: エラー時もビルドが成功し、適切なログが出力

---

## 4. 非機能要件

### NFR-1: パフォーマンス
- ビルド時間の増加を最小限に（+10%以内）
- JSON直接使用（XMLパース不要）

### NFR-2: 互換性
- InstagramPost型の構造維持
- 既存UIコンポーネント（AnnouncementCard.astro）は変更不要

### NFR-3: セキュリティ
- アクセストークンは環境変数で管理
- `.env`は`.gitignore`に含める
- Vercel環境変数に設定

### NFR-4: 保守性
- トークン更新スクリプト提供
- 更新手順ドキュメント作成

### NFR-5: 可用性
- API障害時もビルド成功
- エラーログで問題を明示

---

## 5. 制約条件

### 技術的制約
1. Astro SSG: ビルド時のみAPI呼び出し
2. Graph API制約:
   - レート制限: 200リクエスト/時
   - トークン有効期限: 60日
   - Instagram Business/Creator必須
3. Facebookページ連携必須

### 外部依存
1. Meta Developer App
2. Instagram Businessアカウント: @wakuwaku_science_fuji
3. Facebookページ
4. Vercel環境変数

---

## 6. 成功基準

### 必須条件
- [ ] Instagram Graph APIで投稿取得成功
- [ ] ハッシュタグフィルタリング正常動作
- [ ] トップページお知らせセクションに4件表示
- [ ] 詳細ページ生成成功
- [ ] 画像表示成功（プロキシ経由）
- [ ] ビルド成功
- [ ] 本番環境で正常動作

### 推奨条件
- [ ] トークン有効期限チェック動作
- [ ] 14日前警告ログ表示
- [ ] トークン更新スクリプト動作

---

## 7. 除外事項

以下は実装範囲外：
1. リアルタイム更新（クライアント側API呼び出し）
2. 複数アカウント対応
3. 動画投稿対応
4. いいね数・コメント数のUI表示
5. 自動トークン更新
6. App Reviewプロセス

---

## 8. リスクと対策

### 高リスク
- **R-1: Meta Developer設定の複雑さ**
  - 対策: 詳細手順書、エンジニアサポート

- **R-2: トークン更新忘れ**
  - 対策: カレンダーリマインダー、14日前警告、更新スクリプト

### 中リスク
- **R-3: Graph API仕様変更**
  - 対策: 公式ドキュメント確認、エラーハンドリング

---

## 9. 前提条件

実装開始前に準備すべき事項：

### クライアント側（フェーズ1で実施）
- [ ] Instagram Business/Creator化
- [ ] Facebookページ作成・連携
- [ ] Meta Developer登録
- [ ] Meta App作成（App ID/Secret取得）
- [ ] アクセストークン取得（60日有効）
- [ ] Instagram Business Account ID取得

---

**次のステップ**: 設計フェーズに進む