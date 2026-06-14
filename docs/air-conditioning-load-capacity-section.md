# Air Conditioning Load Capacity Section

## Scope

- Page: `/services/split-system-air-conditioning-sydney/`
- Source changed:
  - `data/service-pages.ts`
  - `app/services/[slug]/page.tsx`
- Routes changed: no
- Response-time mapping changed: no
- Deployment performed: no

## Section Added

Yes. Added an optional load/capacity lead-path section for the air-conditioning service page.

Heading:

`Before adding air conditioning, check the electrical supply`

Copy:

`New split systems, heat pumps and larger air-conditioning loads can require a dedicated circuit, isolator, RCBO/safety switch protection, switchboard capacity review or electrical load capacity check. If the supply, switchboard or consumer mains may be undersized, Evaready can review the electrical side before work proceeds.`

The wording avoids claiming that every property needs an upgrade and frames Level 2 only as a relevant pathway where supply-side review is needed.

## Links Added

Routes verified in sitemap/source before linking:

- `/services/electrical-load-capacity-checks-sydney/` -> `Electrical load capacity checks`
- `/services/switchboard-upgrades-sydney/` -> `Switchboard upgrades`
- `/services/consumer-mains-sydney/` -> `Consumer mains electrical work`
- `/level-2-electrician-sydney/` -> `Level 2 electrician Sydney`

## Validation Result

- `npm.cmd run audit:links`: PASS, 0 broken links across 997 generated HTML routes and 19,993 internal links.
- `npm.cmd run audit:visible-copy`: PASS, 0 warnings across 995 pages.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS, 1002 static pages generated.

Generated-output checks:

- Load/capacity heading and copy found in `out/services/split-system-air-conditioning-sydney/`.
- All four anchor labels found in generated output.
- `rg 'href="#"|javascript:|localhost' out/services/split-system-air-conditioning-sydney`: no matches.

## Final Status

PASS
