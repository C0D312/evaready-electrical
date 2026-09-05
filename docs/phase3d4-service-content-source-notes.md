# Phase 3D4 core service review

Status: locally validated; publication requires a separately authorised release.
Application baseline: `187605f9916b246e875728a5a6e18e4c197540ea`.
Branch: `codex/phase3d4-core-services`.

## Individual service decisions

| Service | Specific customer need and boundaries |
| --- | --- |
| Residential | Distinguish home fault repairs from renovations; inspect existing wiring and protection; explain access, concealed defects, shutdowns and making-good exclusions. |
| Commercial | Assess business equipment loads and premises wiring; agree authorised shutdowns and access; distinguish installation faults from equipment and network work. Do not promise uninterrupted trading. |
| Strata | Establish common-property and lot boundaries using the strata plan and by-laws; obtain appropriate authority; coordinate resident and plant access. Do not imply a blanket building or fire-safety certification. |
| Property management | Separate a tenant's reported symptoms from diagnosis; escalate dangerous faults; coordinate lawful access, repair authority and handover records. A booking is not permission to enter. |
| Lighting | Assess fittings, drivers, dimmers, switching and environmental suitability; distinguish lighting faults from redesign; describe ceiling access and making-good limitations. |
| Power points | Assess outlet position, circuit capacity, loads and protection. Additional sockets do not create additional electrical capacity; fixed appliances and EV charging need their own assessment. |

All six include initial emergency guidance before conversion controls, a service guide, warning signs, inspection/work scope, process and limitations, quote information and visible FAQs. No specialist credentials or evidence records were introduced.

## Sources consulted

Official NSW sources consulted during this phase:

- [Electrical safety](https://www.nsw.gov.au/housing-and-construction/safety-home/electrical-safety): licensed electrical work, faulty equipment, overloading and electrical hazards.
- [Strata repairs and maintenance](https://www.nsw.gov.au/housing-and-construction/strata/living/repairs-and-maintenance): common property, strata plans and by-laws.
- [Strata renovations](https://www.nsw.gov.au/housing-and-construction/strata/living/renovations): relevant approval boundaries.
- [Urgent repairs in residential rental properties](https://www.nsw.gov.au/housing-and-construction/rules/urgent-repairs-residential-rental-properties): dangerous electrical faults and landlord/agent notification.
- [Getting repairs done](https://www.nsw.gov.au/housing-and-construction/renting-a-place-to-live/getting-repairs-done): rental repair and access responsibilities.

These sources support general guidance, not an assertion of EVAREADY's individual credentials, insurance or completed work. Existing owner-evidence holds remain separate and unresolved.

## Isolation and validation checkpoint

Object comparison against the baseline found 46 service records before and after. Exactly the six named records changed; all other service records were deeply equal.

Browser validation subsequently justified two narrowly scoped shared-file changes:

- `app/services/[slug]/page.tsx`: safety, quote-checklist and audience lists now use the existing content-aware grid instead of utility classes caught by a legacy mobile two-column override. At 320px and 200% text the old layout left only 4px for some text. The audience heading also distinguishes general property services from the dedicated condition-inspection service; strata and property-management pages must not inherit the inspection-only heading.
- `app/ux-overhaul.css`: only the generated service H1 selector permits long words to wrap. At 360px and 200% text, the residential heading had a 502px scroll width in a 214px text box. Bounded assertion polling confirmed this was persistent, not transient layout settling. Font sizes and heading wording are unchanged.

No header, navigation, theme artwork or conversion-handler changes were made. Failed browser runs are retained outside Git in temporary phase evidence; they are not counted as passing checks.

Node 22.23.1: lint, TypeScript, production static export and seven focused built-output tests passed. The focused tests check safety ordering, service-specific sections, real Call/Quote destinations, FAQ visible/schema parity and absence of invented aggregate-rating schema. This is not yet a complete browser-validation result.

The build generated 1005 static pages and 1001 segment aliases. Suburb inventory and visible-copy checks passed for 873 outputs. All 58 Node audit tests pass after recording the six authorised semantic hashes separately from the untouched baseline hashes.

The new browser suite passed 43 tests: seven in desktop Chromium (including 132 combinations of six routes, eleven widths and two text sizes), and six each in desktop Firefox, desktop WebKit, mobile Chrome, mobile Safari, iPad and iPad Pro. Base URL: `http://127.0.0.1:4214/evaready-electrical/`. External requests were denied by route fixtures and a loopback-only allowlist proxy; booking content was inert.

The existing shared-card/header run passed 56 tests and skipped one duplicate header matrix on the 1440px project. The explicit 1366px header project subsequently passed both tests, including all 20 supported widths. Two focused mobile menu/dialog accessibility tests passed. The exhaustive scrolling audit completed 2170 route checks and 196 scroll checks with zero failures. This does not constitute exhaustive all-browser coverage.

All 19 final static audits passed. The 873 suburbs remain index/follow, self-canonical and in the sitemap, with zero redirects, zero noindex pages, zero approved evidence records and zero evidence assets. The separate owner-indexation launch gate remains blocked. Full and production dependency audits found zero vulnerabilities. A scoped common-credential-pattern scan found no matches in the 11 candidate files; this is not a whole-repository or Git-history privacy certification.

Clean-commit confirmation is performed after the atomic commits; the exact tested SHA belongs in the phase handoff rather than a self-referential claim in this document. No current-phase changes have been deployed.

Main-content word counts below strip scripts and HTML tags and split on whitespace. They include shared material inside `main`, exclude header/footer, and are not a uniqueness or quality score. Before is the verified Phase 3D3 deployed artifact; after is this local export.

| Route slug | Before | After |
| --- | ---: | ---: |
| residential-electrician-sydney | 1113 | 1543 |
| commercial-electrician-sydney | 1106 | 1525 |
| strata-electrician-sydney | 1159 | 1559 |
| property-management-electrician-sydney | 1156 | 1558 |
| lighting-electrician-sydney | 1058 | 1460 |
| power-point-installation-sydney | 1089 | 1516 |

## Validation commands

Runtime: Node 22.23.1, Next 16.3.0, React/React DOM 19.2.4, TypeScript 5.9.3, Tailwind 4.3.0, Playwright 1.60.0, Sharp 0.35.3. No dependency or lockfile change.

```powershell
$env:NEXT_PUBLIC_DEPLOYMENT_TARGET='github-preview'
$env:NEXT_PUBLIC_BASE_PATH='/evaready-electrical'
$env:NEXT_PUBLIC_SITE_URL='https://c0d312.github.io/evaready-electrical'
npm ci
npm audit
npm audit --omit=dev
npm run lint
npx tsc --noEmit
npm run build
npx tsx --test tests/audits/*.test.ts
npm run generate:whole-site-register
npm run audit:whole-site-register
npx tsx scripts/serve-static-export.ts --port=4214 --base-path=/evaready-electrical --strict-base-path --pages-like
```

Final static commands: `npm run` followed by each of `audit:suburbs`, `audit:all-suburb-copy`, `audit:links`, `audit:metadata`, `audit:page-health`, `audit:response-times`, `audit:claims`, `audit:offers`, `audit:location-output`, `audit:location-evidence`, `audit:location-indexation`, `audit:location-privacy`, `audit:performance`, `audit:static-export`, `audit:conversion-truth`, `audit:all-routes-visibility`, `audit:production-domain`, `audit:visible-copy`, `audit:whole-site-register`.

Browser commands used a temporary fail-closed proxy configuration at `C:/Users/Admin/AppData/Local/Temp/ev3d4-browser.config.ts`, with explicit local base URL above:

```powershell
npx playwright test tests/e2e/phase3d4-core-services.spec.ts --config=C:/Users/Admin/AppData/Local/Temp/ev3d4-browser.config.ts --project=desktop-chromium-1440
# Each of desktop-firefox-1440, desktop-webkit-1440, mobile-chrome-390,
# mobile-safari-390, ipad-768, ipad-pro-1024:
npx playwright test tests/e2e/phase3d4-core-services.spec.ts --config=C:/Users/Admin/AppData/Local/Temp/ev3d4-browser.config.ts --project=$project --grep-invert='core service text fits'
npx playwright test tests/e2e/service-action-card-reflow.spec.ts tests/e2e/header-responsive.spec.ts --config=C:/Users/Admin/AppData/Local/Temp/ev3d4-browser.config.ts --project=desktop-chromium-1440
npx playwright test tests/e2e/header-responsive.spec.ts --config=C:/Users/Admin/AppData/Local/Temp/ev3d4-browser.config.ts --project=desktop-chromium-1366
npx playwright test tests/e2e/ux-overhaul.spec.ts --config=C:/Users/Admin/AppData/Local/Temp/ev3d4-browser.config.ts --project=mobile-chrome-390 --grep='mobile menu traps the page|quote dialog is accessible'
node C:/Users/Admin/AppData/Local/Temp/ev3d4-scroll.cjs
git diff --check
```

The scroll wrapper runs the unchanged `scripts/audit-scroll-and-text-fit.ts` without `--sample` and adds the deny proxy. Temporary harnesses, logs, screenshots, dependencies and generated build output are not part of the commit.
