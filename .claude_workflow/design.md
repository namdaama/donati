# 設計: Issue #217-219 まとめて対応

前段階の `.claude_workflow/requirements.md` を読み込みました。

---

## Issue #217: サイエンス事業ページの文言修正

### アプローチ
- `src/pages/service-fuji.astro` の `serviceDescriptions` 配列内、各サービスの `recommendedScenesData.overviewDescription` を差し替える
- 他の箇所（scenes配列、description等）は変更しない

### 変更箇所（3箇所）

| # | サービス | 行番号目安 |
|---|---------|-----------|
| 1 | サイエンスパフォーマンスショー | L47 |
| 2 | わくわく科学実験室 | L71 |
| 3 | ワークショップ | L95 |

各 `overviewDescription` を Issue #217 の指定文言に差し替えるのみ。

---

## Issue #218: Header固定化（sticky）

### アプローチ
- `<header>` タグのクラスを変更し sticky ヘッダーにする

### 変更内容
**ファイル**: `src/components/common/Header.astro` (L43)

```
変更前: <header class="relative z-10">
変更後: <header class="sticky top-0 z-50 bg-white">
```

### 設計判断
| 項目 | 値 | 理由 |
|------|---|------|
| `sticky top-0` | - | スクロール時に画面上部に固定 |
| `z-50` | 50 | ページコンテンツ（z-10等）の上、モバイルメニュー（z-index:9999）の下 |
| `bg-white` | 白 | コンテンツが透けないようにする。各ページで背景画像や背景色が異なるため、白で統一 |

### 影響範囲
- 全ページで Header を使用しているため全ページに影響
- 波線装飾もヘッダー内のため一緒に固定される
- `body` の `min-h-screen flex flex-col` との相性は問題なし（stickyはフロー内に留まる）

---

## Issue #219: FooterにInstagramリンク追加

### アプローチ
- Font Awesome（`Layout.astro` で読み込み済み）の `fa-brands fa-instagram` を使用
- 左側の会社情報セクション（キャッチコピーの下）にアイコンリンクを配置
- `siteConfig.social.instagram` からURLを取得

### 変更内容
**ファイル**: `src/components/common/Footer.astro`

1. frontmatter で `siteConfig` をインポート
2. 左側セクションのキャッチコピー `<p>` の下にアイコンリンクを追加

```html
<a href={siteConfig.social.instagram}
   target="_blank"
   rel="noopener noreferrer"
   class="inline-block mt-3 text-white/90 hover:text-white transition-colors"
   aria-label="DONATI公式Instagram">
  <i class="fa-brands fa-instagram text-2xl"></i>
</a>
```

### 設計判断
- **配置場所**: 会社情報セクション内（DONATIのブランドSNSとして自然な位置）
- **スタイル**: `text-white/90` → `hover:text-white` でFooterの配色と統一
- **安全性**: `target="_blank"` + `rel="noopener noreferrer"` で外部リンク
- **アクセシビリティ**: `aria-label` で説明追加

---

## 影響ファイル一覧

| ファイル | Issue | 変更内容 |
|---------|-------|---------|
| `src/pages/service-fuji.astro` | #217 | overviewDescription × 3箇所の文言差し替え |
| `src/components/common/Header.astro` | #218 | `<header>` タグのクラス変更（1行） |
| `src/components/common/Footer.astro` | #219 | siteConfigインポート + Instagramアイコン追加 |

## リスク・注意点

- Header固定化により、ページ内アンカーリンク（`#science` 等）でジャンプ時にヘッダー分ずれる可能性 → まず基本実装を行い確認。必要なら `scroll-margin-top` で対応
