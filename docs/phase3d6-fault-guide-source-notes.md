# Phase 3D6: first six electrical fault guides

## Locked scope and pre-edit findings

Base: `80074e55737cea6994f269af0abf86120de8c981`.
Feature branch: `codex/phase3d6-fault-guides-batch-1`.
This is local/feature-branch work, not a release. Phase 3D5 remains publication-pending.

The first six source records in `data/electrical-faults.ts` were all individually pending in the completion register:

| Position | Slug | Title | Pre-edit semantic SHA-256 |
|---|---|---|---|
| 1 | safety-switch-keeps-tripping | Safety Switch Keeps Tripping | 28766dc4745221bf55a895253dbb8544327642a952c342bbb62a494d8d7c1b98 |
| 2 | burning-smell-from-switchboard | Burning Smell From Switchboard | c7e63dd19f7086b5b7da57e7dd3ac6d25d81d1dbc914e3feaf5c92a03b48edc2 |
| 3 | no-power-in-one-room | No Power In One Room | 5f64f1234ddab1332084ad31fa2a7209eee72a794aef08ebd438ba08190d39b1 |
| 4 | no-power-to-house | No Power To House | e1b2dd3f52c9a63ee85220c8a62c5aaa0b1a31ff98c113219e92447ad892821c |
| 5 | power-point-sparking | Power Point Sparking | 7300fdd24439d912101cb24a235f05f9a17ab68fe2caf5ea33d26a013fc2fca0 |
| 6 | burning-smell-from-outlet | Burning Smell From Outlet | 1f0f32f7191345cba0ae6079e2b63ce2ec1658bb96a4808c9bac5a549b28764b |

Semantic hashes are SHA-256 of JSON.stringify(record), including field and array order. No route/order change is authorised.

Findings before implementation:
- Essential emergency guidance appears after the first page CTA in the shared template. These six intros need clear safety-first text without changing other records or the template.
- The safety-switch guide conflates leakage protection with overload protection and suggests a reset; it needs a clear RCD/circuit-breaker distinction and no troubleshooting by repeated resets.
- Burning-smell guides promote a business call without clearly prioritising 000 for fire/immediate danger; some wording invites touching a fitting to establish heat.
- Room/house outage guidance needs safer observation, distributor/property fault boundaries and no extension-lead workaround or reset instructions.
- Sparking guidance invites testing another outlet/appliance; stop-use advice must replace that suggestion.
- Photos require an explicit safe-distance/no-cover-removal/no-delay caveat.
- Each guide needs symptom-specific electrician testing, possible repairs and limitations, not a duplicate service sales page.

## Primary sources checked 6 September 2026

- [Electrical Safety Office: safety switches](https://www.electricalsafety.qld.gov.au/electrical-safety-home/safety-switches): RCD leakage versus circuit-breaker overcurrent functions. Used for technical distinctions, not Queensland legal requirements in NSW.
- [Ausgrid: fallen powerlines](https://www.ausgrid.com.au/outages-and-issues/in-an-emergency/fallen-powerlines): keep clear, emergency services for immediate danger and medical advice after shock.
- [Fire and Rescue NSW: emergency information](https://www.fire.nsw.gov.au/incidents/emergency-information): emergency fire response, not a business booking.

No business credential is established by these sources. Existing owner evidence holds remain. No external account access, real form submission or conversion is part of validation.

## Validation status

### Diagnosis and repairs during validation

- The first new schema test selected an embedded Offer's Service node instead of the page Service node. It now selects the exact page `@id`; all six descriptions and FAQ arrays are asserted, rather than accepting any matching node.
- A first draft of the new vertical check confused normal font-glyph overhang with clipping. The corrected test checks actual hidden/clip ancestor boundaries and retains horizontal overflow checks, with detailed clipping diagnostics.
- Real 200% text failures: warning headings would not break long words; implicit min-content grid columns widened the safety section; a viewport-sized legacy paragraph rule exceeded the nested hero card. Fault-only wrapping, zero-minimum grid tracks, bounded paragraphs and adaptive card columns address those causes.
- Element-only visual review showed the full warning sentence was presented at display-heading size. Fault-only CSS now gives it a compact 1.125rem size that scales with the root font. An initial markup change was narrowed to CSS-only so the other nine guides retain their exact existing HTML as well as their wording.
- The fault-index link measured 34px high on mobile. A scoped 44px minimum and regression assertion address the specified target-size requirement.
- Desktop screenshots exposed white safety text over bright portions of the existing hero photo. A fault-only translucent dark readability layer addresses that contrast defect without changing the source artwork, crop or header. Its presence and foreground colour are covered by the responsive regression.
- One early static audit overlapped a rebuild and reported temporarily missing output files. That attempt is diagnostic only. Subsequent validation uses a completed, stable export; no test threshold or production assertion was relaxed.
- One interrupted WebKit run stalled during Windows process teardown after assertions completed. It is not counted as passing. A complete fresh seven-profile run subsequently passed with browser lifecycle diagnostics retained.
- A candidate iPad run encountered a first-party document 404 during an overlapping rebuild. The failed URL was the local `electrical-faults/burning-smell-from-outlet/` document, not an external resource. All final browser checks used a frozen completed export.
- The legacy UX suite required a separate background image already absent from the starting source. Its replacement assertion requires exactly one approved artwork image, zero legacy background layers and complete banner coverage; source dimensions, aspect ratio, alt text and overflow assertions remain.
- Legacy sticky assertions expected a permanently mounted element. The existing implementation intentionally returns null while a CTA guard is visible. Tests now require absence there, correct landmark placement whenever mounted, and visibility after the offer guard. The dedicated sticky suite still checks interaction, overlap, Back, Escape, missing-observer behaviour and zero CLS.
- Protected integration requests caused expected proxy-denial console errors in tests that had no inert fixtures. A local-only fixture now fulfils only the Google tag script and booking document without network delivery; unknown external requests remain blocked. No website tracking or integration code changed.
- A Node request-client link probe used CONNECT even for local HTTP, which the fail-closed proxy correctly rejected. The test now uses browser same-origin fetch with redirects rejected and requires HTTP 200. The proxy policy was not broadened.

These shared fault-template corrections are a separate atomic fix scope. They do not target the header, service templates, artwork, route configuration or conversion implementation.

### Content outcomes

All six selected records required rewriting. Main-visible word counts include shared template copy, so they are not unique-content or quality scores:

| Fault | Before | After | Individual purpose |
|---|---:|---:|---|
| Safety switch keeps tripping | 604 | 887 | Leakage/overcurrent distinction, recurring trips and testing limits |
| Burning smell from switchboard | 597 | 873 | Keep-clear response, hidden heat damage and safe isolation |
| No power in one room | 600 | 877 | Room/circuit boundaries and partial supply investigation |
| No power to house | 639 | 933 | Distributor versus customer installation and outage limitations |
| Power point sparking | 576 | 922 | Stop-use, no repeat testing and outlet/appliance distinction |
| Burning smell from outlet | 616 | 909 | Hidden damage, no touch-for-heat advice and repair limits |

### Pre-commit validation

- Node 22.23.1; Next 16.3.0; React 19.2.4; TypeScript 5.9.3; Tailwind 4.3.0; Playwright 1.60.0; Sharp 0.35.3.
- `npm ci`, `npm audit`, `npm audit --omit=dev`, lint, TypeScript and production export passed; both dependency audits reported zero vulnerabilities.
- Preview environment: `NEXT_PUBLIC_DEPLOYMENT_TARGET=github-preview`, `NEXT_PUBLIC_SITE_URL=https://c0d312.github.io/evaready-electrical`, `NEXT_PUBLIC_BASE_PATH=/evaready-electrical`.
- Browser base: `http://127.0.0.1:4214/evaready-electrical/`, strict-base-path local export server and fail-closed local proxy. No public-site JavaScript execution or genuine submission.
- All 75 audit unit tests passed, including all fifteen semantic record hashes, six visible/schema/CTA checks and isolation of the other 995 completion records.
- Nineteen static audits passed: suburb inventory, all-suburb copy, internal links, metadata, page health, response-time classification, claims/offers, offer distribution, location output, evidence quality, indexation, privacy, assets, static export, conversion truth, all-route visibility, visible copy, live-link/CTA inventory and preview-domain validation.
- All fifteen fault guides passed 11 widths (320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560) at 100% and simulated 200% root text: 330 route/size/text combinations. Six guide interaction tests ran in Chromium, Firefox, WebKit, mobile Chrome, mobile Safari and both iPad profiles. Combined result: 57 passed, 90 intentional duplicate-matrix skips, zero failures.
- Current header/booking/sticky suites: 54 passed, four project-inapplicable skips. The complete existing header width matrix separately passed two tests. Reconciled desktop/mobile UX suite: 31 passed, nine project-inapplicable skips. No assertions were removed to conceal a production failure.
- All-route scroll/text audit: 2,170 route checks and 196 scroll checks, zero failures. This automated sweep does not represent individual content review of every route.
- Twenty-four local element screenshots were captured for the six guides at 390 and 1440 pixels, with zero page errors or first-party HTTP errors. Fixed overlays were masked only in screenshots, never in functional assertions.
- The other nine fault records and their main HTML remain unchanged; all 46 service-record pages retain their main visible copy. Header HTML, sitemap and robots output are unchanged.
- Suburb state remains 873 index/follow, zero noindex, 873 sitemap entries, 873 self-canonicals, zero redirects, 873 unreviewed decisions, zero approved evidence records and zero evidence assets.

The six guides are recorded as reviewed and rewritten but publication-pending with null live SHAs. Phase 3D5 remains pending; all other record states, holds and live SHAs are preserved. Current totals: 36 reviewed, 965 pending individual review, 21 held rewrites, 944 pending rewrites, zero sufficient and 12 pending publications.

These are pre-commit results, not a claim that this document contains its own final commit SHA. A fresh detached worktree must repeat the release-relevant validation against the exact implementation commit before feature-branch handoff. Raw diagnostic and passing evidence is retained separately; no older failed run is mixed into passing counts. Main remains at the separately approved Phase 3D4 release. Publication of this batch requires new exact-SHA owner approval.
