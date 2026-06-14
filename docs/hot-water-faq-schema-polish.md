# Hot Water FAQ and Schema Polish

Date: 2026-06-15

## Summary

Final status: PASS

The hot water service page FAQ, metadata and generated service offers were tightened for SEO and lead quality while keeping the page clearly scoped to electrical work.

## FAQ Questions Added or Updated

The FAQ now answers:

- Can an electrician help when there is no hot water?
- Do I need an electrician or a plumber for hot water?
- Why does my hot water trip the safety switch?
- What photos help with a hot water quote?
- Can you help with hot water heat pumps?
- Can Evaready wire a replacement electric hot water system?
- Is a burning smell or hot isolator urgent?
- Can a hot water upgrade require switchboard or load capacity checks?

FAQPage schema is generated from the same data used for the visible FAQ, so the schema matches the page FAQ text.

## Metadata

Title before:

Hot Water Electrician Sydney | Circuits & Isolators

Title after:

Hot Water System Electrician Sydney | Electric Faults

Description before:

Hot water electrician in Sydney for no hot water and circuit tripping, isolators, thermostat checks and heat pump electrical support.

Description after:

Hot water system electrician for electric faults, tripping circuits, isolators, heat pumps and replacement wiring. Call Now or get a quote.

## Schema Types Present

- Electrician
- Service
- OfferCatalog
- FAQPage
- BreadcrumbList

Service offer names now include:

- Electric hot water circuit fault finding
- Hot water isolator checks and replacement
- Safety switch tripping on hot water circuits
- Thermostat and element electrical testing
- Replacement electric hot water wiring support
- Hot water heat pump electrical support

## Claims Avoided

- No fake reviews
- No fake ratings
- No aggregateRating schema
- No Review schema
- No fake office address
- No guaranteed response timing
- No 60 minutes anywhere wording
- No plumbing service claim
- No gas fitting claim
- No promise to perform plumbing, tank replacement, valve work or gas hot water work

## Validation

- audit:metadata: PASS, warnings 0
- audit:visible-copy: PASS, warnings 0
- lint: PASS
- build: PASS
- FAQ/schema grep: PASS
- service offer grep: PASS
- risky/fake schema grep: PASS, no matches

## Files Changed

- data/service-pages.ts
- docs/hot-water-faq-schema-polish.md

## Final Result

PASS
