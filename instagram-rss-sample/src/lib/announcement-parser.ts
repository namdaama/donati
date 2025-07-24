import type { InstagramPost, AnnouncementPost } from '../types/instagram';
import { ANNOUNCEMENT_CONFIG, LOCATION_PATTERNS, CATEGORY_KEYWORDS } from '../config/constants';

export function filterAnnouncementPosts(
  posts: InstagramPost[], 
  announcementHashtag: string
): AnnouncementPost[] {
  console.log(`フィルタリング前の投稿数: ${posts.length}`);
  console.log(`検索するハッシュタグ: ${announcementHashtag}`);
  
  const filtered = posts.filter(post => {
    const hasTag = post.hashtags.includes(announcementHashtag);
    if (!hasTag) {
      // 部分一致も確認
      const partialMatch = post.hashtags.some(tag => 
        tag.toLowerCase().includes(announcementHashtag.toLowerCase().replace('#', ''))
      );
      if (partialMatch) {
        console.log(`部分一致で見つかった投稿: ${post.title}, タグ: ${post.hashtags.join(', ')}`);
      }
    }
    return hasTag;
  });
  
  console.log(`フィルタリング後の投稿数: ${filtered.length}`);
  return filtered.map(post => parseAnnouncementPost(post));
}

function parseAnnouncementPost(post: InstagramPost): AnnouncementPost {
  const announcement: AnnouncementPost = {
    ...post,
    category: determineCategory(post.hashtags),
  };

  // Extract event date from content
  const dateMatch = post.content.match(/(\d{4})[年\/](\d{1,2})[月\/](\d{1,2})日?/);
  if (dateMatch) {
    announcement.eventDate = new Date(
      parseInt(dateMatch[1]), 
      parseInt(dateMatch[2]) - 1, 
      parseInt(dateMatch[3])
    );
  }

  // Extract location
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
  // Generate URL-friendly slug from title or date
  const baseSlug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const dateStr = post.eventDate 
    ? `${post.eventDate.getFullYear()}-${String(post.eventDate.getMonth() + 1).padStart(2, '0')}`
    : `${post.pubDate.getFullYear()}-${String(post.pubDate.getMonth() + 1).padStart(2, '0')}`;
  
  return `${dateStr}-${baseSlug}`.slice(0, ANNOUNCEMENT_CONFIG.SLUG_MAX_LENGTH);
}