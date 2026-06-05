# Favicon / URL Logo Update

## Purpose

Update the Evaready Electrical browser tab icon, favicon and mobile app icon so the URL logo is a clean square brand mark instead of a wide horizontal logo.

## Source Asset

- Source: `public/images/evareadyelectrical-logo.png`
- The icon uses the central Evaready lightning mark and brand colours from the existing logo.
- The horizontal wordmark was intentionally not squeezed into the favicon because it becomes unreadable at small sizes.

## Files Created Or Updated

- `app/favicon.ico`
- `app/icon.png`
- `app/apple-icon.png`
- `docs/favicon-preview.md`
- `docs/favicon-preview.png`

## Generated Sizes

- `favicon.ico`: 16x16, 32x32, 48x48 and 256x256 frames
- `icon.png`: 512x512
- `apple-icon.png`: 180x180

## Implementation Notes

- Uses the Next.js App Router icon file conventions from `app/`.
- Root metadata also declares the icon links so the generated HTML consistently includes `favicon.ico`, `icon.png` and `apple-icon.png`.
- No route, schema, page copy, service/suburb content, Google Ads tracking or conversion attributes were changed.

## Visual QA

- Preview file: `docs/favicon-preview.png`
- The mark is square.
- The full horizontal logo is avoided.
- The lightning mark remains visible at 16px, 32px, 48px and 180px preview sizes.
- The dark navy square works on light and dark browser UI.

## Validation

- `npm.cmd run audit:all-suburb-copy`: pass, 873 suburb pages checked, 0 warnings
- `npm.cmd run audit:suburbs`: pass, 873 suburb pages, 0 warnings
- `npm.cmd run audit:metadata`: pass, 995 rows, 0 warnings
- `npm.cmd run audit:links`: pass, 19,963 internal links checked, 0 broken
- `npm.cmd run audit:visible-copy`: pass, 995 pages, 0 warnings
- `npm.cmd run lint`: pass
- `npm.cmd run build`: pass, 1002 static routes generated
- Generated homepage HTML includes:
  - `rel="icon"` for `/evaready-electrical/favicon.ico`
  - `rel="icon"` for `/evaready-electrical/icon.png`
  - `rel="apple-touch-icon"` for `/evaready-electrical/apple-icon.png`
- Output checks confirmed:
  - Google Ads tag `AW-18165545331` remains present
  - phone and quote conversion attributes remain present
  - stale launch-blocker wording is absent
  - Level 1 / Level 3 wording is absent

## Live Verification

Pending final deploy validation.
