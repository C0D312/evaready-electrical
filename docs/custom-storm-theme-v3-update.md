# Custom Storm Theme V3 Update

## Summary

Implemented a stronger Evaready electric storm theme so the site no longer reads as old navy cards with a faint image behind them. The update applies a visible blue/red storm system through the page shell, section surfaces, panels, cards, borders and glow treatments while preserving copy, routes, schema, tracking, CTAs, the mobile sticky CTA and the untinted van image.

## Assets

- `public/images/evaready-storm-theme-desktop-v3.webp`
  - Source: owner-supplied electric storm image.
  - Dimensions: 1920 x 1280.
  - File size: 119,506 bytes.
- `public/images/evaready-storm-theme-mobile-v3.webp`
  - Source: owner-supplied electric storm image, art-directed for narrow screens.
  - Dimensions: 900 x 1600.
  - File size: 30,562 bytes.

## Theme System

Updated `app/globals.css` with a consolidated v3 storm layer:

- Storm tokens for black, midnight, dark blue, translucent panel blues, cyan, electric blue, red, silver and muted text.
- `.ev-storm-page` page shell with visible fixed storm imagery and blue/red edge energy.
- `.ev-storm-section` section treatment with darker centre readability, electric borders and soft glow.
- `.ev-storm-panel` and `.ev-storm-card` treatments for translucent navy surfaces, cyan borders and subtle storm depth.
- Emergency variants using red accent glow while keeping card bodies dark navy.
- Legal-page handling that keeps the theme subtle and readable.
- Quote modal/form exceptions so the external form remains usable.

## Files Changed

- `app/layout.tsx`
  - Switched storm background variables to the v3 desktop/mobile assets.
- `app/globals.css`
  - Added the v3 storm visual system and overrides for old light/flat card styling.
- `components/site-frame.tsx`
  - Preserved the electric header picture setup with desktop/tablet/mobile header assets.
- `public/images/evaready-storm-theme-desktop-v3.webp`
- `public/images/evaready-storm-theme-mobile-v3.webp`
- `reports/custom-storm-theme-v3-qa/`

## Old Theme Residue

The generated HTML still contains some historic Tailwind class strings such as `bg-white` because several shared components are still authored with those class names. The v3 CSS layer overrides the visual result on commercial pages, and screenshots/QA confirm the visible output is dark storm-themed. Intentional exceptions remain for:

- The external quote form/modal content where light form controls are required for usability.
- Privacy and Terms pages, where the storm theme is intentionally quieter for readability.

## QA

Screenshots saved in:

- `reports/custom-storm-theme-v3-qa/`

Key screenshots include:

- `home-390x844.png`
- `home-1440x900.png`
- `emergency-390x844.png`
- `emergency-1440x900.png`
- `services-390x844.png`
- `services-1440x900.png`
- `service-areas-390x844.png`
- `panania-390x844.png`
- `contact-390x844.png`
- `privacy-390x844.png`

Automated layout/theme check:

- `reports/custom-storm-theme-v3-qa/storm-theme-v3-layout-check.json`
- Checked 14 pages across 10 viewport sizes.
- Result: 140 checks, 0 failures.

Confirmed:

- Storm theme is visible on homepage, service pages and suburb pages.
- Cards and panels are themed with translucent navy, cyan borders and glow.
- Legal pages remain readable.
- Mobile sticky CTA remains present.
- Mobile header remains logo/banner plus hamburger only.
- Desktop header/nav/CTAs are preserved.
- Van remains untinted.
- No horizontal overflow was detected in the layout QA.

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
- `npm.cmd run build`
- `npm.cmd run audit:live-links-and-ctas`

Notes:

- `npm.cmd run audit:visibility` was started and progressed through multiple viewport sweeps, but exceeded the local 900 second command timeout before returning a final summary. The separate v3 Playwright layout/theme check completed successfully with 0 failures.

## Post-Build Checks

Confirmed:

- `out/images/evaready-storm-theme-desktop-v3.webp` exists.
- `out/images/evaready-storm-theme-mobile-v3.webp` exists.
- Built output references the v3 storm assets and storm classes.
- Google Ads marker `AW-18165545331` remains.
- Phone and quote conversion attributes remain.
- `tel:+61461247247` remains.
- Risky/stale strings checked for this task did not produce public matches.

## Live Verification

Pending deployment at the time this report was created.
