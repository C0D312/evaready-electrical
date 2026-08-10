# Final non-header launch-readiness report

Date: 2026-08-08 (Australia/Sydney)

> **Current tracking/export evidence update (11 August 2026).** The scoped
> correction at implementation commit `668a05941e84de514081228b7077b8677e01ef55`
> supersedes this report's earlier treatment of the Google Ads loader and
> Windows static-export aliases. The base tag and CTA classification markers
> are present, but explicit phone-click and quote-click Google Ads conversion
> events are not installed because owner-supplied conversion labels are not
> available. Current machine-readable evidence is under
> `reports/conversion-static-export-hardening/`.

## Verdict

**NOT READY**

The non-header application is technically stable: the clean Node.js 22 build,
1,005-page static generation, route inventories, 873 suburb checks, SEO
generators, internal links, conversion links, modal behaviour, keyboard paths,
responsive geometry and dependency audits pass. Two objective responsive
defects found during the preceding launch gate were corrected without changing
the header:

- internal service hero grids no longer overflow at tablet widths; and
- the footer Call action now wraps cleanly at 320px.

Launch approval is still blocked by content-quality and evidence gaps. The 873
suburb pages have a 99.94% locality-normalised repeated-block word rate and no approved local
job, photograph or testimonial evidence. Owner decisions are also required for
business credentials and every offer, while a verified Google Places browser
key and Place ID are required before the rating widget can be called live. The
exact-current Lighthouse matrix also leaves mobile performance below the
approved launch thresholds, so the performance result is a blocker rather than
a pass.

The header was explicitly excluded from this audit. No header source, CSS,
asset or test was reviewed or changed.

## Finding classification

| Classification | Finding | Required action |
| --- | --- | --- |
| PASS | Node.js 22 clean install, lint, TypeScript and clean static export | None |
| PASS | 1,004 known routes, 1,001 indexable sitemap URLs and 873/873 suburbs | None |
| PASS | Internal links, metadata, canonicals, robots, schema URLs and 404 behaviour | None |
| PASS | Phone, quote and ServiceM8 destinations; Google Ads base tag and CTA classification markers | None |
| EXTERNAL CONFIGURATION REQUIRED | Google Ads click-conversion events | Supply the real phone and quote conversion labels from the owner account, implement the approved events, then verify with Tag Assistant and Google Ads; marker presence alone is not a conversion |
| PASS | Keyboard, quote-modal Back handling, mobile sticky CTA and tested responsive layouts | None |
| PASS | Full and production dependency audits report zero vulnerabilities | None |
| OWNER CONFIRMATION REQUIRED | Electrical licence, company registration, Level 2 status, network coverage and response wording | Owner must verify the exact current evidence and scope immediately before launch |
| OWNER CONFIRMATION REQUIRED | Insurance, experience and warranty wording | Do not publish new claims until documentary evidence and approved wording are supplied |
| OWNER CONFIRMATION REQUIRED | All four offers and their exclusions | Reconfirm eligibility, exclusions, non-stacking and any expiry immediately before launch |
| OWNER CONFIRMATION REQUIRED | Photographs, people and testimonials | Confirm provenance, publication rights, vehicle-plate approval and customer permission |
| EXTERNAL CONFIGURATION REQUIRED | Live Google rating | Supply the exact verified Place ID and a restricted browser API key; verify a genuine response for EVAREADY ELECTRICAL |
| BLOCKER | Location-page helpful-content quality | Decide the indexation/evidence plan and add truthful owner-approved local evidence to priority pages before launch |
| BLOCKER | Exact-`668a059` mobile Lighthouse performance is 81-84 and LCP is 4.58-5.11 seconds | Approve and test a non-header LCP/payload optimisation without weakening conversion content or tracking |
| DEFERRED HEADER ITEM | Header design and behaviour | Separate owner review; deliberately outside this task |

## Repository and toolchain

- Branch: `codex/responsive-ux-overhaul`
- Current performance evidence implementation: `668a05941e84de514081228b7077b8677e01ef55`
- Tracking/export task starting local and remote HEAD: `4a8005995501dc8676e04aaec3fcd385eec344a7`
- Node.js: `22.23.1`
- npm: `10.9.8`
- Next.js: `16.3.0`
- React / React DOM: `19.2.4` / `19.2.4`
- TypeScript: `5.9.3`
- Tailwind CSS: `4.3.0`
- ESLint: `9.39.4`
- Playwright: `1.60.0`

The clean exact-commit worktree used an isolated npm cache and
`npm ci --ignore-scripts --no-audit`, which installed 366 packages. Separate
full and production-only `npm audit` commands then reported zero
vulnerabilities. The lockfile contains the compatible transitive `nanoid`
3.3.18 patch. The exact lockfile-update command was not retained. In
particular, `npm ci` did not produce that lockfile change.

## Commands and results

The build commands below used the GitHub Pages preview configuration and did
not access the branded domain:

```powershell
$env:NEXT_PUBLIC_DEPLOYMENT_TARGET='github-preview'
$env:NEXT_PUBLIC_BASE_PATH='/evaready-electrical'
$env:NEXT_PUBLIC_SITE_URL='https://c0d312.github.io/evaready-electrical'
npm ci --ignore-scripts --no-audit
npm run lint
npx tsc --noEmit
npm run build
```

| Check | Result |
| --- | --- |
| Clean dependency installation | PASS - 366 packages installed from the current lockfile |
| `npm run lint` | PASS |
| `npx tsc --noEmit` | PASS |
| Clean production build | PASS - Next.js 16.3.0; 1,005 static pages generated |
| `npm audit` | PASS - 0 low, moderate, high or critical vulnerabilities |
| `npm audit --omit=dev` | PASS - 0 low, moderate, high or critical vulnerabilities |
| `npm run audit:suburbs` | PASS - 873 suburbs; 0 duplicates; 0 warnings |
| all-suburb visible-copy audit | PASS - 873 checked; 0 missing; 0 warnings |
| `npm run audit:links` | PASS - 20,143 internal links; 0 broken; 0 output issues |
| `npm run audit:metadata` | PASS - 1,001 indexable pages; 0 warnings |
| page-health audit | PASS - 1,001 pages; 0 critical issues |
| response-time audit | PASS - 873 classifications; 0 mismatches |
| claims/offer audit | PASS technically - 0 unsupported visible claims; owner reconfirmation remains required |
| offers route audit | PASS - full showcase on 4 routes; compact treatment on the remaining intended routes |
| production-domain static audit | PASS - 1,001 canonicals, 1,001 unique sitemap URLs, 14,746 schema URLs, 40,092 asset references; 0 issues |
| visible-copy audit | PASS - 1,001 pages; 0 warnings |
| asset audit | PASS - 6,129 exported files; no file over the configured 500KB limit |
| live link and CTA audit | PASS - 1,004 HTML routes; 131,186 rows; 0 broken links; 0 CTA failures |
| static visibility inventory | PASS - 1,004 routes; 873 suburbs; 0 critical or missing outputs |
| exact-current Lighthouse matrix | BLOCKER - 60/60 runs completed; mobile 81-84 performance and 4.58-5.11s LCP |
| explicit-local Playwright matrix | PASS - 104 passed, 0 failed, 196 viewport/project skips across 15 projects |
| `git diff --check` | PASS |
| secret scan | PASS - no committed API key, token, private key or `.env.local`; only blank `.env.example` placeholders |

The exhaustive all-route browser visibility runner did not complete in the
earlier gate and was not rerun during this evidence reconciliation. It remains
**incomplete**, not a pass. The current browser result is explicitly limited to
six non-header interaction suites on representative routes. Static route,
link, metadata, schema, visible-copy and CTA audits still cover the complete
export, but that is not equivalent to exhaustive all-route/all-browser UI
coverage.

## Route and output inventory

| Inventory | Count | Result |
| --- | ---: | --- |
| Next.js static-generation entries | 1,005 | PASS |
| Known application routes | 1,004 | PASS |
| Exported HTML files | 1,004 | PASS |
| Generated route `index.html` files | 1,003 | PASS |
| Indexable sitemap URLs | 1,001 | PASS |
| Generated service pages | 46 | PASS |
| Fault guides | 15 | PASS |
| Regions | 16 | PASS |
| Areas | 39 | PASS |
| Suburbs | 873 | PASS |

The counts describe different inventories rather than a mismatch. The build
includes framework/static special output, while the sitemap intentionally
contains only indexable URLs and excludes special/non-indexable pages.

## SEO and crawlability

### PASS

- Every audited indexable page has consistent preview-host canonicals.
- The sitemap contains 1,001 unique intended URLs with no duplicate variants.
- `robots.txt` allows legitimate crawling and references only the GitHub Pages
  preview sitemap.
- Metadata and page-health audits report no warnings or critical errors.
- JSON-LD parses successfully; production schema URLs use the configured
  preview origin.
- No stale `83` or `105` review count appears in production source, generated
  HTML, schema, tests or fallback content.
- No unsupported `AggregateRating` schema is emitted.
- Internal-link audit found zero broken links in 20,143 checked links.
- Unknown routes return HTTP 404; the generated 404 is `noindex`, contains one
  main landmark and retains the phone pathway.

### BLOCKER - location content quality

The location system is technically complete but not yet strong enough for an
unqualified launch-readiness approval:

- exact shared visible-block word rate: 58.03%;
- locality-normalised repeated-block word rate: 99.94% (this is not a pairwise page-similarity score);
- highest locality-normalised pairwise Jaccard similarity: 100.00%;
- median suburb visible word count: 901;
- median suburb HTML: approximately 247.5KB raw / 27.7KB gzip;
- approved local jobs: 0;
- approved local photographs: 0;
- approved local testimonials: 0.

All 873 pages retain correct suburb, postcode, area, region, response class,
nearby links and conversion paths. The problem is genuine local usefulness,
not technical completeness. Do not mass-noindex, delete, redirect or fabricate
local detail. The owner should approve an indexation strategy and provide real
job evidence for the highest-value pages first.

## Claims and owner confirmation

No uncertain claim was fabricated, approved or silently removed. Confirm the
following immediately before launch and retain evidence:

1. **Electrical licence** - verify `398937C`, the legal holder, current validity
   and the exact work scope.
2. **Company registration** - verify `EVAREADY ELECTRICAL PTY LTD` and ABN
   `44 650 697 797`.
3. **Level 2 ASP** - verify current accreditation, the ASP number, categories
   and the services the business is authorised to perform.
4. **Network coverage** - verify the exact Ausgrid and Endeavour Energy scope.
5. **Insurance** - repository evidence is absent. One offer artwork includes
   "Licensed & Insured"; owner evidence is required before launch.
6. **Experience** - no approved years-of-experience wording or evidence exists.
7. **Response times** - confirm 60-minute core and estimated 60-90-minute outer
   mappings. They remain qualified, availability-dependent emergency targets,
   not universal guarantees.
8. **Warranty** - no approved warranty claim or evidence exists.
9. **Offers** - reconfirm the free safety inspection, $50 online booking, 15%
   first emergency service and 20% pensioner/senior/veteran eligibility,
   exclusions, non-stacking and any expiry.
10. **Google reviews** - verify the exact Place ID belongs to EVAREADY ELECTRICAL
    and test a genuine Places response with the restricted browser key.
11. **Photographs** - confirm provenance, publication rights, number-plate
    approval and consent for any identifiable person, customer or property.
12. **Testimonials** - provide the review source, exact approved excerpt and
    customer permission where required.

## Google rating fallback

### PASS - implementation

- The widget mounts only on five selected trust-critical routes.
- It requests only `rating`, `userRatingCount` and `googleMapsURI` through the
  supported Places implementation.
- It loads on approach to the viewport and prevents duplicate requests during
  rerenders.
- Missing configuration displays a neutral review link without a false rating
  or review count.
- The unconfigured production build passed desktop and mobile fallback tests.
- Mocked configured tests cover success, changed counts, invalid Place ID,
  incomplete responses, quota/error, timeout, one-request maximum and CLS.

### EXTERNAL CONFIGURATION REQUIRED

Real live verification remains blocked until the owner supplies:

- `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY`;
- `NEXT_PUBLIC_GOOGLE_PLACE_ID` for the exact business;
- HTTP-referrer restrictions for approved origins;
- an API restriction allowing only the required Places API; and
- quota/billing limits.

`NEXT_PUBLIC_` values are compiled into public browser JavaScript. The browser
key is therefore visible to visitors and must be restricted. No key or Place ID
was committed during this audit.

## Offers and conversion paths

### PASS - technical placement and behaviour

- The four-card offer showcase appears on four approved routes: homepage,
  Services, Emergency Electrician Sydney and Switchboard Upgrades Sydney.
- Full artwork occurs on those four routes only.
- Other location and informational routes use the compact offers pathway.
- Detailed exclusions and non-stacking terms remain accessible.
- All audited phone, quote, ServiceM8, footer, offer and sticky CTA links work.
- Quote modal focus, focus return, scroll lock and browser Back closure pass.
- Emergency pathways direct visitors to call; planned-work pathways direct
  visitors to submit job details and photographs.
- The Google Ads base tag uses ID `AW-18165545331`, and phone/quote CTA marker
  attributes remain present. The current source contains zero explicit
  `gtag('event', ...)` calls, `send_to` values, conversion labels, callbacks or
  conversion timeouts. Tag Assistant and account-side conversion verification
  remain owner launch steps.

Offer accuracy remains **OWNER CONFIRMATION REQUIRED** as listed above.

## Accessibility and responsive behaviour

### PASS

- The earlier broad non-header interaction matrix used the explicit local production URL
  `http://127.0.0.1:4181/evaready-electrical/`; no test defaulted to the public
  GitHub Pages site.
- Six non-header suites covered contact actions, current copyright, Google
  rating loading/fallbacks, approved location evidence, offers and route-scroll
  behaviour.
- The matrix completed 300 project/test combinations: 104 passed, 0 failed and
  196 were intentionally skipped by test viewport/project guards.
- The selected tests contain no header assertions. Header code, styles, assets,
  behaviour and tests remained outside this task.

| Project | Passed | Failed | Skipped |
| --- | ---: | ---: | ---: |
| desktop-chromium-1366 | 6 | 0 | 14 |
| desktop-chromium-1440 | 13 | 0 | 7 |
| desktop-chromium-1920 | 6 | 0 | 14 |
| desktop-firefox-1440 | 6 | 0 | 14 |
| desktop-webkit-1440 | 6 | 0 | 14 |
| google-chrome-1440 | 6 | 0 | 14 |
| microsoft-edge-1440 | 6 | 0 | 14 |
| mobile-chrome-360 | 6 | 0 | 14 |
| mobile-chrome-390 | 13 | 0 | 7 |
| mobile-chrome-412 | 6 | 0 | 14 |
| mobile-chrome-430 | 6 | 0 | 14 |
| mobile-safari-390 | 6 | 0 | 14 |
| mobile-safari-430 | 6 | 0 | 14 |
| ipad-768 | 6 | 0 | 14 |
| ipad-pro-1024 | 6 | 0 | 14 |

This is representative non-header interaction coverage, not exhaustive
all-route/all-browser coverage. The exhaustive runner remains incomplete.
The current tracking/export correction added a focused exact-implementation
matrix at `http://127.0.0.1:4192/evaready-electrical/`: 5 tests passed, 0
failed and 1 mobile duplicate sequence was deliberately skipped by project
guard. It covered post-hydration tag startup without idle, queue/config state,
seven genuine Next Link route types, browser Back, direct navigation and
Pages-like `text/plain` segment responses without sending a real Google event.

## Production performance evidence

### BLOCKER - current exact-source measurement

The authoritative current matrix was generated from a detached worktree at
exact implementation commit `668a05941e84de514081228b7077b8677e01ef55`. The clean
static export used Node.js 22.23.1, npm 10.9.8, Next.js 16.3.0, Lighthouse
13.4.1 and Chrome 151.0.7922.108. It was served by the project static server at
`http://127.0.0.1:4192/evaready-electrical` using the GitHub preview base-path
configuration. Each row is the median of three runs using the same profile,
server and environment.

The historical 3 August Node 26 / Next.js 16.2 / Chrome 150 measurements are
not used in any current conclusion. They remain recoverable in
`docs/final-performance-before-after.md` and are explicitly labelled
historical. Those results measured a different source commit and only six
routes, while the current matrix measures exact `668a059` across ten routes.
The application output, runtime, framework, browser, route scope and transferred
resource set differ, so the figures cannot be mixed or described as one current
measurement.

### Mobile medians

| Page | Perf | A11y | BP | SEO | FCP | LCP | CLS | TBT | Transfer | Requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 82 | 100 | 77 | 100 | 1,358ms | 4,883ms | 0 | 9ms | 947,392B | 35 |
| Services | 81 | 100 | 77 | 100 | 1,358ms | 5,035ms | 0 | 8ms | 954,889B | 35 |
| Service Areas | 83 | 100 | 77 | 100 | 1,360ms | 4,660ms | 0 | 8ms | 884,383B | 32 |
| Emergency | 81 | 100 | 77 | 100 | 1,508ms | 5,108ms | 0 | 7ms | 953,557B | 36 |
| Level 2 | 82 | 100 | 77 | 100 | 1,359ms | 4,810ms | 0 | 10ms | 880,803B | 31 |
| Switchboards | 81 | 100 | 77 | 100 | 1,358ms | 5,107ms | 0 | 10ms | 949,763B | 35 |
| Fault guide | 83 | 100 | 77 | 100 | 1,358ms | 4,733ms | 0 | 11ms | 926,852B | 35 |
| Region | 82 | 100 | 77 | 100 | 1,359ms | 4,809ms | 0 | 8ms | 892,022B | 35 |
| Area | 82 | 100 | 77 | 100 | 1,358ms | 4,808ms | 0 | 8ms | 901,795B | 38 |
| Panania | 84 | 100 | 77 | 100 | 1,359ms | 4,584ms | 0 | 8ms | 910,734B | 41 |

### Desktop medians

| Page | Perf | A11y | BP | SEO | FCP | LCP | CLS | TBT | Transfer | Requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 96 | 93 | 77 | 100 | 327ms | 1,387ms | 0 | 0ms | 1,570,060B | 65 |
| Services | 96 | 93 | 77 | 100 | 327ms | 1,387ms | 0 | 0ms | 1,577,555B | 65 |
| Service Areas | 96 | 93 | 77 | 100 | 328ms | 1,348ms | 0 | 0ms | 1,504,546B | 61 |
| Emergency | 96 | 93 | 77 | 100 | 367ms | 1,387ms | 0 | 0ms | 1,573,617B | 65 |
| Level 2 | 97 | 93 | 77 | 100 | 328ms | 1,308ms | 0 | 0ms | 1,503,461B | 61 |
| Switchboards | 96 | 93 | 77 | 100 | 327ms | 1,387ms | 0 | 0ms | 1,572,443B | 65 |
| Fault guide | 96 | 93 | 77 | 100 | 327ms | 1,370ms | 0 | 0ms | 1,507,440B | 64 |
| Region | 96 | 93 | 77 | 100 | 328ms | 1,347ms | 0 | 0ms | 1,501,515B | 61 |
| Area | 96 | 93 | 77 | 100 | 327ms | 1,347ms | 0 | 0ms | 1,511,289B | 64 |
| Panania | 97 | 93 | 77 | 100 | 328ms | 1,308ms | 0 | 0ms | 1,520,223B | 67 |

Desktop performance, LCP, CLS and TBT meet the stated performance thresholds.
Mobile performance is 81-84 and every mobile LCP median exceeds 2.5 seconds,
so mobile performance remains a launch blocker. CLS is 0 and TBT is 7-11ms.

The mobile LCP element is the main hero image on nine routes and the region H1
on one route. The desktop LCP element is the main hero image on nine routes and
the fault-guide hero section on one route. Exact selectors are retained in the
committed median JSON/CSV.

Best Practices is 77 because Google Ads produces a third-party cookie and
Chrome DevTools issue finding. The corrected Windows export produced zero
first-party or third-party HTTP failures and zero console errors across the 60
valid runs. One earlier after-change attempt reached a Chrome interstitial after
its local server exited; all 60 reports from that invalid attempt were excluded
from current medians and are identified in the command record. All 60 valid
Lighthouse CLI runs completed successfully with zero cleanup warnings.

These are local laboratory measurements, not field Core Web Vitals. This
navigation-only matrix did not measure INP.

## Security and credentials

### PASS

- Full and production npm audits report zero vulnerabilities.
- No `npm audit fix --force`, framework downgrade or major migration occurred.
- `.env.local` remains ignored and was not staged.
- No API key, password, token, private key or committed environment value was
  found by the final scan.
- JSON-LD serialization and external-link attributes pass the existing audits.

## Objective defects corrected in the preceding gate

1. `app/globals.css` - constrained direct internal-hero grid children to a
   single shrinkable track below 1024px, eliminating min-content overflow at
   768px and 820px without changing desktop or header behaviour.
2. `app/footer.css` - allowed the 320px footer Call action text to wrap and
   balance inside its existing button, eliminating clipping and overflow.
3. `package-lock.json` - contains the compatible transitive `nanoid` 3.3.18
   security patch. The exact lockfile-update command was not retained; it was
   not produced by `npm ci`.

This performance-evidence reconciliation made no production-source, visual,
route, SEO, conversion or header change.

## Preserved unrelated work

The repository contains a large pre-existing dirty working tree of owner
reports, screenshots, logs, generated audit outputs, local preview files and
untracked header candidates. They were not deleted, hidden, staged or committed
by this task. The current reconciliation adds only corrected documentation and
the auditable `reports/production-performance/final-a404/` summaries.

## Handoff and safety confirmation

- Main was not checked out, changed, merged or pushed.
- No pull request was opened.
- No workflow was manually triggered.
- No deployment action was invoked.
- DNS, CNAME, hosting, canonicals, sitemap domain and branded-domain settings
  were untouched.
- `evareadyelectrical.com.au` was not accessed.
- The header remains a deferred owner item and was untouched.
