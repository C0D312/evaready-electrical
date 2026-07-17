# Homepage Spelling and Human Copy Cleanup

Date: 17 July 2026
Scope: homepage (`/`) visible copy and homepage-visible shared labels

## Changes Made

- Replaced formal or robotic wording with direct Australian electrician language.
- Clarified when customers should call and when they should use the quote form.
- Reworded urgent-fault guidance to stay practical and safety-first without suggesting DIY electrical work.
- Fixed grammar in the homepage trust line and emergency response FAQ.
- Shortened service, trust, service-area, Google proof and final CTA headings and descriptions.
- Standardised Google controls to sentence case.
- Standardised the existing quote modal's accessible labels from "booking form" to "quote form".
- Simplified homepage-visible footer wording while retaining the mobile electrical service statement.

## Files Changed

- `app/page.tsx`
- `components/google-rating-seal.tsx`
- `components/quote-form-modal.tsx`
- `components/site-frame.tsx`

No routes, metadata, schema, service links, response mappings, offer data or page layouts were changed.

## Preserved Content and Behaviour

- Google Ads ID `AW-18165545331`
- Phone link `tel:+61461247247`
- Phone and quote conversion-action attributes
- Existing ServiceM8 quote URL and modal behaviour
- Sticky mobile Call Now / Get a Quote controls
- 60-minute core service area wording
- 90-minute greater region wording
- "Ausgrid & Endeavour Energy Accredited Level 2 ASP"
- Approved Google 5.0 rating and 83-review proof
- Homepage service and service-area links
- One homepage H1: "Emergency Electrician Sydney"

## Validation

- `npm.cmd run audit:metadata`: PASS, 999 rows, 0 warnings
- `npm.cmd run audit:links`: PASS, 20,104 internal links checked, 0 broken
- `npm.cmd run audit:visible-copy`: PASS, 999 pages, 0 warnings
- `npm.cmd run audit:page-health`: PASS, 999 routes, 0 critical issues
- `npm.cmd run lint`: PASS
- Production build with the GitHub Pages base path: PASS, 1,003 static pages
- AI-fluff homepage grep: no matches
- Exact stale/risky homepage wording grep: no matches
- Required tracking, ServiceM8, response-time, Level 2 and Google proof markers: present

The HTML-dependent link, visible-copy and page-health audits were rerun after the clean production build so that their final results covered the generated output.

## Deployment

Deployment and public URL verification are recorded in the final task result after the source commit is published.
