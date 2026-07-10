# Suburb and Service-Area Dark-Blue Theme Update

## Scope

Updated the shared service-area templates so the service-area index, region pages, area pages and generated suburb pages use the Evaready dark-blue theme consistently.

## Source Changes

- Replaced remaining bright-blue service-area section panels with restrained midnight and panel-blue tones.
- Replaced service-area quote buttons that used older blue utility styling with the current electric-blue quote styling.
- Replaced service-area secondary/contact buttons with dark navy cards and cyan borders.
- Reworked suburb landing-card tone styles so emergency cards use controlled red accents on a dark navy base and general/Level 2 cards use blue/cyan dark-card treatment.
- Kept Call Now actions red and Get a Quote actions blue.
- Preserved routes, copy, metadata, schema, response-time mapping, CTAs, tracking and sticky mobile CTA behavior.

## Validation

Completed validation:

- `npm.cmd run audit:all-suburb-copy` - PASS, 873 suburb pages checked, 0 warnings.
- `npm.cmd run audit:suburbs` - PASS, 873 suburb pages, 0 warnings.
- `npm.cmd run audit:metadata` - PASS, 999 rows, 0 warnings.
- `npm.cmd run audit:links` - PASS, 0 broken links.
- `npm.cmd run audit:visible-copy` - PASS, 0 warnings.
- `npm.cmd run audit:page-health` - PASS, 0 critical warnings.
- `npm.cmd run audit:response-times` - PASS, 0 hard mismatches.
- `npm.cmd run lint` - PASS.
- `npm.cmd run build` - PASS, 1003 static pages generated.
- `npm.cmd run audit:visibility` - PASS, 1002 routes checked, 0 critical issues.

Post-build output checks:

- Service-area light wrapper check: 0 matches for `bg-white text-[#061E72]` or `bg-slate-50`.
- Risky wording check: 0 matches for the stale/risky phrases requested in the task.
- Google Ads marker `AW-18165545331`: present.
- Phone and quote conversion attributes: present.

Responsive QA:

- Checked 8 requested service-area/suburb routes across 9 viewport sizes from 320x568 to 1920x1080.
- Total viewport checks: 72.
- Horizontal overflow failures: 0.
- Missing CTA failures: 0.
- Sticky CTA/mobile-width failures: 0.

## Live Verification Targets

- `/service-areas/`
- `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/`
- `/service-areas/sydney-city-and-eastern-suburbs/randwick/coogee/`
- `/service-areas/western-sydney-and-nepean/blacktown/blacktown/`
- `/service-areas/macarthur-camden-and-wollondilly/camden/camden/`
- `/service-areas/wollongong-and-illawarra/wollongong/wollongong/`
- `/service-areas/blue-mountains/blue-mountains/katoomba/`
- `/service-areas/central-coast-south/central-coast/gosford/`

## Result

Local validation passed. Deployment and public live verification pending.
