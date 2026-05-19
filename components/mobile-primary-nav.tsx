"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bolt,
  Flame,
  Home,
  MapPin,
  Menu,
  Phone,
  Wrench,
  X,
} from "lucide-react";
import { business } from "@/data/site";

const mobileNavItems = [
  {
    href: "/",
    label: "Home",
    description: "Main page",
    icon: Home,
    className: "border-slate-200 bg-slate-950 text-white",
  },
  {
    href: "/emergency-electrician-sydney",
    label: "Emergency Electrician",
    description: "Urgent faults and power issues",
    icon: Flame,
    className: "border-red-200 bg-red-50 text-red-700",
  },
  {
    href: "/level-2-electrician-sydney",
    label: "Level 2 Electrician",
    description: "Consumer mains, metering and defect work",
    icon: Bolt,
    className: "border-blue-200 bg-blue-50 text-blue-800",
  },
  {
    href: "/services",
    label: "Electrical Services",
    description: "Lighting, power, smoke alarms and more",
    icon: Wrench,
    className: "border-slate-200 bg-slate-50 text-slate-800",
  },
  {
    href: "/service-areas",
    label: "Service Areas",
    description: "Regions, suburbs and postcode search",
    icon: MapPin,
    className: "border-slate-200 bg-slate-50 text-slate-800",
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

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-controls="mobile-site-menu"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-700 bg-blue-50 px-4 py-2 text-sm font-black uppercase text-blue-800 shadow-lg shadow-blue-700/10 transition hover:bg-blue-100"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-[calc(120px_+_env(safe-area-inset-top))] z-[60] min-[380px]:top-[calc(128px_+_env(safe-area-inset-top))] sm:top-[calc(144px_+_env(safe-area-inset-top))]">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-slate-950/55"
            onClick={() => setOpen(false)}
          />

          <nav
            id="mobile-site-menu"
            aria-label="Mobile navigation"
            className="absolute inset-x-3 top-3 max-h-[calc(100dvh_-_140px_-_env(safe-area-inset-top))] overflow-y-auto rounded-2xl border border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl min-[380px]:max-h-[calc(100dvh_-_148px_-_env(safe-area-inset-top))] sm:max-h-[calc(100dvh_-_164px_-_env(safe-area-inset-top))]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
                  Site Menu
                </p>
                <p className="mt-1 text-sm font-bold text-slate-600">
                  Tap a page to navigate
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

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-16 items-center gap-3 rounded-xl border px-4 py-3 text-left shadow-sm ${item.className}`}
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-current">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-base font-black leading-tight">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-xs font-bold leading-snug opacity-75">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="grid gap-2 border-t border-slate-200 bg-slate-50 p-3">
              <a
                href={business.phoneHref}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-red-600/20"
              >
                <Phone className="h-4 w-4" />
                <span className="whitespace-nowrap">
                  Call {business.phoneDisplay}
                </span>
              </a>
              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
