# Services Index Lead Generation and SEO Audit

> Current status (2026-08-08): This audit records the June 2026 component inventory. `components/google-review-proof.tsx` was removed in commit `aec94c7`; references below are historical.

Date: 2026-06-14

Scope: audit only. No source, CSS, copy, route, metadata, schema, build or deployment changes were made.

Page audited:

- https://c0d312.github.io/evaready-electrical/services/

Source inspected:

- `app/services/page.tsx`
- `app/services/[slug]/page.tsx`
- `data/service-pages.ts`
- `data/internal-links.ts`
- `components/site-frame.tsx`
- `components/credential-badges.tsx`
- `components/service-credential-strip.tsx`
- `components/trust-process-proof.tsx`
- `components/google-rating-card.tsx`
- `components/google-review-proof.tsx`
- `lib/seo-metadata.ts`
- `lib/schema.ts`
- `app/globals.css`

## Current Live Page Status

- HTTP status: 200
- Title: `Electrical Services Sydney | Emergency, Level 2 & Switchboards`
- Meta description: `Licensed electrical services for emergency faults, Level 2, switchboards, homes, businesses and strata across Sydney and surrounding regions.`
- H1: `Electrical Services Sydney & Surrounding Regions`
- Visible word count: 2,697
- Google Ads tag `AW-18165545331`: present
- `data-conversion-action="phone-click"`: present
- `data-conversion-action="quote-click"`: present
- Call Now CTA: present
- Get a Quote CTA: present
- Google Rating/review proof: present and styled
- Schema types present: `Electrician`, `Service`, `OfferCatalog`, `BreadcrumbList`
- Fake aggregate rating/review schema: absent
- Stale strings found on live page: no
- Risky claims found on live page: no

## Above-The-Fold And Lead Routing

The services index has a clear commercial H1 and a useful emergency/planned split near the top:

- Emergency fault: users are told to call for no power, burning smells, sparking, repeated safety-switch tripping, switchboard faults, storm damage or unsafe electrical equipment.
- Planned work: users are told to choose the closest service below and send photos, job notes and access details for review.

The page also includes visible proof near the top:

- `60-minute emergency response in core service areas`
- `90-minute emergency response for greater regions`
- `Ausgrid & Endeavour Energy Accredited Level 2 ASP`
- `Call first for urgent electrical faults`
- `Send photos and job details for planned work`

Call Now and Get a Quote are both present and tracked. The main improvement opportunity is mobile priority: the first in-page Call Now and Get a Quote buttons are visible near the bottom of the first mobile viewport rather than very high in the hero. The sticky CTA helps, but the page could still make the call path faster for urgent visitors.

## Service Routing

High-value services are prioritised in the `Most requested` section:

- Emergency Electrician
- Level 2 Electrician
- Switchboard Upgrades
- Electrical Fault Finding
- Consumer Mains
- Defect Notice Repairs
- Point of Attachment Repairs
- Hot Water System Electrical
- Air Conditioning
- CCTV & Security Cameras
- Commercial Electrician
- Safety Switches & RCDs

The full service catalogue appears below the high-intent section. This gives strong coverage, but the page is long and dense on mobile because it includes roughly 60 card/article elements and many service links.

## Link Checks

- Internal links checked on the live services page: 57
- Learn more / service-card links checked: 56
- Broken internal links found: 0
- Empty `href="#"` links found: 0
- `javascript:` links found: 0
- `localhost` links found: 0

Every service-card link checked resolved successfully, including high-intent links for emergency, Level 2, switchboards, consumer mains, defect notices, point of attachment, fault finding, hot water, air conditioning, CCTV/data and commercial work.

## Mobile Checks

Mobile widths checked on the live page:

- 360 x 800
- 390 x 844
- 412 x 915
- 430 x 932

Results:

- H1 visible: yes
- Call Now visible: yes
- Get a Quote visible: yes
- Horizontal overflow: no
- Content wider than viewport: no
- Clipped sampled cards: 0
- Google Rating/proof visible: yes
- Main issue: mobile density, not a critical visibility bug

No critical mobile layout failure was found. The page is readable and does not show horizontal overflow at the requested widths.

## Current Strengths

- Strong service-index title and meta description with emergency, Level 2, switchboards and Sydney intent.
- H1 is clear and matches the page purpose.
- Emergency users are directed to call first.
- Planned-work users are directed to choose a service and send photos/details.
- High-value services are correctly near the top.
- Level 2, consumer mains, defect notices, switchboards and fault finding are easy to find.
- Google Rating proof appears and is styled, not floating raw text.
- 60-minute and 90-minute response proof appears without changing response-time mapping.
- Ausgrid & Endeavour Energy Accredited Level 2 ASP proof appears.
- Call Now and Get a Quote CTAs are visible and conversion attributes remain.
- Metadata and schema are clean and compliance-safe.
- No fake review/rating schema was found.
- No fake office, depot or guarantee wording was found.

## Lead-Generation Issues Found

- The services page is strong for planned routing, but urgent users still see a fairly information-heavy hero before the service grid.
- On mobile, the first in-page Call Now/Get a Quote buttons sit low in the first viewport. The sticky CTA reduces the risk, but a future conversion pass could move or duplicate the emergency CTA slightly higher.
- The full service catalogue is comprehensive but long. Users with a specific urgent need may benefit from compact category jump links or filters before the full grid.
- Some service-card copy is necessarily dense because each card includes several inclusions. This is useful for SEO but can slow decision-making on mobile.

## SEO Issues Found

- No critical SEO issue found.
- The page uses an `OfferCatalog` and service schema safely.
- Breadcrumb schema is present.
- The title is within practical length and includes `Emergency`, `Level 2`, `Switchboards` and `Sydney`.
- The meta description is within practical length and includes licensed services, emergency faults, Level 2, switchboards, homes/businesses/strata and Sydney/surrounding regions.
- Maintenance risk: the services index card data is locally composed in `app/services/page.tsx` while detailed service pages live in `data/service-pages.ts`. This is not broken, but it means future route/order changes should be kept in sync carefully.

## Trust And Response Proof

Missing trust/response proof: no.

Present on the services index:

- Google Rating/review proof
- NSW licence and business proof through shared trust components
- 60-minute emergency response in core service areas
- 90-minute emergency response for greater regions
- Ausgrid & Endeavour Energy Accredited Level 2 ASP proof
- Call-first emergency triage wording
- Planned-work photos and job-details guidance
- Call Now and Get a Quote CTAs with tracking

## Stale And Risky String Checks

Stale strings found: no.

Checked in source and live output:

- `Request a Booking or Quote`
- `Request Quote`
- `sparking.For`
- `ASP Level 2 electrical work`
- `Business Details`
- `Area service coverage`

Risky claims found: no.

Checked:

- `guaranteed arrival`
- `60 minutes anywhere`
- `local depot in`
- `office in`
- `fake review`
- `fake rating`
- `Level 1`
- `Level 3`

Detector strings may exist inside audit scripts elsewhere in the repository, but they were not found as public-facing services index copy.

## Recommended Fix Order

1. Move or duplicate the primary Call Now CTA slightly higher on mobile, ideally directly after the emergency/planned split.
2. Add compact category jump links before the full service catalogue: Emergency, Level 2, Switchboards, Fault Finding, Hot Water/Air Conditioning, CCTV/Data, Commercial.
3. Consider a condensed mobile presentation for the full service catalogue so users can scan faster.
4. Keep deriving link targets from verified service routes; avoid adding any new route without sitemap/generated-route confirmation.
5. Longer-term, consider centralising the services index card data with `data/service-pages.ts` to reduce maintenance drift.

## Final Ratings

- SEO: 9/10
- Lead generation: 8/10
- Service routing: 9/10
- Trust: 9/10
- Mobile: 8/10

Final audit result: PASS WITH IMPROVEMENT NOTES
