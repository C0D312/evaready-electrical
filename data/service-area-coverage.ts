export type CoverageSuburb = {
  name: string;
  postcode: string;
  slug: string;
};

export type CoverageArea = {
  name: string;
  slug: string;
  description: string;
  suburbs: CoverageSuburb[];
};

export type CoverageRegion = {
  name: string;
  slug: string;
  description: string;
  travelNote: string;
  areas: CoverageArea[];
};

export type CoverageSearchItem = {
  areaName: string;
  areaSlug: string;
  href: string;
  postcode: string;
  regionName: string;
  regionSlug: string;
  suburbName: string;
  suburbSlug: string;
};

export function slugifyLocation(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function suburb(name: string, postcode: string): CoverageSuburb {
  return {
    name,
    postcode,
    slug: slugifyLocation(name),
  };
}

function area(
  name: string,
  description: string,
  suburbs: CoverageSuburb[],
): CoverageArea {
  return {
    name,
    slug: slugifyLocation(name),
    description,
    suburbs,
  };
}

function region(
  name: string,
  description: string,
  travelNote: string,
  areas: CoverageArea[],
): CoverageRegion {
  return {
    name,
    slug: slugifyLocation(name),
    description,
    travelNote,
    areas,
  };
}

export const coverageRegions = [
  region(
    "Canterbury-Bankstown",
    "Core local coverage around Panania, Revesby, Padstow, Bankstown and surrounding suburbs.",
    "Priority local response area for urgent faults and everyday electrical work.",
    [
      area("Panania & East Hills", "Local electrical help for homes, townhouses, schools, strata and small businesses around the Panania corridor.", [
        suburb("Panania", "2213"),
        suburb("East Hills", "2213"),
        suburb("Picnic Point", "2213"),
        suburb("Pleasure Point", "2172"),
        suburb("Voyager Point", "2172"),
        suburb("Sandy Point", "2172"),
        suburb("Milperra", "2214"),
      ]),
      area("Revesby & Padstow", "Fast support for urgent faults, switchboards, lighting, power points and quote requests around Revesby and Padstow.", [
        suburb("Revesby", "2212"),
        suburb("Revesby Heights", "2212"),
        suburb("Padstow", "2211"),
        suburb("Padstow Heights", "2211"),
        suburb("Riverwood", "2210"),
        suburb("Narwee", "2209"),
        suburb("Peakhurst", "2210"),
        suburb("Lugarno", "2210"),
      ]),
      area("Bankstown & Yagoona", "Electrical repairs, switchboard work, safety checks and commercial maintenance around Bankstown.", [
        suburb("Bankstown", "2200"),
        suburb("Condell Park", "2200"),
        suburb("Mount Lewis", "2190"),
        suburb("Yagoona", "2199"),
        suburb("Birrong", "2143"),
        suburb("Potts Hill", "2143"),
        suburb("Greenacre", "2190"),
        suburb("Chullora", "2190"),
      ]),
      area("Chester Hill & Bass Hill", "Licensed electricians for residential, commercial and urgent electrical work around Chester Hill and Bass Hill.", [
        suburb("Chester Hill", "2162"),
        suburb("Sefton", "2162"),
        suburb("Bass Hill", "2197"),
        suburb("Georges Hall", "2198"),
        suburb("Lansdowne", "2163"),
        suburb("Villawood", "2163"),
        suburb("Carramar", "2163"),
        suburb("Fairfield East", "2165"),
      ]),
      area("Campsie & Punchbowl", "Fault finding, smoke alarms, power, lighting and switchboard services across the northern side of Canterbury-Bankstown.", [
        suburb("Punchbowl", "2196"),
        suburb("Wiley Park", "2195"),
        suburb("Lakemba", "2195"),
        suburb("Belmore", "2192"),
        suburb("Campsie", "2194"),
        suburb("Clemton Park", "2206"),
        suburb("Roselands", "2196"),
        suburb("Earlwood", "2206"),
      ]),
    ],
  ),
  region(
    "Georges River & St George",
    "Electrical service coverage across Hurstville, Kogarah, Rockdale, Bexley and the St George corridor.",
    "Regular service area for residential, commercial and urgent electrical work.",
    [
      area("Hurstville & Oatley", "Electrical repairs, installations and switchboard support around Hurstville and Oatley.", [
        suburb("Hurstville", "2220"),
        suburb("Allawah", "2218"),
        suburb("Carlton", "2218"),
        suburb("Beverly Hills", "2209"),
        suburb("Kingsgrove", "2208"),
        suburb("Penshurst", "2222"),
        suburb("Mortdale", "2223"),
        suburb("Oatley", "2223"),
      ]),
      area("Kogarah & Rockdale", "Licensed electricians for homes, units, shops and strata around Kogarah and Rockdale.", [
        suburb("Kogarah", "2217"),
        suburb("Kogarah Bay", "2217"),
        suburb("Ramsgate", "2217"),
        suburb("Beverley Park", "2217"),
        suburb("Monterey", "2217"),
        suburb("Rockdale", "2216"),
        suburb("Banksia", "2216"),
        suburb("Brighton-Le-Sands", "2216"),
      ]),
      area("Bexley & Arncliffe", "Electrical fault finding, lighting, safety switch and power point work across Bexley and Arncliffe.", [
        suburb("Bexley", "2207"),
        suburb("Bexley North", "2207"),
        suburb("Bardwell Park", "2207"),
        suburb("Bardwell Valley", "2207"),
        suburb("Arncliffe", "2205"),
        suburb("Wolli Creek", "2205"),
        suburb("Turrella", "2205"),
      ]),
    ],
  ),
  region(
    "Sutherland Shire",
    "Service coverage for Sutherland, Miranda, Cronulla, Menai, Engadine and nearby suburbs.",
    "Electrical help for Shire homes, units, shops, strata and commercial sites.",
    [
      area("Sutherland & Miranda", "Residential, commercial, emergency and Level 2 electrical support around Sutherland and Miranda.", [
        suburb("Sutherland", "2232"),
        suburb("Kirrawee", "2232"),
        suburb("Jannali", "2226"),
        suburb("Gymea", "2227"),
        suburb("Miranda", "2228"),
        suburb("Yowie Bay", "2228"),
        suburb("Caringbah", "2229"),
        suburb("Taren Point", "2229"),
      ]),
      area("Cronulla & Kurnell", "Electrical services for coastal homes, apartments, shops and scheduled works around Cronulla.", [
        suburb("Cronulla", "2230"),
        suburb("Woolooware", "2230"),
        suburb("Burraneer", "2230"),
        suburb("Caringbah South", "2229"),
        suburb("Lilli Pilli", "2229"),
        suburb("Port Hacking", "2229"),
        suburb("Kurnell", "2231"),
      ]),
      area("Menai & Engadine", "Electrical fault finding, switchboards, lighting and Level 2 style upgrade enquiries around Menai and Engadine.", [
        suburb("Menai", "2234"),
        suburb("Bangor", "2234"),
        suburb("Barden Ridge", "2234"),
        suburb("Illawong", "2234"),
        suburb("Alfords Point", "2234"),
        suburb("Engadine", "2233"),
        suburb("Heathcote", "2233"),
        suburb("Waterfall", "2233"),
      ]),
    ],
  ),
  region(
    "Liverpool & Fairfield",
    "South west coverage for Liverpool, Moorebank, Fairfield, Cabramatta, Wetherill Park and nearby suburbs.",
    "Strong coverage for urgent faults, switchboard upgrades and planned electrical work.",
    [
      area("Liverpool & Moorebank", "Electrical services for homes, businesses, strata and industrial sites around Liverpool and Moorebank.", [
        suburb("Liverpool", "2170"),
        suburb("Warwick Farm", "2170"),
        suburb("Moorebank", "2170"),
        suburb("Chipping Norton", "2170"),
        suburb("Casula", "2170"),
        suburb("Lurnea", "2170"),
        suburb("Mount Pritchard", "2170"),
        suburb("Prestons", "2170"),
      ]),
      area("Green Valley & Hoxton Park", "Fault finding, switchboards, power points, lighting and general electrical work around western Liverpool.", [
        suburb("Hoxton Park", "2171"),
        suburb("Hinchinbrook", "2168"),
        suburb("Green Valley", "2168"),
        suburb("Miller", "2168"),
        suburb("Cartwright", "2168"),
        suburb("Busby", "2168"),
        suburb("Sadleir", "2168"),
        suburb("Heckenberg", "2168"),
      ]),
      area("Fairfield & Cabramatta", "Electrical repairs, installations and safety work around Fairfield, Cabramatta and surrounding suburbs.", [
        suburb("Fairfield", "2165"),
        suburb("Fairfield Heights", "2165"),
        suburb("Fairfield West", "2165"),
        suburb("Canley Vale", "2166"),
        suburb("Canley Heights", "2166"),
        suburb("Cabramatta", "2166"),
        suburb("Cabramatta West", "2166"),
        suburb("Lansvale", "2166"),
      ]),
      area("Smithfield & Wetherill Park", "Electrical service coverage for homes, workshops, warehouses and commercial jobs around Smithfield.", [
        suburb("Smithfield", "2164"),
        suburb("Wetherill Park", "2164"),
        suburb("Prairiewood", "2176"),
        suburb("St Johns Park", "2176"),
        suburb("Bonnyrigg", "2177"),
        suburb("Bossley Park", "2176"),
        suburb("Edensor Park", "2176"),
        suburb("Abbotsbury", "2176"),
      ]),
    ],
  ),
  region(
    "Macarthur & Wollondilly",
    "Electrical coverage for Campbelltown, Camden, Oran Park and selected Wollondilly suburbs.",
    "Electrical service availability depends on urgency, access, job type and scheduling.",
    [
      area("Campbelltown", "Electrical fault finding, switchboards, safety switches and general electrical services across Campbelltown.", [
        suburb("Campbelltown", "2560"),
        suburb("Bradbury", "2560"),
        suburb("Airds", "2560"),
        suburb("Ambarvale", "2560"),
        suburb("Rosemeadow", "2560"),
        suburb("St Helens Park", "2560"),
        suburb("Leumeah", "2560"),
        suburb("Woodbine", "2560"),
      ]),
      area("Ingleburn & Minto", "Electrical repairs, upgrades and quote requests around Ingleburn, Minto and nearby suburbs.", [
        suburb("Ingleburn", "2565"),
        suburb("Minto", "2566"),
        suburb("St Andrews", "2566"),
        suburb("Raby", "2566"),
        suburb("Eagle Vale", "2558"),
        suburb("Eschol Park", "2558"),
        suburb("Kearns", "2558"),
        suburb("Claymore", "2559"),
      ]),
      area("Camden & Oran Park", "Switchboard upgrades, renovation wiring, lighting and power services around Camden and Oran Park.", [
        suburb("Camden", "2570"),
        suburb("Narellan", "2567"),
        suburb("Narellan Vale", "2567"),
        suburb("Harrington Park", "2567"),
        suburb("Mount Annan", "2567"),
        suburb("Oran Park", "2570"),
        suburb("Gregory Hills", "2557"),
        suburb("Gledswood Hills", "2557"),
      ]),
      area("Wollondilly Edge", "Selected scheduled electrical work for outer south west properties and larger jobs.", [
        suburb("Picton", "2571"),
        suburb("Tahmoor", "2573"),
        suburb("Bargo", "2574"),
        suburb("Wilton", "2571"),
        suburb("Appin", "2560"),
        suburb("The Oaks", "2570"),
        suburb("Silverdale", "2752"),
        suburb("Warragamba", "2752"),
      ]),
    ],
  ),
  region(
    "Inner West & Bayside",
    "Electrical services for Inner West terraces, apartments, shops, commercial spaces and Bayside properties.",
    "Electrical help for older homes, apartments, shops, strata and commercial properties.",
    [
      area("Inner West", "Electrical support for older homes, renovations, strata, shops and urgent faults in the Inner West.", [
        suburb("Newtown", "2042"),
        suburb("Enmore", "2042"),
        suburb("Stanmore", "2048"),
        suburb("Petersham", "2049"),
        suburb("Lewisham", "2049"),
        suburb("Marrickville", "2204"),
        suburb("Dulwich Hill", "2203"),
        suburb("Summer Hill", "2130"),
      ]),
      area("Leichhardt & Ashfield", "Lighting, power, switchboard and renovation electrical work around Leichhardt and Ashfield.", [
        suburb("Leichhardt", "2040"),
        suburb("Lilyfield", "2040"),
        suburb("Annandale", "2038"),
        suburb("Haberfield", "2045"),
        suburb("Ashfield", "2131"),
        suburb("Croydon", "2132"),
        suburb("Five Dock", "2046"),
        suburb("Drummoyne", "2047"),
      ]),
      area("Bayside & Airport", "Electrical maintenance, fault finding and scheduled service work around Bayside and the airport corridor.", [
        suburb("Mascot", "2020"),
        suburb("Botany", "2019"),
        suburb("Banksmeadow", "2019"),
        suburb("Eastgardens", "2036"),
        suburb("Pagewood", "2035"),
        suburb("Daceyville", "2032"),
        suburb("Kingsford", "2032"),
        suburb("Kensington", "2033"),
      ]),
    ],
  ),
  region(
    "Sydney City & Eastern Suburbs",
    "City, apartment, commercial, strata and coastal electrical service coverage.",
    "City and eastern suburbs jobs are accepted based on urgency, parking access and scheduling.",
    [
      area("Sydney City", "Commercial, apartment, strata and scheduled electrical services around the Sydney CBD.", [
        suburb("Sydney CBD", "2000"),
        suburb("Haymarket", "2000"),
        suburb("The Rocks", "2000"),
        suburb("Barangaroo", "2000"),
        suburb("Pyrmont", "2009"),
        suburb("Ultimo", "2007"),
        suburb("Glebe", "2037"),
        suburb("Forest Lodge", "2037"),
      ]),
      area("City Fringe", "Electrical services around Surry Hills, Darlinghurst, Redfern, Waterloo and Alexandria.", [
        suburb("Surry Hills", "2010"),
        suburb("Darlinghurst", "2010"),
        suburb("Paddington", "2021"),
        suburb("Woolloomooloo", "2011"),
        suburb("Potts Point", "2011"),
        suburb("Elizabeth Bay", "2011"),
        suburb("Redfern", "2016"),
        suburb("Waterloo", "2017"),
        suburb("Alexandria", "2015"),
        suburb("Zetland", "2017"),
      ]),
      area("Eastern Beaches", "Electrical services, smoke alarms, lighting and fault work around the eastern beaches.", [
        suburb("Randwick", "2031"),
        suburb("Coogee", "2034"),
        suburb("Clovelly", "2031"),
        suburb("Maroubra", "2035"),
        suburb("Malabar", "2036"),
        suburb("Matraville", "2036"),
        suburb("Little Bay", "2036"),
        suburb("La Perouse", "2036"),
      ]),
      area("Waverley & Woollahra", "Electrical services for homes, units, businesses and strata across Waverley and Woollahra.", [
        suburb("Bondi", "2026"),
        suburb("Bondi Junction", "2022"),
        suburb("Waverley", "2024"),
        suburb("Bronte", "2024"),
        suburb("Tamarama", "2026"),
        suburb("Rose Bay", "2029"),
        suburb("Double Bay", "2028"),
        suburb("Vaucluse", "2030"),
        suburb("Watsons Bay", "2030"),
      ]),
    ],
  ),
  region(
    "Parramatta & Cumberland",
    "Coverage for Parramatta, Cumberland, Auburn, Lidcombe and nearby western Sydney suburbs.",
    "Electrical support for homes, businesses, strata, switchboards and urgent faults.",
    [
      area("Parramatta", "Electrical repairs, commercial maintenance, switchboards and general service calls around Parramatta.", [
        suburb("Parramatta", "2150"),
        suburb("North Parramatta", "2151"),
        suburb("Westmead", "2145"),
        suburb("Northmead", "2152"),
        suburb("Harris Park", "2150"),
        suburb("Rosehill", "2142"),
        suburb("Rydalmere", "2116"),
        suburb("Ermington", "2115"),
      ]),
      area("Cumberland", "Residential and commercial electrical work around Merrylands, Guildford and Greystanes.", [
        suburb("Merrylands", "2160"),
        suburb("Guildford", "2161"),
        suburb("South Granville", "2142"),
        suburb("Granville", "2142"),
        suburb("Holroyd", "2142"),
        suburb("Greystanes", "2145"),
        suburb("Pemulwuy", "2145"),
        suburb("Wentworthville", "2145"),
      ]),
      area("Auburn & Lidcombe", "Electrical service coverage for Auburn, Lidcombe, Berala, Newington and surrounding suburbs.", [
        suburb("Auburn", "2144"),
        suburb("Lidcombe", "2141"),
        suburb("Berala", "2141"),
        suburb("Regents Park", "2143"),
        suburb("Rookwood", "2141"),
        suburb("Homebush West", "2140"),
        suburb("Silverwater", "2128"),
        suburb("Newington", "2127"),
      ]),
    ],
  ),
  region(
    "Western Sydney & Nepean",
    "Selected electrical coverage for Blacktown, Mount Druitt, Penrith, St Marys and the south Hawkesbury edge.",
    "Service availability depends on job type, access and current schedule.",
    [
      area("Blacktown", "Electrical service calls, switchboard upgrades and maintenance around Blacktown and Seven Hills.", [
        suburb("Blacktown", "2148"),
        suburb("Seven Hills", "2147"),
        suburb("Lalor Park", "2147"),
        suburb("Kings Langley", "2147"),
        suburb("Prospect", "2148"),
        suburb("Arndell Park", "2148"),
        suburb("Doonside", "2767"),
        suburb("Woodcroft", "2767"),
      ]),
      area("Mount Druitt & Rooty Hill", "Electrical work, urgent faults and general service coverage around Mount Druitt.", [
        suburb("Mount Druitt", "2770"),
        suburb("Rooty Hill", "2766"),
        suburb("Minchinbury", "2770"),
        suburb("Eastern Creek", "2766"),
        suburb("Plumpton", "2761"),
        suburb("Oakhurst", "2761"),
        suburb("Glendenning", "2761"),
        suburb("Hassall Grove", "2761"),
      ]),
      area("Penrith & St Marys", "Selected scheduled electrical jobs, switchboard work and fault finding around Penrith and St Marys.", [
        suburb("Penrith", "2750"),
        suburb("Kingswood", "2747"),
        suburb("Jamisontown", "2750"),
        suburb("South Penrith", "2750"),
        suburb("Emu Plains", "2750"),
        suburb("Glenmore Park", "2745"),
        suburb("St Marys", "2760"),
        suburb("Colyton", "2760"),
      ]),
      area("Hawkesbury South", "Outer-edge coverage for scheduled jobs and larger electrical work around Richmond and Windsor.", [
        suburb("Richmond", "2753"),
        suburb("Windsor", "2756"),
        suburb("South Windsor", "2756"),
        suburb("Bligh Park", "2756"),
        suburb("Clarendon", "2756"),
        suburb("Londonderry", "2753"),
        suburb("Agnes Banks", "2753"),
      ]),
    ],
  ),
  region(
    "Hills District & North West",
    "Coverage for Castle Hill, Baulkham Hills, Kellyville, Rouse Hill, Dural and nearby suburbs.",
    "Electrical service availability depends on job type, urgency and scheduling.",
    [
      area("Castle Hill & Baulkham Hills", "Electrical services for homes, strata, renovations and businesses around Castle Hill.", [
        suburb("Castle Hill", "2154"),
        suburb("Baulkham Hills", "2153"),
        suburb("Bella Vista", "2153"),
        suburb("Norwest", "2153"),
        suburb("Winston Hills", "2153"),
        suburb("North Rocks", "2151"),
        suburb("West Pennant Hills", "2125"),
        suburb("Cherrybrook", "2126"),
      ]),
      area("Kellyville & Rouse Hill", "Electrical work, switchboard upgrades and service calls around Kellyville and Rouse Hill.", [
        suburb("Kellyville", "2155"),
        suburb("Kellyville Ridge", "2155"),
        suburb("Beaumont Hills", "2155"),
        suburb("Rouse Hill", "2155"),
        suburb("The Ponds", "2769"),
        suburb("Stanhope Gardens", "2768"),
        suburb("Glenwood", "2768"),
        suburb("Parklea", "2768"),
      ]),
      area("Dural & Galston", "Selected scheduled electrical services for acreage properties, homes and businesses around Dural and Galston.", [
        suburb("Dural", "2158"),
        suburb("Glenhaven", "2156"),
        suburb("Kenthurst", "2156"),
        suburb("Galston", "2159"),
        suburb("Arcadia", "2159"),
        suburb("Glenorie", "2157"),
        suburb("Annangrove", "2156"),
        suburb("Middle Dural", "2158"),
      ]),
    ],
  ),
  region(
    "Northern Sydney & Ryde",
    "Electrical coverage for Ryde, Epping, Macquarie Park, the Lower North Shore and Upper North Shore.",
    "Electrical help for homes, apartments, strata, commercial sites and larger works.",
    [
      area("Ryde & Hunters Hill", "Electrical services for homes, units, commercial properties and strata around Ryde.", [
        suburb("Ryde", "2112"),
        suburb("West Ryde", "2114"),
        suburb("North Ryde", "2113"),
        suburb("East Ryde", "2113"),
        suburb("Putney", "2112"),
        suburb("Meadowbank", "2114"),
        suburb("Gladesville", "2111"),
        suburb("Hunters Hill", "2110"),
      ]),
      area("Macquarie & Epping", "Fault finding, switchboards, lighting and power services around Macquarie Park and Epping.", [
        suburb("Macquarie Park", "2113"),
        suburb("Marsfield", "2122"),
        suburb("Eastwood", "2122"),
        suburb("Epping", "2121"),
        suburb("Beecroft", "2119"),
        suburb("Carlingford", "2118"),
        suburb("Denistone", "2114"),
        suburb("Cheltenham", "2119"),
      ]),
      area("Lower North Shore", "Scheduled electrical service work for apartments, businesses, homes and strata on the Lower North Shore.", [
        suburb("North Sydney", "2060"),
        suburb("Crows Nest", "2065"),
        suburb("St Leonards", "2065"),
        suburb("Artarmon", "2064"),
        suburb("Lane Cove", "2066"),
        suburb("Greenwich", "2065"),
        suburb("Wollstonecraft", "2065"),
        suburb("Waverton", "2060"),
        suburb("Mosman", "2088"),
        suburb("Neutral Bay", "2089"),
        suburb("Cremorne", "2090"),
      ]),
      area("Upper North Shore", "Selected scheduled electrical work and larger jobs across the Upper North Shore.", [
        suburb("Chatswood", "2067"),
        suburb("Roseville", "2069"),
        suburb("Lindfield", "2070"),
        suburb("Killara", "2071"),
        suburb("Gordon", "2072"),
        suburb("Pymble", "2073"),
        suburb("Turramurra", "2074"),
        suburb("Wahroonga", "2076"),
        suburb("Hornsby", "2077"),
      ]),
    ],
  ),
  region(
    "Northern Beaches",
    "Selected service coverage for Manly, Warringah and Pittwater suburbs.",
    "Service availability depends on job type, urgency, access and scheduling.",
    [
      area("Manly", "Scheduled electrical services for homes, apartments, shops and coastal properties around Manly.", [
        suburb("Manly", "2095"),
        suburb("Fairlight", "2094"),
        suburb("Balgowlah", "2093"),
        suburb("Seaforth", "2092"),
        suburb("Clontarf", "2093"),
        suburb("Manly Vale", "2093"),
        suburb("Freshwater", "2096"),
        suburb("Queenscliff", "2096"),
      ]),
      area("Warringah", "Electrical service coverage for Brookvale, Dee Why, Curl Curl and surrounding suburbs.", [
        suburb("Brookvale", "2100"),
        suburb("Dee Why", "2099"),
        suburb("Curl Curl", "2096"),
        suburb("North Curl Curl", "2099"),
        suburb("Narraweena", "2099"),
        suburb("Cromer", "2099"),
        suburb("Beacon Hill", "2100"),
        suburb("Allambie Heights", "2100"),
      ]),
      area("Pittwater", "Selected scheduled electrical jobs and larger works around Pittwater.", [
        suburb("Narrabeen", "2101"),
        suburb("Warriewood", "2102"),
        suburb("Mona Vale", "2103"),
        suburb("Newport", "2106"),
        suburb("Avalon Beach", "2107"),
        suburb("Bilgola", "2107"),
        suburb("Clareville", "2107"),
        suburb("Palm Beach", "2108"),
      ]),
    ],
  ),
  region(
    "Blue Mountains",
    "Selected scheduled electrical coverage for Lower and Mid Blue Mountains suburbs.",
    "Blue Mountains work may suit larger jobs or scheduled service days.",
    [
      area("Lower Blue Mountains", "Scheduled electrical services, fault finding and upgrade work for Lower Blue Mountains suburbs.", [
        suburb("Glenbrook", "2773"),
        suburb("Blaxland", "2774"),
        suburb("Warrimoo", "2774"),
        suburb("Valley Heights", "2777"),
        suburb("Springwood", "2777"),
        suburb("Winmalee", "2777"),
        suburb("Faulconbridge", "2776"),
      ]),
      area("Mid Blue Mountains", "Selected scheduled electrical work and larger jobs around the Mid Mountains.", [
        suburb("Hazelbrook", "2779"),
        suburb("Woodford", "2778"),
        suburb("Lawson", "2783"),
        suburb("Bullaburra", "2784"),
        suburb("Wentworth Falls", "2782"),
        suburb("Leura", "2780"),
        suburb("Katoomba", "2780"),
      ]),
    ],
  ),
  region(
    "Illawarra",
    "Selected electrical coverage for Helensburgh, Wollongong, Dapto and Shellharbour corridor suburbs.",
    "Service availability depends on job type, urgency, access and scheduling.",
    [
      area("Northern Illawarra", "Scheduled electrical services for northern Illawarra homes and businesses.", [
        suburb("Helensburgh", "2508"),
        suburb("Stanwell Park", "2508"),
        suburb("Coalcliff", "2508"),
        suburb("Scarborough", "2515"),
        suburb("Wombarra", "2515"),
        suburb("Coledale", "2515"),
        suburb("Austinmer", "2515"),
        suburb("Thirroul", "2515"),
      ]),
      area("Wollongong", "Electrical service coverage for Wollongong, Corrimal, Figtree and surrounding suburbs.", [
        suburb("Wollongong", "2500"),
        suburb("North Wollongong", "2500"),
        suburb("Fairy Meadow", "2519"),
        suburb("Corrimal", "2518"),
        suburb("Figtree", "2525"),
        suburb("Unanderra", "2526"),
        suburb("Berkeley", "2506"),
        suburb("Port Kembla", "2505"),
      ]),
      area("Dapto & Shellharbour", "Selected scheduled electrical work for Dapto, Albion Park and Shellharbour.", [
        suburb("Dapto", "2530"),
        suburb("Albion Park", "2527"),
        suburb("Albion Park Rail", "2527"),
        suburb("Shellharbour", "2529"),
        suburb("Warilla", "2528"),
        suburb("Oak Flats", "2529"),
      ]),
    ],
  ),
  region(
    "Central Coast South",
    "Selected electrical coverage for southern Central Coast suburbs.",
    "Service availability depends on job type, urgency, access and scheduling.",
    [
      area("Hawkesbury River & Gosford", "Scheduled electrical work for southern Central Coast and Hawkesbury River suburbs.", [
        suburb("Brooklyn", "2083"),
        suburb("Mooney Mooney", "2083"),
        suburb("Woy Woy", "2256"),
        suburb("Umina Beach", "2257"),
        suburb("Ettalong Beach", "2257"),
        suburb("Kariong", "2250"),
        suburb("Gosford", "2250"),
        suburb("Point Clare", "2250"),
        suburb("West Gosford", "2250"),
      ]),
      area("Erina & Terrigal", "Selected scheduled electrical service for southern and central coast suburbs around Erina and Terrigal.", [
        suburb("Erina", "2250"),
        suburb("Terrigal", "2260"),
        suburb("Wamberal", "2260"),
        suburb("Avoca Beach", "2251"),
        suburb("Kincumber", "2251"),
        suburb("Saratoga", "2251"),
        suburb("Green Point", "2251"),
      ]),
    ],
  ),
] satisfies CoverageRegion[];

export const coverageSearchItems: CoverageSearchItem[] =
  coverageRegions.flatMap((coverageRegion) =>
    coverageRegion.areas.flatMap((coverageArea) =>
      coverageArea.suburbs.map((coverageSuburb) => ({
        areaName: coverageArea.name,
        areaSlug: coverageArea.slug,
        href: `/service-areas/${coverageRegion.slug}/${coverageArea.slug}/${coverageSuburb.slug}`,
        postcode: coverageSuburb.postcode,
        regionName: coverageRegion.name,
        regionSlug: coverageRegion.slug,
        suburbName: coverageSuburb.name,
        suburbSlug: coverageSuburb.slug,
      })),
    ),
  );

export const coverageStats = {
  areaCount: coverageRegions.reduce(
    (total, coverageRegion) => total + coverageRegion.areas.length,
    0,
  ),
  regionCount: coverageRegions.length,
  suburbCount: coverageSearchItems.length,
};

export type SuburbServiceIntent =
  | "emergency"
  | "general"
  | "level2"
  | "switchboard";

export type SuburbPageCopy = {
  ctaHeading: string;
  faqAnswers: {
    emergency: string;
    level2: string;
    quote: string;
  };
  faqIntro: string;
  faqHeading: string;
  heroDescription: string;
  heroNote: string;
  metaDescription: string;
  processDescription: string;
  processHeading: string;
  processLabel: string;
  processSteps: {
    text: string;
    title: string;
  }[];
  serviceIntro: string;
  servicesHeading: string;
  serviceLinks: {
    href: string;
    text: string;
    title: string;
  }[];
  serviceSummaries: {
    intent: SuburbServiceIntent;
    text: string;
    title: string;
  }[];
  trustItems: string[];
};

type LocalPageContext = {
  accessDetail: string;
  commonJobs: string;
  emergencySignals: string;
  level2Detail: string;
  plannedWork: string;
  propertyMix: string;
  setting: string;
  switchboardDetail: string;
};

function stableHash(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function pick<T>(items: T[], seed: number, offset = 0) {
  const mixedSeed = (seed ^ Math.imul(offset + 1, 0x9e3779b1)) >>> 0;

  return items[mixedSeed % items.length];
}

function getLocalPageContext(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): LocalPageContext {
  const key = `${coverageRegion.name} ${coverageArea.name} ${coverageArea.description} ${coverageSuburb.name}`.toLowerCase();

  if (
    key.includes("coastal") ||
    key.includes("beach") ||
    key.includes("bondi") ||
    key.includes("bronte") ||
    key.includes("cronulla") ||
    key.includes("kurnell") ||
    key.includes("coogee") ||
    key.includes("clovelly") ||
    key.includes("maroubra") ||
    key.includes("manly") ||
    key.includes("dee why") ||
    key.includes("curl curl") ||
    key.includes("narrabeen") ||
    key.includes("mona vale") ||
    key.includes("newport") ||
    key.includes("avalon") ||
    key.includes("palm beach") ||
    key.includes("bayside") ||
    key.includes("illawarra") ||
    key.includes("woy woy") ||
    key.includes("umina") ||
    key.includes("ettalong") ||
    key.includes("terrigal") ||
    key.includes("avoca")
  ) {
    return {
      accessDetail:
        "photos of outdoor fittings, switchboards, weather exposure and parking access",
      commonJobs:
        "outdoor lighting, safety switch faults, corrosion checks, smoke alarms and power repairs",
      emergencySignals:
        "storm-related faults, water-affected fittings, tripping safety switches and unsafe outdoor power",
      level2Detail:
        "consumer mains, overhead service points and supply-side upgrade enquiries",
      plannedWork:
        "weather-rated lighting, outdoor power, switchboard upgrades and appliance circuits",
      propertyMix:
        "coastal homes, apartments, strata properties, shops and renovated houses",
      setting: "coastal and weather-exposed service area",
      switchboardDetail:
        "weather exposure, older enclosures, nuisance tripping and safety switch protection",
    };
  }

  if (
    key.includes("sydney city") ||
    key.includes("city fringe") ||
    key.includes("cbd") ||
    key.includes("airport") ||
    key.includes("haymarket") ||
    key.includes("the rocks") ||
    key.includes("barangaroo") ||
    key.includes("pyrmont") ||
    key.includes("ultimo") ||
    key.includes("surry hills") ||
    key.includes("darlinghurst") ||
    key.includes("potts point") ||
    key.includes("redfern") ||
    key.includes("waterloo") ||
    key.includes("alexandria") ||
    key.includes("zetland") ||
    key.includes("macquarie") ||
    key.includes("parramatta") ||
    key.includes("north sydney") ||
    key.includes("st leonards") ||
    key.includes("chatswood")
  ) {
    return {
      accessDetail:
        "access notes, strata requirements, loading zones or parking details",
      commonJobs:
        "fault finding, office power, lighting repairs, switchboard work and commercial maintenance",
      emergencySignals:
        "partial power loss, tripping circuits, hot outlets, burning smells and after-hours business faults",
      level2Detail:
        "consumer mains, metering, service equipment and defect notice enquiries",
      plannedWork:
        "office fit-outs, tenancy changes, lighting upgrades and programmed maintenance",
      propertyMix:
        "apartments, strata buildings, shopfronts, offices and busy commercial sites",
      setting: "high-access commercial and strata area",
      switchboardDetail:
        "older boards, tenancy loads, safety switch upgrades and space for future circuits",
    };
  }

  if (
    key.includes("warehouse") ||
    key.includes("industrial") ||
    key.includes("wetherill") ||
    key.includes("smithfield") ||
    key.includes("moorebank") ||
    key.includes("airport")
  ) {
    return {
      accessDetail:
        "site access, machinery areas, operating hours and photos of the affected board or circuit",
      commonJobs:
        "three-phase enquiries, fault finding, lighting, switchboards and maintenance work",
      emergencySignals:
        "loss of power to equipment, tripping circuits, hot isolators and damaged outlets",
      level2Detail:
        "consumer mains, supply capacity, metering and service equipment questions",
      plannedWork:
        "warehouse lighting, dedicated circuits, fit-out changes and maintenance scheduling",
      propertyMix:
        "homes, workshops, warehouses, factories and commercial units",
      setting: "mixed residential, workshop and industrial area",
      switchboardDetail:
        "load changes, ageing breakers, safety switches and circuit identification",
    };
  }

  if (
    key.includes("hills district") ||
    key.includes("castle hill") ||
    key.includes("baulkham hills") ||
    key.includes("kellyville") ||
    key.includes("rouse hill") ||
    key.includes("dural") ||
    key.includes("galston") ||
    key.includes("camden") ||
    key.includes("wollondilly") ||
    key.includes("blue mountains") ||
    key.includes("hawkesbury")
  ) {
    return {
      accessDetail:
        "gate access, driveway details, photos of the switchboard and any outbuilding power points",
      commonJobs:
        "switchboard upgrades, fault finding, shed power, lighting and larger planned electrical work",
      emergencySignals:
        "loss of power, storm damage, tripping safety switches and unsafe outdoor circuits",
      level2Detail:
        "consumer mains, point of attachment, private pole and supply upgrade enquiries",
      plannedWork:
        "renovation wiring, extra circuits, outdoor lighting and upgrade planning",
      propertyMix:
        "family homes, larger blocks, newer estates, acreage properties and small businesses",
      setting: "larger-property and growth-corridor service area",
      switchboardDetail:
        "capacity for added loads, older fuses, safety switch protection and future circuits",
    };
  }

  if (
    key.includes("inner west") ||
    key.includes("older homes") ||
    key.includes("renovation") ||
    key.includes("strata") ||
    key.includes("bankstown") ||
    key.includes("st george")
  ) {
    return {
      accessDetail:
        "street access, unit details, switchboard photos and any strata contact notes",
      commonJobs:
        "fault finding, lighting repairs, power points, smoke alarms and switchboard upgrades",
      emergencySignals:
        "tripping safety switches, hot power points, flickering lights and burning smells",
      level2Detail:
        "consumer mains, metering, service equipment and defect notice discussions",
      plannedWork:
        "renovations, extra outlets, lighting changes and safety switch upgrades",
      propertyMix:
        "older homes, duplexes, villas, units, strata blocks and main-street businesses",
      setting: "established residential and strata service area",
      switchboardDetail:
        "ceramic fuses, crowded boards, older wiring and safety switch upgrades",
    };
  }

  return {
    accessDetail:
      "photos of the issue, the switchboard location and any access instructions",
    commonJobs:
      "fault finding, lighting, power points, smoke alarms, switchboards and general repairs",
    emergencySignals:
      "power loss, burning smells, tripping circuits, sparking and unsafe outlets",
    level2Detail:
      "consumer mains, service equipment, supply upgrades and defect notice enquiries",
    plannedWork:
      "lighting upgrades, extra outlets, appliance circuits and scheduled maintenance",
    propertyMix:
      "homes, townhouses, units, strata properties, shops and small commercial sites",
    setting: "residential and light-commercial service area",
    switchboardDetail:
      "safety switches, RCBOs, old fuses, labelling and capacity for added circuits",
  };
}

export function getSuburbPageCopy(
  coverageRegion: CoverageRegion,
  coverageArea: CoverageArea,
  coverageSuburb: CoverageSuburb,
): SuburbPageCopy {
  const seed = stableHash(
    `${coverageRegion.slug}:${coverageArea.slug}:${coverageSuburb.slug}:${coverageSuburb.postcode}`,
  );
  const context = getLocalPageContext(
    coverageRegion,
    coverageArea,
    coverageSuburb,
  );
  const suburbLabel = `${coverageSuburb.name} ${coverageSuburb.postcode}`;
  const areaLabel = coverageArea.name;
  const regionLabel = coverageRegion.name;
  const suburbPosition = Math.max(
    coverageArea.suburbs.findIndex(
      (suburbItem) => suburbItem.slug === coverageSuburb.slug,
    ),
    0,
  );

  const heroDescription = pick(
    [
      `Evaready Electrical helps ${suburbLabel} customers with ${context.commonJobs}. The work is suited to ${context.propertyMix}, with clear quote requests for planned jobs and direct phone support for urgent electrical hazards.`,
      `For ${suburbLabel}, Evaready Electrical focuses on practical electrical service for ${context.propertyMix}. Common requests include ${context.commonJobs}, plus Level 2 electrical enquiries where the supply side of the installation needs attention.`,
      `Electrical work in ${suburbLabel} can range from urgent faults to planned upgrades. Evaready Electrical supports local ${context.propertyMix} with ${context.commonJobs}, and keeps the next step simple: call for hazards or request a quote for scheduled work.`,
      `Evaready Electrical services ${suburbLabel} with electrical fault support, repairs and upgrade work shaped around ${context.propertyMix}. The page covers ${context.commonJobs}, along with switchboard and Level 2 enquiries across ${areaLabel}.`,
    ],
    seed,
    suburbPosition + 5,
  );

  const heroNote = pick(
    [
      `${coverageArea.description} This ${context.setting} often needs clear job details, photos and safe fault testing before work begins.`,
      `${coverageSuburb.name} sits within the ${areaLabel} service page for ${regionLabel}. Quote requests are easier to assess when they include ${context.accessDetail}.`,
      `${coverageRegion.travelNote} For ${coverageSuburb.name}, the best first step depends on the issue: call for unsafe faults, or send photos and details for planned work.`,
      `${coverageArea.description} Typical enquiries in this pocket include ${context.plannedWork}, along with urgent fault checks when something feels unsafe.`,
    ],
    seed,
    suburbPosition + 13,
  );

  const processSteps = pick(
    [
      [
        {
          title: "Check the issue",
          text: `The job type, address, access and urgency are confirmed for ${coverageSuburb.name} before the next step is agreed.`,
        },
        {
          title: "Review the evidence",
          text: `Photos, symptoms and switchboard details help narrow down ${context.emergencySignals}.`,
        },
        {
          title: "Test before repair",
          text: "Electrical faults are tested properly before parts, upgrades or repair options are recommended.",
        },
        {
          title: "Leave clear notes",
          text: `For ${areaLabel} jobs, follow-up notes can include photos, defect details or upgrade recommendations where needed.`,
        },
      ],
      [
        {
          title: "Triage the risk",
          text: `Unsafe issues in ${coverageSuburb.name} are handled as call-first enquiries, especially where there is heat, smoke or sparking.`,
        },
        {
          title: "Confirm the site",
          text: `Address, access and ${context.accessDetail} help make the visit more efficient.`,
        },
        {
          title: "Find the fault",
          text: `Testing focuses on the circuit, appliance, fitting or switchboard area causing the problem.`,
        },
        {
          title: "Plan the fix",
          text: `Repairs and upgrades are explained clearly, whether it is a small fault or larger ${context.switchboardDetail}.`,
        },
      ],
      [
        {
          title: "Start with details",
          text: `For ${coverageSuburb.name}, a strong quote request includes the postcode, photos and a short description of the electrical issue.`,
        },
        {
          title: "Match the service",
          text: `The enquiry is matched to emergency, general electrical, switchboard or Level 2 style work.`,
        },
        {
          title: "Work safely",
          text: "Testing and isolation come before repairs so the actual cause is understood.",
        },
        {
          title: "Document next steps",
          text: `Where useful, you get practical next steps for ${context.plannedWork} or future electrical upgrades.`,
        },
      ],
    ],
    seed,
    suburbPosition + 17,
  );

  const serviceSummaries = [
    {
      intent: "emergency" as const,
      title: pick(
        [
          "Emergency fault calls",
          "Urgent electrical faults",
          "Call-first electrical hazards",
        ],
        seed,
        11,
      ),
      text: pick(
        [
          `For ${coverageSuburb.name}, call first if you notice ${context.emergencySignals}. Unsafe electrical symptoms should not wait behind a quote form.`,
          `Emergency enquiries in ${suburbLabel} often involve ${context.emergencySignals}. The safest move is to stop using the affected circuit and call directly.`,
          `When ${coverageSuburb.name} homes or businesses have ${context.emergencySignals}, the priority is to make the situation safe before planning repairs.`,
        ],
        seed,
        13,
      ),
    },
    {
      intent: "switchboard" as const,
      title: pick(
        [
          "Switchboard upgrades",
          "Safety switch work",
          "Board faults and upgrades",
        ],
        seed,
        17,
      ),
      text: pick(
        [
          `Switchboard requests around ${coverageSuburb.name} can involve ${context.switchboardDetail}, especially during renovations or added appliance loads.`,
          `${areaLabel} switchboard work often needs a careful look at ${context.switchboardDetail} before the right upgrade path is chosen.`,
          `For ${suburbLabel}, switchboard enquiries commonly cover ${context.switchboardDetail} and nuisance tripping that needs proper testing.`,
        ],
        seed,
        19,
      ),
    },
    {
      intent: "level2" as const,
      title: pick(
        [
          "Level 2 enquiries",
          "Supply-side electrical work",
          "Consumer mains support",
        ],
        seed,
        23,
      ),
      text: pick(
        [
          `Level 2 style enquiries in ${coverageSuburb.name} may involve ${context.level2Detail}. Photos of the meter board, point of attachment or notice help clarify the scope.`,
          `For ${coverageSuburb.name} properties, ${context.level2Detail} should be assessed with clear photos and any paperwork from the network or retailer.`,
          `${regionLabel} Level 2 enquiries can include ${context.level2Detail}, particularly where a switchboard or supply upgrade is being planned.`,
        ],
        seed,
        29,
      ),
    },
    {
      intent: "general" as const,
      title: pick(
        [
          "Planned electrical work",
          "General electrical repairs",
          "Lighting, power and maintenance",
        ],
        seed,
        31,
      ),
      text: pick(
        [
          `Planned jobs in ${coverageSuburb.name} can cover ${context.plannedWork}. Send photos and a clear description so the quote request is easy to assess.`,
          `For everyday electrical work in ${suburbLabel}, common requests include ${context.plannedWork} and small repairs around ${context.propertyMix}.`,
          `${coverageSuburb.name} quote requests are well suited to ${context.plannedWork}, especially when photos and access details are included upfront.`,
        ],
        seed,
        37,
      ),
    },
  ];

  return {
    ctaHeading: pick(
      [
        `Need electrical help in ${coverageSuburb.name}? Call or request a quote.`,
        `Planning electrical work in ${coverageSuburb.name}? Send the details through.`,
        `For ${suburbLabel} electrical faults or upgrades, start here.`,
      ],
      seed,
      41,
    ),
    faqAnswers: {
      emergency: `Yes. For ${coverageSuburb.name} emergency electrical faults such as ${context.emergencySignals}, call Evaready Electrical directly so the issue can be treated as urgent.`,
      level2: `Yes. Level 2 enquiries in ${coverageSuburb.name} can include ${context.level2Detail}. Include photos of the switchboard, meter area, point of attachment or any defect paperwork if you have it.`,
      quote: `For ${suburbLabel}, include your contact details, job address, photos, a short description and ${context.accessDetail}. For unsafe faults, call instead of waiting for a quote response.`,
    },
    faqHeading: pick(
      [
        `Questions about electrical work in ${coverageSuburb.name}.`,
        `Common ${coverageSuburb.name} electrical questions.`,
        `What ${coverageSuburb.name} customers usually ask.`,
      ],
      seed,
      43,
    ),
    faqIntro: `Use these quick answers to decide whether to call for an urgent hazard or send a quote request for planned work in ${coverageSuburb.name}.`,
    heroDescription,
    heroNote,
    metaDescription: `Need an electrician in ${suburbLabel}? Evaready Electrical helps with ${context.commonJobs}, switchboards, emergencies and Level 2 enquiries around ${areaLabel}.`,
    processDescription: pick(
      [
        `For ${coverageSuburb.name}, the process starts by understanding the fault, the property type and the level of urgency. Planned jobs are easier to price when the request includes photos, while unsafe faults should be phoned through directly.`,
        `${coverageSuburb.name} jobs are handled by separating urgent risks from scheduled work. The aim is to identify the fault clearly, explain the practical repair path and keep the communication straightforward.`,
        `Every ${suburbLabel} enquiry is treated according to the site and the electrical risk. Clear details help with planned work, while hazards like heat, smoke or sparking need direct phone contact.`,
      ],
      seed,
      47,
    ),
    processHeading: pick(
      [
        `A clear way to handle ${coverageSuburb.name} electrical work.`,
        `How electrical jobs are approached in ${coverageSuburb.name}.`,
        `From first call to safe repair in ${coverageSuburb.name}.`,
      ],
      seed,
      53,
    ),
    processLabel: pick(
      [
        `How we work in ${coverageSuburb.name}`,
        `${coverageSuburb.name} job process`,
        `Local electrical support`,
      ],
      seed,
      59,
    ),
    processSteps,
    serviceIntro: `This page focuses on electrical work people in ${coverageSuburb.name} usually ask for across ${areaLabel}, with examples matched to ${context.propertyMix}.`,
    serviceLinks: [
      {
        title: `Emergency electrician ${coverageSuburb.name}`,
        href: "/emergency-electrician-sydney",
        text: `Urgent help for ${context.emergencySignals} in ${coverageSuburb.name}.`,
      },
      {
        title: `Level 2 electrician ${coverageSuburb.name}`,
        href: "/level-2-electrician-sydney",
        text: `Support with ${context.level2Detail} around ${suburbLabel}.`,
      },
      {
        title: `Switchboard upgrades ${coverageSuburb.name}`,
        href: "/services/switchboard-upgrades-sydney",
        text: `Upgrade enquiries covering ${context.switchboardDetail}.`,
      },
      {
        title: `Electrical fault finding ${coverageSuburb.name}`,
        href: "/services/electrical-fault-finding-sydney",
        text: `Testing for faults affecting ${context.propertyMix}.`,
      },
      {
        title: `Power points and lighting ${coverageSuburb.name}`,
        href: "/services/power-point-installation-sydney",
        text: `Planned help with ${context.plannedWork}.`,
      },
      {
        title: `Commercial electrician ${coverageSuburb.name}`,
        href: "/services/commercial-electrician-sydney",
        text: `Electrical support for commercial, strata and property maintenance enquiries in ${areaLabel}.`,
      },
    ],
    serviceSummaries,
    servicesHeading: pick(
      [
        `Electrical work commonly requested in ${coverageSuburb.name}.`,
        `${coverageSuburb.name} electrical services people search for.`,
        `Common electrical jobs around ${suburbLabel}.`,
      ],
      seed,
      61,
    ),
    trustItems: [
      `Electrical help for ${coverageSuburb.postcode}`,
      `${areaLabel} service page`,
      pick(
        [
          "Call first for unsafe faults",
          "Photos help planned quotes",
          "Clear details before attendance",
        ],
        seed,
        67,
      ),
    ],
  };
}

export function getRegionBySlug(regionSlug: string) {
  return coverageRegions.find((coverageRegion) => coverageRegion.slug === regionSlug);
}

export function getAreaBySlug(regionSlug: string, areaSlug: string) {
  const coverageRegion = getRegionBySlug(regionSlug);

  return coverageRegion?.areas.find((coverageArea) => coverageArea.slug === areaSlug);
}

export function getSuburbBySlug(
  regionSlug: string,
  areaSlug: string,
  suburbSlug: string,
) {
  const coverageArea = getAreaBySlug(regionSlug, areaSlug);

  return coverageArea?.suburbs.find(
    (coverageSuburb) => coverageSuburb.slug === suburbSlug,
  );
}

export function getRegionPaths() {
  return coverageRegions.map((coverageRegion) => ({
    region: coverageRegion.slug,
  }));
}

export function getAreaPaths() {
  return coverageRegions.flatMap((coverageRegion) =>
    coverageRegion.areas.map((coverageArea) => ({
      area: coverageArea.slug,
      region: coverageRegion.slug,
    })),
  );
}

export function getSuburbPaths() {
  return coverageRegions.flatMap((coverageRegion) =>
    coverageRegion.areas.flatMap((coverageArea) =>
      coverageArea.suburbs.map((coverageSuburb) => ({
        area: coverageArea.slug,
        region: coverageRegion.slug,
        suburb: coverageSuburb.slug,
      })),
    ),
  );
}
