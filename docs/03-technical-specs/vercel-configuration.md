# Vercel設定・運用ガイド

**作成日**: 2025-08-30  
**関連Issue**: [#15 Vercel関連ドキュメントの整備・更新](https://github.com/namdaama/donati/issues/15)

## 概要

DONATIウェブサイトのVercelホスティング設定と運用方法について詳細に説明します。

## プロジェクト基本情報

### ホスティング概要
- **プラットフォーム**: Vercel
- **プロジェクト名**: donati-website
- **リポジトリ**: namdaama/donati
- **フレームワーク**: Astro (静的サイト生成)
- **ビルドコマンド**: `npm run build`
- **出力ディレクトリ**: `dist/`

## URL構成

### プレビュー環境
- **プレビューURL**: `https://donati-git-master-namdaamas-projects.vercel.app/`
- **アクセス制御**: Vercel Authentication有効
- **デプロイトリガー**: `master`ブランチへのプッシュ

### 本番環境
- **本番URL**: 要確認（カスタムドメイン設定状況）
- **デプロイトリガー**: 要確認

## Vercel Authentication設定

### 現在の設定状況
- **Deploy Protection**: 有効
- **Vercel Authentication**: ON
- **適用範囲**: プレビュー環境（production以外の全デプロイメント）
- **認証方式**: Vercelアカウント認証

### アクセス権限
- **必要条件**: Vercelアカウントでログイン + プロジェクトメンバーシップ
- **権限レベル**: Guest, Member, Owner
- **メンバー管理**: プロジェクトオーナー（namdaama）

### アクセス手順
1. https://vercel.com にアクセス
2. Vercelアカウントでログイン
3. プロジェクト「donati-website」のメンバーであることを確認
4. プレビューURLにアクセス

## 環境変数設定

### Vercelダッシュボードでの設定
**設定場所**: Project Settings → Environment Variables

#### 秘密情報（非公開）
```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

#### 公開情報（PUBLIC_プレフィックス）
```env
PUBLIC_INSTAGRAM_URL=https://www.instagram.com/donati_science/
PUBLIC_WEB3FORMS_ACCESS_KEY=dfa9ec58-78f2-4ab5-94b5-a109ddb6a5dd
PUBLIC_TWITTER_URL=
PUBLIC_FACEBOOK_URL=
```

### ローカル開発との同期
1. `.env.example`を`.env`にコピー
2. Vercelダッシュボードの値を`.env`に設定
3. 秘密情報は`.gitignore`で除外済み

## API連携設定

### Protection Bypass for Automation
API連携でVercel Authenticationを迂回する場合：

1. **Vercelダッシュボード設定**:
   - Project Settings → Security
   - "Protection Bypass for Automation"を有効化
   - `VERCEL_AUTOMATION_BYPASS_SECRET`を生成

2. **APIリクエスト設定**:
   ```javascript
   // ヘッダー方式
   headers: {
     'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET
   }
   
   // クエリパラメータ方式
   const url = `${apiUrl}?x-vercel-protection-bypass=${process.env.VERCEL_AUTOMATION_BYPASS_SECRET}`
   ```

3. **CORS対応**:
   - "OPTIONS Allowlist"を有効化
   - 特定エンドポイントへのOPTIONSリクエストを許可

## デプロイメント設定

### 自動デプロイ
- **トリガー**: Git push to `master` branch
- **ビルドコマンド**: `npm run build`（astro check + astro build）
- **インストールコマンド**: `npm install`
- **Node.js バージョン**: 18.x（Astro推奨）

### デプロイフロー
1. **開発**: `npm run dev` でローカル開発
2. **型チェック**: `npm run astro check` で事前確認
3. **プレビュー**: 機能ブランチpushでプレビューURL生成
4. **リリース**: `master`ブランチにマージで自動デプロイ

### ビルド設定詳細
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

## トラブルシューティング

### よくある問題と解決方法

#### プレビュー環境にアクセスできない
**症状**: 認証画面でアクセス拒否
**原因**: プロジェクトメンバーシップがない
**解決**: プロジェクトオーナーにメンバー追加を依頼

#### 環境変数が反映されない
**症状**: microCMSデータが取得できない
**原因**: Vercel環境変数設定漏れ
**解決**: 
1. Vercelダッシュボードで環境変数確認
2. Redeploy実行で設定反映

#### ビルドエラー
**症状**: デプロイ時にビルド失敗
**原因**: TypeScript型エラーまたは依存関係問題
**解決**:
1. `npm run astro check` でローカル確認
2. `npm run build` でローカルビルド確認
3. Vercel Build Logsで詳細エラー確認

#### API連携でCORSエラー
**症状**: クライアントサイドAPIでCORS拒否
**原因**: Vercel AuthenticationによるOPTIONSリクエストブロック
**解決**: "OPTIONS Allowlist"設定追加

## セキュリティ設定

### 現在の保護設定
- **Deployment Protection**: Standard Protection
- **Vercel Authentication**: 有効（プレビュー環境）
- **Password Protection**: 未設定（Enterprise/Pro機能）
- **Trusted IPs**: 未設定（Enterprise機能）

### 推奨セキュリティ設定
1. **機密情報の環境変数化**: APIキー等は環境変数で管理
2. **HTTPS強制**: Vercelデフォルトで有効
3. **Vercel Authentication**: 開発・プレビュー環境で有効維持

## モニタリング・アナリティクス

### Vercel Analytics（オプション）
- **現在の状態**: 要確認
- **利用可能プラン**: Pro以上
- **設定場所**: Project Settings → Analytics

### パフォーマンスモニタリング
- **Core Web Vitals**: Vercelダッシュボードで確認可能
- **ビルド時間**: Functions タブで確認
- **帯域幅使用量**: Usage タブで月次確認

## 運用チェックリスト

### 新メンバー追加時
- [ ] Vercelプロジェクトメンバーに追加
- [ ] アクセス権限レベル設定（Guest/Member/Owner）
- [ ] プレビューURL共有とアクセス方法説明

### デプロイ前チェック
- [ ] `npm run astro check` で型チェック通過
- [ ] `npm run build` でローカルビルド成功
- [ ] 環境変数設定確認（本番用）
- [ ] 機能ブランチでプレビュー動作確認

### 定期メンテナンス
- [ ] 月次帯域幅使用量確認
- [ ] ビルド時間パフォーマンス確認
- [ ] 環境変数の有効期限確認（APIキー等）
- [ ] 不要なメンバーのアクセス権限見直し

## 将来の拡張計画

### カスタムドメイン設定
- 独自ドメイン取得時の設定手順
- DNS設定とSSL証明書の自動設定

### 本番環境の分離
- プレビュー環境と本番環境の明確な分離
- 本番専用のデプロイフロー確立

### 高度な認証機能
- Password Protection導入検討（Pro/Enterprise）
- Trusted IPs設定検討（Enterprise）