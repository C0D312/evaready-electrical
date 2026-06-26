# Suburb Dark Blue Theme Update

## Scope

- Applied the Evaready dark-blue theme to service-area index, region, area and generated suburb templates.
- Updated the shared suburb/postcode search component to match the dark-blue card treatment.
- Kept copy, routes, metadata, schema, response-time mapping and Level 2 ASP wording unchanged.

## Theme Changes

- Page backgrounds now use midnight navy/dark blue instead of light white wrappers.
- Alternating sections use slightly different dark-blue bands for visual rhythm.
- Cards, FAQs, nearby suburb links, service cards and process cards now use dark-blue panels with subtle cyan borders.
- Body copy uses white/silver/muted blue-grey for contrast.
- Emergency actions remain red-accented.
- Quote and planned-work actions remain blue/cyan-accented.

## Mobile Safety

- The changes were made through shared templates/components so generated suburb pages inherit the same styling.
- No sticky CTA or route/header behaviour was intentionally changed.
- No hero van image treatment was changed.

## Validation

- `npm.cmd run audit:all-suburb-copy` passed.
- `npm.cmd run audit:suburbs` passed.
- `npm.cmd run audit:metadata` passed with 0 warnings.
- `npm.cmd run audit:links` passed with 0 broken links.
- `npm.cmd run audit:visible-copy` passed with 0 warnings.
- `npm.cmd run audit:page-health` passed with 0 critical warnings.
- `npm.cmd run audit:response-times` passed with 0 hard mismatches.
- `npm.cmd run lint` passed.
- `npm.cmd run build` passed with the GitHub Pages base path.
- `npm.cmd run audit:visibility` passed across 1,002 routes and 7 viewport sizes with 0 critical issues.

Generated output checks:

- No `bg-white text-[#061E72]` or `bg-slate-50` matches remained in `out/service-areas`.
- Google Ads marker `AW-18165545331` remained present.
- Phone and quote conversion markers remained present.
- No stale or risky wording matched the requested detector set.

## Final Result

Pending GitHub Pages deployment and public live verification.
