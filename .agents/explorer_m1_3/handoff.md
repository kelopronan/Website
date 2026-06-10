# Milestone 1: 3D Skeuomorphism & Physics (Implementation Plan)

## 1. Observation
- `package.json` currently does not list `vanilla-tilt` as a dependency.
- In `src/main.js`, there is no import or initialization logic for `vanilla-tilt`.
- In `src/style.css`, `.nav-link` anchors rely on the default browser underline behavior (no `text-decoration: none` set). They only change color on hover (`.nav-link:hover, .nav-link.active { color: var(--text-primary); }`).
- `.module-card` uses a flat 2D hover effect (`transform: translateY(-5px)`) and `transition: transform 0.3s ease`, which will conflict with dynamic tilt transforms if not removed.
- Both `.module-card` and `.version-card` are combined with the `.liquid-glass-panel` class in HTML (`argus.html` and `personality-db.html`), which sets `overflow: hidden`. `overflow: hidden` forces `transform-style: flat` in browsers, inherently disabling any nested 3D z-axis translation.

## 2. Logic Chain
- **Package Installation**: We must install `vanilla-tilt` via the package manager (`npm install vanilla-tilt`) so it can be imported into the Vite build.
- **Initialization**: `src/main.js` needs to import `vanilla-tilt` and initialize it targeting `.module-card` and `.version-card` elements, applying parallax configurations like `glare`, `max-glare`, and `perspective`.
- **Nav Premium Indicators**: To "Remove nav underlines with premium indicators", we must explicitly set `text-decoration: none` on `.nav-link` and introduce an `::after` pseudo-element. This pseudo-element will act as a premium glowing gradient bar under the text that expands its width to 100% on `:hover` and `.active`.
- **3D Skeuomorphism for Cards**: 
  - Add `linear-gradient` backgrounds and inset multi-layered `box-shadow` properties to `.module-card` and `.version-card` to create the tactile, physical skeuomorphic depth.
  - Apply `transform-style: preserve-3d;` to these cards and override the parent's overflow with `overflow: visible !important` so that inner elements can pop out.
  - Apply `transform: translateZ(25px);` to the immediate children of the cards to achieve the 3D popping effect when tilted.
  - Remove the manual `transition: transform` and `:hover` translate rules from `.module-card` to avoid erratic jittering when `vanilla-tilt` takes over the `transform` property.

## 3. Caveats
- Setting `overflow: visible !important` on the cards overrides `.liquid-glass-panel`'s clipping. While necessary for the 3D effect, if any child element's content exceeds the border-radius boundaries (unlikely given the generous `2rem+` padding), it will bleed out instead of being clipped.
- `.highlight-card` modifies the `box-shadow` of `.version-card`. We must ensure its definition incorporates the new skeuomorphic inset shadows so the depth isn't lost when the gold glow is applied.

## 4. Conclusion
The implementation is ready to proceed. 
1. Run `npm install vanilla-tilt`.
2. Update `src/main.js` to instantiate VanillaTilt.
3. Update `src/style.css` to remove default underlines, replace them with gradient indicators, strip conflicting transform transitions, enforce `preserve-3d`, and apply high-fidelity skeuomorphic shadows and gradients.

## 5. Verification Method
- **Build**: Run `npm run build` to verify that `vanilla-tilt` bundles correctly.
- **Preview**: Run `npm run preview`.
- **Visual Check**:
  - Open the site and hover over navigation links to ensure the gradient bar expands and default underlines are gone.
  - Visit `A.R.G.U.S.` and `Personality DB` pages. Hover over the module/version cards; they should tilt dynamically towards the cursor, show a subtle glare, and the text inside should physically pop outward in 3D.

---

### Proposed Code Changes

**1. Shell Command**
```bash
npm install vanilla-tilt
```

**2. `src/main.js`**
```javascript
import './style.css';
import VanillaTilt from 'vanilla-tilt';

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initTiltAnimations();
});

function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.product-card, .spec-category');
  // ... existing reveal logic ...
}

function initTiltAnimations() {
  const cards = document.querySelectorAll('.module-card, .version-card');
  if (cards.length > 0) {
    VanillaTilt.init(cards, {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.05,
      scale: 1.02,
      perspective: 1000
    });
  }
}
```

**3. `src/style.css` - Nav Links**
```css
/* Around line 131 */
.nav-link {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  text-decoration: none; /* Add this */
  position: relative;    /* Add this */
}

/* Premium Indicator ::after */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-blue), transparent);
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 2px;
}

.nav-link:hover::after, .nav-link.active::after {
  width: 100%;
}

.nav-link:hover, .nav-link.active {
  color: var(--text-primary);
}
```

**4. `src/style.css` - Module Cards (approx line 482)**
```css
.module-card {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  /* 3D Skeuomorphism */
  background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(20,20,22,0.6) 100%);
  box-shadow: 
    inset 1px 1px 2px rgba(255, 255, 255, 0.15), 
    inset -1px -1px 2px rgba(0, 0, 0, 0.8),
    0 15px 35px rgba(0,0,0,0.6);
  transform-style: preserve-3d;
  overflow: visible !important;
}

.module-card > * {
  transform: translateZ(25px);
}

/* REMOVE: transition: transform 0.3s ease; */
/* REMOVE: .module-card:hover { transform: translateY(-5px); } */
```

**5. `src/style.css` - Version Cards (approx line 588)**
```css
.version-card {
  padding: 2rem;
  border-radius: 16px;
  position: relative;
  
  /* 3D Skeuomorphism */
  background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(20,20,22,0.6) 100%);
  box-shadow: 
    inset 1px 1px 2px rgba(255, 255, 255, 0.15), 
    inset -1px -1px 2px rgba(0, 0, 0, 0.8),
    0 15px 35px rgba(0,0,0,0.6);
  transform-style: preserve-3d;
  overflow: visible !important;
}

.version-card > p, .version-card > .version-header {
  transform: translateZ(25px);
}

/* Ensure highlight-card retains inset shadows */
.highlight-card {
  border-color: rgba(212, 163, 89, 0.4);
  box-shadow: 
    0 0 30px rgba(212, 163, 89, 0.05),
    inset 1px 1px 2px rgba(255, 255, 255, 0.15), 
    inset -1px -1px 2px rgba(0, 0, 0, 0.8),
    0 15px 35px rgba(0,0,0,0.6);
}
```
