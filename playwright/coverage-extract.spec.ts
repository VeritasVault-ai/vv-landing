import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('extract browser coverage after E2E', async ({ page }) => {
  // Try to get coverage from the window object
  const coverage = await page.evaluate(() => window.__coverage__);
  if (coverage) {
    const outDir = path.resolve('coverage');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    fs.writeFileSync(path.join(outDir, 'coverage-e2e.json'), JSON.stringify(coverage));
  } else {
    console.warn('No coverage found on window.__coverage__');
  }
}); 