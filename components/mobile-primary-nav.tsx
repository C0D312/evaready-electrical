"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Bolt,
  Flame,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
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
    href: "/service-areas",
    label: "Service Areas",
    icon: MapPin,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
  },
];

export function MobilePrimaryNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const panel = panelRef.current;

      if (!panel) {
        return;
      }

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      const first = focusable.at(0);
      const last = focusable.at(-1);

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a, button")?.focus(), 0);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const menuOverlay = open ? (
    <div className="mobile-site-menu-overlay fixed inset-x-0 bottom-0 z-[90]">
      <button
        type="button"
        aria-label="Close navigation menu"
        className="absolute inset-0 bg-[#061E72]/55"
        onClick={() => setOpen(false)}
      />

      <nav
        id="mobile-site-menu"
        aria-label="Mobile navigation"
        ref={panelRef}
        className="absolute inset-x-3 top-3 max-h-[calc(100dvh_-_84px_-_env(safe-area-inset-top))] overflow-y-auto rounded-xl border border-cyan-300/25 bg-[#06142f] pb-[env(safe-area-inset-bottom)] text-white shadow-2xl shadow-blue-950/50 sm:max-h-[calc(100dvh_-_108px_-_env(safe-area-inset-top))]"
      >
        <div className="flex items-center justify-between border-b border-cyan-300/20 px-4 py-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-100">
              Menu
            </p>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-50"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-2 p-3">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const current =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const className = `flex min-h-12 items-center gap-3 rounded-lg border px-4 py-3 text-left font-bold text-white shadow-sm transition hover:border-cyan-200 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ${
              current
                ? "border-cyan-200/60 bg-cyan-300/15"
                : "border-cyan-300/20 bg-white/[0.055]"
            }`;
            const content = (
              <>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
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
                aria-current={current ? "page" : undefined}
              >
                {content}
              </HomeNavigationLink>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={className}
                aria-current={current ? "page" : undefined}
              >
                {content}
              </Link>
            );
          })}
        </div>

        <div className="grid gap-2 border-t border-cyan-300/20 bg-black/20 p-3">
          <a
            href={business.phoneHref}
            data-conversion-action="phone-click"
            aria-label={business.callCta}
            onClick={() => setOpen(false)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20"
          >
            <Phone className="h-4 w-4" />
            <span className="whitespace-nowrap">
              {business.callCta}
            </span>
          </a>
          <a
            href={business.bookingUrl}
            data-quote-trigger="true"
            data-conversion-action="quote-click"
            aria-haspopup="dialog"
            aria-label="Get a quote from Evaready Electrical"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20"
          >
            {business.quoteCta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </div>
  ) : null;

  return (
    <div className="mobile-nav-trigger shrink-0 lg:hidden">
      <button
        type="button"
        ref={triggerRef}
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
