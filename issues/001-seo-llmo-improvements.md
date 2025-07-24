# Issue #001: SEO・LLMO改善実装

## 概要
サイエンス アンド スペース ラボ DONATIのWebサイトに対して、SEO（検索エンジン最適化）とLLMO（大規模言語モデル最適化）の改善を実施する。

## 背景
現在のサイトは基本的な構造は整っているが、以下の点で改善の余地がある：
- 検索エンジンのクローラビリティが不十分
- 構造化データの欠如
- AIによる内容理解を助けるセマンティックマークアップの不足

## 改善項目（優先度：高）

### 1. SEO基盤の強化

#### 1.1 Sitemap生成
```bash
npm install @astrojs/sitemap
```

astro.config.mjsを更新：
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://donati-lab.com', // 実際のURLに変更
  integrations: [tailwind(), sitemap()],
  output: 'static',
});
```

#### 1.2 robots.txt作成
public/robots.txtを作成：
```
User-agent: *
Allow: /
Sitemap: https://donati-lab.com/sitemap-index.xml
```

#### 1.3 構造化データ（JSON-LD）実装

Layout.astroのheadセクションに追加：
```astro
<!-- 構造化データ -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "サイエンス アンド スペース ラボ DONATI",
  "alternateName": "DONATI",
  "url": "https://donati-lab.com",
  "logo": "https://donati-lab.com/logo.png",
  "description": "科学実験ショーや星空観望会を通じて、科学の楽しさを伝える",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "日本"
  },
  "sameAs": [
    "https://instagram.com/donati_lab"
  ]
}
</script>
```

services.astroに追加：
```astro
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "科学教育サービス",
  "provider": {
    "@type": "Organization",
    "name": "サイエンス アンド スペース ラボ DONATI"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "科学教育プログラム",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "科学実験ショー",
          "description": "体験型の科学実験ショー"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "星空観望会",
          "description": "天体望遠鏡を使った観望会"
        }
      }
    ]
  }
}
</script>
```

#### 1.4 メタタグの拡充

Layout.astroのPropsとheadセクションを更新：
```astro
export interface Props {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalURL?: string;
}

const { 
  title, 
  description = 'サイエンス アンド スペース ラボ DONATI - 科学の楽しさを伝え、世界をワクワクでいっぱいにする',
  keywords = '科学実験,科学教室,星空観望会,科学ワークショップ,探求学習,DONATI',
  ogImage = '/og-default.jpg',
  canonicalURL = Astro.url.href
} = Astro.props;
```

headに追加：
```astro
<!-- SEO Meta Tags -->
<meta name="keywords" content={keywords} />
<link rel="canonical" href={canonicalURL} />

<!-- OGP -->
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={canonicalURL} />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={`${title} | サイエンス アンド スペース ラボ DONATI`} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
```

### 2. LLMO最適化

#### 2.1 セマンティックHTML強化

各ページで以下の変更を実施：
- `<div>`を適切な`<section>`、`<article>`、`<aside>`に変更
- 日付を`<time datetime="2024-03-15">`形式に変更
- 連絡先情報を`<address>`タグで囲む

#### 2.2 アクセシビリティ改善

Header.astroの最初に追加：
```astro
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-space-blue text-white px-4 py-2 rounded">
  メインコンテンツへスキップ
</a>
```

各ページのmainタグに追加：
```astro
<main id="main-content" class="flex-grow">
```

画像にalt属性を追加（例）：
```astro
<img src="/science-show.jpg" alt="子どもたちが科学実験ショーを楽しんでいる様子" />
```

モバイルメニューボタンにaria属性を追加：
```astro
<button 
  id="mobile-menu-button" 
  class="md:hidden p-2"
  aria-label="メニューを開く"
  aria-expanded="false"
  aria-controls="mobile-menu"
>
```

#### 2.3 コンテンツの最適化

見出し階層の確認：
- 各ページに1つのh1
- 論理的なh2、h3の階層構造
- 重要キーワードを含む見出し

内部リンクの強化：
```astro
<a href="/services" title="科学実験ショーやワークショップの詳細">
  事業内容を見る
</a>
```

## 実装手順

1. Gitで新しいブランチを作成
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git checkout -b feature/seo-improvements
   ```

2. 上記の各改善項目を実装

3. テスト実施
   - 構造化データテストツールで検証
   - Lighthouse でSEOスコアを確認
   - アクセシビリティチェッカーで検証

4. コミットとプルリクエスト
   ```bash
   git add .
   git commit -m "feat: Add SEO and LLMO improvements"
   ```

## 期待される効果

- 検索エンジンでの表示順位向上
- リッチスニペットの表示
- AIアシスタントによる正確な情報提供
- アクセシビリティの向上
- ユーザー体験の改善

## 追加リソース

- [Schema.org](https://schema.org/)
- [Google 構造化データ](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)