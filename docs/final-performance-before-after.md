# Final production performance before and after

> **Historical evidence only (3 August 2026).** These figures describe commit
> `4ebea41eeedebb0e7f8ee8dc21e967a2ec20521f` measured with Node.js 26.1.0,
> Next.js 16.2.12 and Chrome 150. They must not be used as current evidence for
> the exact `a404e774` application source. The current Node.js 22 / Next.js
> 16.3.0 / Chrome 151 evidence is stored in
> `reports/production-performance/final-a404/` and is the only performance data
> used by the current launch-readiness conclusion.

## Scope and safety

- Branch: `codex/responsive-ux-overhaul`
- Baseline commit: `4ebea41eeedebb0e7f8ee8dc21e967a2ec20521f`
- Measurement date: 3 August 2026 (Australia/Sydney)
- Deployment target: existing GitHub Pages preview export
- Base path: `/evaready-electrical`
- Branded production domain: not accessed
- External integrations, tracking and ServiceM8 behaviour: preserved
- Deployment: not performed by this task

All measurements below are local lab results. They are not field Core Web
Vitals and must not be described as real-user performance.

## Test environment

- Windows, local loopback static server
- Node.js 26.1.0
- npm 11.13.0
- Next.js 16.2.12 static export
- Lighthouse 13.4.1
- Headless Chrome 150
- Each Lighthouse result is the median of three clean runs
- The production export was served by `scripts/serve-static-export.ts`; the
  development server was not used for Lighthouse
- Build environment:
  - `NEXT_PUBLIC_DEPLOYMENT_TARGET=github-preview`
  - `NEXT_PUBLIC_BASE_PATH=/evaready-electrical`
  - `NEXT_PUBLIC_SITE_URL=https://c0d312.github.io/evaready-electrical`

## Lighthouse medians

### Mobile

| Page | Perf before | Perf after | LCP before | LCP after | CLS | A11y | Transfer before | Transfer after | Image before | Image after | DOM |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 77 | 91 | 6,311 ms | 3,455 ms | 0 | 100 | 1,186 KB | 586.1 KB | 753 KB | 153.4 KB | 1,009 |
| Services | 80 | 92 | 5,488 ms | 3,381 ms | 0 | 100 | 1,190 KB | 591.6 KB | 753 KB | 153.4 KB | 1,399 |
| Emergency | 79 | 91 | 5,279 ms | 3,524 ms | 0 | 100 | 1,189 KB | 590.3 KB | 753 KB | 153.4 KB | 1,130 |
| Level 2 | 80 | 91 | 5,337 ms | 3,456 ms | 0 | 100 | 1,186 KB | 587.3 KB | 753 KB | 153.4 KB | 1,168 |
| Service Areas | 80 | 91 | 5,486 ms | 3,451 ms | 0 | 95 | 1,187 KB | 590.6 KB | 753 KB | 153.4 KB | 1,051 |
| Panania | 79 | 92 | 5,559 ms | 3,302 ms | 0 | 100 | 1,192 KB | 596.4 KB | 753 KB | 153.4 KB | 1,021 |

Mobile transfer fell by approximately 50 percent on every representative
route. Mobile LCP improved by 1.76 to 2.86 seconds, but the 2.5 second target
was not reached: final medians are 3.30 to 3.52 seconds. This is the main
remaining performance limitation.

### Desktop

| Page | Perf before | Perf after | LCP before | LCP after | CLS | A11y | Transfer before | Transfer after | Image before | Image after | DOM |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 98 | 99 | 1,166 ms | 944 ms | 0 | 96 | 1,184 KB | 911.5 KB | 723 KB | 446.4 KB | 1,009 |
| Services | 99 | 99 | 1,027 ms | 1,026 ms | 0 | 96 | 1,184 KB | 910.9 KB | 723 KB | 446.4 KB | 1,399 |
| Emergency | 97 | 99 | 1,227 ms | 946 ms | 0 | 96 | 1,181 KB | 907.1 KB | 723 KB | 446.4 KB | 1,130 |
| Level 2 | 99 | 98 | 1,026 ms | 1,066 ms | 0 | 96 | 1,180 KB | 906.7 KB | 723 KB | 446.4 KB | 1,168 |
| Service Areas | 99 | 99 | 1,027 ms | 946 ms | 0 | 92 | 1,181 KB | 910.0 KB | 723 KB | 446.4 KB | 1,051 |
| Panania | 99 | 99 | 1,026 ms | 946 ms | 0 | 96 | 1,184 KB | 913.9 KB | 723 KB | 446.4 KB | 1,021 |

Desktop transfer fell by approximately 23 percent. All desktop performance
scores meet the 95 target and all desktop LCP medians are 1.07 seconds or
less. The small Level 2 score/LCP variation remains well inside the target and
is consistent with normal lab-run variance.

## Final resource breakdown

| Page | Profile | HTML | CSS | JavaScript | Images | Total | FCP | TBT |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | Mobile | 21.2 KB | 59.5 KB | 306.4 KB | 153.4 KB | 586.1 KB | 1,362 ms | 6 ms |
| Services | Mobile | 25.7 KB | 59.5 KB | 306.4 KB | 153.4 KB | 591.6 KB | 1,360 ms | 8 ms |
| Emergency | Mobile | 21.9 KB | 62.1 KB | 306.4 KB | 153.4 KB | 590.3 KB | 1,511 ms | 6 ms |
| Level 2 | Mobile | 21.4 KB | 59.5 KB | 306.4 KB | 153.4 KB | 587.3 KB | 1,361 ms | 6 ms |
| Service Areas | Mobile | 22.2 KB | 59.5 KB | 308.8 KB | 153.4 KB | 590.6 KB | 1,361 ms | 5 ms |
| Panania | Mobile | 20.0 KB | 59.5 KB | 308.8 KB | 153.4 KB | 596.4 KB | 1,208 ms | 11 ms |
| Homepage | Desktop | 21.2 KB | 62.1 KB | 306.3 KB | 446.4 KB | 911.5 KB | 324 ms | 0 ms |
| Services | Desktop | 25.7 KB | 62.1 KB | 306.3 KB | 446.4 KB | 910.9 KB | 325 ms | 0 ms |
| Emergency | Desktop | 21.9 KB | 62.1 KB | 306.3 KB | 446.4 KB | 907.1 KB | 365 ms | 0 ms |
| Level 2 | Desktop | 21.4 KB | 62.1 KB | 306.3 KB | 446.4 KB | 906.7 KB | 325 ms | 0 ms |
| Service Areas | Desktop | 22.2 KB | 62.1 KB | 308.8 KB | 446.4 KB | 910.0 KB | 326 ms | 0 ms |
| Panania | Desktop | 20.0 KB | 62.1 KB | 308.8 KB | 446.4 KB | 913.9 KB | 325 ms | 0 ms |

The total transfer figure includes fonts, tracking and other resources, so it
is higher than the sum of the four displayed categories.

## Static HTML payload

The static HTML remains server rendered and indexable. Responsive source sets
and deferred component boundaries add about 5 to 6 KB raw, or approximately
0.3 to 0.6 KB compressed, per tested route.

| Page | Raw before | Raw after | Gzip before | Gzip after | Brotli before | Brotli after |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 232.5 KB | 237.8 KB | 28.9 KB | 29.4 KB | 17.9 KB | 18.2 KB |
| Services | 387.6 KB | 393.1 KB | 35.7 KB | 36.3 KB | 21.8 KB | 22.2 KB |
| Emergency | 296.1 KB | 301.5 KB | 31.6 KB | 32.3 KB | 18.4 KB | 18.7 KB |
| Level 2 | 277.7 KB | 283.1 KB | 30.6 KB | 31.2 KB | 18.2 KB | 18.5 KB |
| Service Areas | 289.8 KB | 295.8 KB | 29.7 KB | 30.5 KB | 18.9 KB | 19.3 KB |
| Panania | 248.6 KB | 254.0 KB | 27.6 KB | 28.2 KB | 16.9 KB | 17.2 KB |

This small compressed HTML cost is outweighed by a 599.6 KB mobile image
reduction and approximately 276 KB desktop transfer reduction per route.

## Optimisations implemented

### Responsive header and hero images

Eleven WebP derivatives were added under `public/images/performance/`.
Original masters remain present and available as high-resolution fallbacks.
Nothing was deleted based only on filename or age.

- Header storm: 768 and 960 pixel sources
- Header wordmark: 640 and 1,200 pixel sources
- Header energy line: 640 and 960 pixel sources
- Header bolt: 120 and 180 pixel sources
- Hero van: 640, 768 and 960 pixel sources

Static-export-safe `srcset` and `sizes` markup now selects an appropriate
source. Intrinsic dimensions reserve layout space. The actual hero image is
eager and high priority; below-fold media is not promoted. The hero van is the
observed LCP element, not the header artwork.

### Deferred interactive payloads

- The 873-record service-area search index is not requested at initial load.
- It is requested on first focus or query interaction.
- A module-level cache and in-flight request cache ensure all search widgets
  share one request and one parsed result.
- Static Playwright evidence: 0 initial search-index requests; 1 request after
  repeated interactions; Panania result visible.
- Search index payload: 873 records, 131,208 bytes.
- The ServiceM8 frame is dynamically loaded only after a quote action opens
  the modal. Static Playwright evidence: 0 initial ServiceM8 requests and 1
  frame load after the quote action.
- Phone and quote conversion markers remain present and passed the route/CTA
  audit.

### Reduced hydration

The client-only current-year component was removed. The footer now uses stable
server-rendered wording without a runtime clock or hydration boundary.

### CSS and content investigation

- A duplicate hero storm bitmap caused by competing selectors was removed;
  the approved gradient treatment remains.
- CSS transfer remains 59.5 to 62.1 KB. A broad automatic purge was rejected
  because classes are shared across generated service and location templates.
- JavaScript transfer remains 306 to 309 KB. Approximately 147 KB is required
  Google tracking that this task was not authorised to remove or alter.
- No duplicate JSON-LD block was found. Large service and collection schemas
  are intentional structured data, not accidental copies.
- The representative DOM counts are unchanged. No indexable content was moved
  into client-only rendering to improve a score.
- ESLint now excludes the generated untracked Playwright HTML report. This
  prevents bundled third-party report JavaScript from masking source lint
  results; production source remains fully linted.

## Dependency audit

No dependency or lockfile change was made.

| Audit | Critical | High | Main paths |
| --- | ---: | ---: | --- |
| Full dependency tree | 0 | 4 | `brace-expansion`, `next`, `postcss`, `sharp` |
| Production only | 0 | 3 | `next`, `postcss`, `sharp` |

Observed risk conditions:

- `brace-expansion` is a development-only transitive denial-of-service issue
  requiring unbounded attacker-controlled pattern input.
- `postcss` advisories require attacker-controlled CSS or source-map input
  during build processing.
- `sharp` advisories concern attacker-controlled build-time image input through
  inherited libvips paths. The site builds repository-controlled images.
- The current audit recommendation proposes an incompatible Next.js downgrade
  to 9.3.3. It was not applied.

These advisories remain open pending compatible upstream fixes and should be
rechecked before launch. No `npm audit fix --force`, major upgrade or downgrade
was used.

## Production validation

- Lint: pass
- TypeScript (`tsc --noEmit`): pass
- Clean production export: pass, 1,005 static pages
- Generated services: 46
- Fault guides: 15
- Suburbs: 873/873, zero missing, zero response mismatches
- Sitemap/metadata: 1,001 indexable pages, zero warnings
- Internal links: 20,142 checked across 1,004 routes, zero broken
- Visible copy/page health: 1,001 pages, zero critical failures
- Historical pre-deduplication claims/schema audit: 1,001 sitemap entries, 3,985 schema blocks, four offers,
  zero failures
- Static production URL audit: 1,001 canonicals and 20,857 schema URLs, zero
  issues, using the approved preview origin
- Live link and CTA export audit: 127,682 rows, zero broken links or CTA failures
- Responsive visibility: 7,028 route/viewport checks, zero critical failures
- Production responsive smoke: 84 checks passed
- Focused UX Playwright: 31 passed, 9 intentional device-specific skips
- Broader Chromium, Chrome, Edge and WebKit-compatible suites: 74 passed, 388
  intentional project skips
- Full generated-route visibility at 390px: pass
- Header overflow/aspect/coverage checks: pass at 320, 360, 375, 390, 412,
  430, 768, 820, 1,024, 1,280, 1,366, 1,440, 1,920 and 2,560 pixels

Header total heights were 146px at 320/360, 150px at 375/390/412, 154px at
430, 157px at 768/820, 183px at 1,024 and 190px at 1,280 through 2,560.
No horizontal overflow or layout shift was found.

Playwright Firefox could not launch in this local Windows environment because
its software WebRender compositor failed to map the default framebuffer. All
three attempted Firefox tests failed before navigation or any site assertion,
including a retry with acceleration disabled. This is an environment/browser
runner limitation, not evidence of a route regression, but Firefox should be
smoke-tested on another machine before launch.

## Outcome and remaining work

- Mobile performance target of 90: met on all six routes.
- Desktop performance target of 95: met on all six routes.
- CLS target of 0.1 or lower: met at 0 on every measured route.
- Desktop LCP target of 2.5 seconds: met.
- Mobile LCP target of 2.5 seconds: not met; final medians are 3.30 to 3.52
  seconds.

Further mobile LCP gains are likely to require a smaller mobile hero derivative
or a carefully tested change to the above-fold composition. Tracking is the
largest remaining authorised JavaScript constraint. Neither should be changed
without preserving the approved mobile van composition and conversion events.

Owner accuracy confirmation is still required immediately before launch for
the current Google review count and all four offer terms. No deployment or
external-system change was performed.
