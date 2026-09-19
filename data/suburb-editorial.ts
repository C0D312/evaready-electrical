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
