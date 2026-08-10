# Non-header mobile performance root-cause record

Recorded before implementation on 2026-08-10 (Australia/Sydney).

> **Historical diagnosis, partially superseded on 11 August 2026.** This record
> preserves the investigation at source `a3c20bb` and the later `7eb6985`
> experiment. It is not the current tracking/export implementation. Commit
> `668a05941e84de514081228b7077b8677e01ef55` restored the external Google base
> library to `afterInteractive`, retained the base ID and CTA markers, and added
> no explicit conversion event because real owner-supplied labels are absent.
> The 1,001 aliases are Windows Next.js 16.3 export normalisation, not a
> universal build result; prior Ubuntu evidence reported zero aliases and was
> not locally reproduced. Current evidence is in
> `reports/conversion-static-export-hardening/`.

## Source and environment

- Branch: `codex/responsive-ux-overhaul`
- Source commit: `a3c20bb24ef1b473ed81743ba705f9d135238a4c`
- Local and remote branch heads matched before measurement.
- Node.js: `22.23.1`
- Next.js: `16.3.0`
- Lighthouse: `13.4.1`
- Chrome: `151.0.7922.108`
- Static export base path: `/evaready-electrical`
- Local server: `http://127.0.0.1:4182/evaready-electrical/`
- Runs: three mobile and three desktop runs on each of the ten required routes.
- Raw reports: `C:\Users\Admin\AppData\Local\Temp\evaready-perf-raw\baseline-a3c20bb`
- Extracted medians: `C:\Users\Admin\AppData\Local\Temp\evaready-perf-results\baseline-a3c20bb`

These are Lighthouse laboratory simulations, not field Core Web Vitals. INP was not measured.

## Reproduced baseline

| Route | Mobile score | Mobile LCP | Desktop score | Desktop LCP | CLS | Mobile TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 82 | 4,884 ms | 96 | 1,387 ms | 0 | 9 ms |
| Services | 81 | 5,108 ms | 96 | 1,387 ms | 0 | 9 ms |
| Service Areas | 82 | 4,885 ms | 96 | 1,347 ms | 0 | 15 ms |
| Emergency Electrician Sydney | 81 | 5,108 ms | 96 | 1,387 ms | 0 | 12 ms |
| Level 2 Electrician Sydney | 82 | 4,810 ms | 97 | 1,307 ms | 0 | 10 ms |
| Switchboard Upgrades Sydney | 81 | 5,108 ms | 96 | 1,387 ms | 0 | 9 ms |
| No Power In One Room | 83 | 4,661 ms | 96 | 1,430 ms | 0 | 14 ms |
| Canterbury-Bankstown region | 82 | 4,884 ms | 96 | 1,348 ms | 0 | 12 ms |
| Canterbury-Bankstown area | 83 | 4,658 ms | 96 | 1,347 ms | 0 | 8 ms |
| Panania | 84 | 4,584 ms | 97 | 1,307 ms | 0 | 12 ms |

## LCP diagnosis

The reported 4.5-5.1 second mobile LCP is Lighthouse Lantern's throttled simulation, not a matching delay in the unthrottled local trace. For example, homepage mobile run 2 reported:

- Simulated LCP: 5,033 ms
- Simulated TTFB: 454 ms
- Simulated resource load delay: 460 ms
- Simulated resource load duration: 645 ms
- Derived simulated element render delay: 3,474 ms
- Observed local LCP: 98 ms
- Observed local TTFB: 3.7 ms
- Observed resource load delay: 4.8 ms
- Observed resource load duration: 4.1 ms
- Observed element render delay: 85.2 ms

The hero is present in server-rendered HTML. It is not hidden by client state, opacity, visibility, transform, or an entrance animation. The selected mobile resource is `evaready-service-van-768.webp` (768 x 576, 58,694 source bytes; about 58,921 transferred bytes), requested once with `loading="eager"` and `fetchpriority="high"`. Lighthouse confirms that the request is discoverable in initial HTML, priority-hinted, and not lazy loaded.

The remaining modeled delay is dominated by resource and render competition rather than a real 5-second CSS reveal:

1. The Google Ads library is preloaded by `next/script` with `afterInteractive`, transfers about 147 KB, and contributes about 100 ms of measured boot-up work. It is non-critical to first paint and is the largest actionable non-header script cost. Its queue and conversion markers must remain intact while the library load is deferred.
2. Two render-blocking stylesheets transfer about 61 KB combined. Lighthouse estimates roughly 480 ms potential savings, but they own the approved site presentation and require conservative treatment.
3. The 768-pixel hero is larger than the rendered mobile box requires according to Lighthouse, but it is not the primary cause of the 3-4 second simulated render component. A smaller approved derivative may reduce transfer only if an identical-composition experiment proves a measurable benefit.
4. Frozen header artwork accounts for most mobile image transfer and includes multiple high-priority requests. It is outside this task and will not be modified.
5. Fonts are system fonts; no webfont request blocks the H1.

The implementation phase must therefore test non-header changes independently instead of attributing the full simulated delay to the hero bitmap.

## Historical `7eb6985` implementation (superseded)

The implementation deliberately leaves every hero bitmap and rendering rule unchanged:

- Changing the hero from asynchronous to synchronous decoding produced the same 4,884 ms median simulated LCP and was reverted.
- Recompressing the selected 768-pixel WebP saved only about 2.8 KB at a visibly riskier quality setting and was rejected.
- The Google Ads queue and conversion ID remain in the initial document, while the external 147 KB library now uses Next.js `lazyOnload`. A three-run homepage experiment reduced median transfer from 947,400 bytes to 797,114 bytes without changing the hero composition or conversion markers.
- A postbuild step materialises the flat Next segment-payload filenames requested by the client. This is host-independent and therefore does not rely on a localhost-only rewrite. The clean build generated 1,001 aliases from the corresponding nested export payloads.
- The strict production-like server still rejects origin-root routes and now returns `text/x-component` for the generated segment aliases.

The current `668a059` correction serves `.txt` through a Pages-like
`text/plain` mode, makes the Windows alias manifest deterministic and
byte-verifies every source/alias pair. It also establishes the conversion
truth: the Google Ads base tag and phone/quote classification markers are
present, while explicit `gtag('event', ...)` conversion calls, `send_to`
values, labels, callbacks and conversion timeouts are all absent. Marker
presence must not be described as proof that Google received a conversion.

The mobile score and simulated LCP targets may remain blocked because the largest remaining modeled resource belongs to the frozen header. That contribution is reported separately and is not being worked around through a non-header visual change.

## Unexpected first-party 404 diagnosis

The Lighthouse console failures are real first-party `Fetch` failures generated by the Next client router's link-prefetch code. CDP identifies the initiator as `_next/static/chunks/07zyxk1hhpe3b.js`, not the strict server's intentional origin-root probe.

Twelve unique failed payload paths were observed, with 303 failed requests across the 60-run matrix. Representative failures are:

- `/evaready-electrical/emergency-electrician-sydney/__next.emergency-electrician-sydney.__PAGE__.txt`
- `/evaready-electrical/level-2-electrician-sydney/__next.level-2-electrician-sydney.__PAGE__.txt`
- `/evaready-electrical/services/__next.services.__PAGE__.txt`
- `/evaready-electrical/services/hot-water-system-electrician-sydney/__next.services.$d$slug.__PAGE__.txt`
- `/evaready-electrical/services/split-system-air-conditioning-sydney/__next.services.$d$slug.__PAGE__.txt`
- `/evaready-electrical/solar-batteries/__next.solar-batteries.__PAGE__.txt`
- `/evaready-electrical/service-areas/__next.service-areas.__PAGE__.txt`
- `/evaready-electrical/about/__next.about.__PAGE__.txt`
- `/evaready-electrical/contact/__next.contact.__PAGE__.txt`
- `/evaready-electrical/electrical-faults/__next.electrical-faults.__PAGE__.txt`
- `/evaready-electrical/service-areas/canterbury-bankstown-and-inner-south-west/__next.service-areas.$d$region.__PAGE__.txt`
- `/evaready-electrical/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/__next.service-areas.$d$region.$d$area.__PAGE__.txt`

The static export contains the corresponding payloads in nested paths, for example:

- Requested: `emergency-electrician-sydney/__next.emergency-electrician-sydney.__PAGE__.txt`
- Exported: `emergency-electrician-sydney/__next.emergency-electrician-sydney/__PAGE__.txt`

The current production-like static server performs literal file lookup and does not resolve the flattened client-prefetch URL to the nested exported payload. The correction must preserve strict base-path rejection while mapping only a validated Next segment-payload request to an existing file inside `out`.

## Implementation boundaries

- No header source, selector, variable, asset, test, or responsive behaviour may change.
- No copy, route, metadata, schema, canonical, sitemap, offer, claim, CTA, ServiceM8, Google rating, tracking marker, or footer content may change.
- Google Ads functionality must remain queued and available; only its non-critical network scheduling may be changed if measured and regression-tested.
- Any hero derivative must be generated proportionally from the approved service-van source and must pass visual comparison before use.
