# Georges River All-In-One Suburb Upgrade

## Scope

Upgrade completed for St George & Bayside / Georges River only.

No other areas or regions were intentionally changed. Generated HTML was not manually edited.

## Suburbs Checked

All 20 requested Georges River suburb pages were checked:

- Allawah
- Beverley Park
- Blakehurst
- Carlton
- Carss Park
- Connells Point
- Hurstville
- Hurstville Grove
- Kogarah
- Kogarah Bay
- Kyle Bay
- Lugarno
- Mortdale
- Oatley
- Peakhurst
- Peakhurst Heights
- Penshurst
- Ramsgate
- Sans Souci
- South Hurstville

## Template Changes

The suburb-page generator now applies stronger local landing-page context for the Georges River area only when:

- region slug is `st-george-and-bayside`
- area slug is `georges-river`
- suburb slug is one of the 20 approved Georges River suburbs

Each upgraded suburb page includes:

- "Emergency, Level 2 and general electrical work in [Suburb] [Postcode]."
- Emergency electrician in [Suburb]
- Level 2 electrician in [Suburb]
- General electrical work in [Suburb]
- 60-minute emergency response wording
- Level 2 ASP wording
- switchboard, fault finding, hot water, aircon, CCTV/data and planned quote support
- quote guidance for switchboard, meter box, affected fitting, access and paperwork photos

## Local Context Added

Hurstville and Kogarah pages were strengthened for apartments, offices, medical/retail suites, shops, restaurants, strata access, shared meter rooms and commercial switchboards.

Peakhurst, Mortdale and Hurstville were strengthened for shops, warehouses, workshops, business outages, commercial switchboards, load checks and site-contact/access details.

Connells Point, Kogarah Bay, Ramsgate and Sans Souci were strengthened for waterfront/coastal exposure, outdoor fixtures, weather-exposed electrical equipment, service equipment, consumer mains and point-of-attachment support.

Blakehurst, Beverley Park, Kyle Bay, Lugarno, Oatley, Peakhurst Heights, Carss Park and Hurstville Grove were strengthened for larger homes, renovations, outdoor circuits, switchboards, hot water, service equipment and planned quote work.

Allawah, Carlton and Penshurst were strengthened for units, villas, older homes, strata access, shops, rental maintenance, switchboards and safety-switch issues.

## Preserved

- Existing URL structure
- Existing 60/90 response-time mapping
- 60-minute wording for all Georges River pages
- Google Ads tag `AW-18165545331`
- phone-click conversion markers
- quote-click conversion markers
- Google Rating card
- no Level 1 or Level 3 wording
- no guaranteed arrival wording
- no fake office/depot wording
- no fake review/rating wording

## Validation Results

- `npm.cmd run audit:all-suburb-copy`: PASS, 873 checked, 0 warnings, 0 missing HTML files
- `npm.cmd run audit:suburbs`: PASS, 873 suburb pages, 0 warnings
- `npm.cmd run audit:metadata`: PASS, 995 rows, 0 warnings
- `npm.cmd run audit:links`: PASS, 19,963 checked, 0 broken
- `npm.cmd run audit:visible-copy`: PASS, 995 pages, 0 warnings
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS, 1,002 static routes generated

## Output Checks

- Hurstville, Kogarah and Peakhurst all-in-one wording: PASS
- All 20 Georges River suburb pages contain emergency / Level 2 / general electrical wording: PASS
- No `90-minute` wording under `out/service-areas/st-george-and-bayside/georges-river`: PASS
- No stale launch-blocker wording in `out`: PASS
- No risky Level 1 / Level 3 / guarantee / fake office wording in `out`: PASS
- No duplicate, chopped or postcode-only wording artifacts in `out`: PASS
- Google Ads tag, phone-click and quote-click markers preserved: PASS
- Google Rating card preserved: PASS

## Final Result

PASS
