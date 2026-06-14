# Hot Water Electrical Scope Update

Date: 2026-06-15

## Files Changed

- `data/service-pages.ts`
- `docs/hot-water-electrical-scope-update.md`

Validation also regenerated `reports/internal-link-audit.md` with a new timestamp.

## Wording Added

The hot water service page intro now states that Evaready handles the electrical side of electric hot water systems, including:

- circuit
- isolator
- switchboard protection
- wiring
- thermostat/element electrical checks
- heat-pump electrical supply where relevant

Boundary wording was added to clarify that plumbing work, water leaks, tank replacement, valves, gas hot water and gas fitting work may require a licensed plumber or gas fitter.

Urgent electrical symptoms are routed to phone-first language:

- power issues
- tripping
- burning smell
- heat
- buzzing
- sparking
- unsafe electrical equipment

The FAQ answer for no hot water was also tightened so it lists the electrical checks Evaready can perform without implying plumbing or gas-fitting work.

## Claims Avoided

- No plumbing or gas-fitting service claim was added.
- No fake office or depot wording was added.
- No guaranteed arrival wording was added.
- No 60-minute-anywhere wording was added.
- No Level 1 or Level 3 wording was added.
- No Google Ads or conversion tracking was removed.
- No response-time mapping was changed.
- No route structure was changed.

## Validation Result

- `npm.cmd run audit:metadata`: PASS, 995 rows, 0 warnings.
- `npm.cmd run audit:links`: PASS, 19,989 internal links checked, 0 broken links.
- `npm.cmd run audit:visible-copy`: PASS, 995 pages, 0 warnings.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS, 1,002 static pages generated.

Post-build checks:

- Electrical-scope wording found in `out/services/hot-water-system-electrician-sydney`.
- Plumbing/gas-fitter boundary wording found in `out/services/hot-water-system-electrician-sydney`.
- Google Ads tag `AW-18165545331` remained present.
- Phone and quote conversion attributes remained present.
- Risky-claim grep across `out` returned no matches.

## Final Status

PASS
