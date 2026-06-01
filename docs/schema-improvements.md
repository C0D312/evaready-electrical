# Schema Improvements

Date: 2026-06-01

## Shared Schema Helpers

Added `lib/schema.ts` to keep structured data consistent across the site.

The helper now provides:

- `buildBreadcrumbSchema()` for BreadcrumbList schema.
- `buildElectricianSchema()` for Electrician / LocalBusiness-style schema.
- `buildServiceSchema()` for Service schema.
- `buildFaqSchema()` for FAQPage schema that maps directly from visible FAQ arrays.
- `businessIdentifiers()` for NSW Electrical Licence, ABN, Open Cabler Registration and ARCtick licence identifiers from `data/site.ts`.
- `schemaJson()` to safely serialize JSON-LD without keeping undefined values.

## Business Schema

The Electrician schema now uses shared business constants from `data/site.ts`:

- Business name
- Phone number
- Email
- Site URL
- Logo image
- Van/brand image
- NSW Electrical Licence
- ABN
- Open Cabler Registration
- ARCtick licence

Emergency-related pages use a `ContactPoint` with 24/7 hours only for urgent electrical fault calls. No fake reviews, aggregate ratings, office address or response-time guarantees were added.

## Page Type Coverage

### Homepage

Schema now includes:

- Electrician schema with core service offers.
- FAQPage schema matching the visible homepage FAQ content.
- BreadcrumbList schema for Home.

### Services Index

Schema now includes:

- Electrician schema for the electrical services index.
- OfferCatalog schema for the main services.
- BreadcrumbList schema for Home > Electrical Services.

### Generated Service Pages

Applies to all routes generated from `data/service-pages.ts`.

Schema now includes:

- Electrician schema for the specific service page.
- Service schema for the service landing page.
- OfferCatalog inside Service schema using the visible service list.
- FAQPage schema matching each page's visible FAQs.
- BreadcrumbList schema for Home > Electrical Services > Service.

### Switchboard Page

The custom switchboard page now includes:

- Electrician schema.
- Service schema for switchboard upgrades.
- FAQPage schema matching visible switchboard FAQs.
- BreadcrumbList schema for Home > Electrical Services > Switchboard Upgrades.

### Emergency Electrician Page

Schema includes:

- Electrician schema with urgent call contact point.
- Service schema for emergency electrical fault help.
- FAQPage schema matching the visible emergency FAQs.
- BreadcrumbList schema for Home > Emergency Electrician Sydney.

The Electrician schema was improved with logo, brand images and the complete business identifier set.

### Level 2 Electrician Page

Schema includes:

- Electrician schema.
- Service schema for Level 2 electrical work.
- OfferCatalog for visible Level 2 service cards.
- FAQPage schema matching the visible Level 2 FAQs.
- BreadcrumbList schema for Home > Level 2 Electrician Sydney.

The Electrician schema was improved with logo, brand images and the complete business identifier set.

### Electrical Fault Index

Schema now includes:

- Electrician schema for fault-finding and urgent fault support.
- CollectionPage schema for the electrical fault guide index.
- BreadcrumbList schema for Home > Electrical Faults.

### Electrical Fault Detail Pages

Applies to all generated fault guide pages.

Schema now includes:

- Electrician schema for the fault guide page.
- Service schema for electrical fault finding tied to the fault topic.
- FAQPage schema matching the visible fault guide FAQs.
- BreadcrumbList schema for Home > Electrical Faults > Fault Guide.

### Service Area Index

Schema now includes:

- Electrician schema using all configured coverage regions as areaServed.
- Service schema for electrical service-area coverage.
- BreadcrumbList schema for Home > Service Areas.

### Region Pages

Applies to every generated region route.

Schema now includes:

- Electrician schema scoped to the region.
- Service schema for emergency, Level 2 and planned electrical work in that region.
- FAQPage schema matching the visible region FAQs.
- BreadcrumbList schema for Home > Service Areas > Region.

### Area Pages

Applies to every generated area route.

Schema now includes:

- Electrician schema scoped to the area.
- Service schema for emergency, Level 2 and planned electrical work in that area.
- FAQPage schema matching the visible area FAQs.
- BreadcrumbList schema for Home > Service Areas > Region > Area.

### Suburb Pages

Applies to all generated suburb pages.

Schema now includes:

- Electrician schema scoped to the suburb and postcode.
- Service schema for electrician service in the suburb.
- OfferCatalog for visible suburb service summaries.
- FAQPage schema matching the visible suburb FAQs.
- BreadcrumbList schema for Home > Service Areas > Region > Area > Suburb.

## Validation

Commands run:

- `npm.cmd run lint` - passed.
- `npm.cmd run build` - passed.

Build generated 985 static pages, including `/sitemap.xml` and `/robots.txt`.
