# Homepage Lead-Generation and SEO Audit

Date: 2026-06-14

Scope: homepage audit only. No source, copy, CSS, metadata, schema, route, build or deploy changes were made.

Live page inspected: https://c0d312.github.io/evaready-electrical/

## Evidence Checked

- Live homepage returned HTTP 200.
- Live title: `Emergency & Level 2 Electrician Sydney | 60-Min Response`
- Live meta description: `Emergency electrician in Sydney with 60-minute core response, 90-minute greater region response and accredited Level 2 ASP support.`
- Live H1: `Emergency & Level 2 Electrical Help in Sydney & Surrounding Regions`
- Live page contains `Google Rating`, `60-minute`, `90-minute`, `AW-18165545331`, `tel:+61461247247`, `data-conversion-action="phone-click"` and `data-conversion-action="quote-click"`.
- Live page does not contain `Request a Booking or Quote`, `sparking.For`, `ASP Level 2 electrical work`, Level 1 / Level 3 wording, fake office/depot wording, fake review/rating wording or guarantee wording.
- Playwright render check passed at 390x844 and 1366x768 with visible H1, no horizontal overflow and no stale/risky text.
- Mobile CTA check found 12 phone links with 11 visible, and 10 quote links with 9 visible. The hidden items are header/alternate layout instances; the mobile sticky CTA is visible.

## Current Homepage Strengths

- Strong above-the-fold intent: the hero immediately names emergency and Level 2 electrical help, Sydney and surrounding regions, 24/7 urgent faults, 60-minute core response and 90-minute greater-region response.
- Clear emergency conversion path: red phone CTAs appear in the hero, issue selector, quote section, why-choose section, FAQ and mobile sticky bar.
- Clear planned-job quote path: blue quote CTAs appear in the hero, issue selector, quote panel, why-choose section, FAQ and mobile sticky bar.
- Good call-vs-quote education: the hero, lead offer, trust/process proof, quote panel and FAQ repeatedly explain that unsafe urgent faults should start with a phone call, while planned work should use photos and job notes.
- Strong trust proof: the homepage includes Google review proof, Google Rating card, NSW licence, ABN, Open Cabler registration, ARCtick licence and Accredited Level 2 ASP wording.
- SEO metadata is focused and concise: the homepage title targets Emergency, Level 2, Electrician, Sydney and 60-minute response. The description is under normal search-snippet limits and includes emergency, 60-minute, 90-minute and Level 2 ASP terms.
- Internal links are strong: the page links to emergency, Level 2, switchboards, fault finding, power/lighting, commercial work, fault guides, all services and service areas.
- Schema is compliance-conscious: Electrician, FAQ and Breadcrumb schema are present; no fake aggregateRating or Review schema is used.

## Lead-Generation Issues Found

1. CTA wording is good but slightly mixed.
   - Source areas: `app/page.tsx`, `components/site-frame.tsx`, `components/mobile-sticky-cta.tsx`, `data/site.ts`
   - Current variants include `Get a Quote`, `Request a Quote`, `Open Booking Form` and the historical concept of booking form language. None are stale failures, but conversion would be cleaner with one planned-work CTA phrase across the homepage.

2. The H1 is clear to humans but slightly softer than the highest-intent search wording.
   - Source area: `app/page.tsx`
   - Current H1 says `Electrical Help`; SEO/conversion intent would be stronger if it used `Electrician` directly, while preserving the existing emergency and Level 2 focus.

3. Google proof is strong, but not part of the hero itself.
   - Source areas: `app/page.tsx`, `components/google-review-proof.tsx`, `components/google-rating-card.tsx`
   - It appears high on the page after the emergency trust panel, and renders visibly, but an ultra-compact rating proof in or beside the hero could improve first-screen confidence.

4. Some FAQ wording is a little awkward.
   - Source area: `app/page.tsx`
   - Example: `power outages and circuit tripping and burning smells` reads repetitive. This is not a compliance or stale-copy failure, just polish.

## SEO Issues Found

1. H1 keyword alignment can be tightened.
   - Source area: `app/page.tsx`
   - Title metadata uses `Electrician Sydney`, while H1 uses `Electrical Help`. This is acceptable but not maximally aligned.

2. Homepage schema telephone uses the display number.
   - Source area: `lib/schema.ts`
   - `telephone` is set from `business.phoneDisplay`. It is visible and human-friendly, but schema is usually cleaner with the E.164 value already available as `tel:+61461247247`.

3. No aggregateRating / Review schema is present.
   - Source areas: `lib/schema.ts`, `components/google-rating-card.tsx`
   - This is correct under the current owner constraints because ratings are manually displayed and not schema-asserted. It is an SEO limitation, not a defect.

4. Service-area language is broad.
   - Source areas: `app/page.tsx`, `data/site.ts`
   - The homepage correctly says Sydney and surrounding regions, but a searcher landing cold may need one more prominent path into suburb/service-area search if they are checking whether their exact suburb is covered.

## Mobile Issues Found

1. No critical mobile failure found in the live render check.
   - 390x844: H1 visible, sticky CTA visible, Google proof visible, no horizontal overflow, stale/risky text absent.

2. Header CTAs are intentionally layout-dependent on mobile.
   - Source areas: `components/site-frame.tsx`, `components/mobile-sticky-cta.tsx`, `app/globals.css`
   - One header phone/quote instance is hidden at mobile widths, but the sticky CTA provides the visible mobile conversion path. This is acceptable.

3. CSS maintainability risk is high.
   - Source area: `app/globals.css`
   - The homepage/mobile rules have many repeated overrides and `!important` blocks around header, hero image, sticky CTA and Google proof. The current live check passes, but future edits are more likely to regress mobile layout unless these rules are consolidated carefully.

## Exact Sections / Files To Improve

- `app/page.tsx`
  - Hero H1 wording.
  - CTA wording consistency across hero, issue selector, quote section, why-choose section and FAQ.
  - FAQ grammar polish.
  - Optional hero-level compact Google proof.

- `components/site-frame.tsx`
  - Header CTA wording and mobile/desktop consistency.

- `components/mobile-sticky-cta.tsx`
  - Mobile sticky CTA wording consistency.

- `components/google-review-proof.tsx`
  - Optional tighter placement/summary if adding hero-level proof later.

- `components/google-rating-card.tsx`
  - No issue found; keep current external links and rel attributes.

- `components/trust-process-proof.tsx`
  - Strong call-vs-quote education; keep as a conversion asset.

- `components/credential-badges.tsx`
  - Strong hero proof; optional future enhancement is a compact Google proof badge.

- `components/service-credential-strip.tsx`
  - No homepage-specific issue found.

- `data/site.ts`
  - Central CTA wording constants.
  - Schema-friendly phone value is available via `phoneHref`.

- `data/internal-links.ts`
  - Strong service and fault clusters; no homepage blocker found.

- `lib/schema.ts`
  - Consider E.164 telephone output in schema if owner approves.

- `lib/seo-metadata.ts`
  - Metadata is strong; only revisit if H1/title alignment is tightened.

- `app/globals.css`
  - Consolidate repeated mobile/header/hero/sticky CTA overrides in a future CSS cleanup pass.

## Recommended Fix Order

1. Standardise planned-work CTA wording across homepage components.
2. Tighten the H1 to include `Electrician` while preserving emergency, Level 2 and Sydney intent.
3. Polish FAQ grammar and remove repetitive conjunctions.
4. Add or move a compact Google proof signal closer to the hero if the owner wants stronger first-screen trust.
5. Consolidate duplicate mobile CSS overrides only after visual regression coverage is in place.
6. Consider schema telephone formatting using the existing E.164 number, without adding review/rating schema.

## Final Audit Ratings

- Emergency calls: 9/10
- Planned quotes: 8/10
- SEO: 8/10
- Trust: 9/10
- Mobile conversion: 8/10

## Final Audit Result

The homepage is launch-capable from a lead-generation and SEO standpoint. No stale wording, risky claims, missing tracking, broken critical CTA path or critical mobile visibility issue was found in this audit. The main opportunities are conversion polish, H1 keyword alignment and future CSS maintainability.
