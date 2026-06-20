# Top-Tier Code Performance Cleanup Report

Date/time: 2026-06-21 Australia/Sydney

## Baseline

- Local main SHA before cleanup: `cf34afd1badbef1d5aa6548cc8a75ebdbd6c2ff2`
- Remote main SHA before cleanup: `cf34afd1badbef1d5aa6548cc8a75ebdbd6c2ff2`
- Local gh-pages SHA before cleanup: `985000fa9cb46f8003dd750e1e42c7b6b7cd11e6`
- Remote gh-pages SHA before cleanup: `985000fa9cb46f8003dd750e1e42c7b6b7cd11e6`
- Source started clean: no. There were pre-existing tracked report changes, two tracked docs already deleted, and several untracked/ignored QA artifacts.
- `git clean -ndX` was preview-only. Broad cleanup was not run because it would remove ignored docs/reports, `node_modules`, `.next`, and `out`.

## Cleanup

- Temp files deleted: local top-level dev/static log files and obsolete top-level preview PNGs. Active `static-3020-live.*` localhost logs were retained because the local server was still using them.
- Files retained: `.next`, `out`, `node_modules`, ignored docs, QA reports, screenshots, and all source folders unless validation or ownership was certain.
- Files needing owner approval: pre-existing deleted docs and older ignored documentation/report artifacts not created by this pass.
- Redundant source file deleted: `public/images/evareadyelectrical-logo.png`.
- Zero-use proof: source search found no app/component/data/lib/script/public references to `evareadyelectrical-logo.png`; active logo remains `public/images/evareadyelectrical-logo.webp`.

## Source Hygiene

- Debug/TODO scan: matches were confined to audit/reporting scripts or reviewed diagnostic patterns.
- Type suppressions / broad `any`: 0 matches.
- Unsafe code scan: `dangerouslySetInnerHTML` matches are JSON-LD/schema injection points; no `eval` or `new Function` production issue found.
- Google Maps/Places/API-key scan: 0 matches.
- Stale/risky copy source matches: detector patterns in audit scripts only.

## Dependency And Security

- Production dependencies retained: `next`, `react`, `react-dom`, `lucide-react`.
- Dev dependencies retained: TypeScript, ESLint, Tailwind/PostCSS tooling, Playwright, `tsx`, and type packages.
- Dependencies removed: none.
- `npm audit --omit=dev`: 2 moderate advisories from Next's bundled PostCSS range. The suggested fix requires `npm audit fix --force` and a breaking Next version change, so it was not applied in this cleanup pass.

## Performance And Assets

- Performance audit script added: `scripts/audit-performance-assets.ts`.
- NPM script added: `npm run audit:performance`.
- Performance report: `reports/performance-asset-audit.csv`.
- Previous static export size: 892,334,740 bytes.
- Current static export size: 890,543,205 bytes.
- Reduction: 1,791,535 bytes.
- Output files after build: 10,805.
- Public asset count after cleanup: 6.
- Largest asset before cleanup: unused `public/images/evareadyelectrical-logo.png` at 1,791,535 bytes plus retained van PNG at 2,675,270 bytes.
- Largest asset after cleanup: retained `images/evaready-electrical-sydney-service-van.png` at 2,675,270 bytes.
- Images over 1 MB after cleanup: 1 retained original van PNG, kept for compatibility/quality while WebP van remains available.

## Performance Testing

- Lighthouse: unavailable in the repository, so no Lighthouse score is claimed.
- Browser performance report: `reports/performance-before-after.csv`.
- Note: live GitHub Pages responses are compressed while the local static server is uncompressed, so transfer bytes are not an apples-to-apples network comparison. Static export size is the reliable before/after metric for this pass.

## Validation

- Build route generation: 1,006 static pages.
- Internal link audit: 20,088 links checked, 0 broken.
- Metadata audit: 999 rows, 0 warnings.
- Page health audit: 999 routes, 0 critical warnings.
- Visible copy audit: 999 pages, 0 warnings.
- Suburb pages: 873 expected, 873 checked.
- Visibility audit: 1,002 routes across 7 built-in audit viewports, 0 critical issues.
- Live links and CTA audit: 1,002 HTML routes, 131,543 rows, 0 failures.
- Representative responsive regression: 418 page/viewport combinations, 0 failures.
- Output marker checks: stale/risky/API strings absent; Google Ads, phone/quote markers, phone links, response-time wording, and ASP wording present.
- Lint: pass.
- TypeScript: pass.
- Production build: pass.

## Remaining Limitations

- The static export remains large because the site intentionally generates a large service-area/suburb system and large static HTML pages.
- The original van PNG remains above 1 MB; it is retained because it is still used in metadata/compatibility paths and visual quality must not be degraded.
- The production dependency audit has moderate advisories in Next's bundled dependency tree; a safe non-breaking upstream upgrade path should be reviewed separately.

Final status before deployment: validation passed and ready for controlled main/gh-pages deployment.
