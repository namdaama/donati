import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: import.meta.env.MICROCMS_API_KEY || '',
});

export type News = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category: string;
  excerpt: string;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
};

export type Achievement = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  date: string;
  location?: string;
  description: string;
  image?: {
    url: string;
    height: number;
    width: number;
  };
};