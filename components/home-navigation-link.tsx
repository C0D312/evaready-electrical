"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type HomeNavigationLinkProps = Omit<
  ComponentProps<typeof Link>,
  "href" | "onClick"
> & {
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function normalisePath(path: string) {
  const withoutTrailingSlash = path.replace(/\/+$/, "");
  return withoutTrailingSlash || "/";
}

function isHomePath(path: string) {
  const normalised = normalisePath(path);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH
    ? normalisePath(process.env.NEXT_PUBLIC_BASE_PATH)
    : "";

  return normalised === "/" || Boolean(basePath && normalised === basePath);
}

function homeBrowserPath() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/+$/, "") ?? "";
  return `${basePath}/`;
}

function jumpToTopInstantly() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

export function HomeNavigationLink({
  onClick,
  scroll = true,
  ...props
}: HomeNavigationLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    const browserIsHome =
      typeof window !== "undefined" && isHomePath(window.location.pathname);
    const routeIsHome = isHomePath(pathname);

    if (!browserIsHome && !routeIsHome) {
      return;
    }

    event.preventDefault();
    window.history.replaceState(null, "", homeBrowserPath());
    jumpToTopInstantly();
  }

  return <Link href="/" scroll={scroll} onClick={handleClick} {...props} />;
}
