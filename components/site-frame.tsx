import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import { CurrentYear } from "@/components/current-year";
import { DesktopPrimaryNav } from "@/components/desktop-primary-nav";
import { HomeNavigationLink } from "@/components/home-navigation-link";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { MobilePrimaryNav } from "@/components/mobile-primary-nav";
import { QuoteFormModal } from "@/components/quote-form-modal";
import { RouteMarqueeStrip } from "@/components/route-marquee-strip";
import { assetPath, business } from "@/data/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/emergency-electrician-sydney", label: "Emergency Electrician" },
  { href: "/level-2-electrician-sydney", label: "Level 2 Electrician" },
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/about", label: "About Evaready" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

const headerImages = {
  desktop: "/images/header/evaready-header-desktop-slim-v6.webp",
  tablet: "/images/header/evaready-header-tablet-slim-v6.webp",
  mobile: "/images/header/evaready-header-mobile-slim-v6.webp",
};

type FooterLinkItem = {
  href: string;
  label: string;
};

type FooterLinkGroup = {
  title: string;
  eyebrow: string;
  links: FooterLinkItem[];
};

const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Emergency",
    eyebrow: "Call first",
    links: [
      { href: "/emergency-electrician-sydney", label: "Emergency Electrician" },
      { href: "/electrical-faults", label: "Electrical Fault Guides" },
      { href: "/services/electrical-fault-finding-sydney", label: "Fault Finding" },
      { href: "/services/safety-switch-rcd-installation-sydney", label: "Safety Switches" },
      { href: "/services/storm-damage-electrician-sydney", label: "Storm Damage" },
      { href: "/electrical-faults/no-power-to-house", label: "No Power Help" },
      {
        href: "/electrical-faults/burning-smell-from-switchboard",
        label: "Burning Smell Help",
      },
      { href: "/electrical-faults/power-point-sparking", label: "Sparking Power Point" },
    ],
  },
  {
    title: "Level 2",
    eyebrow: "Supply side",
    links: [
      { href: "/level-2-electrician-sydney", label: "Level 2 Electrician" },
      { href: "/services/consumer-mains-sydney", label: "Consumer Mains" },
      { href: "/services/defect-notice-repairs-sydney", label: "Defect Notice Repairs" },
      {
        href: "/services/point-of-attachment-repairs-sydney",
        label: "Point of Attachment Repairs",
      },
      { href: "/services/metering-services-sydney", label: "Metering Services" },
      { href: "/services/private-power-pole-sydney", label: "Private Power Poles" },
      { href: "/services/overhead-service-lines-sydney", label: "Overhead Service Lines" },
      {
        href: "/services/underground-service-mains-sydney",
        label: "Underground Service Mains",
      },
    ],
  },
  {
    title: "Electrical",
    eyebrow: "Common work",
    links: [
      { href: "/services/switchboard-upgrades-sydney", label: "Switchboard Upgrades" },
      {
        href: "/services/hot-water-system-electrician-sydney",
        label: "Hot Water Electrical",
      },
      {
        href: "/services/split-system-air-conditioning-sydney",
        label: "Air Conditioning Electrical",
      },
      { href: "/services/smoke-alarm-electrician-sydney", label: "Smoke Alarms" },
      { href: "/services/cctv-security-camera-installation-sydney", label: "CCTV & Security" },
      { href: "/services/data-cabling-electrician-sydney", label: "Data Cabling" },
      { href: "/services/commercial-electrician-sydney", label: "Commercial Electrician" },
      {
        href: "/services/electrical-safety-inspection-sydney",
        label: "Electrical Safety Inspections",
      },
    ],
  },
  {
    title: "Areas",
    eyebrow: "Sydney regions",
    links: [
      { href: "/service-areas", label: "Service Areas" },
      {
        href: "/service-areas/canterbury-bankstown-and-inner-south-west",
        label: "Canterbury-Bankstown",
      },
      {
        href: "/service-areas/sydney-city-and-eastern-suburbs",
        label: "Sydney City & Eastern Suburbs",
      },
      { href: "/service-areas/parramatta-and-cumberland", label: "Parramatta & Cumberland" },
      { href: "/service-areas/northern-beaches", label: "Northern Beaches" },
      { href: "/service-areas/blue-mountains", label: "Blue Mountains" },
      { href: "/about", label: "About Evaready" },
      { href: "/contact", label: "Contact Evaready" },
    ],
  },
];

const footerTrustItems = [
  { icon: ShieldCheck, label: "NSW Electrical Licence", value: business.licence },
  { icon: BadgeCheck, label: "ABN", value: business.abn },
  {
    icon: Zap,
    label: "Open Cabler",
    value: `Registration ${business.openCablerRegistration}`,
  },
  { icon: BadgeCheck, label: "ARCtick", value: `Licence ${business.arctickLicence}` },
  { icon: ShieldCheck, label: "Level 2 ASP", value: business.level2Asp.display },
  { icon: Star, label: "Google rating", value: business.googleReviewDisplayText },
  { icon: MapPin, label: "Service area", value: business.serviceArea },
];

function FooterTextLink({ href, label }: FooterLinkItem) {
  return (
    <Link href={href} className="footer-link ev-footer-link">
      <span>{label}</span>
      <ArrowRight className="ev-footer-link-arrow h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

export function SiteHeader() {
  const headerDesktop = assetPath(headerImages.desktop);
  const headerTablet = assetPath(headerImages.tablet);
  const headerMobile = assetPath(headerImages.mobile);

  return (
    <>
      <header className="site-header ev-final-header fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
        <div className="ev-final-header-art">
          <HomeNavigationLink
            data-header-logo="true"
            className="ev-final-header-brand ev-final-header-brand--art"
          >
            <picture className="ev-final-header-picture">
              <source media="(max-width: 767px)" srcSet={headerMobile} />
              <source media="(max-width: 1180px)" srcSet={headerTablet} />
                <img
                  src={headerDesktop}
                  alt="Evaready Electrical 24/7"
                  width={5500}
                  height={240}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="ev-final-header-image"
              />
            </picture>
          </HomeNavigationLink>

          <HomeNavigationLink className="ev-final-header-brand--mobile">
            <Image
              src={assetPath(business.logoImage)}
              alt="Evaready Electrical 24/7"
              width={1426}
              height={503}
              sizes="(max-width: 430px) 190px, (max-width: 1023px) 320px, 1px"
              className="ev-final-header-mobile-logo"
            />
          </HomeNavigationLink>

          <div className="ev-final-mobile-actions">
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="ev-final-mobile-call"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">{business.callCta}</span>
            </a>
            <div className="ev-final-mobile-menu">
              <MobilePrimaryNav />
            </div>
          </div>
        </div>

        <RouteMarqueeStrip />

        <div className="ev-final-desktop-nav">
          <DesktopPrimaryNav items={navItems} />

          <div className="site-header-actions ev-final-header-actions">
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="ev-btn ev-btn--call ev-final-header-btn"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Call Now {business.phoneDisplay}</span>
            </a>

            <a
              href={business.bookingUrl}
              data-quote-trigger="true"
              data-conversion-action="quote-click"
              aria-haspopup="dialog"
              aria-label="Get a quote from Evaready Electrical"
              className="site-header-quote ev-btn ev-btn--quote ev-final-header-btn"
            >
              <span>{business.quoteCta}</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>
      <div
        aria-hidden="true"
        className="site-header-spacer"
      />
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
      className="site-footer ev-storm-footer ev-footer text-white"
    >
      <div className="footer-inner ev-footer-inner">
        <section className="ev-footer-cta" aria-labelledby="footer-cta-title">
          <div className="ev-footer-cta-copy">
            <p className="ev-footer-kicker">Electrical help</p>
            <h2 id="footer-cta-title">Need electrical help now?</h2>
            <p>
              Call first for urgent faults. For planned work, send job details and
              photos through the quote form.
            </p>
          </div>

          <div className="ev-footer-cta-actions" aria-label="Footer contact actions">
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="ev-btn ev-btn--call ev-footer-primary-action"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Call Now {business.phoneDisplay}</span>
            </a>

            <a
              href={business.bookingUrl}
              data-quote-trigger="true"
              data-conversion-action="quote-click"
              aria-haspopup="dialog"
              aria-label="Get a quote from Evaready Electrical"
              className="ev-btn ev-btn--quote ev-footer-primary-action"
            >
              <span>{business.quoteCta}</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </section>

        <div className="ev-footer-grid">
          <section className="ev-footer-brand-card" aria-labelledby="footer-brand-title">
            <div className="footer-logo-shell ev-footer-logo-shell">
              <Image
                src={assetPath(business.logoImage)}
                alt="Evaready Electrical 24/7"
                width={1426}
                height={503}
                sizes="(max-width: 640px) 210px, 255px"
                className="logo-img footer-logo-img"
              />
            </div>

            <h2 id="footer-brand-title" className="sr-only">
              Evaready Electrical footer
            </h2>
            <p className="ev-footer-brand-text">
              Electrical support across Sydney and surrounding regions for
              urgent faults, homes, businesses, Level 2 work, CCTV and data.
            </p>

            <dl className="ev-footer-trust-list" aria-label="Evaready trust details">
              {footerTrustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={`${item.label}-${item.value}`} className="ev-footer-trust-row">
                    <dt>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.label}</span>
                    </dt>
                    <dd>{item.value}</dd>
                  </div>
                );
              })}
            </dl>
          </section>

          <nav className="ev-footer-directory" aria-label="Footer navigation">
            {footerLinkGroups.map((group) => (
              <section key={group.title} className="ev-footer-column">
                <div className="ev-footer-column-heading">
                  <p>{group.eyebrow}</p>
                  <h3>{group.title}</h3>
                </div>
                <ul className="ev-footer-link-list">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}`}>
                      <FooterTextLink {...link} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>

          <section className="ev-footer-contact-card" aria-labelledby="footer-contact-title">
            <div className="ev-footer-column-heading">
              <p>Mobile service</p>
              <h3 id="footer-contact-title">Contact</h3>
            </div>
            <p>
              Evaready is a mobile electrical service across Sydney and surrounding
              regions. No public street address is listed.
            </p>
            <div className="ev-footer-contact-actions">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="footer-action footer-action-call ev-footer-mini-action"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{business.callCta}</span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a quote from Evaready Electrical"
                className="footer-action footer-action-quote ev-footer-mini-action"
              >
                <span>{business.quoteCta}</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href={business.emailHref}
                aria-label="Email Evaready Electrical"
                className="footer-action footer-action-email ev-footer-mini-action"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Email</span>
              </a>
            </div>
            <Link href="/service-areas#find-suburb" className="ev-footer-find-link">
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>Find your suburb</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/#current-electrical-offers"
              className="ev-footer-find-link ev-footer-current-offers"
            >
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              <span>Current offers</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>

        <div className="ev-footer-bottom">
          <p>
            &copy; <CurrentYear /> Evaready Electrical. All rights reserved.
          </p>
          <div className="ev-footer-legal-links">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="footer-link ev-footer-legal-link">
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
    <section className="brand-internal-hero ev-hero ev-hero--with-van ev-storm-section--hero relative overflow-hidden bg-[#061E72] text-white">
      <Image
        src={assetPath(business.heroImage)}
        alt={business.brandImageAlt}
        fill
        priority
        sizes="100vw"
        className="brand-internal-hero-image ev-hero-van object-cover object-[68%_center]"
      />

      <div className="ev-hero-grid relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="internal-hero-copy-panel ev-hero-card ev-hero-content max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
            <MapPin className="h-4 w-4" />
            {eyebrow}
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </section>
  );
}
