import type { InstagramPost, AnnouncementPost } from '../types/instagram';

export function filterAnnouncementPosts(
  posts: InstagramPost[], 
  announcementHashtag: string
): AnnouncementPost[] {
  return posts
    .filter(post => post.hashtags.includes(announcementHashtag))
    .map(post => parseAnnouncementPost(post));
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
  const locationPatterns = [
    /場所[:：]\s*([^\n]+)/,
    /会場[:：]\s*([^\n]+)/,
    /開催地[:：]\s*([^\n]+)/,
    /📍\s*([^\n]+)/
  ];
  
  for (const pattern of locationPatterns) {
    const match = post.content.match(pattern);
    if (match) {
      announcement.location = match[1].trim();
      break;
    }
  }

  return announcement;
}

function determineCategory(hashtags: string[]): 'event' | 'news' | 'workshop' {
  if (hashtags.some(tag => tag.includes('workshop') || tag.includes('ワークショップ'))) {
    return 'workshop';
  }
  if (hashtags.some(tag => tag.includes('event') || tag.includes('イベント'))) {
    return 'event';
  }
  return 'news';
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
  
  return `${dateStr}-${baseSlug}`.slice(0, 50);
}