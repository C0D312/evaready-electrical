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

