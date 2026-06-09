# Suburb Page Link and Mobile QA Repair

Date: 2026-06-09

## Issue

The shared suburb page template had a three-card call/quote checklist section that could render with poor contrast and checklist rows that looked actionable without being links. The "Electrical services available in [Suburb]" cards were also visual cards only, which made them feel like dead links on suburb pages such as Panania 2213.

## Fixes Made

- Rebuilt the shared suburb action-card section in `app/service-areas/[region]/[area]/[suburb]/page.tsx` with high-contrast mobile-first cards.
- Added real action links:
  - Call-first card links to `tel:+61461247247` with `data-conversion-action="phone-click"`.
  - Quote card links to the central ServiceM8 quote form with `data-conversion-action="quote-click"`.
  - Level 2 checklist card links to `/level-2-electrician-sydney` and the quote form.
- Converted all eight service summary cards on every suburb page into internal links to the matching service route.
- Preserved all URL structure, Google Ads tracking, quote tracking and phone tracking.
- Cleaned visible generated copy by replacing encoded dash artifacts in air-conditioning / ARCtick wording.
- Changed the unsafe-fault wording from "water-affected electrical equipment" to clearer "water-damaged electrical equipment" in the visible action-card copy.

## Guardrails Added

- `scripts/audit-all-routes-visibility.ts` now fails any suburb page missing the repaired action links or the eight linked service summary cards.
- `tests/e2e/full-site-visibility.spec.ts` now checks those suburb action links and linked service cards during the all-route browser sweep.

## Validation Results

- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS, 1002 static pages generated, including 873 suburb pages
- `npm.cmd run audit:all-suburb-copy`: PASS, 873 checked, 0 warnings
- `npm.cmd run audit:suburbs`: PASS, 873 checked, 0 warnings
- `npm.cmd run audit:metadata`: PASS, 0 warnings
- `npm.cmd run audit:links`: PASS, 19,964 internal links checked, 0 broken links
- `npm.cmd run audit:visible-copy`: PASS, 995 pages checked, 0 warnings
- `npm.cmd run audit:page-health`: PASS, 0 critical warnings
- `npm.cmd run audit:response-times`: PASS, 0 hard mismatches
- `npm.cmd run audit:all-routes-visibility`: PASS, 998 routes checked, 873 suburb pages checked, 0 critical warnings
- Generated HTML forbidden-string grep: PASS
- `npm.cmd run test:e2e -- tests/e2e/full-site-visibility.spec.ts --project=mobile-chrome-390`: PASS, every generated HTML route checked at 390px; required mobile and desktop screenshots captured; Panania checked at 360, 390, 412 and 430 widths

## Notes

- The broader Playwright command also ran a live-site smoke test and that live-only test was blocked by sandbox network access before deployment. Local full-site Playwright QA passed.
- Panania 2213 is readable, mobile-safe and has working action links in the generated output.

Final pre-deploy status: PASS
