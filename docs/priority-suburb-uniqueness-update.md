# Priority Suburb Uniqueness Update

## Scope

Improved the shared suburb copy and metadata generation for high-value existing suburbs without changing routes, response-time mapping, Level 2 ASP wording, suburb counts, or generated HTML by hand.

## Source Updates

- Added priority suburb profiles in `data/service-area-coverage.ts` for existing high-value suburbs only.
- Added local context for property mix, common jobs, emergency patterns, Level 2 relevance, access notes and metadata focus.
- Merged priority suburb copy through the existing shared suburb copy override path, so generated pages inherit the improvements from source data.
- Upgraded suburb metadata and suburb page audits to detect duplicate-risk patterns and missing local context.

## Priority Suburbs Covered

Panania, Bankstown, Revesby, Padstow, Coogee, Bondi Junction, Randwick, Parramatta, Merrylands, Blacktown, Seven Hills, Camden, Campbelltown, Wollongong, Gosford, Sutherland, Liverpool, Fairfield, Hurstville, Rockdale, Cronulla, Miranda, Katoomba, Springwood, Penrith, Hornsby, Ryde, Chatswood, Manly and Dee Why.

## Local Context Types Added

- Coastal and weather-exposed properties
- CBD, commercial and strata access
- Industrial, warehouse and workshop sites
- Hills, larger blocks and acreage access
- Inner-west older homes, terraces and strata
- South-west growth corridors
- Western Sydney mixed residential and commercial work
- Northern Beaches coastal apartments and homes
- Illawarra and Wollongong coastal/industrial context
- Central Coast South mixed apartment, shop and coastal context
- Blue Mountains and Hawkesbury weather/bush-access context
- Strata and unit-heavy access notes
- Older-home and renovation contexts
- Commercial centre access and after-hours planning

## Examples

- Panania: older boards, hot water circuits, safety switches, duplex/villa power and Level 2 support.
- Coogee: coastal faults, outdoor lighting, switchboards, smoke alarms, power and Level 2 support.
- Parramatta: offices, apartments, strata faults, shop power, switchboards, data and Level 2 support.
- Blacktown: homes, townhouses, workshops, shop faults, switchboards, hot water and Level 2 support.
- Gosford: apartments, shops, switchboards, hot water circuits, outdoor lighting and Level 2 support.

## Audit Improvements

`scripts/audit-suburb-pages.ts` now checks:

- Duplicate meta descriptions
- Duplicate meta opening phrases
- Identical hero descriptions
- Priority suburbs missing local context signals
- Suburb name missing from meta descriptions
- Postcode missing from meta descriptions
- Generic meta openings that repeat too widely

`scripts/audit-metadata.ts` now flags suburb-specific duplicate-risk patterns without treating unrelated region or area listing pages as suburb duplication failures.

## Validation

- `npm.cmd run audit:suburbs`: PASS, 873 suburb pages, 0 warning rows
- `npm.cmd run audit:metadata`: PASS, 999 metadata rows, 0 warnings
- `npm.cmd run audit:links`: PASS, 1,001 generated HTML routes, 20,089 internal links, 0 broken links
- `npm.cmd run audit:visible-copy`: PASS, 999 pages, 0 warning rows
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS with GitHub Pages base path

## Generated Output Checks

- Priority sample descriptions present: PASS
- Risky local claims absent from service-area output: PASS
- Google Ads marker preserved: PASS
- Phone and quote conversion attributes preserved: PASS
- `tel:+61461247247` preserved: PASS

## Deployment

Pending final main and gh-pages deployment verification.

## Final Result

Pending live verification.
