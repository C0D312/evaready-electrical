# Open Cabler Repetition Fix

## Result

PASS

## Cause Found

Suburb pages were showing Open Cabler proof in several nearby places:

- Suburb hero credential strip.
- Main trust graphics credential card.
- Suburb trust item strip.
- Trust/process proof copy.
- Generated CCTV/data service summary on some suburbs.
- Footer credential strip.

The all-suburb visible-copy audit had previously allowed four occurrences, so pages with repeated Open Cabler wording could still pass. The raw static export also duplicated exact React text strings inside generated hydration payloads.

## Fix Applied

Open Cabler proof remains visible, but the repeated exact phrase was removed from suburb-specific hero and copy patterns.

## Open Cabler Display Locations After Fix

- Main trust graphics card: `Open Cabler Registration` with `46691` in the card text.
- Footer credential strip: `Open Cabler Registration` with `46691` as the value.
- Service pages where relevant: wording now uses `Open Cabler registration number 46691`.
- Suburb CCTV/data summaries now refer to eligible registered cabling scope without repeating the registration number.

## Files Changed

- `components/service-credential-strip.tsx`
- `components/trust-graphics.tsx`
- `components/trust-process-proof.tsx`
- `data/service-area-coverage.ts`
- `data/service-pages.ts`
- `data/site.ts`
- `scripts/audit-all-suburb-visible-copy.ts`
- `reports/all-suburb-visible-copy-audit.csv`
- `reports/suburb-page-audit.csv`
- `reports/metadata-audit.csv`
- `reports/internal-link-audit.md`
- `reports/visible-copy-audit.csv`

## Warnings

- Warnings before: 565 suburb pages had Open Cabler repetition warnings in the stricter audit scenario.
- Warnings after: 0.
- Missing suburb HTML files: 0.
- Suburb pages checked: 873.

## Validation Results

- `npm.cmd run audit:all-suburb-copy`: PASS, 873 checked, 0 warnings.
- `npm.cmd run audit:suburbs`: PASS, 873 pages, 0 warnings.
- `npm.cmd run audit:metadata`: PASS, 995 rows, 0 warnings.
- `npm.cmd run audit:links`: PASS, 19,963 checked, 0 broken.
- `npm.cmd run audit:visible-copy`: PASS, 995 pages, 0 warnings.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS, 1,002 static routes generated.

## Export Greps

- `Open Cabler Registration 46691`: no matches.
- `Open Cabler Registration 46691.*Open Cabler Registration 46691`: no matches.
- Stale launch-blocker strings: no matches.
- Risky wording strings: no matches.
- `AW-18165545331`: present.
- `data-conversion-action="phone-click"` and `data-conversion-action="quote-click"`: present.

## SHA Notes

Main and gh-pages SHAs are reported in the final deployment response after commit and push.
