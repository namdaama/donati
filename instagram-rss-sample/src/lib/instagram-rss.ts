import Parser from 'rss-parser';
import type { InstagramPost } from '../types/instagram';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: true }],
      ['description', 'description'],
    ]
  }
});

export async function fetchInstagramPosts(rssUrl: string): Promise<InstagramPost[]> {
  try {
    const feed = await parser.parseURL(rssUrl);
    
    return feed.items.map((item) => {
      // Extract hashtags from content
      const hashtags = extractHashtags(item.content || item.description || '');
      
      // Extract image URL
      let imageUrl = '';
      if (item.mediaContent && item.mediaContent[0]) {
        imageUrl = item.mediaContent[0].$.url;
      } else if (item.enclosure) {
        imageUrl = item.enclosure.url;
      } else {
        // Try to extract from content HTML
        const imgMatch = (item.content || '').match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) {
          imageUrl = imgMatch[1];
        }
      }

      return {
        id: item.guid || item.link || '',
        title: item.title || extractFirstLine(item.content || ''),
        content: cleanContent(item.content || item.description || ''),
        imageUrl,
        link: item.link || '',
        pubDate: new Date(item.pubDate || item.isoDate || ''),
        hashtags,
      };
    });
  } catch (error) {
    console.error('Error fetching Instagram RSS:', error);
    return [];
  }
}

function extractHashtags(text: string): string[] {
  const hashtagRegex = /#[^\s#]+/g;
  const matches = text.match(hashtagRegex);
  return matches ? matches : [];
}

function extractFirstLine(text: string): string {
  const cleanText = text.replace(/<[^>]*>/g, '');
  const lines = cleanText.split('\n');
  return lines[0]?.trim() || 'Instagram Post';
}

function cleanContent(html: string): string {
  // Remove HTML tags but keep line breaks
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .trim();
}