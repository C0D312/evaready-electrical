export type ServiceFaq = {
  answer: string;
  question: string;
};

export type ServiceProcessStep = {
  text: string;
  title: string;
};

export type ServiceLandingPage = {
  description: string;
  faqs: ServiceFaq[];
  heroBullets: string[];
  intro: string;
  metaDescription: string;
  metaTitle: string;
  process: ServiceProcessStep[];
  relatedServices: string[];
  services: string[];
  slug: string;
  title: string;
  warningSigns: string[];
};

export const serviceLandingPages: ServiceLandingPage[] = [
  {
    slug: "residential-electrician-sydney",
    metaTitle: "Residential Electrician Sydney",
    metaDescription:
      "Residential electrician in Sydney for power points, lighting, smoke alarms, switchboards, fault finding, renovations and home electrical repairs.",
    title: "Residential Electrician Sydney",
    description:
      "Safe, tidy electrical work for homes, units, townhouses, granny flats and renovations across the service area.",
    intro:
      "Evaready Electrical helps Sydney homeowners with everyday electrical repairs, safety upgrades and planned installations. From a faulty power point to a full renovation rough-in, the work is tested properly and explained clearly before it is completed.",
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
        text: "Share the suburb, photos and what is happening so the job can be scoped properly.",
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
        title: "Explain next steps",
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
          "Yes. Photos of the switchboard, fitting, outlet or fault area help make the quote request clearer.",
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
    metaTitle: "Commercial Electrician Sydney",
    metaDescription:
      "Commercial electrician in Sydney for shops, offices, strata, warehouses, builders, real estate maintenance, lighting, power and electrical repairs.",
    title: "Commercial Electrician Sydney",
    description:
      "Electrical maintenance and installation support for Sydney businesses, builders, strata and real estate clients.",
    intro:
      "Commercial electrical work needs clear communication, reliable attendance and neat documentation. Evaready Electrical supports shops, offices, strata sites, warehouses, builders and property managers with practical electrical service across Greater Sydney and nearby regions.",
    heroBullets: [
      "Office, retail and strata electrical support",
      "Lighting, power and fault finding",
      "Builder and real estate maintenance",
      "Switchboards and safety upgrades",
    ],
    warningSigns: [
      "Power circuits trip during trading hours",
      "Lights fail across a shop, office or common area",
      "Tenants report unsafe outlets or fittings",
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
        text: "Photos, notes and next steps can be supplied where they are useful for managers or owners.",
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
      "electrical-fault-finding-sydney",
      "switchboard-upgrades-sydney",
      "lighting-electrician-sydney",
      "power-point-installation-sydney",
    ],
  },
  {
    slug: "electrical-fault-finding-sydney",
    metaTitle: "Electrical Fault Finding Sydney",
    metaDescription:
      "Electrical fault finding in Sydney for tripping safety switches, power faults, burning smells, damaged wiring, water damage and circuit issues.",
    title: "Electrical Fault Finding Sydney",
    description:
      "Find the cause of tripping circuits, power loss, damaged wiring and unsafe electrical faults.",
    intro:
      "Electrical faults should be tested, not guessed. Evaready Electrical uses a safety-first fault finding process to identify the cause of tripping circuits, power loss, burning smells, hot outlets and wiring problems.",
    heroBullets: [
      "Safety switch and circuit tripping",
      "Power loss and intermittent faults",
      "Burning smells, heat or buzzing",
      "Water-damaged electrical fittings",
    ],
    warningSigns: [
      "The same circuit trips repeatedly",
      "A burning or fishy smell comes from a fitting",
      "Lights flicker or dim unexpectedly",
      "Power points spark, buzz or feel hot",
    ],
    services: [
      "Safety switch fault diagnosis",
      "Circuit testing and isolation",
      "Damaged cable investigation",
      "Switchboard fault checks",
      "Water ingress electrical checks",
      "Urgent power fault support",
    ],
    process: [
      {
        title: "Make it safe",
        text: "Urgent hazards are isolated before deeper testing continues.",
      },
      {
        title: "Test the circuit",
        text: "The affected circuit, switchboard and connected equipment are checked methodically.",
      },
      {
        title: "Find the cause",
        text: "The fault is narrowed down so the repair addresses the actual problem.",
      },
      {
        title: "Repair and retest",
        text: "The repair is completed where approved, then tested before power is restored.",
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
          "Yes. A burning smell near electrical equipment should be treated as urgent because heat can indicate a dangerous fault.",
      },
      {
        question: "Can an appliance cause a circuit to trip?",
        answer:
          "Yes. Appliances, water ingress, damaged wiring or overloaded circuits can all cause tripping.",
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
    metaTitle: "Lighting Electrician Sydney",
    metaDescription:
      "Lighting electrician in Sydney for LED downlights, outdoor lighting, security lighting, bathroom lighting, feature lights and lighting repairs.",
    title: "Lighting Electrician Sydney",
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
      "Old fittings become hot",
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
        text: "Fittings are installed cleanly with attention to finish and function.",
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
          "Yes. Evaready Electrical can replace many older fittings with LED options suited to the space.",
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
    metaTitle: "Power Point Installation Sydney",
    metaDescription:
      "Power point installation in Sydney for new outlets, double power points, outdoor outlets, appliance circuits, USB outlets and faulty power point repairs.",
    title: "Power Point Installation Sydney",
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
    metaTitle: "Smoke Alarm Electrician Sydney",
    metaDescription:
      "Smoke alarm electrician in Sydney for installation, testing, replacement and hardwired smoke alarm support for homes, rentals and property managers.",
    title: "Smoke Alarm Electrician Sydney",
    description:
      "Smoke alarm installation, replacement and testing for homes, rentals and property managers.",
    intro:
      "Smoke alarms are a small device with a serious job. Evaready Electrical installs and replaces smoke alarms so homes and rental properties have working protection in the right locations.",
    heroBullets: [
      "Smoke alarm installation",
      "Hardwired alarm replacement",
      "Testing and troubleshooting",
      "Rental and property support",
    ],
    warningSigns: [
      "Smoke alarms are missing or out of date",
      "The alarm chirps repeatedly",
      "A hardwired alarm has failed",
      "A rental property needs smoke alarm attention",
    ],
    services: [
      "Smoke alarm installation",
      "Smoke alarm replacement",
      "Hardwired alarm support",
      "Alarm testing",
      "Battery and fault checks",
      "Rental property smoke alarm work",
    ],
    process: [
      {
        title: "Check locations",
        text: "The home layout and existing alarms are reviewed.",
      },
      {
        title: "Install or replace",
        text: "The alarm is installed or replaced using suitable equipment.",
      },
      {
        title: "Test operation",
        text: "The alarm is tested so operation is confirmed.",
      },
      {
        title: "Record the work",
        text: "Job notes can be provided where needed for owners or managers.",
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
          "A chirping alarm may have a battery, age or fault issue. It should be checked rather than ignored.",
      },
      {
        question: "Do rental properties need working smoke alarms?",
        answer:
          "Yes. Smoke alarm requirements are important for rental safety and compliance.",
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
    metaTitle: "EV Charger Installation Sydney",
    metaDescription:
      "EV charger installation in Sydney for homes and businesses, including load checks, dedicated circuits, switchboard checks and future-ready electrical upgrades.",
    title: "EV Charger Installation Sydney",
    description:
      "Home and business EV charger installation support with load checks, circuit planning and switchboard review.",
    intro:
      "EV chargers add a serious new load to a property, so the electrical setup needs to be checked properly. Evaready Electrical can assess switchboard capacity, circuit requirements and installation options before the charger is installed.",
    heroBullets: [
      "Home EV charger installations",
      "Dedicated EV charging circuits",
      "Switchboard and load checks",
      "Future-ready upgrade advice",
    ],
    warningSigns: [
      "Your switchboard is old or already overloaded",
      "You are relying on slow charging from a standard outlet",
      "The charger location is far from the switchboard",
      "You may need a circuit or supply upgrade",
    ],
    services: [
      "EV charger circuit installation",
      "Home charger setup",
      "Switchboard capacity checks",
      "Load and safety checks",
      "Cable route planning",
      "Upgrade advice for higher charging demand",
    ],
    process: [
      {
        title: "Review charger needs",
        text: "The vehicle, charger type, parking location and charging expectations are discussed.",
      },
      {
        title: "Check capacity",
        text: "The switchboard and available electrical capacity are reviewed.",
      },
      {
        title: "Plan the route",
        text: "Cable path, mounting location and installation access are confirmed.",
      },
      {
        title: "Install and test",
        text: "The charger circuit is installed and tested before use.",
      },
    ],
    faqs: [
      {
        question: "Can any home install an EV charger?",
        answer:
          "Most homes can, but the switchboard and circuit capacity should be checked first.",
      },
      {
        question: "Will I need a switchboard upgrade?",
        answer:
          "Some properties do. The answer depends on your current switchboard, supply and charger requirements.",
      },
      {
        question: "Can businesses install EV chargers?",
        answer:
          "Yes. Business installations need careful load planning and a suitable location.",
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
    metaTitle: "Consumer Mains Sydney",
    metaDescription:
      "Consumer mains electrician in Sydney for damaged, undersized or ageing consumer mains, service upgrades, switchboard supply work and Level 2 electrical enquiries.",
    title: "Consumer Mains Sydney",
    description:
      "Consumer mains checks, upgrades and repair discussions for Sydney properties that need supply-side electrical work.",
    intro:
      "Consumer mains carry power from the service connection to the switchboard. If they are old, damaged, undersized or part of a defect notice, the work needs the right electrical process and documentation.",
    heroBullets: [
      "Consumer mains repairs and upgrades",
      "Supply capacity discussions",
      "Defect notice support",
      "Switchboard supply-side work",
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
      "Level 2 electrical coordination where required",
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
    ],
    relatedServices: [
      "defect-notice-repairs-sydney",
      "private-power-pole-sydney",
      "switchboard-upgrades-sydney",
      "ev-charger-installation-sydney",
    ],
  },
  {
    slug: "defect-notice-repairs-sydney",
    metaTitle: "Defect Notice Repairs Sydney",
    metaDescription:
      "Electrical defect notice repairs in Sydney for consumer mains, point of attachment, switchboards, private poles and supply-side electrical defects.",
    title: "Electrical Defect Notice Repairs Sydney",
    description:
      "Help understanding and responding to electrical defect notices before they become a bigger problem.",
    intro:
      "An electrical defect notice should be acted on quickly. Evaready Electrical can review the notice, inspect the affected equipment and explain what needs to be done to bring the issue back toward compliance.",
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
      "Documentation guidance where applicable",
    ],
    process: [
      {
        title: "Send the notice",
        text: "Share a clear photo or copy of the defect notice with your quote request.",
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
    ],
    relatedServices: [
      "consumer-mains-sydney",
      "private-power-pole-sydney",
      "switchboard-upgrades-sydney",
      "electrical-fault-finding-sydney",
    ],
  },
  {
    slug: "private-power-pole-sydney",
    metaTitle: "Private Power Pole Sydney",
    metaDescription:
      "Private power pole electrician in Sydney for damaged poles, overhead service issues, defect notices, supply concerns and Level 2 electrical enquiries.",
    title: "Private Power Pole Sydney",
    description:
      "Electrical support for private power pole concerns, overhead service issues and related defect notices.",
    intro:
      "Private power poles and overhead services can become a serious safety issue when damaged, leaning or flagged in a defect notice. Evaready Electrical can assess the electrical side of the issue and explain the next steps.",
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
        text: "Photos of the pole, cables and switchboard help determine the next step.",
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
        question: "What should I send with a quote request?",
        answer:
          "Send photos of the pole, overhead cables, switchboard and any defect notice you received.",
      },
    ],
    relatedServices: [
      "defect-notice-repairs-sydney",
      "consumer-mains-sydney",
      "electrical-fault-finding-sydney",
      "switchboard-upgrades-sydney",
    ],
  },
];

export function getServiceLandingPage(slug: string) {
  return serviceLandingPages.find((service) => service.slug === slug);
}
