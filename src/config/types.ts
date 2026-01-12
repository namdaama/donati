// サービス関連の型定義を一元管理

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  programs: string[];
  detailTable?: {
    overview: string;                  // 概要
    effect: string;                    // 期待できる効果
    suitableEvents: string;            // 向いているイベント
    achievements: string;              // これまでの実績実例
    recommendedFor: string;            // こんな方におすすめ！
    scale: string;                     // 規模・対象
    duration: string;                  // 時間目安
    requiredSpace: string;             // 必要スペース
    photos?: {
      photo1: string;                  // 1枚目の写真パス
      photo2: string;                  // 2枚目の写真パス
    };
  };
  photos?: {
    photo1: string;        // 1枚目の写真パス
    photo2: string;        // 2枚目の写真パス
  };
}

export interface ServiceCategory {
  id: string;
  title?: string;
  icon?: string;
  mainTitle: string;
  characterIconUrl: string;
  subtitle: string;
  description: string;
  subsectionTitle: string;
  subsectionContent: string[];
  services: ServiceItem[];
}

export interface RequestFlowStep {
  step: number;
  title: string;
  description: string;
}

export interface ConsultationTopic {
  number: number;
  question: string;
  description: string;
  svg: string;
}
