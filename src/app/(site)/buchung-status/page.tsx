import { PageShell } from "@/components/page-shell";
import { db } from "@/lib/db";
import { STATUS_LABELS, STATUS_STYLES, formatDateTime } from "@/lib/admin-format";
import { formatPrice } from "@/lib/tariff";

export const metadata = { title: "Buchung verfolgen" };
export const dynamic = "force-dynamic";

async function lookup(ref: string) {
  try {
    return await db.booking.findUnique({
      where: { reference: ref.trim().toUpperCase() },
    });
  } catch {
    return null;
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const booking = ref ? await lookup(ref) : null;

  return (
    <PageShell
      title="Buchung verfolgen"
      intro="Geben Sie Ihre Buchungsnummer ein, um den aktuellen Status Ihrer Fahrt zu sehen."
    >
      <form method="get" className="flex max-w-md gap-2">
        <input
          name="ref"
          defaultValue={ref ?? ""}
          placeholder="z. B. TT-AB12CD"
          className="flex-1 rounded-lg border border-border px-3 py-2 text-sm uppercase outline-none focus:border-brand"
        />
        <button className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand-dark">
          Suchen
        </button>
      </form>

      {ref && !booking && (
        <p className="mt-6 max-w-md rounded-lg border border-border bg-surface p-4 text-sm text-muted">
          Keine Buchung mit dieser Nummer gefunden. Bitte prüfen Sie Ihre
          Eingabe.
        </p>
      )}

      {booking && (
        <div className="mt-6 max-w-md rounded-xl border border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <span className="font-bold text-ink">{booking.reference}</span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[booking.status]}`}>
              {STATUS_LABELS[booking.status]}
            </span>
          </div>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-ink-soft">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Strecke</dt>
              <dd className="text-right">{booking.pickupAddress} → {booking.dropoffAddress}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Termin</dt>
              <dd>{formatDateTime(booking.pickupAt)}</dd>
            </div>
            {booking.estimatedPrice != null && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Preis (ca.)</dt>
                <dd>{formatPrice(booking.estimatedPrice)}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </PageShell>
  );
}
