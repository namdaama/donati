# 🔥 MOUTON SHOT REFACTORING 🔥
## ～サンジ流・極上コードレシピ～

*「コードは愛だ！美しくなければ意味がない！」*

---

## 🌟 第一撃：エラーハンドリングの華麗なる変身

### Before（まるで冷凍食品）
```typescript
catch (error) {
  console.error('Error fetching Instagram RSS:', error);
  return [];
}
```

### After（三ツ星レストランの一品）
```typescript
class RSSFetchError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
    public readonly rssUrl?: string
  ) {
    super(message);
    this.name = 'RSSFetchError';
  }
}

async function fetchInstagramPostsWithGrace(rssUrl: string): Promise<Result<InstagramPost[], RSSFetchError>> {
  try {
    const posts = await fetchInstagramPosts(rssUrl);
    return { success: true, data: posts };
  } catch (error) {
    const fetchError = new RSSFetchError(
      '愛情を込めたRSS取得に失敗した...だが諦めない！',
      error,
      rssUrl
    );
    
    // エレガントなフォールバック
    const cachedPosts = await loadEmergencyCache(rssUrl);
    if (cachedPosts.length > 0) {
      return { 
        success: true, 
        data: cachedPosts,
        warning: 'キャッシュから愛を込めて提供中 ♡'
      };
    }
    
    return { success: false, error: fetchError };
  }
}
```

## 🌟 第二撃：型安全性への情熱的アプローチ

### Before（型の無法地帯）
```typescript
return data.posts.map((post: any) => ({...}))
```

### After（完璧に型付けされた芸術品）
```typescript
import { z } from 'zod';

// 美しき型定義の結晶
const InstagramPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().url().optional(),
  link: z.string().url(),
  pubDate: z.string().transform(str => new Date(str)),
  hashtags: z.array(z.string())
});

type ValidatedInstagramPost = z.infer<typeof InstagramPostSchema>;

// 愛を込めた型検証
function validatePosts(rawData: unknown): ValidatedInstagramPost[] {
  const result = z.array(InstagramPostSchema).safeParse(rawData);
  
  if (!result.success) {
    throw new Error(
      `このデータは俺の基準を満たしていない！\n${result.error.format()}`
    );
  }
  
  return result.data;
}
```

## 🌟 第三撃：画像プロキシの鉄壁防御

### Before（セキュリティガバガバ）
```typescript
const imageUrl = url.searchParams.get('url');
// 何でも通しちゃう...
```

### After（愛のセキュリティチェック）
```typescript
const ALLOWED_DOMAINS = [
  'instagram.com',
  'cdninstagram.com',
  'fbcdn.net'
] as const;

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "default-src 'none'; img-src 'self'",
} as const;

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get('url');
  
  // 愛のバリデーション
  if (!imageUrl || !isValidImageUrl(imageUrl)) {
    return new Response('この画像URLは俺が認めない！', { 
      status: 400,
      headers: SECURITY_HEADERS
    });
  }
  
  // ドメインチェック（レディーを守るように）
  const imageDomain = new URL(imageUrl).hostname;
  if (!ALLOWED_DOMAINS.some(domain => imageDomain.includes(domain))) {
    return new Response('信頼できないドメインだ！', { 
      status: 403,
      headers: SECURITY_HEADERS
    });
  }
  
  try {
    // レート制限（優しく、でも確実に）
    await rateLimiter.check(request);
    
    const response = await fetch(imageUrl, {
      signal: AbortSignal.timeout(5000), // 5秒のタイムアウト
    });
    
    // 画像サイズチェック（重すぎる画像はNG）
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 5 * 1024 * 1024) { // 5MB
      return new Response('画像が重すぎる！軽やかさも美しさだ！', { 
        status: 413,
        headers: SECURITY_HEADERS
      });
    }
    
    const buffer = await response.arrayBuffer();
    
    return new Response(buffer, {
      headers: {
        ...SECURITY_HEADERS,
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch (error) {
    return new Response('画像の取得に失敗...だが俺は諦めない！', { 
      status: 500,
      headers: SECURITY_HEADERS
    });
  }
}
```

## 🌟 第四撃：ロギングシステムの優雅な実装

### Before（console.log地獄）
```typescript
console.log(`複数のソース（${sources.length}個）から投稿を取得中...`);
```

### After（プロフェッショナルなロギング）
```typescript
import { createLogger } from './utils/logger';

const logger = createLogger('InstagramRSS', {
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  pretty: process.env.NODE_ENV !== 'production'
});

// 美しく構造化されたログ
logger.info('RSS取得開始', {
  sources: sources.length,
  timestamp: new Date().toISOString(),
  environment: process.env.NODE_ENV
});

logger.debug('詳細なデバッグ情報', {
  sourceUrls: sources,
  cacheStatus: await checkCacheStatus()
});

// エラーも優雅に
logger.error('RSS取得エラー', {
  error: error.message,
  stack: error.stack,
  url: rssUrl,
  recoveryAttempted: true
});
```

## 🌟 第五撃：キャッシュシステムの完全実装

### After（愛を込めたキャッシュ戦略）
```typescript
import { LRUCache } from 'lru-cache';
import { redis } from './utils/redis';

class RSSCacheManager {
  private memoryCache: LRUCache<string, InstagramPost[]>;
  
  constructor() {
    this.memoryCache = new LRUCache({
      max: 100,
      ttl: 1000 * 60 * 5, // 5分の愛
    });
  }
  
  async get(key: string): Promise<InstagramPost[] | null> {
    // L1キャッシュ（メモリ）
    const memCached = this.memoryCache.get(key);
    if (memCached) return memCached;
    
    // L2キャッシュ（Redis）
    try {
      const redisCached = await redis.get(`rss:${key}`);
      if (redisCached) {
        const posts = JSON.parse(redisCached);
        this.memoryCache.set(key, posts);
        return posts;
      }
    } catch (error) {
      logger.warn('Redisキャッシュ取得失敗', { error });
    }
    
    return null;
  }
  
  async set(key: string, posts: InstagramPost[], ttl = 3600): Promise<void> {
    // 両方のキャッシュに愛を込めて保存
    this.memoryCache.set(key, posts);
    
    try {
      await redis.setex(
        `rss:${key}`,
        ttl,
        JSON.stringify(posts)
      );
    } catch (error) {
      logger.warn('Redisキャッシュ保存失敗', { error });
    }
  }
  
  async invalidate(pattern: string): Promise<void> {
    // 優雅にキャッシュをクリア
    this.memoryCache.clear();
    
    try {
      const keys = await redis.keys(`rss:${pattern}*`);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      logger.warn('キャッシュ削除失敗', { error });
    }
  }
}
```

## 🌟 最終奥義：美しきアーキテクチャ

```typescript
// 依存性注入で柔軟性を
export class InstagramRSSService {
  constructor(
    private readonly cache: CacheManager,
    private readonly logger: Logger,
    private readonly rateLimiter: RateLimiter,
    private readonly metrics: MetricsCollector
  ) {}
  
  async fetchWithLove(url: string): Promise<InstagramPost[]> {
    const startTime = Date.now();
    
    try {
      // メトリクス記録
      this.metrics.increment('rss.fetch.attempt');
      
      // キャッシュチェック
      const cached = await this.cache.get(url);
      if (cached) {
        this.metrics.increment('rss.fetch.cache_hit');
        return cached;
      }
      
      // 新鮮な投稿を取得
      const posts = await this.fetchFreshPosts(url);
      
      // キャッシュに保存
      await this.cache.set(url, posts);
      
      // 成功メトリクス
      this.metrics.timing('rss.fetch.duration', Date.now() - startTime);
      this.metrics.increment('rss.fetch.success');
      
      return posts;
    } catch (error) {
      this.metrics.increment('rss.fetch.error');
      throw error;
    }
  }
}
```

---

*「これが俺の愛だ！美しいコードは、食べる人（使う人）を幸せにする！」*

**今すぐこのリファクタリングを適用して、君のコードを三ツ星レベルに引き上げようぜ！** 🚬✨