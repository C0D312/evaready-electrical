export type FaultRelatedLink = {
  href: string;
  label: string;
};

export type ElectricalFaultPage = {
  checks: string[];
  faqs: {
    answer: string;
    question: string;
  }[];
  intro: string;
  metaDescription: string;
  metaTitle: string;
  primaryAdvice: string;
  relatedServices: FaultRelatedLink[];
  riskNotes: string[];
  slug: string;
  title: string;
  whatToSend: string[];
};

const commonRelatedServices: FaultRelatedLink[] = [
  {
    href: "/emergency-electrician-sydney",
    label: "Emergency electrician",
  },
  {
    href: "/services/electrical-fault-finding-sydney",
    label: "Electrical fault finding",
  },
  {
    href: "/services/switchboard-upgrades-sydney",
    label: "Switchboard upgrades",
  },
  {
    href: "/services/safety-switch-rcd-installation-sydney",
    label: "Safety switches and RCDs",
  },
];

export const electricalFaultPages: ElectricalFaultPage[] = [
  {
    slug: "safety-switch-keeps-tripping",
    title: "Safety Switch Keeps Tripping",
    metaTitle: "Safety Switch Keeps Tripping Sydney & Surrounding Regions",
    metaDescription:
      "Safety switch keeps tripping in Sydney? Evaready Electrical can help test the circuit, isolate the cause and explain the next step.",
    intro:
      "A safety switch that keeps tripping is usually warning you that something on the circuit needs attention. It may be an appliance, water ingress, damaged wiring or an overloaded circuit.",
    primaryAdvice:
      "Do not keep resetting the switch over and over. If it trips again after one careful reset, call Evaready Electrical before the fault becomes harder to trace.",
    riskNotes: [
      "A wet or damaged appliance can trip the safety switch.",
      "Outdoor circuits may trip after rain or moisture enters a fitting.",
      "Repeated tripping can point to damaged wiring or insulation breakdown.",
      "Older switchboards may need safety device or circuit protection upgrades.",
    ],
    checks: [
      "Check whether one area of the home or business has lost power.",
      "Unplug appliances on the affected circuit if it is safe to do so.",
      "Avoid touching wet fittings, damaged outlets or exposed wiring.",
      "Call directly if there is heat, smoke, burning smell, sparking or shock risk.",
    ],
    whatToSend: [
      "A clear photo of the switchboard and the switch that trips.",
      "Which rooms, outlets or appliances lose power.",
      "Whether it started after rain, a storm, new appliance use or recent work.",
      "Your suburb, contact number and best access notes.",
    ],
    relatedServices: commonRelatedServices,
    faqs: [
      {
        question: "Is a tripping safety switch urgent?",
        answer:
          "It can be urgent if it keeps happening, affects essential power, or comes with heat, burning smell, sparking or water. Call first if the fault feels unsafe.",
      },
      {
        question: "Can I keep resetting the safety switch?",
        answer:
          "No. Repeated resets can hide a real fault and make the problem harder to diagnose. If it trips again, have the circuit tested.",
      },
      {
        question: "Can rain make an RCD trip?",
        answer:
          "Yes. Outdoor lights, power points, pumps and weather-affected fittings can trip safety switches after rain.",
      },
    ],
  },
  {
    slug: "burning-smell-from-switchboard",
    title: "Burning Smell From Switchboard",
    metaTitle: "Burning Smell From Switchboard Sydney & Surrounding Regions",
    metaDescription:
      "Burning smell near a switchboard in Sydney? Call Evaready Electrical for urgent electrical fault support before touching the board.",
    intro:
      "A burning smell near the switchboard should be treated seriously. Heat at a board can come from loose connections, damaged breakers, overloaded circuits, old fuses or burnt wiring.",
    primaryAdvice:
      "Call immediately if you smell burning, see smoke or notice heat around the board. Keep clear of the switchboard until the fault has been checked.",
    riskNotes: [
      "Loose connections can create heat at terminals.",
      "Overloaded circuits can leave damage inside the board.",
      "Old ceramic fuses may hide poor contact or heat marks.",
      "Burnt wiring needs proper testing before the circuit is used again.",
    ],
    checks: [
      "Do not remove switchboard covers.",
      "Do not spray water or cleaners near electrical equipment.",
      "If there is smoke, heat or active sparking, keep clear and call emergency services if needed.",
      "Call Evaready Electrical before turning circuits back on.",
    ],
    whatToSend: [
      "A photo of the switchboard from a safe distance.",
      "Which area lost power or which breaker tripped.",
      "Whether the smell is constant or only when appliances are running.",
      "Any recent upgrade, renovation, storm or new appliance information.",
    ],
    relatedServices: commonRelatedServices,
    faqs: [
      {
        question: "Is a burning smell from a switchboard dangerous?",
        answer:
          "Yes. A burning smell can mean overheating or damaged electrical parts. Treat it as urgent and call before touching the board.",
      },
      {
        question: "Should I turn the power off?",
        answer:
          "If it is safe and you know how to isolate the main switch, turning power off can reduce risk. Do not touch the board if there is heat, smoke, sparking or water.",
      },
      {
        question: "Can a switchboard upgrade fix burning smells?",
        answer:
          "Sometimes, but the cause must be tested first. The repair may involve wiring, circuit protection, load issues or a full switchboard upgrade.",
      },
    ],
  },
  {
    slug: "no-power-in-one-room",
    title: "No Power In One Room",
    metaTitle: "No Power In One Room Sydney & Surrounding Regions",
    metaDescription:
      "No power in one room in Sydney? Evaready Electrical can trace tripped circuits, faulty outlets, damaged wiring and switchboard issues.",
    intro:
      "Power loss in one room can come from a tripped circuit, failed outlet, damaged wiring, overloaded power board or a problem at the switchboard.",
    primaryAdvice:
      "If one room has lost power and the issue will not reset, call for fault finding rather than guessing which outlet or appliance caused it.",
    riskNotes: [
      "A single faulty outlet can affect part of a circuit.",
      "Power boards and extension leads can overload a room.",
      "Rodent damage, water or old wiring can interrupt supply.",
      "A breaker or safety switch may trip again when the fault is still present.",
    ],
    checks: [
      "Check whether lights, power points or both are affected.",
      "Look for a tripped breaker or safety switch without forcing it repeatedly.",
      "Unplug appliances if it is safe and dry.",
      "Stop using any outlet that is hot, cracked, buzzing or discoloured.",
    ],
    whatToSend: [
      "Which room has lost power and what still works nearby.",
      "Photos of the switchboard and affected outlets.",
      "Whether it happened after plugging in an appliance.",
      "Any smell, noise, heat, water or storm details.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/services/power-point-installation-sydney",
        label: "Power point installation and repairs",
      },
    ],
    faqs: [
      {
        question: "Why would only one room lose power?",
        answer:
          "The affected room may be on one circuit, or one damaged outlet may be interrupting part of the circuit. Testing confirms the cause.",
      },
      {
        question: "Can I use an extension lead from another room?",
        answer:
          "Only as a temporary low-load workaround if everything is safe. Do not run heavy appliances from extension leads while a fault is unresolved.",
      },
      {
        question: "Should I call if the breaker stays on again?",
        answer:
          "If the issue returns, the outlet is damaged, or there are signs of heat or burning, call and have it checked.",
      },
    ],
  },
  {
    slug: "no-power-to-house",
    title: "No Power To House",
    metaTitle: "No Power To House Sydney & Surrounding Regions",
    metaDescription:
      "No power to the house in Sydney? Evaready Electrical can help check switchboards, tripped safety devices, storm faults and supply-side concerns.",
    intro:
      "No power to the whole house can come from a network outage, a tripped main switch or safety device, storm damage, damaged consumer mains, metering issues or a switchboard fault.",
    primaryAdvice:
      "If your neighbours still have power, or only your property is affected, call Evaready Electrical before repeatedly resetting the switchboard.",
    riskNotes: [
      "A full property outage can involve the switchboard, consumer mains or service equipment.",
      "Storms, water, heat or burnt smells around the board should be treated as urgent.",
      "A partial supply problem can affect appliances and sensitive equipment.",
      "Supply-side concerns may need Level 2 electrical support.",
    ],
    checks: [
      "Check from a safe place whether nearby properties also have no power.",
      "Look for tripped safety switches or breakers without forcing repeated resets.",
      "Keep clear of wet switchboards, fallen lines, damaged service equipment or burnt smells.",
      "Call first if the outage is only at your property or the board will not reset safely.",
    ],
    whatToSend: [
      "A photo of the switchboard from a safe distance.",
      "Whether the whole property or only some circuits are affected.",
      "Whether neighbours or nearby shops still have power.",
      "Any storm, water, burning smell, buzzing, heat or defect notice details.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/level-2-electrician-sydney",
        label: "Level 2 electrician",
      },
      {
        href: "/services/consumer-mains-sydney",
        label: "Consumer mains support",
      },
      {
        href: "/services/storm-damage-electrician-sydney",
        label: "Storm damage electrical checks",
      },
    ],
    faqs: [
      {
        question: "Who do I call if my whole house has no power?",
        answer:
          "If the street is out, the electricity network may be involved. If only your property is affected, call Evaready Electrical for switchboard, circuit and supply-side checks.",
      },
      {
        question: "Should I keep resetting the main switch?",
        answer:
          "No. One careful reset may be reasonable if the board is dry and safe, but repeated tripping should be checked before power is forced back on.",
      },
      {
        question: "Can no power to the house require Level 2 work?",
        answer:
          "Sometimes. If the issue involves consumer mains, metering, overhead service lines or service equipment, Level 2 electrical support may be needed.",
      },
    ],
  },
  {
    slug: "power-point-sparking",
    title: "Power Point Sparking",
    metaTitle: "Power Point Sparking Sydney & Surrounding Regions",
    metaDescription:
      "Power point sparking in Sydney? Stop using the outlet and call Evaready Electrical for safe testing, repair or replacement.",
    intro:
      "A power point that sparks, buzzes, feels loose or looks burnt should not be ignored. The issue may be a worn socket, loose connection, damaged wiring or overloaded circuit.",
    primaryAdvice:
      "Stop using the outlet and call if the sparking is repeated, strong, noisy, leaves marks or happens with more than one appliance.",
    riskNotes: [
      "Loose outlets can arc under load.",
      "Heat marks or yellowing can show damage behind the plate.",
      "High-load appliances may need a dedicated circuit.",
      "Older outlets can become worn and unsafe.",
    ],
    checks: [
      "Unplug the appliance if it is safe and dry.",
      "Do not use the outlet again until it is checked.",
      "Do not remove the outlet cover yourself.",
      "Call first if there is smoke, a burning smell or visible damage.",
    ],
    whatToSend: [
      "A photo of the outlet and surrounding wall.",
      "What appliance was plugged in when it sparked.",
      "Whether the outlet feels hot, loose or discoloured.",
      "A switchboard photo if the circuit also tripped.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/services/power-point-installation-sydney",
        label: "Power point installation and repairs",
      },
    ],
    faqs: [
      {
        question: "Is a small spark normal when plugging something in?",
        answer:
          "A tiny momentary spark can happen with some loads, but repeated, loud, bright or smoky sparking is not normal and should be checked.",
      },
      {
        question: "Can a sparking outlet be replaced?",
        answer:
          "Often yes, but the wiring and circuit should be checked so the real cause is repaired.",
      },
      {
        question: "Should I keep using the appliance elsewhere?",
        answer:
          "Only if the appliance appears undamaged and safe. If the appliance caused tripping, heat or burning smell, stop using it until assessed.",
      },
    ],
  },
  {
    slug: "burning-smell-from-outlet",
    title: "Burning Smell From Outlet",
    metaTitle: "Burning Smell From Outlet Sydney & Surrounding Regions",
    metaDescription:
      "Burning smell from an outlet in Sydney? Stop using the power point and call Evaready Electrical for urgent testing and repair.",
    intro:
      "A burning smell from a power point, switch or nearby wall can point to heat behind the fitting, loose terminals, damaged contacts, overloaded wiring or a failing appliance.",
    primaryAdvice:
      "Stop using the outlet, unplug the appliance if it is safe, and call before turning the circuit back on or trying another appliance in the same point.",
    riskNotes: [
      "Heat can build behind an outlet before visible burn marks appear.",
      "Loose terminals can arc when a load is connected.",
      "High-load appliances can expose weak outlets or overloaded circuits.",
      "A damaged plug, socket or cable can continue to smell after the appliance is removed.",
    ],
    checks: [
      "Do not keep using the outlet to see if the smell returns.",
      "Keep clear if there is smoke, heat, sparking or wall discolouration.",
      "Avoid touching the fitting if it feels hot or is near water.",
      "Call first if the smell is strong, repeated or connected to power loss.",
    ],
    whatToSend: [
      "A photo of the outlet and the appliance that was plugged in.",
      "Whether the outlet feels hot, loose, discoloured or noisy.",
      "Whether a safety switch or breaker tripped at the same time.",
      "A switchboard photo and your suburb if it is safe to take one.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/services/power-point-installation-sydney",
        label: "Power point repairs",
      },
    ],
    faqs: [
      {
        question: "Is a burning smell from an outlet urgent?",
        answer:
          "Yes. Stop using the outlet and call before it is used again. Heat or arcing behind a fitting can become dangerous quickly.",
      },
      {
        question: "Could the appliance be causing the smell?",
        answer:
          "Yes. The appliance, plug top, outlet, wiring or circuit can all be involved, so proper testing is needed before reuse.",
      },
      {
        question: "Can the outlet just be replaced?",
        answer:
          "Sometimes, but the wiring and load should be checked first so the cause is fixed, not just the visible fitting.",
      },
    ],
  },
  {
    slug: "safety-switch-trips-at-night",
    title: "Safety Switch Trips At Night",
    metaTitle: "Safety Switch Trips At Night Sydney & Surrounding Regions",
    metaDescription:
      "Safety switch trips at night in Sydney? Evaready Electrical can trace appliance, hot water, outdoor and circuit faults that trip after hours.",
    intro:
      "A safety switch that trips at night can be frustrating because the cause may be intermittent. Common triggers include hot water circuits, fridges, outdoor lighting, pumps, moisture and appliances that run on timers.",
    primaryAdvice:
      "Do not keep resetting it through the night. If the same safety switch keeps tripping, call for fault finding before the issue damages equipment or creates a safety risk.",
    riskNotes: [
      "Hot water systems and timed loads can trip while people are asleep.",
      "Outdoor circuits may trip overnight when moisture builds up.",
      "Fridges, pumps and appliances can fail intermittently under load.",
      "Repeated resets can make the real cause harder to identify.",
    ],
    checks: [
      "Note the time it trips and which rooms or appliances lose power.",
      "Do not unplug appliances in wet or unsafe areas.",
      "Avoid repeated resets if the switch trips again straight away.",
      "Call first if there is burning smell, heat, buzzing or sparking.",
    ],
    whatToSend: [
      "A photo of the switchboard and the safety switch that trips.",
      "The time it usually trips and what appliances run overnight.",
      "Whether outdoor lights, pumps or hot water are connected to the circuit.",
      "Any rain, storm or moisture details.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/services/hot-water-system-electrician-sydney",
        label: "Hot water electrical faults",
      },
    ],
    faqs: [
      {
        question: "Why would a safety switch trip only at night?",
        answer:
          "Timed appliances, hot water circuits, moisture, outdoor lights or intermittent appliance faults can trip after hours.",
      },
      {
        question: "Should I switch appliances off overnight?",
        answer:
          "Only where it is safe and practical. Do not touch wet fittings or damaged equipment. A recurring night trip should be tested.",
      },
      {
        question: "Can an electrician find an intermittent fault?",
        answer:
          "Yes. Photos, timing, circuit information and proper testing help narrow down intermittent tripping faults.",
      },
    ],
  },
  {
    slug: "circuit-breaker-keeps-tripping",
    title: "Circuit Breaker Keeps Tripping",
    metaTitle: "Circuit Breaker Keeps Tripping Sydney & Surrounding Regions",
    metaDescription:
      "Circuit breaker keeps tripping in Sydney? Evaready Electrical can check overloaded circuits, faulty appliances, wiring damage and switchboard issues.",
    intro:
      "A circuit breaker that keeps tripping is telling you the circuit is overloaded, faulty or being affected by a connected appliance or wiring issue.",
    primaryAdvice:
      "If a breaker trips repeatedly, do not force it back on. Call for testing so the circuit, load and connected equipment can be checked safely.",
    riskNotes: [
      "Overloaded circuits can trip when multiple appliances run together.",
      "A faulty appliance can trip the breaker as soon as it starts.",
      "Damaged wiring can cause repeat faults even after the breaker resets.",
      "Old switchboards may need modern circuit protection or better labelling.",
    ],
    checks: [
      "Note which room, appliance or circuit loses power.",
      "Unplug recent appliances only if it is safe and dry.",
      "Do not keep holding or forcing the breaker on.",
      "Call directly if tripping comes with heat, buzzing, smoke or burning smell.",
    ],
    whatToSend: [
      "A switchboard photo showing the breaker that trips.",
      "Which appliances were running when it happened.",
      "Whether the tripping is instant or after a few minutes.",
      "Any visible damage, smell, heat or recent electrical changes.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/services/electrical-load-capacity-checks-sydney",
        label: "Load and capacity checks",
      },
    ],
    faqs: [
      {
        question: "Is a tripping circuit breaker dangerous?",
        answer:
          "It can be. A breaker protects the circuit, so repeated tripping should be tested rather than ignored.",
      },
      {
        question: "Can too many appliances trip a breaker?",
        answer:
          "Yes. Overload is common, but damaged wiring or faulty equipment can also cause tripping.",
      },
      {
        question: "Will a new breaker fix it?",
        answer:
          "Not always. The circuit and connected load should be checked before parts are replaced.",
      },
    ],
  },
  {
    slug: "power-surge-damage",
    title: "Power Surge Damage",
    metaTitle: "Power Surge Damage Sydney & Surrounding Regions",
    metaDescription:
      "Power surge damage in Sydney? Evaready Electrical can inspect affected circuits, switchboards and surge protection options after storms or supply events.",
    intro:
      "A power surge can affect appliances, lighting, electronics, switchboards and sensitive equipment. The damage is not always obvious straight away.",
    primaryAdvice:
      "If equipment failed after a storm, outage or supply event, stop resetting circuits and have the affected areas checked before reconnecting expensive appliances.",
    riskNotes: [
      "Storms and supply interruptions can damage electronics and protection devices.",
      "A surge can reveal weak switchboard protection.",
      "Burning smells or tripping after a surge should be treated as urgent.",
      "Some equipment may work briefly before failing again.",
    ],
    checks: [
      "Unplug damaged or burnt-smelling equipment if it is safe.",
      "Do not use outlets that are hot, buzzing or discoloured.",
      "Record which appliances or rooms were affected.",
      "Call first if the switchboard trips repeatedly after the surge.",
    ],
    whatToSend: [
      "Photos of damaged equipment, outlets and the switchboard.",
      "Whether the surge followed a storm, outage or network issue.",
      "Which rooms or circuits were affected.",
      "Whether any protection device, safety switch or breaker tripped.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/services/surge-protection-electrician-sydney",
        label: "Surge protection electrician",
      },
      {
        href: "/services/storm-damage-electrician-sydney",
        label: "Storm damage electrical checks",
      },
    ],
    faqs: [
      {
        question: "Can a power surge damage wiring?",
        answer:
          "A surge can damage appliances, electronics, protection devices and sometimes wiring or fittings connected to the affected circuit.",
      },
      {
        question: "Should I turn everything back on after a surge?",
        answer:
          "Not if equipment smells burnt, outlets are hot, or circuits trip. Have the affected area checked first.",
      },
      {
        question: "Can surge protection be added later?",
        answer:
          "Yes. Surge protection can often be added at the switchboard after the existing setup is checked.",
      },
    ],
  },
  {
    slug: "hot-power-point",
    title: "Hot Power Point",
    metaTitle: "Hot Power Point Sydney & Surrounding Regions",
    metaDescription:
      "Hot power point in Sydney? Evaready Electrical can check loose connections, overloaded outlets, damaged wiring and circuit load issues.",
    intro:
      "A power point that feels hot is a warning sign. Heat can come from loose connections, heavy appliance load, damaged contacts or wiring behind the outlet.",
    primaryAdvice:
      "Turn the appliance off, stop using the outlet and call if the power point stays warm, smells burnt or shows damage.",
    riskNotes: [
      "Heat can build behind the wall before marks are visible.",
      "Large appliances can overload old or unsuitable outlets.",
      "Loose terminals can create resistance and heat.",
      "A hot outlet may be connected to a wider circuit problem.",
    ],
    checks: [
      "Switch off and unplug the appliance if safe.",
      "Do not touch the outlet again if it is very hot or damaged.",
      "Avoid using adapters or power boards on that outlet.",
      "Call directly if there is burning smell, smoke or sparking.",
    ],
    whatToSend: [
      "A photo of the outlet and appliance.",
      "How long the appliance had been running.",
      "Whether the switchboard tripped.",
      "Any visible marks, smell, buzzing or loose plug details.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/services/electrical-load-capacity-checks-sydney",
        label: "Load and capacity checks",
      },
    ],
    faqs: [
      {
        question: "Can a warm power point be normal?",
        answer:
          "Power points should not become hot in normal use. Warmth around high-load appliances should be checked if it continues or comes with marks, smell or buzzing.",
      },
      {
        question: "What appliances commonly cause hot outlets?",
        answer:
          "Heaters, dryers, kettles, ovens, portable air conditioners and other high-load appliances can expose weak outlets or overloaded circuits.",
      },
      {
        question: "Will replacing the outlet fix it?",
        answer:
          "Sometimes, but the circuit and load should be checked first so the repair is not just cosmetic.",
      },
    ],
  },
  {
    slug: "lights-flickering",
    title: "Lights Flickering",
    metaTitle: "Lights Flickering Sydney & Surrounding Regions",
    metaDescription:
      "Lights flickering in Sydney? Evaready Electrical can check fittings, circuits, switchboards, loose connections and load issues.",
    intro:
      "Flickering lights can be a simple fitting issue, but it can also point to loose connections, damaged wiring, switchboard problems or larger load issues.",
    primaryAdvice:
      "Call if flickering affects multiple rooms, happens when appliances start, or comes with buzzing, heat, burning smell or repeated tripping.",
    riskNotes: [
      "Loose neutral or active connections can cause unstable lighting.",
      "Old fittings or transformers may fail intermittently.",
      "Large appliances can cause dips if the circuit or supply is strained.",
      "Flickering after storms can involve water or supply-side issues.",
    ],
    checks: [
      "Note whether one light, one room or the whole property flickers.",
      "Check whether it happens when a large appliance starts.",
      "Do not keep using a fitting that buzzes, smells or gets hot.",
      "Call if flickering is sudden, widespread or worsening.",
    ],
    whatToSend: [
      "A short video of the flickering if safe to capture.",
      "Which rooms and fittings are affected.",
      "Whether appliances, storms or rain seem connected.",
      "Photos of the switchboard and the affected fittings.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/services/lighting-electrician-sydney",
        label: "Lighting electrician",
      },
    ],
    faqs: [
      {
        question: "Are flickering lights dangerous?",
        answer:
          "They can be. One failing lamp may be minor, but whole-room or whole-home flickering should be checked because it may involve wiring, load or supply issues.",
      },
      {
        question: "Can LED lights flicker because of old dimmers?",
        answer:
          "Yes. Some LED fittings need compatible dimmers and drivers. The circuit should still be checked if flickering is severe or inconsistent.",
      },
      {
        question: "Why do lights flicker when an appliance turns on?",
        answer:
          "The appliance may be drawing a high starting load, or there may be a circuit, switchboard or supply capacity issue.",
      },
    ],
  },
  {
    slug: "rcd-trips-when-raining",
    title: "RCD Trips When Raining",
    metaTitle: "RCD Trips When Raining Sydney & Surrounding Regions",
    metaDescription:
      "RCD trips when raining in Sydney? Evaready Electrical can test outdoor circuits, water-affected fittings and safety switch faults.",
    intro:
      "An RCD or safety switch that trips when it rains often points to water entering an outdoor light, power point, pump, cable joint or weather-exposed fitting.",
    primaryAdvice:
      "Do not keep resetting the RCD in wet weather. Water-affected electrical equipment should be tested before the circuit is used again.",
    riskNotes: [
      "Outdoor lights and sensor lights can let water in as seals age.",
      "Garden outlets, pumps and pool equipment can trip when wet.",
      "Damaged underground or external cabling can cause intermittent faults.",
      "Storms can make a weak fitting fail suddenly.",
    ],
    checks: [
      "Keep clear of wet fittings, cords and outdoor outlets.",
      "Unplug outdoor appliances only if it is safe and dry.",
      "Note whether the same circuit trips every time it rains.",
      "Call if rain-related tripping affects essential power or keeps returning.",
    ],
    whatToSend: [
      "Photos of outdoor lights, outlets, pumps or garden power connected to the circuit.",
      "A switchboard photo showing the RCD that trips.",
      "Whether the fault happens during light rain, heavy rain or after storms.",
      "Any recent outdoor electrical work or damage.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/services/storm-damage-electrician-sydney",
        label: "Storm damage electrical checks",
      },
    ],
    faqs: [
      {
        question: "Why does rain make my RCD trip?",
        answer:
          "Moisture can create leakage to earth in outdoor fittings, damaged cables or connected appliances. The RCD trips to reduce shock risk.",
      },
      {
        question: "Can the circuit be left off until dry?",
        answer:
          "Leaving it off may reduce immediate risk, but the fault should still be found because it can return next time it rains.",
      },
      {
        question: "Can outdoor fittings be made more reliable?",
        answer:
          "Yes. Weather-rated fittings, proper sealing, correct cable entry and circuit testing can reduce repeat rain-related faults.",
      },
    ],
  },
  {
    slug: "power-outage-after-storm",
    title: "Power Outage After Storm",
    metaTitle: "Power Outage After Storm Sydney & Surrounding Regions",
    metaDescription:
      "Power outage after a storm in Sydney? Evaready Electrical can help check storm-damaged circuits, switchboards, outdoor fittings and supply concerns.",
    intro:
      "Storms can cause power outages through water ingress, damaged outdoor equipment, tripped safety switches, switchboard faults or supply-side issues.",
    primaryAdvice:
      "If there is water, smoke, sparking, a fallen service line or damage near supply equipment, keep clear and call before touching anything.",
    riskNotes: [
      "Water can enter outdoor lights, roof spaces and fittings.",
      "Storm damage can trip safety switches or damage equipment.",
      "Private poles and overhead services may need supply-side attention.",
      "A partial outage can involve a circuit fault or a broader supply issue.",
    ],
    checks: [
      "Check whether neighbours also lost power if it is safe to do so.",
      "Do not touch wet switchboards, fallen lines or damaged service equipment.",
      "Avoid using water-affected outlets or appliances.",
      "Call if only your property is affected or the switchboard will not reset.",
    ],
    whatToSend: [
      "Photos of the switchboard and any storm-damaged electrical area.",
      "Whether power is off everywhere or only in certain rooms.",
      "Any fallen branches, damaged private pole or overhead service concern.",
      "Whether safety switches trip again after the storm.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/services/storm-damage-electrician-sydney",
        label: "Storm damage electrical checks",
      },
      {
        href: "/services/private-power-pole-sydney",
        label: "Private power pole support",
      },
    ],
    faqs: [
      {
        question: "Should I call the electricity network or an electrician?",
        answer:
          "If the whole street is out, the network may be involved. If only your property or some circuits are affected, call Evaready Electrical for fault support.",
      },
      {
        question: "Can I turn power back on after water damage?",
        answer:
          "Do not energise water-affected electrical equipment until it has been checked safely.",
      },
      {
        question: "Can storm damage affect private poles?",
        answer:
          "Yes. Branches, wind and impact damage can affect private poles or overhead services, and the electrical side should be assessed carefully.",
      },
    ],
  },
  {
    slug: "electric-shock-from-outlet",
    title: "Electric Shock From Outlet",
    metaTitle: "Electric Shock From Outlet Sydney & Surrounding Regions",
    metaDescription:
      "Electric shock from an outlet in Sydney? Stop using the power point and call Evaready Electrical for urgent electrical fault support.",
    intro:
      "A shock or tingle from a power point, switch, appliance or metal fitting should be treated as urgent. It may point to damaged wiring, poor earthing, moisture, a faulty appliance or a switchboard protection issue.",
    primaryAdvice:
      "Do not keep using the outlet or appliance. Keep people away from the area and call before touching the affected fitting again.",
    riskNotes: [
      "A shock can indicate a live fault or earthing problem.",
      "Moisture around outlets, bathrooms, kitchens or outdoor fittings can increase risk.",
      "A faulty appliance may energise exposed metal parts.",
      "Older switchboards may not provide suitable modern protection.",
    ],
    checks: [
      "Stop using the outlet, switch or appliance immediately.",
      "Keep children, pets and other people away from the area.",
      "Do not remove covers or try to inspect wiring yourself.",
      "Call emergency services first if someone is injured or there is immediate danger.",
    ],
    whatToSend: [
      "Which outlet, switch, appliance or fitting caused the shock.",
      "Whether the area is wet, outdoors or near plumbing.",
      "A photo of the affected area from a safe distance.",
      "A switchboard photo if a safety switch or breaker tripped.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/services/power-point-installation-sydney",
        label: "Power point repairs",
      },
      {
        href: "/services/electrical-testing-tagging-reports-sydney",
        label: "Electrical testing and reports",
      },
    ],
    faqs: [
      {
        question: "Is a small electric shock from an outlet urgent?",
        answer:
          "Yes. Even a small shock can point to a dangerous fault. Stop using the outlet and call before anyone touches it again.",
      },
      {
        question: "Could the appliance be the problem?",
        answer:
          "Yes. The appliance, outlet, circuit or switchboard protection may be involved, so the fault should be tested properly.",
      },
      {
        question: "Should I turn the circuit off?",
        answer:
          "If it is safe and you know which switch controls the circuit, isolating it can reduce risk. Do not touch a wet or damaged switchboard.",
      },
    ],
  },
  {
    slug: "smoke-from-electrical-panel",
    title: "Smoke From Electrical Panel",
    metaTitle: "Smoke From Electrical Panel Sydney & Surrounding Regions",
    metaDescription:
      "Smoke from an electrical panel or switchboard in Sydney? Keep clear and call Evaready Electrical for urgent electrical support.",
    intro:
      "Smoke from an electrical panel, meter area or switchboard is a serious warning sign. It can come from overheating, arcing, loose connections, burnt wiring, overloaded circuits or damaged protection devices.",
    primaryAdvice:
      "Keep clear of the panel and call immediately. If there is active fire, heavy smoke or danger to people, call emergency services first.",
    riskNotes: [
      "Smoke can mean wiring or equipment is overheating behind the cover.",
      "Loose terminals can arc and damage nearby components.",
      "Old ceramic fuse boards and overloaded circuits can hide heat damage.",
      "Supply-side issues may need Level 2 electrical attention.",
    ],
    checks: [
      "Do not open the electrical panel or switchboard cover.",
      "Do not spray water near electrical equipment.",
      "Keep people away from the area until it is checked.",
      "Call first if the smell, smoke, buzzing or heat continues.",
    ],
    whatToSend: [
      "A photo of the panel from a safe distance.",
      "Whether smoke is active, stopped or linked to a specific appliance.",
      "Which circuits lost power or tripped.",
      "Any recent storm, renovation, new appliance or switchboard work details.",
    ],
    relatedServices: [
      ...commonRelatedServices,
      {
        href: "/level-2-electrician-sydney",
        label: "Level 2 electrician",
      },
      {
        href: "/services/consumer-mains-sydney",
        label: "Consumer mains support",
      },
    ],
    faqs: [
      {
        question: "What should I do if smoke is coming from the switchboard?",
        answer:
          "Keep clear, avoid touching the board and call immediately. If there is fire or danger to people, call emergency services first.",
      },
      {
        question: "Can the panel be used again after smoke stops?",
        answer:
          "No. Smoke can leave damage behind the cover. The board should be inspected and tested before normal use resumes.",
      },
      {
        question: "Could this require Level 2 electrical work?",
        answer:
          "Sometimes. If the issue involves service equipment, consumer mains, metering or supply-side parts, Level 2 support may be needed.",
      },
    ],
  },
];

export function getElectricalFaultPage(slug: string) {
  return electricalFaultPages.find((page) => page.slug === slug);
}
