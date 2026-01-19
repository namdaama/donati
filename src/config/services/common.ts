import type { RequestFlowStep, ConsultationTopic } from '../types';

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

// 打ち合わせ内容データ
export const consultationTopics: ConsultationTopic[] = [
  {
    number: 1,
    question: '内容？',
    description: '目的や参加者を考えて予算や時間に合わせたプランを企画します',
    svg: '/images/svg/conference/conference_thing1.svg'
  },
  {
    number: 2,
    question: '時間？',
    description: '基本的00分です実験の組み合わせで調整できます',
    svg: '/images/svg/conference/conference_thing2.svg'
  },
  {
    number: 3,
    question: '予算？',
    description: '基本料金あり予算にできるだけお応えします',
    svg: '/images/svg/conference/conference_thing3.svg'
  },
  {
    number: 4,
    question: '準備？',
    description: '特にありません設備は事前に確認します',
    svg: '/images/svg/conference/conference_thing4.svg'
  }
];
