# Final All-Updates Live Proof Report

Date: 2026-06-22

Repository: https://github.com/C0D312/evaready-electrical

Source branch: main

Deploy branch: gh-pages

Public preview: https://c0d312.github.io/evaready-electrical/

## Scope

This deployment gate verifies that the completed Evaready Electrical source updates are committed, exported for GitHub Pages, deployed to `gh-pages`, and proven live on the public preview site.

Preserved requirements:

- Google Ads marker `AW-18165545331`
- `data-conversion-action="phone-click"`
- `data-conversion-action="quote-click"`
- `tel:+61461247247`
- approved quote/booking path
- 60-minute core emergency response wording
- 90-minute greater-region response wording
- Ausgrid & Endeavour Energy Accredited Level 2 ASP wording
- dark-blue brand theme
- red emergency and Call Now styling
- blue Get a Quote styling
- original untinted hero van imagery
- scrolling service strip
- mobile sticky Call Now / Get a Quote CTA
- responsive header
- generated suburb and service routes
- `sitemap.xml`, `robots.txt`, and `site-version.json`

## Source State

Origin remote: correct C0D312/evaready-electrical repository.

Initial local main SHA before this report/version marker: `efb5dab947ef30b05d93e6e1c866b9639c5ebd32`

Initial remote main SHA before this report/version marker: `efb5dab947ef30b05d93e6e1c866b9639c5ebd32`

Initial local gh-pages SHA before refreshed deployment: `9aa33168ba97b37a0e1bd13582e9fc1801ba12b5`

Initial remote gh-pages SHA before refreshed deployment: `9aa33168ba97b37a0e1bd13582e9fc1801ba12b5`

Current source change prepared for commit:

- `public/site-version.json` deployment marker updated for this final all-updates gate.
- this report created.

Unstaged local items classified as generated reports, older screenshot artifacts, local server logs, or pre-existing unrelated document deletions. They are not required for the deployment payload.

## Source Scan

Public-facing source scan result:

- stale wording: 0 matches
- risky wording: 0 matches
- unresolved placeholders: 0 matches
- debug-style matches: audit-script logging only, not public-facing site code

Detailed scan output: `reports/final-all-updates-source-scan.json`

## Local Validation

Passed:

- `npm.cmd run lint`
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npm.cmd run audit:all-suburb-copy`
- `npm.cmd run audit:suburbs`
- `npm.cmd run audit:metadata`
- `npm.cmd run audit:links`
- `npm.cmd run audit:visible-copy`
- `npm.cmd run audit:page-health`
- `npm.cmd run audit:response-times`
- `npm.cmd run audit:visibility`
- `npm.cmd run audit:live-links-and-ctas`

Key audit results:

- generated HTML pages checked by links audit: 1001
- generated routes checked by visibility audit: 1002
- live-link/CTA audit routes checked: 1002
- internal links checked: 20088
- live-link/CTA rows checked: 131543
- broken internal links: 0
- CTA failures: 0
- critical visibility failures: 0
- response-time hard mismatches: 0

Detailed validation output: `reports/final-all-updates-validation-results.json`

## Generated Output

Expected generated route files were present:

- `/`
- `/about/`
- `/contact/`
- `/solar-batteries/`
- `/emergency-electrician-sydney/`
- `/level-2-electrician-sydney/`
- `/services/`
- `/service-areas/`
- `/services/pre-purchase-rental-electrical-inspections-sydney/`
- `/services/hot-water-system-electrician-sydney/`
- `/services/split-system-air-conditioning-sydney/`
- `/services/switchboard-upgrades-sydney/`
- `/privacy-policy/`
- `/terms/`
- `/sitemap.xml`
- `/robots.txt`
- `/site-version.json`

Generated-output checks:

- stale/risky public wording absent
- Google Ads marker present
- phone/quote conversion markers present
- phone link present
- response-time wording present
- ASP wording present
- About, Contact, Solar & Batteries and inspection page markers present
- Google proof markers present
- Privacy and Terms page markers present

Detailed output checks:

- `reports/final-all-updates-route-existence.json`
- `reports/final-all-updates-output-checks.json`

## Responsive QA

Local generated-site responsive QA checked 14 pages across 11 viewport profiles.

Result:

- rows checked: 154
- failures: 0
- horizontal overflow failures: 0
- header clipping failures: 0
- CTA marker failures: 0

Detailed responsive output:

- `reports/final-all-updates-responsive-qa.csv`
- `reports/final-all-updates-responsive-qa-summary.json`

## Deployment

Source commit pushed to `main` for this verification gate:

- `3df0156911b514ed806ede090b39b54ab6ee43b9`

Deployment commit pushed to `gh-pages`:

- `d619a0c545cd474c568e1fdea8378b0c8bfbf960`

Remote branch confirmation:

- remote `main`: `3df0156911b514ed806ede090b39b54ab6ee43b9`
- remote `gh-pages`: `d619a0c545cd474c568e1fdea8378b0c8bfbf960`

Live build hash served publicly:

- `lkBof4F6S3c3dPBku1EKf`

Live site-version marker served publicly:

- `Final all-updates deployment gate with full generated-route, responsive and public live verification.`

## Public URL Verification

Normal and cache-busted URLs checked:

- checked: 34
- failures: 0
- normal URL failures: 0
- cache-busted URL failures: 0

Required public URL set included:

- `/`
- `/about/`
- `/contact/`
- `/solar-batteries/`
- `/emergency-electrician-sydney/`
- `/level-2-electrician-sydney/`
- `/services/`
- `/service-areas/`
- `/services/pre-purchase-rental-electrical-inspections-sydney/`
- `/services/hot-water-system-electrician-sydney/`
- `/services/split-system-air-conditioning-sydney/`
- `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/`
- `/privacy-policy/`
- `/terms/`
- `/sitemap.xml`
- `/robots.txt`
- `/site-version.json`

Detailed public URL verification:

- `reports/final-all-updates-required-public-url-verification.json`

## Live Sitemap Crawl

Live sitemap crawl result:

- sitemap status: 200
- live sitemap routes checked: 999
- route failures: 0
- de-duplicated internal links checked: 999
- broken links: 0
- public assets checked: 18
- failed assets: 0
- CTA failures: 0
- stale-string failures: 0
- risky-string failures: 0
- localhost failures: 0

Detailed live sitemap crawl:

- `reports/final-all-updates-live-sitemap-crawl.json`

## Live Visual Spot Check

Public Playwright visual spot check:

- pages checked: 12
- viewport profiles checked: 4
- page/viewport rows checked: 48
- failures: 0

Checked pages:

- homepage
- About
- Contact
- Solar & Batteries
- Emergency
- Level 2
- Services
- Service Areas
- Pre-Purchase & Rental Electrical Inspections
- Panania
- Privacy
- Terms

Checked viewport profiles:

- 390x844
- 820x1180
- 1366x768
- 1920x1080

Visual checks confirmed no horizontal overflow, no header clipping, scrolling strip present, sticky CTA present on mobile, CTAs/tracking present, CSS loaded, images loaded, and hero image styles remained untinted where a `.brand-hero-image` was present.

Detailed visual QA:

- `reports/final-all-updates-live-visual-spot-check.csv`
- `reports/final-all-updates-live-visual-spot-check-summary.json`

## Final Deployment Diagnosis

Final result: LIVE PASS

The correct repository and branches were confirmed, source validation passed, `main` and `gh-pages` were pushed, GitHub Pages served the latest build hash, normal and cache-busted URLs were current, and the full live sitemap crawl plus live visual spot check completed with zero failures.
