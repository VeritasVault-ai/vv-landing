import { test, expect } from '@playwright/test';

test('user can log in with valid credentials', async ({ page }) => {
  // Go to the login page (adjust if your route is different)
  await page.goto('/auth/login');

  // Fill in the login form
  await page.fill('input#email', 'testuser@example.com');
  await page.fill('input#password', 'testpassword123');

  // Click the login button
  await page.click('button[type="submit"]:has-text("Log in")');

  // Wait for navigation or dashboard content
  await expect(page).toHaveURL(/dashboard|home|portfolio/i);

  // Assert dashboard or user greeting is visible
  await expect(
    page.locator('text=Dashboard, text=Welcome, text=Portfolio')
  ).toBeVisible();
}); 