import { test, expect } from '@playwright/test';

test.describe('/plus page', () => {
  test('renders the comparison table and activation form when not activated', async ({
    page
  }) => {
    await page.goto('/plus');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByTestId('plus-key-input')).toBeVisible();
    await expect(page.getByTestId('plus-activate-button')).toBeVisible();
  });

  test('rejects an obviously malformed license key on the client', async ({ page }) => {
    await page.goto('/plus');
    await page.getByTestId('plus-key-input').fill('NOT-A-VALID-KEY');
    await page.getByTestId('plus-activate-button').click();

    // The client-side regex prevents the request; the message comes from the
    // Bulgarian copy (`plusV2.activateErrors.invalidFormat`).
    await expect(page.getByText(/SRKN-XXXX-XXXX-XXXX-XXXX/i)).toBeVisible();
  });
});
