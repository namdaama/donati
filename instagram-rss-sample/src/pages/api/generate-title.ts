import type { APIRoute } from 'astro';
import { generateTitleFromContent } from '../../lib/title-generator';

/**
 * タイトル生成API
 * POST /api/generate-title
 * Body: { content: string }
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const { content } = await request.json();
    
    if (!content || typeof content !== 'string') {
      return new Response(JSON.stringify({ error: 'Content is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const title = await generateTitleFromContent(content);
    
    return new Response(JSON.stringify({ title }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // 1時間キャッシュ
      }
    });
  } catch (error) {
    console.error('Title generation error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate title' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};