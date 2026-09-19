# Suburb editorial batch 01

Status: validated feature-only batch; not published. Review date:
20 September 2026. No business, credential, serviceability or indexation hold is
cleared by this document. This is an editorial sample, not a commercial ranking.

## Research and limits

| Page | Verified local context | Public primary source |
| --- | --- | --- |
| Bankstown | 58.5% flats/apartments | [ABS SAL10181](https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10181) |
| Panania | 70.7% separate houses | [ABS SAL13155](https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL13155) |
| Padstow | 67.6% separate; 26.0% semi-detached/row/terrace/townhouse | [ABS SAL13131](https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL13131) |
| Parramatta | 85.6% flats/apartments | [ABS SAL13167](https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL13167) |
| Bondi Junction | 64.9% flats/apartments; 23.7% semi-detached/row/terrace/townhouse | [ABS SAL10465](https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10465) |

Denominator: 2021 Census occupied private dwellings, excluding visitor-only and
other non-classifiable households, suburb/locality geography. These are historical
housing figures, not current defects, building ages, job evidence or ownership
boundaries. No demographic or personal data is used. A Revesby search found a
different statistical geography, so no unsupported suburb statistic was used.

Safety and responsibility references:

- [NSW electrical safety in the home](https://www.nsw.gov.au/housing-and-construction/safety-home/electrical-safety/electrical-safety-home): licensed electrical work and condition assessment.
- [NSW strata repairs and maintenance](https://www.nsw.gov.au/housing-and-construction/strata/living/repairs-and-maintenance): contact the appropriate property representative and check the scheme's documents where responsibility is uncertain.

The practical planning copy is independently written, conditional customer
guidance. Census figures do not establish that a specific service is required.
Service offerings remain bounded by the site's existing qualified scope. No
project, local office, testimonial, response guarantee or credential was invented.

## Implementation

Five route-keyed records in `data/suburb-editorial.ts` are used only by the
server-rendered suburb template. The shared emergency, Level 2 and enquiry FAQs,
safety-before-CTA block, destinations, hierarchy, metadata and indexation remain.
The first and final FAQ and service description are replaced for these five only;
visible descriptions and FAQ data feed the existing schema builders directly.
Three unframed guidance groups use a nested reading column. Its 768px maximum
does not expand with the root font size; this keeps enlarged text away from the
bright outer artwork while allowing natural wrapping on narrow screens. Existing
utility classes provide spacing. No media, dependency, controller, header,
background, shared stylesheet or client-component change is included.

The other 868 suburb outputs must retain their main content and metadata.
All 873 routes are measured by the predeclared seven-word coverage method in
`suburb-editorial-originality-method.md`; a percentage is not a Google requirement
or a substitute for meaningful editorial review. The five measured scores range
from 36.715% to 37.484% against their closest other suburb output and from 37.958%
to 38.506% against their prior template. The remaining 868 still need individual
editorial work. No route is marked published here.

## Validation and limits

- Production export: 7,152 files and 1,004 HTML outputs. Only the five selected
  pages change public markup. All 999 other HTML outputs, all header/footer and
  metadata contracts, JavaScript/CSS bodies, artwork, robots, sitemap and the
  service-area search index match the baseline. Only the exact build-ID manifest
  directory names are normalised for JavaScript path comparison.
- Chrome 153.0.8010.48: 45 responsive/text states across all five pages. Normal
  text uses 320, 412, 768, 1440 and 2560px; simulated 200% root text uses 320, 412,
  768 and 1440px. No page/text overflow, missing header images or FAQ count errors.
- Ten shared-interface journeys pass Quote Back/focus restoration, mobile-menu
  focus and background-scroll locking, Escape restoration, natural client
  navigation and Back/Forward. Twenty additional keyboard cases reach the new
  source link naturally with visible unobscured focus, then use Enter/Back on an
  internal service link. The external source link is not activated during tests.
- Ten focused Axe scans have no violations but retain image-background
  colour-contrast incomplete results. Separate conservative pixel checks pass
  25 normal-text and 20 enlarged-text states; the minimum ratios are 5.006:1 and
  5.113:1 respectively. The check samples every text-range background pixel with
  the computed opaque foreground and gives no credit for text shadows.
- All four final browser runs reconcile requests with zero unauthorised forwards
  and zero third-party delivery. Existing fail-closed proxy and reader remain
  unchanged. No genuine form submission or conversion is performed.
- Lint, TypeScript and the existing audit suite pass. The committed progress
  ledger is also regression-tested against the current export and source hashes.
- The extra useful copy adds 1,672-1,764 Brotli-quality-5 HTML bytes per affected
  page. No JavaScript/CSS bytes or requests are added. This is not a speed gain;
  no new performance matrix or mobile target pass is claimed.

Earlier three-column and rem-expanded layouts failed contrast. They remain
preserved as rejected evidence; they are not counted as final acceptance. The
correction is limited to the new nested reading column. A pre-click FAQ scroll
was naturally centred when the sticky CTA covered the target; the same hit-test
assertion remained in force, with no forced clicks. An initial cancelled-prefetch
reconciliation failure remains invalid. TypeScript narrowing and an outdated
publication-count test were repaired without loosening historical row contracts.

This is focused Chromium evidence, not a fresh whole-site cross-browser review.
Business, credential, serviceability, local job evidence, priority and indexation
holds remain. Exact evidence digests and all 873 editorial states are recorded in
`reports/suburb-editorial-progress.json`; full local diagnostics are not published.
