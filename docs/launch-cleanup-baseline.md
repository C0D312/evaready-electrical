# Launch Cleanup Baseline

Recorded: 2026-07-26 (Australia/Sydney)

## Repository and deployment safety

- Repository: `C:\Users\Admin\evaready-electrical`
- Branch: `codex/responsive-ux-overhaul`
- Baseline commit: `6678d1c70d0849088d694e8e6882afd0f582920b`
- Baseline commit message: `fix: refine responsive storm theme and layouts`
- Package manager: npm (`package-lock.json`)
- GitHub workflow: `.github/workflows/pages.yml`
- Workflow trigger: pushes to `main` and manual `workflow_dispatch`
- Workflow action: validation and static export only; it contains no deployment step
- Current feature-branch push effect: no GitHub Actions trigger and no Pages deployment
- Prohibited deployment branches for this cleanup: `main` and `gh-pages`

The working tree already contained generated reports, screenshots, logs and other local files before this cleanup. Source files shown as modified by `git status` were hash-compared with `HEAD`; `app/globals.css`, `app/offers.css`, `components/offer-card.tsx`, `components/site-frame.tsx` and `tests/e2e/ux-overhaul.spec.ts` were byte-identical to `HEAD`. Existing user work will not be reset, stashed or overwritten.

## Runtime and framework

| Item | Baseline |
| --- | --- |
| Local Node.js | 26.1.0 |
| CI Node.js | 22 |
| npm | 11.13.0 |
| Next.js | 16.2.6 |
| React / React DOM | 19.2.4 |
| TypeScript | 5.9.3 |
| Playwright | 1.60.0 |
| Tailwind CSS | 4.3.0 |

Next.js uses `output: "export"`, `trailingSlash: true`, environment-driven `basePath` and `assetPrefix`, and unoptimised static images. The Next.js 16 static-export and Server/Client Component guides in `node_modules/next/dist/docs/` were reviewed before planning implementation changes.

## Route footprint

| Route group | Count |
| --- | ---: |
| Static export pages | 1,005 |
| Known routes | 1,004 |
| HTML routes | 1,003 |
| Generated service pages | 46 |
| Electrical fault guides | 15 |
| Service-area regions | 16 |
| Service-area areas | 39 |
| Suburb pages | 873 |

The route footprint matches the expected architecture. No missing suburb or service route was found.

## Validation baseline

| Check | Result |
| --- | --- |
| ESLint | PASS |
| Standalone TypeScript (`tsc --noEmit`) | PASS |
| Production build | PASS, 1,005 static pages |
| All suburb copy | PASS, 873 records, 0 warnings |
| Suburb completeness | PASS, 873 records, 0 warnings |
| Metadata | PASS, 1,001 pages, 0 warnings |
| Internal links | PASS, 20,202 checked, 0 broken |
| Visible copy | PASS, 1,001 pages, 0 warnings |
| Page health | PASS, 1,001 pages, 0 critical findings |
| Response classifications | PASS, 873 records, 0 mismatches |
| Route visibility | PASS, 1,004 routes, 0 critical failures |
| Production-domain URL audit | PASS, 0 canonical/sitemap/schema/asset issues |

The local Node 26 build emits a deprecation warning for `module.register()`. The repository workflow uses Node 22, so this is an environment warning rather than an application failure.

## Payload baseline

### Shared assets

| Payload | Raw bytes | Gzip bytes |
| --- | ---: | ---: |
| Exported CSS chunks (3) | 482,424 | 69,095 |
| Exported JavaScript chunks (12) | 831,770 | 249,287 |
| Homepage referenced CSS + JS | 1,164,592 | 273,775 |
| Services referenced CSS + JS | 1,164,592 | 273,793 |
| Service Areas referenced CSS + JS | 1,168,071 | 275,328 |

### HTML

| Route | Raw bytes | Gzip bytes |
| --- | ---: | ---: |
| Homepage | 307,447 | 36,647 |
| Services | 830,791 | 72,287 |
| Service Areas | 750,826 | 71,587 |
| Emergency Electrician | 479,979 | Not separately recorded |
| Switchboard Upgrades | 460,837 | Not separately recorded |
| Example fault guide | 264,191 | Not separately recorded |
| Panania suburb page | 491,199 | Not separately recorded |

The Service Areas HTML includes all 873 search records as a prop to a Client Component. This is the clearest safe payload-reduction target because the same indexable region and suburb links remain server-rendered elsewhere on the page architecture.

### Source styles and public assets

| Item | Baseline |
| --- | ---: |
| `app/globals.css` | 461,410 bytes |
| `app/ux-overhaul.css` | 47,258 bytes |
| `app/footer.css` | 14,415 bytes |
| `app/offers.css` | 5,678 bytes |
| Public WebP files | 29 files / 2,289,704 bytes |
| Public PNG files | 4 files / 182,394 bytes |
| Public JPEG files | 1 file / 50,385 bytes |
| Public SVG files | 1 file / 763 bytes |
| Local webfont files | 0 |

## Responsive baseline

Measured on the local development server before cleanup:

| Viewport | Banner | Ticker | Desktop nav | Total header | Horizontal overflow |
| --- | ---: | ---: | ---: | ---: | ---: |
| 390px | 115px | 34px | hidden | 149px | 0px |
| 768px | 125px | 34px | hidden | 159px | 0px |
| 1440px | 150px | 27px | 40px | 217px | 0px |

No application exception or hydration error was observed. One third-party network request was blocked by the restricted local test environment and was recorded as an environmental console warning.

## Baseline performance caveat

Lighthouse is not installed in the repository and no permanent dependency will be added only to produce a score. The existing historical development-server baseline (Performance 70, Accessibility 100, Best Practices 77, SEO 92) is not a production score and will not be represented as one. This cleanup will use production-export payload measurements, browser performance entries, layout-shift observation and existing responsive smoke audits for before/after evidence.
