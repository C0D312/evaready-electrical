# Final Theme, Inspections, Solar and Navigation QA

## Scope

- Dark-mode dark-blue theme
- Slightly lighter blue section variation
- Untinted hero van image handling
- Red emergency-only accents
- Pre-Purchase & Rental Electrical Inspections page
- Solar & Batteries top-level page
- Desktop and mobile navigation
- CTAs, tracking, service pages, suburb pages and legal pages

## Audit Results

- `audit:all-suburb-copy`: pass
- `audit:suburbs`: pass
- `audit:metadata`: pass, 0 warnings
- `audit:links`: pass, 0 broken links
- `audit:visible-copy`: pass, 0 warnings
- `audit:page-health`: pass, 0 critical warnings
- `audit:response-times`: pass, 0 hard mismatches
- `audit:visibility`: pass, 1002 routes, 7014 rows, 0 critical issues
- `audit:live-links-and-ctas`: pass, 1002 HTML routes, 118797 rows, 0 failures
- `lint`: pass
- `build`: pass

Note: the first requested audit run was executed after deleting `out/`, so generated-HTML audits correctly reported missing generated HTML. After the GitHub Pages build was produced, the generated-output audits were rerun and passed.

## Visual QA

- Routes checked locally in Chromium: 22
- Viewports checked locally: 18
- Route/viewport checks: 396
- Local visual failures: 0
- WebKit smoke check: pass
- Firefox smoke check: unavailable in this environment; launch timed out
- Screenshot path: `reports/final-new-pages-theme-qa/`

Representative screenshots created:

- homepage mobile and desktop
- emergency mobile and desktop
- inspection page mobile and desktop
- solar page mobile and desktop
- desktop header at 1024, 1366 and 1920
- tablet menu at 820 and 1024

## Fix Applied

Real issue found:

- A late CSS block hid the real internal hero image layer and allowed the CSS background fallback/overlay treatment to carry the van.

Fix:

- Updated the shared internal hero selector so overlay divs are hidden while real hero image elements render normally.
- Reconfirmed hero image elements use full opacity, no filter, and normal blend mode.

Files changed:

- `app/globals.css`

## Generated Output Checks

- Stale strings absent: yes
- Risky wording absent: yes
- Inspection unsafe claims absent: yes
- Solar unsafe claims absent: yes
- Inspection H1 present: yes
- Solar H1 present: yes
- Inspection route in sitemap: yes
- Solar route in sitemap: yes
- Google Ads tag present: yes
- Phone conversion attributes present: yes
- Quote conversion attributes present: yes
- `tel:+61461247247` present: yes

## Live Verification

Pending deployment of the CSS correction.

## Final Result

Pending deployment.
