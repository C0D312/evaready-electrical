# Final Header, CTA and Quote Popup Live QA

## Scope

- Mobile header: logo and hamburger only.
- Desktop header: logo, navigation, Call Now and Get a Quote.
- Sticky mobile CTA: Call Now and Get a Quote.
- Quote popup: emergency Call Now button and close control.

## Correction

The live QA found that the desktop header still collapsed to the hamburger layout at 1280px. The shared header CSS now switches the full desktop header on from 1280px, while mobile and tablet widths up to 1279px retain the logo + hamburger-only header.

## Local Validation

- `audit:suburbs`: pass, 873 suburb pages, 0 warnings.
- `audit:metadata`: pass, 0 warnings.
- `lint`: pass.
- `build`: pass, 1003 static pages generated.
- `audit:all-suburb-copy`: pass, 873 generated suburb pages checked, 0 warnings.
- `audit:links`: pass, 0 broken links.
- `audit:visible-copy`: pass, 0 warnings.
- `audit:page-health`: pass, 0 critical warnings.
- `audit:response-times`: pass, 0 hard mismatches.
- `audit:live-links-and-ctas`: pass, 0 broken links and 0 CTA failures.
- `audit:visibility`: pass, 1002 routes checked, 0 critical issues.

## Output Checks

- Stale/risky public wording: no matches.
- Google Ads marker `AW-18165545331`: present.
- Phone/quote conversion markers: present.
- `tel:+61461247247`: present.

## QA Result

- Mobile top Quote button: removed by shared mobile/tablet header contract.
- Mobile top Call Now button: removed by shared mobile/tablet header contract.
- Desktop header at 1280px and wider: corrected to show desktop navigation and CTAs.
- Quote popup emergency CTA: unchanged during this pass; previous modal checks showed no fit or close-button failures.

Live normal and cache-busted URL verification is completed after the gh-pages deployment and recorded in the final deployment response.
