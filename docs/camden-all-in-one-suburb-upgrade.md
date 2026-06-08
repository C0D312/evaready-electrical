# Camden All-In-One Suburb Upgrade

## Scope

Upgrade completed for Macarthur, Camden & Wollondilly / Camden only.

Suburb pages checked and strengthened: 22.

Suburbs covered:

Bringelly, Camden, Camden South, Catherine Field, Cawdor, Cobbitty, Currans Hill, Elderslie, Ellis Lane, Gledswood Hills, Grasmere, Gregory Hills, Harrington Park, Kirkham, Leppington, Mount Annan, Narellan, Narellan Vale, Oran Park, Rossmore, Smeaton Grange and Spring Farm.

## Template Behavior

The suburb generator now uses Camden-only local context data for these pages. No generated HTML was manually edited.

Each Camden suburb page now works as a stronger all-in-one local landing page for:

- Emergency electrician enquiries.
- Level 2 electrician enquiries.
- General licensed electrical work.
- Switchboards, fault finding, hot water electrical, air conditioning electrical, CCTV/data and planned quote work.
- Commercial, industrial, strata, residential, acreage, rural-edge and new-estate work where relevant.

Every checked suburb page includes the support line:

`Emergency, Level 2 and general electrical work in [Suburb] [Postcode].`

Every checked suburb page includes the three service summary cards:

- `Emergency electrician in [Suburb]`
- `Level 2 electrician in [Suburb]`
- `General electrical work in [Suburb]`

All Camden area pages remain on the existing greater-region response-time mapping and show 90-minute emergency response wording. No Camden-specific `60-minute response for urgent call-outs` wording was found in the Camden area generated output.

## Local Context Improvements

Airport-growth, acreage, rural-edge, shed, workshop and long-driveway context was added for:

- Bringelly
- Cawdor
- Ellis Lane
- Grasmere
- Kirkham
- Rossmore

Town-centre, retail, medical, business, warehouse, factory and commercial-switchboard context was added for:

- Camden
- Gregory Hills
- Narellan
- Smeaton Grange

New-estate, growth-corridor, townhouse, duplex, builder, construction and switchboard-capacity context was added for:

- Catherine Field
- Gledswood Hills
- Leppington
- Oran Park
- Spring Farm

Family-home, renovation, outdoor power, hot water, aircon and residential-service context was added for:

- Camden South
- Cobbitty
- Currans Hill
- Elderslie
- Harrington Park
- Mount Annan
- Narellan Vale

Quote guidance was strengthened around sending switchboard, meter box, affected fitting, access, parking, paperwork and defect notice details.

## Owner Review Candidates

Response-time classification was not changed. These growth-corridor suburbs remain greater-region pages with 90-minute wording, but can be reviewed by the owner later if a response-time override is ever considered:

- Bringelly
- Catherine Field
- Gregory Hills
- Leppington
- Oran Park

## Validation Results

Passed:

- `npm.cmd run audit:all-suburb-copy` - 873 checked, 0 missing, 0 warnings.
- `npm.cmd run audit:suburbs` - 873 suburb pages, 0 warnings.
- `npm.cmd run audit:metadata` - 995 rows, 0 warnings.
- `npm.cmd run audit:links` - 19,963 checked, 0 broken.
- `npm.cmd run audit:visible-copy` - 995 pages, 0 warnings.
- `npm.cmd run lint`
- `npm.cmd run build` - 1,002 static routes generated.

Generated output checks:

- 22 Camden suburb HTML pages checked.
- 0 missing Camden suburb HTML files.
- 0 scoped Camden failures.
- 0 `60-minute response for urgent call-outs` matches in `out/service-areas/macarthur-camden-and-wollondilly/camden`.
- 154 `90-minute response` matches in the Camden area generated output.
- 0 stale string matches in `out`.
- 0 risky wording matches in `out`.
- 0 duplicate, chopped phrase or postcode-only warnings in the Camden area output.
- Google Ads ID `AW-18165545331` remains present.
- Phone and quote conversion markers remain present.

The broad duplicate/chopped grep produced 7 matches outside the requested scope, all from the existing Kyle Bay wording `lighting circuits`. Those are substring false positives from the `g circuits` pattern, not Camden output changes.

## Final Result

PASS
