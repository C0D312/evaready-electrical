# Suburb Metadata Sentence-Aware Fix

## Summary

Suburb meta descriptions now flow through the shared sentence-aware metadata helper before being returned to the suburb SEO metadata path. The helper chooses from complete sentence candidates first and only trims to a safe word boundary as a fallback.

## Root Cause

The suburb metadata generator was selecting the first candidate that fit the character limit. That was usually safe, but it allowed future phrase changes or override text to be clamped after selection, which could leave weak endings such as "general.", "across.", "planned electrical.", "defect.", "power.", "Level 2 electrical." or a partial regional suffix.

## Files Changed

- `lib/meta-description.ts`
- `data/service-area-coverage.ts`
- `scripts/audit-metadata.ts`

## Generator Behaviour

- Builds suburb descriptions from complete sentence candidates.
- Prefers descriptions in the 120-155 character range where practical.
- Enforces a 160 character hard maximum.
- Repairs weak final tokens if fallback trimming is needed.
- Keeps region-aware suffixes such as "across the Blue Mountains" only when they fit as a complete phrase.

## Audit Upgrade

`scripts/audit-metadata.ts` now adds explicit checks for incomplete endings, including:

- `general.`
- `across.`
- `planned electrical.`
- `defect.`
- `power.`
- `Level 2 electrical.`
- partial regional endings such as `across the Blue.`

## Sample Current Descriptions

- Panania: "Electrician Panania 2213 for older boards, hot water circuits, safety switches, duplex or villa power and Level 2 support."
- Coogee: "Electrician Coogee 2034 for coastal faults, outdoor lighting, switchboards, smoke alarms, power and Level 2 support."
- Linden: "Electrician Linden 2778 for emergency faults, switchboards, hot water, aircon, CCTV/data and Level 2 support across the Blue Mountains."

## Validation

- `npm.cmd run audit:metadata`: PASS, 0 warnings
- `npm.cmd run audit:suburbs`: PASS
- `npm.cmd run audit:links`: PASS
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS
- Post-build incomplete-ending grep: PASS, no matches
- Post-build stale/risky wording grep: PASS, no matches

## Deployment

- Source branch: `main`
- Deploy branch: `gh-pages`
- Public verification covered the Service Areas index, Panania, Coogee, Linden, sitemap and robots routes on normal and cache-busted URLs.
