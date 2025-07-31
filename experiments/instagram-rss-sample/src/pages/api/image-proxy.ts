export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get('url');
  
  if (!imageUrl) {
    return new Response('Missing image URL', { status: 400 });
  }
  
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    
    return new Response(buffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400', // 24時間キャッシュ
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response('Failed to fetch image', { status: 500 });
  }
}