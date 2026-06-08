# Hornsby All-In-One Suburb Upgrade

Date: 2026-06-09

## Scope

Area upgraded only:

- Hills, Hawkesbury & Hornsby / Hornsby

No other area or region was intentionally changed. URL structure, Google Ads tracking, phone/quote conversion attributes and response-time mapping were preserved.

## Final Status

PASS

All 29 Hornsby suburb pages were strengthened as all-in-one local landing pages for emergency electrician, Level 2 electrician and general licensed electrical work.

## Suburbs Checked

- Arcadia
- Asquith
- Beecroft
- Berowra
- Berowra Creek
- Berowra Heights
- Berowra Waters
- Berrilee
- Brooklyn
- Canoelands
- Cheltenham
- Cherrybrook
- Cowan
- Dangar Island
- Fiddletown
- Forest Glen
- Galston
- Hornsby
- Hornsby Heights
- Milsons Passage
- Mount Colah
- Mount Kuring-Gai
- Normanhurst
- North Epping
- Pennant Hills
- Thornleigh
- Wahroonga
- Waitara
- Westleigh

## Pages Changed

Each Hornsby suburb page now receives stronger local-context data through `data/service-area-coverage.ts`, including:

- Near-top wording: `Emergency, Level 2 and general electrical work in [Suburb] [Postcode].`
- Three landing-page cards:
  - `Emergency electrician in [Suburb]`
  - `Level 2 electrician in [Suburb]`
  - `General electrical work in [Suburb]`
- Stronger local property and access context.
- Quote guidance covering switchboard, meter box, affected fitting, parking/loading, gate/access, strata/building-manager notes and defect notice paperwork.
- Emergency call-first and planned quote positioning through the existing suburb-page template.

## Local-Context Improvements By Suburb

- Arcadia: acreage homes, larger blocks, long driveways, sheds, outdoor power, private service equipment, consumer mains and gate/access notes.
- Asquith: station-area homes, apartments, townhouses, older switchboards, strata access, local shops, hot water faults, safety switches and defect notices.
- Beecroft: premium homes, older wiring, apartments/townhouses, schools/local shops, switchboards, consumer mains, private service equipment and access notes.
- Berowra: bushland-edge homes, steep/long access, outdoor power, storm faults, switchboards, private service equipment and consumer mains.
- Berowra Creek: remote/bushland/water-access properties, limited access, private service equipment, outdoor power, storm/water-affected faults and careful attendance wording.
- Berowra Heights: family homes, bushland-edge properties, older switchboards, outdoor power, storm faults, hot water, safety switches and Level 2 support.
- Berowra Waters: water-access and remote-access properties, weather-exposed equipment, outdoor circuits, private service equipment, access limitations and safety-first triage.
- Berrilee: acreage/rural-edge properties, long driveways, sheds/outbuildings, private service equipment, outdoor power and storm faults.
- Brooklyn: river/harbour-side access, homes, small businesses, weather exposure, outdoor power, switchboards, private service equipment and access/parking notes.
- Canoelands: rural acreage, long driveways, sheds, outdoor power, private service equipment, storm faults and consumer mains.
- Cheltenham: larger homes, apartments/townhouses, older wiring, switchboards, consumer mains, safety switches, hot water and parking/access notes.
- Cherrybrook: family homes, larger properties, townhouses, switchboard upgrades, aircon/EV load checks, consumer mains, defect notices and hot water faults.
- Cowan: bushland-edge homes, rail/access notes, long driveways, outdoor power, storm faults, private service equipment and call-first safety wording.
- Dangar Island: island/access limitations, weather exposure, planned photo guidance, safety-first triage, private service equipment and no overpromise language.
- Fiddletown: acreage properties, long access, sheds, private service equipment, outdoor lighting/power, storm faults and planned quote guidance.
- Forest Glen: rural/bushland-edge homes, acreage access, private service equipment, outdoor power, switchboards, consumer mains and storm faults.
- Galston: village homes, acreage properties, shops/local businesses, sheds, outdoor power, private service equipment, switchboards, consumer mains and defect notices.
- Hornsby: apartments, station-area shops, offices, strata buildings, shared meter rooms, older wiring, business outages, switchboards, consumer mains, metering and defect notices.
- Hornsby Heights: bushland-edge homes, larger blocks, outdoor power, storm faults, switchboards, private service equipment, consumer mains and access/driveway notes.
- Milsons Passage: remote/water-access properties, access limitations, planned work photos, private service equipment, outdoor power, weather exposure and safety-first triage.
- Mount Colah: family homes, bushland-edge properties, older switchboards, outdoor power, hot water, safety switches, storm faults and Level 2 service-equipment support.
- Mount Kuring-Gai: homes, industrial/commercial pockets, workshops/warehouses where relevant, bushland access, commercial switchboards, business outages, outdoor power and Level 2 support.
- Normanhurst: homes, apartments, schools/local shops, older wiring, switchboards, hot water, safety switches, strata access and planned quote guidance.
- North Epping: family homes, bushland access, larger blocks, switchboards, outdoor power, hot water circuits, safety switches, consumer mains and access notes.
- Pennant Hills: station-area homes, apartments, local shops, offices, older switchboards, strata access, consumer mains, defect notices, hot water faults and business outages.
- Thornleigh: shops, offices, light industrial/commercial pockets, homes, apartments, business outages, switchboards, load checks, CCTV/data and access/parking notes.
- Wahroonga: larger homes, apartments, local business/office context, older switchboards, private service equipment, consumer mains, defect notices and access/parking notes.
- Waitara: apartments, high-density strata, shared meter rooms, station-area shops, limited parking, hot water faults, safety switches, switchboards and metering.
- Westleigh: family homes, bushland-edge access, older switchboards, outdoor power, storm faults, safety switches, hot water circuits and Level 2 service-equipment support.

## Response-Time Mapping

Preserved.

Hornsby area pages remain greater-region pages with 90-minute emergency response wording. No Hornsby suburb page was changed to a 60-minute claim.

## Owner-Review Notes

Possible future 60-minute classification candidates, subject to owner approval:

- Hornsby
- Waitara
- Asquith
- Wahroonga
- Thornleigh
- Pennant Hills
- Normanhurst
- Mount Colah
- Mount Kuring-Gai
- Cherrybrook
- Beecroft
- North Epping

Difficult-access suburbs intentionally kept conservative:

- Berowra Creek
- Berowra Waters
- Dangar Island
- Milsons Passage
- Canoelands
- Fiddletown
- Forest Glen
- Berrilee

## Validation Results

Passed:

- `npm.cmd run audit:all-suburb-copy`
- `npm.cmd run audit:suburbs`
- `npm.cmd run audit:metadata`
- `npm.cmd run audit:links`
- `npm.cmd run audit:visible-copy`
- `npm.cmd run lint`
- `npm.cmd run build`

Generated output checks passed:

- All 29 Hornsby suburb export pages were present.
- Required phrases were found for Hornsby, Waitara, Wahroonga and Thornleigh.
- 90-minute response wording was preserved across Hornsby suburb pages.
- No `60-minute response for urgent call-outs` wording appeared in the Hornsby export folder.
- No risky wording was found for Level 1, Level 3, guaranteed arrival, 60 minutes anywhere, fake office/depot, fake review or fake rating.
- Google Ads tag and phone/quote conversion markers remained present in generated output.
- Duplicate/chopped suburb wording checks passed for the Hornsby export folder.

## Files Changed

- `data/service-area-coverage.ts`
- `docs/hornsby-all-in-one-suburb-upgrade.md`
- `reports/all-suburb-visible-copy-audit.csv`
- `reports/internal-link-audit.md`
- `reports/suburb-page-audit.csv`
- `reports/visible-copy-audit.csv`

## Final Classification

PASS
