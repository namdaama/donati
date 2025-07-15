// サイト全体の設定を一元管理
export const siteConfig = {
  // サイト基本情報
  name: 'サイエンス アンド スペース ラボ DONATI',
  url: 'https://donati-science.com',
  description: '科学実験ショーや星空観望会を通じて、科学の楽しさを伝えます',
  
  // ソーシャルメディア
  social: {
    instagram: import.meta.env.PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/donati_science/',
    twitter: import.meta.env.PUBLIC_TWITTER_URL || '',
    facebook: import.meta.env.PUBLIC_FACEBOOK_URL || ''
  },
  
  // 外部サービス
  external: {
    googleFormId: import.meta.env.PUBLIC_GOOGLE_FORM_ID || '1FAIpQLSfwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  },
  
  // 画像パス設定
  images: {
    logo: '/images/logo.png',
    ogImage: '/images/og-image.jpg',
    favicon: '/favicon.ico'
  }
};

// カルーセル画像データ
export const carouselData = [
  {
    image: '/images/carousel/experiment.jpg',
    alt: '科学実験ショー',
    title: '科学実験ショー',
    description: '楽しい実験で科学の不思議を体験',
    link: '/services#science-show'
  },
  {
    image: '/images/carousel/stargazing.jpg',
    alt: '星空観望会',
    title: '星空観望会',
    description: '本物の星空を見上げる感動体験',
    link: '/services#stargazing'
  },
  {
    image: '/images/carousel/workshop.jpg',
    alt: '科学ワークショップ',
    title: '科学ワークショップ',
    description: '手を動かして学ぶ実験教室',
    link: '/services#workshop'
  }
];

// サービス一覧データ
export const servicesData = [
  {
    title: '科学実験ショー',
    description: '楽しく学べる体験型の科学実験ショー。子どもたちの「なぜ？」「どうして？」を引き出します。',
    icon: '🧪',
    link: '/services#science-show',
    color: 'accent-orange'
  },
  {
    title: '科学ワークショップ',
    description: '手を動かして学ぶ実験教室。科学の原理を体験しながら理解を深めます。',
    icon: '🔬',
    link: '/services#workshop',
    color: 'accent-green'
  },
  {
    title: '探求学習プログラム',
    description: '科学的思考力を育む特別プログラム。問題解決能力を楽しく身につけます。',
    icon: '🧠',
    link: '/services#inquiry',
    color: 'space-blue'
  },
  {
    title: '星空観望会',
    description: '本物の星空を見上げる感動体験。宇宙の神秘を専門解説とともにお届けします。',
    icon: '🔭',
    link: '/services#stargazing',
    color: 'deep-blue'
  }
];