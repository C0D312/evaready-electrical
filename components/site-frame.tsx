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
  { href: "/service-areas", label: "Service Areas" },
  { href: "/about", label: "About Evaready", desktopClassName: "hidden xl:inline" },
  { href: "/contact", label: "Contact", desktopClassName: "hidden xl:inline" },
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
            <HomeNavigationLink
              data-header-logo="true"
              className="site-logo-link flex min-w-0 shrink-0 items-center justify-center overflow-visible"
            >
              <Image
                src={assetPath(business.logoImage)}
                alt="Evaready Electrical 24/7"
                width={1426}
                height={503}
                priority
                sizes="(max-width: 767px) 320px, (max-width: 1180px) 280px, 368px"
                className="logo-img site-logo-image"
              />
            </HomeNavigationLink>

            <nav className="hidden items-center gap-4 text-sm font-bold text-slate-700 xl:gap-5 lg:flex">
              {navItems.map((item) => {
                const className = `hover:text-blue-700 ${item.desktopClassName ?? ""}`.trim();

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

            <div className="site-header-actions flex min-w-0 shrink-0 items-center gap-1 sm:gap-2">
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a quote from Evaready Electrical"
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
                data-conversion-action="phone-click"
                aria-label={business.callCta}
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(0,200,255,0.22),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(255,0,30,0.2),transparent_32%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#061E72]/94 via-[#0A349E]/88 to-[#061E72]/76" />

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
