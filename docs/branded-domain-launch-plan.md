# Branded Domain Launch Plan

## Document Status

**Plan only. Not authorised for execution.**

Prepared: 4 August 2026

This document describes a future controlled migration from the existing GitHub
Pages preview to the branded production domain. Creating or approving this
document does not authorise a merge, deployment, DNS change, GitHub Pages
change, custom-domain change, search-engine submission, analytics change,
advertising change, or ServiceM8 change.

The current preview must remain unchanged until the owner gives a separate,
written launch approval:

`https://c0d312.github.io/evaready-electrical/`

The repository already has separate build profiles for the GitHub preview and
an inactive branded-production export. The future migration must use those
profiles rather than mixing the preview origin with a root-hosted production
build.

## Launch Principles

- Use one approved source commit and one reproducible static export.
- Keep one preferred HTTPS hostname and one trailing-slash policy.
- Make each external change only after its named owner checkpoint is approved.
- Record every pre-change value before changing it.
- Use one-hop permanent redirects where supported.
- Never use JavaScript or meta-refresh redirects as an SEO substitute.
- Never launch with unverified claims, offers, credentials, review figures, or
  conversion tracking.
- Stop the launch immediately if route, asset, form, tracking, certificate, or
  indexing checks fail.

## Preconditions

The launch sequence must not begin until all of the following are true:

- The final local launch-readiness report says `READY`.
- The owner has approved all visible offers, qualifications, contact details,
  Google rating and review figures, and response-time wording.
- Lint, TypeScript, the clean production build, all route audits, all 873
  suburb checks, internal links, metadata, schema, responsive tests, keyboard
  tests, and production Lighthouse checks pass on the release candidate.
- The release candidate has no accidental reports, screenshots, logs, local
  environment files, or credentials staged for production.
- The current preview remains available as the review reference.
- The owner has identified the DNS provider, registrar, GitHub Pages
  publishing source, analytics owner, advertising owner, Search Console owner,
  and ServiceM8 owner.

## 1. Final Owner Approval

Prepare a dated launch approval record containing:

- Approved release branch and exact commit SHA.
- Approved production hostname and preferred `www` policy.
- Approved launch date, time, and responsible people.
- Approved maintenance and rollback window.
- Confirmation that the owner has checked all offers, credentials, review
  figures, contact details, and response wording.
- Confirmation that a root-hosted branded build has passed the complete local
  validation gate.
- Confirmation that DNS, GitHub Pages, Search Console, Analytics, Google Ads,
  and ServiceM8 changes may proceed only in the listed sequence.

**Owner checkpoint A:** Written approval to prepare the release candidate. This
does not yet authorise any external change.

## 2. Backups and Rollback Points

Before any external change, capture and store securely:

- Feature-branch SHA, approved merge SHA, `main` SHA, and Pages publishing SHA.
- A signed or checksummed archive of the approved root-hosted static export.
- A second archive of the current GitHub preview export.
- Complete DNS zone export, record names, record types, values, TTLs, proxy
  states, and screenshots from the DNS provider.
- Current GitHub Pages publishing source, custom-domain field, HTTPS state, and
  screenshots.
- Current repository variables and secrets by name only. Never copy secret
  values into this repository or launch report.
- Current analytics tag IDs, Google Ads conversion labels, and event names.
- Current ServiceM8 quote URL and allowed-origin settings, if any.
- Current redirect rules and legacy-host configuration.
- A route manifest, sitemap snapshot, robots snapshot, and representative
  screenshots for desktop and mobile.

Name each rollback package with the date, release SHA, and environment. Confirm
that another authorised person can locate and use it.

**Owner checkpoint B:** Approve the backup record and exact rollback target
before DNS, hosting, or Pages settings are touched.

## 3. Required GitHub Review and Merge Sequence

The future GitHub sequence is:

1. Finish all launch fixes on `codex/responsive-ux-overhaul`.
2. Rebase or merge the latest approved `main` changes without rewriting
   history.
3. Rerun the complete local launch gate on the exact resulting SHA.
4. Review the full diff and identify every production file, asset, migration
   file, workflow change, and generated file.
5. Open a pull request only after separate owner approval.
6. Require human review of domain configuration, deployment workflow, CNAME
   handling, redirects, analytics, and rollback steps.
7. Require all branch-protection checks to pass.
8. Record the approved merge commit before merging.
9. Merge only during the approved launch window.
10. Do not manually dispatch a deployment until the owner authorises the next
    checkpoint.

The current workflow triggers on pushes to `main` or manual dispatch. The
launch coordinator must therefore treat a future merge to `main` as a
potential external action and confirm its exact behaviour immediately before
approval.

**Owner checkpoint C:** Approve the pull request and merge separately. No merge
is permitted merely because tests pass.

## 4. DNS Records

Do not copy historical IP addresses from an old report. On launch day, obtain
the required record values from the current official GitHub Pages
documentation and the repository Pages settings.

Prepare a DNS change sheet containing:

| Purpose | Record plan | Launch-day requirement |
| --- | --- | --- |
| Apex host | GitHub Pages apex `A` records and, if approved, current `AAAA` records | Copy only current official values |
| `www` host | `CNAME` to the GitHub Pages account host, not a repository path | Confirm exact target in GitHub |
| Domain verification | GitHub-provided `TXT` record | Add before cutover where possible |
| Search Console | Google-provided verification `TXT` record | Add only after Search Console approval |
| Existing mail and services | Preserve all unrelated `MX`, SPF, DKIM, DMARC, and verification records | Compare before and after |

Where the provider permits it, lower only the relevant web-record TTL 24 to 48
hours before launch. Do not alter unrelated records. Record propagation from
multiple public resolvers before proceeding.

**Owner checkpoint D:** Approve the exact DNS diff, values, TTLs, and rollback
values. A generic approval to "point the domain" is insufficient.

## 5. GitHub Pages Custom-Domain Configuration

The future sequence should be:

1. Verify the domain in the correct GitHub organisation or account.
2. Confirm the Pages publishing branch or Actions source.
3. Confirm whether this repository's publishing method requires a generated
   `CNAME` file.
4. Set the custom-domain field to the approved apex hostname.
5. Confirm GitHub reports the DNS check as successful.
6. Keep HTTPS enforcement off only while GitHub is provisioning the
   certificate, then enable it at the HTTPS checkpoint.

Do not create a `CNAME` file or change the Pages setting until this sequence is
approved. Never leave a repository `CNAME` and the Pages UI configured for
different hosts.

**Owner checkpoint E:** Approve the GitHub Pages custom-domain value and any
required `CNAME` commit before either is applied.

## 6. HTTPS Verification

After DNS resolves to the approved Pages target:

- Wait for GitHub to provision a valid certificate for the approved hostnames.
- Verify certificate subject names, issuer, validity dates, and full chain.
- Enable **Enforce HTTPS** only when GitHub makes it available.
- Verify HTTP to HTTPS and `www` to apex behaviour in one hop.
- Check for mixed-content requests, blocked scripts, insecure form targets, and
  insecure canonical or schema URLs.
- Verify CSS, JavaScript, images, fonts, sitemap, robots, and
  `site-version.json` over HTTPS.
- Add or strengthen HSTS only after stable HTTPS operation and a separately
  approved rollback assessment.

**Owner checkpoint F:** Approve HTTPS enforcement after certificate and asset
checks pass.

## 7. Base-Path Migration

The current preview uses `/evaready-electrical`. The branded production build
must use an empty base path.

For the future release build:

```text
NEXT_PUBLIC_DEPLOYMENT_TARGET=branded-production
NEXT_PUBLIC_SITE_URL=https://evareadyelectrical.com.au
NEXT_PUBLIC_BASE_PATH=
```

Required checks before publishing:

- `basePath` resolves to an empty string.
- `assetPrefix` is absent for the branded root build.
- All internal links begin at the branded root rather than the repository
  subpath.
- CSS, JavaScript, images, fonts, manifests, sitemap, robots, and JSON files
  load from the correct root paths.
- No generated file contains a stale `/evaready-electrical/_next/` reference.
- The GitHub preview profile still builds independently with its existing base
  path.

Do not overwrite the preview build with a mixed-origin export.

**Owner checkpoint G:** Approve the exact branded build profile and generated
URL audit before publishing it.

## 8. Canonical-Domain Replacement

Generate the branded release from the central deployment configuration. Do not
manually replace URLs across page files.

Verify every indexable page has:

- One self-referencing HTTPS canonical on the approved apex hostname.
- The existing trailing slash on HTML routes.
- No GitHub hostname in canonical, alternate, or metadata URLs.
- No canonical to a redirect, 404, parameterised preview URL, or unrelated
  location page.
- A canonical matching the route represented in the sitemap.

Audit the complete indexable route set, not a sample.

## 9. Open Graph URLs

Verify every indexable page emits:

- `og:url` matching its canonical.
- Absolute branded URLs for Open Graph images.
- Correct page title and description.
- No preview base path or GitHub hostname.
- Images that return `200`, have an appropriate MIME type, and render at the
  declared dimensions.

Check representative pages with social-debug tools only after owner approval.
Do not submit or cache a public URL before the site is ready.

## 10. Sitemap URLs

Generate a fresh sitemap from the branded release and verify:

- Only final HTTPS branded URLs are present.
- Every intended indexable route appears exactly once.
- Redirected, canonicalised, noindex, 404, and preview URLs are absent.
- All 873 intended suburb routes and all approved service, fault, region, and
  area routes are represented.
- Trailing slashes match the production policy.
- `lastmod` values are truthful and are not mass-updated without a real page
  change.
- Every sitemap URL returns `200` and self-canonicalises.

Archive the final sitemap and its URL count with the release SHA.

## 11. Schema URLs

Parse every JSON-LD block in the branded export and verify:

- All `url`, `@id`, image, breadcrumb, service, and organisation references use
  the branded HTTPS origin.
- No preview base path or GitHub hostname remains.
- Breadcrumb positions and URLs match visible navigation.
- FAQ schema matches visible FAQ content.
- Offer values, conditions, credentials, rating figures, and service areas
  match the approved source of truth.
- Unsupported `AggregateRating`, review, insurance, warranty, price, or
  guarantee claims are absent.

## 12. Asset URLs

Audit every generated asset reference:

- Root-hosted paths are used for the branded build.
- Responsive image candidates and `sizes` resolve correctly.
- Header artwork, hero van, offer images, icons, fonts, and social images return
  `200` without redirects.
- MIME types, cache headers, intrinsic dimensions, and compression are correct.
- No asset is loaded from the GitHub preview hostname.
- No mixed content, duplicate download, broken lazy load, or layout shift is
  introduced.

## 13. Redirect Mapping From Preview and Legacy Routes

Create and approve a route-by-route redirect ledger before cutover.

| Source family | Required target | Rule |
| --- | --- | --- |
| GitHub preview root | Branded root | One-hop permanent redirect if the platform supports it |
| GitHub preview page | Same path on branded host, with `/evaready-electrical` removed | Preserve the full path and trailing slash |
| HTTP branded URL | Equivalent HTTPS branded URL | One hop |
| `www` branded URL | Equivalent apex URL | One hop |
| Known legacy route | Closest relevant current route | Explicit route mapping |
| Legacy `.html` alias | Closest relevant current route | Explicit route mapping |
| Unknown or valueless legacy path | Genuine branded 404 or approved 410 | Never redirect every miss to home |

Use the existing `docs/legacy-url-redirect-mapping.md` as a starting ledger,
then revalidate every source immediately before launch. Static GitHub Pages
does not provide arbitrary application-level permanent redirects. If GitHub's
custom-domain behaviour cannot preserve paths or a legacy rule needs edge
logic, stop and obtain owner approval for a redirect-capable hosting or edge
solution. Do not substitute client-side redirects.

Verify every redirect has no chain, loop, query-string loss, or unexpected
cross-domain hop.

**Owner checkpoint H:** Approve the complete redirect ledger and the platform
that will enforce it.

## 14. Search Console Verification

After the branded site is stable and only with owner approval:

1. Add or confirm a Domain property for the branded domain.
2. Use the Google-provided DNS `TXT` value without altering unrelated records.
3. Verify ownership.
4. Inspect the homepage, core commercial pages, a fault guide, a region, an
   area, and representative suburb URLs.
5. Confirm rendered HTML, canonical selection, robots access, and mobile
   usability.
6. Retain any historical properties for comparison rather than deleting them.

**Owner checkpoint I:** Approve Search Console verification and the DNS `TXT`
record before it is added.

## 15. Sitemap Submission

Submit the branded sitemap only after:

- HTTPS, canonicals, robots, schema, redirects, assets, and route checks pass.
- The sitemap contains only branded URLs.
- Every sampled and automated sitemap URL returns `200`.
- Search Console ownership is verified.

Record the submission time, sitemap URL, discovered URL count, and initial
status. Do not repeatedly resubmit to force crawling.

**Owner checkpoint J:** Approve the final sitemap file and submission.

## 16. Google Ads and Analytics Conversion Verification

Preserve the existing Google Ads ID `AW-18165545331` and the phone/quote CTA
classification markers. The current source does not contain explicit
phone-click or quote-click conversion events or approved conversion labels.
Before changing any account or tag configuration:

- Record current tag IDs, event names, conversion labels, consent behaviour,
  and duplicate-firing safeguards.
- Verify page-view tracking on the branded host.
- After the owner supplies and approves the real conversion labels, verify the
  implemented `phone-click` event fires once for a real
  `tel:+61461247247` interaction.
- After the owner supplies and approves the real conversion labels, verify the
  implemented `quote-click` event fires once when the ServiceM8 quote journey
  opens.
- Verify browser Back, modal close, menu actions, and repeated clicks do not
  generate false conversions.
- Use analytics debug or test facilities where available.
- Do not submit a real paid lead or change bidding, budgets, audiences, or
  campaign destinations without separate approval.

**Owner checkpoint K:** Approve each Analytics or Google Ads account change and
the test method before execution.

## 17. ServiceM8 and Phone-Link Verification

On the final candidate and then the launched host:

- Confirm every call control uses `tel:+61461247247`.
- Confirm the visible phone number is `0461 247 247` where approved.
- Confirm every quote control reaches the approved ServiceM8 URL.
- Confirm the embedded or modal form loads, scrolls, closes with the X control,
  closes with browser Back without leaving the page, restores focus, and
  unlocks page scrolling.
- Confirm mobile sticky Call and Quote controls remain visible and unobstructed.
- Confirm no credentials or private tokens appear in source or requests.
- Do not submit a test quote unless the owner and ServiceM8 administrator have
  approved the test data and cleanup process.

**Owner checkpoint L:** Approve any live ServiceM8 submission or integration
setting change.

## 18. Robots and Indexability

The branded production `robots.txt` must:

- Allow legitimate crawling of public pages.
- Reference only the branded sitemap.
- Avoid blocking CSS, JavaScript, images, or fonts needed for rendering.
- Avoid a global `noindex` or disallow rule.

Also verify:

- Indexable pages use `index, follow` or no conflicting directive.
- 404 output is not indexable.
- Preview-only or diagnostic files are excluded from the sitemap.
- No response header conflicts with HTML robots metadata.

## 19. Post-Launch Crawl

Run a complete crawl after cutover and record:

- HTTP status and final URL for every known route.
- Canonical, robots, title, description, H1, Open Graph, and schema validity.
- All sitemap URLs and all internal links.
- Redirect chains, loops, soft 404s, orphan pages, and duplicate variants.
- Asset failures and mixed content.
- All 873 suburb pages and every response classification.
- Phone, quote, tracking, and ServiceM8 markers without submitting forms.

Compare results against the signed pre-launch route and metadata snapshots.

## 20. Desktop and Mobile Testing

Test at minimum these widths:

`320`, `360`, `375`, `390`, `412`, `430`, `768`, `820`, `1024`, `1280`,
`1366`, `1440`, `1920`, and `2560` pixels.

Cover Chromium, Chrome, Edge, Firefox, WebKit, Mobile Chrome, Mobile Safari,
and iPad where available. Verify:

- Header artwork, ticker, desktop navigation, dropdowns, hamburger, mobile
  menu, scroll lock, and sticky behaviour.
- Hero van framing and CTA visibility.
- Quote modal, browser Back, focus trap, focus return, and Escape handling.
- Skip link, landmarks, keyboard navigation, focus indicators, and touch
  targets.
- No horizontal overflow, text clipping, footer overlay, or layout shift.
- All main page templates on desktop and mobile.

## 21. First 24-Hour Monitoring

During the first 24 hours:

- Monitor uptime, certificate status, DNS consistency, and Pages build status.
- Crawl priority pages at launch, two hours, six hours, and 24 hours.
- Watch 404s, redirect errors, asset failures, console errors, and form errors.
- Confirm analytics page views and conversion events without duplicate firing.
- Confirm Google Ads destination URLs and phone assets use the branded host only
  after account changes were separately approved.
- Check Search Console for crawl or canonical errors, recognising that reports
  may lag.
- Keep the rollback owner available for the entire window.

## 22. Seven-Day Monitoring

At days 2, 3, and 7:

- Repeat the priority route, redirect, sitemap, canonical, schema, asset, and
  conversion checks.
- Review Search Console indexing, discovered URLs, canonical selection, and
  mobile usability.
- Review analytics for broken landing pages, unexpected hostname traffic,
  duplicate events, and abnormal form exits.
- Review server or edge 404 data and add only justified legacy mappings.
- Compare traffic and enquiries with the pre-launch baseline without claiming
  causation from a short observation window.

## 23. Thirty-Day Monitoring

At days 14 and 30:

- Repeat the full crawl and compare it with the launch baseline.
- Review indexed-page counts, excluded reasons, canonical conflicts, and
  sitemap processing.
- Review organic landing pages and query data where available.
- Review conversion quality, call and quote event accuracy, and page-level
  lead journeys.
- Check Core Web Vitals field data if sufficient real-user data exists.
- Review redirects receiving traffic and retain useful mappings.
- Document genuine content, proof, or conversion gaps for a separate approved
  improvement cycle.

Do not treat ranking movement or lead volume after 30 days as proof of a single
technical change without broader evidence.

## 24. Exact Rollback Procedure

Rollback must use recorded values, never memory.

1. The owner declares rollback and records the reason, time, and affected
   release SHA.
2. Freeze further code, DNS, Pages, analytics, advertising, and redirect
   changes.
3. Capture the failing state, errors, DNS answers, certificate details, and
   current deployment SHA for diagnosis.
4. If the application build is faulty but DNS and HTTPS are healthy, republish
   the signed previous branded root export or revert the release through a new
   reviewed commit. Do not rewrite Git history.
5. If Pages custom-domain or certificate handling is faulty, restore the exact
   previous GitHub Pages setting and publishing artifact from the backup
   record.
6. If DNS is faulty, restore the exact pre-launch DNS records, TTLs, and proxy
   states from the zone export. Preserve mail and verification records.
7. Remove or restore a `CNAME` file only when the approved Pages publishing
   method requires it and the repository state matches the Pages UI.
8. Restore the previously approved redirect rules. Never route all failures to
   the homepage.
9. Wait for the recorded TTL and verify DNS from multiple resolvers.
10. Verify the restored preview or prior production host, HTTPS, assets,
    representative routes, sitemap, robots, phone links, and quote journey.
11. Verify analytics and Ads are not recording duplicate or invalid events.
12. Do not delete Search Console or analytics properties. Annotate the rollback
    and correct settings only after service is stable.
13. Publish a rollback report with the restored SHA, DNS values, test results,
    outage window, and next decision checkpoint.

If the rollback target itself cannot serve the branded root correctly, restore
the prior hosting and DNS configuration first rather than deploying a
GitHub-preview build with an incompatible base path.

**Owner checkpoint M:** The owner must approve the rollback action unless an
existing written incident policy explicitly authorises the named responder.

## 25. Owner-Approval Checkpoints Before External Changes

| Gate | Approval required | Evidence presented | External action unlocked |
| --- | --- | --- | --- |
| A | Release preparation | Scope, release candidate, claim review | Prepare candidate only |
| B | Backup and rollback | SHAs, exports, DNS and settings snapshots | Continue planning |
| C | GitHub merge | Reviewed PR, green checks, workflow impact | Merge during launch window |
| D | DNS | Exact record diff and rollback values | Apply approved DNS changes |
| E | GitHub Pages | Custom domain, publishing source, CNAME plan | Configure Pages |
| F | HTTPS | Valid certificate and clean asset checks | Enforce HTTPS |
| G | Branded build | Root-path export and complete URL audits | Publish candidate |
| H | Redirects | Complete source-to-target ledger and platform | Activate redirects |
| I | Search Console | Property and exact TXT record | Verify property |
| J | Sitemap | Final crawl and sitemap validation | Submit sitemap |
| K | Analytics and Ads | Tag map, event plan, test method | Change or verify accounts |
| L | ServiceM8 | Approved URL, submission plan, cleanup owner | Submit a test or change integration |
| M | Rollback | Incident evidence and selected restore point | Execute rollback |

Each approval must identify the approver, date, exact values, affected system,
operator, and rollback point. Approval for one gate does not authorise later
gates.

## Final Launch Acceptance Record

The migration is complete only when:

- The branded HTTPS apex serves the approved release SHA.
- `www` and HTTP variants resolve in one hop to the preferred HTTPS URL.
- GitHub preview and legacy routes behave according to the approved redirect
  ledger.
- All legitimate routes, including all 873 suburbs, remain available.
- Canonicals, Open Graph, sitemap, robots, schema, and assets use the branded
  origin consistently.
- Header, navigation, ticker, mobile menu, sticky CTA, quote modal, phone links,
  ServiceM8 and tracking pass desktop and mobile checks; any explicit
  conversion events are verified only after owner-approved labels have been
  supplied and implemented.
- Search Console verifies the domain and accepts the sitemap.
- The 24-hour launch report contains no unresolved critical issue.
- The owner signs the final acceptance record.

Until that record exists, the GitHub Pages site remains a preview and this
document remains an inactive plan.
