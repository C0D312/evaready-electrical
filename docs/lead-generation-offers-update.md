# Lead Generation Offers Update

## Summary

Added a lightweight, reusable lead-generation offer panel across the main commercial page types. The panel keeps the existing Evaready visual direction and uses safe, customer-facing offer wording only.

## Offers Added

- Free photo review for planned electrical work
- Photos help us quote faster
- Send your defect notice for review
- Send switchboard, meter box or service equipment photos
- Call-first emergency triage
- Fast callback for urgent enquiries
- Clear next steps before work starts
- No-obligation quote for planned work

## Pages And Templates Updated

- Homepage
- Emergency electrician page
- Level 2 electrician page
- Services index
- Dynamic service page template
- Switchboard upgrades page
- Service areas index
- Suburb page template

The dynamic service template covers the Level 2 cluster pages including consumer mains, defect notices, private power poles, metering services and point of attachment repairs.

## Component Added

- `components/lead-offer-panel.tsx`

The component includes:

- Call Now CTA using the central phone constants
- Get a Quote CTA using the central booking URL
- `data-conversion-action="phone-click"`
- `data-conversion-action="quote-click"`
- `data-quote-trigger="true"`
- A short photo/document checklist
- Call-first emergency wording
- Sydney and surrounding regions wording

## Validation Results

- `npm.cmd run audit:all-suburb-copy`: passed, 873 suburb pages checked, 0 warnings
- `npm.cmd run audit:suburbs`: passed, 873 suburb pages, 0 warnings
- `npm.cmd run audit:metadata`: passed, 995 rows, 0 warnings
- `npm.cmd run audit:links`: passed, 19,963 internal links checked, 0 broken
- `npm.cmd run audit:visible-copy`: passed, 995 pages, 0 warnings
- `npm.cmd run lint`: passed
- `npm.cmd run build`: passed, 1,002 static pages generated

## Output Checks

- Offer wording found in generated output
- Google Ads tag `AW-18165545331` preserved
- Phone and quote conversion attributes preserved
- No risky wording found for guaranteed arrival, same-hour guarantees, 60 minutes anywhere, fake offices or Level 1/Level 3 services

## Status

PASS - ready for clean GitHub Pages deployment after base-path rebuild.
