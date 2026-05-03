import { defineConfig, devices } from '@playwright/test';

// Срокник E2E — smoke coverage for the license activation flow and the
// critical onboarding path. Keep this config minimal so CI stays fast.
//
// Run locally:
//   npx playwright install chromium   # first time only
//   npm run test:e2e

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    // Use the production preview server — adapter-static output matches
    // what Cloudflare Pages serves, and it's faster than the dev server.
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
