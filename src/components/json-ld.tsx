import { COMPANY } from "@/lib/company";

/** Strukturierte Daten (Schema.org) für lokale SEO. */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: COMPANY.name,
    description: COMPANY.tagline,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    areaServed: "Vorarlberg, Österreich",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      postalCode: COMPANY.address.zip,
      addressLocality: COMPANY.address.city,
      addressCountry: "AT",
    },
    openingHours: "Mo-Su 00:00-24:00",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
