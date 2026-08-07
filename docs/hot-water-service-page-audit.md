# Hot Water Service Page Audit

> Current status (2026-08-08): This audit records the June 2026 implementation. `components/google-review-proof.tsx` was removed in commit `aec94c7`; it is not active source.

Date: 2026-06-14

Page audited: https://c0d312.github.io/evaready-electrical/services/hot-water-system-electrician-sydney/

Scope: audit only. No copy, CSS, route, metadata, schema, build or deployment changes were made.

## Files Inspected

- `data/service-pages.ts`
- `app/services/[slug]/page.tsx`
- `components/service-credential-strip.tsx`
- `components/trust-process-proof.tsx`
- `components/google-rating-card.tsx`
- `components/google-review-proof.tsx`
- `lib/seo-metadata.ts`
- `lib/schema.ts`
- `data/internal-links.ts`
- `app/globals.css`

No dedicated `app/services/hot-water-system-electrician-sydney` route folder exists; the page is generated through the shared dynamic service template.

## Live Checks

- Live URL returned HTTP 200.
- Mobile widths checked with Playwright: 360, 390, 412 and 430.
- H1 visible at all checked mobile widths.
- Call Now and Get a Quote CTAs visible at all checked mobile widths.
- No horizontal overflow detected at any checked mobile width.
- Sticky CTA did not overlap the footer in the checked mobile runs.
- Google proof text was present in the live page text.
- 26 same-origin links on the page were checked from the live site; all returned HTTP 200.
- Google Ads tag and phone/quote conversion attributes were present in live HTML.

## Current Strengths

- H1 is clear and service-specific: "Hot Water System Electrician Sydney & Surrounding Regions".
- The hero copy correctly frames the page around electric hot water faults and states that Evaready checks the electrical side of the system.
- Above the fold includes both primary phone and secondary quote CTAs using the approved shared phone and booking constants.
- The page gives urgent call-first guidance for heat, smoke, sparking, burning smell, shock risk and power loss.
- Planned quote guidance is present in the process, quote details section and FAQ, including photos of the unit, isolator, switchboard, model label and visible damage.
- The electrician/plumber boundary is clear enough in current copy: source and live content talk about supply, circuits, isolators, thermostats, elements, wiring and heat pump electrical support.
- No inspected source text mentions plumbing, plumbers, gas or gas fitting.
- FAQPage, Service, Electrician and BreadcrumbList schema are generated through the shared service template.
- Internal routing is solid. The page links to emergency, Level 2, switchboard upgrades, service areas, fault finding, safety switch support and air conditioning/heat pump support.
- Google Rating/proof is present through the shared commercial-page proof component.
- Licence/ABN/process proof is present through the shared trust sections.
- Mobile layout is currently clean in the checked widths.

## Lead-Generation Issues Found

- Response-time proof is missing on this page. The live HTML does not contain visible "60-minute" or "90-minute" wording, because the service template only renders the explicit response-time paragraph for Level 2 response-service slugs.
- CTA wording is mostly good, but secondary link labels inside the service cards use "Open Booking Form" while the primary CTA uses "Get a Quote". This is not a stale-string failure, but it is less consistent for planned-job conversion.
- The hot-water page is treated as a non-urgent service in the hero job cards, so all common-job cards route to the quote form. The page does include a separate urgent-call panel, but urgent no-hot-water electrical faults could be made more immediately call-first without redesigning the page.

## SEO Issues Found

- Metadata is clean and within practical length:
  - Title: "Hot Water Electrician Sydney | Circuits & Isolators"
  - Description: "Hot water electrician in Sydney for no hot water and circuit tripping, isolators, thermostat checks and heat pump electrical support."
- The current FAQ is useful but light. It should be expanded in a future fix to cover:
  - electrical-side-only scope versus plumbing/gas work
  - when no hot water should be treated as urgent
  - whether to call or request a quote
  - response-time wording for emergency electrical call-outs
  - what access/photos/documents to send
- The page does not show the exact "Ausgrid & Endeavour Energy Accredited Level 2 ASP" proof. That is not necessarily required for a hot-water page, but if hot-water faults can involve supply-side work, a compact Level 2 trust line would improve confidence.

## Trust Proof Missing

Partially.

The page includes Google proof, NSW licence, ABN, ARCtick and process proof. It does not display the exact Ausgrid & Endeavour Energy Accredited Level 2 ASP wording on the hot-water page.

## Response-Time Proof Missing

Yes.

The live page does not contain visible 60-minute or 90-minute emergency response wording. If added later, it should use the approved non-guaranteed structure and must not change the existing response-time mapping.

## Electrician / Plumber Boundary Clear

Yes.

The current copy is framed around electrical-side hot water work: supply, circuit, isolator, thermostat, element, safety switch behaviour, wiring and heat pump electrical support. No plumbing or gas-scope wording was found in the inspected source set.

## Mobile Issues Found

No blocking mobile issues found.

Playwright checks at 360, 390, 412 and 430 widths found:

- H1 visible.
- Body content visible.
- Call and quote CTAs visible.
- Google proof text present.
- No horizontal overflow.
- No sticky CTA footer overlap.
- No stale/risky wording in rendered text.

## Stale Strings Found

No.

The live HTML did not contain:

- "Request a Booking or Quote"
- "Request Quote"
- "sparking.For"
- "ASP Level 2 electrical work"
- "Business Details"
- "Area service coverage"

## Risky Claims Found

No.

The live HTML did not contain:

- "guaranteed arrival"
- "60 minutes anywhere"
- "office in"
- "local depot in"
- "fake review"
- "fake rating"
- "Level 1"
- "Level 3"

## Recommended Fix Order

1. Add compact, non-guaranteed 60/90 emergency response wording to the hot-water service page template or service data where appropriate.
2. Standardise service-card quote labels from "Open Booking Form" to "Get a Quote" or another approved quote-focused label.
3. Strengthen hot-water urgent triage copy near the top so heat, smoke, burning smell, repeated safety-switch tripping and unsafe electrical symptoms clearly route to phone first.
4. Expand the FAQ and matching FAQ schema to answer electrical-side scope, plumbing/gas boundary, call-versus-quote, response timing and photo/access details.
5. Consider adding a compact Level 2 ASP proof line only where it is relevant to hot-water supply-side or switchboard/load issues, without implying every hot-water job is Level 2.

## Ratings

- SEO: 8/10
- Emergency lead conversion: 7/10
- Planned quote conversion: 8/10
- Trust: 8/10
- Mobile: 9/10

## Final Audit Result

PASS for audit-only readiness, with improvement opportunities around response-time proof, CTA wording consistency and FAQ depth.
