# Pre-launch production cleanup report

Date: 2026-08-07 (Australia/Sydney)

## Executive result

**READY FOR OWNER REVIEW; NOT APPROVED FOR PUBLIC LAUNCH.**

The production source, static export, routes, internal links, metadata, response mappings, conversion links, responsive layouts and tested browser projects pass the local launch gate. Public launch remains blocked by owner evidence and external configuration that this task was not authorised to supply:

1. Configure and verify the live Google rating with the exact EVAREADY ELECTRICAL Place ID and a restricted browser API key.
2. Reconfirm all four published offers immediately before launch, including the `Licensed & Insured` wording embedded in the `$50 off` artwork.
3. Reconfirm current licence, registration and Level 2 ASP evidence immediately before launch.
4. Review the remaining location-template similarity risk. The pages retain factual suburb, postcode, area, region and response data, but their shared factual structure is intentionally high.

No branded-domain access, DNS, CNAME, hosting, canonical-domain, GitHub Pages workflow, external-account, `main` branch, pull-request or deployment action was performed.

## Repository state

| Item | Result |
| --- | --- |
| Branch | `codex/responsive-ux-overhaul` |
| Starting local HEAD | `a128e62f8a4b8082d3bee36ef37392958d485df2` |
| Starting remote HEAD | `a128e62f8a4b8082d3bee36ef37392958d485df2` |
| Framework | Next.js 16.3.0, static export |
| Runtime compatibility | Node.js 22-compatible; validation host used Node.js 26.1.0 and npm 11.13.0 |
| Preview base path | `/evaready-electrical` (unchanged) |
| Canonical origin | Existing GitHub Pages preview origin (unchanged) |
| Deployment workflow | Existing workflow triggers on `main` or manual dispatch only; feature-branch push is source control only |

The worktree contained many pre-existing modified reports plus hundreds of untracked screenshots, logs and local server files. They were treated as owner artifacts and deliberately excluded from the task commit. No broad cleanup or destructive Git command was used.

## Production changes

### Source and configuration

- `.gitignore`: ignored known local validation/export directories and explicitly allowed the safe `.env.example` template.
- `.env.example`: documented empty Google Maps browser key and Place ID placeholders; contains no credential values.
- `eslint.config.mjs`: excluded the same disposable validation/export directories from lint traversal.
- `package.json`, `package-lock.json`: upgraded Next.js and `eslint-config-next` from 16.2.12 to 16.3.0 and accepted compatible patched transitive dependencies.
- `app/ux-overhaul.css`: forced the active desktop header raster to `object-fit: contain`, matching the source aspect ratio without stretching.
- `app/offers.css`, `components/offer-showcase.tsx`, `data/offers.ts`: rendered the shared non-stacking policy once per offer set while retaining each offer's full eligibility and exclusions.
- `data/site.ts`, `data/claims.ts`, `data/trust-badges.ts`, `components/site-frame.tsx`: removed the stale hard-coded `5.0 from 83 Google reviews` presentation from static trust content and retained a neutral link to current Google reviews.
- `app/service-areas/[region]/[area]/[suburb]/page.tsx`, `components/location-page-sections.tsx`: removed repeated suburb-page blocks, duplicate CTA output and redundant per-page business schema while preserving factual location data, pathways, FAQs, breadcrumbs, nearby links and all routes.

### Tests and documentation

- `scripts/audit-claims-and-offers.ts`: verifies one shared non-stacking statement per rendered offer set.
- `scripts/audit-production-responsive-smoke.ts`: validates the active proportional header artwork, viewport coverage, aspect ratio and approved complete-header limits.
- `tests/e2e/cross-device-smoke.spec.ts`: checks the neutral Google reviews source link instead of a stale static count.
- `tests/e2e/header-responsive.spec.ts`: requires `object-fit: contain` for every active header foreground.
- `tests/e2e/offers-layout.spec.ts`: verifies consolidated offer policy output.
- `docs/claims-and-offers-source-of-truth.md`: records the live-only Google rating policy and owner-evidence requirements.
- `docs/live-google-rating-widget.md`: documents the live widget, public browser-key restrictions and honest unavailable state.
- `docs/prelaunch-production-cleanup-report.md`: this report.

## Deletion report

| Removed path | Evidence | Replacement and recovery |
| --- | --- | --- |
| `components/google-review-proof.tsx` | No TypeScript/TSX import or component usage; all pages use `GoogleRatingSeal` directly. Lint, TypeScript, the 1,005-page build, route audits and browser tests pass without it. | No replacement required. The file remains recoverable from Git history. |

No image, font, route, test, generated index, tracking integration or approved brand asset was deleted.

## Dependency result

| Package | Final version |
| --- | ---: |
| `next` | 16.3.0 |
| `react` | 19.2.4 |
| `react-dom` | 19.2.4 |
| `typescript` | 5.9.3 |
| `tailwindcss` | 4.3.0 |
| `eslint` | 9.39.4 |
| `eslint-config-next` | 16.3.0 |

`npm audit` and `npm audit --omit=dev` both report zero vulnerabilities. No forced audit fix, major migration or incompatible downgrade was used.

## Generated-site inventory

| Inventory | Result |
| --- | ---: |
| Generated static pages | 1,005 |
| Known application routes | 1,004 |
| Sitemap URLs | 1,001 |
| Generated service pages | 46 |
| Fault guides | 15 |
| Regions | 16 |
| Areas | 39 |
| Suburbs | 873 |
| Core-response suburbs | 678 |
| Outer-response suburbs | 195 |

The one-page difference between generated static pages and known application routes is expected framework/static-export output rather than a lost route. The three-URL difference between known routes and sitemap URLs is the intentional non-indexable route set.

## Payload comparison

Raw HTML and gzip measurements use the local static export. Shared CSS is 481,248 bytes raw in the baseline and 407,272 bytes raw in the final export. Representative JavaScript transfer fell from approximately 557-691 KB to 153-157 KB in the local browser benchmark.

| Route | HTML before raw/gzip | HTML after raw/gzip | Raw change |
| --- | ---: | ---: | ---: |
| Homepage | 233,220 / 29,957 B | 231,445 / 29,799 B | -1,775 B |
| Services | 426,467 / 42,288 B | 424,740 / 42,070 B | -1,727 B |
| Emergency | 332,725 / 37,876 B | 331,023 / 37,674 B | -1,702 B |
| Level 2 | 313,843 / 36,758 B | 312,098 / 36,553 B | -1,745 B |
| Service Areas | 326,430 / 36,407 B | 324,641 / 36,183 B | -1,789 B |
| Switchboards | 308,144 / 34,590 B | 306,419 / 34,402 B | -1,725 B |
| Fault guide | 223,559 / 28,390 B | 225,265 / 28,327 B | +1,706 B raw; gzip -63 B |
| Region | 262,372 / 31,808 B | 260,516 / 31,666 B | -1,856 B |
| Area | 333,009 / 33,868 B | 331,297 / 33,752 B | -1,712 B |
| Panania | 284,393 / 33,612 B | 267,337 / 31,533 B | -17,056 B |

The final export contains 6,127 files totalling 660,719,604 bytes raw and 90,367,465 bytes gzip. No individual output file exceeds 500 KB. The largest HTML response is 470,644 bytes raw / 50,014 bytes gzip; Services is 424,740 bytes raw / about 42 KB gzip.

## Local performance evidence

Lighthouse was not installed in the controlled environment, so no Lighthouse score is claimed. Three-run medians were collected with the repository's Playwright timing harness against the local static production export. These are lab timings, not field Core Web Vitals.

| Route | Mobile LCP / CLS / total | Desktop LCP / CLS / total |
| --- | ---: | ---: |
| Homepage | 120 ms / 0 / 1,227,480 B | 140 ms / 0 / 1,432,475 B |
| Services | 112 ms / 0 / 1,234,927 B | 168 ms / 0 / 1,439,922 B |
| Emergency | 120 ms / 0 / 1,233,760 B | 176 ms / 0 / 1,436,082 B |
| Level 2 | 116 ms / 0 / 1,230,595 B | 168 ms / 0 / 1,435,590 B |
| Service Areas | 120 ms / 0 / 1,235,787 B | 148 ms / 0 / 1,440,782 B |

The current high-resolution responsive header imagery transfers more image bytes than the earlier compressed header, but overall transfer is materially lower because shared JavaScript and CSS fell substantially. The header remains the real above-fold image and retains reserved dimensions.

## Audit and test results

| Check | Result |
| --- | --- |
| `npm run lint` | Pass |
| `npx tsc --noEmit` | Pass |
| Clean production build with preview base path | Pass, 1,005 pages |
| Suburb completeness | Pass, 873/873 |
| Suburb visible copy | Pass, 873 pages, zero issues |
| Route inventory | Pass, 1,004 routes |
| Exhaustive responsive visibility | Pass, 7,028 route/viewport rows, zero critical failures |
| Internal links | Pass, 20,142 links, zero broken/generated-output issues |
| Live links and CTAs | Pass, 1,004 routes and 136,430 checks, zero failures |
| Metadata/page health | Pass, 1,001 indexable pages, zero warnings |
| Canonicals/sitemap/schema URLs | Pass locally: 1,001 canonicals and sitemap URLs, 14,746 schema URLs, zero wrong-host or malformed URL issues |
| Asset references | Pass, 44,956 references, zero missing assets |
| Response classifications | Pass, 678 core and 195 outer, zero mismatches |
| Claims/offers | Pass, 15 claims and four offers; owner reconfirmation still required |
| Header responsive smoke | Pass, 84 checks across six routes and 14 widths |
| Header Playwright | Pass in Chromium, Chrome, Edge, WebKit, Mobile Chrome, Mobile Safari and iPad projects; Firefox blocked by local compositor startup failure |
| Full-route Playwright | Pass over every generated route at mobile plus representative templates |
| Offer layout | Pass, desktop/mobile/WebKit coverage |
| Google rating success/error/missing config | Pass with mocks; real live request blocked by missing owner credentials |
| Secret scan | Pass: no tracked environment file, key, token or private-key pattern |
| `npm audit` full/production | Pass, zero vulnerabilities |
| `git diff --check` | Pass immediately before staging |

The broad initial browser matrix contained stale harness assertions and Firefox environment launch failures. Site assertions were corrected and rerun successfully. Firefox remains explicitly unverified on this Windows host because `RenderCompositorSWGL` could not map its default framebuffer; this is an environment limitation, not evidence of a website failure.

## Header measurements

The ticker, desktop navigation wording/order, dropdowns, mobile hamburger/menu, sticky behaviour and scrolling logic were not changed.

| Width | Artwork slot | Ticker | Navigation | Complete header | Overflow |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 320 | 112 px | 28 px | 0 px | 146 px | 0 px |
| 360 | 112 px | 28 px | 0 px | 146 px | 0 px |
| 375 | 116 px | 28 px | 0 px | 150 px | 0 px |
| 390 | 116 px | 28 px | 0 px | 150 px | 0 px |
| 412 | 116 px | 28 px | 0 px | 150 px | 0 px |
| 430 | 120 px | 28 px | 0 px | 154 px | 0 px |
| 768 | 123 px | 28 px | 0 px | 157 px | 0 px |
| 820 | 128 px | 28 px | 0 px | 162 px | 0 px |
| 1024 | 135 px | 20 px | 34 px | 195 px | 0 px |
| 1280 | 135 px | 21 px | 40 px | 202 px | 0 px |
| 1366 | 135 px | 21 px | 40 px | 202 px | 0 px |
| 1440 | 145 px | 21 px | 40 px | 212 px | 0 px |
| 1920 | 150 px | 21 px | 40 px | 217 px | 0 px |
| 2560 | 160 px | 21 px | 40 px | 227 px | 0 px |

Maximum measured foreground aspect-ratio error was 0.266% on narrow mobile layers and 0% on the desktop raster, within the 0.5% regression threshold. Visual inspection of the final static export found no crop, blank state, header/hero overlap or horizontal overflow on the homepage, switchboard service and Panania suburb templates.

## Accessibility and conversion

- Exactly one main landmark is rendered; global header and footer sit outside main.
- Skip navigation, visible focus, keyboard dropdowns, mobile-menu scroll lock, quote-modal Back handling and focus restoration pass the focused tests.
- Header, hero, offer, footer and sticky Call/Quote links retain the approved phone, ServiceM8 and Google Ads markers.
- All 136,430 link/CTA checks passed, including phone, email, review, internal and quote actions.
- Emergency routes retain the call-first pathway; planned-work routes retain the photo/job-detail quote pathway.
- Dynamic Google rating reserves its layout, uses `aria-live="polite"`, makes one request per page load and exposes an honest unavailable state when configuration or the API fails.

## Google live-rating status

The component uses the modern Places JavaScript API with `Place.fetchFields()` requesting only `rating`, `userRatingCount` and `googleMapsURI`. Success, invalid Place ID, quota/error and missing-configuration paths pass mocked desktop/mobile tests. The final export contains no test credential and does not load Google Maps when configuration is absent.

Real live verification is blocked until the owner provides:

- `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY`, restricted by HTTP referrer and API in Google Cloud.
- `NEXT_PUBLIC_GOOGLE_PLACE_ID`, verified as the exact EVAREADY ELECTRICAL listing.

`NEXT_PUBLIC_` values are deliberately visible in browser JavaScript. The key must therefore never be unrestricted. The owner-reported approximate count of 105 is not hard-coded or represented as a live result.

## Location-content risk

All 928 location routes (16 regions, 39 areas and 873 suburbs) pass factual mapping, link, metadata, schema and visible-copy audits. Median suburb output is about 259.6 KB raw / 30.6 KB gzip with about 946 visible words, five H2s and four CTA links.

The factual template still measures approximately 61% exact shared text and 100% near-template similarity. No fake local jobs, offices, street references, reviews or travel-time claims were added. This is a legitimate remaining SEO-quality risk that should be reviewed with real owner-supplied local proof rather than artificial synonym variation.

## Deliberately preserved worktree files

The commit must exclude:

- Pre-existing modified files under `reports/`.
- Pre-existing modified `docs/all-routes-launch-sweep.md`.
- Pre-existing modified `tests/e2e/ux-overhaul.spec.ts`.
- Untracked screenshots, report directories, local server logs, PID files and `.codex-remote-attachments/`.
- Untracked historical header variants `public/images/header/*refined-v9.webp` and `*refined-v10.webp` because ownership and intended use are uncertain.
- Any `.env.local` or credential-bearing file.

These files were not deleted, reverted or staged.

## Remaining launch blockers

1. Owner-supplied restricted Google API configuration and live Place ID verification.
2. Immediate pre-launch owner confirmation of all four offer values, eligibility and exclusions.
3. Evidence for the `Licensed & Insured` artwork claim or owner-approved replacement artwork.
4. Current owner confirmation for licence, registration and Level 2 ASP wording.
5. Owner review of the remaining location-template similarity risk and provision of genuine local/project proof where available.
6. Real Firefox validation on a machine where the browser compositor launches successfully.
7. Lighthouse medians in an environment with Lighthouse installed; no score is claimed here.

## Safety confirmation

- No PR was opened.
- Nothing was merged into or pushed to `main`.
- Nothing was deployed and no workflow was manually dispatched.
- DNS, CNAME, hosting, canonicals, sitemap domains and the branded domain were untouched.
- Google Ads, Analytics, Search Console, Google Business Profile and ServiceM8 accounts were untouched.
- No key, token, password or `.env.local` file is included.
