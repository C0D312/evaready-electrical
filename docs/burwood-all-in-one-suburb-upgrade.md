# Burwood All-In-One Suburb Upgrade

Generated: 2026-06-08

## Scope

Region: Inner West, Burwood & Canada Bay

Area: Burwood

Suburbs upgraded:

- Burwood 2134
- Burwood Heights 2136
- Enfield 2136
- Strathfield 2135

No other region or area content was intentionally changed.

## Changes Made

The Burwood area now has suburb-specific local context in `data/service-area-coverage.ts` for all 4 requested pages. These contexts strengthen the generated suburb landing pages for:

- emergency electrician enquiries
- Level 2 electrician enquiries
- general licensed electrical work
- switchboards
- fault finding
- hot water electrical
- air conditioning electrical
- CCTV/data
- planned quote work

The existing generated suburb template supplies the visible support line:

`Emergency, Level 2 and general electrical work in [Suburb] [Postcode].`

The existing generated suburb template also supplies the 3-card structure:

- Emergency electrician in [Suburb]
- Level 2 electrician in [Suburb]
- General electrical work in [Suburb]

## Local Context Improvements

Burwood:

- apartments
- strata buildings
- shops
- restaurants
- offices
- older homes
- shared meter rooms
- business outages
- consumer mains
- defect notices
- metering
- switchboard upgrades

Burwood Heights:

- family homes
- duplexes
- villas
- older switchboards
- hot water circuits
- lighting and power
- safety switches
- planned Level 2 enquiries

Enfield:

- older homes
- duplexes
- villas
- apartments
- rental maintenance
- parking and access notes
- safety-switch faults
- hot water circuits
- Level 2 service-equipment support

Strathfield:

- larger homes
- apartments
- strata buildings
- schools
- shops
- shared meter rooms
- older wiring
- business outages
- consumer mains
- defect notices
- metering
- point-of-attachment support

## Response-Time Mapping

All 4 Burwood area pages remain core-region suburb pages.

- Expected response wording: 60-minute emergency response
- `90-minute` matches in generated Burwood area output: 0
- Response-time mapping changed: no

## Preservation Checks

Preserved:

- Google Rating card
- Google Ads base tag `AW-18165545331`
- `data-conversion-action="phone-click"`
- `data-conversion-action="quote-click"`
- no Level 1 or Level 3 service wording added
- no guaranteed arrival wording added
- no fake office or depot wording added
- no fake review or fake rating wording added

## Validation Results

Commands run:

- `npm.cmd run audit:all-suburb-copy` - passed, 873 checked, 0 missing, 0 warnings
- `npm.cmd run audit:suburbs` - passed, 873 suburb pages, 0 warnings
- `npm.cmd run audit:metadata` - passed, 995 rows, 0 warnings
- `npm.cmd run audit:links` - passed, 19,963 checked, 0 broken
- `npm.cmd run audit:visible-copy` - passed, 995 pages, 0 warnings
- `npm.cmd run lint` - passed
- `npm.cmd run build` - passed, 1,002 static routes generated

Generated output checks:

- Burwood pages checked: 4
- Scoped Burwood failures: 0
- Required Burwood support/card phrases present: yes
- `90-minute` in Burwood generated area: 0
- stale-string matches in generated output: 0
- risky wording matches in generated output: 0
- scoped Burwood duplicate/chopped/postcode warnings: 0
- Google Ads tag matches in generated output: 3,986
- phone conversion markers in generated output: 13,027
- quote conversion markers in generated output: 16,133

Note: one broad duplicate/chopped-fragment grep returned matches outside this requested Burwood scope. The scoped Burwood check returned 0 matches, so no other regions were changed for this pass.

## Final Result

PASS
