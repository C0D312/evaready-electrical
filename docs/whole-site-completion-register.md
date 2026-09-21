# Whole-site completion register

`reports/whole-site-completion-register.json` is the durable, machine-readable
route-by-route register for all 1,001 public sitemap routes.

## Current Verified Checkpoint

The R4 editorial continuation has eighty-nine unpublished page versions: the
first five, the ten-page second batch, two subsequent twenty-page batches and
Windsor in milestone 07, Berowra in milestone 08, and Miranda, Cronulla and
Sutherland in milestone 09, then Engadine, Caringbah, Dee Why and Freshwater in
milestone 10, then Warriewood, Manly, Dural and Blaxland in milestone 11, then
Glenbrook, St Marys, Hurstville, Rockdale and Bexley in milestone 12, then
Kogarah, Penshurst and Kingsgrove in milestone 13, then Peakhurst, Mortdale and
Beverly Hills in milestone 14, then Narwee, Oatley, South Hurstville, Lugarno and
Lansdowne in milestone 15, then Picnic Point, Revesby Heights, East Hills,
Padstow Heights and Riverwood in milestone 16. Their
current register rows have `publication: pending` and null live SHAs. The other
912 rows and their historical release evidence remain unchanged. No new release
or cleared owner hold is implied. See `suburb-editorial-batch-01.md`,
`suburb-editorial-batch-02.md`, `suburb-editorial-batch-03.md` and
`suburb-editorial-batch-04.md`, `suburb-editorial-milestone-07.md` and
`suburb-editorial-milestone-08.md`, `suburb-editorial-milestone-09.md` and
`suburb-editorial-milestone-10.md`, `suburb-editorial-milestone-11.md` and
`suburb-editorial-milestone-12.md`, `suburb-editorial-milestone-13.md` and
`suburb-editorial-milestone-14.md`, `suburb-editorial-milestone-15.md` and
`suburb-editorial-milestone-16.md` for the exact
route inventories, sources, preserved failures and focused validation, and
`reports/suburb-editorial-progress.json` for the separate all-873 originality and
individual editorial continuation ledger. The remaining 784 pages are still
pending that deeper pass; historical shared-template review is not proof of
route-specific original content.

### Previous verified publication

Phase 3E2-P2 verified the owner-approved preview release
`1b0a996285a7651657ccf8801c3f3a95ed298994` on 15 September 2026. Exactly 895
pending publication rows (873 suburbs, 21 Phase 3E2 routes and the Services
catalogue) now record that live SHA. All 106 other rows and their historical
SHAs remained unchanged. At that checkpoint all 1,001 routes were live-verified,
with zero pending publication rows. Individual review states and unresolved owner holds were
unchanged; deployment does not constitute credential, legal, review-API or
indexation approval. See `docs/phase3e2-verified-preview-release.md` and
`reports/phase3e2-preview-release.json` for the actual release and route proofs.

The [owner decision sheet](whole-site-owner-decisions.md) consolidates the
remaining holds without changing register states. It also separates current
delivery/functional proof from historical performance evidence: the existing
mobile Lighthouse launch requirement has not been cleared by this release.

## Historical Checkpoints

The following checkpoint counts describe their original phases. The generated
JSON register and current checkpoint above describe the present state.

Phase 3D9 added all 56 non-suburb location pages: the Service Areas index,
16 regions and 39 areas. Those pages and the prior 27 Phase 3D5-3D8 routes are
now live-verified at `e6197fcd00747ae86cabfff675516176c9e66ec6` after the separately
approved release. At that release checkpoint the register contained 107 individually reviewed routes and
894 pending individual reviews. All 1,001 rows then had publication evidence;
918 retain their earlier per-route SHA and the 83 newly published rows use the
verified release SHA. Phase 3E1 now reviews the 873 suburbs in controlled region
checkpoints. Its shared template changes put all 873 feature outputs back into
pending publication with null live SHAs; this does not change the deployed main.
Individual review states advance only after each checkpoint passes. The current
JSON register is authoritative for those counts. All 128 non-suburb records
remain protected by exact baseline hashes, and the older full-row hash gates
assert the authorised new suburb states before comparing original baseline fields.
Coverage, specialist authorisation,
response capacity, privacy/legal, review-data and offer-artwork holds remain
explicit. Reviewed does not mean owner evidence or legal certification exists.
See `docs/phase3d9-nonsuburb-location-review.md` for every selected route.
See `docs/phase3d5-3d9-verified-release.md` for artifact, live HTTP, browser and
backup verification. Publication does not mean the remaining review work is done.

Phase 3E1 completed all nine geographic checkpoints: 873 suburb records and
their shared wording reviewed, 19,206 width/text combinations passed, and
2,156 browser tests passed with six documented duplicate-content skips. The
register now has 980 reviewed/rewritten routes and 21 pending specialist or
consolidation reviews with held rewrites. Publication remains 128 live-verified
and 873 pending; no new release is implied. The production indexation registry
still contains zero decisions, and every suburb's owner-evidence hold remains.
See `docs/phase3e1-suburb-review.md` for the exact scope and limitations.

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

Phase 3D4 records the six core service pages as reviewed and rewritten.
Phase 3D4-P1 matched their live output to the deployed artifact at
`7972f8dec2620d97c311b1ecd9ce40545b59dc9f` (workflow `33971736127`,
artifact `9971140993`, deployment `6282046927`). Their six publication holds
are removed, and earlier route SHAs are preserved. General owner credential and business
claim verification is not implied by a route-content review.

Phase 3D5 records individual semantic, safety, responsive, accessibility and
SEO review for five remaining general service pages and the Services index.
All six required scoped corrections and are marked `rewritten`. Their
publication was pending, with no live SHA. At that checkpoint the register contained 30
individually reviewed routes, 971 pending individual reviews, 21 held rewrites,
and six pending publications. This is not a whole-website completion claim.
Source, failure and validation notes are in
`docs/phase3d5-service-content-source-notes.md`.

Phase 3D6 records individual semantic, safety, responsive, accessibility and
SEO review for the first six electrical fault guides in source order. All six
required rewriting. At that checkpoint their publication was pending with null live SHAs, as were
the six Phase 3D5 routes. At that checkpoint the register contained 36 reviewed routes, 965
pending individual reviews, 21 held rewrites, 944 pending rewrites and 12
pending publications. The other nine fault records and all earlier per-route
publication evidence remain unchanged. No route is marked `sufficient`.
See `docs/phase3d6-fault-guide-source-notes.md` for scope and validation.

Phase 3D7 completes individual semantic, safety, responsive, accessibility and
SEO review of the remaining nine fault guides (source positions 7-15). All nine
required rewriting. At that checkpoint the register contained 45 reviewed routes, 956
pending individual reviews, 45 rewritten routes, 935 pending rewrites, 21 held
rewrites and no `sufficient` routes. There were 21 pending publications with
null live SHAs: the six Phase 3D5 routes, six Phase 3D6 routes and nine Phase 3D7
routes. All 992 rows outside the Phase 3D7 batch retain their previous state.
No live release was implied by that development checkpoint. See
`docs/phase3d7-fault-guide-source-notes.md` for the scope and validation record.

Phase 3D8 reviewed and corrected Home, About, Contact, Privacy Policy, Terms and
the fault-guide index. At that checkpoint: 51 reviewed, 950 pending review,
51 rewritten, 929 pending rewrite, 21 held and 27 pending publication. Those six
rows remain unchanged by Phase 3D9, including their owner/legal holds.

The subsequent approved release removed only the completed publication holds
for all 83 Phase 3D5-3D9 rows. Owner/legal and business-evidence holds remain;
review, rewrite and technical assessment fields were not upgraded by deployment.

## Commands

```powershell
npm run generate:whole-site-register
npm run audit:whole-site-register
node --import tsx --test tests/audits/whole-site-completion-register.test.ts
```

The JSON is deterministic and intentionally has no generated timestamp or
self-referential commit claim. Update it only through the generator and commit
status changes in the same batch as the evidence that supports them.
