import { PageShell } from "@/components/page-shell";

export const metadata = { title: "FAQ" };

const FAQS = [
  {
    q: "Wie kann ich ein Taxi buchen?",
    a: "Sie können bequem online über unsere Website buchen oder uns telefonisch erreichen.",
  },
  {
    q: "Wie bezahle ich?",
    a: "Die Bezahlung erfolgt direkt beim Fahrer — bar oder mit Karte im Fahrzeug.",
  },
  {
    q: "Wird meine Buchung sofort bestätigt?",
    a: "Wir prüfen jede Buchung und bestätigen sie anschließend per E-Mail.",
  },
  {
    q: "Bieten Sie Flughafentransfers an?",
    a: "Ja, zu allen Flughäfen der Region zu fairen Festpreisen.",
  },
];

export default function Page() {
  return (
    <PageShell
      title="Häufige Fragen"
      intro="Antworten auf die wichtigsten Fragen rund um Ihre Fahrt."
    >
      <div className="max-w-3xl divide-y divide-border">
        {FAQS.map((f) => (
          <div key={f.q} className="py-5">
            <h2 className="font-semibold text-ink">{f.q}</h2>
            <p className="mt-1 text-sm text-muted">{f.a}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
