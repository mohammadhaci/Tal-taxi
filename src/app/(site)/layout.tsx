import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingContact } from "@/components/floating-contact";
import { CookieConsent } from "@/components/cookie-consent";
import { LocalBusinessJsonLd } from "@/components/json-ld";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingContact />
      <CookieConsent />
      <LocalBusinessJsonLd />
    </div>
  );
}
