# Handoff: E2E Test Suite Strategy for New Portfolio

## Observation
- `TEST_INFRA.md` mandates an opaque-box, requirement-driven Playwright test suite. It defines 4 tiers of test files: `tier1-features.spec.js`, `tier2-boundaries.spec.js`, `tier3-cross-feature.spec.js`, and `tier4-scenarios.spec.js`.
- `ORIGINAL_REQUEST.md` requires:
  - **R1:** 3D skeuomorphic elements, removing basic underlines from links.
  - **R2:** Physical interactions (tilt, dynamic lighting) on hover for module cards.
  - **R3:** Responsive grids that collapse properly on mobile, and micro-interactions.
- Code inspection of `index.html` reveals the actual DOM structure:
  - Navigation links: `.nav-link` inside `.nav-links`
  - Cards: `.product-card` and `.liquid-glass-panel`
  - Buttons: `.skeuo-button`
  - Grid layouts: `.showcase-grid` and `.specs-table-container`

## Logic Chain
1. **Target Selectors**: To align the generic requirements with the current codebase, the Playwright tests must target `.nav-link`, `.product-card`, `.liquid-glass-panel`, `.skeuo-button`, and `.showcase-grid`.
2. **Testing 3D Skeuomorphism (R1)**:
   - For `.nav-link`: Query `window.getComputedStyle(el).textDecorationLine` to assert it is not `underline`. Ensure premium styling via checking `box-shadow` or `background` properties.
   - For `.product-card` / `.skeuo-button`: Assert the presence of complex `box-shadow` values (multiple shadows) indicating 3D depth.
3. **Testing Interactive Physics (R2)**:
   - Capture the initial computed `transform` (e.g., `matrix` or `matrix3d`) and `box-shadow` of a `.liquid-glass-panel` or `.product-card`.
   - Dispatch a `hover` action via `page.hover('.product-card')`.
   - Re-evaluate the computed styles. The `transform` matrix should change (indicating tilt/3D rotation), and `box-shadow` or `background` should update (indicating dynamic lighting/glare).
4. **Testing Responsiveness (R3)**:
   - Use `page.setViewportSize()` to toggle between Mobile (e.g., `width: 375`) and Desktop (e.g., `width: 1920`).
   - For `.showcase-grid`, assert that the layout collapses on mobile. This can be done by checking `getComputedStyle` for `grid-template-columns` or verifying the bounding boxes (children stacking vertically vs. horizontally).

## Caveats
- Playwright's `.hover()` sometimes requires dispatching specific mousemove events if the physics library relies on continuous pointer tracking across the element rather than just a CSS `:hover` state. Tests might need to simulate mouse movements (`page.mouse.move(x, y)`) across the card's bounding box.
- Computed `transform` styles are returned as matrix strings (`matrix(...)` or `matrix3d(...)`), so assertions should check for inequality to the base state (e.g. `matrix(1, 0, 0, 1, 0, 0)`) rather than specific angle values.
- The DOM shows CSS/HTML structure with a background canvas. If WebGL/Three.js is used for 3D elements instead of CSS, tests must check for the presence of `<canvas>` elements and use visual regression testing (`toHaveScreenshot`). For now, assuming CSS-based 3D skeuomorphism as the primary approach for cards and buttons.

## Conclusion
The implementer should create the `tests/e2e` directory and the four specified test files. The tests must utilize `page.evaluate()` to extract computed CSS styles (`box-shadow`, `transform`, `text-decorationLine`) to verify skeuomorphism and hover-based physics. Layout checks should use viewport resizing combined with bounding box coordinate comparisons to ensure responsive collapsing.

## Verification Method
1. The Worker creates the Playwright spec files under `tests/e2e/`.
2. Execute the tests via `npx playwright test`.
3. The tests should successfully interact with the mapped DOM selectors (`.product-card`, `.nav-link`, etc.) and validate the styling and interactive physics without relying on internal framework state. If a test fails, the error message should clearly identify which CSS property or layout structure did not meet the requirement.
