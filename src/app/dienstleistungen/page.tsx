import { PageShell, PlaceholderNote } from "@/components/page-shell";

export const metadata = { title: "Dienstleistungen" };

const SERVICES = [
  { title: "Flughafentransfer", desc: "Zürich, Friedrichshafen, Memmingen, Altenrhein, Innsbruck & München." },
  { title: "Stadt- & Regionalfahrten", desc: "Innerhalb von Vorarlberg, rund um die Uhr." },
  { title: "Veranstaltungen & Events", desc: "Sichere Heimfahrt nach Feiern und Terminen." },
  { title: "Kurier- & Botendienst", desc: "Schnelle Zustellung von Dokumenten und Paketen." },
  { title: "Geschäftsfahrten", desc: "Zuverlässige Mobilität für Firmenkunden." },
  { title: "Barrierefreie Fahrten", desc: "Komfortabler Transport für alle Fahrgäste." },
];

export default function Page() {
  return (
    <PageShell
      title="Unsere Dienstleistungen"
      intro="Alles rund um Ihre Mobilität in Vorarlberg — zuverlässig, sicher und zu fairen Preisen."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div key={s.title} className="rounded-xl border border-border p-6">
            <h2 className="font-bold text-ink">{s.title}</h2>
            <p className="mt-2 text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <PlaceholderNote phase="Phase 1" />
      </div>
    </PageShell>
  );
}
