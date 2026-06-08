# Shellharbour All-In-One Suburb Upgrade

Date: 2026-06-09

Final status: PASS

## Scope

Area upgraded only:

- Wollongong & Illawarra / Shellharbour

Suburb pages checked and strengthened:

- Albion Park 2527
- Albion Park Rail 2527
- Barrack Heights 2528
- Barrack Point 2528
- Blackbutt 2529
- Calderwood 2527
- Dunmore 2529
- Flinders 2529
- Lake Illawarra 2528
- Mount Warrigal 2528
- North Macquarie 2527
- Oak Flats 2529
- Shell Cove 2529
- Shellharbour 2529
- Shellharbour City Centre 2529
- Tullimbar 2527
- Warilla 2528

No other region or area copy logic was intentionally changed.

## Pages Changed

- `data/service-area-coverage.ts`
- `reports/all-suburb-visible-copy-audit.csv`
- `reports/internal-link-audit.md`
- `reports/suburb-page-audit.csv`
- `reports/visible-copy-audit.csv`
- `docs/shellharbour-all-in-one-suburb-upgrade.md`

The generated HTML in `out/` was rebuilt from source only.

## Upgrade Summary

Each Shellharbour suburb page now works as a stronger all-in-one local landing page for:

- emergency electrician work
- Level 2 electrician enquiries
- general licensed electrical work
- switchboards
- fault finding
- hot water electrical
- air conditioning electrical
- CCTV/data
- coastal, lake-side, residential, strata/unit, commercial, retail, warehouse, growth-estate and access-sensitive work where relevant
- planned quote work

Each page includes the near-top support line:

`Emergency, Level 2 and general electrical work in [Suburb] [Postcode].`

Each page includes the strengthened 3-card section:

- `Emergency electrician in [Suburb]`
- `Level 2 electrician in [Suburb]`
- `General electrical work in [Suburb]`

Quote guidance added:

`Send photos of the switchboard, meter box, affected fitting, access notes, parking/loading details, gate details and any defect notice or paperwork.`

## Response-Time Mapping

Preserved.

The Shellharbour area remains on greater-region wording:

- `90-minute response`

The upgrade did not add a local `60-minute response for urgent call-outs` claim.

## Local Context Improvements

Albion Park:

- family homes, older homes, new estates and local shops
- outdoor power, hot water circuits, switchboards and consumer mains
- defect notices and access/parking notes

Albion Park Rail:

- station-area access, workshops, warehouses and commercial pockets
- business outages, switchboards, hot water circuits and CCTV/data
- Level 2 service-equipment support

Barrack Heights:

- coastal homes, older homes, family properties and units
- outdoor power, storm-related fittings, hot water faults and safety switches

Barrack Point:

- coastal/waterfront homes, apartments and units
- weather-exposed outdoor power, salt/corrosion exposure and storm/water faults
- private service equipment, consumer mains and point-of-attachment support

Blackbutt:

- family homes, townhouses and leafy residential streets
- older boards, outdoor lighting, hot water, safety switches and consumer mains

Calderwood:

- new estates, new homes, townhouses and larger family homes
- aircon/EV load checks, switchboard capacity, consumer mains and metering
- new-build support

Dunmore:

- rural-edge/coastal-access properties, larger blocks, sheds and workshops where relevant
- outdoor power, long driveways, private service equipment and access/gate notes
- storm/water faults

Flinders:

- family homes, townhouses and local shops
- older switchboards, outdoor power, hot water faults, aircon circuits and consumer mains

Lake Illawarra:

- lake/coastal exposure, homes, units, apartments and strata where relevant
- storm/water-related electrical issues, outdoor power, hot water circuits and consumer mains

Mount Warrigal:

- hillside/lake-adjacent homes and older switchboards
- outdoor power, hot water, safety switches, storm faults and consumer mains
- Level 2 support

North Macquarie:

- rural-edge and acreage-style properties
- sheds/outbuildings, outdoor power, long driveways and gate/access notes
- private service equipment, switchboards and consumer mains

Oak Flats:

- homes, units, lake-side properties and local shops
- older boards, hot water circuits, safety-switch faults, switchboards, consumer mains and metering

Shell Cove:

- new homes, apartments, marina/coastal access and strata where relevant
- weather exposure, salt/corrosion, outdoor power and switchboard capacity
- hot water faults, consumer mains and Level 2 support

Shellharbour:

- coastal homes, town-centre shops, restaurants/cafes and apartments/units
- weather-exposed outdoor power, business outages, switchboards, consumer mains, metering and defect notices

Shellharbour City Centre:

- shopping/retail, offices, medical/retail suites and strata/apartments
- business outages, commercial switchboards, lighting and power faults, CCTV/data and loading/parking notes
- Level 2 support

Tullimbar:

- new estates, family homes and townhouses
- switchboard capacity, aircon/EV load checks, hot water circuits, outdoor power, consumer mains and metering
- planned upgrades

Warilla:

- coastal homes, apartments/units and shops
- older switchboards, hot water circuits, outdoor power and storm/water-related faults
- consumer mains and business outage wording

## Preservation Checks

Confirmed preserved:

- Google Rating card
- `AW-18165545331`
- `data-conversion-action="phone-click"`
- `data-conversion-action="quote-click"`
- no Level 1 wording
- no Level 3 wording
- no guaranteed wording
- no fake office/depot wording
- no postcode-only landing-page wording
- no duplicate suburb-name wording in Shellharbour output
- no chopped phrase fragments in Shellharbour output

## Validation Results

Passed:

- `npm.cmd run audit:all-suburb-copy`
- `npm.cmd run audit:suburbs`
- `npm.cmd run audit:metadata`
- `npm.cmd run audit:links`
- `npm.cmd run audit:visible-copy`
- `npm.cmd run lint`
- `npm.cmd run build`

Build output:

- 1002 static pages generated
- Shellharbour output pages checked: 17
- Required suburb phrases found for Shellharbour, Shell Cove, Albion Park and Oak Flats
- `90-minute response` found in Shellharbour output
- `60-minute response for urgent call-outs` not found in Shellharbour output
- Global risky wording check passed for Level 1, Level 3, guarantees, fake offices/depots and fake reviews/ratings
- Google Ads and phone/quote conversion markers remained present

Scoped Shellharbour blocked-string checks passed for:

- `Albion Park Albion Park`
- `Albion Park Rail Albion Park Rail`
- `Barrack Point Point`
- `Point Point`
- `Shell Cove Shell Cove`
- `Shellharbour Shellharbour`
- `Shellharbour City Centre Shellharbour City Centre`
- `Electrical help for [postcode]`
- chopped circuit fragments
- `hot isolators`
- `water-affected fittings`
- `Business Details`
- `combined footer CTA`
- `Request Quote`

Note:

- The broad global chopped-pattern scan still finds unrelated pre-existing matches outside this Shellharbour scope, including old Wollongong and Northern Beaches generated files. Those pages were not changed in this pass. Shellharbour scoped output is clean.

## Final Result

PASS.

All 17 Shellharbour suburb pages were strengthened, the 90-minute response mapping was preserved, validation passed, and no risky or stale Shellharbour wording was introduced.
