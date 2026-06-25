# Global Dark-Blue Theme and Centring Pass

## Scope

Refined the shared Evaready dark-blue theme tokens and revalidated the existing shared card, icon, arrow and CTA alignment system across the public site.

## Changes

- Restored the midnight token to the deeper logo-derived navy.
- Kept the slightly lighter dark-blue token for section and panel variation.
- Normalised the emergency red token to the approved Call Now red.
- Preserved the existing shared card and CTA alignment rules.
- Preserved the untinted van image rules.

## Preserved

- Routes, H1 wording, metadata and schema.
- Google Ads tag.
- Phone and quote conversion attributes.
- `tel:+61461247247`.
- 60-minute core and 90-minute greater-region response wording.
- Ausgrid & Endeavour Energy Accredited Level 2 ASP wording.
- Mobile sticky CTA.
- Scrolling service strip.
- Mobile electrical service position with no physical address, office, depot, map or geo schema.

## Validation Summary

- `audit:all-suburb-copy`: completed before the fresh build and reported that `out/` was missing, with exit code 0.
- `audit:suburbs`: PASS.
- `audit:metadata`: PASS.
- `lint`: PASS.
- `build`: PASS with the GitHub Pages base path.
- `audit:links`: PASS.
- `audit:visible-copy`: PASS.
- `audit:page-health`: PASS.
- `audit:response-times`: PASS.
- `audit:live-links-and-ctas`: PASS.
- `audit:visibility`: timed out after a long full-route viewport run, so it was not claimed as passed.
- `audit:all-routes-visibility`: PASS as the completed equivalent route visibility check.
- Local Playwright generated-site QA: PASS across 12 representative routes and 11 requested viewport sizes, with zero horizontal overflow, header clipping, sticky CTA, H1, CTA marker or hero image style failures.
- Required generated-output markers for Google Ads, phone/quote tracking and `tel:+61461247247` were present.
- Risky public wording check returned zero matches.

Live normal and cache-busted verification results are recorded in the deployment response for this pass.
