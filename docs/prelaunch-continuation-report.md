# Pre-Launch Continuation Report

Recorded: 2026-07-27 (Australia/Sydney)

## Scope and safety

- Working branch: `codex/responsive-ux-overhaul`.
- GitHub Pages preview configuration remains `NEXT_PUBLIC_BASE_PATH=/evaready-electrical`
  and `NEXT_PUBLIC_SITE_URL=https://c0d312.github.io/evaready-electrical`.
- `.github/workflows/pages.yml` runs only for pushes to `main` or manual dispatch.
- No custom-domain request, DNS change, CNAME change, deployment dispatch, external-account
  action or branded-domain test was performed.
- No menu, ticker, hamburger, sticky behavior, scrolling, phone, ServiceM8, tracking,
  metadata, schema, canonical, sitemap, route or approved-copy implementation changed.

## Implementation

The wide header previously served one 1280x427 JPEG and forced it into unrelated banner
ratios with `object-fit: fill`. This flattened the logo and allowed the header to grow to
267px at 1920 and 334px at 2560 when ticker and navigation were included.

The shared header now uses a responsive `picture` with five purpose-made WebP sources:

| Source | Intrinsic dimensions | Bytes | Viewport use |
| --- | ---: | ---: | --- |
| `evaready-header-mobile-refined-v8.webp` | 960x300 | 36,078 | below 768px |
| `evaready-header-tablet-refined-v8.webp` | 1600x250 | 37,612 | 768-1023px |
| `evaready-header-desktop-refined-v8.webp` | 2560x260 | 48,022 | 1024-1599px |
| `evaready-header-large-refined-v8.webp` | 2944x230 | 36,980 | 1600-2199px |
| `evaready-header-wide-refined-v8.webp` | 3840x230 | 50,548 | 2200px and wider |

The CSS reserves each selected source ratio and uses `object-fit: contain`. The production
smoke audit now asserts the selected source, intrinsic dimensions, full viewport bounds,
no horizontal artwork inset, natural fit and the 155px maximum wide-banner height at all
14 established viewports.

The exhaustive visibility audit also gained one bounded navigation retry. A timed-out
page is reset to `about:blank` before retrying so one transient navigation cannot create
false failures for subsequent routes.

## Header measurements

| Viewport | Banner | Ticker | Nav | Complete header | Source |
| --- | ---: | ---: | ---: | ---: | --- |
| 320x568 | 110px | 28px | hidden | 144px | mobile |
| 360x800 | 113px | 28px | hidden | 147px | mobile |
| 375x812 | 117px | 28px | hidden | 151px | mobile |
| 390x844 | 122px | 28px | hidden | 156px | mobile |
| 412x915 | 129px | 28px | hidden | 163px | mobile |
| 430x932 | 134px | 28px | hidden | 168px | mobile |
| 768x1024 | 120px | 28px | hidden | 154px | tablet |
| 820x1180 | 128px | 28px | hidden | 162px | tablet |
| 1024x768 | 104px | 20px | 34px | 164px | desktop |
| 1280x800 | 130px | 21px | 40px | 197px | desktop |
| 1366x768 | 139px | 21px | 40px | 206px | desktop |
| 1440x900 | 146px | 21px | 40px | 213px | desktop |
| 1920x1080 | 150px | 21px | 40px | 217px | large desktop |
| 2560x1440 | 153px | 21px | 40px | 220px | wide desktop |

Every measured image bound began at 0px and ended at the viewport width. The largest
calculated horizontal artwork inset was 0.04px at 2560px, below the 1px audit tolerance.

## Performance comparison

The same local static export, three-run route matrix and disabled browser cache were used
before and after. The local server is uncompressed, so the values are comparison data,
not production field Web Vitals.

| Profile | Before avg LCP | After avg LCP | Before avg images | After avg images | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile 390x844 | 133ms | 140ms | 472,798 bytes | 458,491 bytes | 0 / 0 |
| Desktop 1366x768 | 138ms | 144ms | 545,268 bytes | 542,905 bytes | 0 / 0 |

Homepage desktop LCP remained 124ms. Homepage mobile varied from 132ms to 136ms. The
small timing movement is local run variance; the measurable improvement is reduced image
transfer with preserved CLS and undistorted artwork.

## Validation

- Clean production export: PASS, 1,005 static pages.
- ESLint: PASS.
- TypeScript (`tsc --noEmit`): PASS.
- Focused Playwright: 29 passed, 7 intentional breakpoint skips, 0 failed.
- Chrome, Edge and WebKit cross-device smoke: PASS.
- Firefox: local headless runner did not initialise to an assertion result; no site
  failure was emitted.
- Responsive production smoke: PASS, 84/84 checks.
- Route inventory: PASS, 1,004 routes and 873 suburb pages.
- Internal links: PASS, 20,171 checked and 0 broken.
- Metadata/visible copy/page health: PASS, 0 warnings or critical findings.
- Canonical/sitemap/schema/assets: PASS, 0 issues under the GitHub Pages preview origin.
- Response classification: PASS, 873 records and 0 mismatches.
- Exhaustive visibility: PASS, 7,028 checks across 1,004 routes with 0 critical
  issues.

## Remaining risks

- `npm audit --omit=dev` reports three high advisories inherited through the latest stable
  Next.js 16.2.12 (`postcss` and `sharp`). npm offers only a breaking downgrade to Next
  9, so no unsafe automated fix was applied. Recheck when a compatible upstream stable
  release is available.
- The repository is tested in CI with Node.js 22; the local Node.js 26 runtime emits an
  npm-engine deprecation warning in some tooling but produced a clean build.
- Real field LCP, CLS and INP require owner-approved post-launch measurement. No external
  analytics, Search Console or branded-domain action was taken.
- Reviews, insurance, warranties, guarantees and additional claims still require genuine
  owner-supplied evidence before publication.
