import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Bolt,
  Building2,
  CheckCircle2,
  Flame,
  Home,
  Lightbulb,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import {
  ServiceCredentialStrip,
  serviceCredentialPresets,
} from "@/components/service-credential-strip";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import { absoluteUrl, business } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
  buildSiteOfferCatalog,
  schemaJson,
} from "@/lib/schema";
import { servicesIndexSeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(servicesIndexSeoMetadata());

const services = [
  {
    title: "Residential Electrician",
    description:
      "Electrical repairs, installations and upgrades for homes, units, townhouses and renovations.",
    icon: Home,
    includes: [
      "Power points",
      "Lighting",
      "Smoke alarms",
      "Ceiling fans",
      "Renovation wiring",
      "Fault finding",
    ],
  },
  {
    title: "Commercial Electrician",
    description:
      "Electrical maintenance and installations for shops, offices, warehouses, builders, strata and real estate clients.",
    icon: Building2,
    includes: [
      "Commercial maintenance",
      "Office electrical work",
      "Shop fit-outs",
      "Strata electrical",
      "Builder support",
      "Real estate jobs",
    ],
  },
  {
    title: "Emergency Electrician",
    description:
      "Urgent fault support for outages, burning smells, tripping circuits and electrical issues that need a direct call.",
    icon: Flame,
    includes: [
      "Power outages",
      "Tripping circuits",
      "Burning smells",
      "Switchboard faults",
      "Unsafe wiring",
      "After-hours faults",
    ],
  },
  {
    title: "Level 2 Electrician",
    description:
      "Level 2 electrical support for consumer mains, service work, metering, defects and supply-side issues.",
    icon: Bolt,
    includes: [
      "Consumer mains",
      "Defect notices",
      "Overhead services",
      "Underground services",
      "Metering support",
      "Service upgrades",
    ],
  },
  {
    title: "Switchboard Upgrades",
    description:
      "Modern switchboard upgrades for safety, reliability and compliance, including safety switches and RCBO protection.",
    icon: ShieldCheck,
    includes: [
      "Ceramic fuse replacement",
      "Safety switches",
      "RCBO upgrades",
      "Circuit labelling",
      "Fault checks",
      "Testing",
    ],
  },
  {
    title: "Electrical Fault Finding",
    description:
      "Professional testing and diagnosis for tripping circuits, power issues, water damage, damaged wiring and unsafe faults.",
    icon: Wrench,
    includes: [
      "Safety switch tripping",
      "Circuit faults",
      "Damaged cables",
      "Water ingress",
      "Overloaded circuits",
      "Appliance faults",
    ],
  },
  {
    title: "Lighting Electrician",
    description:
      "Indoor, outdoor and security lighting installed neatly and safely for homes, businesses and renovations.",
    icon: Lightbulb,
    includes: [
      "LED downlights",
      "Outdoor lighting",
      "Security lighting",
      "Bathroom lighting",
      "Feature lighting",
      "Lighting repairs",
    ],
  },
  {
    title: "Power Points",
    description:
      "Install, replace and relocate power points for homes, offices, kitchens, bedrooms, garages and outdoor areas.",
    icon: Zap,
    includes: [
      "New power points",
      "Double power points",
      "Outdoor outlets",
      "USB outlets",
      "Appliance outlets",
      "Faulty outlet repairs",
    ],
  },
  {
    title: "Smoke Alarms",
    description:
      "Smoke alarm installation, replacement and testing for homes, rentals, property managers and compliance needs.",
    icon: BadgeCheck,
    includes: [
      "New smoke alarms",
      "Replacement alarms",
      "Testing",
      "Rental support",
      "Compliance checks",
      "Battery and hardwired alarms",
    ],
  },
  {
    title: "Hot Water System Electrical",
    description:
      "Electrical fault checks, repairs and circuit support for electric hot water systems and heat pump electrical supplies.",
    icon: Flame,
    includes: [
      "No hot water faults",
      "Electric hot water circuits",
      "Thermostat and element checks",
      "Isolators and safety switches",
      "Heat pump electrical support",
      "Emergency hot water faults",
    ],
  },
  {
    title: "Air Conditioning",
    description:
      "Air-conditioning services, split-system support, AC isolators, dedicated circuits, heat pump electrical support and switchboard capacity checks.",
    icon: Bolt,
    includes: [
      "Air-conditioning electrical support",
      "Split-system air conditioning",
      "AC isolators",
      "Dedicated aircon circuits",
      "Outdoor unit power",
      "Heat pump support",
    ],
  },
  {
    title: "CCTV & Security Cameras",
    description:
      "CCTV and security camera cabling, camera installation and neat setup support for homes and businesses.",
    icon: ShieldCheck,
    includes: [
      "CCTV camera wiring",
      "Security camera installation",
      "Recorder location planning",
      "Camera power supplies",
      "Home and business systems",
      "Future camera provisions",
    ],
  },
  {
    title: "Data Cabling & Internet Points",
    description:
      "Network cabling, data points, internet outlets and communication cabling for homes, offices and renovations.",
    icon: Bolt,
    includes: [
      "Data points",
      "Network cabling",
      "Internet outlets",
      "NBN internal cabling",
      "Office data runs",
      "Phone line repairs",
    ],
  },
  {
    title: "Ceiling & Exhaust Fans",
    description:
      "Ceiling fan, exhaust fan and bathroom fan installation, replacement and fault checks.",
    icon: Zap,
    includes: [
      "Ceiling fans",
      "Exhaust fans",
      "Bathroom fans",
      "Fan controllers",
      "Outdoor fans",
      "Replacement wiring",
    ],
  },
  {
    title: "Safety Switches & RCDs",
    description:
      "Safety switch installation, RCD fault checks, circuit protection upgrades and nuisance tripping support.",
    icon: ShieldCheck,
    includes: [
      "RCD installation",
      "Safety switch repairs",
      "Tripping fault checks",
      "RCBO upgrades",
      "Circuit protection",
      "Switchboard testing",
    ],
  },
  {
    title: "3 Phase Power",
    description:
      "3 phase power support for larger homes, workshops, commercial equipment, EV charging and higher electrical demand.",
    icon: Bolt,
    includes: [
      "3 phase upgrades",
      "Equipment circuits",
      "Load checks",
      "Workshop power",
      "Commercial power",
      "Switchboard support",
    ],
  },
  {
    title: "Surge Protection",
    description:
      "Switchboard surge protection to help protect appliances, electronics and sensitive equipment from voltage spikes.",
    icon: BadgeCheck,
    includes: [
      "Surge protection devices",
      "Switchboard protection",
      "Appliance protection",
      "Storm risk support",
      "Sensitive equipment",
      "Safety checks",
    ],
  },
  {
    title: "Appliance, Cooktop & Rangehood",
    description:
      "Electrical connections and circuits for cooktops, ovens, rangehoods, dishwashers and dedicated appliances.",
    icon: Home,
    includes: [
      "Cooktop circuits",
      "Oven connections",
      "Rangehood wiring",
      "Dishwasher electrical",
      "Appliance isolators",
      "Dedicated circuits",
    ],
  },
  {
    title: "Electrical Rewiring",
    description:
      "Rewiring support for older homes, renovations, unsafe cabling, damaged wiring and major electrical upgrades.",
    icon: Wrench,
    includes: [
      "Home rewiring",
      "Renovation wiring",
      "Old cable replacement",
      "Damaged wiring",
      "New circuits",
      "Safety upgrades",
    ],
  },
  {
    title: "Meters & Service Equipment",
    description:
      "Metering support, service equipment checks and Level 2 electrical coordination for supply-side issues.",
    icon: BadgeCheck,
    includes: [
      "Metering support",
      "Service equipment",
      "Supply checks",
      "Defect support",
      "Level 2 coordination",
      "Switchboard supply work",
    ],
  },
  {
    title: "New Builds & Renovations",
    description:
      "Electrical planning, rough-ins, fit-offs and upgrade work for new builds, extensions and renovation projects.",
    icon: Home,
    includes: [
      "New build wiring",
      "Renovation rough-ins",
      "Kitchen and bathroom upgrades",
      "Lighting layouts",
      "Power planning",
      "Final fit-offs",
    ],
  },
  {
    title: "Testing, Tagging & Reports",
    description:
      "Electrical testing, safety checks and property report support for homes, businesses, rentals and managed sites.",
    icon: BadgeCheck,
    includes: [
      "Testing and tagging",
      "Electrical safety checks",
      "Property reports",
      "Rental checks",
      "Commercial safety support",
      "Fault documentation",
    ],
  },
  {
    title: "Home Automation & Smart Wiring",
    description:
      "Smart switching, automation wiring, lighting control and future-ready cabling for homes and businesses.",
    icon: Bolt,
    includes: [
      "Smart switches",
      "Lighting control",
      "Automation wiring",
      "Smart home upgrades",
      "Low-voltage provisions",
      "Future cabling",
    ],
  },
  {
    title: "TV, Antenna & Wall Cabling",
    description:
      "TV points, antenna points, wall-mount power, hidden cabling and tidy media wiring.",
    icon: Zap,
    includes: [
      "TV points",
      "Antenna points",
      "Wall-mount power",
      "Hidden cabling",
      "Media outlets",
      "Data and TV combinations",
    ],
  },
  {
    title: "Intercoms & Access Control",
    description:
      "Intercom, entry, access control and security wiring support for homes, strata and commercial sites.",
    icon: ShieldCheck,
    includes: [
      "Intercom wiring",
      "Access control",
      "Entry systems",
      "Gate provisions",
      "Strata support",
      "Security integration",
    ],
  },
  {
    title: "Storm Damage & Appliance Disconnects",
    description:
      "Urgent electrical help for storm damage, unsafe wiring, damaged equipment and emergency appliance disconnections.",
    icon: Flame,
    includes: [
      "Storm damage checks",
      "Emergency disconnections",
      "Damaged fittings",
      "Unsafe circuits",
      "Water-affected wiring",
      "Temporary make-safe support",
    ],
  },
  {
    title: "Load Balancing & Capacity Checks",
    description:
      "Electrical capacity checks for upgrades, 3 phase enquiries, EV charging, workshops and commercial equipment.",
    icon: Wrench,
    includes: [
      "Load checks",
      "Capacity assessments",
      "EV charger planning",
      "Workshop equipment",
      "Commercial loads",
      "Upgrade advice",
    ],
  },
];


const servicePageLinks: Record<string, string> = {
  "Residential Electrician": "/services/residential-electrician-sydney",
  "Commercial Electrician": "/services/commercial-electrician-sydney",
  "Emergency Electrician": "/emergency-electrician-sydney",
  "Level 2 Electrician": "/level-2-electrician-sydney",
  "Switchboard Upgrades": "/services/switchboard-upgrades-sydney",
  "Electrical Fault Finding": "/services/electrical-fault-finding-sydney",
  "Lighting Electrician": "/services/lighting-electrician-sydney",
  "Power Points": "/services/power-point-installation-sydney",
  "Smoke Alarms": "/services/smoke-alarm-electrician-sydney",
  "Hot Water System Electrical": "/services/hot-water-system-electrician-sydney",
  "Air Conditioning": "/services/split-system-air-conditioning-sydney",
  "CCTV & Security Cameras": "/services/cctv-security-camera-installation-sydney",
  "Data Cabling & Internet Points": "/services/data-cabling-electrician-sydney",
  "Ceiling & Exhaust Fans": "/services/ceiling-fan-installation-sydney",
  "Safety Switches & RCDs": "/services/safety-switch-rcd-installation-sydney",
  "3 Phase Power": "/services/three-phase-power-sydney",
  "Surge Protection": "/services/surge-protection-electrician-sydney",
  "Appliance, Cooktop & Rangehood": "/services/appliance-installation-electrician-sydney",
  "Electrical Rewiring": "/services/rewiring-electrician-sydney",
  "Meters & Service Equipment": "/services/metering-services-sydney",
  "New Builds & Renovations": "/services/new-build-renovation-electrician-sydney",
  "Testing, Tagging & Reports": "/services/electrical-testing-tagging-reports-sydney",
  "Home Automation & Smart Wiring": "/services/smart-home-electrician-sydney",
  "TV, Antenna & Wall Cabling": "/services/tv-antenna-wall-cabling-sydney",
  "Intercoms & Access Control": "/services/intercom-access-control-electrician-sydney",
  "Storm Damage & Appliance Disconnects": "/services/storm-damage-electrician-sydney",
  "Load Balancing & Capacity Checks": "/services/electrical-load-capacity-checks-sydney",
};

const featuredServiceTitles = [
  "Emergency Electrician",
  "Level 2 Electrician",
  "Switchboard Upgrades",
  "Electrical Fault Finding",
  "Hot Water System Electrical",
  "Air Conditioning",
  "CCTV & Security Cameras",
];

const featuredServices = featuredServiceTitles.flatMap((title) => {
  const service = services.find((entry) => entry.title === title);

  return service ? [service] : [];
});

function getServiceHref(title: string) {
  return servicePageLinks[title] ?? business.bookingUrl;
}

function isExternalServiceLink(title: string) {
  return !servicePageLinks[title];
}

export default function ServicesPage() {
  const schema = buildElectricianSchema({
    description:
      "Residential, commercial, emergency, Level 2 and planned electrical services across Sydney and surrounding regions.",
    name: "Evaready Electrical - Electrical Services Sydney & Surrounding Regions",
    offerNames: services.map((service) => service.title),
    serviceTypes: services.map((service) => service.title),
    url: absoluteUrl("/services"),
  });
  const offerCatalogSchema = {
    "@context": "https://schema.org",
    ...buildSiteOfferCatalog(),
  };
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Electrical Services", path: "/services" },
    ],
    "/services",
  );

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(schema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(offerCatalogSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(breadcrumbSchema)}
      />

      <SiteHeader />

      {/* Hero */}
      <section className="brand-internal-hero relative overflow-hidden bg-[#020617] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.35),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(239,68,68,0.25),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#031640] via-[#020617] to-[#23020a]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              <CheckCircle2 className="h-4 w-4" />
              Electrical Services
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Electrical Services Sydney & Surrounding Regions
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              Evaready Electrical helps homes, strata, shops, builders and
              businesses with electrical work that needs a licensed hand and a
              clear next steps before work begins. That includes urgent faults,
              Level 2 work, switchboards, testing, lighting, hot water
              electrical faults, data, CCTV, fans, smart wiring and larger
              upgrades.
            </p>

            <ServiceCredentialStrip
              items={serviceCredentialPresets.general}
              className="mt-6 max-w-4xl"
            />

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>

              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a quote from Evaready Electrical"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustSymbolBand className="border-b border-slate-200" />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-700">
              Most requested
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Fast paths for the electrical jobs people call about first.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Start with one of the main service types below, or keep browsing
              the full service list for more specific electrical work.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service) => {
              const Icon = service.icon;
              const href = getServiceHref(service.title);

              return (
                <Link
                  key={service.title}
                  href={href}
                  className="group overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-1 hover:border-cyan-300/55 hover:shadow-cyan-500/15"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-cyan-200">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="text-xl font-black leading-7">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 font-black text-cyan-200">
                    View service
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            Electrical services
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Choose the electrical service that best matches the job.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Call directly if the issue feels unsafe. For planned work, choose
            the closest service and send the details so it can be reviewed.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="rounded-2xl bg-blue-50 p-4 w-fit">
                    <Icon className="h-8 w-8 text-blue-700" />
                  </div>

                  <h3 className="mt-6 text-2xl font-black">{service.title}</h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {service.description}
                  </p>

                  <div className="mt-6 grid gap-2">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {isExternalServiceLink(service.title) ? (
                    <a
                      href={getServiceHref(service.title)}
                      className="mt-7 inline-flex items-center gap-2 font-black text-blue-700"
                    >
                      {business.quoteCta} <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={getServiceHref(service.title)}
                      className="mt-7 inline-flex items-center gap-2 font-black text-blue-700"
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#031640] via-[#020617] to-[#43040e] py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Electrical help without the guesswork.
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Call for urgent faults, or send the job notes for planned
              upgrades, repairs and installations.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 font-black text-white transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              <span className="whitespace-nowrap">{business.callCta}</span>
            </a>

            <a
              href={business.bookingUrl}
              data-quote-trigger="true"
              data-conversion-action="quote-click"
              aria-haspopup="dialog"
              aria-label="Get a quote from Evaready Electrical"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-700 px-7 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
            >
              {business.quoteCta}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

    </main>
  );
}






