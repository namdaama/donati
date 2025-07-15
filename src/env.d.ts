/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  // 秘密情報（サーバー側のみ）
  readonly MICROCMS_SERVICE_DOMAIN: string;
  readonly MICROCMS_API_KEY: string;
  
  // 公開情報（クライアント側でも使用可能）
  readonly PUBLIC_INSTAGRAM_URL?: string;
  readonly PUBLIC_GOOGLE_FORM_ID?: string;
  readonly PUBLIC_TWITTER_URL?: string;
  readonly PUBLIC_FACEBOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}