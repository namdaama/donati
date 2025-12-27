# 設定ファイルの管理方法

## 概要
このディレクトリはサイト全体の設定やデータを一元管理するためのものです。

## ファイル構成

### site.ts
- サイトの基本情報（名前、URL、説明文など）
- ソーシャルメディアのURL
- 外部サービスの設定（Web3Forms Access Keyなど）
- 共通で使用する画像パス
- カルーセルやサービス一覧などの静的データ

## 環境変数の使い方

### 1. 公開情報（PUBLIC_プレフィックス付き）
クライアント側でも使用できる情報：
- `PUBLIC_INSTAGRAM_URL` - InstagramプロフィールのURL
- `PUBLIC_WEB3FORMS_ACCESS_KEY` - Web3Forms Access Key
- `PUBLIC_TWITTER_URL` - TwitterプロフィールのURL
- `PUBLIC_FACEBOOK_URL` - FacebookページのURL

### 2. 秘密情報（プレフィックスなし）
サーバー側でのみ使用する情報：
- `MICROCMS_SERVICE_DOMAIN` - microCMSのサービスドメイン
- `MICROCMS_API_KEY` - microCMSのAPIキー

## 使用例

```astro
---
// コンポーネントでの使用
import { siteConfig, carouselData } from '@/config/site';

const instagramUrl = siteConfig.social.instagram;
---

<Carousel slides={carouselData} />
```

## 画像の管理

### publicフォルダ（/public/images/）
- 直接URLでアクセスする画像
- 最適化が不要な画像
- ファビコンやOGP画像など

### srcフォルダ（/src/assets/images/）
- Astroで最適化する画像
- コンポーネントでインポートして使用する画像

```astro
---
// 最適化される画像の使用例
import { Image } from 'astro:assets';
import heroImage from '@/assets/images/hero.jpg';
---

<Image src={heroImage} alt="ヒーロー画像" />
```