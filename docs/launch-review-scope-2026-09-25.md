# Launch Review Scope

Prepared 25 September 2026 for owner review, not deployment approval.
Baseline: `567cb6ea9e78962094ce95dae8aed583b7b6c3be` on
`codex/whole-site-completion`. Review branch:
`codex/launch-review-2026-09-25`.

## Owner Changes

The separate owner checkout remains on its original base
`0c2d5675e8ad27c60e551ef155e15fabe1b3bdbd`. Its 42 tracked modifications
were preserved privately and compared with their original base, the current
owner-branch remote and the completed baseline. No older file replaces newer code.

- The review-widget neutral wording, truthful unavailable state and neutral
  review link are already incorporated in the newer Business Profile aggregate
  implementation. Preserve that implementation instead of restoring the older
  browser Places integration.
- The corresponding owner test intentions are covered by the newer aggregate
  tests. Do not transplant obsolete Places mocks or obsolete markup expectations.
- The owner's deletion of the old desktop-header regression is not carried over.
  The completed baseline has an updated art-directed header regression that must
  remain. Removing current coverage would need a separately justified decision.
- The other 39 modified files are generated audit documents, reports or images.
  Their timestamps, measurements and visual evidence are not current validation
  of this release. They remain local and are not imported into this branch.
- Untracked local files, alternative artwork, credentials, customer material,
  logs and private test evidence are excluded. Existing tracked history is not
  rewritten or purged.

No additional runtime change is required to retain the reviewed owner intent.
This branch adds only this sanitised scope and release-decision document.
Held cohort04 drafts are not included; suburb-writing and the completion
autopilot remain paused. Previously completed batches are not repeated.

## Validation Boundary

Use the pinned toolchain in an isolated checkout with `branded-production`,
`https://evareadyelectrical.com.au`, and an empty base path. Retain actual results
and failure records privately. Historical or static checks must not be presented
as fresh interactive, visual, device, performance or live-production passes.

The installed browser differs from the frozen qualified browser. Qualification
also needs to resolve the retained external IPv6 socket-connect observation.
No packet-delivery or complete-containment conclusion follows from that event
alone. Do not weaken version, functional, performance or containment criteria.
Do not contact real booking, review or conversion services for tests.

## Proposed Core-Page-First Indexing

Proposal only: the current indexing registry, robots, canonicals and sitemap
remain unchanged. Rewriting content does not supply missing owner evidence.

1. Approve an explicit initial allowlist: Home, Services, About and Contact,
   plus Emergency Electrician Sydney only after current capacity and claims are
   confirmed. Add individually approved general-service landing pages as ready.
2. Keep legal pages accessible and decide their indexability explicitly in the
   same manifest. Do not hide privacy or customer terms behind an indexing choice.
3. Pending a scoped owner decision, defer broad suburb, region, area, specialist
   and unfinished guide indexing. Proposed deferred routes remain accessible
   with `noindex,follow` and self-canonicals, and are omitted from the sitemap.
   Do not block crawler access in robots.txt to routes that need a noindex read.
4. Do not canonicalise distinct local pages to Home or delete routes. Any redirect
   or consolidation requires its own approved mapping and evidence.
5. This does not approve a blanket change to the existing 873 suburb decisions.
   Implement only a later explicit route-level decision manifest, with dates,
   followed by a fresh export and indexing audit.

References: [Google's noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
and [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Release Decisions

Before going live: finish contained interactive/mobile/performance qualification;
confirm current electrical and any advertised specialist scope and serviceability;
resolve insurance and offer-artwork claims; reconfirm promotions; complete private
privacy/terms review; approve an indexing manifest, eligible hosting, redirect and
rollback plan, and an exact release commit. A neutral Google review link can remain
without enabling the pending authenticated aggregate integration.

Before Google Ads: satisfy launch gates first; approve actual landing pages,
service areas, offers and budget; define and verify genuine call/quote conversion
semantics and any required tracking/privacy configuration. A quote-button click
is not a completed enquiry or booking. No advertising or genuine test submission
is authorised here.

After launch: further suburb writing, additional evidenced location indexing,
API-backed aggregate reviews, optional project/biography proof and evidence-led
service consolidation can be considered separately. Existing unresolved launch
requirements are not waived merely by deferring improvements.

No main update, deployment, workflow dispatch, hosting/DNS change, old-site
deletion, account enablement or advertising action is authorised by this branch.
