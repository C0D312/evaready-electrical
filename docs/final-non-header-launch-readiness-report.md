# Final non-header launch-readiness report

Date: 2026-08-08 (Australia/Sydney)

## Verdict

**NOT READY**

The non-header application is technically stable: the clean Node.js 22 build,
1,005-page static generation, route inventories, 873 suburb checks, SEO
generators, internal links, conversion links, modal behaviour, keyboard paths,
responsive geometry and dependency audits pass. Two objective responsive
defects found during this gate were corrected without changing the header:

- internal service hero grids no longer overflow at tablet widths; and
- the footer Call action now wraps cleanly at 320px.

Launch approval is still blocked by content-quality and evidence gaps. The 873
suburb pages have 99.94% locality-normalised similarity and no approved local
job, photograph or testimonial evidence. Owner decisions are also required for
business credentials and every offer, while a verified Google Places browser
key and Place ID are required before the rating widget can be called live.

The header was explicitly excluded from this audit. No header source, CSS,
asset or test was reviewed or changed.

## Finding classification

| Classification | Finding | Required action |
| --- | --- | --- |
| PASS | Node.js 22 clean install, lint, TypeScript and clean static export | None |
| PASS | 1,004 known routes, 1,001 indexable sitemap URLs and 873/873 suburbs | None |
| PASS | Internal links, metadata, canonicals, robots, schema URLs and 404 behaviour | None |
| PASS | Phone, quote, ServiceM8 and Google Ads markers | None |
| PASS | Keyboard, quote-modal Back handling, mobile sticky CTA and tested responsive layouts | None |
| PASS | Full and production dependency audits report zero vulnerabilities | None |
| OWNER CONFIRMATION REQUIRED | Electrical licence, company registration, Level 2 status, network coverage and response wording | Owner must verify the exact current evidence and scope immediately before launch |
| OWNER CONFIRMATION REQUIRED | Insurance, experience and warranty wording | Do not publish new claims until documentary evidence and approved wording are supplied |
| OWNER CONFIRMATION REQUIRED | All four offers and their exclusions | Reconfirm eligibility, exclusions, non-stacking and any expiry immediately before launch |
| OWNER CONFIRMATION REQUIRED | Photographs, people and testimonials | Confirm provenance, publication rights, vehicle-plate approval and customer permission |
| EXTERNAL CONFIGURATION REQUIRED | Live Google rating | Supply the exact verified Place ID and a restricted browser API key; verify a genuine response for EVAREADY ELECTRICAL |
| BLOCKER | Location-page helpful-content quality | Decide the indexation/evidence plan and add truthful owner-approved local evidence to priority pages before launch |
| BLOCKER | Mobile Lighthouse LCP remains 3.30-3.52 seconds in the latest reproducible evidence | Approve and test a non-header LCP optimisation without weakening the mobile van composition or tracking |
| DEFERRED HEADER ITEM | Header design and behaviour | Separate owner review; deliberately outside this task |

## Repository and toolchain

- Branch: `codex/responsive-ux-overhaul`
- Baseline local HEAD: `d1e88b466180fc283edd68fda68d3b3914a0e7be`
- Baseline remote HEAD: `d1e88b466180fc283edd68fda68d3b3914a0e7be`
- Node.js: `22.23.1`
- npm: `10.9.8`
- Next.js: `16.3.0`
- React / React DOM: `19.2.4` / `19.2.4`
- TypeScript: `5.9.3`
- Tailwind CSS: `4.3.0`
- ESLint: `9.39.4`
- Playwright: `1.60.0`

The clean install used an isolated npm cache and `npm ci --ignore-scripts`.
It installed 366 packages and audited 367 packages successfully. The lockfile
received only the compatible transitive `nanoid` security patch from 3.3.16 to
3.3.18; no package range or framework major version changed.

## Commands and results

The build commands below used the GitHub Pages preview configuration and did
not access the branded domain:

```powershell
$env:NEXT_PUBLIC_DEPLOYMENT_TARGET='github-preview'
$env:NEXT_PUBLIC_BASE_PATH='/evaready-electrical'
$env:NEXT_PUBLIC_SITE_URL='https://c0d312.github.io/evaready-electrical'
npm ci --ignore-scripts
npm run lint
npx tsc --noEmit
npm run build
```

| Check | Result |
| --- | --- |
| Clean dependency installation | PASS - 366 packages installed; 367 audited |
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
| asset audit | PASS - 6,139 exported files; no file over the configured 500KB limit |
| live link and CTA audit | PASS - 1,004 HTML routes; 131,186 rows; 0 broken links; 0 CTA failures |
| static visibility inventory | PASS - 1,004 routes; 873 suburbs; 0 critical or missing outputs |
| `git diff --check` | PASS |
| secret scan | PASS - no committed API key, token, private key or `.env.local`; only blank `.env.example` placeholders |

The exhaustive all-route browser visibility runner was also attempted against
the current build. It exceeded the local 600-second execution limit after
reaching the 768px stage without emitting a website assertion failure. This is
recorded as an incomplete runner, not as a pass. It is covered by the complete
static route audit plus a current 224-check browser geometry sweep across 14
representative route types and all 16 supported widths, which passed with zero
failures.

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

- exact shared visible text: 58.03%;
- locality-normalised similarity: 99.94%;
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

Offer accuracy remains **OWNER CONFIRMATION REQUIRED** as listed above.

## Accessibility and responsive behaviour

### PASS

- Exactly one visible main landmark was found on the tested templates.
- Skip navigation, FAQ controls, modal keyboard operation and focus return pass.
- Mobile menu scroll lock and quote-modal browser Back handling pass.
- Mobile sticky CTA spacing and the tested touch pathways pass.
- A current non-header geometry sweep covered 224 route/width combinations at
  320, 360, 375, 390, 412, 430, 768, 820, 1024, 1280, 1366, 1440, 1600, 1920,
  2048 and 2560px with zero horizontal-overflow or visibility failures.
- Cross-device smoke tests passed in Chromium, installed Chrome, Edge, WebKit,
  Mobile Chrome, Mobile Safari and iPad emulation.
- The contact/service internal hero family and footer CTA were visually
  inspected after the two scoped fixes.

Firefox could not launch in this Windows environment because its software
WebRender compositor failed before navigation. This is a browser-runner
limitation, not a website assertion failure. A real Firefox smoke test on a
separate supported machine remains recommended before launch.

## Production performance evidence

The latest reproducible report uses three-run medians from a production static
export. It was measured with Lighthouse 13.4.1 and Chrome 150, but under Node.js
26.1.0. The current source was separately clean-installed and built under Node
22.23.1. Because the Lighthouse run was not itself repeated under Node 22 during
this gate, this environment difference is disclosed rather than concealed.

### Mobile medians

| Page | Performance | LCP | CLS | Accessibility | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: |
| Homepage | 91 | 3,455ms | 0 | 100 | 586.1KB |
| Services | 92 | 3,381ms | 0 | 100 | 591.6KB |
| Emergency | 91 | 3,524ms | 0 | 100 | 590.3KB |
| Level 2 | 91 | 3,456ms | 0 | 100 | 587.3KB |
| Service Areas | 91 | 3,451ms | 0 | 95 | 590.6KB |
| Panania | 92 | 3,302ms | 0 | 100 | 596.4KB |

### Desktop medians

| Page | Performance | LCP | CLS | Accessibility | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: |
| Homepage | 99 | 944ms | 0 | 96 | 911.5KB |
| Services | 99 | 1,026ms | 0 | 96 | 910.9KB |
| Emergency | 99 | 946ms | 0 | 96 | 907.1KB |
| Level 2 | 98 | 1,066ms | 0 | 96 | 906.7KB |
| Service Areas | 99 | 946ms | 0 | 92 | 910.0KB |
| Panania | 99 | 946ms | 0 | 96 | 913.9KB |

Desktop targets and CLS pass. Mobile performance scores pass 90, but mobile
LCP misses the 2.5-second target on every measured representative route. These
are local laboratory measurements, not field Core Web Vitals or INP evidence.

## Security and credentials

### PASS

- Full and production npm audits report zero vulnerabilities.
- No `npm audit fix --force`, framework downgrade or major migration occurred.
- `.env.local` remains ignored and was not staged.
- No API key, password, token, private key or committed environment value was
  found by the final scan.
- JSON-LD serialization and external-link attributes pass the existing audits.

## Objective defects corrected in this gate

1. `app/globals.css` - constrained direct internal-hero grid children to a
   single shrinkable track below 1024px, eliminating min-content overflow at
   768px and 820px without changing desktop or header behaviour.
2. `app/footer.css` - allowed the 320px footer Call action text to wrap and
   balance inside its existing button, eliminating clipping and overflow.
3. `package-lock.json` - accepted the compatible transitive `nanoid` 3.3.18
   security patch produced by the clean Node.js 22 installation.

## Preserved unrelated work

The repository contains a large pre-existing dirty working tree of owner
reports, screenshots, logs, generated audit outputs, local preview files and
untracked header candidates. They were not deleted, hidden, staged or committed
by this task. Only the two scoped non-header CSS fixes, the three-line lockfile
patch and this report belong to this gate.

## Handoff and safety confirmation

- Main was not checked out, changed, merged or pushed.
- No pull request was opened.
- No workflow was manually triggered.
- No deployment action was invoked.
- DNS, CNAME, hosting, canonicals, sitemap domain and branded-domain settings
  were untouched.
- `evareadyelectrical.com.au` was not accessed.
- The header remains a deferred owner item and was untouched.
