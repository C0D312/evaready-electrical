# Phase 3E1 Suburb Review

Status: suburb review and technical validation complete; feature publication
remains pending. No new main release is authorised or deployed.

Starting feature SHA: `aa58901770136b68df02b445c8b393e4f932d463`.
Live main remains `e6197fcd00747ae86cabfff675516176c9e66ec6`.

## Inspection Findings

The repository data, completion register, sitemap and export reconcile to 873
unique suburb routes across 16 regions and 39 areas. No duplicate suburb-name
record, malformed postcode or missing route was found in this reconciliation.
This is not independent postal-address or serviceability certification. Website
groups are not certified council boundaries. ABS postal areas are statistical
approximations, not a substitute for owner address validation:
[ABS Postal Areas](https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/non-abs-structures/postal-areas).

The shared template inspection found:

- Urgent guidance could put the business call ahead of emergency services.
- Planned-work guidance requested photographs and private paperwork without
  sufficient safety, optionality or privacy limits.
- A priority/alphabetical regional list was labelled nearby, without distances.
- The phrase verified coverage overstated what directory records establish.
- A general suburb credential strip displayed an air-conditioning credential
  although no particular air-conditioning job had been established.
- At 200% root text, a local Chromium probe reproduced overflowing headings,
  very narrow service cards and broken related-suburb links. The existing
  reviewed-directory CSS deliberately excluded suburb pages.
- Element screenshots subsequently exposed narrow credential-label columns at
  320px/200% text. Suburb-only container reflow now stacks the icon above the
  label, and the regression test measures those labels as well as headings.
- The iPad Pro 1024px/200% run exposed a final-action flex row squeezing prose
  beside a non-shrinking button group. A suburb-only intrinsic grid now stacks
  those columns when they do not fit. Every main paragraph is included in the
  readable-column regression checks; the failing route passed three repeats.
- A further element review at 320px/200% found the final CTA heading splitting
  a normal word onto an isolated letter despite passing the overflow checks.
  The final-action heading now uses the same compact rem-based scale as the
  FAQ and directory headings, with sufficient suburb-only specificity to beat
  the older global mobile heading rule. The exhaustive matrix also measures its
  longest word against the available width. Earlier browser runs were superseded by a
  fresh build and complete matrix for this correction.

## Correction Scope

Only the suburb template, its dedicated credential helper and reproduced
suburb-scoped layout rules may change. Existing reviewed safety variants are
opted into explicitly; their defaults and other consumers remain unchanged.
Other suburb links are selected from the same area first, then the region,
alphabetically, without claiming distance or search demand.

Safety sources checked for the shared wording:
[Healthdirect electrical shock guidance](https://www.healthdirect.gov.au/electric-shocks-and-burns)
and [Ausgrid fallen-powerline guidance](https://www.ausgrid.com.au/outages-and-issues/in-an-emergency/fallen-powerlines).
The page does not instruct customers to open equipment, approach live parts or
perform electrical repairs. Existing qualified response targets remain targets,
not guarantees, and require current owner capacity verification.

## Validation Status

All 873 individual directory records and the complete shared visible wording
were reviewed. All nine geographic checkpoints passed the full Chromium route
matrix and every region has representatives in each additional browser profile.
The initial findings, failed diagnostics and superseded results are retained
separately; none is counted as an accepted pass.

The register now contains 980 individually reviewed and rewritten routes, 21
pending specialist/consolidation reviews, 21 held rewrites, and no sufficient
or pending rewrites. All 128 non-suburb records remain byte-semantically
unchanged. Their existing publication evidence remains; all 873 modified suburb
outputs have pending publication and null live SHAs. The 83 Phase 3D5-3D9 live
rows remain reconciled to the separately verified e619 release.

All existing indexation decisions remain unreviewed. No evidence records,
postal facts, authorisation numbers, reviews or local jobs have been invented.
No updated source is live until a separate exact-SHA release is approved.

### Accepted Browser Results

| Project | Passed | Failed | Skipped |
| --- | ---: | ---: | ---: |
| Chromium 1440 (all routes and representative controls) | 1,778 | 0 | 0 |
| Firefox 1440 | 63 | 0 | 1 |
| WebKit 1440 | 63 | 0 | 1 |
| Mobile Chrome 390 | 63 | 0 | 1 |
| Mobile Safari 390 | 63 | 0 | 1 |
| iPad 768 | 63 | 0 | 1 |
| iPad Pro 1024 | 63 | 0 | 1 |
| Total | 2,156 | 0 | 6 |

The nine all-route cohorts passed 158, 202, 172, 214, 238, 180, 242, 210 and
130 tests respectively: 1,746 tests covering every suburb's content/keyboard
quote behaviour and every 22-case matrix (19,206 width/text combinations).
The additional Chromium controls suite covers 32 representatives. Each other
profile covers those 32 controls scenarios and 31 content scenarios; its one
intentional content skip is Mosman, already covered by the all-route Chromium
suite and that profile's controls scenario. No failing route was skipped.

The separate all-route scroll/text-fit audit passed 2,170 route checks and 196
scroll checks with zero failures. Final browser pathname assertions retain
`/evaready-electrical/` for every tested route. All accepted runs match the same
four public-source hashes and exact current test sources, with zero runner
errors or flaky results. Accepted request inventories contain 3,695 first-layer
observations and zero unauthorised second-layer forwards; Google and ServiceM8
are inert fixtures. No real submissions or conversion events were delivered.

Chromium is 148.0.7778.96, Firefox 150.0.2 and WebKit 26.4. These are browser
simulations, not physical devices or exhaustive all-browser/WCAG certification.
No new Lighthouse, field Core Web Vitals or INP measurement is claimed.

## Indexation Recommendations, Not Decisions

`reports/phase3e1-suburb-indexation-recommendations.csv` contains one repository-
derived recommendation row for every suburb. It is not imported by website
metadata, sitemap, robots or route code. Its review status follows the explicit
regional checkpoints in `scripts/phase3e1-suburb-review.ts`.

All current recommendations are `needs_owner_decision`. The repository has no
approved suburb evidence records and does not establish current address-level
serviceability, search demand, qualified conversions, margin or referral value.
Absence of these records is not proof that the business has no such work or value.
The largely shared visible template is not independent local evidence. No suburb
is promoted merely because it is large or well known.

The current audit measures an exact shared visible-block word rate of 66.67%
and a locality-normalised repeated-block word rate of 99.91%. Both are
word-weighted shares of blocks repeated on at least two pages; the latter
replaces suburb, postcode, area and region first. Separately, the highest
pairwise Jaccard similarity of normalised semantic blocks with at least six
words is 100.00% (Chester Hill and Clemton Park). These are different metrics,
not interchangeable whole-page similarity scores. The pages remain
overwhelmingly generated from the same visible template after locality
replacement. Approved job, photograph and testimonial records remain zero.

The empty scoped privacy audit reports zero evidence-directory files, referenced
assets and orphan assets. It does not certify that the repository or Git history
contains no PII. Raw generated audit snapshots are retained locally; this phase
report identifies the current results separately from older committed snapshots.

- `index_candidate`: requires confirmed serviceability and genuinely useful
  content supported by sanitised evidence or verified business/search value.
- `noindex_candidate`: requires an owner-confirmed valid coverage route with
  insufficient present evidence/value, after relevant search and referral review.
- `needs_owner_decision`: material facts or the explicit owner decision are missing.

These are recommendations only. The production decision registry stays empty:
873 unreviewed decisions, 873 index/follow pages, zero noindex pages, 873 self-
canonicals, 873 sitemap URLs and zero redirects. No default mass decision applies.

Copy this blank template to an owner-controlled private system. Never complete
or commit the tracked GitHub copy.

That instruction applies to the existing blank owner-review CSV, which remains
unchanged. Do not commit raw or aggregated Search Console, Ads, ServiceM8, revenue,
job or commercial records. The later public decision manifest may contain only
route, decision and decision date. Separately sanitised public evidence must go
through its existing approval and privacy process.

## Evidence Discipline

The current clean-build checkpoint uses Node 22.23.1, Next 16.3.0,
Playwright 1.60.0, TypeScript 5.9.3 and Sharp 0.35.3. Dependency versions and
the lockfile are unchanged. `npm ci`, `npm audit` and `npm audit --omit=dev`
passed, with zero reported vulnerabilities. Lint, TypeScript, the production
build, 19 static audits and all 1,031 audit-unit tests passed for the final
suburb production source. Browser completion is recorded separately below;
those static passes are not substitutes for responsive or interaction tests.

The principal commands are:

```text
npm ci
npm audit
npm audit --omit=dev
node node_modules/eslint/bin/eslint.js .
node node_modules/typescript/bin/tsc --noEmit
npm run build
node --import tsx --test tests/audits/*.test.ts
node --import tsx scripts/audit-location-page-output.ts
node --import tsx scripts/audit-location-evidence-quality.ts
node --import tsx scripts/audit-location-indexation-decisions.ts
node --import tsx scripts/audit-location-evidence-privacy.ts
node --import tsx scripts/audit-all-suburb-visible-copy.ts
node --import tsx scripts/audit-scroll-and-text-fit.ts
```

The audit-unit command's glob is expanded to explicit test files by the local
validation runner. Its exact argument list and every audit exit code are retained
in the local evidence directory. The GitHub-preview build sets
`NEXT_PUBLIC_DEPLOYMENT_TARGET=github-preview`,
`NEXT_PUBLIC_BASE_PATH=/evaready-electrical`, and
`NEXT_PUBLIC_SITE_URL=https://c0d312.github.io/evaready-electrical`.

The nine geographic browser cohorts contain 79, 101, 86, 107, 119, 90, 121,
105 and 65 routes. Each route requires a content/keyboard-quote test and a
22-case matrix: widths 320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920
and 2560, each at 100% and 200% root text. Content is shared where truthful;
these checks do not manufacture individual local evidence.

The Node 22.23.1 local export is served at
`http://127.0.0.1:4214/evaready-electrical/` with strict base-path and Pages-like
MIME handling. Browser traffic passes through a fail-closed loopback proxy.
Google and ServiceM8 are inert fixtures; no real forms or conversions are sent.
Raw traces, screenshots, request inventories and generated audit output stay
outside Git. Test reports identify the starting SHA and source hashes; they do
not claim to contain their own eventual commit SHA.

Accepted local evidence is consolidated in `phase3e1-browser-proof.json`
(SHA-256 `4a4e79437aa4cf22769ed694bf23ac439159ff42a6d23880a2165a204dd9c20a`).
It contains all per-run commands, source/test/harness hashes, browser counts,
regional coverage, proxy-log hashes and verified WebKit process-exit records.
The four tested public-source SHA-256 hashes are:

| File | SHA-256 |
| --- | --- |
| `app/service-areas/[region]/[area]/[suburb]/page.tsx` | `1dcf6cddf2d4b5be0004ff27a14651615e4acc8b4e6b7cc68a078701306afc48` |
| `components/service-credential-strip.tsx` | `e4ce70c073120b217747281b7cba1f7e10fde9c364f27a50baf16de6632bb7fa` |
| `data/internal-links.ts` | `2e9859ad48d7d809750cfb1543fdcdfc3cbc277090272b5a078cec83e0b826ba` |
| `app/ux-overhaul.css` | `1da4e4d10a249de97433a5366a3a0756cef3c296306228162ef9fe9c49388fd8` |

Accepted cohort runs are `3e1-batch01-04` through `3e1-batch09-04`.
Additional Chromium controls use `3e1-controls-chromium-10`; Firefox and Mobile
Chrome use their `3e1-cross-*-10-all` runs. The four WebKit profiles use
`3e1-cross-*-11-all`. Earlier iterations are not mixed into these totals.

Element-only visual evidence includes the reviewed hero/credential/service/FAQ
sections and the final corrected CTA captures in `final-panel-visual-03`.
That final set contains 18 images for Panania, Bringelly and Shellharbour City
Centre at Chromium 320/1440 and WebKit 1024, each at 100%/200% text. It records
zero page errors. Header artwork is not part of these element reviews.

Retained failed attempts include obsolete four-FAQ/old regional-link audit
expectations, narrow enlarged-text labels, a Firefox iframe-readiness race during
focus traversal, and a Windows WebKit worker-shutdown failure after page checks.
The original full-row register hash checks are retained: all authorised new
review states are asserted explicitly before projection to the original baseline.
No website functional assertion was removed or relaxed.

The enlarged-text controls test also raced the quote modal's next-frame scroll
restoration. A visibility/focus assertion alone did not mean that callback had
finished. Native scrolling and moving the scroll outside the hit-test timeout
were retained as failed diagnostic attempts, not accepted fixes. The final test
waits for the real scroll-behaviour restoration, released body lock, fonts and
text-layout frames before the next interaction. It then uses the normal bounded
Playwright scroll action and independently requires two stable, unobscured hit
measurements. Bankstown, Alfords Point, Royal National Park and Bringelly passed
three repeated iPad Pro runs each. The 12 diagnostic passes are separate from the
final route/profile totals. No quote-modal production code was changed.

An attempted acceleration ran three three-worker Chromium cohorts alongside
several browser engines and the scroll audit. Per-route times increased sharply
and WebKit's bounded scroll-stability action failed. Those interrupted runs are
not accepted evidence. Later cohorts use one worker per geographic group and
WebKit profiles run sequentially; assertions, timeouts and containment remain
unchanged. The failing iPad routes pass under the reduced load. Final acceptance
still requires every full route/profile run to complete without test or worker
errors, not merely a successful retry of the individual failure.

### Windows WebKit Harness Diagnosis

The retained process trace distinguishes Node's actual `exit` event from its
later `close` event. In failed runs, WebKit exited with code zero but inherited
Windows IPC pipes remained open. Playwright waits for `close`, so its worker
subsequently timed out even though the page assertions had passed. The original
failed runs are not included in accepted results.

Waiting for network idle and unloading the tested page did not reliably correct
the process issue; those diagnostic hooks were removed. The successful temporary
harness releases only that spawned WebKit process's empty pipes one second after
Node confirms exit code zero with no signal. It refuses nonzero exits or unread
buffered output, never synthesises an exit event or result, and records the actual
exit, handle release and close events. Browser stderr diagnostics are retained.
No dependency, production code or committed containment fixture was modified.
The fixture still goes offline at teardown and the second-layer proxy still
rejects every non-loopback destination before DNS or upstream connection.

The process guard, raw results, traces, screenshots and failed diagnostic attempts
remain outside Git. This is an environment-specific harness correction, not a
claim that every Windows WebKit installation is free of process issues.

Responsive checks are laboratory browser simulations, not physical-device tests,
complete WCAG certification, field Core Web Vitals or an INP measurement. Shared
owner credential, response-capacity, privacy/legal, review-API and offer-artwork
holds remain. Website directory groupings are not certified council boundaries;
no postcode or address-level serviceability correction is invented from them.
