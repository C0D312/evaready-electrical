"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DeferredServiceAreaSearch } from "@/components/deferred-service-area-search";
import {
  getServiceNavigationLinks,
  serviceNavigationMenus,
  type ServiceNavigationMenuId,
} from "@/data/service-navigation";
import { assetPath } from "@/data/site";

export type PrimaryNavItem = {
  href: string;
  label: string;
  desktopClassName?: string;
  includeInMore?: boolean;
  compactOnlyInMore?: boolean;
  serviceMenuId?: ServiceNavigationMenuId;
};

function isCurrentRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isExactRoute(pathname: string, href: string) {
  return pathname === href || pathname === `${href}/`;
}

export function DesktopPrimaryNav({ items }: { items: PrimaryNavItem[] }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<ServiceNavigationMenuId | null>(
    null,
  );
  const navRef = useRef<HTMLElement>(null);
  const toggleRefs = useRef<
    Partial<Record<ServiceNavigationMenuId, HTMLButtonElement | null>>
  >({});
  const hoverTimerRef = useRef<number | null>(null);
  const moreItems = items.filter((item) => item.includeInMore);
  const moreIsCurrent = moreItems.some((item) =>
    isCurrentRoute(pathname, item.href),
  );

  function clearHoverTimer() {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }

  function openFromHover(menuId: ServiceNavigationMenuId) {
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      setOpenMenu(menuId);
      hoverTimerRef.current = null;
    }, 140);
  }

  function closeFromHover() {
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
      hoverTimerRef.current = null;
    }, 120);
  }

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!openMenu) {
      return;
    }

    const activeMenu = openMenu;

    function closeFromOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      ) {
        clearHoverTimer();
        setOpenMenu(null);
      }
    }

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      clearHoverTimer();
      setOpenMenu(null);
      window.requestAnimationFrame(() => {
        toggleRefs.current[activeMenu]?.focus();
      });
    }

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeWithEscape);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [openMenu]);

  return (
    <nav
      ref={navRef}
      className="ev-final-main-nav"
      aria-label="Primary navigation"
    >
      {items.map((item) => {
        const menu = item.serviceMenuId
          ? serviceNavigationMenus[item.serviceMenuId]
          : null;
        const overviewIsCurrent = isExactRoute(pathname, item.href);
        const current =
          overviewIsCurrent ||
          (item.serviceMenuId
            ? getServiceNavigationLinks(item.serviceMenuId).some((link) =>
                isCurrentRoute(pathname, link.href),
              )
            : false);

        if (menu && item.serviceMenuId) {
          const menuId = item.serviceMenuId;
          const expanded = openMenu === menuId;
          const panelId = `desktop-${menuId}-services-menu`;

          return (
            <div
              key={item.href}
              className={`ev-service-nav-dropdown ev-service-nav-dropdown--${menuId}`}
              onMouseEnter={() => openFromHover(menuId)}
              onMouseLeave={closeFromHover}
            >
              <Link
                href={item.href}
                onClick={() => setOpenMenu(null)}
                aria-current={overviewIsCurrent ? "page" : undefined}
                className={`ev-final-nav-link${
                  item.desktopClassName ? ` ${item.desktopClassName}` : ""
                }${current ? " ev-final-nav-link--current" : ""}`}
              >
                {item.label}
              </Link>
              <button
                ref={(element) => {
                  toggleRefs.current[menuId] = element;
                }}
                type="button"
                className="ev-service-nav-dropdown__toggle"
                aria-label={`${expanded ? "Close" : "Open"} ${item.label} menu`}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => {
                  clearHoverTimer();
                  setOpenMenu((currentMenu) =>
                    currentMenu === menuId ? null : menuId,
                  );
                }}
              >
                <ChevronDown aria-hidden="true" />
              </button>

              {expanded ? (
                <div
                  id={panelId}
                  className={`ev-service-nav-panel ev-service-nav-panel--${menuId}`}
                  role="region"
                  aria-label={`${item.label} services`}
                >
                  <div className="ev-service-nav-panel__heading">
                    <div>
                      <p className="ev-service-nav-panel__eyebrow">
                        {item.label}
                      </p>
                      <p className="ev-service-nav-panel__title">{menu.title}</p>
                      <p className="ev-service-nav-panel__description">
                        {menu.description}
                      </p>
                    </div>
                    <Link
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="ev-service-nav-panel__overview"
                    >
                      {menu.overviewLabel}
                    </Link>
                  </div>

                  {menu.search === "service-areas" ? (
                    <div className="ev-service-nav-panel__search">
                      <DeferredServiceAreaSearch
                        indexUrl={assetPath(
                          "/service-area-search-index.json",
                        )}
                        onResultNavigate={() => setOpenMenu(null)}
                        variant="navigation"
                      />
                    </div>
                  ) : null}

                  <div className="ev-service-nav-panel__grid">
                    {menu.sections.map((section) => (
                      <section
                        key={section.title}
                        className="ev-service-nav-panel__section"
                        aria-labelledby={`${panelId}-${section.title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")}`}
                      >
                        <p
                          id={`${panelId}-${section.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")}`}
                        >
                          {section.title}
                        </p>
                        <div className="ev-service-nav-panel__links">
                          {section.links.map((link) => {
                            const linkIsCurrent = isCurrentRoute(
                              pathname,
                              link.href,
                            );

                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpenMenu(null)}
                                aria-current={
                                  linkIsCurrent ? "page" : undefined
                                }
                                className={`ev-service-nav-panel__link${
                                  linkIsCurrent
                                    ? " ev-service-nav-panel__link--current"
                                    : ""
                                }`}
                              >
                                {link.label}
                              </Link>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={`ev-final-nav-link${item.desktopClassName ? ` ${item.desktopClassName}` : ""}${
              current ? " ev-final-nav-link--current" : ""
            }`}
          >
            {item.label}
          </Link>
        );
      })}

      {moreItems.length > 0 ? (
        <details
          className={`ev-final-nav-more${
            moreIsCurrent ? " ev-final-nav-more--current" : ""
          }`}
          onToggle={(event) => {
            if (event.currentTarget.open) {
              setOpenMenu(null);
            }
          }}
        >
          <summary>
            More
            <ChevronDown aria-hidden="true" />
          </summary>
          <div className="ev-final-nav-more__menu">
            {moreItems.map((item) => {
              const current = isCurrentRoute(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`ev-final-nav-more__link${
                    item.compactOnlyInMore
                      ? " ev-final-nav-more__link--compact-only"
                      : ""
                  }${current ? " ev-final-nav-more__link--current" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </details>
      ) : null}
    </nav>
  );
}
