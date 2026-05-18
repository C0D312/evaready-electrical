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
  | "emergency"
  | "general"
  | "level2"
  | "switchboard";

export type SuburbPageCopy = {
  ctaHeading: string;
  faqAnswers: {
    emergency: string;
    level2: string;
    quote: string;
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
      `Evaready Electrical helps ${suburbLabel} customers with ${context.commonJobs}. The work is suited to ${context.propertyMix}, with clear quote requests for planned jobs and direct phone support for urgent electrical hazards.`,
      `For ${suburbLabel}, Evaready Electrical focuses on practical electrical service for ${context.propertyMix}. Common requests include ${context.commonJobs}, plus Level 2 electrical enquiries where the supply side of the installation needs attention.`,
      `Electrical work in ${suburbLabel} can range from urgent faults to planned upgrades. Evaready Electrical supports local ${context.propertyMix} with ${context.commonJobs}, and keeps the next step simple: call for hazards or request a quote for scheduled work.`,
      `Evaready Electrical services ${suburbLabel} with electrical fault support, repairs and upgrade work shaped around ${context.propertyMix}. The page covers ${context.commonJobs}, along with switchboard and Level 2 enquiries across ${areaLabel}.`,
    ],
    seed,
    suburbPosition + 5,
  );

  const heroNote = pick(
    [
      `${coverageArea.description} This ${context.setting} often needs clear job details, photos and safe fault testing before work begins.`,
      `${coverageSuburb.name} sits within the ${areaLabel} service page for ${regionLabel}. Quote requests are easier to assess when they include ${context.accessDetail}.`,
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
          text: "Electrical faults are tested properly before parts, upgrades or repair options are recommended.",
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
          text: `For ${coverageSuburb.name}, a strong quote request includes the postcode, photos and a short description of the electrical issue.`,
        },
        {
          title: "Match the service",
          text: `The enquiry is matched to emergency, general electrical, switchboard or Level 2 style work.`,
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
          "Emergency fault calls",
          "Urgent electrical faults",
          "Call-first electrical hazards",
        ],
        seed,
        11,
      ),
      text: pick(
        [
          `For ${coverageSuburb.name}, call first if you notice ${context.emergencySignals}. Unsafe electrical symptoms should not wait behind a quote form.`,
          `Emergency enquiries in ${suburbLabel} often involve ${context.emergencySignals}. The safest move is to stop using the affected circuit and call directly.`,
          `When ${coverageSuburb.name} homes or businesses have ${context.emergencySignals}, the priority is to make the situation safe before planning repairs.`,
        ],
        seed,
        13,
      ),
    },
    {
      intent: "switchboard" as const,
      title: pick(
        [
          "Switchboard upgrades",
          "Safety switch work",
          "Board faults and upgrades",
        ],
        seed,
        17,
      ),
      text: pick(
        [
          `Switchboard requests around ${coverageSuburb.name} can involve ${context.switchboardDetail}, especially during renovations or added appliance loads.`,
          `${areaLabel} switchboard work often needs a careful look at ${context.switchboardDetail} before the right upgrade path is chosen.`,
          `For ${suburbLabel}, switchboard enquiries commonly cover ${context.switchboardDetail} and nuisance tripping that needs proper testing.`,
        ],
        seed,
        19,
      ),
    },
    {
      intent: "level2" as const,
      title: pick(
        [
          "Level 2 enquiries",
          "Supply-side electrical work",
          "Consumer mains support",
        ],
        seed,
        23,
      ),
      text: pick(
        [
          `Level 2 style enquiries in ${coverageSuburb.name} may involve ${context.level2Detail}. Photos of the meter board, point of attachment or notice help clarify the scope.`,
          `For ${coverageSuburb.name} properties, ${context.level2Detail} should be assessed with clear photos and any paperwork from the network or retailer.`,
          `${regionLabel} Level 2 enquiries can include ${context.level2Detail}, particularly where a switchboard or supply upgrade is being planned.`,
        ],
        seed,
        29,
      ),
    },
    {
      intent: "general" as const,
      title: pick(
        [
          "Planned electrical work",
          "General electrical repairs",
          "Lighting, power and maintenance",
        ],
        seed,
        31,
      ),
      text: pick(
        [
          `Planned jobs in ${coverageSuburb.name} can cover ${context.plannedWork}. Send photos and a clear description so the quote request is easy to assess.`,
          `For everyday electrical work in ${suburbLabel}, common requests include ${context.plannedWork} and small repairs around ${context.propertyMix}.`,
          `${coverageSuburb.name} quote requests are well suited to ${context.plannedWork}, especially when photos and access details are included upfront.`,
        ],
        seed,
        37,
      ),
    },
  ];

  return {
    ctaHeading: pick(
      [
        `Need electrical help in ${coverageSuburb.name}? Call or request a quote.`,
        `Planning electrical work in ${coverageSuburb.name}? Send the details through.`,
        `For ${suburbLabel} electrical faults or upgrades, start here.`,
      ],
      seed,
      41,
    ),
    faqAnswers: {
      emergency: `Yes. For ${coverageSuburb.name} emergency electrical faults such as ${context.emergencySignals}, call Evaready Electrical directly so the issue can be treated as urgent.`,
      level2: `Yes. Level 2 enquiries in ${coverageSuburb.name} can include ${context.level2Detail}. Include photos of the switchboard, meter area, point of attachment or any defect paperwork if you have it.`,
      quote: `For ${suburbLabel}, include your contact details, job address, photos, a short description and ${context.accessDetail}. For unsafe faults, call instead of waiting for a quote response.`,
    },
    faqHeading: pick(
      [
        `Questions about electrical work in ${coverageSuburb.name}.`,
        `Common ${coverageSuburb.name} electrical questions.`,
        `What ${coverageSuburb.name} customers usually ask.`,
      ],
      seed,
      43,
    ),
    faqIntro: `Use these quick answers to decide whether to call for an urgent hazard or send a quote request for planned work in ${coverageSuburb.name}.`,
    heroDescription,
    heroNote,
    metaDescription: `Need an electrician in ${suburbLabel}? Evaready Electrical helps with ${context.commonJobs}, switchboards, emergencies and Level 2 enquiries around ${areaLabel}.`,
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
    serviceIntro: `This page focuses on electrical work people in ${coverageSuburb.name} usually ask for across ${areaLabel}, with examples matched to ${context.propertyMix}.`,
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
        href: "/services/electrical-fault-finding-sydney",
        text: `Testing for faults affecting ${context.propertyMix}.`,
      },
      {
        title: `Power points and lighting ${coverageSuburb.name}`,
        href: "/services/power-point-installation-sydney",
        text: `Planned help with ${context.plannedWork}.`,
      },
      {
        title: `Commercial electrician ${coverageSuburb.name}`,
        href: "/services/commercial-electrician-sydney",
        text: `Electrical support for commercial, strata and property maintenance enquiries in ${areaLabel}.`,
      },
    ],
    serviceSummaries,
    servicesHeading: pick(
      [
        `Electrical work commonly requested in ${coverageSuburb.name}.`,
        `${coverageSuburb.name} electrical services people search for.`,
        `Common electrical jobs around ${suburbLabel}.`,
      ],
      seed,
      61,
    ),
    trustItems: [
      `Electrical help for ${coverageSuburb.postcode}`,
      `${areaLabel} service page`,
      pick(
        [
          "Call first for unsafe faults",
          "Photos help planned quotes",
          "Clear details before attendance",
        ],
        seed,
        67,
      ),
    ],
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
