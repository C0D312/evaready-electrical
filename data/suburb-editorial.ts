type EditorialFaq = { question: string; answer: string };

export type SuburbEditorial = {
  description: string;
  heading: string;
  sections: { heading: string; paragraphs: string[] }[];
  censusUrl: string;
  firstFaq: EditorialFaq;
  finalFaq: EditorialFaq;
};

// These are individually researched editorial pages, not evidence of local jobs.
export const suburbEditorial: Readonly<Record<string, SuburbEditorial>> = {
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown": {
    description: "Our licensed electricians assess faults, lighting, power points and planned electrical changes in Bankstown 2200. Tell us whether the enquiry concerns a house, an individual unit or shared building equipment. We confirm availability, access, the proposed work and required authorisation before arranging attendance.",
    heading: "Electrical work in a house, unit or shared building",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10181",
    sections: [
      {
        heading: "Start with the part of the property affected",
        paragraphs: [
          "The 2021 Census recorded flats or apartments as 58.5% of occupied private dwellings in Bankstown. That makes the distinction between a fault inside a unit and a problem with shared equipment useful when describing a job. It does not tell us the age or condition of your wiring, and houses need their own assessment too.",
          "If you have already noticed which lights, rooms or appliances stopped working, describe that pattern. Do not enter a locked switchroom, remove a cover or touch damaged equipment to collect more information. A corridor light and a power point inside your unit may have different supplies and repair arrangements. Our inspection establishes what is affected; an address or photograph cannot establish the cause.",
        ],
      },
      {
        heading: "Arrange access without sharing security details",
        paragraphs: [
          "For an apartment enquiry, include the unit number and whether a building manager needs to arrange access. Ask that person to coordinate keys or attendance through an appropriate private channel; do not put door codes in an online description. If common property may be involved, contact the strata manager. Tenants should also notify their agent or landlord. Responsibility depends on the property and the relevant strata documents, not simply where a fault is first noticed.",
          "For planned work, distinguish replacement of an existing fitting from adding a new location or appliance. This helps separate fault investigation, installation and any approval steps. We can discuss the intended result before assessing the route for wiring and the condition of the relevant circuit. Permission to enter a building is not, by itself, permission to alter its electrical infrastructure.",
        ],
      },
      {
        heading: "Separate immediate repairs from later improvements",
        paragraphs: [
          "A call about repeated loss of power is different from a request for more sockets or brighter lighting. Tell us about any urgent symptom first, then list optional improvements separately. The electrician can explain what testing has established, what needs attention and which additions need a separate scope. Do not repeatedly reset a tripping device to keep using the affected circuit.",
          "Where a planned interruption could affect another occupant, raise that before booking so access and communication can be discussed. A visit may identify work that needs further materials, building approval or a network process. We will not promise that every building-wide issue can be resolved during one attendance.",
        ],
      },
    ],
    firstFaq: {
      question: "Can I book an electrician for an apartment fault in Bankstown?",
      answer: "Contact us with the unit address, the symptoms and who can authorise access. We confirm whether the enquiry is within our available service scope. Tell us if shared lighting or other dwellings are also affected, but do not investigate other residents' equipment. For a suspected common-property problem, involve the building or strata manager rather than assuming an individual resident can approve every repair.",
    },
    finalFaq: {
      question: "What if the fault is not inside my unit?",
      answer: "The inspection may identify a supply or common-equipment issue outside the circuit first reported. Our licensed electricians explain that finding and the applicable next step. Access restrictions, equipment ownership and network authorisation can limit what can be repaired immediately. Building-wide isolation needs appropriate coordination; it is not something a resident should attempt to arrange by operating unfamiliar switches.",
    },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania": {
    description: "Our licensed electricians help with household electrical faults and planned installations in Panania 2213. From a room losing power to a kitchen appliance change, the existing installation needs assessment before a solution is agreed. Availability, access and required authorisation are confirmed for the particular job.",
    heading: "Plan household changes around the electrical installation",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL13155",
    sections: [
      {
        heading: "A house assessment starts with your actual needs",
        paragraphs: [
          "Separate houses accounted for 70.7% of Panania's occupied private dwellings in the 2021 Census. That context is useful for planning household electrical work, but it does not establish when a particular home was wired or whether a switchboard needs replacement. Our recommendations follow inspection and testing, not an assumption that all homes in a suburb have the same installation.",
          "For an additional oven, cooktop or other fixed appliance, keep the manufacturer's model and installation information available. Describe what is being replaced and whether its position is moving. A similar-looking appliance does not establish that the existing circuit is suitable. The electrician checks the relevant supply, protection and wiring before confirming the electrical scope; cabinetry dimensions alone cannot answer those questions.",
        ],
      },
      {
        heading: "Discuss wiring before finishes are closed",
        paragraphs: [
          "During a planned kitchen, laundry or room renovation, share a simple layout showing the fittings and appliances you intend to use. Separate essential work from optional extra outlets or lighting. Agree which stage needs electrical attendance before cabinetry, wall finishes or other work limits access. This is a planning conversation, not permission to expose wiring yourself.",
          "Mention whether the household will remain occupied and which areas need to stay accessible. The agreed scope should make clear what will be disconnected, what work is included and what must be tested before use. If concealed conditions change the proposed method, the findings need discussion before extra work proceeds. A quote based on incomplete access may need a site assessment rather than an assumed fixed solution.",
        ],
      },
      {
        heading: "Describe a partial power failure without experimenting",
        paragraphs: [
          "When only part of the home loses power, note what you already know: the rooms affected, whether lighting still works and when the interruption began. Do not run extension leads between rooms as a permanent substitute or repeatedly reset a device that trips again. Keep away from heat, burning smells, sparking or wet equipment and follow the emergency guidance above.",
          "A failed appliance, a circuit defect and a protective-device issue can produce overlapping symptoms. Testing is needed to distinguish them. Our licensed electricians explain whether the affected circuit can be restored, needs repair or must remain isolated pending further work. Optional renovation items can be discussed after the immediate safety problem has been addressed.",
        ],
      },
    ],
    firstFaq: {
      question: "Can you assess a new appliance circuit in Panania?",
      answer: "Yes, subject to the job and availability being confirmed. Send the appliance model, intended position and whether it replaces an existing unit. We assess the circuit requirements and accessible installation before specifying wiring or protection. Do not purchase electrical accessories on the assumption that an old outlet or cable will suit; the appliance instructions and on-site findings both matter.",
    },
    finalFaq: {
      question: "Does a renovation automatically require a new switchboard?",
      answer: "No. The decision depends on the existing equipment, the proposed load and the work being undertaken. Our licensed electricians inspect the relevant parts of the installation and explain any limitation they identify. An attractive new kitchen does not demonstrate electrical capacity, and an older-looking board is not a complete diagnosis. The recommendation should relate to the actual work and testing findings.",
    },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/padstow": {
    description: "Our licensed electricians investigate electrical faults and assess lighting, power and installation work in Padstow 2211. Explain the property arrangement and whether the job is indoors, outdoors or in a separate building. We check service availability and required authorisation before confirming the work and attendance.",
    heading: "Define the property and the circuit before work starts",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL13131",
    sections: [
      {
        heading: "A street address may include more than one dwelling",
        paragraphs: [
          "Padstow's 2021 Census dwelling figures include 67.6% separate houses and 26.0% semi-detached, row or terrace houses and townhouses. The form of a building does not establish how its electricity is supplied. For a duplex, secondary dwelling or other multi-dwelling address, make clear which home and which equipment the enquiry concerns.",
          "Tell us whether a gate, garage or other shared area affects access. Do not assume that an adjacent switchboard belongs to your dwelling or operate a neighbour's equipment. The relevant circuit and equipment need positive identification by the electrician before work. If authority or access is uncertain, resolving that first can prevent a visit being based on the wrong part of the property.",
        ],
      },
      {
        heading: "Outdoor power needs an installation assessment",
        paragraphs: [
          "For a new outdoor light or socket, describe its intended use and location rather than choosing a fitting solely for its appearance. Exposure to weather, the mounting surface, the cable route and protection all affect the installation. An existing indoor outlet does not show that a proposed garden or garage connection is suitable. Leave excavation and access around buried services to an appropriately planned job.",
          "If existing outdoor equipment is wet, broken or behaving intermittently, stop using it and keep clear. A photograph from a safe location may show the position but cannot confirm the condition of wiring or seals. Our licensed electricians inspect and test the relevant equipment before explaining whether a component can be replaced or further circuit work is needed.",
        ],
      },
      {
        heading: "Keep the enquiry focused on a usable outcome",
        paragraphs: [
          "For garage, workshop or utility-room changes, list the appliances or tools you expect to use and whether more than one will operate together. The purpose is to assess the intended demand, not to guess cable sizes remotely. Include any planned future change as a separate item so the present scope and optional work are not confused.",
          "After inspection, ask which areas will lose power during the work and what access needs to remain clear. The agreed repair may be limited to one circuit; it is not automatically a condition report on the entire property. If testing finds an additional concern, it should be explained separately. Do not use improvised connections to keep equipment running while awaiting assessment.",
        ],
      },
    ],
    firstFaq: {
      question: "Can you quote for electrical work at a duplex in Padstow?",
      answer: "We can review the request once the dwelling, proposed work and access are clear. Include the correct unit or house designation and identify any shared facilities involved. Supply ownership, isolation arrangements and permission to work must be established rather than inferred from the building's appearance. A quote for one dwelling does not authorise changes to another dwelling's installation.",
    },
    finalFaq: {
      question: "Can an outdoor fault be diagnosed from a photo?",
      answer: "A safe photograph can help describe the fitting and location, but it cannot establish insulation condition or prove a circuit safe. Never open a fitting, lift a cover or approach wet electrical equipment to improve the image. Our licensed electricians use inspection and appropriate testing to decide what needs repair. Keep the affected equipment out of use until its safety has been assessed.",
    },
  },
  "/service-areas/parramatta-and-cumberland/parramatta/parramatta": {
    description: "Our licensed electricians assess unit, household and shared-property electrical enquiries in Parramatta 2150. Describe the fault or planned change and identify who can arrange building access. The available service, isolation arrangements and required authorisation are checked before the scope and appointment are confirmed.",
    heading: "Coordinate electrical work in an occupied building",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL13167",
    sections: [
      {
        heading: "Distinguish your unit from the building supply",
        paragraphs: [
          "Flats or apartments made up 85.6% of occupied private dwellings in Parramatta in the 2021 Census. This is suburb-level housing context, not evidence that a particular building has electrical defects. For apartment enquiries, a useful starting point is whether the issue is within one tenancy, in common areas or appears to involve more of the building.",
          "Report only what you have safely observed. A dark hallway does not prove that every unit has lost supply, and a working light does not prove all circuits are safe. Building management may have separate outage information. Do not enter service cupboards or try to restore unfamiliar equipment. Our assessment needs to distinguish a customer-installation fault from a problem requiring the electricity distributor or another authorised process.",
        ],
      },
      {
        heading: "Identify the person who can approve the work",
        paragraphs: [
          "Residents, managing agents and strata managers may have different roles. NSW guidance directs tenants to their landlord or agent and common-property repair enquiries to the owners corporation or strata manager. The strata plan and by-laws can help resolve responsibility. An electrician's findings can describe the affected equipment without deciding a private dispute over who pays.",
          "When asking for an appointment, identify the contact who can arrange access and confirm the authorised scope. Say whether meter-room access is controlled and whether other occupants need notice of planned interruption. Keep keys, entry codes and residents' private information out of the public enquiry. Access details can be organised securely after the job requirements have been reviewed.",
        ],
      },
      {
        heading: "Plan a repair around shared services",
        paragraphs: [
          "For planned lighting or power work, give the exact area and desired result: for example, replacing a failed fitting within a unit is a different request from changing lighting throughout a common corridor. The number of fittings, access restrictions and what can be isolated affect assessment. Do not assume one resident's booking includes a whole-building installation review.",
          "Testing may establish that a component has failed, that a circuit needs repair or that further access is required to continue. Our licensed electricians explain the findings and any safe-use restrictions. If a larger interruption is necessary, timing and permissions must be coordinated before proceeding. The priority is a clearly defined repair with appropriate testing, not restoring equipment without understanding the fault.",
        ],
      },
    ],
    firstFaq: {
      question: "Who should contact you about shared lighting in Parramatta?",
      answer: "A building or strata contact who can arrange access and approval is helpful for common-area work. Residents can report the problem to that contact without opening electrical cupboards or handling the fitting. Tell us which area is affected and any immediate hazard. We confirm the service and scope after reviewing the request; responsibility for the repair needs the property's own records and arrangements.",
    },
    finalFaq: {
      question: "Can you restore power to an entire apartment building?",
      answer: "That cannot be promised from an enquiry alone. The cause may involve a unit circuit, common equipment, metering or network supply. Our licensed electricians assess work within the relevant authority and explain when building management, the retailer, distributor or metering provider needs to be involved. A building-wide interruption requires controlled access and coordination, not trial operation of shared switches.",
    },
  },
  "/service-areas/sydney-city-and-eastern-suburbs/waverley/bondi-junction": {
    description: "Our licensed electricians review electrical faults and planned changes in Bondi Junction 2022 homes and units. Tell us what is changing, which rooms are involved and any building access restrictions. We confirm the job's suitability, required authorisation and availability before agreeing the electrical work.",
    heading: "Prepare for electrical work without disrupting the whole home",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10465",
    sections: [
      {
        heading: "Describe the home, not just the suburb",
        paragraphs: [
          "In the 2021 Census, 64.9% of Bondi Junction's occupied private dwellings were flats or apartments and 23.7% were semi-detached, row or terrace houses and townhouses. These figures help explain why access and the property arrangement matter. They do not establish your building's age, ownership boundaries or the state of its wiring.",
          "For a planned change inside an occupied home, identify the rooms involved and the fittings you want to retain. Note any known access restrictions before a visit is arranged. The electrical method depends on the actual installation; a replacement light, an additional outlet and relocating an appliance are not interchangeable jobs. Provide a clear desired outcome rather than assuming a particular wiring solution.",
        ],
      },
      {
        heading: "Coordinate renovation decisions early",
        paragraphs: [
          "Agree the appliance positions and lighting requirements before surrounding finishes make access difficult. If a fitting has already been selected, provide its model information so suitability can be assessed. Buying an attractive fitting does not establish that its mounting, controls or existing supply will suit the installation. Keep options open until the relevant checks have been made.",
          "In strata property, establish any approval requirements with the strata manager before altering common property. A tradesperson's appointment is not that approval. For a tenanted home, involve the managing agent or landlord in planned changes. Ask how the work will be staged, which rooms need access and when affected equipment can be used again. Do not remove fittings or expose cables to prepare for the visit.",
        ],
      },
      {
        heading: "Keep intermittent faults separate from upgrades",
        paragraphs: [
          "If a light flickers or power fails intermittently, describe the timing and affected rooms before discussing cosmetic replacement. A fault that disappears temporarily still needs assessment; changing the visible fitting is not always the complete repair. Do not provoke the problem by repeatedly switching damaged equipment on or resetting a device that trips.",
          "Our licensed electricians can explain which findings relate to the fault and which recommendations concern your planned improvements. This helps keep the authorised scope clear. Where access is incomplete, further investigation may be necessary rather than a definite diagnosis at the first enquiry. After the agreed work, ask about testing, any limitations on use and documentation relevant to the installation work completed.",
        ],
      },
    ],
    firstFaq: {
      question: "Can I arrange electrical changes during a Bondi Junction unit renovation?",
      answer: "Contact us before the electrical layout is finalised, with the intended appliance and fitting positions. We review the proposed work and access rather than assuming the existing circuits suit every change. Confirm any building permissions with the appropriate manager. Occupied rooms, shared infrastructure and staged renovation work need to be considered when agreeing what can be disconnected and when.",
    },
    finalFaq: {
      question: "Should I replace a flickering light before getting advice?",
      answer: "Do not dismantle a fitting or touch wiring to investigate. Flickering can have more than one cause, so explain the symptom and any associated heat, noise or loss of power. Keep clear of damaged equipment and seek urgent help for hazardous symptoms. Our licensed electricians assess the relevant fitting and circuit before advising whether replacement alone is appropriate or another fault needs attention.",
    },
  },
};
