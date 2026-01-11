# Astroコンポーネントガイド

DONATIプロジェクトで使用されている全Astroコンポーネントのリファレンス。

## フォルダ構成

```
src/components/
├── common/          # 共通コンポーネント (9個)
│   ├── Header.astro
│   ├── Footer.astro
│   ├── DonatiLogo.astro
│   ├── Hero.astro
│   ├── Carousel.astro
│   ├── InstagramSection.astro
│   ├── SectionHeading.astro
│   ├── SectionCloudyHeading.astro  ← 移動元: professional-experience/
│   └── PageIntroduction.astro
├── overview/        # トップページ専用 (6個)
│   ├── OverViewSection.astro
│   ├── OverViewHero.astro
│   ├── OverViewAboutSection.astro
│   ├── OverViewServiceSection.astro
│   ├── OverViewLinkCard.astro
│   └── FooterDivider.astro
├── services/        # サービスページ専用 (9個)
│   ├── ServicesSection.astro
│   ├── ServicesFujiSection.astro
│   ├── ServicesHideSection.astro
│   ├── ServiceCategoryHeader.astro
│   ├── ServiceComparisonTable.astro
│   ├── ServiceCategoryCard.astro
│   ├── ServiceDetailCard.astro
│   ├── RequestFlowStep.astro
│   └── RecommendedScenes.astro
├── professional-experience/  # 活動経歴ページ専用 (3個)
│   ├── MajorSection.astro
│   ├── CategorySection.astro
│   └── SectionGrayHeading.astro
├── cards/           # 再利用可能カード (3個)
│   ├── ServiceCard.astro
│   ├── StaffProfileCard.astro
│   └── FAQItem.astro
└── effects/         # 視覚効果 (5個)
    ├── CustomCursor.astro
    ├── CustomCursor-StarTheme.astro
    ├── AuroraBackground.astro
    ├── Stars.astro
    └── StarrySection.astro
```

**総コンポーネント数**: 38個

## コンポーネント統計

### フォルダ別内訳
| フォルダ | コンポーネント数 | 用途 |
|---------|-----------------|------|
| common/ | 9 | 全ページ共通（Header, Footer, DonatiLogo, Hero, Carousel, InstagramSection, SectionHeading, SectionCloudyHeading, PageIntroduction） |
| overview/ | 6 | index.astro専用（OverView*, FooterDivider） |
| services/ | 9 | services.astro/service-fuji.astro/service-hide.astro専用（Services*, ServiceCategory*, ServiceComparisonTable, ServiceDetailCard, RequestFlowStep, RecommendedScenes） |
| professional-experience/ | 3 | professional-experience.astro専用（MajorSection, CategorySection, SectionGrayHeading） |
| cards/ | 3 | 汎用カード（ServiceCard, StaffProfileCard, FAQItem） |
| effects/ | 5 | 視覚効果（CustomCursor*, Aurora*, Stars*） |
| **合計** | **38** | **6フォルダ** |

### ページ別import統計
| ページ | import数 | 主要コンポーネント |
|--------|----------|-------------------|
| index.astro | 5 | Header, Carousel, Footer, FooterDivider, OverViewSection |
| services.astro | 7 | Header, Footer, FooterDivider, ServiceCategoryHeader, ServiceCard, RequestFlowStep, ServicesSection |
| contact.astro | 3 | Header, Footer, Hero |
| professional-experience.astro | 5 | Header, Footer, PageIntroduction, MajorSection, CategorySection |
| about.astro | 6 | Header, Footer, DonatiLogo, StaffProfileCard, PageIntroduction, FooterDivider |
| Layout.astro | 1 | CustomCursorStarTheme |

## 高複雑度コンポーネント（実装時要注意）

### Carousel.astro
- **ファイル**: src/components/common/Carousel.astro
- **行数**: 295行
- **目的**: 自動スライドショー機能
- **Props**: `slides: Array<{image, alt, title, description, link?}>`
- **主要機能**:
  - 自動スライド（4秒間隔、ホバーで一時停止）
  - キーボード操作（矢印キー、Tabキー）
  - ドットナビゲーション
  - アクセシビリティ対応（ARIA属性）
- **技術実装**:
  - TypeScriptクラスベース（CarouselManagerクラス）
  - 複数のイベントリスナー管理
  - setInterval/clearIntervalによる自動再生制御
- **データ管理**: `src/config/site.ts`の`carouselData`

### Header.astro
- **ファイル**: src/components/common/Header.astro
- **行数**: 277行
- **目的**: 全ページ共通ナビゲーション
- **実装方式**: アイコンベースナビゲーション + ハンバーガーメニュー
- **レスポンシブ対応**:
  - デスクトップ（lg:以上）: 水平ナビゲーション
  - モバイル: ハンバーガーメニュー + ドロワー
- **主要機能**:
  - モバイルドロワーのトグル（JavaScript）
  - ESCキーでドロワー閉じる
  - ロゴクリックでトップページ遷移
- **スタイル**: 半透明白背景（`bg-white/10 backdrop-blur-sm`）

### InstagramSection.astro
- **ファイル**: src/components/common/InstagramSection.astro
- **行数**: 111行
- **目的**: Instagram投稿の埋め込み表示
- **設定**: 環境変数`PUBLIC_INSTAGRAM_URL`で管理
- **実装方式**: Instagram公式埋め込みAPI使用
- **外部スクリプト**: `//www.instagram.com/embed.js`を非同期ロード

## 中複雑度コンポーネント

### common/
- **Hero.astro**: 7個のProps、Aurora/Stars効果の条件付きレンダリング
- **SectionHeading.astro**: セクション見出し（タイトル + waveLine装飾）、レベル・サイズ・マージン調整可能
- **SectionCloudyHeading.astro**: introductionCloud.svg背景の見出し（h1/h2/h3対応）、もくもく背景+明るい青文字、全ページで使用可能
- **PageIntroduction.astro**: ページ全体イントロ（SectionCloudyHeading + 小見出し + 本文）、柔らかい印象のセクション、全ページで推奨
- **DonatiLogo.astro**: サイズ可変ロゴ（sm/md/lg）

### overview/
- **OverViewHero.astro**: 複数画像レイアウト、ロゴ配置、SVG波線装飾
- **FooterDivider.astro**: ページ本文末尾の軽量区切り線とコピーライト

### services/
- **ServiceCategoryHeader.astro**: サービスカテゴリヘッダー（3セクション構造、キャラクター付き）
- **ServiceComparisonTable.astro**: 3プラン簡易比較表（レスポンシブテーブル）
- **ServiceDetailCard.astro**: 詳細サービスカード（青テーブル + 写真 + ボタン + QAバナー）
- **RecommendedScenes.astro**: 「こんな場面にお勧め」コンポーネント（縦並びリスト形式、説明文+箇条書き特徴）

### professional-experience/
- **MajorSection.astro**: 大セクションラッパー（SectionHeading使用）
- **CategorySection.astro**: カテゴリー見出し（SectionGrayHeading）+ 3階層データ表示
- **SectionGrayHeading.astro**: sectionGrayRound.svg背景の見出し（h1/h2/h3対応）、紺青背景+白文字

### effects/
- **AuroraBackground.astro**: オーロラエフェクト（SVG + CSS @keyframes 60秒）
- **Stars.astro**: ランダム星生成（量・サイズ調整可、瞬きアニメーション）
- **StarrySection.astro**: 星背景セクション（Stars.astro埋め込み）
- **CustomCursor-StarTheme.astro**: 星型カーソル（軌跡エフェクト、requestAnimationFrame）

## 低複雑度コンポーネント

### cards/
- **ServiceCard.astro**: サービス説明カード（icon, title, description）
- **StaffProfileCard.astro**: スタッフプロフィールカード（写真、実績リスト、SNSリンク対応）
- **FAQItem.astro**: FAQ質問回答アコーディオン（HTML5 details/summary）

### その他
- **Footer.astro**: ページフッター（リンク、会社情報）
- **RequestFlowStep.astro**: 依頼フローステップ表示

## 主要コンポーネント詳細

### SectionHeading.astro
**Props**:
- `title: string` - 見出しテキスト（必須）
- `level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'` - 見出しレベル（デフォルト: 'h2'）
- `size?: 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl'` - フォントサイズ
- `waveLineCount?: 3 | 5` - waveLine SVGの表示数（デフォルト: 3）
- `titleMarginBottom?: string` - タイトルの下マージン（デフォルト: 'mb-4'）
- `marginBottom?: string` - セクション全体の下マージン（デフォルト: 'mb-12'）
- `titleMarginLeft?: string` - タイトルの左マージン（デフォルト: ''）

**スタイル**: タイトルは`text-[#58778D]`、`font-bold`

### PageIntroduction.astro
**Props**: `title`, `description?`, `content?`

**構成**: SectionCloudyHeading + オプション小見出し/本文

### SectionGrayHeading.astro
**Props**: `title`, `level?` (h1/h2/h3)

**特徴**: sectionGrayRound.svg背景、45px高さ、白文字

### SectionCloudyHeading.astro
**Props**: `title`, `level?` (h1/h2/h3)

**特徴**: introductionCloud.svg背景、135px高さ、明るい青文字（#65B7EC）

### StaffProfileCard.astro
**Props**:
```typescript
interface SocialLink {
  type: 'instagram' | 'youtube' | 'website' | 'community';
  url: string;
  label: string;
}

interface Props {
  name: string;
  realName?: string;
  nameSvg: string;
  pictSvg: string;
  overview: string;
  achievements: string[];
  publications?: string[];
  showButtons?: boolean;
  professionalExperienceLink?: string;
  servicesLink?: string;
  socialLinks?: SocialLink[];
}
```

**レイアウト**:
1. キャラクターイラスト + 名前SVG
2. 実名表示（オプション、明るい青 #65B7EC）
3. プロフィール説明文
4. 実績リスト（黄色ドット）
5. 出版物リスト（オプション）
6. アクションボタン×2（オプション）
7. SNSリンク（オプション、JPG画像、48px/60px）

## コンポーネント更新ルール

コンポーネントの追加・変更時は本ファイルを同期更新:

- **新規コンポーネント**: 適切なフォルダに配置、本ファイルに追加
- **既存コンポーネント変更**: 説明内容を更新
- **Props変更**: 該当コンポーネントのProps定義を更新
- **フォルダ移動**: 全てのimport文を更新（ページ + コンポーネント間）

### フォルダ配置ガイドライン
- **common/**: 複数ページで使用、または基本インフラ
- **overview/**: index.astroページ専用
- **services/**: services/service-fuji/service-hideページ専用
- **professional-experience/**: professional-experience.astroページ専用
- **cards/**: 汎用カード（ページ非依存）
- **effects/**: 視覚効果、カーソルカスタマイズ

## コンポーネント詳細

### RecommendedScenes.astro
**ファイル**: src/components/services/RecommendedScenes.astro

**Props**:
```typescript
interface SceneItem {
  title: string;
  description: string;
}

interface Props {
  title?: string;
  overviewDescription: string;
  examplesSectionTitle?: string;
  scenes: SceneItem[];
  showPullDownIcon?: boolean;
}
```

**特徴**:
- タイトル行に黄色い丸に下矢印のアイコン（icon_PullDown.svg）
- 全体説明文セクション
- 「具体的な実施例」青い背景ラベル
- 箇条書きに黄色い星マーク（icon_dotStar.svg）
- サービスページ統一カラー（#58778D）
- レスポンシブ対応（モバイル/タブレット/デスクトップ）

**使用箇所**: service-fuji.astro

**使用例**:
```astro
<RecommendedScenes
  overviewDescription="学校事業や行政、地域イベントなど、幅広い場面で実施しています。\n校だからこそ楽しめる、特別なプログラムとしておすすめです。"
  scenes={[
    {
      title: "子どもたちに、夜空やほしの特別な体験を",
      description: "学校行事 / PTAイベント / お泊まり保育等どの夜のアクティビティ"
    },
    {
      title: "集客やにぎわいを生む、等のイベントとして",
      description: "展覧会等でのイベント / 前泊時間の特別プログラム / 地域のお祭りなど"
    }
  ]}
/>
```

## 更新履歴

- **2026年1月12日**: RecommendedScenes.astro追加および再設計（Issue #159, Phase1）
  - 「こんな場面にお勧め」コンポーネント実装
  - 黄色い丸に下矢印アイコン（icon_PullDown.svg）追加
  - 黄色い星マーク（icon_dotStar.svg）による箇条書き
  - 「具体的な実施例」青い背景ラベル
  - service-fuji.astroに統合
  - 総コンポーネント数：37個 → 38個

- **2026年1月11日**: SNSアイコンをJPG画像に変更、aboutページ調整（Issue #153）
  - StaffProfileCard: Font Awesome → JPG画像に変更、アイコンサイズ1.5倍（48px/60px）
  - StaffProfileCard: 実名色を明るい青（#65B7EC）に変更
  - about.astro: 締めメッセージを中央揃えに変更
  - 不要なSVGアイコンファイル削除（Instagram, YouTube, Website, Community）

- **2026年1月10日**: professional-experienceページ再設計（Issue #121）

- **2025年1月4日**: aboutページ再設計（Issue #118）
  - StaffProfileCard拡張、about.astro 3セクション構成化

- **2025年1月3日**: ServiceComparisonTable.astro追加（Issue #111）
  - 3プラン簡易比較表実装、総コンポーネント数：31個 → 32個

- **2025年1月2日**: ServiceDetailCard.astro追加（Issue #111）
  - 詳細サービスカード実装、総コンポーネント数：30個 → 31個
