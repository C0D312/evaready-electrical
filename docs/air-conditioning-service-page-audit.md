# Air Conditioning Service Page Audit

Date: 2026-06-15

Page audited: https://c0d312.github.io/evaready-electrical/services/split-system-air-conditioning-sydney/

Scope: audit only. No source copy, CSS, routes, metadata, schema, build output or deployment files were changed.

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
- `data/site.ts`
- `app/globals.css`

No standalone `app/services/split-system-air-conditioning-sydney` route folder exists; the page is generated from `data/service-pages.ts` through the shared service-page template.

## Live Page Checks

- Live HTTP status: 200
- H1 found: `Air Conditioning Electrician Sydney & Surrounding Regions`
- Title found: `Air Conditioning Electrician Sydney | AC Circuits`
- Meta description found: `Air conditioning electrician in Sydney for AC isolators, dedicated circuits, outdoor unit power, heat pump support and capacity checks.`
- Canonical found: `https://c0d312.github.io/evaready-electrical/services/split-system-air-conditioning-sydney/`
- Same-site links checked: 28
- Broken same-site links found: 0
- Schema types present: `Electrician`, `Service`, `FAQPage`, `BreadcrumbList`
- Phone conversion attribute present: yes
- Quote conversion attribute present: yes
- Google Ads tag present: yes

## Current Strengths

- The H1 is clear and directly targets the service and geography.
- Call Now and Get a Quote CTAs are present above the fold on mobile through the sticky CTA.
- The page gives useful service context: split-system air conditioning, AC isolators, dedicated circuits, outdoor unit power, heat pump support and switchboard capacity checks.
- ARCtick proof is present and phrased with restraint: `ARCtick Licensed - L157323` and `Licence L157323 for eligible air-conditioning, heat pump and related work.`
- The page avoids visible plumbing, gas fitting, fake office, fake depot, fake rating and guarantee claims.
- Google review proof is present, styled, and mobile-safe.
- Internal links include emergency electrician, Level 2 electrician, switchboard upgrades, electrical load capacity checks, hot water heat pump support and service areas.
- Same-site link destinations returned HTTP 200 in live checks.
- FAQ schema is present and appears to be generated from the visible FAQ content.

## Lead-Generation Issues Found

- Emergency air-conditioning electrical triage is present only as a generic `Urgent electrical issue?` block. It should be more specific for AC faults, such as tripped AC circuit, burning smell near an isolator, buzzing, sparking, water exposure, outdoor unit electrical fault, or repeated safety-switch tripping.
- Planned quote guidance is too general. The page asks for suburb, photos, access notes and a description, but it does not clearly tell users to send photos of the indoor/outdoor unit, isolator, switchboard, model label, proposed unit location, cable path, access notes and whether the job is new install, replacement or fault.
- Service card CTAs still use `Open Booking Form` in parts of the shared template. This is functional and not one of the stale strings in this audit, but it is less consistent than the current `Get a Quote` CTA standard.
- The page could better split `urgent electrical hazard = call now` from `planned AC electrical work = get a quote`.

## SEO Issues Found

- The title and description are clean, but the page could better cover high-intent terms such as `split system electrician`, `AC isolator`, `dedicated air conditioning circuit`, `air conditioner circuit tripping`, `switchboard capacity check` and `heat pump electrical supply` in visible structured sections.
- FAQ coverage is thin. It currently answers four questions; stronger SEO and lead filtering would cover electrician vs air-conditioning technician, ARCtick scope, when to call first, quote photos, dedicated circuits, isolators, safety switch tripping, switchboard/load capacity and Level 2 relevance.
- The page has Service schema and FAQPage schema, but FAQ depth is weaker than the recently upgraded high-intent pages.

## Trust Proof Missing

Trust proof missing: partial.

Present:
- NSW Electrical Licence 398937C
- ABN 44 650 697 797
- Open Cabler Registration 46691 in the shared trust/footer proof
- ARCtick Licensed L157323
- Google review proof
- General Level 2 electrical work proof in the shared trust block

Missing or weak:
- No compact proof block near the upper page for `60-minute emergency response in core service areas` and `90-minute emergency response for greater regions`.
- No air-conditioning-specific note explaining when Level 2 support may be relevant, such as load capacity, consumer mains, metering, defect notices or supply-side work affecting the job.

## Response-Time Proof Missing

Response-time proof missing: yes.

The live page does not show:
- `60-minute emergency response`
- `90-minute emergency response`

This should be added only as approved emergency response wording, without changing any response-time mapping and without implying all planned air-conditioning quotes receive emergency timing.

## Electrical / Air-Conditioning Technician Boundary

Electrical / air-conditioning technician boundary clear: partial.

Good:
- The page repeatedly frames the work as air-conditioning electrical support, AC isolators, dedicated circuits, outdoor unit power, switchboard capacity checks and heat pump electrical support.
- ARCtick wording is linked to eligible air-conditioning, heat pump and related work.
- The page says work is handled through appropriately licensed technicians.

Needs tightening:
- The phrase `air-conditioning services` could be read broadly. A future update should make the boundary clearer by saying Evaready handles electrical-side AC work and appropriately licensed air-conditioning work where eligible, while avoiding claims about unverified refrigeration, plumbing or gas work.

## Mobile Issues Found

Mobile issues found: no critical issues.

Viewports checked with Playwright:
- 360x800
- 390x844
- 412x915
- 430x932

Results:
- H1 visible above the fold: yes
- Call Now visible above the fold: yes
- Get a Quote visible above the fold: yes
- Horizontal overflow: no
- Meaningful card clipping: no
- Google proof visible and styled: yes
- FAQ visible: yes
- Sticky CTA overlaps footer: no
- Tap targets appear usable: yes

Browser network note:
- The live browser run saw several non-user-facing Next prefetch `.txt` requests returning 404. The actual same-site anchor URLs were checked separately and returned HTTP 200, so this is not counted as a broken-link failure for this page audit.

## Stale Strings Found

Stale strings found: no.

Checked in source and live visible content:
- `Request a Booking or Quote`
- `Request Quote`
- `sparking.For`
- `ASP Level 2 electrical work`
- `Business Details` as stale visible heading
- `Area service coverage`

No matches were found in public-facing source scan or live visible content.

## Risky Claims Found

Risky claims found: no.

Checked:
- `guaranteed arrival`
- `60 minutes anywhere`
- `office in`
- `local depot in`
- `fake review`
- `fake rating`
- `Level 1`
- `Level 3`
- `guaranteed cooling result`
- `guaranteed install approval`

No matches were found in public-facing source scan or live visible content.

## Internal Links

Current useful links:
- Emergency Electrician
- Level 2 Electrician
- Switchboard Upgrades
- Electrical Load & Capacity Checks
- Hot Water System Electrician
- Service Areas
- Fault finding and safety-related footer links

All 28 same-site links discovered on the live page returned HTTP 200.

Recommended improvement:
- Add a small contextual section or related-service block that directly routes users to emergency electrician, Level 2 electrician, switchboards, load capacity checks, hot water heat pump support and service areas without relying mainly on footer/navigation links.

## Recommended Fix Order

1. Add an air-conditioning-specific call-first block for urgent electrical hazards.
2. Add a planned quote checklist for AC electrical work and split-system support.
3. Clarify the electrical-side / appropriately licensed technician boundary without implying unverified refrigeration, plumbing or gas work.
4. Add compact response-time and trust proof using approved wording: `60-minute emergency response in core service areas`, `90-minute emergency response for greater regions`, and `Ausgrid & Endeavour Energy Accredited Level 2 ASP` where relevant.
5. Expand FAQ content and ensure FAQPage schema continues to match visible FAQ text exactly.
6. Standardise service-card CTA wording from `Open Booking Form` to `Get a Quote` where this does not disrupt the shared service-template UX.
7. Before adding `responseTrustProof` to this service, generalise the shared optional section heading in `app/services/[slug]/page.tsx`; it currently says `Trusted hot water electrical support without overclaiming.` and would be wrong for air-conditioning if reused as-is.

## Ratings

- SEO: 7/10
- Emergency lead conversion: 6.5/10
- Planned quote conversion: 7/10
- Trust: 7.5/10
- Mobile: 9/10

## Final Audit Result

PASS for current visibility, links, stale-string safety, risky-claim safety and mobile layout.

NEEDS IMPROVEMENT for air-conditioning-specific emergency triage, planned quote guidance, response-time proof, boundary clarity and FAQ depth.
