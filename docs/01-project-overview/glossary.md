# Donati固有名詞用語集

**最終更新日**: 2026-01-31（ページ構成・設定ファイル追加）

## 概要

このドキュメントは、DONATIプロジェクトで使用される固有名詞・専門用語を一元管理します。フロントエンド実装時に、Claudeやチームメンバーが表記揺れを防ぎ、正確な情報を参照できるようにすることを目的としています。

## 更新ルール

### 新規用語追加時
1. 該当カテゴリ（A〜H）を判断
2. 下記フォーマットに従ってエントリー作成
3. 最終更新日を更新

### 既存用語変更時
1. 該当エントリーを検索
2. 変更内容を反映
3. 最終更新日を更新

---

## A. ブランド・組織名

#### DONATI

- **正式名称**: サイエンス アンド スペース ラボ DONATI
- **読み方**: ドナチ
- **別名**: サイエンス＆スペースラボ DONATI / Science & Space Lab DONATI / Science and Space Lab DONATI
- **説明**: フジとひでゆきによるサイエンスコミュニケーションユニットの屋号
- **使用例**: ヘッダー、フッター、ページタイトル、メタ情報（`src/config/site.ts:6`）

---

## B. 出演者・パフォーマー

#### フジ

- **正式名称**: 加藤 絢（かとう あや）
- **読み方**: フジ
- **別名**: サイエンスパフォーマー・フジ
- **説明**: サイエンス事業担当。サイエンスパフォーマー、サイエンスコミュニケーター
- **使用例**:
  - プロフィール: `src/config/site.ts:67-94`
  - サービスアイコン: `/images/svg/performers/fuji/fuji_pict.svg`
  - 名前SVG: `/images/svg/performers/fuji/fuji_name.svg`
  - Instagram: `@wakuwaku_science_fuji`

#### ひでゆき

- **正式名称**: 加藤 英行（かとう ひでゆき）
- **読み方**: ひでゆき
- **別名**: 星の写真家 ひでゆき
- **説明**: 星空事業担当。星の写真家、日本写真作家協会正会員。福井市自然史博物館の元学芸員（天文担当）
- **使用例**:
  - プロフィール: `src/config/site.ts:96-142`
  - サービスアイコン: `/images/svg/performers/hide/hide_pict.svg`
  - 名前SVG: `/images/svg/performers/hide/hide_name.svg`
  - 写真集: 『Fukui starry sky』（2024）、『STARRY SKY』（2018）

---

## C. 事業・サービス名

#### サイエンス事業

- **正式名称**: サイエンス事業
- **読み方**: サイエンスじぎょう
- **別名**: サイエンス（科学分野）
- **説明**: 科学実験ショー・わくわく科学実験室・ワークショップを含む科学体験プログラム。フジが担当
- **使用例**:
  - 設定: `src/config/services/science.ts`
  - ページ: `src/pages/service-fuji.astro`

#### スペース事業

- **正式名称**: スペース事業
- **読み方**: スペースじぎょう
- **別名**: スペース（宇宙分野）
- **説明**: 星空観望会・プラネタリウム解説・講演・星空写真提供を含む宇宙体験プログラム。ひでゆきが担当
- **使用例**:
  - 設定: `src/config/services/space.ts`
  - ページ: `src/pages/service-hide.astro`

#### サイエンスパフォーマンスショー

- **正式名称**: サイエンスパフォーマンスショー
- **読み方**: サイエンスパフォーマンスショー
- **別名**: 科学実験ショー
- **説明**: 笑いと驚きで会場を包む体験型ステージサイエンスショー（50名〜300名、30〜45分）
- **使用例**: `src/config/services/science.ts:20-50`

#### わくわく科学実験室

- **正式名称**: わくわく科学実験室
- **読み方**: わくわくかがくじっけんしつ
- **説明**: 探究型の科学実験教室。「なぜ？」を大切にして科学的思考を育てるプログラム（小5〜高校生、60〜180分）
- **使用例**: `src/config/services/science.ts:51-81`

#### ワークショップ

- **正式名称**: ワークショップ
- **読み方**: ワークショップ
- **説明**: 短時間で楽しめる立ち寄り型の科学体験（1回10〜15分、随時受付）
- **使用例**: `src/config/services/science.ts:82-113`

#### 星空観望会

- **正式名称**: 星空観望会／プラネタリウム解説／星空イベント
- **読み方**: ほしぞらかんぼうかい
- **説明**: 望遠鏡で星を観察したり、プラネタリウムのような星空解説をお届けするプログラム（全年齢、90〜180分）
- **使用例**: `src/config/services/space.ts:20-36`

#### ましかくプラネタリウム

- **正式名称**: ましかくプラネタリウム
- **読み方**: ましかくプラネタリウム
- **説明**: 正方形のスクリーンを使用したプラネタリウム解説サービス
- **使用例**: 料金表（`src/config/faq.ts:87`）、サービス実績（`src/pages/professional-experience.astro:108`）

#### 星空オンラインサロン「スターズ」

- **正式名称**: 星空オンラインサロン「スターズ」
- **読み方**: ほしぞらオンラインサロン「スターズ」
- **説明**: ひでゆきが主宰するオンラインコミュニティ
- **使用例**:
  - プロフィール: `src/config/site.ts:114`
  - URL: `https://community.camp-fire.jp/projects/view/776551`

---

## D. 技術スタック・ツール

#### Astro

- **正式名称**: Astro
- **読み方**: アストロ
- **説明**: 静的サイトジェネレーター。DONATIプロジェクトのフレームワーク
- **使用例**:
  - 設定: `astro.config.mjs`
  - 実装方針: `docs/03-technical-specs/Astro実装方針ガイド.md`

#### microCMS

- **正式名称**: microCMS
- **読み方**: マイクロシーエムエス
- **説明**: ヘッドレスCMS（コンテンツ管理システム）。無料プラン使用
- **使用例**:
  - 環境変数: `MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY`
  - コード: `src/lib/microcms.ts`

#### Vercel

- **正式名称**: Vercel
- **読み方**: ヴァーセル
- **説明**: ホスティングプラットフォーム。本番環境とステージング環境を運用
- **使用例**:
  - 本番: `https://donati-science.jp`（releaseブランチ）
  - ステージング: `https://stg.donati-science.jp`（masterブランチ）
  - 詳細: `docs/07-deployment/vercel-deployment.md`

#### Web3Forms

- **正式名称**: Web3Forms
- **読み方**: ウェブスリーフォームズ
- **説明**: お問い合わせフォームサービス（無料プラン: 月250件）
- **使用例**:
  - 環境変数: `PUBLIC_WEB3FORMS_ACCESS_KEY`
  - 設定: `src/config/site.ts:19`

#### Figma

- **正式名称**: Figma
- **読み方**: フィグマ
- **説明**: デザインツール。Dev Modeでデザイン仕様を確認
- **使用例**: `docs/04-workflow-collaboration/figma-workflow.md`

#### TypeScript

- **正式名称**: TypeScript
- **読み方**: タイプスクリプト
- **説明**: JavaScriptに型システムを追加した言語。Astroコンポーネントで使用
- **使用例**: `*.astro`, `*.ts` ファイル全般

#### TailwindCSS

- **正式名称**: TailwindCSS
- **読み方**: テイルウィンドシーエスエス
- **別名**: Tailwind
- **説明**: ユーティリティファーストのCSSフレームワーク
- **使用例**:
  - 設定: `tailwind.config.mjs`
  - 配色管理: `docs/03-technical-specs/color-management.md`

#### PUBLIC_INSTAGRAM_URL

- **正式名称**: PUBLIC_INSTAGRAM_URL
- **読み方**: パブリック・インスタグラム・ユーエルエル
- **説明**: Instagram URL を指定する環境変数
- **使用例**: `src/config/site.ts:12`, `.env.example`

#### carousel.ts

- **正式名称**: carousel.ts
- **読み方**: カルーセル・ティーエス
- **説明**: トップページの Hero カルーセルのスライド設定ファイル
- **使用例**: `src/config/carousel.ts`

#### faq.ts

- **正式名称**: faq.ts
- **読み方**: エフエーキュー・ティーエス
- **説明**: FAQ、料金表、経費、キャンセルポリシーの設定ファイル
- **使用例**: `src/config/faq.ts`

#### types.ts

- **正式名称**: types.ts
- **読み方**: タイプス・ティーエス
- **説明**: サービスカテゴリ等の TypeScript 型定義ファイル
- **使用例**: `src/config/types.ts`

---

## E. UI/UXコンポーネント

#### カルーセル

- **正式名称**: Carousel
- **読み方**: カルーセル
- **説明**: トップページのHeroカルーセル。4枚のスライドを自動切り替え
- **使用例**:
  - コンポーネント: `src/components/common/Carousel.astro`
  - 設定: `src/config/carousel.ts`
  - 詳細: `docs/05-implementation-guides/カルーセル実装ガイド.md`

#### アコーディオン

- **正式名称**: Accordion
- **読み方**: アコーディオン
- **説明**: FAQセクションで使用される開閉式UI
- **使用例**: `src/components/common/FAQItem.astro`

#### ヘッダー

- **正式名称**: Header
- **読み方**: ヘッダー
- **説明**: 全ページ共通のナビゲーションヘッダー
- **使用例**: `src/components/common/Header.astro`

#### フッター

- **正式名称**: Footer
- **読み方**: フッター
- **説明**: 全ページ共通のフッター（SNSリンク、コピーライト等）
- **使用例**: `src/components/common/Footer.astro`

#### プロフィールカード

- **正式名称**: StaffProfileCard
- **読み方**: スタッフプロフィールカード
- **説明**: フジ・ひでゆきのプロフィール表示カード
- **使用例**: `src/components/cards/StaffProfileCard.astro`

---

## F. 配色・デザイン用語

#### primary-color

- **正式名称**: プライマリーカラー（メインブルー）
- **読み方**: プライマリーカラー
- **カラーコード**: `#2c5aa0`
- **説明**: DONATIブランドのメインカラー
- **使用例**:
  - Tailwind: `bg-primary-color`, `text-primary-color`, `border-primary-color`
  - 定義: `tailwind.config.mjs:8`

#### secondary-color

- **正式名称**: セカンダリーカラー（アクセントオレンジ）
- **読み方**: セカンダリーカラー
- **カラーコード**: `#f4a261`
- **説明**: DONATIブランドのアクセントカラー
- **使用例**:
  - Tailwind: `bg-secondary-color`, `text-secondary-color`
  - 定義: `tailwind.config.mjs:9`

#### overview-sky

- **正式名称**: オーバービュースカイ（スカイブルー）
- **読み方**: オーバービュースカイ
- **カラーコード**: `#87CEEB`
- **説明**: トップページ（OverView）専用の水色
- **使用例**:
  - Tailwind: `bg-overview-sky`
  - 定義: `tailwind.config.mjs:12`

#### contact-cyan

- **正式名称**: コンタクトシアン（シアン）
- **読み方**: コンタクトシアン
- **カラーコード**: `#65b7ec`
- **説明**: Contactページ専用の水色
- **使用例**:
  - Tailwind: `bg-contact-cyan`
  - 定義: `tailwind.config.mjs:16`

---

## G. 活動拠点・施設名

#### 福井県吉田郡永平寺町

- **正式名称**: 福井県吉田郡永平寺町
- **読み方**: ふくいけんよしだぐんえいへいじちょう
- **説明**: DONATIの拠点所在地
- **使用例**: Aboutページ、会社概要

#### 福井北IC

- **正式名称**: 福井北インターチェンジ
- **読み方**: ふくいきたインターチェンジ
- **別名**: 福井北IC
- **説明**: 交通費計算の起点
- **使用例**: FAQ料金説明（`src/config/faq.ts`）

#### セーレンプラネット

- **正式名称**: セーレンプラネット（福井市自然史博物館分館）
- **読み方**: セーレンプラネット
- **説明**: 福井市の宇宙・天文博物館。ひでゆきが学芸員として立ち上げに関わった施設
- **使用例**: プロフィール、活動実績

#### 福井市自然史博物館

- **正式名称**: 福井市自然史博物館
- **読み方**: ふくいししぜんしはくぶつかん
- **説明**: ひでゆきが学芸員（天文担当）として勤務していた施設
- **使用例**: `src/config/site.ts:112`

#### 新潟県立自然科学館

- **正式名称**: 新潟県立自然科学館
- **読み方**: にいがたけんりつしぜんかがくかん
- **説明**: フジが約8年間、プラネタリウム解説員・サイエンスコミュニケーターとして勤務した施設（延べ10万人以上に星空解説）
- **使用例**: `src/config/site.ts:81`

#### 北九州市立児童文化科学館

- **正式名称**: 北九州市立児童文化科学館
- **読み方**: きたきゅうしゅうしりつじどうぶんかかがくかん
- **説明**: フジがプラネタリウム解説員として勤務した施設（新潟県立自然科学館と合わせて約8年間で延べ10万人以上に星空解説）
- **使用例**: `src/config/site.ts:82`

#### 岩手大学

- **正式名称**: 岩手大学 農学部
- **読み方**: いわてだいがく のうがくぶ
- **説明**: フジの出身大学
- **使用例**: `src/config/site.ts:85`

#### 明星大学

- **正式名称**: 明星大学 理工学部 物理学科 / 明星大学大学院 理工学研究科 物理学専攻
- **読み方**: めいせいだいがく りこうがくぶ ぶつりがっか / めいせいだいがくだいがくいん りこうがくけんきゅうか ぶつりがくせんこう
- **説明**: ひでゆきの出身大学・大学院（宇宙線研究室）
- **使用例**: `src/config/site.ts:110-111`

#### 福井大学

- **正式名称**: 福井大学 教育学部
- **読み方**: ふくいだいがく きょういくがくぶ
- **説明**: ひでゆきが講師・非常勤講師として天文・地学分野を教えた大学
- **使用例**: `src/config/site.ts:113`

---

## H. チーム関係者

#### フジ（クライアント）

- **正式名称**: 加藤 絢（フジ）
- **読み方**: かとう あや（フジ）
- **役割**: クライアント（プロジェクト発注者）
- **説明**: サイエンスコミュニケーター。プロジェクトの発注者
- **使用例**: `docs/README.md:4`

#### ひさな（デザイナー）

- **正式名称**: ひさな
- **読み方**: ひさな
- **役割**: デザイナー
- **説明**: Figmaでのデザイン作成担当
- **使用例**:
  - `docs/README.md:5`
  - `docs/04-workflow-collaboration/figma-workflow.md`

#### なむ（エンジニア）

- **正式名称**: なむ
- **読み方**: なむ
- **役割**: エンジニア
- **説明**: TypeScript実装・Astro開発担当
- **使用例**: `docs/README.md:6`

---

## I. ページ構成

#### index.astro

- **正式名称**: index.astro（トップページ）
- **読み方**: インデックス
- **ルート**: `/`
- **説明**: サイトのトップページ。Hero カルーセル、サービス概要、FAQ を含む
- **使用例**: `src/pages/index.astro`

#### about.astro

- **正式名称**: about.astro（Aboutページ）
- **読み方**: アバウト
- **ルート**: `/about`
- **説明**: DONATI の紹介、理念、メンバープロフィールを掲載
- **使用例**: `src/pages/about.astro`

#### service-fuji.astro

- **正式名称**: service-fuji.astro（フジのサービス詳細ページ）
- **読み方**: サービス・フジ
- **ルート**: `/service-fuji`
- **説明**: サイエンス事業の詳細ページ。サイエンスパフォーマンスショー、わくわく科学実験室、ワークショップの詳細
- **使用例**: `src/pages/service-fuji.astro`

#### service-hide.astro

- **正式名称**: service-hide.astro（ひでゆきのサービス詳細ページ）
- **読み方**: サービス・ハイド
- **ルート**: `/service-hide`
- **説明**: スペース事業の詳細ページ。星空観望会、プラネタリウム解説、星空写真提供の詳細
- **使用例**: `src/pages/service-hide.astro`

#### professional-experience.astro

- **正式名称**: professional-experience.astro（実績紹介ページ）
- **読み方**: プロフェッショナル・エクスペリエンス
- **ルート**: `/professional-experience`
- **説明**: 過去の実績を紹介するページ
- **使用例**: `src/pages/professional-experience.astro`

#### contact.astro

- **正式名称**: contact.astro（お問い合わせページ）
- **読み方**: コンタクト
- **ルート**: `/contact`
- **説明**: お問い合わせフォームページ。Web3Forms 統合
- **使用例**: `src/pages/contact.astro`

#### faq.astro

- **正式名称**: faq.astro（FAQページ）
- **読み方**: エフエーキュー
- **ルート**: `/faq`
- **説明**: 料金、キャンセルポリシー、よくある質問を掲載
- **使用例**: `src/pages/faq.astro`

#### 404.astro

- **正式名称**: 404.astro（404エラーページ）
- **読み方**: よんまるよん
- **ルート**: `/404`
- **説明**: ページが見つからない場合のエラーページ
- **使用例**: `src/pages/404.astro`

---

## 参考ドキュメント

用語の詳細情報は以下のドキュメントを参照してください:

- **配色管理**: `docs/03-technical-specs/color-management.md`
- **コンポーネント詳細**: `docs/05-implementation-guides/components-guide.md`
- **サービス詳細**: `src/config/services/science.ts`, `src/config/services/space.ts`
- **サイト設定**: `src/config/site.ts`
- **デプロイ環境**: `docs/07-deployment/vercel-deployment.md`
- **コンテンツガイドライン**: `docs/08-operations/content-guidelines.md`
