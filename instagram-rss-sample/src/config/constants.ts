export const RSS_CONFIG = {
  XML_PREVIEW_LENGTH: 500,
  RESPONSE_TIMEOUT: 30000,
  MAX_CONTENT_LENGTH: 30000,
} as const;

export const ANNOUNCEMENT_CONFIG = {
  MAX_DISPLAY_POSTS: 4,
  SLUG_MAX_LENGTH: 50,
  DEFAULT_HASHTAG: '#donati_event',
  CATEGORIES: {
    WORKSHOP: 'workshop',
    EVENT: 'event',
    NEWS: 'news',
  } as const,
} as const;

export const UI_CONFIG = {
  COLORS: {
    PRIMARY: '#2c5aa0',
    ACCENT: '#f4a261',
    BACKGROUND: '#f5f5f5',
    TEXT: '#333',
    TEXT_MUTED: '#666',
    CARD_BG: 'white',
  },
  CARD: {
    IMAGE_HEIGHT: 200,
    EXCERPT_LINES: 3,
    BORDER_RADIUS: 8,
    SHADOW: '0 2px 8px rgba(0,0,0,0.1)',
    SHADOW_HOVER: '0 4px 16px rgba(0,0,0,0.15)',
  },
} as const;

export const IMAGE_PROXY_CONFIG = {
  BASE_URL: 'https://images.weserv.nl/',
  DEFAULT_WIDTH: 400,
  DEFAULT_HEIGHT: 400,
  FIT: 'cover',
} as const;

export const LOCATION_PATTERNS = [
  /場所[:：]\s*([^\n]+)/,
  /会場[:：]\s*([^\n]+)/,
  /開催地[:：]\s*([^\n]+)/,
  /📍\s*([^\n]+)/,
] as const;

export const CATEGORY_KEYWORDS = {
  workshop: ['workshop', 'ワークショップ'],
  event: ['event', 'イベント'],
} as const;