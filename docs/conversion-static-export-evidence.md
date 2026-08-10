# Conversion truth and static-export hardening evidence

Date: 2026-08-11 (Australia/Sydney)

## Result

**SCOPED TECHNICAL RESULT: PASS**

The Google Ads base tag now starts `afterInteractive`, Windows static-export
aliases are deterministic and byte-verified, and genuine Next Link navigation
passes against a Pages-like `/evaready-electrical/` server. No Google Ads
click-conversion event was invented or installed. The overall website remains
blocked by mobile Lighthouse Performance of 81-84, mobile LCP of
4,584-5,108 ms, owner-supplied conversion labels, and the other launch gates
documented separately.

These are local laboratory results. They are not field Core Web Vitals, and
INP was not measured.

## Source identity

- Branch: `codex/responsive-ux-overhaul`
- Starting local and remote SHA:
  `4a8005995501dc8676e04aaec3fcd385eec344a7`
- Tested implementation SHA:
  `668a05941e84de514081228b7077b8677e01ef55`
- Node.js: `22.23.1`
- npm: `10.9.8`
- Next.js: `16.3.0`
- Lighthouse: `13.4.1`
- Chrome binary: `151.0.7922.108`
- Lighthouse user-agent version: `151.0.0.0`
- Preview base path: `/evaready-electrical`
- Lighthouse base URL: `http://127.0.0.1:4192/evaready-electrical`

## Conversion truth

| Measurement | Baseline | After |
| --- | ---: | ---: |
| Google Ads ID | `AW-18165545331` | `AW-18165545331` |
| Base tag present | Yes | Yes |
| External library strategy | `lazyOnload` | `afterInteractive` |
| Source files with inspected markers | 50 | 50 |
| Marker attribute declarations | 91 | 91 |
| Phone marker values | 50 | 50 |
| Quote marker values | 42 | 42 |
| Explicit `gtag` event calls | 0 | 0 |
| `send_to` values | 0 | 0 |
| Conversion labels | 0 | 0 |
| Event callbacks | 0 | 0 |
| Conversion timeouts | 0 | 0 |

The final export contains 1,004 HTML files; all 1,004 contain the base tag.
Generated HTML contains 6,324 phone markers, 6,272 quote markers and zero
explicit conversion events. Marker attributes classify interactions for tests
and future integration. They do not prove that Google received a conversion.

Owner launch work remains:

1. Supply the real phone and quote conversion labels from the owner Google Ads
   account if those events are approved.
2. Implement only those approved labels and event semantics.
3. Verify the base tag and future events with Tag Assistant and the owner
   account without creating duplicate or false conversions.

No Google request or conversion event was sent by the automated tests.

## Windows export normalisation

The alias count is specific to the measured Windows Next.js 16.3 export. Prior
committed Ubuntu evidence reported that the required flat payloads were emitted
directly and therefore generated zero aliases. Ubuntu was unavailable in this
task, so that prior result was not locally reproduced and is not presented as
current cross-platform proof.

| Windows measurement | Baseline | After |
| --- | ---: | ---: |
| Static-generation entries | 1,005 | 1,005 |
| Aliases | 1,001 | 1,001 |
| Fixed aliases | Not recorded | 12 |
| Dynamic aliases | Not recorded | 989 |
| Duplicated alias bytes | 64,947,040 | 64,947,040 |
| Manifest bytes | 312,992 | 397,231 |
| Export file count | 7,131 | 7,131 |
| Raw export bytes | 699,319,357 | 699,527,052 |
| Compressed artifact bytes | 89,834,541 | 89,904,291 |
| `.nojekyll` present | Yes | Yes |
| Deterministic manifest | No | Yes |
| Byte identity verified | Not recorded | Yes |
| Complete nested-payload coverage | Not recorded | Yes |

The final manifest SHA-256 was reproduced twice as
`2ed410e3c10e61c678d47cc49fe55238cd9830cadecaffb3620072998df6f56c`.
The final archive SHA-256 is
`4376b38c1547ddee4fa3965bdc43fcf13c9139839fcb741efb4f1c6f23a19cad`.
The larger manifest records deterministic source hashes and verification data;
the alias payload byte total itself did not change.

## Pages-like navigation

Focused Playwright ran against
`http://127.0.0.1:4192/evaready-electrical/`:

```text
npx playwright test tests/e2e/non-header-performance.spec.ts tests/e2e/static-export-navigation.spec.ts --project=desktop-chromium-1440 --project=mobile-chrome-390 --workers=1 --reporter=json
```

- Desktop Chromium: 3 passed, 0 failed, 0 skipped.
- Mobile Chrome: 2 passed, 0 failed, 1 deliberately skipped because the
  seven-route sequence runs once in representative desktop Chromium.
- Total: 5 passed, 0 failed, 1 skipped.
- Route types: homepage, Services, service detail, fault guide, region, area
  and suburb.
- Operations: hover/prefetch, client click, browser Back and direct navigation.
- Final tested pathname:
  `/evaready-electrical/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/`.
- Segment MIME: `text/plain; charset=utf-8`.
- Unexplained first-party failures: 0.
- First-party console errors: 0.

The server continues to reject incorrect origin-root paths; tests cannot pass
by accidentally dropping the GitHub preview base path.

## Lighthouse comparison

Each value below is the median of three runs under the same environment,
server, profiles and throttling.

| Page | Mobile Perf before/after | Mobile LCP before/after | Desktop Perf before/after | Desktop LCP before/after |
| --- | ---: | ---: | ---: | ---: |
| Homepage | 81 / 82 | 5,034 / 4,883 ms | 96 / 96 | 1,388 / 1,387 ms |
| Services | 81 / 81 | 5,033 / 5,035 ms | 96 / 96 | 1,388 / 1,387 ms |
| Service Areas | 83 / 83 | 4,661 / 4,660 ms | 96 / 96 | 1,347 / 1,348 ms |
| Emergency | 81 / 81 | 5,033 / 5,108 ms | 96 / 96 | 1,387 / 1,387 ms |
| Level 2 | 84 / 82 | 4,587 / 4,810 ms | 97 / 97 | 1,308 / 1,308 ms |
| Switchboards | 82 / 81 | 4,884 / 5,107 ms | 96 / 96 | 1,387 / 1,387 ms |
| Fault guide | 84 / 83 | 4,584 / 4,733 ms | 96 / 96 | 1,432 / 1,370 ms |
| Region | 82 / 82 | 4,884 / 4,809 ms | 96 / 96 | 1,349 / 1,347 ms |
| Area | 82 / 82 | 4,884 / 4,808 ms | 96 / 96 | 1,348 / 1,347 ms |
| Panania | 84 / 84 | 4,585 / 4,584 ms | 97 / 97 | 1,308 / 1,308 ms |

The after matrix has CLS 0, mobile TBT 7-11 ms, desktop TBT 0, zero HTTP
failures and zero console errors. Mobile route transfer is
880,803-954,889 bytes; desktop route transfer is 1,501,515-1,577,555 bytes.
Against the exact baseline, transfer deltas were only -25 to +40 bytes and
request counts were unchanged. Restoring `afterInteractive` therefore did not
produce the previously anticipated 122-150 KB increase in this exact matrix.
The measurements are within normal laboratory variation, not evidence of an
LCP optimisation.

One earlier after-change attempt targeted a local server that had exited. Every
report from that attempt contained `CHROME_INTERSTITIAL_ERROR` and zero values.
Those invalid reports are excluded from all medians and are not committed.

## Validation

The exact implementation passed:

- `npm ci` (362 packages)
- `npm audit` (0 vulnerabilities)
- `npm audit --omit=dev` (0 vulnerabilities)
- `npm run lint`
- `npx tsc --noEmit`
- clean preview-configured `npm run build` (1,005 entries)
- `npm run test:location-audits` (28 passed)
- deterministic static-export and conversion-truth audits
- internal links, metadata, page health, schema-visible output, claims, offers,
  CTA destinations, ServiceM8 markers and visible-copy audits
- focused explicit-base-path Playwright
- 60 valid after-change Lighthouse runs
- `git diff --check`

The separate owner indexation launch gate remains blocked as designed. The
current mobile Lighthouse threshold remains blocked. Neither is weakened by
this scoped technical pass.

## Evidence files

Machine-readable evidence is in
`reports/conversion-static-export-hardening/`, including:

- conversion counts and conclusion;
- static-export before/after measurements;
- complete per-run and median Lighthouse JSON/CSV;
- SHA-256 manifests for all raw Lighthouse reports;
- one compressed representative raw report per route/profile/phase;
- the Playwright result summary; and
- exact commands and environment metadata.

No visible UI, content, route, metadata, schema, canonical, sitemap, footer,
ServiceM8 destination, Google rating behaviour or header file was changed.
