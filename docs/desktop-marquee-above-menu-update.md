# Desktop Marquee Above Menu Update

## What Changed

- Moved the existing `RouteMarqueeStrip` into `SiteHeader` so it renders between the electric header art strip and the desktop navigation row.
- Removed the duplicate-like layout pattern where the marquee was outside the fixed header and pinned below the full header stack.
- Updated the shared header height CSS so the fixed-header spacer equals the full header stack:
  - electric header/banner
  - scrolling service/highlight strip
  - desktop nav row on desktop

## Old Desktop Order

1. Electric Evaready header/banner
2. Desktop menu/navigation row
3. Scrolling service/highlight strip
4. Page content / hero

## New Desktop Order

1. Electric Evaready header/banner
2. Scrolling service/highlight strip
3. Desktop menu/navigation row with Call Now and Get a Quote
4. Page content / hero

## Mobile Behaviour

Mobile keeps the clean conversion layout:

1. Electric Evaready header/banner with hamburger on the right
2. Scrolling service/highlight strip
3. Page content / hero
4. Sticky bottom Call Now / Get a Quote CTA on phone-width mobile

No top mobile Call Now or Get a Quote button was added.

## Files Changed

- `components/site-frame.tsx`
- `app/globals.css`

## Spacer / Header Height Notes

The shared `--site-header-height` variable now includes the route strip height. The `.site-header-spacer` uses that full value directly, so content starts below the fixed header without a second fixed marquee offset.

## Screenshots

Saved in:

- `reports/desktop-marquee-above-menu-qa/`

Included:

- `homepage-desktop-1366x768.png`
- `homepage-desktop-1920x1080.png`
- `homepage-mobile-390x844.png`
- `services-desktop-1366x768.png`
- `emergency-desktop-1366x768.png`
- `panania-mobile-390x844.png`

## Validation

- `npm.cmd run audit:suburbs`: PASS, 873 suburb pages, 0 warnings.
- `npm.cmd run audit:metadata`: PASS, 0 warnings.
- `npm.cmd run audit:links`: PASS, 0 broken links, 1001 generated HTML routes checked.
- `npm.cmd run audit:all-suburb-copy`: PASS, 873 checked, 0 warnings.
- `npm.cmd run audit:visible-copy`: PASS, 0 warnings.
- `npm.cmd run audit:page-health`: PASS, 0 critical warnings.
- `npm.cmd run audit:response-times`: PASS, 0 hard mismatches.
- `npm.cmd run audit:live-links-and-ctas`: PASS, 0 broken links, 0 CTA failures.
- `npm.cmd run audit:visibility`: PASS, 1002 routes, 7014 viewport rows, 0 critical issues.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS.

Post-build stale/risky wording grep returned no matches. Google Ads, phone-click, quote-click and `tel:+61461247247` markers remain present.

## Browser QA

Local Playwright QA checked 135 route/viewport combinations across homepage, core pages and Panania. Results:

- Desktop scroll strip above menu: PASS.
- Desktop menu below scroll strip: PASS.
- Mobile header preserved: PASS.
- Mobile top Call hidden: PASS.
- Mobile top Quote hidden: PASS.
- Header spacer / overlap: PASS.
- Horizontal overflow: 0 failures.

## Live Verification

- `main`: `fc5370e825b112839f1fdefdbe709743922c92ec`
- `gh-pages`: `f47b0d9fa724234cd27e2d2b03957b0083f5ddcd`
- Normal URLs verified with HTTP 200 and CSS loaded:
  - `https://c0d312.github.io/evaready-electrical/`
  - `https://c0d312.github.io/evaready-electrical/services/`
  - `https://c0d312.github.io/evaready-electrical/emergency-electrician-sydney/`
  - `https://c0d312.github.io/evaready-electrical/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/`
  - `https://c0d312.github.io/evaready-electrical/site-version.json`
- Cache-busted URLs verified with `?v=f47b0d9fa724`.
- Live DOM order verified: electric header/banner, scrolling strip, desktop menu row, page content.
- Live mobile rendering verified: header/banner and hamburger, scrolling strip, no top Call Now or Get a Quote, sticky bottom CTA preserved.
- Live tracking markers verified: Google Ads, phone-click, quote-click and `tel:+61461247247`.
