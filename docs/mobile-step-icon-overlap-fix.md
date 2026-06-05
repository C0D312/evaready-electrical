# Mobile Step Icon Overlap Fix

## Scope

Fixed only the mobile check icon overlap in the quote/booking process cards.

## Files Changed

- `components/quote-process-graphic.tsx`

## What Changed

- Moved the final check icon from absolute positioning into the normal flex row.
- Added `min-w-0 flex-1` to the step text so it can wrap naturally.
- Kept the icon `shrink-0` so it reserves its own space and cannot cover text.

## Pages Checked

- Homepage, where the shared quote process graphic is currently rendered.

## Mobile Widths Checked

- 360px
- 390px
- 412px
- 430px

## Validation

- `npm.cmd run audit:all-suburb-copy` passed: 873 checked, 0 warnings.
- `npm.cmd run audit:suburbs` passed: 873 suburb pages, 0 warnings.
- `npm.cmd run audit:metadata` passed: 995 rows, 0 warnings.
- `npm.cmd run audit:links` passed: 19,963 internal links checked, 0 broken.
- `npm.cmd run audit:visible-copy` passed: 995 pages, 0 warnings.
- `npm.cmd run lint` passed.
- `npm.cmd run build` passed: 1,002 static routes generated.
- Built output stale/risky string checks passed.
- Google Ads tag and phone/quote conversion attributes remained present.

## Result

The step 4 text, "We review and confirm the next step", remains readable on mobile and the check icon no longer overlaps the final word.

Measured mobile layout results:

- 360px: no icon/text overlap, no horizontal overflow.
- 390px: no icon/text overlap, no horizontal overflow.
- 412px: no icon/text overlap, no horizontal overflow.
- 430px: no icon/text overlap, no horizontal overflow.
