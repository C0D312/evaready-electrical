import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { absoluteUrl, assetPath, business, canonicalPath } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${business.siteUrl}/`),
  title: {
    default:
      "Emergency & Level 2 Electrician Sydney & Surrounding Regions | Evaready Electrical 24/7",
    template: "%s | Evaready Electrical",
  },
  description:
    "Evaready Electrical handles urgent faults, Level 2 work, switchboards, fault finding, EV chargers and commercial electrical jobs across Sydney and surrounding regions.",
  keywords: [
    "emergency electrician Sydney",
    "24/7 electrician Sydney",
    "Level 2 electrician Sydney",
    "switchboard upgrades Sydney",
    "electrical fault finding Sydney",
    "Evaready Electrical",
  ],
  openGraph: {
    title:
      "Emergency & Level 2 Electrician Sydney & Surrounding Regions | Evaready Electrical 24/7",
  description:
    "Electrical support for urgent faults, Level 2 work, switchboards, outages and commercial jobs across Sydney and surrounding regions.",
    url: business.siteUrl,
    siteName: "Evaready Electrical",
    type: "website",
    locale: "en_AU",
    images: [absoluteUrl(business.brandImage)],
  },
  alternates: {
    canonical: canonicalPath("/"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brandStyle = {
    "--ee-van-image": `url("${assetPath(business.heroImage)}")`,
  } as CSSProperties;

  return (
    <html lang="en-AU">
      <body style={brandStyle}>{children}</body>
    </html>
  );
}




