import { approvedBusinessClaims, business } from "./site";

export type ServiceFaq = {
  answer: string;
  question: string;
};

export type ServiceProcessStep = {
  text: string;
  title: string;
};

export type ServiceGuideSection = {
  copy: string;
  items: string[];
  title: string;
};

export type ServiceLandingPage = {
  audiences?: string[];
  callFirstBlock?: {
    heading: string;
    items: string[];
    safetyCopy: string;
  };
  credentialHighlights?: string[];
  description: string;
  faqs: ServiceFaq[];
  heroBullets: string[];
  inspectionLimitations?: string[];
  inspectionOutcomes?: string[];
  intro: string;
  loadCapacitySection?: {
    copy: string;
    heading: string;
    links: {
      href: string;
      label: string;
    }[];
  };
  metaDescription: string;
  metaTitle: string;
  primaryCta?: "phone" | "quote";
  process: ServiceProcessStep[];
  quoteCtaLabel?: string;
  quoteChecklist?: {
    heading: string;
    items: string[];
    urgentNote: string;
  };
  relatedServices: string[];
  responseTrustProof?: {
    heading?: string;
    items: string[];
    note: string;
  };
  serviceGuide?: {
    heading: string;
    intro: string;
    sections: ServiceGuideSection[];
  };
  services: string[];
  slug: string;
  title: string;
  warningSigns: string[];
};

export const serviceLandingPages: ServiceLandingPage[] = [
  {
    slug: "residential-electrician-sydney",
    metaTitle: "Residential Electrician Sydney | Home Electrical Help",
    metaDescription:
      "Need a residential electrician in Sydney? Evaready helps with power points, lighting, smoke alarms, switchboards, faults and renovations.",
    title: "Residential Electrician Sydney & Surrounding Regions",
    description:
      "Safe, tidy electrical work for homes, units, townhouses, granny flats and renovations across the service area.",
    intro:
      "Evaready Electrical helps homeowners with everyday electrical repairs, safety upgrades and planned installations. From a faulty power point to a full renovation rough-in, the work is tested carefully and explained clearly before it is completed.",
    heroBullets: [
      "Power points, lighting and ceiling fans",
      "Smoke alarms and safety switches",
      "Switchboard checks and upgrades",
      "Fault finding and home repairs",
    ],
    warningSigns: [
      "Power points feel warm or make a buzzing sound",
      "Lights flicker when appliances turn on",
      "Safety switches keep tripping",
      "Older switchboards still use ceramic fuses",
    ],
    services: [
      "New power points and outlet repairs",
      "LED lighting, outdoor lighting and security lighting",
      "Smoke alarm installation and replacement",
      "Ceiling fan and appliance circuits",
      "Renovation and extension wiring",
      "Switchboard safety checks and upgrades",
    ],
    process: [
      {
        title: "Confirm the job",
        text: "Share the suburb, photos and what is happening so the job can be assessed clearly.",
      },
      {
        title: "Inspect and test",
        text: "The issue is checked safely before repairs, upgrades or installation work starts.",
      },
      {
        title: "Complete neatly",
        text: "Work is carried out with clean finishes, safe connections and proper testing.",
      },
      {
        title: "Explain next actions",
        text: "You get clear notes on what was done and anything that may need attention later.",
      },
    ],
    faqs: [
      {
        question: "Can you help with small home electrical jobs?",
        answer:
          "Yes. Evaready Electrical handles small repairs, power points, lighting, smoke alarms, fault finding and larger home upgrades.",
      },
      {
        question: "Can I send photos before requesting a quote?",
        answer:
          "Yes. Photos of the switchboard, fitting, outlet or fault area help make the job details clearer.",
      },
      {
        question: "Do you work on older homes?",
        answer:
          "Yes. Older homes are checked carefully because wiring, switchboards and safety protection can vary widely.",
      },
    ],
    relatedServices: [
      "electrical-fault-finding-sydney",
      "power-point-installation-sydney",
      "lighting-electrician-sydney",
      "smoke-alarm-electrician-sydney",
    ],
  },
  {
    slug: "commercial-electrician-sydney",
    metaTitle: "Commercial Electrician Sydney | Shops, Strata & Offices",
    metaDescription:
      "Commercial electrician in Sydney for shops, offices, strata, builders and property managers needing power, lighting, faults and maintenance.",
    title: "Commercial Electrician Sydney & Surrounding Regions",
    description:
      "Electrical maintenance and installation support for Sydney businesses, builders, strata and real estate clients.",
    intro:
      "Commercial electrical work needs clear communication, reliable attendance and neat documentation. Evaready Electrical supports shops, offices, strata sites, warehouses, builders and property managers across Sydney and surrounding regions.",
    heroBullets: [
      "Office, retail and strata electrical support",
      "Lighting, power and fault finding",
      "Builder and real estate maintenance",
      "Switchboards and safety upgrades",
    ],
    warningSigns: [
      "Power circuits trip during trading hours",
      "Lights fail across a shop, office or common area",
      "Tenants report unsafe outlets or fixtures",
      "Switchboard capacity is limiting equipment upgrades",
    ],
    services: [
      "Commercial fault finding and repairs",
      "Shop, office and warehouse lighting",
      "Power outlets and dedicated circuits",
      "Strata and real estate maintenance",
      "Builder electrical support",
      "Switchboard and safety device upgrades",
    ],
    process: [
      {
        title: "Scope the site",
        text: "The job type, access, trading hours and urgency are confirmed before attendance.",
      },
      {
        title: "Diagnose safely",
        text: "Faults and supply issues are checked in a way that reduces disruption where possible.",
      },
      {
        title: "Quote clearly",
        text: "You get a clear explanation of the required work before approval.",
      },
      {
        title: "Keep records clear",
        text: "Photos, notes and next actions can be supplied where they are useful for managers or owners.",
      },
    ],
    faqs: [
      {
        question: "Do you work with property managers and strata?",
        answer:
          "Yes. Evaready Electrical can support common electrical faults, lighting, safety issues and maintenance requests.",
      },
      {
        question: "Can you help with urgent business electrical faults?",
        answer:
          "Yes. Call directly for urgent faults affecting safety, power or trading.",
      },
      {
        question: "Do you provide commercial switchboard support?",
        answer:
          "Yes. Switchboard faults, safety upgrades and capacity discussions can be assessed.",
      },
    ],
    relatedServices: [
      "strata-electrician-sydney",
      "property-management-electrician-sydney",
      "electrical-fault-finding-sydney",
      "switchboard-upgrades-sydney",
      "lighting-electrician-sydney",
      "power-point-installation-sydney",
    ],
  },
  {
    slug: "strata-electrician-sydney",
    metaTitle: "Strata Electrician Sydney | Common Property Electrical Work",
    metaDescription:
      "Strata electrician in Sydney for common-property faults, lighting, switchboards, intercoms, access systems and planned maintenance enquiries.",
    title: "Strata Electrician Sydney",
    description:
      "Electrical fault and maintenance support for strata managers, owners corporations, common areas and shared-access properties.",
    intro:
      "Strata electrical work often involves shared areas, access arrangements and more than one contact. Evaready Electrical can help with common-property faults, lighting, switchboards, intercom and access wiring, emergency lighting and planned electrical maintenance across Sydney and surrounding regions.",
    audiences: [
      "Strata managers",
      "Owners corporations",
      "Property managers",
      "Apartment and townhouse complexes",
    ],
    heroBullets: [
      "Common-area fault finding and repairs",
      "Shared lighting and power",
      "Switchboard and safety enquiries",
      "Intercom, access and emergency lighting",
    ],
    warningSigns: [
      "Common-area lighting or power has failed",
      "A shared circuit or safety switch keeps tripping",
      "Residents report heat, sparking or a burning smell",
      "An intercom, gate or access system has lost electrical supply",
    ],
    services: [
      "Common-area electrical fault finding",
      "Hallway, car park and external lighting",
      "Shared switchboard and circuit checks",
      "Intercom and access-control electrical support",
      "Emergency and exit lighting enquiries",
      "Planned strata electrical maintenance",
    ],
    process: [
      {
        title: "Confirm the affected area",
        text: "Share the building address, affected common area, access details and the best site contact.",
      },
      {
        title: "Review photos and records",
        text: "Send photos of the fitting, switchboard or access equipment, plus any work order or relevant notes.",
      },
      {
        title: "Inspect the electrical issue",
        text: "The affected circuit or equipment is checked before repair or upgrade options are confirmed.",
      },
      {
        title: "Record the next action",
        text: "Useful job notes and next actions can be provided for the strata contact or property manager.",
      },
    ],
    faqs: [
      {
        question: "Can Evaready work with strata managers and owners corporations?",
        answer:
          "Yes. Evaready can discuss common-property faults, lighting, switchboards, access systems and planned maintenance with the nominated strata contact.",
      },
      {
        question: "What details help with a strata electrical quote?",
        answer:
          "Send the building address, affected area, access and parking notes, site contact, photos and any work order or previous electrical note.",
      },
      {
        question: "What should residents do if a common-area fault feels unsafe?",
        answer:
          "Keep clear of the affected equipment and call first. If there is fire, smoke or an immediate threat to life, move to safety and call 000.",
      },
    ],
    primaryCta: "quote",
    relatedServices: [
      "commercial-electrician-sydney",
      "property-management-electrician-sydney",
      "electrical-fault-finding-sydney",
      "emergency-exit-lighting-sydney",
      "intercom-access-control-electrician-sydney",
    ],
  },
  {
    slug: "property-management-electrician-sydney",
    metaTitle: "Property Management Electrician Sydney | Rental Electrical Work",
    metaDescription:
      "Electrician for Sydney property managers and real estate agencies needing rental repairs, electrical faults, smoke alarms, inspections and maintenance.",
    title: "Property Management Electrician Sydney",
    description:
      "Clear electrical support for property managers, real estate agencies, landlords and managed residential properties.",
    intro:
      "Managed-property electrical work needs the right address, access contact and job details before attendance. Evaready Electrical can help property managers, real estate agencies and landlords with urgent faults, planned repairs, smoke alarms, lighting, power points, switchboards and electrical inspection enquiries.",
    audiences: [
      "Property managers",
      "Real estate agencies",
      "Landlords",
      "Managed homes, units and townhouses",
    ],
    heroBullets: [
      "Tenant-reported electrical faults",
      "Lighting, outlets and smoke alarms",
      "Switchboard and safety enquiries",
      "Photo, work-order and access coordination",
    ],
    warningSigns: [
      "A tenant reports no power or repeated circuit tripping",
      "An outlet, fitting or switchboard feels hot or smells burnt",
      "Lighting, smoke alarms or fixed electrical equipment needs attention",
      "A condition report identifies an electrical concern",
    ],
    services: [
      "Electrical fault finding for managed properties",
      "Power point and lighting repairs",
      "Smoke alarm electrical support",
      "Switchboard and safety-switch enquiries",
      "Pre-purchase and rental inspection enquiries",
      "Planned maintenance and repair quotes",
    ],
    process: [
      {
        title: "Send the work request",
        text: "Provide the property address, issue summary, tenant or access contact and approval contact.",
      },
      {
        title: "Add useful evidence",
        text: "Photos, switchboard details, condition reports and previous notes help clarify the scope.",
      },
      {
        title: "Separate urgent from planned",
        text: "Unsafe faults start with a phone call. Planned repairs can move through the quote process.",
      },
      {
        title: "Confirm the next action",
        text: "The electrical issue, access requirements and practical next action are confirmed with the nominated contact.",
      },
    ],
    faqs: [
      {
        question: "Can Evaready take electrical enquiries from property managers?",
        answer:
          "Yes. Send the property address, job description, access contact, approval contact and any available photos or reports.",
      },
      {
        question: "Can tenants contact Evaready about an unsafe electrical fault?",
        answer:
          "For an unsafe fault, call first and explain the property-management arrangement. Repair approval and access requirements may still need confirmation with the responsible contact.",
      },
      {
        question: "Can I send a work order or condition report with the quote request?",
        answer:
          "Yes. Work orders, condition reports, switchboard photos and fault photos can help clarify the requested electrical work.",
      },
    ],
    primaryCta: "quote",
    relatedServices: [
      "commercial-electrician-sydney",
      "strata-electrician-sydney",
      "pre-purchase-rental-electrical-inspections-sydney",
      "smoke-alarm-electrician-sydney",
      "electrical-fault-finding-sydney",
    ],
  },
  {
    slug: "electrical-fault-finding-sydney",
    metaTitle: "Electrical Fault Finding Sydney | Tripping & Power Faults",
    metaDescription:
      "Electrical fault finding in Sydney for repeated tripping, partial power loss, burning smells, hot outlets, damaged wiring and intermittent faults.",
    title: "Electrical Fault Finding Sydney & Surrounding Regions",
    description:
      "Find the cause of circuit tripping, power loss, damaged wiring and unsafe electrical faults.",
    intro:
      "Keep clear of hot, wet, sparking or potentially live electrical equipment. Call Triple Zero (000) for fire, smoke, serious electric shock or immediate danger, and use your electricity distributor's emergency service for an area outage or damaged network equipment. Do not keep resetting protection that trips again. For faults within the property, our licensed electricians test before discussing repair options.",
    heroBullets: [
      "Repeated RCD or circuit breaker trips",
      "Partial, intermittent or complete power loss",
      "Burning smells, heat, buzzing or sparking",
      "Moisture exposure or damaged electrical equipment",
    ],
    warningSigns: [
      "The same circuit trips repeatedly",
      "A burning or fishy smell comes from a fitting",
      "Lights flicker or dim unexpectedly",
      "Power points spark, buzz or feel hot",
    ],
    services: [
      "Initial safety assessment and circuit isolation",
      "RCD and circuit breaker fault testing",
      "Accessible outlet, wiring and appliance checks",
      "Switchboard protection and connection checks",
      "Moisture and water-ingress investigation",
      "Repair options, retesting and next-step advice",
    ],
    serviceGuide: {
      heading: "How electrical fault finding narrows down the problem.",
      intro:
        "Similar symptoms can come from different faults. The testing sequence follows the evidence available at the property and separates an internal electrical problem from an appliance issue or a network supply event.",
      sections: [
        {
          title: "Start with safety and the supply boundary",
          copy:
            "The first decision is whether the danger is within the property, involves the electricity network or requires emergency services.",
          items: [
            "Move clear and call 000 for fire, smoke, serious electric shock or an immediate threat to life.",
            "Keep away from fallen powerlines, damaged street equipment and wet network assets; contact the electricity distributor for network emergencies or an area outage.",
            "Repeated tripping, localised power loss or an affected fitting can require testing within the property.",
          ],
        },
        {
          title: "Testing follows the symptom",
          copy:
            "Our licensed electricians use the fault history and safe access available on site to plan circuit, protection and equipment checks.",
          items: [
            "The affected circuit can be isolated before electrical testing starts.",
            "Testing may compare fixed wiring, outlets, connected equipment and switchboard protection.",
            "Customers should not remove covers, open electrical equipment or touch suspected live parts.",
          ],
        },
        {
          title: "Repair options follow the findings",
          copy:
            "A repair is discussed after the likely fault area has been narrowed down; diagnosis does not guarantee that every fault can be found or repaired during one visit.",
          items: [
            "An accessible defective fitting, connection or cable section may be repairable after approval.",
            "An unsafe circuit may need to remain isolated until further access or parts are available.",
            "Intermittent faults may require monitoring, repeat testing or access to concealed wiring.",
          ],
        },
        {
          title: "Retesting and handover",
          copy:
            "After agreed work, the affected installation is retested within the completed scope and the result is explained before handover.",
          items: [
            "You are told what was tested, repaired, restored or left isolated.",
            "Further access, appliance work or distributor action is identified where relevant.",
            "Required electrical compliance documentation is handled for work within its applicable scope.",
          ],
        },
      ],
    },
    inspectionOutcomes: [
      "A summary of accessible components and circuits tested",
      "The likely fault area and any repair completed within the agreed scope",
      "Clear notice of circuits left isolated or work requiring further access",
      "Applicable test results and compliance documentation where required",
    ],
    inspectionLimitations: [
      "An intermittent fault may not be present during the first inspection.",
      "Concealed or inaccessible wiring may require separate access approval.",
      "Appliance faults and electricity-network faults can require a different service pathway.",
      "Repair scope and timing depend on test results, access, parts and site conditions.",
    ],
    process: [
      {
        title: "Describe the symptom",
        text: "The affected rooms, recent changes, trip pattern and any heat, smell, water or sparking are recorded without asking you to test unsafe equipment.",
      },
      {
        title: "Separate supply from property",
        text: "An area outage or damaged network asset is distinguished from a fault requiring investigation within the property.",
      },
      {
        title: "Test methodically",
        text: "Accessible circuits, protection devices, fittings and connected equipment are checked in a sequence guided by the symptom.",
      },
      {
        title: "Agree the next action",
        text: "Available repair, isolation, monitoring or further-access options are explained, and completed work is retested before handover.",
      },
    ],
    faqs: [
      {
        question: "Should I keep resetting a tripping safety switch?",
        answer:
          "No. If it keeps tripping, stop resetting it and call an electrician. The safety switch may be reacting to a real fault.",
      },
      {
        question: "Is a burning smell an emergency?",
        answer:
          "Treat a burning smell near electrical equipment as urgent. Stop using the affected area, keep clear, call 000 for fire or smoke, and call an electrician once everyone is safe.",
      },
      {
        question: "Can an appliance cause a circuit to trip?",
        answer:
          "It can. Connected equipment, water ingress, damaged wiring and circuit conditions are among the possible causes, so testing is needed before deciding on a repair.",
      },
      {
        question: "What if the fault only happens sometimes?",
        answer:
          "Record when it happens and what was operating, but do not recreate an unsafe condition. Intermittent faults may need monitoring, repeat testing or access to concealed wiring.",
      },
      {
        question: "Is a loss of power always a fault inside the property?",
        answer:
          "No. Check the electricity distributor's outage information without approaching damaged equipment. An area outage or network hazard follows the distributor pathway; a localised property fault needs electrical investigation.",
      },
    ],
    relatedServices: [
      "switchboard-upgrades-sydney",
      "residential-electrician-sydney",
      "commercial-electrician-sydney",
      "power-point-installation-sydney",
    ],
  },
  {
    slug: "lighting-electrician-sydney",
    metaTitle: "Lighting Electrician Sydney | LED & Outdoor Lighting",
    metaDescription:
      "Lighting electrician in Sydney for LED downlights, outdoor lights, security lighting, bathroom lighting, feature lights and repairs.",
    title: "Lighting Electrician Sydney & Surrounding Regions",
    description:
      "LED, indoor, outdoor, security and commercial lighting installed safely across the service area.",
    intro:
      "Good lighting changes how a home or business feels and functions. Evaready Electrical installs and repairs lighting with careful placement, safe wiring and tidy finishes.",
    heroBullets: [
      "LED downlights and feature lighting",
      "Outdoor and security lighting",
      "Bathroom and kitchen lighting",
      "Lighting repairs and upgrades",
    ],
    warningSigns: [
      "Lights flicker or fail repeatedly",
      "Old fixtures become hot",
      "Outdoor lights trip in wet weather",
      "Rooms need safer or brighter lighting",
    ],
    services: [
      "LED downlight installation",
      "Outdoor and garden lighting",
      "Security sensor lights",
      "Bathroom and kitchen lighting",
      "Commercial lighting upgrades",
      "Faulty light fitting repairs",
    ],
    process: [
      {
        title: "Plan placement",
        text: "Lighting positions, access and switch locations are checked first.",
      },
      {
        title: "Check wiring",
        text: "Existing wiring and circuit safety are reviewed before installation.",
      },
      {
        title: "Install neatly",
        text: "Fixtures are installed cleanly with attention to finish and function.",
      },
      {
        title: "Test controls",
        text: "Switches, sensors and lights are tested before the job is wrapped up.",
      },
    ],
    faqs: [
      {
        question: "Can you replace old lights with LEDs?",
        answer:
          "Yes. Evaready Electrical can replace many older fixtures with LED options suited to the space.",
      },
      {
        question: "Can outdoor lights be repaired?",
        answer:
          "Yes. Outdoor lighting faults can be checked for fitting failure, water ingress or wiring issues.",
      },
      {
        question: "Can you install security sensor lights?",
        answer:
          "Yes. Security and sensor lighting can be installed for entries, driveways, side paths and outdoor areas.",
      },
    ],
    relatedServices: [
      "residential-electrician-sydney",
      "commercial-electrician-sydney",
      "electrical-fault-finding-sydney",
      "power-point-installation-sydney",
    ],
  },
  {
    slug: "power-point-installation-sydney",
    metaTitle: "Power Point Installation Sydney | Outlets & Repairs",
    metaDescription:
      "Power point installation in Sydney for new outlets, double power points, outdoor outlets, appliance circuits and faulty outlet repairs.",
    title: "Power Point Installation Sydney & Surrounding Regions",
    description:
      "Install, replace and repair power points for homes, offices, kitchens, garages and outdoor areas.",
    intro:
      "Power points should be placed where they are useful and wired safely for the load they support. Evaready Electrical installs and repairs outlets with proper checks, neat finishes and safe testing.",
    heroBullets: [
      "New and replacement power points",
      "Outdoor and garage outlets",
      "Kitchen and appliance outlets",
      "Faulty or damaged outlet repairs",
    ],
    warningSigns: [
      "A power point sparks or buzzes",
      "The outlet feels hot",
      "Plug tops are loose in the socket",
      "You rely on overloaded power boards",
    ],
    services: [
      "New power point installation",
      "Double power point upgrades",
      "Outdoor weather-rated outlets",
      "USB and appliance outlets",
      "Faulty power point replacement",
      "Dedicated circuit advice",
    ],
    process: [
      {
        title: "Confirm location",
        text: "The preferred outlet location and access are checked before work starts.",
      },
      {
        title: "Check circuit capacity",
        text: "The circuit is reviewed so the outlet is suitable for the intended use.",
      },
      {
        title: "Install safely",
        text: "The outlet is installed, connected and finished neatly.",
      },
      {
        title: "Test before use",
        text: "The new or repaired power point is tested before the job is complete.",
      },
    ],
    faqs: [
      {
        question: "Can you add extra power points?",
        answer:
          "Yes. Extra power points can be installed where access and circuit capacity allow.",
      },
      {
        question: "Can you install outdoor power points?",
        answer:
          "Yes. Outdoor outlets need suitable weather-rated equipment and safe installation.",
      },
      {
        question: "Is a hot power point dangerous?",
        answer:
          "Yes. Stop using a hot, buzzing or sparking outlet and call an electrician.",
      },
    ],
    relatedServices: [
      "residential-electrician-sydney",
      "commercial-electrician-sydney",
      "electrical-fault-finding-sydney",
      "switchboard-upgrades-sydney",
    ],
  },
  {
    slug: "smoke-alarm-electrician-sydney",
    metaTitle: "Smoke Alarm Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Smoke alarm electrician in Sydney for installation, testing, replacement and hardwired smoke alarm support for homes, rentals and property managers.",
    title: "Smoke Alarm Electrician Sydney & Surrounding Regions",
    description:
      "Smoke alarm installation, replacement and testing for homes, rentals and property managers.",
    intro:
      "For an active fire or smoke emergency, move to safety and call Triple Zero (000). Do not ignore, disable or paint over a smoke alarm. For planned work, our licensed electricians can inspect existing alarms, replace or install hardwired units, assess interconnection options and test operation for the property type and the requirements that apply to it.",
    heroBullets: [
      "Existing alarm condition and location checks",
      "Hardwired alarm installation or replacement",
      "Interconnection and compatibility assessment",
      "Testing, troubleshooting and job notes",
    ],
    warningSigns: [
      "An alarm is missing, damaged or no longer responds to its test control",
      "An alarm chirps repeatedly or gives unexplained alerts",
      "A hardwired unit has failed or lost its mains indicator",
      "A property change raises questions about alarm location or interconnection",
    ],
    services: [
      "Existing smoke alarm condition and location review",
      "Hardwired smoke alarm replacement",
      "New hardwired smoke alarm installation",
      "Interconnection and compatibility checks",
      "Alarm operation and fault testing",
      "Owner, agent or property-manager job notes",
    ],
    serviceGuide: {
      heading: "Plan smoke alarm work for the property and its occupants.",
      intro:
        "Smoke alarm work starts by separating an active emergency from a planned inspection, replacement or installation. The suitable alarm arrangement depends on the premises, existing wiring, alarm compatibility and the requirements applying to that property.",
      sections: [
        {
          title: "An active fire is not an alarm-service call",
          copy:
            "If there is fire or smoke, leave the danger area and call 000 from a safe place. Electrical inspection can follow only after emergency services have made the situation safe.",
          items: [
            "Do not re-enter a dangerous area to silence, inspect or retrieve an alarm.",
            "Do not disable, cover or paint over an alarm that is sounding or faulty.",
            "A non-emergency chirp or fault can be booked for inspection once there is no fire or smoke danger.",
          ],
        },
        {
          title: "Check the existing alarm arrangement",
          copy:
            "Our licensed electricians review accessible alarms, their power source, location, condition and any existing interconnection before recommending electrical work.",
          items: [
            "Property type, sleeping areas and layout affect the assessment.",
            "The age, model and compatibility of existing alarms can affect replacement choices.",
            "Rental, strata and other premises can have different duties, so the owner or agent should confirm the records and requirements applying to the property.",
          ],
        },
        {
          title: "Installation, replacement and interconnection",
          copy:
            "The scope may be a like-for-like hardwired replacement, an additional alarm, a new circuit connection or an interconnection review.",
          items: [
            "Hardwired electrical work is completed by our licensed electricians.",
            "Existing wiring and alarm compatibility are checked before units are interconnected.",
            "Ceiling access, concealed wiring and the condition of the existing installation can change the work required.",
          ],
        },
        {
          title: "Testing and handover",
          copy:
            "Installed or replaced alarms are tested within the completed scope, and the result is explained to the person responsible for the property.",
          items: [
            "Operation and interconnection are checked where those features are part of the work.",
            "Alarm locations, units changed and any outstanding issues can be recorded in the job notes.",
            "Working smoke alarms provide early warning but cannot eliminate fire risk.",
          ],
        },
      ],
    },
    inspectionOutcomes: [
      "Observed alarm type, location and accessible condition",
      "Units installed, replaced or left for further review",
      "Operation and interconnection test results within the completed scope",
      "Agreed job notes for the owner, agent or property manager",
    ],
    inspectionLimitations: [
      "Ceiling access and concealed wiring can limit what is confirmed without further work.",
      "Existing alarm models may not be compatible with a proposed interconnected arrangement.",
      "The owner or agent remains responsible for confirming property-specific tenancy, strata and building obligations.",
      "A tested alarm reduces risk by providing warning but does not prevent a fire.",
    ],
    process: [
      {
        title: "Confirm the property",
        text: "The premises type, layout, occupants' needs and reason for the alarm work are discussed before the scope is set.",
      },
      {
        title: "Inspect the arrangement",
        text: "Accessible alarms, power sources, locations, wiring and interconnection are reviewed against the requirements applying to the property.",
      },
      {
        title: "Complete agreed work",
        text: "Suitable hardwired alarms are installed or replaced and interconnected only where the units and installation support it.",
      },
      {
        title: "Test and explain",
        text: "Completed alarm work is tested, and operation, maintenance information and any outstanding issues are explained at handover.",
      },
    ],
    faqs: [
      {
        question: "Can you replace hardwired smoke alarms?",
        answer:
          "Yes. Hardwired smoke alarms can be replaced by a licensed electrician.",
      },
      {
        question: "Why does my smoke alarm keep chirping?",
        answer:
          "A chirp can relate to a battery, the unit's age, contamination, power supply or a fault. Do not disable the alarm; follow its manufacturer information and arrange an inspection if the cause is unclear.",
      },
      {
        question: "Do rental properties need working smoke alarms?",
        answer:
          "NSW rental properties have smoke alarm duties, but the exact responsibilities and records depend on the premises and tenancy circumstances. Owners and agents should confirm what applies to their property rather than relying on a universal checklist.",
      },
      {
        question: "Can existing smoke alarms be interconnected?",
        answer:
          "It depends on the alarm models, power arrangement, wiring and property layout. Compatibility and access should be checked before an interconnection method is selected.",
      },
      {
        question: "Does installing smoke alarms remove all fire risk?",
        answer:
          "No. Working smoke alarms provide early warning, but they do not prevent a fire or replace an evacuation plan and other fire-safety measures.",
      },
    ],
    relatedServices: [
      "residential-electrician-sydney",
      "electrical-fault-finding-sydney",
      "lighting-electrician-sydney",
      "power-point-installation-sydney",
    ],
  },
  {
    slug: "ev-charger-installation-sydney",
    metaTitle: "EV Charger Installation Sydney | Home & Business Charging",
    metaDescription:
      "EV charger installation in Sydney for homes and businesses, with load checks, dedicated circuits, switchboard checks and upgrade advice.",
    title: "EV Charger Installation Sydney & Surrounding Regions",
    description:
      "Home and business EV charger installation support with load checks, circuit planning and switchboard review.",
    intro:
      "A fixed EV charger can add a substantial new load to a home, strata property or business. Our licensed electricians assess the charger, switchboard, existing demand, cable route and required protection before installation. For smoke, fire, serious electric shock or immediate danger, move clear and call Triple Zero (000) rather than waiting for an electrical booking.",
    heroBullets: [
      "Home EV charger installations",
      "Dedicated EV charger circuits",
      "Switchboard and load checks",
      "Future-ready upgrade advice",
    ],
    warningSigns: [
      "The switchboard is full, damaged or already shows signs of overloading",
      "Existing circuits trip when several high-demand appliances operate",
      "The parking position is remote from the switchboard or crosses common property",
      "The proposed charger rating may exceed the property's available capacity",
    ],
    services: [
      "Dedicated EV charger circuit planning and installation",
      "Switchboard, protection and available-capacity assessment",
      "Home, strata and commercial charging enquiries",
      "Cable-route and mounting-location review",
      "Load-management and staged-upgrade options where suitable",
      "Testing, commissioning and electrical handover",
    ],
    serviceGuide: {
      heading: "Plan the charger around the vehicle, property and available supply.",
      intro:
        "The charger model is only one part of the job. The electrical installation must suit the property's existing demand, wiring, switchboard, parking layout and any approval conditions that apply.",
      sections: [
        {
          title: "What our licensed electricians inspect",
          copy:
            "We review the proposed charger rating and manufacturer requirements alongside the switchboard, existing loads and accessible supply equipment. The inspection also considers the practical route from the switchboard to the parking position.",
          items: [
            "Charger model, electrical rating and vehicle compatibility information",
            "Switchboard condition, circuit space and existing protection",
            "Existing electrical demand and likely charging pattern",
            "Cable route, mounting surface, weather exposure and vehicle position",
          ],
        },
        {
          title: "Capacity, approvals and possible enabling work",
          copy:
            "A dedicated circuit may be enough at one property, while another may need load management, switchboard work or a separate supply assessment. Strata approval, landlord approval or a distributor connection process may also be required before work proceeds.",
          items: [
            "Dedicated circuit and suitable electrical protection",
            "Load control where simultaneous demand needs to be managed",
            "Switchboard or supply work only where the assessment supports it",
            "Property and network approvals identified before installation",
          ],
        },
        {
          title: "Installation, testing and handover",
          copy:
            "Once the scope and approvals are settled, the circuit and charger are installed, electrically tested and commissioned within the agreed scope. The handover explains isolation, normal indicators and who to contact if the unit reports a fault.",
          items: [
            "Neat cable support and charger mounting",
            "Electrical testing before the charger is placed in service",
            "Basic operating and isolation information at handover",
            "Required electrical documentation for the completed wiring work",
          ],
        },
        {
          title: "Important limits before you choose a charging speed",
          copy:
            "Quoted charging speed depends on the vehicle, charger, available supply and load-management settings. Electrical installation does not guarantee an app, internet connection, electricity tariff or a particular real-world charging rate.",
          items: [
            "Vehicle and charger software support remains product-specific",
            "Civil work, line marking and extensive surface repairs need separate scope",
            "Common-property access and parking arrangements remain owner decisions",
            "Unexpected concealed conditions are discussed before extra work proceeds",
          ],
        },
      ],
    },
    process: [
      {
        title: "Confirm the charging brief",
        text: "We review the vehicle, charger model, parking position, property type and expected charging pattern.",
      },
      {
        title: "Inspect the electrical installation",
        text: "The switchboard, accessible supply, existing demand and proposed cable route are assessed before the scope is confirmed.",
      },
      {
        title: "Resolve scope and approvals",
        text: "Circuit protection, load management, enabling work and any strata or network process are identified before installation.",
      },
      {
        title: "Install, test and explain",
        text: "The approved electrical work is completed, tested and handed over with clear operating and fault guidance.",
      },
    ],
    faqs: [
      {
        question: "Can every property support a fixed EV charger?",
        answer:
          "Not automatically. Charger size, existing demand, switchboard condition, available supply, cable route and property approvals all affect what can be installed safely.",
      },
      {
        question: "Will I need a switchboard upgrade?",
        answer:
          "Only an assessment can confirm that. Some sites have suitable capacity and protection, while others need switchboard work, load management or a broader supply review.",
      },
      {
        question: "Can a charger be installed in a strata car space?",
        answer:
          "It may be possible, but common-property routes, metering, building capacity and owners-corporation approval need to be resolved before installation.",
      },
      {
        question: "Does an EV charger always need a network application?",
        answer:
          "No. The need depends on the charger and connection. A licensed electrical contractor can assess the proposed work and identify whether notification, approval or a supply change is required.",
      },
      {
        question: "What details help with an EV charger quote?",
        answer:
          "Send the charger model and rating, vehicle model, photos of the switchboard and proposed parking location, the approximate cable route and any strata or landlord requirements.",
      },
      {
        question: "What should I do if charging causes heat, smoke or repeated tripping?",
        answer:
          "Stop using the charger and do not keep resetting protection. Move clear and call Triple Zero (000) for fire, serious electric shock or immediate danger; otherwise call for an electrical fault assessment.",
      },
    ],
    relatedServices: [
      "switchboard-upgrades-sydney",
      "consumer-mains-sydney",
      "residential-electrician-sydney",
      "commercial-electrician-sydney",
    ],
  },
  {
    slug: "consumer-mains-sydney",
    metaTitle: "Consumer Mains Electrician Sydney | Level 2 Supply Work",
    metaDescription:
      "Consumer mains electrician in Sydney for damaged, undersized or ageing mains, supply upgrades, defect notices and switchboard supply work.",
    title: "Consumer Mains Electrician Sydney & Surrounding Regions",
    description:
      "Consumer mains checks, upgrades and repair discussions for Sydney properties that need supply-side electrical work.",
    intro:
      "Consumer mains carry power from the service connection to the switchboard. If they are old, damaged, undersized or part of a defect notice, the work needs the right electrical process and documentation.",
    credentialHighlights: [
      "Level 2 electrical enquiries",
      "Consumer mains and supply capacity",
    ],
    heroBullets: [
      "Consumer mains repairs and upgrades",
      "Supply capacity discussions",
      "Defect notice support",
      "Switchboard supply-side work",
      "Overhead and underground supply considerations",
    ],
    warningSigns: [
      "A defect notice mentions consumer mains",
      "Cables appear old, brittle or damaged",
      "A renovation or EV charger needs more capacity",
      "The switchboard needs major supply work",
    ],
    services: [
      "Consumer mains assessment",
      "Supply upgrade planning",
      "Defect notice discussion",
      "Switchboard supply checks",
      "Overhead and underground service considerations",
      "Point of attachment and service equipment context",
      "Load capacity review for EV, aircon or larger equipment",
      "Level 2 electrical process guidance where required",
    ],
    process: [
      {
        title: "Review the issue",
        text: "Photos, defect notices and site details help identify what needs assessment.",
      },
      {
        title: "Inspect the supply",
        text: "The service path, switchboard and mains condition are checked.",
      },
      {
        title: "Plan the work",
        text: "The safest compliant path is scoped before the job proceeds.",
      },
      {
        title: "Complete and document",
        text: "Testing and documentation are handled where applicable to the work.",
      },
    ],
    faqs: [
      {
        question: "What are consumer mains?",
        answer:
          "Consumer mains are the main cables that supply power from the service connection to your switchboard.",
      },
      {
        question: "When do consumer mains need upgrading?",
        answer:
          "They may need upgrading if damaged, undersized, non-compliant, part of a defect notice or unable to support new loads.",
      },
      {
        question: "Is consumer mains work Level 2 electrical work?",
        answer:
          "Consumer mains work often involves specialised supply-side requirements and should be assessed by the right licensed electrician.",
      },
      {
        question: "What photos help with a consumer mains quote?",
        answer:
          "Send photos of the switchboard, meter area, point of attachment or service path, any defect notice, your suburb and the reason the mains are being reviewed.",
      },
      {
        question: "Can new loads trigger consumer mains upgrades?",
        answer:
          "Sometimes. EV chargers, air conditioning, workshops and larger appliances can trigger a load and supply capacity review before work proceeds.",
      },
    ],
    relatedServices: [
      "defect-notice-repairs-sydney",
      "metering-services-sydney",
      "private-power-pole-sydney",
      "point-of-attachment-repairs-sydney",
      "overhead-service-lines-sydney",
      "underground-service-mains-sydney",
      "switchboard-upgrades-sydney",
      "ev-charger-installation-sydney",
      "electrical-load-capacity-checks-sydney",
    ],
  },
  {
    slug: "defect-notice-repairs-sydney",
    metaTitle: "Electrical Defect Notice Repairs Sydney",
    metaDescription:
      "Electrical defect notice repairs in Sydney for consumer mains, point of attachment, switchboards, private poles and supply-side defects.",
    title: "Electrical Defect Notice Repairs Sydney & Surrounding Regions",
    description:
      "Help understanding and responding to electrical defect notices before they become a bigger problem.",
    intro:
      "An electrical defect notice should be acted on quickly. Evaready Electrical can review the notice, inspect the affected equipment and explain what needs to be done to bring the issue back toward compliance.",
    credentialHighlights: [
      "Defect notice review",
      "Photos, deadlines and paperwork",
    ],
    heroBullets: [
      "Defect notice review",
      "Consumer mains and service defects",
      "Point of attachment issues",
      "Switchboard and supply-side concerns",
    ],
    warningSigns: [
      "The notice has a rectification deadline",
      "It mentions consumer mains or point of attachment",
      "A private pole or overhead service is damaged",
      "The distributor has flagged unsafe equipment",
    ],
    services: [
      "Defect notice assessment",
      "Consumer mains defect discussion",
      "Point of attachment checks",
      "Switchboard defect support",
      "Private pole related defect support",
      "Metering and service equipment defect review",
      "Documentation guidance where applicable",
    ],
    process: [
      {
        title: "Send the notice",
        text: "Share a clear photo or copy of the defect notice with your job details.",
      },
      {
        title: "Inspect the defect",
        text: "The listed issue and surrounding electrical equipment are checked.",
      },
      {
        title: "Scope the repair",
        text: "You get a clear explanation of what needs to happen and why.",
      },
      {
        title: "Rectify and test",
        text: "Approved repairs are completed and tested, with documentation handled where applicable.",
      },
    ],
    faqs: [
      {
        question: "What should I do after receiving an electrical defect notice?",
        answer:
          "Do not ignore it. Send the notice through and arrange an assessment before the deadline becomes urgent.",
      },
      {
        question: "Can a defect notice lead to disconnection?",
        answer:
          "If a defect is not rectified, supply authorities may take further action. The notice should be handled promptly.",
      },
      {
        question: "What information should I send?",
        answer:
          "Send the notice, your address, photos of the switchboard or affected equipment, and any deadline listed.",
      },
      {
        question: "Can a defect notice involve Level 2 work?",
        answer:
          "Yes. Defect notices can involve consumer mains, metering, point of attachment, private pole, overhead service or supply-side equipment issues.",
      },
      {
        question: "Should I call if the defect looks unsafe?",
        answer:
          "Yes. If there is no power, smoke, sparking, heat, a burning smell or exposed equipment, call first before touching the affected area.",
      },
    ],
    relatedServices: [
      "consumer-mains-sydney",
      "metering-services-sydney",
      "private-power-pole-sydney",
      "point-of-attachment-repairs-sydney",
      "overhead-service-lines-sydney",
      "switchboard-upgrades-sydney",
      "electrical-fault-finding-sydney",
    ],
  },
  {
    slug: "private-power-pole-sydney",
    metaTitle: "Private Power Pole Electrician Sydney",
    metaDescription:
      "Private power pole electrician in Sydney for damaged poles, overhead service issues, storm damage, defect notices and supply concerns.",
    title: "Private Power Pole Electrician Sydney & Surrounding Regions",
    description:
      "Electrical support for private power pole concerns, overhead service issues and related defect notices.",
    intro:
      "Private power poles and overhead services can become a serious safety issue when damaged, leaning or flagged in a defect notice. Evaready Electrical can assess the electrical side of the issue and explain the next actions.",
    credentialHighlights: [
      "Private pole enquiries",
      "Overhead supply and defects",
    ],
    heroBullets: [
      "Private pole electrical enquiries",
      "Overhead service concerns",
      "Storm damage and safety issues",
      "Defect notice support",
    ],
    warningSigns: [
      "The pole is leaning or visibly damaged",
      "Overhead cables are loose or pulled away",
      "A defect notice mentions a private pole",
      "Storm damage has affected the service line",
    ],
    services: [
      "Private pole electrical assessment",
      "Overhead service issue review",
      "Point of attachment discussion",
      "Defect notice support",
      "Supply safety checks",
      "Level 2 electrical coordination where required",
    ],
    process: [
      {
        title: "Make safety the priority",
        text: "If lines are down or unsafe, keep clear and call emergency services or the relevant distributor first.",
      },
      {
        title: "Review photos",
        text: "Photos of the pole, cables and switchboard help determine the next action.",
      },
      {
        title: "Inspect the site",
        text: "The electrical connection and affected service equipment are checked.",
      },
      {
        title: "Plan the repair",
        text: "You get a clear scope for the electrical work required.",
      },
    ],
    faqs: [
      {
        question: "Is a damaged private pole urgent?",
        answer:
          "Yes, it can be. Keep clear of damaged poles and overhead cables and call for advice immediately.",
      },
      {
        question: "Can storm damage affect the electrical supply?",
        answer:
          "Yes. Storm damage can affect overhead services, point of attachment and supply safety.",
      },
      {
        question: "What details should I send for the quote?",
        answer:
          "Send photos of the pole, overhead cables, switchboard and any defect notice you received.",
      },
      {
        question: "What if a line is down or close to danger?",
        answer:
          "Keep clear and call emergency services or the relevant distributor first if there is immediate danger, fallen lines or life-threatening risk.",
      },
    ],
    relatedServices: [
      "defect-notice-repairs-sydney",
      "consumer-mains-sydney",
      "point-of-attachment-repairs-sydney",
      "overhead-service-lines-sydney",
      "electrical-fault-finding-sydney",
      "switchboard-upgrades-sydney",
    ],
  },
  {
    slug: "hot-water-system-electrician-sydney",
    metaTitle: "Hot Water System Electrician Sydney | Electric Faults",
    metaDescription:
      "Hot water system electrician for electric faults, tripping circuits, isolators, heat pumps and replacement wiring. Call Now or get a quote.",
    title: "Hot Water System Electrician Sydney & Surrounding Regions",
    description:
      "Electrical support for electric hot water faults, hot water circuits, isolators, replacement wiring and heat pump electrical support.",
    intro:
      "A loss of hot water can come from the electrical supply, circuit protection, isolator, controls, thermostat or heating element, but testing is needed before the cause is known. Our licensed electricians handle the electrical scope. Keep clear of water near electrical equipment, and call Triple Zero (000) for fire, serious electric shock or immediate danger.",
    heroBullets: [
      "No hot water electrical faults",
      "Hot water circuit and isolator checks",
      "Thermostat and element electrical support",
      "Heat-pump hot-water electrical supply support",
    ],
    warningSigns: [
      "The hot water system has stopped heating",
      "The hot water circuit trips the safety switch",
      "There is heat, smell or buzzing near the isolator",
      "Water has reached the isolator, wiring or switchboard area",
    ],
    callFirstBlock: {
      heading: "Call first if the hot water fault feels unsafe",
      items: [
        "No hot water and the hot water circuit has tripped",
        "Burning smell near the switchboard, isolator or hot water unit",
        "Heat, buzzing or sparking near the isolator",
        "Safety switch keeps tripping when the hot water circuit is reset",
        "Water has reached electrical equipment",
        "Power loss, electric shock risk or exposed wiring",
      ],
      safetyCopy:
        "Do not keep resetting protection, remove covers or touch wet or damaged fittings. Call first so the electrical risk can be assessed safely.",
    },
    quoteChecklist: {
      heading: "What to send for a hot water electrical quote",
      items: [
        "Photo of the hot water unit",
        "Photo of the isolator",
        "Photo of the switchboard",
        "Photo of any tripped breaker or safety switch",
        "Model label or unit details if visible",
        "Whether the system is electric storage, heat pump or part of a replacement",
        "Whether there is no hot water, tripping, burning smell, buzzing, heat or water exposure",
        "Suburb and property type",
        "Any strata, property-manager or landlord approval requirements",
        "Any deadline or replacement booking date",
      ],
      urgentNote:
        "If there is heat, smoke, sparking, burning smell, shock risk, water exposure or loss of power, call first.",
    },
    services: [
      "Electric hot water circuit fault finding",
      "Hot water isolator checks and replacement",
      "Safety switch tripping on hot water circuits",
      "Thermostat and element electrical testing",
      "Replacement electric hot water wiring support",
      "Heat-pump hot-water circuit and isolator support",
    ],
    serviceGuide: {
      heading: "Separate the electrical fault from plumbing and equipment faults.",
      intro:
        "The symptom may be no hot water, repeated tripping or a failed replacement connection, but the electrical cause cannot be confirmed from the symptom alone. The agreed scope starts with safe testing and a clear boundary between electrical work and other trades.",
      sections: [
        {
          title: "What our licensed electricians inspect",
          copy:
            "We inspect the accessible electrical supply to the unit and test the parts of the circuit relevant to the reported fault. The exact checks depend on whether the system is electric storage, instantaneous electric or heat-pump hot water.",
          items: [
            "Switchboard protection and hot-water circuit behaviour",
            "Accessible wiring, terminations and local isolation",
            "Electrical operation of thermostats and elements where applicable",
            "Signs of heat, damage or moisture affecting electrical equipment",
          ],
        },
        {
          title: "Possible causes and repair pathways",
          copy:
            "Possible electrical causes include a failed element or thermostat, damaged wiring, a faulty isolator, moisture ingress, circuit-protection operation or a supply-control issue. Testing may instead show that the fault sits within plumbing, gas or refrigeration scope.",
          items: [
            "Repair or replacement of damaged electrical components where suitable",
            "Circuit, isolator or protection work supported by test results",
            "Electrical connection for a replacement unit within the agreed scope",
            "Non-electrical equipment or trade work identified as a separate scope when required",
          ],
        },
        {
          title: "Replacement and heat-pump considerations",
          copy:
            "A replacement unit must suit the available circuit, isolation and switchboard protection. Heat-pump systems can also involve plumbing and, for some designs or service work, refrigeration requirements that are outside an ordinary electrical-only scope.",
          items: [
            "Unit electrical rating and manufacturer connection requirements",
            "Circuit capacity and suitable electrical protection",
            "Local isolation and weather-exposed wiring condition",
            "Separate appropriately licensed work identified before installation proceeds",
          ],
        },
        {
          title: "Limits, testing and handover",
          copy:
            "Electrical testing is a snapshot of accessible equipment and the agreed fault scope. It does not guarantee tank, valve, plumbing, gas, refrigerant or future equipment performance, and concealed defects may require further investigation.",
          items: [
            "Completed electrical work is tested before handover",
            "Any unresolved or non-electrical fault is explained clearly",
            "Required electrical documentation is provided for completed wiring work",
            "Making-good or replacement-unit supply is included only when quoted",
          ],
        },
      ],
    },
    process: [
      {
        title: "Confirm the fault",
        text: "Share what the system is doing, photos of the unit and switchboard, and whether the circuit is tripping.",
      },
      {
        title: "Test the supply",
        text: "The hot-water circuit, isolator, accessible wiring and switchboard protection are checked safely.",
      },
      {
        title: "Find the electrical cause",
        text: "The fault is narrowed down so the right electrical repair or replacement support can be planned.",
      },
      {
        title: "Repair and retest",
        text: "Approved electrical work is completed neatly and tested before the system is returned to use.",
      },
    ],
    faqs: [
      {
        question: "Can an electrician help when there is no hot water?",
        answer:
          "Yes. Our licensed electricians can test the electrical supply, circuit, isolator, protection and relevant controls or heating components to determine whether the fault is electrical.",
      },
      {
        question: "Do I need an electrician or a plumber for hot water?",
        answer:
          "An electrician handles electrical supply, circuits, isolators, wiring, protection and electrical controls. Plumbing, water leaks, valves, gas work and some heat-pump or refrigeration tasks require a separately appropriate licence.",
      },
      {
        question: "Why does my hot water trip the safety switch?",
        answer:
          "Possible causes include a failed element, insulation breakdown, damaged wiring, moisture ingress or another circuit fault. Do not keep resetting protection; the circuit should be tested.",
      },
      {
        question: "What photos help with a hot water quote?",
        answer:
          "Send photos of the hot water unit, isolator, switchboard, model label and any tripped switch or visible damage.",
      },
      {
        question: "Can you help with hot water heat pumps?",
        answer:
          "We can assist with the electrical circuit, isolation and switchboard-protection scope. Plumbing and any refrigerant work are separate and must be completed under the appropriate licence.",
      },
      {
        question: "Can Evaready wire a replacement electric hot water system?",
        answer:
          "Yes, where the agreed job includes electrical connection work. The existing circuit, isolation, protection and replacement-unit requirements are checked before connection.",
      },
      {
        question: "Is a burning smell or hot isolator urgent?",
        answer:
          "Yes. Heat, smoke, sparking, burning smells, shock risk, water exposure or loss of power should be treated as urgent. Call first and do not keep resetting breakers or touching damaged equipment.",
      },
      {
        question: "Can a hot water upgrade require switchboard or load capacity checks?",
        answer:
          "Yes. A replacement with different electrical demand may need a capacity assessment, circuit changes or switchboard work before installation can proceed.",
      },
    ],
    relatedServices: [
      "electrical-fault-finding-sydney",
      "safety-switch-rcd-installation-sydney",
      "switchboard-upgrades-sydney",
      "split-system-air-conditioning-sydney",
    ],
  },
  {
    slug: "split-system-air-conditioning-sydney",
    metaTitle: "Air Conditioning Electrician Sydney | AC Circuits",
    metaDescription:
      "Air conditioning electrician Sydney for split systems, AC isolators, dedicated circuits and switchboard capacity checks. Call now or get a quote.",
    title: "Air Conditioning Electrician Sydney & Surrounding Regions",
    description:
      "Air-conditioning electrical support, split-system air conditioning, AC isolators, dedicated circuits, heat pump support and switchboard capacity checks.",
    intro:
      "Evaready helps with the electrical side of split-system air conditioning, including dedicated circuits, AC isolators, outdoor unit power, safety switch protection, switchboard capacity checks and heat-pump electrical supply where relevant. Air-conditioning installation or refrigeration work is handled by appropriately licensed technicians. If the job involves electrical supply, tripping, burning smell, heat, buzzing, sparking, unsafe wiring, isolators, switchboard capacity or power to the unit, call first or send photos for review.",
    credentialHighlights: [
      approvedBusinessClaims.credentials.arctick.approvedWording,
      approvedBusinessClaims.credentials.arctick.qualification,
    ],
    heroBullets: [
      "Air-conditioning electrical support",
      "Split-system air conditioning",
      "AC isolators and dedicated circuits",
      "Heat pump electrical support",
    ],
    warningSigns: [
      "An air conditioner needs a dedicated circuit or isolator",
      "Outdoor unit power or an AC isolator needs attention",
      "Switchboard capacity or safety switch protection needs checking",
      "A hot water or swimming pool heat pump needs electrical support",
    ],
    callFirstBlock: {
      heading: "Call first if the aircon electrical fault feels unsafe",
      items: [
        "The AC circuit or safety switch keeps tripping",
        "Burning smell near the switchboard, isolator or outdoor unit",
        "Heat, buzzing or sparking near the isolator",
        "Outdoor unit power or isolator looks damaged",
        "Water has reached electrical equipment",
        "Power loss, electric shock risk or exposed wiring",
        "Switchboard capacity or protection looks overloaded",
      ],
      safetyCopy:
        "Do not keep resetting breakers or touching damaged fittings. Call first so the electrical fault can be triaged safely.",
    },
    responseTrustProof: {
      heading: "Trusted air-conditioning electrical support without overclaiming.",
      items: [
        business.emergencyResponse.coreServiceType,
        business.emergencyResponse.greaterServiceType,
        business.level2Asp.display,
        "Call first for urgent electrical faults",
        "Send photos and job details for planned work",
      ],
      note:
        "Level 2 support may be relevant where consumer mains, metering, defect notices, switchboard capacity, load capacity or supply-side electrical work affects the job.",
    },
    loadCapacitySection: {
      heading: "Before adding air conditioning, check the electrical supply",
      copy:
        "New split systems, heat pumps and larger air-conditioning loads can require a dedicated circuit, isolator, RCBO/safety switch protection, switchboard capacity review or electrical load capacity check. If the supply, switchboard or consumer mains may be undersized, Evaready can review the electrical side before work proceeds.",
      links: [
        {
          href: "/services/electrical-load-capacity-checks-sydney",
          label: "Electrical load capacity checks",
        },
        {
          href: "/services/switchboard-upgrades-sydney",
          label: "Switchboard upgrades",
        },
        {
          href: "/services/consumer-mains-sydney",
          label: "Consumer mains electrical work",
        },
        {
          href: "/level-2-electrician-sydney",
          label: "Level 2 electrician Sydney",
        },
      ],
    },
    quoteChecklist: {
      heading: "What to send for an air-conditioning electrical quote",
      items: [
        "Photo of the indoor and outdoor unit if installed",
        "Photo of the AC isolator",
        "Photo of the switchboard",
        "Photo of any tripped breaker, RCD or RCBO",
        "Photo of the model label or unit details if visible",
        "Whether the job is a new split-system, replacement, relocation or fault",
        "Whether a dedicated circuit is already present",
        "Whether there is tripping, burning smell, buzzing, heat, sparking or water exposure",
        "Suburb, address, access notes and parking details",
        "Any strata, property-manager or landlord details if relevant",
        "Any installation date, builder/installer booking or deadline",
      ],
      urgentNote:
        "If there is heat, smoke, sparking, burning smell, shock risk, water exposure or loss of power, call first.",
    },
    services: [
      "Air-conditioning electrical support",
      "Split-system electrical support",
      "AC isolators",
      "Dedicated air conditioner circuits",
      "Outdoor unit power",
      "Safety switches and RCBOs",
      "Switchboard capacity checks",
      "Heat-pump electrical supply",
      "Hot water heat pumps",
      "Swimming pool heat pumps",
      "Aircon fault support",
      "Electrical supply planning",
    ],
    process: [
      {
        title: "Confirm the aircon job",
        text: "Share the equipment type, location, photos and whether the job involves split-system air conditioning, a hot water heat pump or a swimming pool heat pump.",
      },
      {
        title: "Check power and protection",
        text: "The switchboard, circuit space, dedicated supply, safety switch protection and isolator requirements are reviewed before work begins.",
      },
      {
        title: "Arrange the right technician",
        text: "Evaready plans the electrical work and can arrange an appropriately licensed technician where the air-conditioning scope requires one.",
      },
      {
        title: "Install, test and explain",
        text: "Approved work is completed neatly, tested where required and explained before handover.",
      },
    ],
    faqs: [
      {
        question: "Can an electrician help with air conditioning?",
        answer:
          "Yes. Evaready Electrical can help with the electrical side of air conditioning, including split-system electrical support, AC isolators, dedicated circuits, outdoor unit power, safety switches, switchboard capacity checks and heat-pump electrical supply.",
      },
      {
        question: "Do I need an electrician or an air-conditioning technician?",
        answer:
          "An electrician handles the electrical supply, circuit, isolator, switchboard protection, safety switch behaviour and capacity checks. Air-conditioning installation or refrigeration work is handled by appropriately licensed technicians, so some jobs may need both trades.",
      },
      {
        question: "What is an AC isolator?",
        answer:
          "An AC isolator is a local isolation switch near the air-conditioning outdoor unit. It lets power to the unit be isolated for service or safety and must be installed and checked as part of the electrical side of the job.",
      },
      {
        question: "Does a split system need a dedicated circuit?",
        answer:
          "Many split-system air conditioners need a dedicated circuit, suitable cable size, an AC isolator and the right safety switch or RCBO protection. The exact requirement depends on the unit, location and existing switchboard capacity.",
      },
      {
        question: "Why does my aircon trip the safety switch?",
        answer:
          "An aircon can trip the safety switch because of a fault in the circuit, isolator, outdoor unit supply, damaged wiring, water exposure or connected equipment. If it keeps tripping, do not keep resetting it. Call first so the electrical fault can be triaged.",
      },
      {
        question: "What photos help with an air-conditioning quote?",
        answer:
          "Send photos of the indoor and outdoor unit if installed, the AC isolator, switchboard, any tripped breaker, RCD or RCBO, the model label if visible, access notes, parking details and whether the job is a new split-system, replacement, relocation or fault.",
      },
      {
        question: "Can Evaready help with heat pump electrical supply?",
        answer:
          "Yes. Evaready can review the electrical side of heat-pump electrical supply, including circuit requirements, isolators, switchboard protection and capacity checks where relevant.",
      },
      {
        question: "Can a new aircon need switchboard or load capacity checks?",
        answer:
          "Yes. New split systems, heat pumps and larger loads can need a switchboard capacity review, dedicated circuit, RCBO or safety switch protection, consumer mains review or electrical load capacity checks before work proceeds.",
      },
      {
        question: "When should I call first instead of requesting a quote?",
        answer:
          "Call first if there is heat, smoke, sparking, burning smell, shock risk, water exposure, loss of power, repeated tripping or damaged electrical equipment. Planned work can use the quote form with photos and job details.",
      },
    ],
    relatedServices: [
      "residential-electrician-sydney",
      "hot-water-system-electrician-sydney",
      "switchboard-upgrades-sydney",
      "electrical-load-capacity-checks-sydney",
    ],
  },
  {
    slug: "cctv-security-camera-installation-sydney",
    metaTitle: "CCTV Electrician Sydney | Cameras & Security Cabling",
    metaDescription:
      "CCTV electrician in Sydney for security camera installation, camera wiring, recorder support, home CCTV and business CCTV cabling.",
    title: "CCTV Electrician Sydney & Surrounding Regions",
    description:
      "Security camera and CCTV cabling installed neatly for homes, shops, offices and strata sites.",
    intro: `A good CCTV setup depends on camera placement, clean cabling and reliable power. Evaready Electrical helps with CCTV and security camera installation for homes and businesses, including camera wiring, power supplies, recorder locations and future camera provisions. ${approvedBusinessClaims.credentials.openCabler.approvedWording} applies to eligible data, CCTV and communications cabling work.`,
    heroBullets: [
      "Home CCTV installation",
      "Business security cameras",
      "Camera cabling and power",
      "Recorder and camera location planning",
    ],
    warningSigns: [
      "Cameras keep losing power or signal",
      "Existing cabling is exposed or messy",
      "Blind spots leave entries uncovered",
      "You need extra cameras for a growing system",
    ],
    services: [
      "CCTV camera installation",
      "Security camera cabling",
      "Camera power supplies",
      "Eligible CCTV and data cabling work",
      "Recorder location planning",
      "Home and commercial CCTV support",
    ],
    process: [
      {
        title: "Plan camera views",
        text: "Entry points, driveways, yards, shopfronts and blind spots are reviewed.",
      },
      {
        title: "Choose cable paths",
        text: "Cable routes are planned for a neat result and reliable operation.",
      },
      {
        title: "Install equipment",
        text: "Cameras, cabling and power supplies are installed safely and tidily.",
      },
      {
        title: "Test the view",
        text: "Camera views and power are checked before the job is finished.",
      },
    ],
    faqs: [
      {
        question: "Can you install CCTV at a home or business?",
        answer: `Yes. Evaready Electrical can assist with CCTV camera wiring and installation for residential and commercial properties, including eligible cabling work under ${approvedBusinessClaims.credentials.openCabler.approvedWording}.`,
      },
      {
        question: "Where should CCTV cameras be installed?",
        answer:
          "Common locations include entrances, driveways, side paths, yards, shopfronts, warehouses and shared access areas.",
      },
      {
        question: "Can you add extra cameras later?",
        answer:
          "Yes. The cabling path and recorder capacity can be considered so future cameras are easier to add.",
      },
    ],
    relatedServices: [
      "data-cabling-electrician-sydney",
      "lighting-electrician-sydney",
      "commercial-electrician-sydney",
      "residential-electrician-sydney",
    ],
  },
  {
    slug: "data-cabling-electrician-sydney",
    metaTitle: "Data Cabling Electrician Sydney | Internet Points",
    metaDescription:
      "Data cabling electrician in Sydney for network points, internet points, NBN internal cabling, phone line repairs and office data runs.",
    title: "Data Cabling Electrician Sydney & Surrounding Regions",
    description:
      "Network data cabling, internet points and communication outlets for homes, offices and renovations.",
    intro: `Reliable internet and network points need tidy cabling and sensible placement. Evaready Electrical installs data cabling, internet points and communication outlets for homes, offices, renovations and commercial spaces. ${approvedBusinessClaims.credentials.openCabler.approvedWording} applies to eligible data and communications cabling work.`,
    heroBullets: [
      "Network data points",
      "Internet outlet installation",
      "Office and home data cabling",
      "Phone line repairs and cabling",
    ],
    warningSigns: [
      "Wi-Fi is weak where you work or stream",
      "Network cables are loose, damaged or exposed",
      "A home office needs a hardwired connection",
      "An office or shop needs extra data outlets",
    ],
    services: [
      "Network data cabling",
      "Internet and data points",
      "Home office cabling",
      "Office data runs",
      "Eligible communications cabling work",
      "Phone line installation and repairs",
    ],
    process: [
      {
        title: "Confirm locations",
        text: "The router, equipment and outlet locations are mapped first.",
      },
      {
        title: "Plan cable routes",
        text: "Access, wall type and ceiling space are checked before installation.",
      },
      {
        title: "Install outlets",
        text: "Cables and outlets are installed neatly where access allows.",
      },
      {
        title: "Label and test",
        text: "Connections are checked and labelled where useful.",
      },
    ],
    faqs: [
      {
        question: "Can you install data points for a home office?",
        answer:
          "Yes. Data points can provide a more reliable hardwired connection for workstations, TVs and equipment.",
      },
      {
        question: "Can you help with office data cabling?",
        answer: `Yes. Evaready Electrical can assist with office data runs, outlet placement and eligible communication cabling under ${approvedBusinessClaims.credentials.openCabler.approvedWording}.`,
      },
      {
        question: "Do you repair phone lines?",
        answer:
          "Yes. Phone line and communication outlet issues can be inspected and repaired where possible.",
      },
    ],
    relatedServices: [
      "cctv-security-camera-installation-sydney",
      "commercial-electrician-sydney",
      "residential-electrician-sydney",
      "power-point-installation-sydney",
    ],
  },
  {
    slug: "ceiling-fan-installation-sydney",
    metaTitle: "Ceiling Fan Installation Sydney & Surrounding Regions",
    metaDescription:
      "Ceiling fan installation in Sydney for bedrooms, living areas, outdoor fans, exhaust fans, bathroom fans and fan replacement wiring.",
    title: "Ceiling Fan Installation Sydney & Surrounding Regions",
    description:
      "Ceiling fans, exhaust fans and bathroom fans installed or replaced with safe wiring and neat finishes.",
    intro:
      "Fans need secure mounting, safe wiring and sensible switching. Evaready Electrical installs and replaces ceiling fans, exhaust fans and bathroom ventilation fans for homes, apartments and outdoor areas.",
    heroBullets: [
      "Ceiling fan installation",
      "Exhaust and bathroom fans",
      "Fan replacement wiring",
      "Outdoor and living area fans",
    ],
    warningSigns: [
      "A fan wobbles, hums or smells hot",
      "The fan switch or controller has failed",
      "A bathroom has poor ventilation",
      "An old fan needs safe replacement",
    ],
    services: [
      "Ceiling fan installation",
      "Ceiling fan replacement",
      "Exhaust fan installation",
      "Bathroom fan wiring",
      "Fan controller replacement",
      "Outdoor fan electrical support",
    ],
    process: [
      {
        title: "Check mounting",
        text: "The ceiling position, support and access are checked before installation.",
      },
      {
        title: "Plan switching",
        text: "Switches, controllers and wiring paths are confirmed.",
      },
      {
        title: "Install safely",
        text: "The fan is mounted and wired correctly.",
      },
      {
        title: "Test operation",
        text: "Speed preferences, light kits and controls are checked before completion.",
      },
    ],
    faqs: [
      {
        question: "Can you replace an old ceiling fan?",
        answer:
          "Yes. Old ceiling fans can be replaced with new models where the mounting and wiring are suitable.",
      },
      {
        question: "Can you install bathroom exhaust fans?",
        answer:
          "Yes. Bathroom and exhaust fan wiring can be installed or repaired where access allows.",
      },
      {
        question: "Can a fan with a light be installed?",
        answer:
          "Yes. Fan light combinations can be installed with suitable switching and wiring.",
      },
    ],
    relatedServices: [
      "residential-electrician-sydney",
      "lighting-electrician-sydney",
      "power-point-installation-sydney",
      "electrical-fault-finding-sydney",
    ],
  },
  {
    slug: "safety-switch-rcd-installation-sydney",
    metaTitle: "Safety Switch Electrician Sydney | RCD & RCBO Help",
    metaDescription:
      "Safety switch installation and RCD repairs in Sydney for circuit tripping, switchboard protection, RCBO upgrades and electrical safety checks.",
    title: "Safety Switch Installation Sydney & Surrounding Regions",
    description:
      "Safety switches, RCDs and RCBO circuit protection installed, repaired and checked carefully.",
    intro:
      "Do not keep resetting an RCD, RCBO or safety switch that trips again. Stop using the affected circuit, keep clear of unsafe equipment and call Triple Zero (000) for a serious electric shock, fire or immediate danger; seek medical assessment after any shock. Our licensed electricians can investigate the tripping and assess whether installation, replacement or broader switchboard work is appropriate.",
    heroBullets: [
      "Existing circuit-protection assessment",
      "RCD and RCBO installation or replacement",
      "Repeated-tripping fault investigation",
      "Testing, circuit identification and handover",
    ],
    warningSigns: [
      "An RCD, RCBO or safety switch trips again after reset",
      "Only part of the property loses power",
      "The switchboard has limited RCD protection",
      "Circuit labels or protection coverage are unclear",
    ],
    services: [
      "Existing RCD, RCBO and circuit-protection review",
      "Safety switch installation and replacement",
      "RCBO installation for individual circuits where suitable",
      "Repeated-tripping fault investigation",
      "Circuit identification and switchboard condition checks",
      "Post-work testing and handover information",
    ],
    serviceGuide: {
      heading: "Match safety-switch protection to the circuit and fault.",
      intro:
        "An RCD or safety switch monitors current leakage and disconnects when its operating threshold is reached. An RCBO combines residual-current protection with circuit-breaker functions, but neither device prevents every electrical hazard.",
      sections: [
        {
          title: "Repeated tripping needs investigation",
          copy:
            "A device that trips again may be responding to a wiring fault, moisture, connected equipment or another circuit condition. Repeated resetting can re-energise an unresolved hazard.",
          items: [
            "Stop using the affected circuit and do not bypass or hold a device on.",
            "Do not open the switchboard or touch internal parts.",
            "Call 000 for a serious electric shock, fire or immediate danger, and seek medical assessment after any shock.",
          ],
        },
        {
          title: "RCD and RCBO protection have limits",
          copy:
            "Residual-current protection can reduce the risk of serious electric shock in covered fault conditions, but it does not make damaged wiring or unsafe equipment safe.",
          items: [
            "An RCD responds to current leaking from its intended path.",
            "An RCBO also provides overcurrent protection for its circuit.",
            "Protection does not prevent every shock, fire, overload or wiring fault.",
          ],
        },
        {
          title: "Assessment before installation",
          copy:
            "Our licensed electricians identify circuits, inspect accessible switchboard conditions and test the installation before selecting compatible protection.",
          items: [
            "Available switchboard space and the existing enclosure condition are checked.",
            "Circuit arrangement and neutral configuration can affect the installation method.",
            "An older or damaged switchboard may require separate work before new protection can be fitted safely.",
          ],
        },
        {
          title: "Testing and handover",
          copy:
            "New or replaced protection is tested within the completed scope, and circuit coverage and operating information are explained at handover.",
          items: [
            "Affected circuits and installed devices are identified as part of the job record.",
            "Test results and any unresolved circuit fault are explained.",
            "Future testing should follow the device instructions and requirements applying to the property rather than a universal interval stated here.",
          ],
        },
      ],
    },
    inspectionOutcomes: [
      "Observed protection type, circuit coverage and accessible switchboard condition",
      "Fault findings where repeated tripping was investigated",
      "Devices installed or replaced and circuits identified within the agreed scope",
      "Operating information, test results and any follow-up work required",
    ],
    inspectionLimitations: [
      "An RCD or RCBO cannot prevent every electrical hazard or equipment fault.",
      "Existing switchboard damage, limited space or circuit configuration can require additional work.",
      "A fault outside accessible wiring may need further testing or access.",
      "Legal and testing obligations vary with the property and work scope and should be confirmed for that situation.",
    ],
    process: [
      {
        title: "Identify the circuit",
        text: "Existing devices, circuit labels, affected loads and the reported trip pattern are reviewed before switchboard work begins.",
      },
      {
        title: "Test before replacing",
        text: "Repeated tripping is investigated so a wiring, moisture or equipment fault is not mistaken for a defective protection device.",
      },
      {
        title: "Agree the protection scope",
        text: "RCD, RCBO or related switchboard work is selected for the identified circuits and existing installation condition.",
      },
      {
        title: "Install, test and explain",
        text: "Agreed devices are installed and tested, then their circuit coverage, limitations and any outstanding faults are explained.",
      },
    ],
    faqs: [
      {
        question: "Why does my safety switch keep tripping?",
        answer:
          "It may be reacting to a real fault, water ingress, damaged wiring or a faulty appliance. It should be tested by a licensed electrician.",
      },
      {
        question: "Can you add safety switches to an older switchboard?",
        answer:
          "Sometimes. Available space, enclosure condition, circuit arrangement and existing damage must be assessed. Separate switchboard work may be needed before new protection can be installed safely.",
      },
      {
        question: "Is an RCBO different from a safety switch?",
        answer:
          "Yes. An RCBO combines residual-current protection with overcurrent circuit-breaker functions for a circuit. The suitable device still depends on the installation and circuit design.",
      },
      {
        question: "Does an RCD prevent every electric shock?",
        answer:
          "No. It can reduce risk in covered residual-current fault conditions, but it does not remove every shock, fire, overload or wiring hazard and does not make damaged equipment safe to use.",
      },
      {
        question: "Should I keep resetting a safety switch that trips?",
        answer:
          "No. If it trips again, stop using the affected circuit and arrange fault investigation. Do not bypass the device or open the switchboard.",
      },
    ],
    relatedServices: [
      "switchboard-upgrades-sydney",
      "electrical-fault-finding-sydney",
      "residential-electrician-sydney",
      "hot-water-system-electrician-sydney",
    ],
  },
  {
    slug: "three-phase-power-sydney",
    metaTitle: "3 Phase Power Electrician Sydney & Surrounding Regions",
    metaDescription:
      "3 phase power electrician in Sydney for 3 phase upgrades, equipment circuits, commercial power, EV charger load checks and switchboard support.",
    title: "3 Phase Power Electrician Sydney & Surrounding Regions",
    description:
      "3 phase power support for higher electrical demand, commercial equipment, workshops and major property upgrades.",
    intro:
      "Some properties need more electrical capacity than single phase supply can comfortably provide. Evaready Electrical can assess 3 phase requirements for equipment, workshops, commercial spaces, EV charging and larger electrical upgrades.",
    heroBullets: [
      "3 phase upgrade enquiries",
      "Commercial and workshop power",
      "Equipment circuits and load checks",
      "EV charger and switchboard support",
    ],
    warningSigns: [
      "Equipment needs 3 phase power",
      "A property upgrade needs more capacity",
      "The switchboard is limiting new loads",
      "EV charging or machinery needs assessment",
    ],
    services: [
      "3 phase power assessment",
      "Equipment circuit planning",
      "Commercial load checks",
      "Switchboard capacity review",
      "EV charger load discussions",
      "Level 2 coordination where required",
    ],
    process: [
      {
        title: "Confirm load needs",
        text: "The equipment, charger or property demand is reviewed first.",
      },
      {
        title: "Check the switchboard",
        text: "Existing supply, switchboard capacity and circuit arrangement are assessed.",
      },
      {
        title: "Plan the upgrade",
        text: "The required electrical pathway is scoped before approval.",
      },
      {
        title: "Complete safely",
        text: "Approved work is completed, tested and explained clearly.",
      },
    ],
    faqs: [
      {
        question: "Do I need 3 phase power?",
        answer:
          "It depends on the load. Larger equipment, workshops, some commercial spaces and faster EV charging may need 3 phase assessment.",
      },
      {
        question: "Can 3 phase power involve Level 2 work?",
        answer:
          "Sometimes. Supply upgrades can require Level 2 electrical coordination depending on the property and network connection.",
      },
      {
        question: "What should I send for a 3 phase quote?",
        answer:
          "Send equipment details, photos of the switchboard, your suburb and what the new supply needs to power.",
      },
    ],
    relatedServices: [
      "consumer-mains-sydney",
      "switchboard-upgrades-sydney",
      "ev-charger-installation-sydney",
      "commercial-electrician-sydney",
    ],
  },
  {
    slug: "surge-protection-electrician-sydney",
    metaTitle: "Surge Protection Electrician Sydney | Switchboard SPDs",
    metaDescription:
      "Surge protection electrician in Sydney for switchboard SPDs, compatibility checks and layered protection planning for homes and business equipment.",
    title: "Surge Protection Electrician Sydney & Surrounding Regions",
    description:
      "Switchboard surge protection to help protect appliances, electronics and sensitive equipment.",
    intro:
      "Do not approach wet or storm-damaged electrical equipment. Call Triple Zero (000) for fire, smoke, serious electric shock or immediate danger, and use your electricity distributor's emergency service for damaged network equipment or an area outage. For planned work, our licensed electricians assess switchboard compatibility, earthing and connected equipment before recommending surge protection; no device prevents every surge or all equipment damage.",
    heroBullets: [
      "Switchboard surge protective devices",
      "Earthing and switchboard compatibility checks",
      "Layered protection for sensitive equipment",
      "Device condition and indicator review",
    ],
    warningSigns: [
      "Equipment has failed or reset after a voltage disturbance",
      "Sensitive electronics or controls need a protection plan",
      "The switchboard has no identified surge protective device",
      "An existing SPD shows a warning or end-of-life indicator",
    ],
    services: [
      "Switchboard surge-protection assessment",
      "Surge protective device selection and installation",
      "Switchboard space, condition and compatibility checks",
      "Earthing and protective-device review within scope",
      "Layered protection planning for sensitive equipment",
      "SPD testing, indicator checks and handover advice",
    ],
    serviceGuide: {
      heading: "Build a layered surge-protection plan with clear limits.",
      intro:
        "A switchboard surge protective device is one layer in an electrical protection plan. Selection depends on the installation, earthing, switchboard arrangement, exposure and the equipment the customer wants to protect.",
      sections: [
        {
          title: "Switchboard and plug-in protection do different jobs",
          copy:
            "A switchboard SPD is installed at the electrical distribution point to limit suitable transient overvoltages. A compatible plug-in protector can add point-of-use protection for particular equipment.",
          items: [
            "The switchboard device is selected for the supply and protective arrangement.",
            "Point-of-use devices must be suitable for the connected equipment and installation.",
            "Neither layer replaces safe wiring, earthing, circuit protection or equipment maintenance.",
          ],
        },
        {
          title: "Compatibility is checked before selection",
          copy:
            "Our licensed electricians inspect accessible switchboard conditions and discuss the equipment and exposure before recommending an SPD arrangement.",
          items: [
            "Switchboard space, enclosure condition and existing protective devices can affect the work.",
            "Earthing and conductor arrangements are relevant to device selection and performance.",
            "Additional switchboard work may be needed where the existing installation cannot accept the proposed device safely.",
          ],
        },
        {
          title: "Protection has practical limits",
          copy:
            "Surge protection can reduce risk from suitable voltage transients, but it cannot guarantee protection from direct lightning effects, every surge or all equipment damage.",
          items: [
            "A surge may exceed the device rating or reach equipment through another service path.",
            "Equipment condition and internal protection still affect the outcome.",
            "Wet or storm-damaged equipment needs a safety assessment, not an assumption that the SPD made it safe.",
          ],
        },
        {
          title: "Testing, indicators and handover",
          copy:
            "After agreed installation work, the completed electrical scope is tested and the SPD position, status indication and replacement considerations are explained.",
          items: [
            "You are shown how to identify the device and its normal status indication where applicable.",
            "An end-of-life or warning indication should be referred for inspection rather than ignored.",
            "Any recommended point-of-use layer or follow-up switchboard work is recorded separately.",
          ],
        },
      ],
    },
    inspectionOutcomes: [
      "Observed switchboard condition, available space and existing protection",
      "The proposed SPD arrangement and the equipment or circuits considered",
      "Installation and test information for work completed within scope",
      "Device status guidance and any further protection layer discussed",
    ],
    inspectionLimitations: [
      "No SPD can guarantee protection from every surge, direct lightning effect or equipment failure.",
      "Concealed earthing or wiring conditions may require further testing or access.",
      "Other service paths and equipment-internal protection are outside a switchboard SPD's complete control.",
      "Scope and timing depend on switchboard compatibility, access, parts and any prerequisite work.",
    ],
    process: [
      {
        title: "Define the equipment and exposure",
        text: "The property, sensitive equipment, recent voltage events and the protection outcome being sought are discussed.",
      },
      {
        title: "Assess the installation",
        text: "Accessible switchboard space, condition, earthing arrangement and existing protection are checked for compatibility.",
      },
      {
        title: "Agree the protection layers",
        text: "A suitable switchboard SPD and any separate point-of-use considerations are explained without promising complete protection.",
      },
      {
        title: "Install, test and hand over",
        text: "Agreed electrical work is completed and tested, and the device location, indicator and limitations are explained.",
      },
    ],
    faqs: [
      {
        question: "Does surge protection stop every electrical problem?",
        answer:
          "No. It can reduce risk from suitable voltage transients but does not replace safe wiring, earthing, circuit protection or equipment-specific protection, and it cannot guarantee against every surge or lightning effect.",
      },
      {
        question: "Can surge protection be added during a switchboard upgrade?",
        answer:
          "It can be considered during an upgrade. The available space, supply, earthing, protective-device arrangement and equipment being protected still need to be assessed before selection.",
      },
      {
        question: "Is surge protection useful for businesses?",
        answer:
          "It can form part of a protection plan for controls, communications and other sensitive equipment. The appropriate layers depend on the site and connected equipment rather than the business label alone.",
      },
      {
        question: "Is a switchboard SPD the same as a plug-in surge protector?",
        answer:
          "No. A switchboard SPD protects at the distribution point, while a compatible plug-in device can add a layer for particular equipment. The two layers have different locations and limits.",
      },
      {
        question: "What should I do if the SPD warning indicator appears?",
        answer:
          "Arrange an inspection and do not assume the installation still has the intended surge-protection layer. The device condition and any cause of operation should be reviewed.",
      },
    ],
    relatedServices: [
      "switchboard-upgrades-sydney",
      "commercial-electrician-sydney",
      "residential-electrician-sydney",
      "safety-switch-rcd-installation-sydney",
    ],
  },
  {
    slug: "appliance-installation-electrician-sydney",
    metaTitle: "Appliance Installation Electrician Sydney",
    metaDescription:
      "Appliance installation electrician in Sydney for cooktops, ovens, rangehoods, dishwasher connections, isolators and dedicated circuits.",
    title: "Appliance Installation Electrician Sydney & Surrounding Regions",
    description:
      "Electrical connections, isolators and circuits for cooktops, ovens, rangehoods, dishwashers and dedicated appliances.",
    intro:
      "Kitchen and laundry appliances need the right electrical connection for safe, reliable use. Evaready Electrical installs and connects electric cooktops, ovens, rangehoods, dishwashers and dedicated appliance circuits where required.",
    heroBullets: [
      "Cooktop and oven connections",
      "Rangehood electrical installation",
      "Dishwasher electrical support",
      "Dedicated appliance circuits",
    ],
    warningSigns: [
      "An appliance needs a dedicated circuit",
      "The old isolator or outlet is damaged",
      "A cooktop or oven trips the circuit",
      "A kitchen renovation needs new wiring",
    ],
    services: [
      "Cooktop electrical connection",
      "Oven installation wiring",
      "Rangehood installation wiring",
      "Dishwasher electrical connection",
      "Appliance isolators",
      "Dedicated appliance circuits",
    ],
    process: [
      {
        title: "Check appliance details",
        text: "The appliance rating, location and manufacturer requirements are reviewed.",
      },
      {
        title: "Assess the circuit",
        text: "Existing wiring and protection are checked for suitability.",
      },
      {
        title: "Install or connect",
        text: "Approved appliance electrical work is completed neatly.",
      },
      {
        title: "Test before use",
        text: "The appliance connection and circuit are tested before completion.",
      },
    ],
    faqs: [
      {
        question: "Can you connect electric cooktops and ovens?",
        answer:
          "Yes. Electric cooktops and ovens can be connected where the circuit and isolation requirements are suitable.",
      },
      {
        question: "Do appliances need dedicated circuits?",
        answer:
          "Some appliances do. The appliance rating and existing circuit need to be checked.",
      },
      {
        question: "Can you help during a kitchen renovation?",
        answer:
          "Yes. Appliance circuits, power points, lighting and rangehood wiring can be planned during renovation work.",
      },
    ],
    relatedServices: [
      "power-point-installation-sydney",
      "residential-electrician-sydney",
      "electrical-fault-finding-sydney",
      "switchboard-upgrades-sydney",
    ],
  },
  {
    slug: "rewiring-electrician-sydney",
    metaTitle: "Rewiring Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Rewiring electrician in Sydney for old or damaged wiring assessments, partial circuit replacement, renovation wiring and complete rewire planning.",
    title: "Rewiring Electrician Sydney & Surrounding Regions",
    description:
      "Rewiring support for older homes, renovations, damaged cables and unsafe electrical wiring.",
    intro:
      "Keep clear of exposed, hot, wet or damaged wiring, and do not disturb or test conductors. Call Triple Zero (000) for fire, smoke, serious electric shock or immediate danger. Our licensed electricians assess accessible wiring and test circuits to determine whether a targeted repair, partial circuit replacement or complete rewire is appropriate; an older property does not automatically need a full rewire.",
    heroBullets: [
      "Existing wiring condition assessment",
      "Targeted or partial circuit replacement",
      "Complete rewire scope planning",
      "Renovation wiring and circuit coordination",
    ],
    warningSigns: [
      "Lights flicker across multiple rooms",
      "Outlets are cracked, loose or hot",
      "Accessible cables show damaged or deteriorated insulation",
      "Renovation work exposes wiring that appears unsafe",
    ],
    services: [
      "Accessible wiring and circuit-condition assessment",
      "Targeted damaged-cable replacement",
      "Partial circuit rewiring",
      "Complete property rewire planning",
      "Renovation and extension wiring coordination",
      "Circuit testing, identification and handover",
    ],
    serviceGuide: {
      heading: "Set the rewiring scope from inspection, testing and access.",
      intro:
        "Rewiring is not one standard job. The safe scope depends on the installation condition, test findings, circuit layout, access, renovation plans and whether the property will remain occupied during the work.",
      sections: [
        {
          title: "Assessment comes before a full-rewire decision",
          copy:
            "Age alone does not prove that every circuit needs replacement. Our licensed electricians review accessible wiring, switchboard protection, fault history and test results before recommending a scope.",
          items: [
            "A localised defect may support a targeted cable or circuit repair.",
            "Widespread deterioration or unsuitable wiring can support a broader staged or complete rewire plan.",
            "Concealed conditions cannot be confirmed until suitable access is available.",
          ],
        },
        {
          title: "Partial, staged and complete options",
          copy:
            "The work can be organised around safety priorities, renovation stages and access where the installation can remain safe between stages.",
          items: [
            "A partial rewire can replace defined circuits while suitable wiring remains in service.",
            "A staged plan can coordinate rooms or renovation zones over agreed phases.",
            "A complete rewire addresses the agreed property-wide scope but may still exclude supply, communications or non-electrical building work.",
          ],
        },
        {
          title: "Access, outages and making good",
          copy:
            "Cable routes can involve roof, wall, floor or underfloor access. Power interruptions and the amount of building disturbance depend on the existing construction and selected route.",
          items: [
            "Furniture access, occupied rooms and safe work areas are planned before work starts.",
            "Plastering, painting, carpentry and other making-good work are excluded unless specifically included in the agreed scope.",
            "Switchboard or supply-capacity work is assessed separately when the new circuit plan requires it.",
          ],
        },
        {
          title: "Circuit testing and documentation",
          copy:
            "Completed circuits are tested within the rewiring scope, identified at the switchboard and explained at handover before the project is closed.",
          items: [
            "You receive an explanation of circuits replaced, retained or left for a later stage.",
            "Outstanding access or non-electrical work is recorded for coordination.",
            "Electrical compliance documentation is provided where the completed work requires it under NSW requirements.",
          ],
        },
      ],
    },
    inspectionOutcomes: [
      "Observed condition of accessible wiring, circuits and switchboard protection",
      "A targeted, partial, staged or complete rewiring option based on findings",
      "Known access, outage and non-electrical making-good requirements",
      "Circuit test and handover information for work completed within scope",
    ],
    inspectionLimitations: [
      "Concealed wiring condition cannot be fully assessed without suitable access.",
      "Plastering, painting, carpentry and other making good are excluded unless expressly included.",
      "Supply capacity, switchboard and communications work may require separate scope decisions.",
      "Duration and staging depend on access, occupancy, construction, test findings and agreed work.",
    ],
    process: [
      {
        title: "Inspect and test",
        text: "Accessible wiring, circuit performance, switchboard protection and the reported problems are reviewed before the extent of work is decided.",
      },
      {
        title: "Define the scope",
        text: "Targeted, partial, staged or complete options are compared against safety priorities, access and renovation plans.",
      },
      {
        title: "Coordinate access and outages",
        text: "Cable routes, work areas, power interruptions and any separate making-good requirements are agreed before installation proceeds.",
      },
      {
        title: "Rewire, test and document",
        text: "Agreed electrical work is completed, circuits are tested and identified, and required compliance and handover information is provided.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my home needs rewiring?",
        answer:
          "Inspection and electrical testing are needed. Frequent faults, heat, damaged insulation, unsuitable wiring or renovation access can justify rewiring, but the property's age alone does not prove that a complete rewire is required.",
      },
      {
        question: "Can rewiring be staged?",
        answer:
          "It may be possible where the installation can remain safe between stages. The sequence depends on circuit layout, access, occupancy, renovation timing and the highest-priority defects.",
      },
      {
        question: "Is rewiring useful during renovations?",
        answer:
          "Renovation access can make it practical to assess and replace wiring, add circuits and coordinate switchboard protection. The electrical scope should still be based on testing and the final room layout.",
      },
      {
        question: "Does rewiring include plaster and paint repairs?",
        answer:
          "Not automatically. Plastering, painting, carpentry and other making-good work should be listed separately and are excluded unless the agreed scope expressly includes them.",
      },
      {
        question: "How long does a rewire take?",
        answer:
          "It depends on the number of circuits, construction, access, occupancy, staging, test findings and any switchboard or supply work. A timeframe can be discussed after the scope is inspected and agreed.",
      },
    ],
    relatedServices: [
      "residential-electrician-sydney",
      "switchboard-upgrades-sydney",
      "safety-switch-rcd-installation-sydney",
      "electrical-fault-finding-sydney",
    ],
  },
  {
    slug: "metering-services-sydney",
    metaTitle: "Metering Services Sydney & Surrounding Regions",
    metaDescription:
      "Metering services electrician in Sydney for meter support, service equipment checks, Level 2 electrical work, defect notices and supply-side enquiries.",
    title: "Metering Services Electrician Sydney & Surrounding Regions",
    description:
      "Metering support, service equipment checks and Level 2 electrical coordination for supply-side electrical issues.",
    intro:
      "Metering and service equipment sits at the point where property wiring and electricity supply requirements meet. Evaready Electrical can assess metering-related electrical issues, service equipment concerns, defect notices and upgrade enquiries.",
    credentialHighlights: [
      "Meter area checks",
      "Retailer and provider notes",
    ],
    heroBullets: [
      "Metering support",
      "Service equipment checks",
      "Defect notice assistance",
      "Smart meter preparation",
    ],
    warningSigns: [
      "A notice mentions metering or service equipment",
      "The meter area is damaged or unsafe",
      "A switchboard upgrade affects the meter area",
      "Supply work needs the right electrical process",
    ],
    services: [
      "Metering support enquiries",
      "Service equipment checks",
      "Supply-side electrical assessment",
      "Defect notice review",
      "Switchboard and meter area coordination",
      "Smart meter electrical preparation",
      "Retailer and metering provider notes review",
      "Level 2 electrical process guidance where required",
    ],
    process: [
      {
        title: "Review details",
        text: "Photos of the meter area, switchboard and any notice are reviewed.",
      },
      {
        title: "Inspect equipment",
        text: "The metering area and related electrical equipment are checked safely.",
      },
      {
        title: "Confirm pathway",
        text: "The required electrical process is explained before work proceeds.",
      },
      {
        title: "Complete and document",
        text: "Approved work is completed and documented where applicable.",
      },
    ],
    faqs: [
      {
        question: "Can you help with meter-related electrical issues?",
        answer:
          "Yes. Evaready Electrical can assess metering-related electrical concerns and explain the next actions.",
      },
      {
        question: "Is metering work always Level 2 work?",
        answer:
          "Not always, but metering and service equipment can involve Level 2 requirements depending on the job.",
      },
      {
        question: "What should I send for a metering quote?",
        answer:
          "Send photos of the meter area, switchboard, any notice or job request, and your suburb.",
      },
      {
        question: "Can you install the smart meter itself?",
        answer:
          "Smart meter installation is usually arranged through the retailer or metering provider. Evaready can help with property-side electrical preparation and issues.",
      },
      {
        question: "Can metering issues be urgent?",
        answer:
          "If the meter area or service equipment is hot, smoking, sparking, damaged or unsafe, call first before touching the area.",
      },
    ],
    relatedServices: [
      "level-2-electrician-sydney",
      "consumer-mains-sydney",
      "defect-notice-repairs-sydney",
      "smart-meter-electrician-sydney",
      "disconnect-reconnect-electrician-sydney",
      "electrical-load-capacity-checks-sydney",
      "switchboard-upgrades-sydney",
    ],
  },
  {
    slug: "new-build-renovation-electrician-sydney",
    metaTitle: "Renovation Electrician Sydney | New Builds & Fit-Offs",
    metaDescription:
      "Renovation electrician in Sydney for rough-ins, fit-offs, kitchen upgrades, bathroom wiring, lighting layouts and switchboard planning.",
    title: "New Build & Renovation Electrician Sydney & Surrounding Regions",
    description:
      "Electrical planning, rough-ins, fit-offs and upgrade work for renovations, extensions and new builds.",
    intro:
      "Renovation and new build electrical work needs planning before walls are closed and finishes go in. Evaready Electrical helps with wiring layouts, power placement, lighting, appliance circuits, switchboards and final fit-off work so the electrical side is safe, tidy and practical.",
    heroBullets: [
      "Renovation wiring and rough-ins",
      "Kitchen and bathroom electrical work",
      "Lighting and power planning",
      "Final fit-offs and testing",
    ],
    warningSigns: [
      "A renovation needs extra circuits or appliance power",
      "Old wiring is exposed during building work",
      "The switchboard may not support new loads",
      "Lighting and power locations need to be planned before plaster",
    ],
    services: [
      "New build electrical rough-ins",
      "Renovation wiring and fit-offs",
      "Kitchen and bathroom circuits",
      "Lighting layouts and switching",
      "Power point and appliance planning",
      "Switchboard upgrade advice",
    ],
    process: [
      {
        title: "Review the plan",
        text: "Plans, photos, appliance details and preferred outlet locations are checked before the work is scoped.",
      },
      {
        title: "Plan circuits",
        text: "Lighting, power, appliance and data requirements are matched to the property and switchboard capacity.",
      },
      {
        title: "Rough-in and fit-off",
        text: "Approved wiring and installation work is completed at the right stage of the build.",
      },
      {
        title: "Test and finish",
        text: "Circuits, outlets, lights and fixtures are tested before handover.",
      },
    ],
    faqs: [
      {
        question: "Can you help before renovation work starts?",
        answer:
          "Yes. Early planning helps place power, lighting, appliance circuits and switchboard upgrades before finishes are installed.",
      },
      {
        question: "Do renovations need switchboard upgrades?",
        answer:
          "Sometimes. Extra appliances, EV chargers, air conditioning or new circuits may need the existing switchboard checked.",
      },
      {
        question: "What should I send for a renovation quote?",
        answer:
          "Send plans, photos, appliance details, room list, preferred power and lighting locations, and your suburb.",
      },
    ],
    relatedServices: [
      "residential-electrician-sydney",
      "switchboard-upgrades-sydney",
      "power-point-installation-sydney",
      "lighting-electrician-sydney",
    ],
  },
  {
    slug: "electrical-testing-tagging-reports-sydney",
    metaTitle: "Electrical Testing & Tagging Sydney | Safety Reports",
    metaDescription:
      "Electrical testing, tagging and reports in Sydney for safety checks, property managers, businesses, rentals, fault notes and electrical compliance support.",
    title: "Electrical Testing, Tagging & Reports Sydney & Surrounding Regions",
    description:
      "Electrical safety checks, testing, tagging and reporting support for homes, businesses, rentals and managed properties.",
    intro:
      "Testing and reporting helps owners, businesses and property managers understand what is safe, what needs repair and what should be planned next. Evaready Electrical can assist with electrical safety checks, testing, tagging and clear notes for repair or maintenance decisions.",
    heroBullets: [
      "Electrical safety checks",
      "Testing and tagging",
      "Property report support",
      "Fault and repair notes",
    ],
    warningSigns: [
      "A property needs an electrical safety check",
      "Portable equipment needs testing and tagging",
      "A manager needs clear notes after a fault",
      "A tenant or business reports an unsafe electrical issue",
    ],
    services: [
      "Testing and tagging enquiries",
      "Electrical safety inspections",
      "Rental and managed property checks",
      "Commercial electrical safety support",
      "Fault notes and repair recommendations",
      "Switchboard and circuit observations",
    ],
    process: [
      {
        title: "Confirm requirements",
        text: "The property type, equipment list, site access and reason for the check are confirmed.",
      },
      {
        title: "Inspect and test",
        text: "Relevant equipment, circuits, fixtures or switchboard areas are checked safely.",
      },
      {
        title: "Record findings",
        text: "Findings are documented clearly so owners or managers understand the next action.",
      },
      {
        title: "Plan repairs",
        text: "If issues are found, practical repair or upgrade options can be discussed.",
      },
    ],
    faqs: [
      {
        question: "Do you help with electrical safety reports?",
        answer:
          "Yes. Evaready Electrical can provide clear electrical notes and safety observations for property and maintenance decisions.",
      },
      {
        question: "Can businesses request testing and tagging?",
        answer:
          "Yes. Testing and tagging enquiries can be scoped around the equipment, location and access requirements.",
      },
      {
        question: "What information helps before a safety check?",
        answer:
          "Send the suburb, property type, photos of the concern, access notes and what the check is needed for.",
      },
    ],
    relatedServices: [
      "commercial-electrician-sydney",
      "electrical-fault-finding-sydney",
      "safety-switch-rcd-installation-sydney",
      "switchboard-upgrades-sydney",
    ],
  },
  {
    slug: "smart-home-electrician-sydney",
    metaTitle: "Smart Home Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Smart home electrician in Sydney for smart switches, lighting control, automation wiring, future-ready cabling, data points and electrical upgrades.",
    title: "Smart Home Electrician Sydney & Surrounding Regions",
    description:
      "Smart switching, automation wiring, lighting control and future-ready cabling for homes and businesses.",
    intro:
      "Smart home electrical work is best planned around the way the property is used. Evaready Electrical helps with smart switches, lighting control, data cabling, low-voltage provisions and the electrical upgrades needed to make automation cleaner and more reliable.",
    heroBullets: [
      "Smart switches and lighting control",
      "Automation wiring provisions",
      "Data and low-voltage cabling",
      "Future-ready electrical upgrades",
    ],
    warningSigns: [
      "Smart switches need a neutral or wiring check",
      "Lighting control is unreliable or poorly planned",
      "Renovation work needs future cabling",
      "Wi-Fi devices are being used where hard-wired points would be better",
    ],
    services: [
      "Smart switch installation enquiries",
      "Lighting control wiring",
      "Automation-ready cabling",
      "Data point and network provisions",
      "Low-voltage pathway planning",
      "Switchboard and circuit checks for upgrades",
    ],
    process: [
      {
        title: "Understand the setup",
        text: "Your goals, rooms, devices, switching and current wiring are reviewed.",
      },
      {
        title: "Check wiring",
        text: "Existing switches, circuits and switchboard capacity are checked before smart upgrades are planned.",
      },
      {
        title: "Install cleanly",
        text: "Approved electrical work is completed with tidy cabling and practical device placement.",
      },
      {
        title: "Test operation",
        text: "Switching, lighting and connected circuits are tested before completion.",
      },
    ],
    faqs: [
      {
        question: "Can you install smart switches?",
        answer:
          "Yes. Smart switch enquiries can be assessed by checking the existing wiring, switch locations and intended devices.",
      },
      {
        question: "Is smart wiring useful during renovations?",
        answer:
          "Yes. Renovations are a good time to add data, lighting control and future wiring provisions.",
      },
      {
        question: "What should I send for a smart home quote?",
        answer:
          "Send photos of the switchboard and switches, a room list, device details and what you want controlled.",
      },
    ],
    relatedServices: [
      "data-cabling-electrician-sydney",
      "lighting-electrician-sydney",
      "power-point-installation-sydney",
      "new-build-renovation-electrician-sydney",
    ],
  },
  {
    slug: "tv-antenna-wall-cabling-sydney",
    metaTitle: "TV, Antenna & Wall Cabling Sydney & Surrounding Regions",
    metaDescription:
      "TV, antenna and wall cabling electrician in Sydney for TV points, antenna outlets, wall-mount power, hidden cabling, media wiring and data combinations.",
    title: "TV, Antenna & Wall Cabling Sydney & Surrounding Regions",
    description:
      "TV points, antenna points, wall-mount power, hidden cabling and tidy media wiring.",
    intro:
      "TV and media wiring should look clean and work reliably. Evaready Electrical can help with TV points, antenna outlets, wall-mount power, hidden cabling and combined media or data wiring for homes, units, offices and renovations.",
    heroBullets: [
      "TV and antenna points",
      "Wall-mount power and hidden cabling",
      "Media outlet planning",
      "Data and TV combinations",
    ],
    warningSigns: [
      "A wall-mounted TV needs hidden power and cabling",
      "A room needs a new TV or antenna point",
      "Existing media wiring is messy or unsafe",
      "A renovation needs media and data outlets planned",
    ],
    services: [
      "TV point installation",
      "Antenna point installation",
      "Wall-mounted TV power",
      "Hidden media cabling",
      "Data and TV outlet combinations",
      "Renovation media wiring",
    ],
    process: [
      {
        title: "Confirm locations",
        text: "TV, cabinet, outlet and wall-mount locations are reviewed before cabling starts.",
      },
      {
        title: "Check access",
        text: "Wall type, roof space, cavity access and nearby power are checked.",
      },
      {
        title: "Install wiring",
        text: "Approved outlets, power and cabling are installed neatly.",
      },
      {
        title: "Test and tidy",
        text: "Connections are checked and the finished area is left tidy.",
      },
    ],
    faqs: [
      {
        question: "Can you add power behind a wall-mounted TV?",
        answer:
          "Yes. Wall-mounted TV power and hidden cabling can be assessed from photos of the wall, nearby outlets and access.",
      },
      {
        question: "Can TV and data cabling be done together?",
        answer:
          "Yes. It is often cleaner to plan TV, data and media cabling at the same time.",
      },
      {
        question: "What photos help with a TV cabling quote?",
        answer:
          "Send photos of the wall, existing outlets, TV location, roof or cavity access if visible, and the switchboard if new power is needed.",
      },
    ],
    relatedServices: [
      "data-cabling-electrician-sydney",
      "power-point-installation-sydney",
      "smart-home-electrician-sydney",
      "residential-electrician-sydney",
    ],
  },
  {
    slug: "intercom-access-control-electrician-sydney",
    metaTitle: "Intercom & Access Control Electrician Sydney",
    metaDescription:
      "Intercom and access control electrician in Sydney for entry systems, intercom wiring, gate provisions, strata access and security wiring.",
    title: "Intercom & Access Control Electrician Sydney & Surrounding Regions",
    description:
      "Intercom, entry, access control and security wiring support for homes, strata and commercial sites.",
    intro:
      "Entry and access systems need tidy cabling, sensible placement and safe electrical support. Evaready Electrical can assist with intercom wiring, access control provisions, gate wiring, strata entry enquiries and security-related electrical work.",
    heroBullets: [
      "Intercom wiring support",
      "Access control provisions",
      "Gate and entry system cabling",
      "Strata and commercial entry support",
    ],
    warningSigns: [
      "An intercom has stopped working or needs replacement wiring",
      "A gate or entry system needs power provisions",
      "A strata building needs access control support",
      "Security wiring needs to be planned during a renovation",
    ],
    services: [
      "Intercom wiring enquiries",
      "Access control electrical support",
      "Gate power and cabling provisions",
      "Entry system wiring",
      "Strata access support",
      "Security system electrical coordination",
    ],
    process: [
      {
        title: "Confirm the system",
        text: "The entry system, property type, access points and cabling requirements are reviewed.",
      },
      {
        title: "Check pathways",
        text: "Cable routes, power availability and wall or gate access are assessed.",
      },
      {
        title: "Complete wiring",
        text: "Approved cabling, power and connection support is completed neatly.",
      },
      {
        title: "Test and explain",
        text: "Installed electrical work is checked and any next actions are explained.",
      },
    ],
    faqs: [
      {
        question: "Can you help with intercom wiring?",
        answer:
          "Yes. Intercom wiring and replacement enquiries can be assessed for homes, strata and commercial sites.",
      },
      {
        question: "Can access control involve an electrician?",
        answer:
          "Yes. Access control often needs power, cabling pathways and coordination with the chosen entry hardware.",
      },
      {
        question: "What should I send for an intercom quote?",
        answer:
          "Send photos of the entry point, indoor station, existing wiring, gate or door area, and your suburb.",
      },
    ],
    relatedServices: [
      "cctv-security-camera-installation-sydney",
      "data-cabling-electrician-sydney",
      "commercial-electrician-sydney",
      "smart-home-electrician-sydney",
    ],
  },
  {
    slug: "storm-damage-electrician-sydney",
    metaTitle: "Storm Damage Electrician Sydney | Water-Affected Faults",
    metaDescription:
      "Storm damage electrician in Sydney for water-affected wiring, damaged fixtures, unsafe circuits, outdoor faults and make-safe support.",
    title: "Storm Damage Electrician Sydney & Surrounding Regions",
    description:
      "Urgent electrical help for storm damage, unsafe wiring, damaged equipment and emergency appliance disconnections.",
    intro:
      "Storm damage can make electrical systems unsafe quickly, especially around outdoor fixtures, water-affected wiring, damaged switchboards and appliances. Evaready Electrical can assess storm-related electrical faults and help make the affected area safer before repairs proceed.",
    serviceGuide: {
      heading: "What an electrician checks after storm damage.",
      intro:
        "A storm-damage electrical visit is about finding what became wet, loose, damaged or unsafe, isolating hazards and deciding what can be tested, repaired or returned to service. The electrical scope depends on whether the damage is inside the property, on private service equipment or part of the electricity network.",
      sections: [
        {
          title: "Water and moisture around electrical equipment",
          copy:
            "Roof leaks, wind-driven rain and flooding can affect ceiling lights, power points, junctions, outdoor fittings, appliances and switchboard areas. Equipment should stay off until the affected circuits and accessible components have been inspected and tested.",
          items: [
            "Do not touch wet switches, outlets, appliances or switchboards",
            "Do not repeatedly reset a safety switch that trips after rain",
            "Keep people and pets away from the affected area",
          ],
        },
        {
          title: "Damaged overhead and private service equipment",
          copy:
            "High winds and falling branches can affect private poles, overhead service cables and the point of attachment at a building. Stay clear of low, fallen or pulled-away cables. Public network faults must be handled by the relevant electricity network, while private and property-side electrical work may require a licensed or Level 2 electrician after the area is made safe.",
          items: [
            "Treat every fallen or low cable as live",
            "Do not move branches or debris touching electrical equipment",
            "Call emergency services or the relevant electricity network for a public powerline hazard",
          ],
        },
        {
          title: "Outdoor circuits, fittings and connected equipment",
          copy:
            "Outdoor lighting, pumps, sheds, gates, air-conditioning equipment and weather-exposed outlets can develop insulation faults or damaged connections after a storm. Testing helps identify the affected circuit instead of returning everything to service and waiting for another trip.",
          items: [
            "Note which circuit or safety switch has tripped",
            "Leave damaged outdoor equipment disconnected where it is safe to do so",
            "Take photos only from a dry, safe position",
          ],
        },
        {
          title: "Make-safe work and planned follow-up repairs",
          copy:
            "The first electrical visit may involve testing, isolating unsafe sections and disconnecting damaged equipment. Permanent repairs can then be scoped once access is safe and any roofing, tree, structural or network work affecting the electrical installation has been coordinated.",
          items: [
            "Send the suburb and a clear description of what happened",
            "Include safe photos of the switchboard and affected area",
            "Mention water entry, fallen branches, power loss, tripping, heat, smoke or sparking",
          ],
        },
      ],
    },
    heroBullets: [
      "Storm-related electrical faults",
      "Water-affected wiring and fixtures",
      "Emergency appliance disconnections",
      "Outdoor circuit safety checks",
    ],
    warningSigns: [
      "Water has entered a light, power point or switchboard",
      "Outdoor power is tripping after rain",
      "An appliance or fitting is damaged and unsafe",
      "There is heat, smoke, sparking or a burning smell after a storm",
    ],
    services: [
      "Storm damage electrical checks",
      "Water-affected fitting assessment",
      "Outdoor circuit fault finding",
      "Damaged appliance disconnection",
      "Temporary make-safe support",
      "Follow-up repairs and upgrade advice",
    ],
    process: [
      {
        title: "Treat hazards first",
        text: "If there is heat, smoke, sparking or shock risk, call directly and keep clear of the affected area.",
      },
      {
        title: "Inspect affected areas",
        text: "Outdoor circuits, fixtures, appliances and switchboard areas are checked safely.",
      },
      {
        title: "Isolate and repair",
        text: "Unsafe parts are isolated where required and approved repairs are completed.",
      },
      {
        title: "Retest before use",
        text: "The affected electrical work is tested before it is returned to normal use.",
      },
    ],
    faqs: [
      {
        question: "What should I do first after electrical storm damage?",
        answer:
          "Keep clear of wet or damaged electrical equipment and do not approach fallen or low cables. Call first for heat, smoke, sparking, electric shock risk, a burning smell or unsafe service wiring. Contact emergency services or the relevant electricity network for a public powerline hazard.",
      },
      {
        question: "Should I use power points after water damage?",
        answer:
          "No. Do not use water-damaged fixtures or outlets until they have been checked safely.",
      },
      {
        question: "Can storm damage cause safety switches to trip?",
        answer:
          "Yes. Water ingress, damaged outdoor fixtures and affected appliances can all cause tripping.",
      },
      {
        question: "What photos help with storm damage?",
        answer:
          "Send photos of the affected area, switchboard, outdoor fixtures, damaged appliance and any visible water entry if it is safe to do so.",
      },
      {
        question: "Does an electrician repair every type of storm damage?",
        answer:
          "An electrician handles the electrical inspection, testing, isolation and repair scope. Roofing, structural, tree-removal and public electricity-network work may need the relevant specialist or network provider before permanent electrical repairs can proceed.",
      },
    ],
    relatedServices: [
      "emergency-electrician-sydney",
      "electrical-fault-finding-sydney",
      "safety-switch-rcd-installation-sydney",
      "private-power-pole-sydney",
    ],
  },
  {
    slug: "electrical-load-capacity-checks-sydney",
    metaTitle: "Electrical Load Capacity Checks Sydney",
    metaDescription:
      "Electrical load and capacity checks in Sydney for EV chargers, 3 phase upgrades, workshops, commercial equipment and switchboards.",
    title: "Electrical Load & Capacity Checks Sydney & Surrounding Regions",
    description:
      "Electrical capacity checks for upgrades, 3 phase enquiries, EV charging, workshops and commercial equipment.",
    intro:
      "Before adding an EV charger, air conditioner, heat pump, workshop equipment or another substantial load, the existing installation needs a capacity assessment. Our licensed electricians review the proposed equipment, current demand, switchboard and accessible supply information. For smoke, fire, serious electric shock or immediate danger, move clear and call Triple Zero (000).",
    credentialHighlights: [
      "Load and supply review",
      "EV, aircon and equipment planning",
    ],
    heroBullets: [
      "Load and capacity checks",
      "EV charger planning",
      "3 phase upgrade enquiries",
      "Workshop and commercial equipment",
      "Aircon and heat pump loads",
    ],
    warningSigns: [
      "New equipment may need more power than the property has available",
      "Protection trips when several high-demand appliances operate together",
      "A workshop or business is adding dedicated equipment circuits",
      "The switchboard is full, damaged, outdated or shows signs of heat",
    ],
    services: [
      "Electrical load checks",
      "Capacity assessments",
      "EV charger supply planning",
      "3 phase power enquiries",
      "Commercial equipment circuits",
      "Air conditioning and heat pump load planning",
      "Consumer mains and supply capacity review",
      "Switchboard upgrade recommendations",
    ],
    serviceGuide: {
      heading: "Measure the proposed load against the installation that must supply it.",
      intro:
        "A capacity check is not a guess based on switchboard size. It combines equipment information, the way the property is used, accessible installation details and the connection limits that apply to the site.",
      sections: [
        {
          title: "What our licensed electricians inspect",
          copy:
            "We start with the equipment to be added and the property's existing electrical demand. The inspection then considers the switchboard, circuit protection, available ways and accessible information about the incoming supply.",
          items: [
            "Equipment ratings, operating pattern and simultaneous loads",
            "Switchboard condition, protection and available circuit space",
            "Existing high-demand appliances and dedicated circuits",
            "Accessible supply, metering and consumer-mains information",
          ],
        },
        {
          title: "Why capacity problems can appear",
          copy:
            "Repeated tripping or voltage symptoms can have several causes, including an overloaded circuit, a faulty appliance, poor connections or a broader supply issue. A load assessment does not assume that every symptom means the property needs a larger supply.",
          items: [
            "New equipment exceeds the capacity of an existing circuit",
            "Several loads operate at the same time",
            "The switchboard lacks suitable space or protection",
            "A fault or damaged connection is mistaken for a capacity problem",
          ],
        },
        {
          title: "Possible next steps after assessment",
          copy:
            "The result may support a dedicated circuit, load management, staged equipment operation, switchboard work or a separate connection review. Any distributor approval or supply-side work is identified before installation is committed.",
          items: [
            "Dedicated circuits sized for the proposed equipment",
            "Load control where equipment can operate at different times",
            "Switchboard changes supported by the assessment",
            "Separate network or supply process where the existing connection is insufficient",
          ],
        },
        {
          title: "Assessment limits and useful information",
          copy:
            "The assessment is based on the equipment details, access and installation information available at the time. Concealed wiring, changing usage, incomplete equipment data or distributor requirements can alter the final scope.",
          items: [
            "Provide model numbers and electrical ratings where available",
            "Explain which appliances may run at the same time",
            "Include clear switchboard and meter-area photos for initial review",
            "Do not buy major equipment solely on an unverified capacity assumption",
          ],
        },
      ],
    },
    process: [
      {
        title: "Define the proposed load",
        text: "Equipment ratings, charger details, operating patterns and other simultaneous loads are documented.",
      },
      {
        title: "Inspect and assess",
        text: "The switchboard, existing protection, accessible supply information and current installation are reviewed.",
      },
      {
        title: "Compare demand and capacity",
        text: "The proposed use is assessed against the installation so constraints, faults and viable options can be separated.",
      },
      {
        title: "Document the next scope",
        text: "The next action may be a dedicated circuit, load management, switchboard work or a separate supply process.",
      },
    ],
    faqs: [
      {
        question: "Do I need a load check before an EV charger?",
        answer:
          "It is a sensible first step because charger rating, existing demand, switchboard condition and available supply need to be considered together.",
      },
      {
        question: "Does a capacity check always mean a supply upgrade?",
        answer:
          "No. The assessment may support the existing supply, load management, a dedicated circuit or staged operation. A connection change is considered only when the measured scope requires it.",
      },
      {
        question: "What should I send for a load check quote?",
        answer:
          "Send equipment ratings, EV charger details, photos of the switchboard, property type and what new loads you want to add.",
      },
      {
        question: "Can air conditioning or heat pumps need capacity checks?",
        answer:
          "Yes. Their ratings, operating pattern, dedicated-circuit needs and interaction with other large loads should be considered before installation.",
      },
      {
        question: "Should urgent overload or burning smells be quoted online?",
        answer:
          "No. Stop using affected equipment and call first for heat, burning smells, sparking or repeated tripping. Call Triple Zero (000) for fire, serious electric shock or immediate danger.",
      },
      {
        question: "Can a load assessment diagnose repeated tripping?",
        answer:
          "It can help separate excessive demand from a circuit or equipment fault, but electrical testing is needed because tripping does not prove overload by itself.",
      },
      {
        question: "What can change the result after the assessment?",
        answer:
          "Different equipment, changed operating patterns, concealed conditions, incomplete site information or network requirements can change the final installation scope.",
      },
    ],
    relatedServices: [
      "three-phase-power-sydney",
      "ev-charger-installation-sydney",
      "consumer-mains-sydney",
      "metering-services-sydney",
      "switchboard-upgrades-sydney",
      "level-2-electrician-sydney",
    ],
  },
  {
    slug: "point-of-attachment-repairs-sydney",
    metaTitle: "Point of Attachment Repairs Sydney | Level 2 Help",
    metaDescription:
      "Point of attachment repairs in Sydney for damaged brackets, overhead supply issues, defect notices and supply-side electrical enquiries.",
    title: "Point of Attachment Repairs Sydney & Surrounding Regions",
    description:
      "Supply-side electrical support for damaged point of attachment issues, overhead supply enquiries and defect notice work.",
    intro:
      "The point of attachment is where the overhead service connects to the property. If it is damaged, loose, affected by storm damage or listed on a defect notice, Evaready Electrical can review the electrical side of the issue and explain the next action clearly.",
    credentialHighlights: [
      "Point of attachment review",
      "Overhead service and defect support",
    ],
    heroBullets: [
      "Point of attachment checks",
      "Overhead supply issues",
      "Defect notice support",
      "Supply-side electrical enquiries",
    ],
    warningSigns: [
      "The overhead service bracket looks damaged, loose or pulled away",
      "A defect notice mentions the point of attachment",
      "Storm damage has affected overhead supply equipment",
      "There is sparking, heat or visible damage near the supply connection",
    ],
    services: [
      "Point of attachment inspection and advice",
      "Damaged bracket and connection support",
      "Defect notice review",
      "Overhead service work planning",
      "Consumer mains and supply-side checks",
      "Network or retailer paperwork guidance where relevant",
    ],
    process: [
      {
        title: "Send the notice or photos",
        text: "Share photos of the point of attachment, switchboard, service line and any defect notice if it is safe to take them.",
      },
      {
        title: "Review the supply side",
        text: "The connection, consumer mains and related service equipment are checked before the scope is explained.",
      },
      {
        title: "Plan the correct pathway",
        text: "Where network or retailer requirements apply, the next action is explained without promising third-party approvals or timeframes.",
      },
      {
        title: "Complete and document",
        text: "Approved electrical work is completed, tested and documented where required for the job type.",
      },
    ],
    faqs: [
      {
        question: "Is a damaged point of attachment urgent?",
        answer:
          "It can be. If the service line looks damaged, loose, sparking or unsafe, keep clear and call directly before touching the area.",
      },
      {
        question: "Can a defect notice mention the point of attachment?",
        answer:
          "Yes. Defect notices can list point of attachment, overhead service or consumer mains issues that need the correct electrical process.",
      },
      {
        question: "What should I send for a point of attachment quote?",
        answer:
          "Send the defect notice, your suburb, photos of the overhead connection, switchboard, meter area and any visible damage if safe.",
      },
      {
        question: "Can this involve a private power pole?",
        answer:
          "Yes. Point of attachment issues can be connected to private poles, overhead service lines, consumer mains and defect notice work.",
      },
      {
        question: "Who should I call if the service line is fallen or dangerous?",
        answer:
          "Keep clear and call emergency services or the relevant distributor first if there is immediate danger, fallen lines or life-threatening risk.",
      },
    ],
    relatedServices: [
      "level-2-electrician-sydney",
      "overhead-service-lines-sydney",
      "consumer-mains-sydney",
      "defect-notice-repairs-sydney",
      "private-power-pole-sydney",
      "emergency-electrician-sydney",
    ],
  },
  {
    slug: "overhead-service-lines-sydney",
    metaTitle: "Overhead Service Lines Sydney | Level 2 Help",
    metaDescription:
      "Overhead service line support in Sydney for damaged supply lines, point of attachment issues, private poles and defect notices.",
    title: "Overhead Service Lines Sydney & Surrounding Regions",
    description:
      "Supply-side electrical support for overhead service line enquiries, storm damage, private poles and defect notice work.",
    intro:
      "Overhead service issues need careful handling because they can involve the property connection, point of attachment, private poles, consumer mains and network requirements. Evaready Electrical can review overhead service enquiries and guide the correct next action.",
    credentialHighlights: [
      "Overhead service enquiries",
      "Point of attachment and private pole links",
    ],
    heroBullets: [
      "Overhead service work planning",
      "Storm and damage checks",
      "Private pole related enquiries",
      "Defect notice support",
    ],
    warningSigns: [
      "An overhead service line has dropped, moved or looks damaged",
      "A private pole or point of attachment has storm damage",
      "A defect notice mentions overhead service equipment",
      "The supply connection looks unsafe or exposed",
    ],
    services: [
      "Overhead service line electrical enquiries",
      "Private pole and point of attachment checks",
      "Storm damage assessment",
      "Consumer mains planning",
      "Defect notice support",
      "Supply-side paperwork guidance where relevant",
    ],
    process: [
      {
        title: "Call first if unsafe",
        text: "If a line is down, exposed or close to danger, keep clear and call emergency services or the relevant distributor first.",
      },
      {
        title: "Send safe photos",
        text: "Photos of the service line, pole, point of attachment, switchboard and defect notice help the job be reviewed.",
      },
      {
        title: "Check the electrical scope",
        text: "The property-side electrical requirements are checked and explained clearly.",
      },
      {
        title: "Coordinate next actions",
        text: "Where network involvement is needed, the process is explained without overpromising approvals or attendance times.",
      },
    ],
    faqs: [
      {
        question: "Who should I call if an overhead line is down?",
        answer:
          "Keep clear and call emergency services or the relevant distributor first if there is immediate danger, fallen lines or life-threatening risk.",
      },
      {
        question: "Can overhead service work involve Level 2 electrical work?",
        answer:
          "Yes. Overhead services, consumer mains and point of attachment issues can involve Level 2 electrical processes.",
      },
      {
        question: "Can storm damage affect overhead service lines?",
        answer:
          "Yes. Storms can affect overhead service lines, private poles, brackets, fixtures and the point of attachment.",
      },
      {
        question: "What photos help with an overhead service enquiry?",
        answer:
          "Send photos of the service line, point of attachment, private pole if present, switchboard, meter area and any defect notice if it is safe.",
      },
      {
        question: "Can you guarantee network attendance times?",
        answer:
          "No. Evaready can explain and complete the property-side electrical work pathway, but network attendance and approvals depend on the relevant parties.",
      },
    ],
    relatedServices: [
      "level-2-electrician-sydney",
      "point-of-attachment-repairs-sydney",
      "private-power-pole-sydney",
      "defect-notice-repairs-sydney",
      "storm-damage-electrician-sydney",
      "consumer-mains-sydney",
      "emergency-electrician-sydney",
    ],
  },
  {
    slug: "underground-service-mains-sydney",
    metaTitle: "Underground Service Mains Sydney | Level 2 Help",
    metaDescription:
      "Underground service mains support in Sydney for supply-side faults, consumer mains, defect notices and service upgrades.",
    title: "Underground Service Mains Sydney & Surrounding Regions",
    description:
      "Supply-side electrical support for underground consumer mains, defect notices and service upgrade enquiries.",
    intro:
      "Underground service mains can be involved in renovations, supply upgrades, defect notices, damaged consumer mains and property supply issues. Evaready Electrical can review the electrical scope and explain the right pathway before work proceeds.",
    credentialHighlights: [
      "Underground supply enquiries",
      "Consumer mains and access planning",
    ],
    heroBullets: [
      "Underground service mains enquiries",
      "Consumer mains support",
      "Defect notice review",
      "Supply upgrade planning",
    ],
    warningSigns: [
      "A defect notice mentions underground service mains",
      "The property supply needs upgrade planning",
      "Consumer mains are old, damaged or undersized",
      "Excavation or renovation work may affect supply cabling",
    ],
    services: [
      "Underground consumer mains enquiries",
      "Supply-side electrical checks",
      "Defect notice support",
      "Service upgrade planning",
      "Switchboard and meter area review",
      "Coordination guidance for network requirements",
    ],
    process: [
      {
        title: "Review the paperwork",
        text: "Defect notices, retailer notes, photos and property details help determine the next electrical step.",
      },
      {
        title: "Check supply equipment",
        text: "The switchboard, meter area, consumer mains and visible service equipment are reviewed.",
      },
      {
        title: "Plan the pathway",
        text: "The job is scoped around the property type, access, trenching or supply requirements where relevant.",
      },
      {
        title: "Complete the approved work",
        text: "Approved electrical work is completed, tested and documented where required.",
      },
    ],
    faqs: [
      {
        question: "Are underground service mains the same as normal circuits?",
        answer:
          "No. Underground service mains are supply-side cabling and may involve a different process to normal final subcircuits.",
      },
      {
        question: "Can underground service mains work be needed for upgrades?",
        answer:
          "Yes. Renovations, larger loads, defect notices and supply upgrades can trigger a review of underground service mains.",
      },
      {
        question: "What details help with an underground service mains quote?",
        answer:
          "Send photos of the switchboard, meter area, any notice, property access and the reason the supply work is being reviewed.",
      },
      {
        question: "Can excavation or renovations affect underground mains?",
        answer:
          "Yes. Renovations, trenching, driveways and other site work can affect the planning and access requirements for underground service mains.",
      },
      {
        question: "Should I call if underground supply equipment looks unsafe?",
        answer:
          "Yes. If there is no power, exposed wiring, heat, smoke, sparking or water-affected equipment, call first and keep clear.",
      },
    ],
    relatedServices: [
      "level-2-electrician-sydney",
      "consumer-mains-sydney",
      "defect-notice-repairs-sydney",
      "disconnect-reconnect-electrician-sydney",
      "metering-services-sydney",
      "point-of-attachment-repairs-sydney",
      "electrical-load-capacity-checks-sydney",
    ],
  },
  {
    slug: "disconnect-reconnect-electrician-sydney",
    metaTitle: "Disconnect Reconnect Electrician Sydney",
    metaDescription:
      "Disconnect and reconnect electrician in Sydney for supply-side planning, renovations, defect notices and service equipment work.",
    title: "Disconnect & Reconnect Electrician Sydney & Surrounding Regions",
    description:
      "Electrical disconnect and reconnect planning for supply-side work, renovations, defect notices and service equipment changes.",
    intro:
      "Some jobs need a safe disconnect and reconnect process before work can proceed, especially around consumer mains, metering, major renovations or supply-side equipment. Evaready Electrical can review the job and explain the right electrical pathway.",
    credentialHighlights: [
      "Disconnect and reconnect planning",
      "Supply-side electrical pathway",
    ],
    heroBullets: [
      "Disconnect and reconnect planning",
      "Service equipment support",
      "Renovation and upgrade enquiries",
      "Defect notice related work",
    ],
    warningSigns: [
      "A renovation needs safe supply isolation",
      "A defect notice requires service equipment work",
      "Consumer mains or metering equipment need review",
      "A major upgrade cannot proceed with normal circuit isolation",
    ],
    services: [
      "Disconnect and reconnect electrical enquiries",
      "Supply-side isolation planning",
      "Consumer mains and meter area checks",
      "Renovation supply support",
      "Defect notice pathway advice",
      "Switchboard upgrade coordination",
    ],
    process: [
      {
        title: "Confirm why isolation is needed",
        text: "Share job details, photos and any paperwork so the reason for disconnect and reconnect work is clear.",
      },
      {
        title: "Review the supply setup",
        text: "The meter area, consumer mains, service equipment and switchboard are checked.",
      },
      {
        title: "Explain requirements",
        text: "Where network, retailer or Level 2 processes apply, the next actions are explained carefully.",
      },
      {
        title: "Complete the electrical work",
        text: "Approved electrical work is completed, tested and documented as required for the job.",
      },
    ],
    faqs: [
      {
        question: "When is disconnect and reconnect work needed?",
        answer:
          "It can be needed for major renovations, supply upgrades, consumer mains work, service equipment changes or defect notice repairs.",
      },
      {
        question: "Can you guarantee network timing?",
        answer:
          "No. Network or retailer attendance and approvals depend on third parties, but Evaready can explain the electrical process clearly.",
      },
      {
        question: "What should I send for disconnect and reconnect planning?",
        answer:
          "Send photos of the switchboard, meter area, service connection, any notice or paperwork, plus the suburb and job deadline.",
      },
      {
        question: "Can renovations need disconnect and reconnect planning?",
        answer:
          "Yes. Major renovations, demolition stages, switchboard work and service equipment changes may need planned isolation before work can proceed.",
      },
      {
        question: "Should I use the booking form for an unsafe supply fault?",
        answer:
          "No. If there is smoke, sparking, heat, burning smell, exposed equipment or no power, call first rather than waiting for a form response.",
      },
    ],
    relatedServices: [
      "level-2-electrician-sydney",
      "consumer-mains-sydney",
      "metering-services-sydney",
      "defect-notice-repairs-sydney",
      "underground-service-mains-sydney",
      "point-of-attachment-repairs-sydney",
      "switchboard-upgrades-sydney",
      "electrical-load-capacity-checks-sydney",
    ],
  },
  {
    slug: "pre-purchase-rental-electrical-inspections-sydney",
    metaTitle: "Pre-Purchase Electrical Inspections Sydney | Evaready",
    metaDescription:
      "Electrical condition inspections for home buyers, landlords and property managers across Sydney. Check switchboards, RCDs, outlets and visible faults.",
    title: "Pre-Purchase & Rental Electrical Inspections Sydney",
    description:
      "Electrical condition checks for home buyers, landlords, property managers, real estate agencies and owners preparing a property for sale or lease.",
    intro:
      "Evaready Electrical checks accessible electrical equipment, switchboards, safety switches, outlets, lighting and visible wiring concerns for homes being purchased, leased or managed across Sydney and surrounding regions.",
    primaryCta: "quote",
    quoteCtaLabel: "Get an Inspection Quote",
    heroBullets: [
      "Pre-purchase house electrical inspections",
      "Rental property electrical inspections",
      "Landlord and property-manager condition checks",
      "Accessible electrical testing and visible defect review",
    ],
    audiences: [
      "Home buyers before settlement",
      "Landlords preparing a rental",
      "Property managers reviewing reported faults",
      "Owners before sale",
      "Tenants with documented electrical concerns",
      "Strata or real-estate maintenance reviews",
    ],
    warningSigns: [
      "Missing or inadequate safety-switch protection",
      "Damaged outlets or switches",
      "Heat damage or burning marks",
      "Old or overcrowded switchboards",
      "Unsafe unlicensed alterations",
      "Deteriorated outdoor electrical equipment",
      "Tripping circuits",
      "Exposed or damaged accessible wiring",
      "Overloaded or unsuitable circuits",
      "Defects requiring further investigation",
    ],
    services: [
      "Switchboard condition checks",
      "Safety switch and RCD checks",
      "Circuit-breaker protection review",
      "Signs of heat or damage",
      "Power points and switches",
      "Lighting operation",
      "Visible wiring concerns",
      "Smoke-alarm electrical supply where within verified scope",
      "Outdoor electrical equipment",
      "Hot-water electrical circuits",
      "Air-conditioning circuits and isolators",
      "Meter-box condition",
      "Signs of unsafe modifications",
      "Earthing and bonding checks where appropriate",
      "Solar or battery electrical equipment only where within verified business scope",
    ],
    inspectionOutcomes: [
      "Explanation of visible and tested findings",
      "Priority safety items",
      "Photos where practical",
      "Recommendations for further investigation",
      "Quote for repair work where requested",
      "Inspection findings summary",
    ],
    inspectionLimitations: [
      "This is an electrical inspection, not a building, pest, plumbing or gas inspection.",
      "Access may limit what can be inspected.",
      "Concealed wiring cannot always be assessed without invasive work.",
      "Intermittent faults may require further testing.",
      "Inspection findings apply to conditions observed at the time.",
      "An electrical condition inspection can identify visible defects, unsafe equipment and issues found through accessible electrical testing. Concealed or intermittent defects may require further investigation.",
    ],
    process: [
      {
        title: "Request an inspection quote",
        text: "Send the property address, suburb, purpose, deadline and any known electrical concerns.",
      },
      {
        title: "Confirm scope and access",
        text: "The property type, access details, timing and agreed electrical inspection scope are confirmed before booking.",
      },
      {
        title: "Complete the agreed inspection",
        text: "Accessible electrical equipment, switchboards, safety switches, outlets, lighting and visible concerns are checked where relevant.",
      },
      {
        title: "Explain findings and next actions",
        text: "Findings are explained clearly, with repair quotes or further investigation recommendations where requested.",
      },
    ],
    callFirstBlock: {
      heading: "Call first if the property has an immediate electrical hazard",
      safetyCopy:
        "Do not wait for an inspection quote if the property has an immediate electrical hazard. Call first so the fault can be triaged safely.",
      items: [
        "Burning smell",
        "Sparking",
        "Exposed wiring",
        "Electric shock risk",
        "Smoke or heat from switchboard",
        "Water reaching electrical equipment",
        "Repeated safety-switch tripping",
        "Partial or complete power loss",
      ],
    },
    quoteChecklist: {
      heading: "What to send before booking an electrical inspection",
      urgentNote:
        "If there is burning smell, sparking, shock risk, exposed wiring, smoke, heat, water reaching electrical equipment or power loss, call first.",
      items: [
        "Property address",
        "Suburb or postcode",
        "Purchase, rental or management purpose",
        "Settlement or tenancy deadline",
        "Known electrical concerns",
        "Access details",
        "Agent or property-manager contact where relevant",
        "Switchboard photos if available",
        "Defect notices or previous reports if available",
      ],
    },
    faqs: [
      {
        question: "What is included in a pre-purchase electrical inspection?",
        answer:
          "The agreed scope can include accessible switchboards, safety switches, circuit protection, outlets, lighting, visible wiring concerns and electrical fault symptoms. The inspection scope is confirmed before booking.",
      },
      {
        question: "Is this the same as a building inspection?",
        answer:
          "No. This is an electrical condition inspection only. It is not a building, pest, structural, plumbing or gas inspection, and it does not advise on legal or property valuation matters.",
      },
      {
        question: "Can you inspect a rental property?",
        answer:
          "Yes. Evaready can help landlords, property managers, owners and tenants with agreed electrical condition checks for rental properties across Sydney and surrounding regions.",
      },
      {
        question: "Can you inspect an occupied property?",
        answer:
          "Yes, where safe access can be arranged. Access limits what can be checked, so agent, tenant or property-manager details should be provided before booking.",
      },
      {
        question: "Do I receive a written report?",
        answer:
          "Evaready can provide an inspection findings summary with visible and tested findings, priority safety items, photos where practical and recommended next actions. A formal compliance certificate is not promised unless specifically confirmed before booking.",
      },
      {
        question: "Can you quote repairs found during the inspection?",
        answer:
          "Yes. If repair work is requested, Evaready can quote electrical repairs or further investigation after the inspection findings are explained.",
      },
      {
        question: "Does the inspection find concealed wiring defects?",
        answer:
          "Not always. Concealed wiring, intermittent faults and inaccessible areas may require further investigation or invasive work. Findings apply to the conditions observed at the time.",
      },
      {
        question: "What should I send before booking?",
        answer:
          "Send the property address, suburb or postcode, purchase or rental purpose, deadline, access details, known concerns, switchboard photos and any defect notices or previous reports if available.",
      },
      {
        question: "What if there is an urgent electrical hazard?",
        answer:
          "Call first if there is burning smell, sparking, exposed wiring, shock risk, smoke or heat from the switchboard, water reaching electrical equipment, repeated tripping or power loss.",
      },
    ],
    relatedServices: [
      "electrical-safety-inspection-sydney",
      "switchboard-upgrades-sydney",
      "safety-switch-rcd-installation-sydney",
      "electrical-fault-finding-sydney",
      "smoke-alarm-electrician-sydney",
      "hot-water-system-electrician-sydney",
      "split-system-air-conditioning-sydney",
      "electrical-testing-tagging-reports-sydney",
    ],
  },
  {
    slug: "electrical-safety-inspection-sydney",
    metaTitle: "Electrical Safety Inspection Sydney",
    metaDescription:
      "Electrical safety inspection in Sydney for switchboards, safety switches, wiring, power points, lighting and visible fault risks.",
    title: "Electrical Safety Inspection Sydney & Surrounding Regions",
    description:
      "Electrical safety checks for homes, rentals, strata, commercial sites and properties with wiring or switchboard concerns.",
    intro:
      "An electrical safety inspection reviews the accessible installation and tests the items agreed for the property; it is not a guarantee that every concealed defect will be found. Our licensed electricians assess switchboards, protection, wiring and fittings relevant to the scope. For fire, serious electric shock or immediate danger, move clear and call Triple Zero (000).",
    heroBullets: [
      "Switchboard and safety checks",
      "Wiring and outlet review",
      "Rental, strata and property support",
      "Clear next actions before work begins",
    ],
    warningSigns: [
      "Safety switches keep tripping",
      "Power points are hot, cracked or buzzing",
      "Lights flicker or dim unexpectedly",
      "There is damaged wiring, moisture exposure or a burning smell",
    ],
    services: [
      "Switchboard safety inspection",
      "Safety switch and RCD checks",
      "Power point and lighting review",
      "Visible wiring condition checks",
      "Rental, strata and property manager support",
      "Clear findings and repair priorities within the agreed scope",
    ],
    serviceGuide: {
      heading: "Set an inspection scope that matches the property and concern.",
      intro:
        "A useful inspection starts with why the check is needed: a fault symptom, older installation, property handover, planned renovation or routine safety review. That purpose determines what is inspected, tested and reported.",
      sections: [
        {
          title: "What our licensed electricians inspect",
          copy:
            "The agreed inspection can cover the main switchboard, protective devices, accessible wiring, outlets, switches, lighting and relevant fixed equipment. Testing is selected for the circuits and symptoms within scope.",
          items: [
            "Switchboard condition, labelling and accessible terminations",
            "Circuit breakers, safety switches and other installed protection",
            "Accessible power points, switches, lighting and fixed wiring",
            "Reported heat, tripping, flicker, damage or moisture symptoms",
          ],
        },
        {
          title: "Findings that may require action",
          copy:
            "An inspection may identify damaged accessories, unsuitable protection, deteriorated accessible wiring, poor connections or a fault that needs further isolation. Older equipment alone does not prove that a complete rewire or switchboard replacement is required.",
          items: [
            "Immediate electrical hazards that need isolation or make-safe work",
            "Repairs supported by inspection or test results",
            "Further fault finding where the source is not yet isolated",
            "Planned improvements separated from urgent safety work",
          ],
        },
        {
          title: "Inspection process and communication",
          copy:
            "We confirm access and the inspection scope, complete the agreed visual checks and electrical tests, then explain the findings in practical terms. Repair work outside the inspection is quoted before it proceeds unless urgent make-safe work is authorised.",
          items: [
            "Property history and reported symptoms reviewed first",
            "Accessible equipment inspected without unsafe customer intervention",
            "Relevant circuits and protective devices tested",
            "Urgent, further-investigation and planned items distinguished",
          ],
        },
        {
          title: "What a safety inspection does not cover automatically",
          copy:
            "The inspection is limited by access, the agreed scope and conditions on the day. It does not automatically include destructive investigation, every concealed cable, specialist building advice, appliance certification or a guarantee against future faults.",
          items: [
            "Inaccessible or concealed conditions may need a separate investigation",
            "Building, fire, gas and legal advice remain separate scopes",
            "Testing describes conditions at the time it is performed",
            "Any requested report format should be agreed before the visit",
          ],
        },
      ],
    },
    process: [
      {
        title: "Confirm the concern",
        text: "Share the property type, relevant history, symptoms and reason for the safety check so the scope is clear.",
      },
      {
        title: "Inspect and test",
        text: "Relevant circuits, protection, outlets and fixtures are checked safely.",
      },
      {
        title: "Explain findings",
        text: "The results are explained in practical terms, separating urgent risks, further investigation and planned work.",
      },
      {
        title: "Quote repair work",
        text: "If repairs or upgrades are needed, the scope can be quoted before work proceeds.",
      },
    ],
    faqs: [
      {
        question: "What does an electrical safety inspection include?",
        answer:
          "The agreed scope can include switchboards, protective devices, accessible wiring, power points, lighting, fixed equipment and tests relevant to reported symptoms.",
      },
      {
        question: "Should I call if something feels unsafe?",
        answer:
          "Yes. Stop using affected equipment and call first for heat, smoke, sparking, burning smells or shock risk. Call Triple Zero (000) for fire, serious electric shock or immediate danger.",
      },
      {
        question: "Can safety inspections help before buying or renting?",
        answer:
          "They can identify accessible electrical conditions within an agreed scope, but they do not replace a building inspection, legal advice or investigation of inaccessible parts.",
      },
      {
        question: "Will an inspection find every hidden electrical defect?",
        answer:
          "No. Concealed wiring and inaccessible equipment cannot always be assessed without further investigation, and testing only describes conditions at the time of the inspection.",
      },
      {
        question: "Does older wiring automatically mean a full rewire?",
        answer:
          "No. Age is context, not a diagnosis. Condition, test results, alterations, protection and the intended use of the installation must be assessed before work is recommended.",
      },
      {
        question: "Can repairs be completed during the inspection?",
        answer:
          "Urgent make-safe work or minor agreed repairs may be possible, but broader repairs and upgrades are scoped and authorised separately before they proceed.",
      },
    ],
    relatedServices: [
      "switchboard-upgrades-sydney",
      "electrical-fault-finding-sydney",
      "safety-switch-rcd-installation-sydney",
      "smoke-alarm-electrician-sydney",
      "testing-and-tagging-sydney",
    ],
  },
  {
    slug: "testing-and-tagging-sydney",
    metaTitle: "Testing and Tagging Sydney | Electrical Safety",
    metaDescription:
      "Testing and tagging in Sydney for workplaces, managed properties, appliances, safety checks and clear electrical records.",
    title: "Testing and Tagging Sydney & Surrounding Regions",
    description:
      "Testing and tagging support for workplaces, managed sites, appliances and practical electrical safety records.",
    intro:
      "Testing and tagging helps workplaces and managed sites keep portable electrical equipment checks organised. Evaready Electrical can assist with testing, tagging, safety checks and related electrical notes for homes, businesses, strata and managed properties.",
    heroBullets: [
      "Testing and tagging",
      "Workplace electrical safety checks",
      "Managed property support",
      "Clear records where required",
    ],
    warningSigns: [
      "Appliances are damaged, frayed or overheating",
      "Equipment is used on a worksite or commercial premises",
      "A property manager needs electrical records",
      "Portable equipment has not been checked recently",
    ],
    services: [
      "Testing and tagging for portable equipment",
      "Appliance lead and plug checks",
      "Commercial and managed property support",
      "Electrical safety observations",
      "Tagging records where required",
      "Follow-up repairs or circuit checks",
    ],
    process: [
      {
        title: "List the equipment",
        text: "Share the site type, suburb and approximate number of items so the booking can be planned.",
      },
      {
        title: "Check and tag",
        text: "Relevant equipment is checked and tagged in line with the agreed scope.",
      },
      {
        title: "Record results",
        text: "Results and any failed or unsafe items are recorded clearly.",
      },
      {
        title: "Plan repairs",
        text: "If repair work is needed, the next action can be quoted separately.",
      },
    ],
    faqs: [
      {
        question: "Do you provide testing and tagging for businesses?",
        answer:
          "Yes. Evaready Electrical can assist workplaces, shops, offices and managed sites with testing and tagging enquiries.",
      },
      {
        question: "Can you repair items that fail testing?",
        answer:
          "Electrical repair work can be reviewed separately where it is safe and practical to do so.",
      },
      {
        question: "What should I send for a testing and tagging quote?",
        answer:
          "Send the suburb, site type, approximate number of items and any access requirements for the property.",
      },
    ],
    relatedServices: [
      "electrical-testing-tagging-reports-sydney",
      "commercial-electrician-sydney",
      "electrical-safety-inspection-sydney",
      "emergency-exit-lighting-sydney",
    ],
  },
  {
    slug: "phone-line-electrician-sydney",
    metaTitle: "Phone Line Electrician Sydney | Cabling Help",
    metaDescription:
      "Phone line electrician in Sydney for internal phone outlets, communications cabling, data points and cabling fault support.",
    title: "Phone Line Electrician Sydney & Surrounding Regions",
    description:
      "Internal phone outlet, communications cabling and data point support under the relevant cabling scope.",
    intro:
      "Phone and communications cabling can be affected by renovations, damaged outlets, older cabling and internet changes. Evaready Electrical can assist with eligible internal phone line and communications cabling work under the relevant cabling scope.",
    heroBullets: [
      "Internal phone outlets",
      "Communications cabling",
      "Data and internet points",
      "Open Cabler registration",
    ],
    warningSigns: [
      "A phone outlet is damaged or loose",
      "Renovation work has affected communications cabling",
      "A room needs a phone or data outlet moved",
      "Old cabling needs to be checked before new equipment is installed",
    ],
    services: [
      "Internal phone outlet support",
      "Communications cabling enquiries",
      "Data and internet point planning",
      "Outlet replacement or relocation",
      "CCTV and data cabling coordination",
      "Cabling fault review where eligible",
    ],
    process: [
      {
        title: "Confirm the cabling need",
        text: "Share photos of the outlet, equipment, wall location and suburb so the job can be assessed.",
      },
      {
        title: "Check cable pathways",
        text: "Access, wall cavities, ceiling spaces and existing cabling are reviewed where practical.",
      },
      {
        title: "Complete eligible work",
        text: "Approved internal cabling and outlet work is completed under the relevant cabling scope.",
      },
      {
        title: "Test and explain",
        text: "The completed work is checked and any carrier or provider issue is explained clearly.",
      },
    ],
    faqs: [
      {
        question: "Can you work on phone line cabling?",
        answer: `Evaready Electrical can assist with eligible internal phone and communications cabling under ${approvedBusinessClaims.credentials.openCabler.approvedWording}.`,
      },
      {
        question: "Do carrier network faults need the provider?",
        answer:
          "Sometimes. Carrier-side faults, lead-in issues or provider equipment may need the telecommunications provider.",
      },
      {
        question: "What photos help with a phone line quote?",
        answer:
          "Send photos of the outlet, modem or phone equipment, the room location, access points and any damaged cabling.",
      },
    ],
    credentialHighlights: [approvedBusinessClaims.credentials.openCabler.approvedWording],
    relatedServices: [
      "data-cabling-electrician-sydney",
      "cctv-security-camera-installation-sydney",
      "intercom-installation-sydney",
      "tv-points-antenna-electrician-sydney",
    ],
  },
  {
    slug: "intercom-installation-sydney",
    metaTitle: "Intercom Installation Sydney | Electrician",
    metaDescription:
      "Intercom installation electrician in Sydney for homes, strata, entry systems, gate cabling and access control support.",
    title: "Intercom Installation Electrician Sydney & Surrounding Regions",
    description:
      "Intercom installation, entry system wiring and access control electrical support for homes, strata and commercial sites.",
    intro:
      "A reliable intercom setup needs the right power, cabling pathway and entry-point planning. Evaready Electrical can assist with intercom installation wiring, replacement support, gate provisions and access control electrical work.",
    heroBullets: [
      "Intercom installation wiring",
      "Gate and entry provisions",
      "Strata entry support",
      "Access control electrical work",
    ],
    warningSigns: [
      "An old intercom needs replacement wiring",
      "A front gate or entry system needs power",
      "A strata building needs entry cabling reviewed",
      "Renovation work needs intercom provisions planned early",
    ],
    services: [
      "Intercom installation electrical support",
      "Entry system wiring",
      "Gate power and cabling provisions",
      "Access control wiring support",
      "Strata and commercial entry assistance",
      "Coordination with selected hardware where needed",
    ],
    process: [
      {
        title: "Review entry points",
        text: "Photos of the gate, doorway, indoor station and existing wiring help plan the job.",
      },
      {
        title: "Check power and pathways",
        text: "Cable routes, power availability and access through walls or ceilings are reviewed.",
      },
      {
        title: "Install wiring",
        text: "Approved wiring and electrical support are completed neatly.",
      },
      {
        title: "Test and hand over",
        text: "The electrical work is checked and any hardware or commissioning notes are explained.",
      },
    ],
    faqs: [
      {
        question: "Can you install intercom cabling?",
        answer:
          "Yes. Evaready Electrical can assist with intercom wiring, power and cabling support for homes, strata and commercial entry systems.",
      },
      {
        question: "Can you help with electric gate power?",
        answer:
          "Yes. Gate power and cabling provisions can be reviewed as part of the intercom or access control work.",
      },
      {
        question: "What should I send for an intercom quote?",
        answer:
          "Send photos of the entry point, internal monitor area, existing wiring, gate or door hardware and your suburb.",
      },
    ],
    relatedServices: [
      "intercom-access-control-electrician-sydney",
      "data-cabling-electrician-sydney",
      "cctv-security-camera-installation-sydney",
      "phone-line-electrician-sydney",
    ],
  },
  {
    slug: "tv-points-antenna-electrician-sydney",
    metaTitle: "TV Points & Antenna Electrician Sydney",
    metaDescription:
      "TV points and antenna electrician in Sydney for TV outlets, wall cabling, media points, antenna cabling and tidy power support.",
    title: "TV Points & Antenna Electrician Sydney & Surrounding Regions",
    description:
      "TV points, antenna outlets, wall cabling and tidy media electrical support for homes, apartments and renovations.",
    intro:
      "TV and media areas work best when power, outlets and cabling are planned together. Evaready Electrical can assist with TV points, antenna outlets, wall-mount power, hidden cabling and tidy media setups.",
    heroBullets: [
      "TV points and antenna outlets",
      "Wall-mount power and cabling",
      "Media room wiring",
      "Renovation cabling support",
    ],
    warningSigns: [
      "A room needs a new TV or antenna point",
      "A wall-mounted TV needs safe power nearby",
      "Existing media cabling is loose, damaged or messy",
      "Renovation work needs TV and data cabling planned",
    ],
    services: [
      "TV point installation",
      "Antenna outlet support",
      "Wall-mount power points",
      "Hidden media cabling",
      "Data and TV cabling coordination",
      "Renovation cabling provisions",
    ],
    process: [
      {
        title: "Confirm the room layout",
        text: "Share photos of the wall, TV position, nearby outlets and roof or wall access if known.",
      },
      {
        title: "Plan cable routes",
        text: "Power, antenna and data pathways are reviewed so the finish can be kept neat.",
      },
      {
        title: "Install outlets",
        text: "Approved outlets and cabling are installed with safe power separation where required.",
      },
      {
        title: "Check the finish",
        text: "The final setup is checked and any device-specific next actions are explained.",
      },
    ],
    faqs: [
      {
        question: "Can you install TV points?",
        answer:
          "Yes. Evaready Electrical can assist with TV points, antenna outlets, wall cabling and nearby power points.",
      },
      {
        question: "Can you hide cables for a wall-mounted TV?",
        answer:
          "Yes. Hidden cabling and safe wall-mount power can be reviewed based on wall type and access.",
      },
      {
        question: "What photos help with a TV point quote?",
        answer:
          "Send photos of the wall, existing outlets, TV location, roof or ceiling access and any current antenna point.",
      },
    ],
    relatedServices: [
      "tv-antenna-wall-cabling-sydney",
      "data-cabling-electrician-sydney",
      "power-point-installation-sydney",
      "phone-line-electrician-sydney",
    ],
  },
  {
    slug: "emergency-exit-lighting-sydney",
    metaTitle: "Emergency Exit Lighting Sydney | Electrician",
    metaDescription:
      "Emergency and exit lighting electrician in Sydney for commercial sites, testing support, replacements and safety lighting checks.",
    title: "Emergency & Exit Lighting Electrician Sydney & Surrounding Regions",
    description:
      "Emergency and exit lighting electrical support for shops, offices, strata, warehouses and commercial sites.",
    intro:
      "Emergency lighting supports visibility when normal lighting fails, while exit signs help people identify exits and paths of travel. Our licensed electricians inspect and test the electrical installation within the agreed building scope. During a fire or evacuation, follow the site emergency plan, move to safety and call Triple Zero (000); do not wait for a service booking.",
    heroBullets: [
      "Emergency lighting checks",
      "Exit light replacement",
      "Commercial and strata support",
      "Testing records where required",
    ],
    warningSigns: [
      "Exit lights are flickering, damaged or not illuminated",
      "A fitting does not operate during an emergency-lighting test",
      "Indicators, batteries, diffusers or housings are damaged",
      "Renovation work has changed paths of travel or exits",
    ],
    services: [
      "Emergency lighting electrical support",
      "Exit sign and emergency fitting replacement where suitable",
      "Battery, indicator and fitting checks",
      "Commercial and strata lighting reviews",
      "Functional testing and maintenance-record support",
      "Circuit fault finding and repair options",
    ],
    serviceGuide: {
      heading: "Keep evacuation lighting visible, testable and matched to the building.",
      intro:
        "Emergency and exit lighting is a life-safety system, not ordinary decorative lighting. Building class, layout, paths of travel, fire-safety schedules and previous records can affect the required scope.",
      sections: [
        {
          title: "What our licensed electricians inspect",
          copy:
            "We inspect the accessible emergency and exit fittings included in the agreed scope, their normal supply, indicators, batteries, mounting and visible condition. Functional or discharge testing is planned around site operations and applicable maintenance requirements.",
          items: [
            "Exit sign visibility, illumination and physical condition",
            "Emergency fitting operation when normal supply is interrupted",
            "Battery, charge indicator and fitting condition",
            "Relevant circuits, local damage and available maintenance records",
          ],
        },
        {
          title: "Common faults and possible causes",
          copy:
            "A dark, flickering or failed fitting may involve a battery, light source, control gear, normal supply, circuit fault or physical damage. One failed item does not establish the condition of the complete system.",
          items: [
            "Battery no longer supports the required test operation",
            "Damaged fitting, diffuser, indicator or internal component",
            "Loss of normal supply or a circuit fault",
            "Building changes that leave signs or lighting poorly positioned",
          ],
        },
        {
          title: "Repair, replacement and test process",
          copy:
            "After the site scope and access are confirmed, fittings and circuits are tested, failed items are identified and electrical repair or replacement options are documented. Work is retested and the result is recorded within the agreed maintenance scope.",
          items: [
            "Plan testing to manage access and operational disruption",
            "Identify failed fittings separately from circuit faults",
            "Use suitable replacement equipment for the approved scope",
            "Record completed work and outstanding actions clearly",
          ],
        },
        {
          title: "Building and compliance limits",
          copy:
            "An electrical service visit does not redesign an evacuation path, certify every fire-safety measure or replace advice from the building's fire-safety, design or certifying professionals. Required locations and test obligations depend on the building and applicable documents.",
          items: [
            "Provide fire-safety schedules and prior records where available",
            "Keep exits and paths of travel unobstructed",
            "Agree whether the work covers selected fittings or the complete system",
            "Treat design changes and certification as separate scopes",
          ],
        },
      ],
    },
    process: [
      {
        title: "Confirm site requirements",
        text: "Share the building use, areas in scope, fitting count and any fire-safety schedule, test record or defect note available.",
      },
      {
        title: "Check fixtures and circuits",
        text: "The included fittings, normal supply, batteries, indicators and relevant circuits are inspected and tested.",
      },
      {
        title: "Repair or replace",
        text: "Approved repairs, replacements or wiring work are completed neatly.",
      },
      {
        title: "Record next actions",
        text: "Completed work, test results, failed items and any separate design or compliance actions are recorded clearly.",
      },
    ],
    faqs: [
      {
        question: "Do commercial sites need emergency and exit lighting?",
        answer:
          "Many buildings and common areas do, but the exact requirement depends on building class, layout, paths of travel and applicable fire-safety documents. The electrical scope should be matched to those requirements.",
      },
      {
        question: "Can you replace failed exit lights?",
        answer:
          "Yes. The fitting and supply should be checked first so a suitable replacement and any related circuit repair can be scoped.",
      },
      {
        question: "What should I send for an emergency lighting quote?",
        answer:
          "Send the suburb, building use, areas in scope, approximate fitting count, clear photos and any fire-safety schedule, defect note or maintenance record available.",
      },
      {
        question: "Why can an emergency light fail a test?",
        answer:
          "Possible causes include a failed battery, damaged fitting, control-gear fault, loss of normal supply or a circuit problem. Testing is needed before the cause is confirmed.",
      },
      {
        question: "Does replacing one failed fitting certify the whole system?",
        answer:
          "No. The result applies to the equipment and testing within the agreed scope. Other fittings, evacuation design and fire-safety measures remain separate unless expressly included.",
      },
      {
        question: "What should occupants do during an actual emergency?",
        answer:
          "Follow the site's emergency procedures, leave by the safe directed route and call Triple Zero (000) for fire or immediate danger. Do not delay evacuation to report a lighting fault.",
      },
    ],
    relatedServices: [
      "commercial-electrician-sydney",
      "electrical-safety-inspection-sydney",
      "testing-and-tagging-sydney",
      "switchboard-upgrades-sydney",
    ],
  },
  {
    slug: "hot-power-point-electrician-sydney",
    metaTitle: "Hot Power Point Electrician Sydney",
    metaDescription:
      "Hot power point electrician in Sydney for warm outlets and burning smells, buzzing sockets, damaged wiring and urgent fault checks.",
    title: "Hot Power Point Electrician Sydney & Surrounding Regions",
    description:
      "Urgent electrical fault support for overheating power points and burning smells, buzzing sockets and unsafe power point concerns.",
    intro:
      "Stop using a hot, discoloured, buzzing, smoking, sparking or damaged power point. Do not touch or unplug equipment if it is unsafe; move clear and call Triple Zero (000) for fire, smoke, serious electric shock or immediate danger. Our licensed electricians inspect the outlet, connected equipment, circuit wiring and protection before discussing repair or replacement options.",
    heroBullets: [
      "Heat, discolouration or burning smells",
      "Buzzing, crackling or sparking sockets",
      "Outlet, circuit and connection testing",
      "Repair or replacement after inspection",
    ],
    warningSigns: [
      "A power point or plug feels unusually warm or hot",
      "There is a burning smell near an outlet",
      "A plug or socket is discoloured",
      "The outlet buzzes, crackles or sparks",
    ],
    services: [
      "Immediate safety assessment of the affected outlet",
      "Power point, plug and accessible connection checks",
      "Circuit load and fixed-wiring testing",
      "Damaged outlet repair or replacement options",
      "Heat-damaged cable assessment where accessible",
      "Switchboard protection checks where relevant",
    ],
    serviceGuide: {
      heading: "Treat outlet heat as a symptom that needs testing.",
      intro:
        "A warm or hot outlet can involve the power point, a loose connection, connected equipment, circuit loading or heat-damaged wiring. The visible outlet alone does not establish the cause or the safe repair scope.",
      sections: [
        {
          title: "What to do before an electrician arrives",
          copy:
            "Stop using the affected outlet and keep people away from it. Do not touch, unplug or test anything that is hot, smoking, sparking, wet or visibly damaged.",
          items: [
            "Move clear and call 000 for active fire, smoke, serious electric shock or immediate danger.",
            "Do not remove the faceplate, insert a tester or attempt an internal repair.",
            "Only unplug equipment when the plug and outlet are cool, undamaged and clearly safe to handle.",
          ],
        },
        {
          title: "Possible causes are checked, not assumed",
          copy:
            "Heat may come from worn contacts, a loose termination, damaged wiring, a high electrical load or a problem with connected equipment.",
          items: [
            "The outlet and plug condition can show where heat has been concentrated.",
            "Circuit testing helps distinguish an outlet fault from a wider wiring or loading issue.",
            "Switchboard protection is checked where the symptom or test results make it relevant.",
          ],
        },
        {
          title: "Repair versus replacement",
          copy:
            "Our licensed electricians explain the findings before agreed work proceeds. Replacing the faceplate alone may not be enough if a connection, cable or appliance has also been heat damaged.",
          items: [
            "A defective outlet may be replaced when the circuit and cable remain suitable.",
            "Damaged cable or connections can require a broader repair and additional access.",
            "A suspected appliance or plug fault may need separate appliance assessment.",
          ],
        },
        {
          title: "Retesting before reuse",
          copy:
            "The completed electrical work is tested within its scope before the outlet is returned to service, or the circuit remains isolated if it is not safe to restore.",
          items: [
            "You are told what was repaired or replaced and what remains outside the electrical scope.",
            "Any further cable access, appliance check or switchboard work is identified.",
            "Do not reuse the outlet until the electrician confirms the completed electrical work is ready for service.",
          ],
        },
      ],
    },
    inspectionOutcomes: [
      "Observed outlet, plug, circuit and accessible connection condition",
      "Test findings that guide repair, replacement or further investigation",
      "Confirmation that the outlet was restored or the affected circuit left isolated",
      "Any follow-up cable, appliance or switchboard work identified",
    ],
    inspectionLimitations: [
      "Concealed heat damage cannot be ruled out where wiring is inaccessible.",
      "A connected appliance or plug fault may need assessment outside the fixed-wiring scope.",
      "Repair extent depends on test results, access and the condition of surrounding materials.",
      "The outlet must remain unused if the circuit cannot be made safe within the agreed visit scope.",
    ],
    process: [
      {
        title: "Make the area safe",
        text: "Stop using the power point immediately, leave unsafe equipment untouched, and call Triple Zero (000) first for fire, smoke, serious electric shock or immediate danger.",
      },
      {
        title: "Inspect the heat path",
        text: "The outlet, plug, connected load and accessible wiring are checked for discolouration, damage and signs of overheating.",
      },
      {
        title: "Test the circuit",
        text: "Electrical testing is used to assess connections, circuit condition, loading and protection before a repair option is selected.",
      },
      {
        title: "Repair, isolate and explain",
        text: "Agreed work is completed and retested, or the circuit remains isolated while further access, parts or appliance assessment is arranged.",
      },
    ],
    faqs: [
      {
        question: "Is a hot power point dangerous?",
        answer:
          "It can be. Heat and burning smells, crackling or discolouration should be treated as unsafe until checked.",
      },
      {
        question: "Should I keep using a warm outlet?",
        answer:
          "No. Stop using a hot, discoloured, buzzing, smoking, sparking or damaged outlet. Do not touch or unplug unsafe equipment, and call 000 for fire, smoke, serious shock or immediate danger.",
      },
      {
        question: "Can a hot outlet be caused by overload?",
        answer:
          "It can. Circuit loading is one possible cause, alongside worn contacts, loose connections, damaged wiring and faults in the outlet, plug or connected equipment. Testing is needed before deciding.",
      },
      {
        question: "Does the power point always need replacement?",
        answer:
          "Not always. The outlet may need replacement, but the circuit, cable, plug and connected equipment should also be considered so hidden heat damage or another cause is not missed.",
      },
      {
        question: "Can I remove the outlet cover to check it?",
        answer:
          "No. Do not remove a faceplate or attempt an internal electrical inspection. Keep the outlet unused and arrange licensed electrical testing.",
      },
    ],
    relatedServices: [
      "emergency-electrician-sydney",
      "electrical-fault-finding-sydney",
      "power-point-installation-sydney",
      "switchboard-upgrades-sydney",
    ],
  },
  {
    slug: "electric-shock-electrician-sydney",
    metaTitle: "Electric Shock Electrician Sydney",
    metaDescription:
      "Electric shock electrician in Sydney for shock risk, tingles from outlets, appliances, wet fixtures and urgent safety checks.",
    title: "Electric Shock Electrician Sydney & Surrounding Regions",
    description:
      "Urgent electrical safety support for shock risk, tingles, wet fixtures, faulty appliances and unsafe circuits.",
    intro:
      "Any electric shock or tingling from an outlet, appliance, switch, tap, pool area or fitting should be treated seriously. Keep clear of the affected item and call first so the fault can be handled safely.",
    heroBullets: [
      "Electric shock risk",
      "Tingles from outlets or fixtures",
      "Wet or damaged electrical equipment",
      "Call first for unsafe faults",
    ],
    warningSigns: [
      "A switch, tap, appliance or outlet gives a tingle",
      "Water has reached electrical equipment",
      "A safety switch has tripped after shock risk",
      "There is burning smell, smoke, heat or sparking",
    ],
    services: [
      "Electric shock fault checks",
      "Safety switch and RCD testing",
      "Wet area electrical assessment",
      "Appliance and circuit isolation",
      "Damaged wiring investigation",
      "Switchboard protection review",
    ],
    process: [
      {
        title: "Keep clear",
        text: "Do not touch affected equipment again. For life-threatening danger, call emergency services first.",
      },
      {
        title: "Call directly",
        text: "Electric shock risk should be handled by phone first, not through a delayed form response.",
      },
      {
        title: "Test safely",
        text: "The affected circuit, protection and likely fault source are tested safely.",
      },
      {
        title: "Repair and verify",
        text: "Approved repairs are completed and safety protection is checked before normal use resumes.",
      },
    ],
    faqs: [
      {
        question: "What should I do after an electric shock?",
        answer:
          "Keep clear of the affected item. If anyone is injured or there is life-threatening danger, call emergency services first.",
      },
      {
        question: "Can a safety switch prevent electric shock?",
        answer:
          "Safety switches reduce risk by disconnecting power in certain fault conditions, but they do not make unsafe wiring safe.",
      },
      {
        question: "Should I use a form for electric shock faults?",
        answer:
          "No. Call directly for electric shock risk, tingles, wet fixtures, smoke, heat or sparking.",
      },
    ],
    relatedServices: [
      "emergency-electrician-sydney",
      "electrical-fault-finding-sydney",
      "safety-switch-rcd-installation-sydney",
      "switchboard-upgrades-sydney",
    ],
  },
  {
    slug: "circuit-breaker-electrician-sydney",
    metaTitle: "Circuit Breaker Electrician Sydney",
    metaDescription:
      "Circuit breaker electrician in Sydney for tripping breakers, overloaded circuits, switchboard faults and circuit protection checks.",
    title: "Circuit Breaker Electrician Sydney & Surrounding Regions",
    description:
      "Circuit breaker fault checks, replacement support and switchboard protection reviews for homes and businesses.",
    intro:
      "A circuit breaker that trips is responding to overcurrent or a fault condition, but repeated tripping does not reveal the cause by itself. Do not keep resetting it. Our licensed electricians test the affected circuit, connected loads and switchboard protection. For fire, serious electric shock or immediate danger, move clear and call Triple Zero (000).",
    heroBullets: [
      "Circuit breaker tripping",
      "Overloaded circuit checks",
      "Switchboard fault support",
      "RCBO and protection upgrades",
    ],
    warningSigns: [
      "A circuit breaker trips repeatedly",
      "A breaker feels hot, loose or damaged",
      "There is a burning smell, buzzing or discolouration at the switchboard",
      "One circuit fails when particular equipment is used",
    ],
    services: [
      "Circuit breaker fault finding",
      "Breaker replacement where suitable",
      "Overload and load checks",
      "Switchboard protection review",
      "RCBO upgrade advice",
      "Circuit labelling and testing",
    ],
    serviceGuide: {
      heading: "Treat repeated breaker operation as a symptom, not a diagnosis.",
      intro:
        "A breaker may operate because of excessive load, a short circuit, damaged wiring, faulty equipment or a problem within the protective device. Safe testing is needed before repair or replacement is chosen.",
      sections: [
        {
          title: "What our licensed electricians inspect",
          copy:
            "We identify the affected circuit and review the breaker, switchboard condition, connected equipment and accessible wiring relevant to the fault. Test results guide whether the issue is load-related, equipment-related or within the fixed wiring.",
          items: [
            "Breaker condition, rating, connections and circuit identification",
            "Connected loads and when the tripping occurs",
            "Accessible circuit wiring and signs of heat or moisture",
            "Related safety-switch or RCBO operation where installed",
          ],
        },
        {
          title: "Circuit breakers and safety switches do different jobs",
          copy:
            "A circuit breaker primarily protects wiring against overcurrent. A safety switch responds to certain leakage-to-earth conditions to reduce electric-shock risk. Some RCBO devices combine both functions, so the device and trip behaviour must be identified correctly.",
          items: [
            "A breaker trip does not prove the breaker itself is faulty",
            "A safety switch is not simply another name for every circuit breaker",
            "Replacement protection must suit the circuit and switchboard",
            "No protective device makes damaged wiring safe to ignore",
          ],
        },
        {
          title: "Possible repairs after testing",
          copy:
            "The right action may be repairing a circuit fault, removing a damaged item from service, redistributing or reducing load, replacing a defective breaker, or planning broader switchboard work. Replacement is not automatic.",
          items: [
            "Repair damaged wiring or connections within the agreed scope",
            "Address equipment faults separately from fixed-wiring faults",
            "Replace a protective device only when suitable and supported by testing",
            "Plan a dedicated circuit or switchboard change where demand requires it",
          ],
        },
        {
          title: "Safe next steps and service limits",
          copy:
            "Leave a hot, damaged, wet or repeatedly tripping circuit off and keep the switchboard closed. Fault finding covers the accessible installation and agreed circuit; intermittent or concealed faults may need monitoring or further investigation.",
          items: [
            "Do not remove the switchboard cover or replace a breaker yourself",
            "Record what was operating when the trip occurred if it is safe to do so",
            "Do not keep resetting protection that trips again",
            "Any wider switchboard or supply work is scoped separately",
          ],
        },
      ],
    },
    process: [
      {
        title: "Do not keep resetting",
        text: "Leave the affected circuit off if it trips again, and keep clear of heat, damage, moisture or exposed parts.",
      },
      {
        title: "Test the circuit",
        text: "The protective device, connected loads and accessible wiring are tested to narrow down the cause.",
      },
      {
        title: "Repair or upgrade",
        text: "The agreed fault repair, device replacement, load change or switchboard work is completed where required.",
      },
      {
        title: "Confirm safe operation",
        text: "The circuit is retested and the next actions are explained clearly.",
      },
    ],
    faqs: [
      {
        question: "Why does a circuit breaker keep tripping?",
        answer:
          "Possible causes include excessive load, a short circuit, damaged wiring, faulty equipment, moisture or a defective breaker. Tripping alone cannot confirm which cause applies.",
      },
      {
        question: "Should I replace a breaker myself?",
        answer:
          "No. Do not remove a switchboard cover or replace protective devices. This is electrical work for a licensed electrician.",
      },
      {
        question: "Can circuit breaker issues mean a switchboard upgrade is needed?",
        answer:
          "Sometimes, but not automatically. The existing board, protection, circuit condition and proposed demand should be assessed before an upgrade is recommended.",
      },
      {
        question: "Is a circuit breaker the same as a safety switch?",
        answer:
          "No. A circuit breaker primarily protects wiring from overcurrent, while a safety switch responds to certain leakage-to-earth conditions. An RCBO can combine both functions.",
      },
      {
        question: "What should I do if a breaker is hot or smells burnt?",
        answer:
          "Do not touch or reset it. Keep the switchboard closed, move clear and call for urgent electrical help. Call Triple Zero (000) for fire, serious electric shock or immediate danger.",
      },
      {
        question: "Can intermittent breaker trips be tested?",
        answer:
          "Yes, although a fault that is not present during the visit may need operating history, staged testing or monitoring before the cause can be confirmed.",
      },
    ],
    relatedServices: [
      "switchboard-upgrades-sydney",
      "electrical-fault-finding-sydney",
      "safety-switch-rcd-installation-sydney",
      "electrical-load-capacity-checks-sydney",
    ],
  },
  {
    slug: "rcd-safety-switch-repairs-sydney",
    metaTitle: "RCD Safety Switch Repairs Sydney",
    metaDescription:
      "RCD safety switch repairs in Sydney for circuit tripping, faulty safety switches, RCBO upgrades and switchboard protection checks.",
    title: "RCD Safety Switch Repairs Sydney & Surrounding Regions",
    description:
      "Safety switch and RCD fault checks, repairs and protection upgrades for circuit tripping and switchboard issues.",
    intro:
      "A safety switch that keeps tripping is usually warning that something needs attention. Evaready Electrical can test the circuit, check the RCD or RCBO, isolate the likely cause and explain the safest repair pathway.",
    heroBullets: [
      "RCD tripping checks",
      "Safety switch repairs",
      "RCBO upgrade advice",
      "Switchboard protection testing",
    ],
    warningSigns: [
      "A safety switch trips repeatedly",
      "A circuit only trips when it rains",
      "One appliance or room keeps causing trips",
      "The switchboard has old or limited protection",
    ],
    services: [
      "RCD and safety switch fault checks",
      "Circuit fault isolation",
      "Safety switch replacement where suitable",
      "RCBO upgrade recommendations",
      "Moisture and outdoor circuit checks",
      "Switchboard protection review",
    ],
    process: [
      {
        title: "Stop repeated resets",
        text: "If the same safety switch keeps tripping, stop repeated resets and call for advice.",
      },
      {
        title: "Find the fault",
        text: "Circuits, appliances and connected loads are checked to identify the likely cause.",
      },
      {
        title: "Repair or replace",
        text: "Approved RCD, RCBO, wiring or circuit repairs are completed.",
      },
      {
        title: "Retest protection",
        text: "The safety switch or protection device is retested before the job is closed.",
      },
    ],
    faqs: [
      {
        question: "Why does my safety switch keep tripping?",
        answer:
          "Common causes include faulty appliances, moisture, damaged wiring, overloaded circuits or a failing protection device.",
      },
      {
        question: "Should I keep resetting an RCD?",
        answer:
          "No. Repeated tripping means the fault should be checked rather than reset over and over.",
      },
      {
        question: "Can rain make an RCD trip?",
        answer:
          "Yes. Outdoor circuits, fixtures and water ingress can cause RCD tripping during or after rain.",
      },
    ],
    relatedServices: [
      "safety-switch-rcd-installation-sydney",
      "electrical-fault-finding-sydney",
      "switchboard-upgrades-sydney",
      "storm-damage-electrician-sydney",
    ],
  },
  {
    slug: "smart-meter-electrician-sydney",
    metaTitle: "Smart Meter Electrician Sydney | Metering Help",
    metaDescription:
      "Smart meter electrician in Sydney for meter area checks, switchboard preparation, service equipment and retailer coordination advice.",
    title: "Smart Meter Electrician Sydney & Surrounding Regions",
    description:
      "Meter area electrical support, switchboard preparation and service equipment checks for smart meter related enquiries.",
    intro:
      "Smart meter work can involve the meter provider, retailer and the property electrical setup. Evaready Electrical can help with the electrical side: meter area checks, switchboard preparation, service equipment issues and clear guidance on what may need to happen next.",
    heroBullets: [
      "Smart meter related enquiries",
      "Meter area checks",
      "Switchboard preparation",
      "Service equipment support",
    ],
    warningSigns: [
      "A retailer or meter provider has requested electrical work",
      "The meter panel or switchboard needs preparation",
      "A defect notice mentions metering or service equipment",
      "The property supply setup is old or unclear",
    ],
    services: [
      "Meter area electrical checks",
      "Switchboard preparation for meter work",
      "Service equipment review",
      "Defect notice and retailer paperwork guidance",
      "Consumer mains and supply-side advice",
      "Coordination notes for provider requirements",
    ],
    process: [
      {
        title: "Send provider details",
        text: "Share any retailer or meter provider notes, photos of the meter area, switchboard and your suburb.",
      },
      {
        title: "Review electrical readiness",
        text: "The switchboard, meter panel and service equipment are checked for visible issues.",
      },
      {
        title: "Explain responsibilities",
        text: "Evaready explains the electrical side while provider-owned or network work remains with the relevant third party.",
      },
      {
        title: "Complete approved work",
        text: "Approved electrical preparation or repair work is completed and tested.",
      },
    ],
    faqs: [
      {
        question: "Can an electrician install the smart meter?",
        answer:
          "Smart meter installation is usually arranged through the retailer or metering provider. Evaready can help with property-side electrical preparation and issues.",
      },
      {
        question: "Can smart meter work involve Level 2 electrical enquiries?",
        answer:
          "Sometimes. Metering, service equipment, consumer mains or defect issues may need the right Level 2 electrical process.",
      },
      {
        question: "What should I send for a smart meter enquiry?",
        answer:
          "Send provider notes, photos of the meter area and switchboard, your suburb, and any defect notice or deadline.",
      },
    ],
    relatedServices: [
      "metering-services-sydney",
      "level-2-electrician-sydney",
      "defect-notice-repairs-sydney",
      "switchboard-upgrades-sydney",
      "consumer-mains-sydney",
    ],
  },
];

export function getServiceLandingPage(slug: string) {
  return serviceLandingPages.find((service) => service.slug === slug);
}


