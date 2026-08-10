# Non-header mobile performance evidence

> **Historical `7eb6985` evidence, superseded for tracking and export
> conclusions on 11 August 2026.** The tables below remain valid for their exact
> source and experiment, but `lazyOnload`, the reported 122-150 KB deferral and
> `text/x-component` alias serving are not the current implementation. Commit
> `668a05941e84de514081228b7077b8677e01ef55` restored the external Google base
> library to `afterInteractive`, uses Pages-like `text/plain` responses, and
> records current evidence under `reports/conversion-static-export-hardening/`.
> The mobile Lighthouse launch blocker remains.

## Status

**HISTORICAL NON-HEADER REGRESSION GATE: PASS**

**MOBILE LIGHTHOUSE LAUNCH TARGET: BLOCKED**

The non-header change removes the unexplained first-party failures and reduces transferred bytes without changing hero artwork, copy, layout, routes, conversion paths, metadata, schema, offers, tracking markers, the footer, or any frozen header implementation. The required mobile Lighthouse targets are not met: current route medians are Performance 81-84 and LCP 4,583-5,032 ms. This site must not be described as launch-ready on the strength of these laboratory results.

These are Lighthouse laboratory simulations against a local static export. They are not field Core Web Vitals, and INP was not measured.

## Source and environment

- Branch: `codex/responsive-ux-overhaul`
- Starting source: `a3c20bb24ef1b473ed81743ba705f9d135238a4c`
- Tested implementation: `7eb698544b27534c19abddb1de5bdef883425cbb`
- Node.js: `22.23.1`
- npm: `10.9.8`
- Next.js: `16.3.0`
- Lighthouse: `13.4.1`
- Chrome: `151.0.7922.108`
- Static-export base path: `/evaready-electrical`
- Baseline server: `http://127.0.0.1:4182/evaready-electrical/`
- After server: `http://127.0.0.1:4184/evaready-electrical/`
- Matrix: ten routes, three mobile and three desktop runs per route, 60 reports per phase
- Throttling and profiles: Lighthouse 13.4.1 defaults, unchanged between phases

Machine-readable evidence is under `reports/non-header-performance/7eb698544b2/`. It includes all extracted runs, median JSON/CSV, environment metadata, route lists, network and console failures, LCP phase data, SHA-256 manifests for all raw reports, and one compressed representative raw report for every route/profile.

## Root causes

### Unexpected 404 and console error

The failed URL was a first-party React Server Component payload requested by Next's client-router prefetch code. One exact example was:

`http://127.0.0.1:4182/evaready-electrical/services/__next.services.__PAGE__.txt`

- Resource type: `Fetch`
- Classification: first-party
- Initiator: `_next/static/chunks/07zyxk1hhpe3b.js`
- Baseline total: 303 failed requests and 303 matching console errors across 60 runs
- Cause: the static export stored the payload at the nested path `services/__next.services/__PAGE__.txt`, while the client requested the flat path above
- Correction: postbuild now creates validated flat aliases for exported segment payloads, and the strict static server serves those aliases as `text/x-component`
- After result: zero HTTP failures and zero console errors across 60 runs

This failure is not the server's intentional origin-root rejection. The strict server continues to reject paths outside `/evaready-electrical/`.

### Mobile LCP

The hero is server rendered and visible in the initial frame. It is not lazy, opacity-hidden, transform-hidden, animation-delayed, or hydration-dependent. The selected mobile resource is requested once with eager loading and high fetch priority:

`/evaready-electrical/images/performance/evaready-service-van-768.webp`

The asset is 768 x 576 pixels and was not changed. Experiments with synchronous decoding and lower-quality recompression produced no safe measurable benefit and were reverted.

Lighthouse's simulated mobile result is dominated by modeled resource/render competition. Current image-LCP routes receive about 594-875 ms resource load duration and about 2,936-3,531 ms element render delay, while the observed unthrottled local LCP is only 95-113 ms. The actionable non-header cost was the approximately 147 KB Google Ads library loaded after hydration. The queue, conversion ID, and conversion markers remain present, while the external library now loads on window idle. That removes approximately 122-150 KB from median mobile initial transfer, depending on route.

The largest remaining image competition belongs to frozen header resources and cannot be changed in this task. The two presentation stylesheets transfer about 61 KB and were retained to avoid visual regression.

The exact `668a059` rerun did not reproduce the expected 122-150 KB increase
when `afterInteractive` was restored: route transfer deltas against its exact
`4a800` baseline ranged from -25 to +40 bytes and request counts were unchanged.
The valid current matrix reports mobile Performance 81-84 and LCP
4,584-5,108 ms, so it does not claim an LCP solution. CTA markers remain
classification attributes only; explicit Google Ads click-conversion events
are not installed.

## Before and after: mobile medians

| Route | Perf before | Perf after | LCP before ms | LCP after ms | Transfer before bytes | Transfer after bytes | Saved bytes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 82 | 82 | 4,884 | 4,882 | 947,400 | 797,130 | 150,270 |
| Services | 81 | 82 | 5,108 | 4,882 | 954,893 | 804,588 | 150,305 |
| Service Areas | 82 | 83 | 4,885 | 4,658 | 884,369 | 734,121 | 150,248 |
| Emergency Electrician Sydney | 81 | 81 | 5,108 | 5,032 | 953,562 | 803,348 | 150,214 |
| Level 2 Electrician Sydney | 82 | 84 | 4,810 | 4,583 | 880,801 | 730,537 | 150,264 |
| Switchboard Upgrades Sydney | 81 | 82 | 5,108 | 4,883 | 949,758 | 799,548 | 150,210 |
| No Power In One Room | 83 | 83 | 4,661 | 4,588 | 920,125 | 776,528 | 143,597 |
| Canterbury-Bankstown region | 82 | 83 | 4,884 | 4,658 | 882,455 | 741,714 | 140,741 |
| Canterbury-Bankstown area | 83 | 83 | 4,658 | 4,658 | 884,228 | 751,535 | 132,693 |
| Panania | 84 | 84 | 4,584 | 4,583 | 882,389 | 760,425 | 121,964 |

All current mobile medians have Accessibility 100, Best Practices 100, SEO 100, CLS 0, and TBT 3-7 ms. Full FCP, Speed Index, DOM, HTML, CSS, JavaScript, image, request, and phase measurements are in `after/after-7eb698544b2-medians.csv`.

## Before and after: desktop medians

| Route | Perf before | Perf after | LCP before ms | LCP after ms | Transfer before bytes | Transfer after bytes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 96 | 96 | 1,387 | 1,387 | 1,476,521 | 1,419,897 |
| Services | 96 | 96 | 1,387 | 1,387 | 1,484,028 | 1,427,355 |
| Service Areas | 96 | 96 | 1,347 | 1,346 | 1,413,498 | 1,354,392 |
| Emergency Electrician Sydney | 96 | 96 | 1,387 | 1,387 | 1,480,075 | 1,423,505 |
| Level 2 Electrician Sydney | 97 | 97 | 1,307 | 1,308 | 1,409,929 | 1,353,304 |
| Switchboard Upgrades Sydney | 96 | 96 | 1,387 | 1,387 | 1,478,898 | 1,422,315 |
| No Power In One Room | 96 | 96 | 1,430 | 1,391 | 1,407,197 | 1,357,222 |
| Canterbury-Bankstown region | 96 | 96 | 1,348 | 1,348 | 1,410,470 | 1,351,301 |
| Canterbury-Bankstown area | 96 | 96 | 1,347 | 1,347 | 1,412,255 | 1,361,122 |
| Panania | 97 | 97 | 1,307 | 1,308 | 1,410,401 | 1,370,012 |

Desktop remains above the required Performance 95 threshold and has no material LCP regression. Desktop Accessibility, Best Practices, and SEO are 100; CLS and TBT are 0.

## Current mobile LCP phases

| Route | TTFB ms | Load delay ms | Load duration ms | Render delay ms | Observed LCP ms | LCP element/resource |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Homepage | 454 | 454 | 875 | 3,099 | 98 | `.brand-hero-image`, 768 WebP |
| Services | 454 | 454 | 760 | 3,215 | 113 | `.brand-internal-hero-image`, 768 WebP |
| Service Areas | 454 | 454 | 775 | 2,975 | 104 | `.brand-internal-hero-image`, 768 WebP |
| Emergency | 454 | 454 | 594 | 3,531 | 113 | `.brand-internal-hero-image`, 768 WebP |
| Level 2 | 454 | 454 | 733 | 2,943 | 107 | `.brand-internal-hero-image`, 768 WebP |
| Switchboards | 454 | 454 | 798 | 3,186 | 109 | `.brand-internal-hero-image`, 768 WebP |
| Fault guide | 454 | 1,050 | 1,318 | 1,853 | 108 | Hero section, no single resource |
| Region | 454 | 0 | 0 | 4,204 | 95 | H1, no resource |
| Area | 454 | 454 | 814 | 2,936 | 95 | `.brand-internal-hero-image`, 768 WebP |
| Panania | 454 | 454 | 593 | 3,082 | 98 | `.brand-internal-hero-image`, 768 WebP |

The matching baseline phase data is retained in `baseline/baseline-a3c20bb-medians.csv`; the direct delta table is `before-after-medians.csv`.

## Visual proof

Element-only non-header hero captures were made at 390, 430, 768, 1440, and 1920 pixels for Homepage, Emergency Electrician, and Panania. The capture harness hides the frozen header and mobile sticky bar only in the evidence screenshot context; production output is unchanged.

- Baseline captures: `C:\Users\Admin\AppData\Local\Temp\evaready-hero-visuals-baseline-a3c20bb-v4`
- After captures: `C:\Users\Admin\AppData\Local\Temp\evaready-hero-visuals-after-7eb-v4`
- Machine comparison: `reports/non-header-performance/7eb698544b2/visuals/hero-visual-comparison.json`

Result: 13 of 15 pairs are pixel-identical. Emergency 430 differs by one pixel with delta 1. Emergency 390 has a mean delta of 0.090373/255 across all pixels and was visually inspected as unchanged. All 15 retain dimensions, resource selection, copy, CTA placement, zero overflow, and a nonblank hero image.

No hero asset was added, removed, recompressed, or changed.

## Playwright evidence

Explicit local base URL: `http://127.0.0.1:4184/evaready-electrical/`

- Focused performance checks: 4 passed, 0 failed
- Supported cross-browser projects: Chromium, installed Chrome, installed Edge, WebKit, Mobile Chrome, Mobile Safari, and iPad; 7 passed, 0 failed
- Non-header UI regression: 28 passed, 0 failed, 14 expected skips for live Google Places states without owner configuration
- Quote dialog regression: 3 passed, 0 failed, 1 expected desktop skip for mobile-only Back handling
- Firefox: test did not reach navigation because the local headless browser failed to launch with `RenderCompositorSWGL failed mapping default framebuffer`; this is recorded as an environment limitation, not a website pass

Exact commands and per-project counts are in `reports/non-header-performance/7eb698544b2/playwright/summary.json`. These are representative route checks, not exhaustive all-route browser coverage.

## Exact commands

The build and audits used the preview environment variables:

```powershell
$env:NEXT_PUBLIC_DEPLOYMENT_TARGET='github-preview'
$env:NEXT_PUBLIC_BASE_PATH='/evaready-electrical'
$env:NEXT_PUBLIC_SITE_URL='https://c0d312.github.io/evaready-electrical'
```

Core commands:

```text
npm ci
npm audit
npm audit --omit=dev
npm run lint
npx tsc --noEmit
npm run build
npm run audit:suburbs
npm run audit:all-suburb-copy
npm run audit:location-output
npm run audit:location-evidence
npm run audit:location-indexation
npm run audit:location-privacy
npm run test:location-audits
npm run audit:links
npm run audit:metadata
npm run audit:visible-copy
npm run audit:page-health
npm run audit:response-times
npm run audit:claims
npm run audit:offers
npm run audit:performance
npm run audit:live-links-and-ctas
npm run audit:all-routes-visibility
```

Lighthouse after command:

```text
PERF_BASE_URL=http://127.0.0.1:4184/evaready-electrical PERF_RUNS=3 PERF_PROFILES=mobile,desktop node node_modules/tsx/dist/cli.mjs scripts/benchmark-production-performance.ts
```

The exact Playwright commands are machine-recorded in the Playwright summary. All use Node 22.23.1 and the explicit local base URL.

## Validation results

- Clean install: pass, 362 packages
- Full npm audit: 0 vulnerabilities
- Production npm audit: 0 vulnerabilities
- Lint: pass
- TypeScript: pass
- Clean static build: pass, 1,005 static pages
- Generated flat segment aliases: 1,001 on the measured Windows Next.js 16.3 export; prior Ubuntu evidence reported zero and was not locally reproduced
- Location output: 16 regions, 39 areas, 873 suburbs; zero mapping errors
- Suburb indexation: 873 index/follow, 0 noindex, 873 sitemap entries, 873 self-canonicals, 0 redirects
- Internal links: 20,143 checked, zero broken generated links
- Metadata/visible copy/page health: 1,001 indexable routes, zero critical warnings
- Claims/offers: pass; owner reconfirmation remains required for externally evidenced claims and offer terms
- CTA/conversion links: 130,183 checked rows, zero CTA failures
- ServiceM8, phone, quote, and Google Ads markers: preserved
- Network/console after matrix: zero HTTP failures and zero console errors
- `git diff --check`: pass
- Header: untouched by implementation and evidence work

## Remaining blockers

1. Mobile Lighthouse Performance remains 81-84, below 90.
2. Mobile simulated LCP remains 4.583-5.032 seconds, above 2.5 seconds.
3. The largest remaining modeled image competition is in frozen header resources. It was measured but not modified.
4. Firefox cross-browser validation is unavailable in this Windows headless environment due to a browser compositor launch failure.
5. Live Google Places states remain owner-configuration dependent; the honest missing-configuration fallback passes.
