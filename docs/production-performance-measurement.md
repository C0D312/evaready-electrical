# Production Performance Measurement

> **Superseded current-status evidence.** This document records the earlier
> `d1e88b` performance-optimisation run. It remains useful as historical task
> evidence, but it is not the current measurement for source commit `a404e774`.
> The reconciled exact-source results are stored in
> `reports/production-performance/final-a404/` and are used by
> `docs/final-non-header-launch-readiness-report.md`.

Date: 2026-08-08 (Australia/Sydney)

## Result

The production static export was measured before and after the task with the
same Node, Lighthouse, Chrome, routes, profiles, server, and throttling setup.
The optimisations reduced mobile image transfer by about 133 KB on routes with
the four offer cards and by about 243 KB on the representative fault guide.
Desktop performance is 96-97 with 1.31-1.39 second median LCP. Mobile
performance improved, but the requested 90+ performance and 2.5 second LCP
targets were not reached safely.

These are Lighthouse laboratory measurements from a local production export.
They are not field Core Web Vitals. This navigation-only test does not measure
INP.

## Test Environment

- Branch: `codex/responsive-ux-overhaul`
- Node.js: `22.23.1`
- npm: `10.9.8`
- Next.js: `16.3.0`
- Lighthouse: `13.4.1`
- Chrome: `151.0.7922.108`
- Build target: existing `github-preview` static export
- Base path: `/evaready-electrical`
- Server: `scripts/serve-static-export.ts` on `127.0.0.1:4178`
- Runs: three per route per profile; reported values are medians
- Profiles: Lighthouse mobile default and Lighthouse desktop preset
- Total reports per phase: 10 routes x 2 profiles x 3 runs = 60

Reproduction commands, run in PowerShell with the official Node 22 binary first
on `PATH`:

```powershell
$node22 = "C:\Users\Admin\AppData\Local\Temp\node-v22.23.1-win-x64"
$env:PATH = "$node22;$env:PATH"
$env:NEXT_PUBLIC_DEPLOYMENT_TARGET = "github-preview"
Remove-Item -LiteralPath .next,out -Recurse -Force
npm.cmd run build

$env:STATIC_EXPORT_HOST = "127.0.0.1"
$env:STATIC_EXPORT_PORT = "4178"
npx.cmd tsx scripts/serve-static-export.ts

$env:PERF_BASE_URL = "http://127.0.0.1:4178/evaready-electrical"
$env:PERF_PHASE = "after"
$env:PERF_RUNS = "3"
$env:LIGHTHOUSE_BIN = "C:\Users\Admin\AppData\Local\Temp\evaready-lighthouse-tooling\node_modules\lighthouse\cli\index.js"
npm.cmd run audit:lighthouse
```

`PERF_PROFILES` can restrict a run to `mobile`, `desktop`, or both.
`PERF_ROUTE_FILTER` can restrict a diagnostic run to a matching route label or
path. Neither option was used for the final 60-run comparison.

## Mobile Medians

Times are milliseconds and transfer is total transferred bytes.

| Route | Performance | FCP | LCP | TBT | CLS | Transfer | A11y | DOM |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 80 -> 82 | 1359 -> 1270 | 5410 -> 4882 | 9 -> 4 | 0 | 929666 -> 797028 | 100 | 949 |
| Services | 80 -> 81 | 1357 -> 1358 | 5408 -> 5108 | 4 -> 6 | 0 | 937107 -> 804517 | 100 | 1442 |
| Service Areas | 82 -> 82 | 1209 -> 1360 | 4809 -> 4885 | 7 -> 9 | 0 | 733746 -> 734004 | 100 | 1041 |
| Emergency Electrician Sydney | 80 -> 81 | 1508 -> 1507 | 5333 -> 5032 | 3 -> 5 | 0 | 935843 -> 803196 | 100 | 1198 |
| Level 2 Electrician Sydney | 84 -> 84 | 1359 -> 1360 | 4584 -> 4585 | 5 -> 5 | 0 | 730164 -> 730422 | 100 | 1153 |
| Switchboard Upgrades Sydney | 80 -> 82 | 1357 -> 1357 | 5408 -> 4882 | 3 -> 6 | 0 | 932056 -> 799389 | 100 | 1235 |
| No Power In One Room | 78 -> 83 | 1358 -> 1208 | 5862 -> 4658 | 8 -> 10 | 0 | 1012947 -> 769721 | 100 | 854 |
| Canterbury-Bankstown region | 82 -> 83 | 1359 -> 1358 | 4809 -> 4659 | 8 -> 5 | 0 | 731812 -> 732064 | 100 | 878 |
| Canterbury-Bankstown area | 82 -> 83 | 1359 -> 1358 | 4810 -> 4658 | 7 -> 4 | 0 | 733577 -> 733834 | 100 | 1218 |
| Panania suburb | 83 -> 84 | 1359 -> 1358 | 4734 -> 4583 | 7 -> 4 | 0 | 731707 -> 731972 | 100 | 1000 |

All mobile medians scored 96 for Best Practices and 100 for SEO. The small
timing movements on routes without changed media are normal laboratory
variation; their payloads remained effectively unchanged.

## Desktop Medians

| Route | Performance | FCP | LCP | TBT | CLS | Transfer | A11y | DOM |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 96 -> 96 | 326 -> 327 | 1446 -> 1387 | 0 -> 0 | 0 | 1458784 -> 1326163 | 93 | 949 |
| Services | 96 -> 96 | 328 -> 327 | 1448 -> 1387 | 0 -> 0 | 0 | 1466225 -> 1333652 | 93 | 1442 |
| Service Areas | 96 -> 96 | 327 -> 327 | 1347 -> 1347 | 0 -> 0 | 0 | 1262864 -> 1263139 | 93 | 1041 |
| Emergency Electrician Sydney | 96 -> 96 | 367 -> 367 | 1447 -> 1387 | 0 -> 0 | 0 | 1462351 -> 1329721 | 93 | 1198 |
| Level 2 Electrician Sydney | 97 -> 97 | 327 -> 327 | 1307 -> 1307 | 0 -> 0 | 0 | 1259282 -> 1259557 | 93 | 1153 |
| Switchboard Upgrades Sydney | 96 -> 96 | 327 -> 327 | 1447 -> 1387 | 0 -> 0 | 0 | 1461174 -> 1328524 | 93 | 1235 |
| No Power In One Room | 96 -> 96 | 327 -> 327 | 1371 -> 1370 | 0 -> 0 | 0 | 1256395 -> 1256783 | 93 | 854 |
| Canterbury-Bankstown region | 96 -> 96 | 327 -> 328 | 1347 -> 1348 | 0 -> 0 | 0 | 1259811 -> 1260078 | 93 | 878 |
| Canterbury-Bankstown area | 96 -> 96 | 327 -> 327 | 1347 -> 1347 | 0 -> 0 | 0 | 1261576 -> 1261848 | 93 | 1218 |
| Panania suburb | 97 -> 97 | 327 -> 327 | 1307 -> 1307 | 0 -> 0 | 0 | 1259706 -> 1259986 | 93 | 1000 |

All desktop medians scored 96 for Best Practices and 100 for SEO.

## Payload Medians

The CSS, JavaScript, image, and request columns are browser transfer values from
the mobile Lighthouse profile. Raw, gzip, and Brotli columns are static HTML
bytes measured directly from the export. DOM values were recovered from the
retained Lighthouse 13 `dom-size-insight` audits for both phases.

| Route | Raw HTML | Gzip HTML | Brotli HTML | CSS | JavaScript | Images | Requests | DOM |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 230122 -> 234327 | 29757 -> 30134 | 21373 -> 21577 | 61430 -> 61485 | 155187 -> 155187 | 674197 -> 541097 | 29 -> 29 | 949 |
| Services | 421955 -> 426160 | 42107 -> 42516 | 28814 -> 29066 | 61430 -> 61485 | 155187 -> 155187 | 674197 -> 541097 | 29 -> 29 | 1442 |
| Service Areas | 304589 -> 304551 | 32000 -> 31990 | 22997 -> 22993 | 61430 -> 61485 | 157679 -> 157683 | 474161 -> 474161 | 26 -> 26 | 1041 |
| Emergency Electrician Sydney | 329270 -> 333475 | 37558 -> 37968 | 24940 -> 25135 | 64040 -> 64095 | 155187 -> 155187 | 674197 -> 541097 | 30 -> 30 | 1198 |
| Level 2 Electrician Sydney | 289872 -> 289872 | 32232 -> 32233 | 21907 -> 21907 | 61430 -> 61485 | 155187 -> 155187 | 474161 -> 474161 | 25 -> 25 | 1153 |
| Switchboard Upgrades Sydney | 304795 -> 309000 | 34335 -> 34715 | 23763 -> 23938 | 61430 -> 61485 | 155187 -> 155187 | 674197 -> 541097 | 29 -> 29 | 1235 |
| No Power In One Room | 199853 -> 200603 | 24280 -> 24423 | 17965 -> 18078 | 61430 -> 61485 | 155187 -> 155187 | 759831 -> 516234 | 29 -> 29 | 854 |
| Canterbury-Bankstown region | 240550 -> 240511 | 27798 -> 27786 | 19944 -> 19932 | 61430 -> 61485 | 157679 -> 157683 | 474161 -> 474161 | 29 -> 29 | 878 |
| Canterbury-Bankstown area | 310987 -> 310947 | 30039 -> 30028 | 20528 -> 20518 | 61430 -> 61485 | 157679 -> 157683 | 474161 -> 474161 | 32 -> 32 | 1218 |
| Panania suburb | 254584 -> 254584 | 28292 -> 28294 | 19961 -> 19961 | 61430 -> 61485 | 155187 -> 155187 | 474161 -> 474161 | 34 -> 34 | 1000 |

The extra 4.2 KB raw HTML on offer-showcase routes is responsive `<picture>`
markup. It costs only about 0.2-0.4 KB compressed while selecting images that
save about 133 KB of transfer. JavaScript transfer did not increase.

## Implemented Optimisations

1. The four existing offer artworks now have 360, 480, and 720 pixel WebP
   variants selected through semantic `<picture>` markup. The original artwork
   remains the fallback and no offer wording, conditions, CTA, or route changed.
2. Fault-guide heroes now select existing 640 and 768 pixel van images on small
   viewports while retaining the original master on desktop. This avoids a
   duplicate desktop download and saves about 243 KB on the tested mobile fault
   route.
3. The service-area search only emits `aria-controls` when its results container
   exists. This fixed the measured accessibility failure on service-area,
   region, and area pages without changing interaction or data loading.
4. A versioned Lighthouse runner now records all requested categories, timing
   metrics, compressed HTML sizes, resource bytes, request counts, DOM size,
   LCP element, and raw reports with repeatable route/profile filters.

No header source, style, asset, test, layout, or behaviour was changed.

## Remaining Bottlenecks And Targets

- Desktop meets the suggested performance and LCP targets.
- Mobile CLS is 0 and TBT is at most 10 ms, comfortably meeting those targets.
- Mobile accessibility is 100 and SEO is 100. Best Practices is 96 because the
  sandbox blocks the preserved Google tracking request with
  `ERR_NETWORK_ACCESS_DENIED`; this is a laboratory environment limitation, not
  a removed or rewritten integration.
- Mobile performance remains below 90 and median LCP remains above 2.5 seconds.
  Lighthouse confirms the hero LCP image is eager, high-priority, and
  discoverable in the initial document.
- The final mobile homepage image audit estimates 409811 bytes of potential
  savings. About 330770 bytes (81%) belongs to the wordmark, bolt, and energy
  line in the explicitly frozen header. Those assets were not changed.
- The next broad opportunity is stylesheet delivery. Splitting the established
  cross-route cascade immediately before launch would have a larger regression
  risk than the measured 320 ms render-blocking estimate, so it was not changed
  in this surgical pass.
- The shared JavaScript has low blocking cost (0-10 ms TBT). A runtime rewrite
  was not justified by the measurements.

The mobile target should be revisited in a separately approved header and CSS
delivery task. Content, conversion controls, tracking, phone links, ServiceM8,
and indexable server-rendered output should not be weakened to inflate a score.

## Machine-Readable Evidence

- `reports/production-performance/baseline-runs.json`
- `reports/production-performance/baseline-medians.json`
- `reports/production-performance/baseline-medians.csv`
- `reports/production-performance/after-runs.json`
- `reports/production-performance/after-medians.json`
- `reports/production-performance/after-medians.csv`

Raw Lighthouse reports are intentionally kept outside the repository at
`%TEMP%\evaready-production-lighthouse\baseline` and
`%TEMP%\evaready-production-lighthouse\after`. Each phase contains 60 reports.

Lighthouse wrote every valid report but returned a non-zero process status on
Windows after each run because Chrome's temporary profile remained briefly
locked (`EBUSY`). The runner records this as `cliCleanupWarning`; there were no
other Lighthouse process errors.

## Visual Evidence

- `reports/production-performance/visual-after/homepage-desktop-1366x900.png`
- `reports/production-performance/visual-after/homepage-mobile-390x900.png`
- `reports/production-performance/visual-after/services-desktop-1366x900.png`
- `reports/production-performance/visual-after/fault-guide-mobile-390x900.png`

The final production screenshots were inspected for missing content, image
cropping, overflow, layout shifts, and conversion-control regressions.

## Validation

All commands below used Node.js `22.23.1`, the `github-preview` deployment
target, and the `/evaready-electrical` base path.

- ESLint: passed.
- TypeScript (`tsc --noEmit`): passed.
- Clean production build: passed; 1,005 static pages generated.
- Suburb audit: 873 pages, zero warnings, zero duplicate URL issues.
- Internal-link audit: 1,004 known routes, 1,003 generated HTML routes,
  20,143 links checked, zero broken links, zero generated-output issues.
- Metadata audit: 1,001 indexable rows, zero warnings.
- Page-health audit: 1,001 routes, zero critical warnings.
- Visible-copy audit: 1,001 pages, zero warnings.
- Response classification audit: 873 suburbs, zero hard mismatches.
- Claims audit: zero failures and zero unsupported visible claims.
- Offer distribution audit: zero failures.
- Performance-asset audit: 6,139 export files and no file over 500 KB.
- Playwright core route and route-matrix checks: four passed across 390px
  mobile and 1440px desktop Chromium.
- Playwright offer, responsive artwork, and service-area ordering checks:
  twelve passed across 390px mobile and 1440px desktop Chromium.
- `git diff --check`: passed for the task-owned source changes.

One full-site visibility invocation was discarded because that suite starts a
private root-only static server while the clean export was built with the
GitHub base path. Its resulting prefixed-asset 404s were a test-harness mismatch,
not a result from the production-like server. The equivalent route, asset,
overflow, console, and conversion checks passed against the verified server at
`http://127.0.0.1:4178/evaready-electrical/` and are the results reported above.
