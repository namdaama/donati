// サイト全体の基本設定を一元管理
export const siteConfig = {
  // サイト基本情報
  name: 'サイエンス アンド スペース ラボ DONATI',
  url: 'https://donati-science.jp',
  description: '科学実験ショーや星空観望会を通じて、科学の楽しさを伝えます',

  // ソーシャルメディア
  social: {
    instagram: import.meta.env.PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/donati_science/',
    twitter: import.meta.env.PUBLIC_TWITTER_URL || '',
    facebook: import.meta.env.PUBLIC_FACEBOOK_URL || ''
  },

  // 外部サービス
  external: {
    web3formsAccessKey: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY || 'dfa9ec58-78f2-4ab5-94b5-a109ddb6a5dd'
  },

  // 画像パス設定
  images: {
    logo: '/images/logo.png',
    ogImage: '/images/og-image.jpg',
    favicon: '/favicon.ico'
  }
};
