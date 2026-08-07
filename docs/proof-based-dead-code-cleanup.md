# Proof-Based Dead Code, CSS and Asset Cleanup

Date: 2026-08-08
Branch: `codex/responsive-ux-overhaul`
Baseline commit: `a78944297bf4c4e7eee393203d6c31990c5f4c58`

## Scope and safety

This cleanup removes only selectors whose owning component had already been deleted and updates references that incorrectly treated that component as current. It does not change page content, routes, SEO copy, CTAs, schema, metadata, header code, header assets, header styles or header tests.

The pre-edit worktree contained 39 tracked modifications and a large untracked audit/screenshot/log set from earlier work. Those files were treated as protected. Only the exact paths listed in this report belong to this task.

## Tracked inventory

| Category | Tracked files |
| --- | ---: |
| All tracked files | 877 |
| `app/` | 26 |
| `components/` | 29 |
| `scripts/` | 24 |
| `tests/` | 12 |
| `docs/` | 200 |
| Public image assets | 78 |

The inspection covered static imports, dynamic imports, string asset paths, CSS class names, metadata, schema, sitemap and manifest references, tests, scripts, generated HTML and recent Git history.

## Verified dead selector family

The retired owner was `components/google-review-proof.tsx`. Commit `aec94c7eff0c77d7fcabbb848396e8e2ce749aba` deleted that component. Its last implementation emitted the following class family:

- `.google-review-proof`
- `.google-review-proof__container`
- `.google-review-proof__panel`
- `.google-review-proof__copy`

The dedicated `.google-review-proof__note` styles were also orphaned from an earlier version of the same component.

Proof of non-use:

1. No tracked TS, TSX, JS or test file renders or constructs the retired class family.
2. No dynamic import or runtime selector owner exists.
3. The clean 1,005-page production export contains zero `google-review-proof` or `data-google-review-proof` markup matches.
4. Current review UI is owned by `GoogleRatingSeal`, rendered through `OfferShowcase` and the direct About-page mount.
5. The only non-document source match was a backward-looking visibility-audit selector; it now checks only the live `.google-rating-seal` owner.

Recovery remains available from Git:

```powershell
git show aec94c7eff0^:components/google-review-proof.tsx
```

## Bytes removed

| Path | Before | After | Saved | Change |
| --- | ---: | ---: | ---: | --- |
| `app/globals.css` | 454,819 B | 452,945 B | 1,874 B | Removed dead selector tokens and dedicated orphan blocks only |
| `app/ux-overhaul.css` | 73,779 B | 73,520 B | 259 B | Removed retired component tokens from shared selector groups |
| `app/emergency-electrician-sydney/emergency-theme.module.css` | 13,848 B | 13,695 B | 153 B | Removed retired component tokens from live selector groups |
| `scripts/audit-page-visibility.ts` | 24,708 B | 24,658 B | 50 B | Removed obsolete fallback selectors; retained `.google-rating-seal` |

Total dead CSS removed: **2,286 bytes**.
Total obsolete audit source removed: **50 bytes**.

## Documentation corrected

Historical reports remain available, but now state that `GoogleReviewProof` was removed and that their component references describe the June 2026 implementation rather than current source:

- `docs/air-conditioning-response-trust-proof.md`
- `docs/air-conditioning-service-page-audit.md`
- `docs/google-static-rating-card-update.md`
- `docs/homepage-leadgen-seo-audit.md`
- `docs/hot-water-service-page-audit.md`
- `docs/logo-colour-cards-trust-forms-update.md`
- `docs/logo-colour-theme-audit.md`
- `docs/mobile-first-layout-fix.md`
- `docs/playwright-failure-triage.md`
- `docs/services-index-google-trust-proof.md`
- `docs/services-index-leadgen-seo-audit.md`

## Scripts inspected and retained

- `scripts/route-inventory.ts` is imported by route, link and visibility audits and by the full-site Playwright test.
- `scripts/audit-competitor-sites.ts` and `scripts/summarize-competitor-sites.ts` form a paired manual research workflow. They are not package scripts, but ownership and future manual use are uncertain, so they were preserved.
- `scripts/benchmark-production-performance.ts` and `scripts/serve-static-export.ts` support the documented production performance workflow and were preserved.

No script met the required zero-source, zero-runtime, zero-test and zero-manual-ownership threshold for deletion.

## Assets inspected and retained

The exact-reference scan found no conclusively unused non-header image. Several zero-exact-reference performance assets are header-related and therefore explicitly protected:

- `public/images/performance/evaready-header-bolt-120.webp`
- `public/images/performance/evaready-header-bolt-180.webp`
- `public/images/performance/evaready-header-energy-line-640.webp`
- `public/images/performance/evaready-header-energy-line-960.webp`
- `public/images/performance/evaready-header-wordmark-640.webp`
- `public/images/performance/evaready-header-wordmark-1200.webp`

Other low-reference brand and accreditation assets had uncertain metadata, documentation or future source ownership. They were retained rather than guessed away.

## File deletion count

**Tracked files deleted: 0.**

No untracked report, screenshot, log or owner file was deleted, hidden through `.gitignore`, staged or described as deleted.

## Validation

Pre-edit baseline:

- Lint: pass
- TypeScript: pass
- Production build: pass, 1,005 static pages
- Generated `google-review-proof` markup: 0 matches

Post-cleanup gate:

- Lint: pass
- TypeScript (`tsc --noEmit`): pass
- Clean GitHub-preview production build: pass, 1,005 static pages
- Known routes: 1,004
- Sitemap/indexable routes: 1,001
- Suburb routes: 873, with zero missing pages or response mismatches
- Generated service pages: 46
- Fault guides: 15
- Internal links: 20,143 checked, zero broken links or generated-output issues
- Export asset references: 40,028 checked, zero issues
- Metadata, page health and visible-copy audits: zero warnings
- Canonical, sitemap, robots and schema URL audit: zero issues
- Claims and offer audits: zero failures
- Live link and CTA audit: 131,186 rows, zero broken links or CTA failures
- Phone, quote, ServiceM8 and Google Ads markers: present and validated
- Full responsive visibility audit: 7,028 route/viewport rows, zero critical issues
- Production responsive smoke test: 84 checks across 14 widths, zero failures
- Runtime/export matches for `google-review-proof` and `data-google-review-proof`: zero
- Secret scan: no API keys, tokens or private-key material found; only `.env.example` is tracked
- `git diff --check`: pass (line-ending notices only)

The repository workflow runs automatically only for pushes to `main`; this task
pushes only the feature branch and does not trigger that workflow or a deployment.

Two audits initially collided while writing their existing generated report files in
parallel. Each was rerun alone and passed; this was a local report-output lock, not a
website assertion failure.
