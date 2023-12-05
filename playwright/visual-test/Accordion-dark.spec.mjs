// @flow strict
import { expect, test } from '@playwright/test';

test('Accordion dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Accordion-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Accordion-dark.png');
});
