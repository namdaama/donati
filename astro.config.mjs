import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://donati-science.jp',
  integrations: [tailwind()],
  output: 'static',
});