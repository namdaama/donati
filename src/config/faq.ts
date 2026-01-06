// FAQページのデータ設定

export interface PricingCategory {
  id: string;
  title: string;
  description: string;
}

export interface EventRelatedQuestion {
  id: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQPageData {
  introSection: {
    title: string;
    content: string[];
  };
  pricingCategories: PricingCategory[];
  eventQuestions: EventRelatedQuestion[];
  faqItems: FAQItem[];
  ctaSection: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

export const faqData: FAQPageData = {
  introSection: {
    title: '料金の目安',
    content: [
      '料金は、基本料金+追加料金となっております。',
      '基本料金は、プログラムの内容や時間によって異なります。',
      '追加料金は、移動費・宿泊費・機材費などが必要に応じてかかります。',
      'まずはお気軽にご相談ください。ご予算に応じて、最適なプランをご提案させていただきます。'
    ]
  },
  pricingCategories: [
    {
      id: 'science-performance',
      title: 'サイエンスパフォーマンスショー',
      description: '3万円〜 (税込) / 1回60分\n大人数で楽しめる、迫力満点のサイエンスショー'
    },
    {
      id: 'science-class',
      title: 'わくわく科学実験室！',
      description: '3.5万円〜 (税込) / 1回90分\n少人数で体験できる、本格的な科学実験'
    },
    {
      id: 'workshop',
      title: 'ワークショップ',
      description: '2.5万円〜 (税込) / 1回60分\nものづくりを通して科学を学べるプログラム'
    },
    {
      id: 'stargazing',
      title: '星空観察会',
      description: '3.5万円〜 (税込) / 1回90分\n天体望遠鏡で本物の星を観察する特別な体験'
    },
    {
      id: 'photo-service',
      title: 'きれいな写真撮ります',
      description: '3.5万円〜 (税込)\nイベントの思い出を美しく記録に残します'
    },
    {
      id: 'other',
      title: 'その他',
      description: 'ご要望に応じて、オリジナルプログラムを企画・実施いたします'
    }
  ],
  eventQuestions: [
    {
      id: 'travel-cost',
      title: '移動費について',
      description: '出張先までの交通費(往復)が別途必要です。遠方の場合は宿泊費が必要となることがあります。'
    },
    {
      id: 'venue',
      title: '会場について',
      description: 'アクセサリや機器類を使用する場合、電源や机・椅子などが必要です。会場の条件によっては、別途機材費がかかる場合があります。'
    },
    {
      id: 'equipment',
      title: '機器類について',
      description: 'プログラムによっては、天体望遠鏡やプロジェクターなどの機材を使用します。機材の輸送費や、会場での設置にかかる費用が別途必要です。'
    },
    {
      id: 'weather-cancellation',
      title: '天候次第で中止について',
      description: '星空観望会は天候に左右されます。雨天・曇天の場合は、室内プログラムへの変更、または中止となります。中止の場合、キャンセル料はいただきません。'
    }
  ],
  faqItems: [
    {
      id: 'faq-1',
      question: 'まだ内容が決まっていなくても、相談できますか？',
      answer: 'もちろん可能です！\n目的や会場条件、ご予算などをお聞きして、最適なプランをご提案させていただきます。\n「こんなことはできますか？」というご相談からでも大歓迎です。'
    },
    {
      id: 'faq-2',
      question: 'まだ日程が決まっていなくても、相談できますか？',
      answer: 'はい、大丈夫です！\nおおよその時期や、候補日程をお聞かせください。\nスケジュール調整しながら、一緒に最適な日程を決めていきましょう。'
    },
    {
      id: 'faq-3',
      question: '小規模なイベントや少人数でも依頼できますか？',
      answer: 'はい、可能です！\n少人数だからこそできる、じっくり学べるプログラムもご用意しています。\nまずはご希望の人数や内容をお聞かせください。'
    },
    {
      id: 'faq-4',
      question: '背景はどんな色がおすすめですか？ 人気カラーを教えてください',
      answer: 'プログラムやイベントのテーマに合わせてご提案させていただきます。\n人気は青系や宇宙をイメージした暗めの色ですが、明るい色で元気な雰囲気も素敵です。\nご希望や会場の雰囲気に合わせて、一緒に考えましょう。'
    },
    {
      id: 'faq-5',
      question: '星を追加できますか？',
      answer: '星空観望会では、季節や時間帯によって見える星が異なります。\nご希望の天体がある場合は、観察に適した時期をご提案させていただきます。\nプラネタリウムソフトを使った解説では、お好きな星を追加してご紹介することも可能です。'
    },
    {
      id: 'faq-6',
      question: 'すぐにスパークリングワインでお祝いできますか？',
      answer: 'プログラム終了後、ご自由にお祝いしていただけます！\nただし、イベント中はアルコール類の持ち込みはご遠慮いただいております。\n終了後のお祝いは、会場のルールに従ってお楽しみください。'
    },
    {
      id: 'faq-7',
      question: '服装や髪型などを変えてもらえますか？',
      answer: 'はい、ご要望に応じて調整いたします。\nイベントのテーマやご要望に合わせて、衣装や演出を工夫することも可能です。\nお気軽にご相談ください。'
    },
    {
      id: 'faq-8',
      question: '撮影撮影会は、紙芝居と同じ人がいる公園などで行います',
      answer: '撮影会の会場は、ご希望に応じて柔軟に対応いたします。\n公園、学校、イベント会場など、さまざまな場所での実施が可能です。\n会場の条件や、プログラム内容に合わせてご提案させていただきます。'
    },
    {
      id: 'faq-9',
      question: '有料撮影に来場者が参加することは可能ですか？',
      answer: '可能です！\n参加型のプログラムでは、来場者の皆さまにも実験や観察に参加していただけます。\n「見て、驚いて、参加する」体験を大切にしています。\n写真撮影も、イベントの思い出としてご自由にどうぞ。'
    }
  ],
  ctaSection: {
    title: 'まずはお気軽にご相談ください',
    description: '「こんなことはできますか？」「このイベントに合う内容を相談したい」\nそんな段階からでも、お気軽にご相談ください。',
    buttonText: 'お問い合わせはこちら',
    buttonLink: '/contact'
  }
};
