import Link from "next/link";
import { COMPANY } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand font-extrabold text-brand-foreground">
              T
            </span>
            <span className="text-lg font-bold text-white">{COMPANY.name}</span>
          </div>
          <p className="mt-3 text-sm text-gray-400">{COMPANY.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Navigation</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/dienstleistungen" className="hover:text-brand">Dienstleistungen</Link></li>
            <li><Link href="/preisrechner" className="hover:text-brand">Preisrechner</Link></li>
            <li><Link href="/buchen" className="hover:text-brand">Online buchen</Link></li>
            <li><Link href="/kontakt" className="hover:text-brand">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Kontakt</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={COMPANY.phoneHref} className="hover:text-brand">{COMPANY.phone}</a></li>
            <li><a href={`mailto:${COMPANY.email}`} className="hover:text-brand">{COMPANY.email}</a></li>
            <li>{COMPANY.address.zip} {COMPANY.address.city}</li>
            <li>{COMPANY.hours}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Rechtliches</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/impressum" className="hover:text-brand">Impressum</Link></li>
            <li><Link href="/datenschutz" className="hover:text-brand">Datenschutz</Link></li>
            <li><Link href="/agb" className="hover:text-brand">AGB</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {COMPANY.legal.company} · Alle Rechte vorbehalten
      </div>
    </footer>
  );
}
