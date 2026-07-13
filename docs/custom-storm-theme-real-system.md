# Custom Storm Theme Real System

## Summary

Evaready's old flat/light section styling has been converted into a reusable storm-theme system. The update applies the storm language to page wrappers, major sections, cards, panels, generated service/suburb templates, the marquee, sticky CTA compatibility, and footer styling rather than relying on a faint body wallpaper.

## Assets

- `public/images/evaready-storm-theme-desktop-v3.webp` - 119,506 bytes.
- `public/images/evaready-storm-theme-mobile-v3.webp` - 30,562 bytes.

Both assets are WebP storm-theme images already present in the project. No stock or generated replacement image was used.

## Classes Added Or Consolidated

- `.ev-storm-page`
- `.ev-storm-section`
- `.ev-storm-section--hero`
- `.ev-storm-section--emergency`
- `.ev-storm-section--subtle`
- `.ev-storm-panel`
- `.ev-storm-panel--strong`
- `.ev-storm-card`
- `.ev-storm-card--emergency`
- `.ev-storm-card--trust`
- `.ev-storm-card--quote`
- `.ev-storm-grid`
- `.ev-storm-legal`
- `.ev-storm-footer`

The CSS also keeps generated templates covered through `.core-storm-page` and `.generated-storm-page` selectors so service, region, area and suburb pages inherit the same card and section language.

## Pages And Templates Updated

- Homepage
- Emergency electrician page
- Level 2 electrician page
- Services index
- Service areas index
- About
- Contact
- Solar & Batteries
- Electrical fault index and generated fault guides
- Generated service template
- Generated region, area and suburb templates
- Privacy and Terms, with subtle storm treatment
- Footer via `components/site-frame.tsx`

## Old Theme Residue

Source-level old white/light sections were replaced on the core commercial pages that still had them. Remaining `bg-white/...` strings are intentional translucent glass treatments, quote modal/mobile-nav compatibility, or serialized framework output; they are covered by the storm selectors where they appear inside storm pages.

## Desktop Scaling

Desktop content remains at normal premium site widths, generally using existing `max-w-7xl` containers and the storm-system cap of roughly 1280px where appropriate. No global transform scaling was added, and desktop screenshots confirm the UI is not miniature or floating in oversized empty bands.

## Header, CTA And Van Preservation

- Composed electric header behavior is preserved.
- Mobile header remains banner/logo plus hamburger only.
- Sticky mobile CTA remains visible.
- Phone and quote conversion attributes remain.
- The van image is not tinted, recoloured or covered by the storm theme.

## Screenshots

Screenshots are saved in:

`reports/custom-storm-theme-real-system/`

Included screenshots cover homepage, emergency, Level 2, services, service areas, Contact, Privacy, switchboard service, consumer mains and Panania in mobile and desktop samples.

## Validation

Clean validation run:

- `npm.cmd run audit:all-suburb-copy`
- `npm.cmd run audit:suburbs`
- `npm.cmd run audit:metadata`
- `npm.cmd run audit:links`
- `npm.cmd run audit:visible-copy`
- `npm.cmd run audit:page-health`
- `npm.cmd run audit:response-times`
- `npm.cmd run lint`
- `npm.cmd run build`
- `npm.cmd run audit:visibility`
- `npm.cmd run audit:live-links-and-ctas`

Result: pass.

- Suburb copy audit: 873 pages checked, 0 missing, 0 warnings.
- Suburb route audit: 873 suburb pages, 0 warning rows.
- Metadata audit: 999 rows, 0 warnings.
- Link audit: 20,093 internal links checked, 0 broken links.
- Visible-copy audit: 999 pages, 0 warning rows.
- Page-health audit: 999 routes, 0 critical warnings.
- Response-time audit: 873 suburbs, 0 hard mismatches.
- Lint: pass.
- Build: pass, 1003 static pages generated.
- Visibility audit: 1002 routes across 7 viewports, 0 critical issues.
- Live links and CTA audit: 1002 HTML routes, 0 broken links, 0 CTA failures.

Post-build checks confirmed storm classes and storm assets are present in `out/`, stale/risky strings are absent, and Google Ads, phone-click, quote-click and `tel:+61461247247` markers remain.

## Live Result

Live public verification passed after the gh-pages deployment.

- Normal and cache-busted URLs verified for the homepage, Services, Emergency, Level 2, Service Areas, Contact, Panania, Privacy and Terms pages.
- `site-version.json` returned the expected main commit for the deployed source.
- Storm theme classes, storm assets, CSS, Google Ads, phone tracking, quote tracking and `tel:+61461247247` were present on the checked public pages.
