# Raju Rayhan — Portfolio

Personal portfolio site: [Astro](https://astro.build/) (static pages + server route for contact), Vue islands, MDX-ready, deployed with the [Cloudflare adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/).

**Repository:** [github.com/rajurayhan/raju-portfolio](https://github.com/rajurayhan/raju-portfolio) · **Site:** [rajurayhan.com](https://rajurayhan.com) (Cloudflare)

## Requirements

- **Node.js** 20+ (recommended; matches current LTS)

## Quick start

```bash
git clone https://github.com/rajurayhan/raju-portfolio.git
cd raju-portfolio
npm install
cp .env.example .env
```

Edit `.env` with your values (see below), then:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Scripts

| Command | Description |
|--------|---------------|
| `npm run dev` | Local dev server (hot reload) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the static `dist/` with Wrangler (Cloudflare Pages–like) |

## Environment variables

Copy `.env.example` to `.env`. Nothing in `.env` is required for **local browsing**; the contact API and canonical URLs need configuration for production.

| Variable | Purpose |
|----------|---------|
| `PUBLIC_SITE_URL` | Public site URL for `site` in `astro.config.mjs` (canonical links, Open Graph, e.g. `https://rajurayhan.com/me-headshot.png`). Defaults to `https://rajurayhan.com` if unset. Set for staging, or a subpath if the site is not at the domain root. |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key — **required** for `POST /api/contact` to send email. |
| `CONTACT_TO_EMAIL` | Inbox for contact form submissions. |
| `CONTACT_FROM_EMAIL` | `From` address; must be allowed in your Resend domain or use their sandbox sender for tests. |

## Features (at a glance)

- **Contact form** — Server API route (`src/pages/api/contact.ts`) using Resend. Outbound messages include a **branded HTML body** (inline styles, portfolio colors) and a plain-text fallback, built in `src/lib/contactEmailTemplate.ts`.
- **Theme** — Day / night stored as `raju-theme` in `localStorage`, applied to `html[data-theme]`.
- **SEO / social** — Per-page titles and descriptions, Open Graph, Twitter cards, canonical URLs, and JSON-LD via `src/layouts/PortfolioLayout.astro` and `src/constants/siteMeta.ts`.

## Project layout

- `src/pages/` — Routes (home, work, case studies, about, contact) and `api/contact`.
- `src/layouts/` — Shared HTML shell and meta tags.
- `src/components/` — Astro and Vue components.
- `src/styles/portfolio.css` — Global styles.
- `public/` — Static assets (favicon, images) served from `/`.

## Deploying

1. For production, `PUBLIC_SITE_URL` can stay unset; the build defaults to `https://rajurayhan.com`. Staging: set it explicitly before `npm run build` so meta tags match the preview URL.
2. Configure the same Resend-related variables on the host if the contact form should work in production.
3. Build output is **`dist/`**; the project targets **Cloudflare Pages** (see `astro.config.mjs` and `@astrojs/cloudflare`). Adjust the adapter or host if you use another platform.

After changing domains, re-validate social previews (e.g. Facebook Sharing Debugger, X card preview) so caches refresh.
