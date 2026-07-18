# Full-Width Responsive Header Implementation

Date: 18 July 2026

Result: **PASS**

## What Changed

The shared header now serves art-directed Evaready banner files through a single `<picture>` element. The banner row spans the viewport at every breakpoint and is no longer narrowed to make room for the mobile menu.

The implementation preserves the existing order and controls:

1. Responsive Evaready banner
2. Scrolling service strip
3. Desktop navigation and Call/Quote actions
4. Page content

On mobile, only the banner and hamburger appear in the header. The existing bottom Call Now / Get a Quote bar remains unchanged.

## Assets And Sources

| Breakpoint use | Asset | Dimensions | File size |
| --- | --- | ---: | ---: |
| Under 640px | `public/images/evaready-electric-header-mobile-v2.webp` | 860 x 260 | 23,294 bytes |
| 640-1023px | `public/images/evaready-electric-header-tablet-v2.webp` | 1280 x 300 | 64,006 bytes |
| 1024-1279px | `public/images/evaready-electric-header-desktop-v2.webp` | 2560 x 380 | 119,342 bytes |
| 1280px and wider | `public/images/evaready-electric-header-wide-v2.webp` | 2560 x 220 | 54,172 bytes |

All four assets come from the current owner-supplied master. The mobile composition reserves storm-only space at the right edge so the hamburger does not cover the wordmark.

## Files Changed

- `components/site-frame.tsx`
- `app/globals.css`
- `app/ux-overhaul.css`
- Four responsive WebP files in `public/images/`
- `docs/header-responsive-assets-created.md`
- `docs/full-width-responsive-header-implementation.md`

No homepage copy, routes, metadata, schema, service content, suburb content, response wording, tracking, booking behavior, or footer code was changed.

## Responsive Structure

`components/site-frame.tsx` selects sources at 640px, 1024px, and 1280px. The mobile image is the `<img>` fallback, so it also works where `<picture>` source selection is unavailable.

The banner row remains a full-bleed `100vw` element. The brand link and picture are both full width with no logo `max-width`. The image fills the art-directed row without distortion. The mobile menu is absolutely positioned above its reserved safe zone, so it neither consumes layout width nor shifts the artwork.

## Header And Spacer Heights

| Viewport | Source | Measured art height |
| ---: | --- | ---: |
| 320px | Mobile | 97px |
| 390px | Mobile | 117.9px |
| 430px | Mobile | 130px |
| 768px | Tablet | 180px |
| 820px | Tablet | 192.2px |
| 1024px | Desktop | 152px |
| 1366px | Wide | 190px |
| 1440px | Wide | 190px |
| 1920px | Wide | 190px |
| 2560px | Wide | 220px |

The existing spacer continues to derive from the responsive art, marquee, safe-area, and desktop navigation variables. Measurements confirmed the marquee begins immediately below the art row, page content starts below the complete fixed header, and there is no artificial blank gap.

## Responsive QA

Checked locally at 320, 390, 430, 768, 820, 1024, 1366, 1440, 1920, and 2560px widths.

- Banner row x-position: 0px
- Banner row width: viewport width
- Image visible width: viewport width
- Body horizontal overflow: none
- Header/marquee overlap: none
- `EVAREADY`, `ELECTRICAL`, and `24/7`: visible at every breakpoint
- Mobile hamburger: visible, at least 44px, and clear of important text
- Mobile top Call/Quote actions: hidden
- Mobile sticky Call/Quote bar: preserved
- Desktop navigation and Call/Quote actions: preserved

Screenshots are in `reports/full-width-responsive-header-implementation/`. The final mobile safe-zone checks are:

- `mobile-safe-320x568.png`
- `mobile-safe-390x844.png`
- `mobile-safe-430x932.png`

Desktop and tablet screenshots in the same directory cover the remaining responsive sources.

## Validation

- `npm.cmd run audit:metadata`: PASS, 999 rows, 0 warnings
- `npm.cmd run audit:links`: PASS, 20,104 links, 0 broken; 1,001 generated routes checked
- `npm.cmd run audit:visible-copy`: PASS, 999 pages, 0 warnings
- `npm.cmd run audit:page-health`: PASS, 999 routes, 0 critical warnings
- `npm.cmd run lint`: PASS
- Production build with the GitHub Pages base path: PASS
- Static pages generated: 1,003
- Responsive asset references in `out/index.html`: all four present
- Required Google Ads, phone, quote, and telephone markers: present
- Stale/risky public-output matches: 0

The build emitted only the existing Node `module.register()` deprecation warning.

## Deployment

Not deployed. Deployment is intentionally deferred until the separate QA prompt passes.

## Final Result

**PASS**
