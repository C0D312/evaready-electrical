# Conversion and static-export root-cause record

Recorded before implementation on 2026-08-11 (Australia/Sydney).

## Scope and source identity

- Branch: `codex/responsive-ux-overhaul`
- Local and remote source SHA: `4a8005995501dc8676e04aaec3fcd385eec344a7`
- Baseline runtime: Node.js `22.23.1`, npm `10.9.8`, Next.js `16.3.0`
- Deployment configuration: GitHub preview with base path `/evaready-electrical`
- Header files, artwork, navigation, ticker and header tests: frozen and untouched

## Conversion-tracking truth

The global Google Ads base tag is present with ID `AW-18165545331`. Its inline
queue bootstrap runs with `afterInteractive`, but the external
`googletagmanager.com/gtag/js` library was changed to `lazyOnload` in commit
`7eb698544b27534c19abddb1de5bdef883425cbb`. That delays the external library
until browser idle time and is not the intended readiness behaviour for this
site.

The production source contains phone and quote CTA classification attributes.
Those attributes are useful test and integration markers, but they are not
Google Ads conversion events. Inspection found:

- one global Google Ads base configuration;
- phone and quote CTA marker attributes across production components;
- zero `gtag('event', ...)` calls;
- zero `send_to` values;
- zero Google Ads conversion labels;
- zero conversion callbacks; and
- zero conversion timeouts.

Therefore the accurate current statement is: the base tag and CTA markers are
installed, while explicit phone-click and quote-click Google Ads conversion
events are not installed. Real conversion labels must come from the owner's
Google Ads account and must not be invented in source.

## Static-export alias root cause

Next.js 16.3.0 emitted nested React Server Component payloads on this Windows
build while client navigation requests corresponding flat filenames. The
postbuild alias generator correctly materialises byte-identical flat files, but
its current implementation has four auditability gaps:

1. The manifest includes a wall-clock `generatedAt`, so identical inputs do not
   produce byte-identical manifests.
2. Containment is checked lexically for the destination only; source real paths,
   symlink escapes and unsafe directory entries are not explicitly rejected.
3. The test suite covers fixed and dynamic examples but not idempotency,
   conflicting aliases, traversal, symlinks, byte identity or complete built
   route coverage.
4. The project server gives generated segment aliases `text/x-component` and
   has no explicit GitHub-Pages-like mode where every `.txt` response is
   `text/plain`.

The alias requirement is platform-dependent. The clean Windows baseline built
from the source SHA above produced 1,001 aliases and 64,947,040 duplicated
bytes. Prior Ubuntu evidence reported zero generated aliases because that build
emitted the flat payloads directly. Ubuntu is not available in this local
environment, so that observation will remain clearly labelled as prior
platform evidence rather than a locally reproduced result.

## Clean Windows baseline export

| Measurement | Value |
| --- | ---: |
| Next static-generation entries | 1,005 |
| Generated aliases | 1,001 |
| Duplicated alias bytes | 64,947,040 |
| Alias manifest bytes | 312,992 |
| Export file count | 7,131 |
| Raw export bytes | 699,319,357 |
| `tar.gz` artifact bytes | 89,834,541 |
| `.nojekyll` present | Yes |

The archive was measured with `tar.exe -czf <archive> -C out .`. These values
describe the Windows output only and are not asserted as universal across
operating systems.

## Planned correction boundary

The correction will restore the external base library to `afterInteractive`,
retain the existing base configuration, keep phone and quote interactions
immediately functional, and add no unapproved conversion event. Static-export
work will be limited to deterministic evidence, containment and symlink safety,
Pages-like MIME testing, and navigation regression coverage. No visual, route,
content, metadata, schema, canonical, sitemap, tracking-ID, ServiceM8 or header
change is authorised.
