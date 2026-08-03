# Location Template Refactor Plan

**Status:** PLAN ONLY - route deletion, redirects, canonicals and production code changes are outside this report.

## Objective

Preserve all 929 location routes while replacing long, synonym-rotated location templates with concise pages whose purpose and factual locality data are clear. The first refactor should reduce duplication and payload without hiding content, fabricating local proof or weakening navigation.

## Proposed route purposes

| Route type | Primary purpose | Required distinction |
| --- | --- | --- |
| Service-area index | Search by suburb/postcode and browse all regions | Site-wide Sydney and surrounding-regions directory; no duplicated local sales essay. |
| Region | Explain broad coverage, response class and link to its areas | Regional navigation hub; should not repeat area-directory copy. |
| Area | List covered suburbs/postcodes and explain service access for the area | Operational directory and closest decision point before a suburb page. |
| Suburb | Confirm coverage, postcode, response class and next action | Concise locality confirmation page, not a 3,000-word mini version of the whole website. |

For Blue Mountains, Northern Beaches and Sutherland Shire, keep both levels during refactoring. Give the region route a hierarchy/coverage-hub role and the area route a suburb-directory role. Any later consolidation requires Search Console and backlink evidence.

## Sections to retain

- One H1 with the correct locality and one short service summary.
- Breadcrumbs showing region, area and suburb hierarchy.
- Suburb name and postcode from `coverageRegions`.
- Centralised 60-minute or selected outer-region 60-90-minute response wording, including existing limitations.
- Clear unsafe-fault Call action and planned-work Quote action.
- A concise list of relevant emergency, Level 2 and general services with important internal links.
- Region/area/suburb navigation and valid nearby links.
- Verified licence, ABN, Open Cabler, ARCtick and Level 2 ASP facts.
- A short visible FAQ only where the answer helps a location decision.
- Offer access through one compact summary/link; full terms remain on the approved offers source.

## Sections to merge

| Current blocks | Proposed block | Reason |
| --- | --- | --- |
| Three landing service cards + eight service summaries + twenty service links | One categorized service directory with 8-12 strongest links | Removes multiple descriptions of the same services while preserving crawlable links. |
| Three call/quote/Level 2 action cards + process section + final CTA | One 'How to get help' block plus one final CTA | Reduces suburb CTAs from 14 toward 4-6 without weakening the journey. |
| Google proof + trust items + TrustProcessProof + repeated credential explanations | One compact credentials/proof section | Global facts remain visible without pretending to be local evidence. |
| Local highlights + property mix + typical examples | One evidence-backed locality note, or nothing | Render only sourced facts; do not pad pages with inferred local colour. |
| Five generic suburb FAQs | Two or three decision FAQs | Keep call/quote and response guidance; remove questions that merely restate service lists. |

## Sections to remove from location templates

- Full four-offer cards and conditions from all 928 detail routes. Link to the canonical offers section instead.
- Repeated generic trust paragraphs that appear on every suburb page.
- Duplicate Call/Quote pairs between adjacent sections.
- `Typical local examples`, `common enquiries` and property/access claims without an evidence record.
- Hash-selected synonyms whose only purpose is to make otherwise identical pages look different.
- Repeated service prose already available on dedicated service pages.
- Generic FAQ answers that are identical after replacing the locality name.

Removal means removing redundant rendered blocks while preserving the underlying service links, legal offer terms at their source, and route coverage.

## Approved factual unique data

The refactored templates may safely treat these as page-specific facts:

- Suburb name, postcode, slug, region and area from the coverage dataset.
- Region/area descriptions only after an owner/source review confirms accuracy.
- Response classification from the centralized business mapping.
- Nearby-route relationships generated from existing valid route data.
- Verified business credentials and contact details.
- Service availability explicitly approved in the central service dataset.
- Owner-supplied completed-job facts, photos or case studies with consent.
- Public locality facts only when the source URL, retrieval date and permitted use are recorded.

## Fabricated-proof prevention

1. Replace free-form locality context strings with a typed `LocalityEvidence` record containing `claim`, `source`, `checkedAt`, `ownerApproved` and `evidenceType`.
2. Render a locality claim only when `ownerApproved === true` and a source/evidence reference exists.
3. Prohibit `stableHash`/`pick` from selecting locality claims. It may vary purely presentational ordering only when meaning is unchanged and no uniqueness is implied.
4. Add a test that flags `typical`, `commonly`, `often`, `local jobs`, `nearby team`, office/depot language and completed-work implications unless evidence is attached.
5. Keep generic service information explicitly generic. Do not attach a suburb name to it merely to manufacture local copy.
6. Require owner review for response, review, offer and accreditation claims before launch.

## Content and payload targets

Targets are guardrails, not reasons to delete useful content:

| Route type | Current average | Initial target |
| --- | --- | --- |
| Region | 1,302 words; 249 KB raw HTML; 5 H2; 6 CTAs | 650-950 words; <=220 KB; 3-5 H2; 4 CTAs |
| Area | 1,242 words; 262 KB; 6 H2; 6 CTAs | 700-1,000 words; <=230 KB; 4-6 H2; 4 CTAs |
| Suburb | 3,060 words; 439 KB; 17 H2; 14 CTAs | 750-1,200 words; <=260 KB; 6-9 H2; 4-6 CTAs |

Additional quality targets:

- Average suburb near-shared text below 60% after locality substitution.
- No suburb with 0% unique semantic blocks.
- No identical H1 + meta pair between overlapping region and area routes.
- One compact offer reference per page, not four full cards and terms.
- No hidden SEO-only copy and no client-only delivery of important location content.

## Refactor sequence

1. Snapshot all 929 paths and the current verification hash.
2. Build small server-rendered components for coverage facts, service links, credentials, FAQs and nearby navigation.
3. Refactor the suburb template first behind focused tests; do not edit the dataset simultaneously.
4. Refactor area and region templates, including explicit one-area-region handling.
5. Replace unsupported context rendering with evidence-gated fields.
6. Re-run similarity and payload measurements and compare with this baseline.
7. Review representative pages at core/outer response classes and every template family before any Git action.

## Route-preservation checks

- Exactly 1 service-area index, 16 regions, 39 areas and 873 suburbs.
- All 929 current paths produce static HTML.
- Existing canonical and trailing-slash policy unchanged during template refactor.
- Sitemap path set unchanged unless separately approved.
- 678 core 60-minute and 195 selected outer-region 60-90-minute suburb mappings unchanged.
- Every suburb still shows name, postcode, region and area.
- Every suburb retains valid non-self nearby links; baseline is eight per page.
- No broken breadcrumbs or internal service links.
- Metadata, schema, tracking, phone and ServiceM8 markers preserved.

## Required validation

- TypeScript, lint and clean static build.
- Exact route-set diff and sitemap diff.
- 873-record suburb completeness and response classification audit.
- Internal-link, canonical, metadata, schema and visible-copy audits.
- Similarity report rerun with before/after comparison.
- Raw and compressed payload comparison by route family.
- One H1, landmark and heading-order checks.
- Responsive and keyboard smoke tests on index, region, area and suburb routes.
- No horizontal overflow, hydration errors or console errors.

## Decision gates

- Do not delete, redirect or canonicalise overlapping routes in the template-refactor change.
- Do not write local claims until evidence exists.
- Do not add more suburb routes to offset weak uniqueness.
- Do not count rotated synonyms as unique value.
- Stop if route count, response mapping, internal links or approved credentials change unexpectedly.
