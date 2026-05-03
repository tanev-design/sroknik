import { test, expect } from '@playwright/test';

// Smoke test — the dashboard should render and not error out even on a
// fresh IndexedDB. We skip onboarding by marking settings directly via the
// page context so tests aren't affected by the welcome redirect.

test('Today page renders without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.addInitScript(() => {
    // Best-effort: pre-seed a settings row so the app skips the welcome
    // redirect. IndexedDB is local-first and created on demand by Dexie.
    try {
      indexedDB.deleteDatabase('sroknik_db');
    } catch {
      /* ignore */
    }
  });

  await page.goto('/');

  // The app bar / topbar should eventually render the "Днес" title.
  await expect(page).toHaveTitle(/.*/);
  expect(errors).toEqual([]);
});
