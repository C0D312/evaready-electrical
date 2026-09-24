# Launch qualification and owner decisions

Status: preparation only. No release approval, deployment, main update, account
activation, tracking change, hosting/DNS change or suburb-writing resumption.
Starting review: `70fd3d742954f4bd0648257054f22cc15421668e`; completed editorial
baseline: `567cb6ea9e78962094ce95dae8aed583b7b6c3be`.

## Audit profiles

Use two separate clean worktrees of the same commit and identical lockfile. Build
one with `NEXT_PUBLIC_DEPLOYMENT_TARGET=github-preview`,
`NEXT_PUBLIC_SITE_URL=https://c0d312.github.io/evaready-electrical` and
`NEXT_PUBLIC_BASE_PATH=/evaready-electrical`. Build the other with
`NEXT_PUBLIC_DEPLOYMENT_TARGET=branded-production`,
`NEXT_PUBLIC_SITE_URL=https://evareadyelectrical.com.au` and an explicitly empty
`NEXT_PUBLIC_BASE_PATH`. Do not reuse either profile's `.next` or `out` directory.
Use pinned Node 22.23.1, npm 11.13.0 and the unchanged lockfile (Next 16.3.4).

After both builds, run `tsx scripts/audit-deployment-profile.ts PROFILE
ABSOLUTE_PEER_OUT ABSOLUTE_PRIVATE_EVIDENCE_DIRECTORY` in each worktree. The runner
checks source commit, lockfile, export version markers and independent expected
origin/base path before running every audit. Keep evidence outside the checkout.
It does not build, start a browser or deploy anything. Run lint, nonincremental
TypeScript and `scripts/audit-production-domain.ts` separately for each profile.

The 951 previously reported failures have a retained per-test inventory, not just
group counts: 55 directory-link expectations, 873 related-suburb expectations,
one native sitemap/106-page sealed contract, 21 card contracts and one 48-offer
catalogue seal. Profile selection is explicit, never inferred from candidate HTML.
The original sealed fixtures and expected hashes remain unchanged. Branded checks
map only independently specified URL fields/HTML attributes and parsed inline-CSS
image URLs back to the
historical profile for hash comparison; unrelated text and markup remain sealed.
Card fixtures are mapped forward only in URL slots. A paired-export audit checks
all public main/header/footer markup, metadata, JSON-LD and image bytes. Negative
cases reject wrong origins, leftover preview URLs, changed/missing links and
unrelated copy changes. The preview resolver still rejects root-mounted servers.

Preparation checks pass all 1,570 audits separately for preview and branded
profiles, including the paired-export check (1,004 HTML files). Every one of the
951 prior failures is matched individually to its cause and passing equivalent.
Branded offline checks resolve 84,486 internal links, 3,950 fragments, 35 decoded
images, 5,337 phone links, 5,283 quote links and 1,001 sitemap entries. These are
static checks, not browser behaviour or real delivery. Exact final-commit builds
and receipts accompany the phase report. Historical fixtures/hashes are unchanged.

Retained preparation failures include one test-only TypeScript fixture mismatch,
then two profile-adapter revisions for inline CSS URLs and an over-broad attribute
match. Failed inputs and outputs were preserved before correction. No runtime
content was changed to satisfy an audit.

## Browser block

The installed Chrome file is 153.0.8010.53; earlier qualification belongs to
153.0.8010.48 and is not transferred. Executable identity is retained privately.
Read-only replay passes the eight historical negative controls, but the unchanged
reader also accepts an injected external UDP-send event. This is a demonstrated
reader coverage gap, not evidence that a real external packet was sent.

The HTTP proxy and page interception do not supply an independently verified
process-level TCP/UDP/DNS egress boundary. Retained startup evidence includes an
external IPv6 socket-connect observation without a UDP-send event. That absence
does not prove full containment. The historical launcher uses `--no-sandbox`;
carrying it forward would conflict with the current security boundary.

Required decision: provide an approved isolated execution environment with
enforced egress confinement and independent evidence, then qualify startup,
direct-network attempts, proxy reconciliation and negative controls with browser
security enabled. No global networking/firewall/trust change or browser
installation is made here. No incomplete harness patch is published as qualified.
Fresh browser interaction, visual/accessibility and performance checks remain
UNPERFORMED, not passed. No real call, enquiry or conversion is generated.

The predeclared later browser sample is `/`, `/services/`, `/about/`, `/contact/`,
`/emergency-electrician-sydney/`, `/services/switchboard-upgrades-sydney/`,
`/electrical-faults/no-power-in-one-room/` and
`/service-areas/western-sydney-and-nepean/blacktown/mount-druitt/`.
The bounded performance screen must include Home and the previously failing
no-power-in-one-room guide, with the established thresholds and recorded browser,
artifact, cache and throttling. Stop after a failed initial screen to identify the
bottleneck; do not start speculative optimisation. Local success cannot establish
production-host performance or clear other release gates.

## Decisions before the website goes live

Repository wording and historical tests are evidence of implementation, not proof
of current business authority or legal approval. This table is a decision request,
not a change to the claims register or a clearance of any hold.

| Decision and affected pages | Evidence available / still needed | Proposed owner action |
| --- | --- | --- |
| Current electrical, cabling, ARC and Level 2/network scope: global credentials, `/about/`, `/level-2-electrician-sydney/`, `/solar-batteries/`, and specialist service routes listed in `scripts/phase3e2-service-review.ts` | Existing identifiers and qualified wording are present; current records and activity-specific authority are not established by this task. CCTV/intercom, solar/battery, metering, refrigerant and communications scope require their own evidence. | Supply current records privately and approve exact advertised scope, or authorise specific claim/page corrections. No licence inference from passing tests. |
| Serviceability, 24/7 phone handling and response targets: Home, emergency, Services, all 929 directory/location pages and shared templates | Existing core/outer-region classification and qualifications are implemented; current roster, accepted areas, capacity and supportable timing need reconfirmation. | Approve exact service-area/response matrix and exclusions; correct unsupported wording before any public launch. |
| Insurance and artwork: `/`, `/services/`, `/emergency-electrician-sydney/`, `/services/switchboard-upgrades-sydney/` | Claims register marks insurance unapproved; the $50 artwork says Licensed & Insured. Free-inspection artwork contains broader safety statements. | Provide current cover/entity/scope and approve exact wording, or separately authorise corrected artwork. Artwork is preserved here. |
| Four promotions on those same four routes | Eligibility, exclusions and non-stacking terms exist in `data/offers.ts`; current availability, labour-only limits and concession eligibility need confirmation. | Approve each offer and artwork wording, or authorise withdrawal/correction. |
| Privacy and terms: `/privacy-policy/`, `/terms/`, quote panel and global integrations | Current text identifies ServiceM8, Google and GitHub preview hosting. Actual recipients, storage/retention, user choices and final host-specific statements are not owner-approved by this review. | Confirm actual operating practices and obtain appropriate review of exact text; update only after owner approval. |
| Globally rendered Google advertising tag: every page through `app/layout.tsx` | Tag mounting is confirmed; consent/privacy settings and necessity at website launch have not been cleared. | Explicitly decide whether approved measurement runs at launch or authorise its removal/deferment. No tracking configuration changes here. |
| Call and quote readiness: all CTAs, `/contact/`, booking modal/fallback | Static destinations can be checked; containment blocks fresh local interactions and genuine enquiry delivery is untested. | Complete inert local checks after qualification, then separately approve a controlled real delivery/operational check before go-live. Do not label a Quote click an enquiry. |
| Initial Google indexing: all 1,001 current sitemap routes | Existing sitemap/index-follow behaviour and empty decision register remain unchanged. Separate proposal below identifies exact routes. | Approve a dated route-level decision before implementing any robots, sitemap, canonical or register change. |
| Hosting eligibility and release pipeline | Branded export configuration exists; preview workflow is not a branded production deployment plan. Existing hosting research is historical, not current account eligibility/terms approval. | Select a commercially eligible plan and approve terms/costs and a reviewed deployment design separately. No accounts or hosting connection made here. |
| Legacy URLs, redirects and rollback | Existing migration plan has 19 proposed legacy paths but incomplete old-site discovery; final host mapping and rollback are unverified. | Approve complete URL inventory, HTTP redirect map, immutable old-site/artifact backup, rollback owner and verification procedure before cutover. Preserve the old website and all mail/DNS records. |
| Exact release and mobile performance | No new browser/performance pass; no production-host validation. | Resolve the browser block, meet established gates, then approve the exact final commit and separately validate the deployed host. No approval inferred from this branch push. |

## Initial indexing proposal only

The separate `launch-indexing-proposal-2026-09-25.csv` enumerates every current
sitemap route, with no wildcard or implicit replacement routes. It is not imported
by application code and is not the authoritative indexation decision register.

| Exact initial routes | Proposed treatment after all applicable launch holds resolve |
| --- | --- |
| `/`, `/services/`, `/about/`, `/contact/` | index,follow; branded self-canonical; include in sitemap. Even these are not approved while shared artwork/claims/privacy/operational holds remain. |
| `/emergency-electrician-sydney/`, `/services/residential-electrician-sydney/`, `/services/switchboard-upgrades-sydney/` | Candidate additions only after individual readiness and owner approval; currently proposed deferred. |
| Every other exact route in the proposal CSV, including all suburb pages and legal pages | Accessible, noindex,follow, self-canonical, omitted from sitemap, not blocked from crawling; reassess individually later. |

This is a proposed restricted initial discovery scope, not a reason to publish
unsupported claims. Noindex does not make unsupported public content acceptable.
Current sitemap, robots, canonicals, indexation decisions and business claims are
not modified by these documents.

## Before Google Ads and after launch

Before Ads: clear website-launch gates; approve exact landing pages, current
claims/offers, geographic targeting, hours and spending limit; approve privacy and
measurement configuration; verify genuine connected-call/completed-enquiry
conversion definitions and delivery with separate permission. No account
activation, tag activation or spend is authorised by this phase.

After launch: further suburb writing, broader evidenced indexing, optional
authenticated review aggregates and evidence-led consolidation can wait. These
do not replace launch-critical performance, privacy, business or operational gates.
