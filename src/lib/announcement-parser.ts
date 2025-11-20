import type { InstagramPost, AnnouncementPost } from '../types/instagram';

const LOCATION_PATTERNS = [
  /場所[:：]\s*([^\n]+)/,
  /会場[:：]\s*([^\n]+)/,
  /開催地[:：]\s*([^\n]+)/,
  /📍\s*([^\n]+)/,
] as const;

const CATEGORY_KEYWORDS = {
  workshop: ['workshop', 'ワークショップ'],
  event: ['event', 'イベント'],
} as const;

const ANNOUNCEMENT_CONFIG = {
  CATEGORIES: {
    WORKSHOP: 'workshop',
    EVENT: 'event',
    NEWS: 'news',
  } as const,
  SLUG_MAX_LENGTH: 50,
} as const;

export function filterAnnouncementPosts(
  posts: InstagramPost[],
  announcementHashtag: string
): AnnouncementPost[] {
  const filtered = posts.filter(post => {
    const hasTag = post.hashtags.includes(announcementHashtag);
    if (!hasTag) {
      const partialMatch = post.hashtags.some(tag =>
        tag.toLowerCase().includes(announcementHashtag.toLowerCase().replace('#', ''))
      );
      if (partialMatch) {
        console.log(`部分一致で見つかった投稿: ${post.title}, タグ: ${post.hashtags.join(', ')}`);
      }
    }
    return hasTag;
  });

  return filtered.map(post => parseAnnouncementPost(post));
}

function parseAnnouncementPost(post: InstagramPost): AnnouncementPost {
  const normalizedPost = {
    ...post,
    pubDate: post.pubDate instanceof Date ? post.pubDate : new Date(post.pubDate),
  };

  const announcement: AnnouncementPost = {
    ...normalizedPost,
    category: determineCategory(post.hashtags),
  };

  const dateMatch = post.content.match(/(\d{4})[年\/](\d{1,2})[月\/](\d{1,2})日?/);
  if (dateMatch) {
    announcement.eventDate = new Date(
      parseInt(dateMatch[1]),
      parseInt(dateMatch[2]) - 1,
      parseInt(dateMatch[3])
    );
  }

  for (const pattern of LOCATION_PATTERNS) {
    const match = post.content.match(pattern);
    if (match) {
      announcement.location = match[1].trim();
      break;
    }
  }

  return announcement;
}

function determineCategory(hashtags: string[]): 'event' | 'news' | 'workshop' {
  const lowerHashtags = hashtags.map(tag => tag.toLowerCase());

  if (lowerHashtags.some(tag =>
    CATEGORY_KEYWORDS.workshop.some(keyword => tag.includes(keyword.toLowerCase()))
  )) {
    return ANNOUNCEMENT_CONFIG.CATEGORIES.WORKSHOP;
  }

  if (lowerHashtags.some(tag =>
    CATEGORY_KEYWORDS.event.some(keyword => tag.includes(keyword.toLowerCase()))
  )) {
    return ANNOUNCEMENT_CONFIG.CATEGORIES.EVENT;
  }

  return ANNOUNCEMENT_CONFIG.CATEGORIES.NEWS;
}

export function generateSlug(post: AnnouncementPost): string {
  const baseSlug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const pubDate = post.pubDate instanceof Date ? post.pubDate : new Date(post.pubDate);
  const eventDate = post.eventDate instanceof Date ? post.eventDate : post.eventDate ? new Date(post.eventDate) : null;

  const dateStr = eventDate
    ? `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`
    : `${pubDate.getFullYear()}-${String(pubDate.getMonth() + 1).padStart(2, '0')}`;

  return `${dateStr}-${baseSlug}`.slice(0, ANNOUNCEMENT_CONFIG.SLUG_MAX_LENGTH);
}
