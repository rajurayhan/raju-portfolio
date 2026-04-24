/** Default site label and images — override per page via PortfolioLayout props */
export const SITE_NAME = 'Raju Rayhan';
/** Shown in `<title>`, `og:title`, and JSON-LD where pages use defaults */
export const ROLE_IN_TITLE = 'Head of Development @ Sulus.ai';
export const DEFAULT_TITLE = `Raju Rayhan — ${ROLE_IN_TITLE}`;
export const DEFAULT_DESCRIPTION = `${ROLE_IN_TITLE}. I architect production software: AI voice, SaaS, RAG, automation. 10+ years. Engineering lead, remote, Dhaka, Bangladesh.`;
export const DEFAULT_OG_IMAGE = '/me-headshot.png';
export const LOCALE = 'en_US';
export const THEME_COLOR = '#f2ece1';
export const GITHUB_URL = 'https://github.com/rajurayhan/raju-portfolio';

/**
 * Resolves a site-root path to an absolute URL. Uses full `site` (including
 * subpaths like `https://user.github.io/repo/`) so GitHub Project Pages
 * and custom bases resolve correctly — not `site.origin` alone.
 */
export function toAbsoluteImageUrl(
  pathOrUrl: string,
  site: URL | undefined,
  requestUrl: URL
): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const rel = pathOrUrl.startsWith('/') ? pathOrUrl.slice(1) : pathOrUrl;
  const base = site
    ? site.href.endsWith('/')
      ? site.href
      : `${site.href}/`
    : `${requestUrl.origin}/`;
  return new URL(rel, base).href;
}

/**
 * Canonical page URL; same subpath rules as `toAbsoluteImageUrl`.
 */
export function toCanonicalUrl(site: URL | undefined, requestUrl: URL): string {
  if (!site) {
    return requestUrl.href;
  }
  const base = site.href.endsWith('/') ? site.href : `${site.href}/`;
  const path = requestUrl.pathname + requestUrl.search;
  if (path === '/' || path === '') {
    return new URL('./', base).href;
  }
  const rel = path.startsWith('/') ? path.slice(1) : path;
  return new URL(rel, base).href;
}
