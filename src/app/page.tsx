import Link from "next/link";
import { COMPANY } from "@/lib/company";

const SERVICES = [
  {
    title: "Flughafentransfer",
    desc: "Zuverlässig zu den Flughäfen Zürich, Friedrichshafen, Memmingen, Altenrhein, Innsbruck & München.",
    icon: "✈️",
  },
  {
    title: "Stadt- & Regionalfahrten",
    desc: "Schnell und bequem unterwegs in ganz Vorarlberg — Tag und Nacht.",
    icon: "🚕",
  },
  {
    title: "Veranstaltungen & Events",
    desc: "Sichere Heimfahrt nach Feiern, Hochzeiten und Geschäftsterminen.",
    icon: "🎉",
  },
  {
    title: "Kurier- & Botendienst",
    desc: "Dokumente und Pakete schnell und zuverlässig zugestellt.",
    icon: "📦",
  },
];

const USPS = [
  { title: "0–24 Uhr verfügbar", desc: "An 7 Tagen die Woche für Sie da." },
  { title: "Faire Festpreise", desc: "Transparente Preise nach Vorarlberger Tarif." },
  { title: "Pünktlich & zuverlässig", desc: "Wir bringen Sie sicher ans Ziel." },
  { title: "Einfache Online-Buchung", desc: "In wenigen Schritten gebucht." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 lg:grid-cols-2">
          <div>
            <p className="inline-block rounded-full bg-brand/20 px-3 py-1 text-sm font-medium text-brand">
              Taxi in ganz Vorarlberg
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {COMPANY.tagline}
            </h1>
            <p className="mt-4 max-w-md text-lg text-gray-300">
              Buchen Sie Ihre Fahrt bequem online — Flughafentransfer,
              Stadtfahrten und mehr. Schnell, sicher und zu fairen Preisen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/buchen"
                className="rounded-lg bg-brand px-6 py-3 font-semibold text-brand-foreground transition-colors hover:bg-brand-dark"
              >
                Jetzt online buchen
              </Link>
              <a
                href={COMPANY.phoneHref}
                className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Anrufen: {COMPANY.phone}
              </a>
            </div>
          </div>

          {/* Platzhalter für Buchungs-Widget / Bild */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold text-brand">Schnellbuchung</p>
            <div className="mt-4 space-y-3 text-sm text-gray-300">
              <div className="rounded-lg bg-white/5 p-3">Von: <span className="text-gray-500">(Platzhalter)</span></div>
              <div className="rounded-lg bg-white/5 p-3">Nach: <span className="text-gray-500">(Platzhalter)</span></div>
              <div className="rounded-lg bg-white/5 p-3">Datum &amp; Uhrzeit: <span className="text-gray-500">(Platzhalter)</span></div>
              <Link
                href="/buchen"
                className="block rounded-lg bg-brand py-3 text-center font-semibold text-brand-foreground hover:bg-brand-dark"
              >
                Weiter zur Buchung
              </Link>
              <p className="text-xs text-gray-500">
                Das interaktive Buchungs-Widget folgt in Phase 3.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {USPS.map((u) => (
            <div key={u.title}>
              <h3 className="font-bold text-ink">{u.title}</h3>
              <p className="mt-1 text-sm text-muted">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dienstleistungen */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-ink">Unsere Dienstleistungen</h2>
        <p className="mt-2 text-muted">Alles rund um Ihre Mobilität in Vorarlberg.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
            >
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-3 font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-12 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-bold text-brand-foreground">
              Bereit für Ihre Fahrt?
            </h2>
            <p className="text-brand-foreground/80">
              Buchen Sie jetzt online oder rufen Sie uns an.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/buchen"
              className="rounded-lg bg-ink px-6 py-3 font-semibold text-white hover:bg-ink-soft"
            >
              Online buchen
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="rounded-lg border border-ink/30 px-6 py-3 font-semibold text-brand-foreground hover:bg-black/5"
            >
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
