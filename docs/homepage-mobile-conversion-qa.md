# Homepage Mobile Conversion QA

Date: 2026-06-14

## Scope

Homepage mobile lead-generation layout only. No route changes, no suburb-page changes, no SEO copy rewrite and no deployment.

## Widths Checked

- 360x800
- 390x844
- 412x915
- 430x932

Checks were run with Playwright against the rebuilt static output using a local static server that served the `out/` folder.

## Issues Found

- The mobile sticky CTA was visible while the homepage hero Call Now button was also visible, causing the sticky bar to sit over the hero call/quote area on first view.
- The sticky CTA buttons measured slightly under the 40px tap target threshold because a later mobile CSS override reduced the button height to `2.45rem`.

No issues found for:
- horizontal page overflow
- hidden H1
- hero/van missing from mobile
- clipped trust cards
- clipped service cards
- floating unstyled Google review text
- clipped quote-process cards

## Issues Fixed

- Added homepage-hero visibility detection to the shared mobile sticky CTA. On the homepage, the sticky CTA now hides while the hero is in view so the primary hero Call Now button remains unobstructed.
- Increased the final mobile sticky CTA link height to `2.75rem`, restoring a true 44px mobile tap target.

Scroll-state QA at 390x844 confirmed:
- At top of homepage: sticky CTA hidden while hero is visible.
- After hero: sticky CTA visible.
- At footer: sticky CTA hidden again.

## Files Changed

- `components/mobile-sticky-cta.tsx`
- `app/globals.css`

## Desktop Affected

No. The sticky CTA remains hidden at desktop widths, and the new homepage-hero visibility class only changes the mobile sticky CTA state.

## Validation

- `npm.cmd run audit:links`: PASS, 0 broken links, 19,970 internal links checked
- `npm.cmd run audit:visible-copy`: PASS, 0 warnings across 995 pages
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS

Post-build checks:
- `AW-18165545331`: present in `out/index.html`
- `data-conversion-action="phone-click"`: present in `out/index.html`
- `data-conversion-action="quote-click"`: present in `out/index.html`
- `sparking.For|Request a Booking or Quote|fake review|fake rating|guaranteed arrival|60 minutes anywhere`: no matches in `out/`

## Final Status

PASS
