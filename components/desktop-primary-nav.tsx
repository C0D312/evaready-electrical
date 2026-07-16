"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type PrimaryNavItem = {
  href: string;
  label: string;
};

function isCurrentRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopPrimaryNav({ items }: { items: PrimaryNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="ev-final-main-nav" aria-label="Primary navigation">
      {items.map((item) => {
        const current = isCurrentRoute(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={`ev-final-nav-link${current ? " ev-final-nav-link--current" : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
