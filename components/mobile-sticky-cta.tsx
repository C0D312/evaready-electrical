"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/data/site";

export function MobileStickyCta() {
  const [footerVisible, setFooterVisible] = useState(false);
  const [homeHeroVisible, setHomeHeroVisible] = useState(false);
  const mobileCallLabel = `Call ${business.phoneDisplay}`;

  useEffect(() => {
    const footer = document.querySelector("[data-site-footer]");

    if (!footer || !("IntersectionObserver" in window)) {
      return;
    }

    let frame = 0;
    const updateFooterVisibility = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const footerRect = footer.getBoundingClientRect();
        setFooterVisible(
          footerRect.top < window.innerHeight - 8 && footerRect.bottom > 0,
        );
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -72px 0px", threshold: 0.01 },
    );

    observer.observe(footer);
    updateFooterVisibility();
    window.addEventListener("scroll", updateFooterVisibility, { passive: true });
    window.addEventListener("resize", updateFooterVisibility);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateFooterVisibility);
      window.removeEventListener("resize", updateFooterVisibility);
    };
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
