# Phase 3E4 Performance Status

Documentation checkpoint: 16 September 2026. Measured deployed source:
`1b0a996285a7651657ccf8801c3f3a95ed298994`. Investigation feature checkpoint:
`1df6b7ee6a2e4cc75e9c6ad93538594376b76e27`.

**Current measurement is complete; the mobile performance target is unresolved.**
The original ten-route matrix has 60 valid measurements: three mobile and three
desktop runs per route. One invalid collection attempt is preserved separately
and excluded from medians. No diagnostic candidate was committed, adopted or
deployed. This document does not approve a release or clear any owner hold.

The [machine-readable summary](../reports/phase3e4-performance-summary.json)
contains all route/profile medians, ranges, measurement settings, source identity
and hashes of retained evidence. Raw traces, screenshots, logs and local account
paths are deliberately not committed. The
[verified preview release](phase3e2-verified-preview-release.md) remains the
publication record; [owner decisions](whole-site-owner-decisions.md) remain open.

## Measured Baseline

All values below are medians of the original three valid runs, not a mixture of
diagnostic variants. LCP is in milliseconds; transfer is total transferred bytes
reported by Lighthouse, including observed automatic prefetch.

| Route | Mobile P | Mobile LCP | Mobile bytes | Desktop P | Desktop LCP | Desktop bytes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 86 | 4057.69 | 566080 | 98 | 1125.77 | 1040745 |
| Services | 88 | 3905.74 | 506723 | 98 | 1125.45 | 1060707 |
| Service Areas | 88 | 3904.75 | 508682 | 98 | 1086.15 | 971055 |
| Emergency Electrician Sydney | 87 | 3906.43 | 512812 | 98 | 1164.27 | 1063531 |
| Level 2 Electrician Sydney | 89 | 3755.93 | 500121 | 98 | 1085.25 | 987301 |
| Switchboard Upgrades Sydney | 87 | 4055.34 | 576471 | 98 | 1124.80 | 1049504 |
| No Power In One Room fault guide | 90 | 3605.82 | 543250 | 98 | 1088.47 | 990707 |
| Canterbury-Bankstown region | 88 | 3903.74 | 516498 | 98 | 1084.55 | 979820 |
| Canterbury-Bankstown area | 88 | 3903.81 | 526336 | 98 | 1123.83 | 979165 |
| Panania suburb | 89 | 3753.97 | 535845 | 98 | 1084.10 | 1005013 |

Mobile Performance >=90 passes on **1/10** routes; LCP <=2500ms passes on
**0/10**. Desktop Performance >=95 passes on **10/10**. Every valid run recorded
CLS 0 and Accessibility, Best Practices and SEO scores of 100. Maximum TBT across
the 60 runs was 146.26375ms, below the unchanged 200ms target. Desktop LCP is
recorded above; a controlled before/after non-regression finding requires a
selected repair, which does not yet exist.

## Environment And Limits

- Node 22.23.1, npm 10.9.8, Lighthouse 13.4.1, Chrome 152.0.7977.84.
- Downloaded Linux-produced Next 16.3.4 GitHub Pages artifact, exercised locally
  on Windows at `http://127.0.0.1:4224/evaready-electrical/`.
- Fresh Chrome process/profile for each run; concurrency one; no-store responses
  and deterministic Brotli quality 5; simulated Lighthouse throttling.
- Mobile 412x823, DPR 1.75, 150ms RTT, 1638.4Kbps throughput and CPU slowdown 4.
  Desktop 1350x940, DPR 1, 40ms RTT, 10240Kbps throughput and CPU slowdown 1.
  Complete throttling settings are retained in the JSON summary.
- Inert Google and ServiceM8 fixtures; fail-closed local proxy; no genuine
  submissions, conversions or third-party delivery. Real integration transfer
  and execution costs are therefore not represented.

Qualified containment recorded zero unauthorised external forwards and zero
third-party delivery. The separate sentinel controls recorded zero connections,
requests and bytes. All valid runs had zero page HTTP errors, console errors and
Lighthouse audit errors. The inventory retains 2,455 aborted requests associated
with recorded HTTP 200 fetches; these are not silently discarded. Sixty deliberate
origin-root robots probes received proxy 403 rejection before DNS/upstream; these
are instrumentation probes, not unexpected page-resource 404s.

These are laboratory results, not field Core Web Vitals, physical-device coverage,
WCAG certification or an INP measurement. Historical scores from another source,
Chrome version or integration configuration are context, not a controlled
before/after comparison. Diagnostic Windows builds are kept separate from this
Linux-artifact baseline, including export aliases and compressed-size differences.

The corrected results-v2 reader distinguishes Lighthouse simulated timeline
offsets from durations. Simulated element-render delay is unavailable and remains
null; unattributed time is not relabelled as a proven render delay. Observed
unthrottled phase timings are separate from simulated LCP.

## Diagnostic Findings

| Variant | Finding and disposition |
| --- | --- |
| A: header Home-link prefetch disabled | Demonstrates removal of off-page automatic traffic and duplicate resource requests. Natural navigation checks passed in its recorded scope. Navigation tradeoffs remain; not an accepted LCP repair and not adopted. |
| B: lossless header derivatives | Proposed smaller-dimension lossless files were larger than the original. Rejected. No lossy alternative was generated or authorised. |
| C: guide hero preload | Did not establish a reliable LCP improvement in the bounded comparison. Rejected; no favourable-run selection. |
| D: service reflow CSS relocation | Removed about 501 compressed bytes on unrelated routes but added about 431 bytes on consumers. Graph variation did not establish a causal LCP benefit. Rejected. |
| E: guide parent-link prefetch disabled, isolated with A | Removed four automatic guide-index requests in the recorded mobile case, with navigation tradeoffs. Current comparison median Performance worsened 90 to 88 and LCP 3609.75 to 3911.47ms. Traffic reduction is not an accepted LCP repair; not adopted. |
| F: offline sensitivity analysis | Reproduced retained graph results, then varied transfer sizes only while preserving CPU work, dependencies, latency and model rules. Hypothetical reductions are planning estimates, not measured improvements or proof that the assumed savings are feasible. |
| G: bounded exact CSS redundancy removal | 520 earlier identical declarations removed in an isolated source variant with retained later cascade witnesses. Actual production saving was only 564 compressed bytes per route, with unchanged request counts. Rejected at the material-delivery screen; no browser performance claim. |

Shared header transfer, render-blocking CSS and framework/application traffic
contribute to the examined dependency graphs despite low TBT. Resource inclusion
around Lighthouse's observed LCP cutoff explains some diagnostic variation,
including favicon-included modes; no requests or graph nodes were suppressed to
improve results. The investigated approaches have **not established a substantial
repair within the present scope**. This does not prove that the target is
impossible or that changing the design is the only solution.

The owner requires header and background artwork, colours, styling and layout to
remain unchanged. Compression or replacement is **not authorised**. Do not renew
the same image-permission request or infer permission from continued autopilot.

## Retained Validation And Next Gate

The prior evidence verification checked 60 measurements, 20 route/profile groups,
975 raw-file hashes and 20 representative compressed reports. Its result is
retained, not claimed as a new run. The JSON records the relevant verification and
evidence hashes. Failed qualification/collection attempts and rejected variants
remain preserved locally.

G's offline install, production build, lint, TypeScript, 520 cascade-witness
checks, 1,004 exported markup/JSON-LD comparisons and 109 asset/contract comparisons
passed. Its less-than-1% CSS saving failed the selection screen, so it was not
promoted to browser/visual acceptance or the original 60-run matrix. No production
assertions or thresholds were weakened.

This documentation phase reconciles existing numbers and hashes, validates JSON
and document links, and reviews/scans only its exact staged files. It does not
rebuild or rerun performance, functional or browser matrices. A future selected
substantial repair still requires the original ten-route 60-run comparison and
relevant regression gates. The mobile launch blocker, all business/legal,
credential, review-integration, serviceability and indexation holds remain open.
No route, publication or owner-hold register state changes here.
