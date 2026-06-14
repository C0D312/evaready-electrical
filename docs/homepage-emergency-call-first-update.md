# Homepage Emergency Call-First Update

Date: 2026-06-14

Scope: homepage emergency lead-generation optimisation only. No deployment was performed.

## Files Changed

- `app/page.tsx`
- `docs/homepage-emergency-call-first-update.md`

## Above-Fold Copy Changed

The homepage hero now leads with:

`Emergency electrical fault? Call now — 0461 247 247`

The support copy now clearly separates unsafe emergency faults from planned work:

- Emergency fault path: call first for no power, burning smells, sparking, repeated safety-switch tripping, switchboard faults, storm damage or unsafe electrical equipment.
- Planned work path: send photos and details so Evaready can confirm the next step.

The hero also keeps the approved response wording and Level 2 ASP proof:

- 60-minute emergency response in core service areas.
- 90-minute response for greater regions.
- Ausgrid & Endeavour Energy Accredited Level 2 ASP.

## CTA Wording Result

- Primary hero CTA remains a red phone CTA using `tel:+61461247247`.
- Primary hero CTA remains visually dominant with stronger sizing, ring and shadow.
- Primary hero CTA preserves `data-conversion-action="phone-click"`.
- Secondary hero CTA remains visible for planned work and now reads `Send Photos & Get a Quote`.
- Secondary hero CTA preserves the ServiceM8 booking URL and `data-conversion-action="quote-click"`.

## Preserved

- Google Ads tag `AW-18165545331`.
- Phone conversion attribute.
- Quote conversion attribute.
- Google Rating section.
- NSW licence, ABN, Open Cabler Registration and ARCtick proof.
- Ausgrid & Endeavour Energy Accredited Level 2 ASP wording.
- Existing routes and response-time mapping.

## Validation Result

- `npm.cmd run audit:metadata` passed with 995 rows and 0 warnings.
- `npm.cmd run audit:links` passed with 19,965 internal links checked and 0 broken links.
- `npm.cmd run audit:visible-copy` passed with 995 pages and 0 warning rows.
- `npm.cmd run lint` passed.
- `npm.cmd run build` passed and generated 1002 static pages.
- Built homepage contains `Emergency electrical fault`, `Call now`, `0461 247 247`, `Planning electrical work` and `Send photos`.
- Built homepage contains `data-conversion-action="phone-click"` and `data-conversion-action="quote-click"`.
- Built homepage contains `AW-18165545331`.
- Built output risky wording scan found 0 matches for guaranteed arrival, 60 minutes anywhere, fake office/depot/review/rating wording, Level 1 or Level 3.

## Final Status

PASS
