# Phase 3D8 core-page review

Starting source: `7a2b7f0bbdc1c53105410386428fa8c7180d8511`.
Scope: `/`, `/about`, `/contact`, `/privacy-policy`, `/terms`, `/electrical-faults`.
Feature-branch review only. No new publication is authorised by this document.

## Findings recorded before implementation

- Home: useful service routing and availability qualifications already exist. Emergency-service priority appears below the first business CTA; quote FAQ lacks safe-photo/privacy limits. The credential heading implies independent verification beyond this review.
- About: repeated service inventories obscure the customer process. First CTA precedes emergency-service priority. Photo guidance lacks a safe-distance condition. Existing registered credentials must retain their service-specific qualifications, without implying every worker holds every authorisation.
- Contact: gate information and unrestricted switchboard/document photographs are requested without privacy or safety boundaries. Repeated service-list copy does not help a customer prepare an enquiry. An enquiry must not be represented as a confirmed appointment.
- Privacy: actual code loads the Google advertising tag after hydration, opens a ServiceM8 iframe on a quote request and fetches an aggregate-review summary from this site. The text instead describes unspecified similar tools and assumes providers process data only for Evaready's purposes. No account settings, retention periods or overseas processing locations were verified.
- Terms: emergency guidance starts with the business phone number, and isolation advice does not sufficiently address unsafe access. Existing commercial/legal provisions need owner/legal review; this phase cannot approve them.
- Fault index: compound introduction is difficult to scan; line-clamped full guide introductions hide safety context. All 15 guides need visible symptom-specific summaries, not repeated full emergency paragraphs. No guide record needs changing.

## Evidence and limits

Repository inspection: the six page modules, `data/claims.ts`, `components/google-ads-tag.tsx`, `components/live-google-rating.tsx`, `lib/google-business-profile-rating.ts`, and `components/service-m8-frame.tsx`. No external account access or form submissions.

Public guidance consulted on 6 September 2026:
- [Fire and Rescue NSW emergency calls](https://www.fire.nsw.gov.au/contact/emergencies): emergency-service priority.
- [OAIC APP 1 guidance](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-1-app-1-open-and-transparent-management-of-personal-information): transparent privacy information, complaint handling and overseas disclosure. Whether the Privacy Act applies to this business remains an owner/legal question.
- [ACCC consumer rights](https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees): statutory rights must not be represented as excluded by website wording.

This is a website-content review, not legal advice or a compliance certification.

## Owner holds

- Privacy/Terms: confirm the responsible legal entity, actual information recipients, overseas processing locations, retention/deletion practices, complaint process, and applicability of privacy obligations. Obtain legal review of the existing liability and contract wording before a release of these changes.
- Home/About: live Google aggregate data remains unavailable until the authorised private API process succeeds. No numerical rating or historical count is substituted.
- Home: existing offer artwork contains an insurance claim already held in `data/claims.ts`. Artwork is outside this phase; current insurance evidence or separately authorised corrected artwork is required.
- Existing specialist credential evidence and service scopes remain governed by the owner-verification register. No new credential approval is inferred from a registry link.
- All six routes require a separately approved exact-SHA release and artifact/live verification. The prior 21 pending routes remain pending.

## Content outcomes

All six pages required scoped corrections; none was rewritten just to increase length.
Word totals are main-content token counts, including shared content, not quality scores.

| Route | Before | After | Outcome |
| --- | ---: | ---: | --- |
| `/` | 938 | 1005 | Emergency priority, safe quote FAQ, qualified credential heading |
| `/about` | 557 | 618 | Customer-focused introduction, emergency priority, safe-photo process and specialist-scope limits |
| `/contact` | 263 | 316 | Useful enquiry details, privacy boundaries and no implied appointment confirmation |
| `/privacy-policy` | 663 | 812 | Actual ServiceM8, Google tag, aggregate-summary and preview-hosting descriptions; owner/legal holds retained |
| `/terms` | 854 | 921 | Emergency priority and safer equipment/photo instructions; existing legal provisions held for review |
| `/electrical-faults` | 1088 | 740 | Fifteen distinct unclipped summaries, clear guidance limits and safer next steps |

The initial enlarged-text run exposed six failures at narrow widths. Root causes
were min-content grid expansion, fixed two-column overrides, three-column link
styles applied to two-child links, and headings without emergency word wrapping.
Repairs are limited to the six core-page classes in `app/ux-overhaul.css`.
The existing fault-guide contrast overlay also applies to the fault index;
the individual guide appearance is unchanged. No header rule or artwork changed.

Initial lint found two unescaped apostrophes in JSX, corrected without changing
the visible text. Diagnostic failures remain in local evidence; they are not
reported as passing checks. Screenshot-only overlay masking is not a functional
test. Owner/legal holds are not technical test failures or approvals.

The full audit-unit suite also exposed a historical register assertion that still
froze the six newly authorised core rows. Its exclusion list now includes this
batch, with the remaining 986-row hash calculated from the recorded starting
commit. The new batch test independently protects all other 995 rows and the
21 earlier pending-publication rows. No functional assertion was relaxed.
