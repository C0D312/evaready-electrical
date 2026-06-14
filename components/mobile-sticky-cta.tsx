"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/data/site";

export function MobileStickyCta() {
  const [footerVisible, setFooterVisible] = useState(false);
  const [homeHeroVisible, setHomeHeroVisible] = useState(false);

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

  useEffect(() => {
    const homeHero = document.querySelector(".home-brand-hero");

    if (!homeHero || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHomeHeroVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.01 },
    );

    observer.observe(homeHero);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-label="Mobile contact actions"
      className={`mobile-sticky-cta${
        footerVisible ? " mobile-sticky-cta--footer-visible" : ""
      }${
        homeHeroVisible ? " mobile-sticky-cta--home-hero-visible" : ""
      }`}
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
        <span>{business.callCta}</span>
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
