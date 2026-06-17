# Full-site visibility contrast fix report

Date: 2026-06-18

## Scope

- Fixed the pale emergency/help panel contrast issue shown on the homepage triage block.
- Applied the fix in shared CSS so `bg-red-50` light alert/help panels keep dark readable text instead of inheriting the site-wide dark-section white text override.
- Added low-contrast text detection to the all-route Playwright visibility audit.
- Refined the static route detector so approved call-first wording such as "burning smells" is not treated as chopped copy.

## Source state

- Source SHA before: `19b21df64f2`
- Source SHA after: recorded in final deployment response
- gh-pages SHA before: `62689d07a63`
- gh-pages SHA after: recorded in final deployment response

## Files changed

- `app/globals.css`
- `scripts/audit-page-visibility.ts`
- `scripts/audit-all-routes-visibility.ts`
- `docs/full-site-visibility-contrast-fix-report.md`
- Regenerated audit reports under `reports/`

## Validation

- Build: PASS, 1004 static pages generated
- Lint: PASS
- Suburb audit: PASS, 873 suburb pages, 0 warnings
- Metadata audit: PASS, 997 rows, 0 warnings
- Internal links: PASS, 20,034 links, 0 broken
- Visible copy: PASS, 997 pages, 0 warnings
- Page health: PASS, 997 routes, 0 critical warnings
- Response-time audit: PASS, 873 suburbs, 0 hard mismatches
- Static all-routes sweep: PASS, 1000 routes, 873 suburb pages, 0 critical warnings
- Playwright visibility audit: PASS, 1000 routes x 7 viewports = 7000 checks, 0 critical issues

## Visual fix result

- Homepage emergency triage card text is now dark on the pale red panel.
- Nested cards inside the pale red panel retain readable dark text.
- Red Call Now buttons retain white text.
- No horizontal overflow was detected by the full visibility audit.

## Output checks

- Stale strings: PASS, no matches
- Risky claims: PASS, no matches
- Google Ads tag: present
- Phone conversion action: present
- Quote conversion action: present
- `tel:+61461247247`: present

## Final recommendation

PASS for deployment after source and gh-pages commits complete and live public verification passes.
