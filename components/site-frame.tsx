import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { FooterCredentialStrip } from "@/components/credential-badges";
import { CurrentYear } from "@/components/current-year";
import { FooterLinkGroups } from "@/components/footer-link-groups";
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
  { href: "/services", label: "Electrical Services" },
  { href: "/services/hot-water-system-electrician-sydney", label: "Hot Water" },
  { href: "/services/split-system-air-conditioning-sydney", label: "Aircon" },
  { href: "/solar-batteries", label: "Solar & Batteries" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/about", label: "About Evaready", desktopClassName: "ev-nav-optional" },
  { href: "/contact", label: "Contact", desktopClassName: "ev-nav-optional" },
];

const legalLinks = [
  { href: "/about", label: "About Evaready" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export function SiteHeader() {
  return (
    <>
      <header className="site-header ev-electric-header fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
        <div className="ev-electric-header-shell">
          <div className="ev-electric-header-banner-row">
            <HomeNavigationLink
              data-header-logo="true"
              className="site-logo-link ev-electric-header-brand"
            >
              <Image
                src={assetPath("/images/evaready-electric-header-banner-v1.webp")}
                alt="Evaready Electrical 24/7"
                width={1800}
                height={170}
                preload
                sizes="100vw"
                className="ev-electric-header-banner"
              />
            </HomeNavigationLink>

            <MobilePrimaryNav />
          </div>

          <div className="ev-electric-desktop-nav-row">
            <nav className="ev-electric-main-nav" aria-label="Primary navigation">
                {navItems.map((item) => {
                  const className = `ev-electric-nav-link ${item.desktopClassName ?? ""}`.trim();

                  return item.href === "/" ? (
                    <HomeNavigationLink
                      key={item.href}
                      className={className}
                    >
                      {item.label}
                    </HomeNavigationLink>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={className}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

            <div className="site-header-actions ev-electric-header-actions">
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="ev-btn ev-btn--call ev-header-btn"
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
                  className="site-header-quote ev-btn ev-btn--quote ev-header-btn"
                >
                  <span>{business.quoteCta}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
          </div>
        </div>
      </header>
      <RouteMarqueeStrip />
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
      className="site-footer bg-[#061E72] px-4 pb-[calc(6rem_+_env(safe-area-inset-bottom))] pt-8 text-white sm:px-6 md:pb-8 md:pt-10 lg:px-8"
    >
      <div className="footer-inner mx-auto max-w-7xl">
        <div className="grid gap-7 md:grid-cols-[minmax(17rem,1.15fr)_minmax(0,2fr)] lg:grid-cols-[minmax(18rem,1.05fr)_minmax(0,2.55fr)] lg:gap-8">
          <div className="footer-brand-block">
            <div className="footer-logo-shell w-fit overflow-visible">
              <Image
                src={assetPath(business.logoImage)}
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

            <FooterCredentialStrip className="mt-4 sm:grid-cols-2 md:grid-cols-1" />
          </div>

          <FooterLinkGroups />
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-cyan-300/15 pt-4 text-xs text-slate-400 md:mt-8 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; <CurrentYear /> Evaready Electrical. All rights reserved.
          </p>
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
    <section className="brand-internal-hero relative overflow-hidden bg-[#061E72] text-white">
      <Image
        src={assetPath(business.heroImage)}
        alt={business.brandImageAlt}
        fill
        priority
        sizes="100vw"
        className="brand-internal-hero-image object-cover object-[68%_center]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="internal-hero-copy-panel max-w-4xl">
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
