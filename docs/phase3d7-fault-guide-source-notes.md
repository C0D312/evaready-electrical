# Phase 3D7: remaining fault guides

Status: feature-branch validation; no deployment authorised for this batch.
Starting source: `e9f2d196d0262af860c7c862f200929ecb01ecfa`.
Feature branch: `codex/phase3d7-complete-fault-guides`.

## Pre-edit inspection

Records 7-15 are the only content records authorised for this batch:

| Position | Slug | Finding |
| --- | --- | --- |
| 7 | safety-switch-trips-at-night | Timing treated too much like a diagnosis; inspection limitations missing. |
| 8 | circuit-breaker-keeps-tripping | Breaker/RCD distinction missing; replacement advice too generic. |
| 9 | power-surge-damage | Failed equipment does not prove a surge; people take priority over appliance value. |
| 10 | hot-power-point | Touch and unplug suggestions could expose a reader to the suspect fitting. |
| 11 | lights-flickering | Appliance-start observation must not become a deliberate retest. |
| 12 | rcd-trips-when-raining | Outdoor source assumed; dry weather is not clearance to restore power. |
| 13 | power-outage-after-storm | Emergency/distributor priority and damaged-line clearance insufficient. |
| 14 | electric-shock-from-outlet | Medical and distributor action missing; switchboard operation advice unsafe. |
| 15 | smoke-from-electrical-panel | Emergency escalation must not depend on smoke becoming heavy. |

All nine require rewriting. No records may be reordered, renamed or removed.
The first six fault guides, all service records and all unrelated completion rows
remain protected. Before editing, the register contains 36 individually reviewed,
965 pending individual review, 36 rewritten, 944 pending rewrite, 21 held,
989 live-verified and 12 unpublished routes. The 12 unpublished routes must not
be marked live by this batch.

## Primary-source safety review

Reviewed 6 September 2026. These are safety references, not evidence of business
credentials or work performed. No new specialist credential is asserted.

- [Ausgrid: shocks and tingles](https://www.ausgrid.com.au/safety/safety-at-home/shocks-and-tingles): stop use, no retesting, keep clear, report to distributor; 000 for an electrical emergency involving a person.
- [Healthdirect: electric shocks and burns](https://www.healthdirect.gov.au/electric-shocks-and-burns): urgent medical help for serious symptoms and medical assessment even after a seemingly minor shock. No remote medical diagnosis or DIY rescue instructions.
- [Ausgrid: fallen powerlines](https://www.ausgrid.com.au/outages-and-issues/in-an-emergency/fallen-powerlines): at least 8 metres from fallen lines and report the hazard; do not assume an outage means de-energised equipment.
- [Endeavour Energy: storm safety](https://www.endeavourenergy.com.au/for-your-home/preparing-for-the-unexpected/storm-safety): storm-related network damage and avoiding damaged electrical infrastructure.
- [NSW Government: common electrical hazards](https://www.nsw.gov.au/housing-and-construction/safety-home/electrical-safety/common-electrical-hazards): damaged equipment, electrical fire risks and licensed electrical work.
- [Fire and Rescue NSW: electrical power boards](https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/electrical-power-boards): overload and poor-connection heating risks; 000 for an emergency.
- [Queensland Electrical Safety Office: safety switches](https://www.electricalsafety.qld.gov.au/electrical-safety-home/safety-switches): technical distinction between residual-current and overcurrent protection only; no Queensland installation laws applied to NSW.

The content will distinguish possible causes from confirmed test findings. It
will not invite reset testing, opening covers, touching for temperature, wet-area
inspection or taking photographs before emergency help. Source safety advice
is paraphrased conservatively; no assurance of diagnosis, restoration time,
insurance outcome or whole-property certification is added.

## Validation

The initial visibility audit flagged the literal phrase `water-affected
fittings`, which belongs to its historical prohibited-copy pattern. The storm
sentence was clarified to say that fittings exposed to water still need
electrical assessment after network restoration. The assertion was not relaxed.
The corrected page passed all seven browser profiles and its repeated 22-case
width/text matrix (8 passed, 6 duplicate-matrix skips).

Pre-commit browser evidence: 120 passed, 0 failed, 90 duplicate-matrix skips
across desktop Chromium, Firefox, WebKit, mobile Chrome, mobile Safari, iPad
and iPad Pro. The matrix covers all 15 guides at 320, 360, 390, 430, 768, 820,
1024, 1366, 1440, 1920 and 2560 pixels at 100% and simulated 200% root text.
Shared UX/booking/sticky-CTA checks: 83 passed, 0 failed, 11 project-specific
skips. Unchanged header checks: 2 passed. Exhaustive text-fit audit: 2,170 route
checks and 196 representative scrolling checks, zero failures. The scrolling
checks are not described as every route in every browser.

Thirty-six element-only screenshots cover the nine changed guides at 390 and
1440 pixels. Fixed overlays were masked only for these captures, not functional
assertions. The capture run recorded zero page errors or first-party HTTP
errors. Browser tests use the explicit local `/evaready-electrical/` base path,
inert external fixtures and a fail-closed proxy. No real booking or conversion
was delivered. Raw evidence, screenshots, temporary harnesses and build output
stay outside Git. A fresh detached exact-commit proof is required before push;
this document does not claim its own final commit SHA.

Runtime: Node 22.23.1, Next.js 16.3.0, React 19.2.4, TypeScript 5.9.3,
Tailwind 4.3.0 and Playwright 1.60.0. No dependency change.

Final pre-commit static results: all 19 audits passed; clean production build,
lint and TypeScript passed; both npm audits reported zero vulnerabilities.
The register test initially retained the old 36-route total after generation.
Its exact expectations were updated to the authorised 45-route state and its
per-route pending-publication assertions extended to Phase 3D7. All 87 audit
tests then passed, with zero failures or skips. No validation threshold was
weakened. Proxy reconciliation recorded zero unauthorised upstream forwards;
21 header-test requests rejected by the second layer made no DNS or upstream
connection. Other contained runs recorded no second-layer external forwards.

Commands include `npm ci`, `npm audit`, `npm audit --omit=dev`, `npm run build`,
`node node_modules/eslint/bin/eslint.js .`,
`node node_modules/typescript/bin/tsc --noEmit`,
`node --import tsx --test tests/audits/*.test.ts`,
`node --import tsx scripts/generate-whole-site-completion-register.ts --check`
and `git diff --check`. Each static audit is run as
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

No launch-readiness claim is made. All 873 suburb routes retain index/follow,
self-canonicals and sitemap inclusion, with no redirects or evidence additions.
Their 873 owner decisions remain unreviewed. The owner indexation gate and
existing specialist/consolidation holds remain unresolved.

All 15 source record hashes were recorded before editing. Tests now protect
the exact completed first-six hashes at the starting source, and check that
each of the final nine differs from its starting hash. The earlier Phase 3D6
test's historical last-nine freeze has been replaced by this explicitly
authorised scope. Its visible-copy, FAQ, schema, safety and conversion checks
now run for all 15, as do its cross-browser interaction checks. The 992
completion rows outside this batch retain their exact baseline hash; both
earlier unpublished six-route batches must remain pending with null live SHAs.

Initial before/after main-visible word counts, including shared template text
(these are inventory measurements, not a quality score):

| Guide | Before | After |
| --- | ---: | ---: |
| safety-switch-trips-at-night | 600 | 949 |
| circuit-breaker-keeps-tripping | 570 | 921 |
| power-surge-damage | 568 | 938 |
| hot-power-point | 572 | 923 |
| lights-flickering | 578 | 919 |
| rcd-trips-when-raining | 588 | 913 |
| power-outage-after-storm | 592 | 933 |
| electric-shock-from-outlet | 606 | 949 |
| smoke-from-electrical-panel | 595 | 939 |
