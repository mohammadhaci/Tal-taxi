import Link from "next/link";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/tariff";
import { STATUS_LABELS } from "@/lib/admin-format";

async function getStats() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const [pending, confirmed, todayCount, total, recent] = await Promise.all([
    db.booking.count({ where: { status: "PENDING" } }),
    db.booking.count({ where: { status: "CONFIRMED" } }),
    db.booking.count({ where: { pickupAt: { gte: startOfDay, lt: endOfDay } } }),
    db.booking.count(),
    db.booking.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);
  return { pending, confirmed, todayCount, total, recent };
}

export default async function DashboardPage() {
  const { pending, confirmed, todayCount, total, recent } = await getStats();

  const cards = [
    { label: "Offene Anfragen", value: pending, href: "/admin/buchungen?status=PENDING", accent: true },
    { label: "Bestätigt", value: confirmed, href: "/admin/buchungen?status=CONFIRMED" },
    { label: "Fahrten heute", value: todayCount, href: "/admin/buchungen" },
    { label: "Buchungen gesamt", value: total, href: "/admin/buchungen" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-ink">Übersicht</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`rounded-xl border p-5 transition-shadow hover:shadow-sm ${
              c.accent ? "border-brand bg-brand/5" : "border-border bg-background"
            }`}
          >
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-1 text-3xl font-bold text-ink">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-bold text-ink">Neueste Buchungen</h2>
          <Link href="/admin/buchungen" className="text-sm font-medium text-brand-dark">
            Alle ansehen →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted">Noch keine Buchungen.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((b) => (
              <li key={b.id} className="flex items-center justify-between px-5 py-3 text-sm">
                <div>
                  <span className="font-medium text-ink">{b.reference}</span>{" "}
                  <span className="text-muted">· {b.customerName}</span>
                  <div className="text-xs text-muted">
                    {b.pickupAddress} → {b.dropoffAddress}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted">{STATUS_LABELS[b.status]}</div>
                  {b.estimatedPrice != null && (
                    <div className="font-medium text-ink">{formatPrice(b.estimatedPrice)}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
