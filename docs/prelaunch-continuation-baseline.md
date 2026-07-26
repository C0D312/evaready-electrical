# Pre-Launch Continuation Baseline

Recorded: 2026-07-27 (Australia/Sydney)

## Safety and repository state

- Branch: `codex/responsive-ux-overhaul`
- Baseline commit: `e8ca5171a07514595aede31dcb352b71791e5593`
- Package manager: npm (`package-lock.json`)
- Local runtime: Node.js 26.1.0, npm 11.13.0
- Framework: Next.js 16.2.12, React 19.2.4
- Deployment workflow: `.github/workflows/pages.yml`
- Workflow trigger: pushes to `main` and manual dispatch only
- Feature-branch push result: no workflow or deployment trigger
- Existing uncommitted production-source changes: none
- Existing non-source QA/log working-tree entries: 325; excluded from this task
- Custom/branded domain requests made during this task: none

The static export retains `NEXT_PUBLIC_BASE_PATH=/evaready-electrical` and
`NEXT_PUBLIC_SITE_URL=https://c0d312.github.io/evaready-electrical`.

## Validation baseline

| Check | Baseline result |
| --- | --- |
| ESLint | PASS |
| TypeScript (`tsc --noEmit`) | PASS |
| Clean production build | PASS, 1,005 static pages |
| Suburb copy | PASS, 873/873 |
| Suburb completeness | PASS, 873/873 |
| Metadata | PASS, 1,001 pages, 0 warnings |
| Internal links | PASS, 20,171 checked, 0 broken |
| Visible copy | PASS, 1,001 pages, 0 warnings |
| Page health | PASS, 1,001 pages, 0 critical findings |
| Response classifications | PASS, 873 records, 0 mismatches |
| Canonical/sitemap/schema/assets | PASS, 0 issues |
| Production responsive smoke | PASS, 84/84 checks |

## Header baseline

The committed header serves the original 1280x427 JPEG at every viewport. CSS
forces it into the banner box with `object-fit: fill`, so the rendered aspect
ratio differs materially from the source on desktop and wide screens.

| Viewport | Banner | Ticker | Nav | Total header |
| --- | ---: | ---: | ---: | ---: |
| 320x568 | 110px | 28px | hidden | 144px |
| 360x800 | 110px | 28px | hidden | 144px |
| 375x812 | 115px | 28px | hidden | 149px |
| 390x844 | 115px | 28px | hidden | 149px |
| 412x915 | 115px | 28px | hidden | 149px |
| 430x932 | 115px | 28px | hidden | 149px |
| 768x1024 | 125px | 28px | hidden | 159px |
| 820x1180 | 125px | 28px | hidden | 159px |
| 1024x768 | 107px | 20px | 34px | 167px |
| 1280x800 | 133px | 21px | 40px | 200px |
| 1366x768 | 142px | 21px | 40px | 209px |
| 1440x900 | 150px | 21px | 40px | 217px |
| 1920x1080 | 200px | 21px | 40px | 267px |
| 2560x1440 | 267px | 21px | 40px | 334px |

## Local production timing baseline

The exported build was served locally at the GitHub Pages base path. Each route
was measured three times in Chromium with cache disabled. These are local lab
timings, not field Core Web Vitals or Lighthouse scores.

| Profile | Average LCP | Average load | Average transfer | Homepage LCP | Homepage CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile 390x844 | 133ms | 113ms | 2,171,536 bytes | 132ms | 0 |
| Desktop 1366x768 | 138ms | 109ms | 2,306,019 bytes | 124ms | 0 |

The local server does not apply production compression, so transfer bytes are
useful only for before/after comparison in the same environment.
