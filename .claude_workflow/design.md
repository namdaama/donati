# 設計: Footer文言修正とリンク再設定 (Issue #133)

## 前段階の確認
`.claude_workflow/requirements.md`を読み込みました。

## 現状分析

### 現在のFooter.astro構成
- **3カラムレイアウト** (`grid grid-cols-1 md:grid-cols-3 gap-8`)
- **背景色**: `rgb(102, 182, 236)` (水色)
- **テキスト色**: `text-white` および `text-white/90`

**左側カラム**: 会社情報
- `<h3>` サイエンス＆スペース ラボ
- `<h3>` DONATI
- `<p>` 科学の楽しさを伝え、世界をワクワクでいっぱいにする

**中央カラム**: メニュー（Quick Links）
- 6つのリンク項目（現状は一部重複したリンク先）

**右側カラム**: お問合せ
- 見出しのみでリンクなし
- 説明文のみ

**最下部**: コピーライト
- ボーダー付きセクション
- 中央揃え

## 実装アプローチ

### 対応方針
1. **左側**: 変更なし（現状維持）
2. **中央**: メニュー項目の文言とリンク先を更新
3. **右側**: 説明文を更新し、お問合せページへのリンクを追加
4. **最下部**: コピーライト文言を更新

### 技術的アプローチ

#### 1. 左側カラム（変更なし）
現状のまま維持：
```html
<div>
  <h3 class="text-white/90 mb-2">サイエンス＆スペースラボ</h3>
  <h3 class="text-2xl font-bold mb-4 text-white">DONATI</h3>
  <p class="text-white/90">
    科学の楽しさを伝え、<br />
    世界をワクワクでいっぱいにする
  </p>
</div>
```

**注意**: 現状は「サイエンス＆スペース ラボ」（スペース入り）だが、要件では「サイエンス＆スペースラボ」（スペースなし）。要件に合わせてスペースを削除する。

#### 2. 中央カラム（メニュー更新）

**新しいメニュー構成**:
```html
<div>
  <h3 class="text-lg font-semibold mb-4 text-white">メニュー</h3>
  <ul class="space-y-2">
    <li><a href="/service-fuji" class="text-white/90 hover:text-white transition-colors">・サイエンス事業</a></li>
    <li><a href="/service-hide" class="text-white/90 hover:text-white transition-colors">・星空事業</a></li>
    <li><a href="/professional-experience" class="text-white/90 hover:text-white transition-colors">・実績</a></li>
    <li><a href="/faq" class="text-white/90 hover:text-white transition-colors">・料金・FAQ</a></li>
    <li><a href="/about" class="text-white/90 hover:text-white transition-colors">・私たちについて</a></li>
    <li><a href="/news" class="text-white/90 hover:text-white transition-colors">・お知らせ</a></li>
  </ul>
</div>
```

**変更点**:
| 変更前 | リンク先 | 変更後 | 新リンク先 |
|--------|---------|--------|-----------|
| ・DONATIとは？ | /about | ・サイエンス事業 | /service-fuji |
| ・私たちについて | /about | ・星空事業 | /service-hide |
| ・お知らせ（イベント案内など）| /news | ・実績 | /professional-experience |
| ・サービス内容について | /services | ・料金・FAQ | /faq |
| ・依頼の流れ | /services | ・私たちについて | /about |
| ・活動経歴 | /professional-experience | ・お知らせ | /news |

**注意**: /newsページの存在確認が必要（要件には含まれているが、pagesフォルダには存在しなかった）

#### 3. 右側カラム（お問合せセクション）

**新しい構成**:
```html
<div>
  <h3 class="text-lg font-semibold mb-4 text-white">
    <a href="/contact" class="hover:text-white/80 transition-colors">お問合せ</a>
  </h3>
  <p class="text-white/90">
    実施内容・時間・ご予算について、<br />
    ご希望に合わせてご相談を承ります。<br />
    まずはお気軽にご連絡ください。
  </p>
</div>
```

**変更点**:
- 見出し「お問合せ」をリンク化（/contactへ）
- 説明文を更新（柔らかい表現を維持）

#### 4. 最下部（コピーライト）

**新しいコピーライト**:
```html
<div class="border-t border-white/20 py-6 mt-6">
  <div class="container-custom text-center">
    <p class="text-sm text-white/90">
      © 2026 サイエンス＆スペースラボ DONATI<br class="md:hidden" />
      <span class="hidden md:inline"> </span>(Science & Space Lab DONATI) All rights reserved.
    </p>
  </div>
</div>
```

**変更点**:
- 「© サイエンス&スペース ラボ DONATI」
- → 「© 2026 サイエンス＆スペースラボ DONATI (Science & Space Lab DONATI) All rights reserved.」
- レスポンシブ対応: モバイルでは改行、デスクトップでは1行表示

**文字使い分け**:
- 「サイエンス＆スペースラボ」→ 全角「＆」、スペースなし
- 「(Science & Space Lab DONATI)」→ 半角「&」、スペースあり

## 期待される結果

### デスクトップ表示
- 3カラムレイアウトが維持される
- 各メニューリンクが新しい文言で表示される
- お問合せ見出しがクリック可能になる
- コピーライトが1行で表示される

### モバイル表示
- 1カラムレイアウト（縦積み）
- コピーライトが2行で表示される（改行）

## リスクと対策

### リスク1: /newsページの不存在
- **問題**: pagesフォルダに/news.astroが存在しない可能性
- **対策**: 実装前に確認、存在しなければユーザーに確認

### リスク2: 表記の統一
- **問題**: 「サイエンス＆スペース ラボ」vs「サイエンス＆スペースラボ」のスペース有無
- **対策**: 要件に従い「サイエンス＆スペースラボ」（スペースなし）に統一

### リスク3: 文字の「＆」と「&」の使い分け
- **問題**: 全角と半角の混在
- **対策**: 日本語表記は全角「＆」、英語表記は半角「&」で統一

## 検証項目

1. 左側カラムが「サイエンス＆スペースラボ」になっているか（スペースなし）
2. 中央カラムの6つのメニュー項目が新しい文言で表示されるか
3. 各メニューリンクが正しいページに遷移するか
   - サイエンス事業 → /service-fuji
   - 星空事業 → /service-hide
   - 実績 → /professional-experience
   - 料金・FAQ → /faq
   - 私たちについて → /about
   - お知らせ → /news（ページ存在確認要）
4. お問合せ見出しがリンク化され、/contactに遷移するか
5. お問合せの説明文が新しい文言になっているか
6. コピーライトが「© 2026 サイエンス＆スペースラボ DONATI (Science & Space Lab DONATI) All rights reserved.」になっているか
7. レスポンシブ対応が維持されているか（3カラム→1カラム）
8. 既存のスタイル（背景色、テキスト色、ホバー効果）が維持されているか
