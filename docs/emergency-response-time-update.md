# Emergency Response Time Update

## Summary

Evaready Electrical now has structured website wording for confirmed emergency attendance timing and Level 2 ASP status.

The update communicates:

- Emergency electrical call-outs can be on site within 60 minutes in core service areas.
- Emergency electrical call-outs across greater regions can be on site within 90 minutes.
- Evaready Electrical is an Ausgrid & Endeavour Energy Accredited Level 2 ASP.
- Urgent faults should be handled by phone first.

The copy avoids guarantee wording and does not invent ASP numbers, categories, classes, office locations or network approval timing.

## Business Constants Added

The following structured fields were added to `data/site.ts`:

- `business.emergencyResponse.coreMinutes`
- `business.emergencyResponse.greaterRegionMinutes`
- `business.emergencyResponse.coreDisplay`
- `business.emergencyResponse.greaterDisplay`
- `business.emergencyResponse.combinedDisplay`
- `business.emergencyResponse.disclaimer`
- `business.emergencyResponse.emergencyOnlyNote`
- `business.level2Asp.enabled`
- `business.level2Asp.networks`
- `business.level2Asp.display`
- `business.level2Asp.shortDisplay`
- `business.level2Asp.aspNumber`
- `business.level2Asp.categories`
- `business.level2Asp.verificationNote`
- `business.emergencyResponseRegions.core`
- `business.emergencyResponseRegions.greater`

The helper `getEmergencyResponseForRegion(regionName)` returns the correct 60-minute or 90-minute emergency response wording for generated region, area and suburb pages.

## Core Emergency Regions

These regions use the 60-minute emergency response wording:

- Canterbury-Bankstown & Inner South West
- St George & Bayside
- Sutherland Shire
- Inner West, Burwood & Canada Bay
- Sydney City & Eastern Suburbs
- Parramatta & Cumberland
- Liverpool & Fairfield

## Greater Emergency Regions

These regions use the 90-minute emergency response wording:

- Macarthur, Camden & Wollondilly
- Western Sydney & Nepean
- Hills, Hawkesbury & Hornsby
- Northern Sydney & Ryde
- Northern Beaches
- Blue Mountains
- Wollongong & Illawarra
- Southern Highlands
- Central Coast South

## Main Wording Used

### Emergency response

Core service areas:

> Emergency electrician on site within 60 minutes in core service areas.

Greater regions:

> 90-minute emergency response for greater regions.

Combined wording:

> 60-minute emergency response in core areas. 90 minutes for greater regions.

### Emergency limitation wording

> Response time depends on location, access, traffic, safety conditions, job type and current availability.

> Response times apply to emergency electrical call-outs, not planned quote work.

### Level 2 ASP wording

> Ausgrid & Endeavour Energy Accredited Level 2 ASP

Short badge wording:

> Accredited Level 2 ASP

Limit wording:

> Level 2 ASP work is handled within the relevant network, licence and job scope.

## Pages And Components Updated

The response-time and Level 2 ASP wording was added through shared data, templates and components:

- `data/site.ts`
- `data/service-area-coverage.ts`
- `components/credential-badges.tsx`
- `components/service-credential-strip.tsx`
- `components/emergency-trust-panel.tsx`
- `app/page.tsx`
- `app/emergency-electrician-sydney/page.tsx`
- `app/level-2-electrician-sydney/page.tsx`
- `app/services/[slug]/page.tsx`
- `app/service-areas/[region]/page.tsx`
- `app/service-areas/[region]/[area]/page.tsx`
- `app/service-areas/[region]/[area]/[suburb]/page.tsx`
- `lib/seo-metadata.ts`

## Where 60-Minute Response Appears

- Homepage hero and trust content
- Emergency electrician page hero, FAQ and schema
- Level 2 page hero and schema
- Level 2 cluster service pages through the shared service template
- Core service-area region, area and suburb pages through the shared response helper
- Shared credential strips and emergency trust panel

## Where 90-Minute Response Appears

- Homepage hero and trust content
- Emergency electrician page hero, FAQ and schema
- Level 2 page hero and schema
- Level 2 cluster service pages through the shared service template
- Greater service-area region, area and suburb pages through the shared response helper
- Shared credential strips and emergency trust panel

## Level 2 ASP Wording Locations

The wording `Ausgrid & Endeavour Energy Accredited Level 2 ASP` appears on:

- Homepage hero/trust copy
- Level 2 page hero, authority section, FAQ and schema
- Level 2 cluster service pages
- Region, area and suburb generated pages
- Credential strips and generated suburb trust items

## Manual Verification Still Needed

These details were intentionally left blank or conservative because they were not provided:

- Exact ASP number
- Exact ASP categories/classes
- Final network scope details
- Final owner approval of the core vs greater region classification

## Deployment

This update was prepared locally only. It should not be deployed until validation passes and the owner approves the wording.
