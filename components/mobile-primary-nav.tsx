"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  BatteryCharging,
  Bolt,
  ChevronDown,
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
  type LucideIcon,
} from "lucide-react";
import { DeferredServiceAreaSearch } from "@/components/deferred-service-area-search";
import { HomeNavigationLink } from "@/components/home-navigation-link";
import { requestQuoteFormOpen } from "@/components/quote-form-events";
import {
  getServiceNavigationLinks,
  serviceNavigationMenus,
  type ServiceNavigationMenuId,
} from "@/data/service-navigation";
import { assetPath, business } from "@/data/site";

type ScrollLockSnapshot = {
  scrollX: number;
  scrollY: number;
  htmlOverflow: string;
  htmlOverscrollBehavior: string;
  htmlScrollBehavior: string;
  bodyOverflow: string;
  bodyOverscrollBehavior: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
};

type MobileNavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
  serviceMenuId?: ServiceNavigationMenuId;
};

const mobileNavItems: MobileNavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/emergency-electrician-sydney",
    label: "Emergency Electrician",
    icon: Flame,
    serviceMenuId: "emergency",
  },
  {
    href: "/level-2-electrician-sydney",
    label: "Level 2 Electrician",
    icon: Bolt,
    serviceMenuId: "level-2",
  },
  {
    href: "/services",
    label: "Electrical Services",
    icon: Wrench,
    serviceMenuId: "services",
  },
  {
    href: "/services/hot-water-system-electrician-sydney",
    label: "Hot Water",
    icon: Droplets,
    serviceMenuId: "hot-water",
  },
  {
    href: "/services/split-system-air-conditioning-sydney",
    label: "Aircon",
    icon: Snowflake,
    serviceMenuId: "aircon",
  },
  {
    href: "/solar-batteries",
    label: "Solar & Batteries",
    icon: BatteryCharging,
    serviceMenuId: "solar-batteries",
  },
  {
    href: "/service-areas",
    label: "Service Areas",
    icon: MapPin,
    serviceMenuId: "service-areas",
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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] =
    useState<ServiceNavigationMenuId | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const openRef = useRef(false);
  const menuHistoryPushedRef = useRef(false);
  const historyCloseFallbackRef = useRef<number | null>(null);

  const removeMobileMenuHistoryMarker = useCallback(() => {
    if (window.history.state?.mobileMenu !== true) {
      return;
    }

    const nextState = { ...window.history.state };
    delete nextState.mobileMenu;
    window.history.replaceState(nextState, "", window.location.href);
  }, []);

  const finishClose = useCallback(() => {
    if (historyCloseFallbackRef.current !== null) {
      window.clearTimeout(historyCloseFallbackRef.current);
      historyCloseFallbackRef.current = null;
    }

    openRef.current = false;
    menuHistoryPushedRef.current = false;
    setOpen(false);
    setOpenGroup(null);
  }, []);

  const closeMenu = useCallback(
    (syncHistory = true) => {
      if (!openRef.current) {
        return;
      }

      const shouldStepBack =
        syncHistory &&
        menuHistoryPushedRef.current &&
        window.history.state?.mobileMenu === true;

      if (shouldStepBack) {
        historyCloseFallbackRef.current = window.setTimeout(() => {
          historyCloseFallbackRef.current = null;
          removeMobileMenuHistoryMarker();
          finishClose();
        }, 300);
        window.history.back();
        return;
      }

      if (!syncHistory) {
        removeMobileMenuHistoryMarker();
      }
      finishClose();
    },
    [finishClose, removeMobileMenuHistoryMarker],
  );

  const openMenu = useCallback(() => {
    if (openRef.current) {
      return;
    }

    if (window.history.state?.mobileMenu !== true) {
      const currentState =
        window.history.state && typeof window.history.state === "object"
          ? window.history.state
          : {};

      window.history.pushState(
        { ...currentState, mobileMenu: true },
        "",
        window.location.href,
      );
    }

    menuHistoryPushedRef.current = true;
    openRef.current = true;
    setOpen(true);
  }, []);

  const openQuoteFromMenu = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const opener = triggerRef.current ?? event.currentTarget;
      const currentState =
        window.history.state && typeof window.history.state === "object"
          ? window.history.state
          : {};
      const canReuseMenuEntry =
        menuHistoryPushedRef.current && currentState.mobileMenu === true;

      if (canReuseMenuEntry) {
        const nextState = { ...currentState, quoteModal: true };
        delete nextState.mobileMenu;
        window.history.replaceState(nextState, "", window.location.href);
      } else {
        removeMobileMenuHistoryMarker();
      }

      finishClose();
      requestQuoteFormOpen(opener, {
        historyEntryPrepared: canReuseMenuEntry,
      });
    },
    [finishClose, removeMobileMenuHistoryMarker],
  );

  useEffect(() => {
    if (!openRef.current) {
      removeMobileMenuHistoryMarker();
    }

    function closeOnPopState() {
      if (!openRef.current) {
        return;
      }

      finishClose();
    }

    window.addEventListener("popstate", closeOnPopState);

    return () => {
      window.removeEventListener("popstate", closeOnPopState);
      if (historyCloseFallbackRef.current !== null) {
        window.clearTimeout(historyCloseFallbackRef.current);
        historyCloseFallbackRef.current = null;
      }
    };
  }, [finishClose, removeMobileMenuHistoryMarker]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const trigger = triggerRef.current;
    const snapshot: ScrollLockSnapshot = {
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      htmlOverflow: html.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      htmlScrollBehavior: html.style.scrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    };

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    html.style.scrollBehavior = "auto";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${snapshot.scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.classList.add("mobile-menu-open");

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
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
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.scrollTo({ top: 0 });
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      html.style.overflow = snapshot.htmlOverflow;
      html.style.overscrollBehavior = snapshot.htmlOverscrollBehavior;
      html.style.scrollBehavior = "auto";
      body.style.overflow = snapshot.bodyOverflow;
      body.style.overscrollBehavior = snapshot.bodyOverscrollBehavior;
      body.style.position = snapshot.bodyPosition;
      body.style.top = snapshot.bodyTop;
      body.style.left = snapshot.bodyLeft;
      body.style.right = snapshot.bodyRight;
      body.style.width = snapshot.bodyWidth;
      body.classList.remove("mobile-menu-open");
      window.scrollTo(snapshot.scrollX, snapshot.scrollY);
      trigger?.focus({ preventScroll: true });
      window.requestAnimationFrame(() => {
        window.scrollTo(snapshot.scrollX, snapshot.scrollY);
        html.style.scrollBehavior = snapshot.htmlScrollBehavior;
      });
    };
  }, [closeMenu, open]);

  const menuOverlay = open ? (
    <div className="mobile-site-menu-overlay fixed inset-0 z-[90]">
      <button
        type="button"
        aria-label="Close navigation menu"
        className="absolute inset-0 bg-[#061E72]/55"
        onClick={() => closeMenu()}
      />

      <nav
        id="mobile-site-menu"
        aria-label="Mobile navigation"
        ref={panelRef}
        className="mobile-site-menu-panel absolute inset-x-3 top-3 max-h-[calc(100dvh_-_24px)] overflow-y-auto rounded-xl border border-cyan-300/25 bg-[#06142f] pb-[env(safe-area-inset-bottom)] text-white shadow-2xl shadow-blue-950/50"
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
            onClick={() => closeMenu()}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-2 p-3">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const menu = item.serviceMenuId
              ? serviceNavigationMenus[item.serviceMenuId]
              : null;
            const overviewIsCurrent =
              pathname === item.href || pathname === `${item.href}/`;
            const current =
              overviewIsCurrent ||
              (item.serviceMenuId
                ? getServiceNavigationLinks(item.serviceMenuId).some(
                    (link) =>
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`),
                  )
                : false);
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

            if (menu && item.serviceMenuId) {
              const menuId = item.serviceMenuId;
              const expanded = openGroup === menuId;
              const panelId = `mobile-${menuId}-services-menu`;

              return (
                <div
                  key={item.href}
                  className={`mobile-service-nav-group${
                    current ? " mobile-service-nav-group--current" : ""
                  }`}
                >
                  <div className="mobile-service-nav-group__primary">
                    <Link
                      href={item.href}
                      replace
                      onClick={() => closeMenu(false)}
                      className="mobile-service-nav-group__overview"
                      aria-current={overviewIsCurrent ? "page" : undefined}
                    >
                      {content}
                    </Link>
                    <button
                      type="button"
                      className="mobile-service-nav-group__toggle"
                      aria-label={`${expanded ? "Close" : "Open"} ${
                        item.label
                      } menu`}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenGroup((currentGroup) =>
                          currentGroup === menuId ? null : menuId,
                        )
                      }
                    >
                      <ChevronDown aria-hidden="true" />
                    </button>
                  </div>

                  {expanded ? (
                    <div
                      id={panelId}
                      className="mobile-service-nav-group__panel"
                    >
                      <p className="mobile-service-nav-group__description">
                        {menu.description}
                      </p>
                      {menu.search === "service-areas" ? (
                        <DeferredServiceAreaSearch
                          indexUrl={assetPath(
                            "/service-area-search-index.json",
                          )}
                          onResultNavigate={() => closeMenu(false)}
                          variant="navigation"
                        />
                      ) : null}
                      {menu.sections.map((section) => (
                        <section
                          key={section.title}
                          className="mobile-service-nav-group__section"
                        >
                          <p>{section.title}</p>
                          <div>
                            {section.links.map((link) => {
                              const linkIsCurrent =
                                pathname === link.href ||
                                pathname.startsWith(`${link.href}/`);

                              return (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  replace
                                  onClick={() => closeMenu(false)}
                                  aria-current={
                                    linkIsCurrent ? "page" : undefined
                                  }
                                  className={
                                    linkIsCurrent
                                      ? "mobile-service-nav-group__link mobile-service-nav-group__link--current"
                                      : "mobile-service-nav-group__link"
                                  }
                                >
                                  {link.label}
                                </Link>
                              );
                            })}
                          </div>
                        </section>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            return item.href === "/" ? (
              <HomeNavigationLink
                key={item.href}
                replace
                onClick={() => closeMenu(false)}
                className={className}
                aria-current={current ? "page" : undefined}
              >
                {content}
              </HomeNavigationLink>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                replace
                onClick={() => closeMenu(false)}
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
            onClick={() => closeMenu()}
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
            onClick={openQuoteFromMenu}
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
        onClick={() => {
          if (open) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
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
