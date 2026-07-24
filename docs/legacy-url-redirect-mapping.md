# Legacy custom-domain redirect mapping

Audit date: 24 July 2026

These redirects preserve the public legacy routes currently served from
`evareadyelectrical.com.au`. They are not implemented by the Next.js export
because static GitHub Pages hosting cannot emit configurable HTTP redirects.
They must be installed as direct permanent redirects at the existing
Cloudflare edge during the domain cutover.

## Required mappings

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
| `/regions/south-west-sydney` | `/service-areas/liverpool-and-fairfield/` | 301 or 308 |
| `/regions/south-west-sydney.html` | `/service-areas/liverpool-and-fairfield/` | 301 or 308 |
| `/regions/north-shore-northern-suburbs` | `/service-areas/northern-sydney-and-ryde/` | 301 or 308 |
| `/regions/north-shore-northern-suburbs.html` | `/service-areas/northern-sydney-and-ryde/` | 301 or 308 |
| `/regions/northern-beaches` | `/service-areas/northern-beaches/` | 301 or 308 |
| `/regions/northern-beaches.html` | `/service-areas/northern-beaches/` | 301 or 308 |

The South-West Sydney legacy page spans more than one current region. The
Liverpool and Fairfield hub is the closest single replacement and links into
the rest of the current service-area architecture.

## Redirect rules

- Match the path exactly, ignoring the query string.
- Preserve query strings unless they contain obsolete tracking parameters that
  are deliberately removed.
- Redirect directly to the final HTTPS apex URL with its trailing slash.
- Do not retain the current `.html` to extensionless `307` hop.
- Do not redirect unknown URLs to the homepage.
- Return the current branded 404 for unknown paths with no relevant replacement.
- Test each source with redirects disabled in the client cache, then verify one
  redirect hop and a final `200`.

URL fragments such as `/#about` are not sent to the server and cannot be
matched by an HTTP redirect rule. They are not separate indexable legacy pages.

## External requirement

Install these rules in the Cloudflare zone before replacing the legacy origin.
GitHub Pages can host the final static pages, but it cannot provide these
path-specific HTTP status responses. If Cloudflare will no longer proxy the
domain, an equivalent redirect-capable edge must remain in front of the static
site.
