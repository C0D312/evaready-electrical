# Favicon / URL Logo Update

## Scope

Updated the Evaready Electrical browser and app icons only.

No routes, copy, metadata patterns, Google Ads tracking, service pages, suburb pages or header logo were changed.

## Icon files created

- `app/favicon.ico`
- `app/icon.png`
- `app/apple-icon.png`

## Source asset used

The new icon is a compact square Evaready lightning mark based on the existing Evaready electrical brand treatment and colour system:

- deep navy background
- electric blue glow
- cyan border
- bright lightning bolt mark

The full wide Evaready wordmark was not used inside the favicon because it becomes unreadable at small sizes.

## Sizes generated

- `favicon.ico`: multi-size ICO with 16x16, 32x32, 48x48 and 256x256 entries
- `icon.png`: 512x512 PNG
- `apple-icon.png`: 180x180 PNG

## Visual readability result

The icon was checked at 16x16, 32x32, 48x48 and 180x180. The lightning mark remains readable at favicon sizes and is much more suitable for browser tabs, mobile URL bars and home-screen icons than the full horizontal wordmark.

## Base path

The existing root layout metadata already links icons through the shared `assetPath()` helper, so generated HTML resolves icon URLs under the GitHub Pages base path:

- `/evaready-electrical/favicon.ico`
- `/evaready-electrical/icon.png`
- `/evaready-electrical/apple-icon.png`

## Validation

Passed:

- `npm.cmd run audit:suburbs`: 873 suburb pages, 0 warnings
- `npm.cmd run audit:metadata`: 995 rows, 0 warnings
- `npm.cmd run audit:links`: 19,963 internal links checked, 0 broken
- `npm.cmd run audit:visible-copy`: 995 pages, 0 warnings
- `npm.cmd run lint`: passed
- `npm.cmd run build`: passed

Generated output checks passed:

- Icon links present in `out/index.html`
- Google Ads tag `AW-18165545331` preserved
- Phone and quote conversion markers preserved
- Stale/risky launch strings absent

## Deployment

Pending final deploy after GitHub Pages base-path export.
