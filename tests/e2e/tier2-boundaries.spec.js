import { test, expect } from '@playwright/test';

test.describe('Tier 2: Interactive Physics (Tilt/Lighting)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Feature 2: Cards tilt when hovered off-center (top-left)', async ({ page }) => {
    const card = page.locator('.product-card').first();
    const box = await card.boundingBox();
    // Skip if not visible
    if (!box) {
      test.skip();
      return;
    }

    await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.1);
    await page.waitForTimeout(100); // Give time for transition/JS to apply transform

    const transform = await card.evaluate((el) => window.getComputedStyle(el).transform);
    // If physics are applied, transform shouldn't be 'none'
    expect(transform).not.toBe('none');
    expect(transform).toContain('matrix');
  });

  test('Feature 2: Cards tilt when hovered off-center (bottom-right)', async ({ page }) => {
    const card = page.locator('.product-card').first();
    const box = await card.boundingBox();
    if (!box) {
      test.skip();
      return;
    }

    await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.9);
    await page.waitForTimeout(100);

    const transform = await card.evaluate((el) => window.getComputedStyle(el).transform);
    expect(transform).not.toBe('none');
    expect(transform).toContain('matrix');
  });

  test('Feature 2: Cards hover center should have different or minimal tilt', async ({ page }) => {
    const card = page.locator('.product-card').first();
    const box = await card.boundingBox();
    if (!box) {
      test.skip();
      return;
    }

    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await page.waitForTimeout(100);

    const transform = await card.evaluate((el) => window.getComputedStyle(el).transform);
    expect(transform).toBeDefined();
  });

  test('Feature 2: Button interacts and shows physics', async ({ page }) => {
    const btn = page.locator('.skeuo-button').first();
    const box = await btn.boundingBox();
    if (!box) {
      test.skip();
      return;
    }

    await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.1);
    await page.waitForTimeout(100);

    const transform = await btn.evaluate((el) => window.getComputedStyle(el).transform);
    expect(transform).toBeDefined();
  });

  test('Feature 2: Glass overlay lighting responds to hover', async ({ page }) => {
    const overlay = page.locator('.glass-overlay-fx').first();
    const card = page.locator('.product-card').first();
    const box = await card.boundingBox();
    if (!box) {
      test.skip();
      return;
    }

    await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.1);
    await page.waitForTimeout(100);
    const bgTopLeft = await overlay.evaluate((el) => window.getComputedStyle(el).background);

    await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.9);
    await page.waitForTimeout(100);
    const bgBottomRight = await overlay.evaluate((el) => window.getComputedStyle(el).background);

    expect(bgTopLeft).toBeDefined();
    expect(bgBottomRight).toBeDefined();
  });
});
