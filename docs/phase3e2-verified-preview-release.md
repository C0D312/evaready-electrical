# Phase 3E1-3E2 Verified Preview Release

Verified on 15 September 2026 (Australia/Sydney). This records the tested and
deployed implementation, not this document's own future commit SHA.

## Release Identity

- Repository: `C0D312/evaready-electrical`.
- Previous main: `e6197fcd00747ae86cabfff675516176c9e66ec6`.
- Directly approved and deployed main: `1b0a996285a7651657ccf8801c3f3a95ed298994`.
- Recovery branch: `backup/main-before-phase3e2-2026-09-15`, at previous main.
- [Successful workflow](https://github.com/C0D312/evaready-electrical/actions/runs/34927499974).
- [Successful deployment](https://github.com/C0D312/evaready-electrical/deployments/6451497662).
- Artifact `10379489454`: 91,569,948 downloaded ZIP bytes.
- ZIP SHA-256: `eb9e868c0c00df53dcdb09e56c35cb506fd1f7df63ef674be3d2924f8e96ddbe`.
- TAR SHA-256: `d57b9eb22028784696d4bcf4ea93e5fb9496352c73c98790637a8bd12c997542`.
- [Verified preview](https://c0d312.github.io/evaready-electrical/).

The ordinary main fast-forward used the full expected previous SHA, not the
shortened typo in the owner's recovery-branch instruction. No force push,
merge commit, PR, workflow change or manual workflow dispatch was used. The
existing conditional Google aggregate refresh step was **skipped**.

## Recoverable Backup

The existing committed-only backup at
`C:/Users/Admin/EVAREADY-backups/2026-09-06-before-e619-release` was reverified.
Its 44-ref complete-history bundle includes the previous main. `git bundle verify`
passed; both ZIP source archives were fully read, not merely opened. All three
file hashes matched their existing manifest. Nothing was overwritten and no
loose owner files, dependencies, credentials or build output were copied.

Names, sizes and hashes are recorded in
`reports/phase3e2-preview-release.json`. The historical backup's older manifest
is preserved: reusing it proves recovery of previous main, not that it contains
every later feature-branch commit.

## Retained Preparation

The clean exact-commit preparation for `1b0a996` remains qualified by the
70-file evidence manifest SHA-256
`15a92ea61fcbff6ccc2b3bc1769b3b1dd3365a06798bbf387dacb6695b08f8b3`.
Its 27 command groups passed: install, full/production dependency audits,
lint, TypeScript, production build, static audits, 1,522 audit-unit tests and
register drift. Both dependency audits found zero vulnerabilities.

The original 4,459-case acceptance ledger is retained with matching source,
test and dependency inputs: 3,647 executed and 812 supported retained results.
It is not represented as 4,459 newly executed Linux-artifact browser tests.
Historical Phase 3E1 evidence (19,206 width/text cells and 2,156 browser tests)
is also not relabelled as a fresh whole-site browser sweep after later shared
interface changes.

## Actual CI Differences

Local preparation and artifact browser checks used Node **22.23.1**. The
unchanged workflow selects Node 22 and resolved **22.23.2** on Linux. Both used
npm 10.9.8 and Next 16.3.4; the build used Turbopack. React is 19.2.4,
Playwright 1.60.0, Sharp 0.35.4, TypeScript 5.9.3 and tsx 4.22.4.
No claim of identical operating systems or patch-level build environments is made.

The Windows export has 7,152 files and the Linux artifact 6,151. The 1,001
Windows-only nested segment payloads match the corresponding native flat Linux
payloads. All file and payload differences were reconciled. JavaScript bundles
are unchanged. Qualified differences are limited to generated build identity,
timestamp, static segment aliases, Flight delivery batching/cross-ID order,
one CSS asset/path and four named files with LF/CRLF differences. Flight record
contents and per-ID order, and all remaining HTML content, are compared exactly.

The CSS comparison found 20 Lab numeric-rounding differences no greater than
0.000100001 per component (alpha unchanged) and 11 extra utilities with no
matching classes in any of the 1,004 HTML files or standalone compiled-JavaScript
tokens. This is consistent with native compiler rounding and automatic source
discovery, not proof of one exclusive cause. The exact before/after CSS hashes
and all 31 changes are in the report. Fresh artifact browser checks supplement
this qualification; CSS is not claimed byte-identical.

## Live Verification

All **7,153 HTTP checks passed on their first attempt**:

- 6,151 deployed files: status, no redirect, byte size, SHA-256 and MIME.
- 1,001 sitemap route URLs: exact deployed HTML and correct MIME/status.
- One deliberately missing route: exact custom 404 body and HTTP 404.
- Version marker: exact approved `1b0a996285a7651657ccf8801c3f3a95ed298994`.

Fresh downloaded-artifact domain, metadata, page-health and links/CTA audits
passed. Canonicals, sitemap, robots and route contracts passed. All 873 suburbs
retain `index, follow`, self-canonicals and sitemap membership, with zero
`noindex`, redirects or evidence-directory files. No owner indexation decisions
or public evidence records were added.

Public verification used HTTP only. It did not execute public-site JavaScript,
submit genuine forms or generate genuine conversions.

## Contained Artifact Browsers

Base URL: `http://127.0.0.1:4224/evaready-electrical/`.

| Project | Passed | Failed | Skipped |
| --- | ---: | ---: | ---: |
| desktop-chromium-1440 | 28 | 0 | 0 |
| desktop-firefox-1440 | 28 | 0 | 0 |
| desktop-webkit-1440 | 28 | 0 | 0 |
| mobile-chrome-390 | 28 | 0 | 0 |
| mobile-safari-390 | 28 | 0 | 0 |
| ipad-768 | 28 | 0 | 0 |
| ipad-pro-1024 | 28 | 0 | 0 |
| Total | 196 | 0 | 0 |

Each project ran the unmodified committed controls (12), card links/history
(12), and menu/Quote handoff (4) tests. Three distinct service renderers were
covered: Level 2, Solar & Batteries, and Consumer Mains. Controls and cards
covered 100% and simulated 200% text; handoff used 390px at both text scales.
Natural pointer/keyboard activation, focus restoration and meaningful
assertions were preserved. Chromium 148.0.7778.96, Firefox 150.0.2 and WebKit
26.4 ran on Windows; mobile/iPad labels are emulation, not physical-device or
macOS Safari verification.

Every run has independently reconciled requests and a durable proxy journal.
The fail-closed boundary allowed only local reads. Eight qualification probes
passed, including six rejections before DNS or upstream connection. There were
zero unauthorised external forwards, third-party deliveries or sentinel
connections/requests/bytes. Google and ServiceM8 responses were inert fixtures.
Normal failed inner polling observations remain recorded; no failed test was
silently accepted or retried. Thirteen operation-oracle negative controls were
retained. This is not fresh exhaustive all-route cross-browser coverage,
WCAG certification, a Lighthouse run, field Core Web Vitals or an INP measurement.

## Preserved Failures

Temporary evidence-harness qualification initially exposed an archive empty-path
segment check, then unqualified CSS naming, Flight framing/batching, preload
hint/async-iterator records and named line-ending differences. Each failure was
preserved, diagnosed and rechecked with narrow rules and negative controls.
Final archive, CSS, Flight/HTML and full-export comparisons passed. No website
source or committed browser assertion was altered to obtain these results.

The first release-receipt reader also exceeded Node's default child-process
output buffer when reading the full committed register. It failed before
writing a receipt. Increasing only that temporary reader buffer to 32 MB
allowed the unchanged full-row comparisons to complete.

`Get-NetTCPConnection` was denied. It was not retried with alternate inventory
access; the authorised server's own exclusive loopback bind/readiness check
proved its port usable. No unrelated process was touched. Full failure details
and local evidence digests are retained in the machine-readable report; raw
temporary files, screenshots and build output are not committed.

## Register Reconciliation And Holds

Exactly **895** previously pending rows now record the verified release:
873 suburbs, 21 Phase 3E2 rewrites and the Services catalogue's two derived
description changes. Only publication state, live SHA and the completed
publication hold change. All other fields and all **106** remaining rows are
unchanged, including their historical live SHAs. The Services catalogue is
not credited with a new individual review in this step.

All 1,001 rows are now published/live-verified; individual review states were
already recorded and are not elevated by deployment. Business, credential,
authorisation, serviceability, legal/privacy, offer-artwork, review-integration
and indexation holds remain truthful. Publication is not a branded-domain
launch or a declaration that the website is perfect.

The reconciliation is a documentation/register-only feature-branch change.
Its later SHA is **not** approved for main publication. Owner files, artwork,
external accounts, credentials, DNS, CNAME, registrar and hosting settings are
unchanged. Future main publication requires a new direct exact-SHA approval.

The reconciliation passed lint, TypeScript, all 1,524 audit-unit tests (zero
failures, cancellations or skips), register drift and `git diff --check`.
The two added tests bind every newly published route to the release receipt
and preserve the exact artifact-browser counts and containment boundaries.
The qualified implementation build was retained because this change touches
no runtime website source, browser test, asset, dependency or workflow.
