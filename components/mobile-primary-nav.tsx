"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Bolt,
  Droplets,
  Flame,
  Home,
  Info,
  Mail,
  MapPin,
  Menu,
  Phone,
  Snowflake,
  Wrench,
  X,
} from "lucide-react";
import { HomeNavigationLink } from "@/components/home-navigation-link";
import { business } from "@/data/site";

const mobileNavItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/emergency-electrician-sydney",
    label: "Emergency Electrician",
    icon: Flame,
  },
  {
    href: "/level-2-electrician-sydney",
    label: "Level 2 Electrician",
    icon: Bolt,
  },
  {
    href: "/services",
    label: "Electrical Services",
    icon: Wrench,
  },
  {
    href: "/services/hot-water-system-electrician-sydney",
    label: "Hot Water",
    icon: Droplets,
  },
  {
    href: "/services/split-system-air-conditioning-sydney",
    label: "Aircon",
    icon: Snowflake,
  },
  {
    href: "/service-areas",
    label: "Service Areas",
    icon: MapPin,
  },
  {
    href: "/about",
    label: "About Evaready",
    icon: Info,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
  },
];

export function MobilePrimaryNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const menuOverlay = open ? (
    <div className="fixed inset-x-0 bottom-0 top-[calc(64px_+_env(safe-area-inset-top))] z-[90] lg:hidden sm:top-[calc(88px_+_env(safe-area-inset-top))]">
      <button
        type="button"
        aria-label="Close navigation menu"
        className="absolute inset-0 bg-slate-950/55"
        onClick={() => setOpen(false)}
      />

      <nav
        id="mobile-site-menu"
        aria-label="Mobile navigation"
        className="absolute inset-x-3 top-3 max-h-[calc(100dvh_-_84px_-_env(safe-area-inset-top))] overflow-y-auto rounded-2xl border border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl sm:max-h-[calc(100dvh_-_108px_-_env(safe-area-inset-top))]"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
              Menu
            </p>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-900"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-2 p-3">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;

            const className =
              "flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left font-black text-slate-900 shadow-sm transition hover:border-blue-500 hover:bg-blue-50";
            const content = (
              <>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-base leading-tight">{item.label}</span>
              </>
            );

            return item.href === "/" ? (
              <HomeNavigationLink
                key={item.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {content}
              </HomeNavigationLink>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {content}
              </Link>
            );
          })}
        </div>

        <div className="grid gap-2 border-t border-slate-200 bg-slate-50 p-3">
          <a
            href={business.bookingUrl}
            data-quote-trigger="true"
            data-conversion-action="quote-click"
            aria-haspopup="dialog"
            aria-label="Get a quote from Evaready Electrical"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20"
          >
            {business.quoteCta}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={business.phoneHref}
            data-conversion-action="phone-click"
            aria-label={business.callCta}
            onClick={() => setOpen(false)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-red-600/20"
          >
            <Phone className="h-4 w-4" />
            <span className="whitespace-nowrap">
              {business.callCta}
            </span>
          </a>
        </div>
      </nav>
    </div>
  ) : null;

  return (
    <div className="mobile-nav-trigger shrink-0 lg:hidden">
      <button
        type="button"
        aria-controls="mobile-site-menu"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-800 shadow-lg shadow-blue-700/10 transition hover:bg-blue-50 sm:h-11 sm:w-11"
        style={{
          display: "inline-flex",
          width: 44,
          height: 44,
        }}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {typeof document !== "undefined" && menuOverlay
        ? createPortal(menuOverlay, document.body)
        : null}
    </div>
  );
}
