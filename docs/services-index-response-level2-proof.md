# Services Index Response-Time And Level 2 Proof

Date: 2026-06-14

Scope: `/services/` only. No route changes, response-time mapping changes, guarantee wording, fake office/depot wording, fake ASP number/classes/categories or deployment changes were made.

## Proof Added

No new source change was required in this pass. The services index already carries the requested compact proof near the top of the page through `servicesIndexProofItems` in `app/services/page.tsx`.

The Level 2 ASP line uses the existing shared business constant:

- `business.level2Asp.display`

No ASP number, categories or classes are displayed.

## Wording Used

Confirmed services-index proof wording:

- `60-minute emergency response in core service areas`
- `90-minute emergency response for greater regions`
- `Ausgrid & Endeavour Energy Accredited Level 2 ASP`
- `Call first for urgent electrical faults`
- `Send photos and job details for planned work`

The proof remains compact and appears near the top of the services index after the primary Call Now / Get a Quote hero actions.

## Validation Result

Commands run:

- `npm.cmd run audit:response-times`
- `npm.cmd run audit:metadata`
- `npm.cmd run audit:links`
- `npm.cmd run audit:visible-copy`
- `npm.cmd run lint`
- `npm.cmd run build`

Results:

- Response-time hard mismatches: 0
- Response-time owner-review rows: 0
- Suburbs checked by response-time audit: 873
- Metadata warnings: 0
- Broken links: 0
- Generated HTML issues: 0
- Generated HTML routes checked: 997
- Internal links checked: 19,975
- Visible-copy warning rows: 0
- Visible-copy pages checked: 995
- Lint: passed
- Build: passed
- Static pages generated: 1,002

Generated-output checks:

- Response-time and Level 2 proof grep against `out/services`: matches found
- Required services-index proof grep against `out/services/index.html`: matches found
- Risky wording grep against `out/services`: no matches
- Risky wording grep against `out/services/index.html`: no matches
- Google Ads / phone-click / quote-click grep against `out/services`: matches found

Risky wording checked:

- `guaranteed arrival`
- `60 minutes anywhere`
- `guaranteed approval`
- `office in`
- `local depot in`
- `fake review`
- `fake rating`

## Final Status

PASS
