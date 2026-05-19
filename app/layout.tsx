import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://evareadyelectrical.com.au"),
  title: {
    default: "Emergency & Level 2 Electrician Sydney | Evaready Electrical 24/7",
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
    title: "Emergency & Level 2 Electrician Sydney | Evaready Electrical 24/7",
    description:
      "Electrical support for urgent faults, Level 2 work, switchboards, outages and commercial jobs across the wider Sydney service area.",
    url: "https://evareadyelectrical.com.au",
    siteName: "Evaready Electrical",
    type: "website",
    locale: "en_AU",
    images: ["/evaready-logo.png"],
  },
  alternates: {
    canonical: "/",
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
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}




