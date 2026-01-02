// サイト全体の設定を一元管理
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
    link: '/about'
  },
  {
    image: '/images/svg/Carousel/Carousel_Career.svg',
    alt: '活動経歴 - これまでの実績',
    title: '活動経歴',
    description: '200名以上が参加した実験ショーなど、みんなで楽しんだ活動の記録です',
    link: '/professional-experience'
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

// サービスページ用の型定義
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  programs: string[];
  detailTable?: {
    effect: string;           // 期待できる効果
    achievements: string;     // 主な活動実績・利用場所
    overview: string;         // 概要
    scale: string;            // 規模 / 対象
    duration: string;         // 時間目安
    merit: string;            // メリット
  };
  photos?: {
    photo1: string;        // 1枚目の写真パス
    photo2: string;        // 2枚目の写真パス
  };
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  characterIconUrl: string;
  subtitle: string;
  description: string;
  services: ServiceItem[];
}

// サービスカテゴリデータ
export const serviceCategories: Record<'science' | 'space', ServiceCategory> = {
  science: {
    id: 'science',
    title: 'サイエンス（科学分野）',
    icon: '⚗️',
    characterIconUrl: '/images/svg/Parts/fuji_pict.svg',
    subtitle: '科学の楽しさと不思議を体験',
    description: '実験やワークショップで、科学の不思議とワクワクを一緒に楽しみましょう！',
    services: [
      {
        id: 'science-performance-show',
        title: 'サイエンスパフォーマンスショー',
        description: '目の前で起こる不思議な現象に驚き、科学の楽しさを発見できるショーです！',
        features: [
          '対象年齢：幼児〜中学生（内容により調整可能）',
          '所要時間：45分〜90分',
          '参加人数：10名〜300名程度',
          '出張対応可能'
        ],
        programs: [
          '空気の力を体感！大気圧実験ショー',
          '光と色の不思議！虹を作ろう',
          '化学反応マジック！色が変わる実験',
          '静電気パワー！電気の実験ショー'
        ],
        detailTable: {
          effect: '会場の一体感と集客力の最大化',
          achievements: '商業施設、地域イベント、学校の芸術鑑賞会、保育園・幼稚園のお祭りなど',
          overview: '笑いと驚きのステージ型ショー。大規模イベント向き。',
          scale: '100名～ / ホール、体育館',
          duration: '30分〜45分',
          merit: '盛り上がり保証！パフォーマーの熱量を直接お届け。'
        },
        photos: {
          photo1: '/images/placeholders/science-performance-1.jpg',
          photo2: '/images/placeholders/science-performance-2.jpg'
        }
      },
      {
        id: 'science-experiment-room',
        title: 'わくわく科学実験室',
        description: '「なんでだろう？」を大切にして、一緒に考えて実験して、科学的な考え方を一緒に育てていきましょう！',
        features: [
          '対象年齢：小学3年生〜6年生',
          '期間：3ヶ月〜1年（月2回程度）',
          '定員：10名程度',
          '少人数制で個別指導'
        ],
        programs: [
          '身の回りの科学を探求しよう',
          '実験計画の立て方を学ぼう',
          'データ分析と考察の方法',
          '研究発表会への挑戦'
        ],
        detailTable: {
          effect: '深い学び・探求心',
          achievements: '小中学校 PTA 行事、中学・高校の探求学習。',
          overview: '参加者自身がじっくり取り組む実験教室',
          scale: '20名程度 / 教室、会議室',
          duration: '60分～90分',
          merit: '「なぜ？」を「わかった！」に変える深い体験。'
        },
        photos: {
          photo1: '/images/placeholders/experiment-room-1.jpg',
          photo2: '/images/placeholders/experiment-room-2.jpg'
        }
      },
      {
        id: 'workshop',
        title: 'ワークショップ',
        description: '手を動かして実験したり工作したり、いっぱい体験して科学を楽しむプログラムです！',
        features: [
          '対象年齢：小学生〜中学生',
          '所要時間：60分〜120分',
          '参加人数：5名〜30名程度',
          '材料費別途'
        ],
        programs: [
          'スライム作りで学ぶ高分子化学',
          '顕微鏡で見る小さな世界',
          'ロボットプログラミング入門',
          '結晶作りで学ぶ化学反応'
        ],
        detailTable: {
          effect: '短時間で楽しめる科学体験の提供と集客促進。',
          achievements: '商業施設、住宅展示場（賑やかし）、マルシェイベントなど',
          overview: '10分～15分で完結するライトな体験会。',
          scale: '少人数～多数 / ブース、商業施設',
          duration: '随時受付（回転率重視）',
          merit: 'パフォーマンスショーとの相乗効果で集客力が高い。'
        },
        photos: {
          photo1: '/images/placeholders/workshop-1.jpg',
          photo2: '/images/placeholders/workshop-2.jpg'
        }
      }
    ]
  },
  space: {
    id: 'space',
    title: 'スペース（宇宙分野）',
    icon: '🌟',
    characterIconUrl: '/images/svg/Parts/hide_pict.svg',
    subtitle: '宇宙の不思議を一緒に探検',
    description: '望遠鏡で星を観たり、宇宙のお話をしたり、一緒に宇宙を旅しましょう！',
    services: [
      {
        id: 'stargazing',
        title: '星空観望会／プラネタリウム解説／星空イベント',
        description: '望遠鏡で星を観たり、プラネタリウムのような星空のお話をしたり、一緒に宇宙を旅しましょう！',
        features: [
          '対象：全年齢',
          '所要時間：90分〜180分',
          '参加人数：10名〜100名程度',
          '天候により内容変更あり'
        ],
        programs: [
          '季節の星座と天体観察',
          '月のクレーター観察会',
          '惑星観望会（木星・土星・火星）',
          '流星群観察会'
        ]
      },
      {
        id: 'lecture',
        title: '講演・大学講義（宇宙・天文教育）',
        description: '難しそうな宇宙のお話を、ワクワクしながら楽しくお伝えします！一緒に宇宙の不思議を発見しましょう！',
        features: [
          '対象：中学生〜一般',
          '所要時間：60分〜120分',
          '参加人数：20名〜500名',
          'オンライン対応可能'
        ],
        programs: [
          '宇宙の歴史と進化',
          '太陽系の惑星たち',
          '星の一生と恒星進化',
          '最新の宇宙探査ミッション'
        ]
      },
      {
        id: 'photos',
        title: '星空風景写真の提供・出版利用',
        description: '素敵な星空の写真をいろいろな場面でお使いいただけます。商用利用も喜んで対応させていただきます！',
        features: [
          '高解像度デジタルデータ提供',
          '商用利用ライセンス対応',
          'カスタム撮影も承ります',
          '全国各地の星空撮影地データ'
        ],
        programs: [
          '天の川と風景のコラボレーション',
          '星座と季節の風景写真',
          '流星群・彗星などの天文現象',
          '月・惑星と風景の合成写真'
        ]
      }
    ]
  }
};

// ご依頼の流れ型定義
export interface RequestFlowStep {
  step: number;
  title: string;
  description: string;
}

// ご依頼の流れデータ
export const requestFlow: RequestFlowStep[] = [
  {
    step: 1,
    title: 'お問い合わせ',
    description: 'お問い合わせフォームからご相談ください'
  },
  {
    step: 2,
    title: 'ご予算に応じた提案',
    description: 'ご要望をお聞きし、ご予算に合ったお考えのプランを提案します。'
  },
  {
    step: 3,
    title: 'お見積り提出・ご確認',
    description: 'お客様のご希望の内容が決まりましたら、お見積書を作成いたします。沖縄県外のご依頼の場合、交通費・宿泊費を別途ご請求させて頂きます。'
  },
  {
    step: 4,
    title: 'ご依頼確定',
    description: '内容をしっかり確認して、ご準備を整えさせていただいたり、ご準備のサポートさせていただきます。'
  },
  {
    step: 5,
    title: '出演当日',
    description: 'パフォーマーやイベント運営をさせていただきます！'
  },
  {
    step: 6,
    title: '支払い方法',
    description: '出演料金は、後日ご請求させていただきます。'
  }
];

// 打ち合わせ内容型定義
export interface ConsultationTopic {
  number: number;
  question: string;
  description: string;
  svg: string;
}

// 打ち合わせ内容データ
export const consultationTopics: ConsultationTopic[] = [
  {
    number: 1,
    question: '内容？',
    description: '目的や参加者を考えて予算や時間に合わせたプランを企画します',
    svg: '/images/svg/Parts/conference_thing1.svg'
  },
  {
    number: 2,
    question: '時間？',
    description: '基本的00分です実験の組み合わせで調整できます',
    svg: '/images/svg/Parts/conference_thing2.svg'
  },
  {
    number: 3,
    question: '予算？',
    description: '基本料金あり予算にできるだけお応えします',
    svg: '/images/svg/Parts/conference_thing3.svg'
  },
  {
    number: 4,
    question: '準備？',
    description: '特にありません設備は事前に確認します',
    svg: '/images/svg/Parts/conference_thing4.svg'
  }
];