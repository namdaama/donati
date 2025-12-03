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

// トップページのHeroカルーセルデータ
export const heroCarouselData = [
  {
    image: '/images/svg/Carousel/Carousel_AboutDonati.svg',
    alt: 'DONATIとは - 科学と宇宙の楽しさを体験',
    title: 'DONATIとは？',
    description: '科学の楽しさと宇宙の神秘を、みんなで一緒に体験しませんか？',
    link: '/about'
  },
  {
    image: '/images/svg/Carousel/Carousel_Services.svg',
    alt: 'サービス内容 - 実験ショーやワークショップ',
    title: 'サービス内容',
    description: '実験ショー・ワークショップ・星空観望会など、ワクワクする体験をお届けします',
    link: '/services'
  },
  {
    image: '/images/svg/Carousel/Carousel_Staff.svg',
    alt: '私たちについて - スタッフ紹介',
    title: '私たちについて',
    description: 'サイエンスパフォーマー フジと星の写真家 ひでゆきがお届けします',
    link: '/staff'
  },
  {
    image: '/images/svg/Carousel/Carousel_Career.svg',
    alt: '活動経歴 - これまでの実績',
    title: '活動経歴',
    description: '200名以上が参加した実験ショーなど、みんなで楽しんだ活動の記録です',
    link: '/achievements'
  },
  {
    image: '/images/svg/Carousel/Carousel_Contact.svg',
    alt: 'お問い合わせ - 気軽にご相談ください',
    title: 'お問い合わせ',
    description: '時間・予算・内容、なんでも気軽にご相談ください！',
    link: '/contact'
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