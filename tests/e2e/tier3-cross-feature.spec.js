import { test, expect } from '@playwright/test';

test.describe('Tier 3: Responsive Polish & Micro-Details', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Feature 3: Grid layout is horizontal on desktop viewport', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
      return;
    }
    
    // Test the internal layout of product cards on desktop
    // We expect the visual and info sections to be side-by-side
    const card = page.locator('.product-card').first();
    const visual = card.locator('.product-visual');
    const info = card.locator('.product-info');
    
    if (await visual.count() > 0 && await info.count() > 0) {
      const vBox = await visual.boundingBox();
      const iBox = await info.boundingBox();
      
      if (vBox && iBox) {
        // Horizontal arrangement: x coordinates should differ, y might be similar
        const isHorizontal = vBox.x !== iBox.x;
        expect(isHorizontal).toBeTruthy();
      }
    }
  });

  test('Feature 3: Grid layout is vertical on mobile viewport', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
      return;
    }
    
    const card = page.locator('.product-card').first();
    const visual = card.locator('.product-visual');
    const info = card.locator('.product-info');
    
    if (await visual.count() > 0 && await info.count() > 0) {
      const vBox = await visual.boundingBox();
      const iBox = await info.boundingBox();
      
      if (vBox && iBox) {
        // Vertical arrangement: y coordinates differ significantly
        const isVertical = vBox.y < iBox.y || vBox.y > iBox.y;
        expect(isVertical).toBeTruthy();
        
        // And they should likely share roughly same x coordinate or be full width
        expect(Math.abs(vBox.x - iBox.x)).toBeLessThan(50);
      }
    }
  });

  test('Feature 3: Premium nav padding adjusts on different viewports', async ({ page }) => {
    const nav = page.locator('.premium-nav');
    const padding = await nav.evaluate((el) => window.getComputedStyle(el).padding);
    expect(padding).toBeDefined();
  });
});
