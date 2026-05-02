import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // Static adapter — deploys cleanly to Cloudflare Pages without Workers.
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // SPA fallback so all routes resolve client-side
      precompress: false,
      strict: false
    }),
    alias: {
      $lib: 'src/lib'
    }
  }
};

export default config;
