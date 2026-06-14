import { PageShell } from "@/components/page-shell";
import { COMPANY } from "@/lib/company";
import { ContactForm } from "./contact-form";

export const metadata = { title: "Kontakt" };

export default function Page() {
  return (
    <PageShell
      title="Kontakt"
      intro="Wir sind rund um die Uhr für Sie erreichbar."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3 text-sm">
          <p><span className="font-semibold text-ink">Telefon:</span>{" "}
            <a href={COMPANY.phoneHref} className="text-brand-dark">{COMPANY.phone}</a></p>
          <p><span className="font-semibold text-ink">E-Mail:</span>{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-brand-dark">{COMPANY.email}</a></p>
          <p><span className="font-semibold text-ink">Adresse:</span>{" "}
            {COMPANY.address.street}, {COMPANY.address.zip} {COMPANY.address.city}</p>
          <p><span className="font-semibold text-ink">Öffnungszeiten:</span> {COMPANY.hours}</p>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-ink">Schreiben Sie uns</h2>
          <ContactForm />
        </div>
      </div>
    </PageShell>
  );
}
