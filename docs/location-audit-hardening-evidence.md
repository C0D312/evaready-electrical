# Hardened Location Audit Evidence

## Evidence identity

- Branch: `codex/responsive-ux-overhaul`
- Required starting commit: `29b30f566fcdc9155540d9fd51f16a78d1636371`
- Tested implementation commit: `7e7791dfd5fd51438410f8d8df3a231cf8a3e747`
- Runtime: Node.js `22.23.1`, npm `10.9.8`
- Framework: Next.js `16.3.0`, React `19.2.4`
- Image metadata decoder: Sharp `0.35.3`
- Configuration: GitHub preview base path `/evaready-electrical`
- Evidence run date: 2026-08-10 Australia/Sydney

This evidence covers audit and test tooling only. No public page, header, metadata,
canonical, sitemap, robots, redirect, route, tracking, ServiceM8 or indexation
behaviour changed.

## Corrected audit defects

1. The Playwright route previously began with `/`, which could bypass the preview
   base path. Navigation now uses the shared preview URL helper, the static server
   has a strict base-path mode, and each project proves root routes return `404`
   while preview routes return `200`.
2. `indexationBehaviorChanged` was a constant. It is now derived by comparing the
   measured current output with the expected mode-specific output.
3. A technical pass and blocked owner gate were easy to conflate. Reports now use
   `technicalBaselineResult`, `launchDecisionGate` and
   `overallLaunchReadiness` separately.
4. Robots checks used substring matching. Directives are now tokenised exactly;
   `nofollow` cannot satisfy `follow`, and contradictory tokens fail.
5. Only the empty baseline could be tested. A synthetic applied-decision mode now
   validates all four future statuses without adding a real owner decision.
6. An empty privacy dataset could appear to prove too much. The result is now
   explicitly scoped to configured records and evidence assets.
7. Only referenced images were scanned. Every physical file in the approved
   evidence directory is now scanned and orphan files fail.
8. Metadata checks used byte-substring heuristics. Sharp now decodes image
   metadata for EXIF, XMP, IPTC, GPS and embedded comment/text checks.
9. Asset validation did not prove all containment and media properties together.
   It now rejects traversal, symlink escape, signature/extension mismatch,
   decoded-format mismatch and declared/actual dimension mismatch.
10. The tracked owner CSV could be mistaken for a working data file. The generator
    and owner guides now require a private copy and forbid completing the tracked
    GitHub template.
11. The location-quality evidence had an older generated timestamp. A fresh
    exact-commit CSV is committed with this evidence.
12. The Playwright assertion lacked exact-commit evidence. The committed JSON now
    records the implementation SHA, timestamps, command, base URL, each project,
    HTTP probes and final pathname. The parser also accepts Playwright's basename
    representation of the spec file.

## Current public baseline

| Measurement | Before | After |
| --- | ---: | ---: |
| Suburb routes | 873 | 873 |
| `index, follow` | 873 | 873 |
| `noindex` | 0 | 0 |
| Self-canonicals | 873 | 873 |
| Sitemap suburb URLs | 873 | 873 |
| Redirects | 0 | 0 |
| Call pathways | 873 | 873 |
| Quote pathways | 873 | 873 |
| Unreviewed decisions | 873 | 873 |
| Approved evidence records | 0 | 0 |
| Evidence-directory files | 0 | 0 |

Technical baseline result: `PASS`.

Launch decision gate and overall launch readiness:
`BLOCKED - OWNER INDEXATION DECISIONS MISSING`.

The blocked gate is deliberately separate from ordinary lint, TypeScript and
production builds.

## Similarity terminology

The former 99.94% wording is now identified accurately as the
**locality-normalised repeated-block word rate**, not a conventional pairwise
page-similarity score.

- Exact shared visible-block word rate: `58.03%`
- Locality-normalised repeated-block word rate: `99.94%`
- Highest genuinely calculated locality-normalised pairwise similarity: `100.00%`
- Approved job, local photo and testimonial evidence records: `0`

The result remains clear: after locality replacement, the visible suburb corpus
is overwhelmingly generated from the same repeated template blocks.

## Privacy result and limits

Scoped result:
`No configured PII patterns or evidence assets exist in the current empty scoped dataset.`

The audit covered typed location-evidence records, every referenced evidence
asset, every physical file under `public/images/location-evidence/` including
orphans, and all 873 rows in the blank owner-review CSV. It found zero referenced
assets, zero physical files and zero orphan assets.

This is not proof that the repository or Git history contains no PII. Automated
checks do not perform OCR, facial recognition or complete contextual
identification. Human review remains required for faces, number plates,
addresses, documents, labels, properties, rights, consent and contextual
re-identification.

## Owner data boundary

The tracked 873-row owner-review CSV remains blank in every owner-controlled
column.

**Copy the blank template to an owner-controlled private system. Never complete
or commit the tracked GitHub copy.**

Real prioritisation still requires owner-controlled Search Console, Google Ads,
ServiceM8, commercial/revenue, completed-job, serviceability and legitimate
referral evidence. Raw or aggregated exports must remain outside GitHub. A later
public implementation may receive only an approved manifest containing route,
decision and decision date, plus separately sanitised public evidence that has
passed the approved privacy process.

## Validation results

The exact implementation commit was checked in a clean detached worktree.

- `npm ci`: passed; 362 packages installed.
- `npm audit`: passed; 0 vulnerabilities.
- `npm audit --omit=dev`: passed; 0 vulnerabilities.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- Clean GitHub-preview `npm run build`: passed; 1,005 static pages.
- `npm run test:location-audits`: 19 passed, 0 failed.
- `npm run audit:suburbs`: 873 pages, 0 warnings.
- `npm run audit:all-suburb-copy`: 873 pages, 0 warnings.
- `npm run audit:location-evidence`: passed.
- `npm run audit:location-indexation`: technical baseline passed; owner gate blocked.
- `npm run audit:location-privacy`: passed for the explicitly empty scoped dataset.
- `npm run generate:location-owner-review`: 873 blank owner rows.
- `npm run audit:metadata`: 1,001 rows, 0 warnings.
- `npm run audit:page-health`: 1,001 pages, 0 critical findings.
- `npm run audit:links`: 1,004 known routes, 1,003 generated HTML routes,
  20,143 internal links and 0 broken links.
- `npm run audit:location-output`: 16 regions, 39 areas, 873 suburbs, 0 failures.
- `npm run audit:visible-copy`: 1,001 pages, 0 warnings.
- `npm run audit:claims`: 0 failures and 0 unsupported visible claims.
- `npm run audit:response-times`: 873 pages, 0 hard mismatches.
- `npm run audit:live-links-and-ctas`: 1,004 HTML routes, 131,186 link/CTA rows,
  0 broken links and 0 CTA failures.
- `git diff --check`: passed for the implementation range.

Synthetic adversarial tests reject exact robots errors, contradictory directives,
unknown/duplicate routes, invalid dates, path traversal, orphan images,
signature/extension mismatch, dimension mismatch, EXIF/XMP/GPS metadata,
synthetic PII patterns, missing approvals and leading-slash preview navigation.

## Playwright evidence

Exact base URL:
`http://127.0.0.1:4177/evaready-electrical/`

Exact command:
`C:\Users\Admin\AppData\Local\Temp\node-v22.23.1-win-x64\node.exe node_modules/@playwright/test/cli.js test tests/e2e/location-indexation.spec.ts --workers=1`

All 15 projects passed with zero failures and zero skips:

- Desktop Chromium: 1366, 1440 and 1920
- Desktop Firefox: 1440
- Desktop WebKit: 1440
- Google Chrome: 1440
- Microsoft Edge: 1440
- Mobile Chrome: 360, 390, 412 and 430
- Mobile Safari: 390 and 430
- iPad: 768
- iPad Pro: 1024

Every project measured this matrix:

- `/` -> `404`
- origin-root Panania -> `404`
- `/evaready-electrical/` -> `200`
- preview Panania -> `200`

Every project ended at:
`/evaready-electrical/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/`

The machine-readable files are under
`reports/location-audit-hardening/final-7e7791d/`.
