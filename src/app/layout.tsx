import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/lib/company";

const inter = Inter({
  variable: "--font-sans-custom",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://www.tal-taxi.at"),
  title: {
    default: `${COMPANY.name} — Ihr Taxi in Vorarlberg`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Tal Taxi — Zuverlässige Taxifahrten in ganz Vorarlberg. Flughafentransfer, Stadtfahrten und mehr. Jetzt online buchen.",
  keywords: [
    "Taxi Vorarlberg", "Taxi Bregenz", "Taxi Dornbirn", "Taxi Feldkirch",
    "Flughafentransfer Vorarlberg", "Taxi online buchen",
  ],
  openGraph: {
    type: "website",
    locale: "de_AT",
    siteName: COMPANY.name,
    title: `${COMPANY.name} — Ihr Taxi in Vorarlberg`,
    description:
      "Zuverlässige Taxifahrten in ganz Vorarlberg. Jetzt bequem online buchen.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
