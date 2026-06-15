import { db } from "@/lib/db";
import { COMPANY } from "@/lib/company";

/**
 * Bearbeitbare Website-Inhalte. Standardwerte stammen aus company.ts,
 * werden aber durch im Admin gespeicherte Werte (SiteSetting) überschrieben.
 */
export const SETTING_DEFAULTS = {
  companyName: COMPANY.name,
  tagline: COMPANY.tagline,
  phone: COMPANY.phone,
  whatsapp: COMPANY.whatsapp,
  email: COMPANY.email,
  street: COMPANY.address.street,
  zip: COMPANY.address.zip,
  city: COMPANY.address.city,
  hours: COMPANY.hours,
  heroTitle: COMPANY.tagline,
  heroSubtitle:
    "Buchen Sie Ihre Fahrt bequem online — Flughafentransfer, Stadtfahrten und mehr. Schnell, sicher und zu fairen Preisen.",
  legalCompany: COMPANY.legal.company,
  legalOwner: COMPANY.legal.owner,
  uid: COMPANY.legal.uid,
  gisa: COMPANY.legal.gisa,
};

export type SiteSettings = typeof SETTING_DEFAULTS;
export const SETTING_KEYS = Object.keys(SETTING_DEFAULTS) as (keyof SiteSettings)[];

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await db.siteSetting.findMany();
    const map = new Map(rows.map((r) => [r.key, r.value]));
    const merged = { ...SETTING_DEFAULTS } as Record<string, string>;
    for (const key of SETTING_KEYS) {
      const v = map.get(key);
      if (v != null && v !== "") merged[key] = v;
    }
    return merged as SiteSettings;
  } catch {
    return { ...SETTING_DEFAULTS };
  }
}

/** Praktische Helfer für Links. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
export function waHref(whatsapp: string) {
  return `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;
}
