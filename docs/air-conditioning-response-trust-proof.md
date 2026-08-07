# Air Conditioning Response and Trust Proof

> Current status (2026-08-08): This is a historical implementation record. `GoogleReviewProof` was removed in commit `aec94c7`; current rating surfaces use `GoogleRatingSeal` through the offer showcase or a direct page mount.

Date: 2026-06-15

Page updated: `/services/split-system-air-conditioning-sydney/`

Deployment: not deployed.

## Proof Added

Yes. Added a compact response and proof section for the air-conditioning service page.

Section heading:

`Trusted air-conditioning electrical support without overclaiming.`

Proof items:

- `60-minute emergency response in core service areas`
- `90-minute emergency response for greater regions`
- `Ausgrid & Endeavour Energy Accredited Level 2 ASP`
- `Call first for urgent electrical faults`
- `Send photos and job details for planned work`

Level 2 relevance note:

`Level 2 support may be relevant where consumer mains, metering, defect notices, switchboard capacity, load capacity or supply-side electrical work affects the job.`

## Template Support

Updated the shared service template so `responseTrustProof` can provide an optional service-specific heading. The existing hot-water default heading is preserved for pages that do not provide a custom heading.

## Google Proof

Google proof added: no new Google component was added.

At the time of this June 2026 update, the air-conditioning service page rendered the shared `GoogleReviewProof` through the commercial service template. That component is no longer active. No Google Places API, fake review text, fake rating text, `aggregateRating` schema or `Review` schema was added by the historical update.

## Claims Avoided

- No response-time mapping changes.
- No guaranteed wording.
- No `60 minutes anywhere` wording.
- No fake ASP number, categories or classes.
- No claim that every air-conditioning job is Level 2.
- No fake reviews or ratings.
- No Google Places API.
- No fake `aggregateRating` or `Review` schema.

## Validation Result

Commands run:

- `npm.cmd run audit:response-times` - passed, 0 hard mismatches.
- `npm.cmd run audit:metadata` - passed, 0 warnings.
- `npm.cmd run audit:links` - passed, 0 broken links, 19,989 internal links checked.
- `npm.cmd run audit:visible-copy` - passed, 0 rows with warnings across 995 pages.
- `npm.cmd run lint` - passed.
- `npm.cmd run build` - passed.

Generated output checks:

- Response and trust proof appeared in `out/services/split-system-air-conditioning-sydney`.
- Level 2 relevance wording appeared and was limited to supply-side or capacity work where relevant.
- `AW-18165545331` remained present.
- `data-conversion-action="phone-click"` remained present.
- `data-conversion-action="quote-click"` remained present.
- The risky/schema grep for `guaranteed arrival`, `60 minutes anywhere`, `guaranteed approval`, `fake review`, `fake rating`, `aggregateRating` and `reviewRating` returned no matches.

## Final Status

PASS
