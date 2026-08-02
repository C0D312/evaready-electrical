# Final Prelaunch Baseline

Baseline captured: 2026-08-03 05:06:36 +10:00 (Australia/Sydney)

## Scope and safety

This is a documentation-only baseline of the committed source at `HEAD`. No production source, website content, routes, styles, deployment configuration, CNAME, DNS, hosting settings, repository settings, or external account was changed.

- Required branch: `codex/responsive-ux-overhaul`
- Confirmed branch: `codex/responsive-ux-overhaul`
- Local SHA before baseline: `464398bbe8bd7f011ae3b1f3dcafbbb39b983eae`
- Remote SHA before baseline: `464398bbe8bd7f011ae3b1f3dcafbbb39b983eae`
- Origin: `https://github.com/C0D312/evaready-electrical.git`
- Staged files before baseline: 0
- Branded production domain accessed: no
- GitHub Pages, DNS, CNAME, hosting, and repository settings changed: no
- Deployment or workflow manually triggered: no

The existing workflow at `.github/workflows/pages.yml` runs on pushes to `main` or manual `workflow_dispatch`. It does not run on pushes to `codex/responsive-ux-overhaul`, and it contains validation rather than a deployment job. The GitHub Actions API returned no workflow runs for this feature branch before the documentation handoff.

## Environment and configuration

| Item | Baseline |
| --- | --- |
| Operating environment | Windows, PowerShell 5.1.26100.8972 |
| Node.js | v26.1.0 |
| npm | 11.13.0 |
| Next.js | 16.2.12 |
| React / React DOM | 19.2.4 |
| TypeScript | 5.9.3 |
| ESLint | 9.39.4 |
| Playwright | 1.60.0 |
| Output mode | Next.js static export |
| Deployment target | `github-preview` |
| Base path | `/evaready-electrical` |
| Preview origin | `https://c0d312.github.io/evaready-electrical` |
| Trailing-slash policy | enabled |
| CNAME | absent |

The build, metadata, canonicals, schema, sitemap, robots file, absolute URLs, and assets were validated with the existing GitHub Pages preview origin and base path. They were not changed.

## Working-tree separation

The initial porcelain status contained 339 items:

- 38 tracked status entries
- 301 untracked entries
- 0 staged entries
- 36 tracked files with actual content differences
- 0 actual production-source content differences

Two source paths appeared modified in porcelain status but were byte/hash-identical to `HEAD` and absent from `git diff`:

- `app/offers.css`
- `components/offer-card.tsx`

The 36 actual tracked changes were documentation and generated reports only:

```text
docs/all-routes-launch-sweep.md
reports/all-routes-launch-sweep.csv
reports/all-routes-visibility-audit.csv
reports/all-suburb-visible-copy-audit.csv
reports/dark-blue-no-van-tint-preview/homepage-1366x768.png
reports/dark-blue-no-van-tint-preview/homepage-390x844.png
reports/electric-header-background-theme-qa/contact-mobile-390x844.png
reports/electric-header-background-theme-qa/emergency-desktop-1440x900.png
reports/electric-header-background-theme-qa/emergency-mobile-390x844.png
reports/electric-header-background-theme-qa/home-desktop-1440x900.png
reports/electric-header-background-theme-qa/home-mobile-390x844.png
reports/electric-header-background-theme-qa/panania-mobile-390x844.png
reports/electric-header-background-theme-qa/qa-summary.json
reports/electric-header-background-theme-qa/service-areas-mobile-390x844.png
reports/electric-header-background-theme-qa/services-desktop-1440x900.png
reports/internal-link-audit.md
reports/live-link-cta-audit.csv
reports/metadata-audit.csv
reports/page-health-audit.csv
reports/page-visibility-audit.csv
reports/performance-asset-audit.csv
reports/performance-before-after.csv
reports/rebuilt-electric-header-composed-system/contact-390x844.png
reports/rebuilt-electric-header-composed-system/emergency-390x844.png
reports/rebuilt-electric-header-composed-system/home-1366x768.png
reports/rebuilt-electric-header-composed-system/home-1920x1080.png
reports/rebuilt-electric-header-composed-system/home-320x568.png
reports/rebuilt-electric-header-composed-system/home-390x844.png
reports/rebuilt-electric-header-composed-system/home-430x932.png
reports/rebuilt-electric-header-composed-system/level2-390x844.png
reports/rebuilt-electric-header-composed-system/panania-390x844.png
reports/rebuilt-electric-header-composed-system/service-areas-390x844.png
reports/rebuilt-electric-header-composed-system/services-390x844.png
reports/response-time-classification-audit.csv
reports/suburb-page-audit.csv
reports/visible-copy-audit.csv
```

The 301 untracked items were classified without deleting or changing them:

| Category | Count | Treatment |
| --- | ---: | --- |
| PNG screenshots | 146 | Preserved; not production source |
| Logs | 57 | Preserved; not production source |
| Extensionless artifacts | 48 | Preserved; manual-review artifacts |
| JSON reports/artifacts | 32 | Preserved |
| WebP files | 10 | Preserved; see header experiments below |
| CSV reports | 3 | Preserved |
| PID files | 2 | Preserved |
| `.err`, `.job`, `.mjs` artifacts | 3 | Preserved |

The only untracked files under `public/` were ten superseded-looking v9/v10 header experiments. They are not referenced by the committed source, but were left untouched because this prompt did not authorise cleanup:

```text
public/images/header/evaready-header-desktop-refined-v9.webp
public/images/header/evaready-header-large-refined-v9.webp
public/images/header/evaready-header-mobile-refined-v9.webp
public/images/header/evaready-header-tablet-refined-v9.webp
public/images/header/evaready-header-wide-refined-v9.webp
public/images/header/evaready-header-desktop-refined-v10.webp
public/images/header/evaready-header-large-refined-v10.webp
public/images/header/evaready-header-mobile-refined-v10.webp
public/images/header/evaready-header-tablet-refined-v10.webp
public/images/header/evaready-header-wide-refined-v10.webp
```

## Validation method

The committed source was exported with `git archive HEAD` into an isolated temporary directory. The exact `package-lock.json` dependency tree was installed there with `npm ci`. All generated build and audit output stayed in that isolated directory.

Two harness conditions were corrected and rerun rather than recorded as site failures:

1. Turbopack correctly rejected an initial external `node_modules` junction. A standalone dependency install was used, and the clean build passed.
2. An initial minimal static server returned 404 for extensionless directory URLs. After directory-index handling was corrected, the isolated mobile Back/menu test and the complete focused suite passed.

The first exhaustive visibility run reached six viewport batches before a 15-minute shell limit. It was rerun unchanged with a longer allowance and completed successfully.

## Required check results

| Check | Command | Result |
| --- | --- | --- |
| ESLint | `npm.cmd run lint` | PASS, 0 errors |
| TypeScript | `tsc --noEmit` | PASS, 0 errors |
| Clean production build | `npm.cmd run build` | PASS, 1,005 static pages |
| Suburb completeness | `npm.cmd run audit:suburbs` | PASS, 873/873, 0 warnings |
| All suburb visible copy | `npm.cmd run audit:all-suburb-copy` | PASS, 873/873, 0 issues |
| Metadata | `npm.cmd run audit:metadata` | PASS, 1,001 rows, 0 warnings |
| Visible copy | `npm.cmd run audit:visible-copy` | PASS, 1,001 pages, 0 warnings |
| Page health | `npm.cmd run audit:page-health` | PASS, 1,001 routes, 0 critical warnings |
| Response classification | `npm.cmd run audit:response-times` | PASS, 873 suburbs, 0 mismatches |
| Internal links | `npm.cmd run audit:links` | PASS, 20,187 links, 0 broken |
| Canonical/sitemap/schema/assets | `npm.cmd run audit:production-domain` | PASS, 0 issues |
| All-route visibility | `npm.cmd run audit:all-routes-visibility` | PASS, 1,004 routes, 0 critical warnings |
| Exhaustive responsive visibility | `npm.cmd run audit:visibility` | PASS, 7,028 checks, 0 critical issues |
| Production responsive smoke | `npm.cmd run audit:production-smoke` | PASS, 84 checks, 0 failures |
| Focused Playwright | four focused specs, desktop Chromium 1440 and mobile Chrome 390 | PASS, 37 passed, 11 intentional device-specific skips, 0 failed |
| Console/hydration route smoke | `cross-device-smoke.spec.ts`, desktop 1440 and mobile 390 | PASS, 2 passed, 0 failed |

Focused Playwright covered header art, desktop and mobile service navigation, offers, H1/landmarks/tracking, reduced motion, full-card links, region links, continuous background canvas, desktop and mobile service-area menus, mobile scroll lock, Escape, browser Back, quote dialog focus/Back behaviour, skip link, FAQ keyboard control, sticky/footer spacing, and internal header/footer links.

The 11 skips are deliberate test conditions: desktop-only assertions skip on mobile and mobile-only assertions skip on desktop. They do not mask failures at the selected representative viewport for each behaviour.

Build/test warnings:

- Node 26 emitted `DEP0205` warnings because `module.register()` is deprecated. Build and tests still passed.
- No source code was changed to suppress this toolchain warning.

## Route-count reconciliation

| Metric | Expected | Measured | Explanation |
| --- | ---: | ---: | --- |
| Next static pages | 1,005 | 1,005 | Exact match; includes framework-generated output such as the not-found page. |
| Known route inventory | 1,004 | 1,004 | Exact match; includes 1,001 sitemap routes plus `robots.txt`, `sitemap.xml`, and `site-version.json`. |
| Sitemap URLs | 1,001 | 1,001 unique | Exact match; no duplicate URL and no missing generated page. |
| Suburb pages | 873 | 873 | Exact match across coverage data, search data, route generation, and output. |
| Generated service pages | 46 | 46 unique slugs | Exact match. The inventory also has one bespoke switchboard service page, making 47 routes typed as service pages. Its `serviceRoutes: 49` statistic adds the Emergency and Level 2 top-level service routes. |
| Fault guides | 15 | 15 | Exact match. |
| Region pages | not supplied | 16 | Complete. |
| Area pages | not supplied | 39 | Complete. |

## SEO, URL, and asset integrity

- Canonical pages checked: 1,001
- Sitemap URL count: 1,001
- Unique sitemap URL count: 1,001
- Schema URLs checked: 20,857
- Asset references checked: 25,967
- Production-domain audit issues: 0
- GitHub preview origin retained: yes
- Preview base path retained: yes
- Robots sitemap reference correct: yes
- CNAME present: no
- Missing generated sitemap pages: 0
- Broken internal links: 0 of 20,187
- Generated HTML route issues: 0 across 1,003 checked HTML routes

## Route payload baseline

Sizes are KiB (`bytes / 1024`). Gzip and Brotli totals are the sum of the individually compressed files referenced by each route. Shared CSS/JavaScript is cacheable across navigation; these figures are per cold route request, not incremental repeat-navigation cost.

| Route | HTML raw / gzip / br | CSS raw / gzip / br | JS raw / gzip / br | CSS / JS files |
| --- | ---: | ---: | ---: | ---: |
| Homepage | 304.4 / 35.9 / 19.7 | 468.3 / 65.1 / 50.2 | 690.8 / 204.5 / 177.3 | 2 / 8 |
| Services | 815.4 / 70.2 / 35.4 | 468.3 / 65.1 / 50.2 | 690.8 / 204.6 / 177.2 | 2 / 8 |
| Emergency Electrician | 472.9 / 52.6 / 26.2 | 482.8 / 67.6 / 52.4 | 690.8 / 204.6 / 177.2 | 3 / 8 |
| Level 2 Electrician | 422.9 / 46.2 / 23.7 | 468.3 / 65.1 / 50.2 | 690.8 / 204.6 / 177.2 | 2 / 8 |
| Service Areas | 468.9 / 51.6 / 26.9 | 468.3 / 65.1 / 50.2 | 690.8 / 204.6 / 177.2 | 2 / 8 |
| Switchboard Upgrades | 454.2 / 50.4 / 25.9 | 468.3 / 65.1 / 50.2 | 690.8 / 204.6 / 177.2 | 2 / 8 |
| No Power In One Room guide | 262.1 / 30.7 / 17.1 | 468.3 / 65.1 / 50.2 | 690.8 / 204.6 / 177.2 | 2 / 8 |
| Panania suburb | 484.7 / 53.5 / 27.2 | 468.3 / 65.1 / 50.2 | 690.8 / 204.6 / 177.2 | 2 / 8 |

Export-wide asset audit:

| Type | Files | Raw bytes | Gzip bytes |
| --- | ---: | ---: | ---: |
| HTML | 1,004 | 479,352,221 | 53,541,290 |
| RSC/text | 9,789 | 742,286,555 | 94,048,283 |
| JavaScript | 14 | 859,985 | 255,929 |
| CSS | 3 | 494,363 | 70,356 |
| Images | 54 | 3,759,279 | 3,753,639 |
| JSON | 2 | 131,581 | 13,360 |
| XML | 1 | 189,419 | 8,475 |

The performance audit found 59 generated files over 500 KB raw and none over 1 MB. The largest file is `services/index.html` at 835,018 bytes raw. This is a measurable payload concern for a later source-change phase, not a functional failure in this report-only baseline.

## Header dimensions at supported widths

All measurements came from the clean production export. Horizontal inset was 0 px at every viewport except 2560 px, where rounding measured 0.04 px. The responsive smoke reported no failure.

| Viewport | Banner | Ticker | Desktop nav | Complete header | Selected source |
| --- | ---: | ---: | ---: | ---: | --- |
| 320x568 | 110 px | 28 px | 0 px | 144 px | mobile v12, 960x300 |
| 360x800 | 113 px | 28 px | 0 px | 147 px | mobile v12, 960x300 |
| 375x812 | 117 px | 28 px | 0 px | 151 px | mobile v12, 960x300 |
| 390x844 | 122 px | 28 px | 0 px | 156 px | mobile v12, 960x300 |
| 412x915 | 129 px | 28 px | 0 px | 163 px | mobile v12, 960x300 |
| 430x932 | 134 px | 28 px | 0 px | 168 px | mobile v12, 960x300 |
| 768x1024 | 120 px | 28 px | 0 px | 154 px | tablet v12, 1600x250 |
| 820x1180 | 128 px | 28 px | 0 px | 162 px | tablet v12, 1600x250 |
| 1024x768 | 104 px | 20 px | 34 px | 164 px | desktop v14, 2560x260 |
| 1280x800 | 130 px | 21 px | 40 px | 197 px | desktop v14, 2560x260 |
| 1366x768 | 139 px | 21 px | 40 px | 206 px | desktop v14, 2560x260 |
| 1440x900 | 146 px | 21 px | 40 px | 213 px | desktop v14, 2560x260 |
| 1920x1080 | 150 px | 21 px | 40 px | 217 px | large v14, 2944x230 |
| 2560x1440 | 153 px | 21 px | 40 px | 220 px | wide v14, 3840x230 |

## Supplemental dependency advisory baseline

`npm audit --omit=dev` returned three high-severity production dependency findings and no critical findings:

- `next` 16.2.12, direct dependency, reported through `postcss` and `sharp`
- `postcss` <=8.5.17, transitive
- `sharp` <0.35.0, transitive

The full dependency tree adds one high-severity development finding in `brace-expansion`, for four high findings in total. npm's suggested automatic fix points to an invalid-looking major downgrade of Next.js 9.3.3, so no automatic or forced fix was applied. These advisories require a separate, controlled dependency review and full regression run before launch. Static export reduces server-runtime exposure but does not eliminate build-chain or client-delivery risk.

## Baseline conclusion

The required documentation-task gates pass on the committed feature-branch source:

- Build, lint, and TypeScript: pass
- Route, suburb, copy, metadata, response, canonical, schema, sitemap, robots, link, and asset audits: pass
- Responsive smoke and exhaustive visibility: pass
- Focused keyboard, menu, modal, Back-button, CTA, header, offers, and cross-device browser checks: pass
- Production source changed by this task: no

Remaining pre-launch risks recorded for a later authorised implementation phase:

1. Review and resolve the three production npm advisories without applying npm's unsafe downgrade suggestion.
2. Investigate the 835 KB raw Services HTML and the 59 generated files over 500 KB while preserving visible SEO content.
3. Review the 301 existing untracked artifacts and ten unreferenced v9/v10 header assets separately; none should be deleted without owner approval.
4. The Node 26 `module.register()` deprecation warnings should be revisited when the Next.js/toolchain dependencies are updated.

This baseline does not approve a branded-domain launch and performs no launch action.
