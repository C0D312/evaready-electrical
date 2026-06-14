# Level 2 FAQ and Schema Polish

Date: 2026-06-14

## Scope

- Updated the visible FAQ content on the Level 2 Electrician Sydney page.
- Kept FAQPage schema generated from the same `level2Faqs` data used for visible FAQ cards.
- Updated Level 2 Service schema wording to include consumer mains, defect notices, metering, overhead service lines, underground service mains, point of attachment and supply-side electrical work.
- Updated the Level 2 meta description.
- No routes were changed.
- No response-time mapping was changed.
- No fake ASP number, ASP categories/classes, fake office address, fake review, fake rating, aggregateRating schema or network approval timing promise was added.
- Deployment was not performed.

## FAQ Questions Added / Updated

- What is Level 2 electrical work?
- When do I need a Level 2 electrician?
- Can Evaready help with Ausgrid and Endeavour Energy Level 2 work?
- What should I send with a defect notice enquiry?
- Can Level 2 work be needed for EV chargers or air conditioning upgrades?
- What is consumer mains work?
- What is a point of attachment issue?
- Can Level 2 work be urgent?
- Do you guarantee network approval times?
- Should I call or request a quote?

## Metadata

Title before:

`Level 2 Electrician Sydney | Accredited ASP`

Title after:

`Level 2 Electrician Sydney | Accredited ASP`

Description before:

`Ausgrid & Endeavour Energy accredited Level 2 ASP for consumer mains, defect notices, metering and supply-side electrical work in Sydney.`

Description after:

`Level 2 ASP in Sydney and surrounding regions for consumer mains, defect notices, metering, point of attachment and supply work.`

## Schema Types Present

- `Electrician`
- `Service`
- `OfferCatalog`
- `FAQPage`
- `BreadcrumbList`

FAQPage schema is generated from the same FAQ data rendered visibly on the page.

## Fake Rating / Review Schema

Absent: yes

No `aggregateRating`, `reviewRating`, fake review or fake rating schema was added.

## Validation

- `npm.cmd run audit:metadata`: PASS
  - Rows checked: 995
  - Warnings: 0
- `npm.cmd run audit:visible-copy`: PASS
  - Pages checked: 995
  - Rows with warnings: 0
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS
  - Static pages generated: 1002
  - Suburb paths generated: 873

## Generated Output Checks

- `FAQPage`, `What is Level 2 electrical work`, `Ausgrid`, `Endeavour Energy`, `consumer mains`, `point of attachment` and `network approval` appear in `out/level-2-electrician-sydney`.
- No matches found for `aggregateRating`, `reviewRating`, `guaranteed approval`, `guaranteed arrival`, `60 minutes anywhere`, `office in` or `local depot in` in `out/level-2-electrician-sydney`.

## Final Status

PASS
