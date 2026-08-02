# Branded Domain Launch Readiness

## Status

Prepared but inactive. The public preview remains:

`https://c0d312.github.io/evaready-electrical/`

No DNS record, `CNAME` file, GitHub custom-domain setting, redirect, or
branded-domain deployment is part of this change.

## Build Profiles

| Target | Site URL | Base path | Current use |
| --- | --- | --- | --- |
| `github-preview` | `https://c0d312.github.io/evaready-electrical` | `/evaready-electrical` | Active preview and CI validation |
| `branded-production` | `https://evareadyelectrical.com.au` | empty | Local launch-readiness validation only |

The build rejects mixed combinations. This prevents a GitHub preview build
from emitting branded canonicals and prevents a future branded build from
retaining the GitHub Pages base path or URL.

## Prepared URL Signals

When the inactive `branded-production` target is selected for a local export:

- Canonicals use `https://evareadyelectrical.com.au`.
- Sitemap entries use `https://evareadyelectrical.com.au`.
- `robots.txt` references the branded sitemap.
- Open Graph page URLs use the branded origin.
- LocalBusiness, service, breadcrumb, FAQ, and other JSON-LD URLs use the
  branded origin.
- Static assets use root paths with no GitHub repository base path.
- The existing trailing-slash policy remains unchanged.

## Local Pre-launch Validation

```powershell
$env:NEXT_PUBLIC_DEPLOYMENT_TARGET='branded-production'
$env:NEXT_PUBLIC_SITE_URL='https://evareadyelectrical.com.au'
Remove-Item Env:NEXT_PUBLIC_BASE_PATH -ErrorAction SilentlyContinue
npm.cmd run build
npm.cmd run audit:production-domain
npm.cmd run audit:production-smoke
```

These commands inspect the generated files and a localhost server only. They
must not be used as authority to change external hosting or DNS.

## Final Launch Gate

The owner must separately approve the launch before any of these external
actions occur:

1. Confirm the final hosting platform and custom-domain procedure.
2. Configure the required DNS records and hosting custom-domain setting.
3. Add a `CNAME` only if the approved hosting procedure requires it.
4. Deploy a freshly validated `branded-production` export.
5. Verify HTTPS, redirects, canonical URLs, sitemap, robots, schema, assets,
   forms, tracking, and all representative routes on the branded host.
6. Submit the production sitemap only after the branded site is verified.

Until that separate approval, GitHub Pages remains the only published preview
and the branded-domain profile remains build-time preparation.

## Validation Completed

Local validation on 3 August 2026 produced these results for both the
`github-preview` and inactive `branded-production` targets:

- ESLint: passed.
- TypeScript (`tsc --noEmit`): passed.
- Next.js static export: 1,005 pages generated.
- Sitemap: 1,001 unique indexable URLs with no mixed deployment origin.
- Canonicals and Open Graph: 1,001 pages checked with no conflict.
- JSON-LD/schema: 20,857 URLs checked with no inactive-origin reference.
- Assets: 25,967 generated references checked with no missing asset.
- Responsive localhost smoke test: 84 checks across six representative routes
  and 14 viewports, with zero failures for each profile.
- GitHub preview internal links: 20,187 checked across 1,003 generated HTML
  routes, with zero broken links.
- Suburb coverage: 873 pages, zero missing or duplicate URL warnings.
- Metadata, visible copy, page health, and response classifications: zero
  warnings or mismatches.
- Conflict guards: rejected a preview build using the branded URL, a branded
  build using the GitHub base path, and a branded URL without the explicit
  branded target.

The branded hostname was not requested or opened during this validation. The
branded checks inspected generated files and a localhost-only static server.
