# Cross-Browser And Responsive-Device QA Report

Date/time: 2026-06-08T01:34:04+10:00  
Live URL tested: https://c0d312.github.io/evaready-electrical/  
Playwright version: 1.60.0  
Final result: PASS

## Scope

This was a QA-only Playwright pass against the live GitHub Pages site. No production app code, CSS, website copy, routes, metadata, schema, sitemap, Google Ads tracking, phone CTA, quote CTA, or deployment was changed.

## Test Assertion Fixes Applied

- Removed the visible `2026` footer copyright string from stale-string failure checks.
- Added a footer-year check that validates the footer against `new Date().getFullYear()`.
- Replaced the case-sensitive `Google Rating` visible-text check with `.google-rating-card` visibility plus stable card content checks.
- Google rating card checks now assert:
  - `5.0`
  - `Based on 83 Google reviews`
  - `Read Google Reviews`
  - `Leave a Review`
- Non-HTML routes such as `sitemap.xml`, `robots.txt`, and `site-version.json` now use non-HTML text fallback handling instead of assuming an HTML `<body>` exists in every browser.

## Browsers And Projects Tested

- desktop-chromium-1366, 1366x768
- desktop-chromium-1440, 1440x900
- desktop-chromium-1920, 1920x1080
- desktop-firefox-1440, 1440x900
- desktop-webkit-1440, 1440x900
- google-chrome-1440, 1440x900
- microsoft-edge-1440, 1440x900
- mobile-chrome-360, 360x800
- mobile-chrome-390, 390x844
- mobile-chrome-412, 412x915
- mobile-chrome-430, 430x932
- mobile-safari-390, 390x844
- mobile-safari-430, 430x932
- ipad-768, 768x1024
- ipad-pro-1024, 1024x1366

Unavailable projects: none.

## Routes Tested

- /
- /emergency-electrician-sydney/
- /level-2-electrician-sydney/
- /services/
- /services/consumer-mains-sydney/
- /services/defect-notice-repairs-sydney/
- /services/point-of-attachment-repairs-sydney/
- /services/switchboard-upgrades-sydney/
- /service-areas/
- /service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/
- /service-areas/sydney-city-and-eastern-suburbs/randwick/coogee/
- /service-areas/western-sydney-and-nepean/blacktown/blacktown/
- /privacy-policy/
- /terms/
- /sitemap.xml
- /robots.txt
- /site-version.json

## Test Totals

- Playwright project tests: 15
- Route checks attempted: 255
- Passed tests: 15
- Failed tests: 0
- Skipped tests: 0
- Unavailable projects: 0

## Screenshot Output

- Screenshots created: yes
- Screenshot count: 120
- Screenshot folder: `reports/cross-browser-screenshots/`
- Screenshot pages: homepage, emergency, Level 2, service areas, Panania suburb, Coogee suburb, privacy, terms
- Screenshot coverage: 8 key pages across 15 browser/device projects

## Validation Findings

- Footer-year test now passes.
- Google rating card checks now pass.
- Google Ads tag `AW-18165545331` remains present on tested HTML pages.
- Phone CTA `tel:+61461247247` remains present where expected.
- `data-conversion-action="phone-click"` remains present where expected.
- `data-conversion-action="quote-click"` remains present where expected.
- No critical console errors were reported.
- No failed same-site CSS, JavaScript, image, or font requests were reported.
- No horizontal overflow failures were reported.
- H1 checks passed on normal HTML pages.
- Privacy page contains `Who we are`.
- Terms page contains `Terms of Use`.
- `site-version.json` loaded and contains `Evaready Electrical`.

## Stale And Risky Wording

No failures were reported for:

- `Request a Booking or Quote`
- `sparking.For`
- `ASP Level 2 electrical work`
- `Area service coverage`
- `Level 1`
- `Level One`
- `Level 3`
- `Level Three`
- `ASP1`
- `ASP 1`
- `ASP3`
- `ASP 3`
- `guaranteed arrival`
- `60 minutes anywhere`
- `local depot in`
- `office in`
- `fake review`
- `fake rating`

## Real Production Issues Found

None from this automated QA run.

## Final Result

PASS. The corrected Playwright assertions passed across all tested desktop, mobile, tablet, Chrome, Firefox, WebKit/Safari-style, Google Chrome channel, and Microsoft Edge channel projects.
