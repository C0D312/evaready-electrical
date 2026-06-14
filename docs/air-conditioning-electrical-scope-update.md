# Air Conditioning Electrical Scope Update

Date: 2026-06-15

Page updated: `/services/split-system-air-conditioning-sydney/`

Source audit used: `docs/air-conditioning-service-page-audit.md`

Deployment: not deployed.

## Files Changed

- `data/service-pages.ts`
- `docs/air-conditioning-electrical-scope-update.md`

## Wording Added

The air-conditioning service intro now clearly states that Evaready helps with the electrical side of split-system air conditioning:

- dedicated circuits
- AC isolators
- outdoor unit power
- safety switch protection
- switchboard capacity checks
- heat-pump electrical supply where relevant

It also now includes boundary wording that air-conditioning installation or refrigeration work is handled by appropriately licensed technicians, and that jobs involving electrical supply, tripping, burning smell, heat, buzzing, sparking, unsafe wiring, isolators, switchboard capacity or power to the unit should be handled by calling first or sending photos for review.

## Claims Avoided

- No route changes.
- No new services added.
- No response-time mapping changes.
- No Google Ads or conversion tracking changes.
- No fake warranty claims.
- No manufacturer or all-brand claims.
- No fake office or depot wording.
- No guaranteed arrival wording.
- No broad claim that Evaready performs unlicensed refrigeration, plumbing or gas work.
- No Level 1 or Level 3 wording added.

## Validation Result

Commands run:

- `npm.cmd run audit:metadata` - passed, 0 warnings.
- `npm.cmd run audit:links` - passed, 0 broken links, 19,989 internal links checked.
- `npm.cmd run audit:visible-copy` - passed, 0 rows with warnings across 995 pages.
- `npm.cmd run lint` - passed.
- `npm.cmd run build` - passed.

Generated output checks:

- Scope wording appeared in `out/services/split-system-air-conditioning-sydney`.
- Licensed technician / refrigeration boundary wording appeared in `out/services/split-system-air-conditioning-sydney`.
- `AW-18165545331` remained present.
- `data-conversion-action="phone-click"` remained present.
- `data-conversion-action="quote-click"` remained present.
- Risky wording grep returned no matches for `guaranteed arrival`, `60 minutes anywhere`, `office in`, `local depot in`, `fake review`, `fake rating`, `Level 1`, `Level 3` or `guaranteed cooling`.

## Final Status

PASS
