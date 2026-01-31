import type { ServiceCategory } from '../types';

// スペース事業専用の型定義
export interface SpaceServiceDetail {
  id: string;
  title: string;

  // レイアウトフラグ
  layout?: 'legacy' | 'modern';  // デフォルト: 'legacy'

  // 新デザイン用フィールド（modern layout用）
  heroSection?: {
    photo: string;
    photoAlt: string;
    mainCatch: string;
    description: string;
  };

  illustrationSection?: {
    svgPath: string;
    alt: string;
  };

  modernRecommendedScenes?: {
    overviewDescription: string;
    scenes: Array<{
      title: string;
      description: string;
    }>;
  };

  // 既存フィールド（legacy layout用）
  subtitle?: string;
  photo: string;
  photoAlt: string;
  description: string;
  recommendedScenes?: {
    title: string;
    items: string[];
  };

  // 共通
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

export const spaceServices: ServiceCategory = {
  id: 'space',
  title: 'スペース（宇宙分野）',
  icon: '🌟',
  mainTitle: '星空事業',
  characterIconUrl: '/images/svg/performers/hide/hide_pict.svg',
  subtitle: '星を見上げる時間が、心に残る特別な体験に。',
  description: '星空観察会・ましかくプラネタリウム・星空イベントなど、場所や対象に合わせて実施します。',
  subsectionTitle: '',
  subsectionContent: [],
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
};

// service-hide.astro ページ専用のデータ
export const spaceServiceDetails: SpaceServiceDetail[] = [
  {
    id: 'stargazing',
    title: '星空観察会',
    layout: 'modern',

    // 新デザイン用データ
    heroSection: {
      photo: '/images/picture/StarrySky/Observe.png',
      photoAlt: '天の川と星空の風景',
      mainCatch: '今夜はどんな星が見えるかな？',
      description: 'そんなワクワクと一緒に、本物の宇宙を見上げる特別な時間です。その日の夜空に合わせたお話を聞きながら、望遠鏡で星のクレーターや惑星などを観察します。'
    },

    illustrationSection: {
      svgPath: '/images/svg/decorations/starrySkySubPlan.svg',
      alt: '雨でも安心！選べる当日切り替えプラン'
    },

    modernRecommendedScenes: {
      overviewDescription: '学校行事やPTAイベント・地域イベントなど、幅広い場面で実施しています。\n夜からこそ楽しめる、特別なプログラムとしておすすめです。',
      scenes: [
        {
          title: '子どもたちに、夜空やほしの特別な体験を',
          description: '学校行事 / PTAイベント / お泊まり保育等どの夜のアクティビティ'
        },
        {
          title: '集客やにぎわいを生む、等のイベントとして',
          description: '展覧会等でのイベント / 前泊時間の特別プログラム / 地域のお祭りなど'
        }
      ]
    },

    // 既存のpricingデータ
    pricing: {
      type: 'table',
      title: '料金プラン',
      rows: [
        {
          label: '基本プラン',
          price: '50,000円〜',
          note: '90分、10-30名対応'
        },
        {
          label: '標準プラン',
          price: '80,000円〜',
          note: '120分、30-60名対応'
        },
        {
          label: '大規模プラン',
          price: '要相談',
          note: '180分以上、60名以上対応'
        }
      ]
    },

    // 後方互換性のためのダミーフィールド
    photo: '/images/picture/StarrySky/Observe.png',
    photoAlt: '天の川と星空の風景',
    description: ''
  },
  {
    id: 'planetarium',
    title: 'ましかくプラネタリウム',
    layout: 'modern',

    // 新デザイン用データ
    heroSection: {
      photo: '/images/picture/StarrySky/Planetarium.png',
      photoAlt: 'プラネタリウムドーム内の様子',
      mainCatch: '時間と場所を超えて、見たい星空に出会えるプラネタリウム体験です。',
      description: '生まれた日の星空や、旅先で見た思い出の星空など、地球上であれば、どの場所・どの時代の星空も映し出せます。元プラネタリウム解説員が、参加者の年代や目的に合わせて、その場にぴったりの星空や宇宙の世界をお届けします。'
    },

    illustrationSection: {
      svgPath: '/images/svg/decorations/pranetariumText.svg',
      alt: 'ましかくプラネタリウムの特徴'
    },

    modernRecommendedScenes: {
      overviewDescription: '室内でいつでも星空体験ができるため、天候に左右されずに実施できます。\n様々な場面で、特別な星空体験をお届けします。',
      scenes: [
        {
          title: '子どもたちの"はじめての宇宙体験"に',
          description: '幼稚園・保育園の室内行事 / 児童館でのプラネタリウム体験等'
        },
        {
          title: 'いつもの空間を、特別な夜空に生まれ変わらせて',
          description: 'カフェやレストランの夜間 / 商業施設・住宅展示場の集客イベント・住宅展示場のプログラム'
        },
        {
          title: '暮らしに寄り添う、プライベートな星空体験として',
          description: '記念日やお祝い / 少人数でのゆったり星空体験に対応'
        }
      ]
    },

    // 既存のpricingデータ
    pricing: {
      type: 'list',
      title: '種類豊富にございます',
      items: [
        'エアドーム式プラネタリウム（定員20-80名）：200,000円〜',
        '移動式プラネタリウム（定員10-30名）：100,000円〜',
        'プラネタリウム解説のみ（既存施設利用）：50,000円〜',
        'オンライン星空解説：30,000円〜'
      ]
    },

    // 後方互換性のためのダミーフィールド
    photo: '/images/picture/StarrySky/Planetarium.png',
    photoAlt: 'プラネタリウムドーム内の様子',
    description: '移動式のプラネタリウムをお持ちします。屋内でも星空体験ができ、天候に左右されずに実施できます。ドーム内で寝転がりながら、満天の星空を眺める特別な時間を過ごせます。星座の神話や季節の星空解説、最新の天文ニュースなど、参加者の興味に合わせてお話しします。'
  }
];
