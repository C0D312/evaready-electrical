"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Phone } from "lucide-react";

export type FooterLink = {
  href: string;
  label: string;
  action?: "call" | "quote" | "email";
  ariaLabel?: string;
  quoteTrigger?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

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
    "aria-label": link.ariaLabel,
    "data-quote-trigger": link.quoteTrigger ? "true" : undefined,
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

export function FooterLinkGroups({ columns }: { columns: FooterColumn[] }) {
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
      {columns.map((column) => {
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
