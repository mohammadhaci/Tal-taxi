import { PageShell } from "@/components/page-shell";

export const metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von Tal Taxi.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <div className="space-y-2 text-sm text-ink-soft">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <PageShell
      title="Allgemeine Geschäftsbedingungen"
      intro="Die folgenden Bedingungen gelten für Buchungen und Fahrten mit Tal Taxi."
    >
      <div className="max-w-2xl space-y-8">
        <Section title="1. Geltungsbereich">
          <p>
            Diese Bedingungen gelten für alle über unsere Website oder
            telefonisch vereinbarten Beförderungsleistungen.
          </p>
        </Section>
        <Section title="2. Buchung & Bestätigung">
          <p>
            Eine Online-Buchung stellt eine Anfrage dar. Der Beförderungsvertrag
            kommt erst mit unserer Bestätigung zustande. Wir behalten uns vor,
            Anfragen abzulehnen.
          </p>
        </Section>
        <Section title="3. Preise & Bezahlung">
          <p>
            Es gilt der jeweils gültige Tarif des Landes Vorarlberg bzw. der
            vereinbarte Festpreis. Online angezeigte Preise sind unverbindliche
            Schätzungen. Die Bezahlung erfolgt direkt beim Fahrer (bar oder
            Karte, sofern verfügbar).
          </p>
        </Section>
        <Section title="4. Stornierung">
          <p>
            Stornierungen sind rechtzeitig telefonisch mitzuteilen. Bei
            kurzfristiger Absage oder Nichtantreten können Kosten anfallen.
          </p>
        </Section>
        <Section title="5. Pflichten der Fahrgäste">
          <p>
            Den Anweisungen des Fahrpersonals ist Folge zu leisten. Die
            Anschnallpflicht ist einzuhalten. Verunreinigungen oder Schäden am
            Fahrzeug sind zu ersetzen.
          </p>
        </Section>
        <Section title="6. Haftung">
          <p>
            Wir haften nach den gesetzlichen Bestimmungen. Für Verspätungen durch
            höhere Gewalt, Verkehrslage oder Witterung wird keine Haftung
            übernommen.
          </p>
        </Section>
        <p className="rounded-lg border border-dashed border-border bg-surface p-4 text-xs text-muted">
          Hinweis: Diese AGB sind eine Vorlage und vor Veröffentlichung
          rechtlich zu prüfen.
        </p>
      </div>
    </PageShell>
  );
}
