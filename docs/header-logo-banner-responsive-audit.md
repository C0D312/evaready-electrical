# Header Logo/Banner Responsive Audit

Audit date: 18 July 2026

Status: **AUDIT COMPLETE**

This was an audit-only pass. No application source, CSS, assets, metadata, routes, CTA behaviour, build output, commits, or deployment were changed. Browser measurements and screenshots were taken from the current public site with cache-busting against source commit `8b6f3afea00f95365f7211e158d7b5d4e917b077`.

## Current Header Structure

The shared header is rendered by `components/site-frame.tsx` in this order:

1. `.ev-final-header-art`
2. `RouteMarqueeStrip`
3. `.ev-final-desktop-nav` at widths of 1024px and above
4. `.site-header-spacer` after the fixed header

The art strip contains one linked `<picture>`, but the `<picture>` has no responsive `<source>` elements. It contains one `<img>` used at every breakpoint. `MobilePrimaryNav` is a sibling of the brand inside the art strip.

## Active Asset

| Property | Value |
| --- | --- |
| Active file | `public/images/header/evaready-header-owner-v7.webp` |
| Pixel dimensions | 2048 x 682 |
| Aspect ratio | 3.003:1 |
| File size | 123,428 bytes (120.5 KiB) |
| Format | WebP |
| Active PNG fallback | No |
| Active mobile-specific source | No |
| Active tablet-specific source | No |
| Active desktop-specific source | No |
| Loading | `loading="eager"`, `fetchPriority="high"` |
| Separate layout preload | No |

The approved owner artwork is present and is the active header source. The repository also contains older WebP variants, but none are referenced by the active header:

| Inactive file | Dimensions | Aspect ratio | File size |
| --- | ---: | ---: | ---: |
| `evaready-header-desktop-slim-v6.webp` | 5500 x 240 | 22.917:1 | 37,186 bytes |
| `evaready-header-tablet-slim-v6.webp` | 2400 x 250 | 9.600:1 | 30,910 bytes |
| `evaready-header-mobile-slim-v6.webp` | 1200 x 290 | 4.138:1 | 27,420 bytes |
| `evaready-header-desktop-v5.webp` | 2048 x 682 | 3.003:1 | 90,602 bytes |
| `evaready-header-tablet-v5.webp` | 1600 x 533 | 3.002:1 | 64,092 bytes |
| `evaready-header-mobile-v5.webp` | 1500 x 426 | 3.521:1 | 50,896 bytes |

No PNG header variant exists in `public/images/header/`.

## Active CSS and Layout

### Full-bleed row

`.ev-final-header-art` in `app/globals.css` is correctly full-bleed:

- `width`, `min-width`, and `max-width`: `100vw`
- full-bleed margins: `calc(50% - 50vw)`
- no parent `max-w-7xl`
- no active old `.site-logo-image`, `.logo-img`, or `.site-logo-link` constraint
- no horizontal padding on the art row or active brand
- `overflow: hidden`

The row itself is therefore not boxed. The image treatment inside the row is the source of the boxed appearance.

### Mobile and tablet, below 1024px

The final rules in `app/ux-overhaul.css` apply:

- brand width: `calc(100% - 4.5rem)`
- image box: `width: 100%; height: 100%`
- computed `object-fit`: `contain`
- computed `object-position`: centre
- menu: absolutely positioned on the right

The hamburger does not take space through flex layout. However, the stylesheet deliberately removes 72px from the brand width to reserve the menu area. The image is then contained inside that reduced box. At wider tablet sizes the fixed/capped art height, reduced brand width, and 3.003:1 source ratio create large internal side gaps, making the banner look like a small centred rectangle.

### Desktop, 1024px and above

The final rules in `app/ux-overhaul.css` apply:

- image is absolutely centred
- width: `auto`
- height: `154%` of the art row
- computed `object-fit`: `contain`
- art row clips overflow

This preserves the source aspect ratio and prevents distortion, but it makes the source taller than the strip and clips its top and bottom. Because width remains automatic, the image occupies only a small central portion of the very wide row. CSS radial gradients fill the remaining blue/red sides; the supplied image itself does not span the viewport.

### Header heights and spacer

The art height is controlled with CSS variables:

- below 640px: `clamp(84px, 24vw, 118px)`
- 640-1023px: `clamp(92px, 13.5vw, 128px)`
- 1024-1279px: `74px`
- 1280px and above: `clamp(82px, 5.1vw, 110px)`

The spacer equals the measured fixed header height. No spacer mismatch or header/content overlap was found.

### Marquee position

The marquee is in normal document order directly after the art strip. It is 34px high below 1024px, 26px at 1024px, and 27px from 1280px. No marquee/header overlap was found at any requested viewport. The desktop nav follows the marquee.

## Viewport Measurements

`Banner x` and `visible width` describe the actual displayed source pixels after `object-fit`, not merely the larger `<img>` CSS box. Empty space is measured inside the full art row. All values are CSS pixels.

| Viewport | Header row | Banner x | Banner visible width | Hamburger x | Text visible | Lightning edges | Boxed / empty space | Crop | Distortion | Overflow | Marquee overlap |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- |
| 320x568 | 320 | 0.00 | 248.00 | 254.09 | All | Both | Right 72.00 | No | No | No | No |
| 360x800 | 360 | 15.79 | 256.42 | 294.09 | All | Both | Left 15.79 / right 87.79 | No | No | No | No |
| 375x812 | 375 | 17.87 | 267.26 | 309.09 | All | Both | Left 17.87 / right 89.87 | No | No | No | No |
| 390x844 | 390 | 19.97 | 278.05 | 324.09 | All | Both | Left 19.97 / right 91.97 | No | No | No | No |
| 412x915 | 412 | 23.04 | 293.91 | 346.09 | All | Both | Left 23.04 / right 95.04 | No | No | No | No |
| 430x932 | 430 | 25.57 | 306.86 | 364.09 | All | Both | Left 25.57 / right 97.57 | No | No | No | No |
| 768x1024 | 768 | 193.84 | 308.32 | 702.09 | All | Both | Left 193.84 / right 265.84 | No | No | No | No |
| 820x1180 | 820 | 209.31 | 329.38 | 754.09 | All | Both | Left 209.31 / right 281.31 | No | No | No | No |
| 1024x768 | 1024 | 343.23 | 337.55 | Hidden | All | Both, central only | 343.23 each side | Vertical | No | No | No |
| 1366x768 | 1366 | 495.72 | 374.56 | Hidden | All | Both, central only | 495.72 each side | Vertical | No | No | No |
| 1440x900 | 1440 | 532.72 | 374.56 | Hidden | All | Both, central only | 532.72 each side | Vertical | No | No | No |
| 1920x1080 | 1920 | 735.93 | 448.14 | Hidden | All | Both, central only | 735.93 each side | Vertical | No | No | No |
| 2560x1440 | 2560 | 1027.97 | 504.06 | Hidden | All | Both, central only | 1027.97 each side | Vertical | No | No | No |

Notes:

- `EVAREADY`, `ELECTRICAL`, and `24/7` remain readable at every measured viewport.
- Mobile/tablet containment preserves the complete source image, including both lightning sides, but not across the complete header width.
- Desktop clipping removes the top and bottom portions of the 3:1 artwork. The important words remain visible, while the full original composition does not.
- Desktop edge colour outside the central source image comes from CSS gradients, not the source artwork.
- Body and document `scrollWidth` matched the viewport at all 14 sizes.
- Header row x-position was 0 and row width matched the viewport at all 14 sizes.

Full measurements are saved in `reports/header-logo-banner-audit/measurements.json`.

## Root Cause

The primary root cause is an aspect-ratio mismatch combined with one asset being reused for all breakpoints.

The approved artwork is approximately 3:1. The live desktop art rows range from roughly 13.8:1 at 1024px to 23.3:1 at 2560px. One 3:1 image cannot simultaneously:

1. span those rows left-to-right,
2. retain the complete wordmark and `24/7`,
3. preserve both original lightning edges,
4. avoid cropping, and
5. avoid distortion.

The current CSS resolves that conflict differently by breakpoint:

- Mobile/tablet: preserve the full image with `contain`, but place it inside a brand box reduced by 72px. This creates the boxed appearance and becomes especially pronounced at 768-820px.
- Desktop: enlarge the image to `154%` of row height and clip it vertically. This keeps the words readable but makes the source a small central image surrounded by CSS background.

Secondary causes:

- The `<picture>` element does not perform art direction because it has no `<source>` elements.
- Tablet uses the mobile containment strategy through 1023px, even though its header geometry is substantially wider.
- The mobile hamburger is correctly absolute, but the fixed 72px brand-width subtraction still reduces the image area whether or not that exact amount is needed.
- The final rules in `app/ux-overhaul.css` override the earlier `object-fit: cover` rule in `app/globals.css`, making the cascade harder to reason about.

## Mobile Issue Summary

- The row is full-width, but the artwork is not.
- A 72px menu reservation prevents the banner from spanning to the right edge.
- From 360px upward, `contain` introduces additional internal left/right empty space.
- The full logo text is visible and is not distorted.
- The hamburger is absolute and does not cover the wordmark in the measured screenshots.
- Tablet widths are the weakest fit: at 768px the source artwork is only 308.32px wide, and at 820px it is only 329.38px wide.

## Desktop Issue Summary

- The art row is full-width, but the source artwork occupies only about 33.0% of the row at 1024px, 27.4% at 1366px, 23.3% at 1920px, and 19.7% at 2560px.
- The image is intentionally 154% of row height and vertically cropped.
- The full words remain visible, but the full original header composition is not.
- Large left/right areas are CSS gradients rather than the supplied image, which makes the header look composed from separate parts instead of like one continuous banner.
- There is no image distortion or horizontal overflow.

## CSS Selectors Causing the Fit

- `app/ux-overhaul.css:30` - desktop absolute centring and `height: 154%`
- `app/ux-overhaul.css:42` - mobile/tablet brand width reduced by `4.5rem`
- `app/ux-overhaul.css:52` - mobile/tablet image forced into the reduced box
- `app/globals.css:12951` - mobile art-height calculation
- `app/globals.css:12960` - tablet art-height calculation
- `app/globals.css:12967` and `12977` - desktop art heights
- `app/globals.css:13014` - full-width row with clipping
- `app/globals.css:13031` - brand/picture sizing
- `app/globals.css:13065` - absolute mobile menu positioning
- `app/globals.css:13127` - spacer tied to calculated header height
- `components/site-frame.tsx:171` - `<picture>` without responsive `<source>` elements

Old `.site-logo-image`, `.logo-img`, and `.site-logo-link` rules remain elsewhere in the large legacy stylesheet, but the active header markup does not use those classes. They are not the direct cause of the current banner fit.

## Recommended Implementation Plan

1. Use responsive art direction instead of one 3:1 source at every viewport.
2. Create new assets from the currently approved owner artwork for three real display geometries:
   - mobile: complete wordmark with an intentional right-side hamburger safe zone,
   - tablet: a wider composition that uses the available row without shrinking to a small centre rectangle,
   - desktop/wide desktop: a genuinely wide strip with the logo and lightning deliberately positioned within a 16:1 to 23:1 canvas.
3. Add actual `<source>` elements to the existing `<picture>` for mobile, tablet, and desktop.
4. Remove the desktop `height: 154%` treatment and use predictable `width: 100%; height: 100%` behaviour with text-safe art-directed sources.
5. Keep the mobile hamburger absolutely positioned, but put its safe zone into the mobile artwork/layout rather than globally shrinking the banner by a fixed 72px.
6. Preserve the current full-bleed art row, header order, spacer calculation, and non-overlapping marquee structure.
7. Re-measure source-content bounds, not only the `<img>` box, at all requested widths after implementation.

### Are new responsive assets needed?

**Yes**, if the requirement is for the actual supplied lightning artwork and logo composition to fill the strip left-to-right while keeping all important text visible and undistorted. CSS alone cannot make a 3.003:1 source fill desktop rows approaching 23:1 without either cropping large portions or stretching the artwork.

An alternative is a composed header using a full-width storm background plus a separate transparent Evaready logo, but that would be a different implementation choice and should use only owner-approved source assets.

## Screenshots

Saved in `reports/header-logo-banner-audit/`:

- `homepage-320x568.png`
- `homepage-360x800.png`
- `homepage-390x844.png`
- `homepage-430x932.png`
- `homepage-768x1024.png`
- `homepage-1366x768.png`
- `homepage-1920x1080.png`

## Final Result

**AUDIT COMPLETE**

The active owner-supplied artwork is available, so owner input is not required to explain the current failure or prepare the next implementation pass.
