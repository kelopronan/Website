# E2E Test Implementation Strategy

## 1. Observation
- **Requirements (`ORIGINAL_REQUEST.md`)**:
  - **R1 (3D Skeuomorphism)**: UI elements (`.module-card`, `.version-card`, `.nav-link`) must feature tactile styles using multiple inset shadows/gradients. Nav links must not use standard underlines.
  - **R2 (Physics/Interactivity)**: Elements must tilt/compress on hover (likely using `vanilla-tilt.js` or custom pointer tracking).
  - **R3 (Responsive Polish)**: Layouts like "Core Modules" must collapse properly on mobile viewports. Micro-interactions (glows, entrance animations) must be present.
- **Current Selectors (`index.html`, `src/style.css`)**: 
  - Cards: `.product-card`, `.liquid-glass-panel`, `.module-card` (anticipated from prompt).
  - Navigation: `.nav-link`.
- **Infrastructure (`TEST_INFRA.md`)**: 
  - Framework: Playwright (`npm run test:e2e`).
  - Directories: `tests/e2e/tier1-features.spec.js`, etc. Opaque-box methodology.

## 2. Logic Chain
- **Testing R1 (Skeuomorphism)**: Since Playwright runs against the rendered DOM, visual effects like "3D inset shadows" and "gradients" can be queried using `window.getComputedStyle`. For navigation links, we must explicitly assert that `text-decoration` does not include `underline`, and that pseudo-elements or background changes are applied on hover.
- **Testing R2 (Physics/Tilt)**: To simulate physical interactions, we must move the mouse precisely over the elements using `page.mouse.move()`. We can then capture the `transform` property. A flat element has `transform: none` or a 2D matrix. A tilted element will yield a `matrix3d` or string with `rotateX`/`rotateY`.
- **Testing R3 (Responsive)**: Playwright's `page.setViewportSize()` allows exact mobile and desktop emulation. Layout correctness can be evaluated by extracting the `boundingBox()` of adjacent elements and asserting their physical overlap and stacking order (e.g., vertical vs horizontal). Entrance animations can be verified by observing opacity and transform changes triggered by the `IntersectionObserver` over time.

## 3. Caveats
- Computed styles for 3D transforms (`matrix3d`) are complex strings; exact numerical matching is fragile. Assertions should check for the presence of the 3D matrix signature rather than exact degree values.
- Animations take time. Playwright tests evaluating entrance animations (like `initRevealAnimations`) or CSS transitions require `waitForTimeout` or polling `expect.poll` to avoid flakiness.

## 4. Conclusion (Implementation Strategy for the Worker)
The Worker should implement the Playwright E2E tests using the following concrete strategies:

**1. 3D Skeuomorphic UI & Links (Tier 1)**
- **Nav Links**: Use `expect(locator).toHaveCSS('text-decoration-line', 'none')`. Trigger a hover state (`locator.hover()`) and use `getComputedStyle` via `page.evaluate()` to check for premium indicators (e.g., changes in `background-color`, `box-shadow`, or `::after` content).
- **Cards (`.product-card .liquid-glass-panel`, `.module-card`)**: Select these components and execute `window.getComputedStyle(el).boxShadow`. Assert that the string contains `inset` multiple times to verify complex 3D skeuomorphism.

**2. Interactive Physics & Tilt (Tier 1 & Tier 2)**
- **Trigger**: Locate a card (e.g., `.product-card`). Get its bounding box center. Use `page.mouse.move(x, y)` to simulate an off-center hover to trigger tilt.
- **Validation**: Read the computed `transform` style. Assert that it contains `matrix3d` (or `perspective`), proving that 3D rotation physics are active. If `vanilla-tilt.js` is used, optionally verify the presence of dynamic lighting nodes (e.g., `.js-tilt-glare`).

**3. Responsive Polish & Entrance Animations (Tier 1 & Tier 4)**
- **Entrance Animation**: Scroll a section into view. Poll the element's `opacity` to transition from `0` to `1` and its `transform` to reach `matrix(1, 0, 0, 1, 0, 0)` (which corresponds to `translateY(0)`).
- **Desktop Grid (e.g. 1280x800)**: Measure bounding boxes of `.product-info` and `.product-visual` inside `.product-card`. Assert that their `y` coordinates align (side-by-side layout).
- **Mobile Grid (e.g. 375x667)**: Change viewport size. Measure bounding boxes again. Assert that the bottom `y` of `.product-visual` is less than or equal to the top `y` of `.product-info` (stacked layout).

## 5. Verification Method
- **Execution**: Run `npm run test:e2e`.
- **Validation**: Inspect the Playwright test files in `tests/e2e/` to ensure they implement `page.mouse.move()`, `boundingBox()` geometry checks, and `getComputedStyle()` validations as outlined in the strategy.
- **Invalidation**: The test logic is invalid if it relies on hardcoded internal implementation details (e.g. checking React state) rather than opaque-box DOM observations.
