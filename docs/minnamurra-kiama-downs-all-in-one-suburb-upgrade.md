# Minnamurra & Kiama Downs All-In-One Suburb Upgrade

Date: 2026-06-09

Final status: PASS

## Scope

Area upgraded only:

- Wollongong & Illawarra / Minnamurra & Kiama Downs

Suburb pages checked and strengthened:

- Bombo 2533
- Croom 2527
- Kiama Downs 2533
- Minnamurra 2533

No other region or area copy logic was intentionally changed.

## Pages Changed

- `data/service-area-coverage.ts`
- `reports/all-suburb-visible-copy-audit.csv`
- `reports/internal-link-audit.md`
- `reports/suburb-page-audit.csv`
- `reports/visible-copy-audit.csv`
- `docs/minnamurra-kiama-downs-all-in-one-suburb-upgrade.md`

The generated HTML in `out/` was rebuilt from source only.

## Upgrade Summary

Each suburb page now works as a stronger all-in-one local landing page for:

- emergency electrician work
- Level 2 electrician enquiries
- general licensed electrical work
- switchboards
- fault finding
- hot water electrical
- air conditioning electrical
- CCTV/data
- coastal, beachside, river-side, residential, holiday/rental, acreage-edge and access-sensitive work where relevant
- planned quote work

Each page includes the near-top support line:

`Emergency, Level 2 and general electrical work in [Suburb] [Postcode].`

Each page includes the strengthened 3-card section:

- `Emergency electrician in [Suburb]`
- `Level 2 electrician in [Suburb]`
- `General electrical work in [Suburb]`

Quote guidance added:

`Send photos of the switchboard, meter box, affected fitting, access notes, parking/gate details and any defect notice or paperwork.`

## Response-Time Mapping

Preserved.

The Minnamurra & Kiama Downs area remains on greater-region wording:

- `90-minute response`

The upgrade did not add a local `60-minute response for urgent call-outs` claim.

## Local Context Improvements

Bombo:

- coastal homes
- older switchboards
- holiday/rental properties
- small businesses
- outdoor power
- hot water circuits
- storm-related electrical faults
- consumer mains
- access notes

Croom:

- larger properties
- rural-edge homes
- sheds
- workshops
- outdoor power
- long driveways
- switchboards
- private service equipment
- consumer mains
- gate/access notes

Kiama Downs:

- coastal homes
- apartments and units
- strata where relevant
- family homes
- salt/corrosion exposure
- storm-related electrical faults
- hot water circuits
- outdoor power
- switchboards
- consumer mains
- metering
- Level 2 service-equipment enquiries

Minnamurra:

- coastal and river-side homes
- apartments and units where relevant
- holiday/rental properties
- outdoor power
- hot water circuits
- weather-affected fittings
- switchboards
- consumer mains
- metering
- point-of-attachment support

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
- no duplicate suburb-name wording
- no chopped phrase fragments from the blocked-pattern list

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
- Minnamurra & Kiama Downs output pages checked: 4
- Required suburb phrases found for Bombo, Croom, Kiama Downs and Minnamurra
- `90-minute response` found in the Minnamurra & Kiama Downs output
- `60-minute response for urgent call-outs` not found in the Minnamurra & Kiama Downs output
- Global risky wording check passed
- Google Ads and phone/quote conversion markers remained present

Generated-output checks passed for:

- `Emergency electrician in Kiama Downs`
- `Level 2 electrician in Kiama Downs`
- `general electrical work in Kiama Downs`
- `Emergency electrician in Minnamurra`
- `Level 2 electrician in Minnamurra`
- `general electrical work in Minnamurra`
- `Emergency electrician in Bombo`
- `Level 2 electrician in Bombo`
- `general electrical work in Bombo`
- `Emergency electrician in Croom`
- `Level 2 electrician in Croom`
- `general electrical work in Croom`

Blocked output strings were not found:

- `Level 1`
- `Level 3`
- `guaranteed arrival`
- `60 minutes anywhere`
- `office in`
- `local depot in`
- `fake review`
- `fake rating`
- `hot isolators`
- `water-affected fittings`
- `Business Details`
- `combined footer CTA`
- `Request Quote`

## Final Result

PASS.

All 4 Minnamurra & Kiama Downs suburb pages were strengthened, the 90-minute response mapping was preserved, validation passed, and no risky or stale wording was introduced.
