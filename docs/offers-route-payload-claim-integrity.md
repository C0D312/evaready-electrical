# Offers Route, Payload and Claim Integrity

Audit date: 8 August 2026 (Australia/Sydney)

Branch: `codex/responsive-ux-overhaul`

Build target: GitHub Pages preview export with base path `/evaready-electrical`

## Result

The pre-change production export placed the complete four-offer showcase, its four artwork images and an offer-level Google rating widget on all 1,001 indexable routes. This was measured from the generated HTML, not inferred from source imports.

The corrected export limits the full showcase to four high-intent routes:

1. `/`
2. `/services/`
3. `/emergency-electrician-sydney/`
4. `/services/switchboard-upgrades-sydney/`

All 929 location routes now contain one page-local `View current offers and terms` link and no full showcase:

- 1 Service Areas index
- 16 region routes
- 39 area routes
- 873 suburb routes

The remaining informational routes use the existing global footer link instead of repeating a page-local offer block.

## Exact Route Distribution

| Generated-page measure | Before | After |
| --- | ---: | ---: |
| Indexable sitemap routes checked | 1,001 | 1,001 |
| Routes containing all four offer cards | 1,001 | 4 |
| Routes requesting offer artwork | 1,001 | 4 |
| Routes containing a Google rating widget | 1,001 | 5 |
| Rendered Google rating widget instances | 1,002 | 5 |
| Routes with a compact link and no full showcase | 0 | 997 |
| Location routes with a page-local compact link | 0 | 929 |
| Location routes containing the full showcase | 929 | 0 |

The fifth post-change Google rating route is `/about/`, where the rating seal remains as separate business proof. Before the correction, About contained both its own seal and the duplicated offer seal, so the old export had 1,002 rendered instances across 1,001 routes. The corrected export has five instances across five routes.

## Representative Payloads

HTML byte counts are raw exported file sizes. Request counts are unique static `<script src>` and `<img src>` references in each generated page. CTA counts cover Call and Quote actions inside `<main>`.

| Route | HTML before | HTML after | Change | Scripts before/after | Images before/after | Call CTAs before/after | Quote CTAs before/after |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 231,445 | 231,445 | 0 | 10 / 10 | 10 / 10 | 3 / 3 | 2 / 2 |
| `/services/` | 424,740 | 424,740 | 0 | 10 / 10 | 10 / 10 | 2 / 2 | 2 / 2 |
| `/emergency-electrician-sydney/` | 331,023 | 331,023 | 0 | 10 / 10 | 10 / 10 | 5 / 5 | 3 / 3 |
| `/services/switchboard-upgrades-sydney/` | 306,419 | 306,419 | 0 | 10 / 10 | 10 / 10 | 2 / 2 | 2 / 2 |
| `/level-2-electrician-sydney/` | 312,098 | 291,334 | -20,764 | 10 / 9 | 10 / 6 | 2 / 1 | 2 / 1 |
| `/service-areas/` | 324,641 | 306,137 | -18,504 | 10 / 10 | 10 / 6 | 2 / 1 | 2 / 1 |
| `/electrical-faults/no-power-in-one-room/` | 221,765 | 200,971 | -20,794 | 10 / 9 | 9 / 5 | 4 / 3 | 4 / 3 |
| Panania suburb | 276,934 | 256,170 | -20,764 | 10 / 9 | 10 / 6 | 3 / 2 | 3 / 2 |

The removed CTA pair belonged to the duplicated offers block. Every representative page still retains at least one prominent Call and one prominent Quote pathway.

## Terms and Claim Integrity

All four complete cards continue to render from `data/offers.ts`. The shared native `details` control is labelled `View offer terms`; it exposes each offer's eligibility, complete exclusions and the shared non-stacking rule without requiring JavaScript.

Owner verification remains required before launch for:

- `Licensed & Insured` in the $50 artwork
- `24/7 Electrical Service` in the $50 artwork
- Free Electrical Safety Inspection eligibility, limits and artwork wording
- $50 online-booking eligibility and exclusions
- 15% first emergency-service eligibility and exclusions
- 20% pensioner, senior and veteran eligibility, accepted identification and exclusions
- The live Google rating and review count

No offer value, eligibility rule or exclusion was changed in this task. No insurance, availability, pricing or guarantee claim was strengthened.

## Validation

- Lint: pass
- TypeScript: pass
- Production export: pass, 1,005 static pages
- Sitemap offer distribution: 1,001 routes, zero failures
- Claims and schema: 3,112 JSON-LD blocks, zero failures
- Suburbs: 873/873, zero warnings
- Internal links: 20,143 checked across 1,004 known routes, zero broken
- Metadata: 1,001 routes, zero warnings
- Visible copy: 1,001 routes, zero warnings
- Page health: 1,001 routes, zero critical warnings
- Response classifications: 873, zero mismatches
- Exported links and CTAs: 131,186 rows, zero failures
- Offer Playwright checks: 12/12 passed at 390px and 1440px
- Focus, landmarks and navigation Playwright checks: 6/6 passed at 390px and 1440px
