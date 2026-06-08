# Hills District All-In-One Suburb Upgrade

Date: 2026-06-08

## Scope

Updated the `Hills, Hawkesbury & Hornsby / Hills District` suburb page data only. No other areas or regions were intentionally changed.

All 23 requested Hills District suburbs were checked and strengthened:

Annangrove, Baulkham Hills, Beaumont Hills, Bella Vista, Box Hill, Castle Hill, Cattai, Dural, Glenhaven, Glenorie, Kellyville, Kenthurst, Lower Portland, Maraylya, Maroota, Middle Dural, Nelson, Rouse Hill, Sackville North, South Maroota, West Pennant Hills, Winston Hills and Wisemans Ferry.

## Files Changed

- `data/service-area-coverage.ts`
- `reports/all-suburb-visible-copy-audit.csv`
- `reports/internal-link-audit.md`
- `reports/suburb-page-audit.csv`
- `reports/visible-copy-audit.csv`
- `docs/hills-district-all-in-one-suburb-upgrade.md`

## Suburb Page Changes

The generated suburb template already supports all-in-one landing-page sections through local context data. This update added Hills District-only local context so each page can present:

- Emergency electrician in the suburb
- Level 2 electrician in the suburb
- General electrical work in the suburb
- Switchboards, fault finding, hot water electrical, air conditioning electrical, CCTV/data and planned quote work
- Premium residential, acreage, new-estate, apartment, strata, office, business-park, commercial and access-sensitive context where relevant

The required support line is produced on each page:

`Emergency, Level 2 and general electrical work in [Suburb] [Postcode].`

The required three-card landing section is produced on each page:

- `Emergency electrician in [Suburb]`
- `Level 2 electrician in [Suburb]`
- `General electrical work in [Suburb]`

The quote guidance now includes switchboard, meter box, affected fitting, access notes, gate details, parking/loading details and defect notice paperwork.

## Response-Time Mapping

Hills District pages remain on the current greater-region response-time mapping.

- 90-minute emergency response wording preserved: yes
- Hills-specific 60-minute response wording added: no
- Response-time classification changed: no

## Missing-Page Owner Review

Checked the service-area data for:

- Norwest
- North Kellyville

Result: neither exists in the current service-area data. No pages were invented or added in this pass.

Owner-review recommendation: if Evaready services Norwest and North Kellyville and wants suburb landing pages for them, confirm the correct region/area placement and response-time classification before adding routes.

## Local Context Improvements By Suburb

- Annangrove: acreage homes, larger blocks, long driveways, sheds, outdoor power, private service equipment, consumer mains and access/gate notes.
- Baulkham Hills: family homes, duplexes, apartments, strata, older switchboards, local shops, offices, commercial faults, consumer mains, defect notices, aircon/EV load checks and access notes.
- Beaumont Hills: newer homes, townhouses, family properties, switchboard capacity, aircon/EV loads, outdoor lighting, hot water circuits and consumer mains.
- Bella Vista: offices, business parks, apartments, medical/office suites, strata, commercial switchboards, business outages, load checks, CCTV/data and loading/parking notes.
- Box Hill: new estates, townhouses, larger homes, construction/new-build issues, aircon/EV load checks, switchboard capacity, consumer mains and metering.
- Castle Hill: homes, apartments, shopping/retail, offices, medical suites, strata, older switchboards, business outages, consumer mains, defect notices, metering and access/parking notes.
- Cattai: rural/river-edge properties, acreage, sheds, outdoor power, private service equipment, long driveways, storm/water-affected faults and safety-first call guidance.
- Dural: larger homes, acreage properties, long driveways, private poles/service equipment, outdoor power, sheds, switchboards, consumer mains and defect notices.
- Glenhaven: family homes, acreage-style properties, larger blocks, outdoor power, switchboards, aircon/EV load checks, consumer mains and long driveway/access notes.
- Glenorie: rural homes, acreage, sheds, private service equipment, outdoor power, storm faults, consumer mains and gate/access notes.
- Kellyville: newer homes, apartments, townhouses, local shops, strata, aircon/EV load checks, switchboard capacity, consumer mains, metering and planned upgrades.
- Kenthurst: acreage homes, premium rural-residential properties, long driveways, outdoor lighting, sheds, private service equipment, consumer mains and switchboards.
- Lower Portland: remote/riverfront properties, access constraints, storm/flood/water exposure, outdoor power, private service equipment and honest call-first triage.
- Maraylya: rural-edge homes, acreage, sheds, workshops, outdoor power, long driveways, private service equipment, switchboards and consumer mains.
- Maroota: rural homes, acreage, long access, sheds, outdoor circuits, storm faults, private service equipment and access/gate notes.
- Middle Dural: acreage/larger homes, long driveways, private service equipment, outdoor power, sheds, switchboards, consumer mains and defect notices.
- Nelson: rural-edge and acreage homes, long driveways, sheds, outdoor power, private service equipment, storm faults and quote-photo guidance.
- Rouse Hill: new homes, townhouses, apartments, retail/local business, strata, aircon/EV loads, switchboard capacity, metering, consumer mains and planned upgrades.
- Sackville North: remote/river/rural properties, storm/water-affected faults, outdoor power, sheds, private service equipment, long driveways and access notes.
- South Maroota: acreage homes, rural roads, outdoor power, sheds, long driveways, storm faults, private service equipment and consumer mains.
- West Pennant Hills: premium homes, older switchboards, renovations, townhouses/strata where relevant, outdoor lighting, private service equipment, consumer mains, defect notices and access/parking notes.
- Winston Hills: family homes, older switchboards, local shops, duplexes, villas, outdoor power, RCD faults, hot water faults, consumer mains and Level 2 support.
- Wisemans Ferry: remote/river-access properties, storm/flood exposure, outdoor power, private service equipment, long access, sheds, switchboards and safety-first triage.

## Generated Output Checks

Hills District area generated-output verification:

- Hills District area page count: 23
- Missing requested pages: 0
- Extra Hills District area pages: 0
- Sample phrase checks passed for Castle Hill, Baulkham Hills, Kellyville and Rouse Hill.
- Every checked Hills District page contains `90-minute response`.
- No Hills District area page contains `60-minute response for urgent call-outs`.
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
