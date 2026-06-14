# Services Index Metadata and Schema Polish

Date: 2026-06-14

## Scope

Checked `/services/` only. No routes were changed, no fake reviews or ratings were added, no aggregateRating or Review schema was added, and no fake office/depot wording was introduced.

## Metadata

Title before:

`Electrical Services Sydney | Emergency, Level 2 & Switchboards`

Title after:

`Electrical Services Sydney | Emergency, Level 2 & Switchboards`

Title length: 62 characters.

Meta description before:

`Licensed electrical services for emergency faults, Level 2, switchboards, homes, businesses and strata across Sydney and surrounding regions.`

Meta description after:

`Licensed electrical services for emergency faults, Level 2, switchboards, homes, businesses and strata across Sydney and surrounding regions.`

Meta description length: 141 characters.

No metadata source change was required. The existing title focuses on Electrical Services Sydney and includes Emergency, Level 2 and Switchboards within the requested length. The description covers licensed electrical services, emergency faults, Level 2, switchboards, homes, businesses, strata, Sydney and surrounding regions.

## Schema

Schema types present on `/services/`:

- Electrician
- OfferCatalog
- Service entries inside the offer catalog
- BreadcrumbList

The services index offer catalog uses the current services index ordering and resolves route-backed service names and descriptions from `data/service-pages.ts` where matching landing-page data exists.

FAQ schema was not added because the services index does not contain a visible FAQ section.

Confirmed absent from generated services output:

- aggregateRating
- reviewRating
- fake review
- fake rating
- office in
- local depot in

## Validation Results

- `npm.cmd run audit:metadata`: PASS, 995 rows checked, 0 warnings
- `npm.cmd run audit:visible-copy`: PASS, 995 pages checked, 0 warnings
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS, 1002 static pages generated
- `rg "<title>|Electrical Services Sydney|Emergency|Level 2|Switchboards" out/services/index.html`: PASS, matches found
- `rg "BreadcrumbList|Service|OfferCatalog|application/ld\+json" out/services/index.html`: PASS, matches found
- `rg "aggregateRating|reviewRating|fake review|fake rating|office in|local depot in" out/services/index.html`: PASS, no matches

## Final Status

PASS
