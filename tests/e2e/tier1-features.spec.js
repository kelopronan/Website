import { test, expect } from '@playwright/test';

test.describe('Tier 1: Skeuomorphic UI & Link Styling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Feature 1: Navigation links should not have underlines', async ({ page }) => {
    const navLinks = page.locator('.nav-link');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
    
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const textDecoration = await link.evaluate((el) => window.getComputedStyle(el).textDecorationLine);
      expect(textDecoration).toBe('none');
    }
  });

  test('Feature 1: Social links should not have underlines', async ({ page }) => {
    const socialLinks = page.locator('.social-link');
    const count = await socialLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = socialLinks.nth(i);
      const textDecoration = await link.evaluate((el) => window.getComputedStyle(el).textDecorationLine);
      expect(textDecoration).toBe('none');
    }
  });

  test('Feature 1: Skeuomorphic buttons should have complex box-shadows', async ({ page }) => {
    const buttons = page.locator('.skeuo-button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const boxShadow = await btn.evaluate((el) => window.getComputedStyle(el).boxShadow);
      // Expecting multiple shadows or inset shadow indicating skeuomorphism
      const isSkeuomorphic = boxShadow.includes('inset') || boxShadow.split(',').length > 1;
      expect(isSkeuomorphic).toBeTruthy();
    }
  });

  test('Feature 1: Product cards should have layered box-shadows', async ({ page }) => {
    const cards = page.locator('.product-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const boxShadow = await card.evaluate((el) => window.getComputedStyle(el).boxShadow);
      const hasLayers = boxShadow.split(',').length > 1;
      expect(hasLayers).toBeTruthy();
    }
  });

  test('Feature 1: Liquid glass panels should have inset or complex box-shadows', async ({ page }) => {
    const panels = page.locator('.liquid-glass-panel');
    const count = await panels.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const panel = panels.nth(i);
      const boxShadow = await panel.evaluate((el) => window.getComputedStyle(el).boxShadow);
      const isComplex = boxShadow.includes('inset') || boxShadow.split(',').length > 1;
      expect(isComplex).toBeTruthy();
    }
  });
});
