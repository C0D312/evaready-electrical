# Launch Readiness Report

Recorded: 2026-07-26

## Executive result

The repository is buildable, route-complete and regression-tested after a conservative
cleanup. One obsolete component was removed, Service Areas initial HTML was reduced,
schema serialization was hardened, responsive auditing was broadened and Next.js was
updated within its current release line.

No deployment, DNS record, repository setting, external account, Google Ads/Analytics
configuration or ServiceM8 configuration was changed.

## Exact implementation changes

- Deferred the 873-record service-area search index until a visitor interacts with search.
- Added deterministic generation of `public/service-area-search-index.json` before build.
- Preserved query-string search restoration, keyboard links and local region-page search.
- Removed the unreferenced `FooterLinkGroups` component and exclusively owned dead CSS.
- Escaped `<` in JSON-LD output and routed the two remaining direct schema serializers
  through the shared safe helper.
- Made production responsive smoke auditing base-path aware and expanded it to all 14
  required viewports.
- Corrected the cross-device test so XML, text and JSON endpoints are checked through the
  request API rather than browser download navigation.
- Updated Next.js and its ESLint config from 16.2.6 to 16.2.12.

## Route and SEO preservation

| Check | Final result |
| --- | --- |
| Static pages | 1,005 generated |
| Known routes | 1,004 |
| Service pages | 46 |
| Fault guides | 15 |
| Regions / areas / suburbs | 16 / 39 / 873 |
| Suburb completeness | 873 records, 0 missing, 0 warnings |
| Internal links | 20,171 checked, 0 broken |
| Metadata | 1,001 pages, 0 warnings |
| Visible copy | 1,001 pages, 0 warnings |
| Page health | 1,001 pages, 0 critical findings |
| Response classifications | 873 records, 0 mismatches |
| Route visibility | 1,004 routes, 0 critical failures |
| Production-domain audit | 1,001 canonicals, 1,001 sitemap URLs, 20,857 schema URLs and 21,980 asset URLs; 0 issues |

No title, description, H1, canonical policy, sitemap route, schema claim, offer condition,
review value, response classification or approved page copy was intentionally changed.

## Accessibility, responsive and browser results

- Focused production-static Playwright: 27 passed, 7 intentional breakpoint skips,
  0 failed. The skips are assertions that are inapplicable when the corresponding mobile
  or desktop-only control is intentionally hidden.
- Exhaustive visibility: 7,028 checks passed across every known route.
- Responsive production smoke: 84/84 passed at 320, 360, 375, 390, 412, 430, 768, 820,
  1024, 1280, 1366, 1440, 1920 and 2560 pixels.
- Available browser projects passed the 23-route matrix in desktop Chromium, installed
  Chrome, installed Edge, WebKit, mobile Chrome emulation, mobile Safari emulation and
  iPad emulation.
- Mobile menu focus/scroll lock, browser Back handling, quote modal Back handling and
  scroll restoration, skip link, keyboard focus, sticky CTA spacing, dropdown navigation,
  offer terms and conversion links passed focused tests.
- No horizontal-overflow, application console or hydration failures were found.

Two test-environment limitations remain: Firefox could not initialise its Windows
headless SWGL compositor, and after all seven available browser projects reported passed,
one Playwright worker did not terminate before the outer 300-second cleanup timeout.
Neither limitation represented a failed site assertion.

## Security and integration result

- No tracked `.env` file, private key, token or obvious credential file was found.
- JSON-LD now escapes HTML-significant `<` characters before inline serialization.
- Phone conversion markers, quote conversion markers, `tel:+61461247247`, Google Ads ID
  and ServiceM8 quote URL remain in the production export.
- `npm audit` reports 0 critical advisories, 12 high advisories in the complete development
  graph and 3 high advisories in the production graph. The remaining automated remedies
  require incompatible major/downgrade changes, so `--force` was not used.
- The site is a static export; there is no application server or repository-hosted form
  handler to harden in this codebase.

The remaining dependency advisories should be re-evaluated when compatible upstream
releases are available. They are a launch consideration, not concealed as a pass.

## Build gate

| Command/check | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npx tsc --noEmit` | PASS |
| Clean production build | PASS, 1,005 static pages |
| All source audits | PASS |
| Production URL/asset audit | PASS |
| Responsive and interaction checks | PASS, with environment notes above |
| `git diff --check` | PASS |

## GitHub safety

- Working branch: `codex/responsive-ux-overhaul`.
- `.github/workflows/pages.yml` triggers only on a push to `main` or manual dispatch.
- The workflow validates and exports but contains no deployment action.
- Pushing this feature branch does not meet the workflow trigger and does not deploy
  GitHub Pages or the branded production domain.

## Remaining launch blockers and owner review

1. Resolve or explicitly risk-accept the remaining npm advisories when compatible package
   fixes exist; do not use the currently suggested destructive major/downgrade fixes.
2. Run a controlled production Lighthouse/Web Vitals capture from the intended launch
   host if numerical LCP/CLS/INP launch thresholds are mandatory.
3. Investigate the local Firefox headless graphics failure on a Firefox-capable CI runner.
4. Decide whether conventional duplicate icon files and legacy branded image variants may
   be removed; they were retained safely.
5. Review the approved wide-screen header height separately if 1920/2560 scaling is no
   longer desired. It was intentionally not altered in this preservation-focused cleanup.

Subject to those transparent owner decisions, the application-level launch gate passes:
all legitimate routes, conversions, responsive behaviours and SEO signals remain intact.
