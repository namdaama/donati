/**
 * 🔥 キャッシュシステム - エクスポート
 */

export { CacheManager, InstagramPostCacheManager } from './cache-manager';
export type { CacheConfig, CacheStats, CacheEntry } from './cache-manager';

export { FileCache } from './file-cache';
export type { FileCacheConfig } from './file-cache';

export { MultiTierCache, createInstagramPostCache } from './multi-tier-cache';
export type { MultiTierCacheConfig } from './multi-tier-cache';

// デフォルトのキャッシュインスタンス
import { createInstagramPostCache } from './multi-tier-cache';

export const defaultCache = createInstagramPostCache();