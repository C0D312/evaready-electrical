# Launch preparation and release runbook

27 September 2026 (Sydney). **BLOCKED. Inactive runbook; no deployment approval.**
Runtime baseline: `92995ec6853e1cf00ab9d12a191a9babb034375a`.
Preparation branch: `codex/launch-preparation-2026-09-27`.

Use this with the [consolidated decisions](launch-owner-decisions-2026-09-27.md).
It narrows the next checks, not their acceptance criteria. Historical validation
and unresolved findings remain historical; this is not a fresh browser pass.

## Current testing-environment decision

The previous retained Chrome run remains UNPROVEN / NOT QUALIFIED. All 48
individual correlation findings are unresolved. Actual payload extraction and
49 focused offline checks passed, but isolation interval, system-mediated path
coverage and capture-build AFD descriptor evidence remain insufficient. Do not
reanalyse those traces to try to recover absent identifiers.

The complete prospective enforcement specification was received on 27 September
2026 (Sydney). **ONE ATTEMPT USED; FAILED CLOSED before enforcement setup.**
The guest was created with networking, vGPU and existing redirections disabled,
ProtectedClient enabled, read-only sanitised inputs and fresh writable results.
Its input verification passed for the sealed package and preparation inputs.
Runtime/build-input equivalence to the documentation-only preparation commit
`4eb66ce11ade1e2cd0bf396331684cd9e6cbe9e7` and all 7,152 retained branded-export
file identities were checked before reuse. This did not rerun the retained tests.

The guest's PowerShell rejected the reviewed enforcement setup script with
`UnauthorizedAccess`: running scripts is disabled on this system. The setup
script did not execute. No firewall rules or native auditing were configured;
no network controls, Chrome fixture, server, website interaction or performance
test started. There is no effective-policy or session-confinement pass. Eight
synthetic controller stop tests and 16 static preparation checks passed, but
these are not operational enforcement evidence. A synthetic bootstrap failure
was retained and corrected before launch; it involved only mocked receipt writes.

The guest shutdown command succeeded and closure was independently checked.
No execution-policy bypass, alternative command route, host policy change or
second guest was attempted. Historical findings and qualifications remain
unchanged. Environment experimentation is ended for this instruction.

Minimum operator requirement: a disposable, networking-disabled test environment
that permits the reviewed guest-local setup script under its approved script
execution policy. The observed rejection does not identify which policy scope
caused it, and it does not establish that subsequent firewall/audit privileges
would succeed. The operator must resolve that prerequisite without changing host
security through this task. Any further guest requires a separately authorised
allowance; the consumed one-instance limit cannot be silently reused. Once an
environment is available, every native enforcement, monitoring, control and
fixture gate still has to pass before dependent website checks.

## Evidence boundaries

| Gate | Actual evidence and remaining work |
| --- | --- |
| Preview and branded build, lint, nonincremental types | Previously passed for exact baseline 92995ec. Both profile configurations and historical assertions remain unchanged. No fresh build is claimed for this documentation-only preparation. |
| Audit suites | Previously 1,570 passed, zero failed/skipped in each profile. Retain that result only with verified code/dependency identity; do not relabel it a new run. |
| Branded static export | Previously 1,004 HTML files, 84,486 internal links, 3,950 fragments, 35 decoded images, 5,337 phone links, 5,283 quote links, 1,001 sitemap entries, zero issues. Exact retained artifact identity is checked before reuse. |
| Browser interaction, visual, keyboard and accessibility | UNPERFORMED for the launch candidate until the environment qualifies. Static link presence does not establish menu, modal, history or focus behaviour. |
| Mobile performance | BLOCKED, not passed. Existing mobile thresholds remain unmet in historical measurements; no new production or Sandbox score is claimed. |
| Genuine call/enquiry delivery and conversion accuracy | UNPERFORMED, separately permission-gated. No synthetic click proves real delivery. |
| Public claims, offers, privacy and indexing | Owner decisions outstanding; no holds cleared. |
| Deployment and rollback | Not executed; host-specific settings, old-site backup and operator remain outstanding. |

## Bounded browser checks after qualification

Use the branded-production export, inert integrations and the documented
fail-closed boundary. Never substitute a public booking page or a live tag for
fixtures. Record exact source/artifact/browser/profile identities.

The eight routes, unchanged from the existing review:

1. `/`
2. `/services/`
3. `/about/`
4. `/contact/`
5. `/emergency-electrician-sydney/`
6. `/services/switchboard-upgrades-sydney/`
7. `/electrical-faults/no-power-in-one-room/`
8. `/service-areas/western-sydney-and-nepean/blacktown/mount-druitt/`

For each, cover the existing mobile/desktop profiles, early 320px/200%-text
heading/focus checks before the wider matrix, menu open/close, scroll restoration,
keyboard order, visible focus, enlarged text, layouts and actually viewed images.
Exercise quote open/close/fallback with fixtures, Back/Forward and focus return;
verify `tel:+61461247247` without placing a call. Follow existing assertions for
accessibility and contrast. Preserve failed revisions before focused fixes, then
retest affected behaviour. Do not rerun an expensive unchanged matrix by habit.

Performance first screens Home and the no-power-in-one-room guide under the
established cache/throttling/artifact conditions. Unchanged gates: mobile
Performance >=90, LCP <=2.5s, CLS <=0.05, TBT <=200ms; desktop Performance >=95 and
no material LCP regression. If the initial screen fails, identify the bottleneck
and stop speculative tuning. A substantial adopted repair needs the existing
ten-route comparison and relevant regression checks. Software-rendered Sandbox
scores are diagnostics, not representative production acceptance without an
appropriate qualified environment. Protected artwork changes need an exact
owner-approved proposal before implementation.

## Proposed operational test, not executed

After contained local checks pass, request D6 approval for one test window:

1. Recipient/owner confirms availability, the approved destination number and
   ServiceM8 recipient, use of owner-controlled contact details, and no dispatch,
   invoice, paid lead or automated campaign follow-up.
2. One real call: identify it immediately as a website test, confirm it reached
   the intended recipient, and end it. No emergency number is tested. Retain
   only private outcome/time, not a call recording or customer details.
3. One enquiry: subject/message `WEBSITE LAUNCH TEST - no work, no dispatch, no
   invoice. Please acknowledge receipt.` Use only approved synthetic job text
   and owner-controlled contact information; no attachments or real customer
   data. Recipient confirms one receipt and agrees its cleanup disposition.
4. Verify acknowledgement, not merely the browser's success screen. Do not alter
   ServiceM8 settings or activate analytics/Ads. Any actual conversion test needs
   separate approved labels/semantics and a test-event handling decision.
5. Stop on unintended dispatch, duplicate receipt, charge or account action;
   record the issue privately. Do not send further enquiries to diagnose it.

## Hosting recommendation and artifact fit

Keep the current old site unchanged. Cloudflare Pages static-only remains a
technical no-cost candidate, subject to owner account/terms/commercial eligibility
review; this is not account activation or a promise of free hosting in every
configuration. Its documentation currently lists 20,000 files and 25 MiB per
asset on the free plan; static asset requests not invoking Functions are free.
Server/edge static redirects are supported. No Functions, storage service, paid
feature or Git integration is proposed for activation now.

Sources checked 27 September 2026 (Sydney): [limits](https://developers.cloudflare.com/pages/platform/limits/),
[static pricing](https://developers.cloudflare.com/pages/functions/pricing/) and
[redirects](https://developers.cloudflare.com/pages/configuration/redirects/).
The artifact fit check is only a file-count/size assessment, not eligibility,
successful upload, host behaviour or production performance. No live website
requests are needed for that check.

## Proposed deployment sequence after separate approval

1. Resolve D1-D8/T1, qualify the environment, implement only approved corrections,
   and complete browser/performance/operational gates. Rebuild both profiles of
   the exact final source with the unchanged pinned toolchain; complete required
   exact-commit audits, scope/privacy checks and artifact hashes. The current
   documentation commit is not a tested release candidate.
2. Complete the legacy URL inventory using owner-authorised records. Review all
   [19 proposed mappings](legacy-url-redirect-mapping.md) and any additions;
   preserve query strings and relevant intent, avoid chains and blanket Home
   redirects. Confirm every destination is approved for public access. Noindex
   destinations do not automatically make a redirect plan launch-ready.
3. Privately capture an immutable backup of the actual old site/assets, prior
   branded artifact if any, current host settings, full redirect rules, web DNS
   records/TTLs/proxy states and mail/verification records. Verify backup hashes
   and restore accessibility. A repository bundle alone is not an old-site backup.
4. Present final release approval: exact commit and artifact digest, selected
   host/plan, explicit domain/DNS/redirect diffs, indexable/public route manifests,
   named operator/window and verified rollback target. No inferred main approval.
5. Only after that specific approval, deploy the exact branded root artifact
   through the selected reviewed process. Avoid rebuilding an unpinned branch or
   activating Git-triggered previews unintentionally. Verify host staging before
   authorised cutover; never use the GitHub preview/base-path artifact at root.
6. Apply only approved custom-domain/HTTPS, redirect and web-DNS changes. Preserve
   MX/SPF/DKIM/DMARC and unrelated verification records. Check apex/www/HTTP handling,
   genuine 404s, assets/MIME/cache, eight-route behaviour, metadata/JSON-LD,
   canonicals/robots/sitemap and host performance. Stop on a failed critical gate.
7. Keep advertising off. Search Console and sitemap submission are separate
   account actions, not automatic consequences of deployment. Agree launch,
   2/6/24-hour and subsequent monitoring responsibilities; no scheduler is enabled
   by this document.

## Rollback sequence and stop criteria

Rollback candidate triggers: core route/asset failures, unusable Call/Quote,
certificate/domain failure, unintended indexing/tracking, unsupported claims or
an unresolved critical performance/accessibility regression. The owner approves
rollback execution unless an explicit incident policy already names an operator.

1. Freeze further changes and retain minimal incident evidence privately.
2. If DNS/HTTPS are sound but the artifact is faulty, restore the verified prior
   compatible branded artifact/host version. Do not substitute the preview export
   or rewrite Git history. The old external site may be the only valid restore
   point for the first branded release; verify that before launch.
3. If hosting/DNS is the fault, restore exact recorded settings/rules/web records
   and prior host. Preserve all mail/verification records and the old website.
4. Observe recorded TTLs; verify HTTPS, core and legacy routes, actual 404s,
   assets, Call/Quote pathways and indexing against the restore-point inventory.
   Repeat genuine submissions only under their specific approval.
5. Record restored version/digests, outcomes and incident window. Keep accounts,
   evidence and old artifacts; no deletion, force push or automatic relaunch.

## Scope of this preparation

Only sanitised planning documents are added. Runtime code, header/artwork,
tracking, public claims, 1,001-route sitemap and 873-suburb decision register
remain unchanged. Owner changes and cohort04 drafts stay local; suburb writing
and its scheduler remain paused. Private tooling, evidence and machine paths are
not published. No main update, deployment, account activation, hosting/DNS change,
genuine call/enquiry/conversion or spending is authorised or performed.
