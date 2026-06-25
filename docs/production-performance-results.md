# Production Performance Results

## Measurement Method

Lighthouse was checked but is not installed in this workspace, so production performance was measured with the existing Playwright browser tooling. Each baseline page was measured on mobile and desktop profiles with three uncached runs, and the median was reported.

Scores for Performance, Accessibility, Best Practices and SEO are marked `not-run` because Lighthouse was unavailable. LCP, CLS, load timing, transfer size, JS bytes, CSS bytes, image bytes and request count were captured through browser performance/resource timing.

## Pages Tested

- /
- /emergency-electrician-sydney/
- /level-2-electrician-sydney/
- /services/
- /service-areas/
- /about/
- /contact/
- /solar-batteries/
- /services/pre-purchase-rental-electrical-inspections-sydney/

## Before Metrics

Baseline medians are recorded in `reports/performance-before-after.csv` with `phase=before`. The largest repeated image transfer source was the site logo. The browser-loaded logo asset was:

- `public/images/evareadyelectrical-logo.webp`: 336,306 bytes

The large PNG van image remains in the repo for social/schema image references:

- `public/images/evaready-electrical-sydney-service-van.png`: 2,675,270 bytes

The visible hero van continues to use the untinted WebP hero image.

## Changes Made

- Created `public/images/evareadyelectrical-logo-perf-1000.webp` from the real Evaready logo.
- Updated the site logo constant to use the optimized logo.
- Preserved the real logo design, Google Ads, conversion tracking, sticky CTA, scrolling strip and untinted hero van.
- Added `scripts/benchmark-production-performance.ts` so before/after production measurements can be repeated.

## Expected Reduction

The browser-loaded logo decreased from 336,306 bytes to 110,924 bytes, a reduction of 225,382 bytes for pages that load the site logo.

## After Metrics

After deployment, rerun:

```powershell
$env:PERF_PHASE='after'
$env:PERF_BASE_URL='https://c0d312.github.io/evaready-electrical'
npx.cmd tsx scripts/benchmark-production-performance.ts
```

The script preserves existing `before` rows and appends/replaces `after` rows in `reports/performance-before-after.csv`.

## Unresolved Limits

- Google Ads remains intentionally present.
- The static export includes substantial SEO/service/suburb HTML and route payloads by design.
- The full-size van PNG remains for social preview/schema use; the visible page hero uses the optimized WebP.

## Outcome

Safe measurable optimisation was made without reducing useful content or changing the site design.
