# Location Audit Hardening

## Scope

This work hardens audit and test tooling only. It does not connect the owner decision registry to public metadata, robots, sitemap generation, canonicals, redirects, routes or content.

Starting source identity:

- Branch: `codex/responsive-ux-overhaul`.
- Commit: `29b30f566fcdc9155540d9fd51f16a78d1636371`.
- Required runtime: Node.js `22.23.1`.

## Inspection Findings

The pre-edit inspection confirmed these defects:

1. The location Playwright test used an origin-relative leading-slash route and could bypass the GitHub Pages base path.
2. `indexationBehaviorChanged` was a constant rather than a measured comparison.
3. A technical `PASS` and blocked owner decision gate were presented without separate result fields.
4. Robots checks used substring matching, allowing `nofollow` to satisfy a search for `follow`.
5. The audit model validated only the empty-registry baseline and could not test future applied decisions.
6. An empty privacy dataset could be described too broadly instead of as a scoped empty-dataset result.
7. Only referenced images were inspected, allowing orphan files in the evidence directory to escape review.
8. Byte substring searches were not reliable EXIF, XMP, IPTC or GPS parsing.
9. Referenced paths, decoded formats, MIME types and intrinsic dimensions were not all verified together.
10. The tracked owner CSV lacked a sufficiently prominent warning that it must remain blank in GitHub.
11. The generated location-quality report needed current-run evidence rather than an older timestamp.
12. The new Playwright assertion had no concise exact-commit machine-readable result.

## Hardened Model

The indexation audit now has two explicit modes:

- Baseline mode measures the current 873-route public contract while the owner registry is empty.
- Applied-decision mode accepts synthetic fixtures and validates future `index-ready`, `hold-noindex-candidate`, `consolidation-review` and `unreviewed` behaviour without adding a real decision.

The privacy audit now inspects typed records and every physical file under `public/images/location-evidence/`. It rejects traversal, symlink escapes, orphan files, unsafe names, unsupported or mismatched formats, MIME mismatches, dimension mismatches, embedded metadata, configured PII patterns and missing approval flags. `sharp` `0.35.3` is pinned as the direct audit decoder because that exact compatible version was already present in the lockfile through Next.js.

Automated privacy checks do not perform OCR, facial recognition or complete contextual identification. Human review remains mandatory for people, plates, addresses, documents, labels, properties, consent and contextual identification.

## Owner Data Boundary

**Copy the blank owner-review CSV to an owner-controlled private system. Never complete or commit the tracked GitHub copy.**

Raw or aggregated Search Console, Google Ads, ServiceM8, revenue, job and commercial data remain private. A later implementation may receive only an approved manifest containing route, decision and decision date. Separately sanitised public evidence must use the approved evidence process.
