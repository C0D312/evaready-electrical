# Service Pages SEO Summary

Date: 2026-05-31

## Scope

Audited the service landing pages generated from `data/service-pages.ts`, the service cards in `data/site.ts`, and the shared generated route at `app/services/[slug]/page.tsx`.

## Slug And Route Audit

- `data/service-pages.ts` contains 28 generated service landing pages.
- Every `services` slug in `data/site.ts` now resolves to either a generated service route or a known static route.
- Fixed one broken/mismatched slug:
  - Old: `Power Points & Lighting` linked to `/services/power-points-lighting-sydney`
  - New: `Power Points & Lighting` links to `/services/power-point-installation-sydney`
- Related service slug references in `data/service-pages.ts` were checked against generated pages and static service routes. No broken related-service slugs remain.

## Shared Template Improvements

- Added `BreadcrumbList` schema to every generated service landing page.
- Improved the existing `Service` schema with an `OfferCatalog` built from the visible service list on each page.
- Kept `FAQPage` schema generated directly from the same `service.faqs` array rendered on the page, so visible FAQs match schema content.
- Added service-specific internal links for high-value pages:
  - Fault finding links to no power, safety switch, burning smell and sparking power point guides.
  - Consumer mains, defect notices, metering and private pole pages link back into Level 2, switchboard and relevant fault/service routes.
  - Hot water and air conditioning pages cross-link to heat pump, safety switch and load/capacity support.
  - CCTV and data cabling pages cross-link to each other.
  - Power point and lighting pages cross-link to each other and relevant fault guides.
- Emergency-style service pages now make the common-job card action call-first instead of opening the booking form:
  - Electrical fault finding
  - Private power pole
  - Storm damage electrician
- Planned work service pages still use `data-quote-trigger="true"` and `aria-haspopup="dialog"` for booking-form actions.

## Metadata Changes

| Page | Old Title | New Title | Old Meta Description | New Meta Description |
|---|---|---|---|---|
| Residential electrician | Residential Electrician Sydney & Surrounding Regions | Residential Electrician Sydney \| Home Electrical Help | Residential electrician in Sydney for power points, lighting, smoke alarms, switchboards, fault finding, renovations and home electrical repairs. | Need a residential electrician in Sydney? Evaready helps with power points, lighting, smoke alarms, switchboards, faults and renovations. |
| Commercial electrician | Commercial Electrician Sydney & Surrounding Regions | Commercial Electrician Sydney \| Shops, Strata & Offices | Commercial electrician in Sydney for shops, offices, strata, warehouses, builders, real estate maintenance, lighting, power and electrical repairs. | Commercial electrician in Sydney for shops, offices, strata, builders and property managers needing power, lighting, faults and maintenance. |
| Electrical fault finding | Electrical Fault Finding Sydney & Surrounding Regions | Electrical Fault Finding Sydney \| Tripping & Power Faults | Electrical fault finding in Sydney for tripping safety switches, power faults, burning smells, damaged wiring, water damage and circuit issues. | Electrical fault finding in Sydney for tripping safety switches, no power, burning smells, damaged wiring, hot outlets and water damage. |
| Lighting electrician | Lighting Electrician Sydney & Surrounding Regions | Lighting Electrician Sydney \| LED & Outdoor Lighting | Lighting electrician in Sydney for LED downlights, outdoor lighting, security lighting, bathroom lighting, feature lights and lighting repairs. | Lighting electrician in Sydney for LED downlights, outdoor lights, security lighting, bathroom lighting, feature lights and repairs. |
| Power point installation | Power Point Installation Sydney & Surrounding Regions | Power Point Installation Sydney \| Outlets & Repairs | Power point installation in Sydney for new outlets, double power points, outdoor outlets, appliance circuits, USB outlets and faulty power point repairs. | Power point installation in Sydney for new outlets, double power points, outdoor outlets, appliance circuits and faulty outlet repairs. |
| EV charger installation | EV Charger Installation Sydney & Surrounding Regions | EV Charger Installation Sydney \| Home & Business Charging | EV charger installation in Sydney for homes and businesses, including load checks, dedicated circuits, switchboard checks and future-ready electrical upgrades. | EV charger installation in Sydney for homes and businesses, with load checks, dedicated circuits, switchboard checks and upgrade advice. |
| Consumer mains | Consumer Mains Sydney & Surrounding Regions | Consumer Mains Electrician Sydney \| Level 2 Supply Work | Consumer mains electrician in Sydney for damaged, undersized or ageing consumer mains, service upgrades, switchboard supply work and Level 2 electrical enquiries. | Consumer mains electrician in Sydney for damaged, undersized or ageing mains, supply upgrades, defect notices and switchboard supply work. |
| Defect notice repairs | Defect Notice Repairs Sydney & Surrounding Regions | Electrical Defect Notice Repairs Sydney | Electrical defect notice repairs in Sydney for consumer mains, point of attachment, switchboards, private poles and supply-side electrical defects. | Electrical defect notice repairs in Sydney for consumer mains, point of attachment, switchboards, private poles and supply-side defects. |
| Private power pole | Private Power Pole Sydney & Surrounding Regions | Private Power Pole Electrician Sydney | Private power pole electrician in Sydney for damaged poles, overhead service issues, defect notices, supply concerns and Level 2 electrical enquiries. | Private power pole electrician in Sydney for damaged poles, overhead service issues, storm damage, defect notices and supply concerns. |
| Hot water electrical | Hot Water System Electrician Sydney & Surrounding Regions | Hot Water Electrician Sydney \| Circuits & Isolators | Hot water system electrician in Sydney for electric hot water faults, circuits, isolators, thermostat checks and hot water heat pump electrical support. | Hot water electrician in Sydney for no hot water, tripping circuits, isolators, thermostat checks and heat pump electrical support. |
| Air conditioning electrical | Air Conditioning Electrician Sydney & Surrounding Regions | Air Conditioning Electrician Sydney \| AC Circuits | Air conditioning electrician in Sydney for AC isolators, dedicated circuits, outdoor unit power, heat pump electrical support and switchboard capacity checks. | Air conditioning electrician in Sydney for AC isolators, dedicated circuits, outdoor unit power, heat pump support and capacity checks. |
| CCTV | CCTV Electrician Sydney & Surrounding Regions | CCTV Electrician Sydney \| Cameras & Security Cabling | CCTV electrician in Sydney for security camera installation, camera wiring, recorder setup support, home CCTV and business CCTV cabling. | CCTV electrician in Sydney for security camera installation, camera wiring, recorder support, home CCTV and business CCTV cabling. |
| Data cabling | Data Cabling Electrician Sydney & Surrounding Regions | Data Cabling Electrician Sydney \| Internet Points | Data cabling electrician in Sydney for network points, internet outlets, NBN internal cabling, phone line repairs and office data cabling. | Data cabling electrician in Sydney for network points, internet outlets, NBN internal cabling, phone line repairs and office data runs. |
| Safety switches | Safety Switch Installation Sydney & Surrounding Regions | Safety Switch Electrician Sydney \| RCD & RCBO Help | Existing wording retained. | Existing wording retained. |
| Surge protection | Surge Protection Electrician Sydney & Surrounding Regions | Surge Protection Electrician Sydney \| Switchboard SPDs | Existing wording retained. | Existing wording retained. |
| Appliance installation | Appliance Installation Electrician Sydney & Surrounding Regions | Appliance Installation Electrician Sydney | Appliance installation electrician in Sydney for cooktops, ovens, rangehoods, dishwasher electrical connections, appliance isolators and dedicated circuits. | Appliance installation electrician in Sydney for cooktops, ovens, rangehoods, dishwasher connections, isolators and dedicated circuits. |
| Renovation/new build | New Build & Renovation Electrician Sydney & Surrounding Regions | Renovation Electrician Sydney \| New Builds & Fit-Offs | New build and renovation electrician in Sydney for rough-ins, fit-offs, kitchen upgrades, bathroom wiring, lighting layouts, power planning and switchboard upgrades. | Renovation electrician in Sydney for rough-ins, fit-offs, kitchen upgrades, bathroom wiring, lighting layouts and switchboard planning. |
| Testing/tagging/reports | Electrical Testing, Tagging & Reports Sydney & Surrounding Regions | Electrical Testing & Tagging Sydney \| Safety Reports | Existing wording retained. | Existing wording retained. |
| Intercom/access control | Intercom & Access Control Electrician Sydney & Surrounding Regions | Intercom & Access Control Electrician Sydney | Intercom and access control electrician in Sydney for entry systems, intercom wiring, gate provisions, strata access, security wiring and commercial entry support. | Intercom and access control electrician in Sydney for entry systems, intercom wiring, gate provisions, strata access and security wiring. |
| Storm damage | Storm Damage Electrician Sydney & Surrounding Regions | Storm Damage Electrician Sydney \| Water-Affected Faults | Storm damage electrician in Sydney for water-affected wiring, damaged fittings, unsafe circuits, emergency disconnections, outdoor faults and make-safe support. | Storm damage electrician in Sydney for water-affected wiring, damaged fittings, unsafe circuits, outdoor faults and make-safe support. |
| Load/capacity checks | Electrical Load & Capacity Checks Sydney & Surrounding Regions | Electrical Load Capacity Checks Sydney | Electrical load and capacity checks in Sydney for EV chargers, 3 phase upgrades, workshops, commercial equipment, switchboards and major electrical upgrades. | Electrical load and capacity checks in Sydney for EV chargers, 3 phase upgrades, workshops, commercial equipment and switchboards. |

## H1 And Page Copy Changes

- Updated H1 data for consumer mains to include "Electrician".
- Updated H1 data for private power pole to include "Electrician".
- Updated H1 data for metering services to include "Electrician".
- The shared generated template now gives emergency-style service cards call-first behavior and planned work cards booking-form behavior.

## Broken Links Fixed

- Fixed the only confirmed service slug mismatch from the audit: `/services/power-points-lighting-sydney`.
- No broken `relatedServices` slugs were found after checking generated service slugs and known static routes.

## Schema Added Or Improved

- Added `BreadcrumbList` schema to generated service pages.
- Improved `Service` schema with visible service offerings.
- Kept FAQ schema aligned with visible FAQ content.

## Validation

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed.
- Build generated 985 static pages, including all 28 generated service landing pages plus the static switchboard route.

