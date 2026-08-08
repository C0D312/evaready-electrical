# Exact-a404 production performance evidence

This folder is the authoritative current local-lab performance evidence for
application source commit `a404e774fbac6cfe90a54269f20fe95bff744b84`.

## Why the earlier figures are not comparable

The historical 3 August matrix measured commit `4ebea41` with Node.js 26.1.0,
Next.js 16.2.12, Chrome 150 and six routes. This folder measures the later
exact `a404e774` export with Node.js 22.23.1, Next.js 16.3.0, Chrome
151.0.7922.108 and ten routes. Application output, framework/runtime/browser
versions, resource transfer and route scope therefore differ. The two result
sets must not be mixed into one current conclusion.

The earlier `d1e88b` Node 22 performance-optimisation evidence is also retained
separately. It measured a different source state and is not substituted for the
exact-a404 run.

## Current result

- Lighthouse: 60/60 CLI runs completed, with three runs per route/profile.
- Mobile: performance 81-84, LCP 4,582-5,109ms, CLS 0.
- Desktop: performance 96-97, LCP 1,307-1,387ms, CLS 0.
- Mobile performance and LCP remain below the approved launch thresholds.
- These are local laboratory measurements, not field Core Web Vitals.
- INP was not measured.

## Files

- `environment.json`: exact tool, source and server environment.
- `route-list.json`: the ten measured routes.
- `final-a404-runs.json`: all 60 per-run summaries.
- `final-a404-medians.json`: median result for each route/profile.
- `final-a404-medians.csv`: machine-readable median table.
- `warnings.json`: execution warnings, blockers and limitations.
- `playwright-summary.json`: explicit-local non-header browser counts.
- `command-record.md`: exact reproduction commands.

Raw Lighthouse reports were retained outside Git because they are large. The
committed per-run summaries contain every metric used in the current report.
