# Rebuilt Electric Header Composed System

## Root Cause

The previous electric header treated a combined storm/logo banner as the responsive logo. That forced the same image through mobile and desktop constraints, which caused cropped/zoomed desktop artwork and allowed the mobile hamburger to sit over the Evaready wordmark.

Older CSS also hid `.site-header-actions` and child links below 1180/1280px. The new desktop header row needed scoped overrides so laptop widths can still show the nav and CTA links while mobile keeps logo plus hamburger only.

## New Header Structure

- `components/site-frame.tsx` now renders a composed header:
  - `.ev-header-art-strip` for the full-width storm strip.
  - `.ev-header-logo-wrap` with the real transparent Evaready logo.
  - `.ev-mobile-menu-zone` for the hamburger safe zone.
  - `.ev-desktop-nav-bar` below the strip for desktop nav and CTAs.
- The old cropped banner-as-logo implementation is no longer used by the header.
- The real logo asset used by the header is `public/images/evareadyelectrical-logo-perf-1000.webp`.
- The storm strip background uses the existing storm theme image variables.

## Mobile Behaviour

- Header shows the storm strip, full Evaready logo, and hamburger only.
- The hamburger sits in a reserved right-side safe zone and does not cover the wordmark.
- Top mobile Call Now and Get a Quote are hidden.
- Sticky bottom Call Now and Get a Quote remains unchanged.

## Desktop Behaviour

- Header shows a full-width storm strip with the logo centred and fully visible.
- Desktop navigation sits directly below the strip.
- Desktop Call Now and Get a Quote remain in the nav row.
- Scoped overrides keep the desktop nav and CTAs visible at laptop widths such as 1024px.

## Old Constraints Removed Or Bypassed

- Header no longer depends on the cropped `evaready-electric-header-*-v2.webp` banner assets for logo display.
- Old max-width logo rules are bypassed by the new `.ev-header-*` classes.
- The hamburger is absolutely positioned in its own zone rather than reducing logo width through normal flex layout.
- Legacy mobile/tablet CTA hiding rules are overridden only for the new desktop nav row from 1024px upward.

## Screenshots

Screenshots and automated measurements are saved in:

`reports/rebuilt-electric-header-composed-system/`

Included spot checks:

- `home-390x844.png`
- `home-1366x768.png`
- `panania-390x844.png`

## Validation Result

- Header QA: 7 pages x 13 viewports = 91 checks, 0 failures.
- `audit:suburbs`: 873 suburb pages, 0 warnings.
- `audit:metadata`: 999 rows, 0 warnings.
- `audit:all-suburb-copy`: 873 suburb pages checked, 0 warnings.
- `audit:links`: 20,093 internal links checked, 0 broken links.
- `audit:visible-copy`: 999 pages, 0 warnings.
- `audit:page-health`: 999 routes, 0 critical warnings.
- `audit:response-times`: 873 suburbs, 0 hard mismatches.
- `audit:live-links-and-ctas`: 1002 HTML routes, 0 broken links, 0 CTA failures.
- `audit:visibility`: 1002 routes x 7 viewports = 7014 rows, 0 critical issues.
- `lint`: passed.
- `build`: passed.

## Live Result

Public live verification is completed after the source commit, rebuild and `gh-pages` deployment because the deploy commit SHA does not exist until publication.
