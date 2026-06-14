import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { COMPANY } from "@/lib/company";

const inter = Inter({
  variable: "--font-sans-custom",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.name} — Ihr Taxi in Vorarlberg`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Tal Taxi — Zuverlässige Taxifahrten in ganz Vorarlberg. Flughafentransfer, Stadtfahrten und mehr. Jetzt online buchen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
