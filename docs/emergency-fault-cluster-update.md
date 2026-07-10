# Emergency fault cluster update

## Scope

- Strengthened the Emergency Electrician hub by linking its related fault guide section to the shared emergency fault guide cluster.
- Added a shared "When to call first" section to every generated electrical fault guide page.
- Added safety guidance covering keeping clear, not touching damaged/wet/live electrical equipment, and calling emergency services first for life-threatening danger.
- Added a clear back-link from each fault guide to the Emergency Electrician Sydney page.
- Reworded one existing inspection-page warning from "Unsafe DIY alterations" to "Unsafe unlicensed alterations" so the public output does not contain the requested risky `DIY` token.

## Pages affected

- `/emergency-electrician-sydney/`
- `/electrical-faults/`
- All generated `/electrical-faults/[slug]/` guides

## Safety and compliance

- No response-time mapping changed.
- No guarantee wording added.
- No office, depot, map, review, offer or photo content added.
- Urgent Call Now actions remain red.
- Planned Get a Quote actions remain blue.
- `Ausgrid & Endeavour Energy Accredited Level 2 ASP` wording was not changed.

## Validation status

- `npm.cmd run audit:metadata`: pass, 0 warnings
- `npm.cmd run audit:links`: pass, 0 broken links
- `npm.cmd run audit:visible-copy`: pass, 0 warning rows
- `npm.cmd run audit:page-health`: pass, 0 critical warnings
- `npm.cmd run audit:response-times`: pass, 0 hard mismatches
- `npm.cmd run lint`: pass
- `npm.cmd run build`: pass, 1003 static routes generated
- Generated-output risky wording check: pass

## Public live verification

- `main` source commit: `c6993dffd9b94b20430b2b4f330b0abf5727d1f5`
- `gh-pages` deploy commit: `6ca20cdbd516badea51201fc1bf7057641192893`
- Normal public URLs checked: pass
- Cache-busted public URLs checked using the `gh-pages` SHA: pass
- Live routes checked: emergency hub, fault index, no power, safety switch, burning smell, sparking, electric shock, storm outage, sitemap, robots and site-version
- Live risky wording check: pass
- Live Google Ads and phone/quote conversion markers: pass
