import { generatedCoverageRegions } from "./service-area-region-data";

export type CoverageSuburb = {
  name: string;
  postcode: string;
  slug: string;
};

export type CoverageArea = {
  name: string;
  slug: string;
  description: string;
  suburbs: CoverageSuburb[];
};

export type CoverageRegion = {
  name: string;
  slug: string;
  description: string;
  travelNote: string;
  areas: CoverageArea[];
};

export type CoverageSearchItem = {
  areaName: string;
  areaSlug: string;
  href: string;
  postcode: string;
  regionName: string;
  regionSlug: string;
  suburbName: string;
  suburbSlug: string;
};

export const coverageRegions = generatedCoverageRegions;

export const coverageSearchItems: CoverageSearchItem[] =
  coverageRegions.flatMap((coverageRegion) =>
    coverageRegion.areas.flatMap((coverageArea) =>
      coverageArea.suburbs.map((coverageSuburb) => ({
        areaName: coverageArea.name,
        areaSlug: coverageArea.slug,
        href: `/service-areas/${coverageRegion.slug}/${coverageArea.slug}/${coverageSuburb.slug}`,
        postcode: coverageSuburb.postcode,
        regionName: coverageRegion.name,
        regionSlug: coverageRegion.slug,
        suburbName: coverageSuburb.name,
        suburbSlug: coverageSuburb.slug,
      })),
    ),
  );

export const coverageStats = {
  areaCount: coverageRegions.reduce(
    (total, coverageRegion) => total + coverageRegion.areas.length,
    0,
  ),
  regionCount: coverageRegions.length,
  suburbCount: coverageSearchItems.length,
};

export type SuburbServiceIntent =
  | "aircon"
  | "dataCctv"
  | "emergency"
  | "faultFinding"
  | "general"
  | "hotWater"
  | "level2"
  | "switchboard";

export type SuburbPageCopy = {
  ctaHeading: string;
  faqAnswers: {
    combined: string;
    emergency: string;
    level2: string;
    quote: string;
    service: string;
  };
  faqIntro: string;
  faqHeading: string;
  heroDescription: string;
  heroNote: string;
  metaDescription: string;
  processDescription: string;
  processHeading: string;
  processLabel: string;
  processSteps: {
    text: string;
    title: string;
  }[];
  serviceIntro: string;
  servicesHeading: string;
  serviceLinks: {
    href: string;
    text: string;
    title: string;
  }[];
  serviceSummaries: {
    intent: SuburbServiceIntent;
    text: string;
    title: string;
  }[];
  trustItems: string[];
};

type LocalPageContext = {
  accessDetail: string;
  commonJobs: string;
  emergencySignals: string;
  level2Detail: string;
  plannedWork: string;
  propertyMix: string;
  setting: string;
  switchboardDetail: string;
};

function stableHash(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function pick<T>(items: T[], seed: number, offset = 0) {
  const mixedSeed = (seed ^ Math.imul(offset + 1, 0x9e3779b1)) >>> 0;

  return items[mixedSeed % items.length];
}

function getLocalPageContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext {
  const key = `${coverageRegion.name} ${coverageArea.name} ${coverageArea.description} ${coverageSuburb.name}`.toLowerCase();

  if (
    key.includes("coastal") ||
    key.includes("beach") ||
    key.includes("bondi") ||
    key.includes("bronte") ||
    key.includes("cronulla") ||
    key.includes("kurnell") ||
    key.includes("coogee") ||
    key.includes("clovelly") ||
    key.includes("maroubra") ||
    key.includes("manly") ||
    key.includes("dee why") ||
    key.includes("curl curl") ||
    key.includes("narrabeen") ||
    key.includes("mona vale") ||
    key.includes("newport") ||
    key.includes("avalon") ||
    key.includes("palm beach") ||
    key.includes("bayside") ||
    key.includes("illawarra") ||
    key.includes("woy woy") ||
    key.includes("umina") ||
    key.includes("ettalong") ||
    key.includes("terrigal") ||
    key.includes("avoca")
  ) {
    return {
      accessDetail:
        "photos of outdoor fittings, switchboards, weather exposure and parking access",
      commonJobs:
        "outdoor lighting, safety switch faults, corrosion checks, smoke alarms and power repairs",
      emergencySignals:
        "storm-related faults, water-affected fittings, tripping safety switches and unsafe outdoor power",
      level2Detail:
        "consumer mains, overhead service points and supply-side upgrade enquiries",
      plannedWork:
        "weather-rated lighting, outdoor power, switchboard upgrades and appliance circuits",
      propertyMix:
        "coastal homes, apartments, strata properties, shops and renovated houses",
      setting: "coastal and weather-exposed service area",
      switchboardDetail:
        "weather exposure, older enclosures, nuisance tripping and safety switch protection",
    };
  }

  if (
    key.includes("sydney city") ||
    key.includes("city fringe") ||
    key.includes("cbd") ||
    key.includes("airport") ||
    key.includes("haymarket") ||
    key.includes("the rocks") ||
    key.includes("barangaroo") ||
    key.includes("pyrmont") ||
    key.includes("ultimo") ||
    key.includes("surry hills") ||
    key.includes("darlinghurst") ||
    key.includes("potts point") ||
    key.includes("redfern") ||
    key.includes("waterloo") ||
    key.includes("alexandria") ||
    key.includes("zetland") ||
    key.includes("macquarie") ||
    key.includes("parramatta") ||
    key.includes("north sydney") ||
    key.includes("st leonards") ||
    key.includes("chatswood")
  ) {
    return {
      accessDetail:
        "access notes, strata requirements, loading zones or parking details",
      commonJobs:
        "fault finding, office power, lighting repairs, switchboard work and commercial maintenance",
      emergencySignals:
        "partial power loss, tripping circuits, hot outlets, burning smells and after-hours business faults",
      level2Detail:
        "consumer mains, metering, service equipment and defect notice enquiries",
      plannedWork:
        "office fit-outs, tenancy changes, lighting upgrades and programmed maintenance",
      propertyMix:
        "apartments, strata buildings, shopfronts, offices and busy commercial sites",
      setting: "high-access commercial and strata area",
      switchboardDetail:
        "older boards, tenancy loads, safety switch upgrades and space for future circuits",
    };
  }

  if (
    key.includes("warehouse") ||
    key.includes("industrial") ||
    key.includes("wetherill") ||
    key.includes("smithfield") ||
    key.includes("moorebank") ||
    key.includes("airport")
  ) {
    return {
      accessDetail:
        "site access, machinery areas, operating hours and photos of the affected board or circuit",
      commonJobs:
        "three-phase enquiries, fault finding, lighting, switchboards and maintenance work",
      emergencySignals:
        "loss of power to equipment, tripping circuits, hot isolators and damaged outlets",
      level2Detail:
        "consumer mains, supply capacity, metering and service equipment questions",
      plannedWork:
        "warehouse lighting, dedicated circuits, fit-out changes and maintenance scheduling",
      propertyMix:
        "homes, workshops, warehouses, factories and commercial units",
      setting: "mixed residential, workshop and industrial area",
      switchboardDetail:
        "load changes, ageing breakers, safety switches and circuit identification",
    };
  }

  if (
    key.includes("hills district") ||
    key.includes("castle hill") ||
    key.includes("baulkham hills") ||
    key.includes("kellyville") ||
    key.includes("rouse hill") ||
    key.includes("dural") ||
    key.includes("galston") ||
    key.includes("camden") ||
    key.includes("wollondilly") ||
    key.includes("blue mountains") ||
    key.includes("hawkesbury")
  ) {
    return {
      accessDetail:
        "gate access, driveway details, photos of the switchboard and any outbuilding power points",
      commonJobs:
        "switchboard upgrades, fault finding, shed power, lighting and larger planned electrical work",
      emergencySignals:
        "loss of power, storm damage, tripping safety switches and unsafe outdoor circuits",
      level2Detail:
        "consumer mains, point of attachment, private pole and supply upgrade enquiries",
      plannedWork:
        "renovation wiring, extra circuits, outdoor lighting and upgrade planning",
      propertyMix:
        "family homes, larger blocks, newer estates, acreage properties and small businesses",
      setting: "larger-property and growth-corridor service area",
      switchboardDetail:
        "capacity for added loads, older fuses, safety switch protection and future circuits",
    };
  }

  if (
    key.includes("inner west") ||
    key.includes("older homes") ||
    key.includes("renovation") ||
    key.includes("strata") ||
    key.includes("bankstown") ||
    key.includes("st george")
  ) {
    return {
      accessDetail:
        "street access, unit details, switchboard photos and any strata contact notes",
      commonJobs:
        "fault finding, lighting repairs, power points, smoke alarms and switchboard upgrades",
      emergencySignals:
        "tripping safety switches, hot power points, flickering lights and burning smells",
      level2Detail:
        "consumer mains, metering, service equipment and defect notice discussions",
      plannedWork:
        "renovations, extra outlets, lighting changes and safety switch upgrades",
      propertyMix:
        "older homes, duplexes, villas, units, strata blocks and main-street businesses",
      setting: "established residential and strata service area",
      switchboardDetail:
        "ceramic fuses, crowded boards, older wiring and safety switch upgrades",
    };
  }

  return {
    accessDetail:
      "photos of the issue, the switchboard location and any access instructions",
    commonJobs:
      "fault finding, lighting, power points, smoke alarms, switchboards and general repairs",
    emergencySignals:
      "power loss, burning smells, tripping circuits, sparking and unsafe outlets",
    level2Detail:
      "consumer mains, service equipment, supply upgrades and defect notice enquiries",
    plannedWork:
      "lighting upgrades, extra outlets, appliance circuits and scheduled maintenance",
    propertyMix:
      "homes, townhouses, units, strata properties, shops and small commercial sites",
    setting: "residential and light-commercial service area",
    switchboardDetail:
      "safety switches, RCBOs, old fuses, labelling and capacity for added circuits",
  };
}

type SuburbCopyOverride = Partial<
  Pick<
    SuburbPageCopy,
    | "heroDescription"
    | "heroNote"
    | "metaDescription"
    | "processDescription"
    | "serviceIntro"
  >
> & {
  faqAnswers?: Partial<SuburbPageCopy["faqAnswers"]>;
  serviceSummaryText?: Partial<Record<SuburbServiceIntent, string>>;
  trustItems?: string[];
};

const topSuburbCopyOverrides: Record<string, SuburbCopyOverride> = {
  bankstown: {
    heroDescription:
      "Evaready Electrical helps Bankstown homes, apartments, shopfronts and commercial properties with urgent electrical faults, switchboard upgrades, lighting, power, data cabling and Level 2 enquiries. Common work around Bankstown includes older switchboard checks, strata access, shop maintenance and renovation wiring where the site needs clear testing before repair.",
    heroNote:
      "Bankstown jobs are often mixed between family homes, busy retail strips, apartments and light-commercial sites, so good quote details include parking notes, switchboard photos, tenancy access and the exact electrical symptom.",
    processDescription:
      "Bankstown electrical work is triaged by urgency first. Unsafe faults, smoke, heat or sparking are call-first jobs; planned work is assessed from photos, address details, access notes and the type of property involved.",
    serviceIntro:
      "Bankstown requests often involve switchboards in older homes, commercial maintenance for local shops, strata electrical repairs, smoke alarms, power points, lighting and Level 2 questions around supply upgrades or defect notices.",
    serviceSummaryText: {
      emergency:
        "Bankstown emergency calls commonly involve partial power loss, hot outlets, tripping safety switches, buzzing fittings and business faults that cannot wait until the next day.",
      switchboard:
        "Switchboard work in Bankstown often means checking older boards, crowded circuits, ceramic fuses, labelling, safety switches and capacity for extra loads.",
      level2:
        "Level 2 enquiries around Bankstown can include consumer mains, metering, service equipment, defect notice responses and switchboard supply upgrades.",
      general:
        "Planned electrical jobs in Bankstown often cover lighting changes, power points, shop maintenance, data cabling, smoke alarms and renovation wiring.",
    },
  },
  panania: {
    heroDescription:
      "Evaready Electrical supports Panania homes, villas, duplexes, units, strata buildings and local businesses with emergency faults, switchboard upgrades, smoke alarms, lighting, power points, hot water circuits and Level 2 electrical enquiries.",
    heroNote:
      "Panania jobs often involve older brick homes, duplex upgrades, villa switchboards, small shopfront maintenance and renovation power upgrades around local residential streets and shopping strips.",
    processDescription:
      "For Panania, the best first step depends on the job. Burning smells, sparking, heat or power loss should be phoned through, while planned upgrades are easier to assess with photos of the switchboard, work area and access.",
    serviceIntro:
      "Panania electrical work commonly includes safety switch faults, old fuse upgrades, kitchen and laundry power, hot water electrical faults, lighting changes, smoke alarms and Level 2 discussions where a service upgrade or defect notice is involved.",
    serviceSummaryText: {
      emergency:
        "Panania emergency work often starts with tripping safety switches, partial power loss, hot power points, failed hot water circuits or storm-related faults.",
      switchboard:
        "Panania switchboard enquiries often involve older fuses, crowded villa boards, duplex upgrades, RCBO protection and clearer circuit labelling.",
      level2:
        "Panania Level 2 enquiries can include consumer mains, service equipment checks, metering support and defect notice paperwork.",
      general:
        "Planned Panania jobs often include extra power points, lighting upgrades, ceiling fans, smoke alarms, data points and renovation wiring.",
    },
  },
  revesby: {
    heroDescription:
      "Evaready Electrical works across Revesby for family homes, duplexes, villas, warehouses and local businesses needing fault finding, switchboards, lighting, power, data, CCTV, hot water electrical and Level 2 support.",
    heroNote:
      "Revesby has a practical mix of homes, small industrial units and busy local streets, so access notes, photos and operating hours help separate urgent repairs from scheduled work.",
    processDescription:
      "Revesby jobs are scoped around the property type first: homes and villas need clean residential repairs, while workshops and commercial units often need load checks, three-phase questions or after-hours planning.",
    serviceIntro:
      "Common Revesby requests include switchboard upgrades, tripping circuits, warehouse lighting, power for equipment, smoke alarms, CCTV cabling, data points and Level 2 enquiries for service or defect issues.",
  },
  padstow: {
    heroDescription:
      "Evaready Electrical helps Padstow homes, units, duplexes, shopfronts and small commercial sites with electrical faults, safety switches, lighting, power points, hot water circuits, switchboards and Level 2 enquiries.",
    heroNote:
      "Padstow electrical jobs often include access through narrow streets, older switchboards, renovation work and small-business maintenance near local shopping strips.",
    processDescription:
      "For Padstow, urgent faults are treated differently from quote work. Power loss, sparking and burning smells need a call, while planned jobs are clearer with photos and a short description.",
    serviceIntro:
      "Padstow customers often ask for safety switch testing, old board upgrades, lighting repairs, extra power, smoke alarms, appliance circuits, shop maintenance and Level 2 guidance.",
  },
  liverpool: {
    heroDescription:
      "Evaready Electrical services Liverpool homes, apartments, medical suites, retail spaces, warehouses and growing residential areas with urgent faults, switchboards, lighting, commercial maintenance and Level 2 electrical enquiries.",
    heroNote:
      "Liverpool work often mixes apartment access, busy commercial buildings, new estates and older homes, so quotes are stronger with parking notes, tenancy details, photos and the job urgency.",
    processDescription:
      "Liverpool electrical work is handled by separating high-risk faults from planned maintenance. Business outages, hot fittings and tripping circuits need fast attention; upgrades and fit-outs need clear scope and access details.",
    serviceIntro:
      "Common Liverpool work includes commercial maintenance, apartment electrical repairs, switchboard upgrades, emergency fault finding, data cabling, CCTV, smoke alarms and supply-side Level 2 questions.",
  },
  parramatta: {
    heroDescription:
      "Evaready Electrical supports Parramatta apartments, offices, shops, strata buildings and homes with emergency fault finding, commercial electrical maintenance, switchboards, lighting, power, data, CCTV and Level 2 enquiries.",
    heroNote:
      "Parramatta jobs often involve loading docks, apartment access, strata rules, business operating hours and busy parking, so clear access notes help the work move faster.",
    processDescription:
      "Parramatta work is scoped around access and urgency. Office and strata jobs usually need entry details and site contacts, while unsafe electrical faults should be phoned through immediately.",
    serviceIntro:
      "Parramatta electrical requests often include tenancy changes, office power, lighting repairs, strata faults, data cabling, switchboard work, smoke alarms and Level 2 support for supply-side issues.",
    serviceSummaryText: {
      emergency:
        "Parramatta urgent calls often involve apartment outages, commercial faults, tripping circuits, hot outlets and after-hours business interruptions.",
      switchboard:
        "Parramatta switchboard work can involve strata boards, tenancy loads, safety switch upgrades, labelling and planning for future circuits.",
      level2:
        "Level 2 enquiries around Parramatta can include metering, consumer mains, service equipment, defect notices and supply changes for larger sites.",
      general:
        "Planned Parramatta work often covers office fit-outs, lighting, power points, data cabling, CCTV and programmed maintenance.",
    },
  },
  burwood: {
    heroDescription:
      "Evaready Electrical works across Burwood homes, apartments, shops, restaurants and strata properties with urgent electrical faults, lighting, power, switchboards, smoke alarms, data and Level 2 enquiries.",
    heroNote:
      "Burwood jobs often include apartment access, shopfront timing, strata communication, older wiring and limited parking near busy roads.",
    processDescription:
      "Burwood work is planned around access and site type. Retail and strata jobs need contact details and timing; unsafe faults need a direct call before the issue spreads.",
    serviceIntro:
      "Common Burwood enquiries include shop maintenance, apartment faults, lighting repairs, power point upgrades, smoke alarms, data cabling and switchboard safety work.",
  },
  strathfield: {
    heroDescription:
      "Evaready Electrical helps Strathfield homes, larger residences, apartments, strata blocks, schools, shops and businesses with electrical faults, switchboard upgrades, lighting, power, data, CCTV and Level 2 support.",
    heroNote:
      "Strathfield electrical work often involves larger homes, older boards, strata access, commercial properties and clear planning around parking or entry instructions.",
    processDescription:
      "Strathfield jobs are scoped with the building type in mind. Larger homes may need capacity checks and extra circuits, while apartments and commercial sites need access details and safe fault testing.",
    serviceIntro:
      "Typical Strathfield requests include switchboard upgrades, renovation wiring, data cabling, lighting, smoke alarms, hot water circuits, emergency faults and Level 2 supply enquiries.",
  },
  leichhardt: {
    heroDescription:
      "Evaready Electrical services Leichhardt terraces, renovated homes, apartments, cafes, shops and strata properties with lighting, power, fault finding, switchboards, smoke alarms, data cabling and Level 2 enquiries.",
    heroNote:
      "Leichhardt work often means older wiring, tight access, terrace renovations, cafe maintenance and switchboards that need careful testing before upgrades.",
    processDescription:
      "Leichhardt electrical jobs are best scoped with access details and photos. Older homes and renovated terraces can hide wiring issues, so testing comes before repair advice.",
    serviceIntro:
      "Common Leichhardt jobs include renovation wiring, kitchen power, pendant and downlight upgrades, safety switch faults, shop maintenance, data points and switchboard upgrades.",
  },
  marrickville: {
    heroDescription:
      "Evaready Electrical helps Marrickville homes, warehouses, creative spaces, cafes, apartments and shopfronts with emergency faults, commercial maintenance, switchboards, lighting, power, data and CCTV.",
    heroNote:
      "Marrickville jobs often combine older homes, converted industrial spaces, busy cafes and warehouse access, so photos and site timing help with a cleaner quote.",
    processDescription:
      "Marrickville work is assessed around property use. A warehouse circuit fault, cafe outage or terrace renovation all need different testing and access planning.",
    serviceIntro:
      "Marrickville requests commonly include commercial lighting, three-phase questions, data cabling, switchboard upgrades, power points, smoke alarms, emergency faults and renovation wiring.",
  },
  newtown: {
    heroDescription:
      "Evaready Electrical works across Newtown terraces, apartments, shops, cafes, bars and strata buildings with urgent electrical faults, switchboards, lighting, power, data cabling, smoke alarms and maintenance.",
    heroNote:
      "Newtown electrical jobs often involve older terrace wiring, tight parking, shop trading hours, apartment access and fast fault testing when a circuit keeps tripping.",
    processDescription:
      "Newtown jobs need clear access and timing. Unsafe faults should be phoned through, while planned cafe, shop or terrace work is easier to quote with photos and scope.",
    serviceIntro:
      "Common Newtown enquiries include lighting changes, power point upgrades, shop maintenance, safety switch trips, smoke alarms, data cabling and switchboard upgrades in older properties.",
  },
  coogee: {
    heroDescription:
      "Evaready Electrical supports Coogee homes, apartments, strata buildings, terraces and local businesses with coastal electrical faults, outdoor lighting, switchboard upgrades, smoke alarms, power, data, CCTV and Level 2 enquiries.",
    heroNote:
      "Coogee electrical work often involves coastal corrosion, outdoor fittings, apartment access, strata communication, weather-rated lighting and older switchboards in renovated units and terraces.",
    processDescription:
      "For Coogee, weather exposure matters. Outdoor fittings, tripping circuits, switchboards and coastal corrosion concerns are tested carefully before repair or upgrade options are recommended.",
    serviceIntro:
      "Coogee customers often ask for outdoor lighting, safety switch fault finding, apartment electrical repairs, smoke alarms, switchboard upgrades, CCTV cabling and weather-rated power.",
    serviceSummaryText: {
      emergency:
        "Coogee urgent calls often involve water-affected fittings, storm faults, tripping safety switches, hot outlets and unsafe outdoor power.",
      switchboard:
        "Switchboard work in Coogee can involve older apartment boards, corrosion concerns, safety switch upgrades and clearer circuit protection.",
      level2:
        "Level 2 enquiries in Coogee may include consumer mains, point of attachment issues, service equipment and defect notice questions.",
      general:
        "Planned Coogee work often covers outdoor lighting, apartment power points, smoke alarms, CCTV cabling and weather-rated fittings.",
    },
  },
  bondi: {
    heroDescription:
      "Evaready Electrical helps Bondi apartments, coastal homes, strata properties, cafes, shops and renovated terraces with electrical faults, switchboards, outdoor lighting, smoke alarms, power, data and CCTV.",
    heroNote:
      "Bondi jobs often involve coastal weather exposure, apartment access, strata approvals, older boards and limited parking near busy streets.",
    processDescription:
      "Bondi electrical work is assessed with corrosion, access and urgency in mind. Outdoor electrical issues, tripping circuits and hot fittings need proper testing before repairs.",
    serviceIntro:
      "Common Bondi requests include weather-rated lighting, safety switch faults, apartment repairs, smoke alarms, switchboard upgrades, data cabling, CCTV and shop maintenance.",
  },
  cronulla: {
    heroDescription:
      "Evaready Electrical services Cronulla homes, apartments, coastal townhouses, shops and strata sites with emergency electrical faults, outdoor lighting, switchboards, smoke alarms, power, CCTV, data and Level 2 support.",
    heroNote:
      "Cronulla jobs often involve salt air exposure, outdoor power, renovated apartments, strata access and switchboards that need weather-aware checks.",
    processDescription:
      "Cronulla work is scoped around safety and exposure. Outdoor faults, storm damage, tripping circuits and coastal corrosion concerns need careful isolation and testing.",
    serviceIntro:
      "Typical Cronulla requests include outdoor lighting, pool-area power enquiries, apartment electrical repairs, switchboard upgrades, safety switch faults, smoke alarms and CCTV cabling.",
  },
  "north-sydney": {
    heroDescription:
      "Evaready Electrical supports North Sydney offices, apartments, strata buildings, shops and homes with commercial maintenance, urgent faults, lighting, data, switchboards, metering and Level 2 enquiries.",
    heroNote:
      "North Sydney work often needs loading-zone planning, building management details, lift access, after-hours timing and clear tenant communication.",
    processDescription:
      "North Sydney jobs are scoped around access and downtime. Business faults, office power issues and strata electrical work need clear site contacts, timing and safe testing.",
    serviceIntro:
      "Common North Sydney work includes office lighting, tenancy power, strata faults, data cabling, switchboard checks, emergency call-outs and supply-side Level 2 enquiries.",
  },
  chatswood: {
    heroDescription:
      "Evaready Electrical works across Chatswood apartments, houses, retail spaces, offices and strata buildings with urgent faults, switchboards, lighting, power, data, CCTV, commercial maintenance and Level 2 support.",
    heroNote:
      "Chatswood jobs often involve apartment access, retail trading hours, office fit-out details, parking constraints and high-use switchboards.",
    processDescription:
      "Chatswood electrical work is planned around building access and business impact. Urgent hazards need a call, while planned upgrades benefit from photos and site contacts.",
    serviceIntro:
      "Chatswood enquiries often include office power, shop lighting, apartment faults, data cabling, CCTV, smoke alarms, switchboards and metering questions.",
  },
  "castle-hill": {
    heroDescription:
      "Evaready Electrical helps Castle Hill homes, larger properties, businesses and renovations with switchboard upgrades, EV-ready circuits, lighting, fault finding, data cabling, CCTV and Level 2 enquiries.",
    heroNote:
      "Castle Hill jobs often include larger homes, extra circuits, home offices, outdoor areas, garages, pool equipment, EV charger planning and upgrade-ready switchboards.",
    processDescription:
      "Castle Hill electrical work is assessed around load, access and future use. Larger homes and upgrades can need capacity checks before circuits or switchboards are changed.",
    serviceIntro:
      "Common Castle Hill requests include switchboard capacity checks, lighting upgrades, EV charger planning, outdoor power, CCTV, data points, smoke alarms and renovation wiring.",
  },
  manly: {
    heroDescription:
      "Evaready Electrical services Manly apartments, coastal homes, strata buildings, hospitality venues and shops with urgent faults, outdoor lighting, switchboards, power, smoke alarms, data and CCTV.",
    heroNote:
      "Manly jobs often include coastal exposure, apartment access, busy streets, shop trading hours and outdoor fittings that need weather-rated solutions.",
    processDescription:
      "Manly electrical work is scoped with access and coastal conditions in mind. Outdoor faults, tripping circuits, strata jobs and urgent business issues need clear details fast.",
    serviceIntro:
      "Common Manly enquiries include outdoor lighting, apartment repairs, switchboard upgrades, safety switch faults, smoke alarms, CCTV cabling and shop maintenance.",
  },
  springwood: {
    heroDescription:
      "Evaready Electrical supports Springwood homes, larger blocks, shops, outbuildings and Blue Mountains properties with storm-related faults, outdoor circuits, switchboards, shed power, smoke alarms and Level 2 enquiries.",
    heroNote:
      "Springwood jobs often include larger blocks, long driveways, detached sheds, outdoor circuits, storm-related faults, private pole enquiries and upgrade planning for renovations or extra circuits.",
    processDescription:
      "Springwood electrical work is scoped around access, distance on the property and weather exposure. Photos of the switchboard, driveway, outbuilding and affected circuit help plan the safest next step.",
    serviceIntro:
      "Common Springwood requests include storm fault checks, shed and outbuilding power, switchboard upgrades, safety switch tripping, outdoor lighting, smoke alarms and Level 2 supply enquiries.",
    serviceSummaryText: {
      emergency:
        "Springwood emergency calls often involve storm damage, power loss, tripping safety switches, unsafe outdoor circuits and faults affecting sheds or detached areas.",
      switchboard:
        "Switchboard work in Springwood often means checking older boards, extra circuit capacity, shed loads, safety switches and outdoor circuit protection.",
      level2:
        "Level 2 enquiries around Springwood can involve point of attachment, private pole, consumer mains, service equipment and defect notice concerns.",
      general:
        "Planned Springwood work often covers shed power, outdoor lighting, extra circuits, renovation wiring, smoke alarms and switchboard upgrade planning.",
    },
  },
  wollongong: {
    heroDescription:
      "Evaready Electrical supports Wollongong homes, apartments, shops, warehouses, strata properties and coastal sites with emergency faults, switchboards, lighting, power, hot water electrical, data, CCTV and Level 2 enquiries.",
    heroNote:
      "Wollongong work can involve coastal exposure, apartment access, commercial strips, industrial sites and storm-affected outdoor circuits.",
    processDescription:
      "Wollongong electrical jobs are assessed by risk and site type. A warehouse fault, apartment outage, coastal outdoor issue or hot water circuit problem all need different testing before repair.",
    serviceIntro:
      "Common Wollongong requests include hot water electrical faults, outdoor lighting, switchboard upgrades, data cabling, commercial maintenance, safety switch trips and smoke alarms.",
  },
  hurstville: {
    heroDescription:
      "Evaready Electrical helps Hurstville apartments, houses, shopfronts, medical suites and strata properties with urgent electrical faults, switchboards, lighting, power, CCTV, data cabling and Level 2 enquiries.",
    heroNote:
      "Hurstville jobs often involve unit access, busy commercial streets, older switchboards, strata approvals and clear timing around shop or clinic opening hours.",
    processDescription:
      "Hurstville electrical work is scoped around access and downtime. Apartment, medical and retail jobs need site contacts and parking notes, while unsafe faults should be phoned through first.",
    serviceIntro:
      "Common Hurstville requests include apartment fault finding, shop lighting, data cabling, switchboard upgrades, safety switch trips, smoke alarms and commercial maintenance.",
  },
  kogarah: {
    heroDescription:
      "Evaready Electrical supports Kogarah homes, apartments, health-related businesses, strata blocks and shopfronts with fault finding, switchboards, lighting, power, smoke alarms, data and Level 2 support.",
    heroNote:
      "Kogarah jobs can involve apartment access, medical tenancy work, older unit boards, shopfront maintenance and parking or loading-zone planning.",
    processDescription:
      "Kogarah work is planned around the building type first. Strata and commercial jobs need access notes, while power loss, heat, sparking or burning smells need a direct call.",
    serviceIntro:
      "Typical Kogarah enquiries include lighting repairs, tenancy power, switchboard checks, apartment faults, smoke alarms, data points and defect or service equipment questions.",
  },
  miranda: {
    heroDescription:
      "Evaready Electrical services Miranda houses, apartments, retail spaces, offices and commercial properties with emergency faults, switchboards, lighting, power, CCTV, data, hot water electrical and Level 2 enquiries.",
    heroNote:
      "Miranda work often mixes family homes, busy retail buildings, offices and strata sites, so photos, access notes and business hours help separate urgent repairs from scheduled work.",
    processDescription:
      "Miranda electrical jobs are scoped by risk and site type. Shopping-area faults and business outages need fast attention, while planned upgrades need photos and clear site access.",
    serviceIntro:
      "Common Miranda requests include shop lighting, office power, apartment repairs, switchboard upgrades, CCTV, data cabling, safety switch faults and hot water circuits.",
  },
  sutherland: {
    heroDescription:
      "Evaready Electrical works across Sutherland homes, units, strata properties, offices and local businesses with fault finding, switchboards, lighting, power, smoke alarms, data and Level 2 enquiries.",
    heroNote:
      "Sutherland jobs often include older homes, units near transport, shop maintenance, renovation wiring and switchboard upgrades for extra circuits.",
    processDescription:
      "Sutherland work is assessed around urgency, access and the age of the installation. Unsafe faults are call-first jobs, while planned work is clearer with photos and scope.",
    serviceIntro:
      "Common Sutherland enquiries include switchboard upgrades, safety switch trips, renovation wiring, lighting, power points, data cabling, smoke alarms and Level 2 service questions.",
  },
  randwick: {
    heroDescription:
      "Evaready Electrical helps Randwick apartments, terraces, homes, schools, medical suites and strata buildings with urgent faults, lighting, power, switchboards, smoke alarms, data and CCTV.",
    heroNote:
      "Randwick electrical jobs often involve apartment access, older terraces, school or medical site timing, limited parking and clear communication with strata or building managers.",
    processDescription:
      "Randwick jobs are scoped around access and risk. Hot fittings, power loss and tripping circuits need direct phone support, while planned work benefits from photos and entry notes.",
    serviceIntro:
      "Typical Randwick requests include apartment fault finding, safety switch issues, smoke alarms, shop or clinic lighting, data points, CCTV cabling and switchboard upgrades.",
  },
  alexandria: {
    heroDescription:
      "Evaready Electrical services Alexandria apartments, warehouses, offices, studios, showrooms and hospitality spaces with commercial maintenance, fault finding, lighting, power, data, CCTV and three-phase enquiries.",
    heroNote:
      "Alexandria jobs often involve converted industrial spaces, loading docks, warehouse circuits, office fit-outs, cafe equipment and after-hours access planning.",
    processDescription:
      "Alexandria electrical work is planned around business impact. Equipment circuits, lighting faults and warehouse outages need careful testing, site contacts and timing.",
    serviceIntro:
      "Common Alexandria enquiries include commercial lighting, data cabling, CCTV, three-phase circuits, switchboard checks, emergency faults, fit-out wiring and appliance circuits.",
  },
  "surry-hills": {
    heroDescription:
      "Evaready Electrical supports Surry Hills terraces, apartments, cafes, restaurants, offices and retail spaces with urgent faults, lighting, power, data, switchboards, CCTV and maintenance work.",
    heroNote:
      "Surry Hills work often means tight access, older terrace wiring, hospitality trading hours, tenancy fit-outs and after-hours planning to reduce disruption.",
    processDescription:
      "Surry Hills jobs are scoped around access and operating hours. Hospitality faults, hot fittings and tripping circuits are call-first issues, while fit-outs need clear plans and photos.",
    serviceIntro:
      "Common Surry Hills requests include cafe and restaurant power, pendant lighting, data points, tenancy wiring, switchboard upgrades, smoke alarms and emergency fault finding.",
  },
  zetland: {
    heroDescription:
      "Evaready Electrical helps Zetland apartments, strata buildings, townhouses, offices and new developments with fault finding, lighting, power, EV-ready circuits, smoke alarms, data and CCTV.",
    heroNote:
      "Zetland jobs often involve modern apartment access, building management, basement parking, strata rules, EV charger planning and neat data or lighting additions.",
    processDescription:
      "Zetland work is scoped around building access and approvals. Apartment faults, EV circuits and strata work need clear entry notes, switchboard photos and site contacts.",
    serviceIntro:
      "Typical Zetland enquiries include apartment power issues, downlights, data points, EV charger planning, smoke alarms, CCTV, switchboard checks and appliance circuits.",
  },
  mascot: {
    heroDescription:
      "Evaready Electrical works across Mascot apartments, airport-area businesses, offices, warehouses and homes with urgent electrical faults, commercial maintenance, lighting, power, data, CCTV and switchboards.",
    heroNote:
      "Mascot jobs often involve high-density apartments, commercial sites, parking rules, warehouse access, shift timing and business-critical electrical faults.",
    processDescription:
      "Mascot work is planned around access and downtime. Commercial outages and apartment faults need fast details, while scheduled jobs need photos and building contact information.",
    serviceIntro:
      "Common Mascot requests include office lighting, warehouse power, data cabling, apartment repairs, switchboard checks, CCTV, safety switch trips and hot water electrical faults.",
  },
  auburn: {
    heroDescription:
      "Evaready Electrical helps Auburn homes, units, warehouses, retail spaces and light-industrial sites with emergency faults, switchboards, lighting, power, data, CCTV, three-phase and Level 2 enquiries.",
    heroNote:
      "Auburn electrical jobs often mix older homes, busy shops, warehouses, machinery loads, commercial tenancies and access that needs clear site contact details.",
    processDescription:
      "Auburn work is scoped around load, safety and business impact. Warehouse and shop faults need fast testing, while planned upgrades need photos of the board and equipment.",
    serviceIntro:
      "Common Auburn requests include switchboard upgrades, three-phase circuits, commercial lighting, data cabling, CCTV, safety switch trips, smoke alarms and service equipment questions.",
  },
  granville: {
    heroDescription:
      "Evaready Electrical services Granville houses, apartments, workshops, warehouses and shops with fault finding, switchboards, lighting, power, data cabling, CCTV, hot water electrical and Level 2 enquiries.",
    heroNote:
      "Granville jobs often include older switchboards, industrial access, shopfront maintenance, units, machinery circuits and renovation wiring.",
    processDescription:
      "Granville electrical work is scoped by urgency and property type. Industrial or commercial outages need fast phone details, while home upgrades are clearer with photos and access notes.",
    serviceIntro:
      "Typical Granville enquiries include power faults, switchboard upgrades, workshop circuits, CCTV, data points, smoke alarms, lighting, hot water circuits and Level 2 service questions.",
  },
  fairfield: {
    heroDescription:
      "Evaready Electrical supports Fairfield homes, apartments, retail shops, community facilities and commercial sites with urgent faults, switchboards, lighting, power, CCTV, data and Level 2 support.",
    heroNote:
      "Fairfield electrical work often involves busy shopping strips, older homes, strata access, commercial tenancy maintenance and clear planning around business hours.",
    processDescription:
      "Fairfield jobs are triaged by risk first. Burning smells, sparking and power loss should be called through, while planned lighting, CCTV or switchboard work can be quoted from photos.",
    serviceIntro:
      "Common Fairfield requests include shop lighting, home fault finding, switchboard upgrades, smoke alarms, CCTV, data cabling, safety switches and Level 2 enquiries.",
  },
  cabramatta: {
    heroDescription:
      "Evaready Electrical helps Cabramatta homes, units, restaurants, shops and commercial properties with urgent electrical faults, lighting, power, switchboards, data, CCTV and maintenance work.",
    heroNote:
      "Cabramatta jobs often involve hospitality equipment, shop trading hours, older wiring, busy parking, strata access and electrical faults that affect business operation.",
    processDescription:
      "Cabramatta electrical work is planned around safety and timing. Restaurant or shop faults need fast details, while planned upgrades need photos, access notes and clear scope.",
    serviceIntro:
      "Typical Cabramatta requests include restaurant power, shop lighting, data cabling, CCTV, switchboard upgrades, safety switch faults, smoke alarms and appliance circuits.",
  },
  moorebank: {
    heroDescription:
      "Evaready Electrical services Moorebank homes, duplexes, warehouses, logistics sites, workshops and commercial units with faults, switchboards, lighting, power, data, CCTV and three-phase enquiries.",
    heroNote:
      "Moorebank jobs often include warehouse lighting, loading areas, machinery circuits, larger homes, outdoor power and access through industrial estates.",
    processDescription:
      "Moorebank work is scoped around site use and load. Commercial faults, warehouse outages and three-phase questions need good equipment details and switchboard photos.",
    serviceIntro:
      "Common Moorebank enquiries include warehouse lighting, three-phase circuits, data cabling, CCTV, switchboard checks, emergency faults, outdoor power and renovation wiring.",
  },
  prestons: {
    heroDescription:
      "Evaready Electrical works across Prestons homes, new estates, warehouses, showrooms and commercial sites with fault finding, switchboards, lighting, power, data, CCTV and Level 2 enquiries.",
    heroNote:
      "Prestons jobs often include new-build additions, warehouse fit-outs, business power faults, home offices, garage circuits and load checks for extra equipment.",
    processDescription:
      "Prestons electrical work is planned around property age and demand. Newer homes may need extra circuits, while warehouses and showrooms need clear access and equipment information.",
    serviceIntro:
      "Typical Prestons requests include commercial lighting, extra circuits, switchboard capacity checks, CCTV, data cabling, smoke alarms, EV-ready work and fault finding.",
  },
  campbelltown: {
    heroDescription:
      "Evaready Electrical supports Campbelltown homes, units, shops, workshops, builders and commercial properties with emergency faults, switchboards, lighting, power, hot water electrical, data and CCTV.",
    heroNote:
      "Campbelltown jobs often include older homes, growing estates, shop maintenance, builder work, hot water circuits and upgrade planning for extra loads.",
    processDescription:
      "Campbelltown work is scoped around urgency, access and property type. Unsafe faults need a call, while planned switchboard, lighting or renovation work needs photos and scope.",
    serviceIntro:
      "Common Campbelltown enquiries include switchboard upgrades, hot water electrical faults, smoke alarms, safety switch trips, lighting, power points, CCTV and renovation wiring.",
  },
  narellan: {
    heroDescription:
      "Evaready Electrical helps Narellan homes, larger properties, new builds, shops and commercial sites with lighting, power, switchboards, EV-ready circuits, data, CCTV and Level 2 enquiries.",
    heroNote:
      "Narellan jobs often include newer homes, renovations, outdoor areas, garage circuits, larger blocks, shopfronts and switchboards being prepared for extra loads.",
    processDescription:
      "Narellan work is assessed around future use and capacity. Extra circuits, EV planning, outdoor power and renovation wiring need switchboard photos and clear job details.",
    serviceIntro:
      "Typical Narellan requests include EV-ready circuits, outdoor lighting, switchboard capacity checks, smoke alarms, power points, CCTV, data cabling and builder wiring.",
  },
  concord: {
    heroDescription:
      "Evaready Electrical supports Concord homes, renovated properties, apartments, shops and strata sites with faults, switchboards, lighting, power, smoke alarms, data, CCTV and Level 2 enquiries.",
    heroNote:
      "Concord electrical jobs often involve larger homes, renovations, older wiring, strata access, outdoor areas and neat lighting or power upgrades.",
    processDescription:
      "Concord work is scoped around the age and layout of the property. Renovations, extra circuits and outdoor lighting need photos, while hazards should be phoned through first.",
    serviceIntro:
      "Common Concord requests include renovation wiring, switchboard upgrades, outdoor power, lighting, smoke alarms, data points, CCTV and safety switch faults.",
  },
  "five-dock": {
    heroDescription:
      "Evaready Electrical helps Five Dock houses, apartments, cafes, shops and strata buildings with urgent faults, switchboards, lighting, power, smoke alarms, data cabling and maintenance.",
    heroNote:
      "Five Dock jobs often include older homes, renovated units, cafe maintenance, shop lighting, strata access and tight parking near commercial streets.",
    processDescription:
      "Five Dock work is planned around access and the property type. Hospitality and retail faults need fast phone details, while planned upgrades need photos and timing notes.",
    serviceIntro:
      "Typical Five Dock enquiries include cafe power, shop lighting, apartment repairs, switchboard upgrades, smoke alarms, safety switch trips and data cabling.",
  },
  homebush: {
    heroDescription:
      "Evaready Electrical works across Homebush homes, apartments, strata buildings, offices and commercial properties with fault finding, switchboards, lighting, power, data, CCTV and Level 2 support.",
    heroNote:
      "Homebush jobs often involve apartment access, strata processes, office timing, older homes, parking rules and switchboards that need clear labelling or added protection.",
    processDescription:
      "Homebush electrical work is scoped around building access and urgency. Apartment faults and business outages need clear site contacts, while planned work needs photos and scope.",
    serviceIntro:
      "Common Homebush requests include apartment power faults, office lighting, data cabling, CCTV, switchboard checks, smoke alarms, EV planning and Level 2 service questions.",
  },
  blacktown: {
    heroDescription:
      "Evaready Electrical services Blacktown homes, townhouses, units, workshops, shops and commercial properties with emergency faults, switchboards, lighting, power, data, CCTV and Level 2 enquiries.",
    heroNote:
      "Blacktown jobs often include family homes, older boards, new circuits, shop maintenance, strata access, workshops and power faults that need clear testing.",
    processDescription:
      "Blacktown work is triaged by hazard and property type. Power loss, burning smells and sparking are call-first issues; upgrades are clearer with switchboard photos and job details.",
    serviceIntro:
      "Typical Blacktown requests include switchboard upgrades, extra power points, lighting, smoke alarms, CCTV, data cabling, safety switch trips and hot water electrical faults.",
  },
  penrith: {
    heroDescription:
      "Evaready Electrical supports Penrith homes, larger blocks, shops, workshops, warehouses and commercial properties with faults, switchboards, lighting, power, data, CCTV and Level 2 enquiries.",
    heroNote:
      "Penrith jobs often include larger properties, outdoor circuits, sheds, workshops, new estates, commercial sites and upgrade planning for extra electrical demand.",
    processDescription:
      "Penrith work is scoped around access, load and distance on the property. Photos of sheds, boards, outdoor areas and equipment help quote planned work clearly.",
    serviceIntro:
      "Common Penrith requests include shed power, outdoor lighting, switchboard upgrades, three-phase questions, CCTV, data points, smoke alarms and fault finding.",
  },
  "baulkham-hills": {
    heroDescription:
      "Evaready Electrical helps Baulkham Hills homes, larger properties, townhouses, offices and shops with switchboards, EV-ready circuits, lighting, power, CCTV, data and Level 2 enquiries.",
    heroNote:
      "Baulkham Hills jobs often involve larger homes, home offices, outdoor entertaining areas, garages, pools, EV planning and switchboard capacity checks.",
    processDescription:
      "Baulkham Hills electrical work is assessed around load and future use. Extra circuits, EV planning, outdoor power and renovations need clear photos and switchboard details.",
    serviceIntro:
      "Typical Baulkham Hills requests include switchboard upgrades, EV-ready circuits, outdoor lighting, data cabling, CCTV, smoke alarms, safety switches and renovation wiring.",
  },
  kellyville: {
    heroDescription:
      "Evaready Electrical works across Kellyville homes, new estates, larger properties, townhouses and local businesses with lighting, power, switchboards, EV-ready circuits, data, CCTV and faults.",
    heroNote:
      "Kellyville jobs often include newer homes, home offices, garage circuits, EV charger planning, outdoor lighting, security cameras and switchboards being prepared for extra load.",
    processDescription:
      "Kellyville work is scoped around capacity and finish. Extra circuits, EV-ready work and outdoor electrical additions need photos, access details and clear switchboard information.",
    serviceIntro:
      "Common Kellyville requests include EV planning, CCTV, data points, outdoor lighting, switchboard capacity checks, smoke alarms, power points and renovation wiring.",
  },
  "rouse-hill": {
    heroDescription:
      "Evaready Electrical supports Rouse Hill homes, townhouses, new builds, apartments and businesses with lighting, power, switchboards, EV-ready circuits, data, CCTV and electrical fault finding.",
    heroNote:
      "Rouse Hill jobs often involve newer homes, garage circuits, apartment access, security cameras, outdoor areas and planned upgrades for modern electrical loads.",
    processDescription:
      "Rouse Hill electrical work is planned around building type and future demand. EV-ready circuits, CCTV and extra power need board photos and clear access notes.",
    serviceIntro:
      "Typical Rouse Hill enquiries include extra circuits, EV planning, CCTV, data cabling, lighting, smoke alarms, safety switch faults and switchboard capacity checks.",
  },
  ryde: {
    heroDescription:
      "Evaready Electrical services Ryde homes, units, apartments, offices, shops and strata buildings with fault finding, switchboards, lighting, power, smoke alarms, data, CCTV and Level 2 support.",
    heroNote:
      "Ryde jobs often include apartment access, older homes, office maintenance, strata coordination, parking details and switchboards needing extra protection.",
    processDescription:
      "Ryde work is scoped around access and urgency. Apartment or business faults need site contacts and fast details, while planned work is clearer with photos and scope.",
    serviceIntro:
      "Common Ryde requests include apartment repairs, office lighting, power points, switchboard upgrades, smoke alarms, data cabling, CCTV and Level 2 enquiries.",
  },
  "macquarie-park": {
    heroDescription:
      "Evaready Electrical helps Macquarie Park offices, apartments, commercial tenancies, retail spaces and strata buildings with power, lighting, data, CCTV, switchboards and urgent fault finding.",
    heroNote:
      "Macquarie Park work often involves office buildings, apartment towers, loading docks, access cards, business hours and data or power changes for tenancies.",
    processDescription:
      "Macquarie Park electrical jobs are scoped around building access and downtime. Office and tenancy work needs site contacts, timing and clear details of affected circuits.",
    serviceIntro:
      "Typical Macquarie Park requests include office lighting, data cabling, tenancy power, apartment faults, switchboard checks, CCTV and after-hours commercial maintenance.",
  },
  brookvale: {
    heroDescription:
      "Evaready Electrical works across Brookvale homes, units, warehouses, workshops, showrooms and commercial sites with faults, lighting, power, data, CCTV, switchboards and three-phase enquiries.",
    heroNote:
      "Brookvale jobs often involve industrial units, warehouse lighting, machinery circuits, showrooms, shopfronts and access through busy commercial estates.",
    processDescription:
      "Brookvale work is scoped around commercial impact and load. Warehouse faults, equipment circuits and three-phase questions need switchboard photos and equipment details.",
    serviceIntro:
      "Common Brookvale requests include warehouse lighting, three-phase circuits, CCTV, data cabling, shop maintenance, switchboard checks and emergency fault finding.",
  },
  "dee-why": {
    heroDescription:
      "Evaready Electrical supports Dee Why apartments, coastal homes, shops, strata buildings and hospitality venues with urgent faults, lighting, power, switchboards, smoke alarms, data and CCTV.",
    heroNote:
      "Dee Why electrical work often involves coastal exposure, apartment access, shop trading hours, strata coordination, outdoor fittings and parking constraints.",
    processDescription:
      "Dee Why jobs are scoped around access and exposure. Outdoor faults, tripping circuits and apartment issues need careful testing, while planned work needs photos and entry notes.",
    serviceIntro:
      "Typical Dee Why requests include apartment repairs, outdoor lighting, safety switch trips, smoke alarms, switchboard upgrades, CCTV, data cabling and shop maintenance.",
  },
};

function clampMetaDescription(description: string) {
  if (description.length <= 155) {
    return description;
  }

  const trimmed = description.slice(0, 152).trimEnd();
  const lastSpace = trimmed.lastIndexOf(" ");
  const shortened = trimmed
    .slice(0, lastSpace > 120 ? lastSpace : trimmed.length)
    .replace(/[,\s;:]+$/, "")
    .replace(/\b(?:and|or)$/i, "")
    .trimEnd()
    .replace(/[,\s;:]+$/, "")
    .replace(/\.+$/, "");

  return `${shortened}.`;
}

function buildOverrideMetaDescription(
  copy: SuburbPageCopy,
  override: SuburbCopyOverride,
) {
  const prefix = `${copy.metaDescription.split("?")[0]}? `;
  const detail = (override.heroDescription ?? override.serviceIntro ?? copy.heroDescription)
    .replace(
      /^Evaready Electrical (?:helps|supports|services|works across|works) .+? with /,
      "Evaready Electrical helps with ",
    )
    .replace(
      /^(?:Common|Typical) .+? requests include /,
      "Evaready Electrical helps with ",
    );

  return clampMetaDescription(`${prefix}${detail}`);
}

function applySuburbCopyOverride(
  copy: SuburbPageCopy,
  suburbSlug: string,
): SuburbPageCopy {
  const override = topSuburbCopyOverrides[suburbSlug];

  if (!override) {
    return copy;
  }

  return {
    ...copy,
    ...override,
    metaDescription:
      override.metaDescription ?? buildOverrideMetaDescription(copy, override),
    faqAnswers: {
      ...copy.faqAnswers,
      ...override.faqAnswers,
    },
    serviceSummaries: copy.serviceSummaries.map((summary) => ({
      ...summary,
      text: override.serviceSummaryText?.[summary.intent] ?? summary.text,
    })),
    trustItems: override.trustItems ?? copy.trustItems,
  };
}

export function getSuburbPageCopy(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): SuburbPageCopy {
  const seed = stableHash(
    `${coverageRegion.slug}:${coverageArea.slug}:${coverageSuburb.slug}:${coverageSuburb.postcode}`,
  );
  const context = getLocalPageContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );
  const suburbLabel = `${coverageSuburb.name} ${coverageSuburb.postcode}`;
  const areaLabel = coverageArea.name;
  const regionLabel = coverageRegion.name;
  const suburbPosition = Math.max(
    coverageArea.suburbs.findIndex(
      (suburbItem) => suburbItem.slug === coverageSuburb.slug,
    ),
    0,
  );

  const heroDescription = pick(
    [
      `Evaready Electrical helps ${suburbLabel} homes, businesses and strata properties with urgent faults, Level 2 electrical work, switchboard upgrades, lighting, power points, smoke alarms, hot water circuits, split-system electrical support, CCTV, data cabling and planned electrical work.`,
      `For ${suburbLabel}, Evaready Electrical supports ${context.propertyMix} with emergency electrical faults, consumer mains and metering enquiries, switchboard upgrades, hot water electrical issues, air-conditioning electrical support, CCTV, data and everyday electrical work.`,
      `Electrical work in ${suburbLabel} can range from urgent faults to planned upgrades. Evaready Electrical helps with power loss, safety switch tripping, Level 2 enquiries, switchboards, hot water circuits, split-system electrical support, CCTV, data cabling and general repairs.`,
      `Evaready Electrical services ${suburbLabel} with local electrical support for ${context.propertyMix}. That includes emergency faults, Level 2 work, switchboard upgrades, lighting, power, smoke alarms, hot water electrical faults, air-conditioning electrical support, CCTV and data cabling.`,
    ],
    seed,
    suburbPosition + 5,
  );

  const heroNote = pick(
    [
      `${coverageArea.description} This ${context.setting} often needs clear job details, photos and safe fault testing before work begins.`,
      `${coverageSuburb.name} is part of the ${areaLabel} area in ${regionLabel}. Planned enquiries are easier to assess when they include ${context.accessDetail}.`,
      `${coverageRegion.travelNote} For ${coverageSuburb.name}, the best first step depends on the issue: call for unsafe faults, or send photos and details for planned work.`,
      `${coverageArea.description} Typical enquiries in this pocket include ${context.plannedWork}, along with urgent fault checks when something feels unsafe.`,
    ],
    seed,
    suburbPosition + 13,
  );

  const processSteps = pick(
    [
      [
        {
          title: "Check the issue",
          text: `The job type, address, access and urgency are confirmed for ${coverageSuburb.name} before the next step is agreed.`,
        },
        {
          title: "Review the evidence",
          text: `Photos, symptoms and switchboard details help narrow down ${context.emergencySignals}.`,
        },
        {
          title: "Test before repair",
          text: "Electrical faults are tested carefully before parts, upgrades or repair options are recommended.",
        },
        {
          title: "Leave clear notes",
          text: `For ${areaLabel} jobs, follow-up notes can include photos, defect details or upgrade recommendations where needed.`,
        },
      ],
      [
        {
          title: "Triage the risk",
          text: `Unsafe issues in ${coverageSuburb.name} are handled as call-first enquiries, especially where there is heat, smoke or sparking.`,
        },
        {
          title: "Confirm the site",
          text: `Address, access and ${context.accessDetail} help make the visit more efficient.`,
        },
        {
          title: "Find the fault",
          text: `Testing focuses on the circuit, appliance, fitting or switchboard area causing the problem.`,
        },
        {
          title: "Plan the fix",
          text: `Repairs and upgrades are explained clearly, whether it is a small fault or larger ${context.switchboardDetail}.`,
        },
      ],
      [
        {
          title: "Start with details",
          text: `For ${coverageSuburb.name}, clear job details include the postcode, photos and a short description of the electrical issue.`,
        },
        {
          title: "Confirm the right service",
          text: `Your details help confirm whether the job is emergency, residential, commercial, switchboard or Level 2 electrical work.`,
        },
        {
          title: "Work safely",
          text: "Testing and isolation come before repairs so the actual cause is understood.",
        },
        {
          title: "Document next steps",
          text: `Where useful, you get practical next steps for ${context.plannedWork} or future electrical upgrades.`,
        },
      ],
    ],
    seed,
    suburbPosition + 17,
  );

  const serviceSummaries = [
    {
      intent: "emergency" as const,
      title: pick(
        [
          `Emergency electrician in ${coverageSuburb.name}`,
          `Urgent electrical faults in ${coverageSuburb.name}`,
          `Call-first electrical hazards in ${coverageSuburb.name}`,
        ],
        seed,
        11,
      ),
      text: pick(
        [
          `Call first in ${coverageSuburb.name} for power outages, burning smells, sparking, safety switch tripping, storm damage, water-affected fittings or anything electrical that feels unsafe.`,
          `Emergency enquiries in ${suburbLabel} often involve ${context.emergencySignals}. Stop using the affected circuit where safe and call before touching the area again.`,
          `When ${coverageSuburb.name} homes, shops or strata properties have power loss, smoke, heat, sparking or repeated tripping, the first step is a direct phone call.`,
        ],
        seed,
        13,
      ),
    },
    {
      intent: "level2" as const,
      title: pick(
        [
          `Level 2 electrician in ${coverageSuburb.name}`,
          `Supply-side electrical work in ${coverageSuburb.name}`,
          `Consumer mains support in ${coverageSuburb.name}`,
        ],
        seed,
        17,
      ),
      text: pick(
        [
          `Level 2 electrical enquiries in ${coverageSuburb.name} can involve consumer mains, metering, defect notices, overhead or underground services, point of attachment issues and other supply-side work.`,
          `For ${coverageSuburb.name} properties, ${context.level2Detail} should be assessed with clear photos and any paperwork from the network, retailer or supply authority.`,
          `${regionLabel} Level 2 enquiries can include consumer mains, metering, point of attachment issues, defect notice repairs and overhead or underground service work.`,
        ],
        seed,
        19,
      ),
    },
    {
      intent: "switchboard" as const,
      title: pick(
        [
          `Switchboard upgrades in ${coverageSuburb.name}`,
          `Safety switch and RCBO work in ${coverageSuburb.name}`,
          `Board faults and upgrades in ${coverageSuburb.name}`,
        ],
        seed,
        23,
      ),
      text: pick(
        [
          `Switchboard requests around ${coverageSuburb.name} can include ceramic fuse replacement, safety switches, RCBOs, overloaded circuits, burnt wiring checks and capacity planning for EV chargers or air-conditioning.`,
          `${areaLabel} switchboard work often needs a careful look at ${context.switchboardDetail}, nuisance tripping, old fuse gear and added appliance loads before the right upgrade path is chosen.`,
          `For ${suburbLabel}, switchboard enquiries commonly cover safety switch upgrades, RCBO protection, burnt wiring, overloaded circuits and older boards that need proper testing.`,
        ],
        seed,
        29,
      ),
    },
    {
      intent: "faultFinding" as const,
      title: pick(
        [
          `Electrical fault finding in ${coverageSuburb.name}`,
          `Testing tripping circuits in ${coverageSuburb.name}`,
          `Fault isolation in ${coverageSuburb.name}`,
        ],
        seed,
        31,
      ),
      text: pick(
        [
          `Fault finding in ${coverageSuburb.name} covers intermittent faults, tripping circuits, damaged wiring, hot power points, flickering lights and careful testing to isolate the cause.`,
          `For ${suburbLabel}, symptoms such as nuisance tripping, hot switches, flickering lights or damaged fittings should be checked before parts are replaced.`,
          `Electrical fault testing around ${areaLabel} focuses on the affected circuit, appliance, fitting or switchboard so the repair path is clear.`,
        ],
        seed,
        37,
      ),
    },
    {
      intent: "hotWater" as const,
      title: pick(
        [
          `Hot water electrical in ${coverageSuburb.name}`,
          `Hot water circuit support in ${coverageSuburb.name}`,
          `No hot water electrical checks in ${coverageSuburb.name}`,
        ],
        seed,
        41,
      ),
      text: pick(
        [
          `Hot water electrical help in ${coverageSuburb.name} can include hot water circuits, isolators, safety switches, electrical supply faults and heat pump hot water support where relevant.`,
          `If there is no hot water in ${suburbLabel}, the electrical circuit, isolator, safety switch and supply side of the system may need to be checked.`,
          `Evaready can help ${coverageSuburb.name} customers with hot water circuit faults, isolator issues, tripping safety switches and electrical support for replacement systems.`,
        ],
        seed,
        43,
      ),
    },
    {
      intent: "aircon" as const,
      title: pick(
        [
          `Air-conditioning electrical support in ${coverageSuburb.name}`,
          `Split-system electrical support in ${coverageSuburb.name}`,
          `AC circuits and isolators in ${coverageSuburb.name}`,
        ],
        seed,
        47,
      ),
      text: pick(
        [
          `Air-conditioning electrical support in ${coverageSuburb.name} can include dedicated circuits, isolators, switchboard capacity checks and outdoor unit power.`,
          `Split-system enquiries in ${suburbLabel} may need electrical supply planning, safety switch checks, outdoor unit power and clear coordination with appropriately licensed technicians where required.`,
          `ARCtick Refrigerant Handling Licence L157323 - Split Systems (1) applies to eligible split systems, hot water heat pumps and swimming pool heat pumps under licence scope.`,
        ],
        seed,
        53,
      ),
    },
    {
      intent: "dataCctv" as const,
      title: pick(
        [
          `CCTV and data cabling in ${coverageSuburb.name}`,
          `Data points and CCTV support in ${coverageSuburb.name}`,
          `Communications cabling in ${coverageSuburb.name}`,
        ],
        seed,
        59,
      ),
      text: pick(
        [
          `CCTV and data work in ${coverageSuburb.name} can include CCTV cabling, data points and communications cabling under Open Cabler Registration 46691.`,
          `For ${suburbLabel}, CCTV cameras, data points and communications cabling are planned with clear access details and the right cabling scope.`,
          `Open Cabler Registration 46691 supports eligible data, CCTV and communications cabling enquiries across ${areaLabel}.`,
        ],
        seed,
        61,
      ),
    },
    {
      intent: "general" as const,
      title: pick(
        [
          `General electrical work in ${coverageSuburb.name}`,
          `Lighting, power and maintenance in ${coverageSuburb.name}`,
          `Planned electrical repairs in ${coverageSuburb.name}`,
        ],
        seed,
        67,
      ),
      text: pick(
        [
          `General electrical work in ${coverageSuburb.name} can cover power points, lighting, smoke alarms, ceiling fans, renovations, commercial maintenance, strata jobs and small repairs.`,
          `For everyday electrical work in ${suburbLabel}, common requests include ${context.plannedWork}, smoke alarms, lighting, power and repairs around ${context.propertyMix}.`,
          `Planned electrical enquiries in ${coverageSuburb.name} are easier to review when you send photos, access details, job notes and the preferred timing through the secure booking form.`,
        ],
        seed,
        71,
      ),
    },
  ];

  const generatedCopy: SuburbPageCopy = {
    ctaHeading: pick(
      [
        `Electrical help in ${coverageSuburb.name}, with a clear next step.`,
        `Planning electrical work in ${coverageSuburb.name}? Send the details through.`,
        `For ${suburbLabel} electrical faults or upgrades, start here.`,
    ],
    seed,
    41,
  ),
    faqAnswers: {
      combined: `Yes. Evaready Electrical can help with switchboards, fault finding, hot water electrical circuits, split-system electrical support, CCTV and data cabling, and general electrical work in ${coverageSuburb.name} under the relevant licence scope.`,
      emergency: `Yes. Call first for power loss, burning smells, sparking, tripping circuits, storm damage or any fault in ${coverageSuburb.name} that feels unsafe.`,
      level2: `Evaready Electrical can assist with Level 2 electrical work in ${coverageSuburb.name}, including consumer mains, metering, defect notices, point of attachment issues and supply-side electrical issues.`,
      quote: `Yes. For planned work in ${suburbLabel}, use the secure booking form to send your address, contact details, job notes and photos. If there is heat, smoke, sparking or power loss, call first.`,
      service: `Yes. Evaready Electrical provides emergency, Level 2 and general electrical support across ${coverageSuburb.name} and nearby suburbs.`,
    },
    faqHeading: pick(
      [
        `Questions about electrical work in ${coverageSuburb.name}.`,
        `Common ${coverageSuburb.name} electrical questions.`,
        `Helpful electrical questions for ${coverageSuburb.name}.`,
      ],
      seed,
      43,
    ),
    faqIntro: `Use these quick answers to decide whether to call for an urgent hazard or open the quote form for planned work in ${coverageSuburb.name}.`,
    heroDescription,
    heroNote,
    metaDescription: clampMetaDescription(
      pick(
        [
          `Need an electrician in ${coverageSuburb.name}? Evaready helps with emergency faults, Level 2, switchboards, hot water, aircon, CCTV/data and general electrical work.`,
          `Need electrical help in ${suburbLabel}? Emergency faults, Level 2, switchboards, hot water, aircon, CCTV/data and general electrical work across ${areaLabel}.`,
          `Evaready helps ${coverageSuburb.name} with urgent faults, Level 2, switchboards, hot water electrical, aircon, CCTV/data and planned electrical work.`,
        ],
        seed,
        45,
      ),
    ),
    processDescription: pick(
      [
        `For ${coverageSuburb.name}, the process starts by understanding the fault, the property type and the level of urgency. Planned jobs are easier to price when the request includes photos, while unsafe faults should be phoned through directly.`,
        `${coverageSuburb.name} jobs are handled by separating urgent risks from scheduled work. The aim is to identify the fault clearly, explain the practical repair path and keep the communication straightforward.`,
        `Every ${suburbLabel} enquiry is treated according to the site and the electrical risk. Clear details help with planned work, while hazards like heat, smoke or sparking need direct phone contact.`,
      ],
      seed,
      47,
    ),
    processHeading: pick(
      [
        `A clear way to handle ${coverageSuburb.name} electrical work.`,
        `How electrical jobs are approached in ${coverageSuburb.name}.`,
        `From first call to safe repair in ${coverageSuburb.name}.`,
      ],
      seed,
      53,
    ),
    processLabel: pick(
      [
        `How we work in ${coverageSuburb.name}`,
        `${coverageSuburb.name} job process`,
        `Local electrical support`,
      ],
      seed,
      59,
    ),
    processSteps,
    serviceIntro: `For ${coverageSuburb.name}, Evaready Electrical brings emergency, Level 2, switchboard, hot water, air-conditioning electrical, CCTV/data and general electrical support together on one local page.`,
    serviceLinks: [
      {
        title: `Emergency electrician ${coverageSuburb.name}`,
        href: "/emergency-electrician-sydney",
        text: `Urgent help for ${context.emergencySignals} in ${coverageSuburb.name}.`,
      },
      {
        title: `Level 2 electrician ${coverageSuburb.name}`,
        href: "/level-2-electrician-sydney",
        text: `Support with ${context.level2Detail} around ${suburbLabel}.`,
      },
      {
        title: `Switchboard upgrades ${coverageSuburb.name}`,
        href: "/services/switchboard-upgrades-sydney",
        text: `Upgrade enquiries covering ${context.switchboardDetail}.`,
      },
      {
        title: `Electrical fault finding ${coverageSuburb.name}`,
        href: "/electrical-faults",
        text: `Fault guides and testing advice for tripping circuits, hot fittings and unsafe symptoms.`,
      },
      {
        title: `Electrical services ${coverageSuburb.name}`,
        href: "/services",
        text: `Browse electrical services for urgent faults, planned work and property upgrades.`,
      },
      {
        title: `Hot water electrician ${coverageSuburb.name}`,
        href: "/services/hot-water-system-electrician-sydney",
        text: `Electrical support for hot water circuits, isolators, safety switches and heat pump enquiries.`,
      },
      {
        title: `Air conditioning electrician ${coverageSuburb.name}`,
        href: "/services/split-system-air-conditioning-sydney",
        text: `Electrical support for split systems, isolators, dedicated circuits and outdoor unit power.`,
      },
      {
        title: `CCTV and data cabling ${coverageSuburb.name}`,
        href: "/services/data-cabling-electrician-sydney",
        text: `Data points, CCTV cabling and communications cabling under the relevant registration scope.`,
      },
      {
        title: `Power points and lighting ${coverageSuburb.name}`,
        href: "/services/power-point-installation-sydney",
        text: `Planned help with lighting, power points, smoke alarms, fans and maintenance.`,
      },
      {
        title: `Service areas near ${coverageSuburb.name}`,
        href: "/service-areas",
        text: `Browse nearby suburbs, areas and regions covered across Sydney and surrounding regions.`,
      },
    ],
    serviceSummaries,
    servicesHeading: `Electrical services available in ${coverageSuburb.name}.`,
    trustItems: [
      `NSW Electrical Licence 398937C`,
      `ABN 44 650 697 797`,
      `Open 24/7 for urgent electrical faults`,
      `Level 2 Electrical Work`,
      `Open Cabler Registration 46691`,
      `ARCtick Refrigerant Handling Licence L157323 - Split Systems (1)`,
      pick(
        [
          `Electrical help for ${coverageSuburb.postcode}`,
          `Local support around ${areaLabel}`,
          "Call first for unsafe faults",
        ],
        seed,
        67,
      ),
    ],
  };

  return applySuburbCopyOverride(generatedCopy, coverageSuburb.slug);
}

export function getRegionBySlug(regionSlug: string) {
  return coverageRegions.find((coverageRegion) => coverageRegion.slug === regionSlug);
}

export function getAreaBySlug(regionSlug: string, areaSlug: string) {
  const coverageRegion = getRegionBySlug(regionSlug);

  return coverageRegion?.areas.find((coverageArea) => coverageArea.slug === areaSlug);
}

export function getSuburbBySlug(
  regionSlug: string,
  areaSlug: string,
  suburbSlug: string,
) {
  const coverageArea = getAreaBySlug(regionSlug, areaSlug);

  return coverageArea?.suburbs.find(
    (coverageSuburb) => coverageSuburb.slug === suburbSlug,
  );
}

export function getRegionPaths() {
  return coverageRegions.map((coverageRegion) => ({
    region: coverageRegion.slug,
  }));
}

export function getAreaPaths() {
  return coverageRegions.flatMap((coverageRegion) =>
    coverageRegion.areas.map((coverageArea) => ({
      area: coverageArea.slug,
      region: coverageRegion.slug,
    })),
  );
}

export function getSuburbPaths() {
  return coverageRegions.flatMap((coverageRegion) =>
    coverageRegion.areas.flatMap((coverageArea) =>
      coverageArea.suburbs.map((coverageSuburb) => ({
        area: coverageArea.slug,
        region: coverageRegion.slug,
        suburb: coverageSuburb.slug,
      })),
    ),
  );
}
