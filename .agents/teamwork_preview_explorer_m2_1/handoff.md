# Layout & Micro-interaction Investigation Handoff

## 1. Observation
- **Core Modules Grid (`personality-db.html`:92, `src/style.css`:476):** The grid container `.modules-grid` is defined with `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`. On devices narrower than ~350px (e.g., iPhone SE), the `320px` minimum forces the content to overflow the screen width, leading to horizontal scrolling. There is no media query adjusting this for small viewports.
- **Design System Section (`personality-db.html`:146, `src/style.css`:588):** The content is wrapped in a `<div class="version-card liquid-glass-panel">`. In `style.css`, `.version-card::before` adds an absolute-positioned dot (`left: -2.35rem`). Because this section is not placed inside a `.timeline-block`, the timeline dot is orphaned and floats outside the component, which can also trigger horizontal overflow.
- **Animations (`src/main.js`:7):** An `IntersectionObserver` exists in `initRevealAnimations()`, currently targeting only `.product-card, .spec-category`. The `.module-card` items are static on scroll.
- **Styles (`src/style.css`:482):** The `.module-card` class has a hover transform but lacks an active state for soft glow on click.

## 2. Logic Chain
- **Core Modules Fix:** Updating the grid's minimum width using CSS `min()` ensures the cards can shrink on extremely small screens without breaking the layout. 
  *Fix:* `grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));`
- **Design System Fix:** The `.version-card` class is inherently tied to a timeline UI. Since the "Design System" section is simply a descriptive card, the `.version-card` class should be removed from it. The remaining `.liquid-glass-panel` class provides the correct visual styling.
- **Micro-interactions (CSS):** To introduce a soft glow on click that aligns with the site's cyberpunk aesthetic, we can use the `:active` pseudo-class with a box-shadow. 
  *Fix in `style.css`:* 
  ```css
  .module-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .module-card:active {
    transform: scale(0.98);
    box-shadow: 0 0 20px rgba(255, 0, 128, 0.3), var(--shadow-inner);
  }
  ```
- **Micro-interactions (JS):** To add subtle entrance animations, we should reuse the existing observer rather than writing new logic. 
  *Fix in `main.js`:* Update `document.querySelectorAll('.product-card, .spec-category')` to `document.querySelectorAll('.product-card, .spec-category, .module-card')`.

## 3. Caveats
- I did not test the exact color of the soft glow (`rgba(255, 0, 128, 0.3)`) against all monitor types; it's derived from the existing design system description (fruit gradient #ff0080 to #7928ca).
- Changing the grid template to `min(100%, 320px)` requires modern browser support, but since the project already uses modern CSS (`backdrop-filter`, `clamp`), compatibility is not an issue.

## 4. Conclusion
The layout issues stem from rigid minimum widths and misused classes (orphaned pseudo-elements). These can be fixed with minor CSS adjustments. The micro-interactions can be easily integrated by appending an `:active` state in CSS and extending the existing `IntersectionObserver` selector in `main.js` to target the core module cards. 

## 5. Verification Method
1. **Layout fixes:** Apply the CSS `minmax` change and remove the `.version-card` class from the Design System div. Run a local server and test viewport resizing down to 320px to confirm no horizontal scrolling occurs.
2. **Micro-interactions:** Add the CSS and JS edits. Scroll down the page to confirm the `.module-card` elements fade and slide up into view. Click/tap and hold on a module card to verify the pink soft glow (`#ff0080`) and scale reduction occur smoothly.
