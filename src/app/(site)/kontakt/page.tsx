import { PageShell } from "@/components/page-shell";
import { getSiteSettings, telHref } from "@/lib/site-settings";
import { ContactForm } from "./contact-form";

export const metadata = { title: "Kontakt" };

export default async function Page() {
  const s = await getSiteSettings();
  return (
    <PageShell
      title="Kontakt"
      intro="Wir sind rund um die Uhr für Sie erreichbar."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3 text-sm">
          <p><span className="font-semibold text-ink">Telefon:</span>{" "}
            <a href={telHref(s.phone)} className="text-brand-dark">{s.phone}</a></p>
          <p><span className="font-semibold text-ink">E-Mail:</span>{" "}
            <a href={`mailto:${s.email}`} className="text-brand-dark">{s.email}</a></p>
          <p><span className="font-semibold text-ink">Adresse:</span>{" "}
            {s.street}, {s.zip} {s.city}</p>
          <p><span className="font-semibold text-ink">Öffnungszeiten:</span> {s.hours}</p>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-ink">Schreiben Sie uns</h2>
          <ContactForm />
        </div>
      </div>
    </PageShell>
  );
}
