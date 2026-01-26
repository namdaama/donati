import type { ServiceCategory } from '../types';

export const scienceServices: ServiceCategory = {
  id: 'science',
  title: 'サイエンス（科学分野）',
  icon: '⚗️',
  mainTitle: 'サイエンス事業',
  characterIconUrl: '/images/svg/performers/fuji/fuji_pict.svg',
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
        overview: '笑いと驚きで会場を包む体験型ステージサイエンスショー',
        effect: '会場を一気に盛り上げ、思わず足を止めた人まで巻き込みながら、科学のおもしろさが自然と伝わる空間を作ります。',
        suitableEvents: '・集客を強化したい\n・目玉企画を入れたい\n・科学に触れるきっかけを作りたい',
        achievements: '商業施設、地域イベント、小中学校芸術鑑賞会、保育園・幼稚園',
        recommendedFor: '・商業施設のイベント担当者さま\n・自治体・公共施設の企画担当者さま\n・学校・保育施設の関係者さま\n・地域のイベント主催者さま',
        scale: '50名〜 ／ 幼児〜大人',
        duration: '30〜45分',
        requiredSpace: '・会場の広さに合わせて内容を調整します\n・電源：1口\n・屋内外どちらも可\n・観覧方法は会場に応じてご相談'
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
        overview: '楽しいから集中して取り組める！探究型の実験教室',
        effect: '「なぜ？」が「わかった！」に変わり、知的好奇心がぐんぐん育つ、深い学びが得られます。',
        suitableEvents: '・探究学習を充実させたい\n・学びのある体験企画を入れたい\n・親子や地域の学びの場を作りたい',
        achievements: '小中学校PTA行事、中学校・高校の探究学習授業、学習塾、学童保育など',
        recommendedFor: '・教育委員会・自治体の学習事業担当者さま\n・中学校・高校・小学校の関係者さま\n・学童保育・民間教育事業者さま',
        scale: '・探究型：小5〜高校生（〜約40名）\n・体験型：小1〜小6（〜約40名）',
        duration: '・探究型：60分〜180分\n・体験型：45分〜90分',
        requiredSpace: '・机・椅子がある室内で実施できます\n・電源：1〜2口\n・水道はあれば便利ですが、なくても対応可\n・探究型は生徒のみ／体験型は親子参加OK'
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
        overview: '短時間で楽しめる、立ち寄り型の科学体験',
        effect: '短時間で気軽に参加でき、科学の楽しさに出会うきっかけとなります。集客と滞在時間の向上にもつながります。',
        suitableEvents: '・にぎわいを作りたい\n・滞在時間を延ばしたい\n・子供向けの手軽な体験を入れたい',
        achievements: '商業施設、住宅展示場、マルシェ',
        recommendedFor: '・商業施設の販促・イベント担当者さま\n・住宅展示場の企画担当者さま\n・地域イベント主催者さま',
        scale: 'どなたでも',
        duration: '1回 10〜15分（随時受付）',
        requiredSpace: '・テーブル2〜3台のスペースがあれば実施可\n・電源不要のメニューも多数\n・屋内外どちらも可\n・随時受付に対応'
      },
      photos: {
        photo1: '/images/picture/Science/detail_WorkShop01.jpg',
        photo2: '/images/picture/Science/detail_WorkShop02.jpg'
      }
    }
  ]
};
