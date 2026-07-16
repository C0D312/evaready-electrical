import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { GoogleAdsTag } from "@/components/google-ads-tag";
import { absoluteUrl, assetPath, business } from "@/data/site";
import "./globals.css";
import "./footer.css";
import "./offers.css";
import "./ux-overhaul.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${business.siteUrl}/`),
  title: {
    default:
      "Emergency & Level 2 Electrician Sydney & Surrounding Regions",
    template: "%s",
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
    canonical: business.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: assetPath("/evaready-full-logo-favicon-v2.ico"), sizes: "any" },
      {
        url: assetPath("/evaready-full-logo-square-512.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: assetPath("/evaready-full-logo-square-180.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brandStyle = {
    "--ee-van-image": `url("${assetPath(business.heroImage)}")`,
    "--ee-electric-bg-image": `url("${assetPath("/images/evaready-storm-theme-desktop-v3.webp")}")`,
    "--ee-storm-bg-desktop": `url("${assetPath("/images/evaready-storm-theme-desktop-v3.webp")}")`,
    "--ee-storm-bg-mobile": `url("${assetPath("/images/evaready-storm-theme-mobile-v3.webp")}")`,
  } as CSSProperties;

  return (
    <html lang="en-AU">
      <body className="ev-electric-theme-bg ev-storm-page" style={brandStyle}>
        <GoogleAdsTag />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
