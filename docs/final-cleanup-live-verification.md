# Final Cleanup Live Verification

Date: 2026-06-04

## Scope

This pass cleaned stale local build/output folders, rebuilt the static export for GitHub Pages, refreshed the `gh-pages` deploy worktree, and verified the public live site with cache-busted and normal URLs.

## Source Cleanup

- Removed stale local build and QA artifacts: `.next`, `out`, `.codex-remote-attachments`, `.chrome-qa`, `.chrome-test`, `qa-home-mobile.png`, and `qa-van-*` folders.
- Fixed generated suburb metadata punctuation so override descriptions do not render `work.?.`.
- Fixed generated suburb emergency FAQ wording so the region response-time sentence is not repeated.

## Validation

- `npm.cmd run audit:suburbs`: passed, 873 suburb pages, 0 warnings.
- `npm.cmd run audit:metadata`: passed, 995 rows, 0 warnings.
- `npm.cmd run audit:links`: passed, 19,963 links checked, 0 broken, 997 known routes.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed with GitHub Pages base path and 1,000 static routes generated.

## Generated Output Checks

The fresh `out` export and `.deploy-gh-pages` worktree were checked for stale/risky strings.

Clean strings:

- `sparking.For`
- `ASP Level 2 electrical work`
- `Request a Booking or Quote`
- `Request Quote`
- `Business Details`
- `Area service coverage`
- fixed `© 2026 Evaready Electrical` footer string
- duplicate emergency FAQ response-time sentence

Confirmed present:

- Google Ads base tag: `AW-18165545331`
- Phone conversion attributes: `data-conversion-action="phone-click"` and `tel:+61461247247`
- Quote conversion attributes: `data-conversion-action="quote-click"` and `data-quote-trigger="true"`
- Substantial privacy policy content
- Substantial terms content
- Level 2 service cluster URLs in `sitemap.xml`

## Deployment

- `gh-pages` deploy commit: `4491a79d44`
- Live cache-busted verification: passed
- Live normal URL verification: passed

Checked public URLs:

- `/`
- `/emergency-electrician-sydney/`
- `/level-2-electrician-sydney/`
- `/services/consumer-mains-sydney/`
- `/services/point-of-attachment-repairs-sydney/`
- `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/`
- `/privacy-policy/`
- `/terms/`
- `/sitemap.xml`
- `/robots.txt`

## Result

PASS
