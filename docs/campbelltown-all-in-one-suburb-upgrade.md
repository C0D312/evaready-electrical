# Campbelltown All-In-One Suburb Upgrade

## Scope

Area upgraded: Macarthur, Camden & Wollondilly / Campbelltown.

This pass strengthened generated suburb pages only through the shared suburb data/template system. No generated HTML was manually edited.

## Suburbs Checked

All 36 Campbelltown area suburb pages were checked:

Airds, Ambarvale, Bardia, Blair Athol, Blairmount, Bow Bowing, Bradbury, Campbelltown, Claymore, Denham Court, Eagle Vale, Englorie Park, Eschol Park, Gilead, Glen Alpine, Glenfield, Holsworthy, Ingleburn, Kearns, Kentlyn, Leumeah, Long Point, Macquarie Fields, Macquarie Links, Menangle Park, Minto, Minto Heights, Raby, Rosemeadow, Ruse, St Andrews, St Helens Park, Varroville, Wedderburn, Woodbine, Woronora Dam.

## Pages Changed

The Campbelltown pages now use suburb-specific local context in `data/service-area-coverage.ts` for:

- Emergency electrician lead intent.
- Level 2 electrician lead intent.
- General licensed electrical work lead intent.
- Switchboards, fault finding, hot water electrical, air-conditioning electrical, CCTV/data and planned quote work.
- Commercial, industrial, strata, residential, growth-corridor, acreage and rural-edge wording where relevant.

The existing suburb template already renders:

- "Emergency, Level 2 and general electrical work in [Suburb] [Postcode]."
- 3-card suburb support section.
- Call-first vs quote-form guidance.
- Level 2 quote/photo checklist.
- Google Rating card.
- Phone and quote CTAs with conversion attributes.

## Local Context Improvements By Suburb

- Airds: redevelopment, older switchboards, rentals, safety switches, hot water and call-first guidance.
- Ambarvale: family homes, older boards, townhouses, local shops, power loss, hot water and outdoor power.
- Bardia: new homes, townhouses, duplexes, builders, aircon/EV loads, switchboard capacity, consumer mains and metering.
- Blair Athol: homes, villas, older wiring, switchboards, lighting/power and hot water circuits.
- Blairmount: homes, rental maintenance, switchboard upgrades, safety-switch faults, hot water and smoke alarms.
- Bow Bowing: family homes, older boards, lighting, power points, hot water, aircon circuits and fault finding.
- Bradbury: older homes, units, local shops, switchboards, safety switches, hot water and property-manager maintenance.
- Campbelltown: CBD and local business work, apartments, shops, offices, medical/retail suites, shared access, outages, switchboards, consumer mains, metering and defect notices.
- Claymore: homes, newer housing, switchboards, lighting/power, hot water, safety switches and smoke alarms.
- Denham Court: new homes, larger homes, duplexes, aircon/EV load checks, switchboard capacity, consumer mains, metering and builder/new-build issues.
- Eagle Vale: family homes, local shops, older switchboards, safety switches, hot water and aircon circuits.
- Englorie Park: residential homes, older switchboards, hot water, power/lighting, safety-switch faults and quote-photo guidance.
- Eschol Park: family homes, older boards, outdoor power, hot water, aircon circuits, switchboard upgrades and Level 2 support.
- Gilead: rural-edge/growth corridor properties, sheds, outdoor power, private service equipment, long access and consumer mains.
- Glen Alpine: premium homes, renovations, outdoor lighting, switchboards, aircon loads, consumer mains and access notes.
- Glenfield: station/residential/commercial mix, apartments, townhouses, shops, strata access, switchboards, hot water, outages and Level 2 enquiries.
- Holsworthy: homes, access notes, switchboards, outdoor power, hot water, safety switches and planned maintenance.
- Ingleburn: industrial estates, warehouses, workshops, factories, business outages, commercial switchboards, three-phase/load checks, CCTV/data and emergency make-safe.
- Kearns: homes, older switchboards, safety-switch tripping, hot water, lighting/power and quote-photo guidance.
- Kentlyn: bushland/rural-edge homes, long driveways, outdoor power, private service equipment, switchboards and storm-related faults.
- Leumeah: homes, units, local shops, access notes, switchboards, hot water, lighting/power, safety switches and commercial faults.
- Long Point: rural/residential properties, outdoor power, private service equipment, storm faults and access notes.
- Macquarie Fields: apartments, homes, shops, station-area access, strata/rental maintenance, switchboards, hot water, power loss and Level 2 support.
- Macquarie Links: premium homes, gated/access notes, outdoor lighting, switchboards, aircon circuits, consumer mains and quote-photo guidance.
- Menangle Park: new estates, acreage edges, builders, switchboard capacity, aircon/EV loads, consumer mains, metering and access notes.
- Minto: warehouses, workshops, factories, shops, homes, business outages, commercial switchboards, three-phase/load checks and CCTV/data.
- Minto Heights: residential/rural-edge properties, outdoor power, switchboards, private service equipment and access notes.
- Raby: family homes, older switchboards, safety switches, hot water, aircon circuits, outdoor lighting and planned maintenance.
- Rosemeadow: homes, townhouses, local shops, rental maintenance, switchboards, hot water, power loss, safety-switch faults and quote guidance.
- Ruse: family homes, older boards, lighting/power, hot water circuits, safety switches, outdoor power and emergency fault wording.
- St Andrews: homes, villas, older switchboards, hot water, power points, lighting, safety switches and general maintenance.
- St Helens Park: family homes, larger residential lots, outdoor power, switchboards, aircon circuits, hot water and Level 2 support.
- Varroville: acreage/rural-edge homes, long driveways, sheds/outbuildings, outdoor power, private service equipment, consumer mains and access notes.
- Wedderburn: bushland/acreage access, outdoor power, storm faults, private service equipment, switchboards, long driveways and safety triage.
- Woodbine: family homes, older switchboards, hot water, safety switches, lighting/power, smoke alarms and quote-photo guidance.
- Woronora Dam: remote/bushland access, outdoor power, private service equipment, switchboards and careful attendance wording.

## Owner Review

Woronora Dam appears under the generated Campbelltown area. It was not removed or reclassified in this pass. Owner review is recommended to confirm the coverage bucket.

## Response-Time Mapping

Campbelltown area pages remain greater-region pages.

- 90-minute emergency response: preserved across the Campbelltown area.
- 60-minute Campbelltown-specific wording: not added.
- Local generated check: all 36 Campbelltown suburb pages include 90-minute response wording and none include 60-minute wording.

## Validation Results

- `npm.cmd run audit:all-suburb-copy`: PASS, 873 checked, 0 warnings, 0 missing HTML files.
- `npm.cmd run audit:suburbs`: PASS, 873 pages, 0 warnings.
- `npm.cmd run audit:metadata`: PASS, 995 rows, 0 warnings.
- `npm.cmd run audit:links`: PASS, 19,963 checked, 0 broken links.
- `npm.cmd run audit:visible-copy`: PASS, 995 pages, 0 warnings.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS, 1,002 static routes generated.

## Generated Output Checks

- Campbelltown sample phrase checks: PASS for Campbelltown, Ingleburn, Minto and Macquarie Fields.
- Campbelltown scoped `60-minute` check: no matches.
- Campbelltown scoped `90-minute response` check: matches found.
- Campbelltown scoped duplicate/chopped/postcode-only check: no matches.
- Stale-string check: no matches.
- Risky wording check: no matches.
- Google Ads tag `AW-18165545331`: present.
- `data-conversion-action="phone-click"`: present.
- `data-conversion-action="quote-click"`: present.

The broad artifact grep across all `out/` matched Kyle Bay only because the over-broad `ng circuits` pattern catches the valid phrase `lighting circuits`. The Campbelltown scoped artifact check is clean.

## Final Result

PASS
