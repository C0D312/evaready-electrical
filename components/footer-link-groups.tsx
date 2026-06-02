"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Phone } from "lucide-react";
import { business } from "@/data/site";

export type FooterLink = {
  href: string;
  label: string;
  action?: "call" | "quote" | "email";
  quoteTrigger?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "Emergency Services",
    links: [
      { href: "/emergency-electrician-sydney", label: "Emergency electrician" },
      { href: "/electrical-faults", label: "Electrical fault guides" },
      { href: "/services/electrical-fault-finding-sydney", label: "Fault finding" },
      { href: "/services/safety-switch-rcd-installation-sydney", label: "Safety switches" },
      { href: "/services/storm-damage-electrician-sydney", label: "Storm damage" },
    ],
  },
  {
    title: "Level 2 Services",
    links: [
      { href: "/level-2-electrician-sydney", label: "Level 2 electrician" },
      { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
      { href: "/services/defect-notice-repairs-sydney", label: "Defect notices" },
      { href: "/services/metering-services-sydney", label: "Metering services" },
    ],
  },
  {
    title: "Popular Services",
    links: [
      { href: "/services/switchboard-upgrades-sydney", label: "Switchboard upgrades" },
      { href: "/services/commercial-electrician-sydney", label: "Commercial electrician" },
      { href: "/services/hot-water-system-electrician-sydney", label: "Hot water electrical" },
      { href: "/services/split-system-air-conditioning-sydney", label: "Air conditioning" },
      { href: "/services/cctv-security-camera-installation-sydney", label: "CCTV and security" },
    ],
  },
  {
    title: "Electrical Fault Guides",
    links: [
      { href: "/electrical-faults", label: "Fault help centre" },
      { href: "/electrical-faults/safety-switch-keeps-tripping", label: "Safety switch tripping" },
      { href: "/electrical-faults/burning-smell-from-switchboard", label: "Burning smell from switchboard" },
      { href: "/electrical-faults/no-power-to-house", label: "No power to house" },
    ],
  },
  {
    title: "Service Areas",
    links: [
      { href: "/service-areas", label: "All service areas" },
      { href: "/service-areas/sutherland-shire", label: "Sutherland Shire" },
      { href: "/service-areas/st-george-and-bayside", label: "St George and Bayside" },
      { href: "/service-areas/wollongong-and-illawarra", label: "Wollongong and Illawarra" },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        href: business.phoneHref,
        label: `Call ${business.phoneDisplay}`,
        action: "call",
      },
      {
        href: business.bookingUrl,
        label: business.quoteCta,
        action: "quote",
        quoteTrigger: true,
      },
      {
        href: business.emailHref,
        label: "Email",
        action: "email",
      },
    ],
  },
];

function toPanelId(title: string) {
  return `footer-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function ActionIcon({ action }: { action?: FooterLink["action"] }) {
  if (action === "call") {
    return <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />;
  }

  if (action === "quote") {
    return <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />;
  }

  if (action === "email") {
    return <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />;
  }

  return null;
}

function FooterNavLink({ link, isVisible }: { link: FooterLink; isVisible: boolean }) {
  const className = link.action
    ? `footer-action footer-action-${link.action}`
    : "footer-link";
  const commonProps = {
    "aria-haspopup": link.quoteTrigger ? "dialog" : undefined,
    "data-quote-trigger": link.quoteTrigger ? "true" : undefined,
    "data-conversion-action": link.quoteTrigger
      ? "quote-click"
      : link.href === business.phoneHref
        ? "phone-click"
        : undefined,
    "aria-label":
      link.action === "call"
        ? business.callCta
        : link.action === "quote"
          ? "Get a quote from Evaready Electrical"
          : link.action === "email"
            ? "Email Evaready Electrical"
            : undefined,
    className,
    tabIndex: isVisible ? 0 : -1,
  } as const;
  const children = (
    <>
      {link.action === "quote" ? null : <ActionIcon action={link.action} />}
      <span>{link.label}</span>
      {link.action === "quote" ? <ActionIcon action={link.action} /> : null}
    </>
  );

  if (link.href.startsWith("/") && !link.quoteTrigger) {
    return (
      <Link href={link.href} {...commonProps}>
        {children}
      </Link>
    );
  }

  return (
    <a href={link.href} {...commonProps}>
      {children}
    </a>
  );
}

export function FooterLinkGroups() {
  const [openPanel, setOpenPanel] = useState<string | null>(toPanelId("Contact"));
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateDesktopState = () => setIsDesktop(mediaQuery.matches);

    updateDesktopState();
    mediaQuery.addEventListener("change", updateDesktopState);

    return () => mediaQuery.removeEventListener("change", updateDesktopState);
  }, []);

  return (
    <nav aria-label="Footer navigation" className="footer-link-groups">
      {footerColumns.map((column) => {
        const panelId = toPanelId(column.title);
        const isOpen = isDesktop || openPanel === panelId;

        return (
          <section
            key={column.title}
            className={`footer-link-group ${isOpen ? "footer-link-group-open" : ""}`}
          >
            <button
              type="button"
              id={`${panelId}-button`}
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="footer-link-group-button"
              onClick={() => {
                if (!isDesktop) {
                  setOpenPanel(isOpen ? null : panelId);
                }
              }}
            >
              <span>{column.title}</span>
              <ChevronDown className="footer-link-group-icon h-4 w-4" aria-hidden="true" />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-button`}
              aria-hidden={!isOpen}
              className="footer-link-panel"
            >
              <ul className="footer-link-list">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    <FooterNavLink link={link} isVisible={isOpen} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </nav>
  );
}
