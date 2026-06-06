# Site Version Marker Update

## Summary

Added a lightweight public build marker at `/site-version.json` so the deployed GitHub Pages version can be checked directly without inspecting page HTML.

## File Added

- `public/site-version.json`

## Marker Fields

- `marker`: `site-version`
- `site`: `Evaready Electrical`
- `deployTarget`: `GitHub Pages`
- `basePath`: `/evaready-electrical`
- `buildDate`: `2026-06-06T22:56:45+10:00`
- `versionNote`: `Updated during clean deploy verification. Final Git SHAs are recorded in the deployment summary.`

## Live URL

- `https://c0d312.github.io/evaready-electrical/site-version.json`

## Validation Checklist

- Suburb visible-copy audit: PASS, 873 suburb pages checked, 0 warnings
- Suburb page audit: PASS, 873 suburb pages checked, 0 warnings
- Metadata audit: PASS, 995 rows, 0 warnings
- Internal-link audit: PASS, 19,963 links checked, 0 broken
- Visible-copy audit: PASS, 995 pages checked, 0 warnings
- Lint: PASS
- Build: PASS, 1,002 static routes generated
- Generated output includes `site-version`: PASS
- Google Ads tag remains present: PASS
- Phone and quote conversion attributes remain present: PASS
- Stale and risky launch-blocker strings remain absent: PASS

## Notes

The marker is intentionally static and lightweight. It avoids runtime APIs and does not change page copy, routes, metadata, schema, Google Ads tracking, or CTA behaviour.
