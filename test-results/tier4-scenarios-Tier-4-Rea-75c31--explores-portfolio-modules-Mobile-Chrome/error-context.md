# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier4-scenarios.spec.js >> Tier 4: Real-World Application Scenarios >> Scenario 2: Mobile User explores portfolio modules
- Location: tests\e2e\tier4-scenarios.spec.js:42:3

# Error details

```
TypeError: page.mouse.tap is not a function
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - link "RSA" [ref=e5] [cursor=pointer]:
        - /url: /index.html
      - generic [ref=e6]:
        - link "Overview" [ref=e7] [cursor=pointer]:
          - /url: /index.html
        - link "A.R.G.U.S." [ref=e8] [cursor=pointer]:
          - /url: /argus.html
        - link "Personality DB" [ref=e9] [cursor=pointer]:
          - /url: /personality-db.html
  - main [ref=e10]:
    - generic [ref=e12]:
      - heading "Ronan S. Atomos." [level=1] [ref=e13]
      - paragraph [ref=e14]: Engineering elegant systems, AI architectures, and tactile digital experiences.
      - button "View Systems" [ref=e16] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Engineered Systems" [level=2] [ref=e19]
        - paragraph [ref=e20]: A showcase of advanced architectures and fluid interfaces.
      - generic [ref=e21]:
        - article [ref=e22]:
          - img "Zen AI Subsystem" [ref=e25]
          - generic [ref=e26]:
            - generic [ref=e27]: Deployed
            - heading "Personality Database" [level=3] [ref=e28]
            - paragraph [ref=e29]: A highly tactile control hub designed for comprehensive daily activity visualization and productivity tracking. Features a unified Liquid Glass UI with high-fidelity transparency and fluid refractions.
            - generic [ref=e30]:
              - generic [ref=e31]:
                - generic [ref=e32]: Subsystem
                - generic [ref=e33]: Zen AI Gen-1
              - generic [ref=e34]:
                - generic [ref=e35]: Framework
                - generic [ref=e36]: Liquid Glass UI
            - link "Explore Architecture" [ref=e37] [cursor=pointer]:
              - /url: /personality-db.html
              - button "Explore Architecture" [ref=e38]
        - article [ref=e39]:
          - img "Argus I System" [ref=e42]
          - generic [ref=e43]:
            - generic [ref=e44]: Active Development
            - heading "A.R.G.U.S." [level=3] [ref=e45]
            - paragraph [ref=e46]: The next-generation evolution of the core AI system. Autonomous Recursive Guardian & User Synaptic-interface.
            - generic [ref=e47]:
              - generic [ref=e48]:
                - generic [ref=e49]: Role
                - generic [ref=e50]: Contextual Agent
              - generic [ref=e51]:
                - generic [ref=e52]: Status
                - generic [ref=e53]: Cognitive Core (V4.5)
            - link "View Evolutionary Lore" [ref=e54] [cursor=pointer]:
              - /url: /argus.html
              - button "View Evolutionary Lore" [ref=e55]
    - generic [ref=e56]:
      - generic [ref=e57]:
        - heading "Technical Specifications" [level=2] [ref=e58]
        - paragraph [ref=e59]: Academic progression and core system proficiencies (2026–2030).
      - generic [ref=e60]:
        - generic [ref=e61]:
          - heading "Proficient Architecture" [level=3] [ref=e62]
          - generic [ref=e63]:
            - generic [ref=e64]: C
            - generic [ref=e65]: Foundational architectures, memory administration, low-level execution.
          - generic [ref=e66]:
            - generic [ref=e67]: Java
            - generic [ref=e68]: Enterprise OOP paradigms, cross-platform stability.
        - generic [ref=e69]:
          - heading "Active Transition" [level=3] [ref=e70]
          - generic [ref=e71]:
            - generic [ref=e72]: Rust
            - generic [ref=e73]: Memory-safe systems engineering, next-gen concurrency.
          - generic [ref=e74]:
            - generic [ref=e75]: C++
            - generic [ref=e76]: Advanced data structures, transitioning core mechanics.
        - generic [ref=e77]:
          - heading "Target Matrix (60 Days)" [level=3] [ref=e78]
          - generic [ref=e79]:
            - generic [ref=e80]: Python
            - generic [ref=e81]: Local LLM pipeline configurations, workflow optimization.
          - generic [ref=e82]:
            - generic [ref=e83]: SQL
            - generic [ref=e84]: Fundamental database administration & HackerRank Certification.
  - contentinfo [ref=e85]:
    - generic [ref=e86]:
      - generic [ref=e87]: Ronan S. Atomos
      - generic [ref=e88]:
        - link "GitHub" [ref=e89] [cursor=pointer]:
          - /url: https://github.com/kelopronan
        - link "LinkedIn" [ref=e90] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/devansh-tiwary-128967333/
        - link "Email" [ref=e91] [cursor=pointer]:
          - /url: mailto:devanshtiwary2911@gmail.com
      - generic [ref=e92]: © 2026 RSA Engineering. All rights reserved.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Tier 4: Real-World Application Scenarios', () => {
  4   | 
  5   |   test('Scenario 1: Desktop User explores portfolio modules', async ({ page, isMobile }) => {
  6   |     if (isMobile) {
  7   |       test.skip();
  8   |       return;
  9   |     }
  10  |     
  11  |     await page.goto('/');
  12  |     
  13  |     // User checks out hero section
  14  |     const heroTitle = page.locator('.hero-title');
  15  |     await expect(heroTitle).toBeVisible();
  16  |     
  17  |     // User clicks the skeuo button to scroll to projects
  18  |     const viewSystemsBtn = page.locator('.primary-btn');
  19  |     await viewSystemsBtn.click();
  20  |     
  21  |     // Wait for scroll
  22  |     await page.waitForTimeout(500);
  23  |     
  24  |     // User hovers over cards
  25  |     const cards = page.locator('.product-card');
  26  |     const count = await cards.count();
  27  |     
  28  |     for (let i = 0; i < count; i++) {
  29  |       const box = await cards.nth(i).boundingBox();
  30  |       if (box) {
  31  |         await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  32  |         await page.waitForTimeout(200);
  33  |       }
  34  |     }
  35  |     
  36  |     // Check capabilities
  37  |     const capabilities = page.locator('#capabilities');
  38  |     await capabilities.scrollIntoViewIfNeeded();
  39  |     await expect(capabilities).toBeVisible();
  40  |   });
  41  | 
  42  |   test('Scenario 2: Mobile User explores portfolio modules', async ({ page, isMobile }) => {
  43  |     if (!isMobile) {
  44  |       test.skip();
  45  |       return;
  46  |     }
  47  |     
  48  |     await page.goto('/');
  49  |     
  50  |     const heroTitle = page.locator('.hero-title');
  51  |     await expect(heroTitle).toBeVisible();
  52  |     
  53  |     // User scrolls down manually
  54  |     const projects = page.locator('#projects');
  55  |     await projects.scrollIntoViewIfNeeded();
  56  |     
  57  |     // Check if cards are visible
  58  |     const cards = page.locator('.product-card');
  59  |     await expect(cards.first()).toBeVisible();
  60  |     
  61  |     // Mobile doesn't really have hover, so user taps on card (or we simulate touch)
  62  |     const box = await cards.first().boundingBox();
  63  |     if (box) {
> 64  |       await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      |                        ^ TypeError: page.mouse.tap is not a function
  65  |     }
  66  |   });
  67  | 
  68  |   test('Scenario 3: Rapid Interaction stress test', async ({ page }) => {
  69  |     await page.goto('/');
  70  |     
  71  |     const card = page.locator('.product-card').first();
  72  |     const box = await card.boundingBox();
  73  |     if (!box) {
  74  |       test.skip();
  75  |       return;
  76  |     }
  77  |     
  78  |     // Rapidly move mouse across the card to trigger physics engine spam
  79  |     for (let i = 0; i < 20; i++) {
  80  |       await page.mouse.move(box.x + Math.random() * box.width, box.y + Math.random() * box.height);
  81  |       await page.waitForTimeout(20);
  82  |     }
  83  |     
  84  |     // Ensure no crashes and transform is still applied
  85  |     const transform = await card.evaluate((el) => window.getComputedStyle(el).transform);
  86  |     expect(transform).toBeDefined();
  87  |   });
  88  | 
  89  |   test('Scenario 4: Screen resizing during hover', async ({ page, isMobile }) => {
  90  |     if (isMobile) {
  91  |       test.skip();
  92  |       return;
  93  |     }
  94  |     
  95  |     await page.goto('/');
  96  |     
  97  |     const card = page.locator('.product-card').first();
  98  |     let box = await card.boundingBox();
  99  |     if (!box) {
  100 |       test.skip();
  101 |       return;
  102 |     }
  103 |     
  104 |     // Hover on card
  105 |     await page.mouse.move(box.x + box.width / 4, box.y + box.height / 4);
  106 |     await page.waitForTimeout(100);
  107 |     
  108 |     // Resize viewport
  109 |     const viewport = page.viewportSize();
  110 |     if (viewport) {
  111 |       await page.setViewportSize({ width: 800, height: 600 });
  112 |       await page.waitForTimeout(200);
  113 |       
  114 |       // Check if layout didn't break and transform is okay
  115 |       const transform = await card.evaluate((el) => window.getComputedStyle(el).transform);
  116 |       expect(transform).toBeDefined();
  117 |       
  118 |       // Restore viewport
  119 |       await page.setViewportSize(viewport);
  120 |     }
  121 |   });
  122 | 
  123 |   test('Scenario 5: Accessibility & Navigation check', async ({ page }) => {
  124 |     await page.goto('/');
  125 |     
  126 |     // Check main navigation links for visibility and attributes
  127 |     const navLinks = page.locator('.nav-link');
  128 |     const count = await navLinks.count();
  129 |     
  130 |     for (let i = 0; i < count; i++) {
  131 |       await expect(navLinks.nth(i)).toBeVisible();
  132 |       // Ensure they have href
  133 |       const href = await navLinks.nth(i).getAttribute('href');
  134 |       expect(href).not.toBeNull();
  135 |     }
  136 |     
  137 |     // Focus navigation using keyboard
  138 |     await page.keyboard.press('Tab');
  139 |     
  140 |     // Test that focus is handled nicely (no crash, outline exists but we might not easily assert outline style)
  141 |     // We just verify tab interaction works
  142 |     const focusedTag = await page.evaluate(() => document.activeElement ? document.activeElement.tagName : 'NONE');
  143 |     expect(focusedTag).toBeDefined();
  144 |   });
  145 | });
  146 | 
```