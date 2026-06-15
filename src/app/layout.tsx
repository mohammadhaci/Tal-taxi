import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
