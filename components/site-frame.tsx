import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { MobilePrimaryNav } from "@/components/mobile-primary-nav";
import { assetPath, business } from "@/data/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Electrical Services" },
  { href: "/emergency-electrician-sydney", label: "Emergency Electrician" },
  { href: "/level-2-electrician-sydney", label: "Level 2 Electrician" },
  { href: "/service-areas", label: "Service Areas" },
];

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-6 sm:py-3 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src={assetPath("/evaready-logo.png")}
              alt="Evaready Electrical 24/7"
              width={320}
              height={135}
              priority
              className="h-14 w-[46vw] max-w-52 object-cover sm:h-16 sm:w-60 lg:h-14 lg:w-52"
            />
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-bold text-slate-700 lg:flex">
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

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={business.phoneHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-red-600 px-3 py-2 text-xs font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 sm:px-4 sm:text-sm"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span>{business.phoneDisplay}</span>
            </a>

            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600 sm:inline-flex lg:bg-red-600 lg:hover:bg-red-500"
            >
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>
      <MobilePrimaryNav />
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 text-sm text-slate-400 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Image
            src={assetPath("/evaready-logo.png")}
            alt="Evaready Electrical"
            width={240}
            height={100}
            className="h-14 w-52 rounded bg-white object-cover p-1"
          />
          <p className="mt-5 max-w-md leading-7">
            Emergency, residential, commercial and Level 2 electrical services
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
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-black text-white hover:bg-red-500"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>

            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-black text-white hover:bg-blue-600"
            >
              Request Quote
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileStickyCta() {
  return null;
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
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.35),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(239,68,68,0.22),transparent_32%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#031640] via-slate-950 to-[#23020a]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
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
