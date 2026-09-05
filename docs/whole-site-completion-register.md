# Whole-site completion register

`reports/whole-site-completion-register.json` is the durable, machine-readable
route-by-route register for all 1,001 public sitemap routes.

The register is generated from `app/sitemap.ts` and reconciled with
`scripts/route-inventory.ts`. The generator fails for missing, duplicate or
unknown routes, invalid states, missing source records and sitemap/register
drift.

## Status meaning

- `pending`: the named review has not been completed for that individual route.
- `automated-only`: a machine check has run; this never means every word was
  individually reviewed.
- `reviewed`: the named individual review was completed for that route.
- `rewritten`: route-specific content was rewritten and validated.
- `sufficient`: the existing route content was individually reviewed and found
  sufficient without a rewrite; safety, responsive, accessibility and SEO
  reviews must all also be recorded as reviewed.
- `held`: a documented owner-evidence or consolidation decision is still needed.
- `live-verified`: the route body was matched to the deployed artifact at the
  recorded 40-character commit SHA.

Phase 3D1 records its six authorised service rewrites as individually reviewed
and rewritten. Phase 3D2 records its six authorised service rewrites as live
verified at `a351d329817c584e1da1e563514bbe71e5d76092`; their temporary
publication holds have therefore been removed. Routes unchanged by that release
retain the earlier per-route live evidence SHA instead of being relabelled.

A deployment fact never elevates an automated route check into an individual
content, responsive or accessibility review. The generator rejects
`sufficient` unless individual semantic, safety, responsive, accessibility and
SEO reviews are all explicitly recorded as reviewed, and it rejects other
inconsistent manual-review combinations.

Phase 3D3 records individual semantic, safety, responsive, accessibility and
SEO review for the final six non-held safety routes. Each required a scoped
content correction, so all six are marked `rewritten`. Phase 3D3-P1 verified
their deployed artifact and live HTML at
`187605f9916b246e875728a5a6e18e4c197540ea` (workflow `33955802208`).
Their six publication holds are removed; earlier route SHAs are preserved.
Source and decision notes are in
`docs/phase3d3-service-content-source-notes.md`.

## Commands

Phase 3D4 records the six core service pages as reviewed and rewritten.
Phase 3D4-P1 matched their live output to the deployed artifact at
`7972f8dec2620d97c311b1ecd9ce40545b59dc9f` (workflow `33971736127`,
artifact `9971140993`, deployment `6282046927`). Their six publication holds
are removed, and earlier route SHAs are preserved. The register contains
24 individually reviewed routes, 977 pending individual reviews, 21 held
rewrites, and zero pending publications. General owner credential and business
claim verification is not implied by a route-content review.

```powershell
npm run generate:whole-site-register
npm run audit:whole-site-register
node --import tsx --test tests/audits/whole-site-completion-register.test.ts
```

The JSON is deterministic and intentionally has no generated timestamp or
self-referential commit claim. Update it only through the generator and commit
status changes in the same batch as the evidence that supports them.
