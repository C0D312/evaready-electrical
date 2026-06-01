# Evaready Electrical Release Checklist

Generated: 2026-06-01

## Checks Run

| Check | Result | Notes |
| --- | --- | --- |
| `npm run audit:suburbs` | Pass | 873 suburb pages audited, 0 warning rows, 0 duplicate URL issues. |
| `npm run audit:metadata` | Pass | 980 metadata rows audited, 0 warnings. |
| `npm run audit:links` | Pass | 16,258 internal links checked, 0 broken links, 982 known routes. |
| `npm run lint` | Pass | No lint errors or warnings after final canonical cleanup. |
| `npm run build` | Pass | 985 static pages generated, including `/sitemap.xml` and `/robots.txt`. |
| Static canonical check | Pass | 982 exported `index.html` files checked; 0 missing canonical tags outside `_not-found`. |
| Static route spot-check | Pass | 41 routes checked, including homepage, key service/fault pages, 3 region pages, 3 area pages and 24 suburb pages. |
| Phone CTA check | Pass | Sampled pages use `href="tel:+61461247247"`. The only other `tel:` value found is `tel:000` for emergency-services safety guidance. |
| Quote CTA check | Pass | Sampled pages include `data-quote-trigger="true"` and use the central ServiceM8 booking URL. |
| Business constants check | Pass | `data/site.ts` contains `phoneHref`, `phoneDisplay`, `callCta`, `bookingUrl`, licence `398937C`, ABN `44 650 697 797`, Open Cabler `46691` and ARCtick `L157323`. |
| Claim scan | Pass | No fake ratings, fake review schema, guaranteed response times, cheapest-price claims, fully-insured claims or strengthened ASP accreditation wording found. |
| TODO/FIXME scan | Pass | No production `TODO` or `FIXME` comments found in app, component, data, lib or script TypeScript files. |

## Critical Fixes Completed

- Fixed static canonical output by using absolute canonical URLs in Next metadata. The generated HTML now includes canonical tags for exported pages.
- Softened the hero credential badge from unverified "Accredited Level 2 ASP" wording back to compliance-safe "Level 2 Work" wording.

## Changed Files

Final validation pass changed:

- `app/layout.tsx`
- `lib/seo-metadata.ts`
- `components/credential-badges.tsx`
- `docs/release-checklist.md`

Generated or refreshed reports:

- `reports/suburb-page-audit.csv`
- `reports/metadata-audit.csv`
- `reports/internal-link-audit.md`

The broader SEO and lead-generation update already has existing local changes across app, component and data files. Review `git status --short` before committing.

## Spot-Checked Routes

Core pages:

- `/`
- `/emergency-electrician-sydney/`
- `/level-2-electrician-sydney/`
- `/service-areas/`
- `/services/consumer-mains-sydney/`
- `/services/defect-notice-repairs-sydney/`
- `/services/private-power-pole-sydney/`
- `/services/switchboard-upgrades-sydney/`
- `/electrical-faults/no-power-to-house/`
- `/electrical-faults/burning-smell-from-switchboard/`
- `/electrical-faults/safety-switch-keeps-tripping/`

Region pages:

- `/service-areas/canterbury-bankstown-and-inner-south-west/`
- `/service-areas/sutherland-shire/`
- `/service-areas/blue-mountains/`

Area pages:

- `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/`
- `/service-areas/sutherland-shire/sutherland-shire/`
- `/service-areas/wollongong-and-illawarra/wollongong/`

Suburb samples:

- Bankstown, Banksmeadow, Alfords Point, Abbotsbury, Bringelly, Burwood, Centennial Park, Auburn, Acacia Gardens, Agnes Banks, Gladesville, Allambie Heights, Berambing, Bombo, Alpine, Alison, Panania, Miranda, Katoomba, Parramatta, Manly, Wollongong, Gosford and Bowral.

All sampled routes had a generated file, canonical tag, phone CTA, quote trigger and expected Level 2 wording where applicable.

## Sitemap And Robots

- `/out/sitemap.xml` exists and uses `https://c0d312.github.io/evaready-electrical` URLs.
- `/out/robots.txt` exists and points to `https://c0d312.github.io/evaready-electrical/sitemap.xml`.
- Metadata audit reports 0 missing canonical warnings.

## Remaining Warnings

- `npm run build` prints a Node dependency/tooling warning: `[DEP0205] module.register() is deprecated`. The build still completes successfully.
- `docs/` appears to be excluded from Git status in this workspace, so this checklist may need explicit handling if it should be committed later.
- Visual/mobile QA was mechanically spot-checked through static output and route checks, but final human review on a real phone is still recommended before public launch.

## Recommended Next Manual Review

- Open the live GitHub Pages site after deployment and verify `/`, `/services/`, `/emergency-electrician-sydney/`, `/level-2-electrician-sydney/`, `/services/switchboard-upgrades-sydney/`, `/services/hot-water-system-electrician-sydney/`, `/services/split-system-air-conditioning-sydney/`, `/service-areas/`, `/sitemap.xml` and `/robots.txt`.
- Test mobile on real iPhone and Android browser widths for the van hero, top marquee, mobile menu, quote modal and footer.
- Confirm any future stronger "ASP Level 2" or accreditation wording against business paperwork before publishing it.
- Manually review top commercial suburbs and top emergency fault pages for tone and conversion quality.
