// Disable SSR globally: Срокник is a local-first SPA. User data lives in
// IndexedDB, which is not available on the server. adapter-static + ssr=false
// produces a clean SPA build for Cloudflare Pages.
export const ssr = false;
export const prerender = true;
export const trailingSlash = 'never';
