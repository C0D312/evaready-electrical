import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://evareadyelectrical.com.au"),
  title: {
    default: "Emergency Electrician Sydney | Evaready Electrical 24/7",
    template: "%s | Evaready Electrical",
  },
  description:
    "Evaready Electrical provides 24/7 emergency electrician services, Level 2 electrical work, switchboard upgrades, fault finding, EV chargers and commercial electrical services across Sydney.",
  keywords: [
    "emergency electrician Sydney",
    "24/7 electrician Sydney",
    "Level 2 electrician Sydney",
    "switchboard upgrades Sydney",
    "electrical fault finding Sydney",
    "Evaready Electrical",
  ],
  openGraph: {
    title: "Emergency Electrician Sydney | Evaready Electrical 24/7",
    description:
      "Fast-response licensed electricians for urgent faults, Level 2 electrical work, switchboards, outages and commercial electrical services.",
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




