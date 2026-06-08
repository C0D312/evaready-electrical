# Cumberland All-In-One Suburb Upgrade

## Scope

- Region: Parramatta & Cumberland
- Area: Cumberland
- Pages strengthened: 19 suburb pages
- URL structure changed: No
- Response-time mapping changed: No
- Google Ads tracking changed: No
- Generated HTML manually edited: No

## Suburbs Checked

Auburn, Berala, Girraween, Greystanes, Guildford, Guildford West, Holroyd, Lidcombe, Merrylands, Merrylands West, Pemulwuy, Pendle Hill, Regents Park, Rookwood, South Granville, South Wentworthville, Wentworthville, Westmead, Woodpark.

## Files Changed

- `data/service-area-coverage.ts`
- `reports/all-suburb-visible-copy-audit.csv`
- `reports/internal-link-audit.md`
- `reports/suburb-page-audit.csv`
- `reports/visible-copy-audit.csv`
- `docs/cumberland-all-in-one-suburb-upgrade.md`

## Suburb Template Changes

The Cumberland suburb pages now receive Cumberland-only local context through the service-area coverage generator. Each Cumberland suburb page keeps the existing all-in-one landing page structure and now has stronger local detail for:

- emergency electrician in the suburb
- Level 2 electrician in the suburb
- general electrical work in the suburb
- switchboards
- fault finding
- hot water electrical
- air conditioning electrical
- CCTV/data
- strata, apartment, shopfront, industrial, warehouse, commercial and residential work where relevant
- planned quote work

The near-top support line is present through the existing suburb landing page renderer:

`Emergency, Level 2 and general electrical work in [Suburb] [Postcode].`

The 3-card local service summary is present through the existing suburb landing page renderer:

- Emergency electrician in [Suburb]
- Level 2 electrician in [Suburb]
- General electrical work in [Suburb]

## Local Context Improvements By Suburb

- Auburn: apartments, shopfronts, restaurants, warehouses, workshops, station-area access, business outages, commercial switchboards, three-phase/load checks, CCTV/data and Level 2 support.
- Berala: older homes, units, villas, station-area properties, safety-switch faults, hot water circuits, switchboards and outdoor power.
- Girraween: industrial/commercial pockets, warehouses, workshops, homes, duplexes, business outages, lighting/power faults, load checks and Level 2 service-equipment support.
- Greystanes: family homes, larger blocks, duplexes, renovations, outdoor power, switchboards, consumer mains, defect notices and driveway/access notes.
- Guildford: apartments, older homes, shopfronts, strata access, station-area parking, shared meter rooms, safety-switch tripping and hot water faults.
- Guildford West: homes, duplexes, villas, rental maintenance, local shops, older switchboards, hot water circuits and planned quote guidance.
- Holroyd: apartments, strata buildings, local businesses, shared meter rooms, building-manager access, limited parking, hot water faults and switchboards.
- Lidcombe: apartments, station-area shops, warehouses, industrial/commercial sites, offices, strata, business outages, commercial switchboards, three-phase/load checks and CCTV/data.
- Merrylands: apartments, shops, restaurants, offices, strata, shared meter rooms, business outages, older wiring, switchboards, consumer mains, metering and defect notices.
- Merrylands West: homes, villas, duplexes, rental maintenance, older boards, outdoor power, hot water circuits, safety switches and Level 2 support.
- Pemulwuy: newer homes, townhouses, apartments, local shops, aircon/EV load checks, switchboard capacity, hot water circuits and consumer mains.
- Pendle Hill: station-area apartments, older homes, villas, local shops, strata access, switchboards, hot water and safety-switch faults.
- Regents Park: homes, workshops, warehouses, rail/industrial-access context, commercial switchboards, business outages, lighting/power faults and load checks.
- Rookwood: facility and grounds-style electrical work where appropriate, outdoor lighting, switchboards, access notes, safety-first call triage and planned maintenance.
- South Granville: homes, units, small factories, warehouses, local shops, business outages, commercial switchboards, hot water and Level 2 consumer mains support.
- South Wentworthville: homes, units, villas, older switchboards, rental maintenance, hot water faults, safety-switch tripping and access notes.
- Wentworthville: apartments, station-area shops, offices, local businesses, strata, shared meter rooms, business outages, switchboards, consumer mains and metering.
- Westmead: apartments, strata, medical/office suites, health precinct demand, shared meter rooms, business-critical faults, switchboards, hot water, consumer mains and access/parking notes.
- Woodpark: workshops, warehouses, small businesses, business outages, commercial switchboards, lighting/power, load checks, CCTV/data and loading/access notes.

## Granville Cross-Link Status

Granville remains generated under:

`/service-areas/parramatta-and-cumberland/parramatta/granville/`

It was not moved, duplicated or added under the Cumberland URL path. No Cumberland-area cross-link change was made in this pass because the requested scope was Cumberland suburb pages only and existing URL structure needed to stay unchanged.

## Validation Results

- `npm.cmd run audit:all-suburb-copy`: PASS, 873 suburb pages checked, 0 missing HTML files, 0 warnings
- `npm.cmd run audit:suburbs`: PASS, 873 suburb pages checked, 0 warnings
- `npm.cmd run audit:metadata`: PASS, 995 metadata rows checked, 0 warnings
- `npm.cmd run audit:links`: PASS, 19,964 internal links checked, 0 broken links
- `npm.cmd run audit:visible-copy`: PASS, 995 pages checked, 0 warnings
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS, 1,002 static pages generated

## Generated Output Checks

- Cumberland generated suburb page count: 19, excluding the Next export helper directory
- Merrylands, Westmead, Auburn and Lidcombe contain the expected emergency, Level 2 and general electrical work phrases
- No `90-minute` wording found under `out/service-areas/parramatta-and-cumberland/cumberland`
- No Level 1 or Level 3 wording found in generated output
- No guaranteed arrival, 60 minutes anywhere, office/depot, fake review or fake rating wording found in generated output
- Google Ads tag `AW-18165545331` remains present
- `data-conversion-action="phone-click"` remains present
- `data-conversion-action="quote-click"` remains present
- Granville exists under the Parramatta area export and does not exist under the Cumberland area export

The broad chopped-fragment grep pattern includes fragments such as `g circuits` and `uits`, which match legitimate words like `hot water circuits`. The stricter generated-output scan and the suburb visible-copy audit found no duplicate suburb names, no postcode-only headings and no chopped phrase artifacts.

## Final Status

PASS
