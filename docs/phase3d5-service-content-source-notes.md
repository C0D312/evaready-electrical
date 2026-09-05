# Phase 3D5: General Service Content Review

Base: `7972f8dec2620d97c311b1ecd9ce40545b59dc9f`.
This is feature-branch work, not approval to deploy a new commit.

## Inspection Findings

| Route | Finding before edits | Decision |
| --- | --- | --- |
| `/services/ceiling-fan-installation-sydney` | Basic installation list lacked mounting, controller compatibility and ventilation exclusions. | Targeted rewrite and guide; retain sound process and FAQs. |
| `/services/appliance-installation-electrician-sydney` | Electrical connection scope did not clearly exclude gas, plumbing, cabinetry or internal appliance repairs. | Targeted rewrite and circuit/scope guide. |
| `/services/new-build-renovation-electrician-sydney` | Stages were named but access, changes, occupied-site interruptions and handover boundaries were unexplained. | Targeted rewrite and staged electrical-work guide. |
| `/services/smart-home-electrician-sydney` | Generic cabling focus and unsupported preference for hardwired points blurred intent; product/cloud limits were absent. | Refocus on electrical controls and compatibility; separate communications work. |
| `/services/pre-purchase-rental-electrical-inspections-sydney` | Existing scope, access and concealed-fault limitations were useful. Urgent guidance directed serious hazards to a quote/call rather than emergency services, and photo instructions lacked safety limits. | Preserve useful inspection content; correct safety and report boundaries. |
| `/services` | Catalogue destinations were useful. Emergency service routing lacked emergency-services guidance before the first CTA; photo requests needed a safety condition. One category description discussed website organisation rather than customer needs. | Surgical wording corrections; retain all catalogue links and layout. |

No route was treated as sufficient without changes in this batch. This does not mean shared components or owner-held specialist credentials have received new approval.

## Sources And Limits

Official sources consulted for the review:

- [NSW electrical work licensing](https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/electrical): fixed electrical installation work requires appropriate licensing. It does not establish additional business credentials.
- [NSW electrical safety requirements and consumer rights](https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/electrical-safety/electrical-safety-requirements-and-consumer-rights): licensed work and electrical compliance documentation.
- [NSW CCEW guidance](https://www.nsw.gov.au/housing-and-construction/compliance-and-regulation/electricians/electrical-standards-rules-and-notes/when-to-submit-a-certificate-of-compliance-for-electrical-work-ccew): documentation for completed wiring work is distinct from a condition-inspection summary.
- [NSW property inspection reports](https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-property-nsw/inspecting-a-property/inspection-reports): inspection scope and access limits; electrical inspection is not a comprehensive building or legal assessment.
- [Australian Cyber Security Centre: Internet of Things devices](https://www.cyber.gov.au/protect-yourself/securing-your-devices/how-secure-your-devices/internet-things-devices): product support, update periods and security considerations. No product interoperability or perpetual cloud availability is promised.
- [Fire and Rescue NSW emergency guidance](https://www.fire.nsw.gov.au/contact/emergencies): call Triple Zero from a safe location for an emergency.
- [Healthdirect electric shocks and burns](https://www.healthdirect.gov.au/amp/article/electric-shocks-and-burns): serious shock symptoms require emergency assistance; even an apparently mild shock requires medical review.

Installation details remain conditional on the actual product instructions, accessible installation and agreed scope. No numerical wiring-rule clearances, structural certification, specialist authorisation, response promise or additional business credential is invented. The words "our licensed electricians" do not imply every electrician holds all specialist credentials.

## Isolation And Evidence

Structured comparison with the release found exactly five changed service records and 41 unchanged records out of 46. The Services index also receives scoped copy changes. Header, artwork, conversion logic and route definitions remain outside the diff.

### Additional Root-Cause Layout Repair

The 320px/200% check exposed a pre-existing fixed two-column override on the inspection page. It reduced quote controls and switchboard-related links to about 116px; the related card's arrow, gap and padding left no text column. Merely adding an adaptive rule did not win against the legacy high-specificity selector, which matches `sm:grid-cols-2`.

The shared service template now names these specific action/link groups and removes three conflicting fixed-column utilities. Scoped service-only CSS uses content-sensitive grid tracks. No font shrinking, text hiding or test tolerance changes are used. This necessary shared repair is to be committed separately with its focused enlarged-text regression test. It does not change header selectors or assets.

The first browser test also incorrectly assumed a collapsible FAQ. The template intentionally renders question/answer cards. The corrected test asserts every actual question and answer is visible rather than silently skipping FAQ verification.

The Services index additionally exposed enlarged-text overflow in category headings, fixed catalogue columns, a hero heading and nested related links. Its scoped CSS now wraps long words, sizes catalogue tracks by available space, and stacks icon/label layouts inside narrow named containers. Link padding no longer consumes almost all of a nested card. Offer wording and review data are unchanged. Screen-reader-only labels are excluded from the visual overflow predicate only when their explicit `sr-only` element has the expected absolute, hidden, one-pixel presentation; visible labels remain checked.

Visual review also found credential labels wrapping into single-letter columns at 320px/200% text, despite passing a simple overflow check. A new regression requires at least four font-size units of available label width and no overflow. It failed against the earlier export. The correction is scoped to service/index hero credential tracks and narrow service hero padding; icons stack only when the text-scaled container threshold requires it. Existing credential wording is unchanged. This is a readability repair, not new approval of any business claim.

Cross-browser diagnostics identified an implicit minimum-content grid track in WebKit catalogue cards and an older important overflow-wrap rule affecting the Firefox inspection quote label. Explicit zero-minimum grid tracks and the scoped wrapping override address these without changing labels, targets or conversion handlers.

One combined browser run completed its first 27 assertions but stalled during worker shutdown. It was interrupted and is not counted as a completed pass. Replacement runs use separate bounded project processes and independently bound fail-closed local proxies; no functional assertions were removed.

Temporary injected-CSS diagnostics checked all 22 index width/text combinations to identify the remaining defects together. These diagnostics are not production-export pass evidence; the committed tests must pass against a fresh build without injected corrective CSS.

An intermediate command used `NEXT_PUBLIC_SITE_URL=https://c0d312.github.io` with a separate base path but omitted `NEXT_PUBLIC_DEPLOYMENT_TARGET=github-preview`. The exhaustive link/CTA audit correctly rejected absolute URLs missing the repository path. No production deployment configuration was changed. Final validation must use the explicit `github-preview` target and `NEXT_PUBLIC_SITE_URL=https://c0d312.github.io/evaready-electrical`; earlier runs are diagnostic only, not final preview SEO evidence.

The initial focused test run had an environment mismatch (tests omitted the build's preview variables) and the expected five changed-record snapshot failures. The same assertions passed after matching the environment and recording only the five authorised record hashes: 26 passed, zero failed. These are intermediate results, not a declaration that the whole batch has completed all validation.

Phase 3D4 publication reconciliation is based on successful workflow `33971736127`, artifact `9971140993`, deployment `6282046927`, and exact live/artifact verification at the base SHA. Only its six publication holds are removed; older route verification SHAs are preserved.

## Final Validation

The candidate was built with Node.js 22.23.1, Next.js 16.3.0, React 19.2.4, TypeScript 5.9.3, Tailwind 4.3.0 and Playwright 1.60.0. No dependency or lockfile changes were required. `npm ci` completed and both `npm audit` and `npm audit --omit=dev` reported zero vulnerabilities.

All final build and static checks used:

```powershell
$env:NEXT_PUBLIC_DEPLOYMENT_TARGET='github-preview'
$env:NEXT_PUBLIC_SITE_URL='https://c0d312.github.io/evaready-electrical'
$env:NEXT_PUBLIC_BASE_PATH='/evaready-electrical'
npm run build
npm run lint
npx tsc --noEmit
npx tsx --test tests/audits/*.test.ts
```

The audit unit suite passed 65 tests with zero failures or skips. These 20 commands passed: `audit:suburbs`, `audit:all-suburb-copy`, `audit:links`, `audit:metadata`, `audit:page-health`, `audit:response-times`, `audit:claims`, `audit:offers`, `audit:location-output`, `audit:location-evidence`, `audit:location-indexation`, `audit:location-privacy`, `audit:performance`, `audit:static-export`, `audit:conversion-truth`, `audit:all-routes-visibility`, `audit:visible-copy`, `audit:live-links-and-ctas`, `audit:production-domain` and `audit:whole-site-register` (each through `npm run`).

- Production build: 1,005 generated pages; 1,001 Windows static-segment aliases, byte identity verified.
- Sitemap and canonicals: 1,001 sitemap routes; 14,746 schema URLs checked; zero domain issues.
- Links and CTAs: 121,187 checks across 1,004 HTML outputs; zero failures.
- Exhaustive local sweep: 2,170 route checks and 196 scroll checks; zero failures.
- Suburbs unchanged: 873 index/follow, zero noindex, 873 sitemap entries, 873 self-canonicals, zero redirects, 873 unreviewed decisions, zero approved evidence records or evidence assets.
- Location privacy pass applies only to the empty scoped dataset, not to all repository history. Owner indexation decisions remain a separate blocked launch gate.

Browser tests used the strict local export at `http://127.0.0.1:4214/evaready-electrical/`, inert quote content where applicable and a fail-closed proxy permitting only local GET/HEAD requests. No genuine external forms or conversion deliveries were made. Completed-run proxy logs show zero unauthorised forwards. The public preview was not opened in these browser tests.

| Project or check | Passed | Failed | Skipped |
| --- | ---: | ---: | ---: |
| Desktop Chromium: six-route checks plus all 46 shared-card routes | 65 | 0 | 0 |
| Desktop Firefox, desktop WebKit, mobile Chrome, mobile Safari, iPad and iPad Pro: each | 9 | 0 | 1 |
| Eight earlier representative service cards in each of those six projects | 48 | 0 | 0 |
| Unchanged header regression | 2 | 0 | 0 |
| Mobile menu/modal focus, Back and scroll restoration | 4 | 0 | 0 |
| Total completed final runs | 173 | 0 | 6 |

The six skips are duplicated width matrices, run once in Chromium. The six-page matrix covers 320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920 and 2560px at normal and simulated 200% root text. All 46 shared-card routes have the same 22-state matrix. This is not an assertion of exhaustive all-route/all-browser coverage or field performance measurement.

Focused commands used `npx playwright test` with `phase3d5-general-services.spec.ts`, `service-controls-reflow.spec.ts`, `service-credential-reflow.spec.ts` and `service-action-card-reflow.spec.ts`, the explicit local base URL, and separately named projects. The temporary config set local-only proxy ports, blocked service workers, retained failure traces and wrote separate per-run JSON reports. Header checks ran `header-responsive.spec.ts` on `desktop-chromium-1366`; the mobile history checks ran `ux-overhaul.spec.ts` with the four menu/modal test names selected. Full exact invocation logs and machine-readable results remain in the local validation evidence, not the public repository.

The existing mobile history test assumed that another 240px of scrolling would leave the hero CTA. The longer introduction made that assumption false: the sticky CTA correctly remained absent while a guard intersected. The test now scrolls to the actual catalogue and proves every CTA/footer guard is outside the viewport before asserting sticky-CTA visibility. All original history, focus and scroll assertions remain.

Windows WebKit emitted internal loader diagnostics for blocked external loads and intermittently stalled on teardown with orphaned test network subprocesses. Incomplete runs were retained as failures, not counted as passes. Only positively identified orphan children of exited test browsers were terminated; complete fresh reruns passed, including clean process-exit evidence for Safari and iPad Pro. No website or browser-containment assertion was weakened.

Fourteen local main-content screenshots cover mobile, tablet, desktop and 320px/200% text. Fixed header, sticky CTA and skip-link overlays were masked only during these element captures so they did not obscure the inspected content. Functional checks use the unmasked page. Screenshots are not committed.

| Service | Main-visible words before | After |
| --- | ---: | ---: |
| Ceiling fans | 1,064 | 1,403 |
| Appliance installation | 1,055 | 1,391 |
| New builds and renovations | 1,115 | 1,440 |
| Smart home controls | 1,103 | 1,469 |
| Pre-purchase and rental inspections | 2,033 | 2,147 |

Counts include shared main-content wording and are not a measure of unique content quality. Individual scope decisions are recorded above. The register marks these five pages and the Services index locally reviewed and rewritten, but publication pending. It records 30 reviewed routes, 971 still awaiting individual review, 21 held rewrites and six pending publications. General owner-only claim reconfirmations and future release approval remain outstanding. No new live or whole-site-complete claim is made.
