# Mobile-First Layout Fix

> Current status (2026-08-08): This is a historical change record. `components/google-review-proof.tsx` and its dedicated selector family were later retired in commit `aec94c7`; current rating layout uses `GoogleRatingSeal`.

## Files Changed

- `app/globals.css`
- `components/google-rating-card.tsx`
- `components/google-review-proof.tsx`

## Exact CSS / Classes Changed

- Added a final mobile-first CSS override layer in `app/globals.css`.
- Added class hooks:
  - `.google-review-proof`
  - `.google-review-proof__container`
  - `.google-review-proof__panel`
  - `.google-review-proof__copy`
  - `.google-review-proof__note`
  - `.google-review-proof__cards`
  - `.google-rating-card`
- Mobile header/layout classes adjusted:
  - `.site-header`
  - `.site-header-top`
  - `.site-logo-link`
  - `.site-logo-image`
  - `.mobile-nav-trigger`
- Mobile route strip:
  - `.emergency-issue-marquee` is hidden under 768px to stop clipping under the fixed header.
- Hero image/layout:
  - `.home-brand-hero`
  - `.brand-internal-hero`
  - `.brand-hero-image`
  - `.home-hero-readability-overlay`
- Hero trust/credential cards:
  - `.hero-credential-badges`
  - `.home-hero-trust-card`
  - `.service-credential-strip`
- Lead UI:
  - `.mobile-sticky-cta`
  - `.mobile-sticky-cta__link`
  - `.quote-process-graphic`

## Mobile Issues Fixed

- Reduced mobile header height while keeping the logo clear and the burger button tappable.
- Removed mobile marquee clipping by hiding the moving strip under 768px.
- Moved the van/hero image higher and brightened it on mobile.
- Replaced heavy full-image tint with a stronger left-side readability gradient and lighter tint over the van side.
- Made homepage trust badges fit within the mobile viewport.
- Made service credential strips stack or use a clean two-column grid where width allows.
- Reduced mobile sticky CTA height and added bottom padding so it does not cover footer/content.
- Added mobile styling hooks for the Google review/rating section so it renders as a compact card, not floating raw text.
- Tightened quote process cards on mobile so they keep clean gutters.
- Added overflow guards to prevent sideways scrolling.

## Mobile Widths Targeted

- 360px
- 390px
- 412px
- 430px

## Pages Targeted By Shared Fix

- Homepage
- Emergency page
- Level 2 page
- Service areas page
- Region pages
- Area pages
- Suburb pages
- Service pages using the shared brand hero
- Fault pages using the shared brand hero
- Privacy policy and terms page header/footer spacing

## Validation Results

- `npm.cmd run audit:all-suburb-copy`: passed, 873 checked, 0 warnings
- `npm.cmd run audit:suburbs`: passed, 873 rows, 0 warnings
- `npm.cmd run audit:metadata`: passed, 995 rows, 0 warnings
- `npm.cmd run audit:links`: passed, 19,963 links checked, 0 broken
- `npm.cmd run audit:visible-copy`: passed, 995 pages, 0 warnings
- `npm.cmd run lint`: passed
- `npm.cmd run build`: passed, 1,000 static routes generated

## Generated Output Checks

- Stale wording grep: no matches
- Risky wording grep: no matches
- Google Ads tag `AW-18165545331`: present
- Phone conversion action text `phone-click`: present
- Quote conversion action text `quote-click`: present
- Mobile CSS changes present in generated CSS chunk

## Visual Check Note

The local Chrome headless screenshot command did not write screenshot files in this environment, even with isolated profiles and background services disabled. The fix was therefore applied through shared CSS using the measurements from `docs/mobile-layout-diagnosis.md` and validated through build output, CSS generation and full site audits. Manual phone review is still recommended after deployment.

## Remaining Mobile Issues

- No critical automated issues remain.
- Manual visual confirmation on real iPhone/Samsung devices is recommended because automated screenshots were unavailable in this shell environment.

## Final Status

PASS
