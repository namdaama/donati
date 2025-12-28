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
├── services/        # サービスページ専用 (6個)
│   ├── ServicesSection.astro
│   ├── ServicesFujiSection.astro
│   ├── ServicesHideSection.astro
│   ├── ServiceCategoryHeader.astro
│   ├── ServiceCategoryCard.astro
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

**総コンポーネント数**: 30個（削除前: 33個）

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
| services/ | 6 | services.astro専用（Services*, ServiceCategory*, RequestFlowStep） |
| professional-experience/ | 5 | professional-experience.astro専用（ProfessionalExperience*, MediaCoverageSection） |
| cards/ | 2 | 汎用カード（ServiceCard, StaffProfileCard） |
| effects/ | 5 | 視覚効果（CustomCursor*, Aurora*, Stars*） |
| **合計** | **30** | **6フォルダ** |

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

## 更新履歴

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
