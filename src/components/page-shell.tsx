export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
          {intro && <p className="mt-3 max-w-2xl text-muted">{intro}</p>}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12">{children}</section>
    </>
  );
}

/** Kleiner Hinweis für Platzhalter-Inhalte (nur in der Aufbauphase). */
export function PlaceholderNote({ phase }: { phase: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted">
      Platzhalter — finale Inhalte und Funktionen folgen in {phase}.
    </div>
  );
}
