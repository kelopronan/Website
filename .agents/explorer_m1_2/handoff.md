# Milestone 1: 3D Skeuomorphism & Physics Implementation Plan

## 1. Observation
- `package.json` relies on Vite but does not currently include `vanilla-tilt`.
- `src/main.js` has an `initRevealAnimations()` function that fires on `DOMContentLoaded`. It does not import or initialize `vanilla-tilt`.
- `src/style.css` defines `.module-card` (lines 482-492) and `.version-card` (lines 588-603). They do not have explicit 3D skeuomorphism properties (like multi-layered drop shadows, specific inset highlights, or `transform-style: preserve-3d`).
- `.nav-link` in `src/style.css` (lines 130-139) does not define `text-decoration: none`, resulting in default browser underlines for anchor tags. There are no "premium indicators" for active/hover states.

## 2. Logic Chain
- **Install `vanilla-tilt`**: To add 3D physics interaction, the library must be installed via `npm`.
- **Initialize vanilla-tilt**: In `src/main.js`, `vanilla-tilt` needs to be imported and initialized on DOM load for `.module-card` and `.version-card` classes.
- **Add 3D Skeuomorphism**: To achieve a skeuomorphic look in `src/style.css`, `.module-card` and `.version-card` need structural CSS updates. We'll add a combination of outer dark/light shadows (for depth) and inner highlights (for tactile edges), along with `transform-style: preserve-3d` for the tilt effect. We will also pop inner elements forward using `translateZ()`.
- **Nav Underlines & Indicators**: To resolve default underlines, `text-decoration: none` must be added to `.nav-link`. The "premium indicator" can be implemented via an animated `::after` pseudo-element that creates a glowing accent line underneath the active/hovered link.

## 3. Caveats
- I am an explorer agent operating under a "Do NOT implement" constraint. I have only formulated the changes.
- `vanilla-tilt` will be added to dependencies. A package manager (`npm`) must be used for installation.
- Some cards use `.liquid-glass-panel`, which already has background colors and shadows. The new skeuomorphic styles should blend with this class (by overriding or enhancing gradients/shadows) without breaking the glass effect.

## 4. Conclusion
The implementation requires running a terminal command to install the dependency, and making targeted edits to `src/main.js` and `src/style.css`.

**Proposed Implementation Steps:**

### Step 1: Install Dependency
Run the following command in the project root:
```bash
npm install vanilla-tilt
```

### Step 2: Update `src/main.js`
Import and initialize `vanilla-tilt`. Add the following to `src/main.js`:

```javascript
import './style.css';
import VanillaTilt from 'vanilla-tilt'; // <-- Add this import

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initTiltAnimations(); // <-- Add this call
});

// ... existing initRevealAnimations function ...

// Add new initialization function at the bottom
function initTiltAnimations() {
  const tiltElements = document.querySelectorAll('.module-card, .version-card');
  if (tiltElements.length > 0) {
    VanillaTilt.init(tiltElements, {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.1,
    });
  }
}
```

### Step 3: Update `src/style.css`
Add skeuomorphic styling and fix nav indicators.

**For `.nav-link`:**
```css
/* Update the existing .nav-link rule */
.nav-link {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  text-decoration: none; /* Add this: Remove default underline */
  position: relative;    /* Add this: Required for indicator */
}

/* Add the Premium Indicator */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--accent-blue);
  box-shadow: 0 0 8px var(--accent-blue);
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 2px;
}

.nav-link:hover::after, .nav-link.active::after {
  width: 100%;
}
```

**For `.module-card` and `.version-card`:**
```css
/* Add these new rules anywhere appropriate in style.css */
.module-card, .version-card {
  transform-style: preserve-3d;
  background: linear-gradient(145deg, rgba(40, 40, 45, 0.4), rgba(20, 20, 22, 0.4));
  box-shadow: 
    10px 10px 30px rgba(0, 0, 0, 0.5),
    -10px -10px 30px rgba(255, 255, 255, 0.02),
    inset 1px 1px 2px rgba(255, 255, 255, 0.1),
    inset -1px -1px 2px rgba(0, 0, 0, 0.4);
}

/* Popping inner elements for 3D effect */
.module-card > *, .version-card > * {
  transform: translateZ(30px);
}
```

## 5. Verification Method
1. **Build & Test**: Run `npm run dev`.
2. **Nav Check**: Open `http://localhost:5173`. Verify that navigation links do not have native browser underlines, and instead show an animated glowing bottom line on hover/active states.
3. **Card Check**: Navigate to the "Personality DB" page (`/personality-db.html`). Hover over the Core Modules (`.module-card`) and Design System version card (`.version-card`). Verify that the 3D tilt effect triggers and the cards display deep skeuomorphic shadows with inset lighting.
