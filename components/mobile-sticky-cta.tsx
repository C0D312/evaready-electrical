"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { business } from "@/data/site";

export function MobileStickyCta() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("[data-site-footer]");

    if (!footer || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -72px 0px", threshold: 0.01 },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={business.phoneHref}
      aria-label={`Call now ${business.phoneDisplay}`}
      title={`Call now ${business.phoneDisplay}`}
      className={`floating-call-button${
        footerVisible ? " floating-call-button--footer-visible" : ""
      }`}
    >
      <Phone />
      <span className="sr-only">{business.callCta}</span>
    </a>
  );
}
