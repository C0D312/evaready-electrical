# Penrith All-In-One Suburb Upgrade

Date: 2026-06-08

## Scope

Updated the `Western Sydney & Nepean / Penrith` suburb page data only. No other regions or areas were intentionally changed.

All 31 requested Penrith area suburbs were checked and strengthened:

Berkshire Park, Caddens, Cambridge Gardens, Cambridge Park, Castlereagh, Claremont Meadows, Colyton, Cranebrook, Emu Heights, Emu Plains, Erskine Park, Glenmore Park, Jamisontown, Jordan Springs, Kingswood, Leonay, Llandilo, Londonderry, Mount Vernon, Mulgoa, North St Marys, Orchard Hills, Oxley Park, Penrith, Regentville, South Penrith, St Clair, St Marys, Werrington, Werrington County, Werrington Downs.

## Files Changed

- `data/service-area-coverage.ts`
- `reports/all-suburb-visible-copy-audit.csv`
- `reports/internal-link-audit.md`
- `reports/suburb-page-audit.csv`
- `reports/visible-copy-audit.csv`
- `docs/penrith-all-in-one-suburb-upgrade.md`

## Suburb Template Changes

The generated suburb template already supports all-in-one landing-page sections through local context data. This update added Penrith-only local context so each page can present:

- Emergency electrician in the suburb
- Level 2 electrician in the suburb
- General electrical work in the suburb
- Switchboards, fault finding, hot water electrical, air conditioning electrical, CCTV/data and planned quote work
- Local access, parking/loading, gate, strata, warehouse, rural-edge, commercial, industrial, acreage or new-estate context where relevant

The required support line is produced on each page:

`Emergency, Level 2 and general electrical work in [Suburb] [Postcode].`

The required three-card landing section is produced on each page:

- `Emergency electrician in [Suburb]`
- `Level 2 electrician in [Suburb]`
- `General electrical work in [Suburb]`

The quote guidance now includes switchboard, meter box, affected fitting, access, parking/loading, gate or strata/building-manager notes and defect notice paperwork where relevant.

## Response-Time Mapping

Penrith pages remain on the current greater-region response-time mapping.

- 90-minute emergency response wording preserved: yes
- Penrith-specific 60-minute response wording added: no
- Response-time classification changed: no

## Local Context Improvements By Suburb

- Berkshire Park: acreage/rural-edge homes, larger blocks, sheds, outdoor power, private service equipment, long driveways, storm faults and consumer mains.
- Caddens: newer homes, townhouses, apartments, aircon/EV load checks, switchboard capacity, consumer mains, metering and planned upgrades.
- Cambridge Gardens: family homes, mixed residential properties, hot water faults, safety switches, outdoor power and Level 2 support.
- Cambridge Park: homes, units, villas, rental maintenance, local shops, older boards, switchboards and hot water circuits.
- Castlereagh: rural/acreage homes, long driveways, sheds, private service equipment, outdoor power, storm faults and access notes.
- Claremont Meadows: homes, townhouses, family properties, aircon loads, switchboard capacity, hot water faults and planned maintenance.
- Colyton: older homes, rental maintenance, shops, safety switches, switchboard upgrades, lighting/power repairs and hot water circuits.
- Cranebrook: family homes, newer estates, acreage edges, outdoor power, storm faults, switchboards, consumer mains and access notes.
- Emu Heights: hillside/river-edge homes, outdoor power, access notes, private service equipment, switchboards and storm-related faults.
- Emu Plains: homes, shops, light industrial/commercial work, access notes, business outages, switchboards, consumer mains and metering.
- Erskine Park: warehouses, logistics sites, factories, workshops, commercial switchboards, load checks, business outages, lighting/power and CCTV/data.
- Glenmore Park: newer homes, larger family properties, local shops, aircon/EV load checks, switchboard capacity, hot water, outdoor power and consumer mains.
- Jamisontown: bulky goods, showrooms, industrial-commercial sites, shops, offices, homes, business outages, commercial switchboards, lighting/power, CCTV/data and Level 2 support.
- Jordan Springs: new estates, townhouses, family homes, aircon/EV loads, switchboard capacity, consumer mains, metering, new-build support and community access notes.
- Kingswood: apartments, station-area shops, medical and education precinct demand, strata access, shared meter rooms, older switchboards, hot water faults and Level 2 support.
- Leonay: river and hillside homes, outdoor circuits, access notes, switchboards, hot water, private service equipment and storm-related faults.
- Llandilo: acreage homes, rural-edge properties, long driveways, sheds, outdoor power, private service equipment, consumer mains and access/gate notes.
- Londonderry: acreage and rural properties, sheds, workshops, outdoor power, private service equipment, switchboards, storm faults and access notes.
- Mount Vernon: acreage homes, large blocks, long driveways, sheds and outbuildings, private service equipment, outdoor power, switchboards and consumer mains.
- Mulgoa: rural and village homes, acreage, outdoor lighting, private service equipment, storm faults, switchboards and planned quote guidance.
- North St Marys: homes, industrial pockets, workshops, older boards, business outages, switchboards, lighting/power, hot water and Level 2 support.
- Orchard Hills: rural-growth corridor, broad blocks, new estates, long driveways, private service equipment, aircon and EV loads, consumer mains and metering.
- Oxley Park: older homes, units, station-area shops, rental maintenance, switchboards, safety switches, hot water, lighting/power and Level 2 support.
- Penrith: CBD/local business properties, apartments, offices, restaurants, retail, station-area properties, warehouses, business outages, shared meter rooms, switchboards, consumer mains, metering and defect notices.
- Regentville: homes, larger blocks, river-edge/outdoor power context, switchboards, private service equipment, hot water circuits, consumer mains and access notes.
- South Penrith: family homes, local shops, older switchboards, hot water faults, safety switches, outdoor power, switchboard upgrades and planned maintenance.
- St Clair: family homes, local shops, older boards, safety-switch faults, hot water, outdoor power, smoke alarms, switchboards and consumer mains.
- St Marys: station-area shops, apartments, warehouses, workshops, industrial/commercial sites, business outages, commercial switchboards, load checks, consumer mains and defect notices.
- Werrington: station-area homes, townhouses, apartments and units, older boards, switchboards, hot water, safety switches, access notes and Level 2 support.
- Werrington County: family homes, residential maintenance, older switchboards, outdoor power, hot water, safety switches, aircon circuits and quote guidance.
- Werrington Downs: family homes, larger residential blocks, switchboards, hot water, outdoor lighting and power, consumer mains and access notes.

## Generated Output Checks

Penrith area generated-output verification:

- Penrith area page count: 31
- Missing requested pages: 0
- Extra Penrith area pages: 0
- Sample phrase checks passed for Penrith, St Marys, Erskine Park and Glenmore Park.
- Every checked Penrith page contains `90-minute response`.
- No Penrith area page contains `60-minute response for urgent call-outs`.
- Google Ads tag preserved: yes
- Phone conversion marker preserved: yes
- Quote conversion marker preserved: yes

Risk-string checks passed with no generated-output matches for:

- `Level 1`
- `Level 3`
- `guaranteed arrival`
- `60 minutes anywhere`
- `office in`
- `local depot in`
- `fake review`
- `fake rating`
- duplicate/chopped suburb wording patterns checked in the prompt

## Validation Results

- `npm.cmd run audit:all-suburb-copy`: PASS, 873 suburb pages checked, 0 warnings
- `npm.cmd run audit:suburbs`: PASS, 873 pages checked, 0 warnings
- `npm.cmd run audit:metadata`: PASS, 995 rows checked, 0 warnings
- `npm.cmd run audit:links`: PASS, 19,964 internal links checked, 0 broken links
- `npm.cmd run audit:visible-copy`: PASS, 995 pages checked, 0 warnings
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS, 1,002 static pages generated

## Final Status

Final result: PASS

