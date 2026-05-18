import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Home,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Evaready Electrical services Sydney, Greater Sydney, Canterbury-Bankstown, South West Sydney, Western Sydney, St George, Sutherland Shire, the Inner West, Central Coast and Illawarra.",
  alternates: {
    canonical: "/service-areas",
  },
};

const business = {
  name: "Evaready Electrical",
  phoneDisplay: "0461 247 247",
  phoneHref: "tel:+61461247247",
  smsHref: "sms:+61461247247",
  email: "info@evareadyelectrical.com.au",
  licence: "398937C",
  abn: "44 650 697 797",
  bookingUrl:
    "https://book.servicem8.com/request_booking?uuid=78c2a862-45cf-413b-8ca5-1bf6d8f8944b",
};

const regions = [
  {
    name: "Canterbury-Bankstown",
    description:
      "Priority local coverage for homes, businesses, strata and urgent electrical work.",
    suburbs: [
      "Bankstown",
      "Panania",
      "Revesby",
      "Padstow",
      "Milperra",
      "Picnic Point",
      "East Hills",
      "Chester Hill",
      "Georges Hall",
      "Greenacre",
      "Bass Hill",
      "Yagoona",
    ],
  },
  {
    name: "South West Sydney",
    description:
      "Residential, commercial, emergency and Level 2 electrical services across the south west.",
    suburbs: [
      "Liverpool",
      "Moorebank",
      "Chipping Norton",
      "Casula",
      "Prestons",
      "Wattle Grove",
      "Holsworthy",
      "Lurnea",
      "Warwick Farm",
      "Hammondville",
    ],
  },
  {
    name: "Fairfield & Cumberland",
    description:
      "Electrical repairs, installations, switchboards, lighting, smoke alarms and fault finding.",
    suburbs: [
      "Fairfield",
      "Cabramatta",
      "Canley Vale",
      "Smithfield",
      "Wetherill Park",
      "Guildford",
      "Merrylands",
      "Greystanes",
      "Auburn",
      "Lidcombe",
    ],
  },
  {
    name: "Macarthur",
    description:
      "Electrical services for homes, builders, shops, warehouses and urgent faults.",
    suburbs: [
      "Campbelltown",
      "Camden",
      "Narellan",
      "Ingleburn",
      "Minto",
      "Leumeah",
      "Glenfield",
      "Eagle Vale",
      "Oran Park",
      "Gregory Hills",
    ],
  },
  {
    name: "Wollondilly & Camden Fringe",
    description:
      "Electrical support for outer south west homes, new builds and upgrade works.",
    suburbs: [
      "Picton",
      "Tahmoor",
      "Bargo",
      "Camden",
      "Mount Annan",
      "Harrington Park",
      "Spring Farm",
      "Wilton",
      "Appin",
    ],
  },
  {
    name: "St George",
    description:
      "Electrical repairs, switchboard work, lighting, power points and emergency faults.",
    suburbs: [
      "Hurstville",
      "Kogarah",
      "Rockdale",
      "Bexley",
      "Beverly Hills",
      "Carlton",
      "Allawah",
      "Penshurst",
      "Mortdale",
      "Oatley",
    ],
  },
  {
    name: "Sutherland Shire",
    description:
      "Residential, commercial, emergency and Level 2 electrical work across the Shire.",
    suburbs: [
      "Sutherland",
      "Miranda",
      "Caringbah",
      "Cronulla",
      "Menai",
      "Engadine",
      "Gymea",
      "Kirrawee",
      "Jannali",
      "Woolooware",
    ],
  },
  {
    name: "Sydney CBD & City",
    description:
      "Electrical services for apartments, businesses, shops, offices and commercial sites.",
    suburbs: [
      "Sydney CBD",
      "Haymarket",
      "Pyrmont",
      "Ultimo",
      "Surry Hills",
      "Darlinghurst",
      "Redfern",
      "Waterloo",
      "Alexandria",
    ],
  },
  {
    name: "Eastern Suburbs",
    description:
      "Home and business electrical work, safety checks, lighting and urgent fault support.",
    suburbs: [
      "Bondi",
      "Bondi Junction",
      "Randwick",
      "Coogee",
      "Maroubra",
      "Kingsford",
      "Mascot",
      "Rosebery",
      "Double Bay",
      "Vaucluse",
    ],
  },
  {
    name: "Inner West",
    description:
      "Electrical repairs, renovations, lighting, switchboards and smoke alarm work.",
    suburbs: [
      "Burwood",
      "Strathfield",
      "Ashfield",
      "Marrickville",
      "Dulwich Hill",
      "Newtown",
      "Leichhardt",
      "Five Dock",
      "Concord",
      "Summer Hill",
    ],
  },
  {
    name: "Parramatta & Greater Western Sydney",
    description:
      "Electrical services for homes, shops, offices, strata, builders and urgent jobs.",
    suburbs: [
      "Parramatta",
      "Granville",
      "Rosehill",
      "Westmead",
      "Northmead",
      "Wentworthville",
      "Toongabbie",
      "Seven Hills",
      "Pendle Hill",
    ],
  },
  {
    name: "Blacktown Region",
    description:
      "Residential and commercial electrical services across the Blacktown region.",
    suburbs: [
      "Blacktown",
      "Doonside",
      "Rooty Hill",
      "Mount Druitt",
      "Quakers Hill",
      "Schofields",
      "Marsden Park",
      "Glendenning",
      "Riverstone",
    ],
  },
  {
    name: "Penrith & Nepean",
    description:
      "Electrical repairs, switchboards, emergency call-outs and general electrical work.",
    suburbs: [
      "Penrith",
      "St Marys",
      "Kingswood",
      "Werrington",
      "Jamisontown",
      "Emu Plains",
      "Glenmore Park",
      "Erskine Park",
      "Mulgoa",
    ],
  },
  {
    name: "Blue Mountains",
    description:
      "Electrical service coverage for homes, small businesses and fault call-outs.",
    suburbs: [
      "Springwood",
      "Blaxland",
      "Glenbrook",
      "Winmalee",
      "Faulconbridge",
      "Wentworth Falls",
      "Leura",
      "Katoomba",
    ],
  },
  {
    name: "Hills District",
    description:
      "Electrical work for homes, renovations, businesses, strata and urgent faults.",
    suburbs: [
      "Castle Hill",
      "Baulkham Hills",
      "Kellyville",
      "Rouse Hill",
      "Bella Vista",
      "Norwest",
      "Dural",
      "Glenhaven",
      "Winston Hills",
    ],
  },
  {
    name: "Ryde & Northern Districts",
    description:
      "Electrical repairs, switchboards, lighting, power points and commercial maintenance.",
    suburbs: [
      "Ryde",
      "North Ryde",
      "West Ryde",
      "Eastwood",
      "Epping",
      "Macquarie Park",
      "Marsfield",
      "Gladesville",
      "Meadowbank",
    ],
  },
  {
    name: "North Shore",
    description:
      "Professional electrical service for homes, businesses, strata and property managers.",
    suburbs: [
      "Chatswood",
      "Lane Cove",
      "Artarmon",
      "St Leonards",
      "North Sydney",
      "Crows Nest",
      "Mosman",
      "Neutral Bay",
      "Willoughby",
      "Hornsby",
    ],
  },
  {
    name: "Northern Beaches",
    description:
      "Electrical services for homes, units, businesses and urgent electrical faults.",
    suburbs: [
      "Manly",
      "Dee Why",
      "Brookvale",
      "Freshwater",
      "Curl Curl",
      "Narrabeen",
      "Mona Vale",
      "Warriewood",
      "Avalon",
      "Palm Beach",
    ],
  },
  {
    name: "Central Coast",
    description:
      "Electrical coverage for selected Central Coast jobs, bookings and larger works.",
    suburbs: [
      "Gosford",
      "Erina",
      "Wyoming",
      "Terrigal",
      "Woy Woy",
      "Umina Beach",
      "The Entrance",
      "Tuggerah",
      "Ourimbah",
      "Kariong",
    ],
  },
  {
    name: "Wollongong & Illawarra",
    description:
      "Electrical services for selected Illawarra jobs, larger works and booked call-outs.",
    suburbs: [
      "Wollongong",
      "Shellharbour",
      "Dapto",
      "Corrimal",
      "Unanderra",
      "Figtree",
      "Warrawong",
      "Port Kembla",
      "Thirroul",
      "Albion Park",
    ],
  },
];

export default function AreasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: "Evaready Electrical - Service Areas",
    telephone: business.phoneDisplay,
    email: business.email,
    areaServed: regions.map((region) => region.name),
    url: "https://evareadyelectrical.com.au/areas",
    priceRange: "$$",
    identifier: [
      {
        "@type": "PropertyValue",
        name: "NSW Electrical Licence",
        value: business.licence,
      },
      {
        "@type": "PropertyValue",
        name: "ABN",
        value: business.abn,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Top bar */}
      <div className="bg-[#020617] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-sm sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <MapPin className="h-4 w-4 text-blue-400" />
            Sydney - Greater Sydney - Blue Mountains - Central Coast - Illawarra
          </div>

          <a
            href={business.phoneHref}
            className="hidden items-center gap-2 rounded-full bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-500 sm:flex"
          >
            <Phone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/evaready-logo.png"
              alt="Evaready Electrical"
              width={260}
              height={110}
              priority
              className="h-12 w-auto object-contain sm:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-bold text-slate-700 lg:flex">
            <Link href="/" className="hover:text-blue-700">
              Home
            </Link>
            <Link href="/services" className="hover:text-blue-700">Electrical Services</Link>
            <Link href="/emergency-electrician-sydney" className="hover:text-blue-700">Emergency Electrician</Link>
            <Link href="/level-2-electrician-sydney" className="hover:text-blue-700">Level 2 Electrician</Link>
            <Link href="/service-areas" className="hover:text-blue-700">Service Areas</Link>
          </nav>

          <a
            href={business.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
          >
            Request Quote
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#020617] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.35),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(239,68,68,0.22),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#031640] via-[#020617] to-[#23020a]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              <Navigation className="h-4 w-4" />
              Electrical Service Areas
            </div>

            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Electrical Services Across Sydney & Surrounding Regions
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              Evaready Electrical services homes and businesses across Sydney,
              Greater Sydney, the Blue Mountains, Central Coast and Illawarra.
              Book online through ServiceM8 or call directly for urgent
              electrical help.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                Call {business.phoneDisplay}
              </a>

              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                Request Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            "Licensed & insured",
            "NSW Licence 398937C",
            "Residential and commercial",
            "Emergency and Level 2",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-600" />
              <span className="font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            Major Regions
          </p>

          <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Main areas we service
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Coverage may vary depending on job type, traffic, urgency and
            availability. For urgent jobs, call directly on {business.phoneDisplay}.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {regions.map((region) => (
              <article
                key={region.name}
                className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-blue-50 p-4">
                    <MapPin className="h-8 w-8 text-blue-700" />
                  </div>

                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-red-700">
                    Region
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-black">{region.name}</h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {region.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {region.suburbs.map((suburb) => (
                    <span
                      key={suburb}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700"
                    >
                      {suburb}
                    </span>
                  ))}
                </div>

                <a
                  href={business.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 font-black text-red-600"
                >
                  Request quote <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Service types */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            {
              title: "Residential",
              text: "Homes, units, townhouses, renovations and general electrical work.",
              icon: Home,
            },
            {
              title: "Commercial",
              text: "Offices, shops, warehouses, strata, builders and real estate clients.",
              icon: Building2,
            },
            {
              title: "Emergency",
              text: "Urgent faults, outages, tripping circuits and unsafe electrical issues.",
              icon: Zap,
            },
            {
              title: "Licensed",
              text: "NSW electrical licence 398937C and ABN 44 650 697 797.",
              icon: ShieldCheck,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7"
              >
                <Icon className="h-8 w-8 text-blue-700" />
                <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#031640] via-[#020617] to-[#43040e] py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Need an electrician?
            </p>

            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Call or book online for professional electrical service across
              Sydney.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 font-black text-white transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              Call {business.phoneDisplay}
            </a>

            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-black text-[#020617] transition hover:bg-slate-100"
            >
              Request Quote
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] py-12 pb-28 text-white md:pb-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 text-sm text-slate-400 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="lg:col-span-2">
            <Image
              src="/evaready-logo.png"
              alt="Evaready Electrical"
              width={240}
              height={100}
              className="h-14 w-auto object-contain"
            />

            <p className="mt-5 max-w-md leading-7">
              Residential, commercial, emergency and Level 2 electrical services
              across Sydney and surrounding regions.
            </p>
          </div>

          <div>
            <h3 className="font-black text-white">Business Details</h3>
            <div className="mt-4 space-y-2">
              <p>Electrical Licence: {business.licence}</p>
              <p>ABN: {business.abn}</p>
              <p>Email: {business.email}</p>
              <p>Phone: {business.phoneDisplay}</p>
            </div>
          </div>

          <div>
            <h3 className="font-black text-white">Contact</h3>
            <div className="mt-4 grid gap-3">
              <a
                href={business.phoneHref}
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-black text-white hover:bg-red-500"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>

              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-black text-white hover:bg-blue-500"
              >
                Book Online
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-3 border-t border-white/10 bg-[#020617]/95 p-3 backdrop-blur-xl md:hidden">
        <a
          href={business.phoneHref}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-4 font-black text-white"
        >
          <Phone className="h-5 w-5" />
          Call
        </a>

        <a
          href={business.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-4 font-black text-white"
        >
          Book
        </a>
      </div>
    </main>
  );
}



