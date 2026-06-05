# Lead Generation Offers Update

## Files Changed

- `components/lead-offer-panel.tsx`
- `app/service-areas/[region]/[area]/[suburb]/page.tsx`
- `reports/all-suburb-visible-copy-audit.csv`
- `reports/internal-link-audit.md`
- `reports/visible-copy-audit.csv`
- `docs/lead-generation-offers-update.md`

## Pages Updated

The existing reusable `LeadOfferPanel` was already installed on the requested commercial page types. This update strengthened the reusable offer checklist and suburb template output so the safer conversion offers appear consistently without adding routes or changing SEO metadata.

Updated or confirmed surfaces:

- Homepage
- Emergency electrician page
- Level 2 electrician page
- Services index
- Service page template
- Switchboard upgrades page
- Consumer mains page
- Defect notice repairs page
- Private power pole page
- Metering services page
- Point of attachment page
- Service areas index
- Suburb page template

## Offers Added Or Strengthened

- Free photo review for planned electrical work
- Send your defect notice for review
- Send switchboard, meter box or service equipment photos
- Call-first emergency triage
- Photos help us quote faster
- Clear next steps before work starts
- Fast callback for urgent enquiries
- No-obligation quote for planned work

The panel keeps the wording conservative. It does not use guaranteed arrival wording, does not say 60 minutes anywhere and does not add Level 1 or Level 3 services.

## CTA Preservation

The panel continues to use central business constants from `data/site.ts`:

- Phone CTA: `Call Now 0461 247 247`
- Phone href: `tel:+61461247247`
- Quote CTA: `Get a Quote`
- Quote href: central booking URL

Required attributes remain:

- `data-conversion-action="phone-click"`
- `data-conversion-action="quote-click"`
- `data-quote-trigger="true"`

## Validation Results

- `npm.cmd run audit:all-suburb-copy`: passed, 873 suburb pages checked, 0 warnings.
- `npm.cmd run audit:suburbs`: passed, 873 suburb pages, 0 warnings.
- `npm.cmd run audit:metadata`: passed, 995 rows, 0 warnings.
- `npm.cmd run audit:links`: passed, 19,963 internal links checked, 0 broken.
- `npm.cmd run audit:visible-copy`: passed, 995 pages, 0 warnings.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed, 1,002 static pages generated.

## Output Grep Results

- Approved offer strings were found in generated output.
- No risky strings were found for guaranteed arrival, guaranteed same-hour, 60 minutes anywhere, local depot, office in, Level 1 or Level 3.
- Google Ads tag `AW-18165545331` remains present.
- Phone and quote conversion attributes remain present.

## GitHub

- Main source implementation SHA: `98719bb7f813`
- gh-pages deploy SHA: `d981a91f5dda`
- Cache-busted live verification: passed for homepage, emergency, Level 2, services, key Level 2 service pages, service areas, Panania suburb page, sitemap and robots.
- Normal live URL verification: passed for the same checked routes.
- Final status: PASS, deployed cleanly to GitHub Pages.
