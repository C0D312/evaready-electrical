# Wollondilly All-In-One Suburb Upgrade

## Scope

Area upgraded: Macarthur, Camden & Wollondilly / Wollondilly.

This pass strengthened generated suburb pages only through the shared suburb data/template system. No generated HTML was manually edited.

## Suburbs Checked

All 28 generated Wollondilly area suburb pages were checked:

Appin, Belimbla Park, Brownlow Hill, Camden Park, Cataract, Couridjah, Douglas Park, Glenmore, Lakesland, Maldon, Menangle, Mount Hunter, Mowbray Park, Nattai, Oakdale, Orangeville, Pheasants Nest, Picton, Razorback, Silverdale, Tahmoor, The Oaks, Theresa Park, Thirlmere, Warragamba, Werombi, Wilton, Yanderra.

## Route-Data Check

Bargo and Buxton were checked in the generated Wollondilly route data.

- Bargo: not present.
- Buxton: not present.

They were not invented or added in this pass. If Evaready services those suburbs, they should be treated as owner-review missing-page candidates before any route is created.

## Pages Changed

The Wollondilly pages now use suburb-specific local context in `data/service-area-coverage.ts` for:

- Emergency electrician lead intent.
- Level 2 electrician lead intent.
- General licensed electrical work lead intent.
- Switchboards, fault finding, hot water electrical, air-conditioning electrical, CCTV/data and planned quote work.
- Rural, acreage, growth-corridor, residential, workshop and outbuilding wording where relevant.
- Access, gate and parking details for rural and acreage-style quote enquiries.

The existing suburb template already renders:

- "Emergency, Level 2 and general electrical work in [Suburb] [Postcode]."
- 3-card suburb support section.
- Call-first vs quote-form guidance.
- Level 2 quote/photo checklist.
- Google Rating card.
- Phone and quote CTAs with conversion attributes.

## Local Context Improvements By Suburb

- Appin: rural-edge homes, new estates, larger blocks, sheds, outdoor power, private service equipment, consumer mains and defect notices.
- Belimbla Park: acreage homes, bushland-edge access, outdoor power, switchboards, private service equipment and storm faults.
- Brownlow Hill: rural properties, long driveways, sheds, outdoor lighting, private service equipment and access notes.
- Camden Park: larger residential properties, acreage, outdoor power, switchboards, consumer mains and Level 2 support.
- Cataract: remote/bushland access, storm faults, outdoor power, switchboards and safety-first call triage.
- Couridjah: rural homes, small acreage, sheds, outdoor power, consumer mains and private service equipment.
- Douglas Park: country/rural-edge homes, long driveways, sheds, outdoor power, private service equipment and storm faults.
- Glenmore: acreage homes, older boards, sheds, outdoor power, switchboards and access notes.
- Lakesland: rural homes, bushland access, storm faults, outdoor power, switchboards and private service equipment.
- Maldon: rural-edge properties, workshops, outdoor power, switchboards, access notes and planned Level 2 work.
- Menangle: acreage homes, older switchboards, outdoor power, sheds, consumer mains and private service equipment.
- Mount Hunter: acreage properties, sheds, outdoor power, private service equipment, switchboards and access notes.
- Mowbray Park: rural homes, sheds, outdoor lighting, private service equipment, consumer mains and emergency triage.
- Nattai: remote access, bushland-edge properties, outdoor power, switchboards, private service equipment and safety-first emergency triage.
- Oakdale: rural homes, sheds, outdoor power, switchboards, consumer mains and access notes.
- Orangeville: acreage properties, sheds, outbuildings, outdoor power, private service equipment and storm faults.
- Pheasants Nest: rural homes, roadside businesses, sheds, workshops, outdoor power, switchboards and private service equipment.
- Picton: town centre shops, cafes, small offices, older homes, family homes, acreage edges, switchboards, business outages, consumer mains, metering and defect notices.
- Razorback: acreage properties, long or steep access, outdoor power, switchboards, private service equipment and storm faults.
- Silverdale: acreage homes, sheds, outdoor power, long driveways, switchboards, consumer mains and private service equipment.
- Tahmoor: homes, townhouses, shops, local businesses, older switchboards, hot water circuits, lighting/power and Level 2 support.
- The Oaks: rural homes, larger blocks, sheds, outdoor power, switchboards, consumer mains and private service equipment.
- Theresa Park: acreage homes, outdoor power, sheds, private service equipment, switchboards and access notes.
- Thirlmere: homes, local businesses, acreage-edge properties, switchboards, hot water circuits, outdoor power and Level 2 enquiries.
- Warragamba: village homes, rural-edge properties, outdoor power, switchboards, hot water electrical and consumer mains.
- Werombi: acreage homes, sheds, outdoor power, long access, switchboards, consumer mains and private service equipment.
- Wilton: new homes, growth-corridor estates, larger blocks, switchboard capacity, aircon/EV load checks, consumer mains, metering and planned upgrades.
- Yanderra: rural homes, acreage properties, outdoor power, switchboards, hot water circuits, private service equipment and quote guidance.

## Response-Time Mapping

Wollondilly area pages remain greater-region pages.

- 90-minute emergency response: preserved across the Wollondilly area.
- 60-minute Wollondilly-specific wording: not added.
- Local generated check: all 28 Wollondilly suburb pages include 90-minute response wording and none include 60-minute wording.

## Validation Results

- `npm.cmd run audit:all-suburb-copy`: PASS, 873 checked, 0 warnings, 0 missing HTML files.
- `npm.cmd run audit:suburbs`: PASS, 873 pages, 0 warnings.
- `npm.cmd run audit:metadata`: PASS, 995 rows, 0 warnings.
- `npm.cmd run audit:links`: PASS, 19,963 checked, 0 broken links.
- `npm.cmd run audit:visible-copy`: PASS, 995 pages, 0 warnings.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS, 1,002 static routes generated with the GitHub Pages base path.

## Generated Output Checks

- Wollondilly sample phrase checks: PASS for Picton, Tahmoor, The Oaks and Wilton.
- Wollondilly built-file check: 28 pages found, 0 missing pages, 0 missing required landing-page phrases.
- Wollondilly scoped `60-minute` check: no matches.
- Wollondilly scoped `90-minute response` check: matches found.
- Wollondilly scoped duplicate/chopped/postcode-only check: no matches.
- Stale-string check: no matches.
- Risky wording check: no matches.
- Google Ads tag `AW-18165545331`: present.
- `data-conversion-action` markers: present.

The broad artifact grep across all `out/` still matches the existing Kyle Bay phrase "lighting circuits" because the requested regular expression includes broad fragments such as `ng circuits`. The Wollondilly scoped artifact check is clean.

## Final Result

PASS
