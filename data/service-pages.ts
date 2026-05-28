export type ServiceFaq = {
  answer: string;
  question: string;
};

export type ServiceProcessStep = {
  text: string;
  title: string;
};

export type ServiceLandingPage = {
  credentialHighlights?: string[];
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
    metaTitle: "Residential Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Residential electrician in Sydney for power points, lighting, smoke alarms, switchboards, fault finding, renovations and home electrical repairs.",
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
    metaTitle: "Commercial Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Commercial electrician in Sydney for shops, offices, strata, warehouses, builders, real estate maintenance, lighting, power and electrical repairs.",
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
    metaTitle: "Electrical Fault Finding Sydney & Surrounding Regions",
    metaDescription:
      "Electrical fault finding in Sydney for tripping safety switches, power faults, burning smells, damaged wiring, water damage and circuit issues.",
    title: "Electrical Fault Finding Sydney & Surrounding Regions",
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
    metaTitle: "Lighting Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Lighting electrician in Sydney for LED downlights, outdoor lighting, security lighting, bathroom lighting, feature lights and lighting repairs.",
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
    metaTitle: "Power Point Installation Sydney & Surrounding Regions",
    metaDescription:
      "Power point installation in Sydney for new outlets, double power points, outdoor outlets, appliance circuits, USB outlets and faulty power point repairs.",
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
    metaTitle: "EV Charger Installation Sydney & Surrounding Regions",
    metaDescription:
      "EV charger installation in Sydney for homes and businesses, including load checks, dedicated circuits, switchboard checks and future-ready electrical upgrades.",
    title: "EV Charger Installation Sydney & Surrounding Regions",
    description:
      "Home and business EV charger installation support with load checks, circuit planning and switchboard review.",
    intro:
      "EV chargers add a serious new load to a property, so the electrical setup needs to be checked carefully. Evaready Electrical can assess switchboard capacity, circuit requirements and installation options before the charger is installed.",
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
    metaTitle: "Consumer Mains Sydney & Surrounding Regions",
    metaDescription:
      "Consumer mains electrician in Sydney for damaged, undersized or ageing consumer mains, service upgrades, switchboard supply work and Level 2 electrical enquiries.",
    title: "Consumer Mains Sydney & Surrounding Regions",
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
    metaTitle: "Defect Notice Repairs Sydney & Surrounding Regions",
    metaDescription:
      "Electrical defect notice repairs in Sydney for consumer mains, point of attachment, switchboards, private poles and supply-side electrical defects.",
    title: "Electrical Defect Notice Repairs Sydney & Surrounding Regions",
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
    metaTitle: "Private Power Pole Sydney & Surrounding Regions",
    metaDescription:
      "Private power pole electrician in Sydney for damaged poles, overhead service issues, defect notices, supply concerns and Level 2 electrical enquiries.",
    title: "Private Power Pole Sydney & Surrounding Regions",
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
        question: "What details should I send for the quote?",
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
  {
    slug: "hot-water-system-electrician-sydney",
    metaTitle: "Hot Water System Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Hot water system electrician in Sydney for electric hot water faults, circuits, isolators, thermostat checks and hot water heat pump electrical support.",
    title: "Hot Water System Electrician Sydney & Surrounding Regions",
    description:
      "Electrical support for electric hot water faults, hot water circuits, isolators, replacement wiring and heat pump electrical support.",
    intro:
      "No hot water can turn into an urgent problem quickly. Evaready Electrical checks the electrical side of electric hot water systems, including supply, isolators, safety switches, thermostats, elements and wiring, so the fault can be understood clearly before repair or replacement work proceeds.",
    heroBullets: [
      "No hot water electrical faults",
      "Hot water circuit and isolator checks",
      "Thermostat and element electrical support",
      "Eligible hot water heat pump support",
    ],
    warningSigns: [
      "The hot water system has stopped heating",
      "The hot water circuit trips the safety switch",
      "There is heat, smell or buzzing near the isolator",
      "The system needs electrical work before replacement",
    ],
    services: [
      "Electric hot water circuit fault finding",
      "Hot water isolator checks and replacement",
      "Thermostat and element electrical testing",
      "Safety switch tripping investigations",
      "Wiring support for replacement systems",
      "Hot water heat pump electrical support",
    ],
    process: [
      {
        title: "Confirm the fault",
        text: "Share what the system is doing, photos of the unit and switchboard, and whether the circuit is tripping.",
      },
      {
        title: "Test the supply",
        text: "The hot water circuit, isolator and switchboard protection are checked safely.",
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
          "Yes. If the issue is electrical, Evaready Electrical can check the supply, circuit, isolator, thermostat, element and safety switch behaviour.",
      },
      {
        question: "Why does my hot water trip the safety switch?",
        answer:
          "A hot water system can trip due to a faulty element, wiring issue, water ingress or circuit fault. It should be tested before being reset repeatedly.",
      },
      {
        question: "What photos help with a hot water quote?",
        answer:
          "Send photos of the hot water unit, isolator, switchboard, model label and any tripped switch or visible damage.",
      },
      {
        question: "Can you help with hot water heat pumps?",
        answer:
          "Yes. Evaready Electrical can assist with the electrical side of hot water heat pump installs, including supply, isolator, circuit and switchboard requirements.",
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
    metaTitle: "Air Conditioning Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Air conditioning electrician in Sydney for AC isolators, dedicated circuits, outdoor unit power, heat pump electrical support and switchboard capacity checks.",
    title: "Air Conditioning Electrician Sydney & Surrounding Regions",
    description:
      "Air-conditioning electrical support, split-system air conditioning, AC isolators, dedicated circuits, heat pump support and switchboard capacity checks.",
    intro:
      "Evaready provides air-conditioning electrical support and air-conditioning services through appropriately licensed technicians. We help with split-system air conditioning, AC isolators, dedicated circuits, outdoor unit power, safety switches, heat pump electrical support and switchboard capacity checks across Sydney and surrounding regions.",
    credentialHighlights: [
      "ARCtick Licensed — L157323",
      "Licence L157323 for eligible air-conditioning, heat pump and related work.",
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
    services: [
      "Air-conditioning electrical support",
      "Split-system air conditioning",
      "AC isolators",
      "Dedicated air conditioning circuits",
      "Outdoor unit power",
      "Switchboard capacity checks",
      "Safety switches and RCBOs",
      "Heat pump electrical support",
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
        question: "Can you help with air-conditioning electrical work?",
        answer:
          "Yes. Evaready Electrical can help with dedicated aircon circuits, AC isolators, outdoor unit power, switchboard checks, safety switches and split-system electrical support.",
      },
      {
        question: "Do you only help with split systems?",
        answer:
          "No. Split-system air conditioning is a key service, but Evaready also helps with air-conditioning electrical support, hot water heat pumps, swimming pool heat pumps, aircon fault support and electrical supply planning.",
      },
      {
        question: "Can Evaready arrange the right licensed technician?",
        answer:
          "Yes. Evaready provides air-conditioning electrical support and air-conditioning services through appropriately licensed technicians.",
      },
      {
        question: "What does ARCtick Licensed mean here?",
        answer:
          "ARCtick Licensed — L157323. Licence L157323 applies to eligible air-conditioning, heat pump and related work.",
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
    metaTitle: "CCTV Electrician Sydney & Surrounding Regions",
    metaDescription:
      "CCTV electrician in Sydney for security camera installation, camera wiring, recorder setup support, home CCTV and business CCTV cabling.",
    title: "CCTV Electrician Sydney & Surrounding Regions",
    description:
      "Security camera and CCTV cabling installed neatly for homes, shops, offices and strata sites.",
    intro:
      "A good CCTV setup depends on camera placement, clean cabling and reliable power. Evaready Electrical helps with CCTV and security camera installation for homes and businesses, including camera wiring, power supplies, recorder locations and future camera provisions. Open Cabler Registration 46691 applies to eligible data, CCTV and communications cabling work.",
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
        answer:
          "Yes. Evaready Electrical can assist with CCTV camera wiring and installation for residential and commercial properties, including eligible cabling work under Open Cabler Registration 46691.",
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
    metaTitle: "Data Cabling Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Data cabling electrician in Sydney for network points, internet outlets, NBN internal cabling, phone line repairs and office data cabling.",
    title: "Data Cabling Electrician Sydney & Surrounding Regions",
    description:
      "Network data cabling, internet points and communication outlets for homes, offices and renovations.",
    intro:
      "Reliable internet and network points need tidy cabling and sensible placement. Evaready Electrical installs data cabling, internet points and communication outlets for homes, offices, renovations and commercial spaces. Open Cabler Registration 46691 applies to eligible data and communications cabling work.",
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
        answer:
          "Yes. Evaready Electrical can assist with office data runs, outlet placement and eligible communication cabling under Open Cabler Registration 46691.",
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
        text: "Speed settings, light kits and controls are checked before completion.",
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
    metaTitle: "Safety Switch Installation Sydney & Surrounding Regions",
    metaDescription:
      "Safety switch installation and RCD repairs in Sydney for tripping circuits, switchboard protection, RCBO upgrades and electrical safety checks.",
    title: "Safety Switch Installation Sydney & Surrounding Regions",
    description:
      "Safety switches, RCDs and RCBO circuit protection installed, repaired and checked carefully.",
    intro:
      "Safety switches are one of the most important protections in a property. Evaready Electrical installs safety switches and RCBOs, investigates nuisance tripping and checks circuit protection so faults are handled safely.",
    heroBullets: [
      "Safety switch installation",
      "RCD and RCBO upgrades",
      "Tripping circuit fault checks",
      "Switchboard safety protection",
    ],
    warningSigns: [
      "A safety switch keeps tripping",
      "Only part of the property loses power",
      "The switchboard has limited RCD protection",
      "Older circuits have no modern safety protection",
    ],
    services: [
      "Safety switch installation",
      "RCD repairs and replacement",
      "RCBO upgrades",
      "Nuisance tripping fault finding",
      "Switchboard safety checks",
      "Circuit protection advice",
    ],
    process: [
      {
        title: "Check protection",
        text: "The switchboard and circuit protection are reviewed.",
      },
      {
        title: "Find tripping causes",
        text: "Tripping circuits are tested before parts are replaced.",
      },
      {
        title: "Upgrade where needed",
        text: "Approved safety switch or RCBO upgrades are completed.",
      },
      {
        title: "Test operation",
        text: "Protection devices are tested before the job is finished.",
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
          "Often yes, although some older switchboards may need upgrade work to support modern protection safely.",
      },
      {
        question: "Is an RCBO different from a safety switch?",
        answer:
          "An RCBO combines circuit breaker and safety switch protection for individual circuits.",
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
    metaTitle: "Surge Protection Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Surge protection electrician in Sydney for switchboard surge protection devices, appliance protection, storm risk and sensitive equipment protection.",
    title: "Surge Protection Electrician Sydney & Surrounding Regions",
    description:
      "Switchboard surge protection to help protect appliances, electronics and sensitive equipment.",
    intro:
      "Power surges can damage appliances, office equipment and sensitive electronics. Evaready Electrical installs surge protection devices at the switchboard as part of a practical protection plan for homes and businesses.",
    heroBullets: [
      "Switchboard surge protection",
      "Appliance and electronics protection",
      "Storm risk support",
      "Home and business protection",
    ],
    warningSigns: [
      "Electronics have failed after storms",
      "A property has expensive equipment to protect",
      "The switchboard has no surge protection",
      "You are upgrading circuits or switchboards",
    ],
    services: [
      "Surge protection device installation",
      "Switchboard protection upgrades",
      "Appliance and electronics protection",
      "Storm risk electrical checks",
      "Commercial equipment protection",
      "Protection advice during switchboard upgrades",
    ],
    process: [
      {
        title: "Review risk",
        text: "The property type and equipment being protected are discussed.",
      },
      {
        title: "Check switchboard",
        text: "The switchboard is checked for suitable space and protection arrangement.",
      },
      {
        title: "Install protection",
        text: "Approved surge protection is installed neatly.",
      },
      {
        title: "Explain operation",
        text: "You get clear advice on what the device protects and what to watch for.",
      },
    ],
    faqs: [
      {
        question: "Does surge protection stop every electrical problem?",
        answer:
          "No. It helps reduce risk from voltage spikes but does not replace safe wiring, circuit protection or equipment-specific protection.",
      },
      {
        question: "Can surge protection be added during a switchboard upgrade?",
        answer:
          "Yes. Switchboard upgrades are a good time to discuss surge protection.",
      },
      {
        question: "Is surge protection useful for businesses?",
        answer:
          "Yes. Offices, shops and commercial sites often have sensitive equipment worth protecting.",
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
    metaTitle: "Appliance Installation Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Appliance installation electrician in Sydney for cooktops, ovens, rangehoods, dishwasher electrical connections, appliance isolators and dedicated circuits.",
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
      "Rewiring electrician in Sydney for old home wiring, renovation wiring, damaged cables, unsafe wiring, new circuits and safety upgrades.",
    title: "Rewiring Electrician Sydney & Surrounding Regions",
    description:
      "Rewiring support for older homes, renovations, damaged cables and unsafe electrical wiring.",
    intro:
      "Old or damaged wiring can hide serious risk behind walls, ceilings and switchboards. Evaready Electrical can inspect wiring concerns, plan renovation wiring and replace unsafe cabling where required.",
    heroBullets: [
      "Old home rewiring",
      "Renovation and extension wiring",
      "Damaged cable replacement",
      "New circuits and safety upgrades",
    ],
    warningSigns: [
      "Lights flicker across multiple rooms",
      "Outlets are cracked, loose or hot",
      "Old wiring is visible in roof spaces",
      "Renovation work exposes unsafe cabling",
    ],
    services: [
      "Home rewiring assessments",
      "Renovation wiring",
      "Damaged cable replacement",
      "New circuit installation",
      "Unsafe wiring upgrades",
      "Switchboard and protection checks",
    ],
    process: [
      {
        title: "Inspect wiring",
        text: "Accessible wiring, switchboard condition and problem areas are reviewed.",
      },
      {
        title: "Plan stages",
        text: "Rewiring work is scoped around access, renovation timing and safety priorities.",
      },
      {
        title: "Replace safely",
        text: "Approved cabling and circuit work is completed with neat finishes where access allows.",
      },
      {
        title: "Test circuits",
        text: "Completed circuits are tested and explained clearly.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my home needs rewiring?",
        answer:
          "Warning signs include old cabling, frequent faults, hot outlets, flickering lights, limited safety protection or renovation work exposing unsafe wiring.",
      },
      {
        question: "Can rewiring be staged?",
        answer:
          "Often yes. The work can be prioritised around safety, access and renovation stages.",
      },
      {
        question: "Is rewiring useful during renovations?",
        answer:
          "Yes. Renovations are often the best time to update old wiring, add circuits and improve safety protection.",
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
    title: "Metering Services Sydney & Surrounding Regions",
    description:
      "Metering support, service equipment checks and Level 2 electrical coordination for supply-side electrical issues.",
    intro:
      "Metering and service equipment sits at the point where property wiring and electricity supply requirements meet. Evaready Electrical can assess metering-related electrical issues, service equipment concerns, defect notices and upgrade enquiries.",
    heroBullets: [
      "Metering support",
      "Service equipment checks",
      "Defect notice assistance",
      "Level 2 electrical coordination",
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
      "Level 2 electrical support where required",
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
          "Yes. Evaready Electrical can assess metering-related electrical concerns and explain the next steps.",
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
    ],
    relatedServices: [
      "level-2-electrician-sydney",
      "consumer-mains-sydney",
      "defect-notice-repairs-sydney",
      "switchboard-upgrades-sydney",
    ],
  },
  {
    slug: "new-build-renovation-electrician-sydney",
    metaTitle: "New Build & Renovation Electrician Sydney & Surrounding Regions",
    metaDescription:
      "New build and renovation electrician in Sydney for rough-ins, fit-offs, kitchen upgrades, bathroom wiring, lighting layouts, power planning and switchboard upgrades.",
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
        text: "Circuits, outlets, lights and fittings are tested before handover.",
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
    metaTitle: "Electrical Testing, Tagging & Reports Sydney & Surrounding Regions",
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
        text: "Relevant equipment, circuits, fittings or switchboard areas are checked safely.",
      },
      {
        title: "Record findings",
        text: "Findings are documented clearly so owners or managers understand the next step.",
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
    metaTitle: "Intercom & Access Control Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Intercom and access control electrician in Sydney for entry systems, intercom wiring, gate provisions, strata access, security wiring and commercial entry support.",
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
        text: "Installed electrical work is checked and any next steps are explained.",
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
    metaTitle: "Storm Damage Electrician Sydney & Surrounding Regions",
    metaDescription:
      "Storm damage electrician in Sydney for water-affected wiring, damaged fittings, unsafe circuits, emergency disconnections, outdoor faults and make-safe support.",
    title: "Storm Damage Electrician Sydney & Surrounding Regions",
    description:
      "Urgent electrical help for storm damage, unsafe wiring, damaged equipment and emergency appliance disconnections.",
    intro:
      "Storm damage can make electrical systems unsafe quickly, especially around outdoor fittings, water-affected wiring, damaged switchboards and appliances. Evaready Electrical can assess storm-related electrical faults and help make the affected area safer before repairs proceed.",
    heroBullets: [
      "Storm-related electrical faults",
      "Water-affected wiring and fittings",
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
        text: "Outdoor circuits, fittings, appliances and switchboard areas are checked safely.",
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
        question: "Should I use power points after water damage?",
        answer:
          "No. Do not use water-affected fittings or outlets until they have been checked safely.",
      },
      {
        question: "Can storm damage cause safety switches to trip?",
        answer:
          "Yes. Water ingress, damaged outdoor fittings and affected appliances can all cause tripping.",
      },
      {
        question: "What photos help with storm damage?",
        answer:
          "Send photos of the affected area, switchboard, outdoor fittings, damaged appliance and any visible water entry if it is safe to do so.",
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
    metaTitle: "Electrical Load & Capacity Checks Sydney & Surrounding Regions",
    metaDescription:
      "Electrical load and capacity checks in Sydney for EV chargers, 3 phase upgrades, workshops, commercial equipment, switchboards and major electrical upgrades.",
    title: "Electrical Load & Capacity Checks Sydney & Surrounding Regions",
    description:
      "Electrical capacity checks for upgrades, 3 phase enquiries, EV charging, workshops and commercial equipment.",
    intro:
      "Before adding major loads, it is worth checking whether the existing electrical system is suitable. Evaready Electrical can assess load and capacity questions for EV chargers, workshops, commercial equipment, renovations, 3 phase enquiries and switchboard upgrades.",
    heroBullets: [
      "Load and capacity checks",
      "EV charger planning",
      "3 phase upgrade enquiries",
      "Workshop and commercial equipment",
    ],
    warningSigns: [
      "New equipment may need more power than the property has available",
      "An EV charger is being planned",
      "A workshop or business needs dedicated circuits",
      "The switchboard is full or outdated",
    ],
    services: [
      "Electrical load checks",
      "Capacity assessments",
      "EV charger supply planning",
      "3 phase power enquiries",
      "Commercial equipment circuits",
      "Switchboard upgrade recommendations",
    ],
    process: [
      {
        title: "Review the load",
        text: "Equipment ratings, charger details, appliances and intended usage are checked.",
      },
      {
        title: "Assess the switchboard",
        text: "The switchboard, circuit space, protection and existing loads are reviewed.",
      },
      {
        title: "Consider supply needs",
        text: "Where needed, Level 2 or 3 phase pathways can be discussed.",
      },
      {
        title: "Recommend next steps",
        text: "You get practical advice on circuits, upgrades or staged work before committing.",
      },
    ],
    faqs: [
      {
        question: "Do I need a load check before an EV charger?",
        answer:
          "A load check is strongly recommended so the charger, switchboard and existing electrical demand can be considered together.",
      },
      {
        question: "Can capacity checks lead to Level 2 work?",
        answer:
          "Sometimes. Larger upgrades, 3 phase supply or consumer mains changes may involve Level 2 requirements.",
      },
      {
        question: "What should I send for a load check quote?",
        answer:
          "Send equipment ratings, EV charger details, photos of the switchboard, property type and what new loads you want to add.",
      },
    ],
    relatedServices: [
      "three-phase-power-sydney",
      "ev-charger-installation-sydney",
      "switchboard-upgrades-sydney",
      "level-2-electrician-sydney",
    ],
  },
];

export function getServiceLandingPage(slug: string) {
  return serviceLandingPages.find((service) => service.slug === slug);
}
