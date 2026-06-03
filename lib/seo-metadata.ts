import type { Metadata } from "next";
import type { ElectricalFaultPage } from "../data/electrical-faults";
import type {
  CoverageArea,
  CoverageRegion,
  CoverageSuburb,
  SuburbPageCopy,
} from "../data/service-area-coverage";
import type { ServiceLandingPage } from "../data/service-pages";
import { absoluteUrl, business } from "../data/site";

export const sitemapLastModified = new Date("2026-06-01T00:00:00+10:00");

export type RouteSeoMetadata = {
  canonical: string;
  description: string;
  path: string;
  title: string;
};

const maxTitleLength = 65;
const maxDescriptionLength = 160;

export function clampDescription(description: string) {
  if (description.length <= maxDescriptionLength) {
    return description;
  }

  const trimmed = description.slice(0, maxDescriptionLength - 3).trimEnd();
  const lastSpace = trimmed.lastIndexOf(" ");
  const shortened = trimmed
    .slice(0, lastSpace > 120 ? lastSpace : trimmed.length)
    .replace(/[,\s;:]+$/, "")
    .replace(/\b(?:and|or|for|with)$/i, "")
    .trimEnd()
    .replace(/\.+$/, "");

  return `${shortened}.`;
}

export function chooseTitle(candidates: string[]) {
  const cleaned = candidates
    .map((candidate) => candidate.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return (
    cleaned.find((candidate) => candidate.length <= maxTitleLength) ??
    cleaned[cleaned.length - 1] ??
    business.name
  );
}

export function routeUrl(path: string) {
  return !path || path === "/" ? business.siteUrl : absoluteUrl(path);
}

export function toMetadata({
  canonical,
  description,
  title,
}: RouteSeoMetadata): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [absoluteUrl(business.brandImage)],
    },
  };
}

function stripSurroundingRegions(value: string) {
  return value
    .replace(/\s*&\s*Surrounding Regions\b/g, "")
    .replace(/\s+and surrounding regions\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function homeSeoMetadata(): RouteSeoMetadata {
  const path = "/";

  return {
    path,
    canonical: routeUrl(path),
    title: "Emergency & Level 2 Electrician Sydney | 60-Min Response",
    description: clampDescription(
      "Emergency electrician in Sydney with 60-minute core response, 90-minute greater region response and accredited Level 2 ASP support.",
    ),
  };
}

export function servicesIndexSeoMetadata(): RouteSeoMetadata {
  const path = "/services";

  return {
    path,
    canonical: routeUrl(path),
    title: "Electrical Services Sydney & Surrounding Regions",
    description: clampDescription(
      "Electrical services across Sydney and surrounding regions for emergency faults, Level 2 work, switchboards, hot water, aircon, CCTV and data.",
    ),
  };
}

export function emergencySeoMetadata(): RouteSeoMetadata {
  const path = "/emergency-electrician-sydney";

  return {
    path,
    canonical: routeUrl(path),
    title: "Emergency Electrician Sydney | 60-Min Response",
    description: clampDescription(
      "Call Evaready for emergency electrical faults in Sydney. 60-minute core response, 90 minutes for greater regions. Power loss and sparking.",
    ),
  };
}

export function level2SeoMetadata(): RouteSeoMetadata {
  const path = "/level-2-electrician-sydney";

  return {
    path,
    canonical: routeUrl(path),
    title: "Level 2 Electrician Sydney | Accredited ASP",
    description: clampDescription(
      "Ausgrid & Endeavour Energy accredited Level 2 ASP for consumer mains, defect notices, metering and supply-side electrical work in Sydney.",
    ),
  };
}

export function switchboardSeoMetadata(): RouteSeoMetadata {
  const path = "/services/switchboard-upgrades-sydney";

  return {
    path,
    canonical: routeUrl(path),
    title: "Switchboard Upgrades Sydney | Safety Switches",
    description: clampDescription(
      "Switchboard upgrades in Sydney for safety switches, RCBOs, ceramic fuse replacement, burnt wiring checks and electrical capacity planning.",
    ),
  };
}

export function faultsIndexSeoMetadata(): RouteSeoMetadata {
  const path = "/electrical-faults";

  return {
    path,
    canonical: routeUrl(path),
    title: "Electrical Faults Sydney & Surrounding Regions",
    description: clampDescription(
      "Electrical fault help in Sydney for tripping safety switches, burning smells, no power, sparking power points, hot outlets and storm damage.",
    ),
  };
}

export function serviceAreaIndexSeoMetadata(): RouteSeoMetadata {
  const path = "/service-areas";

  return {
    path,
    canonical: routeUrl(path),
    title: "Electrician Service Areas Sydney | Emergency & Level 2",
    description: clampDescription(
      "Search Evaready Electrical service areas across Sydney suburbs and surrounding regions for urgent faults, Level 2 work and planned electrical jobs.",
    ),
  };
}

export function servicePageSeoMetadata(
  service: ServiceLandingPage,
): RouteSeoMetadata {
  const path = `/services/${service.slug}`;
  const shortenedTitle = service.metaTitle
    .replace("Sydney & Surrounding Regions", "Sydney")
    .replace("Sydney and Surrounding Regions", "Sydney");

  return {
    path,
    canonical: routeUrl(path),
    title: chooseTitle([
      service.metaTitle,
      shortenedTitle,
      `${stripSurroundingRegions(service.title)} Sydney`,
      service.title,
    ]),
    description: clampDescription(service.metaDescription),
  };
}

export function faultPageSeoMetadata(
  fault: ElectricalFaultPage,
): RouteSeoMetadata {
  const path = `/electrical-faults/${fault.slug}`;

  return {
    path,
    canonical: routeUrl(path),
    title: chooseTitle([
      fault.metaTitle,
      fault.metaTitle.replace("Sydney & Surrounding Regions", "Sydney"),
      `${fault.title} Sydney`,
    ]),
    description: clampDescription(fault.metaDescription),
  };
}

export function regionSeoMetadata(region: CoverageRegion): RouteSeoMetadata {
  const path = `/service-areas/${region.slug}`;

  return {
    path,
    canonical: routeUrl(path),
    title: chooseTitle([
      `${region.name} Electrician | Emergency & Level 2`,
      `${region.name} Electrician | Level 2 & Emergency`,
      `${region.name} Electrician`,
    ]),
    description: clampDescription(
      `Need an electrician in ${region.name}? Evaready helps with urgent faults, Level 2 work, switchboards, consumer mains, defect notices and planned electrical jobs.`,
    ),
  };
}

export function areaSeoMetadata(
  region: CoverageRegion,
  area: CoverageArea,
): RouteSeoMetadata {
  const path = `/service-areas/${region.slug}/${area.slug}`;

  return {
    path,
    canonical: routeUrl(path),
    title: chooseTitle([
      `${area.name} Electrician | ${region.name}`,
      `${area.name} Electrician | Emergency & Level 2`,
      `${area.name} Electrician`,
    ]),
    description: clampDescription(
      `Need an electrician in ${area.name}? Evaready helps with urgent faults, Level 2 work, switchboards, consumer mains, defect notices and planned electrical jobs across ${region.name}.`,
    ),
  };
}

export function suburbSeoMetadata(
  region: CoverageRegion,
  area: CoverageArea,
  suburb: CoverageSuburb,
  copy: SuburbPageCopy,
): RouteSeoMetadata {
  const path = `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`;

  return {
    path,
    canonical: routeUrl(path),
    title: chooseTitle([
      `Electrician ${suburb.name} ${suburb.postcode} | Emergency & Level 2`,
      `Electrician ${suburb.name} ${suburb.postcode} | Level 2 & Emergency`,
      `Electrician ${suburb.name} ${suburb.postcode}`,
    ]),
    description: clampDescription(copy.metaDescription),
  };
}

export function legalSeoMetadata(
  path: "/privacy-policy" | "/terms",
): RouteSeoMetadata {
  const isPrivacy = path === "/privacy-policy";

  return {
    path,
    canonical: routeUrl(path),
    title: isPrivacy
      ? `Privacy Policy | ${business.name}`
      : `Terms | ${business.name}`,
    description: isPrivacy
      ? "Privacy information for Evaready Electrical enquiries, quote requests and customer contact details."
      : "General website and service terms for Evaready Electrical enquiries, quotes and bookings.",
  };
}
