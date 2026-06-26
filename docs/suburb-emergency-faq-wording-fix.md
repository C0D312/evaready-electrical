# Suburb Emergency FAQ Wording Fix

## Summary

- Updated generated suburb emergency FAQ wording to use: "power loss, burning smells, sparking, circuit tripping or storm damage".
- Replaced old response-time wording with natural core and greater-region wording from the verified response-time helper.
- Kept the practical timing limitation beside the emergency FAQ answer.
- Kept visible FAQ answers and FAQPage schema sourced from the same generated copy.
- Updated the all-suburb visible-copy audit to flag the old awkward wording.

## Response-Time Wording

- Core service areas: "Emergency call-outs in this core service area can be on site within 60 minutes."
- Greater regions: "Emergency call-outs across this greater region can be on site within 90 minutes."
- Limitation retained: "Timing depends on location, access, traffic, safety conditions, job type and current availability."

## Files Updated

- `data/service-area-coverage.ts`
- `components/trust-graphics.tsx`
- `scripts/audit-all-suburb-visible-copy.ts`

## Validation

- `npm.cmd run audit:suburbs`: PASS, 873 suburb pages, 0 warnings
- `npm.cmd run audit:metadata`: PASS, 999 rows, 0 warnings
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS, 1003 static pages
- `npm.cmd run audit:all-suburb-copy`: PASS, 873 suburb pages, 0 warnings
- `npm.cmd run audit:links`: PASS, 0 broken links
- `npm.cmd run audit:visible-copy`: PASS, 0 warnings
- `npm.cmd run audit:response-times`: PASS, 0 hard mismatches

## Generated Output Checks

- Old awkward suburb wording: no matches
- New symptom wording: present
- New 60/90 response wording: present
- Risky wording: no matches
- Google Ads and phone/quote tracking: present

## Deployment

- Main SHA: pending
- gh-pages SHA: pending
- Live verification: pending

## Final Result

PENDING DEPLOYMENT
