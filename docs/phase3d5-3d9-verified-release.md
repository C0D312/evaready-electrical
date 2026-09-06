# Phase 3D5-3D9 Verified Release

Release verification completed on 7 September 2026 (Australia/Sydney).
This document records a previously deployed commit, not its own commit SHA.

## Exact Release

- Repository: `C0D312/evaready-electrical`.
- Previous main: `7972f8dec2620d97c311b1ecd9ce40545b59dc9f`.
- Approved and deployed main: `e6197fcd00747ae86cabfff675516176c9e66ec6`.
- Recovery branch: `backup/main-before-phase3d5-3d9-2026-09-06`, at previous main.
- [Successful workflow](https://github.com/C0D312/evaready-electrical/actions/runs/34037023293).
- [Successful deployment job](https://github.com/C0D312/evaready-electrical/actions/runs/34037023293/job/101497110010).
- Deployment ID: `6293670223`.
- Artifact ID: `9990509105`; downloaded archive: 85,935,820 bytes.
- Artifact SHA-256: `2e068126867adcd3901f0d71a1d1860edc27129dc4f0371934ee976c3a223b69`.
- [GitHub Pages preview](https://c0d312.github.io/evaready-electrical/).

The owner directly approved this exact fast-forward. A verified local backup
of committed Git history and both source commits was created first, without
copying the dirty owner checkout. The bundle contains 44 branch/tag/remote refs;
`git bundle verify` passed and both ZIP archives were fully read. The local
manifest records names, byte sizes, hashes, refs and creation time.

## Verification

The exact clean release source passed Node 22.23.1 `npm ci`, full and production
dependency audits (zero vulnerabilities), lint, TypeScript, production build,
150 audit-unit tests, register checks and the static audit suite. Next is 16.3.0,
Playwright is 1.60.0, and Sharp is 0.35.3. Local browser versions were Chromium
148.0.7778.96, Firefox 150.0.2 and WebKit 26.4.

The downloaded ZIP matched GitHub's digest. Archive entry paths and types were
checked before extraction. Its version marker identifies the approved SHA;
the live version marker matched the artifact byte-for-byte.

- All 6,151 deployed files matched live HTTP status, size and SHA-256.
- All 1,001 sitemap route URLs matched their deployed HTML.
- The missing-route probe returned the exact deployed custom 404 with HTTP 404.
- All 6,151 response MIME types matched their file types.
- Canonicals: 1,001 checked, zero issues; sitemap: 1,001 unique URLs.
- Robots sitemap declaration: correct. No CNAME was introduced.
- Asset references: 30,082 checked; schema URLs: 14,746 checked; zero issues.
- Page-health audit: 1,001 routes, zero critical warnings.
- Links/CTA audit: 1,004 HTML outputs and 121,187 rows, zero failures.

The deployed Linux export has 6,151 files; the earlier Windows validation export
has 7,152, reflecting platform-specific static segment aliases. Live comparisons
used the downloaded Linux artifact, not the Windows export.

## Artifact Browser Checks

The artifact was served at `http://127.0.0.1:4214/evaready-electrical/` with a
strict base path and Pages-like MIME types. Tests retained inert Google and
ServiceM8 fixtures and a fail-closed local proxy. An origin-root route cannot
pass as the preview-prefixed route. No public-site JavaScript, real submissions
or genuine conversion events were executed by this validation.

| Project | Passed | Failed | Skipped |
| --- | ---: | ---: | ---: |
| desktop-chromium-1440 | 138 | 0 | 6 |
| desktop-chromium-1366 | 2 | 0 | 0 |
| desktop-firefox-1440 | 7 | 0 | 0 |
| desktop-webkit-1440 | 7 | 0 | 0 |
| mobile-chrome-390 | 63 | 0 | 5 |
| mobile-safari-390 | 7 | 0 | 0 |
| ipad-768 | 7 | 0 | 0 |
| ipad-pro-1024 | 7 | 0 | 0 |
| Total | 238 | 0 | 11 |

The 11 skips are desktop/mobile-inapplicable cases. Accepted proxy logs reconcile
with zero unauthorised forwards. Denied requests were rejected before DNS or
upstream connection. The 83 changed routes were tested in Chromium; other engines
used seven representatives each. This is not exhaustive all-browser testing,
physical-device testing, WCAG certification or whole-site semantic completion.

A restricted Windows Firefox launch stalled and was cancelled. A WebKit attempt
passed its seven assertions but failed worker teardown; it was not accepted.
Fresh isolated runs completed successfully without changing assertions or
containment. Original logs remain outside Git. Temporary loader/path-configuration
errors were repaired before the affected server/static checks were rerun. The
passing results above exclude failed and incomplete attempts.

## Register Reconciliation

Only the 83 Phase 3D5-3D9 pending-publication rows are marked live-verified at
the deployed SHA. Their completed release hold is removed. All other fields,
the other 918 rows and the 873 unreviewed suburb decisions remain unchanged.
Legal, serviceability, credential, offer-artwork and review-API holds remain.

The register still has 107 individually reviewed routes and 894 awaiting
individual review: 873 suburb routes plus 21 specialist/consolidation holds.
Publication is not evidence of content-review completion. Further development
continues on `codex/whole-site-completion`; a different main release needs a new
direct exact-SHA approval.

No header/artwork, owner files, DNS, CNAME, registrar, branded-domain hosting,
Google/ServiceM8 accounts, Ads, billing or legal terms were changed. No PR was
opened. The existing Google aggregate refresh step was skipped.
