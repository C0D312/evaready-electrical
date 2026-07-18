# Responsive Header Assets Created

Date: 18 July 2026

Result: **PASS**

## Scope

This pass created responsive image assets only. No React components, CSS, layout, routes, metadata, tracking, CTAs, or deployment files were changed.

## Master Image

- Source: `public/images/header/evaready-header-owner-v7.webp`
- Dimensions: 2048 x 682
- Aspect ratio: 3.003:1
- File size: 123,428 bytes
- Source status: current owner-supplied electric header artwork used by the existing header

Every output was produced from this master. The full 2048px source width was retained in each crop so neither side of the logo nor the blue/red lightning edges were cut horizontally.

## Output Assets

| Purpose | File | Dimensions | Aspect ratio | File size |
| --- | --- | ---: | ---: | ---: |
| Mobile | `public/images/evaready-electric-header-mobile-v2.webp` | 860 x 260 | 3.3077:1 | 23,294 bytes (22.7 KiB) |
| Tablet | `public/images/evaready-electric-header-tablet-v2.webp` | 1280 x 300 | 4.2667:1 | 64,006 bytes (62.5 KiB) |
| Desktop | `public/images/evaready-electric-header-desktop-v2.webp` | 2560 x 380 | 6.7368:1 | 119,342 bytes (116.5 KiB) |
| Wide desktop | `public/images/evaready-electric-header-wide-v2.webp` | 2560 x 220 | 11.6364:1 | 54,172 bytes (52.9 KiB) |

All assets are WebP and are well below the requested 500 KB practical target.

## Processing Method

The images were art-directed from the same owner-supplied master and encoded as high-quality WebP. No new logo or third-party artwork was introduced.

- Mobile composition: keeps the complete wordmark and energy line in a readable left/centre area, with a storm-only safe zone on the right for the hamburger button.
- Tablet crop: removes excess upper/lower atmosphere while keeping the full wordmark, `ELECTRICAL`, `24/7`, both lightning sides, the energy line, and the main bolt.
- Desktop crop: creates a genuinely slim banner while preserving the complete wordmark, `ELECTRICAL`, `24/7`, both lightning sides, and the horizontal energy line. Only the lower portion of the centre bolt is intentionally outside the slim crop.
- Wide composition: combines storm atmosphere and the complete approved wordmark from the same master on a shallower canvas so large monitors get a compact header without enlarged, cropped letters.

No output was stretched or squashed. Resize height was derived from each cropped source aspect ratio rather than forcing the logo into an unrelated width and height.

## Visual Validation

Each generated file was opened at its native dimensions and checked manually.

| Check | Mobile | Tablet | Desktop | Wide |
| --- | --- | --- | --- | --- |
| `EVAREADY` fully visible | Pass | Pass | Pass | Pass |
| `ELECTRICAL` fully visible | Pass | Pass | Pass | Pass |
| Red `24/7` fully visible | Pass | Pass | Pass | Pass |
| Blue lightning visible | Pass | Pass | Pass | Pass |
| Red lightning visible | Pass | Pass | Pass | Pass |
| Centre energy line visible | Pass | Pass | Pass | Pass |
| Logo distortion | None | None | None | None |
| Text sharpness | Pass | Pass | Pass | Pass |
| File under 500 KB | Pass | Pass | Pass | Pass |

## High-DPI / Ultrawide Decision

A separate 2560px-wide, 220px-high asset was created for viewports at or above 1280px. Its shallower composition keeps the fixed header compact while retaining the complete approved branding. The standard desktop source remains available for the 1024-1279px range, where the extra height improves readability.

## Owner Review Notes

- The mobile image deliberately reserves its far-right edge for the menu control, preventing the hamburger from covering the `Y` or `24/7`.
- The desktop banner deliberately prioritises readable logo text in a slim strip. The horizontal energy line is retained, while most of the lower centre bolt is omitted.
- If the complete lower bolt must also appear in a very slim desktop header, that requires a composed design using separate approved logo/background layers rather than a distortion-free crop of this single master image.

## Deployment

Not deployed in the asset-creation pass. The subsequent responsive-header implementation now references all four files locally and in the production export.

## Final Result

**PASS**
