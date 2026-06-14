# Homepage Trust Proof Polish

## Summary

- Trust proof polished: yes
- Page changed: homepage only
- New photos added: no
- Fake reviews added: no
- Fake rating schema added: no
- Fake logos or fake client names added: no
- Insurance or public-liability claims added: no
- Office/depot wording added: no
- Level 1 or Level 3 wording added: no
- Deployment: not performed

## Trust Items Used

The homepage trust section was updated with the heading:

`Why call Evaready first?`

Verified/current proof used:

- `NSW Electrical Licence 398937C`
- `ABN 44 650 697 797`
- `Open Cabler Registration 46691`
- `ARCtick Licensed L157323`
- `Ausgrid & Endeavour Energy Accredited Level 2 ASP`
- Call-first emergency triage
- Photos and paperwork reviewed for planned work
- clear next step before work begins
- Sydney and surrounding regions

The Level 2 ASP wording is rendered from the existing approved `business.level2Asp.display` site constant.

## Claims Avoided

No fake client logos, partner names, fake photos, fake reviews, fake ratings, office/depot claims, insurance/public-liability claims, guaranteed response claims, Level 1 wording or Level 3 wording were added.

No Google Places API or aggregateRating schema was added.

## Validation

- `npm.cmd run audit:links`: passed
  - Broken links: 0
  - Internal links checked: 19,970
- `npm.cmd run audit:visible-copy`: passed, 0 rows with warnings across 995 pages
- `npm.cmd run lint`: passed
- `npm.cmd run build`: passed after adding the missing `Zap` icon import
- Post-build proof grep confirmed the new trust proof appears in `out/index.html`
- The requested broad risky grep matched the existing word `Review` in current Google review links and ordinary review copy. It did not indicate fake review content or fake rating schema.
- Follow-up risky scan found no matches for `fake review`, `fake rating`, `aggregateRating`, `fully insured`, `office in`, `local depot in`, `Level 1` or `Level 3`.

## Result

Final status: PASS
