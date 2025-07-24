import type { InstagramPost } from '../types/instagram';
import { fetchInstagramPosts } from './instagram-rss';

/**
 * 複数のソースから投稿を取得し、重複を除去してマージ
 */
export async function fetchInstagramPostsFromMultipleSources(
  sources: string[]
): Promise<InstagramPost[]> {
  console.log(`複数のソース（${sources.length}個）から投稿を取得中...`);
  
  // 並列で全ソースから取得
  const allPostsArrays = await Promise.all(
    sources.map(async (source, index) => {
      try {
        console.log(`ソース${index + 1}: ${source} から取得中...`);
        const posts = await fetchInstagramPosts(source);
        console.log(`ソース${index + 1}: ${posts.length}件の投稿を取得`);
        return posts;
      } catch (error) {
        console.error(`ソース${index + 1}の取得に失敗:`, error);
        return [];
      }
    })
  );
  
  // フラット化
  const allPosts = allPostsArrays.flat();
  console.log(`合計${allPosts.length}件の投稿を取得（重複含む）`);
  
  // 重複除去（IDまたはリンクで判定）
  const uniquePosts = deduplicatePosts(allPosts);
  console.log(`重複除去後: ${uniquePosts.length}件の投稿`);
  
  // 日付順でソート（新しい順）
  return uniquePosts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}

/**
 * 投稿の重複を除去
 */
function deduplicatePosts(posts: InstagramPost[]): InstagramPost[] {
  const seen = new Map<string, InstagramPost>();
  
  for (const post of posts) {
    const key = post.id || post.link;
    if (!seen.has(key)) {
      seen.set(key, post);
    }
  }
  
  return Array.from(seen.values());
}

/**
 * キャッシュから過去の投稿を読み込み
 */
export async function loadCachedPosts(cachePath: string): Promise<InstagramPost[]> {
  try {
    const response = await fetch(cachePath);
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.posts.map((post: any) => ({
      ...post,
      pubDate: new Date(post.pubDate)
    }));
  } catch (error) {
    console.error('キャッシュの読み込みに失敗:', error);
    return [];
  }
}

/**
 * 現在の投稿をキャッシュに保存
 */
export async function saveCachePosts(
  posts: InstagramPost[],
  maxPosts = 50
): Promise<void> {
  const cachePosts = posts.slice(0, maxPosts);
  const cacheData = {
    lastUpdated: new Date().toISOString(),
    posts: cachePosts
  };
  
  // 実際の実装では、ファイルシステムやデータベースに保存
  console.log(`${cachePosts.length}件の投稿をキャッシュに保存`);
}