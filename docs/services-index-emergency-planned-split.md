# Services Index Emergency Vs Planned Work Split

Date: 2026-06-14

Scope: `/services/` only. No redesign, route changes, new service pages, service/suburb copy changes, response-time mapping changes, Google Ads changes or conversion tracking changes were made.

## Files Changed

- `app/services/page.tsx`
- `docs/services-index-emergency-planned-split.md`

## Copy Changed

No visible wording was changed because the services index already contained the requested H1, intro, emergency fault copy and planned work copy:

- `Electrical Services Sydney & Surrounding Regions`
- `Electrical services for urgent faults, Level 2 work, switchboards, hot water, air conditioning, CCTV/data, lighting, power, homes, strata, shops and commercial sites across Sydney and surrounding regions.`
- `Call now for no power, burning smells, sparking, repeated safety-switch tripping, switchboard faults, storm damage or unsafe electrical equipment.`
- `Choose the closest service below and send photos, job notes and access details for review.`

## CTA Hierarchy Result

The hero CTA block was moved directly below the emergency/planned split and above the credential/proof strips.

This keeps:

- Primary CTA: `Call Now 0461 247 247`
- Secondary CTA: `Get a Quote`
- `tel:+61461247247`
- `data-conversion-action="phone-click"`
- `data-conversion-action="quote-click"`
- ServiceM8 quote URL

This makes the emergency call path faster without changing the page design system or URL structure.

## Validation Result

Commands run:

- `npm.cmd run audit:metadata`
- `npm.cmd run audit:links`
- `npm.cmd run audit:visible-copy`
- `npm.cmd run lint`
- `npm.cmd run build`

Results:

- Metadata warnings: 0
- Broken links: 0
- Generated HTML issues: 0
- Generated HTML routes checked: 997
- Internal links checked: 19,975
- Visible-copy warning rows: 0
- Visible-copy pages checked: 995
- Lint: passed
- Build: passed
- Static pages generated: 1,002

Generated output checks:

- Required services-index wording: found in `out/services/index.html`
- Phone and quote conversion markers: found in `out/services/index.html`
- Risky wording grep against generated HTML: no matches

Risky wording checked:

- `guaranteed arrival`
- `60 minutes anywhere`
- `office in`
- `local depot in`
- `fake review`
- `fake rating`
- `Level 1`
- `Level 3`

## Final Status

PASS
