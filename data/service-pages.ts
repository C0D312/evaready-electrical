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
    metaTitle: "Electrical Fault Finding Sydney | Tripping & Power Faults",
    metaDescription:
      "Electrical fault finding in Sydney for tripping safety switches, no power and burning smells, damaged wiring and overheating power points and water damage.",
    title: "Electrical Fault Finding Sydney & Surrounding Regions",
    description:
      "Find the cause of circuit tripping, power loss, damaged wiring and unsafe electrical faults.",
    intro:
      "Electrical faults should be tested, not guessed. Evaready Electrical uses a safety-first fault finding process to identify the cause of circuit tripping, power loss and burning smells and overheating power points and wiring problems.",
    heroBullets: [
      "Safety switch and circuit tripping",
      "Power loss and intermittent faults",
      "Burning smells, heat or buzzing",
      "Water-damaged electrical fixtures",
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
    metaTitle: "EV Charger Installation Sydney | Home & Business Charging",
    metaDescription:
      "EV charger installation in Sydney for homes and businesses, with load checks, dedicated circuits, switchboard checks and upgrade advice.",
    title: "EV Charger Installation Sydney & Surrounding Regions",
    description:
      "Home and business EV charger installation support with load checks, circuit planning and switchboard review.",
    intro:
      "EV chargers add a serious new load to a property, so the electrical setup needs to be checked carefully. Evaready Electrical can assess switchboard capacity, circuit requirements and installation options before the charger is installed.",
    heroBullets: [
      "Home EV charger installations",
      "Dedicated EV charger circuits",
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
      "Private power poles and overhead services can become a serious safety issue when damaged, leaning or flagged in a defect notice. Evaready Electrical can assess the electrical side of the issue and explain the next steps.",
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
    metaTitle: "Hot Water Electrician Sydney | Circuits & Isolators",
    metaDescription:
      "Hot water electrician in Sydney for no hot water and circuit tripping, isolators, thermostat checks and heat pump electrical support.",
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
    metaTitle: "Air Conditioning Electrician Sydney | AC Circuits",
    metaDescription:
      "Air conditioning electrician in Sydney for AC isolators, dedicated circuits, outdoor unit power, heat pump support and capacity checks.",
    title: "Air Conditioning Electrician Sydney & Surrounding Regions",
    description:
      "Air-conditioning electrical support, split-system air conditioning, AC isolators, dedicated circuits, heat pump support and switchboard capacity checks.",
    intro:
      "Evaready provides air-conditioning electrical support and air-conditioning services through appropriately licensed technicians. We help with split-system air conditioning, AC isolators, dedicated circuits, outdoor unit power, safety switches, heat pump electrical support and switchboard capacity checks across Sydney and surrounding regions.",
    credentialHighlights: [
      "ARCtick Licensed - L157323",
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
      "Dedicated air conditioner circuits",
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
          "ARCtick Licensed - L157323. Licence L157323 applies to eligible air-conditioning, heat pump and related work.",
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
    intro:
      "A good CCTV setup depends on camera placement, clean cabling and reliable power. Evaready Electrical helps with CCTV and security camera installation for homes and businesses, including camera wiring, power supplies, recorder locations and future camera provisions. Open Cabler registration number 46691 applies to eligible data, CCTV and communications cabling work.",
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
          "Yes. Evaready Electrical can assist with CCTV camera wiring and installation for residential and commercial properties, including eligible cabling work under Open Cabler registration number 46691.",
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
    intro:
      "Reliable internet and network points need tidy cabling and sensible placement. Evaready Electrical installs data cabling, internet points and communication outlets for homes, offices, renovations and commercial spaces. Open Cabler registration number 46691 applies to eligible data and communications cabling work.",
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
          "Yes. Evaready Electrical can assist with office data runs, outlet placement and eligible communication cabling under Open Cabler registration number 46691.",
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
        text: "Circuit tripping are tested before parts are replaced.",
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
    metaTitle: "Surge Protection Electrician Sydney | Switchboard SPDs",
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
      "You are upgrading the switchboard or circuit capacity",
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
          "Warning signs include old cabling, frequent faults and overheating power points, flickering lights, limited safety protection or renovation work exposing unsafe wiring.",
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
    metaTitle: "Storm Damage Electrician Sydney | Water-Affected Faults",
    metaDescription:
      "Storm damage electrician in Sydney for water-affected wiring, damaged fixtures, unsafe circuits, outdoor faults and make-safe support.",
    title: "Storm Damage Electrician Sydney & Surrounding Regions",
    description:
      "Urgent electrical help for storm damage, unsafe wiring, damaged equipment and emergency appliance disconnections.",
    intro:
      "Storm damage can make electrical systems unsafe quickly, especially around outdoor fixtures, water-affected wiring, damaged switchboards and appliances. Evaready Electrical can assess storm-related electrical faults and help make the affected area safer before repairs proceed.",
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
      "Before adding major loads, it is worth checking whether the existing electrical system is suitable. Evaready Electrical can assess load and capacity questions for EV chargers, workshops, commercial equipment, renovations, 3 phase enquiries and switchboard upgrades.",
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
      "Air conditioning and heat pump load planning",
      "Consumer mains and supply capacity review",
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
      {
        question: "Can air conditioning or heat pumps need capacity checks?",
        answer:
          "Yes. Split systems, heat pumps and larger appliances can require dedicated circuits, safety protection and switchboard capacity checks.",
      },
      {
        question: "Should urgent overload or burning smells be quoted online?",
        answer:
          "No. If there is heat, burning smell, sparking, no power or repeated tripping, call first so the fault can be treated as urgent.",
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
      "The point of attachment is where the overhead service connects to the property. If it is damaged, loose, affected by storm damage or listed on a defect notice, Evaready Electrical can review the electrical side of the issue and explain the next step clearly.",
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
        text: "Where network or retailer requirements apply, the next step is explained without promising third-party approvals or timeframes.",
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
      "Overhead service issues need careful handling because they can involve the property connection, point of attachment, private poles, consumer mains and network requirements. Evaready Electrical can review overhead service enquiries and guide the correct next step.",
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
        title: "Coordinate next steps",
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
        text: "Where network, retailer or Level 2 processes apply, the next steps are explained carefully.",
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
    slug: "electrical-safety-inspection-sydney",
    metaTitle: "Electrical Safety Inspection Sydney",
    metaDescription:
      "Electrical safety inspection in Sydney for switchboards, safety switches, wiring, power points, lighting and visible fault risks.",
    title: "Electrical Safety Inspection Sydney & Surrounding Regions",
    description:
      "Electrical safety checks for homes, rentals, strata, commercial sites and properties with wiring or switchboard concerns.",
    intro:
      "Electrical safety inspections help identify visible risks before they become larger problems. Evaready Electrical can check switchboards, safety switches, power points, lighting, wiring condition and fault symptoms so the next step is clear.",
    heroBullets: [
      "Switchboard and safety checks",
      "Wiring and outlet review",
      "Rental, strata and property support",
      "Clear next steps before work begins",
    ],
    warningSigns: [
      "Safety switches keep tripping",
      "Power points are hot, cracked or buzzing",
      "Lights flicker or dim unexpectedly",
      "A property has older wiring or an outdated switchboard",
    ],
    services: [
      "Switchboard safety inspection",
      "Safety switch and RCD checks",
      "Power point and lighting review",
      "Visible wiring condition checks",
      "Rental, strata and property manager support",
      "Written notes or photos where required",
    ],
    process: [
      {
        title: "Confirm the concern",
        text: "Share the property type, suburb, photos and the reason for the safety check.",
      },
      {
        title: "Inspect and test",
        text: "Relevant circuits, protection, outlets and fixtures are checked safely.",
      },
      {
        title: "Explain findings",
        text: "The results are explained in practical terms, including urgent and planned next steps.",
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
          "It can include switchboards, safety switches, visible wiring condition, power points, lighting and fault symptoms relevant to the property.",
      },
      {
        question: "Should I call if something feels unsafe?",
        answer:
          "Yes. If there is heat, smoke, sparking, burning smell or shock risk, call first rather than waiting for a form response.",
      },
      {
        question: "Can safety inspections help before buying or renting?",
        answer:
          "They can help identify electrical items that may need attention, but they do not replace specialist building or legal advice.",
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
        text: "If repair work is needed, the next step can be quoted separately.",
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
        answer:
          "Evaready Electrical can assist with eligible internal phone and communications cabling under Open Cabler registration number 46691.",
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
    credentialHighlights: ["Open Cabler Registration: 46691"],
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
        text: "The final setup is checked and any device-specific next steps are explained.",
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
      "Emergency and exit lighting helps people find a safe path when normal lighting fails. Evaready Electrical can assist with emergency and exit lighting checks, replacements, wiring support and commercial safety lighting enquiries.",
    heroBullets: [
      "Emergency lighting checks",
      "Exit light replacement",
      "Commercial and strata support",
      "Testing records where required",
    ],
    warningSigns: [
      "Exit lights are flickering, damaged or not illuminated",
      "Emergency lighting has failed a check",
      "A shop, office or strata area needs safety lighting reviewed",
      "Renovation work has changed paths of travel or exits",
    ],
    services: [
      "Emergency lighting electrical support",
      "Exit light replacement",
      "Battery and fitting checks",
      "Commercial and strata lighting reviews",
      "Testing and tagging coordination where relevant",
      "Repair quotes for failed fixtures or circuits",
    ],
    process: [
      {
        title: "Confirm site requirements",
        text: "Share the site type, location, number of fixtures and any inspection notes.",
      },
      {
        title: "Check fixtures and circuits",
        text: "Emergency and exit lighting fixtures, power and visible wiring are checked.",
      },
      {
        title: "Repair or replace",
        text: "Approved repairs, replacements or wiring work are completed neatly.",
      },
      {
        title: "Record next steps",
        text: "Any follow-up notes, failed fixtures or planned upgrades are explained clearly.",
      },
    ],
    faqs: [
      {
        question: "Do commercial sites need emergency and exit lighting?",
        answer:
          "Many commercial and common areas have emergency and exit lighting requirements. Evaready can help review the electrical side and next steps.",
      },
      {
        question: "Can you replace failed exit lights?",
        answer:
          "Yes. Failed or damaged exit lights can be checked and replacement work can be quoted where suitable.",
      },
      {
        question: "What should I send for an emergency lighting quote?",
        answer:
          "Send the suburb, site type, number of fixtures, photos of failed lights and any inspection or maintenance notes.",
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
      "A hot power point can be a warning sign of a loose connection, overload, damaged wiring or failing outlet. If there is heat, smoke, sparking or a burning smell, call first and stop using the outlet until it has been checked.",
    heroBullets: [
      "Hot outlet fault checks",
      "Burning smell or buzzing sockets",
      "Damaged power point repairs",
      "Call first if unsafe",
    ],
    warningSigns: [
      "A power point feels hot to touch",
      "There is a burning smell near an outlet",
      "A plug or socket is discoloured",
      "The outlet buzzes, crackles or sparks",
    ],
    services: [
      "Hot power point fault finding",
      "Outlet replacement",
      "Loose connection checks",
      "Overload and circuit review",
      "Damaged wiring assessment",
      "Switchboard and safety switch checks where relevant",
    ],
    process: [
      {
        title: "Stop using the outlet",
        text: "Unplug equipment if it is safe and keep clear if there is heat, smoke or sparking.",
      },
      {
        title: "Call for urgent faults",
        text: "Call directly for overheating power points and burning smells or shock risk so the issue can be triaged first.",
      },
      {
        title: "Inspect and test",
        text: "The outlet, wiring, circuit and protection are checked before repairs are completed.",
      },
      {
        title: "Repair and retest",
        text: "Approved repairs are completed and the circuit is retested before use.",
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
          "No. Stop using the outlet if it feels hot, smells burnt or sparks, and call an electrician.",
      },
      {
        question: "Can a hot outlet be caused by overload?",
        answer:
          "Yes. Overload, loose connections, damaged wiring or a failing outlet can all create heat.",
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
      "A circuit breaker that keeps tripping is usually protecting against a fault, overload or unsafe condition. Evaready Electrical can test the circuit, check the switchboard and explain whether repair, replacement or an upgrade is needed.",
    heroBullets: [
      "Circuit breaker tripping",
      "Overloaded circuit checks",
      "Switchboard fault support",
      "RCBO and protection upgrades",
    ],
    warningSigns: [
      "A circuit breaker trips repeatedly",
      "A breaker feels hot, loose or damaged",
      "Lights or outlets fail on one circuit",
      "New equipment overloads the existing circuit",
    ],
    services: [
      "Circuit breaker fault finding",
      "Breaker replacement where suitable",
      "Overload and load checks",
      "Switchboard protection review",
      "RCBO upgrade advice",
      "Circuit labelling and testing",
    ],
    process: [
      {
        title: "Do not keep resetting",
        text: "Repeated resets can hide a fault. Stop using the affected circuit if it keeps tripping.",
      },
      {
        title: "Test the circuit",
        text: "The circuit, breaker, connected loads and wiring are tested to identify the likely cause.",
      },
      {
        title: "Repair or upgrade",
        text: "Approved repair, replacement or protection upgrade work is completed.",
      },
      {
        title: "Confirm safe operation",
        text: "The circuit is retested and the next steps are explained clearly.",
      },
    ],
    faqs: [
      {
        question: "Why does a circuit breaker keep tripping?",
        answer:
          "Common causes include overload, damaged wiring, faulty equipment, moisture or a failing breaker.",
      },
      {
        question: "Should I replace a breaker myself?",
        answer:
          "No. Circuit breaker work belongs in the switchboard and should be checked by a licensed electrician.",
      },
      {
        question: "Can circuit breaker issues mean a switchboard upgrade is needed?",
        answer:
          "Sometimes. Older switchboards, overloaded circuits or missing protection may need upgrade planning.",
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


