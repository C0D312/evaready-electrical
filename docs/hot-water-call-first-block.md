# Hot Water Call-First Block

Date: 2026-06-15

## Section Added

Added a compact call-first section to the hot water service page through the shared service template and hot water service data.

Heading:

"Call first if the hot water fault feels unsafe"

Items:

- No hot water and the hot water circuit has tripped
- Burning smell near the switchboard, isolator or hot water unit
- Heat, buzzing or sparking near the isolator
- Safety switch keeps tripping when the hot water circuit is reset
- Water has reached electrical equipment
- Power loss, electric shock risk or exposed wiring

Safety copy:

"Do not keep resetting breakers or touching damaged fittings. Call first so the fault can be triaged safely."

## CTA Preserved

- Primary CTA: `Call Now 0461 247 247`
- Secondary CTA: `Get a Quote`
- `tel:+61461247247` preserved.
- `data-conversion-action="phone-click"` preserved.
- `data-conversion-action="quote-click"` preserved.
- `AW-18165545331` preserved.

## Files Changed

- `app/services/[slug]/page.tsx`
- `data/service-pages.ts`
- `docs/hot-water-call-first-block.md`

Validation also regenerated audit report files:

- `reports/internal-link-audit.md`
- `reports/visible-copy-audit.csv`

## Validation Result

- `npm.cmd run audit:links`: PASS, 19,989 internal links checked, 0 broken links.
- `npm.cmd run audit:visible-copy`: PASS, 995 pages checked, 0 warnings.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS, 1,002 static pages generated.

Post-build checks:

- Call-first block wording found in `out/services/hot-water-system-electrician-sydney`.
- Phone and quote tracking found in `out/services/hot-water-system-electrician-sydney`.
- Risky wording grep across `out` found no `guaranteed arrival`, `60 minutes anywhere`, `fake review` or `fake rating`.

## Final Status

PASS
