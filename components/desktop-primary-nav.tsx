"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type PrimaryNavItem = {
  href: string;
  label: string;
  desktopClassName?: string;
  includeInMore?: boolean;
  compactOnlyInMore?: boolean;
};

function isCurrentRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopPrimaryNav({ items }: { items: PrimaryNavItem[] }) {
  const pathname = usePathname();
  const moreItems = items.filter((item) => item.includeInMore);
  const moreIsCurrent = moreItems.some((item) =>
    isCurrentRoute(pathname, item.href),
  );

  return (
    <nav className="ev-final-main-nav" aria-label="Primary navigation">
      {items.map((item) => {
        const current = isCurrentRoute(pathname, item.href);

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
