# Homepage Service Selector Internal Links

## Summary

- High-intent service selector added: yes
- Page changed: homepage only
- New pages created: no
- URL structure changed: no
- Service pages changed: no
- Suburb pages changed: no
- Deployment: not performed

## Links Added

The homepage service section was tightened into a compact selector headed:

`What do you need help with?`

Homepage cards now link to:

- Emergency electrician Sydney: `/emergency-electrician-sydney`
- Level 2 electrician Sydney: `/level-2-electrician-sydney`
- Switchboard upgrades: `/services/switchboard-upgrades-sydney`
- Consumer mains and supply upgrades: `/services/consumer-mains-sydney`
- Defect notice repairs: `/services/defect-notice-repairs-sydney`
- Point of attachment repairs: `/services/point-of-attachment-repairs-sydney`
- No power fault help: `/electrical-faults/no-power-to-house`
- Safety switch tripping help: `/electrical-faults/safety-switch-keeps-tripping`
- Hot water electrical: `/services/hot-water-system-electrician-sydney`
- Air conditioning electrical: `/services/split-system-air-conditioning-sydney`
- CCTV and data: `/services/cctv-security-camera-installation-sydney`
- Commercial electrician Sydney: `/services/commercial-electrician-sydney`
- Service areas: `/service-areas`

## Routes Verified

Routes were verified against existing app/data route references before adding links. No links were added to missing routes.

## Validation

- `npm.cmd run audit:links`: passed
  - Broken links: 0
  - Internal links checked: 19,970
  - Generated HTML routes checked: 997
- `npm.cmd run audit:metadata`: passed, 0 warnings
- `npm.cmd run audit:visible-copy`: passed, 0 rows with warnings across 995 pages
- `npm.cmd run lint`: passed
- `npm.cmd run build`: passed, 1002 static pages generated
- Post-build grep confirmed the selector heading and key anchor text appear in `out/index.html`

## Result

Final status: PASS
