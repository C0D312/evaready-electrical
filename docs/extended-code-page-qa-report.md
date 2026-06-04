# Extended Code and Page QA Report

Generated for the Evaready Electrical launch QA gate.

## Repository State

- Source branch: main
- Source SHA before QA commit: 448d68c697
- gh-pages SHA before deploy: 49e090afae
- Source dirty before QA commit: yes
- Deploy worktree dirty before deploy: no
- Temp files removed during QA: `.next`, `out`

## Source Scan Results

- Debug scan: no `debugger` statements found. Audit scripts contain documented `console.log` summary output.
- Google Maps/API scan: no `AIza`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, or `maps.googleapis.com` found in production source.
- Risky wording scan: no production fake review, fake rating, fake office/depot, guaranteed arrival, guaranteed same-hour, 60 minutes anywhere, or guaranteed approval wording.
- Stale string scan: no production stale launch-blocker strings. Audit scripts intentionally contain bad-string patterns for detection.

## Audit Results

- All suburb visible copy: PASS
  - Expected suburb count: 873
  - Actual suburb HTML pages checked: 873
  - Missing HTML files: 0
  - Warnings before fixes: 873 suburb pages flagged
  - Warnings after fixes: 0
- Suburb page audit: PASS
  - Total suburb pages: 873
  - Warnings: 0
  - Duplicate URL issues: 0
- Metadata audit: PASS
  - Rows: 995
  - Warnings: 0
- Internal link audit: PASS
  - Known routes: 997
  - Internal links checked: 19,963
  - Broken links: 0
- Visible copy audit: PASS
  - Pages checked: 995
  - Rows with warnings: 0
- Page health audit: PASS
  - Routes checked: 995
  - Critical warnings: 0
- Response-time classification audit: PASS
  - Suburbs checked: 873
  - Hard mismatches: 0
  - Owner-review rows: 0
- TypeScript check: PASS via `npx.cmd tsc --noEmit`
- Lint: PASS
- Build: PASS

## Generated Output Greps

All generated-output stale and risky checks returned no matches for:

- `Business Details`
- `combined footer CTA`
- postcode-only wording such as `Electrical help for 2213`
- duplicate location words such as `Bankstown Bankstown`
- chopped phrase fragments such as `ripping circuits`, `ipping circuits`, `d fittings`, `ot outlets`
- `sparking.For`
- `ASP Level 2 electrical work`
- `Request a Booking or Quote`
- `Request Quote`
- `Area service coverage`
- fixed old copyright `© 2026 Evaready Electrical`
- guaranteed same-hour/arrival claims
- `60 minutes anywhere`
- fake office/depot wording
- fake review/rating wording

Expected current features were confirmed in generated output:

- 60-minute and 90-minute emergency response wording
- Ausgrid and Endeavour Energy Accredited Level 2 ASP wording
- Google Ads tag `AW-18165545331`
- `data-conversion-action="phone-click"`
- `data-conversion-action="quote-click"`
- `tel:+61461247247`

## Asset Findings

Largest generated files before deploy:

- `out/images/evaready-electrical-sydney-service-van.png` - 2,612.6 KB
- `out/images/evareadyelectrical-logo.png` - 1,749.5 KB
- `out/services/index.html` - 520.6 KB
- `out/service-areas/index.html` - 434.5 KB
- `out/images/evareadyelectrical-logo.webp` - 328.4 KB
- `out/images/evaready-electrical-sydney-service-van.webp` - 278.8 KB

Notes:

- The hero van and logo are rendered through WebP paths in the built page output.
- The PNG files remain in the static image folder but are not the primary rendered hero/logo assets in the checked pages.
- No Google Maps or heavy review widget scripts were detected.

## Manual Generated-Page Spot Checks

Generated HTML checks passed for 37 routes, including:

- Homepage
- Emergency electrician page
- Level 2 electrician page
- Services index
- Service areas index
- Privacy Policy
- Terms
- Sitemap
- Robots
- Consumer mains
- Defect notice repairs
- Private power pole
- Metering services
- Point of attachment repairs
- Overhead service lines
- Underground service mains
- Disconnect/reconnect
- Electrical load capacity checks
- No power fault page
- Burning smell fault page
- Safety switch keeps tripping page
- Power point sparking page
- Power outage after storm page
- Bankstown
- Panania
- Bass Hill
- Coogee
- Parramatta
- Blacktown
- Seven Hills
- Camden
- Campbelltown
- Wollongong
- Richmond
- Dee Why
- Moss Vale
- Woy Woy

Each checked HTML page had the expected page file, H1, phone CTA, quote CTA, and no stale/risky wording match.

## Package Changes

- Added `audit:page-health`
- Added `audit:response-times`
- No new dependencies
- No removed dependencies
- `package-lock.json` unchanged

## Remaining Owner Review Items

- Large PNG copies remain in `public/images` and are exported. They can be reviewed later for cleanup or replacement, but this QA pass did not delete public assets.
- Exact ASP number/categories are still not displayed because they are not stored in the repo.

## Deploy Status

- Source commit: pending at time of report creation
- gh-pages deploy commit: pending at time of report creation
- Live cache-busted verification: pending
- Live normal verification: pending

## Final Status

PASS pending clean source commit, clean gh-pages deploy, and live verification.
