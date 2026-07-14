# New Header V5 Clean Rebuild

## Summary

The active Evaready header was rebuilt from the latest uploaded header image only:

`C:/Users/Admin/AppData/Local/Temp/codex-clipboard-4a148638-d36a-4ea0-9534-91427a346dc3.png`

The previous active composed header classes and old generated banner references were removed from the active source and built output. The final header uses the `ev-final-header` class family and v5 WebP assets.

## Assets

| Asset | Dimensions | File size |
| --- | ---: | ---: |
| `public/images/header/evaready-header-desktop-v5.webp` | 2048 x 682 | 90,602 bytes |
| `public/images/header/evaready-header-tablet-v5.webp` | 1600 x 533 | 64,092 bytes |
| `public/images/header/evaready-header-mobile-v5.webp` | 1500 x 426 | 50,896 bytes |

The mobile asset keeps the complete uploaded artwork and adds a dark right-side safe zone so the hamburger does not cover the Evaready wordmark or the red `24/7`.

## Header Structure

Desktop order:

1. New v5 header image
2. Scrolling service strip
3. Desktop navigation row with Call Now and Get a Quote
4. Page content

Mobile order:

1. New v5 header image with hamburger on the right
2. Scrolling service strip
3. Page content
4. Sticky bottom Call Now / Get a Quote CTA

Mobile top Call Now and Get a Quote remain hidden.

## CSS Cleanup

The active header implementation now uses:

- `.ev-final-header`
- `.ev-final-header-art`
- `.ev-final-header-brand`
- `.ev-final-header-image`
- `.ev-final-mobile-menu`
- `.ev-final-desktop-nav`

The built output has zero matches for the old active header checks:

- `evaready-electric-header-banner-v1`
- `evaready-electric-header-banner-v2`
- `evaready-electric-header-banner-v3`
- `evaready-header-desktop-v2`
- `evaready-header-mobile-v2`
- `ev-clean-header`
- `ev-header-art-strip`

## QA

Screenshots and measurements:

`reports/new-header-v5-clean-rebuild-qa/`

Included viewports:

- 320 x 568
- 360 x 800
- 390 x 844
- 430 x 932
- 1366 x 768
- 1920 x 1080

Checked pages:

- `/`
- `/services/`
- `/emergency-electrician-sydney/`
- `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/`

Automated screenshot measurements found zero failures for horizontal overflow, mobile menu visibility, hidden mobile top CTAs, desktop nav visibility, and sticky CTA presence.

## Validation

Passed:

- `npm.cmd run audit:all-suburb-copy`
- `npm.cmd run audit:suburbs`
- `npm.cmd run audit:metadata`
- `npm.cmd run audit:links`
- `npm.cmd run audit:visible-copy`
- `npm.cmd run audit:page-health`
- `npm.cmd run audit:response-times`
- `npm.cmd run lint`
- `npm.cmd run audit:live-links-and-ctas`
- `npm.cmd run build`

Visibility audit generated `reports/page-visibility-audit.csv` with 7,014 rows, 0 failure rows, and 0 horizontal-overflow rows before the command timeout.

## Live Verification

Live verification is completed as part of the deployment step for this update and reported in the final task response.
