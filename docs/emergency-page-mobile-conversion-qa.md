# Emergency Page Mobile Conversion QA

Date: 2026-06-14

## Scope

Checked the emergency electrician page mobile layout only:

- `/emergency-electrician-sydney/`
- Generated output: `out/emergency-electrician-sydney/index.html`

No route changes, suburb page changes, response-time mapping changes, SEO rewrite or deployment were performed.

## Widths Checked

- 360x800
- 390x844
- 412x915
- 430x932

## Issues Found

- Footer utility links on mobile had enough readable text, but the clickable height was too small for comfortable mobile tapping.

No issues found for:

- H1 visibility
- Call Now visibility above the fold
- Get a Quote visibility above the fold
- horizontal overflow
- clipped cards
- clipped trust badges
- floating or unstyled Google rating/review text
- marquee clipping
- sticky CTA overlap
- emergency issue cards
- FAQ cards
- footer visibility at page bottom

## Issues Fixed

- Updated shared `.footer-link` styling in `app/globals.css` to make footer links meet mobile tap-target sizing with `min-height`, inline-flex alignment and small horizontal padding.

This is a shared footer/mobile CSS fix, not an emergency-page-only hack.

## Files Changed

- `app/globals.css`
- `docs/emergency-page-mobile-conversion-qa.md`

## Desktop Affected

No material desktop layout impact expected. The change only makes footer links slightly more tap-friendly while preserving the existing footer layout and link styling.

## Mobile QA Result

Post-fix generated-output checks showed:

- H1 visible above the fold: yes
- Call Now visible above the fold: yes
- Get a Quote visible above the fold: yes
- No horizontal overflow: yes
- Marquee visible and unclipped: yes
- Emergency issue content present: yes
- FAQ content present: yes
- Google rating/review proof rendered: yes
- Clipped important cards: 0
- Small visible tap targets: 0
- Sticky CTA present: yes
- Sticky CTA overlapping footer/content: no
- Footer visible at bottom: yes

## Validation

- `npm.cmd run audit:links`: PASS, 0 broken links
- `npm.cmd run audit:visible-copy`: PASS, 0 warnings across 995 pages
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS, 1002 static pages generated

Generated output checks:

- `AW-18165545331`: present
- `phone-click`: present
- `quote-click`: present
- `sparking.For`, `Request a Booking or Quote`, `fake review`, `fake rating`, `guaranteed arrival`, `60 minutes anywhere`: no matches

## Final Status

PASS
