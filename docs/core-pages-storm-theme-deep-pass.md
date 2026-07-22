# Core Pages Storm Theme Deep Pass

## Summary

Applied the custom Evaready storm system more deeply to the homepage and core commercial pages:

- `/`
- `/emergency-electrician-sydney/`
- `/level-2-electrician-sydney/`
- `/services/`
- `/service-areas/`
- `/about/`
- `/contact/`
- `/solar-batteries/`

The pass uses a `core-storm-page` wrapper and page-specific storm classes to convert legacy flat/white/grey section surfaces into translucent storm panels, cyan-bordered cards, red-accented emergency areas and blue/cyan quote/trust panels without changing routes, SEO copy, schema, tracking, phone number, quote URL or the van image.

## Files Changed

- `app/globals.css`
- `app/page.tsx`
- `app/emergency-electrician-sydney/page.tsx`
- `app/level-2-electrician-sydney/page.tsx`
- `app/services/page.tsx`
- `app/service-areas/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/solar-batteries/page.tsx`

## Implementation Notes

- Added a core commercial storm-theme cascade that scopes to `.core-storm-page`.
- Homepage emergency triage is treated as a red/blue storm emergency section.
- Quote/planned-work panels receive blue/cyan storm styling.
- Trust/proof cards receive cyan glow and translucent navy treatment.
- Existing light utility class strings are still present in some source markup, but the final storm cascade overrides them on the target pages.
- The quote iframe/modal and mobile menu remain intentionally white/light where required for third-party form usability and existing menu legibility.
- The van image remains untouched and untinted.

## Validation

- `npm.cmd run audit:suburbs`: passed, 873 suburb pages, 0 warnings.
- `npm.cmd run audit:metadata`: passed, 999 rows, 0 warnings.
- `npm.cmd run audit:links`: passed after build, 0 broken links, 1001 generated routes checked.
- `npm.cmd run audit:all-suburb-copy`: passed after build, 873 pages checked, 0 warnings.
- `npm.cmd run audit:visible-copy`: passed after build, 999 pages, 0 warning rows.
- `npm.cmd run audit:page-health`: passed after build, 0 critical warnings.
- `npm.cmd run audit:response-times`: passed after build, 0 hard mismatches.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed.
- `npm.cmd run audit:live-links-and-ctas`: passed, 0 failures.
- `npm.cmd run audit:visibility`: started across 1002 routes but timed out after 15 minutes; screenshots and targeted Playwright viewport checks were used for this pass.

## Post-Build Checks

- Storm hooks present in built core outputs: 29 files matched.
- Stale/risky wording grep: 0 matches.
- Required markers present:
  - Google Ads marker found.
  - `data-conversion-action` markers found.
  - `tel:+61461247247` found.
- Light utility class strings remain in generated output because source components still include Tailwind-style class names and generated route text payloads preserve them. On the target core pages, these are visually overridden by the storm cascade, with modal/menu exceptions documented above.

## Screenshots

Saved to `reports/core-pages-storm-theme-deep-pass/`.

Included:

- `homepage-mobile-390x844.png`
- `homepage-desktop-1440x900.png`
- `emergency-mobile-390x844.png`
- `emergency-desktop-1440x900.png`
- `services-mobile-390x844.png`
- `service-areas-mobile-390x844.png`
- `panania-mobile-390x844.png`
- `contact-mobile-390x844.png`
- `homepage-emergency-triage-390x844.png`
- `homepage-service-cards-390x844.png`
- `services-card-grid-390x844.png`
- `service-areas-routing-390x844.png`
- `level2-cards-390x844.png`

Targeted Playwright checks found no horizontal overflow in the captured pages.

## Live Verification

Live verified after deployment.

- Main SHA: `c00bc23dba4dd497922dd86804976350d8e1643d`
- `gh-pages` SHA: `6c0737daff40bc42c4b7a8c80c3adb656247bd8a`
- Normal and cache-busted public URLs returned HTTP 200 for:
  - `/`
  - `/emergency-electrician-sydney/`
  - `/level-2-electrician-sydney/`
  - `/services/`
  - `/service-areas/`
  - `/contact/`
  - `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/`
  - `/site-version.json`
- Public HTML checks confirmed:
  - storm classes present on core pages
  - Google Ads marker present
  - phone-click marker present
  - quote-click marker present
  - `tel:+61461247247` present
  - current `site-version.json` main commit present
- Cache-busted public screenshots saved in `reports/core-pages-storm-theme-deep-pass/live/`.

Final status: `LIVE PASS`.
