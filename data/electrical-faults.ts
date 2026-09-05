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
      "Safety switch keeps tripping? Understand leakage faults, safe stop-use steps and what our licensed electricians test in Sydney and surrounding regions.",
    intro:
      "A safety switch that keeps tripping can indicate electrical leakage from wiring, an appliance or moisture. Stop using the affected equipment and do not keep resetting it. For fire, serious injury or immediate danger, keep clear and call Triple Zero (000) first. Seek medical advice after any electric shock, even if you feel well.",
    primaryAdvice:
      "Leave the affected circuit off. Do not bypass the safety switch or open the switchboard. Our licensed electricians can investigate recurring trips once any immediate danger has been addressed.",
    riskNotes: [
      "An RCD safety switch detects current leaking away from its intended path. A circuit breaker responds to overcurrent; a combined device provides both functions. A trip alone does not identify which fault is present.",
      "Moisture in an outdoor fitting, deteriorated cable insulation or a faulty appliance can cause leakage. The timing of a trip may help narrow the investigation, but is not a diagnosis.",
      "Our licensed electricians identify the affected circuit, inspect accessible equipment and test the wiring and protective device under safe isolation. Intermittent faults may need further investigation if they are not present during the visit.",
      "The next step may be repairing damaged wiring or a fitting, keeping an unsafe appliance disconnected, or replacing a defective protective device. A switchboard upgrade is not automatically the answer to a recurring trip.",
    ],
    checks: [
      "From a safe place, note which lights or appliances stopped working. Do not move between outlets to recreate the trip or test a suspect appliance yourself.",
      "Keep people away from wet, damaged, hot or sparking equipment. Do not touch fittings to check their temperature or remove switchboard covers.",
      "Do not reset repeatedly, hold a switch on or defeat its protection. A circuit staying on later does not prove the original fault has gone.",
      "After emergency risks are addressed, contact our licensed electricians for recurring trips. If essential medical equipment loses supply, follow its emergency plan and call 000 for immediate danger to the person.",
    ],
    whatToSend: [
      "Only if already safe, a photo showing the visible switch labels from outside the closed switchboard. Never approach a hazard, remove a cover or delay emergency help for photos.",
      "Which rooms, lights or appliances stopped working, and whether one or several devices tripped. Report what you already observed without recreating the fault.",
      "When the trips occurred and whether rain, outdoor equipment, a particular appliance or recent electrical work coincided with them.",
      "Your suburb and a way to contact you through the quote form for non-urgent work. Explain any essential equipment affected when calling; do not include private access codes in photos.",
    ],
    relatedServices: commonRelatedServices,
    faqs: [
      {
        question: "Is a tripping safety switch urgent?",
        answer:
          "Recurring trips need assessment. Keep clear of smoke, sparking, heat or wet equipment. For fire or immediate danger call 000 first; a quote form is not emergency assistance. Leave the affected circuit off until the fault is assessed.",
      },
      {
        question: "Can I keep resetting the safety switch?",
        answer:
          "No. Do not keep re-energising a circuit with an unresolved fault, hold the switch on or bypass it. Our licensed electricians can test the circuit and device instead of relying on trial-and-error resets.",
      },
      {
        question: "Can rain make an RCD trip?",
        answer:
          "Yes. Water entering a fitting or damaged equipment may cause leakage, but rain alone does not prove the source. Keep clear of wet equipment and arrange testing; do not open outdoor fittings or use them again simply because they have dried.",
      },
    ],
  },
  {
    slug: "burning-smell-from-switchboard",
    title: "Burning Smell From Switchboard",
    metaTitle: "Burning Smell From Switchboard Sydney & Surrounding Regions",
    metaDescription:
      "Burning smell near a switchboard? Keep clear, know when to call 000 and understand the electrical inspection and repair process for Sydney properties.",
    intro:
      "A burning smell near a switchboard can indicate overheating or an electrical fire. Keep clear of the board and move people away. For fire, smoke with immediate danger or serious injury, call Triple Zero (000) first from a safe place. Do not touch the board or attempt to locate the smell inside it.",
    primaryAdvice:
      "Do not operate or open a switchboard that smells burnt, is hot, wet, smoking or sparking. Emergency help comes before an electrician booking. Once safe, arrange inspection before affected equipment is used again.",
    riskNotes: [
      "A loose connection can overheat under load without immediately interrupting supply. A breaker remaining on is not evidence that a burning smell is harmless.",
      "Damaged protective devices, deteriorated wiring or excessive load are possible causes. Discolouration visible from a safe position is useful information, not a reason to remove covers.",
      "Our licensed electricians first establish safe isolation, then inspect accessible connections, conductors and protective equipment. Testing and load assessment help distinguish the damaged part from the cause of the overheating.",
      "Repairs may involve affected wiring, connections or protection, followed by testing before restoration. Network-owned or sealed supply equipment requires the appropriate distributor process and authorisation; a general repair does not authorise access to it.",
    ],
    checks: [
      "Do not remove covers, change fuses, tighten terminals or touch the board to check for heat. Do not approach it to switch off if that exposes you to the hazard.",
      "Do not use water on electrical equipment or try to extinguish an electrical fire yourself. Leave the danger area and follow emergency-service instructions.",
      "Keep clear even if the smell stops or the lights remain on. Hidden heat damage needs assessment before the affected installation is put back into service.",
      "Tell our licensed electricians about the smell after urgent safety needs are addressed. If anyone received an electric shock, seek medical advice even if they feel well; call 000 for serious injury or immediate danger.",
    ],
    whatToSend: [
      "Photos are optional and only for a situation already made safe. Do not approach the board, open a cover or delay emergency help to photograph it.",
      "When you first noticed the smell, any smoke or sound you already observed, and which areas lost power. Do not return to the hazard to collect details.",
      "Whether a particular load was operating at the time, without switching it on again to reproduce the smell.",
      "Any recent electrical work, storm or water exposure, and whether emergency services or the distributor have already attended. Pass on their restrictions before arranging work.",
    ],
    relatedServices: commonRelatedServices,
    faqs: [
      {
        question: "Is a burning smell from a switchboard dangerous?",
        answer:
          "It may indicate overheating or fire, including damage hidden behind the cover. Keep clear. Call 000 for fire or immediate danger before contacting an electrician; do not wait for a quote response.",
      },
      {
        question: "Should I turn the power off?",
        answer:
          "Do not approach or operate the suspect board to isolate it. Heat, smoke, water or arcing may make touching it dangerous. Stay clear and follow emergency-service or distributor instructions; safe isolation is part of the professional response.",
      },
      {
        question: "Can a switchboard upgrade fix burning smells?",
        answer:
          "An upgrade is not a diagnosis. Testing may identify a damaged connection, circuit or protective device that needs repair, or wider deterioration requiring replacement work. Our licensed electricians explain the findings and limits before recommending the scope.",
      },
    ],
  },
  {
    slug: "no-power-in-one-room",
    title: "No Power In One Room",
    metaTitle: "No Power In One Room Sydney & Surrounding Regions",
    metaDescription:
      "No power in one room? Learn safe observations, possible circuit faults and what our licensed electricians check before restoring supply in Sydney.",
    intro:
      "If one room loses power, stop using any affected equipment that is damaged, wet, buzzing or smells burnt. For fire, serious injury or immediate danger, keep clear and call Triple Zero (000) first. A room outage may involve a circuit or appliance fault; working lights elsewhere do not prove the affected outlets are safe.",
    primaryAdvice:
      "Do not repeatedly reset protection or use another appliance to test a dead outlet. Leave the affected equipment unused and arrange fault finding after any immediate danger is addressed.",
    riskNotes: [
      "Room boundaries do not necessarily match circuit boundaries. Lights and power points may use different circuits, while outlets in adjoining rooms may share one circuit.",
      "A tripped protective device, failed connection, damaged outlet or connected appliance are possible causes. A dead-looking outlet can still contain live conductors; do not remove its cover.",
      "Our licensed electricians identify what has lost supply, safely isolate the affected circuit and inspect and test accessible wiring, outlets and protection. An appliance problem may need separate appliance assessment.",
      "The repair may be a damaged outlet or connection, wiring repair or correction of an unsuitable load arrangement. The circuit is tested before restoration; hidden or intermittent faults may require further access or investigation.",
    ],
    checks: [
      "Note which lights and appliances have already stopped working and what still operates nearby. Do not plug equipment into different sockets to map the fault yourself.",
      "If the switchboard can already be seen safely, report visible switch positions without opening it or operating switches. Do not keep trying resets.",
      "Keep away from damaged or wet outlets and cords. Do not touch a fitting to check for heat, dismantle a power board or improvise a connection.",
      "Do not bypass the affected circuit with extension leads or power-board chains. If essential medical equipment is affected, follow its emergency plan and call 000 for immediate danger. Seek medical advice after any electric shock.",
    ],
    whatToSend: [
      "Which room, lights or appliances stopped working and whether adjoining areas are affected. Use observations you already have rather than testing suspect outlets.",
      "Optional photos from a safe distance only: never touch equipment, remove a cover or delay emergency help for a photo.",
      "When power was lost and what was operating at the time, plus any recent electrical work or appliance change. Do not recreate the fault.",
      "Any smell, sound, water exposure or visible damage already noticed, and whether anyone received a shock. Urgent hazards need a call rather than a quote-form response.",
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
          "A protective device or connection may interrupt only part of the installation. A circuit may also serve more than one room. Our licensed electricians establish the circuit arrangement and test it rather than assuming the room itself identifies the fault.",
      },
      {
        question: "Can I use an extension lead from another room?",
        answer:
          "Do not improvise an alternative supply while the fault is unresolved. Extension leads and chained power boards can introduce overload, damage and trip hazards. Arrange assessment and explain any essential equipment needs when calling.",
      },
      {
        question: "Should I call if the breaker stays on again?",
        answer:
          "Yes, an unexplained or recurring outage needs assessment even if power returns. Keep damaged or suspect equipment unused. A switch remaining on is not proof that wiring or an outlet is safe.",
      },
    ],
  },
  {
    slug: "no-power-to-house",
    title: "No Power To House",
    metaTitle: "No Power To House Sydney & Surrounding Regions",
    metaDescription:
      "No power to your house? Distinguish a network outage from a property fault, keep clear of hazards and understand the next safe steps in Sydney.",
    intro:
      "When the whole house loses power, keep clear of damaged lines, wet equipment and the switchboard if it looks or smells unsafe. For fire, serious injury or immediate danger, call Triple Zero (000) first. A network outage and a property fault need different responses; an outage does not make electrical equipment safe to touch.",
    primaryAdvice:
      "Check your electricity distributor's outage information from a safe place. Report fallen lines or damaged network equipment to the distributor. Do not repeatedly reset switches or open supply equipment to investigate.",
    riskNotes: [
      "A street outage may be network-related, but neighbouring lights alone do not confirm the cause at your property. Different properties or circuits can be supplied differently.",
      "A main protective device, switchboard connection or supply cable fault may interrupt the property. Smoke, burning smells, water or damaged service lines require a keep-clear response, not further checks at the board.",
      "Our licensed electricians can assess the accessible customer installation, establish safe isolation and test the affected equipment. Distributor-owned or sealed equipment must follow the distributor's process and the relevant authorisation requirements.",
      "Repair may involve customer wiring or protective equipment, or coordination with the distributor where the fault is outside that scope. Network restoration times are controlled by the distributor; a booking cannot guarantee when supply will return.",
    ],
    checks: [
      "Use a battery-powered light and check the distributor's outage updates from a safe location. Do not enter a hazardous area to compare neighbouring properties or inspect supply equipment.",
      "Treat fallen lines and anything touching them as live. Stay at least 8 metres away, keep others clear and contact the electricity distributor; call 000 for immediate danger.",
      "Do not open the meter enclosure, remove fuses, reset repeatedly or connect a generator through a power point. Solar or battery equipment can remain hazardous during a grid outage.",
      "If medical equipment depends on mains power, follow its emergency plan and seek emergency help for immediate danger. For a suspected property fault after urgent risks are addressed, contact our licensed electricians and explain what supply is missing.",
    ],
    whatToSend: [
      "Only safe, optional photos of externally visible equipment. Never approach fallen lines, wet or damaged equipment, remove covers or delay emergency help to take photos.",
      "When the outage began, whether all or only some equipment stopped, and any distributor outage reference or instructions already received.",
      "Whether surrounding properties appear affected from your existing safe position, and whether the property has solar, batteries or a generator. Do not operate these systems to test the fault.",
      "Storm, water, smell, sound or damage already observed. Mention critical medical equipment when seeking help; keep account numbers and private access details out of photographs.",
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
          "Call 000 first for fire or immediate danger. For a network outage or damaged lines, contact your electricity distributor, not just the retailer that sends your bill. Our licensed electricians can assess a suspected customer-installation fault; the distributor manages its own network restoration.",
      },
      {
        question: "Should I keep resetting the main switch?",
        answer:
          "No. Do not repeatedly re-energise an unresolved fault or operate a board that is wet, damaged, hot, smoking or sparking. Keep clear and arrange professional assessment after any emergency response.",
      },
      {
        question: "Can no power to the house require Level 2 work?",
        answer:
          "Some customer connection work requires the relevant Level 2 accreditation and distributor authorisation. Other faults belong to the distributor or the ordinary customer installation. The equipment and ownership boundary must be established before deciding who can do the work; not every electrician is authorised for every supply task.",
      },
    ],
  },
  {
    slug: "power-point-sparking",
    title: "Power Point Sparking",
    metaTitle: "Power Point Sparking Sydney & Surrounding Regions",
    metaDescription:
      "Power point sparking? Stop using it, keep clear of danger and learn what our licensed electricians inspect before repair or reuse in Sydney.",
    intro:
      "Repeated sparking, crackling or burn marks at a power point need a stop-use response. Keep people away and do not touch or unplug equipment that is hot, damaged, wet or actively sparking. For fire, serious injury or immediate danger, call Triple Zero (000) first. Seek medical advice after any electric shock, even if you feel well.",
    primaryAdvice:
      "Do not plug another appliance into the outlet or try the suspect appliance elsewhere. Our licensed electricians can assess the outlet, plug and circuit after immediate hazards have been addressed.",
    riskNotes: [
      "Worn socket contacts or a loose connection may arc when current flows. Noise, discolouration or a plug that previously fitted poorly are useful observations, but do not touch or wiggle it to investigate.",
      "A damaged plug or appliance may also be involved. Replacing the visible outlet without checking the associated wiring and equipment may leave the underlying fault unresolved.",
      "Our licensed electricians establish safe isolation and inspect the outlet, accessible wiring, plug condition and circuit protection. Testing helps decide whether the fault is in the fixed installation or needs separate appliance assessment.",
      "Work may include replacing a damaged outlet, repairing an affected connection or wiring, and checking the circuit before restoration. A dedicated circuit is only recommended where the assessed load and installation require it, not for every sparking outlet.",
    ],
    checks: [
      "Stop using the affected outlet and keep people away. Do not touch a sparking socket or damaged plug to disconnect it; do not approach an unsafe switchboard to isolate it.",
      "Do not recreate the spark, repeatedly reset a tripped device or test another appliance in the socket. A spark stopping does not establish that it is safe.",
      "Do not remove the cover, tighten screws, bend plug pins or spray anything into the outlet. Electrical testing and repairs belong with our licensed electricians.",
      "For fire or immediate danger, move to safety and call 000. Do not use water on electrical equipment. Once urgent risks are addressed, arrange inspection before the outlet or suspect appliance is reused.",
    ],
    whatToSend: [
      "Optional photos only from an already safe position, with no touching, unplugging or cover removal. Never delay emergency help or approach a hazard for a photo.",
      "Which appliance was connected and whether the spark happened on insertion, while running or without anyone touching the outlet. Do not repeat the event to check.",
      "Any noise, smell, visible damage or earlier loose fit already noticed. Do not touch the outlet to find out whether it is hot.",
      "Whether lights or other equipment lost power at the same time, and your suburb when requesting help. An urgent hazard needs a call, not a wait for a quote response.",
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
          "A brief spark can occur as some loads connect, but its appearance is not a reliable safety test. Stop using an outlet with recurring sparks, noise, heat, burning smell or damage. Do not recreate the event to decide whether it is normal; arrange assessment if you are unsure.",
      },
      {
        question: "Can a sparking outlet be replaced?",
        answer:
          "A damaged outlet may need replacement, but our licensed electricians first check the associated wiring, connection and protection. The plug or appliance may also need assessment. Replacing a faceplate alone is not a complete diagnosis.",
      },
      {
        question: "Should I keep using the appliance elsewhere?",
        answer:
          "No. Keep a suspect appliance out of use until assessed; moving it to another outlet can transfer the hazard. Do not unplug it yourself if touching the plug or outlet would expose you to heat, sparking, water or damage.",
      },
    ],
  },
  {
    slug: "burning-smell-from-outlet",
    title: "Burning Smell From Outlet",
    metaTitle: "Burning Smell From Outlet Sydney & Surrounding Regions",
    metaDescription:
      "Burning smell from an outlet? Keep clear, know when emergency help comes first and learn how our licensed electricians investigate hidden heat damage.",
    intro:
      "A burning smell from a power point or nearby wall may mean overheating behind the fitting, even without visible flames. Stop using the area and keep clear. For fire, serious injury or immediate danger, call Triple Zero (000) first from a safe place. Do not touch the outlet, plug or wall to check for heat.",
    primaryAdvice:
      "Do not use the outlet again, try another appliance or approach damaged equipment to disconnect it. After emergency risks are addressed, arrange inspection before the affected equipment is returned to service.",
    riskNotes: [
      "Poor contacts or a loose connection can generate heat behind an otherwise ordinary-looking outlet. A smell can continue after a load stops; the absence of a tripped breaker does not prove safety.",
      "The source may be the plug, appliance, outlet or wiring rather than the faceplate alone. The smell's location helps direct inspection but cannot establish the cause without testing.",
      "Our licensed electricians establish safe isolation and inspect the accessible outlet, connections, wiring and protection for heat damage. They assess the connected load and explain if separate appliance testing or additional access is needed.",
      "Repair may involve affected wiring or connections and a replacement outlet, followed by testing before restoration. Concealed damage can require further investigation; an outlet replacement does not certify the whole property or guarantee every hidden fault has been found.",
    ],
    checks: [
      "Do not switch the appliance back on to recreate the smell, use another appliance in the outlet or repeatedly reset circuit protection.",
      "Keep away from smoke, sparking, damaged equipment or wall discolouration. Do not remove covers, feel for heat, spray cleaners or use water on electrical equipment.",
      "Do not approach an unsafe switchboard to isolate the circuit or touch a suspect plug to remove it. Leave immediate hazards to the emergency response and safe isolation process.",
      "Seek medical advice after any electric shock, even if symptoms seem minor. Call 000 for serious injury or immediate danger. A smell fading later is not a reason to reuse the affected outlet before assessment.",
    ],
    whatToSend: [
      "Optional photos from an already safe distance only. Do not approach the fitting, move the appliance, remove covers or delay emergency help to take them.",
      "When the smell began and any noise, discolouration or smoke already observed. Do not touch the outlet or surrounding wall to collect more information.",
      "What equipment was operating and whether supply stopped at the same time, without reproducing the fault or testing another outlet.",
      "Your suburb and any emergency-service or distributor instructions already given. Use the quote form only for non-urgent follow-up after the area is safe.",
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
          "Treat it seriously and keep the outlet out of use. For fire or immediate danger, keep clear and call 000 before a business booking. Hidden heat damage can exist without flames or a tripped breaker, so arrange inspection even if the smell fades.",
      },
      {
        question: "Could the appliance be causing the smell?",
        answer:
          "Yes. A plug or appliance fault can resemble an outlet or wiring fault. Do not move the suspect appliance to another socket as a test. Our licensed electricians assess the fixed installation and explain when the appliance needs separate repair or assessment.",
      },
      {
        question: "Can the outlet just be replaced?",
        answer:
          "Replacement may be part of the repair, but the connected wiring, plug and load need assessment too. The agreed work depends on the findings and access available; changing the visible fitting alone may leave heat-damaged wiring or another cause unresolved.",
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
          "Only where it is safe and practical. Do not touch wet fixtures or damaged equipment. A recurring night trip should be tested.",
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
      "If equipment failed after a storm, outage or supply event, stop resetting affected circuits and have the affected areas checked before reconnecting expensive appliances.",
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
          "A surge can damage appliances, electronics, protection devices and sometimes wiring or fixtures connected to the affected circuit.",
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
        question: "What appliances commonly cause overheating power points?",
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
      "Lights flickering in Sydney? Evaready Electrical can check fixtures, circuits, switchboards, loose connections and load issues.",
    intro:
      "Flickering lights can be a simple fitting issue, but it can also point to loose connections, damaged wiring, switchboard problems or larger load issues.",
    primaryAdvice:
      "Call if flickering affects multiple rooms, happens when appliances start, or comes with buzzing, heat, burning smell or repeated tripping.",
    riskNotes: [
      "Loose neutral or active connections can cause unstable lighting.",
      "Old fixtures or transformers may fail intermittently.",
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
      "Which rooms and fixtures are affected.",
      "Whether appliances, storms or rain seem connected.",
      "Photos of the switchboard and the affected fixtures.",
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
          "Yes. Some LED fixtures need compatible dimmers and drivers. The circuit should still be checked if flickering is severe or inconsistent.",
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
      "RCD trips when raining in Sydney? Evaready Electrical can test outdoor circuits, water-damaged fixtures and safety switch faults.",
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
      "Keep clear of wet fixtures, cords and outdoor outlets.",
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
          "Moisture can create leakage to earth in outdoor fixtures, damaged cables or connected appliances. The RCD trips to reduce shock risk.",
      },
      {
        question: "Can the circuit be left off until dry?",
        answer:
          "Leaving it off may reduce immediate risk, but the fault should still be found because it can return next time it rains.",
      },
      {
        question: "Can outdoor fixtures be made more reliable?",
        answer:
          "Yes. Weather-rated fixtures, proper sealing, correct cable entry and circuit testing can reduce repeat rain-related faults.",
      },
    ],
  },
  {
    slug: "power-outage-after-storm",
    title: "Power Outage After Storm",
    metaTitle: "Power Outage After Storm Sydney & Surrounding Regions",
    metaDescription:
      "Power outage after a storm in Sydney? Evaready Electrical can help check storm-damaged circuits, switchboards, outdoor fixtures and supply concerns.",
    intro:
      "Storms can cause power outages through water ingress, damaged outdoor equipment, tripped safety switches, switchboard faults or supply-side issues.",
    primaryAdvice:
      "If there is water, smoke, sparking, a fallen service line or damage near supply equipment, keep clear and call before touching anything.",
    riskNotes: [
      "Water can enter outdoor lights, roof spaces and fixtures.",
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
          "Do not energise water-damaged electrical equipment until it has been checked safely.",
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
      "Moisture around outlets, bathrooms, kitchens or outdoor fixtures can increase risk.",
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

const emergencyFaultClusterSlugs = [
  "no-power-to-house",
  "no-power-in-one-room",
  "safety-switch-keeps-tripping",
  "rcd-trips-when-raining",
  "burning-smell-from-outlet",
  "burning-smell-from-switchboard",
  "power-point-sparking",
  "smoke-from-electrical-panel",
  "electric-shock-from-outlet",
  "hot-power-point",
  "power-surge-damage",
  "power-outage-after-storm",
  "lights-flickering",
  "circuit-breaker-keeps-tripping",
];

export const emergencyFaultClusterLinks: FaultRelatedLink[] =
  emergencyFaultClusterSlugs.flatMap((slug) => {
    const page = getElectricalFaultPage(slug);

    return page
      ? [
          {
            href: `/electrical-faults/${page.slug}`,
            label: page.title,
          },
        ]
      : [];
  });


