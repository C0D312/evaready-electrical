# Central Coast all-in-one suburb upgrade

## Scope

- Area upgraded: Central Coast South / Central Coast.
- Suburb pages checked: 37.
- URL structure preserved.
- Response-time mapping preserved: Central Coast pages remain greater-region pages with 90-minute emergency response wording.
- No Level 1 or Level 3 copy added.
- No fake office, depot, guaranteed-arrival or postcode-only wording added.
- Google Ads tracking preserved: `AW-18165545331`, `data-conversion-action="phone-click"` and `data-conversion-action="quote-click"` verified in generated Central Coast pages.

## Pages changed

- Source copy generator: `data/service-area-coverage.ts`.
- Added a Central Coast-only local context resolver for `central-coast-south / central-coast`.
- Report created: `docs/central-coast-all-in-one-suburb-upgrade.md`.
- Audit report outputs refreshed by the requested validation commands.

## Suburbs checked

Alison, Bar Point, Blackwall, Calga, Central Mangrove, Cheero Point, Cogra Bay, East Gosford, Erina, Gosford, Green Point, Horsfield Bay, Kangy Angy, Kariong, Koolewong, Mardi, Marlow, Mooney Mooney, Mooney Mooney Creek, Mount White, Narara, Niagara Park, North Gosford, Palmdale, Peats Ridge, Phegans Bay, Point Clare, Point Frederick, Somersby, Springfield, Tascott, Tuggerah, Wendoree Park, West Gosford, Woy Woy, Woy Woy Bay and Wyoming.

## Local-context improvements by suburb

- Alison: rural-edge homes, larger blocks, sheds, outdoor power, switchboards, hot water circuits, consumer mains and access/gate notes.
- Bar Point: river and water-access properties, limited access, private service equipment, outdoor power, weather exposure and call-first triage.
- Blackwall: homes, units, older switchboards, Woy Woy peninsula access, hot water faults, outdoor power, safety switches and consumer mains.
- Calga: rural/acreage properties, long driveways, sheds, private service equipment, outdoor power, storm faults, consumer mains and gate/access notes.
- Central Mangrove: rural/acreage homes, sheds, long access, private service equipment, outdoor power, storm faults, switchboards and consumer mains.
- Cheero Point: river/water-access homes, limited access, private service equipment, weather-exposed outdoor power and planned photo guidance.
- Cogra Bay: remote/water-access properties, private service equipment, storm and water-related exposure, outdoor power, switchboards and safety-first attendance wording.
- East Gosford: apartments, units, older homes, shops, offices, medical/local business properties, strata access, shared meter rooms, hot water, consumer mains and defect notices.
- Erina: retail/commercial premises, offices, medical suites, apartments/units, business outages, commercial switchboards, load checks, CCTV/data, hot water and Level 2 support.
- Gosford: CBD apartments, offices, shops, restaurants/cafes, strata buildings, shared meter rooms, business outages, consumer mains, metering and defect notices.
- Green Point: homes, townhouses, waterfront properties, older boards, outdoor power, hot water circuits, safety switches, consumer mains and Level 2 support.
- Horsfield Bay: bay/waterfront homes, steep/tight access, weather exposure, outdoor power, private service equipment, switchboards, hot water and access notes.
- Kangy Angy: rural-edge homes, larger blocks, sheds, workshops, outdoor power, private service equipment, long driveways, switchboards and consumer mains.
- Kariong: family homes, local shops, bushland-edge access, older boards, switchboards, hot water circuits, outdoor power, safety switches, consumer mains and quote guidance.
- Koolewong: waterfront/slope access, homes, older switchboards, outdoor power, weather exposure, private service equipment, consumer mains and parking/access notes.
- Mardi: homes, newer estates, rural-edge blocks, outdoor power, aircon/EV load checks, switchboard capacity, consumer mains, hot water faults and access notes.
- Marlow: remote/river access, private service equipment, long driveways, outdoor circuits, storm and water-related faults and safety-first call triage.
- Mooney Mooney: river/waterfront homes, access limitations, outdoor power, private service equipment, switchboards, storm and water-related exposure and planned quote guidance.
- Mooney Mooney Creek: bushland/remote access, long driveways, outdoor power, storm faults, private service equipment and careful 90-minute response wording.
- Mount White: acreage/rural-edge homes, long access, sheds, private service equipment, outdoor power, storm faults, switchboards and consumer mains.
- Narara: family homes, older switchboards, local shops, hot water faults, safety-switch tripping, outdoor power, consumer mains, defect notices and planned quote guidance.
- Niagara Park: homes, station-area access, older switchboards, local shops, hot water circuits, outdoor power, safety switches, consumer mains and Level 2 support.
- North Gosford: apartments/units, homes, medical/local business demand without overclaiming, shared access, hot water faults, switchboards and consumer mains.
- Palmdale: larger blocks, facility-style work where phrased generally, access notes, private service equipment, outdoor power, storm faults and switchboards.
- Peats Ridge: rural homes, acreage properties, sheds/workshops, long driveways, outdoor power, private service equipment, consumer mains, storm faults and gate/access notes.
- Phegans Bay: bay/waterfront homes, steep/tight access, outdoor power, weather exposure, private service equipment, hot water faults, consumer mains and photo guidance.
- Point Clare: homes, units, waterfront/rail-adjacent access, outdoor power, switchboards, hot water, safety switches, consumer mains and parking/access notes.
- Point Frederick: apartments, strata, waterfront homes, offices/local businesses, shared meter rooms, limited parking, hot water faults, switchboards, consumer mains and metering.
- Somersby: warehouses, workshops, factories, transport/logistics sites, business outages, commercial switchboards, load checks, CCTV/data, sheds and access/loading notes.
- Springfield: family homes, older boards, townhouses, local shops, outdoor power, hot water, safety switches, switchboards and consumer mains.
- Tascott: waterfront/rail-side homes, steep access, older switchboards, hot water faults, outdoor power, private service equipment and access notes.
- Tuggerah: retail, warehouses, offices, industrial pockets, business outages, commercial switchboards, lighting/power, CCTV/data, load checks and access/loading notes.
- Wendoree Park: lake/waterfront or rural-edge properties, larger blocks, private service equipment, outdoor power, storm and water-related exposure, switchboards and careful access notes.
- West Gosford: warehouses, workshops, retail, offices, business outages, commercial switchboards, load checks, CCTV/data, lighting/power and Level 2 support.
- Woy Woy: homes, apartments/units, local shops, peninsula access, older switchboards, hot water faults, safety switches, strata/rental maintenance, consumer mains and defect notices.
- Woy Woy Bay: waterfront homes, steep/tight access, outdoor power, storm and water-related exposure, private service equipment, hot water faults and quote-photo guidance.
- Wyoming: family homes, local shops, older switchboards, hot water circuits, safety switches, consumer mains, defect notices, outdoor power and planned quote guidance.

## Missing-page owner-review candidates

Checked service-area data for Umina Beach, Ettalong Beach, Booker Bay, Empire Bay, Saratoga, Davistown, Kincumber, Avoca Beach, Copacabana, Terrigal, Wamberal, The Entrance and Long Jetty.

None of those localities currently exist in the generated service-area data. Do not invent pages blindly. If Evaready services any of them, they should be reviewed by the owner as possible missing-page candidates.

## Validation results

- `npm.cmd run audit:all-suburb-copy`: PASS.
- `npm.cmd run audit:suburbs`: PASS.
- `npm.cmd run audit:metadata`: PASS.
- `npm.cmd run audit:links`: PASS.
- `npm.cmd run audit:visible-copy`: PASS.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS.
- Source-level Central Coast copy probe: PASS for all 37 suburbs.
- Generated `index.html` verifier: PASS for all 37 Central Coast pages, with 37 pages containing 90-minute response wording and zero pages containing 60-minute response wording.
- Representative `rg` checks for Gosford, Erina, West Gosford and Woy Woy: PASS.
- Scoped Central Coast `rg "60-minute response for urgent call-outs"`: NO MATCHES.
- Scoped Central Coast duplicate/chopped/risky phrase scan: NO MATCHES.
- Global risky wording scan for Level 1, Level 3, guaranteed arrival, 60 minutes anywhere, fake office/depot/review/rating: NO MATCHES.

## Broad-scan note

The requested broad duplicate/chopped regex against all of `out` still finds pre-existing out-of-scope pages containing phrases such as `loss of power` and `hot outlets`. The Central Coast scoped output is clean. Those unrelated pages were not changed in this pass because the instruction was to upgrade Central Coast suburb pages only.

## Final status

PASS for the Central Coast scoped upgrade. Broader all-site copy cleanup remains an owner-review item outside this pass.
