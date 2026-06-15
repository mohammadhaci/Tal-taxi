import Link from "next/link";
import { getSiteSettings, telHref } from "@/lib/site-settings";

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

export default async function Home() {
  const s = await getSiteSettings();
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
              {s.heroTitle}
            </h1>
            <p className="mt-4 max-w-md text-lg text-gray-300">
              {s.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/buchen"
                className="rounded-lg bg-brand px-6 py-3 font-semibold text-brand-foreground transition-colors hover:bg-brand-dark"
              >
                Jetzt online buchen
              </Link>
              <a
                href={telHref(s.phone)}
                className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Anrufen: {s.phone}
              </a>
            </div>
          </div>

          {/* So einfach geht's */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold text-brand">So einfach geht&apos;s</p>
            <ol className="mt-4 space-y-4">
              {[
                { n: "1", t: "Strecke angeben", d: "Abhol- und Zieladresse eingeben." },
                { n: "2", t: "Preis sehen", d: "Sofortige, faire Preisschätzung." },
                { n: "3", t: "Bestätigung erhalten", d: "Wir bestätigen Ihre Fahrt." },
              ].map((step) => (
                <li key={step.n} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-brand-foreground">
                    {step.n}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.t}</p>
                    <p className="text-sm text-gray-400">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/buchen"
              className="mt-5 block rounded-lg bg-brand py-3 text-center font-semibold text-brand-foreground hover:bg-brand-dark"
            >
              Jetzt Fahrt buchen
            </Link>
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

      {/* Einsatzgebiet */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold text-ink">Unser Einsatzgebiet</h2>
          <p className="mt-2 text-muted">
            Wir sind in ganz Vorarlberg für Sie unterwegs — unter anderem in:
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Bregenz", "Dornbirn", "Feldkirch", "Bludenz", "Hard", "Lustenau",
              "Hohenems", "Götzis", "Rankweil", "Lauterach", "Wolfurt", "Bürs",
            ].map((city) => (
              <span
                key={city}
                className="rounded-full border border-border bg-background px-3 py-1 text-sm text-ink-soft"
              >
                Taxi {city}
              </span>
            ))}
          </div>
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
              href={telHref(s.phone)}
              className="rounded-lg border border-ink/30 px-6 py-3 font-semibold text-brand-foreground hover:bg-black/5"
            >
              {s.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
