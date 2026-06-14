# Hot Water Service Page Mobile QA

Date: 2026-06-15

## Scope

Page checked:

- `/services/hot-water-system-electrician-sydney/`

This pass checked the hot water service page mobile layout only. No deployment was performed.

## Widths Checked

- 360x800
- 390x844
- 412x915
- 430x932

## Mobile QA Result

PASS.

Focused Playwright QA against the fresh production `out/` build confirmed:

- Header/logo compact and visible.
- H1 visible quickly.
- Call Now visible in the first viewport.
- Get a Quote visible in the first viewport.
- Common-job cards fit cleanly.
- Warning/call-first content visible.
- Quote checklist visible and clean.
- FAQ content visible and clean.
- Google Rating/proof block visible and styled.
- No horizontal overflow.
- No clipped cards.
- Sticky CTA visible and not overlapping the footer.
- Footer readable above the sticky CTA.
- Tap targets are usable.

## Issues Found

No confirmed mobile layout bugs were found.

During the first harness pass, two non-site issues appeared:

- The logo check missed the existing Evaready logo because the selector looked for `logo` only. The harness was corrected to match `Evaready`/logo text and passed.
- Google Tag Manager was blocked by the local static test environment. Local CSS, JS and image assets had zero failures after filtering external network blocking.

## Issues Fixed

None required for this mobile QA pass.

## Files Changed

- `docs/hot-water-mobile-qa.md`

No CSS, route, SEO copy or component changes were required for this specific mobile QA pass.

## Desktop Affected

No.

## Validation

- `npm.cmd run audit:links`: PASS, 0 broken links, 19,989 internal links checked.
- `npm.cmd run audit:visible-copy`: PASS, 0 warnings, 995 pages checked.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS, 1002 static pages generated.

## Output Checks

- `AW-18165545331`: present in hot-water output.
- `data-conversion-action="phone-click"`: present in hot-water `index.html`.
- `data-conversion-action="quote-click"`: present in hot-water `index.html`.
- Stale/risky grep for `Request a Booking or Quote`, `sparking.For`, `ASP Level 2 electrical work`, `fake review`, `fake rating`, `guaranteed arrival`, `60 minutes anywhere`: PASS, no matches.

## Final Status

PASS.
