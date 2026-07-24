# Production domain consolidation

Audit and implementation date: 24 July 2026

Preferred production origin:
`https://evareadyelectrical.com.au/`

## Current conflict

Two different public Evaready websites are live:

- `https://c0d312.github.io/evaready-electrical/` serves the current verified
  Next.js export. Its deployed copy still self-canonicalises to the GitHub
  hostname because it predates this change.
- `https://evareadyelectrical.com.au/` serves a separate legacy site through
  Cloudflare. It has different content, no canonical URL, no sitemap and no
  current `site-version.json`.

The legacy site remains crawlable and includes claims that are not part of the
verified current build. The apex currently resolves through Cloudflare
(`104.21.18.132` and `172.67.181.220` at audit time), not the published GitHub
Pages origin.

## URL ownership table

| URL version | Current content | Indexable | Canonical target | Required final action |
| --- | --- | ---: | --- | --- |
| `https://evareadyelectrical.com.au/` | Legacy Cloudflare-hosted site | Yes; no canonical and robots allow crawling | Self on branded apex | Replace legacy content with this verified export |
| `https://www.evareadyelectrical.com.au/` | Redirects to branded apex | No separate content | Branded apex | Retain one-hop permanent redirect |
| `http://evareadyelectrical.com.au/` | Redirects to HTTPS apex | No separate content | HTTPS branded apex | Retain one-hop permanent redirect |
| `https://c0d312.github.io/evaready-electrical/` | Current Next.js build with old GitHub self-canonical | Yes | Equivalent branded URL | Configure the Pages custom domain and verify the default-host redirect after cutover |
| Legacy `/regions/*` paths | Nine public legacy region pages plus `.html` aliases | Yes | Closest current service-area route | Apply the direct permanent mappings in the companion redirect report |
| Unknown legacy paths | Legacy 404 response | No useful content | None | Keep a genuine branded 404; do not redirect all misses home |

## Repository configuration

The repository now has one production-origin contract:

- Default site URL: `https://evareadyelectrical.com.au`
- Production base path: empty
- Next.js `trailingSlash`: enabled
- Page canonical policy: HTTPS apex, root `/`, and a trailing slash on every
  HTML page route
- Static files such as `.xml`, `.txt`, `.json` and images do not receive a
  trailing slash
- `metadataBase`, canonical URLs, Open Graph URLs and JSON-LD URLs all use the
  production origin
- Sitemap and robots output use only the production origin
- The obsolete identical `lastmod` value was removed instead of publishing an
  untruthful site-wide change date
- The generated `CNAME` contains only `evareadyelectrical.com.au`
- The branded-root export has no `/evaready-electrical` asset prefix
- The 404 output is `noindex, follow`

The GitHub workflow remains a validation workflow. It now builds the root-hosted
production form and runs the production-domain audit. It does not deploy or
change external settings.

## GitHub preview treatment

The repository is prepared for a branch-published GitHub Pages custom domain.
GitHub documents that an apex domain must be entered in repository Pages
settings and backed by the prescribed DNS records. It also documents automatic
redirect handling between correctly configured apex and `www` variants:

- [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

No host-sensitive `noindex` was added because both hostnames would serve the same
static files after a Pages custom-domain deployment. The GitHub default-host
response must be tested after the external setting is applied; it is not marked
complete based only on the presence of `CNAME`.

## Legacy redirects

The public legacy footprint found during this audit is the homepage and nine
region pages, each also exposed through a `.html` alias. The exact one-hop map
is in [legacy-url-redirect-mapping.md](./legacy-url-redirect-mapping.md).

Static export and GitHub Pages do not support application-level Next.js
redirects. No fake JavaScript or meta-refresh substitute was added. Permanent
HTTP redirects remain an external Cloudflare requirement.

## Validation results

Production build environment:

```text
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_SITE_URL=https://evareadyelectrical.com.au
```

Results:

- Lint: pass
- Next.js production build: pass
- Static generation: 1,005 pages
- Sitemap: 1,001 unique indexable branded URLs
- Canonical audit: 1,001 pages checked, 0 conflicts
- Open Graph URL audit: 1,001 pages checked, 0 conflicts
- Schema URL audit: 20,857 URL values checked, 0 forbidden-host references
- Asset audit: 22,965 references checked, 0 missing
- Robots: allows crawling and references only the branded sitemap
- CNAME: exact branded apex
- 404: noindex present and absent from sitemap
- Internal links: 20,202 checked, 0 broken
- Generated link and CTA audit: 153,032 records, 0 failures
- Metadata: 1,001 rows, 0 warnings
- Page health: 1,001 routes, 0 critical warnings
- Visible copy: 1,001 pages, 0 warnings
- Route inventory: 1,004 routes, 0 critical warnings
- Suburb pages: 873 of 873, 0 missing and 0 warnings
- Response-time classification: 873 suburbs, 0 mismatches
- Exhaustive visibility: 7,028 route/viewport checks, 0 critical issues
- Responsive production smoke: 30 checks across `320`, `375`, `768`, `1024`
  and `1440` pixel widths, 0 failures

The performance asset audit still reports three large generated HTML documents.
That is a pre-existing payload concern and not a domain-consolidation failure.

## External cutover still required

No DNS, GitHub repository setting or public deployment was changed in this task.
The owner or hosting administrator must:

1. Verify `evareadyelectrical.com.au` in the GitHub account.
2. In repository **Settings > Pages**, set the custom domain to
   `evareadyelectrical.com.au` before changing DNS.
3. Publish the verified root-hosted export, including `CNAME`, to the Pages
   publishing branch.
4. Replace the legacy apex DNS target with GitHub Pages A records:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and
   `185.199.111.153`.
5. Point `www` by CNAME directly to `C0D312.github.io` without the repository
   path.
6. Keep or introduce a redirect-capable edge for the legacy path mappings and
   apply them before the old origin is removed.
7. Enable **Enforce HTTPS** when GitHub makes it available.
8. Verify the apex, `www`, HTTP, GitHub default host and every legacy mapping
   with one-hop redirect checks before requesting re-indexing.

Until those external actions occur, the public conflict remains live even
though the repository output is ready and internally consistent.
