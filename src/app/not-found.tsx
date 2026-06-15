import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <span className="text-6xl font-extrabold text-brand">404</span>
      <h1 className="mt-4 text-2xl font-bold text-ink">Seite nicht gefunden</h1>
      <p className="mt-2 max-w-md text-muted">
        Die gewünschte Seite existiert leider nicht. Vielleicht möchten Sie
        direkt eine Fahrt buchen?
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-ink hover:bg-surface"
        >
          Zur Startseite
        </Link>
        <Link
          href="/buchen"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-dark"
        >
          Jetzt buchen
        </Link>
      </div>
    </div>
  );
}
