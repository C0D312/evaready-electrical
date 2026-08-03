import {
  absoluteUrl,
  approvedBusinessClaims,
  business,
  services,
} from "@/data/site";

type SchemaValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | SchemaValue[]
  | { [key: string]: SchemaValue };

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type FaqItem = {
  answer: string;
  question: string;
};

export type ServiceSchemaOptions = {
  areaServed?: SchemaValue;
  description: string;
  id?: string;
  name: string;
  offerNames?: string[];
  path: string;
  providerId?: string;
  serviceType?: string | string[];
};

export type ElectricianSchemaOptions = {
  areaServed?: SchemaValue;
  description?: string;
  id?: string;
  name?: string;
  offerNames?: string[];
  serviceTypes?: string[];
  urgentCalls24Seven?: boolean;
  url?: string;
};

export type DirectoryCollectionItem = {
  children?: DirectoryCollectionItem[];
  description?: string;
  name: string;
  path: string;
};

export type CollectionPageSchemaOptions = {
  description: string;
  items: DirectoryCollectionItem[];
  name: string;
  path: string;
};

const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const defaultAreaServed = [
  { "@type": "City", name: "Sydney" },
  { "@type": "AdministrativeArea", name: "Sydney & Surrounding Regions" },
];

export const businessSchemaId = `${absoluteUrl("/")}#evaready-electrical`;

export function schemaJson(schema: SchemaValue) {
  return {
    __html: JSON.stringify(cleanSchema(schema)).replace(/</g, "\\u003c"),
  };
}

export function businessIdentifiers() {
  return [
    {
      "@type": "PropertyValue",
      name: approvedBusinessClaims.credentials.electricalLicence.label,
      value: business.licence,
    },
    {
      "@type": "PropertyValue",
      name: "ABN",
      value: business.abn,
    },
    {
      "@type": "PropertyValue",
      name: approvedBusinessClaims.credentials.openCabler.label,
      value: business.openCablerRegistration,
    },
    {
      "@type": "PropertyValue",
      name: approvedBusinessClaims.credentials.arctick.label,
      value: business.arctickLicence,
    },
  ];
}

export function buildBreadcrumbSchema(
  items: BreadcrumbItem[],
  idPath?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": idPath ? `${absoluteUrl(idPath)}#breadcrumb` : undefined,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildContactPointSchema(idPath = "/contact") {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    "@id": `${absoluteUrl(idPath)}#contact`,
    telephone: business.phoneDisplay,
    email: business.email,
    contactType: "Electrical enquiries and urgent fault calls",
    areaServed: business.serviceArea,
    availableLanguage: "English",
    url: absoluteUrl(idPath),
  };
}

export function buildFaqSchema(faqs: FaqItem[], idPath?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": idPath ? `${absoluteUrl(idPath)}#faq` : undefined,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildElectricianSchema({
  areaServed = defaultAreaServed,
  description,
  id = businessSchemaId,
  name = business.name,
  offerNames,
  serviceTypes,
  urgentCalls24Seven = false,
  url = absoluteUrl("/"),
}: ElectricianSchemaOptions = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": id,
    name,
    legalName: business.legalName,
    description,
    url,
    telephone: business.phoneDisplay,
    email: business.email,
    image: [absoluteUrl(business.brandImage), absoluteUrl(business.heroImage)],
    logo: absoluteUrl(business.logoImage),
    sameAs: [business.googleBusinessProfileUrl],
    taxID: business.abn,
    areaServed,
    identifier: businessIdentifiers(),
    serviceType: serviceTypes,
    contactPoint: urgentCalls24Seven
      ? {
          "@type": "ContactPoint",
          telephone: business.phoneDisplay,
          contactType: "Urgent electrical fault calls",
          areaServed: business.serviceArea,
          availableLanguage: "English",
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: allDays,
            opens: "00:00",
            closes: "23:59",
          },
          description: approvedBusinessClaims.availability.qualification,
        }
      : undefined,
    makesOffer: offerNames?.map((offerName) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: offerName,
      },
    })),
  };
}

export function buildServiceSchema({
  areaServed = business.serviceArea,
  description,
  id,
  name,
  offerNames,
  path,
  providerId = businessSchemaId,
  serviceType = name,
}: ServiceSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": id ?? `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    areaServed,
    url: absoluteUrl(path),
    provider: {
      "@id": providerId,
      "@type": "Electrician",
      name: business.name,
      telephone: business.phoneDisplay,
      email: business.email,
      url: absoluteUrl("/"),
    },
    hasOfferCatalog: offerNames
      ? {
          "@type": "OfferCatalog",
          name: `${name} services`,
          itemListElement: offerNames.map((offerName) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: offerName,
            },
          })),
        }
      : undefined,
  };
}

export function buildCollectionPageSchema({
  description,
  items,
  name,
  path,
}: CollectionPageSchemaOptions) {
  const buildListItem = (item: DirectoryCollectionItem, index: number) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.path),
    item: {
      "@type": "WebPage",
      name: item.name,
      description: item.description,
      url: absoluteUrl(item.path),
      hasPart: item.children?.map((child) => ({
        "@type": "WebPage",
        name: child.name,
        description: child.description,
        url: absoluteUrl(child.path),
      })),
    },
  });

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(path)}#collection`,
    name,
    description,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      name: `${name} directory`,
      itemListElement: items.map(buildListItem),
    },
  };
}

export function buildSiteOfferCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Evaready Electrical services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        serviceType: service.intent,
        description: service.description,
        url:
          service.slug === "emergency-electrician-sydney"
            ? absoluteUrl("/emergency-electrician-sydney")
            : service.slug === "level-2-electrician-sydney"
              ? absoluteUrl("/level-2-electrician-sydney")
              : absoluteUrl(`/services/${service.slug}`),
      },
    })),
  };
}

function cleanSchema<T extends SchemaValue>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cleanSchema(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined)
        .map(([key, item]) => [key, cleanSchema(item)]),
    ) as T;
  }

  return value;
}
