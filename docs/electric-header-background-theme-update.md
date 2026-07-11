# Electric Header And Background Theme Update

## Assets Added

- `public/images/evaready-electric-header-banner-v1.webp` - 36,820 bytes
- `public/images/evaready-electric-header-banner-v1.png` - 497,711 bytes
- `public/images/evaready-electric-storm-background-v1.webp` - 100,540 bytes
- `public/images/evaready-electric-storm-background-v1.png` - 2,400,904 bytes

The WebP assets are used by the site. PNG fallbacks are retained in `public/images/` for owner review or future fallback use.

## Optimisation Notes

- The supplied full banner source was converted into a compact 1800 x 170 WebP header strip.
- The logo remains proportional and is not stretched or object-filled.
- The storm background was converted to WebP for the global electric theme background.
- No video background, third-party animation library, or flashing lightning animation was added.
- The new header image uses the current Next.js `Image` `preload` prop and explicit intrinsic dimensions.

## Header Structure

Before:
- One header row combined logo, navigation and desktop CTAs.
- Mobile rules had accumulated over several CTA/header passes.

After:
- `components/site-frame.tsx` renders a two-row electric header on desktop:
  - Row 1: full-width Evaready electric branded banner.
  - Row 2: navigation, red Call Now CTA and blue Get a Quote CTA.
- Mobile renders the electric branded banner row with the hamburger on the right.
- Mobile top Call Now and Get a Quote buttons are hidden; the sticky bottom CTA remains active.
- The marquee strip remains directly below the sticky header.

## Background Theme Usage

- `app/layout.tsx` applies `ev-electric-theme-bg` to the body and sets `--ee-electric-bg-image`.
- `app/globals.css` adds the reusable electric theme, header, banner, nav row, marquee and mobile menu shell rules.
- Long-form content remains on dark panels/cards so the storm image does not reduce readability.
- Existing van hero assets are unchanged and remain untinted.

## Responsive QA

Screenshots were saved to:

`reports/electric-header-background-theme-qa/`

Captured:
- homepage mobile 390x844
- homepage desktop 1440x900
- emergency mobile 390x844
- emergency desktop 1440x900
- services desktop 1440x900
- service areas mobile 390x844
- Panania mobile 390x844
- Contact mobile 390x844

Automated local responsive checks covered 16 core routes across:

`320x568`, `360x800`, `375x812`, `390x844`, `412x915`, `430x932`, `768x1024`, `820x1180`, `834x1194`, `1024x1366`, `1024x768`, `1280x720`, `1366x768`, `1440x900`, `1600x900`, `1920x1080`.

Result:
- 256 route/viewport checks
- 0 horizontal overflow failures
- 0 mobile top CTA failures
- 0 missing banner failures
- 0 sticky CTA missing failures

## Validation

- `npm.cmd run audit:suburbs` passed with 873 suburb pages and 0 warnings.
- `npm.cmd run audit:metadata` passed with 999 rows and 0 warnings.
- `npm.cmd run audit:links` passed with 0 broken links.
- `npm.cmd run audit:all-suburb-copy` passed with 873 suburb pages and 0 warnings.
- `npm.cmd run audit:visible-copy` passed with 0 warning rows.
- `npm.cmd run audit:page-health` passed with 0 critical warnings.
- `npm.cmd run audit:response-times` passed with 0 hard mismatches.
- `npm.cmd run audit:visibility` passed with 1002 routes, 7014 viewport rows and 0 critical issues.
- `npm.cmd run audit:live-links-and-ctas` passed with 1002 HTML routes, 0 broken links and 0 CTA failures.
- `npm.cmd run lint` passed.
- `npm.cmd run build` passed with 1003 generated static pages.

## Required Markers

Confirmed in generated output:

- `AW-18165545331`
- `data-conversion-action="phone-click"`
- `data-conversion-action="quote-click"`
- `tel:+61461247247`
- `Ausgrid & Endeavour Energy Accredited Level 2 ASP`
- `60-minute` and `90-minute` response wording

## Live Verification

Pending deployment at the time this report was created. Final live normal and cache-busted verification will be recorded after `main` and `gh-pages` are pushed.
