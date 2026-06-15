import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { COMPANY } from "@/lib/company";

export const metadata = { title: "Buchung erhalten", robots: { index: false } };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <PageShell title="Vielen Dank für Ihre Buchung!">
      <div className="max-w-xl space-y-4">
        <div className="rounded-xl border border-success/30 bg-success/10 p-6">
          <p className="text-ink">
            Wir haben Ihre Buchungsanfrage erhalten und melden uns in Kürze zur
            Bestätigung.
          </p>
          {ref && (
            <p className="mt-3 text-sm text-ink-soft">
              Ihre Buchungsnummer:{" "}
              <span className="font-bold text-ink">{ref}</span>
            </p>
          )}
        </div>
        <p className="text-sm text-muted">
          Bei dringenden Anliegen erreichen Sie uns telefonisch unter{" "}
          <a href={COMPANY.phoneHref} className="font-medium text-brand-dark">
            {COMPANY.phone}
          </a>
          .
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-dark"
        >
          Zur Startseite
        </Link>
      </div>
    </PageShell>
  );
}
