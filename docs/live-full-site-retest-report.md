# Live Full-Site Retest Report

Date/time: 2026-06-10 Australia/Sydney

Final result: PASS

## GitHub State

- Source before retest: ede159038438d4bdbfef27e8d4b2405046e1936a
- Refreshed gh-pages deploy: a1152a5a54bbd18227443357bc47bb738a671fa3
- Deployed build id verified live: 3ObTLPIn5e-35Xid-xqO3

## Local Full-Site Retest

- Fresh build: PASS, 1002 static pages generated
- `npm.cmd run audit:all-suburb-copy`: PASS, 873 suburb pages, 0 warnings
- `npm.cmd run audit:suburbs`: PASS, 873 suburb pages, 0 warnings
- `npm.cmd run audit:metadata`: PASS, 995 rows, 0 warnings
- `npm.cmd run audit:links`: PASS, 19,965 internal links checked, 0 broken
- `npm.cmd run audit:visible-copy`: PASS, 995 pages, 0 warnings
- `npm.cmd run audit:page-health`: PASS, 995 routes, 0 critical warnings
- `npm.cmd run audit:response-times`: PASS, 873 suburbs, 0 hard mismatches
- `npm.cmd run audit:all-routes-visibility`: PASS, 998 routes, 0 critical warnings
- `npm.cmd run audit:live-links-and-ctas`: PASS, 998 HTML routes, 109,521 link/CTA rows, 0 broken links, 0 CTA failures
- `npm.cmd run audit:visibility`: PASS, 998 routes x 7 viewports, 6,986 rows, 0 critical issues
- `npm.cmd run lint`: PASS

## Output Grep Retest

- Stale launch strings: 0
- Risky/fake/Level 1/Level 3 strings: 0
- Postcode-only wording: 0
- Duplicate location wording: 0
- Chopped phrase fragments: 0
- Google Ads tag retained: yes
- Phone and quote conversion attributes retained: yes
- `tel:+61461247247` retained: yes
- 60-minute/90-minute response wording retained: yes
- Ausgrid/Endeavour Energy Accredited Level 2 ASP wording retained: yes
- Google Rating/review proof retained: yes
- Privacy and terms required copy retained: yes

## Live Public Retest

- Live sitemap routes checked: 995
- Live routes checked including sitemap, robots, site-version, 404 and not-found: 1000
- Live suburb pages checked: 873
- Live route failures: 0
- Live stale/risky/chopped text failures: 0
- Live CTA/tracking failures: 0
- Live link/asset failures: 0
- Live public raw link/asset rows checked: 122
- Unique live internal targets checked: 25
- Unique live asset targets checked: 14
- Reports:
  - `reports/live-full-site-retest-audit.csv`
  - `reports/live-full-site-link-audit.csv`

## Panania 2213

- Local every-route visibility audit: PASS
- Live sitemap crawl: PASS
- H1/main content/phone CTA/quote CTA/mobile layout remain covered by the full visibility audit and the previous live browser check.

## Launch Recommendation

PASS. The source, generated output, refreshed gh-pages deploy and live public site are launch-ready based on this retest.
