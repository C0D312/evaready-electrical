# Performance Test Results

Lighthouse was unavailable in the repository, so this pass used Playwright navigation timing and resource checks instead. Each sampled page was tested three times at a 390px mobile viewport and the median values were recorded.

Important limitation: the live GitHub Pages site serves compressed responses, while the local static server used for the post-change export serves uncompressed responses. The live-before versus local-after transfer byte column is therefore useful for route health and rough browser timing, but it is not an apples-to-apples network compression comparison.

Measured cleanup result:

- Previous static export size: 892,334,740 bytes.
- Current static export size: 890,543,205 bytes.
- Static export reduction: 1,791,535 bytes.
- Removed unused asset: `public/images/evareadyelectrical-logo.png`.
- Active logo retained: `public/images/evareadyelectrical-logo.webp`.

See `reports/performance-before-after.csv` for per-page timings, overflow checks, H1 counts, and CTA/Ads marker checks.
