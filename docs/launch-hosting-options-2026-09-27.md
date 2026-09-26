# Hosting shortlist for the static launch

27 September 2026 (Sydney). Research only: no account, hosting, DNS, purchase or
deployment action. The owner intends a new host. No provider is selected.

## Recommendation

Evaluate **Cloudflare Workers Static Assets** first for this fully exported site.
This is an architectural fit recommendation, not a measured claim that it is the
fastest or most reliable provider. Cloudflare now recommends Workers for new
projects; Pages remains available. The current site does not need a dynamic
Next.js server merely because it was built with Next.js.
[Cloudflare guidance](https://developers.cloudflare.com/pages/).

| Candidate | Fit and decision trade-off |
| --- | --- |
| Cloudflare Workers Static Assets | Static asset requests are free/unlimited under the documented static-assets model. Keep the initial design static-only; Worker-script invocation and optional caching/features have different limits and billing. Confirm account eligibility, support expectations, routing and rollback before selection. |
| Cloudflare Pages static-only | Still supports the export and existing redirect plan, but Workers is the vendor's new-project recommendation. Consider only with a deliberate lifecycle/support decision, not because an earlier runbook named it. |
| Vercel Pro | Commercially oriented alternative, especially if later server features are needed. Hobby is restricted to personal/non-commercial use and is unsuitable for this business. Paid selection and usage costs require separate approval. |
| Netlify | Supports static deployment workflows, but credit exhaustion can pause every project on the team, including incoming requests. Resolve the availability-versus-spend policy before choosing it for urgent-service lead generation. |

Sources: [Workers static billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/),
[Workers pricing caveats](https://developers.cloudflare.com/workers/platform/pricing/),
[Vercel Hobby restriction](https://vercel.com/docs/plans/hobby),
[Vercel plan comparison](https://vercel.com/docs/plans), and
[Netlify pauses](https://docs.netlify.com/manage/accounts-and-billing/billing/resume-paused-projects/).
Published allowances are not an uptime guarantee or approval to accept paid terms.

## Artifact and routing fit

Retained branded export: 7,152 files, 707,607,684 bytes total; largest individual
file 541,644 bytes. These are retained validated measurements, not a new build.
They fit Workers Free's documented 20,000-file/25-MiB-per-asset limits and Pages'
corresponding limits. This does not prove upload success or production behaviour.
[Workers limits](https://developers.cloudflare.com/workers/platform/limits/),
[Pages limits](https://developers.cloudflare.com/pages/platform/limits/).

Use the root branded export, not the base-path GitHub preview. For Workers,
explicitly evaluate trailing-slash HTML handling against this export. Preserve
real 404 responses, not an SPA fallback. Review legacy redirects, query handling,
content types, caching, security headers, canonicals and sitemap on the selected
host before cutover. No host configuration file is activated by this document.
[HTML routing](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/).

## Speed and reliability acceptance

Use an approved isolated staging deployment only after separate permission.
Compare the exact same artifact and routes, with matched mobile profiles, cold
and warm caches and repeated Australian-location measurements. Record TTFB, LCP,
CLS, TBT, errors and variability; retain the established site thresholds. Do not
use a vendor's network map or one synthetic run as evidence of universal speed.
Software-rendered local Sandbox measurements alone cannot choose the fastest host.

Select required support hours/response, incident communication, plan-specific
availability terms and spending protections explicitly. Review the actual hosting
product's contract: a general CDN plan's advertised SLA is not automatically a
Workers or Pages SLA. No specific uptime guarantee has been established here.

## Rollback readiness

Workers supports rollback to a previously deployed version, subject to retained
version and resource constraints. That is not a backup of the old external site,
and no compatible prior Workers deployment exists merely because rollback is a
documented feature. Retain a verified old-site restore point, exact artifact and
settings, operator/window and domain rollback procedure before first cutover.
[Workers rollbacks](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/).

Next owner decision: choose provider/plan and support expectations after reviewing
this shortlist. Provide the old-site URL inventory/backup custodian and release
operator/window. Host selection alone does not authorise account, DNS or deployment
changes. Follow the [release runbook](launch-release-runbook-2026-09-27.md).
