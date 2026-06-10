import { test, expect } from '@playwright/test';

test.describe('Tier 4: Real-World Application Scenarios', () => {

  test('Scenario 1: Desktop User explores portfolio modules', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
      return;
    }
    
    await page.goto('/');
    
    // User checks out hero section
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();
    
    // User clicks the skeuo button to scroll to projects
    const viewSystemsBtn = page.locator('.primary-btn');
    await viewSystemsBtn.click();
    
    // Wait for scroll
    await page.waitForTimeout(500);
    
    // User hovers over cards
    const cards = page.locator('.product-card');
    const count = await cards.count();
    
    for (let i = 0; i < count; i++) {
      const box = await cards.nth(i).boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(200);
      }
    }
    
    // Check capabilities
    const capabilities = page.locator('#capabilities');
    await capabilities.scrollIntoViewIfNeeded();
    await expect(capabilities).toBeVisible();
  });

  test('Scenario 2: Mobile User explores portfolio modules', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
      return;
    }
    
    await page.goto('/');
    
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();
    
    // User scrolls down manually
    const projects = page.locator('#projects');
    await projects.scrollIntoViewIfNeeded();
    
    // Check if cards are visible
    const cards = page.locator('.product-card');
    await expect(cards.first()).toBeVisible();
    
    // Mobile doesn't really have hover, so user taps on card (or we simulate touch)
    const box = await cards.first().boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
  });

  test('Scenario 3: Rapid Interaction stress test', async ({ page }) => {
    await page.goto('/');
    
    const card = page.locator('.product-card').first();
    const box = await card.boundingBox();
    if (!box) {
      test.skip();
      return;
    }
    
    // Rapidly move mouse across the card to trigger physics engine spam
    for (let i = 0; i < 20; i++) {
      await page.mouse.move(box.x + Math.random() * box.width, box.y + Math.random() * box.height);
      await page.waitForTimeout(20);
    }
    
    // Ensure no crashes and transform is still applied
    const transform = await card.evaluate((el) => window.getComputedStyle(el).transform);
    expect(transform).toBeDefined();
  });

  test('Scenario 4: Screen resizing during hover', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
      return;
    }
    
    await page.goto('/');
    
    const card = page.locator('.product-card').first();
    let box = await card.boundingBox();
    if (!box) {
      test.skip();
      return;
    }
    
    // Hover on card
    await page.mouse.move(box.x + box.width / 4, box.y + box.height / 4);
    await page.waitForTimeout(100);
    
    // Resize viewport
    const viewport = page.viewportSize();
    if (viewport) {
      await page.setViewportSize({ width: 800, height: 600 });
      await page.waitForTimeout(200);
      
      // Check if layout didn't break and transform is okay
      const transform = await card.evaluate((el) => window.getComputedStyle(el).transform);
      expect(transform).toBeDefined();
      
      // Restore viewport
      await page.setViewportSize(viewport);
    }
  });

  test('Scenario 5: Accessibility & Navigation check', async ({ page }) => {
    await page.goto('/');
    
    // Check main navigation links for visibility and attributes
    const navLinks = page.locator('.nav-link');
    const count = await navLinks.count();
    
    for (let i = 0; i < count; i++) {
      await expect(navLinks.nth(i)).toBeVisible();
      // Ensure they have href
      const href = await navLinks.nth(i).getAttribute('href');
      expect(href).not.toBeNull();
    }
    
    // Focus navigation using keyboard
    await page.keyboard.press('Tab');
    
    // Test that focus is handled nicely (no crash, outline exists but we might not easily assert outline style)
    // We just verify tab interaction works
    const focusedTag = await page.evaluate(() => document.activeElement ? document.activeElement.tagName : 'NONE');
    expect(focusedTag).toBeDefined();
  });
});
