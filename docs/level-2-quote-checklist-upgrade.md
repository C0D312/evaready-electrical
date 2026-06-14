# Level 2 Quote Checklist Upgrade

Date: 2026-06-14

## Scope

- Updated the Level 2 Electrician Sydney page quote checklist only.
- No route changes were made.
- No response-time mapping changes were made.
- No fake ASP number, network approval promise, fake review, fake rating or guarantee wording was added.
- Deployment was not performed.

## Checklist Added / Updated

The planned Level 2 enquiry section now uses the heading:

`What to send for a Level 2 enquiry`

The checklist now asks customers to send:

- Photos of the switchboard
- Photos of the meter box
- Photos of the point of attachment
- Photos of overhead service lines or underground service location if relevant
- Any defect notice or supply authority paperwork
- Metering or retailer paperwork if relevant
- Suburb, address and access notes
- Deadline shown on the notice if any
- Whether the issue is urgent or planned
- Any renovation, EV charger, air conditioning or upgrade plans

## Safety Note

Added:

`If the issue involves heat, smoke, sparking, exposed service wiring, storm damage or damaged service equipment, call first instead of waiting for a quote response.`

## CTA Preservation

- `Get a Quote` remains available in the Level 2 checklist section.
- `Call Now 0461 247 247` remains available.
- ServiceM8 quote URL is preserved.
- `data-conversion-action="quote-click"` is preserved.
- `data-conversion-action="phone-click"` is preserved.
- Google Ads tag `AW-18165545331` remains present in the built output.

## Validation

- `npm.cmd run audit:links`: PASS
  - Broken links: 0
  - Generated HTML routes checked: 997
  - Internal links checked: 19975
  - Known routes: 998
- `npm.cmd run audit:visible-copy`: PASS
  - Pages checked: 995
  - Rows with warnings: 0
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS
  - Static pages generated: 1002
  - Suburb paths generated: 873

## Generated Output Checks

- Checklist wording appears in `out/level-2-electrician-sydney`.
- `Get a Quote`, `Call Now`, `data-conversion-action="quote-click"` and `data-conversion-action="phone-click"` appear in `out/level-2-electrician-sydney`.
- No matches found for `guaranteed approval`, `guaranteed arrival`, `fake review` or `fake rating` in `out/level-2-electrician-sydney`.

## Final Status

PASS
