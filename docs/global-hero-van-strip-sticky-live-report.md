# Global Hero, Van, Strip and Sticky CTA Live Report

## Source Changes

- About, Contact, Privacy Policy, Terms and 404 now use the shared branded internal hero shell.
- Solar & Batteries now uses the shared untinted full hero van image layer instead of a separate lower image card.
- Shared CSS now restores one untinted van layer for internal hero pages that do not render their own hero image, while disabling that pseudo layer when a real hero image is present.
- Legal-page CSS no longer suppresses branded hero van layers.
- Existing global header, route/service strip and mobile sticky CTA remain shared through `SiteHeader`.

## Files Changed

- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/globals.css`
- `app/not-found.tsx`
- `app/privacy-policy/page.tsx`
- `app/solar-batteries/page.tsx`
- `app/terms/page.tsx`
- `reports/global-hero-van-strip-sticky-qa/`

## Shared Layout Result

- Shared hero component used: partial, via shared `brand-internal-hero`, `home-brand-hero`, `internal-hero-copy-panel` and global CSS system.
- About van fixed: yes.
- Contact van fixed: yes.
- Solar van fixed: yes.
- Other hero pages aligned: homepage, emergency, Level 2, services, service areas, generated service pages, suburb sample, privacy and terms checked.
- Untinted van confirmed: yes, browser QA confirmed hero image `filter: none`, `opacity: 1`, `mix-blend-mode: normal` or equivalent untinted pseudo van layer.
- Scrolling strip added to all HTML pages: yes, static HTML audit found `emergency-issue-marquee` on all 1002 generated HTML files.
- Sticky CTA added to all HTML pages: yes, static HTML audit found `mobile-sticky-cta` on all 1002 generated HTML files.

## Routes Checked

- `/`
- `/about/`
- `/contact/`
- `/solar-batteries/`
- `/emergency-electrician-sydney/`
- `/level-2-electrician-sydney/`
- `/services/`
- `/service-areas/`
- `/services/pre-purchase-rental-electrical-inspections-sydney/`
- `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/`
- `/privacy-policy/`
- `/terms/`

## Viewports Checked

- `320x568`
- `360x800`
- `375x812`
- `390x844`
- `412x915`
- `430x932`
- `768x1024`
- `800x1280`
- `820x1180`
- `834x1194`
- `912x1368`
- `1024x1366`
- `1280x800`
- `1024x768`
- `1180x820`
- `1280x720`
- `1366x768`
- `1440x900`
- `1536x864`
- `1600x900`
- `1920x1080`
- `2560x1440`

## Browser QA

- Chromium: 12 routes x 22 viewports = 264 checks, 0 failures.
- WebKit/Safari-style: 12 routes x 22 viewports = 264 checks, 0 failures.
- Firefox: unavailable in this environment; headless launch timed out/crashed during the attempted run.
- Static generated HTML audit: 1002 HTML files checked, 0 failures.
- Live GitHub Pages QA: normal and cache-busted URLs checked for 12 HTML routes at 390x844 and 1366x768, plus 3 static routes; 54 checks, 0 failures.
- Screenshots: `reports/global-hero-van-strip-sticky-qa/`.

## Automated Validation

- `npm.cmd run audit:all-suburb-copy`: pass.
- `npm.cmd run audit:suburbs`: pass.
- `npm.cmd run audit:metadata`: pass, 0 warnings.
- `npm.cmd run audit:links`: pass, 0 broken links.
- `npm.cmd run audit:visible-copy`: pass, 0 warnings.
- `npm.cmd run audit:page-health`: pass, 0 critical warnings.
- `npm.cmd run audit:response-times`: pass, 0 hard mismatches.
- `npm.cmd run audit:live-links-and-ctas`: pass, 1002 HTML routes checked, 0 broken links, 0 CTA failures.
- `npm.cmd run audit:visibility`: script exists and was run, but did not complete within 15 minutes after printing all viewport passes. Replacement static + Playwright QA above was used for visibility proof.
- `npm.cmd run lint`: pass.
- `npm.cmd run build`: pass.

## Output Checks

- `AW-18165545331`: present.
- `data-conversion-action="phone-click"`: present.
- `data-conversion-action="quote-click"`: present.
- `tel:+61461247247`: present.
- Stale wording grep: no matches.
- Risky wording grep: no matches.

## Deployment Fields

- Main SHA: `548dfcc9665b8dc71e23b1097780b368bea235d4`.
- gh-pages SHA: `c0daded4341481bb5e4b80e4f4c1b159db8436e6`.
- Normal live URLs verified: yes.
- Cache-busted URLs verified: yes, using `?v=c0daded4341481bb5e4b80e4f4c1b159db8436e6`.
- New layout proven live: yes.

## Final Result

LIVE PASS.
