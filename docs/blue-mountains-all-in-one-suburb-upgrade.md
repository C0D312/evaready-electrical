# Blue Mountains All-In-One Suburb Upgrade

Date: 2026-06-09

Final result: PASS

## Scope

Area upgraded only:

- Blue Mountains / Blue Mountains

All 21 listed Blue Mountains suburb pages were checked and strengthened:

- Berambing
- Blaxland
- Bullaburra
- Faulconbridge
- Glenbrook
- Hawkesbury Heights
- Hazelbrook
- Katoomba
- Lapstone
- Lawson
- Leura
- Linden
- Mount Riverview
- Springwood
- Sun Valley
- Valley Heights
- Warrimoo
- Wentworth Falls
- Winmalee
- Woodford
- Yellow Rock

No other area or region was intentionally upgraded in this pass.

## Pages Changed

- `data/service-area-coverage.ts`
- `reports/all-suburb-visible-copy-audit.csv`
- `reports/suburb-page-audit.csv`
- `reports/internal-link-audit.md`
- `reports/visible-copy-audit.csv`
- `docs/blue-mountains-all-in-one-suburb-upgrade.md`

## Upgrade Details

Each Blue Mountains suburb page now has stronger all-in-one local landing page coverage for:

- emergency electrician work
- Level 2 electrician enquiries
- general licensed electrical work
- switchboards
- fault finding
- hot water electrical
- air conditioning electrical
- CCTV/data
- mountain homes
- bushland-edge homes
- town-centre shops and cafes where relevant
- small businesses where relevant
- older switchboards
- access-sensitive properties
- planned quote work

Each page includes the strengthened near-top support line:

> Emergency, Level 2 and general electrical work in [Suburb] [Postcode].

Each page includes the strengthened 3-card service section:

- Emergency electrician in [Suburb]
- Level 2 electrician in [Suburb]
- General electrical work in [Suburb]

Each page includes the requested quote guidance:

> Send photos of the switchboard, meter box, affected fitting, access notes, gate details, parking/loading details and any defect notice or paperwork.

## Response-Time Mapping

Preserved:

- Blue Mountains remains on the current greater-region 90-minute response wording.
- No Blue Mountains suburb page was changed to 60-minute response wording.
- No owner-unapproved response-time override was added.

## Missing-Page Owner-Review Note

Checked against the service-area data and not found:

- Blackheath
- Medlow Bath
- Mount Victoria
- Mount Wilson
- Mount Tomah
- Megalong Valley

These were not invented or added. If Evaready services these locations and wants pages for them, they should be confirmed by the owner as missing-page candidates in a separate pass.

## Local Context Improvements By Suburb

- Berambing: mountain/rural access, long driveways, weather-exposed outdoor power, private service equipment, switchboards, storm faults and access/gate notes.
- Blaxland: family homes, older switchboards, bushland-edge faults, outdoor power, safety switches, consumer mains, defect notices and local-shop context.
- Bullaburra: mountain homes, older boards, outdoor circuits, storm/water exposure, long access, hot water circuits and private service equipment.
- Faulconbridge: family homes, bushland-edge properties, older switchboards, storm faults, outdoor lighting/power, consumer mains and Level 2 support.
- Glenbrook: family homes, cafes/local shops, older homes, bushland-edge access, outdoor power, switchboards, consumer mains and defect notices.
- Hawkesbury Heights: ridge/elevated access, bushland-edge homes, long driveways, storm faults, private service equipment and outdoor power.
- Hazelbrook: family homes, older switchboards, outdoor power, storm faults, hot water, safety switches and Level 2 service-equipment support.
- Katoomba: town-centre shops, cafes, accommodation/short-stay maintenance where accurate, older homes, units, switchboards, business outages, consumer mains, metering and storm faults.
- Lapstone: lower-mountains homes, bushland access, older boards, outdoor power, storm faults, hot water circuits and switchboards.
- Lawson: village homes, local shops, older switchboards, storm/water faults, outdoor power, hot water, safety switches and Level 2 support.
- Leura: heritage homes, guest accommodation where phrased generally, cafes/shops, older wiring, switchboards, outdoor power, business outages and consumer mains.
- Linden: bushland-edge homes, long access, outdoor circuits, storm faults, private service equipment, switchboards and planned quote-photo guidance.
- Mount Riverview: family homes, sloped/driveway access, outdoor lighting, storm faults, older switchboards, consumer mains and Level 2 enquiries.
- Springwood: homes, local shops, small businesses, older switchboards, storm faults, outdoor power, hot water, safety switches, consumer mains and defect notices.
- Sun Valley: residential/rural-edge properties, larger blocks, outdoor power, storm faults, switchboards, hot water, access notes and private service equipment.
- Valley Heights: station-area/local homes, older switchboards, storm faults, outdoor circuits, hot water, safety switches and access notes.
- Warrimoo: bushland-edge homes, older boards, outdoor power, storm/water exposure, switchboards, consumer mains and quote-photo guidance.
- Wentworth Falls: homes, shops/guest accommodation where accurate, weather exposure, outdoor lighting, storm faults, switchboards, consumer mains, private service equipment and access notes.
- Winmalee: family homes, larger residential blocks, outdoor power, storm faults, switchboards, hot water, safety switches and Level 2 support.
- Woodford: bushland-edge homes, older boards, long access, storm faults, outdoor power, switchboards and private service equipment.
- Yellow Rock: rural-edge/bushland homes, access/gate notes, outdoor power, storm faults, private service equipment, consumer mains and planned quote-photo guidance.

## Validation Results

Passed:

- `npm.cmd run audit:all-suburb-copy` - PASS, 873 suburb pages checked, 0 warnings
- `npm.cmd run audit:suburbs` - PASS, 873 suburb pages, 0 warnings
- `npm.cmd run audit:metadata` - PASS, 995 rows, 0 warnings
- `npm.cmd run audit:links` - PASS, 19,964 internal links checked, 0 broken
- `npm.cmd run audit:visible-copy` - PASS, 995 pages, 0 warnings
- `npm.cmd run lint` - PASS
- `npm.cmd run build` - PASS, 1002 static pages generated

Generated-output checks passed:

- All 21 Blue Mountains suburb pages present.
- Katoomba, Springwood, Glenbrook and Leura contain the required emergency, Level 2 and general electrical work phrases.
- All 21 pages contain the near-top "Emergency, Level 2 and general electrical work in [Suburb] [Postcode]." line.
- All 21 pages contain 90-minute response wording.
- No Blue Mountains suburb page contains "60-minute response for urgent call-outs".
- No generated output contains risky wording: Level 1, Level 3, guaranteed arrival, 60 minutes anywhere, office in, local depot in, fake review or fake rating.
- No generated Blue Mountains suburb page contains checked duplicate/chopped wording patterns.
- Google Ads tag `AW-18165545331` remains present.
- Phone conversion markers remain present.
- Quote conversion markers remain present.

Note:

- Some raw `rg` fragments from the prompt, such as `y switches`, would match legitimate "safety switches" wording across the wider static site. A compact verifier was used for the chopped-copy checks so valid safety-switch copy was not treated as a false failure.

## Final Status

Final result: PASS
