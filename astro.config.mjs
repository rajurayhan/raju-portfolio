// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// Set PUBLIC_SITE_URL in .env to your real domain in production.
// See https://docs.astro.build/en/reference/configuration-reference/#site
const site = process.env.PUBLIC_SITE_URL || 'https://rajurayhan.github.io/raju-portfolio';

// https://astro.build/config
export default defineConfig({
  site,
  adapter: cloudflare(),
  integrations: [vue(), mdx()],
});
