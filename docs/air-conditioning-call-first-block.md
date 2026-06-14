# Air Conditioning Call-First Block

Date: 2026-06-15

Page updated: `/services/split-system-air-conditioning-sydney/`

Deployment: not deployed.

## Section Added

Added a service-specific call-first block to the air-conditioning service page:

`Call first if the aircon electrical fault feels unsafe`

The section covers:

- The AC circuit or safety switch keeps tripping
- Burning smell near the switchboard, isolator or outdoor unit
- Heat, buzzing or sparking near the isolator
- Outdoor unit power or isolator looks damaged
- Water has reached electrical equipment
- Power loss, electric shock risk or exposed wiring
- Switchboard capacity or protection looks overloaded

Safety copy added:

`Do not keep resetting breakers or touching damaged fittings. Call first so the electrical fault can be triaged safely.`

## CTA Preserved

- `Call Now 0461 247 247` remains present.
- `Get a Quote` remains present.
- `tel:+61461247247` remains present.
- `data-conversion-action="phone-click"` remains present.
- `data-conversion-action="quote-click"` remains present.
- `AW-18165545331` remains present.

## Claims Avoided

- No route changes.
- No response-time mapping changes.
- No guarantee wording added.
- No fake review or fake rating wording added.
- Quote CTA preserved.
- Google Ads and conversion attributes preserved.

## Validation Result

Commands run:

- `npm.cmd run audit:links` - passed, 0 broken links, 19,989 internal links checked.
- `npm.cmd run audit:visible-copy` - passed, 0 rows with warnings across 995 pages.
- `npm.cmd run lint` - passed.
- `npm.cmd run build` - passed.

Generated output checks:

- The aircon call-first heading and listed electrical hazard wording appeared in `out/services/split-system-air-conditioning-sydney`.
- `tel:+61461247247`, `data-conversion-action="phone-click"` and `data-conversion-action="quote-click"` remained present in generated output.
- The risky wording grep for `guaranteed arrival`, `60 minutes anywhere`, `fake review` and `fake rating` returned no matches.

## Final Status

PASS
