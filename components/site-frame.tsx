import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { FooterMobileAccordions } from "@/components/footer-mobile-accordions";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { MobilePrimaryNav } from "@/components/mobile-primary-nav";
import { QuoteFormModal } from "@/components/quote-form-modal";
import { RouteMarqueeStrip } from "@/components/route-marquee-strip";
import { assetPath, business } from "@/data/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Electrical Services" },
  { href: "/services/hot-water-system-electrician-sydney", label: "Hot Water" },
  { href: "/services/split-system-air-conditioning-sydney", label: "Aircon" },
  { href: "/emergency-electrician-sydney", label: "Emergency Electrician" },
  { href: "/level-2-electrician-sydney", label: "Level 2 Electrician" },
  { href: "/service-areas", label: "Service Areas" },
];

const footerColumns = [
  {
    title: "Emergency Services",
    links: [
      { href: "/emergency-electrician-sydney", label: "Emergency electrician" },
      { href: "/electrical-faults", label: "Electrical fault guides" },
      { href: "/services/electrical-fault-finding-sydney", label: "Fault finding" },
      { href: "/services/safety-switch-rcd-installation-sydney", label: "Safety switches" },
      { href: "/services/storm-damage-electrician-sydney", label: "Storm damage" },
    ],
  },
  {
    title: "Level 2 Services",
    links: [
      { href: "/level-2-electrician-sydney", label: "Level 2 electrician" },
      { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
      { href: "/services/defect-notice-repairs-sydney", label: "Defect notices" },
      { href: "/services/metering-services-sydney", label: "Metering services" },
    ],
  },
  {
    title: "Popular Services",
    links: [
      { href: "/services/switchboard-upgrades-sydney", label: "Switchboard upgrades" },
      { href: "/services/commercial-electrician-sydney", label: "Commercial electrician" },
      { href: "/services/hot-water-system-electrician-sydney", label: "Hot water electrical" },
      { href: "/services/split-system-air-conditioning-sydney", label: "Split system air conditioning" },
      { href: "/services/cctv-security-camera-installation-sydney", label: "CCTV and security" },
    ],
  },
  {
    title: "Service Areas",
    links: [
      { href: "/service-areas", label: "All service areas" },
      { href: "/service-areas/sutherland-shire", label: "Sutherland Shire" },
      { href: "/service-areas/st-george-and-bayside", label: "St George and Bayside" },
      { href: "/service-areas/wollongong-and-illawarra", label: "Wollongong and Illawarra" },
    ],
  },
  {
    title: "Electrical Fault Guides",
    links: [
      { href: "/electrical-faults", label: "Fault help centre" },
      { href: "/electrical-faults/safety-switch-keeps-tripping", label: "Safety switch tripping" },
      { href: "/electrical-faults/burning-smell-from-switchboard", label: "Burning smell from switchboard" },
      { href: "/electrical-faults/no-power-to-house", label: "No power to house" },
    ],
  },
];

const footerColumnsOrdered = [
  footerColumns[0],
  footerColumns[1],
  footerColumns[2],
  footerColumns[4],
  footerColumns[3],
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export function SiteHeader() {
  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 pt-[env(safe-area-inset-top)] shadow-sm backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 sm:py-3 lg:px-8">
          <div className="site-header-top flex items-center justify-between gap-2 sm:gap-3">
            <Link
              href="/"
              data-header-logo="true"
              className="site-logo-link flex min-w-0 shrink-0 items-center justify-center overflow-visible"
            >
              <Image
                src={assetPath("/images/evareadyelectrical-logo.png")}
                alt="Evaready Electrical 24/7"
                width={1426}
                height={503}
                priority
                sizes="(max-width: 767px) 320px, (max-width: 1180px) 280px, 368px"
                className="logo-img site-logo-image"
              />
            </Link>

            <nav className="hidden items-center gap-4 text-sm font-bold text-slate-700 xl:gap-5 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-blue-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="site-header-actions flex min-w-0 shrink-0 items-center gap-1 sm:gap-2">
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                aria-haspopup="dialog"
                className="site-header-quote inline-flex min-h-10 shrink-0 items-center justify-center gap-1 rounded-lg bg-blue-700 px-2.5 py-2 text-[0.68rem] font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600 min-[380px]:px-3 sm:min-h-11 sm:gap-2 sm:px-4 sm:text-sm lg:px-4 lg:py-3"
              >
                <span className="whitespace-nowrap">
                  <span className="hidden min-[480px]:inline lg:inline">Get a </span>
                  Quote
                </span>
                <ArrowRight className="hidden h-4 w-4 shrink-0 min-[480px]:block lg:block" />
              </a>

              <a
                href={business.phoneHref}
                aria-label={`Call Now ${business.phoneDisplay}`}
                className="hidden min-h-10 w-[7.15rem] shrink-0 items-center justify-center gap-1 rounded-lg bg-red-600 px-1 py-2 text-[0.52rem] font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 min-[380px]:w-[7.75rem] min-[380px]:text-[0.58rem] sm:min-h-11 sm:w-auto sm:gap-2 sm:px-4 sm:text-sm md:inline-flex"
              >
                <Phone className="hidden h-4 w-4 shrink-0 min-[430px]:block sm:block" />
                <span className="whitespace-nowrap">
                  <span className="hidden lg:inline">Call Now </span>
                  {business.phoneDisplay}
                </span>
              </a>

            </div>

            <MobilePrimaryNav />
          </div>
        </div>
      </header>
      <div
        aria-hidden="true"
        className="h-[calc(88px_+_env(safe-area-inset-top))] sm:h-[calc(104px_+_env(safe-area-inset-top))] lg:h-[calc(104px_+_env(safe-area-inset-top))]"
      />
      <RouteMarqueeStrip />
      <QuoteFormModal />
      <MobileStickyCta />
    </>
  );
}

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      data-site-footer
      className="site-footer bg-[#020617] px-4 pb-[calc(6rem_+_env(safe-area-inset-bottom))] pt-8 text-white sm:px-6 md:pb-8 md:pt-10 lg:px-8"
    >
      <div className="footer-inner mx-auto max-w-7xl">
        <div className="grid gap-7 md:grid-cols-[minmax(17rem,1.15fr)_minmax(0,2fr)] lg:grid-cols-[minmax(18rem,1.05fr)_minmax(0,2.55fr)] lg:gap-8">
          <div className="footer-brand-block">
            <div className="footer-logo-shell w-fit overflow-visible">
              <Image
                src={assetPath("/images/evareadyelectrical-logo.png")}
                alt="Evaready Electrical 24/7"
                width={1426}
                height={503}
                sizes="(max-width: 640px) 190px, 232px"
                className="logo-img footer-logo-img"
              />
            </div>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300 md:mt-4">
              Electrical support across Sydney and surrounding regions for
              urgent faults, homes, businesses, Level 2 work, CCTV and data.
            </p>

            <dl className="mt-4 grid gap-1.5 text-xs leading-5 text-slate-300 sm:grid-cols-2 md:grid-cols-1">
              <div>
                <dt className="font-black uppercase tracking-[0.12em] text-cyan-200">
                  Electrical Licence
                </dt>
                <dd>{business.licence}</dd>
              </div>
              <div>
                <dt className="font-black uppercase tracking-[0.12em] text-cyan-200">
                  ABN
                </dt>
                <dd>{business.abn}</dd>
              </div>
              <div>
                <dt className="font-black uppercase tracking-[0.12em] text-cyan-200">
                  Open Cabler Registration
                </dt>
                <dd>{business.openCablerRegistration}</dd>
              </div>
              <div>
                <dt className="font-black uppercase tracking-[0.12em] text-cyan-200">
                  ARCtick Refrigerant Handling Licence
                </dt>
                <dd>
                  {business.arctickLicence} — {business.arctickScope}
                </dd>
              </div>
            </dl>

            <div className="mt-4 grid gap-2 text-sm text-slate-200">
              <a
                href={business.phoneHref}
                className="footer-link inline-flex w-fit items-center gap-2 font-black text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-red-300" />
                Call {business.phoneDisplay}
              </a>
              <a
                href={business.emailHref}
                className="footer-link inline-flex w-fit items-center gap-2 break-all font-bold text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-cyan-300" />
                {business.email}
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                aria-haspopup="dialog"
                className="footer-link inline-flex w-fit items-center gap-2 font-black text-white"
              >
                <ArrowRight className="h-4 w-4 shrink-0 text-cyan-300" />
                {business.quoteCta}
              </a>
            </div>

            <div className="footer-action-grid mt-4 grid grid-cols-1 gap-2 min-[390px]:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              <a
                href={business.phoneHref}
                className="footer-action footer-action-call"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span>Call {business.phoneDisplay}</span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                aria-haspopup="dialog"
                className="footer-action footer-action-quote"
              >
                <span>{business.quoteCta}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </a>
              <a href={business.emailHref} className="footer-action footer-action-email">
                <Mail className="h-4 w-4 shrink-0" />
                <span>Email</span>
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className="hidden gap-x-5 gap-y-7 md:grid md:grid-cols-2 lg:grid-cols-5"
          >
            {footerColumnsOrdered.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-black uppercase tracking-[0.14em] text-white">
                  {column.title}
                </h3>
                <div className="mt-3 grid gap-2.5">
                  {column.links.map((link) => (
                    <Link key={link.href} href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <FooterMobileAccordions columns={footerColumnsOrdered} />
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-cyan-300/15 pt-4 text-xs text-slate-400 md:mt-8 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Evaready Electrical. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function ServiceAreaHero({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="brand-internal-hero relative overflow-hidden bg-slate-950 text-white">
      <Image
        src={assetPath(business.brandImage)}
        alt={business.brandImageAlt}
        fill
        sizes="100vw"
        className="brand-internal-hero-image object-cover object-[67%_center]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(0,200,255,0.22),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(255,0,30,0.2),transparent_32%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#020814]/94 via-[#061A3A]/88 to-[#020814]/76" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
            <MapPin className="h-4 w-4" />
            {eyebrow}
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </section>
  );
}
