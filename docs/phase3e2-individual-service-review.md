# Phase 3E2 individual service review

Review date: 7 September 2026. Feature baseline:
`2b0087f0e5f3a76fa10ee47803ca604e471b9553`.
This is the content-review record, not a completed browser gate or release report.
Final technical validation and completion-register reconciliation remain pending.

## Review Method

The selection is exactly the existing 15 specialist and six consolidation-held
routes, resolved by `scripts/phase3e2-service-review.ts`. Nineteen records use the
shared service renderer; Level 2 and solar/batteries have standalone pages. The
review includes their descriptions, introductory safety, scope boundaries,
service lists, warning signs, process, quote information, FAQs and related links,
plus credentials and claims injected by the shared renderer. Metadata and schema
are compared with the rendered text, not treated as separate marketing copy.

All 21 routes required changes and have a `rewritten` content outcome. There are
zero `sufficient` or `held_after_review` content outcomes in this batch. That does
not clear their documentary credential or business-scope holds. Validation and
publication status must not be inferred from these editorial outcomes.

Primary sources, currency limits and authorised supporting-file exceptions are
recorded in [Sources And Scope](phase3e2-sources-and-scope.md). Regulator guidance
does not independently verify EVAREADY's licences or the permissions of every
electrician. Public language is qualified to the actual agreed service.

## Specialist Routes

| Exact route | Individual assessment and correction | Evidence still required |
| --- | --- | --- |
| `/level-2-electrician-sydney` | Distinguishes contestable connection activities, ordinary wiring and meter-provider responsibilities. Adds emergency priority before business CTAs, optional safe intake, assessment and network limits. Removes blanket activity/authorisation implications from the page-local credential presentation. | Current ASP activity and distributor authorisation for the accepted job; no blanket network permission. |
| `/services/consumer-mains-sydney` | Explains capacity, cable condition, accessible equipment, route/access planning and testing. Separates consumer mains from service/network assets and warns against accessing damaged equipment to obtain photos. | Connection boundary, load assessment and any required network-authorised activity. |
| `/services/defect-notice-repairs-sydney` | Uses the actual notice, issuer and deadline rather than a universal timetable. Explains inspection, repair scope and documentation. Unsafe conditions require emergency action before a business enquiry. | Actual notice and current authority scope; no promised issuer acceptance or automatic reconnection. |
| `/services/private-power-pole-sydney` | Covers ownership, supports, cables, site access, structural/electrical assessment and replacement planning. Fallen-line clearance and emergency priority are explicit; a photo cannot establish remaining pole life. | Ownership, structural requirements, activity and network permission. |
| `/services/metering-services-sydney` | Separates property preparation from retailer/meter-provider installation. Describes panels, available space, isolation, shared access and completion records without implying permission to remove seals. | Meter-provider role, network authority and material hazards in older panels. |
| `/services/point-of-attachment-repairs-sydney` | Distinguishes service support, structural adequacy and electrical work. Loose attachments and fallen lines are hazards, not close-up photo opportunities; replacing a bracket may not resolve the underlying issue. | Structure, asset boundary and permitted service activity. |
| `/services/overhead-service-lines-sydney` | Explains support, route, clearance and authorised assessment. The final FAQ reread removes an ambiguous emergency-services/distributor choice. For immediate danger, Triple Zero comes first; never wait for a quote or approach the line for photos. | Current activity/network authority and site-specific clearance requirements. |
| `/services/underground-service-mains-sydney` | Separates electrical work from locating, excavation and reinstatement. Plans do not establish exact cable position or depth; no exploratory customer digging or universal trench specification is suggested. | Actual locating, design, civil-work boundary and network requirements. |
| `/services/disconnect-reconnect-electrician-sydney` | Distinguishes fixed-equipment disconnection from supply isolation/reconnection. Covers reason, present connection state, planned work, testing and utility coordination without promising energisation. | Required licence/activity, network permission and provider responsibilities. |
| `/services/smart-meter-electrician-sydney` | Explains that the retailer arranges meter installation and this service addresses property-side preparation or defects. Separates provider scheduling, tariffs and billing from electrical repairs. | Provider request and any additional authorised service work. |
| `/services/data-cabling-electrician-sydney` | Describes outlets, cable routes, separation, testing and completion information. Registration and additional competencies must match the cable work; no internet-speed or carrier-service guarantee. | Current cabling registration and relevant competencies; owner-stated registration is not independently certified here. |
| `/services/phone-line-electrician-sydney` | Defines customer-side outlets versus carrier/NBN service faults. Explains connection identification and eligible repair/relocation. Intake excludes passwords and asks only for optional safe, closed-equipment photos. | Customer/carrier boundary and actual registration scope. |
| `/services/cctv-security-camera-installation-sydney` | Qualifies power and eligible cabling support instead of promising every security installation. Separates electrical preparation, equipment, security authority and commissioning; matching metadata and catalogue description are corrected. | Security-equipment authority, applicable business licensing and actual installation/commissioning scope. |
| `/services/split-system-air-conditioning-sydney` | Separates electrical supply/isolation from refrigerant and commissioning work. Covers equipment details, circuits, access and fault symptoms with urgent electrical safety before quotation. | Relevant electrical, air-conditioning and ARC permissions for the equipment and work accepted. |
| `/solar-batteries` | Explains supply assessment, distinct design/install/commissioning responsibilities, equipment placement and backup limits. Panels/batteries may remain energised with mains off; no DIY reset, guaranteed savings, incentive eligibility or whole-home backup. | System-specific accreditation, manufacturer requirements and network/incentive eligibility. |

## Overlapping Route Pairs

| Exact route | Individual purpose and correction | Pair recommendation |
| --- | --- | --- |
| `/services/electrical-testing-tagging-reports-sydney` | Property findings and the agreed report scope are distinguished from testing portable equipment. Inspection limits, access and records are explained; an equipment tag is not whole-property certification. | `retain_both`, subject to confirming actual report deliverables. |
| `/services/testing-and-tagging-sydney` | Focuses on portable equipment, inventory, condition, applicable testing and records. Inspection/testing intervals depend on use and conditions, not a single universal timetable. | `retain_both`, with the property-report route serving a different purpose. |
| `/services/intercom-access-control-electrician-sydney` | Focuses on entry infrastructure, door/gate power and eligible wiring. Security permissions, shared property, hardware and commissioning are distinct; no access-code or resident-list intake. | `needs_search_console_evidence`; business scope and legitimate query demand remain unverified. |
| `/services/intercom-installation-sydney` | Focuses on new/replacement indoor and entry stations, model compatibility, cable reuse and shared-system ownership. Description and catalogue claim are qualified; programming/commissioning are not assumed. | `needs_search_console_evidence`; no inferred demand score or consolidation decision. |
| `/services/tv-antenna-wall-cabling-sydney` | Focuses on a media-wall layout, concealed cable planning and nearby electrical power. No implied rooftop capability, guaranteed reception or invitation to inspect a roof/cavity for photos. | `consolidate_later`; legitimate overlap remains and no surviving URL has been selected. |
| `/services/tv-points-antenna-electrician-sydney` | Focuses on adding, relocating or assessing an outlet and its existing feed. Shared distribution, reception diagnostics, rooftop work and mounting are not automatically included. | `consolidate_later`; demand/backlink and actual-service review precedes any route change. |

The six reviews are complete editorial assessments, not approvals to redirect,
delete, canonicalise or change indexation. No search, advertising, revenue,
referral or backlink data was invented or retrieved from external accounts.

## Isolation And Publication

- The 21 selected routes remain accessible with existing canonical, robots,
  sitemap and Call/Quote destinations.
- `/services` is a derived catalogue exception: exactly two descriptions change
  at the existing positions. It is not counted as a 22nd individual review.
- The other 48 catalogue offers, 44 service descriptions and 979 nonselected
  register rows retain their sealed semantic checks.
- The final register must mark these 21 rewritten routes and the derived
  catalogue publication-pending, without a live SHA. Its previous verified
  catalogue publication evidence must remain identifiable as history.
- The live website remains the separately approved `e6197fc` release. No
  Phase 3E2 content or shared-interaction change is authorised for main deployment.
