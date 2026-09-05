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
      "Safety switch tripping at night? Read safe next steps, possible timed-load or moisture causes and how our licensed electricians investigate recurring faults.",
    intro:
      "A safety switch tripping overnight is a symptom, not proof that a particular appliance is faulty. Leave the affected circuit off and do not keep resetting it. For fire, smoke, electric shock injury or immediate danger, move clear and call Triple Zero (000) before arranging electrical work.",
    primaryAdvice:
      "Leave the tripped circuit off. Record what you already noticed; do not recreate the fault or approach unsafe equipment to identify it.",
    riskNotes: [
      "A timer, hot water heating cycle, refrigerator cycle or pump starting overnight can coincide with a trip. Timing helps narrow an investigation but does not establish which item, cable or circuit is responsible.",
      "Moisture reaching a damaged outdoor fitting or cable can cause current leakage. An overnight pattern is not proof of water ingress, and a circuit that works again in daylight has not been shown to be safe.",
      "A safety switch detects current leaking from its intended path. A circuit breaker responds to overcurrent; a combined device performs both functions. Our licensed electricians identify the device and affected circuits rather than relying on its position or an old label.",
      "Several connected items or an intermittent insulation fault may be involved. Testing may need to consider the circuit, connected equipment and protection together; replacing the safety switch without finding the cause may leave the problem unresolved.",
    ],
    checks: [
      "From a safe place, note the time and which lights or appliances stopped. Use observations you already have; do not run appliances, adjust timers or reset protection to demonstrate a pattern.",
      "Keep clear of wet, damaged, hot or buzzing equipment. Do not remove covers, unplug suspect items or enter a dark roof space or outdoor area to investigate.",
      "Tell us if loss of power affects essential equipment. Follow any medical equipment emergency plan and call 000 if a person is in immediate danger; do not depend on a repair appointment for urgent medical needs.",
      "For a recurring trip without an active emergency, arrange an inspection. Our licensed electricians can isolate safely, inspect accessible wiring and equipment, test relevant protection and explain any additional investigation needed before proposing repairs.",
    ],
    whatToSend: [
      "Describe the overnight timing, frequency and equipment already known to have stopped. Say whether it is new or has happened before; do not guess which circuit supplies an appliance.",
      "Mention existing timers, recent appliance changes and any rain or dampness you already observed. These details guide testing but do not replace it.",
      "Only send an existing photo or one possible from a safe, dry position without approaching the suspect board, opening a cover or recreating the trip. Never delay emergency help for a photo.",
      "Explain access restrictions and any essential equipment affected. A quote may need an initial fault-finding visit; intermittent faults may require further monitoring or a later visit rather than an immediate definitive diagnosis.",
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
          "Some equipment runs automatically overnight, while moisture and temperature can change operating conditions. These are possibilities, not a diagnosis. A useful history records when power was lost and what was already running, without restarting anything to test the theory.",
      },
      {
        question: "Should I switch appliances off overnight?",
        answer:
          "Do not handle a suspect appliance or use repeated switching as a workaround. Leave the affected circuit off and seek advice about the fault. Tell the electrician about refrigeration, pumps or essential equipment so the impact can be considered without bypassing protection.",
      },
      {
        question: "Can an electrician find an intermittent fault?",
        answer:
          "Testing can narrow down likely causes, but an intermittent fault may not occur during the visit. We explain the findings, access limits and whether further investigation is needed. A quiet night or one normal test does not guarantee that the underlying problem has disappeared.",
      },
    ],
  },
  {
    slug: "circuit-breaker-keeps-tripping",
    title: "Circuit Breaker Keeps Tripping",
    metaTitle: "Circuit Breaker Keeps Tripping Sydney & Surrounding Regions",
    metaDescription:
      "Circuit breaker repeatedly tripping? Learn the difference from RCD trips, safe next steps and why circuit and load testing should come before replacement.",
    intro:
      "Repeated circuit breaker trips need investigation, not a larger breaker or repeated resets. Overload, equipment faults and wiring problems are possible causes. For smoke, fire, electric shock injury or immediate danger, keep clear and call Triple Zero (000) before booking an electrician.",
    primaryAdvice:
      "Leave the affected circuit off. Never hold a breaker on, bypass protection or fit a higher-rated device to stop it tripping.",
    riskNotes: [
      "A circuit breaker protects against overcurrent, including overload and short-circuit conditions. An RCD detects residual-current leakage, and a combined device provides both functions. Identifying the actual device matters before deciding what testing is needed.",
      "Several appliances sharing a circuit can exceed its capacity, even when plugged into different outlets. Room names and separate sockets do not prove separate circuits. An electrician assesses the connected load and wiring rather than guessing from the appliance count.",
      "A damaged appliance, cable or connection can also be involved. Whether the trip was immediate or delayed is useful history, but timing alone cannot distinguish an overload from every other fault.",
      "A replacement breaker must suit the circuit and installation. Increasing its rating without assessing the wiring can remove essential protection; an old board or repeat trip does not automatically justify a complete upgrade.",
    ],
    checks: [
      "Report which equipment stopped and what was already operating. Do not start a high-load appliance, move it to another socket or reset the breaker to reproduce the trip.",
      "Keep away from hot, damaged, wet or buzzing fittings and the suspect switchboard. Do not open covers, tighten terminals, change fuses or inspect wiring yourself.",
      "If you noticed smoke or a possible fire, move to safety and call 000. For a recurring fault without an active emergency, arrange testing before using the affected circuit again.",
      "Our licensed electricians identify the circuit, isolate safely and assess accessible wiring, connected load and protective devices. Repairs may involve damaged wiring or equipment, appropriate protection or a separately assessed additional circuit, depending on the findings.",
    ],
    whatToSend: [
      "List appliances already running before the trip and any recent installation changes. Include whether the problem is immediate or delayed, without conducting another test.",
      "Describe the affected rooms and any label you already know. Incorrect or missing labelling is useful to mention; do not open the board or approach damage to read it.",
      "Photos are optional and only appropriate from a safe, dry position, without touching suspect equipment or removing covers. Never delay emergency help to collect images.",
      "Tell us about access limits and essential loads. Fault-finding establishes the repair scope; a photo cannot confirm cable capacity, the cause of a trip or whether a new circuit is required.",
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
          "It may be responding to a dangerous condition, so leave the circuit off and have it investigated. The absence of smoke does not prove the circuit is safe, and protection should never be forced on. Smoke, fire or immediate danger requires 000 first.",
      },
      {
        question: "Can too many appliances trip a breaker?",
        answer:
          "An excessive combined load can cause an overload trip, but appliance numbers alone do not establish that cause. Our licensed electricians assess the circuit and equipment. Do not use extension leads to shift the problem elsewhere or bypass the tripped protection.",
      },
      {
        question: "Will a new breaker fix it?",
        answer:
          "Only if testing supports that repair and the replacement is appropriate for the installation. Replacing a device without investigating the circuit can leave the cause in place. We explain the tested area and any limitations; a fault repair is not certification of every circuit in the property.",
      },
    ],
  },
  {
    slug: "power-surge-damage",
    title: "Power Surge Damage",
    metaTitle: "Power Surge Damage Sydney & Surrounding Regions",
    metaDescription:
      "Equipment failed after a suspected power surge? Read safety steps, what electrical testing can establish and the limits of surge protection and damage reports.",
    intro:
      "Equipment failing after a storm or outage does not by itself prove a power surge. Stop using affected equipment and keep clear of damage. For smoke, fire, electric shock injury or immediate danger, move to safety and call Triple Zero (000) before arranging an inspection.",
    primaryAdvice:
      "Do not reconnect damaged equipment or repeatedly reset protection. An inspection should establish what is safe and what remains uncertain.",
    riskNotes: [
      "A transient voltage rise can damage electronic components, but equipment may also fail for unrelated reasons. An outage followed by a failed appliance is a sequence of events, not a confirmed explanation of the damage.",
      "Several failures at the same time can justify checking the installation and reporting a suspected supply issue to the electricity distributor. The location and cause of a supply fault cannot be established solely from a list of appliances.",
      "Heat damage, discolouration, burning smells or repeated tripping need attention even when equipment still operates. Do not handle a suspect plug or outlet to see whether it has cooled or recovered.",
      "Surge protection has limits and must suit the installation. It does not replace RCD or circuit breaker protection, repair existing damage or guarantee that all equipment will survive every lightning or supply event.",
    ],
    checks: [
      "Keep affected equipment out of use without touching hot, wet, burnt or damaged fittings. Do not try another outlet, open equipment or reconnect appliances to test whether they still work.",
      "From safety, record what failed and when. Report a suspected network problem to your electricity distributor; use emergency services first if anyone is in danger.",
      "Our licensed electricians can inspect accessible affected circuits and the switchboard, assess relevant protection and test the fixed installation. Internal appliance diagnosis may require separate assessment; installation testing does not establish every electronic component's condition.",
      "Agree the repair scope after findings are explained. Damaged fittings, wiring or protection may need replacement, but an inspection cannot automatically prove the event's origin, future reliability or eligibility for an insurance or network claim.",
    ],
    whatToSend: [
      "Provide the approximate event time and whether a storm or outage was already observed. Separate what you saw from what you suspect; do not label an event a confirmed surge without evidence.",
      "List affected equipment, rooms and any protection that you already noticed had tripped. Mention equipment still behaving unusually without running it again.",
      "Only photograph damage from an already safe position, without approaching the board or touching equipment. Existing images are enough; never delay emergency help for photographs.",
      "Tell us about any distributor advice and the inspection purpose. Keep private account and insurance information out of public messages; any report can only describe findings and limitations supported by the actual assessment.",
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
          "Electrical damage can affect more than an appliance, so fixed wiring and protection may need assessment. However, the extent and cause cannot be inferred from the word surge. Testing determines the accessible installation's condition and identifies where further investigation is necessary.",
      },
      {
        question: "Should I turn everything back on after a surge?",
        answer:
          "Do not restore affected circuits or reconnect suspect equipment as a test. Keep clear of heat, moisture, buzzing or visible damage and arrange an inspection. If smoke or a possible fire is present, leave the area and call 000 rather than waiting for an electrician.",
      },
      {
        question: "Can surge protection be added later?",
        answer:
          "It may be possible after the switchboard, earthing arrangement and intended equipment have been assessed. Our licensed electricians can explain suitable options and their limits. Adding protection is a separate decision from repairing damage and does not guarantee an insurance outcome or eliminate every future risk.",
      },
    ],
  },
  {
    slug: "hot-power-point",
    title: "Hot Power Point",
    metaTitle: "Hot Power Point Sydney & Surrounding Regions",
    metaDescription:
      "Hot power point? Stop using the suspect outlet, avoid touching it and learn what our licensed electricians assess before proposing a repair.",
    intro:
      "Unusual heat already noticed at a power point, plug or surrounding wall needs investigation. Do not touch it again to check the temperature. For smoke, fire, electric shock injury or immediate danger, move clear and call Triple Zero (000) before seeking an electrical repair.",
    primaryAdvice:
      "Keep clear of the suspect outlet and stop using it. Do not handle the plug, operate a damaged switch or wait for visible burn marks.",
    riskNotes: [
      "Poor contact at a plug, socket or terminal can generate heat. Damage may extend behind the faceplate, so a clean-looking front does not establish that the connection or wiring is sound.",
      "A high appliance load, damaged plug or unsuitable connection can contribute to overheating. The appliance's presence is not proof it caused the fault; the fitting, connected equipment and circuit need consideration together.",
      "A breaker may remain on while a poor connection heats up. A safety switch is not a temperature detector, and neither device staying on is clearance to keep using a suspect outlet.",
      "Discolouration, a burnt smell, crackling or a loose-fitting plug are useful details if already observed. Do not wiggle the plug, press the faceplate or touch the wall to investigate further.",
    ],
    checks: [
      "Keep people away and avoid the outlet and connected equipment. Do not unplug a suspect connection or try another appliance to compare temperatures.",
      "Do not remove the faceplate, tighten wiring, insert tools or use cooling water. If there is smoke or a possible fire, move to safety and call 000.",
      "For a fault without an active emergency, arrange an inspection before further use. Our licensed electricians isolate safely and inspect accessible outlet connections, the plug and signs of damage to the associated wiring.",
      "Testing and load assessment guide the repair. Work may include replacing damaged fittings or wiring, with separate appliance assessment where necessary. We explain any inaccessible area or further work rather than assuming the visible outlet is the whole fault.",
    ],
    whatToSend: [
      "Describe what first drew your attention: a smell, mark, sound or heat already noticed. Do not touch the outlet again or attempt to measure its temperature.",
      "Name the connected appliance and approximate operating time before the issue. Mention adapters or power boards only from existing knowledge, without moving the connection.",
      "Send a photo only from a safe position without touching equipment or approaching the hazard. A description is sufficient for the initial call; never delay emergency help to take photographs.",
      "Mention whether power was lost and any earlier repairs you know about. Photos cannot show concealed wiring damage, so an on-site assessment may be needed before the repair price and scope can be confirmed.",
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
          "Do not use a touch test to decide whether a fitting is safe. Unexpected heat at an outlet or plug, especially with a smell, discolouration or noise, warrants stopping use and investigation. The absence of a visible mark does not exclude damage behind the outlet.",
      },
      {
        question: "What appliances commonly cause overheating power points?",
        answer:
          "High-load equipment can expose an unsuitable or deteriorated connection, but no appliance should be blamed from its name alone. The plug, socket, wiring and intended load need assessment. Moving the same suspect appliance to another outlet is not a safe diagnostic test.",
      },
      {
        question: "Will replacing the outlet fix it?",
        answer:
          "Replacement may be necessary, but heat can damage adjacent wiring or the appliance plug as well. Our licensed electricians explain the inspected area, test findings and required work. A new faceplate alone is not proof the cause has been corrected or the whole property certified.",
      },
    ],
  },
  {
    slug: "lights-flickering",
    title: "Lights Flickering",
    metaTitle: "Lights Flickering Sydney & Surrounding Regions",
    metaDescription:
      "Flickering lights? Learn which observations help, when to keep clear and how fitting, circuit and supply issues are distinguished by electrical testing.",
    intro:
      "Flickering may affect one lamp, a room or several parts of a property. It does not establish a cause on its own. If it accompanies smoke, fire, electric shock injury or immediate danger, move clear and call Triple Zero (000) before arranging electrical work.",
    primaryAdvice:
      "Do not recreate the flicker by switching appliances or opening fittings. Report sudden widespread changes promptly and keep clear of suspect equipment.",
    riskNotes: [
      "An individual LED lamp, driver or incompatible dimmer can produce flicker. That possibility should not be used to dismiss heat, smells or a wiring problem, especially when the behaviour has changed suddenly.",
      "A poor connection in a fitting, circuit or supply can affect lighting. Testing is needed to locate it; a description of flicker cannot confirm a loose neutral or identify whether the fault belongs to the property or network.",
      "A brief change already noticed when equipment starts is useful history. Persistent dimming, unusually bright lamps or changes across multiple circuits require assessment rather than repeated appliance-start experiments.",
      "Water ingress or damaged equipment after a storm can coexist with a supply interruption. Nearby properties being affected may help the distributor investigate, but neighbours having power does not rule out a supply fault to your property.",
    ],
    checks: [
      "Describe the pattern you already saw: one fitting, several rooms, continuous or occasional. Do not climb to a fitting, remove lamps or covers, or switch loads to reproduce it.",
      "Keep clear of damaged, wet, hot or buzzing equipment. A shock or tingle must be reported immediately to your electricity distributor; do not touch or retest the location.",
      "For sudden widespread lighting or supply changes, contact your electricity distributor and arrange electrical assessment as appropriate. For a possible fire or immediate danger, call 000 from safety first.",
      "Our licensed electricians assess accessible fittings, controls, relevant circuits and voltage conditions. Findings may support a compatible lighting component, connection repair or further supply investigation. Intermittent behaviour may require more than one observation period.",
    ],
    whatToSend: [
      "List affected rooms and the type of light or dimmer if already known. Mention recent lamp or control changes without dismantling anything to identify a model.",
      "Include the approximate time, duration and any equipment already operating. Distinguish an observed coincidence from a confirmed cause.",
      "An existing video may help, but do not recreate the fault, stand near suspect equipment or climb to obtain one. Never delay emergency help for a recording or photograph.",
      "Mention any distributor report and whether other supply symptoms occurred. A video cannot determine voltage, connection integrity or whole-property safety; testing and access determine the scope of the assessment.",
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
          "Some causes are within a lamp or control, while others involve unsafe connections or supply faults. Do not assume it is harmless because the lights still work. Sudden widespread flicker, brightening, smells or heat need prompt attention; smoke or an active emergency requires 000 first.",
      },
      {
        question: "Can LED lights flicker because of old dimmers?",
        answer:
          "Compatibility between a lamp, driver and dimmer can matter. Our licensed electricians can assess the combination and associated installation before recommending changes. Do not open a dimmer or fitting yourself, and do not assume compatibility is the cause if other warning signs are present.",
      },
      {
        question: "Why do lights flicker when an appliance turns on?",
        answer:
          "Starting current can coincide with a voltage change, but the severity, circuit arrangement and connections need assessment. Tell us what you already noticed rather than cycling the appliance as a test. Supply-side concerns may need distributor investigation, and a single normal reading may not resolve an intermittent issue.",
      },
    ],
  },
  {
    slug: "rcd-trips-when-raining",
    title: "RCD Trips When Raining",
    metaTitle: "RCD Trips When Raining Sydney & Surrounding Regions",
    metaDescription:
      "RCD tripping in rain? Keep clear of wet equipment, avoid resets and learn how moisture-related faults are investigated before affected circuits return to use.",
    intro:
      "Rain-related RCD trips can indicate moisture affecting electrical equipment, but the location is not proven by the weather. Keep clear of wet fittings and leave affected circuits off. For smoke, fire, electric shock injury or immediate danger, move to safety and call Triple Zero (000).",
    primaryAdvice:
      "Do not reset the RCD, unplug wet equipment or assume drying weather has made the circuit safe. Arrange inspection before further use.",
    riskNotes: [
      "An RCD detects current leakage from its intended path. Moisture in a fitting, connected appliance or damaged insulation can contribute, but a combined protective device may also respond to overcurrent. Device identification comes before diagnosis.",
      "Outdoor lights, pumps, garden power and weather-exposed cable entries are possible locations. Water may also reach wiring elsewhere, so the most visible wet fitting is not automatically the cause.",
      "A circuit that operates again after rain can still have damaged insulation or a route for future water entry. A dry interval does not establish that the equipment is safe or remove the need to investigate recurring trips.",
      "Enclosure condition, suitable weather protection and installation details all matter. Applying sealant, wrapping a fitting or bypassing protection is not a substitute for finding and repairing the fault.",
    ],
    checks: [
      "Stay away from wet outlets, cords, pumps and switchboards. Do not unplug equipment, open an enclosure or step into water to identify what has tripped.",
      "Record rain timing and affected equipment only from existing observations. Do not spray water on a fitting, restart equipment or reset a circuit to demonstrate the problem.",
      "Report any shock or tingle to the electricity distributor immediately and do not retest the location. If anyone is in immediate danger, call 000 first from a safe place.",
      "Our licensed electricians can isolate safely, inspect accessible affected equipment and test relevant circuits and protection. Repair may involve damaged wiring or a suitable replacement fitting and addressing water entry; inaccessible or intermittent faults may need further investigation.",
    ],
    whatToSend: [
      "Describe whether trips occurred during rain or later, and whether this has happened before. Mention known outdoor equipment without approaching it to check.",
      "List the lights or appliances already noticed without power. Do not assume every item in an outdoor area is on the same circuit.",
      "Only use existing images or photographs possible from a safe, dry place without touching equipment or entering the affected area. Never delay emergency help for photographs.",
      "Tell us about recent garden work, visible damage already observed and access restrictions. An image cannot prove weatherproofing or insulation condition; findings and repair options depend on inspection and testing.",
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
          "Moisture may allow leakage from damaged insulation or equipment, causing residual-current protection to operate. Rain timing is a clue rather than proof of a specific source. Testing may need to cover connected equipment and wiring beyond the visibly wet area.",
      },
      {
        question: "Can the circuit be left off until dry?",
        answer:
          "Leave the affected circuit off, but do not treat a dry day as permission to switch it back on. Other supplies or damaged equipment may still present hazards. Keep clear and arrange assessment; our licensed electricians explain what can safely return to use after the relevant checks.",
      },
      {
        question: "Can outdoor fixtures be made more reliable?",
        answer:
          "Suitable equipment and correct installation can address identified defects, but there is no blanket guarantee against future water damage. The inspection needs to consider the actual water path and condition of wiring, not simply replace a cover or add sealant over an unresolved problem.",
      },
    ],
  },
  {
    slug: "power-outage-after-storm",
    title: "Power Outage After Storm",
    metaTitle: "Power Outage After Storm Sydney & Surrounding Regions",
    metaDescription:
      "Power out after a storm? Read safe emergency steps, distributor and property-wiring boundaries, and why water-damaged equipment needs assessment before reuse.",
    intro:
      "After a storm, treat fallen lines and damaged electrical equipment as live even when power is out. Keep at least 8 metres from fallen lines and anything they touch. For injury, fire or immediate danger, call Triple Zero (000), then report the hazard to your electricity distributor.",
    primaryAdvice:
      "Do not approach damaged lines, wet switchboards or storm debris near electrical equipment. Loss of power is not proof that an area is safe.",
    riskNotes: [
      "A storm can damage network lines, the property's supply connection or wiring and equipment within the property. More than one problem may exist; fittings exposed to water still need electrical assessment after network restoration.",
      "Partial power loss can involve a circuit or supply issue. Neighbours having power does not rule out a fault affecting your connection; use the distributor's outage information and report hazards from a safe location.",
      "Water entering lights, outlets or other electrical equipment can leave damage after surfaces appear dry. Do not restore power, open covers or use a heater to dry electrical equipment for reuse.",
      "Solar, batteries or other supplies may create additional hazards even during an outage. Do not approach or operate damaged supply equipment, remove branches near wires or inspect a private pole yourself.",
    ],
    checks: [
      "Stay clear of damaged lines and anything in contact with them. Do not enter floodwater or cross a hazardous area to check the board. Follow emergency services and distributor directions.",
      "Check published outage information only from safety. If essential medical equipment has lost supply, follow its emergency plan and call 000 when a person is in danger rather than waiting for restoration.",
      "Do not repeatedly reset circuits or reconnect water-affected equipment. Describe what you already observed to the distributor and electrician without deliberately testing the damaged installation.",
      "Our licensed electricians can assess accessible property wiring once access is safe. Identified damage may need isolation, repair and testing before reconnection; supply-side work requires the appropriate authorisation and coordination with the distributor.",
    ],
    whatToSend: [
      "State whether the outage is total or partial, when it began and any distributor advice already received. Do not infer the cause from which neighbouring lights are on.",
      "Describe water, branches or damaged supply equipment only as already observed from safety. Never approach lines, poles or a wet board to obtain a better description.",
      "Photographs are optional and must not involve entering the hazard area or removing covers. Use existing images where available and never delay emergency help for a photo.",
      "Mention known solar or battery equipment, access restrictions and essential loads. Inspection and network clearance may affect the repair sequence; no restoration time can be promised from photographs or an initial call.",
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
          "Report damaged lines or suspected supply faults to your electricity distributor, even if only your property appears affected. Call 000 first for immediate danger. Property wiring may also need our licensed electricians to inspect it; the distributor controls network restoration, not the electrical repair appointment.",
      },
      {
        question: "Can I turn power back on after water damage?",
        answer:
          "Do not energise affected equipment because it looks dry or the neighbourhood supply has returned. Inspection and appropriate testing are needed to assess damage. Some equipment may require replacement, and inaccessible areas can require further investigation before safe restoration is possible.",
      },
      {
        question: "Can storm damage affect private poles?",
        answer:
          "Wind, branches or impact can damage poles and overhead connections. Keep clear and report the hazard; do not attempt to clear vegetation or inspect attachment points. The repair and reconnection pathway depends on asset ownership, required authorisations and the distributor's instructions.",
      },
    ],
  },
  {
    slug: "electric-shock-from-outlet",
    title: "Electric Shock From Outlet",
    metaTitle: "Electric Shock From Outlet Sydney & Surrounding Regions",
    metaDescription:
      "Shock or tingle from an outlet? Keep clear, seek medical help and report it to your electricity distributor. Read safe next steps before electrical repairs.",
    intro:
      "If someone is receiving an electric shock, call Triple Zero (000) and do not touch them while they may be in contact with electricity. Keep clear and follow the operator's instructions. Even a small shock or tingle needs medical advice and immediate reporting to your electricity distributor.",
    primaryAdvice:
      "Do not touch or retest the outlet, appliance or metal fitting. Do not approach the switchboard to investigate; get people clear and seek emergency advice first.",
    riskNotes: [
      "A shock can involve an appliance, outlet, damaged insulation, earthing or a supply problem. Where the shock was felt does not reliably locate its source, and it must not be dismissed as a harmless fault without assessment.",
      "Taps and other metal parts can also become hazardous. Keep others away from the location and report the shock or tingle to the electricity distributor rather than touching another surface to compare it.",
      "A safety switch not tripping does not prove there was no dangerous fault. The protective arrangement and relevant installation need assessment; no protective device makes deliberate contact or retesting safe.",
      "Electrical inspection and medical assessment are separate. Our licensed electricians investigate electrical conditions; they cannot decide whether a person has been injured or replace medical advice after a shock.",
    ],
    checks: [
      "Move away without touching the suspect equipment again. Do not unplug it, operate nearby switches or remove covers. Warn others and keep the area clear.",
      "For ongoing shock, collapse, breathing difficulty or immediate danger, call 000 and follow the operator. Seek medical assessment after a shock even when it seemed minor; do not wait for an electrical visit to arrange medical care.",
      "Report the incident immediately to your electricity distributor. Do not approach a person who may still be in electrical contact or attempt a DIY rescue using objects around the home.",
      "Once the area can be accessed safely, our licensed electricians can assess the relevant outlet, wiring, earthing and protection, coordinating supply concerns with the distributor. The findings determine isolation, repairs and testing before the affected installation returns to use.",
    ],
    whatToSend: [
      "After emergency and medical needs are addressed, describe what was being touched and when. Say where the shock was felt without assuming that item caused it.",
      "Mention water or other hazards already observed, and any distributor instructions. Do not revisit the area to gather details.",
      "Photos are not required before help is arranged. Only use images already available or taken after the area is confirmed safe; never delay emergency help or approach a switchboard for a photograph.",
      "Tell us which equipment remains out of use and any access restrictions. Electrical findings may require further investigation; an initial phone description cannot confirm the source or certify the rest of the property.",
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
          "Yes. Stop using the location, keep others clear and report it to your electricity distributor. Seek medical advice even if you feel well. Call 000 for someone still receiving a shock, serious symptoms or immediate danger; do not retest the fitting to judge how severe it is.",
      },
      {
        question: "Could the appliance be the problem?",
        answer:
          "It is one possibility, but wiring, earthing or a supply issue may also be involved. Do not move the appliance to another outlet to test it. The investigation needs to establish electrical safety and relevant faults before deciding whether appliance assessment or installation repairs are required.",
      },
      {
        question: "Should I turn the circuit off?",
        answer:
          "Do not approach the switchboard or touch nearby metalwork after a shock to investigate or operate it. Keep clear and follow emergency services or distributor instructions. Safe isolation and checking for other supplies are tasks for the appropriate authorised personnel, not a DIY diagnostic step.",
      },
    ],
  },
  {
    slug: "smoke-from-electrical-panel",
    title: "Smoke From Electrical Panel",
    metaTitle: "Smoke From Electrical Panel Sydney & Surrounding Regions",
    metaDescription:
      "Smoke from a switchboard or electrical panel? Move clear and call 000 for a suspected fire. Learn why stopped smoke is not clearance to restore power.",
    intro:
      "Smoke from a switchboard, electrical panel or meter area may indicate a fire. Move people to safety and call Triple Zero (000); do not wait for heavy smoke or an electrician. Keep clear of the equipment and follow emergency services' instructions.",
    primaryAdvice:
      "Do not approach, open or operate the smoking panel. Smoke stopping does not make it safe to touch or restore power.",
    riskNotes: [
      "Overheating connections, damaged components or an electrical fault can produce smoke. The cause and extent cannot be determined safely from outside the panel, and damage may extend beyond the part that first smoked.",
      "A protective device remaining on does not exclude a fire or a poor connection. Do not wait for a breaker to trip, try resetting it or assume an apparently normal display means the installation is safe.",
      "The meter area and supply connections may include equipment with different ownership and authorisation requirements. Emergency isolation and any supply-side repairs must follow the appropriate distributor and authorised-work arrangements.",
      "Heat and smoke can damage insulation and nearby equipment. An apparently cooled panel may still be energised or unsafe; fire clearance and electrical clearance serve different purposes and repairs may still be necessary.",
    ],
    checks: [
      "Leave the affected area and call 000 from safety for a suspected fire. Do not approach the board to operate its main switch, open a door or see whether smoke is still coming out.",
      "Do not use water on electrical equipment or attempt to remove fuses, disconnect cables or rescue belongings near the panel. Keep access clear for emergency responders without entering the hazard area.",
      "After emergency services have dealt with the immediate hazard, arrange the required electrical assessment. Do not restore power because the smoke has stopped or a surface looks undamaged.",
      "Our licensed electricians assess accessible affected wiring and equipment once safe access is available. The repair scope depends on damage, test findings and supply requirements; parts, further access or authorised supply work may be needed before reconnection.",
    ],
    whatToSend: [
      "After emergency help is arranged, describe where smoke was observed and whether emergency services or the distributor have attended. Do not return to the panel to check its current condition.",
      "Mention any power loss, storm or recent installation change already known. Do not operate equipment to establish a connection between an appliance and the incident.",
      "Photographs must wait until safe access is confirmed. Existing images or a verbal description are sufficient initially; never delay emergency help or approach a smoking panel for a photo.",
      "Explain any restrictions left by emergency services or the distributor. A photograph cannot establish safe reconnection, hidden damage or a final repair price; the inspected scope and remaining limitations must be explained.",
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
          "Move away and call 000 for a suspected fire. Do not wait for smoke to become heavy, open the panel or operate switches to investigate. Follow emergency services' instructions, then arrange electrical assessment after the immediate hazard has been managed.",
      },
      {
        question: "Can the panel be used again after smoke stops?",
        answer:
          "No. Stopped smoke does not establish that the equipment is de-energised or undamaged. Appropriate inspection, repairs and testing are needed before restoration. The assessment may be limited by access or the need for distributor isolation, and no immediate restoration time should be assumed.",
      },
      {
        question: "Could this require Level 2 electrical work?",
        answer:
          "Some supply-side work may require an appropriately accredited and authorised Level 2 electrician and distributor coordination. The required category depends on the affected equipment and scope. That does not mean every panel fault needs Level 2 work or that every electrician holds all authorisations.",
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


