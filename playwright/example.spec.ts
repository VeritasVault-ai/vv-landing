import { expect, test } from '@playwright/test';

test('homepage loads and displays expected content', async ({ page }) => {
  await page.goto('/');
  // Adjust the selector/text below to match your actual homepage
  await expect(page).toHaveTitle(/veritas|vault|dashboard|landing/i);
  // Example: check for a hero section or main heading
  await expect(page.locator('h1, h2, [data-testid="hero"]')).toHaveCount(1);
});
