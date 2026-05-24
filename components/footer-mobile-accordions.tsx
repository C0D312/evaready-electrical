"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FooterLink = {
  href: string;
  label: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

function toPanelId(title: string) {
  return `footer-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function FooterMobileAccordions({
  columns,
}: {
  columns: FooterColumn[];
}) {
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  return (
    <div className="footer-mobile-accordions md:hidden">
      {columns.map((column) => {
        const panelId = toPanelId(column.title);
        const isOpen = openPanel === panelId;

        return (
          <section key={column.title} className="footer-mobile-accordion">
            <button
              type="button"
              id={`${panelId}-button`}
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="footer-mobile-accordion-button"
              onClick={() => setOpenPanel(isOpen ? null : panelId)}
            >
              <span>{column.title}</span>
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-button`}
              aria-hidden={!isOpen}
              className={`footer-mobile-accordion-panel ${
                isOpen ? "footer-mobile-accordion-panel-open" : ""
              }`}
            >
              <div className="grid gap-1.5 pb-2 pt-1">
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    tabIndex={isOpen ? 0 : -1}
                    className="footer-link footer-mobile-accordion-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
