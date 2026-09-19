# Branded Domain Launch Readiness

## Status

Prepared but inactive; **not launch-ready**. Planning refresh: 20 September 2026.
The public preview remains:

`https://c0d312.github.io/evaready-electrical/`

No DNS record, `CNAME` file, GitHub custom-domain setting, redirect, or
branded-domain deployment is part of this change.

Current source checkpoint: feature `b579783affbae170b9cd29d53113b4a2a32312c0`;
approved preview main `1b0a996285a7651657ccf8801c3f3a95ed298994`. The separate
five-suburb candidate is unpublished. Earlier successful root-export results below
are historical evidence, not validation of a current launch candidate.

## Hosting eligibility and costs

Public primary documentation checked 20 September 2026; no accounts were opened,
terms accepted, subscriptions created or paid features enabled.

| Option | Evidence and cost limitation | Decision |
| --- | --- | --- |
| GitHub Pages business production | [GitHub's usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) prohibit using Pages as free hosting for an online business or a site primarily facilitating commercial transactions. It also lacks configurable per-path HTTP redirects. | Do not assume the current preview arrangement authorises a branded commercial launch. Owner/platform eligibility review is required; no existing deployment is changed here. |
| Vercel Hobby | [Hobby documentation](https://vercel.com/docs/plans/hobby) restricts it to personal, non-commercial use. | Not an eligible free business-production option. |
| Vercel Pro | [Pro documentation](https://vercel.com/docs/plans/pro-plan) lists a USD 20/month platform fee, one deploying seat and USD 20 usage credit; usage charges and applicable taxes can add cost. | Paid option only with direct owner spending and terms approval. No trial or upgrade authorised. |
| Cloudflare Pages static hosting | [Static requests are free](https://developers.cloudflare.com/pages/functions/pricing/) when they do not invoke Functions. [Free-plan limits](https://developers.cloudflare.com/pages/platform/limits/) include 20,000 files, 25 MiB per asset and 500 builds/month. [Static redirects](https://developers.cloudflare.com/pages/configuration/redirects/) support 301/308. | Technical candidate for a static export, not a selected host. These technical pages do not provide an account-specific commercial-eligibility determination; owner review of applicable terms/plan remains open. Functions, storage, transformations or other paid services are not enabled. |

The existing 7,152-file export is below Cloudflare's stated free file-count limit;
final artifact file sizes and all applicable limits still need exact-candidate
checks. Do not infer permission to add a new account or connect the repository.
`next.config.ts` uses `output: "export"` and `images.unoptimized: true`. Moving this
same artifact to another host does not automatically reduce artwork bytes, parse
cost, JavaScript work or LCP. Header/background changes remain unauthorised.

## Current workflow contract

`.github/workflows/pages.yml` remains a preview-only workflow. Actual triggers are
push to `main`, manual dispatch, and `17 */6 * * *`. A configuration check returns
whether all required Google Business Profile secret names are present; partial
configuration fails. A scheduled run builds only when configuration is complete.
For non-scheduled runs, an unconfigured review integration retains the neutral
link. An enabled refresh runs before the build. No secret values or account state
were inspected by this planning review.

The workflow uses Node 22, `npm ci`, the static build, the production-domain audit,
artifact upload including hidden files and Pages deployment. It does not switch to
the branded profile or run the full local test suite. A future exact-SHA approval
must account for both the push-triggered workflow and any scheduled artifact
refresh. Do not trigger it during preparation. A new host would require a separate
reviewed delivery design; changing environment variables alone is not a migration.

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

Use these commands only in a clean isolated checkout of an exact approved source,
with the pinned Node/dependency versions recorded. Browser smoke execution must
use the established fail-closed containment and inert integration fixtures, not
an uncontained public or local browser. Inspect the audit command's behaviour
before running it. They are not authority to change external hosting or DNS.

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

## Historical Validation (Not Current Acceptance)

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

## Current remaining gates

- Revalidate all public routes and every artifact file against the final branded
  root export, including 404 status/body, sitemap, robots, canonical/OG/JSON-LD
  origins, asset paths/MIME and internal links. Do not infer root-profile success
  from a preview build or overwrite a frozen performance export.
- The revalidated 19 legacy paths remain proposed/inactive. Current legacy sitemap
  and robots endpoints return 404; historical URL discovery is not complete.
- Preserve all owner business, credential, offer, legal, review-integration,
  serviceability, indexation and commercial-priority holds. Mobile speed targets
  have not been cleared by the CSS investigation or hosting research.
- Host choice, commercial eligibility, terms, costs, domain/DNS changes and the
  exact release SHA require direct owner decisions. Nothing in this document
  authorises them.
- Capture rollback artifacts with hashes and a verified Git bundle; record actual
  current web DNS values privately. Preserve MX, SPF, DKIM, DMARC and unrelated
  verification records. Never guess DNS values or commit private zone evidence.
- After a separately approved launch, compare exact artifact/live identities and
  redirects, then monitor at launch, 2/6/24 hours and days 2/3/7/14/30. Account and
  conversion checks remain separately gated; no genuine test submissions here.
