/**
 * Zentrale Firmendaten (Platzhalter).
 * Diese Werte werden in Phase 4 in den Admin-Bereich / die Datenbank
 * ausgelagert, sodass der Betreiber sie selbst bearbeiten kann.
 */
export const COMPANY = {
  name: "Tal Taxi",
  tagline: "Ihr zuverlässiges Taxi in ganz Vorarlberg",
  phone: "+43 000 000000",
  phoneHref: "tel:+43000000000",
  whatsapp: "+43 000 000000",
  whatsappHref: "https://wa.me/43000000000",
  email: "info@tal-taxi.at",
  address: {
    street: "Musterstraße 1",
    zip: "6900",
    city: "Bregenz",
    country: "Österreich",
  },
  hours: "0–24 Uhr · 7 Tage die Woche",
  // Für Impressum (Platzhalter — vom Kunden zu befüllen)
  legal: {
    company: "Tal Taxi e.U.",
    owner: "Max Mustermann",
    uid: "ATU00000000",
    gisa: "00000000",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/dienstleistungen", label: "Dienstleistungen" },
  { href: "/preisrechner", label: "Preisrechner" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
