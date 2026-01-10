import type { ServiceCategory } from '../types';

export const scienceServices: ServiceCategory = {
  id: 'science',
  title: 'サイエンス（科学分野）',
  icon: '⚗️',
  mainTitle: 'サイエンス事業',
  characterIconUrl: '/images/svg/Parts/fuji_pict.svg',
  subtitle: '見て、驚いて、参加する。\n会場が一体になるワクワクの科学体験！',
  description: '実験ショー・科学実験室・ワークショップなど会場や目的に合わせたプログラムをご提案。',
  subsectionTitle: '科学のワクワクを届ける！幼児から大人まで対応可能な３つのプラン',
  subsectionContent: [
    '私たちは、科学の楽しさをみんなに届けるために、3つの異なるプランをご用意しています。',
    '「サイエンスパフォーマンスショー」では、100名以上の大規模イベントで会場全体が一体となって驚きと笑いを共有できます。商業施設や学校の芸術鑑賞会にぴったりです。',
    '「わくわく科学実験室」は、20名程度の少人数でじっくり学べるプラン。「なぜ？」を大切にして、科学的な考え方を一緒に育てていきます。',
    '「ワークショップ」は、短時間で気軽に科学体験ができるプラン。マルシェや住宅展示場での賑やかしにも最適です。',
    'どのプランも、幼児から大人まで対象年齢に合わせて内容を調整できます。時間・予算・目的に合わせて、最適なプランをご提案いたします！'
  ],
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
        photo1: '/images/picture/Science/detail_Show01.jpg',
        photo2: '/images/picture/Science/detail_Show02.jpg'
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
        photo1: '/images/picture/Science/detail_Lab01.jpg',
        photo2: '/images/picture/Science/detail_Lab02.jpg'
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
        photo1: '/images/picture/Science/detail_WorkShop01.jpg',
        photo2: '/images/picture/Science/detail_WorkShop02.jpg'
      }
    }
  ]
};
