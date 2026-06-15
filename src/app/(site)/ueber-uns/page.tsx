import { PageShell } from "@/components/page-shell";

export const metadata = {
  title: "Über uns",
  description:
    "Tal Taxi — Ihr verlässlicher Partner für Taxifahrten in ganz Vorarlberg.",
};

const VALUES = [
  { title: "Zuverlässigkeit", desc: "Wir sind pünktlich zur Stelle — rund um die Uhr." },
  { title: "Sicherheit", desc: "Erfahrene Fahrer und gepflegte Fahrzeuge." },
  { title: "Fairness", desc: "Transparente Preise nach dem Vorarlberger Tarif." },
  { title: "Service", desc: "Freundlich, persönlich und immer für Sie da." },
];

export default function Page() {
  return (
    <PageShell
      title="Über uns"
      intro="Tal Taxi ist Ihr verlässlicher Partner für Taxifahrten in ganz Vorarlberg."
    >
      <div className="max-w-2xl space-y-4 text-ink-soft">
        <p>
          Ob Flughafentransfer, Fahrt durch die Stadt oder Tour durch die
          Region — bei Tal Taxi stehen Sie im Mittelpunkt. Unser Ziel ist es,
          Sie sicher, bequem und pünktlich an Ihr Ziel zu bringen.
        </p>
        <p>
          Mit ortskundigen Fahrern und modernen Fahrzeugen sind wir Tag und
          Nacht für Sie unterwegs. Buchen Sie einfach online oder rufen Sie uns
          an — wir kümmern uns um den Rest.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-xl border border-border p-6">
            <h2 className="font-bold text-ink">{v.title}</h2>
            <p className="mt-2 text-sm text-muted">{v.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
