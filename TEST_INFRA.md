# E2E Test Infra: New Portfolio

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | 3D Skeuomorphic UI & Link Styling | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 2 | Interactive Physics (Tilt/Lighting) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 3 | Responsive Polish & Micro-Details | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |

## Test Architecture
- Test runner: Playwright (`npm run test:e2e`)
- Test case format: Playwright test files in `tests/e2e/`
- Directory layout:
  - `tests/e2e/tier1-features.spec.js`
  - `tests/e2e/tier2-boundaries.spec.js`
  - `tests/e2e/tier3-cross-feature.spec.js`
  - `tests/e2e/tier4-scenarios.spec.js`

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Desktop User explores portfolio modules | 1, 2, 3 | Medium |
| 2 | Mobile User explores portfolio modules | 1, 2, 3 | Medium |
| 3 | Rapid Interaction stress test | 1, 2 | High |
| 4 | Screen resizing during hover | 2, 3 | High |
| 5 | Accessibility & Navigation check | 1, 3 | Low |

## Coverage Thresholds
- Tier 1: ≥5 per feature (Total: 15)
- Tier 2: ≥5 per feature (where boundaries exist) (Total: 15)
- Tier 3: pairwise coverage of major feature interactions (Total: 3)
- Tier 4: ≥5 realistic application scenarios (Total: 5)
