import { test, expect } from '@playwright/test';

test.describe('P3-P7 wiring smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'sroknik.consent.v1',
        JSON.stringify({
          necessary: true,
          analytics: false,
          marketing: false,
          ts: new Date().toISOString(),
          version: 1
        })
      );
    });
  });

  test('global login opens the custom /login route on mobile and desktop', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/deadlines');
    await page.getByRole('link', { name: /вход/i }).first().click();
    await expect(page).toHaveURL(/\/login\?next=/);
    await expect(page.getByRole('heading', { name: /вход/i })).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/deadlines');
    await page.getByRole('link', { name: /вход/i }).first().click();
    await expect(page).toHaveURL(/\/login\?next=/);
  });

  test('welcome plan card copy no longer shows soon badge or zero price', async ({ page }) => {
    await page.goto('/welcome');
    await expect(page.getByRole('heading', { name: /Два плана\. Ясен избор\./ })).toBeVisible();
    await expect(page.getByText('0 лв.')).toHaveCount(0);
    await expect(page.getByText('Скоро')).toHaveCount(0);
    await page.getByRole('button', { name: /Влез или създай профил/i }).first().click();
    await expect(page).toHaveURL(/\/login\?next=/);
  });

  test('policy links, cookie settings and support mail form are wired', async ({ page }) => {
    await page.goto('/legal');
    await expect(page.getByRole('navigation', { name: /съдържание/i })).toBeVisible();
    await page.getByRole('link', { name: /Контакт/i }).first().click();
    await expect(page).toHaveURL(/\/support/);
    await expect(page.locator('form[action="mailto:support@sroknik.com"]')).toBeVisible();

    await page.goto('/cookies');
    await expect(page.getByRole('heading', { name: /Политика за cookies/i })).toBeVisible();
    await page.getByRole('switch', { name: /Аналитика/i }).click();
    await page.getByRole('button', { name: /Запази избора/i }).click();
    const consent = await page.evaluate(() => localStorage.getItem('sroknik.consent.v1'));
    expect(consent).toContain('"analytics":true');
  });

  test('today quick cards still open the add sheet with a selected category', async ({ page }) => {
    await page.goto('/welcome');
    await page.getByRole('button', { name: /Към таблото/i }).click();
    await page.waitForURL('**/');
    await expect(page.getByRole('button', { name: /^Винетка$/ })).toBeVisible();
    await page.getByRole('button', { name: /^Винетка$/ }).click();
    await expect(page.getByRole('heading', { name: /Нов срок/i })).toBeVisible();
    await expect(page.getByLabel(/Заглавие/i)).toHaveValue('Винетка');
  });
});
