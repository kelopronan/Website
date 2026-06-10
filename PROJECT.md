# Project: Portfolio 3D Skeuomorphism Upgrade

## Architecture
- Static multi-page Vite app (index.html, argus.html, personality-db.html).
- Global CSS in `src/style.css`.
- Core logic in `src/main.js`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | 3D Skeuomorphism & Physics (R1 & R2) | Update `src/style.css` for 3D UI, remove nav underlines. Install and initialize `vanilla-tilt` on cards. | none | IN_PROGRESS (b9973cb2) |
| 2 | Responsive Polish & Micro-details (R3) | Fix layout issues in "Core Modules" grid and "Design System" on `personality-db.html`. Add micro-interactions. | none | IN_PROGRESS (d0a3f7f6) |
| 3 | Final E2E Validation | Pass 100% of E2E test suite (Tiers 1-4) and run Tier 5 adversarial testing. | M1, M2 | PLANNED |

## Interface Contracts
### `src/main.js` ↔ UI Components
- `vanilla-tilt` initialization expects elements to have specific classes (`.module-card`, `.version-card`) but shouldn't break if elements are missing from the current page.

## Code Layout
- HTML pages: Project root
- Styles: `src/style.css`
- Scripts: `src/main.js`, `src/canvas-bg.js`
