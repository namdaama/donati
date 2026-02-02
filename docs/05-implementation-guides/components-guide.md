# Astroコンポーネントガイド

DONATIプロジェクトで使用されている全Astroコンポーネントのリファレンス。

## フォルダ構成

```
src/components/
├── common/          # 共通コンポーネント (13個)
│   ├── Header.astro
│   ├── Footer.astro
│   ├── DonatiLogo.astro
│   ├── Hero.astro
│   ├── Carousel.astro
│   ├── InstagramSection.astro
│   ├── SectionHeading.astro
│   ├── SectionHeadingWithIcon.astro
│   ├── SectionCloudyHeading.astro  ← 移動元: professional-experience/
│   ├── PageIntroduction.astro
│   ├── WavelineDecoration.astro    ← NEW: 波線装飾コンポーネント
│   ├── ResponsiveImage.astro       ← NEW: レスポンシブ画像コンポーネント
│   └── TwoColumnLayout.astro       ← NEW: 2カラムレイアウトコンポーネント
├── overview/        # トップページ専用 (6個)
│   ├── OverViewSection.astro
│   ├── OverViewHero.astro
│   ├── OverViewAboutSection.astro
│   ├── OverViewServiceSection.astro
│   ├── OverViewLinkCard.astro
│   └── FooterDivider.astro
├── services/        # サービスページ専用 (9個)
│   ├── ServiceCategoryHeader.astro
│   ├── ServiceComparisonTable.astro
│   ├── ServiceDetailCard.astro
│   ├── ServiceDescription.astro
│   ├── RequestFlowStep.astro
│   ├── RecommendedScenes.astro
│   ├── SpaceServiceSection.astro      ← service-hide.astro専用（プラネタリウム）
│   ├── SpaceCTASection.astro          ← service-hide.astro専用
│   └── StargazingHeroSection.astro    ← service-hide.astro専用（星空観察会）
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

**総コンポーネント数**: 42個

## コンポーネント統計

### フォルダ別内訳
| フォルダ | コンポーネント数 | 用途 |
|---------|-----------------|------|
| common/ | 13 | 全ページ共通（Header, Footer, DonatiLogo, Hero, Carousel, InstagramSection, SectionHeading, SectionHeadingWithIcon, SectionCloudyHeading, PageIntroduction, WavelineDecoration, ResponsiveImage, TwoColumnLayout） |
| overview/ | 6 | index.astro専用（OverView*, FooterDivider） |
| services/ | 9 | service-fuji.astro/service-hide.astro専用（ServiceCategoryHeader, ServiceComparisonTable, ServiceDetailCard, ServiceDescription, RequestFlowStep, RecommendedScenes, SpaceServiceSection, SpaceCTASection, StargazingHeroSection） |
| professional-experience/ | 3 | professional-experience.astro専用（MajorSection, CategorySection, SectionGrayHeading） |
| cards/ | 3 | 汎用カード（ServiceCard, StaffProfileCard, FAQItem） |
| effects/ | 5 | 視覚効果（CustomCursor*, Aurora*, Stars*） |
| **合計** | **42** | **6フォルダ** |

### ページ別import統計
| ページ | import数 | 主要コンポーネント |
|--------|----------|-------------------|
| index.astro | 7 | Header, Carousel, InstagramSection, SectionHeading, Footer, FooterDivider, OverViewSection |
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
- **行数**: 118行
- **目的**: Instagram投稿の埋め込み表示
- **Props**:
  - `title?: string` - セクションタイトル（デフォルト: "最新の活動"）
  - `instagramUrl?: string` - Instagram投稿URL（デフォルト: "https://www.instagram.com/namdaama/"）
- **設定**: 環境変数`PUBLIC_INSTAGRAM_URL`で管理（`siteConfig.social.instagram`経由）
- **実装方式**: Instagram公式埋め込みAPI使用
- **外部スクリプト**: `//www.instagram.com/embed.js`を非同期ロード
- **スタイル**:
  - 背景: 透過（`bg-transparent`）
  - 説明文: 左揃え（`text-left`）
  - SectionHeading統合: waveLine装飾（waveLineCount=5, titleMarginLeft="ml-4"）
- **使用例** (index.astro):
  ```astro
  <InstagramSection
    title="お知らせ"
    instagramUrl={siteConfig.social.instagram}
  />
  ```

## 中複雑度コンポーネント

### common/
- **Hero.astro**: 7個のProps、Aurora/Stars効果の条件付きレンダリング
- **SectionHeading.astro**: セクション見出し（タイトル + waveLine装飾）、レベル・サイズ・マージン調整可能
- **SectionCloudyHeading.astro**: introductionCloud.svg背景の見出し（h1/h2/h3対応）、もくもく背景+明るい青文字、全ページで使用可能
- **PageIntroduction.astro**: ページ全体イントロ（SectionCloudyHeading + 小見出し + 本文）、柔らかい印象のセクション、全ページで推奨
- **DonatiLogo.astro**: サイズ可変ロゴ（sm/md/lg）
- **WavelineDecoration.astro**: 波線装飾（固定数/レスポンシブ対応）、count/responsive/height/svgPath指定可能
- **ResponsiveImage.astro**: 統一スタイル画像（maxWidth/aspectRatio/rounded/shadow/objectFit指定可能）
- **TwoColumnLayout.astro**: CSS Grid 2カラムレイアウト（768px以下で1カラム化）、左右スロット対応

### overview/
- **OverViewHero.astro**: 複数画像レイアウト、ロゴ配置、SVG波線装飾
- **FooterDivider.astro**: ページ本文末尾の軽量区切り線とコピーライト

### services/
- **ServiceCategoryHeader.astro**: サービスカテゴリヘッダー（3セクション構造、キャラクター付き）
- **ServiceComparisonTable.astro**: 3プラン簡易比較表（レスポンシブテーブル）
- **ServiceDetailCard.astro**: 詳細サービスカード（青テーブル + 写真 + ボタン + QAバナー）
- **ServiceDescription.astro**: 事業解説コンポーネント（セクションヘッダー + 写真 + 説明文 + RecommendedScenes統合）
- **RecommendedScenes.astro**: 「こんな場面にお勧め」コンポーネント（縦並びリスト形式、説明文+箇条書き特徴）

### professional-experience/
- **MajorSection.astro**: 大セクションラッパー（SectionHeadingWithIcon使用、iconPath propでアイコン表示可能）
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

### SectionHeadingWithIcon.astro
**Props**:
- `title: string` - 見出しテキスト（必須）
- `iconPath?: string` - アイコン画像のパス（オプション）
- `level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'` - 見出しレベル（デフォルト: 'h2'）
- `size?: 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl'` - フォントサイズ
- `waveLineCount?: 3 | 5` - waveLine SVGの表示数（デフォルト: 3）
- `titleMarginBottom?: string` - タイトルの下マージン（デフォルト: 'mb-4'）
- `marginBottom?: string` - セクション全体の下マージン（デフォルト: 'mb-12'）
- `titleMarginLeft?: string` - タイトルの左マージン（デフォルト: ''）

**特徴**:
- `SectionHeading.astro`をベースにアイコン表示機能を追加
- アイコンはタイトルの左側に配置（flexboxレイアウト）
- アイコンサイズ: 32px × 32px（h-8 w-8）、タイトルとの間隔は2（mr-2）
- アイコン未指定時は従来のSectionHeadingと同じ表示
- 主に`professional-experience.astro`のMajorSectionで使用

**使用例**:
```astro
<SectionHeadingWithIcon
  title="サイエンス事業"
  iconPath="/images/svg/Parts/icon_Pro_Science.svg"
  waveLineCount={3}
/>
```

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

### ServiceDescription.astro
**ファイル**: src/components/services/ServiceDescription.astro

**Props**:
```typescript
interface Props {
  title: string;
  photoUrl: string;
  mainCatch: string;
  description: string;
  recommendedScenesData: {
    overviewDescription: string;
    scenes: Array<{
      title: string;
      description: string;
    }>;
  };
}
```

**特徴**:
- セクションヘッダー（タイトル + 黄色い波線装飾）
- 2列グリッドレイアウト（写真 | 説明文）
  - 写真: 300px × 200px (aspect-ratio 3:2)、角丸8px
  - メインキャッチ: 明るい青（#65B7EC）、太字、左寄せ、`\n`で改行可能
  - 詳細説明: 青（#58778D）、左寄せ
- RecommendedScenesコンポーネント統合
- レスポンシブ対応（768px未満で1列に切り替え）

**配色**:
- タイトル: #58778D
- メインキャッチ: #65B7EC
- 詳細説明: #58778D

**使用箇所**: service-fuji.astro

**使用例**:
```astro
<ServiceDescription
  title="サイエンスパフォーマンスショー"
  photoUrl="/images/picture/Science/detail_Show01.jpg"
  mainCatch="見て、驚いて、思わず声が出る\n会場がひとつになる、\n体験型サイエンスショー。"
  description="身近な素材が魔法のように姿を変える、ハラハラ・ドキドキのステージ型サイエンスショーです。ただ見るだけではなく、予想したり考えたり、実験の一部に参加することもあります。"
  recommendedScenesData={{
    overviewDescription: "学校行事やPTAイベント・地域イベントなど、幅広い場面で実施しています。",
    scenes: [
      {
        title: "子どもたちに、夜空やほしの特別な体験を",
        description: "学校行事 / PTAイベント / お泊まり保育等どの夜のアクティビティ"
      }
    ]
  }}
/>
```

### SpaceServiceSection.astro
**ファイル**: src/components/services/SpaceServiceSection.astro

**Props**:
```typescript
import type { SpaceServiceDetail } from '../../config/services/space';

interface Props {
  service: SpaceServiceDetail;
}

// SpaceServiceDetail の定義
interface SpaceServiceDetail {
  id: string;
  title: string;              // "星空観望会" or "よしだプラネタリウム"
  subtitle?: string;          // サブタイトル（例: "『月っ...てどんなところ？』"）
  photo: string;              // メイン写真URL
  photoAlt: string;           // 写真のalt属性
  description: string;        // メイン説明文
  recommendedScenes?: {
    title: string;
    items: string[];
  };
  pricing: {
    type: 'table' | 'list';
    title?: string;
    rows?: Array<{
      label: string;
      price: string;
      note?: string;
    }>;
    items?: string[];
  };
}
```

**用途**: service-hide.astro（星空事業ページ）専用

**特徴**:
- 黄色背景（#FFE84C）のセクションタイトル
- 波線装飾（レスポンシブ: モバイル2本、タブレット3本、デスクトップ5本）
- サブタイトル表示（オプション）
- 2カラムグリッド: 写真（左） + 説明テキスト（右）
- 白背景の推奨シーンカード（オプション、例: "こんな場面にオススメ😊"）
- 料金情報エリア:
  - テーブル形式: 青いヘッダー + プラン名・価格・注記
  - リスト形式: 箇条書きリスト
- レスポンシブ対応: モバイルでは1カラムにスタック

**使用例**:
```astro
import SpaceServiceSection from '../components/services/SpaceServiceSection.astro';
import { spaceServiceDetails } from '../config/services/space';

{spaceServiceDetails.map((service) => (
  <SpaceServiceSection service={service} />
))}
```

**データソース**: `src/config/services/space.ts` の `spaceServiceDetails` 配列

### SpaceCTASection.astro
**ファイル**: src/components/services/SpaceCTASection.astro

**Props**:
```typescript
interface Props {
  message: string;
  buttonText?: string;        // デフォルト: "お問い合わせはこちら"
  buttonLink?: string;        // デフォルト: "/contact"
}
```

**用途**: service-hide.astro（星空事業ページ）専用

**特徴**:
- 黄色背景（#FFE84C）、角丸
- 中央配置レイアウト
- メールアイコン（SVG、80×80px / 96×96px レスポンシブ）
- メッセージテキスト（改行対応、`whitespace-pre-line`）
- 青いボタン（#65B7EC、ホバー時: #5AA8DC）
- ボタン: 角丸フル、シャドウ効果、ホバーアニメーション

**使用例**:
```astro
import SpaceCTASection from '../components/services/SpaceCTASection.astro';

<SpaceCTASection
  message="興味・疑問・ご質問などがあったら何でも&#x000A;お気軽にお問合せください！"
  buttonText="お問い合わせはこちら"
  buttonLink="/contact"
/>
```

**デザインノート**:
- メッセージ内の改行は HTML エンティティ `&#x000A;` を使用
- メールアイコンは SVG で直接実装（外部ファイル不要）

### StargazingHeroSection.astro
**ファイル**: src/components/services/StargazingHeroSection.astro

**Props**:
```typescript
interface Props {
  title: string;
  heroSection: {
    photo: string;
    photoAlt: string;
    mainCatch: string;
    description: string;
  };
  illustrationSection?: {
    svgPath: string;
    alt: string;
  };
  modernRecommendedScenes: {
    overviewDescription: string;
    scenes: Array<{
      title: string;
      description: string;
    }>;
  };
  pricing: {
    type: 'table' | 'list';
    title?: string;
    rows?: Array<{ label: string; price: string; note?: string; }>;
    items?: string[];
  };
}
```

**用途**: service-hide.astro（星空事業ページ）専用 - 星空観察会セクション

**特徴**:
- ServiceDescription.astroと類似の2カラムレイアウト
- SectionHeadingコンポーネント使用（タイトル + 波線装飾）
- ヒーローセクション: 写真（左）+ メインテキスト（右）
- SVGイラスト全幅表示機能（starrySkySubPlan.svg）
- RecommendedScenesコンポーネント統合
- 料金セクション（table/list形式対応）
- レスポンシブ対応: デスクトップ2カラム → タブレット/モバイル1カラム

**レスポンシブブレークポイント**:
- デスクトップ（1024px以上）: 2カラム（300px + 1fr）、波線5本
- タブレット（768px）: 1カラム、波線3本
- モバイル（640px以下）: 1カラム、波線2本、フォントサイズ縮小

**使用例**:
```astro
import StargazingHeroSection from '../components/services/StargazingHeroSection.astro';
import { spaceServiceDetails } from '../config/services/space';

{spaceServiceDetails.map((service) => (
  service.layout === 'modern' ? (
    <StargazingHeroSection
      title={service.title}
      heroSection={service.heroSection!}
      illustrationSection={service.illustrationSection}
      modernRecommendedScenes={service.modernRecommendedScenes!}
      pricing={service.pricing}
    />
  ) : (
    <SpaceServiceSection service={service} />
  )
))}
```

**データソース**: `src/config/services/space.ts` の `spaceServiceDetails[0]`（layout: 'modern'）

**依存関係**:
- SectionHeading.astro（common/）
- RecommendedScenes.astro（services/）

**配色**:
- タイトル: `#58778D`
- メインキャッチ: `#65B7EC`
- 説明テキスト: `#58778D`
- 波線背景: `#FFE84C`（SectionHeading自動適用）
- 料金ヘッダー: `#65B7EC`

### WavelineDecoration.astro
**Props**:
- `count?: number` - 波線の表示数（デフォルト: 5）
- `responsive?: boolean` - レスポンシブモード（デフォルト: false）
- `height?: string` - 高さクラス（デフォルト: 'h-4'）
- `svgPath?: string` - SVGファイルパス（デフォルト: '/images/svg/decorations/waveline/waveLine.svg'）
- `className?: string` - 追加CSSクラス

**レスポンシブモード**: `responsive=true`でモバイル2本、タブレット3本、デスクトップ5本に自動調整

**使用例**:
```astro
<WavelineDecoration count={5} />
<WavelineDecoration responsive={true} className="mt-4" />
```

### ResponsiveImage.astro
**Props**:
- `src: string` - 画像URL（必須）
- `alt: string` - 代替テキスト（必須）
- `maxWidth?: string` - 最大幅クラス（デフォルト: 'max-w-md'）
- `aspectRatio?: string` - アスペクト比（例: '3/2', '16/9'）
- `rounded?: string` - 角丸クラス（デフォルト: 'rounded-lg'）
- `shadow?: string` - 影クラス
- `objectFit?: string` - object-fitクラス（デフォルト: 'object-cover'）
- `className?: string` - 追加CSSクラス

**使用例**:
```astro
<ResponsiveImage src="/images/photo.jpg" alt="説明" />
<ResponsiveImage src="/images/photo.jpg" alt="説明" aspectRatio="3/2" shadow="shadow-lg" />
```

### TwoColumnLayout.astro
**Props**:
- `leftWidth?: string` - 左カラム幅（デフォルト: '300px'）
- `gap?: string` - ギャップ（デフォルト: '2rem'）
- `mobileGap?: string` - モバイルギャップ（デフォルト: '1.5rem'）
- `mobileBreakpoint?: string` - ブレークポイント（デフォルト: '768px'）
- `alignItems?: 'start' | 'center' | 'end' | 'stretch'` - 垂直配置（デフォルト: 'start'）
- `className?: string` - 追加CSSクラス

**スロット**: `<slot name="left" />`, `<slot name="right" />`

**使用例**:
```astro
<TwoColumnLayout leftWidth="300px" gap="2rem">
  <img slot="left" src="/images/photo.jpg" alt="写真" />
  <div slot="right">
    <p>説明テキスト</p>
  </div>
</TwoColumnLayout>
```

## 更新履歴

- **2026年2月1日**: Phase A 原子コンポーネント追加（Issue #208）
  - WavelineDecoration.astro: 波線装飾コンポーネント（固定数/レスポンシブ対応）
  - ResponsiveImage.astro: 統一スタイル画像コンポーネント
  - TwoColumnLayout.astro: CSS Grid 2カラムレイアウトコンポーネント
  - 総コンポーネント数：39個 → 42個

- **2026年1月31日**: StargazingHeroSection.astro追加（Issue #122 - 星空観察会セクション新デザイン）
  - 星空観察会セクション専用コンポーネント実装
  - 2カラムヒーローレイアウト（写真 + メインテキスト）
  - SVGイラスト全幅表示機能（starrySkySubPlan.svg）
  - SectionHeading、RecommendedScenes統合
  - データ駆動型アプローチ（space.ts の SpaceServiceDetail 型拡張、layout フラグ追加）
  - 総コンポーネント数：38個 → 39個

- **2026年1月31日**: SpaceServiceSection.astro / SpaceCTASection.astro追加（service-hide.astro リニューアル）
  - 星空事業ページ専用コンポーネント実装
  - OurService-hide.jpg デザインをHTML化
  - データ駆動型アプローチ（space.ts に SpaceServiceDetail 型追加）
  - 総コンポーネント数：36個 → 38個

- **2026年1月12日**: 未使用コンポーネント削除（Issue #160）
  - services.astro削除（service-fuji.astro/service-hide.astroに分割済みのため不要）
  - ServiceCategoryCard.astro削除（未使用）
  - ServicesSection.astro削除（services.astroでのみ使用）
  - ServicesFujiSection.astro削除（ServicesSectionでのみ使用）
  - ServicesHideSection.astro削除（ServicesSectionでのみ使用）
  - 総コンポーネント数：39個 → 35個

- **2026年1月12日**: ServiceDescription.astro追加（Issue #160, Phase2）
  - 「事業解説」コンポーネント実装
  - セクションヘッダー（タイトル + 波線装飾）
  - 2列グリッドレイアウト（写真 | 説明文）
  - RecommendedScenesコンポーネント統合
  - service-fuji.astroに統合
  - 総コンポーネント数：38個 → 39個

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
