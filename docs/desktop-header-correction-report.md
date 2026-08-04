# Desktop header correction report

Date: 2026-08-04
Branch: `codex/responsive-ux-overhaul`

## Result

The rejected wide header used a foreground composition whose source geometry was already unsuitable for the compact desktop banner. Comparing the browser-rendered ratio with that distorted source could therefore pass while the brand still looked flattened. The supplied rejected 2048px capture was approximately 163px for the artwork and 237px for the complete header.

The corrected desktop header uses independent, proportional foreground layers over the existing continuous storm background. The 2048px result is 128px for the artwork and 195px for the complete header. No mobile or tablet rules below 1024px were changed.

## Approved source inspection

The approved transparent master is `public/images/evareadyelectrical-logo.webp` (1426x503, RGBA). The two desktop rows below are exact, lossless crops from that master: there is no redraw, AI generation, resampling, or non-uniform resizing.

| Layer | File | Natural size | Purpose |
| --- | --- | ---: | --- |
| EVAREADY | `public/images/header/evaready-header-evaready-v16.webp` | 1426x171 | Proportional upper wordmark |
| ELECTRICAL 24/7 | `public/images/header/evaready-header-electrical-v16.webp` | 1426x73 | Proportional lower wordmark |
| Energy line | `public/images/header/evaready-header-energy-line-960.webp` | 960x18 | Existing approved horizontal energy line |
| Central bolt | `public/images/header/evaready-header-bolt-120.webp` | 120x100 | Existing approved central bolt |
| Background | Responsive existing storm sources | 768x512, 960x640, 1920x1280 | Continuous blue/black/red full-width background |

Compact widths continue to use the pre-existing combined responsive sources, unchanged.

## Implementation

- Added desktop-only picture rows for EVAREADY and ELECTRICAL 24/7 at `min-width: 1024px`.
- Retained the existing full-width storm background, energy line, and central bolt.
- Kept every foreground at `width: auto`, `height: auto`, and `object-fit: contain`.
- Reserved fixed desktop artwork heights of 116px, 122px, and 128px so the header cannot grow indefinitely and does not shift while images decode.
- Kept ticker markup/CSS, navigation markup/order, dropdowns, CTA controls, z-index, sticky behavior, mobile menu, and all rules below 1024px unchanged.
- Updated regression tests to decode the selected physical source file independently before comparing natural and rendered ratios.

No `object-fit: fill`, `background-size: 100% 100%`, unequal transform scaling, mirrored filler, blurred filler, or side cover-up is used.

## Desktop measurements

All dimensions are production-export browser measurements in CSS pixels. Aspect error is the percentage difference between decoded-source and rendered aspect ratios; the allowed maximum is 0.5%.

| Width | Ticker | Banner | Nav | Complete header | Overflow |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1024 | 26 | 116 | 34 | 176 | 0 |
| 1280 | 27 | 116 | 40 | 183 | 0 |
| 1366 | 27 | 116 | 40 | 183 | 0 |
| 1440 | 27 | 116 | 40 | 183 | 0 |
| 1600 | 27 | 122 | 40 | 189 | 0 |
| 1920 | 27 | 122 | 40 | 189 | 0 |
| 2048 | 27 | 128 | 40 | 195 | 0 |
| 2560 | 27 | 128 | 40 | 195 | 0 |

## Foreground ratio proof

The widest observed error is 0.1207%, comfortably inside the 0.5% requirement. Every layer was complete, inside the banner, and visibly uncropped.

| Width | Layer | Natural | Rendered | Error |
| ---: | --- | ---: | ---: | ---: |
| 1024 | EVAREADY | 1426x171 | 500.00x59.95 | 0.0080% |
| 1024 | ELECTRICAL 24/7 | 1426x73 | 455.00x23.28 | 0.0480% |
| 1024 | Energy line | 960x18 | 560.00x10.50 | 0.0000% |
| 1024 | Bolt | 120x100 | 31.19x26.00 | 0.0401% |
| 1366 | EVAREADY | 1426x171 | 500.00x59.95 | 0.0080% |
| 1366 | ELECTRICAL 24/7 | 1426x73 | 455.00x23.28 | 0.0480% |
| 1366 | Energy line | 960x18 | 587.38x11.00 | 0.1207% |
| 1366 | Bolt | 120x100 | 31.19x26.00 | 0.0401% |
| 1440 | EVAREADY | 1426x171 | 518.39x62.16 | 0.0113% |
| 1440 | ELECTRICAL 24/7 | 1426x73 | 460.80x23.58 | 0.0469% |
| 1440 | Energy line | 960x18 | 619.19x11.61 | 0.0034% |
| 1440 | Bolt | 120x100 | 31.19x26.00 | 0.0401% |
| 1920 | EVAREADY | 1426x171 | 560.00x67.14 | 0.0182% |
| 1920 | ELECTRICAL 24/7 | 1426x73 | 500.00x25.59 | 0.0091% |
| 1920 | Energy line | 960x18 | 680.00x12.75 | 0.0000% |
| 1920 | Bolt | 120x100 | 30.00x25.00 | 0.0000% |
| 2048 | EVAREADY | 1426x171 | 580.00x69.55 | 0.0062% |
| 2048 | ELECTRICAL 24/7 | 1426x73 | 520.00x26.61 | 0.0396% |
| 2048 | Energy line | 960x18 | 720.00x13.50 | 0.0000% |
| 2048 | Bolt | 120x100 | 30.00x25.00 | 0.0000% |
| 2560 | EVAREADY | 1426x171 | 580.00x69.55 | 0.0062% |
| 2560 | ELECTRICAL 24/7 | 1426x73 | 520.00x26.61 | 0.0396% |
| 2560 | Energy line | 960x18 | 720.00x13.50 | 0.0000% |
| 2560 | Bolt | 120x100 | 30.00x25.00 | 0.0000% |

## Compact regression measurements

| Width | Ticker | Banner | Complete header | Mobile menu | Overflow |
| ---: | ---: | ---: | ---: | --- | ---: |
| 320 | 28 | 112 | 146 | Preserved | 0 |
| 360 | 28 | 112 | 146 | Preserved | 0 |
| 390 | 28 | 116 | 150 | Preserved | 0 |
| 430 | 28 | 120 | 154 | Preserved | 0 |
| 768 | 28 | 123 | 157 | Preserved | 0 |
| 820 | 28 | 123 | 157 | Preserved | 0 |

## Screenshot evidence

- `reports/desktop-header-correction/header-1024.png`
- `reports/desktop-header-correction/header-1366.png`
- `reports/desktop-header-correction/header-1440.png`
- `reports/desktop-header-correction/header-1920.png`
- `reports/desktop-header-correction/header-2048.png`
- `reports/desktop-header-correction/header-2560.png`

Each screenshot was inspected visually. The complete wordmark, ELECTRICAL 24/7 row, energy line, central bolt, and both lightning edges are present; there is no crop, blank state, overlap, or horizontal overflow.

## Validation

- Repository-wide `npm run lint`: executed, but it scans compiled `.next` and `out` files inside the unrelated untracked `.preview-publish-source` worktree and therefore reports generated-code violations.
- Source lint with only that generated preview worktree excluded (`npm run lint -- --ignore-pattern .preview-publish-source`): passed with zero findings.
- TypeScript (`tsc --noEmit`): passed.
- Clean production build: passed, 1,005 static pages generated.
- Exact 16-width Chromium header matrix: 2/2 tests passed.
- Cross-device header suite: 13/13 applicable tests passed across Chromium, installed Chrome, Edge, WebKit, Mobile Chrome, Mobile Safari, iPad, and iPad Pro.
- Desktop navigation/dropdown regression suite: 5/5 passed.
- Mobile menu and browser-Back regression suite: 4/4 passed.
- Production responsive smoke: 84/84 route/viewport checks passed.
- System Firefox production screenshot: rendered correctly. Bundled Playwright Firefox could not initialise its software renderer in this Windows environment (`RenderCompositorSWGL failed mapping default framebuffer`); this occurred before page load and is recorded as an environment limitation, not a website assertion failure.
- Git diff check: passed.

No deployment, `main` merge, DNS, CNAME, GitHub Pages setting, canonical, sitemap-domain, workflow, or branded-domain action belongs to this change.
