# Services Index Choose-By-Problem Selector

Date: 2026-06-14

Scope: `/services/` only. No new pages, removed pages, route changes, metadata changes, schema changes, service/suburb copy changes or deployment changes were made.

## Problem Cards Added

Added a compact `What do you need help with?` section near the top of the services index, after the trust symbol band and before the review/quote proof sections.

Problem cards:

- No power or partial power loss
- Burning smell or hot fitting
- Safety switch keeps tripping
- Old switchboard or ceramic fuses
- Defect notice
- Consumer mains or supply upgrade
- Damaged point of attachment
- Hot water not working
- Aircon circuit or isolator
- CCTV/data cabling
- Shop, office or strata work
- Planned renovation/new circuit

The section uses compact cards and contextual service links rather than duplicating the full services catalogue.

## Routes Linked

All linked routes already existed and were verified in `out/sitemap.xml` before final validation:

- `/emergency-electrician-sydney`
- `/services/electrical-fault-finding-sydney`
- `/services/safety-switch-rcd-installation-sydney`
- `/services/switchboard-upgrades-sydney`
- `/services/defect-notice-repairs-sydney`
- `/services/consumer-mains-sydney`
- `/services/point-of-attachment-repairs-sydney`
- `/services/hot-water-system-electrician-sydney`
- `/services/split-system-air-conditioning-sydney`
- `/services/cctv-security-camera-installation-sydney`
- `/services/data-cabling-electrician-sydney`
- `/services/commercial-electrician-sydney`
- `/services/residential-electrician-sydney`
- `/services/new-build-renovation-electrician-sydney`

## Validation Result

Commands run:

- `npm.cmd run audit:links`
- `npm.cmd run audit:visible-copy`
- `npm.cmd run lint`
- `npm.cmd run build`

Results:

- Broken links: 0
- Generated HTML issues: 0
- Generated HTML routes checked: 997
- Internal links checked: 19,989
- Visible-copy warning rows: 0
- Visible-copy pages checked: 995
- Lint: passed
- Build: passed
- Static pages generated: 1,002

Generated-output checks:

- Problem selector wording found in `out/services`
- Specific selector cards found in `out/services/index.html`
- `href="#"`, `javascript:` and `localhost` grep against `out/services`: no matches

## Final Status

PASS
