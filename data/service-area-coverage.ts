import { business, getEmergencyResponseForRegion } from "./site";
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
  callQuoteGuidance: {
    callFirst: string[];
    quoteForm: string[];
  };
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
  heroSupportLine: string;
  landingServiceCards: {
    href: string;
    intent: "emergency" | "general" | "level2";
    items: string[];
    text: string;
    title: string;
  }[];
  level2QuoteChecklist: string[];
  localHighlights: {
    text: string;
    title: string;
  }[];
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

const canterburyBankstownCommercialSuburbs = new Set([
  "bankstown",
  "birrong",
  "chester-hill",
  "condell-park",
  "greenacre",
  "kingsgrove",
  "milperra",
  "padstow",
  "potts-hill",
  "revesby",
  "villawood",
  "yagoona",
]);

const canterburyBankstownStrataSuburbs = new Set([
  "belfield",
  "belmore",
  "campsie",
  "canterbury",
  "clemton-park",
  "lakemba",
  "mount-lewis",
  "narwee",
  "punchbowl",
  "riverwood",
  "roselands",
  "wiley-park",
]);

const canterburyBankstownHomeSuburbs = new Set([
  "bass-hill",
  "beverly-hills",
  "earlwood",
  "east-hills",
  "georges-hall",
  "lansdowne",
  "padstow-heights",
  "panania",
  "picnic-point",
  "revesby-heights",
  "sefton",
]);

function getCanterburyBankstownLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "canterbury-bankstown-and-inner-south-west" ||
    coverageArea.slug !== "canterbury-bankstown"
  ) {
    return null;
  }

  if (canterburyBankstownCommercialSuburbs.has(coverageSuburb.slug)) {
    return {
      accessDetail:
        "business hours, loading or warehouse access, tenancy contacts, switchboard photos and any equipment affected by the outage",
      commonJobs:
        "commercial fault finding, warehouse lighting, shop power, switchboard upgrades, hot water circuits, CCTV/data and Level 2 enquiries",
      emergencySignals:
        "business outages, partial power loss, hot outlets, circuit tripping, damaged equipment circuits and storm or water-affected electrical areas",
      level2Detail:
        "consumer mains, service equipment, metering, defect notices, point of attachment issues and supply capacity questions",
      plannedWork:
        "warehouse lighting, shop maintenance, extra circuits, data cabling, CCTV, switchboard capacity checks and planned quote work",
      propertyMix:
        "homes, shopfronts, commercial tenancies, workshops, warehouses and small business sites",
      setting: "Canterbury-Bankstown commercial and warehouse service area",
      switchboardDetail:
        "older protection, business loads, three-phase questions, safety switches, RCBOs and clearer circuit labelling",
    };
  }

  if (canterburyBankstownStrataSuburbs.has(coverageSuburb.slug)) {
    return {
      accessDetail:
        "unit number, strata contact, shopfront access, shared switchboard photos, parking notes and preferred entry details",
      commonJobs:
        "unit faults, shared-access switchboards, shopfront maintenance, lighting repairs, power points, smoke alarms, CCTV/data and Level 2 enquiries",
      emergencySignals:
        "unit power loss, shared circuit tripping, burning smells, hot outlets, shopfront faults and unsafe common-area electrical issues",
      level2Detail:
        "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata supply questions",
      plannedWork:
        "strata repairs, shopfront lighting, extra outlets, smoke alarms, data points, CCTV and switchboard upgrade planning",
      propertyMix:
        "units, strata buildings, older homes, shopfronts, restaurants, small businesses and shared-access sites",
      setting: "Canterbury-Bankstown strata, unit and shopfront service area",
      switchboardDetail:
        "shared boards, older fuses, crowded enclosures, safety switch protection and tenancy labelling",
    };
  }

  if (canterburyBankstownHomeSuburbs.has(coverageSuburb.slug)) {
    return {
      accessDetail:
        "driveway or gate access, switchboard photos, outdoor power photos, renovation notes and any hot water or aircon circuit details",
      commonJobs:
        "home fault finding, duplex and villa switchboards, outdoor power, renovation wiring, hot water electrical, aircon electrical and CCTV/data",
      emergencySignals:
        "home power loss, tripping safety switches, burning smells, hot outlets, storm-damaged outdoor power and water-affected electrical equipment",
      level2Detail:
        "consumer mains, point of attachment, metering, defect notices, service equipment and supply upgrade enquiries",
      plannedWork:
        "renovation wiring, outdoor power, switchboard upgrades, smoke alarms, hot water circuits, aircon electrical support and planned quote work",
      propertyMix:
        "family homes, duplexes, villas, townhouses, renovated properties and small local businesses",
      setting: "Canterbury-Bankstown homes, duplexes and renovation service area",
      switchboardDetail:
        "older fuses, safety switches, RCBO upgrades, outdoor circuits, hot water loads and future renovation capacity",
    };
  }

  return {
    accessDetail:
      "address details, parking or access notes, switchboard photos and any photos of the affected electrical area",
    commonJobs:
      "emergency faults, Level 2 enquiries, switchboards, hot water electrical, aircon electrical, CCTV/data and planned electrical work",
    emergencySignals:
      "power loss, burning smells, sparking, safety switch tripping, storm damage and water-affected electrical equipment",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side electrical questions",
    plannedWork:
      "lighting, power points, switchboard upgrades, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, units, strata properties, shopfronts, workshops and small commercial sites",
    setting: "Canterbury-Bankstown mixed local service area",
    switchboardDetail:
      "older boards, safety switches, RCBO protection, circuit capacity and clearer labelling",
  };
}

const baysideAirportLocalContexts: Record<string, LocalPageContext> = {
  banksmeadow: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, loading dock notes, parking details, site contact details and any defect notice or paperwork",
    commonJobs:
      "warehouse fault finding, logistics-site lighting, workshop power, office circuits, commercial switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse power loss, hot outlets, circuit tripping, damaged workshop circuits and storm or water-affected electrical areas",
    level2Detail:
      "consumer mains, service equipment, metering, defect notices, point of attachment issues and supply capacity questions for commercial sites",
    plannedWork:
      "warehouse lighting, workshop circuits, office power, data cabling, CCTV, switchboard load checks and planned commercial quote work",
    propertyMix:
      "warehouses, logistics sites, workshops, offices, commercial tenancies and small business sites",
    setting: "Bayside & Airport warehouse and commercial service area",
    switchboardDetail:
      "commercial switchboards, business loads, three-phase questions, safety switches, RCBOs and clearer circuit labelling",
  },
  botany: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, shopfront access notes, warehouse entry details, parking notes and any defect notice or paperwork",
    commonJobs:
      "older-home fault finding, shopfront maintenance, warehouse lighting, strata repairs, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or shop power loss, burning smells, hot outlets, safety switch tripping, warehouse circuit faults and water-affected electrical equipment",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "shop lighting, older-home switchboards, warehouse circuits, extra power points, data cabling, CCTV and planned quote work",
    propertyMix:
      "older homes, shopfronts, warehouses, strata buildings, light industrial sites and small businesses",
    setting: "Bayside & Airport mixed home, shopfront and light-industrial service area",
    switchboardDetail:
      "older boards, shop loads, warehouse circuits, safety switch protection and clearer labelling",
  },
  daceyville: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, unit or villa access notes, parking details, strata contact details and any defect notice or paperwork",
    commonJobs:
      "home fault finding, unit repairs, villa switchboards, strata maintenance, lighting, power points, smoke alarms, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, unit circuit tripping, burning smells, hot outlets, unsafe older boards and water-affected electrical equipment",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata supply questions",
    plannedWork:
      "older-board checks, villa switchboards, extra outlets, lighting, smoke alarms, data points, CCTV and planned home quote work",
    propertyMix:
      "homes, units, villas, strata buildings, older boards and small local properties",
    setting: "Bayside & Airport homes, units and villa service area",
    switchboardDetail:
      "older boards, safety switches, RCBO protection, strata access and clearer circuit labelling",
  },
  eastgardens: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, apartment or retail tenancy access notes, parking details, building manager contact details and any defect notice or paperwork",
    commonJobs:
      "apartment faults, retail tenancy maintenance, strata repairs, shared-access electrical work, lighting, power, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, retail tenancy outages, shared circuit tripping, hot outlets, burning smells and unsafe common-area electrical faults",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and retail or strata supply questions",
    plannedWork:
      "retail lighting, tenancy power, apartment repairs, strata maintenance, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, shopping centre and retail tenancies, strata buildings, shared access areas and local businesses",
    setting: "Bayside & Airport apartment, strata and retail service area",
    switchboardDetail:
      "shared boards, tenancy loads, safety switch protection, crowded enclosures and clear tenancy labelling",
  },
  eastlakes: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, apartment access notes, strata contact details, parking details and any defect notice or paperwork",
    commonJobs:
      "apartment repairs, older-board checks, strata access work, rental maintenance, hot water circuits, lighting, power points, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, older-board faults, shared circuit tripping, hot water electrical faults, burning smells and hot outlets",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata supply questions",
    plannedWork:
      "rental maintenance, hot water electrical checks, apartment power, smoke alarms, lighting, data points, CCTV and switchboard planning",
    propertyMix:
      "apartments, older boards, strata buildings, rental properties and small local businesses",
    setting: "Bayside & Airport apartment, strata and rental-maintenance service area",
    switchboardDetail:
      "older boards, shared switchboard areas, safety switches, RCBO protection and tenancy labelling",
  },
  hillsdale: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, unit access notes, strata or property-manager contact details, parking details and any defect notice or paperwork",
    commonJobs:
      "unit faults, shared switchboard checks, strata maintenance, local business repairs, lighting, power points, smoke alarms, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "unit power loss, shared circuit tripping, hot outlets, burning smells, shop power faults and unsafe strata electrical issues",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and property-manager supply questions",
    plannedWork:
      "unit repairs, strata maintenance, local business lighting, smoke alarms, data points, CCTV and planned property-manager quote work",
    propertyMix:
      "units, shared switchboard areas, strata buildings, local businesses and property-managed sites",
    setting: "Bayside & Airport unit, strata and local business service area",
    switchboardDetail:
      "shared boards, older protection, strata access, safety switches and clearer tenancy labelling",
  },
  mascot: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, airport-precinct access notes, loading dock details, parking rules, building manager contacts and any defect notice or paperwork",
    commonJobs:
      "airport-precinct faults, apartment repairs, hotel and office maintenance, shop power, warehouse lighting, commercial switchboards, load checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "commercial outages, apartment power loss, hotel or shop circuit faults, hot outlets, business-critical tripping and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns, load checks and supply capacity questions",
    plannedWork:
      "commercial switchboards, load capacity checks, office lighting, shop power, warehouse circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "airport precinct sites, apartments, hotels, offices, shops, warehouses, commercial tenancies and homes",
    setting: "Bayside & Airport airport-precinct, apartment and commercial service area",
    switchboardDetail:
      "commercial switchboards, apartment boards, tenancy loads, load capacity checks, safety switches and clear circuit labelling",
  },
  pagewood: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, home or apartment access notes, retail or warehouse entry details, parking details and any defect notice or paperwork",
    commonJobs:
      "home fault finding, apartment repairs, retail maintenance, warehouse power, switchboard upgrades, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or apartment power loss, retail outages, warehouse circuit faults, burning smells, hot outlets, tripping safety switches and water-affected electrical equipment",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "home lighting, apartment maintenance, retail power, warehouse circuits, switchboard planning, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, apartments, retail sites, warehouses, commercial tenancies and small businesses",
    setting: "Bayside & Airport home, apartment, retail and warehouse service area",
    switchboardDetail:
      "older boards, apartment protection, retail loads, warehouse circuits, safety switches and RCBO upgrades",
  },
  rosebery: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, apartment or warehouse-conversion access notes, cafe or office timing, parking details, building manager contacts and any defect notice or paperwork",
    commonJobs:
      "apartment faults, warehouse-conversion power, office lighting, cafe electrical maintenance, small business repairs, strata work, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment outages, cafe or small business power loss, hot outlets, circuit tripping, burning smells and unsafe shared electrical areas",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata or commercial supply questions",
    plannedWork:
      "apartment repairs, warehouse-conversion lighting, office power, cafe circuits, data cabling, CCTV, strata maintenance and planned quote work",
    propertyMix:
      "apartments, warehouse conversions, offices, cafes, small businesses and strata buildings",
    setting: "Bayside & Airport apartment, warehouse-conversion and small business service area",
    switchboardDetail:
      "apartment boards, converted-site loads, tenancy circuits, safety switches, RCBOs and clearer circuit labelling",
  },
};

function getBaysideAirportLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "st-george-and-bayside" ||
    coverageArea.slug !== "bayside-and-airport"
  ) {
    return null;
  }

  return baysideAirportLocalContexts[coverageSuburb.slug] ?? null;
}

const georgesRiverLocalContexts: Record<string, LocalPageContext> = {
  allawah: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, strata access notes, parking details, shared meter-room details and any defect notice or paperwork",
    commonJobs:
      "apartment fault finding, older switchboard checks, hot water circuits, safety-switch faults, strata maintenance, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, safety-switch tripping, hot water electrical faults, burning smells, hot outlets and unsafe shared electrical areas",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata supply questions",
    plannedWork:
      "older switchboard upgrades, strata repairs, apartment power points, hot water electrical checks, smoke alarms, data points and planned quote work",
    propertyMix:
      "apartments, strata buildings, older homes, shared meter rooms and local residential properties",
    setting: "Georges River apartment, strata and older-home service area",
    switchboardDetail:
      "older boards, shared meter rooms, safety switches, RCBO protection, hot water circuits and clearer strata labelling",
  },
  "beverley-park": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or gate access notes, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "premium residential fault finding, outdoor power, switchboard upgrades, consumer mains, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, storm-affected outdoor circuits, hot outlets, burning smells, safety-switch tripping and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, service equipment, point of attachment concerns, defect notices and supply upgrade questions",
    plannedWork:
      "outdoor power, switchboard upgrades, renovation wiring, lighting, hot water circuits, CCTV, data cabling and planned residential quote work",
    propertyMix:
      "premium homes, renovated properties, larger residences, outdoor areas and residential service equipment",
    setting: "Georges River premium residential service area",
    switchboardDetail:
      "larger home loads, consumer mains, safety switches, RCBOs, outdoor circuits and future renovation capacity",
  },
  blakehurst: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or gate access notes, renovation details, private service equipment photos and any defect notice or paperwork",
    commonJobs:
      "larger-home fault finding, renovation wiring, outdoor power, private service equipment, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "large-home power loss, storm-exposed outdoor faults, hot outlets, burning smells, safety-switch tripping and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, point of attachment concerns, defect notices and supply upgrade questions",
    plannedWork:
      "renovation wiring, outdoor lighting, switchboard capacity checks, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "larger homes, renovated properties, waterfront residences, outdoor areas and private service equipment",
    setting: "Georges River larger-home, renovation and waterfront service area",
    switchboardDetail:
      "home loads, renovation capacity, safety switches, RCBOs, consumer mains and private service equipment",
  },
  carlton: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, unit or villa access notes, shopfront entry details, parking notes and any defect notice or paperwork",
    commonJobs:
      "unit repairs, villa switchboards, older-home fault finding, shop maintenance, rental electrical repairs, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "unit power loss, rental maintenance faults, shop power issues, safety-switch tripping, hot outlets and burning smells",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "rental maintenance, shop lighting, villa switchboards, older-home repairs, smoke alarms, data points, CCTV and planned quote work",
    propertyMix:
      "units, villas, older homes, shops, rental properties and small local businesses",
    setting: "Georges River unit, villa, shop and rental-maintenance service area",
    switchboardDetail:
      "older boards, villa loads, shared access, safety switches, RCBO protection and clearer circuit labelling",
  },
  "carss-park": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or gate notes, outdoor circuit photos, hot water details and any defect notice or paperwork",
    commonJobs:
      "family-home fault finding, renovation wiring, outdoor circuits, hot water electrical, switchboard upgrades, service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor circuit faults, hot water electrical faults, storm damage, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, point of attachment concerns, defect notices and supply-side questions",
    plannedWork:
      "renovation wiring, outdoor power, hot water circuits, switchboard upgrades, lighting, CCTV, data cabling and planned quote work",
    propertyMix:
      "family homes, renovated properties, outdoor areas, villas and residential service equipment",
    setting: "Georges River family-home, renovation and outdoor-power service area",
    switchboardDetail:
      "older boards, outdoor circuits, hot water loads, service equipment, safety switches and RCBO protection",
  },
  "connells-point": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or waterfront access notes, outdoor fitting photos, service equipment photos and any defect notice or paperwork",
    commonJobs:
      "waterfront-home fault finding, outdoor power, weather-exposed fixtures, point of attachment checks, private service equipment, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-exposed outdoor faults, water-affected outdoor fixtures, home power loss, hot outlets, burning smells and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, point of attachment concerns, private service equipment, defect notices and supply-side questions",
    plannedWork:
      "outdoor power, weather-exposed lighting, switchboard upgrades, private service equipment checks, data cabling, CCTV and planned quote work",
    propertyMix:
      "waterfront homes, larger residences, outdoor areas, private service equipment and weather-exposed fixtures",
    setting: "Georges River waterfront-home and weather-exposed electrical service area",
    switchboardDetail:
      "home loads, outdoor circuits, point of attachment concerns, private service equipment, safety switches and RCBOs",
  },
  hurstville: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, shared meter-room details, building manager contacts, loading or parking notes and any defect notice or paperwork",
    commonJobs:
      "apartment faults, strata repairs, office lighting, shop and restaurant power, business outages, shared meter-room access, commercial switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, business outages, restaurant or shop circuit faults, hot outlets, burning smells, shared meter-room issues and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and commercial or strata supply questions",
    plannedWork:
      "office lighting, shop maintenance, restaurant circuits, apartment repairs, strata electrical work, CCTV, data cabling and planned quote work",
    propertyMix:
      "apartments, strata buildings, offices, shops, restaurants, medical and retail suites, shared meter rooms and commercial sites",
    setting: "Georges River apartment, strata and commercial centre service area",
    switchboardDetail:
      "commercial switchboards, shared meter rooms, tenancy loads, strata boards, safety switches and clearer circuit labelling",
  },
  "hurstville-grove": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or gate access notes, renovation details, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "home fault finding, renovation wiring, outdoor power, switchboard upgrades, hot water circuits, lighting, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor circuit faults, hot water electrical faults, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "renovation wiring, outdoor power, switchboard upgrades, hot water circuits, lighting, smoke alarms, data cabling and planned quote work",
    propertyMix:
      "homes, renovated properties, villas, outdoor areas and residential service equipment",
    setting: "Georges River home, renovation and outdoor-power service area",
    switchboardDetail:
      "older boards, renovation capacity, outdoor circuits, hot water loads, safety switches and RCBO protection",
  },
  kogarah: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, strata or building manager details, shared meter-room notes, parking or loading-zone details and any defect notice or paperwork",
    commonJobs:
      "apartment faults, office lighting, medical and retail suite maintenance, shop power, strata repairs, shared meter-room access, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment outages, medical or retail suite power loss, shop circuit faults, shared meter-room issues, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and medical, retail or strata supply questions",
    plannedWork:
      "medical suite power, retail lighting, office circuits, apartment repairs, strata electrical work, CCTV, data cabling and planned quote work",
    propertyMix:
      "apartments, offices, medical and retail suites, shops, strata buildings, shared meter rooms and local businesses",
    setting: "Georges River apartment, medical, retail and strata service area",
    switchboardDetail:
      "shared meter rooms, strata boards, tenancy circuits, medical or retail loads, safety switches and RCBO protection",
  },
  "kogarah-bay": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or gate notes, outdoor fitting photos, point of attachment photos and any defect notice or paperwork",
    commonJobs:
      "home fault finding, outdoor power, storm-exposed fitting checks, switchboard upgrades, consumer mains, point of attachment support, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-exposed outdoor faults, water-affected outdoor fixtures, home power loss, hot outlets, burning smells and unsafe point of attachment concerns",
    level2Detail:
      "consumer mains, metering, point of attachment support, service equipment, defect notices and supply-side questions",
    plannedWork:
      "outdoor power, weather-exposed lighting, switchboard upgrades, consumer mains checks, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, larger residences, outdoor areas, weather-exposed fixtures and residential service equipment",
    setting: "Georges River home, outdoor-power and storm-exposed service area",
    switchboardDetail:
      "older boards, outdoor circuits, consumer mains, point of attachment concerns, safety switches and RCBOs",
  },
  "kyle-bay": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or gate access notes, renovation details, outdoor lighting photos and any defect notice or paperwork",
    commonJobs:
      "larger-home fault finding, renovation wiring, outdoor lighting, switchboard upgrades, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor lighting faults, hot water electrical issues, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "renovation wiring, outdoor lighting, switchboard upgrades, hot water circuits, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "larger homes, renovated properties, outdoor areas, villas and residential service equipment",
    setting: "Georges River larger-home, renovation and outdoor-lighting service area",
    switchboardDetail:
      "larger home loads, renovation capacity, outdoor lighting circuits, hot water loads, safety switches and RCBO protection",
  },
  lugarno: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, long driveway or access notes, private pole or service equipment photos and any defect notice or paperwork",
    commonJobs:
      "larger-block fault finding, outdoor circuits, long-access electrical work, private pole questions, consumer mains, storm-related faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-related faults, private pole or overhead concerns, home power loss, outdoor circuit faults, hot outlets and water-affected electrical equipment",
    level2Detail:
      "consumer mains, metering, private poles, point of attachment concerns, service equipment, defect notices and supply-side questions",
    plannedWork:
      "outdoor circuits, private pole checks, consumer mains, switchboard upgrades, long-access lighting, CCTV, data cabling and planned quote work",
    propertyMix:
      "larger blocks, homes with long access, outdoor areas, private poles and residential service equipment",
    setting: "Georges River larger-block, outdoor-circuit and private service area",
    switchboardDetail:
      "larger property loads, outdoor circuits, consumer mains, private poles, safety switches and storm-related service concerns",
  },
  mortdale: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, shop or warehouse access notes, parking details, site contact details and any defect notice or paperwork",
    commonJobs:
      "home and unit fault finding, shop maintenance, warehouse circuits, commercial switchboards, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or unit power loss, shop or warehouse outages, hot water electrical faults, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and commercial supply questions",
    plannedWork:
      "shop lighting, warehouse power, commercial switchboards, hot water circuits, home repairs, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, units, shops, warehouses, workshops, commercial tenancies and small businesses",
    setting: "Georges River home, shop and warehouse service area",
    switchboardDetail:
      "commercial switchboards, older home boards, warehouse circuits, hot water loads, safety switches and RCBOs",
  },
  oatley: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or villa access notes, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "home and villa fault finding, renovation wiring, switchboard upgrades, outdoor power, consumer mains, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor circuit faults, hot water electrical issues, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "renovation wiring, outdoor power, switchboard upgrades, consumer mains checks, lighting, CCTV, data cabling and planned quote work",
    propertyMix:
      "homes, villas, renovated properties, outdoor areas and residential service equipment",
    setting: "Georges River home, villa and renovation service area",
    switchboardDetail:
      "older boards, villa loads, outdoor circuits, consumer mains, safety switches and future renovation capacity",
  },
  peakhurst: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, workshop or warehouse access notes, parking details, site contact details and any defect notice or paperwork",
    commonJobs:
      "home fault finding, warehouse power, workshop circuits, commercial switchboards, business outages, load checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse power loss, workshop circuit faults, home power loss, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns, load checks and supply capacity questions",
    plannedWork:
      "warehouse lighting, workshop circuits, commercial switchboards, load checks, home repairs, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, warehouses, workshops, commercial tenancies, business sites and mixed residential properties",
    setting: "Georges River home, warehouse and workshop service area",
    switchboardDetail:
      "commercial switchboards, workshop loads, load capacity checks, safety switches, RCBOs and clearer circuit labelling",
  },
  "peakhurst-heights": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or gate access notes, outdoor power photos, service equipment photos and any defect notice or paperwork",
    commonJobs:
      "home fault finding, renovation wiring, outdoor power, switchboard upgrades, service-equipment support, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor circuit faults, storm damage, hot outlets, burning smells, safety-switch tripping and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "renovation wiring, outdoor power, switchboard upgrades, service-equipment checks, lighting, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, renovated properties, outdoor areas, residential service equipment and larger blocks",
    setting: "Georges River home, renovation and service-equipment service area",
    switchboardDetail:
      "older boards, outdoor circuits, service equipment, safety switches, RCBOs and future renovation capacity",
  },
  penshurst: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, unit or villa access notes, shopfront entry details, shared access notes and any defect notice or paperwork",
    commonJobs:
      "unit and villa repairs, older-home fault finding, local shop maintenance, shared-access electrical work, switchboards, safety switches, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "unit power loss, shared circuit tripping, shop power faults, hot outlets, burning smells and safety-switch faults",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata supply questions",
    plannedWork:
      "unit repairs, villa switchboards, local shop lighting, older-home maintenance, smoke alarms, data points, CCTV and planned quote work",
    propertyMix:
      "units, villas, older homes, local shops, shared-access sites and strata buildings",
    setting: "Georges River unit, villa, shop and shared-access service area",
    switchboardDetail:
      "older boards, shared access, safety switches, RCBO protection, villa loads and clearer labelling",
  },
  ramsgate: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, coastal or shopfront access notes, outdoor power photos, parking details and any defect notice or paperwork",
    commonJobs:
      "coastal fault finding, unit repairs, shopfront maintenance, outdoor power, switchboard upgrades, water-affected electrical checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "water-affected electrical equipment, coastal outdoor faults, unit power loss, shopfront outages, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "outdoor power, weather-exposed lighting, shopfront maintenance, unit repairs, switchboard upgrades, data cabling, CCTV and planned quote work",
    propertyMix:
      "coastal units, shopfronts, homes, strata buildings, outdoor areas and small businesses",
    setting: "Georges River coastal unit, shopfront and outdoor-power service area",
    switchboardDetail:
      "coastal exposure, older boards, outdoor circuits, safety switches, RCBOs and water-affected electrical risks",
  },
  "sans-souci": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or coastal access notes, outdoor power photos, consumer mains photos and any defect notice or paperwork",
    commonJobs:
      "premium-home fault finding, coastal outdoor power, switchboard upgrades, consumer mains, service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "coastal outdoor faults, storm or water-affected electrical, home power loss, hot outlets, burning smells and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, service equipment, point of attachment concerns, defect notices and supply-side questions",
    plannedWork:
      "outdoor power, switchboard upgrades, consumer mains checks, weather-exposed lighting, renovation wiring, data cabling, CCTV and planned quote work",
    propertyMix:
      "premium homes, coastal properties, renovated residences, outdoor areas and residential service equipment",
    setting: "Georges River premium coastal-home and Level 2 service area",
    switchboardDetail:
      "larger home loads, coastal exposure, consumer mains, service equipment, safety switches and outdoor circuits",
  },
  "south-hurstville": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, unit or business access notes, strata contact details, parking notes and any defect notice or paperwork",
    commonJobs:
      "home and unit fault finding, local business maintenance, strata repairs, switchboard upgrades, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or unit power loss, local business outages, shared circuit tripping, hot water electrical faults, hot outlets and burning smells",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata or business supply questions",
    plannedWork:
      "home repairs, unit maintenance, local business lighting, strata electrical work, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, units, local businesses, strata buildings, shared-access sites and residential properties",
    setting: "Georges River home, unit, strata and local business service area",
    switchboardDetail:
      "older boards, strata access, hot water loads, safety switches, RCBO protection and clearer circuit labelling",
  },
};

function getGeorgesRiverLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "st-george-and-bayside" ||
    coverageArea.slug !== "georges-river"
  ) {
    return null;
  }

  return georgesRiverLocalContexts[coverageSuburb.slug] ?? null;
}

const rockdaleBexleyLocalContexts: Record<string, LocalPageContext> = {
  arncliffe: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, apartment or villa access notes, airport-adjacent access details, parking notes and any defect notice or paperwork",
    commonJobs:
      "apartment fault finding, older-home switchboards, villa repairs, strata access, hot water circuits, airport-adjacent access planning, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, hot water electrical faults, older-board issues, burning smells, hot outlets, safety-switch tripping and unsafe strata electrical areas",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata or airport-adjacent access questions",
    plannedWork:
      "older switchboard upgrades, villa repairs, apartment power points, hot water electrical checks, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, older homes, villas, strata buildings, airport-adjacent properties and shared access sites",
    setting: "Rockdale & Bexley apartment, villa and airport-adjacent service area",
    switchboardDetail:
      "older boards, villa loads, shared meter rooms, safety switches, RCBO protection and hot water circuits",
  },
  banksia: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, station-area access notes, rental contact details, parking notes and any defect notice or paperwork",
    commonJobs:
      "older-home fault finding, unit repairs, station-area shop maintenance, rental electrical repairs, switchboards, safety-switch faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or unit power loss, rental maintenance faults, station-area shop outages, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and rental or shop supply questions",
    plannedWork:
      "rental maintenance, older switchboards, unit repairs, shop lighting, smoke alarms, data points, CCTV and planned quote work",
    propertyMix:
      "older homes, units, station-area shops, rental properties and small local businesses",
    setting: "Rockdale & Bexley older-home, unit and station-area service area",
    switchboardDetail:
      "older boards, rental property loads, safety switches, RCBO protection and clearer circuit labelling",
  },
  "bardwell-park": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or sloped-block access notes, renovation details, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "leafy-street home fault finding, older-home switchboards, sloped-block access work, renovation wiring, outdoor power, lighting, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor circuit faults, storm-related issues, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and renovation supply questions",
    plannedWork:
      "renovation wiring, outdoor power, older switchboard upgrades, garden lighting, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "leafy residential streets, older homes, sloped blocks, renovated properties and outdoor areas",
    setting: "Rockdale & Bexley leafy residential and sloped-block service area",
    switchboardDetail:
      "older boards, outdoor circuits, renovation capacity, safety switches, RCBO protection and hot water loads",
  },
  "bardwell-valley": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, driveway or gate notes, renovation details, outdoor lighting photos and any defect notice or paperwork",
    commonJobs:
      "home and duplex fault finding, renovation wiring, outdoor power, lighting, switchboard upgrades, planned Level 2 support, CCTV/data and planned electrical work",
    emergencySignals:
      "home power loss, duplex circuit faults, outdoor power faults, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and planned supply-side questions",
    plannedWork:
      "renovation wiring, outdoor lighting, switchboard upgrades, hot water circuits, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, duplexes, renovated properties, outdoor areas and residential service equipment",
    setting: "Rockdale & Bexley home, duplex and renovation service area",
    switchboardDetail:
      "older boards, duplex loads, outdoor circuits, renovation capacity, safety switches and RCBO protection",
  },
  bexley: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, villa or shop access notes, parking details, defect notice photos and any service equipment paperwork",
    commonJobs:
      "older-home fault finding, duplex and villa repairs, unit work, shop maintenance, switchboards, consumer mains, defect notices, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or shop power loss, duplex circuit faults, hot outlets, burning smells, safety-switch tripping and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "switchboard upgrades, consumer mains checks, defect notice review, villa repairs, shop lighting, data cabling, CCTV and planned quote work",
    propertyMix:
      "older homes, duplexes, villas, units, shops, strata buildings and small local businesses",
    setting: "Rockdale & Bexley older-home, duplex, villa and shop service area",
    switchboardDetail:
      "older boards, duplex and villa loads, consumer mains, safety switches, RCBOs and clearer circuit labelling",
  },
  "bexley-north": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, apartment or villa access notes, transport-area parking notes and any defect notice or paperwork",
    commonJobs:
      "older-home repairs, apartment faults near transport, villa switchboards, strata access, hot water electrical, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or apartment power loss, hot water electrical faults, shared circuit tripping, hot outlets, burning smells and safety-switch faults",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata supply questions",
    plannedWork:
      "older switchboards, villa repairs, apartment power points, hot water electrical checks, smoke alarms, data points, CCTV and planned quote work",
    propertyMix:
      "older homes, apartments near transport, villas, strata buildings and residential service equipment",
    setting: "Rockdale & Bexley older-home, apartment and villa service area",
    switchboardDetail:
      "older boards, villa loads, shared meter rooms, hot water circuits, safety switches and RCBO protection",
  },
  "brighton-le-sands": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, strata or shopfront access notes, outdoor power photos, parking details and any defect notice or paperwork",
    commonJobs:
      "apartment faults, strata repairs, cafe and restaurant power, shopfront maintenance, outdoor power, coastal electrical checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, cafe or restaurant outages, shopfront circuit faults, coastal outdoor faults, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata or commercial supply questions",
    plannedWork:
      "restaurant circuits, cafe lighting, shopfront maintenance, apartment repairs, outdoor power, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, strata buildings, cafes, restaurants, shopfronts, outdoor areas and coastal properties",
    setting: "Rockdale & Bexley coastal apartment, hospitality and shopfront service area",
    switchboardDetail:
      "strata boards, tenancy loads, outdoor circuits, coastal exposure, safety switches and RCBO protection",
  },
  "dolls-point": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, strata access notes, coastal access details, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "coastal-home fault finding, apartment repairs, strata access work, outdoor power, weather-exposed fixture checks, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "coastal outdoor faults, apartment power loss, storm-related electrical issues, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "outdoor power, weather-rated lighting, apartment repairs, switchboard upgrades, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "coastal homes, apartments, strata buildings, outdoor areas and residential service equipment",
    setting: "Rockdale & Bexley coastal home, apartment and strata service area",
    switchboardDetail:
      "coastal exposure, older boards, outdoor circuits, safety switches, RCBOs and clearer circuit labelling",
  },
  kyeemagh: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, airport-adjacent access notes, outdoor circuit photos, parking details and any defect notice or paperwork",
    commonJobs:
      "coastal-home fault finding, airport-adjacent access work, outdoor circuits, weather-exposed fixture checks, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "coastal outdoor faults, weather-affected electrical equipment, home power loss, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and airport-adjacent access questions",
    plannedWork:
      "outdoor circuits, weather-rated lighting, switchboard upgrades, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "coastal homes, airport-adjacent properties, outdoor areas and residential service equipment",
    setting: "Rockdale & Bexley coastal and airport-adjacent service area",
    switchboardDetail:
      "coastal exposure, outdoor circuits, older boards, safety switches, RCBO protection and service equipment",
  },
  monterey: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, apartment or strata access notes, coastal access details, parking notes and any defect notice or paperwork",
    commonJobs:
      "apartment faults, unit repairs, strata maintenance, coastal outdoor power, switchboard upgrades, hot water electrical, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, hot water electrical faults, coastal outdoor issues, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata supply questions",
    plannedWork:
      "unit repairs, strata electrical work, outdoor power, switchboard upgrades, hot water circuits, data points, CCTV and planned quote work",
    propertyMix:
      "apartments, units, strata buildings, coastal properties, outdoor areas and shared meter rooms",
    setting: "Rockdale & Bexley coastal apartment, unit and strata service area",
    switchboardDetail:
      "shared boards, coastal exposure, hot water loads, safety switches, RCBOs and clearer tenancy labelling",
  },
  "ramsgate-beach": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, cafe or shopfront access notes, coastal parking details, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "apartment faults, cafe and shopfront maintenance, outdoor power, weather-exposed fixture checks, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "power faults after rain, cafe or shopfront outages, apartment power loss, outdoor circuit faults, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and shopfront or strata supply questions",
    plannedWork:
      "cafe lighting, shopfront maintenance, apartment repairs, outdoor power, switchboard upgrades, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, cafes, shopfronts, coastal properties, outdoor areas and strata buildings",
    setting: "Rockdale & Bexley coastal apartment, cafe and shopfront service area",
    switchboardDetail:
      "strata boards, shopfront loads, coastal exposure, outdoor circuits, safety switches and RCBO protection",
  },
  rockdale: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, shared meter-room notes, shop or office access details, loading or parking notes and any defect notice or paperwork",
    commonJobs:
      "apartment faults, strata repairs, shop power, office lighting, shared meter-room access, commercial switchboards, urgent outages, consumer mains, defect notices, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "urgent outages, apartment power loss, shop or office circuit faults, shared meter-room issues, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and commercial or strata supply questions",
    plannedWork:
      "commercial switchboards, office lighting, shop maintenance, apartment repairs, strata electrical work, consumer mains checks, CCTV, data cabling and planned quote work",
    propertyMix:
      "apartments, strata buildings, shops, offices, shared meter rooms, commercial sites and older homes",
    setting: "Rockdale & Bexley apartment, strata, shop and commercial service area",
    switchboardDetail:
      "commercial switchboards, shared meter rooms, tenancy loads, strata boards, consumer mains, safety switches and clear circuit labelling",
  },
  sandringham: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, coastal access notes, outdoor lighting photos, service equipment photos and any defect notice or paperwork",
    commonJobs:
      "premium-home fault finding, coastal apartment repairs, outdoor lighting, outdoor power, weather-exposed fixture checks, service-equipment enquiries, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "coastal outdoor faults, weather-affected electrical equipment, home or apartment power loss, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "outdoor lighting, outdoor power, switchboard upgrades, service-equipment checks, renovation wiring, data cabling, CCTV and planned quote work",
    propertyMix:
      "premium homes, coastal apartments, outdoor areas, renovated properties and residential service equipment",
    setting: "Rockdale & Bexley premium coastal-home and apartment service area",
    switchboardDetail:
      "home loads, coastal exposure, outdoor circuits, service equipment, safety switches and RCBO protection",
  },
  turrella: {
    accessDetail:
      "switchboard, meter box and affected fitting photos, strata or rail-corridor access notes, warehouse entry details, loading or parking details and any defect notice or paperwork",
    commonJobs:
      "apartment faults, strata repairs, airport or rail-corridor access work, warehouse lighting, workshop power, commercial switchboards, business outages, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse power loss, apartment power loss, shared circuit tripping, hot outlets, burning smells and safety-switch faults",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and commercial or strata supply questions",
    plannedWork:
      "warehouse lighting, workshop circuits, commercial switchboards, apartment repairs, strata electrical work, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, strata buildings, airport-adjacent sites, rail-corridor access properties, warehouses, workshops and commercial tenancies",
    setting: "Rockdale & Bexley apartment, rail-corridor and warehouse service area",
    switchboardDetail:
      "commercial switchboards, strata boards, workshop loads, warehouse circuits, safety switches and clearer circuit labelling",
  },
  "wolli-creek": {
    accessDetail:
      "switchboard, meter box and affected fitting photos, building-manager contact details, shared meter-room notes, loading or parking details and any defect notice or paperwork",
    commonJobs:
      "high-rise apartment faults, strata tower repairs, shared meter-room access, switchboard cupboard checks, common-area lighting, hot water faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "high-rise apartment power loss, shared meter-room issues, common-area lighting faults, hot water electrical faults, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata tower supply questions",
    plannedWork:
      "apartment repairs, common-area lighting, switchboard cupboard checks, hot water circuits, strata electrical work, data cabling, CCTV and planned quote work",
    propertyMix:
      "high-rise apartments, strata towers, shared meter rooms, switchboard cupboards, common areas and building-manager access sites",
    setting: "Rockdale & Bexley high-rise apartment and strata tower service area",
    switchboardDetail:
      "shared meter rooms, switchboard cupboards, strata boards, hot water loads, safety switches and clearer apartment labelling",
  },
};

function getRockdaleBexleyLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "st-george-and-bayside" ||
    coverageArea.slug !== "rockdale-and-bexley"
  ) {
    return null;
  }

  return rockdaleBexleyLocalContexts[coverageSuburb.slug] ?? null;
}

const sutherlandShireLocalContexts: Record<string, LocalPageContext> = {
  "alfords-point": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, long-driveway or gate access notes, parking details, private service equipment photos and any defect notice or paperwork",
    commonJobs:
      "larger-home fault finding, bushland-edge outdoor power, private service equipment checks, switchboard upgrades, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "power loss, storm-affected outdoor circuits, heat at outlets, sparking, safety-switch tripping and unsafe private service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "outdoor power, switchboard capacity checks, driveway lighting, private service equipment review, data cabling, CCTV and planned quote work",
    propertyMix:
      "larger homes, bushland-edge properties, long driveways, outdoor areas and private service equipment",
    setting: "Sutherland Shire larger-home and bushland-edge service area",
    switchboardDetail:
      "home loads, outdoor circuits, private service equipment, safety switches, RCBOs and consumer mains capacity",
  },
  bangor: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, driveway or parking notes, hot water circuit details and any defect notice or paperwork",
    commonJobs:
      "family-home repairs, duplex electrical work, older-board checks, safety-switch tripping, hot water circuits, outdoor lighting, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, hot water electrical faults, sparking, heat at outlets, safety-switch tripping and storm-affected outdoor power",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes and duplexes",
    plannedWork:
      "lighting, outdoor power, hot water circuits, smoke alarms, switchboard upgrades, data cabling, CCTV and planned home quote work",
    propertyMix:
      "family homes, duplexes, older boards, outdoor areas and residential service equipment",
    setting: "Sutherland Shire family-home and duplex service area",
    switchboardDetail:
      "older boards, hot water loads, safety switches, RCBO protection, outdoor circuits and clear circuit labelling",
  },
  "barden-ridge": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, renovation notes, bushland access details, parking information and any defect notice or paperwork",
    commonJobs:
      "larger-home fault finding, renovation electrical work, bushland-access jobs, outdoor power, switchboard capacity checks, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, storm-affected outdoor circuits, heat at outlets, sparking, tripping safety switches and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply upgrade questions",
    plannedWork:
      "renovation wiring, outdoor power, switchboard capacity checks, lighting, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "larger homes, renovated properties, bushland-edge blocks, outdoor areas and residential service equipment",
    setting: "Sutherland Shire renovation and bushland-edge service area",
    switchboardDetail:
      "renovation capacity, consumer mains, home loads, safety switches, RCBOs and outdoor circuit protection",
  },
  "bonnet-bay": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, riverside access notes, outdoor circuit photos, parking details and any defect notice or paperwork",
    commonJobs:
      "riverside-home fault finding, weather-exposed outdoor power, storm and water-related faults, switchboard upgrades, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-related faults, water-affected electrical equipment, outdoor circuit trips, heat at outlets, sparking and home power loss",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and riverside access questions",
    plannedWork:
      "outdoor power, weather-rated lighting, switchboard upgrades, hot water circuits, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "riverside homes, weather-exposed properties, sloped streets, outdoor areas and residential service equipment",
    setting: "Sutherland Shire riverside and weather-exposed service area",
    switchboardDetail:
      "weather exposure, outdoor circuits, older boards, safety switches, RCBOs and service equipment",
  },
  bundeena: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, ferry or road access notes, outdoor power photos, parking details and any defect notice or paperwork",
    commonJobs:
      "coastal-home repairs, beachside outdoor power, storm fault checks, planned photo-based quotes, switchboards, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "coastal outdoor faults, storm-affected electrical equipment, home power loss, sparking, heat at outlets and tripping safety switches",
    level2Detail:
      "consumer mains, metering, service equipment, point of attachment concerns, defect notices and coastal access questions",
    plannedWork:
      "weather-rated lighting, outdoor power, switchboard planning, hot water circuits, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "coastal homes, beachside properties, access-sensitive sites, outdoor areas and residential service equipment",
    setting: "Sutherland Shire coastal and access-sensitive service area",
    switchboardDetail:
      "coastal exposure, outdoor circuits, safety switches, RCBO protection, hot water loads and service equipment",
  },
  burraneer: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, waterfront access notes, renovation details, service equipment photos and any defect notice or paperwork",
    commonJobs:
      "premium waterfront fault finding, renovation electrical work, outdoor power, consumer mains, metering, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront outdoor faults, home power loss, heat at outlets, sparking, safety-switch tripping and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply upgrade questions",
    plannedWork:
      "renovation wiring, outdoor power, metering support, switchboard capacity checks, data cabling, CCTV and planned premium-home quote work",
    propertyMix:
      "premium waterfront homes, renovated properties, outdoor areas, service equipment and larger residential loads",
    setting: "Sutherland Shire premium waterfront and renovation service area",
    switchboardDetail:
      "home loads, consumer mains, metering, outdoor circuits, safety switches, RCBOs and service equipment",
  },
  caringbah: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, tenancy or suite access notes, loading or parking details, site contact information and any defect notice or paperwork",
    commonJobs:
      "commercial-site faults, medical suite and office lighting, warehouse power, strata repairs, business outages, load checks, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, medical or office circuit faults, warehouse power loss, strata power issues, heat at outlets, sparking and tripping safety switches",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns, load checks and supply capacity questions",
    plannedWork:
      "commercial switchboards, medical suite power, office lighting, warehouse circuits, strata repairs, data cabling, CCTV and planned quote work",
    propertyMix:
      "commercial sites, medical suites, offices, warehouses, strata buildings, homes and mixed-use properties",
    setting: "Sutherland Shire commercial, strata and medical-suite service area",
    switchboardDetail:
      "commercial switchboards, tenancy loads, strata boards, load checks, safety switches and clear circuit labelling",
  },
  "caringbah-south": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, renovation or driveway access notes, private service equipment photos and any defect notice or paperwork",
    commonJobs:
      "premium-home fault finding, renovation wiring, outdoor circuits, switchboard upgrades, consumer mains, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor circuit faults, heat at outlets, sparking, tripping safety switches and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "renovation wiring, outdoor power, switchboard capacity checks, consumer mains review, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "premium homes, renovated properties, larger blocks, outdoor areas and private service equipment",
    setting: "Sutherland Shire premium-home and private service equipment area",
    switchboardDetail:
      "home loads, consumer mains, private service equipment, outdoor circuits, safety switches and RCBO protection",
  },
  como: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, sloped-block or driveway notes, hot water circuit details and any defect notice or paperwork",
    commonJobs:
      "older-home repairs, sloped-block access work, river and weather-exposed outdoor power, hot water electrical, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, storm or river-weather exposure faults, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and point of attachment concerns for older homes",
    plannedWork:
      "older switchboards, hot water circuits, outdoor lighting, power points, smoke alarms, data cabling, CCTV and planned home quote work",
    propertyMix:
      "older homes, sloped blocks, river-adjacent properties, outdoor areas and residential service equipment",
    setting: "Sutherland Shire older-home and river-adjacent service area",
    switchboardDetail:
      "older boards, hot water loads, outdoor circuits, safety switches, RCBOs and clearer labelling",
  },
  cronulla: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, strata or shop access notes, coastal parking details, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "apartment faults, strata repairs, beachside home work, cafe and restaurant power, shop maintenance, coastal outdoor power, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, shop or hospitality outages, coastal outdoor faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata or commercial supply questions",
    plannedWork:
      "apartment repairs, strata maintenance, cafe lighting, shop power, outdoor power, weather-rated lighting, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, strata buildings, beachside homes, cafes, restaurants, shops and coastal outdoor areas",
    setting: "Sutherland Shire beachside apartment, hospitality and shopfront service area",
    switchboardDetail:
      "strata boards, hospitality loads, coastal exposure, outdoor circuits, safety switches and RCBO protection",
  },
  "dolans-bay": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, waterfront access notes, renovation details, outdoor circuit photos and any defect notice or paperwork",
    commonJobs:
      "waterfront-home fault finding, premium renovation wiring, outdoor circuits, weather exposure checks, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront outdoor faults, weather-affected electrical equipment, home power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, point of attachment concerns, defect notices and waterfront supply questions",
    plannedWork:
      "renovation wiring, outdoor lighting, outdoor power, switchboard planning, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "waterfront homes, premium renovated properties, outdoor areas and residential service equipment",
    setting: "Sutherland Shire waterfront renovation service area",
    switchboardDetail:
      "home loads, outdoor circuits, weather exposure, safety switches, RCBOs and service equipment",
  },
  engadine: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, bushland access notes, outdoor power photos, hot water circuit details and any defect notice or paperwork",
    commonJobs:
      "family-home repairs, bushland-edge storm faults, older switchboards, outdoor power, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-related faults, home power loss, outdoor circuit trips, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "older switchboards, outdoor power, hot water circuits, lighting, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, bushland-edge streets, older switchboards, outdoor areas and residential service equipment",
    setting: "Sutherland Shire family-home and bushland-edge service area",
    switchboardDetail:
      "older boards, outdoor circuits, hot water loads, safety switches, RCBOs and service equipment",
  },
  "grays-point": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, sloped-block or waterfront access notes, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "bushland and waterfront fault finding, sloped-block access work, outdoor power, storm faults, private service equipment, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-affected outdoor power, water-adjacent faults, home power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and access-sensitive supply questions",
    plannedWork:
      "outdoor power, weather-rated lighting, switchboard upgrades, private service equipment review, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "bushland-edge homes, waterfront properties, sloped blocks, outdoor areas and private service equipment",
    setting: "Sutherland Shire bushland and waterfront service area",
    switchboardDetail:
      "outdoor circuits, private service equipment, home loads, safety switches, RCBO protection and consumer mains",
  },
  "greenhills-beach": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, coastal access notes, outdoor power photos, load-check details and any defect notice or paperwork",
    commonJobs:
      "coastal-home fault finding, beachside outdoor power, weather-affected fixture checks, load checks, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "coastal outdoor faults, storm-affected electrical equipment, home power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and load or supply questions",
    plannedWork:
      "weather-rated lighting, outdoor power, switchboard load checks, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "coastal homes, beachside properties, outdoor areas, newer residential loads and service equipment",
    setting: "Sutherland Shire coastal home and load-check service area",
    switchboardDetail:
      "coastal exposure, load checks, outdoor circuits, safety switches, RCBOs and service equipment",
  },
  gymea: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, shop or strata access notes, parking details, hot water circuit information and any defect notice or paperwork",
    commonJobs:
      "home and villa repairs, shop maintenance, strata electrical work, older switchboards, hot water circuits, safety-switch faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or shop power loss, hot water electrical faults, heat at outlets, sparking, strata circuit trips and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and shop or strata supply questions",
    plannedWork:
      "older switchboards, shop lighting, hot water circuits, safety switches, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, villas, shops, strata buildings, older switchboards and local businesses",
    setting: "Sutherland Shire home, villa, shop and strata service area",
    switchboardDetail:
      "older boards, shop loads, hot water circuits, safety switches, RCBOs and strata access",
  },
  "gymea-bay": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, waterfront or driveway access notes, outdoor circuit photos and any defect notice or paperwork",
    commonJobs:
      "waterfront-home fault finding, larger-block outdoor power, switchboard upgrades, private service equipment, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront outdoor faults, home power loss, storm-affected circuits, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and waterfront supply questions",
    plannedWork:
      "outdoor power, switchboard upgrades, hot water circuits, private service equipment review, data cabling, CCTV and planned quote work",
    propertyMix:
      "waterfront homes, larger blocks, outdoor areas, private service equipment and residential service equipment",
    setting: "Sutherland Shire waterfront home and larger-block service area",
    switchboardDetail:
      "home loads, outdoor circuits, private service equipment, hot water loads, safety switches and RCBO protection",
  },
  heathcote: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, bushland access notes, private pole or service equipment photos and any defect notice or paperwork",
    commonJobs:
      "bushland-edge fault finding, storm faults, outdoor power, older-board checks, private pole questions, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-related faults, home power loss, outdoor circuit trips, heat at outlets, sparking, safety-switch tripping and unsafe private service equipment",
    level2Detail:
      "consumer mains, metering, private poles, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "outdoor power, older switchboards, private pole review, weather-rated lighting, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "bushland-edge homes, older boards, private poles, outdoor areas and residential service equipment",
    setting: "Sutherland Shire bushland-edge and private-pole service area",
    switchboardDetail:
      "older boards, private pole supply, outdoor circuits, safety switches, RCBOs and service equipment",
  },
  illawong: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, long-driveway or sloped-block notes, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "larger-home fault finding, sloped-block access work, long-driveway lighting, outdoor circuits, private service equipment, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor circuit faults, heat at outlets, sparking, safety-switch tripping and unsafe private service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "outdoor circuits, driveway lighting, switchboard capacity checks, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "larger homes, sloped blocks, long driveways, outdoor areas and private service equipment",
    setting: "Sutherland Shire larger-home and long-driveway service area",
    switchboardDetail:
      "home loads, outdoor circuits, private service equipment, safety switches, RCBOs and consumer mains",
  },
  jannali: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, unit or shop access notes, strata contact details, parking notes and any defect notice or paperwork",
    commonJobs:
      "unit faults, villa repairs, older-home electrical work, shopfront maintenance, strata access, switchboards, rental maintenance, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "unit power loss, shopfront circuit faults, older-board heat, sparking, hot water faults and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata or shopfront supply questions",
    plannedWork:
      "unit repairs, villa switchboards, shopfront lighting, rental maintenance, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "units, villas, older homes, shopfronts, strata buildings and rental properties",
    setting: "Sutherland Shire unit, villa and shopfront service area",
    switchboardDetail:
      "older boards, villa loads, strata access, hot water circuits, safety switches and clear circuit labelling",
  },
  "kangaroo-point": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, waterfront access notes, outdoor power photos, service equipment details and any defect notice or paperwork",
    commonJobs:
      "waterfront-home fault finding, outdoor power, weather exposure checks, consumer mains, private service equipment, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront outdoor faults, home power loss, storm-affected electrical equipment, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and waterfront supply questions",
    plannedWork:
      "outdoor power, weather-rated lighting, consumer mains checks, private service equipment review, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "waterfront homes, outdoor areas, private service equipment and residential service equipment",
    setting: "Sutherland Shire waterfront home and private service equipment area",
    switchboardDetail:
      "home loads, outdoor circuits, private service equipment, consumer mains, safety switches and RCBO protection",
  },
  kareela: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, townhouse or driveway access notes, hot water circuit details and any defect notice or paperwork",
    commonJobs:
      "family-home repairs, townhouse electrical work, older-board checks, lighting and power, hot water circuits, local maintenance, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, hot water electrical faults, heat at outlets, sparking, townhouse circuit trips and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes and townhouses",
    plannedWork:
      "lighting, power points, hot water circuits, switchboard upgrades, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, townhouses, older boards, local maintenance properties and residential service equipment",
    setting: "Sutherland Shire family-home and townhouse service area",
    switchboardDetail:
      "older boards, hot water loads, townhouse circuits, safety switches and RCBO protection",
  },
  kirrawee: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, warehouse or apartment access notes, loading and parking details, site contact information and any defect notice or paperwork",
    commonJobs:
      "warehouse and workshop faults, retail maintenance, apartment repairs, industrial unit power, commercial switchboards, business outages, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse power loss, workshop circuit faults, apartment power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and commercial or strata supply questions",
    plannedWork:
      "warehouse lighting, workshop power, retail maintenance, apartment repairs, commercial switchboards, data cabling, CCTV and planned quote work",
    propertyMix:
      "warehouses, workshops, retail sites, apartments, industrial units, commercial tenancies and homes",
    setting: "Sutherland Shire warehouse, workshop, retail and apartment service area",
    switchboardDetail:
      "commercial switchboards, workshop loads, apartment boards, tenancy circuits, safety switches and clear circuit labelling",
  },
  kurnell: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, coastal or industrial access notes, workshop details, parking information and any defect notice or paperwork",
    commonJobs:
      "coastal and industrial fault finding, exposed electrical equipment checks, storm faults, workshop power, commercial-site electrical work, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-related faults, exposed electrical equipment issues, workshop circuit faults, commercial power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and coastal or industrial supply questions",
    plannedWork:
      "workshop circuits, commercial switchboards, exposed-equipment checks, weather-rated lighting, data cabling, CCTV and planned quote work",
    propertyMix:
      "coastal properties, industrial sites, workshops, commercial sites, outdoor areas and service equipment",
    setting: "Sutherland Shire coastal and industrial service area",
    switchboardDetail:
      "commercial switchboards, coastal exposure, workshop loads, outdoor circuits, safety switches and service equipment",
  },
  "lilli-pilli": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, waterfront or renovation access notes, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "premium-home fault finding, waterfront exposure checks, renovation wiring, outdoor power, consumer mains, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront outdoor faults, home power loss, storm-affected circuits, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and waterfront supply questions",
    plannedWork:
      "renovation wiring, outdoor power, consumer mains review, switchboard capacity checks, data cabling, CCTV and planned premium-home quote work",
    propertyMix:
      "premium homes, waterfront properties, renovated homes, outdoor areas and residential service equipment",
    setting: "Sutherland Shire premium waterfront and renovation service area",
    switchboardDetail:
      "home loads, consumer mains, outdoor circuits, safety switches, RCBOs and service equipment",
  },
  loftus: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, bushland street access notes, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "family-home repairs, bushland-edge storm faults, switchboards, outdoor power, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-related faults, outdoor circuit trips, home power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "outdoor power, switchboard upgrades, hot water circuits, lighting, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, bushland-edge streets, outdoor areas, older boards and residential service equipment",
    setting: "Sutherland Shire family-home and bushland-edge service area",
    switchboardDetail:
      "older boards, outdoor circuits, hot water loads, safety switches and RCBO protection",
  },
  maianbar: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, coastal access notes, limited-access timing, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "remote coastal fault finding, weather exposure checks, limited-access planning, outdoor power, storm faults, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "coastal outdoor faults, storm-affected electrical equipment, home power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, point of attachment concerns, defect notices and access-sensitive supply questions",
    plannedWork:
      "outdoor power, weather-rated lighting, switchboard planning, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "remote coastal homes, access-sensitive sites, weather-exposed properties and outdoor areas",
    setting: "Sutherland Shire remote coastal and access-sensitive service area",
    switchboardDetail:
      "coastal exposure, outdoor circuits, service equipment, safety switches and RCBO protection",
  },
  menai: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, shop or driveway access notes, commercial timing, parking details and any defect notice or paperwork",
    commonJobs:
      "family-home repairs, larger-property electrical work, local shop maintenance, commercial maintenance, consumer mains, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, shop circuit faults, heat at outlets, sparking, tripping safety switches and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "home lighting, local shop power, commercial maintenance, switchboard capacity checks, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, larger properties, local shops, small commercial sites and residential service equipment",
    setting: "Sutherland Shire family-home, larger-property and local-shop service area",
    switchboardDetail:
      "home loads, consumer mains, local shop circuits, safety switches, RCBO protection and service equipment",
  },
  miranda: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, shared meter-room notes, shop or suite access details, parking information and any defect notice or paperwork",
    commonJobs:
      "apartment faults, shop maintenance, office and medical suite power, retail lighting, shared meter-room access, strata repairs, commercial switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, retail or medical suite outages, shared meter-room issues, shop circuit faults, heat at outlets, sparking and tripping safety switches",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and commercial or strata supply questions",
    plannedWork:
      "retail lighting, office power, medical suite maintenance, apartment repairs, strata electrical work, commercial switchboards, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, shops, offices, medical suites, retail sites, strata buildings and shared meter rooms",
    setting: "Sutherland Shire apartment, retail, medical-suite and strata service area",
    switchboardDetail:
      "commercial switchboards, shared meter rooms, strata boards, tenancy loads, safety switches and clear circuit labelling",
  },
  "oyster-bay": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, water-adjacent access notes, outdoor power photos, service equipment details and any defect notice or paperwork",
    commonJobs:
      "water-adjacent home repairs, outdoor power, storm exposure checks, private service equipment, switchboards, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-affected outdoor circuits, home power loss, water-adjacent electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "outdoor power, weather-rated lighting, private service equipment review, switchboard upgrades, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes near water, outdoor areas, private service equipment and residential service equipment",
    setting: "Sutherland Shire water-adjacent home and outdoor power service area",
    switchboardDetail:
      "outdoor circuits, private service equipment, home loads, safety switches and RCBO protection",
  },
  "port-hacking": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, waterfront access notes, outdoor lighting photos, private service equipment details and any defect notice or paperwork",
    commonJobs:
      "waterfront-home repairs, outdoor lighting, private service equipment checks, switchboard upgrades, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront outdoor faults, home power loss, storm-affected circuits, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and waterfront supply questions",
    plannedWork:
      "outdoor lighting, outdoor power, private service equipment review, switchboard upgrades, data cabling, CCTV and planned quote work",
    propertyMix:
      "waterfront homes, outdoor areas, private service equipment and larger residential loads",
    setting: "Sutherland Shire waterfront home and private service equipment service area",
    switchboardDetail:
      "home loads, private service equipment, consumer mains, outdoor circuits, safety switches and RCBO protection",
  },
  "royal-national-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, precise access directions, gate or parking notes, safety conditions and any defect notice or paperwork",
    commonJobs:
      "remote-access triage, bushland electrical faults, safety-first emergency assessment, outdoor power, switchboards, service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "bushland storm faults, power loss, unsafe outdoor electrical equipment, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and access-sensitive supply questions",
    plannedWork:
      "safety-first assessment, outdoor power, switchboard checks, service equipment review, data cabling, CCTV and planned quote work",
    propertyMix:
      "remote-access properties, bushland-edge sites, outdoor electrical areas and access-sensitive service equipment",
    setting: "Sutherland Shire remote-access and bushland service area",
    switchboardDetail:
      "access-sensitive service equipment, outdoor circuits, safety switches, RCBO protection and supply-side documentation",
  },
  "sandy-point": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, riverside access notes, limited-access timing, private service equipment details and any defect notice or paperwork",
    commonJobs:
      "riverside and remote-edge fault finding, outdoor power, weather exposure checks, private service equipment, emergency call-first triage, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "riverside outdoor faults, weather-affected electrical equipment, power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and access-sensitive supply questions",
    plannedWork:
      "outdoor power, weather-rated lighting, private service equipment review, switchboard checks, data cabling, CCTV and planned quote work",
    propertyMix:
      "riverside homes, remote-edge properties, outdoor areas and private service equipment",
    setting: "Sutherland Shire riverside and remote-edge service area",
    switchboardDetail:
      "private service equipment, outdoor circuits, weather exposure, safety switches and RCBO protection",
  },
  sutherland: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, apartment or commercial access notes, shared meter-room details, parking information and any defect notice or paperwork",
    commonJobs:
      "apartment faults, office and shop maintenance, civic and commercial building work, strata repairs, business outages, metering, defect notices, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, shop or office outages, shared meter-room issues, heat at outlets, sparking, tripping safety switches and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and commercial or strata supply questions",
    plannedWork:
      "office lighting, shop power, apartment repairs, strata electrical work, metering support, defect notice review, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, offices, shops, civic and commercial buildings, strata sites, homes and shared meter rooms",
    setting: "Sutherland Shire apartment, commercial, strata and civic-building service area",
    switchboardDetail:
      "commercial switchboards, shared meter rooms, metering, strata boards, tenancy loads and safety switch protection",
  },
  sylvania: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, home or apartment access notes, waterfront exposure details, point-of-attachment photos and any defect notice or paperwork",
    commonJobs:
      "home and apartment repairs, shop maintenance, waterfront exposure checks, switchboards, point-of-attachment support, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or apartment power loss, shop circuit faults, storm-affected outdoor circuits, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and waterfront supply questions",
    plannedWork:
      "home lighting, apartment repairs, shop maintenance, waterfront outdoor power, switchboard upgrades, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, apartments, shops, waterfront properties, strata buildings and residential service equipment",
    setting: "Sutherland Shire home, apartment, shop and waterfront service area",
    switchboardDetail:
      "home loads, apartment boards, waterfront exposure, point-of-attachment concerns, safety switches and RCBO protection",
  },
  "sylvania-waters": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, waterfront access notes, larger-property details, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "premium waterfront fault finding, larger-property outdoor power, switchboard upgrades, Level 2 support, consumer mains, CCTV/data and planned electrical work",
    emergencySignals:
      "waterfront outdoor faults, home power loss, storm-affected circuits, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and waterfront supply questions",
    plannedWork:
      "outdoor power, switchboard capacity checks, consumer mains review, premium-home lighting, data cabling, CCTV and planned quote work",
    propertyMix:
      "premium waterfront homes, larger properties, outdoor areas and residential service equipment",
    setting: "Sutherland Shire premium waterfront and larger-property service area",
    switchboardDetail:
      "home loads, consumer mains, outdoor circuits, safety switches, RCBOs and service equipment",
  },
  "taren-point": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, warehouse or showroom access notes, loading details, parking information, site contacts and any defect notice or paperwork",
    commonJobs:
      "warehouse and workshop faults, showroom power, commercial switchboards, business outages, load checks, CCTV/data, service equipment and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse power loss, workshop circuit faults, showroom power issues, heat at outlets, sparking and tripping safety switches",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns, load checks and commercial supply questions",
    plannedWork:
      "warehouse lighting, workshop circuits, showroom power, commercial switchboards, load checks, data cabling, CCTV and planned quote work",
    propertyMix:
      "warehouses, workshops, showrooms, commercial sites, small businesses and service equipment",
    setting: "Sutherland Shire warehouse, workshop and showroom service area",
    switchboardDetail:
      "commercial switchboards, workshop loads, showroom circuits, load checks, safety switches and clear circuit labelling",
  },
  waterfall: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, southern-edge access notes, weather or bushland conditions, parking details and any defect notice or paperwork",
    commonJobs:
      "remote southern-edge fault finding, bushland and storm faults, outdoor power, switchboards, honest access planning, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-related faults, bushland outdoor power issues, home power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and access-sensitive supply questions",
    plannedWork:
      "outdoor power, weather-rated lighting, switchboard checks, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "southern-edge homes, bushland properties, access-sensitive sites, outdoor areas and residential service equipment",
    setting: "Sutherland Shire southern-edge and bushland access service area",
    switchboardDetail:
      "outdoor circuits, bushland exposure, older boards, safety switches and service equipment",
  },
  woolooware: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, apartment or shop access notes, strata contact details, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "apartment repairs, home electrical work, strata access, shop maintenance, switchboards, hot water circuits, outdoor power, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, shop circuit faults, hot water electrical issues, coastal outdoor faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and strata or shopfront supply questions",
    plannedWork:
      "apartment repairs, shop lighting, hot water circuits, outdoor power, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, homes, strata buildings, shops, coastal properties and shared meter rooms",
    setting: "Sutherland Shire apartment, shop and coastal home service area",
    switchboardDetail:
      "apartment boards, shared meter rooms, hot water loads, coastal exposure, safety switches and RCBO protection",
  },
  woronora: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, river or sloped access notes, private service equipment photos and any defect notice or paperwork",
    commonJobs:
      "river and bushland home repairs, sloped-access electrical work, outdoor power, storm faults, private service equipment, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-affected outdoor circuits, river-adjacent faults, home power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and access-sensitive supply questions",
    plannedWork:
      "outdoor power, switchboard upgrades, private service equipment review, weather-rated lighting, data cabling, CCTV and planned quote work",
    propertyMix:
      "river and bushland homes, sloped access sites, outdoor areas and private service equipment",
    setting: "Sutherland Shire river, bushland and sloped-access service area",
    switchboardDetail:
      "private service equipment, outdoor circuits, home loads, safety switches, RCBOs and consumer mains",
  },
  "woronora-heights": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, bushland access notes, outdoor circuit photos, hot water details and any defect notice or paperwork",
    commonJobs:
      "larger-home repairs, bushland-edge outdoor circuits, switchboards, hot water electrical, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "bushland storm faults, outdoor circuit trips, home power loss, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "outdoor circuits, switchboard upgrades, hot water circuits, consumer mains checks, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "larger homes, bushland-edge properties, outdoor areas, hot water loads and residential service equipment",
    setting: "Sutherland Shire larger-home and bushland-edge service area",
    switchboardDetail:
      "home loads, outdoor circuits, hot water loads, consumer mains, safety switches and RCBO protection",
  },
  yarrawarrah: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, bushland street access notes, hot water circuit details, parking notes and any defect notice or paperwork",
    commonJobs:
      "home repairs, bushland-edge fault finding, outdoor power, switchboards, hot water circuits, safety-switch faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "bushland-edge faults, outdoor circuit trips, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for residential properties",
    plannedWork:
      "outdoor power, switchboard upgrades, hot water circuits, safety switch checks, lighting, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, bushland-edge streets, outdoor areas, hot water loads and residential service equipment",
    setting: "Sutherland Shire home and bushland-edge service area",
    switchboardDetail:
      "older boards, outdoor circuits, hot water loads, safety switches and RCBO protection",
  },
  "yowie-bay": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, waterfront or renovation access notes, outdoor circuit photos and any defect notice or paperwork",
    commonJobs:
      "waterfront-home fault finding, outdoor circuits, renovation wiring, weather exposure checks, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront outdoor faults, home power loss, weather-affected electrical equipment, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and waterfront supply questions",
    plannedWork:
      "renovation wiring, outdoor circuits, private service equipment review, switchboard upgrades, data cabling, CCTV and planned quote work",
    propertyMix:
      "waterfront homes, renovated properties, outdoor areas and private service equipment",
    setting: "Sutherland Shire waterfront and renovation service area",
    switchboardDetail:
      "outdoor circuits, private service equipment, home loads, safety switches and RCBO protection",
  },
};

function getSutherlandShireLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "sutherland-shire" ||
    coverageArea.slug !== "sutherland-shire"
  ) {
    return null;
  }

  return sutherlandShireLocalContexts[coverageSuburb.slug] ?? null;
}

const fairfieldLocalContexts: Record<string, LocalPageContext> = {
  abbotsbury: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, driveway or larger-block access notes, parking details and any defect notice or paperwork",
    commonJobs:
      "family-home fault finding, larger-block outdoor power, hot water circuits, switchboard upgrades, consumer mains, CCTV/data and planned quote work",
    emergencySignals:
      "home power loss, outdoor circuit faults, hot water electrical issues, heat at outlets, sparking, storm damage and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and residential supply questions",
    plannedWork:
      "outdoor power, driveway lighting, switchboard upgrades, hot water circuits, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, larger blocks, outdoor areas, sheds, long driveways and residential service equipment",
    setting: "Fairfield family-home and larger-block service area",
    switchboardDetail:
      "home loads, outdoor circuits, hot water loads, safety switches, RCBO protection and consumer mains capacity",
  },
  bonnyrigg: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, villa or duplex access notes, hot water circuit details, parking notes and any defect notice or paperwork",
    commonJobs:
      "home, duplex and villa repairs, older switchboards, safety-switch faults, hot water circuits, power outages, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "power loss, older-board faults, hot water electrical issues, heat at outlets, sparking and repeated safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, duplexes and villas",
    plannedWork:
      "older switchboard upgrades, safety-switch repairs, hot water circuits, lighting, power points, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, duplexes, villas, older switchboards, rental properties and residential service equipment",
    setting: "Fairfield homes, duplexes and villas service area",
    switchboardDetail:
      "older protection, hot water loads, safety switches, RCBOs, clear circuit labelling and consumer mains condition",
  },
  "bonnyrigg-heights": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, driveway or outdoor-area notes, aircon circuit details, parking information and any defect notice or paperwork",
    commonJobs:
      "larger-home fault finding, outdoor lighting, aircon electrical support, switchboard upgrades, consumer mains, CCTV/data and planned quote work",
    emergencySignals:
      "home power loss, outdoor circuit faults, aircon circuit trips, hot outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply capacity questions for larger homes",
    plannedWork:
      "outdoor lighting, aircon circuits, switchboard capacity checks, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "larger homes, family properties, outdoor areas, aircon circuits and residential service equipment",
    setting: "Fairfield larger-home and family-property service area",
    switchboardDetail:
      "larger home loads, aircon circuits, outdoor circuits, safety switches, RCBOs and consumer mains capacity",
  },
  "bossley-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, business or driveway access notes, private service equipment photos and any defect notice or paperwork",
    commonJobs:
      "larger-home repairs, local business maintenance, outdoor power, switchboards, consumer mains, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, local business outages, outdoor circuit faults, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and supply-side questions",
    plannedWork:
      "outdoor power, local business lighting, switchboard capacity checks, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "larger homes, local businesses, outdoor areas, private service equipment and residential service equipment",
    setting: "Fairfield larger-home and local-business service area",
    switchboardDetail:
      "home loads, local business circuits, outdoor circuits, service equipment, safety switches and RCBO protection",
  },
  cabramatta: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, shared meter-room notes, shop or restaurant access details, parking information and any defect notice or paperwork",
    commonJobs:
      "shopfront and restaurant power, apartment faults, strata repairs, older wiring checks, shared meter-room access, business outages, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "restaurant or shop outages, apartment power loss, shared meter-room faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, shared supply concerns and commercial or strata supply questions",
    plannedWork:
      "restaurant circuits, shop lighting, apartment repairs, strata maintenance, switchboard upgrades, data cabling, CCTV and planned quote work",
    propertyMix:
      "shopfronts, restaurants, apartments, strata buildings, older wiring, shared meter rooms and local businesses",
    setting: "Fairfield shopfront, restaurant and strata service area",
    switchboardDetail:
      "shared meter rooms, hospitality loads, shop circuits, older boards, safety switches and clearer circuit labelling",
  },
  "cabramatta-west": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, strata or shop access notes, hot water circuit details, parking notes and any defect notice or paperwork",
    commonJobs:
      "home and unit repairs, local shop maintenance, strata access work, older switchboards, hot water circuits, safety-switch faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or unit power loss, shop circuit faults, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, units and shops",
    plannedWork:
      "older switchboard upgrades, hot water circuits, local shop lighting, unit repairs, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, units, local shops, strata access sites, older switchboards and residential service equipment",
    setting: "Fairfield homes, units and local-shop service area",
    switchboardDetail:
      "older boards, hot water loads, shop circuits, safety switches, RCBOs and clear labelling",
  },
  "canley-heights": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, restaurant or shop access notes, strata entry details, parking information and any defect notice or paperwork",
    commonJobs:
      "restaurant and shop maintenance, apartment faults, home repairs, strata access work, business outages, lighting and power, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "restaurant or shop outages, apartment power loss, hot equipment circuits, heat at outlets, sparking and repeated tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and commercial or strata supply questions",
    plannedWork:
      "restaurant circuits, shop lighting, apartment repairs, home electrical work, switchboard upgrades, data cabling, CCTV and planned quote work",
    propertyMix:
      "restaurants, shops, apartments, homes, strata buildings and local businesses",
    setting: "Fairfield restaurant, shop and apartment service area",
    switchboardDetail:
      "hospitality loads, shop circuits, apartment boards, safety switches, RCBOs and clearer circuit labelling",
  },
  "canley-vale": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, station-area or shop access notes, shared access details, parking information and any defect notice or paperwork",
    commonJobs:
      "home and unit repairs, station-area shopfront maintenance, older-board checks, shared access work, lighting, power, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or unit power loss, shopfront circuit faults, shared access electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, units and shopfronts",
    plannedWork:
      "older switchboard upgrades, shopfront lighting, unit repairs, power points, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, units, station-area properties, shopfronts, older boards and shared access sites",
    setting: "Fairfield station-area home, unit and shopfront service area",
    switchboardDetail:
      "older boards, shopfront circuits, shared access, safety switches, RCBO protection and clear labelling",
  },
  carramar: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, rental or unit access notes, hot water circuit details, parking notes and any defect notice or paperwork",
    commonJobs:
      "older-home repairs, unit maintenance, rental electrical work, switchboard upgrades, hot water circuits, safety-switch faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or unit power loss, hot water electrical faults, heat at outlets, sparking and repeated safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes and units",
    plannedWork:
      "older switchboard upgrades, rental maintenance, hot water circuits, smoke alarms, power points, data cabling, CCTV and planned quote work",
    propertyMix:
      "older homes, units, rental properties, switchboards, hot water circuits and residential service equipment",
    setting: "Fairfield older-home, unit and rental service area",
    switchboardDetail:
      "older protection, hot water loads, safety switches, RCBOs, rental safety needs and clear circuit labelling",
  },
  "cecil-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, gate or long-driveway access notes, shed or outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "acreage fault finding, shed power, outdoor circuits, long-driveway access work, private service equipment, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "property power loss, shed circuit faults, outdoor power hazards, storm damage, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and larger-property supply questions",
    plannedWork:
      "shed circuits, outdoor power, driveway lighting, switchboard capacity checks, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "acreage and larger-block properties, sheds, outdoor areas, long driveways and private service equipment",
    setting: "Fairfield acreage and larger-block service area",
    switchboardDetail:
      "long circuit runs, shed loads, outdoor circuits, private service equipment, safety switches and consumer mains capacity",
  },
  "edensor-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, outdoor-area notes, driveway or parking details, hot water circuit information and any defect notice or paperwork",
    commonJobs:
      "family-home repairs, larger-block outdoor lighting, switchboard upgrades, hot water circuits, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor circuit faults, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes",
    plannedWork:
      "outdoor lighting, hot water circuits, switchboard upgrades, consumer mains review, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "family homes, larger blocks, outdoor lighting areas, hot water circuits and residential service equipment",
    setting: "Fairfield family-home and larger-block service area",
    switchboardDetail:
      "home loads, outdoor circuits, hot water loads, consumer mains, safety switches and RCBO protection",
  },
  fairfield: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, shared meter-room notes, shop or restaurant access details, parking information and any defect notice or paperwork",
    commonJobs:
      "apartment faults, shop and restaurant maintenance, office and retail power, strata access work, shared meter-room faults, business outages, switchboards, consumer mains, defect notices, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, shop or restaurant outages, shared meter-room issues, heat at outlets, sparking and repeated tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, shared supply concerns and commercial or strata supply questions",
    plannedWork:
      "retail lighting, restaurant circuits, apartment repairs, strata electrical work, commercial switchboards, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, shops, offices, restaurants, strata buildings, shared meter rooms, homes and commercial sites",
    setting: "Fairfield apartment, shop, restaurant and commercial service area",
    switchboardDetail:
      "shared meter rooms, commercial switchboards, restaurant loads, strata boards, safety switches and clear circuit labelling",
  },
  "fairfield-east": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, workshop or warehouse access notes, equipment details, operating hours and any defect notice or paperwork",
    commonJobs:
      "industrial and commercial fault finding, workshop circuits, warehouse lighting, business outages, commercial switchboards, load checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, workshop power loss, warehouse circuit faults, equipment circuit trips, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and commercial supply questions",
    plannedWork:
      "warehouse lighting, workshop circuits, commercial switchboards, load capacity checks, data cabling, CCTV and planned commercial quote work",
    propertyMix:
      "industrial and commercial sites, workshops, warehouses, local businesses and service equipment",
    setting: "Fairfield industrial, workshop and warehouse service area",
    switchboardDetail:
      "commercial switchboards, workshop loads, warehouse circuits, three-phase and load checks, safety switches and clear labelling",
  },
  "fairfield-heights": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, strata or shopfront access notes, parking details, older-board photos and any defect notice or paperwork",
    commonJobs:
      "home and unit repairs, shopfront maintenance, strata access work, older switchboards, parking-sensitive jobs, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or unit power loss, shopfront faults, older-board overheating, heat at outlets, sparking and repeated tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, units and shopfronts",
    plannedWork:
      "older switchboard upgrades, shopfront lighting, unit repairs, power points, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, units, shopfronts, strata buildings, older boards and parking-sensitive access sites",
    setting: "Fairfield home, unit and shopfront service area",
    switchboardDetail:
      "older boards, shop circuits, strata access, safety switches, RCBOs and clear labelling",
  },
  "fairfield-west": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, villa or duplex access notes, outdoor fault photos, parking details and any defect notice or paperwork",
    commonJobs:
      "family-home repairs, duplex and villa electrical work, rental maintenance, outdoor faults, switchboard upgrades, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor electrical faults, rental maintenance hazards, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, duplexes and villas",
    plannedWork:
      "outdoor power, switchboard upgrades, rental maintenance, hot water circuits, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, duplexes, villas, rental properties, outdoor areas and residential service equipment",
    setting: "Fairfield family-home, duplex and villa service area",
    switchboardDetail:
      "home loads, outdoor circuits, hot water loads, consumer mains, safety switches and RCBO protection",
  },
  "greenfield-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, outdoor-area notes, hot water circuit details, parking notes and any defect notice or paperwork",
    commonJobs:
      "family-home fault finding, larger-block repairs, switchboard upgrades, hot water circuits, outdoor power, safety switches, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor power faults, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes",
    plannedWork:
      "hot water circuits, outdoor power, switchboard upgrades, smoke alarms, safety-switch repairs, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, larger blocks, outdoor areas, hot water circuits and residential service equipment",
    setting: "Fairfield family-home and outdoor-power service area",
    switchboardDetail:
      "home loads, outdoor circuits, hot water loads, safety switches, RCBOs and consumer mains capacity",
  },
  "horsley-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, gate or long-driveway access notes, warehouse or shed details and any defect notice or paperwork",
    commonJobs:
      "acreage and rural-edge fault finding, warehouse power, shed circuits, workshop maintenance, long-driveway access work, load checks, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "property power loss, warehouse or shed outages, outdoor power hazards, equipment circuit trips, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns, load checks and larger-property supply questions",
    plannedWork:
      "shed circuits, warehouse lighting, workshop power, driveway lighting, load capacity checks, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "acreage and rural-edge properties, warehouses, sheds, workshops, long driveways and private service equipment",
    setting: "Fairfield acreage, warehouse and workshop service area",
    switchboardDetail:
      "long circuit runs, shed and warehouse loads, three-phase and load checks, private service equipment and safety switches",
  },
  lansvale: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, river-adjacent or outdoor access notes, hot water circuit details, parking notes and any defect notice or paperwork",
    commonJobs:
      "river-adjacent home repairs, older switchboards, outdoor power, hot water circuits, safety-switch faults, small business maintenance, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm or water-adjacent outdoor faults, home power loss, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes and small businesses",
    plannedWork:
      "outdoor power, hot water circuits, older switchboard upgrades, safety-switch repairs, small business lighting, data cabling, CCTV and planned quote work",
    propertyMix:
      "river-adjacent homes, older switchboards, outdoor areas, hot water circuits and small businesses",
    setting: "Fairfield river-adjacent home and small-business service area",
    switchboardDetail:
      "older boards, outdoor circuits, hot water loads, safety switches, RCBOs and service equipment",
  },
  "mount-pritchard": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, business or unit access notes, hot water circuit details, parking information and any defect notice or paperwork",
    commonJobs:
      "home repairs, unit electrical work, local business maintenance, lighting and power, hot water circuits, switchboards, urgent outages, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or business power loss, unit circuit faults, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, units and local businesses",
    plannedWork:
      "lighting, power points, hot water circuits, local business maintenance, switchboard upgrades, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, local businesses, units, hot water circuits, lighting and power circuits",
    setting: "Fairfield home, unit and local-business service area",
    switchboardDetail:
      "home loads, business circuits, hot water loads, safety switches, RCBO protection and clear labelling",
  },
  "old-guildford": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, rental or unit access notes, hot water circuit details, parking notes and any defect notice or paperwork",
    commonJobs:
      "older-home repairs, unit maintenance, rental electrical work, switchboard upgrades, safety-switch tripping, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "older-home power loss, unit circuit faults, hot water electrical issues, heat at outlets, sparking and repeated safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes and units",
    plannedWork:
      "older switchboard upgrades, rental maintenance, safety-switch repairs, hot water circuits, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "older homes, units, rental properties, switchboards, safety switches and hot water circuits",
    setting: "Fairfield older-home, unit and rental-maintenance service area",
    switchboardDetail:
      "older protection, hot water loads, safety switches, RCBOs, rental safety needs and clear labelling",
  },
  prairiewood: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, shop or medical access notes, parking details, metering or defect notice photos and any paperwork",
    commonJobs:
      "home repairs, shop and medical property maintenance, business outages, switchboards, consumer mains, metering, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, shop or medical property outages, equipment circuit trips, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and commercial or residential supply questions",
    plannedWork:
      "shop lighting, medical property power, switchboard upgrades, consumer mains review, metering support, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, shops, medical and retail properties, local businesses, switchboards and service equipment",
    setting: "Fairfield home, shop and medical-property service area",
    switchboardDetail:
      "home loads, business circuits, metering, consumer mains, safety switches and clear circuit labelling",
  },
  smithfield: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, warehouse or factory access notes, equipment details, operating hours and any defect notice or paperwork",
    commonJobs:
      "industrial estate fault finding, warehouse lighting, factory and workshop circuits, business outages, commercial switchboards, three-phase and load checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse or factory power loss, workshop circuit faults, equipment trips, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and industrial supply questions",
    plannedWork:
      "warehouse lighting, factory circuits, workshop power, commercial switchboards, load capacity checks, data cabling, CCTV and planned quote work",
    propertyMix:
      "industrial estates, warehouses, factories, workshops, commercial switchboards and service equipment",
    setting: "Fairfield industrial estate, warehouse and factory service area",
    switchboardDetail:
      "commercial switchboards, three-phase and load checks, factory loads, workshop circuits, safety switches and clear circuit labelling",
  },
  "st-johns-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, driveway or outdoor-area notes, hot water circuit details, parking notes and any defect notice or paperwork",
    commonJobs:
      "home and larger-property repairs, switchboard upgrades, lighting and power, hot water circuits, outdoor circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor circuit faults, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for residential properties",
    plannedWork:
      "lighting, power points, hot water circuits, outdoor power, switchboard upgrades, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, larger residential properties, outdoor areas, hot water circuits and residential service equipment",
    setting: "Fairfield home and larger-residential-property service area",
    switchboardDetail:
      "home loads, outdoor circuits, hot water loads, safety switches, RCBOs and consumer mains capacity",
  },
  wakeley: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, villa or rental access notes, hot water circuit details, parking notes and any defect notice or paperwork",
    commonJobs:
      "family-home repairs, villa electrical work, rental maintenance, switchboards, hot water circuits, safety-switch faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, villa circuit faults, hot water electrical issues, heat at outlets, sparking and repeated safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes and villas",
    plannedWork:
      "switchboard upgrades, rental maintenance, hot water circuits, safety-switch repairs, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, villas, rental properties, switchboards, hot water circuits and safety switches",
    setting: "Fairfield family-home, villa and rental-maintenance service area",
    switchboardDetail:
      "home loads, hot water circuits, safety switches, RCBO protection, rental safety needs and clear labelling",
  },
  "wetherill-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, warehouse or showroom access notes, equipment details, operating hours and any defect notice or paperwork",
    commonJobs:
      "warehouse, factory and showroom fault finding, workshop power, business outages, commercial switchboards, load capacity checks, CCTV/data, planned maintenance and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse or factory power loss, showroom circuit faults, equipment trips, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and commercial or industrial supply questions",
    plannedWork:
      "warehouse lighting, factory circuits, showroom power, commercial switchboards, load capacity checks, planned maintenance, data cabling, CCTV and planned quote work",
    propertyMix:
      "warehouses, factories, showrooms, workshops, commercial switchboards, service equipment and business sites",
    setting: "Fairfield warehouse, factory and showroom service area",
    switchboardDetail:
      "commercial switchboards, three-phase and load checks, workshop circuits, showroom loads, safety switches and clear labelling",
  },
  yennora: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, transport or warehouse access notes, equipment details, operating hours and any defect notice or paperwork",
    commonJobs:
      "transport and logistics site fault finding, warehouse lighting, workshop power, business outages, commercial switchboards, load checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse power loss, transport site circuit faults, equipment trips, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and logistics site supply questions",
    plannedWork:
      "warehouse lighting, workshop circuits, loading-area power, commercial switchboards, load checks, data cabling, CCTV and planned quote work",
    propertyMix:
      "warehouses, transport and logistics sites, workshops, commercial switchboards and business service equipment",
    setting: "Fairfield transport, logistics and warehouse service area",
    switchboardDetail:
      "commercial switchboards, warehouse loads, transport site circuits, load checks, safety switches and clear circuit labelling",
  },
};

function getFairfieldLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "liverpool-and-fairfield" ||
    coverageArea.slug !== "fairfield"
  ) {
    return null;
  }

  return fairfieldLocalContexts[coverageSuburb.slug] ?? null;
}

const liverpoolLocalContexts: Record<string, LocalPageContext> = {
  ashcroft: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, rental access notes, hot water circuit details, parking details and any defect notice or paperwork",
    commonJobs:
      "older-home repairs, rental maintenance, safety-switch faults, switchboard upgrades, hot water circuits, lighting and power repairs, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "older-home power loss, rental maintenance hazards, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes and rentals",
    plannedWork:
      "switchboard upgrades, hot water circuits, safety-switch repairs, smoke alarms, lighting, power points, data cabling, CCTV and planned quote work",
    propertyMix:
      "older homes, rental properties, family houses, hot water circuits and residential service equipment",
    setting: "Liverpool older-home and rental-maintenance service area",
    switchboardDetail:
      "older protection, hot water loads, rental safety needs, safety switches, RCBOs and clear circuit labelling",
  },
  austral: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, builder or site access notes, aircon or EV load details, parking information and any defect notice or paperwork",
    commonJobs:
      "new-home and duplex electrical work, construction and new-build electrical, switchboard capacity checks, aircon circuits, EV-ready loads, consumer mains, metering, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "new-estate power loss, aircon circuit trips, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, new-build supply questions and load capacity checks",
    plannedWork:
      "new circuits, aircon electrical support, EV-ready load checks, switchboard upgrades, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "new homes, duplexes, growth-corridor properties, construction sites and residential service equipment",
    setting: "Liverpool new-estate and construction-growth service area",
    switchboardDetail:
      "new-home loads, aircon circuits, EV-ready capacity, consumer mains, safety switches and RCBO protection",
  },
  "badgerys-creek": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, gate or long-driveway access notes, shed or warehouse details, site contacts and any defect notice or paperwork",
    commonJobs:
      "airport-precinct fault finding, rural property electrical work, shed power, warehouse and workshop circuits, private service equipment, three-phase and load checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "property power loss, warehouse or shed outages, outdoor power hazards, equipment circuit trips, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns, load checks and airport-edge supply questions",
    plannedWork:
      "shed circuits, warehouse lighting, workshop power, long-driveway lighting, load capacity checks, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "airport-growth precincts, rural properties, sheds, warehouses, workshops, long driveways and private service equipment",
    setting: "Liverpool airport-edge, rural and warehouse service area",
    switchboardDetail:
      "commercial switchboards, shed loads, long circuit runs, three-phase and load checks, private service equipment and safety switches",
  },
  busby: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, rental access notes, hot water circuit details, parking information and any defect notice or paperwork",
    commonJobs:
      "older-home repairs, rental maintenance, power loss fault finding, safety switches, lighting and power repairs, switchboards, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "power loss, older-board overheating, hot water electrical faults, heat at outlets, sparking and repeated safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes and rentals",
    plannedWork:
      "lighting repairs, power points, hot water circuits, switchboard upgrades, safety-switch repairs, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "older homes, rental properties, family houses, hot water circuits and residential service equipment",
    setting: "Liverpool older-home and rental-maintenance service area",
    switchboardDetail:
      "older boards, hot water loads, rental safety needs, safety switches, RCBO protection and clear labelling",
  },
  "carnes-hill": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, local shop access notes, aircon or EV load details, parking information and any defect notice or paperwork",
    commonJobs:
      "newer-home repairs, local shop maintenance, family-home electrical work, aircon load checks, EV-ready circuits, switchboard capacity checks, hot water faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or local shop power loss, aircon circuit trips, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and load capacity questions for homes and local shops",
    plannedWork:
      "aircon circuits, EV-ready load checks, switchboard upgrades, hot water circuits, local shop lighting, data cabling, CCTV and planned quote work",
    propertyMix:
      "newer homes, family properties, local shops, aircon loads, EV-ready circuits and residential service equipment",
    setting: "Liverpool newer-home and local-shop service area",
    switchboardDetail:
      "newer home loads, aircon circuits, EV-ready capacity, hot water loads, safety switches and RCBO protection",
  },
  cartwright: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, unit or rental access notes, hot water circuit details, parking details and any defect notice or paperwork",
    commonJobs:
      "older-home and unit repairs, rental maintenance, switchboard upgrades, safety-switch faults, hot water circuits, lighting and power repairs, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "older-home or unit power loss, hot water electrical faults, heat at outlets, sparking and repeated safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes and units",
    plannedWork:
      "rental maintenance, switchboard upgrades, safety-switch repairs, hot water circuits, power points, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "older homes, units, rental properties, switchboards, hot water circuits and residential service equipment",
    setting: "Liverpool older-home, unit and rental-maintenance service area",
    switchboardDetail:
      "older boards, rental safety needs, hot water loads, safety switches, RCBOs and clear labelling",
  },
  casula: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, apartment or warehouse access notes, tenant or site contact details, parking information and any defect notice or paperwork",
    commonJobs:
      "home, duplex and apartment repairs, shop and warehouse maintenance, commercial tenancy work, business outages, switchboards, defect notices, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or apartment power loss, shop or warehouse outages, commercial circuit faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, commercial supply questions and strata or tenancy supply issues",
    plannedWork:
      "apartment repairs, shop lighting, warehouse circuits, commercial tenancy changes, switchboard upgrades, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, duplexes, apartments, shops, warehouses, commercial tenancies and strata properties",
    setting: "Liverpool home, apartment, warehouse and commercial-tenancy service area",
    switchboardDetail:
      "commercial switchboards, apartment boards, tenancy loads, consumer mains, safety switches and clear circuit labelling",
  },
  "cecil-hills": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, driveway or outdoor-area notes, aircon circuit details and any defect notice or paperwork",
    commonJobs:
      "larger-home repairs, family-property electrical work, outdoor lighting, switchboard upgrades, aircon circuits, consumer mains, defect notice support, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, aircon circuit trips, outdoor power faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for larger homes",
    plannedWork:
      "outdoor lighting, aircon circuits, switchboard capacity checks, hot water circuits, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "larger homes, family properties, outdoor areas, aircon circuits and residential service equipment",
    setting: "Liverpool larger-home and family-property service area",
    switchboardDetail:
      "larger home loads, aircon circuits, outdoor circuits, consumer mains, safety switches and RCBO protection",
  },
  "chipping-norton": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, warehouse or strata access notes, outdoor power photos, parking details and any defect notice or paperwork",
    commonJobs:
      "lakeside home repairs, warehouse and workshop faults, commercial switchboards, business outages, strata and unit electrical work, outdoor power, storm and water-affected faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse power loss, unit power loss, storm or water-affected electrical areas, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and commercial or strata supply questions",
    plannedWork:
      "warehouse lighting, workshop circuits, strata electrical work, outdoor power, commercial switchboards, load checks, data cabling, CCTV and planned quote work",
    propertyMix:
      "lakeside homes, industrial sites, warehouses, workshops, strata buildings, units and outdoor electrical areas",
    setting: "Liverpool lakeside, industrial and strata service area",
    switchboardDetail:
      "commercial switchboards, strata boards, workshop loads, weather exposure, safety switches and clear labelling",
  },
  "edmondson-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, strata or property-manager access notes, aircon or EV load details, parking information and any defect notice or paperwork",
    commonJobs:
      "new-estate and townhouse electrical work, apartment repairs, switchboard capacity checks, aircon and EV-ready loads, new-build defect questions, consumer mains, metering, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "new-estate power loss, apartment circuit faults, aircon circuit trips, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, new-build supply questions and load capacity checks",
    plannedWork:
      "aircon circuits, EV-ready load checks, new-build defect review, switchboard upgrades, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "new estates, townhouses, apartments, property-manager access sites, aircon loads and residential service equipment",
    setting: "Liverpool new-estate, townhouse and apartment service area",
    switchboardDetail:
      "newer loads, aircon and EV-ready capacity, consumer mains, apartment boards, safety switches and RCBO protection",
  },
  "elizabeth-hills": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, duplex or outdoor-area notes, aircon circuit details and any defect notice or paperwork",
    commonJobs:
      "newer family-home repairs, duplex electrical work, switchboard upgrades, aircon circuits, hot water faults, safety switches, outdoor lighting, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, aircon circuit trips, hot water electrical faults, outdoor power issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for newer homes and duplexes",
    plannedWork:
      "aircon circuits, outdoor lighting, hot water circuits, switchboard upgrades, safety-switch repairs, data cabling, CCTV and planned quote work",
    propertyMix:
      "newer family homes, duplexes, outdoor areas, aircon circuits and residential service equipment",
    setting: "Liverpool newer-family-home and duplex service area",
    switchboardDetail:
      "newer home loads, aircon circuits, hot water loads, outdoor circuits, safety switches and RCBO protection",
  },
  "green-valley": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, outdoor-area notes, hot water circuit details, parking information and any defect notice or paperwork",
    commonJobs:
      "family-home repairs, older switchboard checks, hot water circuits, safety-switch tripping, outdoor power, smoke alarms, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, hot water electrical faults, outdoor power issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes",
    plannedWork:
      "older switchboard upgrades, hot water circuits, outdoor power, smoke alarms, safety-switch repairs, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, older switchboards, outdoor areas, hot water circuits and residential service equipment",
    setting: "Liverpool family-home and older-switchboard service area",
    switchboardDetail:
      "older boards, hot water loads, outdoor circuits, safety switches, RCBOs and consumer mains condition",
  },
  greendale: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, gate or long-driveway access notes, shed and outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "rural and acreage home fault finding, shed power, outdoor circuits, long-driveway access work, private service equipment, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural property power loss, shed circuit faults, outdoor power hazards, storm damage, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed circuits, outdoor power, driveway lighting, switchboard capacity checks, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "rural and acreage homes, long driveways, sheds, outdoor areas and private service equipment",
    setting: "Liverpool rural and acreage service area",
    switchboardDetail:
      "long circuit runs, shed loads, outdoor circuits, private service equipment, safety switches and consumer mains capacity",
  },
  hammondville: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, renovation notes, hot water circuit details, parking information and any defect notice or paperwork",
    commonJobs:
      "family-home repairs, older-board checks, renovation electrical work, hot water circuits, safety switches, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, hot water electrical faults, renovation circuit issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes",
    plannedWork:
      "renovation wiring, older switchboard upgrades, hot water circuits, safety-switch repairs, lighting, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, older boards, renovated properties, hot water circuits and residential service equipment",
    setting: "Liverpool family-home, renovation and older-board service area",
    switchboardDetail:
      "older boards, renovation capacity, hot water loads, safety switches, RCBOs and consumer mains condition",
  },
  heckenberg: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, rental access notes, hot water circuit details, parking details and any defect notice or paperwork",
    commonJobs:
      "older-home repairs, rental maintenance, lighting and power repairs, safety-switch faults, hot water circuits, switchboards, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "older-home power loss, rental maintenance hazards, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes and rentals",
    plannedWork:
      "lighting repairs, power points, rental maintenance, hot water circuits, switchboard upgrades, safety-switch repairs, CCTV/data and planned quote work",
    propertyMix:
      "older homes, rental properties, lighting and power circuits, hot water circuits and residential service equipment",
    setting: "Liverpool older-home and rental-maintenance service area",
    switchboardDetail:
      "older protection, hot water loads, rental safety needs, safety switches and RCBO protection",
  },
  hinchinbrook: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, villa or outdoor-area notes, aircon circuit details, parking information and any defect notice or paperwork",
    commonJobs:
      "family-home, duplex and villa repairs, switchboard upgrades, hot water circuits, outdoor power, safety switches, aircon circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, villa circuit faults, aircon circuit trips, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes, duplexes and villas",
    plannedWork:
      "switchboard upgrades, hot water circuits, outdoor power, aircon circuits, safety-switch repairs, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, duplexes, villas, outdoor areas, aircon circuits and residential service equipment",
    setting: "Liverpool family-home, duplex and villa service area",
    switchboardDetail:
      "home loads, aircon circuits, outdoor circuits, hot water loads, safety switches and RCBO protection",
  },
  "horningsea-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, outdoor-area notes, aircon or EV load details, parking information and any defect notice or paperwork",
    commonJobs:
      "family-home and newer-estate electrical work, outdoor lighting, aircon circuits, EV-ready load checks, switchboard upgrades, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, aircon circuit trips, outdoor power issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and load capacity questions for newer estates",
    plannedWork:
      "outdoor lighting, aircon circuits, EV-ready load checks, switchboard upgrades, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, newer estates, outdoor areas, aircon circuits and residential service equipment",
    setting: "Liverpool family-home and newer-estate service area",
    switchboardDetail:
      "newer home loads, aircon circuits, EV-ready capacity, outdoor circuits, safety switches and consumer mains capacity",
  },
  "hoxton-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, local shop access notes, aircon circuit details, parking information and any defect notice or paperwork",
    commonJobs:
      "home repairs, local shop maintenance, commercial pocket electrical work, switchboards, hot water circuits, aircon circuits, safety switches, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, local shop circuit faults, aircon circuit trips, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes and local businesses",
    plannedWork:
      "local shop lighting, switchboard upgrades, hot water circuits, aircon circuits, safety-switch repairs, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, local shops, commercial pockets, hot water circuits, aircon loads and residential service equipment",
    setting: "Liverpool home, local-shop and commercial-pocket service area",
    switchboardDetail:
      "home loads, local business circuits, aircon and hot water loads, safety switches and RCBO protection",
  },
  "kemps-creek": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, warehouse or logistics access notes, gate or long-driveway details, equipment information and any defect notice or paperwork",
    commonJobs:
      "airport-growth and industrial fault finding, warehouse and logistics power, shed and workshop circuits, rural-edge property work, business outages, three-phase and load checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse or logistics power loss, shed circuit faults, equipment trips, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, load checks and airport-growth supply questions",
    plannedWork:
      "warehouse lighting, logistics site power, shed circuits, workshop circuits, load capacity checks, private service equipment review, data cabling, CCTV and planned quote work",
    propertyMix:
      "airport-growth precincts, industrial sites, warehouses, logistics sites, sheds, workshops, rural-edge properties and long access points",
    setting: "Liverpool airport-growth, industrial and rural-edge service area",
    switchboardDetail:
      "commercial switchboards, three-phase and load checks, warehouse loads, shed circuits, private service equipment and safety switches",
  },
  liverpool: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, shared meter-room notes, suite or tenancy access details, parking information and any defect notice or paperwork",
    commonJobs:
      "apartment and strata repairs, shop and restaurant maintenance, medical and retail suite power, shared meter-room access, business outages, commercial switchboards, consumer mains, defect notices, metering, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, shop or restaurant outages, shared meter-room issues, medical or retail suite circuit faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, shared supply concerns and commercial or strata supply questions",
    plannedWork:
      "retail lighting, restaurant circuits, medical suite power, apartment repairs, strata electrical work, commercial switchboards, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, strata buildings, shops, restaurants, medical and retail suites, shared meter rooms, homes and commercial sites",
    setting: "Liverpool apartment, strata, retail and commercial service area",
    switchboardDetail:
      "shared meter rooms, commercial switchboards, strata boards, tenancy loads, metering, safety switches and clear circuit labelling",
  },
  luddenham: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, gate or long-driveway access notes, shed or new-development details and any defect notice or paperwork",
    commonJobs:
      "airport-growth and rural-edge electrical work, acreage repairs, shed power, new development support, long-driveway access work, private service equipment, consumer mains, metering, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "property power loss, shed circuit faults, outdoor power hazards, new development supply issues, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and airport-growth supply questions",
    plannedWork:
      "shed circuits, new development support, outdoor power, driveway lighting, switchboard capacity checks, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "airport-growth sites, rural-edge properties, acreage blocks, sheds, new development areas, long driveways and private service equipment",
    setting: "Liverpool airport-growth and rural-edge service area",
    switchboardDetail:
      "private service equipment, long circuit runs, shed loads, consumer mains, safety switches and load capacity",
  },
  lurnea: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, villa or rental access notes, hot water circuit details and any defect notice or paperwork",
    commonJobs:
      "older-home repairs, villa electrical work, rental maintenance, switchboard upgrades, hot water circuits, safety switches, power faults, smoke alarms, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, villa circuit faults, hot water electrical issues, heat at outlets, sparking and repeated safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes and villas",
    plannedWork:
      "switchboard upgrades, hot water circuits, rental maintenance, safety-switch repairs, smoke alarms, lighting, data cabling, CCTV and planned quote work",
    propertyMix:
      "older homes, villas, rental properties, hot water circuits, safety switches and residential service equipment",
    setting: "Liverpool older-home, villa and rental-maintenance service area",
    switchboardDetail:
      "older boards, hot water loads, rental safety needs, safety switches, RCBOs and clear labelling",
  },
  "middleton-grange": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, outdoor-area notes, aircon or EV load details and any defect notice or paperwork",
    commonJobs:
      "newer-home repairs, family-property electrical work, aircon and EV-ready load checks, switchboard capacity planning, outdoor lighting, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, aircon circuit trips, outdoor power faults, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and load capacity questions for newer homes",
    plannedWork:
      "aircon circuits, EV-ready load checks, outdoor lighting, switchboard upgrades, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "newer homes, family properties, outdoor areas, aircon and EV-ready loads and residential service equipment",
    setting: "Liverpool newer-home and family-property service area",
    switchboardDetail:
      "newer home loads, aircon and EV-ready capacity, outdoor circuits, consumer mains, safety switches and RCBO protection",
  },
  miller: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, rental access notes, hot water circuit details, parking information and any defect notice or paperwork",
    commonJobs:
      "older-home repairs, rental maintenance, safety-switch tripping, hot water circuits, switchboards, lighting and power repairs, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "older-home power loss, rental maintenance hazards, hot water electrical faults, heat at outlets, sparking and repeated safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes and rentals",
    plannedWork:
      "rental maintenance, hot water circuits, switchboard upgrades, safety-switch repairs, lighting repairs, power points, CCTV/data and planned quote work",
    propertyMix:
      "older homes, rental properties, hot water circuits, safety switches and residential service equipment",
    setting: "Liverpool older-home and rental-maintenance service area",
    switchboardDetail:
      "older protection, rental safety needs, hot water loads, safety switches and RCBO protection",
  },
  moorebank: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, warehouse or logistics access notes, equipment details, operating hours and any defect notice or paperwork",
    commonJobs:
      "warehouse and logistics site fault finding, factory and workshop circuits, commercial suite power, business outages, commercial switchboards, three-phase and load checks, CCTV/data and Level 2 supply-side enquiries",
    emergencySignals:
      "business outages, warehouse or factory power loss, workshop circuit faults, equipment trips, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and commercial supply-side questions",
    plannedWork:
      "warehouse lighting, logistics site power, factory circuits, workshop circuits, commercial switchboards, load capacity checks, data cabling, CCTV and planned quote work",
    propertyMix:
      "warehouses, logistics sites, factories, commercial suites, workshops, homes and service equipment",
    setting: "Liverpool warehouse, logistics and factory service area",
    switchboardDetail:
      "commercial switchboards, three-phase and load checks, warehouse loads, workshop circuits, safety switches and clear circuit labelling",
  },
  "pleasure-point": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, riverside or outdoor access notes, private service equipment photos and any defect notice or paperwork",
    commonJobs:
      "riverside-home repairs, larger-block electrical work, outdoor power, weather exposure checks, private service equipment, point of attachment and consumer mains support, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "riverside outdoor faults, storm or water-affected electrical areas, home power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and riverside supply questions",
    plannedWork:
      "outdoor power, weather-rated lighting, switchboard upgrades, point of attachment review, consumer mains checks, data cabling, CCTV and planned quote work",
    propertyMix:
      "riverside homes, larger blocks, outdoor areas, weather-exposed circuits and private service equipment",
    setting: "Liverpool riverside and larger-block service area",
    switchboardDetail:
      "outdoor circuits, private service equipment, consumer mains, weather exposure, safety switches and RCBO protection",
  },
  prestons: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, warehouse or logistics access notes, equipment details, residential access notes and any defect notice or paperwork",
    commonJobs:
      "warehouse and logistics site fault finding, workshop circuits, business outages, commercial switchboards, load checks, residential switchboards, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse power loss, workshop circuit faults, home power loss, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and residential or commercial supply questions",
    plannedWork:
      "warehouse lighting, logistics site power, workshop circuits, residential switchboard upgrades, hot water circuits, load capacity checks, data cabling, CCTV and planned quote work",
    propertyMix:
      "warehouses, logistics sites, workshops, homes, newer estates, commercial switchboards and residential service equipment",
    setting: "Liverpool warehouse, logistics and residential service area",
    switchboardDetail:
      "commercial switchboards, warehouse loads, residential loads, hot water circuits, safety switches and load capacity",
  },
  sadleir: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, rental access notes, hot water circuit details, parking information and any defect notice or paperwork",
    commonJobs:
      "older-home repairs, rental maintenance, switchboard upgrades, power faults, safety switches, hot water circuits, general repairs, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "older-home power loss, rental maintenance hazards, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes and rentals",
    plannedWork:
      "switchboard upgrades, hot water circuits, safety-switch repairs, lighting repairs, power points, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "older homes, rental properties, hot water circuits, switchboards and residential service equipment",
    setting: "Liverpool older-home and rental-maintenance service area",
    switchboardDetail:
      "older boards, rental safety needs, hot water loads, safety switches and RCBO protection",
  },
  "voyager-point": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, riverside or bushland access notes, outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "riverside and bushland-edge home repairs, outdoor power, storm exposure checks, private service equipment, access-sensitive work, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "storm-exposed outdoor faults, riverside or bushland-edge power issues, home power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and access-sensitive supply questions",
    plannedWork:
      "outdoor power, weather-rated lighting, switchboard upgrades, private service equipment review, data cabling, CCTV and planned quote work",
    propertyMix:
      "riverside homes, bushland-edge properties, outdoor areas, access-sensitive sites and private service equipment",
    setting: "Liverpool riverside and bushland-edge service area",
    switchboardDetail:
      "outdoor circuits, weather exposure, private service equipment, consumer mains, safety switches and RCBO protection",
  },
  wallacia: {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, gate or long-driveway access notes, shed or outdoor power photos and any defect notice or paperwork",
    commonJobs:
      "rural and acreage home repairs, shed power, outdoor circuits, long-driveway access work, private service equipment, switchboards, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural property power loss, shed circuit faults, outdoor power hazards, storm damage, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed circuits, outdoor power, driveway lighting, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "rural and acreage homes, long driveways, sheds, outdoor areas and private service equipment",
    setting: "Liverpool rural and acreage service area",
    switchboardDetail:
      "long circuit runs, shed loads, outdoor circuits, consumer mains, private service equipment and safety switches",
  },
  "warwick-farm": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, apartment or workshop access notes, warehouse entry details, parking information and any defect notice or paperwork",
    commonJobs:
      "commercial, industrial and residential fault finding, apartment repairs, workshop and warehouse circuits, business outages, commercial switchboards, lighting and power, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, apartment power loss, workshop or warehouse circuit faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and commercial or strata supply questions",
    plannedWork:
      "warehouse lighting, workshop circuits, apartment repairs, commercial switchboards, lighting, power points, data cabling, CCTV and planned quote work",
    propertyMix:
      "commercial sites, industrial sites, apartments, workshops, warehouses, homes and service equipment",
    setting: "Liverpool commercial, industrial and apartment service area",
    switchboardDetail:
      "commercial switchboards, apartment boards, workshop loads, warehouse circuits, safety switches and clear circuit labelling",
  },
  "wattle-grove": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, driveway or outdoor-area notes, aircon or hot water details and any defect notice or paperwork",
    commonJobs:
      "family-home repairs, switchboard upgrades, outdoor lighting, hot water circuits, safety switches, aircon circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, aircon circuit trips, hot water electrical faults, outdoor power issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes",
    plannedWork:
      "outdoor lighting, hot water circuits, aircon circuits, switchboard upgrades, safety-switch repairs, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, outdoor areas, hot water circuits, aircon loads and residential service equipment",
    setting: "Liverpool family-home and outdoor-lighting service area",
    switchboardDetail:
      "home loads, aircon circuits, hot water loads, outdoor circuits, safety switches and RCBO protection",
  },
  "west-hoxton": {
    accessDetail:
      "photos of the switchboard, meter box, affected fixture, outdoor-area notes, aircon or EV load details and any defect notice or paperwork",
    commonJobs:
      "larger-home and newer-estate electrical work, outdoor power, aircon and EV-ready load checks, switchboards, consumer mains, hot water circuits, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, aircon circuit trips, outdoor power faults, hot water electrical issues, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and load capacity questions for larger homes and newer estates",
    plannedWork:
      "outdoor power, aircon circuits, EV-ready load checks, switchboard upgrades, consumer mains review, hot water circuits, data cabling, CCTV and planned quote work",
    propertyMix:
      "larger homes, newer estates, outdoor areas, aircon and EV-ready loads and residential service equipment",
    setting: "Liverpool larger-home and newer-estate service area",
    switchboardDetail:
      "newer home loads, aircon and EV-ready capacity, outdoor circuits, hot water loads, consumer mains and safety switches",
  },
};

function getLiverpoolLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "liverpool-and-fairfield" ||
    coverageArea.slug !== "liverpool"
  ) {
    return null;
  }

  return liverpoolLocalContexts[coverageSuburb.slug] ?? null;
}

const camdenLocalContexts: Record<string, LocalPageContext> = {
  bringelly: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, long-driveway or gate access notes, shed or workshop details, load-check notes and any defect notice or paperwork",
    commonJobs:
      "airport-growth and acreage electrical work, shed and workshop power, outdoor power, private service equipment, three-phase and load checks, switchboard capacity, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage power loss, shed or workshop outages, outdoor power hazards, equipment trips, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and airport-growth supply questions",
    plannedWork:
      "shed power, workshop power, outdoor lighting, switchboard capacity checks, three-phase and load checks, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "airport-growth sites, acreage homes, long driveways, sheds, workshops, outdoor areas and private service equipment",
    setting: "Camden airport-growth and acreage service area",
    switchboardDetail:
      "acreage loads, shed and workshop demand, three-phase and load checks, private service equipment, safety switches and consumer mains capacity",
  },
  camden: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, town-centre access notes, shop or suite contact details, parking information and any defect notice or paperwork",
    commonJobs:
      "town-centre shop maintenance, cafe and retail suite power, older-home repairs, family-home electrical work, strata repairs, business outages, consumer mains, defect notices, metering, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "shop or cafe outages, home power loss, strata shared-power issues, hot outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, shops, strata sites and retail suites",
    plannedWork:
      "shop lighting, cafe power, older-home repairs, family-home upgrades, strata electrical work, switchboard upgrades, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "town-centre shops, cafes, offices, older homes, family homes, strata buildings and service equipment",
    setting: "Camden town-centre, older-home and strata service area",
    switchboardDetail:
      "older boards, shop loads, strata boards, consumer mains, metering, safety switches and clear circuit labelling",
  },
  "camden-south": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, renovation or outdoor-area notes, hot water circuit details, parking information and any defect notice or paperwork",
    commonJobs:
      "family-home electrical work, older switchboard checks, renovation wiring, outdoor power, safety switches, hot water electrical, CCTV/data and Level 2 support",
    emergencySignals:
      "home power loss, older-board overheating, outdoor power hazards, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes and renovations",
    plannedWork:
      "renovation wiring, outdoor power, switchboard upgrades, hot water electrical, safety-switch repairs, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, older switchboards, renovations, outdoor areas, hot water loads and residential service equipment",
    setting: "Camden South family-home and renovation service area",
    switchboardDetail:
      "older switchboards, renovation loads, hot water loads, outdoor power, safety switches and RCBO protection",
  },
  "catherine-field": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, builder or site access notes, aircon or EV load details, parking information and any defect notice or paperwork",
    commonJobs:
      "new-home and duplex electrical work, construction and new-build electrical, growth-corridor support, aircon and EV load checks, switchboard capacity, consumer mains, metering and Level 2 enquiries",
    emergencySignals:
      "new-estate power loss, construction defect concerns, aircon circuit trips, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, new-build supply questions and switchboard capacity checks",
    plannedWork:
      "new-build electrical, construction defect review, aircon circuits, EV-ready load checks, switchboard capacity checks, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "new homes, duplexes, construction sites, growth-corridor properties, aircon loads, EV-ready loads and residential service equipment",
    setting: "Camden growth-corridor and new-build service area",
    switchboardDetail:
      "new-home loads, aircon and EV-ready capacity, consumer mains, metering, safety switches and RCBO protection",
  },
  cawdor: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, gate or long-driveway access notes, shed or outdoor power photos, private service equipment details and any defect notice or paperwork",
    commonJobs:
      "acreage and rural property electrical work, long-driveway access jobs, shed power, outdoor power, private pole and service equipment enquiries, switchboard upgrades, storm faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural property power loss, storm damage, shed power faults, outdoor power hazards, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed power, outdoor power, driveway lighting, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "acreage properties, rural homes, long driveways, sheds, outdoor areas and private service equipment",
    setting: "Camden acreage and rural-property service area",
    switchboardDetail:
      "long-driveway loads, shed demand, outdoor power, private service equipment, safety switches and consumer mains condition",
  },
  cobbitty: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, gate or driveway notes, outdoor lighting photos, shed details, consumer mains photos and any defect notice or paperwork",
    commonJobs:
      "premium rural-residential electrical work, new-estate support, acreage-home repairs, outdoor lighting, shed power, consumer mains, switchboard capacity, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage or new-estate power loss, outdoor power hazards, shed power faults, hot outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and acreage or new-estate supply questions",
    plannedWork:
      "outdoor lighting, shed power, new-home circuits, switchboard upgrades, consumer mains review, CCTV/data and quote-photo planning",
    propertyMix:
      "premium rural-residential properties, new estates, acreage homes, sheds, outdoor areas and service equipment",
    setting: "Camden premium rural-residential and new-estate service area",
    switchboardDetail:
      "larger-home loads, shed demand, outdoor lighting, consumer mains, safety switches and future capacity",
  },
  "currans-hill": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, driveway or outdoor-area notes, hot water and aircon details and any defect notice or paperwork",
    commonJobs:
      "family-home electrical work, newer-estate repairs, safety-switch tripping, switchboard upgrades, hot water electrical, aircon electrical, planned maintenance, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, repeated safety-switch tripping, hot water electrical faults, aircon circuit trips, heat at outlets and sparking",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes and newer estates",
    plannedWork:
      "switchboard upgrades, hot water electrical, aircon circuits, outdoor power, safety-switch repairs, smoke alarms, CCTV/data and planned maintenance",
    propertyMix:
      "family homes, newer estates, outdoor areas, hot water loads, aircon loads and residential service equipment",
    setting: "Camden family-home and newer-estate service area",
    switchboardDetail:
      "newer home loads, hot water and aircon demand, safety switches, RCBOs and consumer mains capacity",
  },
  elderslie: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, local facility or home access notes, hot water details, parking information and any defect notice or paperwork",
    commonJobs:
      "home electrical work, local facility support, older and newer property repairs, switchboards, lighting and power, hot water electrical, safety switches, CCTV/data and Level 2 support",
    emergencySignals:
      "home power loss, local facility faults, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes and local facilities",
    plannedWork:
      "lighting and power, hot water electrical, switchboard upgrades, safety-switch repairs, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, local facilities, older and newer properties, hot water loads and residential service equipment",
    setting: "Camden home and local-facility service area",
    switchboardDetail:
      "older and newer boards, hot water loads, safety switches, RCBOs and clear circuit labelling",
  },
  "ellis-lane": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, gate or long-access notes, shed and outdoor power photos, private service equipment details and any defect notice or paperwork",
    commonJobs:
      "rural and acreage home electrical work, long-access jobs, shed power, outdoor power, private service equipment, switchboard upgrades, storm fault checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural property power loss, storm faults, shed power issues, outdoor power hazards, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed power, outdoor power, driveway lighting, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "rural homes, acreage properties, long access points, sheds, outdoor areas and private service equipment",
    setting: "Camden rural and acreage service area",
    switchboardDetail:
      "long-access loads, shed demand, outdoor power, private service equipment, safety switches and consumer mains condition",
  },
  "gledswood-hills": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, townhouse or estate access notes, property-manager details, aircon or EV load details and any defect notice or paperwork",
    commonJobs:
      "newer-home and townhouse electrical work, estate maintenance, aircon and EV load checks, switchboard capacity, hot water electrical, property-manager jobs, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "newer-home power loss, townhouse circuit faults, aircon circuit trips, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and load capacity questions for newer homes, townhouses and estates",
    plannedWork:
      "aircon circuits, EV-ready load checks, hot water electrical, switchboard upgrades, estate maintenance, CCTV/data and planned quote work",
    propertyMix:
      "newer homes, townhouses, estates, property-manager sites, hot water loads, aircon loads and residential service equipment",
    setting: "Camden newer-home, townhouse and estate service area",
    switchboardDetail:
      "newer home loads, aircon and EV-ready capacity, hot water demand, safety switches and consumer mains capacity",
  },
  grasmere: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, driveway or gate access notes, outdoor power photos, private service equipment details and any defect notice or paperwork",
    commonJobs:
      "larger-block and rural-home electrical work, outdoor power, private pole and service equipment enquiries, long-driveway access jobs, switchboard upgrades, supply-side support, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "larger-block power loss, outdoor power hazards, storm faults, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and supply-side questions for larger blocks",
    plannedWork:
      "outdoor power, driveway lighting, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "larger blocks, rural homes, outdoor areas, long driveways, private poles and service equipment",
    setting: "Camden larger-block and rural-home service area",
    switchboardDetail:
      "larger-property loads, outdoor power, private service equipment, consumer mains, safety switches and load capacity",
  },
  "gregory-hills": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, shop or suite access notes, restaurant timing, parking details, site contact information and any defect notice or paperwork",
    commonJobs:
      "shop, medical suite, retail suite, restaurant and office suite electrical work, townhouse and apartment repairs, business outages, commercial switchboards, three-phase and load checks, planned maintenance, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, medical or retail suite power loss, restaurant faults, townhouse or apartment power loss, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and commercial or strata supply questions",
    plannedWork:
      "shop lighting, medical suite power, restaurant power, office suite electrical work, apartment repairs, commercial switchboards, load checks, CCTV/data and planned maintenance",
    propertyMix:
      "shops, medical and retail suites, restaurants, office suites, townhouses, apartments and commercial switchboards",
    setting: "Camden retail, medical, restaurant and townhouse service area",
    switchboardDetail:
      "commercial switchboards, tenancy loads, apartment boards, three-phase and load checks, safety switches and clear circuit labelling",
  },
  "harrington-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, renovation or outdoor-area notes, aircon circuit details, driveway information and any defect notice or paperwork",
    commonJobs:
      "larger-home and premium-residential electrical work, renovations, outdoor lighting, aircon electrical, switchboard upgrades, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "larger-home power loss, renovation electrical faults, outdoor power hazards, aircon circuit trips, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for larger homes and renovations",
    plannedWork:
      "renovation wiring, outdoor lighting, aircon circuits, switchboard upgrades, consumer mains review, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "larger homes, premium residential properties, renovations, outdoor areas, aircon loads and residential service equipment",
    setting: "Camden premium-residential and renovation service area",
    switchboardDetail:
      "larger-home loads, renovation capacity, aircon demand, consumer mains, safety switches and RCBO protection",
  },
  kirkham: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, gate or long-driveway access notes, shed or outbuilding details, private service equipment photos and any defect notice or paperwork",
    commonJobs:
      "premium acreage electrical work, rural access jobs, outdoor power, shed and outbuilding power, private service equipment, long-driveway electrical work, safety-first triage, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage power loss, shed or outbuilding faults, outdoor power hazards, storm faults, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed power, outbuilding power, outdoor lighting, driveway lighting, switchboard upgrades, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "premium acreage homes, rural access properties, long driveways, sheds, outbuildings and private service equipment",
    setting: "Camden premium-acreage and rural-access service area",
    switchboardDetail:
      "long-driveway loads, shed and outbuilding demand, private service equipment, safety switches and consumer mains capacity",
  },
  leppington: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, builder or site access notes, aircon or EV-ready load details, parking information and any defect notice or paperwork",
    commonJobs:
      "new-estate and duplex electrical work, builder and construction support, new-build defect review, aircon and EV-ready circuit work, switchboard capacity, consumer mains, metering, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "new-estate power loss, construction defect concerns, aircon circuit trips, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, new-build supply questions and switchboard capacity checks",
    plannedWork:
      "new-build electrical work, construction defect review, aircon circuits, EV-ready load checks, switchboard capacity checks, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "new estates, duplexes, builder sites, growth-corridor homes, aircon loads, EV-ready loads and residential service equipment",
    setting: "Camden growth-corridor, new-estate and builder service area",
    switchboardDetail:
      "new-estate loads, aircon and EV-ready capacity, consumer mains, metering, safety switches and RCBO protection",
  },
  "mount-annan": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, local shop or home access notes, hot water or aircon details, parking information and any defect notice or paperwork",
    commonJobs:
      "family-home electrical work, local shop maintenance, switchboard upgrades, safety-switch faults, hot water electrical, aircon electrical, outdoor power, CCTV/data and Level 2 support",
    emergencySignals:
      "home power loss, local shop outages, hot water electrical faults, aircon circuit trips, outdoor power hazards, heat at outlets and sparking",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes and local shops",
    plannedWork:
      "switchboard upgrades, safety-switch repairs, hot water electrical, aircon circuits, outdoor power, local shop lighting, CCTV/data and planned quote work",
    propertyMix:
      "family homes, local shops, outdoor areas, hot water loads, aircon loads and residential service equipment",
    setting: "Camden family-home and local-shop service area",
    switchboardDetail:
      "family-home loads, hot water and aircon demand, outdoor power, safety switches and consumer mains condition",
  },
  narellan: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, retail or suite access notes, warehouse or workshop entry details, operating hours and any defect notice or paperwork",
    commonJobs:
      "shopping and retail electrical work, office suite power, medical suite support, local business maintenance, commercial switchboards, business outages, warehouse and workshop work, three-phase and load checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "business outages, retail or medical suite power loss, warehouse or workshop faults, equipment trips, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and commercial supply-side questions",
    plannedWork:
      "retail lighting, medical suite power, office suite electrical work, warehouse power, workshop power, commercial switchboards, load checks, CCTV/data and planned maintenance",
    propertyMix:
      "shopping and retail sites, offices, medical suites, local businesses, warehouses, workshops and service equipment",
    setting: "Camden retail, business and warehouse service area",
    switchboardDetail:
      "commercial switchboards, tenancy loads, warehouse demand, three-phase and load checks, safety switches and clear circuit labelling",
  },
  "narellan-vale": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, villa or townhouse access notes, outdoor power photos, hot water details and any defect notice or paperwork",
    commonJobs:
      "family-home, villa and townhouse electrical work, switchboard upgrades, safety-switch faults, hot water electrical, outdoor power, planned quote work, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home, villa or townhouse power loss, hot water electrical faults, outdoor power hazards, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, villas and townhouses",
    plannedWork:
      "switchboard upgrades, safety-switch repairs, hot water electrical, outdoor power, smoke alarms, data cabling, CCTV and planned quote guidance",
    propertyMix:
      "family homes, villas, townhouses, outdoor areas, hot water loads and residential service equipment",
    setting: "Camden family-home, villa and townhouse service area",
    switchboardDetail:
      "home loads, hot water demand, outdoor power, safety switches, RCBOs and consumer mains condition",
  },
  "oran-park": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, townhouse or apartment access notes, retail precinct details, school or site contact information and any defect notice or paperwork",
    commonJobs:
      "new-home, townhouse and apartment electrical work, retail and commercial precinct maintenance, school and community site support, aircon and EV load checks, switchboard capacity, consumer mains, metering, new-build issue review, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "new-home power loss, townhouse or apartment faults, retail precinct outages, school site electrical faults, aircon circuit trips, heat at outlets and sparking",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, new-build supply questions and load capacity checks",
    plannedWork:
      "new-build issue review, aircon circuits, EV-ready load checks, switchboard capacity checks, retail lighting, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "new homes, townhouses, apartments, retail and commercial precincts, schools, aircon loads, EV-ready loads and service equipment",
    setting: "Camden new-town, apartment and commercial-precinct service area",
    switchboardDetail:
      "new-home loads, apartment boards, retail loads, aircon and EV-ready capacity, consumer mains and safety switches",
  },
  rossmore: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, gate or long-driveway access notes, shed, warehouse or workshop details, load-check notes and any defect notice or paperwork",
    commonJobs:
      "rural-edge and airport-growth electrical work, acreage-home repairs, shed power, warehouse and workshop power, long-driveway access jobs, private service equipment, three-phase and load checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural-edge power loss, shed or warehouse outages, workshop faults, outdoor power hazards, heat at outlets, sparking and unsafe service equipment",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns, load checks and airport-growth supply questions",
    plannedWork:
      "shed power, warehouse power, workshop power, driveway lighting, switchboard capacity checks, three-phase and load checks, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "rural-edge properties, airport-growth sites, acreage homes, sheds, warehouses, workshops, long driveways and private service equipment",
    setting: "Camden rural-edge, airport-growth and workshop service area",
    switchboardDetail:
      "commercial and acreage loads, shed and warehouse demand, three-phase and load checks, private service equipment and safety switches",
  },
  "smeaton-grange": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, warehouse or factory access notes, showroom entry details, operating hours, site contact information and any defect notice or paperwork",
    commonJobs:
      "warehouse, factory, workshop and showroom electrical work, commercial switchboards, three-phase and load checks, business outages, CCTV/data, emergency make-safe support and planned maintenance",
    emergencySignals:
      "business outages, warehouse or factory power loss, workshop equipment trips, showroom faults, heat at outlets, sparking and unsafe commercial switchboards",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and commercial supply-side questions",
    plannedWork:
      "warehouse lighting, factory power, workshop power, showroom lighting, commercial switchboards, load checks, CCTV/data and planned maintenance",
    propertyMix:
      "warehouses, factories, workshops, showrooms, commercial switchboards and service equipment",
    setting: "Camden warehouse, factory and showroom service area",
    switchboardDetail:
      "commercial switchboards, three-phase and load checks, warehouse and factory loads, safety switches and clear circuit labelling",
  },
  "spring-farm": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, townhouse or construction access notes, hot water or aircon details, outdoor lighting photos and any defect notice or paperwork",
    commonJobs:
      "newer-estate and family-home electrical work, townhouse repairs, construction and new-build issue review, switchboard capacity, hot water electrical, aircon electrical, outdoor lighting, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "newer-estate power loss, townhouse faults, construction or new-build electrical concerns, hot water electrical faults, aircon circuit trips, heat at outlets and sparking",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, new-build supply questions and switchboard capacity checks",
    plannedWork:
      "new-build issue review, switchboard capacity checks, hot water electrical, aircon circuits, outdoor lighting, consumer mains review, CCTV/data and quote-photo planning",
    propertyMix:
      "newer estates, family homes, townhouses, construction sites, hot water loads, aircon loads and residential service equipment",
    setting: "Camden newer-estate, townhouse and new-build service area",
    switchboardDetail:
      "newer estate loads, hot water and aircon demand, outdoor lighting, consumer mains, safety switches and future capacity",
  },
};

function getCamdenLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "macarthur-camden-and-wollondilly" ||
    coverageArea.slug !== "camden"
  ) {
    return null;
  }

  return camdenLocalContexts[coverageSuburb.slug] ?? null;
}

function makeCampbelltownLocalContext({
  accessFocus,
  commonJobs,
  emergencySignals,
  level2Detail,
  plannedWork,
  propertyMix,
  setting,
  switchboardDetail,
}: Omit<LocalPageContext, "accessDetail"> & {
  accessFocus: string;
}): LocalPageContext {
  return {
    accessDetail: `photos of the switchboard, meter box, affected fitting, ${accessFocus}, access notes, parking details and any defect notice or paperwork`,
    commonJobs,
    emergencySignals,
    level2Detail,
    plannedWork,
    propertyMix,
    setting,
    switchboardDetail,
  };
}

const campbelltownLocalContexts: Record<string, LocalPageContext> = {
  airds: makeCampbelltownLocalContext({
    accessFocus:
      "property-manager or redevelopment access details, safety switch notes and hot water circuit information",
    commonJobs:
      "newer-housing and redevelopment electrical work, older switchboard checks, rental and property-manager maintenance, safety switches, hot water electrical, smoke alarms, lighting, power and Level 2 enquiries",
    emergencySignals:
      "home power loss, rental maintenance hazards, older-board overheating, hot water electrical faults, burning smells, sparking and repeated safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for newer housing, redevelopment sites and older homes",
    plannedWork:
      "switchboard upgrades, rental maintenance, lighting and power, hot water electrical, safety switches, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "newer housing, redevelopment homes, older homes, rental properties, townhouses and residential service equipment",
    setting: "Airds redevelopment, rental and residential service area",
    switchboardDetail:
      "older boards, safety switches, hot water loads, smoke alarm circuits, consumer mains condition and clear circuit labelling",
  }),
  ambarvale: makeCampbelltownLocalContext({
    accessFocus:
      "townhouse or shop access details, outdoor power photos and hot water circuit information",
    commonJobs:
      "family-home repairs, older switchboard checks, townhouse electrical work, local shop maintenance, power loss fault finding, hot water electrical, outdoor power, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "family-home power loss, local shop faults, hot water circuit trips, outdoor power hazards, burning smells, heat at outlets and safety-switch faults",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes, townhouses and local shops",
    plannedWork:
      "lighting and power, hot water electrical, outdoor power, switchboard upgrades, local shop maintenance, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, townhouses, older switchboards, local shops, outdoor areas and residential service equipment",
    setting: "Ambarvale family-home, townhouse and local-shop service area",
    switchboardDetail:
      "older boards, hot water loads, outdoor circuits, shop loads, safety switches and consumer mains condition",
  }),
  bardia: makeCampbelltownLocalContext({
    accessFocus:
      "builder or site contact details, aircon or EV load notes and metering paperwork",
    commonJobs:
      "new-home, townhouse and duplex electrical work, builder support, aircon and EV load checks, switchboard capacity, consumer mains, metering, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "new-home power loss, townhouse or duplex circuit faults, aircon circuit trips, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load capacity checks and new-build supply questions",
    plannedWork:
      "new-build issue review, aircon circuits, EV-ready load checks, switchboard capacity checks, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "new homes, townhouses, duplexes, builder sites, growth-corridor homes, aircon loads and EV-ready loads",
    setting: "Bardia new-home, townhouse and growth-corridor service area",
    switchboardDetail:
      "new-home loads, aircon and EV-ready capacity, consumer mains, metering, safety switches and future capacity",
  }),
  "blair-athol": makeCampbelltownLocalContext({
    accessFocus:
      "villa or driveway details, older wiring notes and hot water circuit information",
    commonJobs:
      "residential electrical work, villa repairs, older wiring checks, switchboard upgrades, lighting and power, hot water electrical, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, older wiring faults, hot water circuit trips, burning smells, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, villas and older wiring",
    plannedWork:
      "lighting and power, hot water electrical, switchboard upgrades, older wiring checks, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "residential homes, villas, older wiring, older switchboards, hot water loads and service equipment",
    setting: "Blair Athol residential, villa and older-wiring service area",
    switchboardDetail:
      "older wiring, older switchboards, hot water loads, safety switches, RCBO protection and consumer mains condition",
  }),
  blairmount: makeCampbelltownLocalContext({
    accessFocus:
      "rental access details, smoke alarm notes and hot water circuit information",
    commonJobs:
      "home electrical work, rental maintenance, switchboard upgrades, safety-switch faults, hot water electrical, smoke alarms, lighting, power, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, rental maintenance hazards, hot water electrical faults, burning smells, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes and rental maintenance sites",
    plannedWork:
      "rental maintenance, switchboard upgrades, safety-switch repairs, hot water electrical, smoke alarms, lighting, power and planned quote work",
    propertyMix:
      "homes, rental properties, older switchboards, hot water loads, smoke alarm circuits and residential service equipment",
    setting: "Blairmount home and rental-maintenance service area",
    switchboardDetail:
      "older boards, rental safety needs, hot water loads, smoke alarm circuits, safety switches and consumer mains condition",
  }),
  "bow-bowing": makeCampbelltownLocalContext({
    accessFocus:
      "aircon circuit details, hot water notes and outdoor fitting photos",
    commonJobs:
      "family-home electrical work, older board checks, lighting, power points, hot water electrical, aircon electrical, fault finding, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "family-home power loss, aircon circuit trips, hot water electrical faults, heat at outlets, burning smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes and older boards",
    plannedWork:
      "lighting and power points, hot water electrical, aircon circuits, switchboard upgrades, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, older boards, outdoor areas, hot water loads, aircon loads and residential service equipment",
    setting: "Bow Bowing family-home and older-board service area",
    switchboardDetail:
      "older boards, lighting and power loads, hot water demand, aircon demand, safety switches and consumer mains condition",
  }),
  bradbury: makeCampbelltownLocalContext({
    accessFocus:
      "unit, shop or property-manager access details and hot water circuit information",
    commonJobs:
      "older-home repairs, unit maintenance, local shop electrical work, switchboard upgrades, safety switches, hot water electrical, property-manager maintenance, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "older-home power loss, unit faults, shop outages, hot water electrical faults, burning smells, heat at outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes, units and local shops",
    plannedWork:
      "property-manager maintenance, switchboard upgrades, safety-switch repairs, hot water electrical, shop lighting, smoke alarms, data cabling and planned quote work",
    propertyMix:
      "older homes, units, local shops, rental properties, hot water loads and service equipment",
    setting: "Bradbury older-home, unit and local-shop service area",
    switchboardDetail:
      "older boards, unit boards, shop loads, hot water demand, safety switches and consumer mains condition",
  }),
  campbelltown: makeCampbelltownLocalContext({
    accessFocus:
      "shared access notes, medical or retail suite details, business hours and metering paperwork",
    commonJobs:
      "CBD and local business electrical work, apartment and shop repairs, office suite power, medical and retail suite support, shared access jobs, business outages, switchboard upgrades, consumer mains, metering, defect notices, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, shop or medical suite outages, business faults, shared access issues, burning smells, heat at outlets, sparking and safety-switch faults",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, shops, medical suites and local businesses",
    plannedWork:
      "shop lighting, medical suite power, office suite electrical work, apartment repairs, switchboard upgrades, consumer mains review, metering, CCTV/data and planned quote work",
    propertyMix:
      "apartments, shops, office suites, medical and retail suites, local businesses, homes, shared access sites and service equipment",
    setting: "Campbelltown CBD, apartment and local-business service area",
    switchboardDetail:
      "commercial switchboards, tenancy loads, shared boards, consumer mains, metering, safety switches and clear circuit labelling",
  }),
  claymore: makeCampbelltownLocalContext({
    accessFocus:
      "newer housing access details, smoke alarm notes and hot water circuit information",
    commonJobs:
      "home and newer-housing electrical work, switchboard upgrades, lighting and power, hot water electrical, safety switches, smoke alarms, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, newer-housing circuit faults, hot water electrical faults, burning smells, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes and newer housing",
    plannedWork:
      "lighting and power, hot water electrical, switchboard upgrades, safety-switch repairs, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, newer housing, older boards, hot water loads, smoke alarm circuits and residential service equipment",
    setting: "Claymore home and newer-housing service area",
    switchboardDetail:
      "home loads, older and newer boards, hot water demand, smoke alarm circuits, safety switches and consumer mains condition",
  }),
  "denham-court": makeCampbelltownLocalContext({
    accessFocus:
      "builder or new-build details, aircon or EV load notes and metering paperwork",
    commonJobs:
      "new-home and larger-home electrical work, duplex support, builder and new-build issue review, aircon and EV load checks, switchboard capacity, consumer mains, metering and Level 2 enquiries",
    emergencySignals:
      "new-home power loss, larger-home circuit faults, aircon circuit trips, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load capacity checks and new-build supply questions",
    plannedWork:
      "new-build issue review, aircon circuits, EV-ready load checks, switchboard capacity checks, consumer mains review, metering, CCTV/data and planned quote work",
    propertyMix:
      "new homes, larger homes, duplexes, builder sites, growth-corridor properties, aircon loads and EV-ready loads",
    setting: "Denham Court new-home, larger-home and builder service area",
    switchboardDetail:
      "new-home loads, aircon and EV-ready capacity, consumer mains, metering, safety switches and future capacity",
  }),
  "eagle-vale": makeCampbelltownLocalContext({
    accessFocus:
      "local shop details, hot water notes and aircon circuit information",
    commonJobs:
      "family-home electrical work, local shop maintenance, older switchboard checks, safety switches, hot water electrical, aircon electrical, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "family-home power loss, local shop outages, hot water electrical faults, aircon circuit trips, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes and local shops",
    plannedWork:
      "switchboard upgrades, safety-switch repairs, hot water electrical, aircon circuits, local shop lighting, CCTV/data and planned quote work",
    propertyMix:
      "family homes, local shops, older switchboards, hot water loads, aircon loads and residential service equipment",
    setting: "Eagle Vale family-home and local-shop service area",
    switchboardDetail:
      "older switchboards, hot water and aircon demand, shop loads, safety switches and consumer mains condition",
  }),
  "englorie-park": makeCampbelltownLocalContext({
    accessFocus:
      "hot water notes, lighting or power details and quote-photo guidance",
    commonJobs:
      "residential electrical work, older switchboard checks, hot water electrical, power and lighting repairs, safety-switch faults, quote-photo planning, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, hot water electrical faults, power or lighting faults, burning smells, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for residential homes and older switchboards",
    plannedWork:
      "hot water electrical, lighting and power repairs, switchboard upgrades, safety-switch repairs, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "residential homes, older switchboards, hot water loads, lighting and power circuits and service equipment",
    setting: "Englorie Park residential and quote-photo service area",
    switchboardDetail:
      "older switchboards, hot water demand, lighting and power loads, safety switches and consumer mains condition",
  }),
  "eschol-park": makeCampbelltownLocalContext({
    accessFocus:
      "outdoor power photos, aircon circuit details and hot water notes",
    commonJobs:
      "family-home electrical work, older board checks, outdoor power, hot water electrical, aircon electrical, switchboard upgrades, Level 2 support, CCTV/data and planned work",
    emergencySignals:
      "family-home power loss, outdoor power hazards, hot water electrical faults, aircon circuit trips, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes and older boards",
    plannedWork:
      "outdoor power, hot water electrical, aircon circuits, switchboard upgrades, safety-switch repairs, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "family homes, older boards, outdoor areas, hot water loads, aircon loads and residential service equipment",
    setting: "Eschol Park family-home, outdoor-power and Level 2 service area",
    switchboardDetail:
      "older boards, outdoor power, aircon demand, hot water demand, safety switches and consumer mains condition",
  }),
  gilead: makeCampbelltownLocalContext({
    accessFocus:
      "gate or long-driveway details, shed or outbuilding notes and private service equipment photos",
    commonJobs:
      "rural-edge and growth-corridor electrical work, rural-block repairs, shed power, outdoor power, private service equipment, long-access jobs, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural-edge power loss, shed or outdoor power faults, storm-related issues, unsafe service equipment, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and rural-block supply questions",
    plannedWork:
      "shed power, outdoor power, driveway lighting, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "rural-edge homes, growth-corridor properties, broad blocks, sheds, outdoor areas, long driveways and private service equipment",
    setting: "Gilead rural-edge, growth-corridor and rural-block service area",
    switchboardDetail:
      "rural-block loads, shed demand, outdoor power, private service equipment, safety switches and consumer mains condition",
  }),
  "glen-alpine": makeCampbelltownLocalContext({
    accessFocus:
      "renovation or outdoor-area notes, driveway details and aircon load information",
    commonJobs:
      "premium-home and renovation electrical work, outdoor lighting, switchboard upgrades, aircon electrical, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "premium-home power loss, renovation electrical faults, outdoor power hazards, aircon circuit trips, burning smells, heat at outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for premium homes and renovations",
    plannedWork:
      "renovation wiring, outdoor lighting, aircon circuits, switchboard upgrades, consumer mains review, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "premium homes, established blocks, renovation sites, outdoor areas, aircon loads and residential service equipment",
    setting: "Glen Alpine premium-home, renovation and premium-residential service area",
    switchboardDetail:
      "premium-home loads, renovation capacity, aircon demand, consumer mains, safety switches and RCBO protection",
  }),
  glenfield: makeCampbelltownLocalContext({
    accessFocus:
      "station-area access notes, shop or strata contacts and hot water circuit information",
    commonJobs:
      "station-area residential and commercial electrical work, apartment and townhouse repairs, shop maintenance, strata access jobs, switchboard upgrades, hot water electrical, business outages, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment or townhouse power loss, shop outages, strata shared-power issues, hot water electrical faults, burning smells, heat at outlets and safety-switch faults",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, townhouses, shops and strata sites",
    plannedWork:
      "apartment repairs, townhouse electrical work, shop lighting, hot water electrical, switchboard upgrades, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "apartments, townhouses, station-area homes, shops, strata buildings, local businesses and service equipment",
    setting: "Glenfield station-area, residential and commercial service area",
    switchboardDetail:
      "apartment boards, townhouse loads, shop loads, shared boards, hot water demand, safety switches and consumer mains condition",
  }),
  holsworthy: makeCampbelltownLocalContext({
    accessFocus:
      "site access notes, outdoor power photos and planned maintenance details",
    commonJobs:
      "home electrical work, access-sensitive jobs, switchboard upgrades, outdoor power, hot water electrical, safety switches, planned maintenance, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, outdoor power hazards, hot water electrical faults, burning smells, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes and access-sensitive sites",
    plannedWork:
      "outdoor power, hot water electrical, switchboard upgrades, safety-switch repairs, smoke alarms, CCTV/data and planned maintenance",
    propertyMix:
      "homes, outdoor areas, access-sensitive sites, hot water loads and residential service equipment",
    setting: "Holsworthy home, access-note and planned-maintenance service area",
    switchboardDetail:
      "home loads, outdoor power, hot water demand, safety switches, RCBO protection and consumer mains condition",
  }),
  ingleburn: makeCampbelltownLocalContext({
    accessFocus:
      "warehouse or factory access notes, operating hours, equipment details and load-check notes",
    commonJobs:
      "industrial estate electrical work, warehouse and workshop power, factory maintenance, business outages, commercial switchboards, three-phase and load checks, CCTV/data, emergency make-safe support and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse or factory power loss, workshop equipment trips, commercial switchboard faults, heat at outlets, sparking and unsafe equipment circuits",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and commercial supply-side questions",
    plannedWork:
      "warehouse lighting, workshop power, factory power, commercial switchboards, three-phase and load checks, CCTV/data and planned maintenance",
    propertyMix:
      "industrial estates, warehouses, workshops, factories, commercial switchboards, local shops and homes",
    setting: "Ingleburn industrial-estate, warehouse and workshop service area",
    switchboardDetail:
      "commercial switchboards, warehouse and factory loads, three-phase and load checks, safety switches and clear circuit labelling",
  }),
  kearns: makeCampbelltownLocalContext({
    accessFocus:
      "safety-switch trip notes, hot water details and quote-photo guidance",
    commonJobs:
      "home electrical work, older switchboard checks, safety-switch tripping, hot water electrical, lighting and power repairs, quote-photo planning, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home power loss, safety-switch tripping, hot water electrical faults, lighting or power faults, burning smells, heat at outlets and sparking",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes and older switchboards",
    plannedWork:
      "lighting and power repairs, hot water electrical, switchboard upgrades, safety-switch repairs, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "homes, older switchboards, hot water loads, safety switch circuits, lighting and power circuits and service equipment",
    setting: "Kearns home, safety-switch and quote-photo service area",
    switchboardDetail:
      "older switchboards, safety-switch tripping, hot water demand, lighting and power loads and consumer mains condition",
  }),
  kentlyn: makeCampbelltownLocalContext({
    accessFocus:
      "long-driveway or gate details, outdoor power photos and private service equipment notes",
    commonJobs:
      "bushland and rural-edge electrical work, bushland-property repairs, long-driveway access jobs, outdoor power, private service equipment, switchboard upgrades, storm-related faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "bushland home power loss, storm-related faults, outdoor power hazards, private service equipment concerns, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and bushland-property supply questions",
    plannedWork:
      "outdoor power, driveway lighting, switchboard upgrades, private service equipment review, consumer mains checks, storm-related repairs, CCTV/data and planned quote work",
    propertyMix:
      "bushland homes, rural-edge properties, bushland properties, long driveways, outdoor areas and private service equipment",
    setting: "Kentlyn bushland, rural-edge and long-driveway service area",
    switchboardDetail:
      "bushland-property loads, outdoor power, private service equipment, safety switches, storm exposure and consumer mains condition",
  }),
  leumeah: makeCampbelltownLocalContext({
    accessFocus:
      "unit or local shop access details, hot water notes and commercial fault information",
    commonJobs:
      "home and unit electrical work, local shop maintenance, access-sensitive jobs, switchboard upgrades, hot water electrical, lighting and power, safety switches, commercial faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or unit power loss, local shop faults, hot water electrical faults, commercial power issues, burning smells, heat at outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, units and local shops",
    plannedWork:
      "lighting and power, hot water electrical, switchboard upgrades, local shop maintenance, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, units, local shops, access-sensitive sites, hot water loads and residential service equipment",
    setting: "Leumeah home, unit and local-shop service area",
    switchboardDetail:
      "home and unit boards, shop loads, hot water demand, safety switches, RCBO protection and consumer mains condition",
  }),
  "long-point": makeCampbelltownLocalContext({
    accessFocus:
      "long-driveway or rural access details, outdoor power photos and private service equipment notes",
    commonJobs:
      "rural and residential electrical work, larger-block repairs, outdoor power, private service equipment, storm fault checks, long-access jobs, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural property power loss, storm faults, outdoor power hazards, unsafe service equipment, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and larger-block supply questions",
    plannedWork:
      "outdoor power, driveway lighting, switchboard upgrades, private service equipment review, consumer mains checks, storm-related repairs, CCTV/data and planned quote work",
    propertyMix:
      "rural homes, residential properties, larger blocks, long access points, outdoor areas and private service equipment",
    setting: "Long Point rural, residential and larger-block service area",
    switchboardDetail:
      "larger-property loads, outdoor power, private service equipment, storm exposure, safety switches and consumer mains condition",
  }),
  "macquarie-fields": makeCampbelltownLocalContext({
    accessFocus:
      "station-area access notes, strata or rental contacts and hot water circuit information",
    commonJobs:
      "apartment and home electrical work, shop maintenance, station-area access jobs, strata and rental maintenance, switchboard upgrades, hot water electrical, power loss fault finding, CCTV/data and Level 2 support",
    emergencySignals:
      "apartment or home power loss, shop faults, strata shared-power issues, hot water electrical faults, burning smells, heat at outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, homes, shops and strata sites",
    plannedWork:
      "apartment repairs, rental maintenance, shop lighting, hot water electrical, switchboard upgrades, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "apartments, homes, station-area shops, strata buildings, rental properties, hot water loads and service equipment",
    setting: "Macquarie Fields apartment, home and station-area service area",
    switchboardDetail:
      "apartment boards, home loads, shop loads, hot water demand, safety switches and consumer mains condition",
  }),
  "macquarie-links": makeCampbelltownLocalContext({
    accessFocus:
      "gated or visitor access details, outdoor lighting notes and aircon circuit information",
    commonJobs:
      "premium-home electrical work, gated-access jobs, outdoor lighting, switchboard upgrades, aircon electrical, consumer mains, quote-photo planning, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "premium-home power loss, gated-access electrical faults, outdoor power hazards, aircon circuit trips, burning smells, heat at outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for premium homes and gated-access properties",
    plannedWork:
      "outdoor lighting, aircon circuits, switchboard upgrades, consumer mains review, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "premium homes, gated-access properties, outdoor areas, aircon loads, larger homes and residential service equipment",
    setting: "Macquarie Links premium-home and gated-access service area",
    switchboardDetail:
      "premium-home loads, aircon demand, outdoor lighting, consumer mains, safety switches and future capacity",
  }),
  "menangle-park": makeCampbelltownLocalContext({
    accessFocus:
      "builder or estate access notes, acreage-edge details, aircon or EV load notes and metering paperwork",
    commonJobs:
      "new-estate and acreage-edge electrical work, builder support, switchboard capacity checks, aircon and EV load checks, consumer mains, metering, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "new-estate power loss, acreage-edge faults, aircon circuit trips, hot water electrical faults, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load capacity checks and new-estate supply questions",
    plannedWork:
      "new-build issue review, aircon circuits, EV-ready load checks, switchboard capacity checks, consumer mains review, metering, CCTV/data and planned quote work",
    propertyMix:
      "new estates, acreage-edge homes, builder sites, growth-corridor properties, aircon loads and EV-ready loads",
    setting: "Menangle Park new-estate, acreage-edge and builder service area",
    switchboardDetail:
      "new-estate loads, aircon and EV-ready capacity, consumer mains, metering, safety switches and future capacity",
  }),
  minto: makeCampbelltownLocalContext({
    accessFocus:
      "warehouse, workshop or factory access notes, operating hours, equipment details and load-check notes",
    commonJobs:
      "warehouse, workshop, factory, shop and home electrical work, business outages, commercial switchboards, three-phase and load checks, CCTV/data, industrial maintenance and Level 2 enquiries",
    emergencySignals:
      "business outages, warehouse or factory power loss, workshop equipment trips, shop faults, heat at outlets, sparking and unsafe commercial switchboards",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load checks and commercial supply-side questions",
    plannedWork:
      "warehouse lighting, workshop power, factory power, shop lighting, commercial switchboards, three-phase and load checks, CCTV/data and planned maintenance",
    propertyMix:
      "warehouses, workshops, factories, shops, homes, commercial switchboards and service equipment",
    setting: "Minto warehouse, workshop, factory and shop service area",
    switchboardDetail:
      "commercial switchboards, warehouse and factory loads, three-phase and load checks, safety switches and clear circuit labelling",
  }),
  "minto-heights": makeCampbelltownLocalContext({
    accessFocus:
      "larger-block or rural-edge access details, outdoor power photos and private service equipment notes",
    commonJobs:
      "residential and rural-edge electrical work, larger-block repairs, outdoor power, switchboard upgrades, private service equipment, long-access jobs, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural-edge power loss, outdoor power hazards, storm faults, unsafe service equipment, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and larger-block supply questions",
    plannedWork:
      "outdoor power, driveway lighting, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "residential homes, rural-edge properties, larger blocks, outdoor areas, long access points and private service equipment",
    setting: "Minto Heights residential, rural-edge and larger-block service area",
    switchboardDetail:
      "larger-block loads, outdoor power, private service equipment, safety switches and consumer mains condition",
  }),
  raby: makeCampbelltownLocalContext({
    accessFocus:
      "outdoor lighting photos, hot water notes and aircon circuit information",
    commonJobs:
      "family-home electrical work, older switchboard checks, safety switches, hot water electrical, aircon electrical, outdoor lighting, planned maintenance, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "family-home power loss, hot water electrical faults, aircon circuit trips, outdoor power hazards, burning smells, heat at outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes and older switchboards",
    plannedWork:
      "outdoor lighting, hot water electrical, aircon circuits, switchboard upgrades, safety-switch repairs, smoke alarms, CCTV/data and planned maintenance",
    propertyMix:
      "family homes, older switchboards, outdoor areas, hot water loads, aircon loads and residential service equipment",
    setting: "Raby family-home, outdoor-lighting and planned-maintenance service area",
    switchboardDetail:
      "older switchboards, hot water and aircon demand, outdoor lighting, safety switches and consumer mains condition",
  }),
  rosemeadow: makeCampbelltownLocalContext({
    accessFocus:
      "townhouse, shop or rental access details and hot water circuit information",
    commonJobs:
      "home and townhouse electrical work, local shop maintenance, rental maintenance, switchboard upgrades, hot water electrical, power loss fault finding, safety-switch faults, quote guidance, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or townhouse power loss, local shop faults, rental maintenance hazards, hot water electrical faults, burning smells, heat at outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, townhouses, shops and rental maintenance sites",
    plannedWork:
      "rental maintenance, shop lighting, hot water electrical, switchboard upgrades, safety-switch repairs, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "homes, townhouses, local shops, rental properties, hot water loads and residential service equipment",
    setting: "Rosemeadow home, townhouse, shop and rental-maintenance service area",
    switchboardDetail:
      "home and townhouse boards, shop loads, hot water demand, safety switches and consumer mains condition",
  }),
  ruse: makeCampbelltownLocalContext({
    accessFocus:
      "outdoor power photos, hot water notes and emergency fault details",
    commonJobs:
      "family-home electrical work, older board checks, lighting and power repairs, hot water electrical, safety switches, outdoor power, emergency fault support, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "family-home power loss, outdoor power hazards, hot water electrical faults, lighting or power faults, burning smells, heat at outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes and older boards",
    plannedWork:
      "lighting and power repairs, hot water electrical, outdoor power, switchboard upgrades, safety-switch repairs, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "family homes, older boards, outdoor areas, hot water loads, lighting and power circuits and residential service equipment",
    setting: "Ruse family-home, older-board and emergency-fault service area",
    switchboardDetail:
      "older boards, lighting and power loads, outdoor power, hot water demand, safety switches and consumer mains condition",
  }),
  "st-andrews": makeCampbelltownLocalContext({
    accessFocus:
      "villa access details, hot water notes and general maintenance details",
    commonJobs:
      "home and villa electrical work, older switchboard checks, hot water electrical, power points, lighting, safety switches, general maintenance, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or villa power loss, hot water electrical faults, lighting or power faults, burning smells, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, villas and older boards",
    plannedWork:
      "power points, lighting, hot water electrical, switchboard upgrades, safety-switch repairs, smoke alarms, data cabling, CCTV and general maintenance",
    propertyMix:
      "homes, villas, older switchboards, hot water loads, lighting and power circuits and residential service equipment",
    setting: "St Andrews home, villa and general-maintenance service area",
    switchboardDetail:
      "older switchboards, hot water demand, lighting and power loads, safety switches and consumer mains condition",
  }),
  "st-helens-park": makeCampbelltownLocalContext({
    accessFocus:
      "larger-lot or outdoor power details, aircon circuit notes and hot water information",
    commonJobs:
      "family-home and larger-lot electrical work, outdoor power, switchboard upgrades, aircon electrical, hot water electrical, Level 2 support, CCTV/data and planned maintenance",
    emergencySignals:
      "family-home power loss, outdoor power hazards, aircon circuit trips, hot water electrical faults, burning smells, heat at outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes and larger residential lots",
    plannedWork:
      "outdoor power, aircon circuits, hot water electrical, switchboard upgrades, safety-switch repairs, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "family homes, larger residential lots, outdoor areas, aircon loads, hot water loads and residential service equipment",
    setting: "St Helens Park family-home and larger-residential-lot service area",
    switchboardDetail:
      "family-home loads, outdoor power, aircon and hot water demand, safety switches and consumer mains condition",
  }),
  varroville: makeCampbelltownLocalContext({
    accessFocus:
      "long-driveway or acreage access details, shed or outbuilding notes and private service equipment photos",
    commonJobs:
      "acreage and rural-edge electrical work, long-driveway access jobs, shed and outbuilding power, outdoor power, private service equipment, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage power loss, shed or outbuilding faults, outdoor power hazards, storm faults, unsafe service equipment, heat at outlets and sparking",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed power, outbuilding power, outdoor lighting, driveway lighting, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "acreage homes, rural-edge properties, long driveways, sheds, outbuildings, outdoor areas and private service equipment",
    setting: "Varroville acreage, rural-edge and outbuilding service area",
    switchboardDetail:
      "long-driveway loads, shed and outbuilding demand, private service equipment, safety switches and consumer mains capacity",
  }),
  wedderburn: makeCampbelltownLocalContext({
    accessFocus:
      "bushland or acreage access details, storm fault notes, outdoor power photos and private service equipment information",
    commonJobs:
      "bushland and acreage electrical work, outdoor power, storm fault checks, private service equipment, switchboard upgrades, long-driveway access jobs, safety-first triage, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "bushland property power loss, storm faults, outdoor power hazards, private service equipment concerns, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "outdoor power, storm-related repairs, driveway lighting, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "bushland homes, acreage properties, long driveways, outdoor areas, storm-exposed sites and private service equipment",
    setting: "Wedderburn bushland, acreage and storm-fault service area",
    switchboardDetail:
      "acreage loads, outdoor power, storm exposure, private service equipment, safety switches and consumer mains condition",
  }),
  woodbine: makeCampbelltownLocalContext({
    accessFocus:
      "hot water notes, smoke alarm details and quote-photo guidance",
    commonJobs:
      "family-home electrical work, older switchboard checks, hot water electrical, safety switches, lighting and power, smoke alarms, quote-photo planning, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "family-home power loss, hot water electrical faults, safety-switch tripping, lighting or power faults, burning smells, heat at outlets and sparking",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes and older boards",
    plannedWork:
      "hot water electrical, lighting and power, switchboard upgrades, safety-switch repairs, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "family homes, older switchboards, hot water loads, smoke alarm circuits, lighting and power circuits and residential service equipment",
    setting: "Woodbine family-home, hot-water and smoke-alarm service area",
    switchboardDetail:
      "older switchboards, hot water demand, smoke alarm circuits, lighting and power loads, safety switches and consumer mains condition",
  }),
  "woronora-dam": makeCampbelltownLocalContext({
    accessFocus:
      "remote or bushland access details, outdoor power photos and private service equipment notes",
    commonJobs:
      "remote and bushland electrical work, careful attendance planning, outdoor power, private service equipment, switchboard upgrades, storm fault checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "remote property power loss, storm faults, outdoor power hazards, private service equipment concerns, heat at outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and remote-site supply questions",
    plannedWork:
      "outdoor power, storm-related repairs, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "remote and bushland properties, outdoor areas, access-sensitive sites, storm-exposed areas and private service equipment",
    setting: "Woronora Dam remote, bushland and owner-review coverage service area",
    switchboardDetail:
      "remote-site loads, outdoor power, storm exposure, private service equipment, safety switches and consumer mains condition",
  }),
};

function getCampbelltownLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "macarthur-camden-and-wollondilly" ||
    coverageArea.slug !== "campbelltown"
  ) {
    return null;
  }

  return campbelltownLocalContexts[coverageSuburb.slug] ?? null;
}

function makeWollondillyLocalContext({
  accessFocus,
  commonJobs,
  emergencySignals,
  level2Detail,
  plannedWork,
  propertyMix,
  setting,
  switchboardDetail,
}: Omit<LocalPageContext, "accessDetail"> & {
  accessFocus: string;
}): LocalPageContext {
  return {
    accessDetail: `photos of the switchboard, meter box, affected fitting, ${accessFocus}, access notes, gate details, parking details and any defect notice or paperwork`,
    commonJobs,
    emergencySignals,
    level2Detail,
    plannedWork,
    propertyMix,
    setting,
    switchboardDetail,
  };
}

const wollondillyLocalContexts: Record<string, LocalPageContext> = {
  appin: makeWollondillyLocalContext({
    accessFocus:
      "new-estate or rural-edge access details, shed notes, outdoor power photos and private service equipment information",
    commonJobs:
      "rural-edge and new-estate electrical work, larger-block repairs, shed power, outdoor power, private service equipment, consumer mains, defect notices, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural-edge power loss, new-estate faults, shed or outdoor power hazards, storm faults, burning smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and rural-edge supply questions",
    plannedWork:
      "shed power, outdoor power, switchboard upgrades, consumer mains review, defect notice paperwork, CCTV/data and planned quote work",
    propertyMix:
      "rural-edge homes, new estates, larger blocks, sheds, outdoor areas, private service equipment and residential service equipment",
    setting: "Appin rural-edge, new-estate and larger-block service area",
    switchboardDetail:
      "broad-site loads, shed demand, outdoor power, private service equipment, consumer mains condition and future capacity",
  }),
  "belimbla-park": makeWollondillyLocalContext({
    accessFocus:
      "bushland-edge access details, outdoor power photos, storm fault notes and private service equipment information",
    commonJobs:
      "acreage-home electrical work, bushland-edge repairs, outdoor power, switchboard upgrades, private service equipment, storm fault checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage power loss, bushland-edge storm faults, outdoor power hazards, unsafe service equipment, burning smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "outdoor power, switchboard upgrades, private service equipment review, storm-related repair planning, CCTV/data and planned quote work",
    propertyMix:
      "acreage homes, bushland-edge properties, outdoor areas, storm-exposed sites, long driveways and private service equipment",
    setting: "Belimbla Park acreage, bushland-edge and storm-fault service area",
    switchboardDetail:
      "acreage loads, outdoor power, storm exposure, private service equipment, safety switches and consumer mains condition",
  }),
  "brownlow-hill": makeWollondillyLocalContext({
    accessFocus:
      "long-driveway details, shed or outdoor lighting notes and private service equipment photos",
    commonJobs:
      "rural-property electrical work, long-driveway access jobs, shed power, outdoor lighting, private service equipment, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural property power loss, shed or outdoor power faults, storm exposure, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and long-access supply questions",
    plannedWork:
      "shed power, outdoor lighting, driveway lighting, switchboard upgrades, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "rural properties, long driveways, sheds, outdoor areas, acreage homes and private service equipment",
    setting: "Brownlow Hill rural-property, shed and long-driveway service area",
    switchboardDetail:
      "rural-property loads, shed demand, outdoor lighting, private service equipment, safety switches and consumer mains condition",
  }),
  "camden-park": makeWollondillyLocalContext({
    accessFocus:
      "acreage access details, outdoor power photos and consumer mains or Level 2 paperwork",
    commonJobs:
      "larger residential and acreage electrical work, outdoor power, switchboard upgrades, consumer mains, metering, CCTV/data and Level 2 support",
    emergencySignals:
      "larger-property power loss, acreage faults, outdoor power hazards, hot outlets, burning smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "outdoor power, switchboard upgrades, consumer mains review, Level 2 support, CCTV/data and planned quote work",
    propertyMix:
      "larger residential properties, acreage homes, outdoor areas, switchboards, consumer mains and service equipment",
    setting: "Camden Park larger-property, acreage and Level 2 service area",
    switchboardDetail:
      "larger-property loads, outdoor power, consumer mains condition, safety switches and future capacity",
  }),
  cataract: makeWollondillyLocalContext({
    accessFocus:
      "remote or bushland access details, storm fault notes, outdoor power photos and safety triage information",
    commonJobs:
      "remote and bushland electrical work, storm fault checks, outdoor power, switchboard upgrades, safety-first triage, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "remote property power loss, bushland storm faults, outdoor power hazards, unsafe switchboards, burning smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and remote-site supply questions",
    plannedWork:
      "outdoor power, storm-related repairs, switchboard upgrades, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "remote properties, bushland-edge homes, outdoor areas, storm-exposed sites and private service equipment",
    setting: "Cataract remote, bushland and safety-first triage service area",
    switchboardDetail:
      "remote-site loads, outdoor power, storm exposure, private service equipment, safety switches and consumer mains condition",
  }),
  couridjah: makeWollondillyLocalContext({
    accessFocus:
      "small-acreage access details, shed notes, outdoor power photos and consumer mains information",
    commonJobs:
      "rural-home and small-acreage electrical work, shed power, outdoor power, consumer mains, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural-home power loss, shed or outdoor power faults, storm exposure, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and small-acreage supply questions",
    plannedWork:
      "shed power, outdoor power, switchboard upgrades, consumer mains review, private service equipment checks, CCTV/data and planned quote work",
    propertyMix:
      "rural homes, small acreage, sheds, outdoor areas, consumer mains and private service equipment",
    setting: "Couridjah rural-home, small-acreage and shed-power service area",
    switchboardDetail:
      "small-acreage loads, shed demand, outdoor power, consumer mains condition, safety switches and private service equipment",
  }),
  "douglas-park": makeWollondillyLocalContext({
    accessFocus:
      "country-property or long-driveway details, shed notes, outdoor power photos and storm fault information",
    commonJobs:
      "country and rural-edge electrical work, long-driveway access jobs, shed power, outdoor power, private service equipment, storm fault checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "country-property power loss, shed or outdoor power hazards, storm faults, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and rural-edge supply questions",
    plannedWork:
      "shed power, outdoor power, driveway lighting, switchboard upgrades, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "country homes, rural-edge properties, long driveways, sheds, outdoor areas and private service equipment",
    setting: "Douglas Park country-home, rural-edge and storm-fault service area",
    switchboardDetail:
      "country-property loads, shed demand, outdoor power, private service equipment, safety switches and consumer mains condition",
  }),
  glenmore: makeWollondillyLocalContext({
    accessFocus:
      "acreage access details, older-board notes, shed photos and outdoor power information",
    commonJobs:
      "acreage-home electrical work, older switchboard checks, shed power, outdoor power, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage power loss, older-board overheating, shed or outdoor power hazards, burning smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed power, outdoor power, switchboard upgrades, older-board checks, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "acreage homes, older boards, sheds, outdoor areas, access-sensitive sites and private service equipment",
    setting: "Glenmore acreage, older-board and shed-power service area",
    switchboardDetail:
      "older boards, acreage loads, shed demand, outdoor power, safety switches and consumer mains condition",
  }),
  lakesland: makeWollondillyLocalContext({
    accessFocus:
      "bushland access details, storm fault notes, outdoor power photos and private service equipment information",
    commonJobs:
      "rural-home and bushland electrical work, storm fault checks, outdoor power, switchboard upgrades, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural-home power loss, bushland storm faults, outdoor power hazards, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and bushland supply questions",
    plannedWork:
      "storm-related repairs, outdoor power, switchboard upgrades, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "rural homes, bushland access properties, outdoor areas, storm-exposed sites and private service equipment",
    setting: "Lakesland rural-home, bushland-access and storm-fault service area",
    switchboardDetail:
      "rural-home loads, storm exposure, outdoor power, private service equipment, safety switches and consumer mains condition",
  }),
  maldon: makeWollondillyLocalContext({
    accessFocus:
      "workshop or rural-edge access details, outdoor power photos and planned Level 2 paperwork",
    commonJobs:
      "rural-edge and workshop electrical work, outdoor power, switchboard upgrades, planned Level 2 work, private service equipment, CCTV/data and planned quote work",
    emergencySignals:
      "rural-edge power loss, workshop faults, outdoor power hazards, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and planned supply-side work",
    plannedWork:
      "workshop power, outdoor power, switchboard upgrades, private service equipment review, planned Level 2 work, CCTV/data and quote planning",
    propertyMix:
      "rural-edge properties, workshops, outdoor areas, private service equipment and planned Level 2 sites",
    setting: "Maldon rural-edge, workshop and planned Level 2 service area",
    switchboardDetail:
      "workshop loads, outdoor power, private service equipment, safety switches, load checks and consumer mains condition",
  }),
  menangle: makeWollondillyLocalContext({
    accessFocus:
      "acreage access details, shed notes, older-board photos and consumer mains information",
    commonJobs:
      "acreage-home electrical work, older switchboard checks, shed power, outdoor power, consumer mains, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage power loss, older-board faults, shed or outdoor power hazards, storm exposure, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed power, outdoor power, switchboard upgrades, consumer mains review, private service equipment checks, CCTV/data and planned quote work",
    propertyMix:
      "acreage homes, older switchboards, sheds, outdoor areas, consumer mains and private service equipment",
    setting: "Menangle acreage-home, older-board and consumer-mains service area",
    switchboardDetail:
      "older boards, acreage loads, shed demand, outdoor power, consumer mains condition and safety switches",
  }),
  "mount-hunter": makeWollondillyLocalContext({
    accessFocus:
      "acreage access details, shed photos, outdoor power notes and private service equipment information",
    commonJobs:
      "acreage-property electrical work, shed power, outdoor power, private service equipment, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage property power loss, shed or outdoor power hazards, storm faults, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed power, outdoor power, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "acreage properties, sheds, outdoor areas, long access points, private service equipment and switchboards",
    setting: "Mount Hunter acreage, shed-power and private-service-equipment area",
    switchboardDetail:
      "acreage loads, shed demand, outdoor power, private service equipment, safety switches and consumer mains condition",
  }),
  "mowbray-park": makeWollondillyLocalContext({
    accessFocus:
      "rural-home access details, shed notes, outdoor lighting photos and private service equipment information",
    commonJobs:
      "rural-home electrical work, shed power, outdoor lighting, private service equipment, consumer mains, emergency triage, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural-home power loss, shed or outdoor power hazards, storm exposure, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and rural-home supply questions",
    plannedWork:
      "shed power, outdoor lighting, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "rural homes, sheds, outdoor areas, long access points, consumer mains and private service equipment",
    setting: "Mowbray Park rural-home, shed and emergency-triage service area",
    switchboardDetail:
      "rural-home loads, shed demand, outdoor lighting, private service equipment, safety switches and consumer mains condition",
  }),
  nattai: makeWollondillyLocalContext({
    accessFocus:
      "remote access details, bushland-edge notes, outdoor power photos and safety triage information",
    commonJobs:
      "remote-access and bushland-edge electrical work, outdoor power, switchboard upgrades, private service equipment, safety-first emergency triage, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "remote property power loss, bushland-edge storm faults, outdoor power hazards, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and remote-access supply questions",
    plannedWork:
      "outdoor power, switchboard upgrades, private service equipment review, storm-related repairs, CCTV/data and planned quote work",
    propertyMix:
      "remote-access properties, bushland-edge homes, outdoor areas, safety-sensitive sites and private service equipment",
    setting: "Nattai remote-access, bushland-edge and safety-triage service area",
    switchboardDetail:
      "remote-site loads, outdoor power, storm exposure, private service equipment, safety switches and consumer mains condition",
  }),
  oakdale: makeWollondillyLocalContext({
    accessFocus:
      "rural-home access details, shed notes, outdoor power photos and consumer mains information",
    commonJobs:
      "rural-home electrical work, shed power, outdoor power, switchboard upgrades, consumer mains, access-sensitive repairs, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural-home power loss, shed or outdoor power hazards, storm faults, hot outlets, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and rural-home supply questions",
    plannedWork:
      "shed power, outdoor power, switchboard upgrades, consumer mains review, private service equipment checks, CCTV/data and planned quote work",
    propertyMix:
      "rural homes, sheds, outdoor areas, consumer mains, access-sensitive properties and private service equipment",
    setting: "Oakdale rural-home, shed-power and access-sensitive service area",
    switchboardDetail:
      "rural-home loads, shed demand, outdoor power, consumer mains condition, safety switches and private service equipment",
  }),
  orangeville: makeWollondillyLocalContext({
    accessFocus:
      "acreage access details, shed or outbuilding notes, outdoor power photos and storm fault information",
    commonJobs:
      "acreage-property electrical work, shed and outbuilding power, outdoor power, private service equipment, storm fault checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage property power loss, shed or outbuilding faults, storm exposure, outdoor power hazards, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed power, outbuilding power, outdoor power, switchboard upgrades, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "acreage properties, sheds, outbuildings, outdoor areas, storm-exposed sites and private service equipment",
    setting: "Orangeville acreage, outbuilding and storm-fault service area",
    switchboardDetail:
      "acreage loads, shed and outbuilding demand, outdoor power, private service equipment, safety switches and consumer mains condition",
  }),
  "pheasants-nest": makeWollondillyLocalContext({
    accessFocus:
      "roadside business or rural-home access details, shed or workshop notes and private service equipment photos",
    commonJobs:
      "rural-home and roadside-business electrical work, shed and workshop power, outdoor power, switchboard upgrades, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural-home power loss, roadside business outages, shed or workshop faults, outdoor power hazards, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and roadside supply questions",
    plannedWork:
      "shed power, workshop power, outdoor power, business maintenance, switchboard upgrades, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "rural homes, roadside businesses, sheds, workshops, outdoor areas, switchboards and private service equipment",
    setting: "Pheasants Nest rural-home, roadside-business and workshop service area",
    switchboardDetail:
      "rural-home and roadside-business loads, workshop demand, outdoor power, private service equipment and safety switches",
  }),
  picton: makeWollondillyLocalContext({
    accessFocus:
      "town-centre access notes, business hours, acreage-edge details and metering paperwork",
    commonJobs:
      "town-centre shop, cafe and office electrical work, older-home repairs, family-home maintenance, acreage-edge support, business outages, switchboard upgrades, consumer mains, metering, defect notices, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "town-centre business outages, older-home power loss, shop faults, acreage-edge storm issues, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and town-centre or acreage-edge supply questions",
    plannedWork:
      "shop lighting, cafe power, family-home repairs, switchboard upgrades, consumer mains review, metering, defect notice paperwork, CCTV/data and planned quote work",
    propertyMix:
      "town-centre shops, cafes, small offices, older homes, family homes, acreage-edge properties and service equipment",
    setting: "Picton town-centre, older-home and acreage-edge service area",
    switchboardDetail:
      "town-centre business loads, older boards, hot water loads, consumer mains, metering, safety switches and clear circuit labelling",
  }),
  razorback: makeWollondillyLocalContext({
    accessFocus:
      "long or steep access details, acreage notes, outdoor power photos and storm fault information",
    commonJobs:
      "acreage-property electrical work, long or steep access jobs, outdoor power, switchboard upgrades, private service equipment, storm fault checks, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage property power loss, storm faults, outdoor power hazards, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "outdoor power, driveway lighting, switchboard upgrades, private service equipment review, storm-related repair planning, CCTV/data and planned quote work",
    propertyMix:
      "acreage properties, long or steep access sites, outdoor areas, storm-exposed homes and private service equipment",
    setting: "Razorback acreage, steep-access and storm-fault service area",
    switchboardDetail:
      "acreage loads, outdoor power, storm exposure, private service equipment, safety switches and consumer mains condition",
  }),
  silverdale: makeWollondillyLocalContext({
    accessFocus:
      "long-driveway details, shed notes, outdoor power photos and consumer mains information",
    commonJobs:
      "acreage-home electrical work, shed power, outdoor power, long-driveway access jobs, switchboard upgrades, consumer mains, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage home power loss, shed or outdoor power hazards, storm faults, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed power, outdoor power, driveway lighting, switchboard upgrades, consumer mains review, private service equipment checks, CCTV/data and planned quote work",
    propertyMix:
      "acreage homes, sheds, outdoor areas, long driveways, consumer mains and private service equipment",
    setting: "Silverdale acreage-home, long-driveway and consumer-mains service area",
    switchboardDetail:
      "acreage-home loads, shed demand, outdoor power, consumer mains condition, private service equipment and safety switches",
  }),
  tahmoor: makeWollondillyLocalContext({
    accessFocus:
      "townhouse or shop access details, older-board photos and hot water circuit information",
    commonJobs:
      "home, townhouse, shop and local-business electrical work, older switchboard checks, hot water electrical, lighting and power, Level 2 support, CCTV/data and planned quote work",
    emergencySignals:
      "home power loss, townhouse faults, shop outages, hot water electrical faults, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, townhouses, shops and local businesses",
    plannedWork:
      "lighting and power, hot water electrical, switchboard upgrades, shop maintenance, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "homes, townhouses, shops, local businesses, older switchboards, hot water loads and service equipment",
    setting: "Tahmoor home, townhouse, shop and local-business service area",
    switchboardDetail:
      "older boards, shop loads, hot water demand, consumer mains, safety switches and future capacity",
  }),
  "the-oaks": makeWollondillyLocalContext({
    accessFocus:
      "rural-home or larger-block access details, shed notes, outdoor power photos and consumer mains information",
    commonJobs:
      "rural-home and larger-block electrical work, shed power, outdoor power, switchboard upgrades, consumer mains, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural-home power loss, shed or outdoor power hazards, storm faults, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and larger-block supply questions",
    plannedWork:
      "shed power, outdoor power, switchboard upgrades, consumer mains review, private service equipment checks, CCTV/data and planned quote work",
    propertyMix:
      "rural homes, larger blocks, sheds, outdoor areas, consumer mains and private service equipment",
    setting: "The Oaks rural-home, larger-block and private-service-equipment area",
    switchboardDetail:
      "rural-home loads, shed demand, outdoor power, consumer mains condition, private service equipment and safety switches",
  }),
  "theresa-park": makeWollondillyLocalContext({
    accessFocus:
      "acreage access details, shed notes, outdoor power photos and private service equipment information",
    commonJobs:
      "acreage-home electrical work, outdoor power, shed power, private service equipment, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage home power loss, shed or outdoor power hazards, storm exposure, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "outdoor power, shed power, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "acreage homes, sheds, outdoor areas, long access points, private service equipment and switchboards",
    setting: "Theresa Park acreage-home, outdoor-power and shed service area",
    switchboardDetail:
      "acreage loads, shed demand, outdoor power, private service equipment, safety switches and consumer mains condition",
  }),
  thirlmere: makeWollondillyLocalContext({
    accessFocus:
      "local-business or acreage-edge access details, outdoor power photos and hot water circuit information",
    commonJobs:
      "home, local-business and acreage-edge electrical work, switchboard upgrades, hot water electrical, outdoor power, Level 2 enquiries, CCTV/data and planned quote work",
    emergencySignals:
      "home power loss, local business faults, acreage-edge storm issues, hot water electrical faults, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and acreage-edge supply questions",
    plannedWork:
      "local business maintenance, hot water electrical, outdoor power, switchboard upgrades, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "homes, local businesses, acreage-edge properties, older switchboards, hot water loads and service equipment",
    setting: "Thirlmere home, local-business and acreage-edge service area",
    switchboardDetail:
      "home and business loads, hot water demand, outdoor power, consumer mains, safety switches and future capacity",
  }),
  warragamba: makeWollondillyLocalContext({
    accessFocus:
      "village-home or rural-edge access details, outdoor power photos and hot water circuit information",
    commonJobs:
      "village-home and rural-edge electrical work, outdoor power, switchboard upgrades, hot water electrical, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "village-home power loss, rural-edge storm faults, outdoor power hazards, hot water electrical faults, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and village or rural-edge supply questions",
    plannedWork:
      "outdoor power, hot water electrical, switchboard upgrades, consumer mains review, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "village homes, rural-edge properties, outdoor areas, hot water loads, consumer mains and service equipment",
    setting: "Warragamba village-home, rural-edge and hot-water service area",
    switchboardDetail:
      "village-home loads, outdoor power, hot water demand, consumer mains, safety switches and future capacity",
  }),
  werombi: makeWollondillyLocalContext({
    accessFocus:
      "long-access details, shed notes, outdoor power photos and consumer mains information",
    commonJobs:
      "acreage-home electrical work, shed power, outdoor power, long-access jobs, switchboard upgrades, consumer mains, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "acreage home power loss, shed or outdoor power hazards, storm faults, unsafe service equipment, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and acreage supply questions",
    plannedWork:
      "shed power, outdoor power, driveway lighting, switchboard upgrades, consumer mains review, private service equipment checks, CCTV/data and planned quote work",
    propertyMix:
      "acreage homes, sheds, outdoor areas, long access points, consumer mains and private service equipment",
    setting: "Werombi acreage-home, shed-power and long-access service area",
    switchboardDetail:
      "acreage-home loads, shed demand, outdoor power, consumer mains condition, private service equipment and safety switches",
  }),
  wilton: makeWollondillyLocalContext({
    accessFocus:
      "new-estate access details, aircon or EV load notes, metering paperwork and planned upgrade information",
    commonJobs:
      "new-home and growth-corridor electrical work, larger-block repairs, switchboard capacity checks, aircon and EV load checks, consumer mains, metering, planned upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "new-home power loss, growth-corridor faults, aircon circuit trips, hot water electrical faults, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, load capacity checks and new-estate supply questions",
    plannedWork:
      "switchboard capacity checks, aircon circuits, EV-ready load checks, consumer mains review, metering, planned upgrades, CCTV/data and quote work",
    propertyMix:
      "new homes, growth-corridor estates, larger blocks, aircon loads, EV-ready loads, consumer mains and metering equipment",
    setting: "Wilton new-home, growth-corridor and planned-upgrade service area",
    switchboardDetail:
      "new-home loads, aircon and EV-ready capacity, consumer mains, metering, safety switches and future capacity",
  }),
  yanderra: makeWollondillyLocalContext({
    accessFocus:
      "acreage access details, outdoor power photos, hot water circuit information and private service equipment notes",
    commonJobs:
      "rural-home and acreage electrical work, outdoor power, switchboard upgrades, hot water electrical, private service equipment, quote-photo planning, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "rural-home power loss, acreage faults, outdoor power hazards, hot water electrical faults, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and rural or acreage supply questions",
    plannedWork:
      "outdoor power, hot water electrical, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "rural homes, acreage properties, outdoor areas, hot water loads, private service equipment and switchboards",
    setting: "Yanderra rural-home, acreage and quote-guidance service area",
    switchboardDetail:
      "rural-home loads, outdoor power, hot water demand, private service equipment, safety switches and consumer mains condition",
  }),
};

function getWollondillyLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "macarthur-camden-and-wollondilly" ||
    coverageArea.slug !== "wollondilly"
  ) {
    return null;
  }

  return wollondillyLocalContexts[coverageSuburb.slug] ?? null;
}

function makeCanadaBayLocalContext({
  accessFocus,
  commonJobs,
  emergencySignals,
  level2Detail,
  plannedWork,
  propertyMix,
  setting,
  switchboardDetail,
}: Omit<LocalPageContext, "accessDetail"> & {
  accessFocus: string;
}): LocalPageContext {
  return {
    accessDetail: `photos of the switchboard, meter box, affected fitting, ${accessFocus}, access notes, parking details and any defect notice or paperwork`,
    commonJobs,
    emergencySignals,
    level2Detail,
    plannedWork,
    propertyMix,
    setting,
    switchboardDetail,
  };
}

const canadaBayLocalContexts: Record<string, LocalPageContext> = {
  abbotsford: makeCanadaBayLocalContext({
    accessFocus:
      "shared access notes, waterfront or outdoor power photos and parking information",
    commonJobs:
      "waterfront-home electrical work, apartment and strata repairs, older switchboard checks, outdoor power, shared access jobs, consumer mains, CCTV/data and Level 2 support",
    emergencySignals:
      "waterfront home power loss, apartment or strata faults, outdoor power hazards, older-board overheating, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for waterfront homes and strata buildings",
    plannedWork:
      "outdoor power, apartment repairs, strata electrical work, switchboard upgrades, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "waterfront homes, apartments, strata buildings, older switchboards, outdoor areas, shared access sites and residential service equipment",
    setting: "Abbotsford waterfront-home, apartment and strata service area",
    switchboardDetail:
      "older switchboards, strata boards, outdoor power, consumer mains, safety switches and shared access to service equipment",
  }),
  "breakfast-point": makeCanadaBayLocalContext({
    accessFocus:
      "estate access notes, shared meter-room details, building-manager contacts and visitor parking information",
    commonJobs:
      "apartment and strata tower electrical work, estate-style access jobs, shared meter-room support, building-manager maintenance, hot water electrical, safety switches, CCTV/data and planned maintenance",
    emergencySignals:
      "apartment power loss, shared meter-room issues, hot water electrical faults, common-area lighting faults, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for strata towers and estate-style apartment complexes",
    plannedWork:
      "apartment repairs, strata maintenance, hot water electrical, safety switches, common-area lighting, shared meter-room checks, CCTV/data and planned quote work",
    propertyMix:
      "apartments, strata towers, estate-style complexes, shared meter rooms, visitor parking areas, hot water loads and common areas",
    setting: "Breakfast Point apartment, strata tower and estate-style service area",
    switchboardDetail:
      "shared meter rooms, apartment boards, hot water loads, common-area lighting, safety switches and building-manager access",
  }),
  cabarita: makeCanadaBayLocalContext({
    accessFocus:
      "strata entry notes, waterfront access details, outdoor power photos and shared meter-area information",
    commonJobs:
      "waterfront apartment and home electrical work, strata access jobs, outdoor power, switchboard upgrades, private service equipment, shared meter-area support, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront apartment power loss, strata shared-power issues, outdoor power hazards, storm or water-affected fixtures, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and supply-side questions for waterfront homes and apartments",
    plannedWork:
      "outdoor power, waterfront lighting, apartment repairs, strata electrical work, switchboard upgrades, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "waterfront apartments, waterfront homes, strata buildings, shared meter areas, outdoor circuits and private service equipment",
    setting: "Cabarita waterfront apartment, home and strata service area",
    switchboardDetail:
      "shared meter areas, waterfront exposure, apartment boards, outdoor power, private service equipment and safety switches",
  }),
  "canada-bay": makeCanadaBayLocalContext({
    accessFocus:
      "strata or shop access details, waterfront property notes, older wiring information and consumer mains paperwork",
    commonJobs:
      "apartment, waterfront-home and shopfront electrical work, strata repairs, older wiring checks, switchboard upgrades, business outages, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, shop faults, business outages, older wiring faults, burning smells, hot outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for apartments, shops and waterfront homes",
    plannedWork:
      "apartment repairs, shopfront lighting, older wiring checks, switchboard upgrades, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, waterfront homes, strata buildings, shops, older wiring, shared access sites and service equipment",
    setting: "Canada Bay apartment, waterfront-home and shopfront service area",
    switchboardDetail:
      "older wiring, strata boards, shop loads, consumer mains, metering, safety switches and clear circuit labelling",
  }),
  chiswick: makeCanadaBayLocalContext({
    accessFocus:
      "shared meter-room notes, tight parking details, waterfront or outdoor power photos and hot water circuit information",
    commonJobs:
      "waterfront apartment and older-home electrical work, strata repairs, shared meter-room access, outdoor power, hot water electrical, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront apartment power loss, hot water electrical faults, outdoor power hazards, shared meter-room issues, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for waterfront apartments and older homes",
    plannedWork:
      "apartment repairs, hot water electrical, outdoor power, switchboard upgrades, shared meter-room checks, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "waterfront apartments, strata buildings, older homes, shared meter rooms, tight parking areas, outdoor circuits and hot water loads",
    setting: "Chiswick waterfront apartment, older-home and tight-parking service area",
    switchboardDetail:
      "shared meter rooms, older wiring, hot water loads, outdoor power, consumer mains and safety switches",
  }),
  concord: makeCanadaBayLocalContext({
    accessFocus:
      "suite or school contact details, shop access notes, older-home photos and defect notice paperwork",
    commonJobs:
      "large-home, older-home, apartment, shop, cafe, medical suite, school and office suite electrical work, strata access jobs, switchboard upgrades, consumer mains, defect notices, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "large-home power loss, shop or cafe outages, medical or commercial suite faults, school electrical issues, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for large homes, strata sites, schools, shops and suites",
    plannedWork:
      "large-home upgrades, shop and cafe maintenance, medical suite power, school maintenance, switchboard upgrades, consumer mains review, defect notice paperwork, CCTV/data and planned quote work",
    propertyMix:
      "large homes, older homes, apartments, shops, cafes, medical and commercial suites, schools, strata sites and service equipment",
    setting: "Concord large-home, shop, school and suite service area",
    switchboardDetail:
      "large-home loads, older wiring, suite and shop loads, school circuits, consumer mains, defect notices and safety switches",
  }),
  "concord-west": makeCanadaBayLocalContext({
    accessFocus:
      "station-area access notes, commercial or industrial entry details, hot water circuit notes and older wiring photos",
    commonJobs:
      "family-home, station-area, apartment, commercial pocket and industrial pocket electrical work, older wiring checks, switchboard upgrades, hot water electrical, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "family-home power loss, station-area shop faults, commercial or industrial pocket outages, hot water electrical faults, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for family homes, apartments and commercial or industrial pockets",
    plannedWork:
      "family-home repairs, station-area shop maintenance, older wiring checks, hot water electrical, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "family homes, station-area properties, apartments, commercial pockets, industrial pockets, older wiring and hot water loads",
    setting: "Concord West family-home, station-area and commercial-pocket service area",
    switchboardDetail:
      "older wiring, family-home loads, shop loads, hot water demand, commercial pocket loads and consumer mains condition",
  }),
  drummoyne: makeCanadaBayLocalContext({
    accessFocus:
      "restaurant or shop access details, shared meter-room notes, strata contacts and parking information",
    commonJobs:
      "apartment, restaurant, shop, office suite and strata electrical work, older wiring checks, shared meter-room access, business outages, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, restaurant or shop outages, business faults, shared meter-room issues, burning smells, hot outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for apartments, shops, restaurants and strata buildings",
    plannedWork:
      "restaurant power, shop lighting, office suite electrical work, apartment repairs, strata electrical work, switchboard upgrades, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "apartments, restaurants, shops, office suites, strata buildings, older wiring, shared meter rooms and busy parking areas",
    setting: "Drummoyne apartment, restaurant, shop and strata service area",
    switchboardDetail:
      "shared meter rooms, restaurant and shop loads, older wiring, business loads, consumer mains and safety switches",
  }),
  "five-dock": makeCanadaBayLocalContext({
    accessFocus:
      "shopfront or restaurant access notes, office suite details, apartment entry notes and hot water circuit information",
    commonJobs:
      "shopfront, restaurant, office suite, apartment and older-home electrical work, strata repairs, commercial faults, switchboard upgrades, hot water electrical, CCTV/data and Level 2 support",
    emergencySignals:
      "shopfront outages, restaurant faults, apartment power loss, commercial faults, hot water electrical issues, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for shops, apartments and older homes",
    plannedWork:
      "shopfront lighting, restaurant power, office suite electrical work, apartment repairs, hot water electrical, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "shopfronts, restaurants, office suites, apartments, older homes, strata buildings, hot water loads and service equipment",
    setting: "Five Dock shopfront, restaurant, apartment and older-home service area",
    switchboardDetail:
      "shopfront loads, restaurant circuits, apartment boards, older wiring, hot water demand, consumer mains and safety switches",
  }),
  "liberty-grove": makeCanadaBayLocalContext({
    accessFocus:
      "estate access notes, carpark or loading access details, building-manager contacts and shared meter-room information",
    commonJobs:
      "estate-style apartment and strata electrical work, shared meter-room access, building-manager maintenance, carpark and loading access jobs, safety switches, hot water electrical, CCTV/data and planned maintenance",
    emergencySignals:
      "estate-style apartment power loss, shared meter-room issues, carpark lighting faults, hot water electrical faults, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for estate-style apartments and shared meter rooms",
    plannedWork:
      "apartment repairs, strata maintenance, common-area lighting, hot water electrical, safety switches, shared meter-room checks, CCTV/data and planned quote work",
    propertyMix:
      "estate-style apartments, strata buildings, shared meter rooms, carpark access areas, loading areas, hot water loads and common areas",
    setting: "Liberty Grove estate-style apartment, strata and carpark-access service area",
    switchboardDetail:
      "shared meter rooms, apartment boards, carpark lighting, hot water loads, safety switches and building-manager access",
  }),
  mortlake: makeCanadaBayLocalContext({
    accessFocus:
      "waterfront or townhouse access details, shared access notes, outdoor power photos and hot water circuit information",
    commonJobs:
      "waterfront apartment, townhouse, strata and older industrial conversion-style electrical work, shared access jobs, switchboard upgrades, hot water electrical, outdoor power, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront apartment power loss, townhouse faults, shared access electrical issues, hot water electrical faults, outdoor power hazards and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for waterfront apartments, townhouses and strata sites",
    plannedWork:
      "townhouse repairs, apartment maintenance, hot water electrical, outdoor power, switchboard upgrades, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "waterfront apartments, townhouses, strata buildings, older industrial conversion-style properties, shared access sites and hot water loads",
    setting: "Mortlake waterfront apartment, townhouse and shared-access service area",
    switchboardDetail:
      "shared access boards, apartment and townhouse loads, hot water demand, outdoor power, consumer mains and safety switches",
  }),
  "north-strathfield": makeCanadaBayLocalContext({
    accessFocus:
      "station-area shop or restaurant access notes, shared meter-room details and older wiring information",
    commonJobs:
      "apartment, station-area shop, office suite, restaurant and strata electrical work, shared meter-room access, business outages, older wiring checks, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, station-area shop or restaurant outages, business faults, shared meter-room issues, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, shops, restaurants, office suites and strata buildings",
    plannedWork:
      "station-area shop lighting, restaurant power, office suite electrical work, apartment repairs, older wiring checks, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "apartments, station-area shops, office suites, restaurants, strata buildings, shared meter rooms, older wiring and service equipment",
    setting: "North Strathfield apartment, station-area shop and strata service area",
    switchboardDetail:
      "shared meter rooms, older wiring, shop and restaurant loads, apartment boards, consumer mains and safety switches",
  }),
  rhodes: makeCanadaBayLocalContext({
    accessFocus:
      "building-manager access details, shared meter-room notes, carpark or loading access details and retail tenancy information",
    commonJobs:
      "high-rise apartment, strata tower, shopping, retail, office suite and common-area electrical work, shared meter-room access, hot water electrical, common-area lighting, business outages, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "high-rise apartment power loss, retail or office outages, shared meter-room issues, common-area lighting faults, hot water electrical faults, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for strata towers, retail tenancies, office suites and shared meter rooms",
    plannedWork:
      "high-rise apartment repairs, retail tenancy power, office suite electrical work, common-area lighting, hot water electrical, shared meter-room checks, CCTV/data and planned quote work",
    propertyMix:
      "high-rise apartments, strata towers, shopping and retail tenancies, office suites, shared meter rooms, carpark access areas, loading areas and common lighting",
    setting: "Rhodes high-rise apartment, retail, office suite and strata tower service area",
    switchboardDetail:
      "shared meter rooms, high-rise apartment loads, retail and office suite loads, common-area lighting, hot water demand and consumer mains",
  }),
  "rodd-point": makeCanadaBayLocalContext({
    accessFocus:
      "waterfront access notes, smaller-street parking details, outdoor lighting photos and private service equipment information",
    commonJobs:
      "waterfront-home and residential electrical work, outdoor lighting, weather-exposed power, private service equipment, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront home power loss, weather-exposed power faults, outdoor lighting hazards, storm or water-affected fixtures, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and waterfront-home supply questions",
    plannedWork:
      "outdoor lighting, weather-exposed power, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "waterfront homes, smaller residential streets, outdoor areas, weather-exposed power, private service equipment and residential switchboards",
    setting: "Rodd Point waterfront-home, outdoor-lighting and smaller-street service area",
    switchboardDetail:
      "waterfront exposure, outdoor lighting, weather-exposed power, private service equipment, safety switches and consumer mains condition",
  }),
  "russell-lea": makeCanadaBayLocalContext({
    accessFocus:
      "duplex or apartment access notes, renovation details, outdoor power photos and hot water circuit information",
    commonJobs:
      "home, duplex, apartment and older switchboard electrical work, outdoor power, hot water electrical, safety switches, renovations, consumer mains, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "home or duplex power loss, apartment faults, hot water electrical issues, outdoor power hazards, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for homes, duplexes and apartments",
    plannedWork:
      "renovation wiring, outdoor power, hot water electrical, switchboard upgrades, safety switches, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "homes, duplexes, apartments, older switchboards, outdoor areas, hot water loads, renovation sites and consumer mains",
    setting: "Russell Lea home, duplex, apartment and renovation service area",
    switchboardDetail:
      "older switchboards, renovation capacity, hot water loads, outdoor power, safety switches and consumer mains condition",
  }),
  wareemba: makeCanadaBayLocalContext({
    accessFocus:
      "shop or cafe access notes, tight street parking details, apartment entry notes and hot water circuit information",
    commonJobs:
      "local shop, cafe, older-home and apartment electrical work, tight-street access jobs, switchboard upgrades, lighting and power, hot water electrical, CCTV/data and general maintenance",
    emergencySignals:
      "local shop or cafe outages, older-home power loss, apartment faults, hot water electrical issues, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for shops, apartments and older homes",
    plannedWork:
      "shop and cafe maintenance, lighting and power, apartment repairs, hot water electrical, switchboard upgrades, data cabling, CCTV and general maintenance",
    propertyMix:
      "local shops, cafes, older homes, apartments, tight streets, limited parking areas, hot water loads and residential service equipment",
    setting: "Wareemba local-shop, cafe, older-home and apartment service area",
    switchboardDetail:
      "shop and cafe loads, older wiring, apartment boards, hot water demand, safety switches and consumer mains condition",
  }),
};

function getCanadaBayLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "inner-west-burwood-and-canada-bay" ||
    coverageArea.slug !== "canada-bay"
  ) {
    return null;
  }

  return canadaBayLocalContexts[coverageSuburb.slug] ?? null;
}

function makeInnerWestLocalContext({
  accessFocus,
  commonJobs,
  emergencySignals,
  level2Detail,
  plannedWork,
  propertyMix,
  setting,
  switchboardDetail,
}: Omit<LocalPageContext, "accessDetail"> & {
  accessFocus: string;
}): LocalPageContext {
  return {
    accessDetail: `photos of the switchboard, meter box, affected fitting, ${accessFocus}, access notes, parking details and any defect notice or paperwork`,
    commonJobs,
    emergencySignals,
    level2Detail,
    plannedWork,
    propertyMix,
    setting,
    switchboardDetail,
  };
}

const innerWestLocalContexts: Record<string, LocalPageContext> = {
  annandale: makeInnerWestLocalContext({
    accessFocus:
      "narrow-street parking notes, terrace or strata access details and cafe or local shop contact information",
    commonJobs:
      "terrace electrical work, older wiring checks, strata apartment repairs, cafe and local shop maintenance, switchboard upgrades, defect notices, consumer mains, CCTV/data and planned quote work",
    emergencySignals:
      "terrace power loss, strata apartment faults, cafe or local shop outages, older wiring faults, burning smells, hot outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for terraces, older homes, strata apartments and local shops",
    plannedWork:
      "terrace repairs, older wiring checks, strata electrical work, cafe and shop maintenance, switchboard upgrades, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "terraces, older homes, strata apartments, cafes, local shops, narrow streets, limited parking and residential service equipment",
    setting: "Annandale terrace, strata apartment and cafe service area",
    switchboardDetail:
      "older wiring, terrace loads, strata boards, cafe and shop loads, consumer mains, defect notices and safety switches",
  }),
  ashbury: makeInnerWestLocalContext({
    accessFocus:
      "older-home photos, duplex access notes, hot water circuit details and safety-switch fault notes",
    commonJobs:
      "older-home electrical work, duplex repairs, federation-style residential wiring checks, switchboard upgrades, hot water electrical, safety-switch tripping, CCTV/data and planned quote work",
    emergencySignals:
      "older-home power loss, hot water electrical faults, older-board overheating, burning smells, hot outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes and duplexes",
    plannedWork:
      "older-home repairs, duplex electrical work, hot water circuits, switchboard upgrades, safety-switch repairs, smoke alarms, CCTV/data and planned quote work",
    propertyMix:
      "older homes, duplexes, federation-style residential wiring, hot water circuits and residential service equipment",
    setting: "Ashbury older-home, duplex and federation-style residential service area",
    switchboardDetail:
      "older wiring, older switchboards, hot water loads, safety switches, RCBO protection and consumer mains condition",
  }),
  ashfield: makeInnerWestLocalContext({
    accessFocus:
      "shared meter-room notes, strata or shop access details, restaurant contact details and metering paperwork",
    commonJobs:
      "apartment, strata, older-home, shop and restaurant electrical work, shared meter-room access, business outages, switchboard upgrades, consumer mains, defect notices, metering, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, shop or restaurant outages, shared meter-room issues, business faults, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for apartments, strata buildings, shops and older homes",
    plannedWork:
      "apartment repairs, strata maintenance, shop and restaurant power, older-home repairs, switchboard upgrades, consumer mains review, metering support, CCTV/data and planned quote work",
    propertyMix:
      "apartments, strata buildings, older homes, shops, restaurants, shared meter rooms, business sites and residential service equipment",
    setting: "Ashfield apartment, strata, shop and older-home service area",
    switchboardDetail:
      "shared meter rooms, older wiring, apartment boards, shop and restaurant loads, consumer mains, defect notices, metering and safety switches",
  }),
  balmain: makeInnerWestLocalContext({
    accessFocus:
      "heritage terrace notes, waterfront access details, shopfront contact details and tight parking information",
    commonJobs:
      "heritage terrace electrical work, older wiring checks, waterfront-home repairs, apartment and cafe maintenance, shopfront power, switchboard upgrades, consumer mains, service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "heritage terrace power loss, waterfront-home faults, cafe or shopfront outages, older wiring faults, burning smells, hot outlets, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for heritage terraces, waterfront homes, apartments and shopfronts",
    plannedWork:
      "heritage terrace repairs, apartment maintenance, cafe and shopfront power, outdoor power, switchboard upgrades, consumer mains review, service equipment checks, CCTV/data and planned quote work",
    propertyMix:
      "heritage terraces, older wiring, waterfront homes, apartments, cafes, shopfronts, tight parking and service equipment",
    setting: "Balmain heritage terrace, waterfront-home and shopfront service area",
    switchboardDetail:
      "older wiring, heritage terrace loads, shopfront loads, waterfront exposure, consumer mains, service equipment and safety switches",
  }),
  "balmain-east": makeInnerWestLocalContext({
    accessFocus:
      "waterfront access notes, narrow access details, limited parking information and point of attachment photos",
    commonJobs:
      "waterfront apartment and home electrical work, heritage wiring checks, outdoor power, switchboard upgrades, consumer mains, point of attachment enquiries, CCTV/data and planned quote work",
    emergencySignals:
      "waterfront apartment power loss, heritage wiring faults, outdoor power hazards, storm or water-affected fixtures, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for waterfront apartments, waterfront homes and heritage properties",
    plannedWork:
      "waterfront apartment repairs, heritage wiring checks, outdoor power, switchboard upgrades, consumer mains review, point of attachment checks, CCTV/data and planned quote work",
    propertyMix:
      "waterfront apartments, waterfront homes, heritage wiring, narrow access streets, limited parking and point of attachment assets",
    setting: "Balmain East waterfront, heritage and narrow-access service area",
    switchboardDetail:
      "waterfront exposure, heritage wiring, older switchboards, outdoor power, consumer mains, point of attachment condition and safety switches",
  }),
  birchgrove: makeInnerWestLocalContext({
    accessFocus:
      "waterfront access notes, heritage property details, outdoor power photos and private service equipment information",
    commonJobs:
      "waterfront-home electrical work, heritage property wiring checks, older switchboard upgrades, weather-exposed outdoor power, private service equipment, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "waterfront home power loss, weather-exposed power faults, outdoor power hazards, storm or water-affected fixtures, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and supply-side questions for waterfront and heritage properties",
    plannedWork:
      "heritage property repairs, waterfront outdoor power, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "waterfront homes, heritage properties, older switchboards, outdoor circuits, private service equipment and constrained parking",
    setting: "Birchgrove waterfront-home, heritage and outdoor-power service area",
    switchboardDetail:
      "older switchboards, waterfront exposure, weather-exposed power, private service equipment, consumer mains and safety switches",
  }),
  camperdown: makeInnerWestLocalContext({
    accessFocus:
      "strata entry notes, medical or education site contact details, commercial tenancy access details and shared meter-room information",
    commonJobs:
      "apartment, terrace, medical precinct, education precinct and commercial tenancy electrical work, strata access jobs, shared meter-room support, switchboard upgrades, urgent faults, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, medical or education site faults, commercial tenancy outages, shared meter-room issues, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, terraces, strata buildings and commercial tenancies",
    plannedWork:
      "apartment repairs, terrace electrical work, medical and education tenancy maintenance, commercial fitout support, switchboard upgrades, shared meter-room checks, CCTV/data and planned quote work",
    propertyMix:
      "apartments, terrace houses, medical and education precinct buildings, commercial tenancies, strata sites and shared meter rooms",
    setting: "Camperdown apartment, terrace, medical precinct and commercial-tenancy service area",
    switchboardDetail:
      "shared meter rooms, apartment boards, terrace loads, commercial tenancy loads, medical or education site circuits, consumer mains and safety switches",
  }),
  croydon: makeInnerWestLocalContext({
    accessFocus:
      "older-home photos, villa or apartment access notes, shopfront details and defect notice paperwork",
    commonJobs:
      "older-home, apartment, villa and shopfront electrical work, switchboard upgrades, hot water electrical, safety switches, defect notices, CCTV/data and planned quote work",
    emergencySignals:
      "older-home power loss, apartment or villa faults, shopfront outages, hot water electrical issues, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes, apartments, villas and shopfronts",
    plannedWork:
      "older-home repairs, apartment and villa maintenance, shopfront lighting, hot water electrical, switchboard upgrades, defect notice paperwork, CCTV/data and planned quote work",
    propertyMix:
      "older homes, apartments, villas, shopfronts, hot water loads, switchboards and residential service equipment",
    setting: "Croydon older-home, apartment, villa and shopfront service area",
    switchboardDetail:
      "older wiring, apartment boards, villa loads, shopfront loads, hot water demand, defect notices and safety switches",
  }),
  "croydon-park": makeInnerWestLocalContext({
    accessFocus:
      "duplex, villa or apartment access notes, rental maintenance details and local shop access information",
    commonJobs:
      "older-home, duplex, villa, apartment and local shop electrical work, rental maintenance, switchboard upgrades, general electrical repairs, hot water electrical, CCTV/data and planned quote work",
    emergencySignals:
      "older-home power loss, rental maintenance hazards, apartment faults, local shop outages, hot water electrical issues, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment and defect notice questions for older homes, duplexes, villas, apartments and local shops",
    plannedWork:
      "rental maintenance, duplex and villa repairs, apartment electrical work, local shop lighting, switchboard upgrades, hot water circuits, CCTV/data and planned quote work",
    propertyMix:
      "older homes, duplexes, villas, apartments, local shops, rental properties and residential service equipment",
    setting: "Croydon Park older-home, duplex, villa and local-shop service area",
    switchboardDetail:
      "older switchboards, rental safety needs, hot water loads, local shop loads, consumer mains and safety switches",
  }),
  "dulwich-hill": makeInnerWestLocalContext({
    accessFocus:
      "strata entry notes, terrace or older-home photos, cafe or shop access details and hot water circuit information",
    commonJobs:
      "apartment, terrace, older-home, cafe and shop electrical work, strata access jobs, older wiring checks, switchboard upgrades, hot water faults, urgent power loss, CCTV/data and planned quote work",
    emergencySignals:
      "urgent power loss, apartment faults, cafe or shop outages, older wiring faults, hot water electrical issues, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, terraces, older homes, cafes and shops",
    plannedWork:
      "apartment repairs, terrace electrical work, older wiring checks, cafe and shop maintenance, hot water electrical, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "apartments, terraces, older homes, cafes, shops, strata buildings, older wiring and hot water loads",
    setting: "Dulwich Hill apartment, terrace, cafe and older-home service area",
    switchboardDetail:
      "older wiring, strata boards, terrace loads, cafe and shop loads, hot water demand, consumer mains and safety switches",
  }),
  enmore: makeInnerWestLocalContext({
    accessFocus:
      "venue, restaurant or cafe access notes, after-hours contact details, shopfront information and apartment entry notes",
    commonJobs:
      "terrace, music venue, entertainment venue, restaurant, cafe, shopfront and apartment electrical work, older wiring checks, after-hours faults, business outages, switchboard upgrades, CCTV/data and planned quote work",
    emergencySignals:
      "after-hours venue faults, restaurant or cafe outages, shopfront power loss, terrace wiring faults, apartment faults, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for terraces, apartments, venues, restaurants, cafes and shopfronts",
    plannedWork:
      "venue maintenance, restaurant and cafe power, shopfront lighting, terrace repairs, apartment maintenance, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "terraces, music and entertainment venues, restaurants, cafes, shopfronts, apartments, older wiring and business sites",
    setting: "Enmore terrace, venue, restaurant and shopfront service area",
    switchboardDetail:
      "older wiring, venue loads, restaurant and cafe circuits, shopfront loads, apartment boards, business outage risks and safety switches",
  }),
  haberfield: makeInnerWestLocalContext({
    accessFocus:
      "heritage-home photos, larger-property access notes, shopfront details and outdoor power information",
    commonJobs:
      "heritage-home electrical work, older wiring checks, larger residential property repairs, shopfront maintenance, outdoor power, switchboard upgrades, consumer mains, CCTV/data and planned quote work",
    emergencySignals:
      "heritage-home power loss, older wiring faults, shopfront outages, outdoor power hazards, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for heritage homes, larger residential properties and shopfronts",
    plannedWork:
      "heritage-home repairs, older wiring checks, larger residential upgrades, shopfront lighting, outdoor power, switchboard upgrades, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "heritage homes, older wiring, larger residential properties, shopfronts, outdoor circuits and consumer mains",
    setting: "Haberfield heritage-home, larger-property and shopfront service area",
    switchboardDetail:
      "older wiring, heritage-home loads, larger residential loads, outdoor power, shopfront loads, consumer mains and safety switches",
  }),
  "hurlstone-park": makeInnerWestLocalContext({
    accessFocus:
      "station-area access notes, strata entry details, hot water circuit notes and parking information",
    commonJobs:
      "older-home, apartment, station-area and strata electrical work, switchboard upgrades, hot water electrical, safety switches, CCTV/data and planned quote work",
    emergencySignals:
      "older-home power loss, apartment faults, station-area property outages, hot water electrical issues, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment and defect notice questions for older homes, apartments, station-area properties and strata buildings",
    plannedWork:
      "older-home repairs, apartment maintenance, station-area property work, hot water circuits, switchboard upgrades, safety-switch repairs, CCTV/data and planned quote work",
    propertyMix:
      "older homes, apartments, station-area properties, strata buildings, hot water loads and limited parking areas",
    setting: "Hurlstone Park older-home, apartment and station-area service area",
    switchboardDetail:
      "older wiring, apartment boards, hot water demand, station-area property loads, safety switches and consumer mains condition",
  }),
  leichhardt: makeInnerWestLocalContext({
    accessFocus:
      "restaurant, shop or office access notes, terrace entry details, business outage notes and defect notice paperwork",
    commonJobs:
      "restaurant, shop, office, terrace and apartment electrical work, older wiring checks, business outages, switchboard upgrades, consumer mains, defect notices, CCTV/data and planned quote work",
    emergencySignals:
      "restaurant or shop outages, office faults, terrace power loss, apartment faults, older wiring hazards, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for restaurants, shops, terraces, apartments and offices",
    plannedWork:
      "restaurant power, shop lighting, office suite electrical work, terrace repairs, apartment maintenance, switchboard upgrades, consumer mains review, defect notice paperwork, CCTV/data and planned quote work",
    propertyMix:
      "restaurants, shops, offices, terraces, apartments, older wiring, business sites and residential service equipment",
    setting: "Leichhardt restaurant, shop, terrace and apartment service area",
    switchboardDetail:
      "restaurant and shop loads, office suite circuits, older wiring, terrace loads, consumer mains, defect notices and safety switches",
  }),
  lewisham: makeInnerWestLocalContext({
    accessFocus:
      "station-area access notes, strata entry details, shared access information and hot water circuit notes",
    commonJobs:
      "apartment, older-home, station-area and strata electrical work, shared access jobs, hot water electrical, switchboard upgrades, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, station-area property faults, shared access electrical issues, hot water electrical faults, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, older homes, station-area properties and strata buildings",
    plannedWork:
      "apartment repairs, older-home electrical work, station-area property maintenance, hot water circuits, switchboard upgrades, shared access checks, CCTV/data and planned quote work",
    propertyMix:
      "apartments, older homes, station-area properties, strata buildings, shared access sites and hot water loads",
    setting: "Lewisham apartment, older-home and station-area service area",
    switchboardDetail:
      "shared access boards, apartment boards, older wiring, hot water loads, consumer mains and safety switches",
  }),
  lilyfield: makeInnerWestLocalContext({
    accessFocus:
      "terrace or apartment access notes, tight-street parking details, outdoor power photos and consumer mains information",
    commonJobs:
      "terrace-home, apartment and older wiring electrical work, outdoor power, tight-street access jobs, switchboard upgrades, consumer mains, CCTV/data and planned quote work",
    emergencySignals:
      "terrace power loss, apartment faults, outdoor power hazards, older wiring faults, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for terrace homes, apartments and older homes",
    plannedWork:
      "terrace repairs, apartment maintenance, older wiring checks, outdoor power, switchboard upgrades, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "terrace homes, apartments, older wiring, outdoor circuits, tight streets, limited parking and consumer mains",
    setting: "Lilyfield terrace, apartment, tight-street and outdoor-power service area",
    switchboardDetail:
      "older wiring, terrace loads, apartment boards, outdoor power, consumer mains and safety switches",
  }),
  marrickville: makeInnerWestLocalContext({
    accessFocus:
      "warehouse or creative-space access notes, cafe contact details, three-phase or load details and defect notice paperwork",
    commonJobs:
      "warehouse, creative-space, commercial, cafe, apartment and older-home electrical work, business outages, switchboard upgrades, three-phase and load checks, consumer mains, defect notices, CCTV/data and planned quote work",
    emergencySignals:
      "warehouse or creative-space outages, cafe faults, apartment power loss, older-home wiring faults, business outages, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for warehouses, creative spaces, commercial sites, apartments and older homes",
    plannedWork:
      "warehouse power, creative-space fitout support, cafe electrical work, apartment repairs, older-home upgrades, switchboard upgrades, three-phase and load checks, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "warehouses, creative and commercial spaces, cafes, apartments, older homes, business sites, three-phase loads and service equipment",
    setting: "Marrickville warehouse, creative-space, cafe and apartment service area",
    switchboardDetail:
      "warehouse loads, creative-space circuits, cafe loads, three-phase and load checks, consumer mains, defect notices and safety switches",
  }),
  newtown: makeInnerWestLocalContext({
    accessFocus:
      "restaurant or shop access notes, after-hours contact details, terrace entry details and shared access information",
    commonJobs:
      "restaurant, shop, terrace, apartment and older wiring electrical work, after-hours faults, business outages, switchboard upgrades, shared access jobs, CCTV/data and planned quote work",
    emergencySignals:
      "restaurant or shop outages, after-hours business faults, terrace power loss, apartment faults, older wiring hazards, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for restaurants, shops, terraces, apartments and older wiring sites",
    plannedWork:
      "restaurant power, shop lighting, terrace repairs, apartment maintenance, older wiring checks, switchboard upgrades, shared access checks, CCTV/data and planned quote work",
    propertyMix:
      "restaurants, shops, terraces, apartments, older wiring, after-hours business sites and shared access buildings",
    setting: "Newtown restaurant, shop, terrace and apartment service area",
    switchboardDetail:
      "restaurant and shop loads, older wiring, terrace loads, apartment boards, business outage risks and safety switches",
  }),
  petersham: makeInnerWestLocalContext({
    accessFocus:
      "restaurant or shopfront access notes, strata entry details, hot water circuit notes and parking information",
    commonJobs:
      "older-home, apartment, restaurant, shopfront and strata electrical work, switchboard upgrades, hot water electrical, lighting and power, CCTV/data and Level 2 support",
    emergencySignals:
      "older-home power loss, apartment faults, restaurant or shopfront outages, hot water electrical issues, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes, apartments, restaurants and shopfronts",
    plannedWork:
      "older-home repairs, apartment maintenance, restaurant power, shopfront lighting, hot water circuits, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "older homes, apartments, restaurants, shopfronts, strata buildings, hot water loads and lighting or power circuits",
    setting: "Petersham older-home, apartment, restaurant and shopfront service area",
    switchboardDetail:
      "older wiring, apartment boards, restaurant and shopfront loads, hot water demand, consumer mains and safety switches",
  }),
  rozelle: makeInnerWestLocalContext({
    accessFocus:
      "terrace or harbour-side access notes, limited parking details, outdoor power photos and private service equipment information",
    commonJobs:
      "terrace, harbour-side home, apartment and older wiring electrical work, outdoor power, limited-parking access jobs, switchboard upgrades, private service equipment, CCTV/data and planned quote work",
    emergencySignals:
      "terrace power loss, harbour-side home faults, apartment faults, outdoor power hazards, older wiring faults, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices, point of attachment concerns and supply-side questions for terraces, harbour-side homes and apartments",
    plannedWork:
      "terrace repairs, harbour-side home upgrades, apartment maintenance, outdoor power, switchboard upgrades, private service equipment review, CCTV/data and planned quote work",
    propertyMix:
      "terraces, harbour-side homes, apartments, older wiring, limited parking, outdoor circuits and private service equipment",
    setting: "Rozelle terrace, harbour-side home and apartment service area",
    switchboardDetail:
      "older wiring, terrace loads, apartment boards, outdoor power, private service equipment, consumer mains and safety switches",
  }),
  "st-peters": makeInnerWestLocalContext({
    accessFocus:
      "warehouse or workshop access notes, creative-space details, three-phase or load information and apartment entry notes",
    commonJobs:
      "warehouse, workshop, apartment and creative-space electrical work, business outages, switchboard upgrades, three-phase and load checks, lighting and power, CCTV/data and planned quote work",
    emergencySignals:
      "warehouse or workshop outages, creative-space faults, apartment power loss, business outages, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for warehouses, workshops, apartments and creative or commercial spaces",
    plannedWork:
      "warehouse power, workshop circuits, creative-space fitout support, apartment repairs, switchboard upgrades, three-phase and load checks, lighting, power, CCTV/data and planned quote work",
    propertyMix:
      "warehouses, workshops, apartments, creative and commercial spaces, business sites, three-phase loads and service equipment",
    setting: "St Peters warehouse, workshop, apartment and creative-space service area",
    switchboardDetail:
      "warehouse loads, workshop circuits, creative-space loads, three-phase and load checks, lighting and power demand, consumer mains and safety switches",
  }),
  stanmore: makeInnerWestLocalContext({
    accessFocus:
      "terrace or apartment access notes, local shop details, hot water circuit notes and strata entry information",
    commonJobs:
      "older-home, terrace, apartment and local shop electrical work, older switchboard upgrades, hot water electrical, safety-switch tripping, strata access jobs, CCTV/data and planned quote work",
    emergencySignals:
      "older-home power loss, terrace faults, apartment faults, local shop outages, hot water electrical issues, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment and defect notice questions for older homes, terraces, apartments and local shops",
    plannedWork:
      "older-home repairs, terrace electrical work, apartment maintenance, local shop lighting, hot water circuits, switchboard upgrades, strata access checks, CCTV/data and planned quote work",
    propertyMix:
      "older homes, terraces, apartments, local shops, older switchboards, hot water loads and strata access sites",
    setting: "Stanmore older-home, terrace, apartment and local-shop service area",
    switchboardDetail:
      "older switchboards, terrace loads, apartment boards, local shop loads, hot water demand and safety switches",
  }),
  "summer-hill": makeInnerWestLocalContext({
    accessFocus:
      "villa, apartment or strata access notes, shop or cafe details, hot water circuit notes and quote-photo information",
    commonJobs:
      "apartment, older-home, villa, shop and cafe electrical work, strata access jobs, switchboard upgrades, hot water electrical, safety switches, CCTV/data and quote-photo guided planned work",
    emergencySignals:
      "apartment power loss, older-home faults, shop or cafe outages, hot water electrical issues, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment and defect notice questions for apartments, older homes, villas, shops and cafes",
    plannedWork:
      "apartment repairs, older-home electrical work, villa maintenance, shop and cafe power, hot water circuits, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "apartments, older homes, villas, shops, cafes, strata sites, hot water loads and residential service equipment",
    setting: "Summer Hill apartment, older-home, villa and cafe service area",
    switchboardDetail:
      "apartment boards, older wiring, villa loads, shop and cafe circuits, hot water demand, consumer mains and safety switches",
  }),
  sydenham: makeInnerWestLocalContext({
    accessFocus:
      "railway or industrial access notes, warehouse or workshop entry details, three-phase or load information and parking notes",
    commonJobs:
      "railway-adjacent, industrial, warehouse, workshop, apartment and commercial electrical work, business outages, switchboard upgrades, three-phase and load checks, CCTV/data and planned quote work",
    emergencySignals:
      "warehouse or workshop outages, industrial site faults, apartment power loss, railway-adjacent access issues, business outages, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for warehouses, workshops, apartments and industrial or commercial sites",
    plannedWork:
      "warehouse power, workshop circuits, commercial maintenance, apartment repairs, switchboard upgrades, three-phase and load checks, CCTV/data and planned quote work",
    propertyMix:
      "railway-adjacent sites, industrial and commercial buildings, warehouses, workshops, apartments, business sites and three-phase loads",
    setting: "Sydenham railway-adjacent, industrial, warehouse and apartment service area",
    switchboardDetail:
      "industrial and warehouse loads, workshop circuits, three-phase and load checks, apartment boards, consumer mains and safety switches",
  }),
  tempe: makeInnerWestLocalContext({
    accessFocus:
      "railway or airport-adjacent access notes, industrial pocket details, apartment entry notes and hot water circuit information",
    commonJobs:
      "older-home, apartment, industrial pocket, railway-adjacent and airport-adjacent electrical work, switchboard upgrades, hot water electrical, lighting and power, business faults, CCTV/data and planned quote work",
    emergencySignals:
      "older-home power loss, apartment faults, industrial pocket outages, business faults, hot water electrical issues, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment and defect notice questions for older homes, apartments and industrial pockets",
    plannedWork:
      "older-home repairs, apartment maintenance, industrial pocket power, hot water circuits, lighting and power, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "older homes, apartments, industrial pockets, railway-adjacent and airport-adjacent sites, hot water loads and business faults",
    setting: "Tempe older-home, apartment, industrial-pocket and railway-adjacent service area",
    switchboardDetail:
      "older wiring, apartment boards, industrial pocket loads, hot water demand, lighting and power circuits, consumer mains and safety switches",
  }),
};

function getInnerWestLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "inner-west-burwood-and-canada-bay" ||
    coverageArea.slug !== "inner-west"
  ) {
    return null;
  }

  return innerWestLocalContexts[coverageSuburb.slug] ?? null;
}

function makeStrathfieldAreaLocalContext({
  accessFocus,
  commonJobs,
  emergencySignals,
  level2Detail,
  plannedWork,
  propertyMix,
  setting,
  switchboardDetail,
}: Omit<LocalPageContext, "accessDetail"> & {
  accessFocus: string;
}): LocalPageContext {
  return {
    accessDetail: `photos of the switchboard, meter box, affected fitting, ${accessFocus}, access notes, parking details and any defect notice or paperwork`,
    commonJobs,
    emergencySignals,
    level2Detail,
    plannedWork,
    propertyMix,
    setting,
    switchboardDetail,
  };
}

const strathfieldAreaLocalContexts: Record<string, LocalPageContext> = {
  homebush: makeStrathfieldAreaLocalContext({
    accessFocus:
      "shared meter-room notes, building-manager details, rail or station-area access notes and limited parking information",
    commonJobs:
      "apartment, strata, older-home, local shop and office electrical work, shared meter-room access, rail or station-area jobs, switchboard upgrades, consumer mains, defect notices, urgent power faults, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, strata shared-power issues, local shop or office faults, shared meter-room issues, older wiring faults, burning smells, hot outlets and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for apartments, strata buildings, older homes, shops and offices",
    plannedWork:
      "apartment repairs, strata maintenance, older-home electrical work, local shop lighting, office power, switchboard upgrades, consumer mains review, defect notice paperwork, CCTV/data and planned quote work",
    propertyMix:
      "apartments, strata buildings, older homes, local shops, offices, shared meter rooms, rail or station-area properties and limited parking sites",
    setting: "Homebush apartment, strata, station-area and local business service area",
    switchboardDetail:
      "shared meter rooms, apartment boards, older wiring, shop and office loads, consumer mains, defect notices and safety switches",
  }),
  "homebush-west": makeStrathfieldAreaLocalContext({
    accessFocus:
      "strata entry notes, retail or warehouse-style premises access details, shared meter-room information and load check notes",
    commonJobs:
      "apartment, unit, strata, retail and warehouse-style premises electrical work, shared meter-room access, business outages, lighting, power, hot water circuits, CCTV/data, metering, load checks and planned quote work",
    emergencySignals:
      "apartment or unit power loss, retail outages, warehouse-style premises faults, shared meter-room issues, hot water electrical faults, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, units, retail spaces and warehouse-style premises",
    plannedWork:
      "apartment and unit repairs, strata maintenance, retail lighting, warehouse-style premises power, hot water electrical, CCTV/data, metering, load checks and planned quote work",
    propertyMix:
      "apartments, units, strata buildings, retail premises, warehouse-style premises, shared meter rooms, business sites and hot water loads",
    setting: "Homebush West apartment, unit, retail and warehouse-style premises service area",
    switchboardDetail:
      "shared meter rooms, apartment and unit boards, retail loads, warehouse-style premises loads, hot water demand, metering, load checks and safety switches",
  }),
  "strathfield-south": makeStrathfieldAreaLocalContext({
    accessFocus:
      "local business or warehouse access notes, workshop entry details, commercial switchboard photos and Level 2 paperwork",
    commonJobs:
      "older-home, unit, local business, warehouse and workshop electrical work, commercial switchboards, lighting, power, hot water circuits, business outages, consumer mains, defect notices, service equipment, CCTV/data and planned quote work",
    emergencySignals:
      "older-home power loss, unit faults, local business outages, warehouse or workshop faults, commercial switchboard issues, hot water electrical faults, burning smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for older homes, units, local businesses, warehouses and workshops",
    plannedWork:
      "older-home repairs, unit maintenance, local business electrical work, warehouse and workshop power, commercial switchboard upgrades, lighting, hot water circuits, consumer mains review, defect notice paperwork, CCTV/data and planned quote work",
    propertyMix:
      "older homes, units, local businesses, warehouses, workshops, commercial switchboards, hot water loads and Level 2 service equipment",
    setting: "Strathfield South older-home, unit, warehouse, workshop and local business service area",
    switchboardDetail:
      "older wiring, unit boards, local business loads, warehouse and workshop loads, commercial switchboards, consumer mains, service equipment and safety switches",
  }),
};

function getStrathfieldAreaLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "inner-west-burwood-and-canada-bay" ||
    coverageArea.slug !== "strathfield"
  ) {
    return null;
  }

  return strathfieldAreaLocalContexts[coverageSuburb.slug] ?? null;
}

function makeRandwickLocalContext({
  accessFocus,
  commonJobs,
  emergencySignals,
  level2Detail,
  plannedWork,
  propertyMix,
  setting,
  switchboardDetail,
}: Omit<LocalPageContext, "accessDetail"> & {
  accessFocus: string;
}): LocalPageContext {
  return {
    accessDetail: `photos of the switchboard, meter box, affected fitting, ${accessFocus}, access notes, parking details, strata/building-manager notes and any defect notice or paperwork`,
    commonJobs,
    emergencySignals,
    level2Detail,
    plannedWork,
    propertyMix,
    setting,
    switchboardDetail,
  };
}

const randwickLocalContexts: Record<string, LocalPageContext> = {
  "centennial-park": makeRandwickLocalContext({
    accessFocus:
      "apartment entry notes, terrace access details, park-edge parking information and outdoor lighting photos",
    commonJobs:
      "apartment, terrace, older-home and park-edge property electrical work, strata access, outdoor lighting, switchboard upgrades, safety-switch faults, hot water electrical, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, terrace wiring faults, park-edge outdoor lighting faults, older switchboard heat, smoke smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, terraces, older homes and park-edge properties",
    plannedWork:
      "apartment repairs, terrace electrical work, older-home wiring checks, outdoor lighting, switchboard upgrades, safety-switch repairs, hot water circuits, CCTV/data and planned quote work",
    propertyMix:
      "apartments, terraces, older homes, park-edge properties, strata buildings, limited parking sites and outdoor lighting",
    setting: "Centennial Park apartment, terrace, park-edge and older-home service area",
    switchboardDetail:
      "older wiring, apartment boards, terrace switchboards, outdoor lighting loads, consumer mains and safety switches",
  }),
  chifley: makeRandwickLocalContext({
    accessFocus:
      "duplex access details, local shop timing, outdoor power photos and weather-exposed fitting notes",
    commonJobs:
      "home, duplex and local shop electrical work, older-board checks, outdoor power, weather-exposed fittings, hot water electrical, safety-switch faults, CCTV/data and planned quote work",
    emergencySignals:
      "home power loss, duplex faults, local shop outages, weather-exposed fitting faults, hot water electrical faults, smoke smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, duplexes and local shops",
    plannedWork:
      "home repairs, duplex electrical work, local shop lighting, outdoor power, weather-exposed fitting repairs, hot water circuits, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "homes, duplexes, local shops, older boards, outdoor power, weather-exposed fittings and hot water loads",
    setting: "Chifley home, duplex, local shop and outdoor-power service area",
    switchboardDetail:
      "older boards, outdoor circuit loads, hot water demand, local shop circuits, consumer mains and safety switches",
  }),
  clovelly: makeRandwickLocalContext({
    accessFocus:
      "coastal access notes, strata entry details, salt-exposed fitting photos and tight parking information",
    commonJobs:
      "coastal-home, apartment and strata electrical work, salt-exposed outdoor power, switchboard upgrades, hot water electrical, access and parking planning, CCTV/data and planned quote work",
    emergencySignals:
      "coastal power loss, apartment or strata faults, salt-exposed outdoor power hazards, hot water electrical faults, smoke smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for coastal homes, apartments and strata buildings",
    plannedWork:
      "coastal-home repairs, apartment maintenance, strata electrical work, weather-rated outdoor power, hot water circuits, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "coastal homes, apartments, strata buildings, salt exposure, outdoor power, hot water loads and tight parking sites",
    setting: "Clovelly coastal-home, apartment, strata and weather-exposed service area",
    switchboardDetail:
      "coastal exposure, apartment boards, strata switchboards, outdoor circuits, hot water loads, consumer mains and safety switches",
  }),
  coogee: makeRandwickLocalContext({
    accessFocus:
      "beachside access notes, shared meter-room details, cafe or restaurant timing and weather-exposed outdoor power photos",
    commonJobs:
      "coastal-home, apartment, strata, beachside shop, cafe, restaurant and renovated-house electrical work, shared meter-room access, weather-exposed outdoor power, commercial faults, switchboards, CCTV/data and planned quote work",
    emergencySignals:
      "coastal apartment power loss, beachside shop or restaurant faults, shared meter-room issues, weather-exposed outdoor power hazards, smoke smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for coastal homes, apartments, strata buildings and beachside businesses",
    plannedWork:
      "apartment repairs, strata maintenance, cafe and restaurant power, renovated-house electrical work, outdoor power, switchboard upgrades, shared meter-room checks, CCTV/data and planned quote work",
    propertyMix:
      "coastal homes, apartments, strata buildings, beachside shops, cafes, restaurants, renovated houses, shared meter rooms and weather-exposed outdoor power",
    setting: "Coogee coastal, strata, beachside business and renovated-home service area",
    switchboardDetail:
      "shared meter rooms, coastal exposure, apartment boards, restaurant and cafe loads, renovated-house circuits, consumer mains and safety switches",
  }),
  kensington: makeRandwickLocalContext({
    accessFocus:
      "student-housing access notes, university-area timing, shared meter-room information and strata entry details",
    commonJobs:
      "apartment, student-housing, university-area, shop, cafe and office electrical work, strata access, shared meter-room checks, older wiring, switchboard upgrades, hot water electrical, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, student-housing faults, university-area shop or cafe outages, shared meter-room issues, hot water electrical faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, student housing, shops, cafes and office suites",
    plannedWork:
      "apartment repairs, student-housing maintenance, shop and cafe power, office suite electrical work, hot water circuits, switchboard upgrades, shared meter-room checks, CCTV/data and planned quote work",
    propertyMix:
      "apartments, student housing, university-area properties, shops, cafes, office suites, strata buildings, shared meter rooms and older wiring",
    setting: "Kensington apartment, student-housing, university-area and mixed-use service area",
    switchboardDetail:
      "shared meter rooms, older wiring, apartment boards, shop and cafe loads, office suite circuits, hot water demand and safety switches",
  }),
  kingsford: makeRandwickLocalContext({
    accessFocus:
      "restaurant or shop timing, student-housing entry details, shared switchboard notes and strata access information",
    commonJobs:
      "restaurant, shop, apartment, student-housing and strata electrical work, shared switchboard access, older wiring checks, business outages, hot water electrical, CCTV/data and planned quote work",
    emergencySignals:
      "restaurant or shop outages, apartment power loss, student-housing faults, shared switchboard issues, hot water electrical faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for restaurants, shops, apartments, student housing and strata buildings",
    plannedWork:
      "restaurant power, shop lighting, apartment repairs, student-housing maintenance, shared switchboard checks, hot water circuits, CCTV/data and planned quote work",
    propertyMix:
      "restaurants, shops, apartments, student housing, strata buildings, shared switchboards, older wiring and hot water loads",
    setting: "Kingsford restaurant, shop, apartment, student-housing and strata service area",
    switchboardDetail:
      "shared switchboards, older wiring, restaurant and shop loads, apartment boards, hot water demand, consumer mains and safety switches",
  }),
  "la-perouse": makeRandwickLocalContext({
    accessFocus:
      "coastal access notes, outdoor power photos, weather-exposed fitting details and storm or water fault notes",
    commonJobs:
      "coastal-home electrical work, outdoor power, weather-exposed fitting repairs, storm and water-affected fault checks, switchboard upgrades, hot water electrical, CCTV/data and planned quote work",
    emergencySignals:
      "coastal power loss, storm or water-affected faults, weather-exposed fitting hazards, outdoor power issues, smoke smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for coastal homes and weather-exposed properties",
    plannedWork:
      "coastal-home repairs, weather-rated outdoor power, outdoor lighting, storm-related repair planning, switchboard upgrades, hot water circuits, CCTV/data and planned quote work",
    propertyMix:
      "coastal homes, weather-exposed fittings, outdoor power, storm and water exposure, access constraints and residential switchboards",
    setting: "La Perouse coastal, outdoor-power and weather-exposed service area",
    switchboardDetail:
      "coastal exposure, outdoor circuits, weather-exposed equipment, hot water loads, consumer mains and safety switches",
  }),
  "little-bay": makeRandwickLocalContext({
    accessFocus:
      "new-development access notes, shared meter-room details, coastal fitting photos and strata entry information",
    commonJobs:
      "apartment, new-development, coastal-home and strata electrical work, shared meter-room access, outdoor power, weather-exposed fittings, metering, consumer mains, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, new-development faults, coastal outdoor power hazards, shared meter-room issues, weather-exposed fitting faults, smoke smells and safety-switch tripping",
    level2Detail:
      "metering, consumer mains, service equipment, defect notices and supply-side questions for apartments, new developments, coastal homes and strata buildings",
    plannedWork:
      "apartment repairs, new-development electrical work, strata maintenance, outdoor power, weather-exposed fitting repairs, metering support, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "apartments, new developments, coastal homes, strata buildings, shared meter rooms, outdoor power and weather-exposed fittings",
    setting: "Little Bay apartment, new-development, coastal and strata service area",
    switchboardDetail:
      "shared meter rooms, apartment boards, new-development loads, coastal exposure, metering, consumer mains and safety switches",
  }),
  malabar: makeRandwickLocalContext({
    accessFocus:
      "coastal fitting photos, local shop timing, outdoor power details and storm or water fault notes",
    commonJobs:
      "coastal-home, apartment and local shop electrical work, weather-exposed outdoor power, storm and water-affected fault checks, switchboard upgrades, safety switches, hot water electrical, CCTV/data and planned quote work",
    emergencySignals:
      "coastal-home power loss, apartment faults, local shop outages, storm or water-affected electrical issues, outdoor power hazards, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for coastal homes, apartments and local shops",
    plannedWork:
      "coastal-home repairs, apartment maintenance, local shop lighting, weather-rated outdoor power, switchboard upgrades, hot water circuits, CCTV/data and planned quote work",
    propertyMix:
      "coastal homes, apartments, local shops, weather exposure, outdoor power, storm and water-affected faults and safety switches",
    setting: "Malabar coastal-home, apartment, local shop and weather-exposed service area",
    switchboardDetail:
      "coastal exposure, apartment boards, local shop loads, outdoor circuits, hot water demand, consumer mains and safety switches",
  }),
  maroubra: makeRandwickLocalContext({
    accessFocus:
      "beachside access notes, shared meter-room details, cafe or restaurant timing and weather-exposed outdoor power photos",
    commonJobs:
      "apartment, beachside-home, shop, cafe, restaurant, strata and older-home electrical work, weather-exposed outdoor power, business outages, shared meter-room access, consumer mains, defect notices, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, beachside home faults, shop or restaurant outages, shared meter-room issues, weather-exposed outdoor power hazards, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, beachside homes, strata buildings, shops and restaurants",
    plannedWork:
      "apartment repairs, strata maintenance, shop and restaurant power, older-home wiring checks, outdoor power, switchboard upgrades, consumer mains review, defect notice paperwork, CCTV/data and planned quote work",
    propertyMix:
      "apartments, beachside homes, shops, cafes, restaurants, strata buildings, older homes, shared meter rooms and weather-exposed outdoor power",
    setting: "Maroubra apartment, beachside, strata and local business service area",
    switchboardDetail:
      "shared meter rooms, coastal exposure, apartment boards, shop and restaurant loads, older wiring, consumer mains, defect notices and safety switches",
  }),
  matraville: makeRandwickLocalContext({
    accessFocus:
      "workshop or warehouse access notes, small factory entry details, commercial switchboard photos and load-check information",
    commonJobs:
      "home, unit, workshop, warehouse, small factory and commercial electrical work, commercial switchboards, business outages, three-phase and load checks, lighting, power, CCTV/data, service equipment and planned quote work",
    emergencySignals:
      "home or unit power loss, workshop faults, warehouse or small factory outages, commercial switchboard issues, smoke smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for homes, units, workshops, warehouses, small factories and commercial sites",
    plannedWork:
      "home and unit repairs, workshop circuits, warehouse lighting, small factory power, commercial switchboard upgrades, three-phase and load checks, CCTV/data and planned quote work",
    propertyMix:
      "homes, units, workshops, warehouses, small factories, commercial switchboards, business outages, three-phase loads and service equipment",
    setting: "Matraville home, unit, workshop, warehouse and commercial service area",
    switchboardDetail:
      "commercial switchboards, workshop and warehouse loads, small factory circuits, three-phase capacity, consumer mains, service equipment and safety switches",
  }),
  "phillip-bay": makeRandwickLocalContext({
    accessFocus:
      "coastal access notes, outdoor circuit photos, storm or water exposure details and private service equipment information",
    commonJobs:
      "coastal-home and apartment electrical work, outdoor circuits, storm and water-exposure fault checks, switchboard upgrades, private service equipment, consumer mains, hot water electrical, CCTV/data and planned quote work",
    emergencySignals:
      "coastal power loss, apartment faults, storm or water-exposure electrical issues, outdoor circuit hazards, smoke smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, defect notices and supply-side questions for coastal homes and apartments",
    plannedWork:
      "coastal-home repairs, apartment maintenance, outdoor circuits, storm-related repair planning, switchboard upgrades, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "coastal homes, apartments, outdoor circuits, storm and water exposure, private service equipment, consumer mains and access constraints",
    setting: "Phillip Bay coastal-home, apartment, outdoor-circuit and service-equipment service area",
    switchboardDetail:
      "coastal exposure, outdoor circuits, private service equipment, consumer mains, hot water loads and safety switches",
  }),
  randwick: makeRandwickLocalContext({
    accessFocus:
      "medical precinct timing, university-area access notes, shared meter-room details and strata entry information",
    commonJobs:
      "apartment, strata, hospital or medical precinct, university-area, shop, office and older-home electrical work, shared meter-room access, business outages, switchboard upgrades, consumer mains, metering, defect notices, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, strata shared-power issues, medical precinct or shop faults, business outages, shared meter-room issues, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, strata buildings, medical precinct sites, shops, offices and older homes",
    plannedWork:
      "apartment repairs, strata maintenance, medical precinct electrical work, university-area property maintenance, shop lighting, office suite power, older-home repairs, switchboard upgrades, consumer mains review, metering support, defect notice paperwork, CCTV/data and planned quote work",
    propertyMix:
      "apartments, strata buildings, hospital and medical precinct sites, university-area properties, shops, offices, older homes, shared meter rooms and business sites",
    setting: "Randwick apartment, strata, medical precinct, university-area and local business service area",
    switchboardDetail:
      "shared meter rooms, apartment and strata boards, older wiring, shop and office loads, medical precinct circuits, consumer mains, metering and safety switches",
  }),
  "south-coogee": makeRandwickLocalContext({
    accessFocus:
      "steep or tight access notes, coastal outdoor lighting photos, weather-exposed power details and strata entry information",
    commonJobs:
      "coastal-home, apartment and strata electrical work, steep or tight access jobs, outdoor lighting, weather-exposed power, storm and water fault checks, switchboard upgrades, CCTV/data and planned quote work",
    emergencySignals:
      "coastal power loss, apartment or strata faults, weather-exposed power hazards, storm or water-affected electrical issues, smoke smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for coastal homes, apartments and strata buildings",
    plannedWork:
      "coastal-home repairs, apartment maintenance, strata electrical work, outdoor lighting, weather-rated power, storm-related repair planning, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "coastal homes, apartments, strata buildings, steep or tight access sites, outdoor lighting, weather-exposed power and shared access",
    setting: "South Coogee coastal-home, apartment, strata and steep-access service area",
    switchboardDetail:
      "coastal exposure, apartment boards, strata switchboards, outdoor lighting loads, weather-exposed power, consumer mains and safety switches",
  }),
};

function getRandwickLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "sydney-city-and-eastern-suburbs" ||
    coverageArea.slug !== "randwick"
  ) {
    return null;
  }

  return randwickLocalContexts[coverageSuburb.slug] ?? null;
}

function makeSydneyCbdLocalContext({
  accessFocus,
  commonJobs,
  emergencySignals,
  level2Detail,
  plannedWork,
  propertyMix,
  setting,
  switchboardDetail,
}: Omit<LocalPageContext, "accessDetail"> & {
  accessFocus: string;
}): LocalPageContext {
  return {
    accessDetail: `photos of the switchboard, meter box, affected fitting, ${accessFocus}, access notes, parking/loading details, building-manager or strata notes and any defect notice or paperwork`,
    commonJobs,
    emergencySignals,
    level2Detail,
    plannedWork,
    propertyMix,
    setting,
    switchboardDetail,
  };
}

const sydneyCbdLocalContexts: Record<string, LocalPageContext> = {
  alexandria: makeSydneyCbdLocalContext({
    accessFocus:
      "warehouse entry details, showroom timing, creative-space access notes and loading dock information",
    commonJobs:
      "warehouse, creative-space, apartment, showroom and commercial electrical work, business outages, commercial switchboards, three-phase and load checks, CCTV/data, lighting, power and planned quote work",
    emergencySignals:
      "warehouse outages, apartment power loss, showroom faults, commercial switchboard issues, equipment circuit faults, smoke smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for warehouses, apartments, showrooms and commercial spaces",
    plannedWork:
      "warehouse lighting, showroom power, creative-space fitout support, apartment repairs, commercial switchboard upgrades, three-phase and load checks, CCTV/data and planned quote work",
    propertyMix:
      "warehouses, creative and commercial spaces, apartments, showrooms, business sites, loading docks and commercial switchboards",
    setting: "Alexandria warehouse, showroom, apartment and creative-commercial service area",
    switchboardDetail:
      "commercial switchboards, warehouse loads, showroom circuits, apartment boards, three-phase capacity, consumer mains and safety switches",
  }),
  barangaroo: makeSydneyCbdLocalContext({
    accessFocus:
      "tower concierge details, loading dock bookings, tenancy contacts and shared meter-room information",
    commonJobs:
      "high-rise commercial tower, restaurant, retail tenancy, office suite, apartment and strata electrical work, shared meter rooms, building-manager access, loading docks, after-hours business faults, CCTV/data and planned quote work",
    emergencySignals:
      "tower power faults, restaurant or retail outages, apartment electrical faults, shared meter-room issues, after-hours business faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for towers, apartments, retail tenancies and commercial suites",
    plannedWork:
      "restaurant power, retail tenancy lighting, commercial suite maintenance, apartment repairs, shared meter-room checks, loading dock access planning, CCTV/data and planned quote work",
    propertyMix:
      "high-rise commercial towers, restaurants, retail tenancies, commercial suites, apartments, shared meter rooms, building-manager access and loading docks",
    setting: "Barangaroo high-rise, restaurant, retail, apartment and CBD tower service area",
    switchboardDetail:
      "tower switchboards, shared meter rooms, restaurant and retail loads, apartment boards, commercial suite circuits, metering and safety switches",
  }),
  beaconsfield: makeSydneyCbdLocalContext({
    accessFocus:
      "terrace or duplex entry details, strata access notes, mixed commercial site timing and hot water circuit notes",
    commonJobs:
      "apartment, older-home, terrace, duplex, mixed commercial site and strata electrical work, switchboard upgrades, hot water electrical, power loss, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, older-home faults, terrace or duplex wiring issues, mixed commercial site outages, hot water electrical faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, older homes, terraces, duplexes and mixed commercial sites",
    plannedWork:
      "apartment repairs, older-home maintenance, terrace and duplex electrical work, mixed commercial site lighting, hot water circuits, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "apartments, older homes, terraces, duplexes, mixed commercial sites, strata access and hot water loads",
    setting: "Beaconsfield apartment, older-home, terrace, duplex and mixed-use service area",
    switchboardDetail:
      "older wiring, apartment boards, terrace and duplex loads, mixed commercial circuits, hot water demand, consumer mains and safety switches",
  }),
  chippendale: makeSydneyCbdLocalContext({
    accessFocus:
      "student-housing entry details, university-area timing, tenancy contacts and shared meter-room information",
    commonJobs:
      "apartment, student-housing, university-area, commercial suite, cafe, restaurant and strata electrical work, older wiring checks, shared meter-room access, hot water electrical, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, student-housing faults, cafe or restaurant outages, shared meter-room issues, older wiring faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, student housing, restaurants, cafes and strata buildings",
    plannedWork:
      "apartment repairs, student-housing maintenance, cafe and restaurant power, commercial suite electrical work, older wiring checks, shared meter-room checks, CCTV/data and planned quote work",
    propertyMix:
      "apartments, student housing, university-area properties, commercial suites, cafes, restaurants, older wiring, strata access and shared meter rooms",
    setting: "Chippendale apartment, student-housing, university-area and hospitality service area",
    switchboardDetail:
      "shared meter rooms, older wiring, apartment boards, cafe and restaurant loads, student-housing circuits, hot water demand and safety switches",
  }),
  darlinghurst: makeSydneyCbdLocalContext({
    accessFocus:
      "restaurant or bar trading hours, medical suite contacts, strata entry notes and terrace access details",
    commonJobs:
      "apartment, terrace, restaurant, bar, cafe, medical suite, commercial suite and strata electrical work, older wiring, after-hours commercial faults, switchboard upgrades, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, restaurant or bar outages, medical suite faults, terrace wiring issues, after-hours commercial faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, terraces, medical suites and hospitality tenancies",
    plannedWork:
      "restaurant and bar power, cafe lighting, medical suite maintenance, terrace repairs, apartment and strata electrical work, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "apartments, terraces, restaurants, bars, cafes, medical suites, commercial suites, older wiring and strata access",
    setting: "Darlinghurst apartment, terrace, hospitality, medical-suite and strata service area",
    switchboardDetail:
      "older wiring, apartment boards, hospitality loads, medical suite circuits, shared meter rooms, consumer mains and safety switches",
  }),
  darlington: makeSydneyCbdLocalContext({
    accessFocus:
      "terrace entry details, university-area access notes, hot water circuit information and parking notes",
    commonJobs:
      "terrace, university-area, apartment and older wiring electrical work, switchboard upgrades, hot water electrical, Level 2 support, CCTV/data and planned quote work",
    emergencySignals:
      "terrace power loss, apartment faults, university-area property outages, older wiring faults, hot water electrical faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for terraces, apartments and university-area properties",
    plannedWork:
      "terrace repairs, apartment maintenance, university-area property work, older wiring checks, hot water circuits, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "terraces, university-area properties, apartments, older wiring, hot water circuits and tight access sites",
    setting: "Darlington terrace, apartment and university-area service area",
    switchboardDetail:
      "older wiring, terrace switchboards, apartment boards, hot water loads, consumer mains and safety switches",
  }),
  "dawes-point": makeSydneyCbdLocalContext({
    accessFocus:
      "heritage access notes, harbour-side entry details, limited parking information and private service equipment photos",
    commonJobs:
      "heritage building, harbour-side property, apartment and older wiring electrical work, limited parking access, private service equipment, switchboard upgrades, consumer mains, CCTV/data and planned quote work",
    emergencySignals:
      "heritage property power loss, harbour-side apartment faults, older wiring concerns, private service equipment issues, smoke smells, sparking and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, point of attachment concerns, defect notices and supply-side questions for heritage buildings and harbour-side properties",
    plannedWork:
      "heritage building repairs, harbour-side apartment maintenance, older wiring checks, private service equipment review, switchboard upgrades, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "heritage buildings, harbour-side properties, apartments, older wiring, limited parking, access constraints and private service equipment",
    setting: "Dawes Point heritage, harbour-side, apartment and access-constrained service area",
    switchboardDetail:
      "older wiring, heritage property switchboards, apartment boards, private service equipment, consumer mains and safety switches",
  }),
  "elizabeth-bay": makeSydneyCbdLocalContext({
    accessFocus:
      "strata entry notes, shared meter-room details, waterfront access notes and limited parking information",
    commonJobs:
      "apartment, strata, waterfront and older-property electrical work, shared meter-room access, hot water faults, switchboard upgrades, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, strata shared-power issues, waterfront property faults, shared meter-room concerns, hot water electrical faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, strata buildings and older waterfront properties",
    plannedWork:
      "apartment repairs, strata maintenance, waterfront property electrical work, shared meter-room checks, hot water circuits, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "apartments, strata buildings, waterfront and older properties, shared meter rooms, limited parking and hot water loads",
    setting: "Elizabeth Bay apartment, strata, waterfront and older-property service area",
    switchboardDetail:
      "shared meter rooms, apartment boards, older wiring, waterfront exposure, hot water demand, consumer mains and safety switches",
  }),
  erskineville: makeSydneyCbdLocalContext({
    accessFocus:
      "terrace access notes, converted warehouse-style entry details, apartment access information and hot water circuit notes",
    commonJobs:
      "terrace, apartment, converted warehouse-style and older wiring electrical work, switchboard upgrades, hot water electrical, lighting, power, CCTV/data and planned quote work",
    emergencySignals:
      "terrace power loss, apartment faults, converted warehouse-style property outages, older wiring issues, hot water electrical faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for terraces, apartments and converted warehouse-style properties",
    plannedWork:
      "terrace repairs, apartment maintenance, converted warehouse-style electrical work, older wiring checks, hot water circuits, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "terraces, apartments, converted warehouse-style properties, older wiring, switchboard upgrades and hot water circuits",
    setting: "Erskineville terrace, apartment and converted warehouse-style service area",
    switchboardDetail:
      "older wiring, terrace switchboards, apartment boards, converted warehouse-style loads, hot water demand, consumer mains and safety switches",
  }),
  eveleigh: makeSydneyCbdLocalContext({
    accessFocus:
      "rail-corridor site contacts, workshop entry details, warehouse access notes and load-check information",
    commonJobs:
      "commercial suite, rail-corridor site, apartment, warehouse and workshop electrical work, business outages, switchboards, three-phase and load checks, CCTV/data and planned quote work",
    emergencySignals:
      "commercial site outages, rail-corridor property faults, apartment power loss, warehouse or workshop faults, commercial switchboard issues, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for commercial sites, apartments, warehouses and workshops",
    plannedWork:
      "commercial suite maintenance, rail-corridor property work, apartment repairs, warehouse lighting, workshop circuits, switchboard upgrades, three-phase and load checks, CCTV/data and planned quote work",
    propertyMix:
      "commercial suites, rail-corridor sites, apartments, warehouses, workshops, business outages, switchboards and three-phase loads",
    setting: "Eveleigh commercial, rail-corridor, apartment, warehouse and workshop service area",
    switchboardDetail:
      "commercial switchboards, warehouse and workshop loads, apartment boards, three-phase capacity, consumer mains and safety switches",
  }),
  "forest-lodge": makeSydneyCbdLocalContext({
    accessFocus:
      "terrace entry details, strata access notes, shared access information and hot water circuit notes",
    commonJobs:
      "apartment, older-home, terrace and strata electrical work, shared access, switchboard upgrades, hot water faults, planned Level 2 enquiries, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, older-home faults, terrace wiring issues, strata shared-power concerns, hot water electrical faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, older homes, terraces and strata buildings",
    plannedWork:
      "apartment repairs, older-home maintenance, terrace electrical work, strata maintenance, shared access planning, hot water circuits, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "apartments, older homes, terraces, strata buildings, shared access, hot water faults and planned Level 2 enquiries",
    setting: "Forest Lodge apartment, older-home, terrace and strata service area",
    switchboardDetail:
      "older wiring, apartment boards, terrace switchboards, shared access sites, hot water demand, consumer mains and safety switches",
  }),
  glebe: makeSydneyCbdLocalContext({
    accessFocus:
      "terrace entry details, heritage-home access notes, narrow street parking information and local shop timing",
    commonJobs:
      "terrace, heritage-home, apartment, cafe and local shop electrical work, narrow street access, older wiring, switchboard upgrades, consumer mains, CCTV/data and planned quote work",
    emergencySignals:
      "terrace power loss, heritage-home faults, apartment issues, cafe or local shop outages, older wiring concerns, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for terraces, heritage homes, apartments and local shops",
    plannedWork:
      "terrace repairs, heritage-home electrical work, apartment maintenance, cafe and local shop power, older wiring checks, switchboard upgrades, consumer mains review, CCTV/data and planned quote work",
    propertyMix:
      "terraces, heritage homes, apartments, cafes, local shops, narrow streets, limited parking, older wiring and consumer mains",
    setting: "Glebe terrace, heritage-home, apartment and local shop service area",
    switchboardDetail:
      "older wiring, terrace switchboards, heritage-home boards, apartment boards, cafe and shop loads, consumer mains and safety switches",
  }),
  haymarket: makeSydneyCbdLocalContext({
    accessFocus:
      "restaurant trading hours, hotel contacts, commercial kitchen details, shared meter-room information and loading dock bookings",
    commonJobs:
      "restaurant, hotel, apartment, retail tenancy, commercial suite and commercial kitchen electrical work, after-hours business outages, shared meter rooms, loading docks, switchboards, CCTV/data and planned quote work",
    emergencySignals:
      "restaurant outages, hotel faults, commercial kitchen circuit issues, apartment power loss, shared meter-room concerns, after-hours business faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for restaurants, hotels, apartments, retail tenancies and commercial kitchens",
    plannedWork:
      "restaurant power, hotel maintenance, retail lighting, commercial kitchen circuits, apartment repairs, shared meter-room checks, loading dock planning, CCTV/data and planned quote work",
    propertyMix:
      "restaurants, hotels, apartments, retail tenancies, commercial suites, commercial kitchens, shared meter rooms and loading docks",
    setting: "Haymarket restaurant, hotel, apartment, retail and commercial kitchen service area",
    switchboardDetail:
      "shared meter rooms, restaurant and commercial kitchen loads, hotel circuits, apartment boards, retail tenancy loads, consumer mains and safety switches",
  }),
  "millers-point": makeSydneyCbdLocalContext({
    accessFocus:
      "heritage access notes, harbour-side entry details, limited parking information and private service equipment photos",
    commonJobs:
      "heritage-home, apartment, waterfront, harbour-side and older wiring electrical work, limited parking access, private service equipment, consumer mains, switchboard upgrades, CCTV/data and planned quote work",
    emergencySignals:
      "heritage-home power loss, apartment faults, harbour-side property issues, older wiring concerns, private service equipment faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, private service equipment, point of attachment concerns, defect notices and supply-side questions for heritage homes, apartments and harbour-side buildings",
    plannedWork:
      "heritage-home repairs, apartment maintenance, harbour-side property electrical work, older wiring checks, private service equipment review, consumer mains checks, CCTV/data and planned quote work",
    propertyMix:
      "heritage homes, apartments, waterfront and harbour-side buildings, older wiring, limited parking, private service equipment and consumer mains",
    setting: "Millers Point heritage-home, apartment, harbour-side and service-equipment service area",
    switchboardDetail:
      "older wiring, heritage-home switchboards, apartment boards, private service equipment, consumer mains and safety switches",
  }),
  "moore-park": makeSydneyCbdLocalContext({
    accessFocus:
      "event timing, retail tenancy contacts, entertainment precinct access notes and parking information",
    commonJobs:
      "event, retail, commercial, entertainment precinct and nearby apartment electrical work, business outages, lighting, power, switchboards, CCTV/data and planned quote work",
    emergencySignals:
      "event or retail outages, entertainment precinct faults, nearby apartment power loss, commercial switchboard issues, lighting faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for commercial properties, retail tenancies and nearby apartments",
    plannedWork:
      "event support, retail tenancy lighting, entertainment precinct electrical work, nearby apartment repairs, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "event properties, retail tenancies, commercial sites, entertainment precinct work, nearby apartments, parking constraints and business outages",
    setting: "Moore Park event, retail, commercial, entertainment and apartment service area",
    switchboardDetail:
      "commercial switchboards, event and retail loads, lighting circuits, apartment boards, consumer mains and safety switches",
  }),
  paddington: makeSydneyCbdLocalContext({
    accessFocus:
      "terrace entry details, heritage-home notes, boutique or cafe timing and narrow street parking information",
    commonJobs:
      "terrace, heritage-home, apartment, boutique, cafe and strata electrical work, narrow street access, older wiring, switchboard upgrades, consumer mains, defect notices, CCTV/data and planned quote work",
    emergencySignals:
      "terrace power loss, heritage-home faults, boutique or cafe outages, apartment issues, older wiring concerns, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for terraces, heritage homes, apartments and boutique tenancies",
    plannedWork:
      "terrace repairs, heritage-home electrical work, apartment maintenance, boutique and cafe lighting, older wiring checks, switchboard upgrades, consumer mains review, defect notice paperwork, CCTV/data and planned quote work",
    propertyMix:
      "terraces, heritage homes, apartments, boutiques, cafes, narrow streets, older wiring, consumer mains and defect notices",
    setting: "Paddington terrace, heritage-home, apartment, boutique and cafe service area",
    switchboardDetail:
      "older wiring, terrace switchboards, heritage-home boards, boutique and cafe loads, consumer mains, defect notices and safety switches",
  }),
  "potts-point": makeSydneyCbdLocalContext({
    accessFocus:
      "high-density apartment entry notes, shared meter-room details, restaurant or bar timing and strata contact information",
    commonJobs:
      "high-density apartment, strata, restaurant, bar, cafe and older wiring electrical work, shared meter-room access, after-hours business faults, hot water electrical, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, strata shared-power issues, restaurant or bar outages, shared meter-room concerns, older wiring faults, hot water electrical faults and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, strata buildings and hospitality tenancies",
    plannedWork:
      "apartment repairs, strata maintenance, restaurant and bar power, cafe lighting, older wiring checks, shared meter-room checks, hot water circuits, CCTV/data and planned quote work",
    propertyMix:
      "high-density apartments, strata buildings, restaurants, bars, cafes, older wiring, shared meter rooms, after-hours business faults and hot water loads",
    setting: "Potts Point high-density apartment, strata, hospitality and older-wiring service area",
    switchboardDetail:
      "shared meter rooms, apartment boards, older wiring, restaurant and bar loads, hot water demand, consumer mains and safety switches",
  }),
  pyrmont: makeSydneyCbdLocalContext({
    accessFocus:
      "tower entry notes, loading dock bookings, shared meter-room details and hospitality or retail tenancy contacts",
    commonJobs:
      "apartment, commercial suite, hospitality, retail tenancy and strata tower electrical work, shared meter-room access, loading docks, business outages, service equipment, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, commercial suite faults, hospitality or retail outages, shared meter-room issues, loading dock access faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartment towers, strata buildings, retail tenancies and commercial suites",
    plannedWork:
      "apartment repairs, strata tower maintenance, hospitality power, retail tenancy lighting, commercial suite electrical work, shared meter-room checks, loading dock planning, CCTV/data and planned quote work",
    propertyMix:
      "apartments, commercial suites, hospitality venues, retail tenancies, strata towers, shared meter rooms, loading docks, business outages and service equipment",
    setting: "Pyrmont apartment, strata tower, hospitality, retail and commercial service area",
    switchboardDetail:
      "shared meter rooms, apartment tower boards, hospitality and retail loads, commercial suite circuits, service equipment, consumer mains and safety switches",
  }),
  redfern: makeSydneyCbdLocalContext({
    accessFocus:
      "terrace entry details, station-area shop timing, strata access notes and older wiring photos",
    commonJobs:
      "apartment, terrace, station-area shop, commercial suite and strata electrical work, older wiring, switchboard upgrades, power loss, safety-switch faults, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, terrace wiring faults, station-area shop outages, strata shared-power concerns, older wiring issues, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, terraces, shops and strata buildings",
    plannedWork:
      "apartment repairs, terrace electrical work, station-area shop lighting, commercial suite maintenance, older wiring checks, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "apartments, terraces, station-area shops, commercial suites, older wiring, strata access, switchboard upgrades and safety-switch faults",
    setting: "Redfern apartment, terrace, station-area shop and strata service area",
    switchboardDetail:
      "older wiring, apartment boards, terrace switchboards, shop loads, consumer mains and safety switches",
  }),
  "rushcutters-bay": makeSydneyCbdLocalContext({
    accessFocus:
      "waterfront access notes, marina-adjacent entry details, tight parking information and weather-exposed outdoor power photos",
    commonJobs:
      "apartment, waterfront, marina-adjacent and strata electrical work, tight parking access, weather-exposed outdoor power, switchboard upgrades, hot water faults, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, waterfront property faults, marina-adjacent electrical issues, weather-exposed outdoor power hazards, hot water electrical faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, strata buildings and waterfront properties",
    plannedWork:
      "apartment repairs, strata maintenance, waterfront property electrical work, weather-rated outdoor power, hot water circuits, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "apartments, waterfront and marina-adjacent properties, strata access, tight parking, weather-exposed outdoor power, switchboards and hot water loads",
    setting: "Rushcutters Bay apartment, waterfront, marina-adjacent and weather-exposed service area",
    switchboardDetail:
      "apartment boards, waterfront exposure, outdoor circuits, hot water demand, consumer mains and safety switches",
  }),
  "surry-hills": makeSydneyCbdLocalContext({
    accessFocus:
      "restaurant, cafe or bar trading hours, terrace entry details, strata access notes and after-hours contact information",
    commonJobs:
      "restaurant, cafe, bar, commercial suite, terrace, apartment and strata electrical work, older wiring, after-hours business outages, switchboard upgrades, CCTV/data and planned quote work",
    emergencySignals:
      "restaurant, cafe or bar outages, apartment power loss, terrace wiring faults, after-hours business faults, older wiring concerns, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for restaurants, cafes, bars, apartments, terraces and strata buildings",
    plannedWork:
      "restaurant and cafe power, bar lighting, commercial suite maintenance, terrace repairs, apartment and strata electrical work, older wiring checks, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "restaurants, cafes, bars, commercial suites, terraces, apartments, older wiring, after-hours business outages, strata access and switchboards",
    setting: "Surry Hills hospitality, commercial suite, terrace, apartment and strata service area",
    switchboardDetail:
      "older wiring, hospitality loads, terrace switchboards, apartment boards, shared meter rooms, consumer mains and safety switches",
  }),
  sydney: makeSydneyCbdLocalContext({
    accessFocus:
      "CBD loading dock bookings, tower concierge details, hotel or restaurant timing and shared meter-room information",
    commonJobs:
      "CBD commercial suite, apartment, hotel, retail tenancy, restaurant and strata tower electrical work, shared meter-room access, business outages, loading docks, after-hours faults, switchboards, consumer mains, metering, defect notices, CCTV/data and planned quote work",
    emergencySignals:
      "CBD business outages, apartment power loss, hotel faults, retail tenancy or restaurant outages, shared meter-room issues, after-hours faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for CBD towers, apartments, hotels, retail tenancies and restaurants",
    plannedWork:
      "commercial suite maintenance, apartment repairs, hotel electrical work, retail tenancy lighting, restaurant power, shared meter-room checks, loading dock planning, consumer mains review, metering support, defect notice paperwork, CCTV/data and planned quote work",
    propertyMix:
      "CBD commercial suites, apartments, hotels, retail tenancies, restaurants, strata towers, shared meter rooms, business outages, loading docks and after-hours faults",
    setting: "Sydney CBD commercial suite, apartment, hotel, retail, restaurant and strata tower service area",
    switchboardDetail:
      "shared meter rooms, CBD tower switchboards, hotel and restaurant loads, retail tenancy circuits, apartment boards, consumer mains, metering and safety switches",
  }),
  "the-rocks": makeSydneyCbdLocalContext({
    accessFocus:
      "heritage access notes, pub or restaurant trading hours, hotel contacts, harbour-side entry details and limited parking information",
    commonJobs:
      "heritage building, pub, restaurant, retail tenancy, hotel, apartment and harbour-side electrical work, older wiring, limited parking, business outages, switchboard upgrades, CCTV/data and planned quote work",
    emergencySignals:
      "heritage building power loss, pub or restaurant outages, hotel faults, harbour-side apartment issues, older wiring concerns, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, point of attachment concerns, defect notices and supply-side questions for heritage buildings, hotels, apartments and hospitality venues",
    plannedWork:
      "heritage building repairs, pub and restaurant power, hotel maintenance, retail tenancy lighting, apartment repairs, older wiring checks, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "heritage buildings, pubs, restaurants, retail tenancies, hotels, apartments, harbour-side access, older wiring, limited parking and business outages",
    setting: "The Rocks heritage, hospitality, hotel, retail and harbour-side service area",
    switchboardDetail:
      "older wiring, heritage building switchboards, hospitality loads, hotel circuits, apartment boards, consumer mains and safety switches",
  }),
  ultimo: makeSydneyCbdLocalContext({
    accessFocus:
      "student-housing entry details, education or tech precinct contacts, strata access notes and hot water circuit information",
    commonJobs:
      "apartment, student-housing, commercial suite, education and tech precinct electrical work, older wiring, strata access, hot water faults, switchboard upgrades, CCTV/data and planned maintenance",
    emergencySignals:
      "apartment power loss, student-housing faults, education or tech precinct outages, hot water electrical faults, older wiring issues, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, student housing, education properties and commercial suites",
    plannedWork:
      "apartment repairs, student-housing maintenance, education and tech precinct electrical work, commercial suite maintenance, hot water circuits, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "apartments, student housing, commercial suites, education and tech precinct demand, older wiring, strata access and hot water loads",
    setting: "Ultimo apartment, student-housing, education, tech precinct and strata service area",
    switchboardDetail:
      "shared meter rooms, apartment boards, student-housing loads, older wiring, hot water demand, consumer mains and safety switches",
  }),
  waterloo: makeSydneyCbdLocalContext({
    accessFocus:
      "high-rise entry details, tower concierge contacts, carpark/loading access notes and aircon or EV load information",
    commonJobs:
      "high-rise apartment, strata tower, retail tenancy and new-development electrical work, shared meter-room access, building-manager access, hot water faults, switchboard upgrades, aircon and EV load checks, common-area lighting, CCTV/data and planned quote work",
    emergencySignals:
      "high-rise apartment power loss, strata tower shared-power issues, retail tenancy outages, shared meter-room concerns, hot water electrical faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for high-rise apartments, strata towers and new developments",
    plannedWork:
      "high-rise apartment repairs, strata tower maintenance, retail tenancy lighting, hot water circuits, switchboard upgrades, aircon and EV load checks, common-area lighting, CCTV/data and planned quote work",
    propertyMix:
      "high-rise apartments, strata towers, retail tenancies, shared meter rooms, building-manager access, carpark and loading access, hot water faults and aircon or EV load checks",
    setting: "Waterloo high-rise apartment, strata tower, retail and new-development service area",
    switchboardDetail:
      "shared meter rooms, high-rise apartment boards, retail loads, hot water demand, aircon and EV load checks, consumer mains and safety switches",
  }),
  woolloomooloo: makeSydneyCbdLocalContext({
    accessFocus:
      "waterfront or wharf-side access notes, restaurant timing, limited parking information and weather-exposed outdoor power photos",
    commonJobs:
      "apartment, waterfront, wharf-side, restaurant and older wiring electrical work, limited parking, shared access, switchboard upgrades, weather-exposed outdoor power, CCTV/data and planned quote work",
    emergencySignals:
      "apartment power loss, waterfront or wharf-side property faults, restaurant outages, older wiring concerns, weather-exposed outdoor power hazards, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, waterfront properties, restaurants and older buildings",
    plannedWork:
      "apartment repairs, waterfront property electrical work, wharf-side maintenance, restaurant power, older wiring checks, weather-rated outdoor power, switchboard upgrades, CCTV/data and planned quote work",
    propertyMix:
      "apartments, waterfront and wharf-side properties, restaurants, older wiring, limited parking, shared access, switchboards and weather-exposed outdoor power",
    setting: "Woolloomooloo apartment, waterfront, wharf-side, restaurant and older-wiring service area",
    switchboardDetail:
      "older wiring, apartment boards, restaurant loads, waterfront exposure, outdoor circuits, consumer mains and safety switches",
  }),
  zetland: makeSydneyCbdLocalContext({
    accessFocus:
      "high-rise entry details, new-development contacts, carpark/loading access notes and aircon or EV load information",
    commonJobs:
      "high-rise apartment, new-development, strata tower and retail electrical work, shared meter-room access, building-manager access, carpark and loading access, aircon and EV load checks, hot water faults, common-area lighting, CCTV/data and planned quote work",
    emergencySignals:
      "high-rise apartment power loss, strata tower shared-power issues, retail faults, shared meter-room concerns, hot water electrical faults, smoke smells and safety-switch tripping",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for high-rise apartments, new developments, strata towers and retail tenancies",
    plannedWork:
      "high-rise apartment repairs, new-development electrical work, strata tower maintenance, retail lighting, aircon and EV load checks, hot water circuits, common-area lighting, CCTV/data and planned quote work",
    propertyMix:
      "high-rise apartments, new developments, strata towers, shared meter rooms, building-manager access, carpark and loading access, aircon and EV load checks, hot water faults and common-area lighting",
    setting: "Zetland high-rise apartment, new-development, strata tower and retail service area",
    switchboardDetail:
      "shared meter rooms, high-rise apartment boards, retail loads, hot water demand, aircon and EV load checks, consumer mains and safety switches",
  }),
};

function getSydneyCbdLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "sydney-city-and-eastern-suburbs" ||
    coverageArea.slug !== "sydney"
  ) {
    return null;
  }

  return sydneyCbdLocalContexts[coverageSuburb.slug] ?? null;
}

const burwoodLocalContexts: Record<string, LocalPageContext> = {
  burwood: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, shared meter-room notes, building-manager access details, parking information and any defect notice or paperwork",
    commonJobs:
      "apartment and strata electrical work, shopfront and restaurant maintenance, office suite power, older-home repairs, shared meter-room access, business outages, switchboard upgrades, consumer mains, defect notices, metering, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "apartment power loss, shopfront or restaurant outages, shared meter-room issues, burning smells, heat at outlets, sparking and safety-switch faults",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for apartments, strata buildings, shops and older homes",
    plannedWork:
      "shopfront lighting, restaurant power, office suite electrical work, apartment repairs, strata electrical work, switchboard upgrades, consumer mains review, data cabling, CCTV and planned quote work",
    propertyMix:
      "apartments, strata buildings, shops, restaurants, office suites, older homes, shared meter rooms and residential service equipment",
    setting: "Burwood apartment, strata, shopfront and older-home service area",
    switchboardDetail:
      "shared meter rooms, older wiring, strata boards, shop loads, consumer mains, metering, safety switches and clear circuit labelling",
  },
  "burwood-heights": {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, driveway or villa access notes, hot water details, parking information and any defect notice or paperwork",
    commonJobs:
      "family-home electrical work, duplex and villa repairs, older switchboard checks, hot water electrical, lighting and power, safety-switch faults, planned Level 2 enquiries, CCTV/data and general electrical work",
    emergencySignals:
      "home power loss, hot water electrical faults, older-board overheating, burning smells, heat at outlets, sparking and safety-switch faults",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and planned supply-side questions for family homes, duplexes and villas",
    plannedWork:
      "lighting and power, hot water electrical, switchboard upgrades, safety-switch repairs, smoke alarms, data cabling, CCTV and planned Level 2 quote work",
    propertyMix:
      "family homes, duplexes, villas, older switchboards, hot water loads and residential service equipment",
    setting: "Burwood Heights family-home, duplex and villa service area",
    switchboardDetail:
      "older switchboards, hot water loads, lighting and power loads, safety switches, RCBO protection and consumer mains condition",
  },
  enfield: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, apartment, villa or rental access notes, parking details and any defect notice or paperwork",
    commonJobs:
      "older-home repairs, duplex and villa electrical work, apartment maintenance, rental maintenance, switchboard upgrades, safety-switch faults, hot water electrical, service-equipment support, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "older-home power loss, apartment or rental maintenance hazards, hot water electrical faults, burning smells, heat at outlets, sparking and safety-switch faults",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices and supply-side questions for older homes, duplexes, villas and apartments",
    plannedWork:
      "rental maintenance, switchboard upgrades, safety-switch repairs, hot water electrical, lighting and power, smoke alarms, data cabling, CCTV and planned quote work",
    propertyMix:
      "older homes, duplexes, villas, apartments, rental properties, shared access sites and residential service equipment",
    setting: "Enfield older-home, apartment and rental-maintenance service area",
    switchboardDetail:
      "older wiring, older switchboards, rental safety needs, hot water loads, safety switches and service equipment condition",
  },
  strathfield: {
    accessDetail:
      "photos of the switchboard, meter box, affected fitting, shared meter-room notes, building-manager access details, school or site contact information, parking details and any defect notice or paperwork",
    commonJobs:
      "larger-home electrical work, apartment and strata repairs, school and office suite maintenance, shopfront electrical work, older wiring checks, shared meter-room access, business outages, switchboard upgrades, consumer mains, defect notices, metering, point of attachment support, CCTV/data and Level 2 enquiries",
    emergencySignals:
      "larger-home power loss, apartment or strata shared-power issues, school or shopfront faults, business outages, burning smells, heat at outlets, sparking and safety-switch faults",
    level2Detail:
      "consumer mains, metering, service equipment, defect notices, point of attachment concerns and supply-side questions for larger homes, strata buildings, schools, shops and office suites",
    plannedWork:
      "larger-home upgrades, apartment repairs, strata electrical work, school maintenance, shopfront lighting, office suite power, switchboard upgrades, consumer mains review, point of attachment checks, CCTV/data and planned quote work",
    propertyMix:
      "larger homes, apartments, strata buildings, schools, shopfronts, office suites, shared meter rooms and older wiring",
    setting: "Strathfield larger-home, strata, school and commercial service area",
    switchboardDetail:
      "shared meter rooms, older wiring, larger-home loads, school and shop loads, consumer mains, metering, safety switches and point of attachment questions",
  },
};

function getBurwoodLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext | null {
  if (
    coverageRegion.slug !== "inner-west-burwood-and-canada-bay" ||
    coverageArea.slug !== "burwood"
  ) {
    return null;
  }

  return burwoodLocalContexts[coverageSuburb.slug] ?? null;
}

function getLocalPageContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext {
  const key = `${coverageRegion.name} ${coverageArea.name} ${coverageArea.description} ${coverageSuburb.name}`.toLowerCase();
  const canterburyBankstownContext = getCanterburyBankstownLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (canterburyBankstownContext) {
    return canterburyBankstownContext;
  }

  const baysideAirportContext = getBaysideAirportLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (baysideAirportContext) {
    return baysideAirportContext;
  }

  const georgesRiverContext = getGeorgesRiverLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (georgesRiverContext) {
    return georgesRiverContext;
  }

  const rockdaleBexleyContext = getRockdaleBexleyLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (rockdaleBexleyContext) {
    return rockdaleBexleyContext;
  }

  const sutherlandShireContext = getSutherlandShireLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (sutherlandShireContext) {
    return sutherlandShireContext;
  }

  const fairfieldContext = getFairfieldLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (fairfieldContext) {
    return fairfieldContext;
  }

  const liverpoolContext = getLiverpoolLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (liverpoolContext) {
    return liverpoolContext;
  }

  const camdenContext = getCamdenLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (camdenContext) {
    return camdenContext;
  }

  const campbelltownContext = getCampbelltownLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (campbelltownContext) {
    return campbelltownContext;
  }

  const wollondillyContext = getWollondillyLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (wollondillyContext) {
    return wollondillyContext;
  }

  const canadaBayContext = getCanadaBayLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (canadaBayContext) {
    return canadaBayContext;
  }

  const innerWestContext = getInnerWestLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (innerWestContext) {
    return innerWestContext;
  }

  const strathfieldAreaContext = getStrathfieldAreaLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (strathfieldAreaContext) {
    return strathfieldAreaContext;
  }

  const randwickContext = getRandwickLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (randwickContext) {
    return randwickContext;
  }

  const sydneyCbdContext = getSydneyCbdLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (sydneyCbdContext) {
    return sydneyCbdContext;
  }

  const burwoodContext = getBurwoodLocalContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );

  if (burwoodContext) {
    return burwoodContext;
  }

  if (
    key.includes("northern beaches") ||
    key.includes("manly") ||
    key.includes("brookvale") ||
    key.includes("dee why") ||
    key.includes("curl curl") ||
    key.includes("narrabeen") ||
    key.includes("mona vale") ||
    key.includes("newport") ||
    key.includes("avalon") ||
    key.includes("palm beach")
  ) {
    return {
      accessDetail:
        "strata entry notes, parking details, outdoor fitting photos and any weather-exposed circuit information",
      commonJobs:
        "apartment faults, outdoor lighting, CCTV cabling, safety switch trips and coastal switchboard checks",
      emergencySignals:
        "storm faults, water-affected fixtures and circuit tripping and overheating power points and unsafe outdoor power",
      level2Detail:
        "consumer mains, point of attachment, service equipment and defect notice enquiries",
      plannedWork:
        "weather-rated lighting, apartment power, CCTV, data points and switchboard upgrade planning",
      propertyMix:
        "coastal homes, apartments, strata buildings, cafes, shops and hospitality venues",
      setting: "Northern Beaches coastal and strata service area",
      switchboardDetail:
        "coastal exposure, older apartment boards, safety switch protection and circuit capacity",
    };
  }

  if (
    key.includes("blue mountains") ||
    key.includes("hawkesbury") ||
    key.includes("katoomba") ||
    key.includes("springwood") ||
    key.includes("windsor") ||
    key.includes("richmond")
  ) {
    return {
      accessDetail:
        "driveway details, gate access, private pole photos, outbuilding notes and switchboard photos",
      commonJobs:
        "storm fault checks, shed power, outdoor circuits, private pole enquiries and switchboard upgrades",
      emergencySignals:
        "storm damage, power loss, tripping safety switches, unsafe outdoor circuits and fallen-line concerns",
      level2Detail:
        "consumer mains, point of attachment, private pole, overhead service and defect notice enquiries",
      plannedWork:
        "shed circuits, outdoor lighting, renovation wiring, switchboard capacity checks and supply upgrade planning",
      propertyMix:
        "larger blocks, family homes, village shops, acreage properties, sheds and outbuildings",
      setting: "larger-block and weather-exposed service area",
      switchboardDetail:
        "older boards, long outdoor circuit runs, shed loads, safety switches and future upgrade capacity",
    };
  }

  if (
    key.includes("wollongong") ||
    key.includes("illawarra") ||
    key.includes("shellharbour") ||
    key.includes("corrimal") ||
    key.includes("fairy meadow") ||
    key.includes("thirroul")
  ) {
    return {
      accessDetail:
        "parking details, strata entry notes, business hours and photos of outdoor or coastal electrical areas",
      commonJobs:
        "hot water electrical faults, switchboards, outdoor lighting, apartment repairs and commercial maintenance",
      emergencySignals:
        "coastal storm faults, power loss and circuit tripping, hot isolators and water-affected fixtures",
      level2Detail:
        "consumer mains, metering, service equipment and defect notice enquiries",
      plannedWork:
        "hot water circuits, weather-rated fixtures, shop lighting, CCTV/data and switchboard upgrades",
      propertyMix:
        "coastal homes, apartments, shops, warehouses, strata properties and commercial sites",
      setting: "Illawarra coastal and mixed commercial service area",
      switchboardDetail:
        "coastal exposure, older protection, added appliance loads and clearer circuit labelling",
    };
  }

  if (
    key.includes("central coast") ||
    key.includes("gosford") ||
    key.includes("woy woy") ||
    key.includes("umina") ||
    key.includes("ettalong") ||
    key.includes("terrigal") ||
    key.includes("avoca")
  ) {
    return {
      accessDetail:
        "driveway access, outdoor fitting photos, switchboard photos and notes about holiday or strata access",
      commonJobs:
        "outdoor lighting, hot water electrical checks, safety switch faults, CCTV and switchboard upgrades",
      emergencySignals:
        "storm faults, water-affected fixtures, loss of power and overheating power points and repeated safety switch tripping",
      level2Detail:
        "consumer mains, point of attachment, metering and supply-side upgrade enquiries",
      plannedWork:
        "weather-rated power, CCTV, data points, outdoor lighting and hot water circuit support",
      propertyMix:
        "coastal homes, apartments, holiday properties, shops and small commercial sites",
      setting: "Central Coast South coastal service area",
      switchboardDetail:
        "weather exposure, older enclosures, safety switch protection and capacity for extra circuits",
    };
  }

  if (
    key.includes("south west") ||
    key.includes("liverpool") ||
    key.includes("fairfield") ||
    key.includes("campbelltown") ||
    key.includes("macarthur") ||
    key.includes("narellan") ||
    key.includes("leppington") ||
    key.includes("prestons") ||
    key.includes("moorebank")
  ) {
    return {
      accessDetail:
        "estate access, business hours, warehouse entry notes, switchboard photos and equipment details",
      commonJobs:
        "switchboard upgrades, hot water circuits, commercial maintenance, warehouse lighting and extra circuits",
      emergencySignals:
        "power loss, hot fixtures and circuit tripping, business outages and damaged outdoor power",
      level2Detail:
        "consumer mains, supply capacity, metering, defect notices and service equipment questions",
      plannedWork:
        "new circuits, EV-ready wiring, CCTV, data cabling, outdoor power and fit-out changes",
      propertyMix:
        "family homes, new estates, townhouses, workshops, warehouses, shops and commercial units",
      setting: "South West growth and mixed commercial service area",
      switchboardDetail:
        "extra circuit capacity, newer loads, older boards, safety switches and clear circuit identification",
    };
  }

  if (
    key.includes("western sydney") ||
    key.includes("blacktown") ||
    key.includes("penrith") ||
    key.includes("auburn") ||
    key.includes("granville") ||
    key.includes("lidcombe") ||
    key.includes("wetherill") ||
    key.includes("smithfield")
  ) {
    return {
      accessDetail:
        "parking details, workshop access, equipment photos, switchboard photos and operating hours",
      commonJobs:
        "fault finding, switchboards, commercial lighting, workshop circuits, CCTV/data and hot water electrical",
      emergencySignals:
        "partial power loss and overheating power points and circuit tripping, damaged wiring and business-critical faults",
      level2Detail:
        "consumer mains, metering, service equipment, defect notices and supply capacity enquiries",
      plannedWork:
        "lighting upgrades, extra circuits, commercial maintenance, data cabling and switchboard capacity checks",
      propertyMix:
        "homes, units, townhouses, shops, workshops, warehouses and small commercial properties",
      setting: "Western Sydney mixed residential and commercial service area",
      switchboardDetail:
        "load changes, ageing protection, RCBOs, safety switches and clearer circuit labelling",
    };
  }

  if (
    key.includes("inner west") ||
    key.includes("ashfield") ||
    key.includes("camperdown") ||
    key.includes("annandale") ||
    key.includes("leichhardt") ||
    key.includes("newtown") ||
    key.includes("marrickville") ||
    key.includes("dulwich hill")
  ) {
    return {
      accessDetail:
        "street access, terrace entry notes, strata details, shop timing and switchboard photos",
      commonJobs:
        "renovation wiring, cafe maintenance, lighting changes, data points and switchboard upgrades",
      emergencySignals:
        "tripping safety switches and overheating power points and burning smells, older wiring faults and shop power issues",
      level2Detail:
        "consumer mains, metering, service equipment and defect notice discussions",
      plannedWork:
        "terrace renovations, extra outlets, pendant lighting, shop maintenance, data cabling and safety upgrades",
      propertyMix:
        "older homes, terraces, apartments, cafes, shops, strata buildings and renovated properties",
      setting: "Inner West older-home, terrace and strata service area",
      switchboardDetail:
        "ceramic fuses, crowded boards, older wiring, strata boards and safety switch upgrades",
    };
  }

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
        "photos of outdoor fixtures, switchboards, weather exposure and parking access",
      commonJobs:
        "outdoor lighting, safety switch faults, corrosion checks, smoke alarms and power repairs",
      emergencySignals:
        "storm-related faults, water-affected fixtures, tripping safety switches and unsafe outdoor power",
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
        "partial power loss and circuit tripping and overheating power points and burning smells and after-hours business faults",
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
        "loss of power to equipment and circuit tripping, hot isolators and damaged outlets",
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
      "power loss and burning smells and circuit tripping, sparking and unsafe outlets",
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

function firstSuburbForArea(area: CoverageArea, fallbackName: string) {
  return (
    area.suburbs[0] ?? {
      name: fallbackName,
      postcode: "",
      slug: area.slug,
    }
  );
}

export function getAreaLocalContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
) {
  return getLocalPageContext(
    coverageRegion,
    coverageArea,
    firstSuburbForArea(coverageArea, coverageArea.name),
  );
}

export function getRegionLocalContext(coverageRegion: CoverageRegion) {
  const firstArea =
    coverageRegion.areas[0] ?? ({
      description: coverageRegion.description,
      name: coverageRegion.name,
      slug: coverageRegion.slug,
      suburbs: [],
    } satisfies CoverageArea);

  return getLocalPageContext(
    coverageRegion,
    firstArea,
    firstSuburbForArea(firstArea, coverageRegion.name),
  );
}

type SuburbCopyOverride = Partial<
  Pick<
    SuburbPageCopy,
    | "heroDescription"
    | "heroNote"
    | "localHighlights"
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
        "Bankstown emergency calls commonly involve partial power loss and overheating power points, tripping safety switches, buzzing fixtures and business faults that cannot wait until the next day.",
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
      "Common Revesby requests include switchboard upgrades and circuit tripping, warehouse lighting, power for equipment, smoke alarms, CCTV cabling, data points and Level 2 enquiries for service or defect issues.",
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
      "Liverpool electrical work is handled by separating high-risk faults from planned maintenance. Business outages, hot fixtures and circuit tripping need fast attention; upgrades and fit-outs need clear scope and access details.",
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
        "Parramatta urgent calls often involve apartment outages, commercial faults and circuit tripping and overheating power points and after-hours business interruptions.",
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
      "Coogee electrical work often involves coastal corrosion, outdoor fixtures, apartment access, strata communication, weather-rated lighting and older switchboards in renovated units and terraces.",
    processDescription:
      "For Coogee, weather exposure matters. Outdoor fixtures and circuit tripping, switchboards and coastal corrosion concerns are tested carefully before repair or upgrade options are recommended.",
    serviceIntro:
      "Coogee customers often ask for outdoor lighting, safety switch fault finding, apartment electrical repairs, smoke alarms, switchboard upgrades, CCTV cabling and weather-rated power.",
    serviceSummaryText: {
      emergency:
        "Coogee urgent calls often involve water-affected fixtures, storm faults, tripping safety switches and overheating power points and unsafe outdoor power.",
      switchboard:
        "Switchboard work in Coogee can involve older apartment boards, corrosion concerns, safety switch upgrades and clearer circuit protection.",
      level2:
        "Level 2 enquiries in Coogee may include consumer mains, point of attachment issues, service equipment and defect notice questions.",
      general:
        "Planned Coogee work often covers outdoor lighting, apartment power points, smoke alarms, CCTV cabling and weather-rated fixtures.",
    },
  },
  bondi: {
    heroDescription:
      "Evaready Electrical helps Bondi apartments, coastal homes, strata properties, cafes, shops and renovated terraces with electrical faults, switchboards, outdoor lighting, smoke alarms, power, data and CCTV.",
    heroNote:
      "Bondi jobs often involve coastal weather exposure, apartment access, strata approvals, older boards and limited parking near busy streets.",
    processDescription:
      "Bondi electrical work is assessed with corrosion, access and urgency in mind. Outdoor electrical issues and circuit tripping and hot fixtures need proper testing before repairs.",
    serviceIntro:
      "Common Bondi requests include weather-rated lighting, safety switch faults, apartment repairs, smoke alarms, switchboard upgrades, data cabling, CCTV and shop maintenance.",
  },
  cronulla: {
    heroDescription:
      "Evaready Electrical services Cronulla homes, apartments, coastal townhouses, shops and strata sites with emergency electrical faults, outdoor lighting, switchboards, smoke alarms, power, CCTV, data and Level 2 support.",
    heroNote:
      "Cronulla jobs often involve salt air exposure, outdoor power, renovated apartments, strata access and switchboards that need weather-aware checks.",
    processDescription:
      "Cronulla work is scoped around safety and exposure. Outdoor faults, storm damage and circuit tripping and coastal corrosion concerns need careful isolation and testing.",
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
      "Manly jobs often include coastal exposure, apartment access, busy streets, shop trading hours and outdoor fixtures that need weather-rated solutions.",
    processDescription:
      "Manly electrical work is scoped with access and coastal conditions in mind. Outdoor faults and circuit tripping, strata jobs and urgent business issues need clear details fast.",
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
      "Randwick jobs are scoped around access and risk. Hot fixtures, power loss and circuit tripping need direct phone support, while planned work benefits from photos and entry notes.",
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
      "Surry Hills jobs are scoped around access and operating hours. Hospitality faults, hot fixtures and circuit tripping are call-first issues, while fit-outs need clear plans and photos.",
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
      "Blacktown work is triaged by hazard and property type. Power loss and burning smells and sparking are call-first issues; upgrades are clearer with switchboard photos and job details.",
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
      "Dee Why electrical work often involves coastal exposure, apartment access, shop trading hours, strata coordination, outdoor fixtures and parking constraints.",
    processDescription:
      "Dee Why jobs are scoped around access and exposure. Outdoor faults and circuit tripping and apartment issues need careful testing, while planned work needs photos and entry notes.",
    serviceIntro:
      "Typical Dee Why requests include apartment repairs, outdoor lighting, safety switch trips, smoke alarms, switchboard upgrades, CCTV, data cabling and shop maintenance.",
  },
  katoomba: {
    heroDescription:
      "Evaready Electrical supports Katoomba homes, village shops, guest accommodation, larger blocks and Blue Mountains properties with storm-related faults, switchboards, outdoor circuits, smoke alarms, shed power, consumer mains and Level 2 enquiries.",
    heroNote:
      "Katoomba jobs often need driveway notes, weather exposure details, photos of outbuildings or private poles and clear information about any power loss after storms.",
    processDescription:
      "Katoomba electrical work is scoped around access, weather and the distance between the switchboard and affected circuits. Unsafe faults are call-first jobs, while planned upgrades are easier with photos and site notes.",
    serviceIntro:
      "Common Katoomba requests include storm fault checks, outdoor lighting, shed circuits, switchboard upgrades, smoke alarms, hot water electrical faults and private pole or point-of-attachment enquiries.",
    serviceSummaryText: {
      emergency:
        "Katoomba emergency calls often involve storm damage, power loss, tripping safety switches, unsafe outdoor circuits or faults affecting detached areas.",
      level2:
        "Level 2 enquiries in Katoomba can involve consumer mains, point of attachment, private poles, overhead service work, service equipment and defect notices.",
      switchboard:
        "Katoomba switchboard work often needs checks for older protection, outdoor circuit loads, safety switches, labelling and capacity for future upgrades.",
    },
  },
  gosford: {
    heroDescription:
      "Evaready Electrical helps Gosford homes, apartments, shops, offices and strata properties with urgent faults, switchboards, hot water circuits, outdoor lighting, CCTV, data cabling and Level 2 electrical enquiries.",
    heroNote:
      "Gosford jobs often involve apartment access, coastal weather exposure, small business maintenance, parking details and photos of the switchboard or affected circuit.",
    processDescription:
      "Gosford work is triaged by risk first. No power, heat, smoke, sparking or repeated tripping should be called through, while planned work is reviewed from photos and booking details.",
    serviceIntro:
      "Common Gosford requests include safety switch tripping, hot water electrical faults, switchboard upgrades, lighting, data points, CCTV, smoke alarms and Level 2 supply questions.",
  },
  hornsby: {
    heroDescription:
      "Evaready Electrical supports Hornsby homes, apartments, shops, offices and larger residential blocks with emergency faults, switchboards, lighting, power, data, CCTV and Level 2 enquiries.",
    heroNote:
      "Hornsby jobs often include apartment access, older homes, larger blocks, shop maintenance, parking notes and switchboard photos for planned upgrades.",
    processDescription:
      "Hornsby electrical work is scoped around access and property type. Unsafe faults should be phoned through, while switchboard, data, lighting and upgrade work benefits from photos and clear details.",
    serviceIntro:
      "Typical Hornsby requests include switchboard upgrades, power faults, lighting, smoke alarms, CCTV cabling, data points, hot water circuits and Level 2 supply enquiries.",
  },
  lidcombe: {
    heroDescription:
      "Evaready Electrical works across Lidcombe homes, apartments, shops, warehouses and strata buildings with urgent faults, switchboards, commercial lighting, power, data cabling, CCTV and Level 2 support.",
    heroNote:
      "Lidcombe jobs often mix older homes, apartment access, industrial units, busy roads, shop maintenance and clear parking or loading details.",
    processDescription:
      "Lidcombe electrical work is planned around safety and business impact. Commercial faults need quick phone details, while planned upgrades are easier with switchboard photos and site access notes.",
    serviceIntro:
      "Common Lidcombe requests include commercial maintenance, switchboard upgrades, data cabling, CCTV, power faults, smoke alarms, hot water electrical and metering questions.",
  },
  ashfield: {
    heroDescription:
      "Evaready Electrical helps Ashfield apartments, older homes, terraces, shopfronts and strata buildings with electrical faults, switchboards, lighting, power points, smoke alarms, data, CCTV and Level 2 enquiries.",
    heroNote:
      "Ashfield jobs often involve older wiring, unit access, strata contact details, busy street parking and switchboards that need careful testing before upgrades.",
    processDescription:
      "Ashfield work is scoped around access and the age of the installation. Hot fixtures and burning smells and circuit tripping should be phoned through, while planned work needs photos and notes.",
    serviceIntro:
      "Typical Ashfield requests include safety switch trips, power points, lighting, smoke alarms, apartment repairs, switchboard upgrades, data cabling and Level 2 service questions.",
  },
  maroubra: {
    heroDescription:
      "Evaready Electrical supports Maroubra homes, apartments, strata properties, shops and coastal buildings with urgent faults, outdoor lighting, switchboards, smoke alarms, power, CCTV, data and Level 2 enquiries.",
    heroNote:
      "Maroubra electrical jobs often involve coastal exposure, apartment access, strata communication, outdoor fixtures, older boards and parking notes near busy streets.",
    processDescription:
      "Maroubra work is assessed with weather exposure and building access in mind. Water-affected fixtures and circuit tripping and overheating power points should be checked before repairs proceed.",
    serviceIntro:
      "Common Maroubra requests include outdoor lighting, apartment faults, smoke alarms, switchboard upgrades, data cabling, CCTV, safety switch tripping and weather-rated power.",
  },
  "bondi-junction": {
    heroDescription:
      "Evaready Electrical helps Bondi Junction apartments, shops, offices, strata buildings and renovated homes with urgent faults, commercial lighting, power, data, CCTV, switchboards and Level 2 enquiries.",
    heroNote:
      "Bondi Junction work often needs apartment access, shop trading hours, loading-zone notes, strata contacts and clear photos before planned electrical work is quoted.",
    processDescription:
      "Bondi Junction jobs are scoped around access, timing and risk. Business outages and overheating power points and circuit tripping need phone details, while planned work needs booking notes and photos.",
    serviceIntro:
      "Typical Bondi Junction requests include shop lighting, office power, apartment repairs, switchboard checks, smoke alarms, data cabling, CCTV and service equipment questions.",
  },
  camperdown: {
    heroDescription:
      "Evaready Electrical services Camperdown terraces, apartments, medical and education sites, cafes, shops and strata properties with urgent faults, lighting, power, switchboards, data, CCTV and Level 2 enquiries.",
    heroNote:
      "Camperdown jobs often involve tight access, older terrace wiring, strata buildings, business hours, loading or parking notes and clear site contacts.",
    processDescription:
      "Camperdown electrical work is scoped around access and safe testing. Unsafe faults are call-first issues, while planned lighting, power or data work is clearer with photos and entry notes.",
    serviceIntro:
      "Common Camperdown requests include terrace wiring, apartment faults, commercial lighting, data points, smoke alarms, switchboard upgrades, CCTV and Level 2 service questions.",
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

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function ensureSuburbHeroDepth(
  description: string,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
  context: LocalPageContext,
) {
  if (countWords(description) >= 32) {
    return description;
  }

  return `${description} Common local enquiries include ${context.commonJobs}, with call-first support for ${context.emergencySignals} and planned booking details for ${context.plannedWork} across ${coverageArea.name}.`;
}

function buildOverrideMetaDescription(
  copy: SuburbPageCopy,
  override: SuburbCopyOverride,
) {
  const questionIndex = copy.metaDescription.indexOf("?");
  const prefix =
    questionIndex >= 0
      ? `${copy.metaDescription.slice(0, questionIndex + 1)} `
      : "";
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
  const response = getEmergencyResponseForRegion(regionLabel);
  const suburbPosition = Math.max(
    coverageArea.suburbs.findIndex(
      (suburbItem) => suburbItem.slug === coverageSuburb.slug,
    ),
    0,
  );

  const heroDescription = pick(
    [
      `Evaready Electrical helps ${suburbLabel} homes, businesses and strata properties with urgent faults, Level 2 electrical work, switchboard upgrades, lighting, power points, smoke alarms, hot water circuits, split-system electrical support, CCTV, data cabling and planned electrical work.`,
      `For ${suburbLabel}, Evaready Electrical supports ${context.propertyMix} with emergency electrical faults, consumer mains and metering enquiries, switchboard upgrades, hot water electrical issues, air-conditioning electrical support, CCTV, data and everyday electrical work. ${response.suburbDisplay}`,
      `Electrical work in ${suburbLabel} can range from urgent faults to planned upgrades. Evaready Electrical helps with power loss, safety switch tripping, Level 2 enquiries, switchboards, hot water circuits, split-system electrical support, CCTV, data cabling and general repairs.`,
      `Evaready Electrical services ${suburbLabel} with local electrical support for ${context.propertyMix}. That includes emergency faults, Level 2 ASP work, switchboard upgrades, lighting, power, smoke alarms, hot water electrical faults, air-conditioning electrical support, CCTV and data cabling.`,
    ],
    seed,
    suburbPosition + 5,
  );

  const heroNote = pick(
    [
      `${coverageArea.description} This ${context.setting} often needs clear job details, photos and safe fault testing before work begins.`,
      `${coverageSuburb.name} is part of the ${areaLabel} area in ${regionLabel}. Planned enquiries are easier to assess when they include ${context.accessDetail}.`,
      `${coverageRegion.travelNote} For ${coverageSuburb.name}, emergency call-outs use ${response.shortDisplay}; call for unsafe faults, or send photos and details for planned work.`,
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
          text: `Unsafe issues in ${coverageSuburb.name} are handled as call-first enquiries, especially where there is heat, smoke, sparking or urgent supply-side risk.`,
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
          `Call first in ${coverageSuburb.name} for power outages and burning smells, sparking, safety switch tripping, storm damage, water-affected fixtures or anything electrical that feels unsafe. Evaready provides ${response.shortDisplay} for emergency call-outs in this region.`,
          `Emergency enquiries in ${suburbLabel} often involve ${context.emergencySignals}. Stop using the affected circuit where safe and call before touching the area again.`,
          `When ${coverageSuburb.name} homes, shops or strata properties have power loss, smoke, heat, sparking or repeated tripping, the first step is a direct phone call so the risk and response time can be triaged.`,
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
          `${business.level2Asp.display} support in ${coverageSuburb.name} can involve consumer mains, metering, defect notices, overhead or underground services, point of attachment issues and other supply-side work.`,
          `For ${coverageSuburb.name} properties, ${context.level2Detail} should be assessed with clear photos and any paperwork from the network, retailer or supply authority.`,
          `${regionLabel} Level 2 ASP enquiries can include consumer mains, metering, point of attachment issues, defect notice repairs and overhead or underground service work.`,
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
          `Testing circuit tripping in ${coverageSuburb.name}`,
          `Fault isolation in ${coverageSuburb.name}`,
        ],
        seed,
        31,
      ),
      text: pick(
        [
          `Fault finding in ${coverageSuburb.name} covers intermittent faults and circuit tripping, damaged wiring, hot power points, flickering lights and careful testing to isolate the cause.`,
          `For ${suburbLabel}, symptoms such as nuisance tripping, hot switches, flickering lights or damaged fixtures should be checked before parts are replaced.`,
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
          `ARCtick Refrigerant Handling Licence L157323 â€” Split Systems (1) applies to eligible split systems, hot water heat pumps and swimming pool heat pumps under licence scope.`,
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
          `CCTV and data work in ${coverageSuburb.name} can include CCTV cabling, data points and communications cabling under the relevant registered cabling scope.`,
          `For ${suburbLabel}, CCTV cameras, data points and communications cabling are planned with clear access details and the right cabling scope.`,
          `Eligible registered cabling scope supports data, CCTV and communications cabling enquiries across ${areaLabel}.`,
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

  const localHighlights = [
    {
      title: "Local property mix",
      text: `${coverageSuburb.name} electrical work can involve ${context.propertyMix}. Common enquiries include ${context.commonJobs}, with the site details checked before work is scoped.`,
    },
    {
      title: "Urgent fault patterns",
      text: `Call first in ${coverageSuburb.name} for ${context.emergencySignals}, especially if there is no power, heat, smoke, sparking, water near electrical fixtures or repeated tripping.`,
    },
    {
      title: "Level 2 and switchboards",
      text: `Level 2 enquiries may involve ${context.level2Detail}. Switchboard checks often look at ${context.switchboardDetail} before upgrades or repairs are recommended.`,
    },
    {
      title: "Access and quote details",
      text: `For planned work, send ${context.accessDetail}, plus photos, job notes and the address through the secure booking form so the next step can be reviewed.`,
    },
    {
      title: "Typical local examples",
      text: `Typical ${coverageSuburb.name} examples include ${context.plannedWork}. For unsafe symptoms, phone first; for planned work, photos help keep the quote process clear.`,
    },
  ];

  const generatedCopy: SuburbPageCopy = {
    callQuoteGuidance: {
      callFirst: [
        "unsafe faults",
        "power loss",
        "burning smells",
        "sparking",
        "electric shocks",
        "storm damage",
        "water-affected electrical equipment",
      ],
      quoteForm: [
        "planned work",
        "photos",
        "defect notices",
        "switchboard photos",
        "meter box photos",
        "job notes",
      ],
    },
    ctaHeading: pick(
      [
        `Electrical help in ${coverageSuburb.name}, with clear next steps before work begins.`,
        `Planning electrical work in ${coverageSuburb.name}? Send the details through.`,
        `For ${suburbLabel} electrical faults or upgrades, start here.`,
    ],
    seed,
    41,
  ),
    faqAnswers: {
      combined: `Yes. Evaready Electrical can help with switchboards, fault finding, hot water electrical circuits, split-system electrical support, CCTV and data cabling, and general electrical work in ${coverageSuburb.name} under the relevant licence scope.`,
      emergency: `Yes. Call first for power loss and burning smells, sparking and circuit tripping, storm damage or any fault in ${coverageSuburb.name} that feels unsafe. Emergency call-outs in this region use ${response.shortDisplay}.`,
      level2: `Evaready Electrical is an ${business.level2Asp.display} and can assist with Level 2 electrical work in ${coverageSuburb.name}, including consumer mains, metering, defect notices, point of attachment issues and supply-side electrical issues.`,
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
    faqIntro: `Use these quick answers to decide whether to call for an urgent hazard or open the booking form for planned work in ${coverageSuburb.name}.`,
    heroDescription,
    heroNote,
    heroSupportLine: `Emergency, Level 2 and general electrical work in ${coverageSuburb.name} ${coverageSuburb.postcode}.`,
    landingServiceCards: [
      {
        href: "/emergency-electrician-sydney",
        intent: "emergency",
        title: `Emergency electrician in ${coverageSuburb.name}`,
        text: `Call first for burning smells, power loss, sparking, safety switch tripping, storm or water-damaged electrical equipment. For this suburb, urgent call-outs follow ${response.shortDisplay}.`,
        items: [
          "Power loss",
          "Burning smells",
          "Sparking",
          "Safety switch tripping",
          "Storm or water-damaged electrical",
          response.shortDisplay,
        ],
      },
      {
        href: "/level-2-electrician-sydney",
        intent: "level2",
        title: `Level 2 electrician in ${coverageSuburb.name}`,
        text: `${business.level2Asp.display} support for consumer mains, defect notices, private poles, point of attachment, overhead and underground services, and metering or service equipment.`,
        items: [
          business.level2Asp.display,
          "Consumer mains",
          "Defect notices",
          "Private poles",
          "Point of attachment",
          "Overhead and underground services",
          "Metering and service equipment",
        ],
      },
      {
        href: "/services",
        intent: "general",
        title: `General electrical work in ${coverageSuburb.name}`,
        text: `Licensed electrical work for ${coverageSuburb.name} can include switchboards, fault finding, lighting and power, hot water electrical, aircon electrical, smoke alarms, CCTV/data, and residential or commercial work where relevant.`,
        items: [
          "Switchboards",
          "Fault finding",
          "Lighting and power",
          "Hot water electrical",
          "Aircon electrical",
          "Smoke alarms",
          "CCTV/data",
          "Residential and commercial work",
        ],
      },
    ],
    level2QuoteChecklist: [
      "suburb and job address",
      "phone number",
      "defect notice photo if relevant",
      "switchboard photo",
      "meter box or service equipment photo",
      "point of attachment or private pole photo if relevant",
      "due date or deadline if listed",
      "access, parking, strata or gate notes",
    ],
    localHighlights,
    metaDescription: clampMetaDescription(
      pick(
        [
          `Need an electrician in ${coverageSuburb.name}? Evaready helps with emergency faults, Level 2 ASP work, switchboards, hot water, aircon, CCTV/data and general electrical work.`,
          `Need electrical help in ${suburbLabel}? Emergency faults, Level 2 ASP, switchboards, hot water, aircon, CCTV/data and general electrical work across ${areaLabel}.`,
          `Evaready helps ${coverageSuburb.name} with urgent faults, Level 2 ASP work, switchboards, hot water electrical, aircon, CCTV/data and planned electrical work.`,
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
    serviceIntro: `For ${coverageSuburb.name}, Evaready Electrical brings emergency response, Level 2 ASP, switchboard, hot water, air-conditioning electrical, CCTV/data and general electrical support into one clear local enquiry path.`,
    serviceLinks: [
      {
        title: `Emergency electrician ${coverageSuburb.name}`,
        href: "/emergency-electrician-sydney",
        text: `Urgent help for ${context.emergencySignals} in ${coverageSuburb.name}, with ${response.shortDisplay}.`,
      },
      {
        title: `Level 2 electrician ${coverageSuburb.name}`,
        href: "/level-2-electrician-sydney",
        text: `${business.level2Asp.display} support with ${context.level2Detail} around ${suburbLabel}.`,
      },
      {
        title: `Consumer mains ${coverageSuburb.name}`,
        href: "/services/consumer-mains-sydney",
        text: `Consumer mains, supply capacity and service equipment enquiries for ${coverageSuburb.name}.`,
      },
      {
        title: `Defect notice repairs ${coverageSuburb.name}`,
        href: "/services/defect-notice-repairs-sydney",
        text: `Send the notice, deadline, suburb and photos so the next step can be reviewed clearly.`,
      },
      {
        title: `Private pole and overhead service work ${coverageSuburb.name}`,
        href: "/services/private-power-pole-sydney",
        text: `Point of attachment, private pole and overhead service enquiries where they apply.`,
      },
      {
        title: `Point of attachment repairs ${coverageSuburb.name}`,
        href: "/services/point-of-attachment-repairs-sydney",
        text: `Support for point of attachment issues, damaged brackets and supply connection concerns.`,
      },
      {
        title: `Overhead and underground service work ${coverageSuburb.name}`,
        href: "/services/overhead-service-lines-sydney",
        text: `Overhead service lines, underground service mains and supply-side planning where the job requires it.`,
      },
      {
        title: `Metering services ${coverageSuburb.name}`,
        href: "/services/metering-services-sydney",
        text: `Metering, service equipment and supply-side questions connected to Level 2 work.`,
      },
      {
        title: `Switchboard upgrades ${coverageSuburb.name}`,
        href: "/services/switchboard-upgrades-sydney",
        text: `Upgrade enquiries covering ${context.switchboardDetail}.`,
      },
      {
        title: `Circuit breakers and safety switches ${coverageSuburb.name}`,
        href: "/services/rcd-safety-switch-repairs-sydney",
        text: `RCD, safety switch, circuit breaker and repeated tripping issues reviewed with safety first.`,
      },
      {
        title: `Electrical fault finding ${coverageSuburb.name}`,
        href: "/services/electrical-fault-finding-sydney",
        text: `Fault testing for circuit tripping, hot fixtures, intermittent faults and unsafe symptoms.`,
      },
      {
        title: `Hot power point electrician ${coverageSuburb.name}`,
        href: "/services/hot-power-point-electrician-sydney",
        text: `Call first if a power point, switch or cable feels hot, smells burnt or looks damaged.`,
      },
      {
        title: `Electrical fault guides for ${coverageSuburb.name}`,
        href: "/electrical-faults",
        text: `Read practical fault guides for power loss and burning smells, sparking outlets and tripping safety switches.`,
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
        title: `CCTV camera installation ${coverageSuburb.name}`,
        href: "/services/cctv-security-camera-installation-sydney",
        text: `Security camera cabling and CCTV setup support for homes, strata and businesses.`,
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
      `${response.badgeTitle} for emergency call-outs`,
      business.level2Asp.display,
      `ARCtick Refrigerant Handling Licence L157323 â€” Split Systems (1)`,
      pick(
        [
          `Electrical help in ${suburbLabel}`,
          `Local support around ${areaLabel}`,
          "Call first for unsafe faults",
        ],
        seed,
        67,
      ),
    ],
  };

  const copyWithOverrides = applySuburbCopyOverride(
    generatedCopy,
    coverageSuburb.slug,
  );
  const heroWithResponse = copyWithOverrides.heroDescription.includes(
    "minute response",
  )
    ? copyWithOverrides.heroDescription
    : `${copyWithOverrides.heroDescription} ${response.suburbDisplay}`;
  const emergencyFaq = copyWithOverrides.faqAnswers.emergency.includes(
    response.shortDisplay,
  )
    ? copyWithOverrides.faqAnswers.emergency
    : `${copyWithOverrides.faqAnswers.emergency} Emergency call-outs in this region use ${response.shortDisplay}.`;
  const level2Faq = copyWithOverrides.faqAnswers.level2.includes(
    business.level2Asp.shortDisplay,
  )
    ? copyWithOverrides.faqAnswers.level2
    : `${copyWithOverrides.faqAnswers.level2} Evaready is an ${business.level2Asp.display}.`;

  return {
    ...copyWithOverrides,
    faqAnswers: {
      ...copyWithOverrides.faqAnswers,
      emergency: emergencyFaq,
      level2: level2Faq,
    },
    heroDescription: ensureSuburbHeroDepth(
      heroWithResponse,
      coverageArea,
      coverageSuburb,
      context,
    ),
    serviceIntro: copyWithOverrides.serviceIntro.includes("Level 2 ASP")
      ? copyWithOverrides.serviceIntro
      : `${copyWithOverrides.serviceIntro} Emergency response timing and ${business.level2Asp.shortDisplay} support are confirmed from the job location and scope.`,
    trustItems: Array.from(
      new Set([
        ...copyWithOverrides.trustItems,
        `${response.badgeTitle} for emergency call-outs`,
        business.level2Asp.display,
      ]),
    ),
  };
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

