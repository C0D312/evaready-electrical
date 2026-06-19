# Dark Blue Theme Refinement and No Van Tint Report

## Scope
- Removed hero van tinting from the homepage, emergency page, Level 2 page, services index, service-area heroes, dynamic service pages and the switchboard page.
- Kept existing wording, headings, metadata, routes, schema, response-time wording, Google review data and conversion attributes unchanged.
- Refined the shared visual system toward a restrained dark-blue theme with lighter blue section variation and red reserved for urgent/Call Now elements.

## Files changed
- `app/globals.css`
- `app/page.tsx`
- `app/emergency-electrician-sydney/page.tsx`
- `app/emergency-electrician-sydney/emergency-theme.module.css`
- `app/level-2-electrician-sydney/page.tsx`
- `app/services/page.tsx`
- `app/services/[slug]/page.tsx`
- `app/services/switchboard-upgrades-sydney/page.tsx`
- `components/site-frame.tsx`
- `reports/dark-blue-no-van-tint-responsive-qa.csv`
- `reports/dark-blue-no-van-tint-preview/`

## Hero tint removal
- Homepage overlay elements were removed.
- Internal hero gradient overlay elements were replaced with real `next/image` van images.
- The old internal-hero pseudo-image block in `globals.css` was retired because it reintroduced `brightness`, `contrast` and `saturate` filters.
- Hero vehicle CSS now resolves to `filter: none`, `opacity: 1` and `mix-blend-mode: normal`.

## Hero images checked
- Homepage
- Emergency electrician page
- Level 2 page
- Services index
- Service areas index
- Hot water service page
- Air-conditioning service page
- Switchboard page
- Panania suburb page

## Theme result
- Dark-blue theme applied: yes
- Lighter-blue section variation applied: yes
- Electric-blue/cyan accents applied: yes
- Red limited to emergency, response and Call Now actions: yes

## Responsive QA
- Checked 162 page/viewport combinations across mobile, tablet, laptop and desktop.
- Widths checked: 360, 375, 390, 412, 430, 768, 820, 834, 912, 1024, 1180, 1280, 1366, 1440, 1536, 1600 and 1920.
- Result: 0 failures.
- Screenshot folder: `reports/dark-blue-no-van-tint-preview/`

## Validation
- `npm.cmd run audit:all-suburb-copy`: PASS
- `npm.cmd run audit:suburbs`: PASS
- `npm.cmd run audit:metadata`: PASS
- `npm.cmd run audit:links`: PASS
- `npm.cmd run audit:visible-copy`: PASS
- `npm.cmd run audit:page-health`: PASS
- `npm.cmd run audit:response-times`: PASS
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS
- Google Ads marker: present
- Phone and quote conversion markers: present
- `tel:+61461247247`: present
- Stale/risky wording grep: no matches

## Final pre-deploy status
PASS - ready for GitHub Pages deployment.
