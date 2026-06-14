# Services Index Lead-Value Service Ordering

Date: 2026-06-14

Scope: `/services/` only. No new service pages, removed service pages, URL structure changes, route changes or full card rewrites were made.

## Files Changed

- `app/services/page.tsx`
- `docs/services-index-lead-value-ordering.md`

## Service Ordering Before

The `Most requested` section already appeared near the top and already used the correct lead-value sequence. The only wording mismatch was the ninth card label:

1. Emergency Electrician
2. Level 2 Electrician
3. Switchboard Upgrades
4. Electrical Fault Finding
5. Consumer Mains
6. Defect Notice Repairs
7. Point of Attachment Repairs
8. Hot Water System Electrical
9. Air Conditioning
10. CCTV & Security Cameras
11. Commercial Electrician
12. Safety Switches & RCDs

## Service Ordering After

The `Most requested` order now matches the requested high-intent sequence:

1. Emergency Electrician
2. Level 2 Electrician
3. Switchboard Upgrades
4. Electrical Fault Finding
5. Consumer Mains
6. Defect Notice Repairs
7. Point of Attachment Repairs
8. Hot Water System Electrical
9. Air Conditioning Electrical
10. CCTV & Security Cameras
11. Commercial Electrician
12. Safety Switches & RCDs

The full service catalogue remains below the `Most requested` section, and lower-value services were not removed.

## Routes Verified

The following priority routes were confirmed in `out/sitemap.xml` before final validation:

- `/emergency-electrician-sydney`
- `/level-2-electrician-sydney`
- `/services/switchboard-upgrades-sydney`
- `/services/electrical-fault-finding-sydney`
- `/services/consumer-mains-sydney`
- `/services/defect-notice-repairs-sydney`
- `/services/point-of-attachment-repairs-sydney`
- `/services/hot-water-system-electrician-sydney`
- `/services/split-system-air-conditioning-sydney`
- `/services/cctv-security-camera-installation-sydney`
- `/services/commercial-electrician-sydney`
- `/services/safety-switch-rcd-installation-sydney`

No new route was created. The existing air-conditioning route remains `/services/split-system-air-conditioning-sydney`.

## Validation Result

Commands run:

- `npm.cmd run audit:links`
- `npm.cmd run audit:metadata`
- `npm.cmd run audit:visible-copy`
- `npm.cmd run lint`
- `npm.cmd run build`

Results:

- Broken links: 0
- Generated HTML issues: 0
- Generated HTML routes checked: 997
- Internal links checked: 19,975
- Metadata warnings: 0
- Visible-copy warning rows: 0
- Visible-copy pages checked: 995
- Lint: passed
- Build: passed
- Static pages generated: 1,002

Generated-output checks:

- Priority service names found in `out/services`
- `Air Conditioning Electrical` found in `out/services/index.html`
- `localhost`, `href="#"` and `javascript:` grep against `out/services`: no matches

## Final Status

PASS
