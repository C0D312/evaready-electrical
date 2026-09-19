# Legacy custom-domain redirect mapping

Original audit: 24 July 2026. Read-only revalidation: 20 September 2026 (Sydney).

**Proposed and inactive. No redirects or external settings have been changed.**
These 19 source paths were checked against the actual legacy website, not
invented from the new site's service names. The static Next.js export cannot
enforce runtime redirect configuration. A separately approved redirect-capable
host or edge is required; an existing Cloudflare account or rule set has not been
inspected and must not be assumed available.

## Current public evidence

Credential-free HTTP GETs, without JavaScript, cookies or submissions, found:

- Homepage: 200 HTML, linking to all nine region `.html` paths below.
- Nine extensionless region paths: 200 HTML with matching region titles.
- Nine region `.html` paths: 307 to the extensionless path, then 200.
- `/index.html`: 307 to `/`, then 200.
- `/sitemap.xml` and `/robots.txt`: actual HTTP 404, not a browser-tool inference.
- Region navigation links back to homepage fragments. Fragments are not separate
  HTTP request paths. The Northern Beaches page also exposes a historical `www`
  `.html` canonical; host canonicalisation needs a launch-day check.

Receipt timestamp: `2026-09-19T19:22:13.207Z`.
Receipt SHA-256:
`bc29e129aa09461b55e7e58f39395f132b46559b5b2c0abcf036c9a5fd7151ed`.
Public response bodies and per-hop status/MIME/hashes are retained locally as
evidence, not shipped with the website. These observations corroborate the
19-entry historical ledger but do not prove discovery of every historical URL.
Owner-authorised access logs or Search Console exports remain a separate input.

## Proposed mappings

| Legacy request path | Final branded destination | Status code |
| --- | --- | ---: |
| `/index.html` | `/` | 301 or 308 |
| `/regions/canterbury-bankstown` | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` | 301 or 308 |
| `/regions/canterbury-bankstown.html` | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` | 301 or 308 |
| `/regions/inner-west` | `/service-areas/inner-west-burwood-and-canada-bay/` | 301 or 308 |
| `/regions/inner-west.html` | `/service-areas/inner-west-burwood-and-canada-bay/` | 301 or 308 |
| `/regions/eastern-suburbs-cbd` | `/service-areas/sydney-city-and-eastern-suburbs/` | 301 or 308 |
| `/regions/eastern-suburbs-cbd.html` | `/service-areas/sydney-city-and-eastern-suburbs/` | 301 or 308 |
| `/regions/st-george` | `/service-areas/st-george-and-bayside/` | 301 or 308 |
| `/regions/st-george.html` | `/service-areas/st-george-and-bayside/` | 301 or 308 |
| `/regions/sutherland-shire` | `/service-areas/sutherland-shire/` | 301 or 308 |
| `/regions/sutherland-shire.html` | `/service-areas/sutherland-shire/` | 301 or 308 |
| `/regions/western-sydney` | `/service-areas/western-sydney-and-nepean/` | 301 or 308 |
| `/regions/western-sydney.html` | `/service-areas/western-sydney-and-nepean/` | 301 or 308 |
| `/regions/south-west-sydney` | `/service-areas/` | 301 or 308 |
| `/regions/south-west-sydney.html` | `/service-areas/` | 301 or 308 |
| `/regions/north-shore-northern-suburbs` | `/service-areas/northern-sydney-and-ryde/` | 301 or 308 |
| `/regions/north-shore-northern-suburbs.html` | `/service-areas/northern-sydney-and-ryde/` | 301 or 308 |
| `/regions/northern-beaches` | `/service-areas/northern-beaches/` | 301 or 308 |
| `/regions/northern-beaches.html` | `/service-areas/northern-beaches/` | 301 or 308 |

The actual South-West Sydney page lists Liverpool/Fairfield as well as Camden,
Campbelltown and Wollondilly localities. The earlier Liverpool/Fairfield-only
proposal narrowed that intent. The proposed destination is now the service-area
directory, which lets visitors choose the relevant region. This is not a blanket
homepage redirect and is not activated. Owner review of the final ledger remains
required. Other region mappings preserve the closest existing regional intent;
legacy suburb lists are not evidence of current serviceability or council borders.

## Redirect rules

- Match the path exactly, ignoring the query string.
- Preserve query strings. Any deliberate parameter removal needs its own recorded
  reason and approval; do not silently discard them.
- Redirect directly to the final HTTPS apex URL with its trailing slash.
- Do not retain the current `.html` to extensionless `307` hop.
- Do not redirect unknown URLs to the homepage.
- Return a genuine 404 for unknown paths without a relevant replacement. Use 410
  only for an individually reviewed, deliberately retired resource. No 410 list
  has been established here.
- Test each source with redirects disabled in the client cache, then verify one
  redirect hop and a final `200`.

URL fragments such as `/#about` are not sent to the server and cannot be
matched by an HTTP redirect rule. They are not separate indexable legacy pages.

## External requirement

Before cutover, the owner must select an eligible commercial hosting arrangement
and authorise the exact rule set. Cloudflare Pages `_redirects` supports 301/308
for static routes, but Functions routes require different handling. GitHub Pages
does not provide configurable path-specific HTTP redirects, and its commercial
use restriction prevents assuming it is the appropriate business-production host.
See `branded-domain-launch-readiness.md` for the current source-linked platform
assessment. No `_redirects`, CNAME, DNS, workflow or hosting configuration is
created or changed by this plan.
