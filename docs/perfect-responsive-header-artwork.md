# Proportional responsive header artwork

## Scope

This change corrects the remaining Evaready header distortion without changing
the ticker, desktop navigation, dropdowns, mobile navigation, hamburger,
sticky behaviour, scrolling, phone action or quote action.

The GitHub Pages preview base path and canonical configuration are unchanged.

## Asset audit

The approved owner artwork is:

- `public/images/header/evaready-header-owner-v7.webp`
- 2048 x 682 pixels
- Aspect ratio: 3.003:1
- Opaque finished banner artwork

The existing transparent master is:

- `public/images/evareadyelectrical-logo.webp`
- 1426 x 503 pixels
- Contains the proportional EVAREADY wordmark, ELECTRICAL, red 24/7, energy
  line and centre bolt

The superseded wide banner files used compositions between approximately
9.85:1 and 16.70:1. Their foreground artwork was already flattened inside the
bitmap, so CSS could not restore its natural proportions.

## New proportional layers

The transparent master was separated into lossless WebP layers without
redrawing, AI generation or non-uniform resizing:

| Asset | Intrinsic size | File size | Purpose |
| --- | ---: | ---: | --- |
| `evaready-header-wordmark-v15.webp` | 1426 x 245 | 269,612 bytes | EVAREADY, ELECTRICAL and 24/7 |
| `evaready-header-energy-line-v15.webp` | 1426 x 27 | 27,066 bytes | Horizontal blue energy line |
| `evaready-header-bolt-v15.webp` | 310 x 258 | 37,200 bytes | Centre bolt |

The full-width lightning background uses the existing
`public/images/evaready-storm-theme-desktop-v3.webp`. Only that decorative
background uses `object-fit: cover`; every brand layer uses `object-fit:
contain` and retains its natural aspect ratio.

## Layout behaviour

- The lightning background covers the complete banner width at every viewport.
- The wordmark, line and bolt are independent proportional layers.
- Intrinsic dimensions reserve the artwork before loading and prevent layout
  shift.
- The mobile artwork reserves the existing hamburger area without moving or
  restyling the control.
- No `object-fit: fill`, stretched background, mirrored filler, blurred filler,
  side panel, transform scale or hidden brand element is used.

## Production measurements

Measurements were taken from the clean static export at the GitHub Pages base
path. `Header` is the complete ticker, banner and desktop navigation stack.

| Viewport | Banner | Ticker | Navigation | Header | Background coverage | Maximum layer ratio error |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 320 x 568 | 112px | 28px | 0px | 146px | 100% | 0.168% |
| 360 x 800 | 112px | 28px | 0px | 146px | 100% | 0.025% |
| 375 x 812 | 116px | 28px | 0px | 150px | 100% | 0.133% |
| 390 x 844 | 116px | 28px | 0px | 150px | 100% | 0.230% |
| 412 x 915 | 116px | 28px | 0px | 150px | 100% | 0.218% |
| 430 x 932 | 120px | 28px | 0px | 154px | 100% | 0.108% |
| 768 x 1024 | 123px | 28px | 0px | 157px | 100% | 0.147% |
| 820 x 1180 | 123px | 28px | 0px | 157px | 100% | 0.147% |
| 1024 x 768 | 123px | 20px | 34px | 183px | 100% | 0.055% |
| 1280 x 800 | 123px | 21px | 40px | 190px | 100% | 0.055% |
| 1366 x 768 | 123px | 21px | 40px | 190px | 100% | 0.032% |
| 1440 x 900 | 123px | 21px | 40px | 190px | 100% | 0.120% |
| 1920 x 1080 | 123px | 21px | 40px | 190px | 100% | 0.055% |
| 2560 x 1440 | 123px | 21px | 40px | 190px | 100% | 0.055% |

No tested viewport had horizontal overflow, brand cropping, layer overlap,
blank loading space or measurable header layout shift.

## Screenshots

Fresh production-export screenshots are stored locally in
`reports/header-proportional-layer-qa/`:

- `homepage-320x568.png`
- `homepage-390x844.png`
- `homepage-768x1024.png`
- `homepage-1366x768.png`
- `homepage-1920x1080.png`
- `homepage-2560x1440.png`

## Validation

- ESLint: passed
- TypeScript (`tsc --noEmit`): passed
- Clean Next.js production build: passed, 1,005 static pages
- Production responsive smoke: 84 checks passed, 0 failures
- Header Playwright matrix: 16 applicable checks passed, 14 intentional
  matrix-only skips, 0 failures
- Focused desktop/mobile UX Playwright: 16 applicable checks passed, 24
  intentional project-specific skips, 0 failures
- Browser coverage: Chromium, Google Chrome, Microsoft Edge, Firefox, WebKit,
  mobile Chrome and mobile Safari emulation

The only warning is Node's upstream `module.register()` deprecation warning
during Playwright and build tooling. It does not affect the rendered site.
