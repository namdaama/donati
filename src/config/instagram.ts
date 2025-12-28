// Instagram Graph API連携の設定
export const instagramConfig = {
  // ハッシュタグフィルター設定
  announcementHashtag: import.meta.env.ANNOUNCEMENT_HASHTAG || '#こみかる',
  enableHashtagFilter: import.meta.env.ENABLE_HASHTAG_FILTER !== 'false',

  // 表示設定
  maxDisplayPosts: 4, // overviewページで表示する投稿数

  // 画像プロキシ設定（weserv.nl）
  imageProxy: {
    baseUrl: 'https://images.weserv.nl/',
    defaultWidth: 400,
    defaultHeight: 400,
    fit: 'cover',
  },

  // カテゴリキーワード
  categoryKeywords: {
    workshop: ['workshop', 'ワークショップ'],
    event: ['event', 'イベント'],
  },
} as const;

// 画像プロキシURL生成ヘルパー
export function getProxiedImageUrl(url: string, width?: number, height?: number): string {
  const w = width || instagramConfig.imageProxy.defaultWidth;
  const h = height || instagramConfig.imageProxy.defaultHeight;
  const { baseUrl, fit } = instagramConfig.imageProxy;
  return `${baseUrl}?url=${encodeURIComponent(url)}&w=${w}&h=${h}&fit=${fit}`;
}
