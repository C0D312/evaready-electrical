# Air Conditioning FAQ and Schema Polish

## Scope

- Page: `/services/split-system-air-conditioning-sydney/`
- Source changed: `data/service-pages.ts`
- Routes changed: no
- Response-time mapping changed: no
- Deployment performed: no

## FAQ Questions Added / Updated

The visible FAQ was expanded and tightened to answer:

- Can an electrician help with air conditioning?
- Do I need an electrician or an air-conditioning technician?
- What is an AC isolator?
- Does a split system need a dedicated circuit?
- Why does my aircon trip the safety switch?
- What photos help with an air-conditioning quote?
- Can Evaready help with heat pump electrical supply?
- Can a new aircon need switchboard or load capacity checks?
- When should I call first instead of requesting a quote?

FAQ answers now keep the scope on electrical-side work: split-system electrical support, AC isolators, dedicated circuits, outdoor unit power, safety switches, switchboard capacity checks, load capacity checks and heat-pump electrical supply.

## Metadata

Title before:

`Air Conditioning Electrician Sydney | AC Circuits`

Title after:

`Air Conditioning Electrician Sydney | AC Circuits`

Title length: 49 characters.

Description before:

`Air conditioning electrician in Sydney for AC isolators, dedicated circuits, outdoor unit power, heat pump support and capacity checks.`

Description after:

`Air conditioning electrician Sydney for split systems, AC isolators, dedicated circuits and switchboard capacity checks. Call now or get a quote.`

Description length: 145 characters.

## Schema Types Present

Generated output contains:

- `Electrician`
- `Service`
- `OfferCatalog`
- `FAQPage`
- `BreadcrumbList`

The FAQPage schema is generated from the same `service.faqs` data used for the visible FAQ cards, so visible FAQ text and schema text remain aligned.

## Claims Avoided

- No fake reviews added.
- No fake ratings added.
- No `aggregateRating` schema added.
- No `reviewRating` schema added.
- No fake office address added.
- No guaranteed response timing added.
- No plumbing, gas fitting or unverified refrigeration service claim added.
- Air-conditioning installation/refrigeration work is described as handled by appropriately licensed technicians where required.

## Validation Result

- `npm.cmd run audit:metadata`: PASS, 995 rows, 0 warnings.
- `npm.cmd run audit:visible-copy`: PASS, 995 pages, 0 warnings.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS, 1002 static pages generated.

Generated-output checks:

- `FAQPage`, `AC isolator`, `dedicated circuit`, `aircon trip the safety switch`, `heat pump electrical supply` and `load capacity checks` found in `out/services/split-system-air-conditioning-sydney/`.
- `aggregateRating|reviewRating|guaranteed arrival|60 minutes anywhere|office in|local depot in|gas fitting|plumbing service`: no matches in the generated air-conditioning page.

## Final Status

PASS
