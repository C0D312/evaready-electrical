import { approvedBusinessClaims, business } from "@/data/site";

export type TrustBadgeIconName = "badge" | "map-pin" | "shield" | "star" | "zap";

export type TrustBadgeTone = "blue" | "cyan" | "red";

export type TrustBadge = {
  altText: string;
  icon: TrustBadgeIconName;
  text: string;
  title: string;
  tone: TrustBadgeTone;
};

export const footerTrustBadges: TrustBadge[] = [
  {
    altText: approvedBusinessClaims.credentials.electricalLicence.approvedWording,
    icon: "shield",
    title: "NSW Licensed Electrician",
    text: `Electrical Licence ${business.licence}`,
    tone: "cyan",
  },
  {
    altText: `Evaready Electrical ABN ${business.abn}`,
    icon: "badge",
    title: "ABN",
    text: business.abn,
    tone: "blue",
  },
  {
    altText: approvedBusinessClaims.credentials.openCabler.approvedWording,
    icon: "zap",
    title: "Open Cabler Registered",
    text: `Registration ${business.openCablerRegistration}`,
    tone: "cyan",
  },
  {
    altText: approvedBusinessClaims.credentials.arctick.approvedWording,
    icon: "badge",
    title: approvedBusinessClaims.credentials.arctick.label,
    text: business.arctickLicence,
    tone: "blue",
  },
  {
    altText: business.level2Asp.display,
    icon: "zap",
    title: "Accredited Level 2 ASP",
    text: business.level2Asp.display,
    tone: "cyan",
  },
  {
    altText: business.googleReviewDisplayText,
    icon: "star",
    title: "Google Reviews",
    text: business.googleReviewDisplayText,
    tone: "blue",
  },
  {
    altText: `Evaready Electrical services ${business.serviceArea}`,
    icon: "map-pin",
    title: "Service Area",
    text: business.serviceArea,
    tone: "cyan",
  },
];
