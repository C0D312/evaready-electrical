# Level 2 Cluster Dominance Update

Date: 2026-07-10

## Scope

Strengthened internal routing between the Level 2 hub and existing supply-side service pages without changing routes, accreditation wording, response-time mapping or service claims.

## Pages strengthened

- `/level-2-electrician-sydney/`
- `/services/consumer-mains-sydney/`
- `/services/defect-notice-repairs-sydney/`
- `/services/point-of-attachment-repairs-sydney/`
- `/services/private-power-pole-sydney/`
- `/services/overhead-service-lines-sydney/`
- `/services/underground-service-mains-sydney/`
- `/services/metering-services-sydney/`
- `/services/disconnect-reconnect-electrician-sydney/`
- `/services/smart-meter-electrician-sydney/`
- `/services/electrical-load-capacity-checks-sydney/`
- `/services/three-phase-power-sydney/`
- `/services/switchboard-upgrades-sydney/`

## Changes made

- Added a shared Level 2 service-pathway cluster to relevant generated service pages.
- Added the same Level 2 service-pathway cluster to the dedicated switchboard upgrades page, which uses its own static template.
- Added contextual links back to the Level 2 hub from each relevant service page.
- Added compact next-step guidance for defect notice photos, meter box photos, point-of-attachment/service photos and call-first unsafe faults.
- Added smart meter electrical support to the Level 2 hub service-card set.
- Preserved `Ausgrid & Endeavour Energy Accredited Level 2 ASP` wording.
- Preserved existing service routes, sitemap routing, phone tracking and quote tracking.

## Safety controls

- No Level 1 or Level 3 claims added.
- No fake ASP number added.
- No guaranteed approval or guaranteed attendance wording added.
- No office, depot or local premises wording added.
- No offers, reviews or photos added.

## Validation

Local validation completed before deployment:

- `npm.cmd run audit:metadata` passed with 0 warnings.
- `npm.cmd run audit:links` passed with 0 broken links.
- `npm.cmd run audit:visible-copy` passed with 0 visible-copy warnings.
- `npm.cmd run audit:page-health` passed with 0 critical warnings.
- `npm.cmd run audit:response-times` passed with 0 hard mismatches.
- `npm.cmd run lint` passed.
- Production build completed for `/evaready-electrical`.
- Post-build Level 2 cluster term checks found the expected Level 2 service terms.
- Risky wording checks for Level 1, Level 3, fake reviews, fake ratings, offices, depots and guaranteed approval/arrival returned no public HTML matches.
