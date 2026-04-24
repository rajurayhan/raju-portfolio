// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// Production URL (Open Graph, canonical). Override in .env for preview/staging.
// See https://docs.astro.build/en/reference/configuration-reference/#site
const site = process.env.PUBLIC_SITE_URL || 'https://rajurayhan.com';

// https://astro.build/config
export default defineConfig({
  site,
  adapter: cloudflare(),
  integrations: [vue(), mdx()],
});