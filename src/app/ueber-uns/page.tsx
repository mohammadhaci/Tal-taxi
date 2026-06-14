import { PageShell, PlaceholderNote } from "@/components/page-shell";

export const metadata = { title: "Über uns" };

export default function Page() {
  return (
    <PageShell
      title="Über uns"
      intro="Tal Taxi ist Ihr verlässlicher Partner für Taxifahrten in ganz Vorarlberg."
    >
      <p className="max-w-2xl text-muted">
        (Platzhalter-Text) Hier stellt sich das Unternehmen vor: Erfahrung,
        Team, Werte und das Versprechen an die Kundinnen und Kunden.
      </p>
      <div className="mt-8">
        <PlaceholderNote phase="Phase 1" />
      </div>
    </PageShell>
  );
}
