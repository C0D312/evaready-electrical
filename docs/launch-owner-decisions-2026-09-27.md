# Launch owner decisions

Prepared 27 September 2026 (Sydney). **BLOCKED; proposals, not approvals.**
Reviewed runtime: `92995ec6853e1cf00ab9d12a191a9babb034375a`.
Preparation branch: `codex/launch-preparation-2026-09-27`.

This is the consolidated decision request for the current launch preparation.
It supplements the [existing decision table](launch-qualification-decisions-2026-09-25.md)
and [claims register](claims-and-offers-source-of-truth.md); it does not change
their evidence or approval status. All proposed changes below remain inactive.
Private supporting records and owner answers must stay outside Git. Existing
business name, phone number, profile link and public credential identifiers are
already recorded and need not be supplied again.

## Decisions before public launch

| ID | Recommended choice | Exact decision needed and consequence |
| --- | --- | --- |
| D1 Credentials and insurance | Retain only currently supported, job-specific scope. Do not add new warranties, experience totals, insurance or guarantees. | Privately confirm current electrical, cabling, ARC and activity/network-specific ASP authority against the existing identifiers and service review; list exceptions only. Current insurance needs covered entity/scope confirmation. If any existing claim is unsupported, approve the exact affected text/artwork correction or withhold that public page before launch. Noindex is not a substitute. |
| D2 Hours, areas and response | Retain the already recorded qualified wording only if current operations support it. | Confirm whether urgent calls are actively handled 24/7 and the existing 12-core/four-outer region classifications remain supportable. Provide exceptions and actual hours/areas privately. Use the proposed non-timing fallback below only with approval, including shared text, schema and artwork where applicable. This is not another request for already recorded numbers. |
| D3 Offers and artwork | Approve each offer separately; resolve the insurance and broad prevention claims before publishing their graphics. | Choose retain-with-current-evidence, approve the exact artwork text below, or withdraw each offer and its links consistently. Do not replace the approved header/branding or rewrite the four complete terms silently. Unsupported graphics remain a launch blocker while public. |
| D4 Tracking and privacy | Defer advertising measurement at launch, keep the neutral reviews link, and retain the deliberate ServiceM8 quote handoff. | Approve proposal T1 below and a matching reviewed privacy update. Confirm actual data recipients, responsible entity, retention/deletion, overseas handling, complaints and final hosting privately. Existing code cannot establish those practices. No new account, consent platform, tracking identifier or billing is proposed. |
| D5 Public pages and indexing | Approve the four-core-page indexing proposal separately from which pages may be public. | Confirm the exact proposal CSV: index `/`, `/services/`, `/about/`, `/contact/`; defer indexing for the other 997 routes. All public routes, including legal pages and deferred locations, still need supportable claims. If a page cannot be corrected before launch, approve its exact removal-from-public-scope and link treatment separately; do not launch it merely because it is noindex. |
| D6 Operational readiness | Authorise one controlled call and one controlled quote only after contained local checks pass and the recipients agree. | Approve the test window, owner-controlled contact details, recipient, synthetic message, acknowledgement and cleanup procedure in the runbook. A click is not a connected call or completed enquiry. No genuine test is authorised or performed by this document. |
| D7 Hosting and migration | Keep the old site intact; select an eligible static host with server/edge redirects and an immutable rollback artifact. | Confirm current host/plan eligibility and no-cost terms privately. Cloudflare Pages static-only is a technical candidate, not an account selection or activation. Approve the 19 proposed legacy mappings only after completing historical URL discovery and reviewing the destinations' public claims. No DNS/hosting action follows from this choice alone. |
| D8 Release and rollback | Withhold release approval until the exact candidate meets every required gate. | Name the deployment/rollback operator, verified old-site restore point and approved change window. A separate final approval must name the exact tested commit, artifact manifest, host, redirect/indexing decisions and rollback steps. No main update or release is authorised now. |

## Proposed wording and changes

### D1: preserve qualified credential wording

Subject to current private evidence, retain the existing public phrases:
`our licensed electricians`, `NSW Electrical Licence 398937C`,
`Open Cabler Registration 46691`, `ARCtick Licence L157323`, and
`Ausgrid & Endeavour Energy Accredited Level 2 ASP`, with their existing
activity-specific qualifications. These are recorded claims, not newly verified
credentials. Refer to the [21-route service review](phase3e2-individual-service-review.md)
for the affected specialist scopes and distinct testing/report deliverables.

Do not add insurance, warranty, fixed-fee, same-day, upfront-price or guaranteed
arrival wording without separate evidence and exact approval. An unsupported
global claim cannot be remedied only on the About page.

### D2: conditional response fallback

If timed response or 24/7 handling cannot be reconfirmed, proposed replacement:

> Call to discuss an urgent electrical fault. Attendance depends on your
> location, the work required and current availability. We will confirm timing
> for your enquiry. For fire, smoke or immediate danger, move to safety and
> call Triple Zero (000).

This fallback removes the response-time promise/estimate and does not claim
24/7 staffing. It still requires confirmation that the call pathway is operated.
Actual opening hours must be owner-supplied; none are invented. Apply any approved
decision consistently to `data/site.ts`, shared templates, page metadata/schema,
and affected artwork. A timing edit embedded in approved artwork requires its
own approval. No such edit is made here.

### D3: four independent offer choices

The exact eligibility, exclusions and non-stacking text remains in
`data/offers.ts`. It is not shortened by the following headline proposals.

| Offer | Proposed action if retained | Consequence if not retained |
| --- | --- | --- |
| Free Electrical Safety Inspection | Replace only the broad graphic claims with `Free visual electrical safety inspection` and `Visual inspection only. Repairs, fault diagnosis and certification are not included. Eligibility and terms apply.` Keep existing full terms. | Withdraw the offer card and related references; do not leave a graphic promising a service that is no longer offered. |
| Get $50 Off When You Book Online | If insurance remains unsupported, replace `Licensed & Insured` with `Eligibility and terms apply.` Retain the discount only after confirming planned-work eligibility and all current exclusions. | Withdraw this offer and associated references; preserve original artwork privately/history, not as a misleading public promotion. |
| 15% Off First Emergency Service | Confirm first-customer eligibility and labour-only scope. Proposed prominent clarification: `15% off eligible labour on your first emergency electrical service. Exclusions and terms apply.` | Withdraw the offer, not the urgent-fault contact pathway. |
| 20% Off Pensioners, Seniors & Veterans | Confirm accepted identification and eligible labour. Proposed clarification: `20% off eligible labour for pensioners, seniors and veterans. Identification and terms apply.` | Withdraw the concession offer and corresponding references consistently. |

The showcase currently appears on Home, Services, Emergency Electrician Sydney
and Switchboard Upgrades Sydney. Location links and the footer also reference
offers. Any withdrawal must include those links, all FAQs/schema expectations
and targeted regression tests. No image has been regenerated or changed.

### T1: defer the advertising tag, not the quote pathway

**Review-only patch; not applied.** On `app/layout.tsx`, remove only:

```diff
-import { GoogleAdsTag } from "@/components/google-ads-tag";
@@
-        <GoogleAdsTag />
```

Keep approved style variables, header, layout and all other children unchanged.
Do not change the identifier or activate an alternative tag. Keep CTA markers
for internal classification, without treating them as conversions. Retain the
neutral Google reviews link; authenticated aggregate activation is optional
after launch, not a reason to fabricate ratings or access an account now.

After T1 is approved and implemented, proposed replacement for the advertising
paragraph in `app/privacy-policy/page.tsx`:

> This website does not load the Google advertising tag. Selecting Call opens
> your device's calling application. Selecting Quote opens the ServiceM8 form;
> opening that form connects your browser to ServiceM8. A link selection is not
> confirmation that a call connected or an enquiry was received.

The existing implementation does load the base tag, so this proposed paragraph
must NOT be published alone. The current tag component does not itself define
a successful-call or completed-enquiry conversion; external account behaviour
has not been inspected. If the owner instead retains measurement, precise events,
consent/privacy handling and claims must be verified before launch.

The final host-specific privacy sentence cannot be completed until the host is
chosen. Other existing privacy promises (including sharing and retention) need
the owner's factual and appropriate legal review. This document supplies no
legal clearance and does not change Terms or an updated-date field prematurely.

### D5: exact indexing proposal

Use the unchanged [1,001-route proposal](launch-indexing-proposal-2026-09-25.csv)
as the review object, not a wildcard. Four proposed indexable routes have branded
self-canonicals and sitemap inclusion. The other 997 proposed accessible routes
use `noindex,follow`, self-canonicals, omission from sitemap and crawl access so
the noindex can be read. Legal pages remain accessible in this proposal.

Only a later approved route/decision/date manifest may change runtime robots,
sitemap and the authoritative decision register. Do not canonicalise distinct
pages to Home, blanket-redirect deferred routes, or record all 873 suburbs as
individually evidenced. The proposal is not implemented by this preparation.

## Before Google Ads

Resolve the public-launch gates first. Then approve actual landing pages,
service geography/hours, offers, budget and account changes separately. Define
connected-call and successfully received enquiry outcomes, deduplication and
test handling before conversion implementation. CTA clicks may be diagnostic
interactions, not evidence of those outcomes. No advertising or spending now.

## After launch

Further suburb writing, wider evidenced indexing, optional aggregate reviews,
additional project proof and optional service consolidation can wait. Current
mobile performance, factual claims, privacy and operational gates cannot.

Owner response may reference D1-D8 and T1 with approved choices/exceptions and
dates. Keep private evidence outside Git. Silence or general testing approval
does not approve any of these decisions.
