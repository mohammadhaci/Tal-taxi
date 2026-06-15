import Link from "next/link";
import type { BookingStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/tariff";
import {
  STATUS_LABELS,
  STATUS_STYLES,
  TRIP_TYPE_LABELS,
  formatDateTime,
} from "@/lib/admin-format";
import { setBookingStatus, assignBooking } from "./actions";

const FILTERS: { value: string; label: string }[] = [
  { value: "ALL", label: "Alle" },
  { value: "PENDING", label: "Ausstehend" },
  { value: "CONFIRMED", label: "Bestätigt" },
  { value: "COMPLETED", label: "Abgeschlossen" },
  { value: "REJECTED", label: "Abgelehnt" },
  { value: "CANCELLED", label: "Storniert" },
];

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = status && status !== "ALL" ? (status as BookingStatus) : null;

  const [bookings, vehicles, drivers] = await Promise.all([
    db.booking.findMany({
      where: active ? { status: active } : undefined,
      orderBy: { pickupAt: "desc" },
      take: 100,
      include: { assignedVehicle: true, assignedDriver: true },
    }),
    db.vehicle.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
    db.driver.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Buchungen</h1>
        <a
          href="/admin/buchungen/export"
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-ink-soft hover:bg-surface"
        >
          ⬇ CSV-Export
        </a>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const isActive = (active ?? "ALL") === f.value;
          return (
            <Link
              key={f.value}
              href={`/admin/buchungen${f.value === "ALL" ? "" : `?status=${f.value}`}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                isActive
                  ? "bg-ink text-white"
                  : "border border-border bg-background text-ink-soft hover:bg-surface"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {bookings.length === 0 ? (
        <p className="rounded-xl border border-border bg-background px-5 py-10 text-center text-sm text-muted">
          Keine Buchungen in dieser Ansicht.
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="rounded-xl border border-border bg-background p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink">{b.reference}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[b.status]}`}>
                      {STATUS_LABELS[b.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">
                    {b.pickupAddress} → {b.dropoffAddress}
                  </p>
                  <p className="text-xs text-muted">
                    {formatDateTime(b.pickupAt)} · {TRIP_TYPE_LABELS[b.tripType]} ·{" "}
                    {b.passengers} Pers. · {b.luggage} Gepäck
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium text-ink">{b.customerName}</p>
                  <a href={`tel:${b.customerPhone}`} className="text-brand-dark">{b.customerPhone}</a>
                  {b.estimatedPrice != null && (
                    <p className="text-xs text-muted">ca. {formatPrice(b.estimatedPrice)}</p>
                  )}
                </div>
              </div>

              {b.notes && (
                <p className="mt-3 rounded-lg bg-surface p-3 text-sm text-ink-soft">
                  📝 {b.notes}
                </p>
              )}

              {/* Status-Aktionen */}
              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                {b.status === "PENDING" && (
                  <>
                    <StatusButton id={b.id} status="CONFIRMED" label="Bestätigen" variant="primary" />
                    <StatusButton id={b.id} status="REJECTED" label="Ablehnen" variant="danger" />
                  </>
                )}
                {b.status === "CONFIRMED" && (
                  <>
                    <StatusButton id={b.id} status="COMPLETED" label="Abgeschlossen" variant="primary" />
                    <StatusButton id={b.id} status="CANCELLED" label="Stornieren" variant="muted" />
                  </>
                )}
                {(b.status === "REJECTED" || b.status === "CANCELLED") && (
                  <StatusButton id={b.id} status="PENDING" label="Zurücksetzen" variant="muted" />
                )}
              </div>

              {/* Zuweisung */}
              {(b.status === "CONFIRMED" || b.status === "PENDING") && (
                <form action={assignBooking} className="mt-3 flex flex-wrap items-end gap-2">
                  <input type="hidden" name="id" value={b.id} />
                  <label className="text-xs text-muted">
                    Fahrzeug
                    <select name="vehicleId" defaultValue={b.assignedVehicleId ?? ""} className="mt-0.5 block rounded-lg border border-border px-2 py-1 text-sm">
                      <option value="">—</option>
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs text-muted">
                    Fahrer
                    <select name="driverId" defaultValue={b.assignedDriverId ?? ""} className="mt-0.5 block rounded-lg border border-border px-2 py-1 text-sm">
                      <option value="">—</option>
                      {drivers.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs text-muted">
                    Endpreis (€)
                    <input name="finalPrice" type="number" step="0.1" defaultValue={b.finalPrice ?? ""} className="mt-0.5 block w-24 rounded-lg border border-border px-2 py-1 text-sm" />
                  </label>
                  <button className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-ink-soft hover:bg-surface">
                    Speichern
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusButton({
  id,
  status,
  label,
  variant,
}: {
  id: string;
  status: BookingStatus;
  label: string;
  variant: "primary" | "danger" | "muted";
}) {
  const cls =
    variant === "primary"
      ? "bg-brand text-brand-foreground hover:bg-brand-dark"
      : variant === "danger"
        ? "bg-danger text-white hover:opacity-90"
        : "border border-border text-ink-soft hover:bg-surface";
  return (
    <form action={setBookingStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button className={`rounded-lg px-4 py-1.5 text-sm font-medium ${cls}`}>{label}</button>
    </form>
  );
}
