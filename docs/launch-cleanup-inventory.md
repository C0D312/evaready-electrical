# Launch Cleanup Inventory

Recorded: 2026-07-26

## Inventory summary

The tracked repository contains 777 files before this cleanup:

| Area | Tracked files | Classification |
| --- | ---: | --- |
| `app/` | 26 | Required production routes, layouts and styles |
| `components/` | 23 | Required shared UI except one proven obsolete component |
| `data/` | 9 | Required business, service, fault, offer and service-area data |
| `lib/` | 3 | Required metadata, schema and description utilities |
| `public/` | 34 | Active assets plus superseded/uncertain brand assets |
| `scripts/` | 18 | Required generation, audit and benchmarking tools |
| `tests/` | 6 | Required Playwright regression coverage |
| `docs/` | 176 | Project decisions and historical implementation records |
| `reports/` | 471 | Historical QA evidence and generated audit output |
| `.github/` | 1 | Required validation workflow |

No local font files are shipped. The site uses the browser font stack and therefore has no local font-family or font-weight cleanup candidate.

## Required production code

- All route modules under `app/`, including the 46 service pages, 15 fault guides, 16 region routes, 39 area routes and 873 suburb routes generated at build time.
- Shared layout and conversion components in `components/`, including the header, navigation, ticker, mobile sticky CTA, quote modal, ServiceM8 frame, offers, trust proof and active footer.
- All nine `data/` modules and all three `lib/` modules.
- `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, package manifests and deployment configuration.

## Required interactive client boundaries

The following Client Components use state, events, effects or browser APIs and remain client-side:

- `desktop-primary-nav.tsx`
- `mobile-primary-nav.tsx`
- `mobile-sticky-cta.tsx`
- `quote-form-modal.tsx`
- `service-area-search.tsx`
- `service-m8-frame.tsx`
- `home-navigation-link.tsx`
- `current-year.tsx`

Static page content, service/fault/location templates, offers and trust sections remain Server Components. No page-level Client Component boundary was found.

## Required data and generators

- `service-area-region-data.ts` is the generated source for the complete coverage hierarchy.
- `service-area-coverage.ts` provides route and response-classification helpers used by pages and audits.
- `service-pages.ts`, `electrical-faults.ts` and route templates generate the approved service and fault footprint.
- `generate-site-version.ts` remains required by the build.
- `generate-service-area-search-index.ts` now emits a compact, deterministic search index used only after search interaction.

## Required assets

Verified active assets include:

- `public/images/header/evaready-header-original.jpg`
- `public/images/evaready-electrical-sydney-service-van.webp`
- `public/images/evareadyelectrical-logo-perf-1000.webp`
- `public/images/evaready-storm-theme-desktop-v3.webp`
- `public/images/evaready-storm-theme-mobile-v3.webp`
- Four WebP offer graphics in `public/images/offers/`
- `evaready-full-logo-favicon-v2.ico`
- `evaready-full-logo-square-180.png`
- `evaready-full-logo-square-512.png`
- `.nojekyll`

## Proven obsolete

- `components/footer-link-groups.tsx`: no import, dynamic import, test reference or rendered-output reference. The current footer is implemented by `SiteFooter` in `components/site-frame.tsx`.
- CSS selectors unique to the removed component: `.footer-link-groups`, `.footer-link-group*`, `.footer-link-panel` and `.footer-region-search*`.

## Proven duplicate but retained for safety review

These files are byte-for-byte duplicates of the active explicitly referenced icons:

- `public/apple-icon.png` duplicates `public/evaready-full-logo-square-180.png`.
- `public/icon.png` duplicates `public/evaready-full-logo-square-512.png`.
- `public/favicon.ico` duplicates `public/evaready-full-logo-favicon-v2.ico`.

They have no source or generated-page references, but automated deletion was conservatively blocked because their conventional filenames could still be used by an external consumer. They remain in the repository pending explicit owner removal approval.

## Unreferenced generated variants retained for manual review

Source and generated-output searches found no active references to the legacy `v1`, `v2`, `v5`, `v6`, `v7` or local untracked `v8` header/banner variants, nor to the old `v1`/`v2` storm backgrounds. The active header is `evaready-header-original.jpg`; the active storm assets are the `v3` pair. These older assets remain untouched because they are branded artwork and the removal gate requires a stricter owner decision.

The following unreferenced assets also remain untouched because they may be retained brand masters or accreditation artwork:

- `public/evaready-full-wide-logo-undistorted-v2.webp`
- `public/images/evareadyelectrical-logo.webp`
- `public/images/arctick-licensed.svg`

## Generated disposable output

- `.next/`, `out/`, `.deploy-gh-pages/`, Playwright result folders and temporary local-server logs are disposable.
- Existing tracked reports and documentation were not removed because many were explicit deliverables from earlier owner tasks.
- Pre-existing untracked QA screenshots and logs are excluded from the cleanup commit rather than deleted or hidden.

## Dependencies

All direct runtime dependencies are referenced:

- `next`
- `react`
- `react-dom`
- `lucide-react`

All development dependencies are used by build, lint, TypeScript, Tailwind, TSX audit scripts or Playwright. No direct dependency was proven unused, so none was removed.
