# Removed Files and Dependencies

Recorded: 2026-07-26

## Removal gate

Every candidate was checked against static imports, dynamic imports, component names,
CSS selectors, route modules, tests, generators and the exported site. Uncertain brand
assets, conventional icon filenames and historical QA records were retained.

## Proven-safe removal

| Path | Category | Evidence | Replacement | Validation |
| --- | --- | --- | --- | --- |
| `components/footer-link-groups.tsx` | Obsolete component | No import, dynamic import, test reference or exported markup reference. Its selectors were used only by this file. | The active `SiteFooter` in `components/site-frame.tsx` already owns the complete footer. | Lint, TypeScript, 1,005-page export, 20,171-link audit, 1,004-route visibility audit and focused footer/responsive tests passed. |
| Unique `.footer-link-groups*`, `.footer-link-group*`, `.footer-link-panel` and `.footer-region-search*` rules in `app/globals.css` | Dead CSS | Selector-to-markup and source searches found no consumer after the obsolete component removal. | Active footer styling remains in `app/footer.css`. | Exported CSS decreased by 4,398 raw bytes and all footer interaction/layout checks passed. |

## Dependencies

No direct dependency was removed. Every direct runtime and development dependency has
an active source, build, lint, TypeScript, Tailwind, audit or Playwright use.

The following conservative patch update was applied:

| Package | Before | After | Reason |
| --- | ---: | ---: | --- |
| `next` | 16.2.6 | 16.2.12 | Current compatible patch release; no framework-major change. |
| `eslint-config-next` | 16.2.6 | 16.2.12 | Kept aligned with Next.js. |

`npm audit fix` updated compatible transitive packages without using `--force`. The
lockfile format was preserved. Remaining advisories require unsafe major or incompatible
downgrade changes and are documented in the launch-readiness report.

## Retained for owner review

- Conventional icon aliases (`public/apple-icon.png`, `public/icon.png` and
  `public/favicon.ico`) are byte-identical to explicitly named active icons, but remain
  because external clients may request the conventional paths.
- Legacy header and storm artwork variants remain because branded master/rollback
  assets require owner confirmation before deletion.
- Historical tracked reports and documentation remain because they are prior task
  deliverables, not production runtime payload.
- Existing untracked screenshots, logs and QA folders were neither deleted nor staged.

## Result

One obsolete component and its exclusively owned CSS were removed. No route, public URL,
business value, conversion action, tracking marker, ServiceM8 integration or approved
visual behaviour was removed.
