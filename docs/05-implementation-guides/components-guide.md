# Astroコンポーネントガイド

DONATIプロジェクトで使用されている全Astroコンポーネントの詳細リファレンス。

## フォルダ構成 (Issue #57で再編成)

```
src/components/
├── common/          # 共通コンポーネント (6個)
│   ├── Header.astro
│   ├── Footer.astro
│   ├── DonatiLogo.astro
│   ├── Hero.astro
│   ├── Carousel.astro
│   └── InstagramSection.astro
├── overview/        # トップページ専用 (6個)
│   ├── OverViewSection.astro
│   ├── OverViewHero.astro
│   ├── OverViewAboutSection.astro
│   ├── OverViewServiceSection.astro
│   ├── OverViewLinkCard.astro
│   └── FooterDivider.astro
├── services/        # サービスページ専用 (7個)
│   ├── ServicesSection.astro
│   ├── ServicesFujiSection.astro
│   ├── ServicesHideSection.astro
│   ├── ServiceCategoryHeader.astro
│   ├── ServiceCategoryCard.astro
│   ├── ServiceDetailCard.astro
│   └── RequestFlowStep.astro
├── professional-experience/  # 活動経歴ページ専用 (5個)
│   ├── ProfessionalExperienceSection.astro
│   ├── ProfessionalExperienceFujiCard.astro
│   ├── ProfessionalExperienceHideCard.astro
│   ├── ProfessionalExperienceServicesCard.astro
│   └── MediaCoverageSection.astro
├── cards/           # 再利用可能カード (2個)
│   ├── ServiceCard.astro
│   └── StaffProfileCard.astro
└── effects/         # 視覚効果 (5個)
    ├── CustomCursor.astro
    ├── CustomCursor-StarTheme.astro
    ├── AuroraBackground.astro
    ├── Stars.astro
    └── StarrySection.astro
```

**総コンポーネント数**: 31個（削除前: 33個）

**削除されたコンポーネント**:
- AchievementCard.astro - achievements.astroのみで使用
- NewsCard.astro - news/index.astroのみで使用
- StaffCard.astro - about/staff.astroのみで使用
- AboutUsButton.astro - StaffCard内のみで使用

## コンポーネント一覧（複雑度別）

### 高複雑度コンポーネント（実装時要注意）

#### Carousel.astro
- **ファイル**: [src/components/Carousel.astro](src/components/Carousel.astro)
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
  - 複数のイベントリスナー管理（click, keydown, mouseenter, mouseleave）
  - setInterval/clearIntervalによる自動再生制御
- **データ管理**: `src/config/site.ts`の`carouselData`
- **修正時の注意**:
  - イベントリスナーのクリーンアップ処理確認
  - インターバルタイマーのメモリリーク対策
  - アクセシビリティ属性（role, aria-label等）の維持

#### Header.astro
- **ファイル**: [src/components/Header.astro](src/components/Header.astro)
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
- **使用場所**: 全ページで`<Header />`として共通使用

#### CustomCursor.astro
- **ファイル**: [src/components/CustomCursor.astro](src/components/CustomCursor.astro)
- **行数**: 211行
- **目的**: カスタムマウスカーソル（実験的実装）
- **実装方式**: クラスベース設計
- **主要機能**:
  - カーソル追従アニメーション
  - 複数ホバーエフェクト（ボタン、リンク、カード等）
  - requestAnimationFrame使用
- **注意**: 本番統合検討中（CustomCursor-StarTheme.astroも存在）

#### InstagramSection.astro
- **ファイル**: [src/components/InstagramSection.astro](src/components/InstagramSection.astro)
- **行数**: 111行
- **目的**: Instagram投稿の埋め込み表示
- **設定**: 環境変数`PUBLIC_INSTAGRAM_URL`で管理
- **実装方式**: Instagram公式埋め込みAPI使用
- **外部スクリプト**: `//www.instagram.com/embed.js`を非同期ロード
- **表示場所**: トップページの「最新の活動」セクション
- **レスポンシブ**: `max-w-4xl`で最大幅制限

### 中複雑度コンポーネント

#### Hero.astro
- **ファイル**: [src/components/Hero.astro](src/components/Hero.astro)
- **行数**: 66行
- **Props**: 7個（title, subtitle, ctaText, ctaLink, backgroundImage, useAurora, showStars）
- **特徴**: Aurora/Stars効果の条件付きレンダリング
- **用途**: ページのヒーロー/フィーチャーセクション

#### OverViewHero.astro
- **ファイル**: [src/components/OverViewHero.astro](src/components/OverViewHero.astro)
- **行数**: 62行
- **目的**: About用ヒーロー
- **特徴**: 複数画像レイアウト、ロゴ配置、SVG波線装飾

#### AuroraBackground.astro
- **ファイル**: [src/components/AuroraBackground.astro](src/components/AuroraBackground.astro)
- **行数**: 65行
- **目的**: オーロラエフェクト背景
- **技術**: SVG + CSS @keyframesアニメーション（60秒）
- **用途**: Hero等で条件付きで使用

#### Stars.astro
- **ファイル**: [src/components/Stars.astro](src/components/Stars.astro)
- **行数**: 103行
- **目的**: ランダム星生成と瞬きアニメーション
- **Props**: quantity（デフォルト50個）、size（大きさ指定）
- **技術**: SVG + CSS @keyframesアニメーション（複数パターン）

#### CustomCursor-StarTheme.astro
- **ファイル**: [src/components/CustomCursor-StarTheme.astro](src/components/CustomCursor-StarTheme.astro)
- **行数**: 144行
- **目的**: 星型カーソル（代替案）
- **特徴**: 軌跡エフェクト、requestAnimationFrame使用

### 低複雑度コンポーネント

#### カード系

**ServiceCard.astro**
- **ファイル**: [src/components/ServiceCard.astro](src/components/ServiceCard.astro)
- **行数**: 31行
- **目的**: サービス説明カード
- **Props**: icon, title, description
- **用途**: servicesページでグリッド表示

#### UI部品

**DonatiLogo.astro**
- **ファイル**: [src/components/DonatiLogo.astro](src/components/DonatiLogo.astro)
- **行数**: 46行
- **目的**: ロゴ表示
- **Props**: size（サイズ可変：sm, md, lg）
- **使用箇所**: Header、OverViewHero等

**Footer.astro**
- **ファイル**: [src/components/Footer.astro](src/components/Footer.astro)
- **行数**: 41行
- **目的**: ページフッター
- **内容**: リンク、会社情報、ソーシャルメディアURL
- **使用場所**: 全ページ共通

**FooterDivider.astro**
- **ファイル**: [src/components/FooterDivider.astro](src/components/FooterDivider.astro)
- **行数**: 12行
- **目的**: ページ本文末尾の軽量な区切り線とコピーライト表示
- **Props**:
  - `copyText?: string` - コピーライトテキスト（デフォルト: '© サイエンス＆スペース ラボ DONATI'）
  - `showDivider?: boolean` - 区切り線の表示/非表示（デフォルト: true）
- **使用箇所**: index.astro、services.astro（mainタグ内、Footerコンポーネントの前）
- **スタイル**: `border-overview-dark-blue/20`, `text-overview-dark-blue/60`, 透明背景
- **実装日**: 2025年12月25日（Issue #46）
- **注意**: Footer.astroとは別物（役割・デザインが異なる）

#### セクション系

**StarrySection.astro**
- **ファイル**: [src/components/StarrySection.astro](src/components/StarrySection.astro)
- **行数**: 31行
- **目的**: 星背景セクション
- **依存**: Stars.astroを埋め込み
- **用途**: ビジュアル効果強化が必要なセクション

**ProfessionalExperienceFujiCard.astro**
- **ファイル**: [src/components/ProfessionalExperienceFujiCard.astro](src/components/ProfessionalExperienceFujiCard.astro)
- **行数**: 約38行
- **目的**: professional-experienceページのフジ活動経歴カード
- **Props**: link?: string（デフォルト: '#fuji-section'）
- **依存**: なし（SVG画像のみ）
- **特徴**: `bg-white/95 rounded-2xl shadow-lg`カードスタイル

**ProfessionalExperienceHideCard.astro**
- **ファイル**: [src/components/ProfessionalExperienceHideCard.astro](src/components/ProfessionalExperienceHideCard.astro)
- **行数**: 約38行
- **目的**: professional-experienceページのひでゆき活動経歴カード
- **Props**: link?: string（デフォルト: '#hide-section'）
- **依存**: なし（SVG画像のみ）
- **特徴**: `bg-white/95 rounded-2xl shadow-lg`カードスタイル

**ProfessionalExperienceServicesCard.astro**
- **ファイル**: [src/components/ProfessionalExperienceServicesCard.astro](src/components/ProfessionalExperienceServicesCard.astro)
- **行数**: 約45行
- **目的**: professional-experienceページのサービス内容カード
- **Props**: listItems: ListItem[], link?: string（デフォルト: '/services'）
- **依存**: なし（SVG画像のみ）
- **特徴**: リストアイテム表示機能付きカード

## コンポーネント依存関係

```
Header.astro
├─ DonatiLogo (SVG直接使用)

OverViewHero.astro
├─ DonatiLogo.astro

StaffCard.astro
├─ AboutUsButton.astro (複数使用)

Hero.astro
├─ AuroraBackground.astro (条件付き)
└─ Stars.astro (条件付き)

StarrySection.astro
└─ Stars.astro
```

## コンポーネント統計

### フォルダ別内訳
| フォルダ | コンポーネント数 | 用途 |
|---------|-----------------|------|
| common/ | 6 | 全ページ共通（Header, Footer, DonatiLogo, Hero, Carousel, InstagramSection） |
| overview/ | 6 | index.astro専用（OverView*, FooterDivider） |
| services/ | 7 | services.astro/service-fuji.astro専用（Services*, ServiceCategory*, ServiceDetailCard, RequestFlowStep） |
| professional-experience/ | 5 | professional-experience.astro専用（ProfessionalExperience*, MediaCoverageSection） |
| cards/ | 2 | 汎用カード（ServiceCard, StaffProfileCard） |
| effects/ | 5 | 視覚効果（CustomCursor*, Aurora*, Stars*） |
| **合計** | **31** | **6フォルダ** |

### ページ別import統計
| ページ | import数 | 主要コンポーネント |
|--------|----------|-------------------|
| index.astro | 5 | Header, Carousel, Footer, FooterDivider, OverViewSection |
| services.astro | 7 | Header, Footer, FooterDivider, ServiceCategoryHeader, ServiceCard, RequestFlowStep, ServicesSection |
| contact.astro | 3 | Header, Footer, Hero |
| professional-experience.astro | 7 | Header, Footer, ProfessionalExperience*(3), MediaCoverageSection |
| about.astro | 5 | Header, Footer, DonatiLogo, StaffProfileCard, FooterDivider |
| Layout.astro | 1 | CustomCursorStarTheme |

### 削除されたコンポーネント（Issue #57）
- **ページ（3個）**: achievements.astro, staff.astro, news/index.astro
- **コンポーネント（4個）**: AchievementCard.astro, NewsCard.astro, StaffCard.astro, AboutUsButton.astro
- **再構築**: about.astro - Issue #72で新規実装（StaffProfileCard+カード2枚型）

## waveLine 装飾要素の実装ガイド

waveLine.svg は複数箇所で使用される装飾要素です。適切に実装するために以下のパターンに従ってください。

### 実装パターン（推奨）

**Header と同じ堅牢な実装:**

```html
<div class="waveline-wrapper">
  <div class="w-full overflow-hidden flex justify-center">
    <!-- モバイル: 2つ -->
    <div class="flex sm:hidden">
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto flex-shrink-0" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-4 w-auto flex-shrink-0" />
    </div>
    <!-- タブレット: 3つ -->
    <div class="hidden sm:flex md:hidden">
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-5 w-auto flex-shrink-0" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-5 w-auto flex-shrink-0" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-5 w-auto flex-shrink-0" />
    </div>
    <!-- デスクトップ: 5つ -->
    <div class="hidden md:flex">
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-6 w-auto flex-shrink-0" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-6 w-auto flex-shrink-0" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-6 w-auto flex-shrink-0" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-6 w-auto flex-shrink-0" />
      <img src="/images/svg/Parts/waveLine.svg" alt="" class="h-6 w-auto flex-shrink-0" />
    </div>
  </div>
</div>
```

### 実装のポイント

1. **`.waveline-wrapper`**: global.css で定義（`max-w-4xl mx-auto px-4`）
   - 親要素の幅を最大1024pxに制限
   - 中央寄せでレスポンシブ対応

2. **`w-full overflow-hidden flex justify-center`**: 内側のコンテナ
   - `w-full`: 親の幅を全て使用
   - `overflow-hidden`: はみ出し部分を自動カット
   - `flex justify-center`: 内部を中央寄せ

3. **`flex-shrink-0`**: waveLine.svg に使用
   - `overflow-hidden` と組み合わせることで、幅を超える部分を安全にカット
   - 画像は元のサイズを保持

4. **レスポンシブ枚数**:
   - モバイル（sm未満）: 2つ
   - タブレット（sm～md未満）: 3つ
   - デスクトップ（md以上）: 5つ

5. **高さの調整**:
   - モバイル: `h-4` (16px)
   - タブレット: `h-5` (20px)
   - デスクトップ: `h-6` (24px)

### 注意点

- ❌ **避けるべき**: `max-width: 832px` などの個別スタイル上書き
- ❌ **避けるべき**: `flex justify-start` で左寄せ（中央寄せが推奨）
- ✅ **推奨**: `.waveline-wrapper` と `overflow-hidden` の組み合わせ

### 使用実例

- **Header**: `src/components/common/Header.astro` (102-124行目)
- **about.astro**: `src/pages/about.astro` (50-56行目、82-88行目)
- **index.astro**: `src/pages/index.astro` (101-123行目)

## ServiceDetailCard.astro (Issue #111追加)

詳細サービスカードコンポーネント。service-fuji.astroで使用される高複雑度コンポーネント。

### 基本情報
- **ファイル**: `src/components/services/ServiceDetailCard.astro`
- **行数**: 約180行
- **複雑度**: 高
- **対応ページ**: service-fuji.astro（service-hide.astroでも可）
- **作成日**: 2025年1月2日（Issue #111対応）

### Props定義

```typescript
interface Props {
  service: {
    id: string;
    title: string;
    description: string;
    detailTable?: {
      effect: string;           // 期待できる効果
      achievements: string;     // 主な活動実績・利用場所
      overview: string;         // 概要
      scale: string;            // 規模 / 対象
      duration: string;         // 時間目安
      merit: string;            // メリット
    };
    photos?: {
      photo1: string;
      photo2: string;
    };
  };
  index: number;
}
```

### コンポーネント構造

```
┌─────────────────────────────────┐
│ サービスタイトル（h3）           │
│ ～～～～ (黄色い波線)            │
├──────────────┬──────────────────┤
│ 青い詳細     │ 写真1（4:3比）   │
│ テーブル     │ (プレースホルダー)│
│ (6行)        │                  │
│              │ 写真2（4:3比）   │
│              │ (プレースホルダー)│
├──────────────┴──────────────────┤
│ DetailTableButton.svg            │
├──────────────────────────────────┤
│ QA.svg（問い合わせバナー）       │
└──────────────────────────────────┘
```

### 主要機能

1. **タイトル + 波線装飾**
   - 黄色い波線（3つ）フィルター: `hue-rotate(45deg) saturate(1.2)`
   - 黄色カスタマイズで参考画像に合わせた表現

2. **詳細テーブル（左側、40%幅）**
   - 青いグラデーション背景: `linear-gradient(135deg, #58778D 0%, #4A90E2 100%)`
   - 6項目の構造化情報（2カラムグリッド）
   - 白色テキスト、下罫線で見やすく

3. **写真プレースホルダー（右側、60%幅）**
   - 2つの写真を縦配置（4:3アスペクト比）
   - プレースホルダー背景: #e5e7eb
   - 読み込み失敗時フォールバック対応（onerror属性）

4. **DetailTableButton.svg統合**
   - 中央揃え、最大幅500px
   - ホバー効果: `opacity: 0.8`

5. **QA.svg問い合わせバナー**
   - 全幅表示、適切な上余白（2rem）

### レスポンシブ対応

| デバイス | グリッド構成 | 説明 |
|---------|-----------|------|
| モバイル (< 768px) | 1カラム | テーブル → 写真1 → 写真2（縦積み） |
| タブレット (768px～) | 2カラム | テーブル50% / 写真50% |
| デスクトップ (1024px～) | 2カラム | テーブル40% / 写真60% |

### スタイル詳細

**テーブル行の構成**
- グリッド: `grid-template-columns: 140px 1fr`
- ラベル（左）: 140px固定幅、太字（weight 600）
- 値（右）: 可変幅、折り返し対応

**黄色い波線**
```html
<img src="/images/svg/Parts/waveLine.svg" alt="" style="filter: hue-rotate(45deg) saturate(1.2);" />
```

### データソース

`src/config/site.ts` の `serviceCategories.science.services` から以下の情報を参照:
- `service.detailTable`: テーブル内容（6項目）
- `service.photos`: 写真パス（2枚）

### 実装上の注意点

1. **プレースホルダー対応**
   - 写真ファイルが存在しない場合、`onerror`で画像を非表示
   - グレー背景のプレースホルダー表示

2. **テーブルラベルの幅**
   - 140pxで「時間目安」など長いラベルに対応

3. **黄色フィルター**
   - waveLine.svgの元の色を保持しつつ、フィルターで黄色化
   - 参考画像の黄色に合わせるため必須

4. **max-w-4xl制約**
   - Issue #83に従い、service-fuji.astroの親要素でmax-w-4xl設定
   - このコンポーネント自体は100%幅を使用

### 使用例

```astro
import ServiceDetailCard from '../components/services/ServiceDetailCard.astro';

{scienceCategory.services.map((service, index) => (
  <ServiceDetailCard service={service} index={index} />
))}
```

### 今後の拡張予定

- [ ] DetailTableButtonのクリック時の詳細ページリンク実装
- [ ] 写真の実際のファイル差し替え
- [ ] テーブル内容の参考画像と完全マッチング（テキスト精査）
- [ ] service-hide.astroへの対応検討

## 更新履歴

- **2025年1月2日**: ServiceDetailCard.astro追加（Issue #111対応）
  - service-fuji.astro用の詳細サービスカード新規実装
  - 青いテーブル + 写真プレースホルダー + DetailTableButton + QAバナー統合
  - 総コンポーネント数：30個 → 31個
- **2025年12月30日**: waveLine 実装ガイド追加（Issue #96対応）
- **2025年12月27日**: Issue #72完了 - AboutUsページ実装
  - StaffProfileCard.astro (新規)
  - about.astro ページ (新規)
  - 総コンポーネント数：29個 → 30個
- **2025年12月27日**: Issue #57完了 - フォルダ構造化リファクタリング
  - 33個のフラット構造から6フォルダ構造へ再編成
  - 4ページ削除、4コンポーネント削除（29個に整理）
  - 全29コンポーネントのパス更新
  - 5ページ、20 import文を更新
  - CustomCursor-StarTheme.astroバグ修正（astro:after-swapリスナー追加）
- 2025年12月25日: professional-experienceページのナビゲーションカード3つを追加（20コンポーネント、1,704行）
- 2025年12月9日: 初版作成（17コンポーネント、1,583行の詳細分析）
