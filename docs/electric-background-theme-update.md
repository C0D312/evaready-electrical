# Electric Background Theme Update

## Asset Used

- Source file: `.codex-remote-attachments/019e58ea-0f28-7b40-ab5e-cb83224fb437/606474b7-4709-4004-8294-6dc9d16a2673/1-Photo-1.jpg`
- Public WebP: `public/images/evaready-electric-storm-background-v1.webp`
- Dimensions: 1280 x 853
- File size: 69,786 bytes
- Fallback PNG: not kept, because the WebP is substantially smaller and is supported by the target browsers.

## CSS And Theme Work

- Updated the shared electric theme layer in `app/globals.css`.
- Reused the existing `--ee-electric-bg-image` body variable from `app/layout.tsx`.
- Applied the supplied storm image through shared CSS only, without editing generated HTML.
- Added visible storm treatment to the page shell, standard sections, shared dark cards, emergency cards and footer.
- Kept legal pages darker and quieter so privacy and terms text remains readable.

## Classes Updated

- `body.ev-electric-theme-bg`
- `.ev-electric-section`
- `.ev-electric-section--subtle`
- `.ev-electric-section--emergency`
- `.ev-electric-card`
- `.ev-electric-card--emergency`
- `.ev-storm-overlay`
- `.ev-storm-overlay--soft`
- `.ev-storm-overlay--hero`

## Behaviour

- Homepage, service pages and suburb pages now reference the electric storm background in the built output.
- The van hero image remains untouched: no filter, tint, recolour or overlay was added to the van image.
- Mobile header behaviour remains unchanged: banner/logo plus hamburger only.
- Sticky mobile Call Now and Get a Quote CTA remains present.
- Call Now remains red and Get a Quote remains blue.

## Validation

- `npm.cmd run audit:suburbs`: passed, 873 suburb pages, 0 warnings.
- `npm.cmd run audit:metadata`: passed, 999 rows, 0 warnings.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed, 1003 static pages generated.
- `npm.cmd run audit:all-suburb-copy`: passed, 873 pages checked, 0 warnings.
- `npm.cmd run audit:links`: passed, 0 broken links.
- `npm.cmd run audit:visible-copy`: passed, 0 warnings.
- `npm.cmd run audit:page-health`: passed, 0 critical warnings.
- `npm.cmd run audit:response-times`: passed, 0 hard mismatches.
- `npm.cmd run audit:visibility`: passed, 1002 routes, 7014 viewport rows, 0 critical issues.
- `npm.cmd run audit:live-links-and-ctas`: passed, 0 broken links and 0 CTA failures.

## Post-Build Checks

- `out/images/evaready-electric-storm-background-v1.webp`: present.
- Built output references `evaready-electric-storm-background-v1`, `ev-electric-theme-bg`, `ev-electric-section` and `ev-storm-overlay`.
- Stale and risky strings checked: no matches.
- Google Ads marker present.
- Phone and quote conversion attributes present.
- `tel:+61461247247` present.
- 60-minute and 90-minute wording present.
- Ausgrid, Endeavour Energy and Accredited Level 2 ASP wording present.

## Screenshots

Screenshots saved to:

- `reports/electric-background-theme-qa/`

Included:

- Homepage mobile 390x844
- Homepage desktop 1440x900
- Emergency mobile 390x844
- Emergency desktop 1440x900
- Services mobile 390x844
- Service Areas mobile 390x844
- Panania mobile 390x844
- Contact mobile 390x844
- Privacy mobile 390x844
- Additional scrolled mobile section checks for homepage, services, Panania and contact

## Live Verification

Pending gh-pages deployment in this run. Final public verification is recorded in the Codex final response after normal and cache-busted URLs are checked.
