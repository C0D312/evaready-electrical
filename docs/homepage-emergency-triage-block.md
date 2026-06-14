# Homepage Emergency Triage Block

## Summary

- Section added: yes
- Page changed: homepage only
- Routes changed: no
- Emergency page route changed: no
- Service pages changed: no
- Suburb pages changed: no
- Response-time mapping changed: no
- Deployment: not performed

## Section Added

Added a compact homepage emergency triage section after the homepage emergency trust panel.

Heading:

`Call first if you notice`

Items:

- No power or partial power loss
- Burning smell from a switchboard or fitting
- Sparking, buzzing or hot fittings
- Safety switch keeps tripping
- Storm or water damage
- Damaged switchboard, service line or point of attachment
- Defect notice with an urgent deadline

## Safety Wording Used

`If it feels unsafe, do not keep resetting breakers or touching damaged fittings. Call first so the fault can be triaged.`

## CTA And Links

- Phone CTA: `Call Now 0461 247 247`
- Preserved phone link: `tel:+61461247247`
- Preserved phone tracking marker: `data-conversion-action="phone-click"`
- Added/kept internal links to the emergency page and relevant fault/service guides.

## Validation

- `npm.cmd run audit:links`: passed, 0 broken links, 19,966 internal links checked
- `npm.cmd run audit:visible-copy`: passed, 0 rows with warnings across 995 pages
- `npm.cmd run lint`: passed
- `npm.cmd run build`: passed, 1002 static pages generated
- Homepage output grep confirmed the triage block appears in `out/index.html`
- Homepage output grep confirmed `tel:+61461247247` and `data-conversion-action="phone-click"` remain
- Whole-output guarantee grep found no matches for `guaranteed arrival`, `guaranteed same-hour` or `60 minutes anywhere`

## Result

Final status: PASS
