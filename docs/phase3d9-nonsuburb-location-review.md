# Phase 3D9 non-suburb location review

Base: `b2d5369107bc6713064952f77d4adb954d0facaf`.
Feature development only; no release is authorised here.

## Authoritative scope

The register has 16 region pages, 39 area pages and one service-area index:
56 selected routes. The location-output audit's 928 total includes 873 suburbs
and 55 region/area pages, but omits the index. All 873 suburb routes are excluded
from changes. The final route-level appendix records every selected route.

## Findings before implementation

- All 16 region and 39 area records, names, child lists and existing parent paths
  were individually inspected alongside all three page templates. Existing
  groupings are website directories, not authoritative council boundaries.
- Region/area introductions focus on route counts rather than how to confirm a
  job. "Verified routes" can be mistaken for verified serviceability. Safety
  guidance does not prioritise Triple Zero before the first business actions.
- Region/area FAQs and shared service pathways request unrestricted photographs,
  access notes and paperwork. They do not clearly exclude private access codes,
  unsafe close-ups or an implied appointment confirmation.
- The index calls a manually chosen shortcut list "popular" and "high-intent"
  without demand evidence. Collection schema reuses older descriptions, including
  unsupported "fast" wording that is not needed for a directory.
- Page search results shorten the approved qualified response wording to a
  bare minute claim. The selected-page variant needs the qualification retained;
  navigation and suburb output must remain unchanged in this phase.
- Sutherland Shire, Northern Beaches and Blue Mountains each use the same name
  for a one-area region and its child area. Their different directory purposes
  need to be clear. Mosman has one listed suburb, so singular wording matters.
- Strathfield is an existing directory ambiguity: Strathfield 2135 is under
  Burwood, whereas the Strathfield area lists Homebush, Homebush West and
  Strathfield South. Preserve the explicit cross-link and do not move routes.
- Southern Highlands/Wingecarribee and Central Coast South/Central Coast lists
  are retained as site groupings, not asserted municipal boundaries or exhaustive
  regional coverage. No postcode or geographic boundary is newly certified.

## Holds and source limits

Owner confirmation remains required for actual serviceability, current emergency
capacity, specialist authorisation for each job/network, and location-specific
business evidence. Directory membership is not proof of an office, completed job,
assigned electrician or guaranteed availability. Existing qualified response
targets remain targets, not a new promise or independently verified travel time.

No new external account access, mapping API, personal data, local jobs, reviews,
photographs, travel estimates or specialist credentials are introduced. Existing
claim/indexation registers retain their holds. All prior 27 pending publications
must stay pending; a later exact-SHA release needs separate owner approval.

Safety wording follows the previously reviewed Fire and Rescue NSW emergency
guidance: move to safety and call Triple Zero (000) for fire, smoke or immediate
danger. This phase does not provide DIY isolation or testing instructions.

## Responsive and test corrections

- Fixed forced narrow grid tracks and duplicate list-item padding only within
  the index, region and area classes. Suburb classes do not opt in.
- Narrow suburb cards put their decorative icon above the name rather than
  reducing the name to a single-letter column. Short single-line names are not
  incorrectly classified as collapsed columns by the regression test.
- Region count badges wrap as a row; the one-suburb Mosman labels are singular.
- Enlarged FAQ headings and questions reflow into a vertical sequence instead
  of leaving a very tall narrow heading alongside the questions.
- At 320px and simulated 200% text, stacked search padding had left a zero-width
  input. Scoped container rules retain usable input width; every width case now
  fills the search and checks the result, not just the empty control.
- Visual review caught compounded hero padding that basic overflow assertions
  missed. At 390px/200%, the index H1 had only 196px of width. The scoped mobile
  grid/panel correction retains 324px without reducing the enlarged font.
  A new minimum usable H1-width assertion covers all selected mobile routes.
- The shared modal test clicked after DOMContentLoaded but before three client
  chunks had completed. The direct quote URL opened the inert local fixture
  instead of a modal. WebKit also demonstrated that load can precede React's
  effect registration. A test-only observer now waits for the actual quote
  listener to be installed, without dispatching an event or opening a modal.
  The enhanced-modal test waits for that real readiness; a separate
  JavaScript-disabled test proves the native link still works on all eight
  representative templates. Modal, history, Back and scroll-lock assertions are
  unchanged. No production quote code or destination changed.
- Intermittent WebKit workers failed to shut down even though their assertions
  passed while other local runners were active. Those runs were invalidated.
  The final cross-browser matrix ran separately with browser lifecycle logging
  and normal shutdown. The low-level Windows worker cause is not conclusively
  established; no website-code defect or containment escape is inferred.
  A separate
  local-server restart used an invalid spaced port argument; it was corrected
  to `--port=4214`, readiness was verified, and the affected run was discarded.
- Earlier diagnostic runs and temporary-harness failures are retained outside
  Git; none are combined with final passing counts. No force-click, ignored
  assertion, external submission or production error suppression was used.

## Route-level review appendix

Every row below was individually checked against its source record, rendered
copy, parent/child links, breadcrumb and metadata. Shared text was reviewed in
the three templates and its rendered substitutions checked per route. No
postcode is newly certified against an external geographic dataset. Main-visible
word counts include shared page sections and are inventory, not quality scores.
All 56 outcomes are rewritten because every page needed safety, enquiry or
directory-truth corrections; none was marked sufficient just to advance a count.

Holds on every row: C = owner confirmation of address/job serviceability;
R = current response capacity and existing qualified targets; S = job-specific
specialist authorisation; P = separately approved release/live verification.
No held item is represented as verified local work, an office or guaranteed
availability. The global 873-suburb owner-indexation gate remains separate.

| Route | Outcome | Words before / after | Individual purpose and correction | Holds |
| --- | --- | --- | --- | --- |
| `/service-areas` | rewritten | 585 / 715 | Index of 16 regions, 39 areas and 873 suburbs. Removed unsupported popular/high-intent ranking; directory schema uses record counts. | C/R/S/P |
| `/service-areas/blue-mountains` | rewritten | 662 / 879 | Blue Mountains: 1 child area, 21 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. Region and child share a name; distinguish overview from the complete suburb/postcode list. | C/R/S/P |
| `/service-areas/blue-mountains/blue-mountains` | rewritten | 626 / 835 | Blue Mountains, parent Blue Mountains: 21 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. Region and child share a name; distinguish overview from the complete suburb/postcode list. | C/R/S/P |
| `/service-areas/canterbury-bankstown-and-inner-south-west` | rewritten | 723 / 943 | Canterbury-Bankstown & Inner South West: 1 child area, 35 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. | C/R/S/P |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown` | rewritten | 661 / 875 | Canterbury-Bankstown, parent Canterbury-Bankstown & Inner South West: 35 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/central-coast-south` | rewritten | 685 / 903 | Central Coast South: 1 child area, 37 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. Preserves Central Coast child naming; does not claim an exhaustive southern-region boundary. | C/R/S/P |
| `/service-areas/central-coast-south/central-coast` | rewritten | 677 / 888 | Central Coast, parent Central Coast South: 37 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. Preserves the mixed existing directory under Central Coast South, not a municipal-boundary representation. | C/R/S/P |
| `/service-areas/hills-hawkesbury-and-hornsby` | rewritten | 745 / 964 | Hills, Hawkesbury & Hornsby: 3 child areas, 90 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. | C/R/S/P |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury` | rewritten | 673 / 885 | Hawkesbury, parent Hills, Hawkesbury & Hornsby: 38 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district` | rewritten | 653 / 866 | Hills District, parent Hills, Hawkesbury & Hornsby: 23 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby` | rewritten | 645 / 857 | Hornsby, parent Hills, Hawkesbury & Hornsby: 29 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/inner-west-burwood-and-canada-bay` | rewritten | 792 / 1013 | Inner West, Burwood & Canada Bay: 4 child areas, 48 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. | C/R/S/P |
| `/service-areas/inner-west-burwood-and-canada-bay/burwood` | rewritten | 589 / 805 | Burwood, parent Inner West, Burwood & Canada Bay: 4 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. Retains Strathfield 2135 under the existing Burwood grouping; no municipal-boundary claim or route move. | C/R/S/P |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay` | rewritten | 637 / 854 | Canada Bay, parent Inner West, Burwood & Canada Bay: 16 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west` | rewritten | 653 / 870 | Inner West, parent Inner West, Burwood & Canada Bay: 25 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/inner-west-burwood-and-canada-bay/strathfield` | rewritten | 606 / 822 | Strathfield, parent Inner West, Burwood & Canada Bay: 3 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. Preserved the explicit Strathfield 2135 link to Burwood; this area's three records are Homebush, Homebush West and Strathfield South. | C/R/S/P |
| `/service-areas/liverpool-and-fairfield` | rewritten | 708 / 926 | Liverpool & Fairfield: 2 child areas, 59 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. | C/R/S/P |
| `/service-areas/liverpool-and-fairfield/fairfield` | rewritten | 643 / 853 | Fairfield, parent Liverpool & Fairfield: 26 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/liverpool-and-fairfield/liverpool` | rewritten | 656 / 866 | Liverpool, parent Liverpool & Fairfield: 33 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/macarthur-camden-and-wollondilly` | rewritten | 741 / 960 | Macarthur, Camden & Wollondilly: 3 child areas, 86 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. | C/R/S/P |
| `/service-areas/macarthur-camden-and-wollondilly/camden` | rewritten | 632 / 844 | Camden, parent Macarthur, Camden & Wollondilly: 22 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown` | rewritten | 664 / 876 | Campbelltown, parent Macarthur, Camden & Wollondilly: 36 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly` | rewritten | 641 / 853 | Wollondilly, parent Macarthur, Camden & Wollondilly: 28 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/northern-beaches` | rewritten | 668 / 885 | Northern Beaches: 1 child area, 53 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. Region and child share a name; distinguish overview from the complete suburb/postcode list. | C/R/S/P |
| `/service-areas/northern-beaches/northern-beaches` | rewritten | 719 / 928 | Northern Beaches, parent Northern Beaches: 53 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. Region and child share a name; distinguish overview from the complete suburb/postcode list. | C/R/S/P |
| `/service-areas/northern-sydney-and-ryde` | rewritten | 814 / 1033 | Northern Sydney & Ryde: 7 child areas, 68 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. | C/R/S/P |
| `/service-areas/northern-sydney-and-ryde/hunters-hill` | rewritten | 608 / 821 | Hunters Hill, parent Northern Sydney & Ryde: 6 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai` | rewritten | 618 / 830 | Ku-ring-gai, parent Northern Sydney & Ryde: 16 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/northern-sydney-and-ryde/lane-cove` | rewritten | 618 / 831 | Lane Cove, parent Northern Sydney & Ryde: 9 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/northern-sydney-and-ryde/mosman` | rewritten | 578 / 790 | Mosman, parent Northern Sydney & Ryde: 1 listed suburb. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. One-suburb directory: corrected singular labels and postcode wording; not an additional office claim. | C/R/S/P |
| `/service-areas/northern-sydney-and-ryde/north-sydney` | rewritten | 627 / 840 | North Sydney, parent Northern Sydney & Ryde: 13 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/northern-sydney-and-ryde/ryde` | rewritten | 610 / 822 | Ryde, parent Northern Sydney & Ryde: 13 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/northern-sydney-and-ryde/willoughby` | rewritten | 600 / 812 | Willoughby, parent Northern Sydney & Ryde: 10 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/parramatta-and-cumberland` | rewritten | 705 / 923 | Parramatta & Cumberland: 2 child areas, 44 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. | C/R/S/P |
| `/service-areas/parramatta-and-cumberland/cumberland` | rewritten | 618 / 828 | Cumberland, parent Parramatta & Cumberland: 19 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/parramatta-and-cumberland/parramatta` | rewritten | 635 / 845 | Parramatta, parent Parramatta & Cumberland: 25 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/southern-highlands` | rewritten | 669 / 886 | Southern Highlands: 1 child area, 28 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. Preserves the existing Wingecarribee grouping without asserting comprehensive regional or council coverage. | C/R/S/P |
| `/service-areas/southern-highlands/wingecarribee` | rewritten | 635 / 843 | Wingecarribee, parent Southern Highlands: 28 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. Preserves existing outer-town entries as a website grouping, not a certified council boundary. | C/R/S/P |
| `/service-areas/st-george-and-bayside` | rewritten | 746 / 965 | St George & Bayside: 3 child areas, 44 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. | C/R/S/P |
| `/service-areas/st-george-and-bayside/bayside-and-airport` | rewritten | 628 / 842 | Bayside & Airport, parent St George & Bayside: 9 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/st-george-and-bayside/georges-river` | rewritten | 642 / 855 | Georges River, parent St George & Bayside: 20 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley` | rewritten | 646 / 860 | Rockdale & Bexley, parent St George & Bayside: 15 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/sutherland-shire` | rewritten | 674 / 891 | Sutherland Shire: 1 child area, 42 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. Region and child share a name; regional overview and full suburb directory now explain their different purposes. | C/R/S/P |
| `/service-areas/sutherland-shire/sutherland-shire` | rewritten | 692 / 901 | Sutherland Shire, parent Sutherland Shire: 42 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. Region and child share a name; regional overview and full suburb directory now explain their different purposes. | C/R/S/P |
| `/service-areas/sydney-city-and-eastern-suburbs` | rewritten | 775 / 995 | Sydney City & Eastern Suburbs: 4 child areas, 59 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. | C/R/S/P |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick` | rewritten | 611 / 825 | Randwick, parent Sydney City & Eastern Suburbs: 14 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney` | rewritten | 641 / 855 | Sydney, parent Sydney City & Eastern Suburbs: 27 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley` | rewritten | 606 / 820 | Waverley, parent Sydney City & Eastern Suburbs: 11 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/sydney-city-and-eastern-suburbs/woollahra` | rewritten | 597 / 811 | Woollahra, parent Sydney City & Eastern Suburbs: 7 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/western-sydney-and-nepean` | rewritten | 726 / 945 | Western Sydney & Nepean: 2 child areas, 75 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. | C/R/S/P |
| `/service-areas/western-sydney-and-nepean/blacktown` | rewritten | 683 / 895 | Blacktown, parent Western Sydney & Nepean: 44 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/western-sydney-and-nepean/penrith` | rewritten | 657 / 869 | Penrith, parent Western Sydney & Nepean: 31 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/wollongong-and-illawarra` | rewritten | 719 / 937 | Wollongong & Illawarra: 3 child areas, 84 listed suburbs. Overview, qualified search response, area links and safety-first enquiry guidance. | C/R/S/P |
| `/service-areas/wollongong-and-illawarra/minnamurra-and-kiama-downs` | rewritten | 623 / 836 | Minnamurra & Kiama Downs, parent Wollongong & Illawarra: 4 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/wollongong-and-illawarra/shellharbour` | rewritten | 609 / 819 | Shellharbour, parent Wollongong & Illawarra: 17 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |
| `/service-areas/wollongong-and-illawarra/wollongong` | rewritten | 712 / 922 | Wollongong, parent Wollongong & Illawarra: 63 listed suburbs. Full name/postcode links, parent breadcrumb and safe optional-photo/job-scope guidance. | C/R/S/P |

## Final validation

Validated on 6 September 2026 using Node 22.23.1, Next 16.3.0, React 19.2.4,
TypeScript 5.9.3, Tailwind 4.3.0, Playwright 1.60.0 and Sharp 0.35.3.
Playwright's bundled browser versions are Chromium 148.0.7778.96, Firefox
150.0.2 and WebKit 26.4. Device profiles are emulations, not physical-device
certification. No dependency or lockfile changes were required.

`npm ci` completed under Node 22 earlier in this phase. Full and production
npm audits both report zero vulnerabilities. Lint, TypeScript, clean production
build, all 150 audit-unit tests, register validation/drift and all 19 static
audits pass. The final clean build preserved then replaced only the isolated
worktree's generated `.next` and `out` directories; no owner files were cleaned.

The static audits cover suburbs, visible suburb copy, internal links, metadata,
page health, response classification, claims/offers, offer distribution,
location output, evidence quality, indexation, privacy, assets, static export,
conversion truth, all-route visibility, visible copy, link/CTA destinations and
preview/production-domain safeguards. Their exact commands and logs are retained
outside Git in the `ev3d9-validation-final` evidence directory.

Browser checks used only `http://127.0.0.1:4214/evaready-electrical/` with the
strict base path and Pages-like static-file MIME behaviour. An origin-root
`/service-areas/` probe returned 404 as required. External integrations were
inert fixtures with a second fail-closed local proxy. No real form or conversion
was sent. Across the accepted run logs, 151,867 proxy decisions reconcile:
151,832 local forwards and 35 rejections before DNS/upstream connection, with
zero unauthorised external forwards. The scroll runner used local port 4216.

| Final test cohort | Passed | Failed | Skipped |
| --- | ---: | ---: | ---: |
| All 56 routes, Chromium width/text matrix | 56 | 0 | 0 |
| All 56 routes, final Chromium interaction tests | 56 | 0 | 0 |
| Firefox 1440 representative interactions | 4 | 0 | 0 |
| WebKit 1440 representative interactions | 4 | 0 | 0 |
| Mobile Chrome 390 representative interactions | 4 | 0 | 0 |
| Mobile Safari 390 representative interactions | 4 | 0 | 0 |
| iPad 768 representative interactions | 4 | 0 | 0 |
| iPad Pro 1024 representative interactions | 4 | 0 | 0 |
| Shared regressions, desktop Chromium 1440 | 55 | 0 | 6 |
| Shared regressions, Mobile Chrome 390 | 56 | 0 | 5 |
| Existing header regressions, Chromium 1366 | 2 | 0 | 0 |
| Total, excluding superseded duplicate results | 249 | 0 | 11 |

The width cohort covers 56 routes x 11 widths x 100/200% root text = 1,232
cases, including expanded FAQs and populated search results. The four
cross-browser representatives are the index, Hills/Hawkesbury/Hornsby region,
Strathfield area and one-suburb Mosman area. Shared skips are deliberately
inapplicable desktop/mobile navigation cases, not ignored failures.

All cohorts use the same final rebuilt export. After adding the test-only
readiness observer, all 56 directory interactions, the complete booking test
file and the six-profile representative matrix were rerun. The unchanged width
test body and unchanged shared test files retain their passing current-export
runs; their superseded interaction/booking results are not counted twice.
No baseline or older-phase result is included in these totals.

The exhaustive automated scroll/text-fit runner completed: 2,170 route checks,
196 scroll checks, zero failures. This is not a claim of individual semantic
review of every public route. Forty-four element-only screenshots were captured
for the four representatives at 390/1440px and normal/enlarged text, with zero
page errors. Temporary header/sticky masking affected captures only, not tests.
The enlarged hero and directory/FAQ reflow were visually inspected.

### Commands and reproduction

The Node 22 executable was first in PATH. Preview environment:

```powershell
$env:NEXT_PUBLIC_DEPLOYMENT_TARGET='github-preview'
$env:NEXT_PUBLIC_SITE_URL='https://c0d312.github.io/evaready-electrical'
$env:NEXT_PUBLIC_BASE_PATH='/evaready-electrical'
$env:PLAYWRIGHT_BASE_URL='http://127.0.0.1:4214/evaready-electrical/'
npm ci
npm audit --json
npm audit --omit=dev --json
npm run lint
npm run build
node node_modules/typescript/bin/tsc --noEmit
npm run audit:whole-site-register
node --import tsx --test tests/audits/*.test.ts
node --import tsx scripts/serve-static-export.ts --port=4214 --base-path=/evaready-electrical --strict-base-path --pages-like
```

On Windows the unit runner enumerated all `.test.ts` files explicitly rather
than relying on shell glob expansion. Each of these ran as
`node --import tsx scripts/<name>.ts`:

```text
audit-suburb-pages
audit-all-suburb-visible-copy
audit-internal-links
audit-metadata
audit-page-health
audit-response-time-classification
audit-claims-and-offers
audit-offer-route-distribution
audit-location-page-output
audit-location-evidence-quality
audit-location-indexation-decisions
audit-location-evidence-privacy
audit-performance-assets
audit-static-export-hardening
audit-conversion-truth
audit-all-routes-visibility
audit-visible-copy
audit-live-links-and-ctas
audit-production-domain
```

The temporary `ev3d9.config.ts` extends the repository configuration with one
worker, the explicit local base, blocked service workers, an allowlisted proxy
and JSON results outside Git. It does not change assertions or retry failures.
The `ev3d4-proxy.cjs` guard allows only local GET/HEAD requests; all other targets
are rejected before DNS or upstream connections. Use that containment setup,
not the repository configuration's public default, when reproducing these runs.
The accepted browser commands use the following common prefix and arguments:

```powershell
$config="$env:TEMP/ev3d9.config.ts"
node node_modules/playwright/cli.js test tests/e2e/phase3d9-location-pages.spec.ts --config=$config --project=desktop-chromium-1440 --max-failures=3
node node_modules/playwright/cli.js test tests/e2e/phase3d9-location-pages.spec.ts --config=$config --project=desktop-chromium-1440 --grep 'directory, search, keyboard quote and Back' --max-failures=3
node node_modules/playwright/cli.js test tests/e2e/phase3d9-location-pages.spec.ts --config=$config --project=desktop-firefox-1440 --project=desktop-webkit-1440 --project=mobile-chrome-390 --project=mobile-safari-390 --project=ipad-768 --project=ipad-pro-1024 --grep 'service-areas/: directory|hills-hawkesbury-and-hornsby/: directory|strathfield/: directory|mosman/: directory' --max-failures=3
node node_modules/playwright/cli.js test tests/e2e/ux-overhaul.spec.ts tests/e2e/booking-and-menu-resilience.spec.ts tests/e2e/google-rating-live.spec.ts tests/e2e/contact-direct-options.spec.ts tests/e2e/footer-copyright.spec.ts tests/e2e/mobile-sticky-cta-overlap.spec.ts --config=$config --project=desktop-chromium-1440 --project=mobile-chrome-390 --max-failures=3
node node_modules/playwright/cli.js test tests/e2e/booking-and-menu-resilience.spec.ts --config=$config --project=desktop-chromium-1440 --project=mobile-chrome-390 --max-failures=3
node node_modules/playwright/cli.js test tests/e2e/header-responsive.spec.ts --config=$config --project=desktop-chromium-1366
git diff --check
```

The scroll audit runs `scripts/audit-scroll-and-text-fit.ts` through the
temporary `ev3d6-scroll.cjs` wrapper, which supplies its isolated local server
and fail-closed proxy. Final JSON results, lifecycle diagnostics, exact command
records, the scoped staged-file scan and the export SHA-256 manifest remain
outside Git. This document does not claim to contain its own final commit SHA.
The tested precommit source is bound to the subsequent commit by staged Git
blob IDs; the build stamp identifies the base checkout, not a final-SHA release.

## Isolation and remaining work

Exactly 56 main HTML outputs changed. All other 945 main outputs, including all
873 suburbs, are unchanged against the baseline export. All 1,001 header/footer
HTML outputs and title/meta/canonical tags are unchanged. Sitemap and robots
bytes are unchanged. No routes, redirects, indexation decisions, header artwork,
tracking or external integrations were changed.

Before and after: 873 index/follow suburbs, zero noindex, 873 self-canonicals,
873 sitemap suburb URLs, zero redirects, 873 unreviewed decisions, zero approved
evidence records and zero referenced/orphan evidence assets. The tracked owner
CSV remains blank in all owner columns. The privacy PASS covers the current
empty scoped dataset only, not the whole repository or Git history. The separate
owner indexation gate remains BLOCKED: OWNER INDEXATION DECISIONS MISSING.

Register: 1,001 routes; 107 individually reviewed and 894 pending individual
review; 107 rewritten, 873 pending rewrite, 21 held, zero sufficient; 918 retain
their prior live evidence and 83 await publication. Exact baseline hashes protect
the 945 out-of-scope rows and all 873 suburb states. All prior 27 pending rows
retain pending publication and null live SHAs.

No blanket WCAG certification, real-device certification, Lighthouse improvement,
INP measurement or field Core Web Vitals claim is made. Coverage, response
capacity, specialist credentials, review-data access, offer-artwork evidence,
privacy/legal and specialist/consolidation holds remain. The whole website is
not complete. This fifth relay phase ends at a checkpoint; a combined release
requires separate direct owner approval for the resulting exact SHA.
