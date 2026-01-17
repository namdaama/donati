// FAQページのデータ設定（Issue #154 対応）

export interface PricingItem {
  id: string;
  title: string;
  price: string;
  note: string;
}

export interface ExpenseItem {
  id: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CancelPolicySection {
  title: string;
  content: string;
  items: string[];
  note: string;
}

export interface CancelPolicy {
  intro: string;
  sections: CancelPolicySection[];
}

export interface FAQPageData {
  introSection: {
    title: string;
    content: string[];
  };
  pricingItems: PricingItem[];
  expenseItems: ExpenseItem[];
  cancelPolicy: CancelPolicy;
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
    title: '料金についてのご案内',
    content: [
      'サイエンス＆スペースラボ DONATIでは、\nイベントの目的・対象年齢・会場条件・規模に合わせて、\n最適な内容をご提案しています。',
      'そのため、料金はあくまで目安として掲載し、\nまずはご相談いただく形を取っています。',
      '「どんな内容ができる？」「この予算内でできる？」など、\n構想段階からでもお気軽にお問い合わせください。'
    ]
  },
  pricingItems: [
    {
      id: 'science-performance',
      title: 'サイエンスパフォーマンスショー',
      price: '66,000円（税込）〜',
      note: '※ 内容・対象年齢・会場条件により調整します'
    },
    {
      id: 'science-class',
      title: 'わくわく科学実験室',
      price: '55,000円（税込）〜',
      note: '※ 材料費別途'
    },
    {
      id: 'workshop',
      title: 'ワークショップ',
      price: '33,000円（税込）〜／2時間まで',
      note: '※ 材料費別途\n※ 2時間を超える場合は別途ご相談ください'
    },
    {
      id: 'stargazing',
      title: '星空観察会',
      price: '33,000円（税込）〜／60〜90分',
      note: '※ 上記は 講師1名・望遠鏡1台 での基本料金です\n※ 参加人数が多い場合や、複数台の望遠鏡が必要な場合は、\n　 追加体制での実施をご提案します'
    },
    {
      id: 'planetarium',
      title: 'ましかくプラネタリウム',
      price: '33,000円（税込）〜',
      note: ''
    }
  ],
  expenseItems: [
    {
      id: 'material',
      title: '材料費について',
      description: 'わくわく科学実験室・ワークショップでは、\n原則として材料費が別途必要となります。\n※ サイエンスパフォーマンスショーは、基本的に材料費込みです。'
    },
    {
      id: 'transportation',
      title: '交通費について',
      description: 'すべてのご依頼について、\n交通費（20円／km・税込）をお願いしています。\n※ 距離は往復、福井北ICを起点に算出します\n※ 50km以上の場合は高速道路料金（実費）をお願いしています'
    },
    {
      id: 'accommodation',
      title: '宿泊費について',
      description: '実施時間や移動距離の関係で宿泊が必要な場合、\n宿泊費（1泊11,000円・税込）をお願いしています。\n※ 業務上必要な経費として一律で設定しています。'
    },
    {
      id: 'remote',
      title: '遠方での実施について',
      description: '移動距離が120kmを超える場合は、\n宿泊または新幹線・飛行機などの公共交通機関を利用することがあります。\nその際の交通費・機材送料は、事前にお見積りにてご案内します。'
    }
  ],
  cancelPolicy: {
    intro: 'お申し込みの前に必ずご確認ください。\nサイエンス＆スペースラボ DONATIでは、皆さまに安全で質の高い体験をお届けするため、\n事前に機材の調整や実験材料の準備、スタッフの確保を行っております。\nやむを得ずキャンセル・変更される場合は、できるだけお早めにご連絡をお願いいたします。',
    sections: [
      {
        title: '1．キャンセル料について',
        content: 'お客様のご都合によりキャンセルされる場合は、以下のキャンセル料を申し受けます。',
        items: [
          '実施日の14日前まで：キャンセル料なし',
          '実施日の13〜7日前：料金の30％',
          '実施日の6〜3日前：料金の50％',
          '実施日の2日前〜当日：料金の100％'
        ],
        note: '※ すでに出張に伴う 宿泊費・交通費等のキャンセル料が発生している場合は、\n上記とは別に実費分をご負担いただく場合があります。'
      },
      {
        title: '2．天候による中止・延期（星空観察会など）',
        content: '星空観察会など、天候に左右されるイベントについては、以下の通り柔軟に対応いたします。',
        items: [
          '延期の場合\n予備日への振替は、キャンセル料なし（1回まで）で承ります。',
          '室内プログラムへの切り替え\n雨天時に、室内でのサイエンスショーやワークショップへ内容を変更する場合、\nキャンセル料は発生しません。',
          '中止の場合\n当日の天候不良による中止の判断は、原則として開催の3時間前までに行います。\nこの場合の対応については、事前にご相談のうえ決定させていただきます。'
        ],
        note: ''
      },
      {
        title: '3．主催者側の都合による中止',
        content: '出演者の急病・事故、天災等のやむを得ない事情により開催が困難となった場合は、\n全額返金（振込手数料含む）、または日程の振替にて対応いたします。',
        items: [],
        note: ''
      }
    ]
  },
  faqItems: [
    {
      id: 'faq-1',
      question: 'まだ内容が決まっていませんが、相談できますか？',
      answer: 'はい、大丈夫です。\nイベントの目的や対象年齢、ご予算感を伺いながら、内容をご提案します。'
    },
    {
      id: 'faq-2',
      question: '小規模なイベントや少人数、個人でも依頼できますか？',
      answer: 'はい、可能です。\nイベントの規模や状況に応じた内容で対応いたします。\n個人の方からのご依頼実績もありますので、まずはお気軽にご相談ください。'
    },
    {
      id: 'faq-3',
      question: '内容は子ども向けだけですか？大人向けも可能ですか？',
      answer: '子どもから大人まで対応可能です。\n大人向けプログラムの実績もあり、大人向けイベントの主催実績もあります。'
    },
    {
      id: 'faq-4',
      question: '安全面は大丈夫ですか？',
      answer: '対象年齢・会場条件を考慮し、安全に配慮した内容で実施します。\n学校・商業施設での実施実績も多数あります。'
    },
    {
      id: 'faq-5',
      question: 'サイエンスパフォーマンスショーは屋外でも実施できますか？',
      answer: 'はい、実施可能です。\n会場環境や天候などの状況に合わせて、\n安全面に配慮しながら内容を一緒に検討します。'
    },
    {
      id: 'faq-6',
      question: '雨天時や屋内開催でも実施できますか？',
      answer: 'はい、可能です。\n屋内向けの内容や、天候に左右されないプログラムもご提案できます。'
    },
    {
      id: 'faq-7',
      question: '星空観察会は、参加人数が多い場合どうなりますか？',
      answer: '人数や会場条件に応じて、\n講師の追加や望遠鏡台数を増やした体制をご提案します。\nその場合は、事前にお見積りいたします。'
    },
    {
      id: 'faq-8',
      question: '見積り後に追加料金が発生することはありますか？',
      answer: '事前に合意した内容で、\n追加料金が発生することはありません。\n内容変更や追加をご希望の場合は、事前にご相談ください。'
    }
  ],
  ctaSection: {
    title: 'まだお見積もりに不安を感じている方へ',
    description: 'どんな小さなことでも、\nまずはお気軽にご相談ください！\nご予算や実施内容に合わせて、\n最適なプランをご提案させていただきます。\nお見積もりは無料です。お気軽にお問い合わせください。',
    buttonText: 'お問合せを送信する',
    buttonLink: '/contact'
  }
};
