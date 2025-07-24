import Parser from 'rss-parser';
import type { InstagramPost } from '../types/instagram';
import { RSS_CONFIG } from '../config/constants';
import { sanitizeXml, isValidRssFeed } from './utils/xml-sanitizer';
import { ImageExtractorChain } from './utils/image-extractor';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: true }],
      ['description', 'description'],
    ]
  }
});

const imageExtractor = new ImageExtractorChain();

export async function fetchInstagramPosts(rssUrl: string): Promise<InstagramPost[]> {
  try {
    const response = await fetch(rssUrl);
    
    if (!response.ok) {
      console.error(`RSS feed returned status ${response.status}`);
      return [];
    }
    
    const xmlText = await response.text();
    
    if (!isValidRssFeed(xmlText)) {
      console.error('Response does not appear to be an RSS/Atom feed');
      console.log(`First ${RSS_CONFIG.XML_PREVIEW_LENGTH} characters:`, xmlText.substring(0, RSS_CONFIG.XML_PREVIEW_LENGTH));
      return [];
    }
    
    const sanitizedXml = sanitizeXml(xmlText);
    const feed = await parser.parseString(sanitizedXml);
    
    return feed.items.map((item) => ({
      id: item.guid || item.link || '',
      title: item.title || extractFirstLine(item.content || ''),
      content: cleanContent(item.content || item.description || ''),
      imageUrl: imageExtractor.extract(item),
      link: item.link || '',
      pubDate: new Date(item.pubDate || item.isoDate || ''),
      hashtags: extractHashtags(item.content || item.description || ''),
    }));
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