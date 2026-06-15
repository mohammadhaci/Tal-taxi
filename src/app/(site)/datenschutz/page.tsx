import { PageShell } from "@/components/page-shell";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten bei Tal Taxi gemäß DSGVO.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <div className="space-y-2 text-sm text-ink-soft">{children}</div>
    </section>
  );
}

export default async function Page() {
  const s = await getSiteSettings();
  return (
    <PageShell
      title="Datenschutzerklärung"
      intro="Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir Sie gemäß der Datenschutz-Grundverordnung (DSGVO)."
    >
      <div className="max-w-2xl space-y-8">
        <Section title="1. Verantwortlicher">
          <p>{s.legalCompany}, {s.street}, {s.zip} {s.city}, Österreich</p>
          <p>Telefon: {s.phone} · E-Mail: {s.email}</p>
        </Section>

        <Section title="2. Verarbeitung im Rahmen von Buchungen">
          <p>
            Wenn Sie eine Fahrt buchen oder das Kontaktformular nutzen,
            verarbeiten wir die von Ihnen angegebenen Daten (Name,
            Telefonnummer, ggf. E-Mail-Adresse, Abhol- und Zieladresse,
            Fahrtdetails), um Ihre Anfrage zu bearbeiten und die Fahrt
            durchzuführen.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertrag bzw.
            vorvertragliche Maßnahmen).
          </p>
        </Section>

        <Section title="3. Speicherdauer">
          <p>
            Wir speichern Ihre Daten nur so lange, wie es für die genannten
            Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies
            vorschreiben.
          </p>
        </Section>

        <Section title="4. Weitergabe von Daten">
          <p>
            Eine Weitergabe erfolgt nur, soweit dies zur Durchführung der Fahrt
            (z. B. an den ausführenden Fahrer) oder aufgrund gesetzlicher
            Verpflichtungen notwendig ist.
          </p>
        </Section>

        <Section title="5. Cookies">
          <p>
            Unsere Website verwendet technisch notwendige Cookies. Über
            optionale Cookies entscheiden Sie über das Cookie-Banner.
          </p>
        </Section>

        <Section title="6. Ihre Rechte">
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.
            Zudem können Sie sich bei der österreichischen Datenschutzbehörde
            beschweren.
          </p>
        </Section>

        <p className="rounded-lg border border-dashed border-border bg-surface p-4 text-xs text-muted">
          Hinweis: Dies ist eine Vorlage. Bitte vor Veröffentlichung durch eine
          fachkundige Person (z. B. Rechtsanwalt) prüfen und an Ihre konkrete
          Datenverarbeitung anpassen lassen.
        </p>
      </div>
    </PageShell>
  );
}
