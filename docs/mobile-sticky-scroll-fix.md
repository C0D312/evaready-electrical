# Mobile Sticky Scroll Fix

## Issue

The route/service scrolling strip was not reliably sticky on mobile. It was rendered after a fixed-header spacer and depended on `position: sticky`, which could scroll with the page or sit at the wrong offset on smaller mobile widths.

## Fix

- Moved the route strip into the fixed header stack before the spacer.
- Replaced the Tailwind spacer height with a shared `.site-header-spacer`.
- Added shared CSS variables for header height and strip height.
- Calibrated the sticky offset for the measured header heights: compact phones, standard phones and tablet/desktop.
- Changed `.emergency-issue-marquee` to `position: fixed` so it remains pinned below the header on mobile, tablet and desktop.
- Kept the scrolling speed at the existing readable pace: `52s`.

## Files Changed

- `components/site-frame.tsx`
- `app/globals.css`

## QA

- Production build passed.
- `npm.cmd run lint` passed.
- `npm.cmd run audit:links` passed with 0 broken links.
- `npm.cmd run audit:visible-copy` passed with 0 warnings.
- `npm.cmd run audit:all-suburb-copy` passed.
- `npm.cmd run audit:suburbs` passed.
- `npm.cmd run audit:metadata` passed.
- `npm.cmd run audit:page-health` passed.
- `npm.cmd run audit:response-times` passed.
- `npm.cmd run audit:live-links-and-ctas` passed with 0 broken links and 0 CTA failures.
- `npm.cmd run audit:visibility` was attempted twice and timed out because it was still processing 1002 routes across viewport passes.

## Targeted Sticky QA

Playwright checked the production `out/` build across:

- Viewports: `320x568`, `360x800`, `390x844`, `430x932`, `820x1180`, `1366x768`
- Routes: `/`, `/services/`, `/service-areas/`, `/solar-batteries/`, `/emergency-electrician-sydney/`
- Scroll positions: top, mid-page and lower page

Result:

- 30 combinations checked
- 0 sticky strip failures
- 0 horizontal overflow failures
- Strip position stayed `fixed`
- Strip top stayed aligned with the header stack while scrolling

## Tracking / Safety Checks

- `AW-18165545331` present.
- `tel:+61461247247` present.
- Phone and quote conversion attributes preserved.
- Stale/risky wording greps returned no public matches.

## Result

PASS after source validation, deployment checks and public live verification.
