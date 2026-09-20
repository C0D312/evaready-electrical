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
  "/service-areas/inner-west-burwood-and-canada-bay/inner-west/ashfield": {
    description: "Our licensed electricians assess electrical concerns in Ashfield 2131 homes and units. If you are moving in or reviewing earlier work, describe the specific concerns and the access you can authorise. We confirm availability, required authorisation and inspection limits; a brief visit cannot certify every concealed or shared part of a building.",
    heading: "Set the aims and limits of a wiring check",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10099",
    sections: [
      { heading: "Start with the property and your actual question", paragraphs: [
        "Ashfield's 2021 Census recorded 69.9% flats or apartments and 22.1% separate houses among occupied private dwellings. This is historical housing context, not evidence that any installation is sound or defective. For an inspection enquiry, explain whether you are investigating a fault, planning additions or seeking information after moving into a property. Each question can require a different electrical assessment and access arrangement.",
        "Provide relevant previous work records if they are available, but do not treat the absence of records as proof of a defect. Equally, a building inspection or sales description may not have assessed the electrical questions you now have. Ask what the proposed electrical visit will cover, what testing is included and which areas cannot be assessed under the agreed access or time available.",
      ] },
      { heading: "Allow for the limits of a unit inspection", paragraphs: [
        "In an apartment, access to the dwelling may not include shared switchrooms or all parts of the supply. Arrange the relevant building contact when those areas need to be considered. Do not promise a buyer, tenant or owner that a single-unit inspection covers every common service. The scope should distinguish what can be checked inside the lot from questions that need broader permission or documentation.",
        "Concealed wiring is not fully described by new outlet covers or an apparently tidy board. Our licensed electricians explain the observations and testing available for the accepted inspection, including limitations. Do not remove panels, lift floorboards or enter a roof space to expose wiring beforehand. Any further investigation needs its own safe method and consent, rather than an occupant opening the building to make the assessment more complete.",
      ] },
      { heading: "Use findings to make a defined next decision", paragraphs: [
        "Ask for urgent safety concerns to be distinguished from recommended improvements and matters that remain unconfirmed. That helps you understand what equipment must stay unused and what can be considered as planned work. An observation requiring further investigation is not a completed repair, and a quotation is not evidence that the work has been done. Keep those stages separate in the property records.",
        "If the findings affect a purchase, tenancy or shared-building decision, obtain the relevant independent advice for that decision. The electrician's role is to describe the electrical assessment and accepted work, not guarantee a transaction or resolve responsibility disputes. A useful report states its scope plainly, records access limitations and avoids implying that all concealed wiring or every apartment in the building has been certified.",
      ] },
    ],
    firstFaq: { question: "Can an Ashfield unit inspection cover the whole building?", answer: "Not automatically. The agreed scope, permissions and accessible electrical areas determine what can be assessed. A visit within one unit may leave common services outside the investigation. Tell us the questions you need answered so the appropriate access and limits can be discussed. Do not describe a restricted inspection as a building-wide electrical clearance." },
    finalFaq: { question: "Does a general building report replace an electrical assessment?", answer: "Check what that report actually includes and excludes. It may not answer a particular electrical fault or capacity question. We can review a defined electrical enquiry and explain the required testing and access. A separate assessment still has limits; neither report should be presented as a guarantee about every concealed component or all future equipment use." },
  },
  "/service-areas/inner-west-burwood-and-canada-bay/inner-west/balmain": {
    description: "Our licensed electricians review Balmain 2041 electrical faults and planned alterations. Tell us about any confirmed heritage controls and features that the proposed work could affect. We assess availability, required authorisation and access without assuming that every property is heritage listed or that an electrical quote grants building approval.",
    heading: "Plan cable routes to protect valued finishes",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10165",
    sections: [
      { heading: "Confirm the property controls, not just its style", paragraphs: [
        "Inner West Council provides heritage conservation information for Balmain and property-specific mapping. That does not mean every building or every internal feature has the same controls. The 2021 Census recorded 39.9% attached dwellings and 37.6% flats or apartments among occupied private dwellings in Balmain. These housing forms do not reveal the wiring's age, condition or the permissions needed for an individual alteration.",
        "For planned electrical changes, establish any applicable heritage requirements before choosing visible fittings or a cable route. Council's heritage guidance provides a process for considering minor works; do not assume an exemption without the relevant confirmation. Give the electrician the practical restrictions and approved details that affect the proposal. This allows electrical planning to work within the property requirements without treating an electrician as the planning authority.",
      ] },
      { heading: "Discuss the route as well as the fitting", paragraphs: [
        "A new light or outlet involves more than its visible face. The route to it may affect a ceiling, wall, floor or exterior surface that you want to preserve. Identify those concerns before work begins and ask what access is needed to assess options. Do not cut a trial opening or remove an old fitting yourself to find a concealed path.",
        "An existing decorative accessory may not be suitable for reuse merely because it matches the room. Electrical condition and compatibility need assessment independently of appearance. Keep the preferred finish or style in the brief, while allowing the electrician to explain safe alternatives and any limitations. We do not promise invisible wiring, exact reproduction of an unidentified product or preservation of every finish before the installation has been inspected.",
      ] },
      { heading: "Do not delay a dangerous fault for an upgrade plan", paragraphs: [
        "Damage, burning smells, arcing or shock symptoms need prompt safety attention even when a longer renovation is being considered. Stop using suspect equipment and follow the emergency guidance above. Report the fault and any known property constraints together. A planned cosmetic improvement should remain a separate decision from making a dangerous electrical situation safe; it should not encourage continued use of damaged fittings.",
        "For agreed work, keep records of the selected positions, accessible route and work completed, including anything awaiting further approval. Check who is responsible for making good building finishes and do not assume that all restoration is included in an electrical repair. A clear handover should identify the electrical outcome without claiming heritage approval, full rewiring or a complete building assessment beyond the accepted scope.",
      ] },
    ],
    firstFaq: { question: "Do all Balmain homes need heritage approval for electrical work?", answer: "No single rule follows from the suburb name. Check the actual property's controls and the proposed work with the appropriate council or planning contact. Tell us any confirmed restrictions before an alteration is designed. We do not assume either that every home is listed or that a small-looking electrical change is automatically exempt." },
    finalFaq: { question: "Can new wiring be hidden without disturbing existing finishes?", answer: "That depends on the building, available routes and authorised access. Explain which finishes matter and ask for options to be assessed before committing to positions. Do not make exploratory openings yourself. We can describe practical limits and the agreed work, but cannot promise concealed routes or complete restoration without inspecting and scoping the installation." },
  },
  "/service-areas/inner-west-burwood-and-canada-bay/inner-west/dulwich-hill": {
    description: "Our licensed electricians assess Dulwich Hill 2203 electrical concerns, including equipment affected by an indoor leak. Keep clear of wet fittings and explain the hazard before arranging access. We confirm availability, required authorisation and electrical work limits; building repairs and the cause of water entry remain separate matters that must also be addressed.",
    heading: "Report a leak near wiring from a safe spot",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL11306",
    sections: [
      { heading: "Identify the affected room and building contact", paragraphs: [
        "Dulwich Hill's occupied private dwellings included 57.0% flats or apartments and 28.8% separate houses in the 2021 Census. These figures do not establish that leaks occur at any particular property. They do make it important to clarify whether an indoor water issue is within a house or a unit building. For a unit, tell the landlord or building contact as appropriate as well as reporting the electrical hazard.",
        "Describe where water was seen from a safe location and whether it was near a light, outlet or other electrical equipment. Do not reach into a ceiling, touch a wet switch or move appliances through standing water to make the report more precise. If there is immediate danger, follow emergency advice first. A photograph is never required when taking it would bring you closer to electricity or an unstable ceiling.",
      ] },
      { heading: "Separate stopping the leak from checking the wiring", paragraphs: [
        "A plumbing or roof repair may stop new water entering without establishing that affected electrical parts are safe. Conversely, an electrical restriction does not fix the water source. The job contacts need to understand both issues so one completed task does not erase the other. Our licensed electricians explain the installation they can assess and any prerequisite for safe access or further investigation.",
        "Do not use a fitting again simply because a stain has dried or the light still operates. Water exposure can require inspection and testing even when the visible symptom changes. Leave suspect equipment unused until appropriately assessed. In a shared building, the source may require access or approval beyond your own dwelling; avoid assigning blame to a neighbour from the location of a mark alone.",
      ] },
      { heading: "Record what is safe to use after the repair", paragraphs: [
        "Once access is safe, the agreed electrical assessment may identify repair, replacement or further investigation needs. Ask what has been tested and what remains isolated. The electrician's findings should be passed to the authorised building contact if another stage is required. Do not remove a restriction because a painter, cleaner or other trade has finished working in the room.",
        "Before replacing damaged finishes, coordinate any necessary electrical access so concealed work is not covered prematurely. Clarify who will complete building repairs and what the electrical scope excludes. A repaired light does not certify the ceiling structure, waterproofing or all concealed services. Keeping a precise record of the affected items and remaining work helps the next visit proceed on evidence rather than assumptions about a dry surface.",
      ] },
    ],
    firstFaq: { question: "A leak stopped above my Dulwich Hill unit's light. Can I use it?", answer: "Do not assume that stopping the water makes the electrical fitting safe. Keep suspect equipment unused and arrange the relevant assessment, reporting the leak history. Do not open the light or touch wet switches to test it. Building repairs and electrical checks have different purposes, and each needs its own confirmed outcome." },
    finalFaq: { question: "Who should receive the electrical findings after an apartment leak?", answer: "The person authorised to arrange the work and the relevant landlord, building or strata contact should understand any remaining restrictions and access needs. Share the work findings, not unrelated private records. Responsibility for the leak cannot be determined from a stain alone, and completing one electrical repair does not settle the whole building repair process." },
  },
  "/service-areas/inner-west-burwood-and-canada-bay/inner-west/leichhardt": {
    description: "Our licensed electricians review Leichhardt 2040 household and attached-property electrical work. Explain any shared wall, access limit or confirmed heritage condition relevant to a planned change. We confirm availability, required authorisation and scope while keeping neighbouring property, planning permission and building-restoration work clearly separate.",
    heading: "Set clear limits for work near a shared wall",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL12306",
    sections: [
      { heading: "Joined homes still need their own checks", paragraphs: [
        "Leichhardt's 2021 Census housing mix included 36.5% separate houses, 33.6% attached dwellings and 29.0% flats or apartments among occupied private dwellings. An attached wall does not establish shared wiring, title or repair responsibility. Explain the actual property arrangement and any proposed work near a boundary. Our licensed electricians assess the relevant installation rather than infer circuit ownership from the way neighbouring buildings meet.",
        "For a planned outlet or cable route near a common wall, clarify the permissions and limits before work is specified. Do not enter a neighbour's roof space, drill through a wall or operate another property's equipment to investigate. A convenient route is not necessarily an authorised route. Relevant plans and a clear job contact help the electrician identify what can be assessed without extending the work into unapproved areas.",
      ] },
      { heading: "Check exterior changes against the property rules", paragraphs: [
        "Inner West Council includes Leichhardt in its heritage conservation information. Check the individual property and proposed alteration rather than assuming every facade is protected or unrestricted. If visible conduit, a light or another exterior component is being considered, provide the applicable approval details. Electrical suitability and planning permission answer different questions; one should not be represented as automatically supplying the other.",
        "Describe which surfaces should be preserved and ask about access needed for the assessment. Existing wiring routes may not suit a new position, and old-looking fittings do not prove that the cables behind them are original. Avoid ordering a set of accessories solely to match the street appearance before electrical compatibility is checked. We explain the options without promising that an unseen installation can accept a preferred product unchanged.",
      ] },
      { heading: "Agree access, repair and making good", paragraphs: [
        "Before planned work, discuss which rooms need access and any interruption or building opening that may be necessary. Keep neighbours informed through the appropriate arrangement where shared access is involved, without promising that no noise or disruption will occur. Safe work requirements still apply. A live electrical fault must be reported promptly and should not be left in use merely to avoid disturbing finished surfaces.",
        "The work record should distinguish the electrical installation from plastering, painting or heritage restoration unless those items are expressly included. Record any changed position and remaining approval or access need. A clear boundary protects against a repair being described as renewal of the whole property or its neighbour. Ask what was tested and what remains outside the scope rather than rely on a general statement that the house has been upgraded.",
      ] },
    ],
    firstFaq: { question: "Does a shared wall in Leichhardt mean the homes share electrical circuits?", answer: "No. Building form does not establish the supply arrangement. Provide relevant plans and describe the affected area so the electrician can investigate the actual installation. Do not test the theory by operating a neighbour's board or opening common spaces. Ownership and access permission also need to be established separately from the electrical findings." },
    finalFaq: { question: "Does an electrical quote include restoring a wall after cable work?", answer: "Check the written scope. Electrical installation, making good and any specialist restoration are distinct tasks unless expressly included. Discuss visible routes and important finishes before positions are agreed. Property approvals may also affect the method. We do not imply that an electrical quotation covers all building finishes or grants permission to alter a protected feature." },
  },
  "/service-areas/inner-west-burwood-and-canada-bay/inner-west/marrickville": {
    description: "Our licensed electricians review electrical work in Marrickville 2204 homes, studios and business premises. Tell us how the space is actually used and what equipment is being added or affected. Availability, permissions and required authorisation are confirmed before agreeing a scope; an electrical installation does not itself approve a new use for the premises.",
    heading: "Match the power brief to the way a space is used",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL12514",
    sections: [
      { heading: "A residential room and a work space need clear briefs", paragraphs: [
        "Marrickville's 2021 Census recorded 47.2% flats or apartments, 32.0% separate houses and 18.5% attached dwellings among occupied private dwellings. Council's employment-land study also describes creative and manufacturing uses around Carrington Road. Neither source determines the approved use or electrical capacity of your premises. Say whether the enquiry is for ordinary household use, a studio or another work space, without assuming a previous occupant's setup suits yours.",
        "List the actual equipment, its purpose and the manufacturer's electrical information where relevant. A room described as a studio might contain only small electronics or equipment with very different supply needs. That distinction should be established before positions and circuits are proposed. We do not infer the right installation, ventilation, safety controls or planning permission from a business label alone.",
      ] },
      { heading: "Treat a change of use as more than more sockets", paragraphs: [
        "New activities can involve requirements beyond the fixed electrical installation. Confirm the permitted use and landlord or building approvals through the appropriate channels before committing to alterations. The electrician can assess the accepted wiring scope, but does not approve a public venue, production process or residential conversion by fitting outlets. Separate specialist equipment requirements must be identified rather than silently included in general electrical work.",
        "Avoid buying adapters or extending leads to make equipment fit an existing room before its supply needs are checked. State which items will run together and which are only future possibilities. Keep routes through doors and walkways clear. A portable test tag or a working socket is not proof that the building installation is suitable for a different activity or a larger connected load.",
      ] },
      { heading: "Keep technical access and private information apart", paragraphs: [
        "For an occupied work space, agree when the relevant area can be accessed and whether equipment must be shut down safely by its operator. Do not disclose customer files, creative work, passwords or remote-control credentials in a quote form. Physical equipment details and access constraints usually provide the starting information. Our licensed electricians explain any additional information genuinely needed for the agreed electrical assessment.",
        "At completion, retain the circuit and equipment details, use limits and any outstanding commissioning work. An installation repair does not validate machinery, sound production, network performance or all business processes. If another activity or appliance is introduced later, revisit the assumptions rather than treat the earlier job as open-ended approval. A precise electrical record is useful to the next occupant without claiming capabilities that were never assessed.",
      ] },
    ],
    firstFaq: { question: "Can I request electrical work for a Marrickville studio?", answer: "Yes, explain the activity, equipment and premises rather than relying on the word studio. We confirm availability, relevant authority and the electrical assessment needed. Any landlord, building or use approval remains separate. Do not adapt a supply or connect substantial equipment on the assumption that a previous tenant used the same room safely." },
    finalFaq: { question: "Does adding outlets approve a different use of my premises?", answer: "No. Electrical work addresses its agreed installation scope. Planning, building, lease and specialist operational requirements need their own confirmation. Tell us the intended use so the proposal is not based on an incorrect assumption. Completion of wiring does not certify a venue, machine process or every future activity carried out in the space." },
  },
  "/service-areas/liverpool-and-fairfield/liverpool/casula": {
    description: "Our licensed electricians assess faults and proposed electrical changes in Casula 2170 houses and attached homes. Explain which dwelling and rooms are involved, what has changed and who can approve access. We confirm availability, required authorisation and scope rather than infer circuit boundaries from the address or building layout.",
    heading: "Know which parts of the site the work will cover",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10851",
    sections: [
      { heading: "Separate the dwelling from the whole site", paragraphs: [
        "In the 2021 Census, Casula's occupied private dwellings included 71.1% separate houses and 24.7% semi-detached, terrace or townhouse dwellings. Those categories do not show how an individual property is titled or supplied. Give the complete dwelling identifier and explain any shared driveway, access gate or electrical area relevant to the request. A detached appearance does not prove that every service belongs solely to one occupant.",
        "For a home at the rear of a site or within a group, describe the authorised access path without assuming the front dwelling's equipment is part of the job. The electrician needs to identify the actual installation before determining circuit boundaries. Do not follow cables through another occupant's area, remove labels or operate a neighbouring board to find out which supply is yours.",
      ] },
      { heading: "Use existing records without treating them as proof", paragraphs: [
        "A previous work record, plan or known renovation date can help explain how the property developed. Mention if rooms or buildings have changed use since those records were prepared. Labels may be incomplete or out of date and need checking by the electrician. A handwritten description on a switch does not make it safe for an occupant to open an enclosure or assume that hidden wiring is isolated.",
        "Where an outlet or light serves a shared space, establish the appropriate owner or strata contact before a planned alteration. A maintenance responsibility may depend on the plan and by-laws, not simply who uses the fitting most. For a dangerous fault, take safety action first and report the hazard promptly. Do not leave exposed or damaged equipment in use while a routine scope discussion continues.",
      ] },
      { heading: "Make the proposed change specific to your dwelling", paragraphs: [
        "If you want new outlets, lighting or a fixed-appliance connection, specify the rooms, equipment and intended positions within the confirmed boundary. The available circuit and access determine the proposal. Extending power to another building is not automatically part of a small indoor job. Describe that request separately so routing, permission and supply requirements can be assessed rather than improvised during installation.",
        "At completion, ask for the work locations and any updated circuit information to be explained. Keep the records with the correct dwelling details, particularly where similar unit numbers or several occupiers share a street address. The outcome should state what was repaired or installed and what was not assessed. It does not establish that a secondary dwelling has planning approval or that neighbouring installations have passed inspection.",
      ] },
    ],
    firstFaq: { question: "Can you assess an electrical fault in a rear dwelling in Casula?", answer: "Provide the dwelling identifier, symptom and authorised access arrangement. We confirm availability and the relevant investigation. The actual supply and ownership boundary must be established rather than assumed from where a cable appears to run. Do not operate another dwelling's equipment or enter restricted areas to prepare for the visit." },
    finalFaq: { question: "Does a separate entrance mean my electrical supply is independent?", answer: "No. Access, title and electrical supply are different matters. Existing plans can assist, but an electrician needs to assess the relevant installation. Tell us about shared areas and the authorised property contact. An electrical job also does not confirm planning approval for a separate dwelling or settle private responsibility for the site's shared services." },
  },
  "/service-areas/liverpool-and-fairfield/liverpool/chipping-norton": {
    description: "Our licensed electricians review electrical damage and general work enquiries in Chipping Norton 2170. If water has affected electrical equipment, keep clear and explain that hazard first. Availability, safe access and required authorisation must be confirmed; a dry-looking property or restored street supply does not establish that damaged equipment is safe.",
    heading: "Keep wiring checks apart from flood clean-up",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10907",
    sections: [
      { heading: "Use local waterway context without assuming your risk", paragraphs: [
        "Liverpool City Council identifies Chipping Norton Lakes along the Georges River, and its historical floodplain work includes Chipping Norton. This does not classify every property as flood affected or describe today's conditions. Use current council and NSW SES information for your address. The 2021 Census recorded 81.2% separate houses among occupied private dwellings, but housing form cannot show whether electrical equipment has been exposed to water.",
        "If your property is affected, follow emergency advice and do not enter an unsafe area to check the power. A booking for an electrician is not permission to return after an evacuation. Once safe access has been established by the relevant authorities, tell us what exposure is known from safe observations. There is no need to collect photographs from wet rooms or approach damaged electrical equipment.",
      ] },
      { heading: "Dry surfaces do not establish electrical safety", paragraphs: [
        "Water and contamination can affect wiring, protective equipment and appliances in ways that are not visible externally. Do not reconnect or use equipment that has been flooded because it appears dry. NSW recovery guidance requires the relevant electrical assessment before use. Cleaning a room, removing mud or having electricity restored to the street does not itself make the installation inside the property ready to energise.",
        "Keep the electrical assessment distinct from general clean-up and building repairs. Tell the electrician about any known water entry, disconnection and equipment involved, without dismantling covers to inspect it. Other hazards may also prevent access. We confirm whether the site is ready for the agreed electrical investigation rather than promise immediate reconnection solely because an appointment has been made.",
      ] },
      { heading: "Plan the checks, repairs and return of supply", paragraphs: [
        "An inspection can identify required repairs or restrictions; it is not automatically the same as completing all remedial work. Where supply was disconnected due to flooding, the relevant inspection and reconnection process must be followed. Repairs may require separate electrical compliance documentation. Our licensed electricians explain the accepted work and any further authority or distributor involvement instead of treating one document as approval of every damaged appliance.",
        "Ask for a clear record of equipment that remains out of use and the steps still needed before normal occupation. Building, gas, plumbing and appliance matters may need their own assessment. Do not reconnect isolated items as clean-up progresses or assume a neighbour's restoration applies to your home. The decision rests on the condition and checks at your premises, not on elapsed drying time or a suburb-wide recovery message.",
      ] },
    ],
    firstFaq: { question: "Can I turn power back on when a flood-affected Chipping Norton home looks dry?", answer: "No. Dry appearance is not electrical clearance. Stay away from affected equipment and have the relevant installation and appliances assessed before use. Follow official return-to-property advice as well. An electrician's inspection, any required repairs and supply reconnection can be separate stages; street power being available does not complete those stages for your home." },
    finalFaq: { question: "Does this page mean my Chipping Norton property is flood prone?", answer: "No. Local waterways and historical studies provide context only. Check current property-specific council information and NSW SES warnings. We do not determine flood classification from the suburb name or housing type. Electrical assessment responds to the actual exposure, damage and work required at the address, with safe access confirmed before attendance." },
  },
  "/service-areas/liverpool-and-fairfield/liverpool/moorebank": {
    description: "Our licensed electricians assess Moorebank 2170 electrical faults and planned work after confirming availability, required authorisation and access. Include known water damage, previous isolation or supply restrictions in the enquiry. We explain the assessment limits without promising a whole-property clearance, insurance outcome or immediate reconnection.",
    heading: "Make past damage and work still needed clear",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL12723",
    sections: [
      { heading: "Describe the site's history without guessing", paragraphs: [
        "Moorebank appears in Liverpool Council's historical Georges River floodplain study. That is not a current risk decision for every address. Separately, the 2021 Census counted 82.1% separate houses among occupied private dwellings; it does not show which installations have been damaged or altered. If a property has a known history of water entry, a disconnected circuit or incomplete repair, include that factual history when arranging electrical assessment.",
        "Provide the relevant work record or a concise description of what was left isolated, if available. Do not assume that a new owner or occupier has inherited a complete explanation of earlier work. At the same time, avoid presenting rumours about a street or neighbouring property as evidence of your own installation's condition. The electrician needs the actual symptoms and verified history at the premises.",
      ] },
      { heading: "Do not erase a restriction during other repairs", paragraphs: [
        "Painting, replacing floor coverings or repairing a leak does not remove an electrical restriction imposed after damage. Keep affected equipment unused until the appropriate assessment and repair are complete. Do not remove an isolation notice or reconnect an appliance because another trade has finished. If the reason for a restriction is unclear, ask for it to be investigated rather than assume it has expired.",
        "For a property previously disconnected after flooding, inspection, remedial work and reconnection have specific roles. Tell us which stage you understand has been completed, without uploading a full insurance file. Our licensed electricians can explain the relevant electrical scope and required records. They do not determine an insurer's liability, certify all building repairs or guarantee a distributor's restoration time.",
      ] },
      { heading: "Keep new alterations separate from damage repair", paragraphs: [
        "A repair visit may coincide with a request to move outlets or add equipment, but those are additional decisions. List the damaged or restricted items first and proposed improvements separately. Testing may affect what work is appropriate before an upgrade. An appearance improvement must not conceal an unresolved fault or suggest that new accessories have renewed every cable behind the finished wall.",
        "After the agreed work, keep a location-specific record of what can be used, what remains excluded and who needs the findings for the next stage. This is especially useful when ownership or occupancy changes during repairs. If there is no known damage and you simply need planned electrical work, say so; the suburb's inclusion in a historical study is not a reason to prescribe a flood inspection at every home.",
      ] },
    ],
    firstFaq: { question: "What if I do not know why a circuit in my Moorebank property was left off?", answer: "Do not reconnect it to find out. Give the electrician any available record and describe the equipment or area concerned. The restriction needs investigation on its own facts. A property handover or completed cosmetic repair is not evidence that an unresolved electrical issue has been cleared. We confirm the scope and safe access before arranging assessment." },
    finalFaq: { question: "Can electrical work settle an insurance claim for previous damage?", answer: "No. Electrical findings can document the installation assessed and work required, but the insurer decides the claim under its process. Request the specific electrical information needed rather than send unrelated private claim documents. Completion of a repair also does not certify every building trade or guarantee when an external supply will be restored." },
  },
  "/service-areas/liverpool-and-fairfield/liverpool/prestons": {
    description: "Our licensed electricians assess household electrical faults and additions in Prestons 2170. Explain the rooms and equipment involved, including planned changes in more than one part of the home. We confirm availability, required authorisation and assessment scope before recommending work; a large home does not automatically have spare electrical capacity.",
    heading: "Plan work across rooms as one clear brief",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL13272",
    sections: [
      { heading: "House size does not establish circuit capacity", paragraphs: [
        "Prestons had 92.5% separate houses among occupied private dwellings in the 2021 Census, and 73.6% of occupied private dwellings had four or more bedrooms. These figures provide housing context, not a measure of wiring or appliance use. If you are planning work across several rooms, list the actual equipment and changes. Do not assume that a home with more bedrooms has a larger or more flexible electrical supply.",
        "Separate existing appliances, replacements and genuinely new loads in the brief. An additional fixed appliance may raise different questions from moving a desk or replacing a light. Model information and intended locations help the electrician assess the proposal. A rough count of outlets or the number of switches visible on a board is not a substitute for checking the installation.",
      ] },
      { heading: "Distinguish circuit symptoms from room boundaries", paragraphs: [
        "A loss of power in two rooms does not prove that two circuits have failed, and a working light does not establish that the outlets below it are unaffected. Report the equipment and areas you already know are involved. The electrician determines how the circuits are arranged. Do not repeatedly reset protection or move suspect appliances around the home in an attempt to map the problem.",
        "Keep fault investigation separate from plans to add capacity. If equipment is hot, damaged, sparking or smells burnt, stop using it and report the hazard first. Buying a larger powerboard or another appliance will not correct the underlying installation. Any shock, smoke or fire requires the emergency response described above; collecting a complete household inventory should not delay urgent help.",
      ] },
      { heading: "Make future allowances explicit rather than assumed", paragraphs: [
        "Tell us which proposed additions are definite and which are only possibilities. The agreed design can then state its assumptions without suggesting unlimited future capacity. If later work involves solar, batteries, air conditioning or supply-side equipment, the relevant specialist authority and scope must be confirmed separately. An ordinary electrical upgrade does not establish that every future system is approved or included.",
        "At handover, ask for the completed circuit changes and use limits to be explained in plain language. Keep the work records so later proposals start from verified information. Changes to the final equipment selection can require reassessment, even when the room layout stays the same. Our licensed electricians explain the specific outcome without claiming that one upgrade makes the home suitable for every eventual appliance combination.",
      ] },
    ],
    firstFaq: { question: "Can I combine several Prestons electrical jobs in one enquiry?", answer: "Yes. Group the tasks by room, distinguish repairs from additions and include model details for proposed fixed equipment. We confirm what can be assessed together and what needs separate authority or access. A combined enquiry is not a promise that all work can be completed in one visit or that the current supply can support every requested addition." },
    finalFaq: { question: "Does a switchboard upgrade guarantee enough power for future appliances?", answer: "No. The intended demand, circuits, supply and installation must be assessed as a whole. A new enclosure or more protective devices alone does not create unlimited capacity. State realistic future plans and keep the scope's assumptions recorded. Specialist systems and any network-side changes require their own confirmed requirements rather than an implied approval from general electrical work." },
  },
  "/service-areas/liverpool-and-fairfield/fairfield/cabramatta": {
    description: "Our licensed electricians assess household and business electrical enquiries in Cabramatta 2166. Include the exact dwelling, shop or tenancy and describe the equipment affected. We confirm availability, required authorisation, the job contact and electrical scope before arranging access or proposing work.",
    heading: "Give the right address and job details",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10738",
    sections: [
      { heading: "A street address can describe different kinds of work", paragraphs: [
        "Cabramatta's occupied private dwellings were 38.8% separate houses, 22.0% attached dwellings and 38.7% flats or apartments in the 2021 Census. Council also identifies Cabramatta as a town centre. These sources explain why the type of premises matters; they do not identify the wiring or permitted use at your address. Give the unit or shop identifier and say whether the fault is residential, commercial or in shared space.",
        "Where a building has more than one occupant, clarify which entrance and area the authorised work concerns. A business trading name may not match the name used in the building's records. A simple site description can prevent the wrong tenancy being assumed. Keep account numbers, door codes and private customer information out of the initial message; they are not needed to describe a failed light or outlet.",
      ] },
      { heading: "Distinguish a building fault from equipment servicing", paragraphs: [
        "Tell us whether several items lost power or one appliance stopped performing its function. For business equipment, supply the model and symptom if this is available from ordinary records. Mains electrical investigation, appliance repair and specialist equipment servicing are different scopes. A machine being plugged in does not make every part of its operation an electrical-installation job we have agreed to undertake.",
        "Do not bypass a protective device, open a control cabinet or use another circuit to keep a suspect item running. Keep damaged equipment unused and tell the responsible premises contact. If smoke or fire is present, move to safety and call 000. The urgency of reopening or keeping stock in use cannot establish that a makeshift electrical arrangement is safe.",
      ] },
      { heading: "Bring the right contact into the job early", paragraphs: [
        "For a rented shop or dwelling, establish who can approve investigation and who can arrange entry. A property manager may need to address a building service while the occupant describes an appliance issue. Our licensed electricians can explain what their testing confirms without deciding a lease dispute. The job should not expand into another tenancy solely because a cable or enclosure is accessible from the first.",
        "At handover, record the specific location and equipment addressed, any restriction on use and any further investigation needed. In a multi-occupant property, that precision is more useful than a vague statement that the power was fixed. An electrical repair does not grant a change of use, certify food equipment or promise uninterrupted trade. Separate approvals and product service requirements remain separate from the work completed.",
      ] },
    ],
    firstFaq: { question: "What address details should I give for a Cabramatta shop or unit?", answer: "Give the street address, unit or shop number, type of premises and the affected area. Identify an authorised job contact and any access restriction without sending entry codes or private records. If the building has several occupants, explain which space needs attention. We confirm the scope instead of assuming one business name describes the whole installation." },
    finalFaq: { question: "Does a power fault booking include repairing my business appliance?", answer: "Not automatically. Explain the symptom and provide the equipment model from existing records. Electrical supply testing and internal appliance servicing can lead to different work. The findings determine the next step, and specialist authority or product support may be needed. Do not keep trying alternative outlets with a damaged or suspect appliance to establish its cause." },
  },
  "/service-areas/liverpool-and-fairfield/fairfield/canley-vale": {
    description: "Our licensed electricians review electrical faults and planned work in Canley Vale 2166. Tell us whether the request is for a dwelling or trading premises, what needs attention and how access is managed. Availability, required authorisation, safe working arrangements and electrical scope are confirmed before work is accepted.",
    heading: "Plan safe work while people use the site",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10791",
    sections: [
      { heading: "Describe occupancy as well as the installation", paragraphs: [
        "Canley Vale has both residential housing and a town centre described by council as a shopping and dining area. The 2021 Census recorded 53.3% separate houses and 29.1% flats among occupied private dwellings; these are residential figures, not a business survey. Identify the actual premises and explain whether residents, staff or customers will be present while the electrical work is proposed.",
        "A visit to investigate a fault may need different access from installing equipment in a closed room. Describe occupied areas, doors that must remain usable and any known restrictions. Do not promise that a trading floor can stay open before the work is assessed. Safe separation from the work area and suitable access must be agreed for the actual job, not inferred from an available appointment time.",
      ] },
      { heading: "Plan power outages without a promise of continuous use", paragraphs: [
        "List equipment whose loss of power would affect the premises and explain which items are part of the enquiry. Avoid sending customer data or passwords; a description of the equipment's function is enough to begin planning. The electrician determines the required isolation and testing. An instruction to keep every appliance running cannot substitute for a safe work method or extend an agreed scope to unrelated equipment.",
        "If equipment is damaged, hot, sparking or affected by water, its continued use is not made safe by a busy period ending soon. Keep people away and report the hazard promptly. Do not cover a damaged cable, tape a switch in position or reconnect an isolated item to finish a task. Emergency smoke or fire needs evacuation and 000 before business-continuity discussions.",
      ] },
      { heading: "Define what a return to service means", paragraphs: [
        "After electrical testing or repair, ask which part of the installation may return to use and whether the equipment operator has any separate checks to complete. Restoring an outlet is not the same as verifying a refrigerator's temperature, a machine's process or an alarm subscription. We explain the electrical findings without issuing assurances about functions outside the confirmed service.",
        "For planned additions, make the handover list specific enough for the next person using the premises: locations, controls, instructions and remaining limitations. If the property is leased, pass the appropriate work details to the authorised contact. Keep future changes on a separate list so a completed repair is not mistaken for a whole-premises upgrade. Further work can then be considered with a clear starting point.",
      ] },
    ],
    firstFaq: { question: "Can my Canley Vale premises stay open during electrical work?", answer: "That depends on the fault, proposed work, isolation needs and whether occupants can be kept safely away from the work area. Describe trading or household access needs before confirming the visit. We do not promise live work or uninterrupted power to fit an opening schedule. Damaged equipment must not stay in use simply because closing is inconvenient." },
    finalFaq: { question: "Does electrical repair confirm that all business equipment is ready to operate?", answer: "No. The electrician explains the supply and installation work completed. Equipment may also need its operator's checks or specialist servicing before normal use. Ask what was tested and what was not included. A restored power point alone does not validate product temperatures, machine processes or every safety system in the premises." },
  },
  "/service-areas/liverpool-and-fairfield/fairfield/smithfield": {
    description: "Our licensed electricians review Smithfield 2164 electrical enquiries after confirming availability and required authorisation. A household circuit fault and an industrial equipment problem need different information. Tell us the premises, observed symptom, site contact and access limits; specialist machine work is not included merely because an electrical enquiry has been received.",
    heading: "Tell a site power fault from a machine fault",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL13575",
    sections: [
      { heading: "Identify a home, workshop or industrial site", paragraphs: [
        "Fairfield City Council identifies the Smithfield-Wetherill Park Industrial Estate, while Smithfield also has residential dwellings. In the 2021 Census, 77.3% of occupied private dwellings were separate houses. Those facts establish different premises types, not what services a particular business needs. State whether you are calling about a home, workshop or industrial tenancy, and describe the equipment and area involved.",
        "For a worksite, an equipment asset number and existing model information can be useful alongside the physical location. Do not send production records, customer information or control-system passwords in a quote request. Clarify whether the suspected issue is loss of supply to the equipment, damage to the connection or an operational error within the machine. These observations help define a scope without making a remote diagnosis.",
      ] },
      { heading: "Keep protective controls intact", paragraphs: [
        "A stopped machine may involve controls, interlocks, mechanical conditions or an electrical fault. Do not bridge a safety device or repeatedly restart it to prove that the supply is present. A business electrical booking does not authorise us to service every machine or alter its safety functions. Any specialised investigation needs the appropriate competence, authority and agreed boundaries before it is accepted.",
        "Follow the site's established reporting and isolation arrangements through authorised people, and keep others away from suspect equipment. Our licensed electricians determine safe electrical testing methods for the accepted work. Production pressure is not a reason to request work on exposed live parts. A label or an operator's switch position alone is not a basis for an unqualified person to open electrical equipment.",
      ] },
      { heading: "Record the finding at the correct boundary", paragraphs: [
        "Testing may distinguish a building-circuit issue from something within the connected equipment. Ask the electrician to state what was checked and where further specialist assessment is required. Replacing a socket or repairing a supply circuit does not certify a machine's mechanical operation. Equally, an equipment service report does not automatically establish that the premises wiring can support a proposed replacement machine.",
        "For new equipment, obtain the manufacturer's supply requirements before requesting installation. Existing plug shape or spare board space is not enough to specify the work. The proposal needs the actual site arrangement and any required interruption or approval. Keep commissioning responsibilities clear at handover so restoring electricity is not mistaken for permission to restart a process with outstanding faults or incomplete safety checks.",
      ] },
    ],
    firstFaq: { question: "Can you investigate power to equipment at a Smithfield worksite?", answer: "Describe the equipment, symptom and site arrangements so the electrical scope and required authority can be confirmed. Supply investigation is distinct from specialist machine servicing. Do not open a cabinet or bypass controls to gather information. We assess whether the requested work can be accepted and explain any boundary requiring separate specialist involvement." },
    finalFaq: { question: "Is the same plug enough to show a replacement machine will suit the site?", answer: "No. Provide the manufacturer's electrical requirements and intended use. The circuit, protection, supply and installation location need assessment, along with the worksite's access and interruption arrangements. A matching connector does not establish suitability or complete commissioning. No new equipment should be energised on the assumption that the previous machine's arrangement is automatically adequate." },
  },
  "/service-areas/liverpool-and-fairfield/fairfield/wetherill-park": {
    description: "Our licensed electricians assess Wetherill Park 2164 premises faults and proposed electrical alterations. Identify whether the work concerns a home or an industrial or commercial site. We confirm availability, site requirements and required authorisation before accepting a defined scope, without promising extra capacity or uninterrupted operations.",
    heading: "Set out the site needs before adding power",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL14281",
    sections: [
      { heading: "Residential data is not an industrial load survey", paragraphs: [
        "Wetherill Park is part of the industrial estate identified by Fairfield City Council, and also contains homes. The 2021 Census recorded 88.7% separate houses among occupied private dwellings. That residential measure says nothing about a warehouse's electrical demand or available supply. Make the premises type explicit and describe whether the request is a fault, a relocation or a planned addition to an existing installation.",
        "For proposed equipment, prepare a schedule of the actual items and manufacturer information rather than a request for more power in general. Say which equipment is intended to operate together and which is future only. The electrician still needs to assess the installation. A large floor area, unused wall space or a vacant position in a board cannot establish usable electrical capacity.",
      ] },
      { heading: "Separate the present job from later stages", paragraphs: [
        "If a fit-out will be staged, distinguish the equipment needed now from possible later additions. That helps the electrical proposal describe its assumptions without treating uncertain expansion as a committed design. Include known tenant or property-owner requirements and identify who can approve the work. Do not send confidential lease terms when a concise description of the relevant approval and site restriction is sufficient.",
        "Supply changes can involve matters beyond internal wiring, including the distributor's requirements and separately authorised work. Those dependencies should be identified before an installation date is promised. Our licensed electricians confirm the permitted scope and any necessary additional authority; this page does not establish every specialist permission or guarantee a supply upgrade. A household or business enquiry is reviewed on its own facts.",
      ] },
      { heading: "Allow for testing and a controlled handover", paragraphs: [
        "Discuss site induction, access to the work area and the interruption needed for safe work before the visit. Leave isolation and electrical verification to authorised people using the proper procedures. Do not remove guards or open a switchboard to photograph spare capacity. If a current fault presents heat, arcing or damaged exposed parts, report it as a safety concern instead of including it only in a future expansion list.",
        "The final record should distinguish circuits installed or repaired from capacity still subject to approval or further assessment. Ask which equipment may be connected and what remains excluded. Site operators may have additional commissioning checks before a process resumes. We do not convert electrical completion into a promise about output, production uptime or the safety of equipment and building systems outside the work actually undertaken.",
      ] },
    ],
    firstFaq: { question: "What should I provide for a Wetherill Park electrical expansion enquiry?", answer: "Identify the premises, intended equipment, manufacturer supply details and any stages or simultaneous-use requirements. Include practical access and approval constraints. These help define assessment; they do not replace inspection of the installation or distributor requirements. Do not open electrical boards or provide account credentials to try to demonstrate available capacity." },
    finalFaq: { question: "Can an electrician guarantee a supply upgrade on the first visit?", answer: "No. The existing installation, proposed demand, permissions and any network-side requirements affect the result. Investigation can establish a scope and dependencies, but not automatically secure additional supply. We explain what work can be accepted and which approvals or specialist authority remain necessary before an upgrade programme is agreed." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/belfield": {
    description: "Our licensed electricians assess faults and planned electrical changes in Belfield 2191. Tell us whether the work is in a house, attached dwelling or unit and whether building alterations are planned. We confirm the address, availability, access and required authorisation before agreeing the electrical scope.",
    heading: "Fit wiring work into the whole property plan",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10257",
    sections: [
      { heading: "Start with the existing home, not a future plan", paragraphs: [
        "Belfield's 2021 Census recorded 66.8% separate houses and 23.7% semi-detached, terrace or townhouse dwellings among occupied private dwellings. This describes housing form, not electrical age or defects. If you are considering alterations, explain which parts of the home will remain and which will change. A sketch of the present and proposed rooms gives an electrician a better starting point than a suburb-wide assumption about the wiring.",
        "Council's Belfield village planning process is separate from permission for a particular project. Do not treat a published master plan as approval to relocate services at your address. Obtain the property-specific planning advice needed for the building work, then provide the relevant approved details for electrical coordination. We can discuss an electrical proposal without claiming to approve the building design or predict future development controls.",
      ] },
      { heading: "Identify what can be done before other work", paragraphs: [
        "List immediate repairs separately from additions that depend on a wall, doorway or room layout changing. A damaged fitting may need attention now even if a larger renovation is months away. Conversely, installing an outlet before final cabinetry positions are known can create avoidable rework. Ask which decisions must be settled before materials are selected and which work can sensibly be investigated first.",
        "In an attached dwelling, establish whether access through a shared area or any alteration to a boundary is proposed. A common wall is not proof that two homes share an electrical circuit. Plans, ownership arrangements and inspection determine the relevant limits. Do not open a neighbouring enclosure, cut into a wall or remove existing fittings to make room for the proposed installation.",
      ] },
      { heading: "Keep the repair outcome and future scope separate", paragraphs: [
        "For an electrical fault, record what stopped working and any visible damage from a safe position. Our licensed electricians investigate the agreed part of the installation and explain findings before recommending further work. A successful repair to one circuit does not establish capacity for every future appliance, and a planned renovation does not make an unsafe fitting acceptable to continue using.",
        "Before the visit ends, clarify which equipment is available for use, what remains isolated and what information is needed for later stages. Retain the work record with the project plan. Access, hidden conditions and changes to other trades' work can alter the eventual proposal. Ask for those changes to be explained rather than assuming that an early enquiry fixes the cost or scope of a project that is not yet designed.",
      ] },
    ],
    firstFaq: { question: "Can I arrange a Belfield electrical repair while planning a renovation?", answer: "Yes, describe the current fault and the later project as separate items. Safety concerns should not wait for a future building programme. We confirm availability and the immediate investigation, then identify any decisions needed for planned additions. Do not dismantle wiring for a builder or attempt temporary connections while waiting for the larger work." },
    finalFaq: { question: "Does a local master plan approve electrical changes at my property?", answer: "No. Area planning and the approvals for an individual alteration are different. Confirm the applicable property requirements with the appropriate planning authority. The electrical scope must then reflect the actual layout, permissions and installation. We do not infer permission, redevelopment potential or wiring condition from a council planning map." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/belmore": {
    description: "Our licensed electricians review electrical faults in Belmore 2192 homes and units. Explain whether the symptom is inside your dwelling, in a shared area or reported by more than one occupant. We check availability, required authorisation and investigation limits before arranging access; a neighbour's experience is useful context, not a diagnosis.",
    heading: "Report the scope of a fault without risky tests",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10279",
    sections: [
      { heading: "Distinguish your rooms from shared space", paragraphs: [
        "In Belmore, the 2021 Census recorded flats or apartments as 46.1% and separate houses as 43.8% of occupied private dwellings. Neither figure reveals the electrical arrangement of a particular address. When reporting a fault, name the room or shared location involved. A light outside a unit door may belong to a different system from the lights inside, so the location alone does not decide who should authorise repair.",
        "If another resident has already reported a similar problem, pass that observation to the building contact without entering their home or operating their equipment. Note whether the reports occurred at the same time. This can help the electrician distinguish the scope of an enquiry, but matching symptoms do not prove a common cause. Do not organise residents to reproduce a trip or touch suspect fittings for comparison.",
      ] },
      { heading: "Give a short history of the symptom", paragraphs: [
        "Useful detail includes whether a problem appeared suddenly, followed known work or returns intermittently. Describe what you noticed rather than labelling it a blown fuse, overload or faulty safety switch. Those are possible findings, not facts established by a light going out. A clear chronology can reduce confusion when the person arranging the visit is not the person who first saw the problem.",
        "An intermittent fault still needs care. Do not repeatedly reset protection or keep using equipment that smells burnt, becomes unusually hot or sparks just because it later seems normal. Keep people away from damaged electrical parts. Smoke, fire or immediate danger requires moving to safety and calling 000, not waiting to collect a complete fault history for an online enquiry.",
      ] },
      { heading: "Agree the limits of the fault checks", paragraphs: [
        "For a unit, the strata or building contact may need to arrange access to shared electrical areas while the resident provides entry to the dwelling. Confirm both before scheduling a non-urgent inspection. Our licensed electricians assess the authorised electrical scope and can explain when findings extend beyond it. Access permission does not automatically authorise alterations to every installation reached from that area.",
        "After testing, ask which observations were confirmed and whether further access is needed to resolve the cause. An investigation that identifies a problem outside the agreed area may not conclude with a same-visit repair. Keep the written findings with the correct property contact so the next step is clear. This is more useful than describing one repaired fitting as evidence that the entire building has been checked.",
      ] },
    ],
    firstFaq: { question: "Should I check other Belmore units when my power fails?", answer: "You can report information already supplied by neighbours or building management, but do not enter electrical rooms or operate other residents' equipment. Tell us which parts of your own home are affected from ordinary observation. A wider outage and a fault within one dwelling require different investigation; similar symptoms alone cannot establish where the problem lies." },
    finalFaq: { question: "Can an intermittent fault be investigated if it is not happening during the visit?", answer: "Explain its timing, affected equipment and any previous work or safely observed warning signs. Those details help define testing, although the cause may need further investigation. Do not recreate a dangerous condition for the electrician. We explain the limits of the findings and any restrictions on use instead of declaring an unexplained recurring fault resolved." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/campsie": {
    description: "Our licensed electricians assess power, lighting and planned electrical changes in Campsie 2194. For an apartment enquiry, include the unit and building details and whether shared electrical access is controlled. Availability, work approval and required authorisation are confirmed before a visit is agreed.",
    heading: "Prepare a clear brief for power in a unit",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10781",
    sections: [
      { heading: "Explain how the room will be used", paragraphs: [
        "Flats or apartments comprised 67.1% of Campsie's occupied private dwellings in the 2021 Census, and two-bedroom dwellings accounted for 57.9%. These historical figures do not describe your unit's circuits. If a bedroom will also become a study or a living area is being rearranged, provide the proposed furniture and equipment positions. The electrical brief should follow the actual room, not a standard apartment package.",
        "Separate a fault from a preference. An outlet that is damaged needs assessment; an inconvenient outlet position is a planned change. Include fixed appliances and any significant additional equipment in the discussion rather than counting small chargers alone. The electrician can then review the relevant circuit and access, without assuming that adding sockets increases the electricity available to the apartment.",
      ] },
      { heading: "Resolve building access before a planned visit", paragraphs: [
        "Ask the building contact how authorised trades reach any necessary meter or service area. Tell us if there is a booking process, restricted access period or requirement for someone to attend. Do not force a locked door, borrow access without permission or send security codes through a general enquiry form. A key arrangement and the authority to carry out work are separate matters.",
        "Discuss whether testing or an agreed alteration may interrupt your supply and who should be informed. Avoid promising other occupants that work will be silent or that power will never need to be interrupted. Inspection establishes the practical sequence. Where the work could affect shared services, building management needs to be involved; an individual resident cannot define the whole building's electrical boundaries from a unit switch alone.",
      ] },
      { heading: "Settle the planned-change approval and handover", paragraphs: [
        "NSW strata guidance distinguishes cosmetic changes from renovations involving wiring, power points and other building elements. Check the scheme's by-laws and obtain the relevant permission before a planned installation. Provide the approved location or scope, not unrelated minutes containing residents' private information. Emergency safety action must not be delayed while treating a dangerous fault as an optional renovation request.",
        "When the agreed electrical work is complete, ask what was tested and how the new points or controls should be used. Keep the work information available for a later tenant or owner. Changes to room use may raise other building questions outside an electrical booking. Our licensed electricians describe the installation they assessed without certifying a home-office conversion, tenancy arrangement or all common property by implication.",
      ] },
    ],
    firstFaq: { question: "What information helps with new power points in a Campsie unit?", answer: "A room sketch, proposed furniture positions and an equipment list are useful, along with building access requirements and the relevant approval. The existing circuit still needs assessment. Do not cut holes or remove covers to show the wiring. A quote for electrical outlets does not decide whether a change in the room's use needs other permission." },
    finalFaq: { question: "Can a booking go ahead if the meter room is locked?", answer: "Tell us before confirming the appointment so necessary authorised access can be arranged. Some assessments require more than entry to the apartment. Do not bypass locks or disclose building security credentials in a website form. We can clarify access needs and any limitation on the proposed visit rather than assume that all testing is possible from the unit alone." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/canterbury": {
    description: "Our licensed electricians review indoor and outdoor electrical enquiries in Canterbury 2193. Describe the fitting, its location and any water or damage without touching suspect equipment. For balconies or shared exteriors, access and approval must be established along with availability, required authorisation and the work scope.",
    heading: "Set the scope of indoor and outdoor work",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10796",
    sections: [
      { heading: "Identify the actual outdoor space involved", paragraphs: [
        "Canterbury's 2021 Census counted 62.8% flats or apartments and 29.3% separate houses among occupied private dwellings. That makes the distinction between a private yard, balcony and shared exterior worth clarifying, but it does not establish ownership at any address. Tell us where a light, outlet or cable is located and whether the enquiry concerns existing damage or a proposed addition.",
        "A balcony accessible only from your unit can still involve common-property walls, waterproofing or other building elements. For planned work, check the strata plan and by-laws through the appropriate contact. Do not assume permission follows from being able to reach the space. The electrician also needs to assess weather exposure, the mounting location and supply before proposing suitable equipment.",
      ] },
      { heading: "Keep wet or damaged equipment out of use", paragraphs: [
        "Report whether a problem was noticed after rain, cleaning or another event, but do not conclude that drying the surface makes the installation safe. Water can affect parts that are not visible. Stay clear of wet electrical fittings and do not open them, reconnect them or operate a switch while standing in water. Photographs are optional and must not draw you closer to a hazard.",
        "For a planned outdoor outlet, explain what it will supply and where the appliance will stand. An indoor extension lead through a door is not a permanent outdoor installation. The chosen position must be assessed as part of the actual job, including safe use and access. A product's weather-resistant description does not establish suitability for every balcony, cleaning practice or exposed location.",
      ] },
      { heading: "Coordinate repair with the building issue", paragraphs: [
        "If water is entering from a wall or above a fitting, an electrical repair and the source of the water may require separate work. The electrical assessment should state what must remain out of use and whether the agreed repair can proceed safely. Replacing a fitting does not repair a waterproofing defect. In a unit, notify the relevant building contact so the two issues are not treated as unrelated complaints.",
        "Discuss access equipment and any restrictions on working outside before scheduling. Do not climb onto a balcony edge or reach from a window to prepare the site. At completion, retain the equipment information and ask about any remaining use limits. We do not describe a repaired balcony light as confirmation that all exterior wiring, building drainage or neighbouring properties have been inspected.",
      ] },
    ],
    firstFaq: { question: "Can I have an outlet added to my Canterbury balcony?", answer: "That depends on the location, supply, intended use and relevant building approval. Explain the equipment you want to use and check any strata requirements before ordering an installation. The proposal must account for the actual exposure and building elements affected. Do not use a trailing indoor lead as a permanent replacement for a properly assessed outdoor arrangement." },
    finalFaq: { question: "Can I use an outdoor light again once it looks dry?", answer: "Appearance alone cannot establish electrical safety after water exposure. Leave suspect equipment unused and arrange assessment, mentioning how it became wet. Do not remove the cover to dry it or test it repeatedly. If water entry is a separate building problem, that also needs attention; electrical replacement by itself does not establish that the cause has been resolved." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/earlwood": {
    description: "Our licensed electricians assess Earlwood 2206 household faults and planned electrical work. Describe the rooms involved, any additions already made and the changes you are considering. We confirm availability, required authorisation and scope without assuming that a home's appearance proves the age or condition of its wiring.",
    heading: "Plan wiring work around the home you have now",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL11346",
    sections: [
      { heading: "Do not judge wiring by the way a house looks", paragraphs: [
        "Separate houses represented 80.1% of Earlwood's occupied private dwellings in the 2021 Census. That is housing background, not a survey of electrical installations. A house may have had several alterations, while its visible style remains unchanged. Tell us about work you actually know occurred and provide available electrical records; neither a recently painted room nor an older facade establishes what wiring is behind it.",
        "When several rooms are being updated, make a simple list of the proposed functions and appliances. Note which spaces must stay usable during the job. Our licensed electricians can assess the relevant existing circuits and explain any necessary staged work. A whole-house rewire should not be presumed from a postcode, just as new-looking switches do not prove that every circuit has already been renewed.",
      ] },
      { heading: "Agree safe stages before finishes are completed", paragraphs: [
        "Electrical planning is easier before final wall finishes and fixed joinery close off access. Coordinate the proposed positions and sequence with the building work, leaving the electrician to determine safe isolation and installation methods. Do not remove fittings or expose cables ahead of the visit. If the plan changes after wiring locations have been agreed, have the effect assessed before covering the work.",
        "An occupied home needs a practical discussion about the areas affected by testing and interruptions. Tell us about any essential equipment that relies on power without sending private medical records. Its user may need a separate continuity plan with their provider. An appointment for building electrical work is not a guarantee of uninterrupted supply, and an extension lead must not be improvised as a substitute for a safe work arrangement.",
      ] },
      { heading: "Match the records to the work actually done", paragraphs: [
        "Ask the electrician to explain the findings and distinguish necessary repair from optional improvements. Testing may show that a proposed addition needs further circuit work, or that a reported problem is limited to particular equipment. The scope should identify those differences. Keep unexpected damage away from occupants and do not restore isolated equipment because another part of the home appears to work normally.",
        "On handover, retain the relevant electrical work documents and a clear description of completed and outstanding items. A partial upgrade should remain recorded as partial, with any restrictions understood. This helps the next stage use real information instead of guesswork. It does not convert an assessment of selected rooms into a warranty about all concealed wiring or a building-wide safety certification.",
      ] },
    ],
    firstFaq: { question: "Does an older-looking Earlwood house automatically need rewiring?", answer: "No. The actual installation, its condition and the intended work need assessment. Existing records can help, but styling and suburb demographics cannot diagnose wiring. Tell us about faults and known alterations. We explain the findings and proposed scope without assuming that every older home needs the same work or that recent cosmetic improvements prove electrical safety." },
    finalFaq: { question: "Can electrical upgrades be staged while we remain at home?", answer: "Discuss the occupied rooms, proposed changes and equipment that must be considered before agreeing the programme. Safe isolation, access and testing determine what is practical. Staging may be possible, but it is not a promise that power stays on throughout. Each stage should leave a clear record of completed work and anything that remains restricted or unfinished." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/lakemba": {
    description: "Our licensed electricians review electrical repair and alteration requests in Lakemba 2195. For rented or strata homes, identify who can approve the work as well as who can provide access. We confirm availability, required authorisation and service limits before arranging a job; an enquiry does not decide ownership or payment responsibility.",
    heading: "Keep repair reports apart from consent for new work",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL12266",
    sections: [
      { heading: "Set out the work you are asking for", paragraphs: [
        "The 2021 Census recorded flats or apartments as 69.8% of Lakemba's occupied private dwellings. This does not establish the tenure or strata rules of an individual home. If an existing electrical fitting fails, report its symptoms as a repair. If you want to move it, add a point or change the use of a room, describe that as a planned alteration so the two decisions are not confused.",
        "A tenant can often provide the clearest account of the problem while the landlord or agent arranges approval. If common property is involved, the strata contact may also be needed. State the job reference and practical contact arrangements without uploading the tenancy agreement. We need enough information to organise the agreed work, not private financial records or evidence to resolve a dispute between residents and an owner.",
      ] },
      { heading: "Do not treat all inside work as cosmetic", paragraphs: [
        "Moving a power point or altering fixed wiring is different from moving furniture. NSW strata guidance includes electrical changes within the renovation approval framework. Before planned alterations, ask the relevant manager what the scheme requires and which parts of the building may be affected. Approval should describe the intended work; a general conversation about improving a room may not settle the installation details.",
        "Do not drill exploratory holes or remove electrical accessories to establish a cable path yourself. The electrician assesses the existing arrangement and identifies any practical limits. If a proposed route affects a shared wall or another building element, that information needs to return to the approval process. An electrical quote does not itself grant permission to alter common property or waive a landlord's requirements.",
      ] },
      { heading: "Keep the result clear for every job contact", paragraphs: [
        "For an urgent safety issue, describe the hazard first and follow the emergency guidance before discussing optional changes. Once the immediate situation is addressed, the electrician can explain what the repair established and what still needs approval. Do not keep using damaged equipment while waiting for a planned upgrade, and do not reconnect an item left isolated because the paperwork for later work is taking time.",
        "After agreed work, ask for a concise outcome that the resident and authorised contact can both understand: the equipment addressed, any use restriction and the next required decision. This avoids a repair being mistaken for permission for further alterations. Keep the electrical records with the property information, but do not describe one completed job as certification of every fixture or all shared services in the complex.",
      ] },
    ],
    firstFaq: { question: "Can a Lakemba tenant request an extra outlet directly?", answer: "You can explain the need, but confirm the landlord's permission and any applicable strata approval before installation is agreed. Give the proposed position and equipment use so the electrical scope can be assessed. A repair request does not automatically authorise a new point elsewhere. Do not alter fixed wiring or remove a socket cover as preparation." },
    finalFaq: { question: "What if an electrical repair also reveals work on common property?", answer: "The electrician should explain the finding and any immediate safety restriction. The appropriate building or strata contact then needs to confirm the further scope and access. Responsibility cannot be decided merely because the visible symptom is inside your unit. Keep the finding attached to the job record so a separate approval does not lose the original safety concern." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/wiley-park": {
    description: "Our licensed electricians assess loss-of-power and lighting enquiries in Wiley Park 2195. Describe which rooms or shared areas are affected and any warning signs you have observed safely. We confirm availability, required authorisation and access before agreeing an investigation, without treating a functioning neighbouring unit as proof that your installation is safe.",
    heading: "Respond safely when part of a building loses power",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL14310",
    sections: [
      { heading: "Keep access and the fault location distinct", paragraphs: [
        "Flats and apartments made up 65.6% of Wiley Park's occupied private dwellings in the 2021 Census. That provides context for asking about unit and shared-area access, not evidence of local outage frequency. If your power fails, explain whether the problem concerns your dwelling, a corridor or another communal area. Do not assume that a working corridor light means all equipment inside the unit is supplied or safe.",
        "Use safe ordinary observations rather than opening a switchboard or walking through a dark restricted area to investigate. Let building management know about a shared-space problem, especially if access is affected. Do not obstruct a walkway with a lead from another unit. Temporary borrowed power can introduce new hazards and does not locate or repair the cause of the original interruption.",
      ] },
      { heading: "Report what remained on as well as what stopped", paragraphs: [
        "Different groups of lights and outlets can be on different circuits. Say whether the whole home lost power or only known equipment stopped, and note the time it happened. There is no need to test every socket to make the report. A list of normal observations helps establish the investigation without suggesting that you should probe, dismantle or deliberately load a circuit.",
        "Mention unusual smells, heat, noise, water or visible damage before discussing convenience. Repeatedly resetting electrical protection is not a way to prove a fault has cleared. Keep suspect equipment unused and seek assistance. For smoke, fire or immediate danger, leave safely and call 000. A website quote may help arrange later work but should never delay that emergency response.",
      ] },
      { heading: "Understand the limits of restoration", paragraphs: [
        "An electrician may need authorised access to both the home and shared electrical areas to distinguish an installation problem from an external supply issue. Supply restoration can involve a different responsible party from the repair inside your dwelling. We clarify those findings and the accepted electrical scope rather than promise that every outage can be fixed by changing a component during one visit.",
        "When power returns, follow the electrician's advice about equipment that must remain off. A restored service does not cancel a restriction on damaged appliances or an unresolved circuit. Tell the relevant building contact if a communal symptom remains. Retaining a clear record of what was actually tested helps prevent a partial restoration from being mistaken for a full assessment of the complex.",
      ] },
    ],
    firstFaq: { question: "My Wiley Park unit has no power but the hallway lights work. What does that mean?", answer: "It narrows the observation, but does not diagnose the fault. Shared lights may use a different circuit or supply. Report the affected rooms and warning signs, and arrange appropriate assistance without opening enclosures or repeatedly resetting protection. The electrician determines whether access beyond the apartment is needed to investigate the actual installation." },
    finalFaq: { question: "Should I run an extension lead from another unit during an outage?", answer: "Do not improvise borrowed power across shared paths or doors. It can create trip, damage and loading hazards without resolving the fault. Keep access clear and discuss the loss of supply with the responsible building contact and electrician. Essential equipment may need its own contingency arrangement; an electrical booking does not guarantee immediate restoration." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/revesby": {
    description: "Our licensed electricians assess lighting faults, switches and planned electrical work in Revesby 2212. Tell us whether the problem affects one fitting, a dimmed group or several rooms. We confirm availability, access and required authorisation before agreeing an inspection or installation scope.",
    heading: "Choose lighting that works with the room and its controls",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL13369",
    sections: [
      { heading: "Decide what the lighting needs to do", paragraphs: [
        "Revesby's occupied private dwellings in the 2021 Census included 62.8% separate houses and 29.7% semi-detached, terrace or townhouse dwellings. This describes housing forms, not existing light fittings or electrical condition. Whether you live in a house or an attached home, begin a lighting enquiry with how the room is used: reading, food preparation and general room lighting can need different arrangements.",
        "Describe the areas that feel too dark, the fittings you want to keep and which lights should operate together. A sketch or safely taken room photograph is more useful than a requested lamp wattage alone. The mounting surface, available wiring and access above the ceiling still need assessment. Do not enter a roof space or pull down a fitting to identify what is installed.",
      ] },
      { heading: "Treat a dimmer and its lights as a combination", paragraphs: [
        "Changing to LED lighting does not automatically make an existing dimmer compatible. The lamp or driver specification, dimmer type and connected load matter together. Manufacturer information can narrow the options, but it is not a substitute for checking the actual installation. Tell us if the existing system flickers only when dimmed, fails to start reliably or behaves differently after a fitting was replaced.",
        "Do not buy a full set of fittings on the promise that every product marked dimmable will behave identically. Ask for compatibility to be addressed in the proposed work, including how the controls will operate at ordinary settings. Our licensed electricians can assess the electrical arrangement and explain the selected components. This is not a promise that an unidentified smart-home or legacy control system can accept any replacement.",
      ] },
      { heading: "Report a fault before requesting a cosmetic change", paragraphs: [
        "A light that buzzes, flickers or stops working should not be dismissed as an appearance problem. Describe when you first noticed it and whether other lights changed at the same time. Do not keep operating a fitting that is hot, damaged or sparking to demonstrate the symptom. If there is smoke or fire, move to safety and call 000; an online quote is not an emergency response.",
        "After the fault is assessed, planned replacements can be scoped separately. Confirm which switches control the new fittings and ask for their normal operation to be demonstrated at handover. Keep the product information with the work records so a future replacement can be identified. If testing points to a circuit problem beyond the fitting, that further work needs a clear explanation rather than an assumption that new lighting alone resolves it.",
      ] },
    ],
    firstFaq: { question: "Will new LED lights work with my existing Revesby home's dimmer?", answer: "Not necessarily. Supply the fitting and dimmer model information if it is already available without dismantling anything. Compatibility depends on the complete combination, including drivers and loading. We assess the relevant installation before recommending components. A dimmable label does not establish compatibility with every control, and changing settings is not a safe substitute for investigating heat, damage or an electrical fault." },
    finalFaq: { question: "Can I request brighter lighting without replacing every fitting?", answer: "Explain which activity or part of the room needs improvement. The assessment may distinguish a failed fitting, unsuitable light distribution and a proposed new lighting position. Existing mounting and circuit limitations affect the options. We can discuss a defined scope after inspection, rather than automatically treating a darker room as a reason to replace all lighting or rewire the home." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/condell-park": {
    description: "Our licensed electricians review power, lighting and electrical-fault enquiries in Condell Park 2200. For a home office, separate the need for electrical outlets from internet or fixed data-cabling work. Availability, the relevant service scope and required authorisation are confirmed before attendance is arranged.",
    heading: "Plan power and data for a home office",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL11001",
    sections: [
      { heading: "Describe the room and equipment you actually use", paragraphs: [
        "The 2021 Census recorded separate houses as 66.3% and semi-detached, terrace or townhouse dwellings as 31.2% of occupied private dwellings in Condell Park. Those housing figures do not identify anyone's work arrangements or circuit capacity. If you are setting up a study in a house or attached dwelling, provide the desk position and intended equipment rather than assuming the nearest socket can support every addition.",
        "List the computer, monitors, printer and other items, and mention separately any heater or substantial appliance used in the same room. The number of plug holes is not a measure of available electrical capacity. Cable routes should leave doors and walking areas usable, without cords trapped under furniture. A new outlet arrangement requires assessment of the circuit and location; it is not simply a way to connect unlimited equipment.",
      ] },
      { heading: "Separate a power interruption from an internet problem", paragraphs: [
        "Tell us what you observed when the problem occurred: did the screen lose power, did a modem light go out, or did the internet connection drop while devices remained on? These are different starting points. Do not repeatedly disconnect equipment or reset electrical protection to reproduce a failure. A reliable symptom description helps avoid assuming that slow internet is caused by a damaged electrical circuit.",
        "An internet outage may involve the provider, network equipment, wireless coverage or internal communications cabling. Electrical testing does not guarantee a particular internet speed or repair a carrier outage. Likewise, a working network connection does not demonstrate that the mains wiring is safe. The enquiry should distinguish the electrical work requested from any separate communications investigation, so neither scope is silently included in the other.",
      ] },
      { heading: "Confirm the cabling scope before walls are opened", paragraphs: [
        "Fixed phone and data cabling requires the appropriate cabling registration and competencies; an electrical licence alone does not establish every communications permission. We confirm the applicable authority before accepting that work. Describe the proposed data outlet locations, existing router position and whether the request involves fixed building wiring. Do not open a telecommunications connection box or alter provider equipment as preparation for a visit.",
        "For an agreed installation, ask which points will be tested and labelled and what completion records apply. Keep the plan focused on the equipment and rooms included, with future additions listed separately. If the room will remain in use, discuss interruption and furniture access beforehand. Do not send Wi-Fi passwords, account credentials or private work files in a quote form; physical installation planning does not require those details.",
      ] },
    ],
    firstFaq: { question: "Can you add power points for my Condell Park study?", answer: "We can assess the proposed positions and intended equipment once availability and the job scope are confirmed. Include significant appliances as well as computer equipment. The electrician checks the relevant circuit before specifying additional outlets. Keep extension leads out of doorways and do not connect multiple powerboards together while waiting; more sockets do not increase the underlying circuit's capacity." },
    finalFaq: { question: "Does an electrical booking include fixing my internet?", answer: "No. Explain whether you need mains electrical work, a fixed data outlet or help identifying a communications fault. Each requires an appropriate scope and, for fixed cabling, the relevant registration and competencies. Provider services and account problems are separate. We do not promise broadband speed or ask you to disclose passwords in order to review a cabling enquiry." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/yagoona": {
    description: "Our licensed electricians assess electrical faults and the electrical side of hot-water enquiries in Yagoona 2199. Describe the system and symptoms without removing covers or approaching wet equipment. We confirm availability, what the electrical assessment includes and required authorisation before arranging the work.",
    heading: "Describe a hot-water problem without assuming its cause",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL14471",
    sections: [
      { heading: "Identify whether the system serves your home alone", paragraphs: [
        "Yagoona's 2021 Census housing mix included 64.6% separate houses and 19.8% flats or apartments among occupied private dwellings. It does not identify the hot-water system installed at an address. For a unit, find out through the building manager whether the service is individual or shared; for a house, provide the system type if you already know it. Do not enter restricted plant areas to investigate.",
        "A tank that looks familiar may use a different heating arrangement from another property. Electric storage, heat-pump, gas and shared-building systems have different equipment and fault boundaries. Give the model from existing paperwork or a label visible from a safe position. Our electrical assessment is not an offer to carry out unconfirmed plumbing, gas or refrigerant work, nor a promise that every no-hot-water problem is electrical.",
      ] },
      { heading: "Explain what changed and when", paragraphs: [
        "Useful details include when the water stopped heating, whether it becomes warm but runs out sooner than expected, and whether other electrical services were interrupted. Mention a recent system replacement or supply interruption if known. Household usage and heating schedules can affect the experience, but neither explains away a safety symptom. Do not adjust a thermostat, bridge a control or reset internal equipment to try to restore heating.",
        "Leaks, a damaged enclosure, a burning smell or water near electrical parts require care rather than experimentation. Keep people away and do not touch the heater, its wiring or nearby wet electrical equipment. Report the hazard when calling. If there is immediate danger, smoke or fire, follow the emergency guidance above. Photographs are optional and should never require climbing, opening covers or moving into an unsafe area.",
      ] },
      { heading: "Agree the electrical investigation and the next step", paragraphs: [
        "Our licensed electricians assess the accessible electrical supply and relevant components within the confirmed work scope. Findings may concern the circuit, a control or another electrical component; testing is needed before a repair is specified. A plumbing leak or a fault in equipment outside that authority needs a different assessment. Separating those findings avoids replacing parts on the assumption that cold water proves an element has failed.",
        "Ask whether the agreed visit is fault investigation, a defined repair or electrical work associated with a replacement system. Materials, access and the heating cycle may affect when normal hot water returns. Confirm any equipment that must remain out of use and retain the work details. Do not treat restored electricity as confirmation that a leaking or otherwise damaged hot-water system is ready for use.",
      ] },
    ],
    firstFaq: { question: "Is no hot water in Yagoona always an electrical fault?", answer: "No. The system type, water supply, controls, heating schedule and equipment condition all matter. Tell us what you know about the heater and what changed. We confirm the electrical service we can assess without promising a plumbing, gas or refrigerant repair. Do not open the heater or change its internal settings to establish the cause yourself." },
    finalFaq: { question: "Can you promise hot water immediately after a repair?", answer: "No. The findings, available parts and any required non-electrical work affect completion, and a storage system may need time to heat after a repair. We explain the electrical work performed and any remaining limitation. For shared systems, building access and authority also matter. Keep unsafe equipment out of use until the relevant assessment and repair are complete." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill": {
    description: "Our licensed electricians assess outdoor lighting, power and electrical faults in Bass Hill 2197. Tell us the access area or fitting involved and any immediate hazard. We confirm the proposed service, availability and required authorisation; a lighting enquiry does not automatically include security-camera installation or advice.",
    heading: "Separate outdoor lighting from a security-system enquiry",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10224",
    sections: [
      { heading: "Start with safe access to the property", paragraphs: [
        "Separate houses made up 72.1% of occupied private dwellings in Bass Hill in the 2021 Census. That is historical housing context, not evidence of security risk or a particular property's outdoor installation. For an entry, path or garage lighting enquiry, describe where people need to walk and what is currently difficult to see. We do not infer a security requirement from a suburb or address.",
        "Identify whether you want a failed light repaired or a new light in a different position. Mounting height, weather exposure, the available circuit and safe maintenance access affect the electrical proposal. Existing cables cannot be assumed suitable just because a fitting is nearby. If a light or connection is broken or wet, keep clear; do not climb up, remove its cover or touch it to obtain a better photograph.",
      ] },
      { heading: "Discuss light operation without promising protection", paragraphs: [
        "For planned lighting, explain whether it should operate from a switch, a sensor or another intended control. Consider ordinary access needs and avoid aiming glare into neighbouring windows or across a shared path. The electrician needs the actual site arrangement to assess placement. A brighter lamp alone may not make steps or obstacles easier to see, and installing lighting is not a guarantee against theft or other harm.",
        "Where two dwellings share a driveway or entry, establish who can approve the work and how the supply is arranged. A fitting attached to one wall may still serve shared space. Ask which equipment is included and which control settings will be demonstrated. Do not alter a neighbour's light or shared building equipment while trying to address the problem at your own entry.",
      ] },
      { heading: "Keep camera authority and account access separate", paragraphs: [
        "CCTV work has a separate security-licensing boundary in NSW. An electrical or cabling credential does not itself establish authority to sell, install or advise on a security system. Any such request needs the relevant authority and scope confirmed before it is accepted. This page does not verify that specialist service. General power or lighting work must not be presented as a complete camera design or security assessment.",
        "If your enquiry involves an existing camera's electrical supply, describe the power symptom without sharing footage, passwords, recovery codes or account access. Confirm who owns the equipment and who is entitled to approve the work. Recording coverage, privacy, storage and remote access are separate matters from a mains circuit repair. A restored outlet does not prove that recording, alerts or a monitoring service are functioning.",
      ] },
    ],
    firstFaq: { question: "Can I ask about an entry light that no longer works in Bass Hill?", answer: "Yes, describe the location, fitting and what you have safely observed. We confirm availability and assess the electrical scope. Tell us about damage, water or a burning smell first. Do not open the light or test exposed wiring. Repairing an existing fitting and adding a controlled light elsewhere are different requests and may need different access or wiring work." },
    finalFaq: { question: "Does an outdoor electrical quote include a CCTV installation?", answer: "No. Camera installation and security advice need their own confirmed authority and agreed scope. We do not use an electrical licence as proof of security-equipment permission. Keep camera credentials and recordings out of the enquiry form. Clarify whether the request is for a mains-power fault, lighting work or a separate security service before an appointment is agreed." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/chester-hill": {
    description: "Our licensed electricians assess electrical work and hard-wired smoke-alarm enquiries in Chester Hill 2162. Describe the alarm concern, property arrangement and any immediate danger. Availability, applicable work scope and required authorisation are confirmed before attendance; a booking is not a substitute for emergency fire assistance.",
    heading: "Arrange smoke-alarm work without leaving a warning ignored",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL10898",
    sections: [
      { heading: "Check the enquiry is for the correct home or system", paragraphs: [
        "The 2021 Census counted separate houses as 73.5% and flats or apartments as 12.2% of occupied private dwellings in Chester Hill. Those figures do not identify the alarm equipment or obligations at an individual property. A smoke alarm within a home and a building's shared fire-detection system are not necessarily the same installation. Give the dwelling details and involve building management where a communal system may be affected.",
        "For planned work, provide any existing model or maintenance record you can obtain without removing the alarm. Explain whether the concern is a damaged unit, an approaching replacement date or changes to room use. Our licensed electricians confirm the relevant electrical scope; this does not automatically include a building-wide fire-system inspection, fire-safety certification or approval of every alarm location in a larger property.",
      ] },
      { heading: "Treat an alarm sounding as a warning first", paragraphs: [
        "If there is smoke, fire or immediate danger, get everyone out, stay out and call 000 from a safe place. Do not wait for an electrical quote or assume a sounding alarm is faulty. A short recurring chirp can have a different meaning from an alarm signal, but meanings vary by product. Use the manufacturer's information only when it is safe; do not disable protection to stop an unexplained warning.",
        "Once immediate danger has been excluded, describe the sound pattern and which units are involved. Record when it occurs without using smoke or flame to provoke the device. Do not open a hard-wired alarm, disconnect its wiring or replace it with an unsuitable unit. Fire and Rescue NSW advises that hard-wired alarms are installed by a licensed electrician; compatibility also matters when alarms are interconnected.",
      ] },
      { heading: "Include testing and ongoing care in the discussion", paragraphs: [
        "A replacement decision should consider the alarm type, manufacturer's life and instructions, power arrangement and any interconnection. An identical-looking mounting base is not proof that another alarm is suitable. Discuss the included units and access before work starts, particularly where ceilings are high or rooms are occupied. Keep furniture clear only where it is safe to move; do not climb to disconnect equipment in preparation.",
        "At handover, ask what was tested, how the installed alarm is normally checked and which instructions should be retained. Ongoing maintenance does not end with an installation visit. Tenants should notify the landlord or agent of an alarm problem promptly; responsibility and arrangements need the relevant property information. A receipt for one replaced alarm should not be described as assurance that every fire-safety measure in the building has been assessed.",
      ] },
    ],
    firstFaq: { question: "Can an electrician replace a hard-wired smoke alarm in Chester Hill?", answer: "We review the model, installation and confirmed work scope before arranging electrical replacement work. Tell us whether it is part of an interconnected or shared system. Do not disconnect it yourself or assume a similar-looking replacement is compatible. If an alarm is warning of smoke or fire, leave the property and call 000 rather than waiting for an appointment." },
    finalFaq: { question: "Does replacing one alarm certify the whole building's fire safety?", answer: "No. A defined electrical replacement and its testing concern the agreed equipment. Shared fire systems, building documentation and wider compliance responsibilities may need separate assessment and authority. Ask what the work record covers and retain the manufacturer's care instructions. Report any remaining alarm concern instead of treating a single new unit as a complete building assessment." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/punchbowl": {
    description: "Our licensed electricians review rental-property and household electrical faults in Punchbowl 2196. Give the symptoms, address and a contact who can arrange access and approval. We confirm availability, the repair scope and required authorisation without assuming that the person reporting a fault is responsible for its cost.",
    heading: "Report a rental electrical fault clearly and safely",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL13286",
    sections: [
      { heading: "Make the initial report useful to the right person", paragraphs: [
        "In the 2021 Census, 39.0% of occupied private dwellings in Punchbowl were recorded as rented, excluding rent-free arrangements from that category. This historical figure does not establish the tenure or responsibilities at your address. If you are renting, notify the landlord or managing agent promptly about an electrical fault. NSW guidance treats dangerous electrical faults as urgent repairs; an immediate threat to life or fire needs emergency assistance first.",
        "Describe the affected room or equipment and when the problem started. Say whether the issue is a loss of power, damage, an unusual smell or another symptom rather than naming a component you have not had assessed. Keep a record of your report and the contact instructions received. Do not remove an outlet cover or repeat a hazardous action to produce evidence for the agent.",
      ] },
      { heading: "Separate repair authority from access arrangements", paragraphs: [
        "A tenant may be able to describe the problem best while another person authorises the expenditure. Before the visit, establish the job contact, access appointment and approved investigation or repair scope. A maintenance request number can help identify the instruction without sending a full tenancy agreement or other private documents. Keep entry codes and personal records out of a general website enquiry.",
        "When several occupants use the property, make sure the person arranging attendance can explain which areas need access. Mention any known restricted meter-room arrangement through the appropriate manager. Electrical findings can establish what needs attention, but they do not decide a tenancy dispute. For questions about urgent-repair rights or reimbursement, use current NSW tenancy guidance or independent tenancy advice rather than relying on an electrician's booking confirmation.",
      ] },
      { heading: "Keep a fault repair distinct from a requested upgrade", paragraphs: [
        "Repairing a failed socket is different from adding outlets for a new furniture arrangement. Describe the safety or functional problem first and list improvements separately. Our licensed electricians can explain what inspection and testing establish and whether additional approval is needed. Do not assume an agent's instruction to investigate a fault also approves every optional change suggested during the visit.",
        "After the agreed work, ask what equipment may be used and whether anything remains isolated pending further repair. Pass the relevant findings to the authorised property contact so unfinished items are not lost between messages. If a symptom returns, report the change without repeatedly resetting protection. Keeping the job scope and outcome clear is more useful than an unsupported claim that the entire rental property has been certified by one repair.",
      ] },
    ],
    firstFaq: { question: "What should a Punchbowl tenant tell the agent about an electrical fault?", answer: "State the address, affected equipment, observed symptoms and any immediate hazard. Notify the agent or landlord promptly and keep their instructions. Do not approach damaged electrical parts to take photographs. If there is smoke, fire or immediate danger, move to safety and call 000. A factual symptom report is enough to begin arranging the appropriate assessment; you do not need to diagnose the wiring." },
    finalFaq: { question: "Does booking an electrician decide who pays for a rental repair?", answer: "No. Clarify the authorised contact and scope, and use current tenancy guidance for responsibility or reimbursement questions. The electrical assessment describes the fault and work, not the outcome of a private dispute. We do not ask you to upload a tenancy agreement to request an appointment. Necessary job details can be agreed without exposing unrelated personal information." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/roselands": {
    description: "Our licensed electricians assess cooking-appliance connections, kitchen power and electrical faults in Roselands 2196. Provide the intended appliance model and whether its position is changing. We confirm availability, installation limits and required authorisation before agreeing electrical disconnection, connection or associated circuit work.",
    heading: "Plan the electrical part of a cooking-appliance change",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL13423",
    sections: [
      { heading: "Separate appliance dimensions from electrical requirements", paragraphs: [
        "Roselands had a mix of occupied private dwellings in the 2021 Census: 60.8% separate houses and 22.0% flats or apartments. A kitchen replacement in either setting needs its own assessment. These figures say nothing about the available supply, circuit condition or permission to alter a particular kitchen. Include the property arrangement so access and any building approval can be considered before work is scheduled.",
        "An oven fitting the same opening does not establish that it has the same electrical requirements. Send the manufacturer's model and installation information for the proposed appliance, plus the existing model if known. Explain whether the job replaces like equipment, moves its position or changes the cooking arrangement. The electrician needs to assess the connection and relevant circuit, not infer suitability from the cabinet width or retail description.",
      ] },
      { heading: "Coordinate disconnection before removal or cabinetry work", paragraphs: [
        "A hard-wired appliance should not be pulled out and disconnected by an occupant or cabinet installer as an informal preparation step. Agree the electrical disconnection and safe access arrangements before removal starts. Other trades may need a different appointment or scope, particularly where gas, plumbing or ventilation is involved. An electrical booking does not include an unconfirmed gas conversion or approval of surrounding cabinetry.",
        "Where the kitchen remains in use during a renovation, identify which cooking equipment will be unavailable and discuss the work sequence. Do not improvise an adapter or extension-lead supply for a fixed appliance. Leave sufficient access for assessment and testing after installation. If hidden wiring or an unsuitable circuit changes the proposal, the additional work should be explained before proceeding, not concealed within a simple connection assumption.",
      ] },
      { heading: "Distinguish an appliance failure from a circuit fault", paragraphs: [
        "If an existing appliance stops heating, trips protection or shows damage, describe the symptom and stop using unsafe equipment. Do not remove panels or repeatedly switch it on to see whether it fails again. A fault may need appliance servicing, installation repair or both. The initial enquiry should make clear whether you want diagnosis of existing equipment or connection of a replacement already selected.",
        "On completion of agreed electrical work, ask what was tested and whether there are any remaining restrictions. Keep the appliance instructions and electrical work record together. Some features need manufacturer setup or a separate service process; energising the circuit does not confirm that every appliance function has been assessed. Our licensed electricians explain the electrical outcome without promising that a connection visit resolves unrelated product or kitchen-design issues.",
      ] },
    ],
    firstFaq: { question: "Can a new oven use the existing connection in my Roselands kitchen?", answer: "That needs assessment using the appliance requirements and the actual installation. The same cabinet opening or plug appearance is not proof of circuit suitability. Provide the model information before arranging work and do not dismantle the existing connection. We confirm whether the requested work is straightforward connection, investigation or an installation change after reviewing the relevant facts." },
    finalFaq: { question: "Does an electrical appliance quote include removal and all kitchen work?", answer: "Only the expressly agreed scope is included. Clarify disconnection, access, connection, testing and any associated circuit changes. Cabinetry, gas, plumbing, delivery and disposal are separate unless specifically confirmed. This prevents a replacement appliance arriving before the necessary preparation is arranged. Do not attempt hard-wired disconnection yourself to make the delivery or removal easier." },
  },
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/greenacre": {
    description: "Our licensed electricians assess damaged power points, additional outlets and household electrical work in Greenacre 2190. Describe the appliances and intended positions rather than just a desired socket count. We confirm circuit-assessment needs, availability and required authorisation before defining the installation or repair.",
    heading: "Make additional power points fit the way a room is used",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL11763",
    sections: [
      { heading: "Start with appliances and placement, not adapters", paragraphs: [
        "Greenacre's occupied private dwellings in the 2021 Census included 63.1% separate houses and 29.3% semi-detached, terrace or townhouse dwellings. Housing form does not reveal the circuits inside your home. If furniture or room use has changed, note where power is needed and which appliances will use it. An assessment should respond to that practical demand rather than assuming every wall can accept the same outlet arrangement.",
        "Mark proposed positions on a room plan and consider how plugs will be reached once furniture is in place. Explain any fixed appliance or high-demand equipment separately from occasional charging needs. Adding more sockets does not increase circuit capacity, and a larger powerboard does not correct an inadequate installation. Do not connect powerboards together or run cords where doors, furniture or foot traffic can damage them.",
      ] },
      { heading: "Treat damage as a repair enquiry first", paragraphs: [
        "A cracked, loose, scorched or unusually hot outlet needs assessment before it is used again. Keep clear of damaged parts and describe the condition when calling. Do not remove the faceplate, push tools into the socket or bend plug pins to make a poor connection fit. If there is sparking, smoke or a burning smell, follow the urgent safety guidance above rather than waiting for a routine upgrade quote.",
        "Tell us if you noticed the symptom with a particular appliance, without reconnecting it to demonstrate the fault. The problem may involve the outlet, appliance or circuit; a photograph does not distinguish those possibilities. Our licensed electricians inspect and test within the agreed scope before explaining the repair. Replacing the visible cover alone is not evidence that concealed wiring or the connection has been made safe.",
      ] },
      { heading: "Agree the new installation and its limits", paragraphs: [
        "For an additional outlet, wall construction, existing wiring routes and the proposed environment affect the method. A request near a sink, outdoors or in a garage may need different considerations from a bedroom point. Describe the location accurately and let the electrician assess it. Do not drill an exploratory hole or cut a cable route yourself to check whether the work will be easy.",
        "Before work starts, confirm the included outlet positions, expected interruption and any finishing work that falls outside the electrical scope. After installation, ask what was tested and how the new outlets relate to the relevant circuit. Keep future appliances as a separate planning item. A completed power-point job is not a whole-home capacity guarantee, so a later substantial appliance addition may need another assessment.",
      ] },
    ],
    firstFaq: { question: "Will adding outlets stop a circuit tripping in Greenacre?", answer: "Not by itself. Tripping needs investigation; extra outlets can leave the original problem unchanged. Describe when the interruption happens and which equipment was already in use, without trying to reproduce it. We assess the relevant circuit and explain whether repair, a different installation arrangement or other work is needed. Do not repeatedly reset a device that trips again." },
    finalFaq: { question: "Can I choose outlet positions before the electrician visits?", answer: "A preferred layout is useful, but it is not a final wiring design. Include furniture, appliances and any wet or outdoor location so suitability can be assessed. Access, existing circuits and installation requirements may limit the options. Agree the confirmed positions and scope before work; do not cut walls or assume a nearby socket makes every proposed addition straightforward." },
  },
  "/service-areas/liverpool-and-fairfield/liverpool/liverpool": {
    description: "Our licensed electricians review household and business electrical enquiries in Liverpool 2170. Identify the unit, tenancy or equipment involved and whether the premises will remain occupied. We confirm availability, access restrictions and required authorisation before agreeing fault investigation or planned electrical work.",
    heading: "Define the electrical work in occupied premises",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL12370",
    sections: [
      { heading: "Give the exact premises and its operating needs", paragraphs: [
        "Flats or apartments represented 65.0% of Liverpool's occupied private dwellings in the 2021 Census. That is residential context only: it does not describe a shop, office or the electrical condition of a mixed-use building. Specify whether your enquiry concerns a home, a commercial tenancy or shared facilities. A street address alone may not identify the equipment or person who can authorise the work.",
        "For a workplace, explain which areas are occupied and the outcome required, such as investigating failed lighting or assessing power for a changed workstation layout. Identify the site contact and any access procedure before an appointment. Avoid including customer records, staff rosters or security codes in the enquiry. The electrician needs practical access and equipment information, not confidential business data, to begin defining an appropriate scope.",
      ] },
      { heading: "Plan interruptions before work affects others", paragraphs: [
        "Tell us which equipment cannot be interrupted without preparation. Computers, payment equipment, refrigeration or controlled-entry systems may need their own shutdown arrangements. This does not mean the electrical work can be performed live or without interruption. Safe isolation and testing take priority; business continuity needs to be coordinated around the agreed work rather than promised from an initial call.",
        "A tenancy's labelled circuit or switch may not establish the complete supply boundary. Shared building equipment and landlord-controlled areas require appropriate access and authority. Do not operate unfamiliar switches to determine which neighbouring premises go dark. Our licensed electricians identify the relevant installation before work. If a planned outage extends beyond the original tenancy, that finding needs discussion with the authorised building contact before proceeding.",
      ] },
      { heading: "Keep fault repair and business changes separately scoped", paragraphs: [
        "When reporting a fault, state the observed effect on operations without assuming the failed component. A dark fitting, stopped appliance and lost network connection can have different causes. Keep unsafe equipment out of use. If there is a burning smell, sparking or another immediate hazard, follow the urgent guidance first; waiting until closing time is not an appropriate response to a dangerous electrical condition.",
        "For planned changes, separate present requirements from possible future equipment so the quote can identify what has actually been assessed. Ask what testing and documentation are included and whether further access or materials are needed. A repair to one circuit does not constitute a complete premises audit or guarantee all business equipment. We explain the electrical findings and agreed deliverables without making unsupported promises about downtime or reopening.",
      ] },
    ],
    firstFaq: { question: "What information helps with a Liverpool shop or office electrical enquiry?", answer: "Provide the tenancy address, observed issue or proposed change, access contact and any equipment requiring planned shutdown. Do not send customer information or login details. We confirm the service scope and availability, including any building-access limitation. A preferred attendance time can be discussed, but it does not remove the need for safe isolation, testing or the correct authority." },
    finalFaq: { question: "Can you guarantee electrical work without interrupting the business?", answer: "No. The installation and work determine the isolation and testing needed. Tell us the operational constraints so a realistic plan can be discussed with the authorised contact. Do not expect work on live equipment to avoid inconvenience. Shared supplies, unexpected defects and incomplete access can affect the sequence, and a quote should describe those limits rather than promise zero downtime." },
  },
  "/service-areas/liverpool-and-fairfield/fairfield/fairfield": {
    description: "Our licensed electricians assess switchboard concerns, circuit faults and planned electrical changes in Fairfield 2165. Describe the symptoms and proposed equipment without opening the board. We confirm availability, the investigation boundary and required authorisation before recommending repair, protection changes or further supply-side assessment.",
    heading: "Understand what a switchboard assessment can establish",
    censusUrl: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL11480",
    sections: [
      { heading: "Identify your installation without opening equipment", paragraphs: [
        "Fairfield's 2021 Census figures recorded 46.0% flats or apartments and 40.0% separate houses among occupied private dwellings. The housing mix does not establish the type or condition of a switchboard. In a unit, the board within the dwelling and equipment in a shared meter area may have different roles. Tell us what you can safely identify from normal use, not from opening an enclosure.",
        "A clear description of the affected rooms is useful even when labels are missing or uncertain. Do not remove a cover to read component information, touch damaged equipment or operate another dwelling's switches. If safe existing paperwork is available, it can help explain previous work, but labels and records still need verification on site. An attractive enclosure or recent label does not prove the installation has been tested for your proposed change.",
      ] },
      { heading: "Distinguish protection, capacity and the fault itself", paragraphs: [
        "A circuit breaker and a safety switch do not have identical functions, and some devices combine protection functions. The electrician identifies what is fitted and assesses the relevant circuit rather than relying on a homeowner's guess. Safety switches can reduce electric-shock risk but do not make damaged equipment safe to use. Repeated tripping is a reason to investigate, not to defeat protection or keep resetting it.",
        "For new equipment, provide its electrical requirements and describe what is already installed. Spare physical space in a board is not proof that the supply or wiring can support an additional load. Likewise, a fault does not automatically mean the whole board needs replacement. Inspection and testing should explain which limitation has been found and how the recommended work addresses it, with optional improvements distinguished from necessary repairs.",
      ] },
      { heading: "Clarify the repair boundary and completion record", paragraphs: [
        "Customer-installation work may be separate from metering or network assets. If the assessment reaches that boundary, the permitted activity, required authorisation and any distributor or metering-provider involvement must be established. Do not assume a general electrical booking includes every supply-side operation. Shared access and planned interruption may also need coordination before equipment can be worked on safely.",
        "Ask for the agreed scope to identify the affected circuits, protection or board work, and discuss what will be tested before restoration. Where electrical installation work requires compliance documentation, confirm the applicable record at handover. If an unresolved defect means a circuit must remain isolated, keep that restriction clear to other occupants. One switchboard job should not be represented as certification of every appliance or every concealed cable throughout the property.",
      ] },
    ],
    firstFaq: { question: "Does a tripping switchboard in Fairfield always need replacement?", answer: "No. The symptom may relate to equipment, wiring or protection on a particular circuit. Our licensed electricians investigate before recommending work. Explain the affected rooms and when the interruption began without repeatedly resetting a device. Heat, damage, smoke or sparking require urgent attention. A replacement proposal should follow relevant findings, not simply the appearance or age you believe the board to be." },
    finalFaq: { question: "What should I ask after switchboard work is completed?", answer: "Ask which circuits and devices were included, what testing was completed, what documentation applies and whether any equipment remains restricted. Keep the work record accessible for future electrical enquiries. Supply-side or metering tasks may have separate arrangements. Do not treat a defined repair as a guarantee that unrelated appliances or uninspected parts of the property have been assessed." },
  },
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
