"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function scrollToPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function RouteScrollManager() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    scrollToPageTop();

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      scrollToPageTop();
      secondFrame = window.requestAnimationFrame(scrollToPageTop);
    });
    const settledTimer = window.setTimeout(scrollToPageTop, 120);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(settledTimer);
    };
  }, [pathname]);

  return null;
}
