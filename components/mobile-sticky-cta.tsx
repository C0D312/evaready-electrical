"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/data/site";

export function MobileStickyCta() {
  const pathname = usePathname();

  // A new route must be measured before its fixed controls can appear.
  return <ObservedMobileStickyCta key={pathname} />;
}

function ObservedMobileStickyCta() {
  const [visible, setVisible] = useState(false);
  const mobileCallLabel = `Call ${business.phoneDisplay}`;

  useEffect(() => {
    if (typeof window.IntersectionObserver !== "function") {
      return;
    }
    const guards = document.querySelectorAll(
      "[data-mobile-sticky-cta-guard], .home-brand-hero, [data-site-footer]",
    );
    if (guards.length === 0) return;

    const pending = new Set(guards);
    const intersecting = new Set<Element>();
    let active = true;
    let observer: IntersectionObserver | undefined;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (!active) return;
          for (const entry of entries) {
            pending.delete(entry.target);
            if (entry.isIntersecting) intersecting.add(entry.target);
            else intersecting.delete(entry.target);
          }
          setVisible(pending.size === 0 && intersecting.size === 0);
        },
        { threshold: 0 },
      );
      for (const guard of guards) observer.observe(guard);
    } catch {
      active = false;
      observer?.disconnect();
      return;
    }
    return () => {
      active = false;
      observer?.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-label="Mobile contact actions"
      className="mobile-sticky-cta"
      role="navigation"
    >
      <a
        href={business.phoneHref}
        data-conversion-action="phone-click"
        aria-label={business.callCta}
        title={business.callCta}
        className="mobile-sticky-cta__link mobile-sticky-cta__call"
      >
        <Phone aria-hidden="true" />
        <span>{mobileCallLabel}</span>
      </a>
      <a
        href={business.bookingUrl}
        data-quote-trigger="true"
        data-conversion-action="quote-click"
        aria-haspopup="dialog"
        aria-label="Get a quote from Evaready Electrical"
        className="mobile-sticky-cta__link mobile-sticky-cta__quote"
      >
        <span>{business.quoteCta}</span>
        <ArrowRight aria-hidden="true" />
      </a>
    </div>
  );
}
