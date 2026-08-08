# Location Indexation Owner Decision Guide

## Current state

This task creates a decision system only. It does not apply an indexation decision.

- Suburb routes: **873**.
- Default decision status: **unreviewed**.
- Explicit owner decisions in the registry: **0**.
- Current index/follow pages: **873**.
- Current noindex pages: **0**.
- Current sitemap suburb URLs: **873**.
- Current self-canonicals: **873**.
- Current redirects: **0**.

The typed registry in `data/location-indexation-decisions.ts` is deliberately empty. An empty registry is not connected to page metadata, sitemap generation, robots, redirects or internal links, so it changes no public behaviour.

## Decision statuses

### `index-ready`

The route is genuinely useful and serviceable and is supported by verified evidence or demonstrated business/search value.

Proposed later behaviour after a separate owner-approved implementation:

- `index, follow`.
- Self-canonical.
- Included in the sitemap.

### `hold-noindex-candidate`

The route represents valid coverage but presently has insufficient evidence or launch value. This is only a candidate status until the owner approves a separate technical change.

Proposed later behaviour for an owner-approved hold page:

- `noindex, follow`.
- Self-canonical.
- Excluded from the sitemap.
- Route remains accessible.
- Call and Quote pathways remain.

A noindex page must not be blocked in `robots.txt`; crawlers need access to read the noindex directive.

### `consolidation-review`

The route needs a separate search-demand, backlink, canonical, destination and redirect review. This status causes no technical change by itself.

### `unreviewed`

Default status until the owner makes an explicit route-level decision. No technical change is permitted.

## Required owner inputs

Use the blank `reports/location-indexation-owner-review.csv`. Genuine prioritisation requires owner-supplied, sanitised aggregate data:

- Serviceability confirmation and response capability.
- Approved completed-job, photograph and testimonial counts.
- Search Console impressions, clicks and query relevance.
- Google Ads qualified conversions.
- ServiceM8 enquiries and completed jobs.
- Commercial/revenue priority.
- Legitimate backlinks and referrals.
- Explicit owner decision and date.

No external account was accessed to create this dataset, and no owner-controlled field was guessed or pre-populated.

## Decision process

1. Keep raw source exports and private evidence in an owner-controlled system outside GitHub.
2. Aggregate and sanitise route-level values before using the CSV.
3. Review usefulness, serviceability, evidence, search intent, qualified leads and legitimate authority together.
4. Record one explicit decision per route and a decision date.
5. Review candidate changes for backlinks, internal links, canonical destination and redirect consequences.
6. Supply an explicit approved route list for a separate implementation task.
7. Rebuild and verify metadata, sitemap, canonicals, robots, routes, Call/Quote paths and rollback mapping before any publication.

## Blank scoring framework

The repository does not assign a score or weight. The owner may define a model using the input columns above, but must document:

- Data source and date range.
- Meaning of a qualified conversion or completed job.
- Weight for each input.
- Missing-data treatment.
- Minimum evidence and serviceability gates.
- Manual review and approval step.

Scores may order human review only. They must never trigger automatic indexation changes.

## Launch decision gate

The separate audit `npm run audit:location-indexation` reports:

`BLOCKED — OWNER INDEXATION DECISIONS MISSING`

while all 873 routes remain unreviewed. This is an owner-decision gate, not a development-build failure; lint, TypeScript and ordinary production builds remain unaffected.
