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
import {
  clampMetaDescription,
  maxMetaDescriptionLength,
} from "./meta-description";

export type RouteSeoMetadata = {
  canonical: string;
  description: string;
  path: string;
  title: string;
};

const maxTitleLength = 65;
export function clampDescription(description: string) {
  return clampMetaDescription(description, maxMetaDescriptionLength);
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
  return absoluteUrl(path || "/");
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
    title: "Emergency Electrician & Level 2 Electrician Sydney",
    description: clampDescription(
      "Call for emergency faults or request quotes for Level 2, switchboards and general electrical work across Sydney and surrounding regions.",
    ),
  };
}

export function servicesIndexSeoMetadata(): RouteSeoMetadata {
  const path = "/services";

  return {
    path,
    canonical: routeUrl(path),
    title: "Electrical Services Sydney | Emergency, Level 2 & Switchboards",
    description: clampDescription(
      "Licensed electrical services for emergency faults, Level 2, switchboards, homes, businesses and strata across Sydney and surrounding regions.",
    ),
  };
}

export function solarBatteriesSeoMetadata(): RouteSeoMetadata {
  const path = "/solar-batteries/";

  return {
    path,
    canonical: routeUrl(path),
    title: "Solar & Battery Electrical Support Sydney | Evaready",
    description: clampDescription(
      "Electrical support for solar and batteries across Sydney, including switchboard capacity, consumer mains, metering, load checks and backup circuits.",
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
      "Call Evaready for urgent electrical faults in Sydney and surrounding regions. 60-minute core response and 60–90 minutes in selected outer regions.",
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
      "Level 2 ASP in Sydney and surrounding regions for consumer mains, defect notices, metering, point of attachment and supply work.",
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
      "Electrical fault help in Sydney for tripping safety switches and burning smells, no power, sparking power points, overheating power points and storm damage.",
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
      "Find your suburb for emergency electrician, Level 2 and planned electrical help across Sydney and surrounding regions. Call first or get a quote.",
    ),
  };
}

export function aboutSeoMetadata(): RouteSeoMetadata {
  const path = "/about";

  return {
    path,
    canonical: routeUrl(path),
    title: "About Evaready Electrical | Sydney Electrician",
    description: clampDescription(
      "Learn about Evaready Electrical, a licensed Sydney electrician for emergency faults, Level 2 support and planned work across surrounding regions.",
    ),
  };
}

export function contactSeoMetadata(): RouteSeoMetadata {
  const path = "/contact";

  return {
    path,
    canonical: routeUrl(path),
    title: "Contact Evaready Electrical | Sydney Electrician",
    description: clampDescription(
      "Contact Evaready Electrical to call for urgent faults or get a quote for planned electrical work across Sydney and surrounding regions.",
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

