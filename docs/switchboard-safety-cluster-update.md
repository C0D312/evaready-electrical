# Switchboard And Safety Cluster Update

## Scope

Added a shared `Switchboard, safety and protection` internal-link block for the switchboard and safety service cluster.

## Pages Targeted

- `/services/switchboard-upgrades-sydney/`
- `/services/safety-switch-rcd-installation-sydney/`
- `/services/rcd-safety-switch-repairs-sydney/`
- `/services/circuit-breaker-electrician-sydney/`
- `/services/surge-protection-electrician-sydney/`
- `/services/electrical-safety-inspection-sydney/`
- `/services/electrical-testing-tagging-reports-sydney/`
- `/services/testing-and-tagging-sydney/`
- `/services/pre-purchase-rental-electrical-inspections-sydney/`
- `/services/electrical-load-capacity-checks-sydney/`
- `/services/three-phase-power-sydney/`
- `/services/consumer-mains-sydney/`

## Implementation

- Added shared cluster links in `data/internal-links.ts`.
- Added a shared customer-routing block to the generated service page template.
- Added the same routing block to the dedicated switchboard upgrades page.
- Added a switchboard quote checklist covering switchboard photos, meter box photos, issue description, tripping pattern and defect notices.
- Added call-first warning text for heat, smoke, burning smells, sparking, exposed wiring and water damage.

## Safety Controls

- No fake warranties were added.
- No compliance guarantee wording was added.
- No inspection certificate claims were added.
- No routes, response-time mapping or Level 2 ASP wording were changed.
- No office, depot, map, review, offer or photo claims were added.

## Validation

- `npm.cmd run audit:metadata` passed with 0 warnings.
- `npm.cmd run audit:links` passed after build with 0 broken links.
- `npm.cmd run audit:visible-copy` passed after build with 0 visible-copy warnings.
- `npm.cmd run audit:page-health` passed after build with 0 critical warnings.
- `npm.cmd run audit:response-times` passed with 0 hard mismatches across 873 suburbs.
- `npm.cmd run lint` passed.
- `npm.cmd run build` passed with the GitHub Pages base path.
- Generated output confirmed the new cluster on all 12 target service pages.
- Generated output had no matches for fake compliance, fake safety, fake review, office or depot wording.

Live deployment proof is recorded in the final task response.
