# Performance Before and After

Recorded: 2026-07-26

## Test environment

- Windows local workstation, Node.js 26.1.0 and npm 11.13.0.
- CI remains configured for Node.js 22.
- Next.js static export with `NEXT_PUBLIC_BASE_PATH=/evaready-electrical` and
  `NEXT_PUBLIC_SITE_URL=https://c0d312.github.io/evaready-electrical`.
- Byte measurements use the clean exported `out/` files; gzip values use deterministic
  gzip compression of those files.
- Browser checks use Playwright against the production static export.
- Lighthouse was not installed solely for this task. The historical development-server
  score is not a production result and is not used as evidence here.

## Shared CSS and JavaScript

| Payload | Before raw | After raw | Before gzip | After gzip | Change |
| --- | ---: | ---: | ---: | ---: | ---: |
| Exported CSS chunks | 482,424 | 478,026 | 69,095 | 67,300 | -4,398 raw / -1,795 gzip |
| Exported JavaScript chunks | 831,770 | 834,339 | 249,287 | 250,122 | +2,569 raw / +835 gzip |
| Homepage referenced CSS + JS | 1,164,592 | 1,160,332 | 273,775 | 271,808 | -4,260 raw / -1,967 gzip |
| Services referenced CSS + JS | 1,164,592 | 1,160,332 | 273,793 | 271,829 | -4,260 raw / -1,964 gzip |
| Service Areas referenced CSS + JS | 1,168,071 | 1,165,499 | 275,328 | 273,934 | -2,572 raw / -1,394 gzip |

The small JavaScript increase is the accessible, on-demand search-index loader. The
large service-area record set is no longer hydrated or embedded in initial HTML.

## HTML payload

| Route | Before raw | After raw | Before gzip | After gzip | Result |
| --- | ---: | ---: | ---: | ---: | --- |
| Homepage | 307,447 | 307,447 | 36,647 | 36,284 | Same HTML; improved shared compression |
| Services | 830,791 | 830,791 | 72,287 | 71,430 | Same indexable content |
| Service Areas | 750,826 | 476,741 | 71,587 | 52,423 | -36.5% raw / -26.8% gzip |
| Emergency Electrician | 479,979 | 479,979 | not recorded | 53,362 | No visible-content reduction |
| Switchboard Upgrades | 460,837 | 460,837 | not recorded | 51,189 | No visible-content reduction |
| Example fault guide | 264,191 | 267,710 | not recorded | 31,072 | Build/schema serialization variation |
| Panania suburb page | 491,199 | 491,199 | not recorded | 54,128 | No visible-content reduction |

The Service Areas reduction is achieved by moving its compact 873-record search index to
`public/service-area-search-index.json` (131,208 raw bytes, approximately 13 KB gzip).
It loads once only when search is focused, typed into or restored from a query. Region,
area and suburb links remain in server-rendered pages; SEO content is not client-only.

## Source styles and media

| Item | Before | After | Change |
| --- | ---: | ---: | ---: |
| `app/globals.css` | 461,410 bytes | 455,357 bytes | -6,053 bytes |
| `app/ux-overhaul.css` | 47,258 bytes | 47,258 bytes | unchanged |
| `app/footer.css` | 14,415 bytes | 14,415 bytes | unchanged |
| `app/offers.css` | 5,678 bytes | 5,678 bytes | unchanged |
| Public WebP | 29 / 2,289,704 bytes | 29 / 2,289,704 bytes | unchanged |
| Public PNG | 4 / 182,394 bytes | 4 / 182,394 bytes | unchanged |
| Public JPEG | 1 / 50,385 bytes | 1 / 50,385 bytes | unchanged |
| Local fonts | 0 | 0 | unchanged |

No image was recompressed or deleted without conclusive ownership evidence. Existing
intrinsic dimensions, responsive image delivery and approved artwork remain unchanged.

## Runtime and layout verification

- 84 production responsive smoke checks passed (6 routes x 14 widths).
- 7,028 exhaustive route/viewport visibility checks passed (1,004 routes x 7 widths).
- No horizontal overflow, application console error or hydration error was reported.
- The service-area search index is absent from the initial network trace and fetched once
  on first interaction.
- Search query restoration and keyboard-operable result links passed.
- CLS-sensitive dimensions remain reserved for header and hero media.

Final measured header telemetry is recorded for regression visibility, not as a design
change. Mobile and normal desktop dimensions remain unchanged. At 1920 and 2560 pixels,
the existing approved banner scales to 200 and 267 pixels respectively; changing that
would alter an explicitly preserved approved header dimension and is therefore listed for
owner review rather than silently redesigned in this cleanup.

## Performance conclusion

The largest safely removable initial payload was eliminated from Service Areas, dead CSS
was removed, and initial shared compressed payload decreased. The work does not claim a
Core Web Vitals percentile or a Lighthouse target that was not measured in a controlled
production environment.
