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
- `reviewed`: the named review was completed by a person for that route.
- `rewritten`: route-specific content was rewritten and validated.
- `held`: a documented owner-evidence or consolidation decision is still needed.
- `live-verified`: the route body was matched to the deployed artifact at the
  recorded 40-character commit SHA.

Phase 3D1 records only its six authorised service rewrites as individually
reviewed and rewritten. The previous release evidence verified all 1,001 routes
live at `8d114efe8809f40edc396c9d6e9f8780cc26a737`, but that deployment fact does
not elevate an automated route check into an individual content, responsive or
accessibility review.

## Commands

```powershell
npm run generate:whole-site-register
npm run audit:whole-site-register
node --import tsx --test tests/audits/whole-site-completion-register.test.ts
```

The JSON is deterministic and intentionally has no generated timestamp or
self-referential commit claim. Update it only through the generator and commit
status changes in the same batch as the evidence that supports them.
