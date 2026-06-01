# Copy QA Summary

Date: 2026-06-01

## Scope

Reviewed shared page templates, service copy data, generated suburb-copy reporting, metadata reporting, internal-link reporting and static export output for visible copy quality across the site.

Covered page families:

- Homepage
- Emergency electrician page
- Level 2 electrician page
- Services index
- Generated service pages
- Electrical fault index and generated fault pages
- Service-area index
- Generated region pages
- Generated area pages
- Generated suburb pages

## Files Changed

- `components/service-credential-strip.tsx`
- `components/quote-request-panel.tsx`
- `components/quote-form-modal.tsx`
- `data/service-area-coverage.ts`
- `app/page.tsx`
- `app/electrical-faults/page.tsx`
- `app/emergency-electrician-sydney/page.tsx`
- `app/services/[slug]/page.tsx`
- `app/service-areas/[region]/page.tsx`
- `app/service-areas/[region]/[area]/[suburb]/page.tsx`
- `app/privacy-policy/page.tsx`
- `docs/copy-qa-summary.md`

## Copy Patterns Improved

- Standardised planned-work CTA wording around `Get a Quote`.
- Kept `Open Booking Form` for actions that specifically open the embedded booking flow.
- Standardised urgent phone actions around `Call Now`.
- Replaced remaining short-form `Clear next steps` wording with `Clear next steps before work begins`.
- Replaced public `quote form` wording with `booking form` where the user action opens the secure booking workflow.
- Reduced repeated "right next step" phrasing in high-visibility CTA sections.
- Cleaned ARCtick licence punctuation in generated suburb copy.
- Added explicit JSX spacing in emergency safety cards to prevent crawler/text extraction output such as `sparking.For fallen powerlines...`.

## Before And After Examples

- Before: `Request a Booking or Quote`
  After: `Request a Quote`

- Before: `Call now or request a quote.`
  After: `Call now or get a quote.`

- Before: `We will guide you to the right next step.`
  After: `We'll point you to the safest next action.`

- Before: `Clear next steps`
  After: `Clear next steps before work begins`

- Before: `open the quote form`
  After: `open the booking form`

- Before: inconsistent ARCtick punctuation in generated suburb copy.
  After: supplied ARCtick licence wording is used consistently in public copy.

## Claims Left Unchanged

- `Open 24/7` and urgent fault wording remains because it is already used in business/site data.
- Electrical Licence `398937C`, ABN `44 650 697 797`, Open Cabler Registration `46691`, and ARCtick licence `L157323` remain as supplied business credentials.
- No stronger ASP accreditation wording was added without stored proof in the repo.
- No guaranteed response-time, cheapest-price, review/rating, warranty, fully insured, or same-day guarantee claims were added.

## Validation Results

- `npm run audit:suburbs`: passed. Audited 873 suburb pages, 0 warning rows, 0 duplicate URL issues.
- `npm run audit:metadata`: passed. Wrote 980 rows, 0 warnings.
- `npm run audit:links`: passed. Checked 16,258 internal links against 982 known routes, 0 broken links.
- `npm run lint`: passed.
- `npm run build`: passed. Static export generated 985 pages, including `robots.txt` and `sitemap.xml`.
- Static output scan: no matches found for the known bad copy patterns checked, including `sparking.For`, `Request a Booking or Quote`, `quote form`, `ServiceM8`, `trust signals`, `people search for`, or `Greater Regions`.
