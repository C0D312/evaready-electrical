# Evaready Electrical SEO & Lead Generation Audit

Audit date: 2026-05-31  
Scope: local SEO, lead generation, emergency electrician SEO, Level 2 electrician SEO, service-area SEO, suburb-page SEO, CTAs, schema, internal links, wording, and validation readiness.  
Mode: audit-only. No application code was changed.

## Executive Summary

Evaready has a strong foundation: urgent phone CTAs are prominent, the quote modal is wired across booking links, major money pages have schema and FAQs, service coverage is broad, and the service-area system is deep enough for local SEO.

The main launch risks are content quality and verification rather than missing pages. The 873 suburb pages are useful but heavily templated, so the highest SEO risk is duplicate or thin local content if Google reads too many pages as location swaps. Region and area templates also need stronger schema/FAQ depth. A few wording issues remain, especially the services-page phrase “a clear next steps before work begins,” and licence/authority wording around Level 2 ASP status should be verified before being made stronger.

## Site Inventory Snapshot

- Core commercial pages audited: home, services, emergency electrician, Level 2 electrician, switchboard upgrades, electrical faults, service areas.
- Dynamic service pages audited by template: 28 service landing pages from `data/service-pages.ts`.
- Electrical fault guide pages audited by template: 15 fault guides from `data/electrical-faults.ts`.
- Service-area hierarchy audited by data/template: 16 regions, 39 areas, 873 suburbs.
- Sitemap and robots source audited: `app/sitemap.ts`, `app/robots.ts`.
- Primary CTA system audited: phone links, quote links, quote modal trigger, mobile menu, footer links.

## Page Inventory

| Page or template | Current title pattern | Meta description pattern | H1 pattern | Main CTA | Phone CTA | Quote CTA | Schema | FAQ | Local SEO strength | Internal links | Conversion weaknesses |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Home `/` | `Emergency & Level 2 Electrician Sydney & Surrounding Regions` | Urgent faults, Level 2, switchboards, fault finding, residential/commercial electrical jobs across Sydney and surrounding regions | `Emergency & Level 2 Electrical Help in Sydney & Surrounding Regions` | Call and quote in hero, issue cards, quote panel | Yes | Yes | `Electrician`, `FAQPage` | Yes | Strong broad Sydney positioning | Core services, service areas, quote, phone, FAQs | Still relies on broad Sydney wording; local intent is mostly handled lower in service-area pages |
| Emergency `/emergency-electrician-sydney/` | `Emergency Electrician Sydney & Surrounding Regions` | Urgent faults, power loss, burning smells, tripping safety switches, switchboard faults | `Emergency Electrician Sydney & Surrounding Regions` | Call-first emergency action | Yes | Yes | `Electrician`, `FAQPage` | Yes | Strong emergency intent | Fault pages, service pages, phone, quote | Good urgency; avoid any wording that implies guaranteed response time unless confirmed |
| Level 2 `/level-2-electrician-sydney/` | `Level 2 Electrician Sydney & Surrounding Regions` | Consumer mains, service equipment, metering support, defect notices, overhead/underground services, switchboard upgrades | `Level 2 Electrician Sydney & Surrounding Regions` | Quote and call | Yes | Yes | `Electrician`, `FAQPage` | Yes | Strong Level 2 intent | Consumer mains, metering, defects, private poles, switchboards, quote | “Accredited Level 2 ASP” wording should be verified against actual ASP registration before relying on it heavily |
| Services `/services/` | `Electrical Services Sydney & Surrounding Regions` | Residential, commercial, emergency, Level 2, switchboards, fault finding, hot water, CCTV, data, lighting | `Electrical Services Sydney & Surrounding Regions` | Service cards plus call/quote | Yes | Yes | `Electrician` | No page-level FAQ | Strong broad service coverage | 27 visible service cards plus major pages | Copy issue: “a clear next steps before work begins” should be changed to “clear next steps before work begins” |
| Switchboard `/services/switchboard-upgrades-sydney/` | `Switchboard Upgrades Sydney & Surrounding Regions` | Switchboard upgrades, ceramic fuses, safety switches, RCBOs, fault finding, testing | `Switchboard Upgrades Sydney & Surrounding Regions` | Call/quote plus quote panel | Yes | Yes | `Electrician`, `FAQPage` | Yes | Strong switchboard intent | Safety switches, Level 2, quote, phone | “Switchboard authority” style wording should stay customer-friendly; avoid sounding like a regulator |
| Dynamic service page `/services/[slug]/` | Per service `metaTitle` from `data/service-pages.ts` | Per service `metaDescription` | Per service title | Hero call/quote, common jobs, related links, final CTA | Yes | Yes | `Service`, `FAQPage` | Yes | Strong service breadth | Related services, emergency, Level 2, switchboard, service areas | Mostly templated structure; keep service intros distinct enough to avoid generic feel |
| Electrical faults `/electrical-faults/` | `Electrical Faults Sydney & Surrounding Regions` | Fault symptoms: tripping, burning smells, no power, sparking, hot outlets, flickering lights, storm damage | `Electrical Faults Sydney & Surrounding Regions` | Fault cards, call/quote | Yes | Yes | `CollectionPage` | No page-level FAQ | Strong fault-intent hub | 15 fault guides, phone, quote | “Fastest path” is a little salesy; acceptable, but avoid unprovable speed claims |
| Fault guide `/electrical-faults/[slug]/` | Per fault guide | Per fault guide | Fault title | Call first for unsafe faults, quote for planned work | Yes | Yes | `Service`, `FAQPage` | Yes | Strong symptom SEO | Related service links, other fault paths | H1s are symptom-led, not location-led; this is fine, but add natural locality in body where needed |
| Service areas `/service-areas/` | `Service Areas` | Homes and businesses across Sydney, nearby suburbs and surrounding regions | `Electricians Across Sydney & Surrounding Regions` | Search suburb/postcode, call/quote | Yes | Yes | `Electrician` | No | Strong index/hub page | Region cards, search, phone, quote | “Sydney & Surrounding Regions” is good; avoid older “Greater Regions” wording elsewhere |
| Region `/service-areas/[region]/` | `[Region] Electrician Service Areas` | Region-level service copy | `[Region] Electrician Service Areas` | Browse areas, call/quote | Yes | Yes | None found | No | Moderate | Area links | Needs region schema and FAQ for stronger local SEO |
| Area `/service-areas/[region]/[area]/` | `[Area] Electrician Service Areas` | Area-level service copy | `[Area] Electrician Service Area` | Browse suburbs, call/quote | Yes | Yes | None found | No | Moderate | Suburb links | Needs more service depth and schema; currently mostly a suburb-list bridge |
| Suburb `/service-areas/[region]/[area]/[suburb]/` | `Electrician [Suburb] [Postcode] | Emergency & Level 2 Electrical Help` | Dynamic suburb/area/service mix | `Electrician [Suburb] [Postcode]` | Call, quote, service links, nearby suburbs | Yes | Yes | `Electrician`, `FAQPage` | Yes | Strong coverage, high scale | Emergency, Level 2, switchboard, faults, services, hot water, aircon, CCTV/data, nearby suburbs | Biggest risk: 873 pages share similar structure and repeated service sections; needs periodic manual variation for important suburbs |
| Sitemap `/sitemap.xml` | Generated | Generated | N/A | N/A | N/A | N/A | N/A | N/A | Important for crawl | Includes core pages, service pages, fault pages, region/area/suburb paths | Verify generated URLs include the `/evaready-electrical/` base path during GitHub Pages builds |
| Robots `/robots.txt` | Generated | Generated | N/A | N/A | N/A | N/A | N/A | N/A | Important for crawl | Points to generated sitemap | Verify live output after GitHub Pages deployment |

## Service-Area Generated Inventory

The service-area pages are generated from `data/service-area-region-data.ts` and `data/service-area-coverage.ts`.

| Region | Areas | Suburbs |
|---|---:|---:|
| Canterbury-Bankstown & Inner South West | 1 | 35 |
| St George & Bayside | 3 | 44 |
| Sutherland Shire | 1 | 42 |
| Liverpool & Fairfield | 2 | 59 |
| Macarthur, Camden & Wollondilly | 3 | 86 |
| Inner West, Burwood & Canada Bay | 4 | 48 |
| Sydney City & Eastern Suburbs | 4 | 59 |
| Parramatta & Cumberland | 2 | 44 |
| Western Sydney & Nepean | 2 | 75 |
| Hills, Hawkesbury & Hornsby | 3 | 90 |
| Northern Sydney & Ryde | 7 | 68 |
| Northern Beaches | 1 | 53 |
| Blue Mountains | 1 | 21 |
| Wollongong & Illawarra | 3 | 84 |
| Southern Highlands | 1 | 28 |
| Central Coast South | 1 | 37 |

Total generated local pages reviewed by template: 16 region pages, 39 area pages, 873 suburb pages.

## Special SEO Focus

### Emergency Electrician Sydney

Strengths:
- Emergency page targets power loss, burning smells, sparking, tripping safety switches, switchboard faults and unsafe hazards.
- Emergency CTAs are phone-first, which matches customer intent.
- Fault guide pages support long-tail symptom searches.
- Schema and FAQ are present on the emergency page and fault detail pages.

Risks and opportunities:
- Avoid any “fastest” or guaranteed response-time wording unless it is operationally true.
- Keep emergency page internal links prominent to the highest-value fault guides: no power, safety switch tripping, burning smell, sparking, hot power point and storm damage.
- Consider stronger “call first for no power” copy in above-the-fold sections if not already visible enough.

### Level 2 Electrician Sydney

Strengths:
- Strong topical coverage: consumer mains, metering, service equipment, defect notices, overhead service work, underground service work, point of attachment, private poles, temporary builders supply, disconnect/reconnect, three-phase and load upgrades.
- Level 2 page has schema, FAQ, CTAs and quote guidance.
- Service data includes dedicated pages for consumer mains, defect notice repairs, private power poles and metering services.

Risks and verification:
- The phrase “Accredited Level 2 ASP” appears in the hero credential badge system. This should be verified against actual ASP registration wording before being used as a stronger public authority claim.
- Avoid “Level 2 authority” language unless the business wants that phrasing and can back it up. “Level 2 electrical work” and “ASP Level 2 service provider” are safer if verified.

### Consumer Mains

Strengths:
- Dedicated service page exists: `/services/consumer-mains-sydney/`.
- Level 2 page and suburb template mention consumer mains naturally.

Opportunities:
- Consumer mains content should clearly separate residential service upgrades, defect-related repairs and supply-capacity planning.
- Link consumer mains more directly from switchboard and EV/load-capacity sections where relevant.

### Defect Notice Repairs

Strengths:
- Dedicated service page exists: `/services/defect-notice-repairs-sydney/`.
- Level 2 page repeatedly covers defect notices.

Opportunities:
- Add practical customer guidance wherever possible: what to photograph, deadlines, notice details, network/retailer paperwork and whether supply may be affected.

### Private Power Pole / Overhead Service

Strengths:
- Dedicated private power pole page exists.
- Level 2 page includes overhead service work, point of attachment issues and private poles.

Risks:
- Keep wording cautious around network-side responsibilities. Make clear what Evaready can inspect/coordinate versus what requires network approval or other parties.

### Metering / Supply Work

Strengths:
- Dedicated metering service page exists.
- Level 2 page includes metering and service equipment support.

Opportunities:
- Metering copy should include what customers should send before quoting: switchboard photo, meter panel photo, retailer/network paperwork, defect notice if present and desired upgrade details.

## Duplicate, Thin and Templated Content Risks

The suburb-page system is the largest SEO opportunity and the largest SEO risk.

What works:
- Each suburb page has a unique H1 with suburb and postcode.
- Each suburb page has a unique meta description selected from multiple patterns.
- Each suburb page includes emergency, Level 2, switchboard, fault finding, hot water, aircon, CCTV/data and general electrical sections.
- Nearby suburb links and area/region context help internal linking.

Risks:
- 873 pages share the same section order, same FAQ structure and similar service summaries.
- The generator uses some local context and stable variations, but many suburbs will still read as structurally similar.
- Region and area bridge pages are lighter than the suburb pages and could feel thin if crawled heavily.
- Several copy patterns are good for customers, but some are still broad enough that they may feel like location swaps.

Recommended next step:
- Manually enrich the highest-value suburbs first: Panania, Revesby, Padstow, Bankstown, Sutherland, Miranda, Hurstville, Liverpool, Parramatta, Blacktown, Penrith, Campbelltown, Cronulla, Marrickville, Coogee, Springwood and Katoomba if those are priority coverage suburbs.
- Add two or three genuinely local sentences to those pages based on real service knowledge, property mix, access considerations or common job types.
- Add schema and FAQ to region and area templates to strengthen hierarchy without creating thousands of extra pages.

## Wording Findings

Needs polish:
- `app/services/page.tsx`: “a clear next steps before work begins” should be “clear next steps before work begins.”
- `components/service-credential-strip.tsx`: Level 2 defect badge text is “Clear next steps”; stronger wording would be “Clear next steps before work begins.”
- `data/site.ts`: “Service across priority NSW regions” sounds internal and may conflict with the newer core/extended service-area language.
- `app/electrical-faults/page.tsx`: “Fastest path” is punchy, but speed claims should remain careful unless response times are guaranteed.
- `data/service-area-coverage.ts`: “The aim is…” is acceptable but slightly process-oriented; customer-facing copy usually reads better as “The next step is explained clearly.”

Consistency issue:
- Source still contains “Greater Regions” in titles/headings/metadata, while the newer service-area language prefers “Sydney & Surrounding Regions.” If the brand direction is now “Sydney & Surrounding Regions,” update the remaining “Greater Regions” references sitewide.

Public wording scan:
- No public-facing “trust signals,” “people search for,” “ready to organise,” “the goal is simple,” or “homepage stays focused” phrases were found in app/component/data source.
- “ServiceM8” appears in internal component names (`ServiceM8Frame`) and imports only. The public copy appears to use “secure booking form” instead.

Rendered spacing issue:
- A scan for obvious concatenation patterns such as `sparking.For`, `.For`, `.If`, `.Evaready`, and `.Call` did not find a clear source-level instance in the audited app/component/data files.
- Continue checking rendered pages after major copy edits, especially generated suburb pages where dynamic strings are assembled.

## Internal Link Findings

No obviously suspicious broken source links were found in the audited route/link scan. The important link patterns are present:
- Header: home, emergency, Level 2, services, hot water, aircon, service areas.
- Mobile menu: same primary destinations plus call and quote.
- Footer: emergency services, Level 2 services, popular services, fault guides, service areas, contact, sitemap.
- Service pages: related services, call, quote, service areas.
- Fault pages: related service links, call, quote.
- Suburb pages: emergency, Level 2, switchboard, fault guides, services, hot water, aircon, data cabling, power points, nearby suburbs.

Items to verify after build:
- `/sitemap.xml` should contain GitHub Pages URLs with `/evaready-electrical/`.
- `/robots.txt` should point to that sitemap.
- Dynamic service slugs should all export from `data/service-pages.ts`.
- Nearby suburb links should not produce duplicate region/area segments.

## CTA and Conversion Findings

Strengths:
- Phone CTA is consistently available.
- Quote CTA is consistently available.
- Quote modal intercepts the configured booking URL and `data-quote-trigger` links.
- Mobile menu contains both quote and call actions.
- Footer contact actions render separately as call, quote and email links.
- Suburb pages include call-first language for unsafe faults and quote-form language for planned work.

Risks:
- The site depends heavily on a client-side quote modal. If JavaScript fails, the external booking URL should still work, which is a good fallback.
- Make sure every link that should open the quote modal either uses the booking URL or `data-quote-trigger`.
- Keep call and quote buttons visually consistent across templates to avoid CTA drift.

## Schema and FAQ Findings

Strong:
- Home: `Electrician` and `FAQPage`.
- Emergency: `Electrician` and `FAQPage`.
- Level 2: `Electrician` and `FAQPage`.
- Switchboard: `Electrician` and `FAQPage`.
- Dynamic service pages: `Service` and `FAQPage`.
- Fault detail pages: `Service` and `FAQPage`.
- Suburb pages: `Electrician` and `FAQPage`.
- Service areas index: `Electrician`.

Needs improvement:
- Region pages have no JSON-LD schema.
- Area pages have no JSON-LD schema.
- Electrical faults index has no FAQ schema.
- Services index has no FAQ schema.

Recommended schema additions:
- Add `Electrician` or `Service` schema to region and area pages with `areaServed`.
- Add FAQ sections to region/area pages if copy remains useful and non-duplicative.
- Add `BreadcrumbList` schema on generated service-area pages and dynamic service/fault pages.

## Licensing and Authority Wording to Verify

Verify before making stronger claims:
- “Accredited Level 2 ASP” / “ASP Level 2 service provider” exact public wording.
- Any implication of full authority over network-side work.
- ARCtick public wording and scope. Current credential text includes “Refrigerant Handling Licence L157323 - Split Systems (1)” and should stay scoped to eligible split systems, hot water heat pumps and swimming pool heat pumps unless broader licensing is confirmed.
- Open Cabler Registration 46691 wording should avoid claiming structured cabling, fibre, coaxial, aerial or underground endorsements unless confirmed.
- Do not claim fully insured, 5-star rated, same-day guaranteed, 30-minute response, 1-hour response, free inspection or warranty unless verified.

## Lead Generation Recommendations

Highest priority:
1. Fix the services-page grammar issue: “a clear next steps before work begins.”
2. Verify and standardise Level 2 ASP wording before launch.
3. Add region/area schema and FAQs to strengthen the service-area hierarchy.
4. Manually enhance the top 20-30 most valuable suburb pages to reduce doorway/thin-content risk.
5. Standardise “Sydney & Surrounding Regions” if that is the preferred brand phrase.

High-value copy opportunities:
- Add “what to send before we quote” blocks on Level 2, consumer mains, defect notice, private pole and metering pages.
- Add “call first if unsafe” to every service type that can become urgent.
- Add a small “core and extended service area” explanation where long-distance suburbs appear, without making any area sound low priority.

## Validation Results

Validation was requested after report creation.

- `npm run lint`: Passed (`eslint` completed with exit code 0).
- `npm run build`: Passed (`next build` completed with exit code 0).
- Static export coverage from build: 985 generated static pages.
- Confirmed generated routes in build output include `/`, `/electrical-faults`, 15 fault guide paths, `/emergency-electrician-sydney`, `/level-2-electrician-sydney`, `/robots.txt`, `/service-areas`, 16 region paths, 39 area paths, 873 suburb paths, `/services`, 28 dynamic service paths, `/services/switchboard-upgrades-sydney`, `/sitemap.xml`, `/privacy-policy`, and `/terms`.
- Generated `out/sitemap.xml` uses the GitHub Pages base URL `https://c0d312.github.io/evaready-electrical`.
- Generated `out/robots.txt` points to `https://c0d312.github.io/evaready-electrical/sitemap.xml`.
- Build notes: Next.js emitted `DEP0205` deprecation warnings from Node module registration during build, but the build succeeded.
