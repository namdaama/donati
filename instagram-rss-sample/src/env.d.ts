/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly INSTAGRAM_RSS_URL: string;
  readonly ANNOUNCEMENT_HASHTAG: string;
  readonly ENABLE_HASHTAG_FILTER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}