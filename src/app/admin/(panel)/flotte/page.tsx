import { db } from "@/lib/db";
import {
  addVehicle,
  toggleVehicle,
  deleteVehicle,
  addDriver,
  toggleDriver,
  deleteDriver,
} from "./actions";

export default async function FleetPage() {
  const [vehicles, drivers] = await Promise.all([
    db.vehicle.findMany({ orderBy: { name: "asc" } }),
    db.driver.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="grid max-w-5xl gap-8 lg:grid-cols-2">
      {/* Fahrzeuge */}
      <section className="rounded-xl border border-border bg-background p-6">
        <h1 className="mb-4 text-xl font-bold text-ink">Fahrzeuge</h1>
        <ul className="mb-4 divide-y divide-border">
          {vehicles.length === 0 && <li className="py-3 text-sm text-muted">Keine Fahrzeuge.</li>}
          {vehicles.map((v) => (
            <li key={v.id} className={`flex items-center justify-between py-3 ${v.active ? "" : "opacity-50"}`}>
              <div>
                <p className="text-sm font-medium text-ink">{v.name}</p>
                <p className="text-xs text-muted">{v.type} · {v.seats} Sitze{!v.active && " · inaktiv"}</p>
              </div>
              <div className="flex gap-2">
                <form action={toggleVehicle}>
                  <input type="hidden" name="id" value={v.id} />
                  <button className="rounded-lg border border-border px-3 py-1 text-xs text-ink-soft hover:bg-surface">
                    {v.active ? "Deaktivieren" : "Aktivieren"}
                  </button>
                </form>
                <form action={deleteVehicle}>
                  <input type="hidden" name="id" value={v.id} />
                  <button className="rounded-lg border border-border px-3 py-1 text-xs text-danger hover:bg-danger/5">Löschen</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
        <form action={addVehicle} className="space-y-2 border-t border-border pt-4">
          <input name="name" required placeholder="Bezeichnung (z. B. Mercedes V-Klasse)" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
          <div className="flex gap-2">
            <input name="type" placeholder="Typ (Standard/Van/…)" className="flex-1 rounded-lg border border-border px-3 py-2 text-sm" />
            <input name="seats" type="number" min={1} defaultValue={4} className="w-20 rounded-lg border border-border px-3 py-2 text-sm" />
          </div>
          <button className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-soft">Fahrzeug hinzufügen</button>
        </form>
      </section>

      {/* Fahrer */}
      <section className="rounded-xl border border-border bg-background p-6">
        <h1 className="mb-4 text-xl font-bold text-ink">Fahrer</h1>
        <ul className="mb-4 divide-y divide-border">
          {drivers.length === 0 && <li className="py-3 text-sm text-muted">Keine Fahrer.</li>}
          {drivers.map((d) => (
            <li key={d.id} className={`flex items-center justify-between py-3 ${d.active ? "" : "opacity-50"}`}>
              <div>
                <p className="text-sm font-medium text-ink">{d.name}</p>
                {d.phone && <p className="text-xs text-muted">{d.phone}</p>}
              </div>
              <div className="flex gap-2">
                <form action={toggleDriver}>
                  <input type="hidden" name="id" value={d.id} />
                  <button className="rounded-lg border border-border px-3 py-1 text-xs text-ink-soft hover:bg-surface">
                    {d.active ? "Deaktivieren" : "Aktivieren"}
                  </button>
                </form>
                <form action={deleteDriver}>
                  <input type="hidden" name="id" value={d.id} />
                  <button className="rounded-lg border border-border px-3 py-1 text-xs text-danger hover:bg-danger/5">Löschen</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
        <form action={addDriver} className="space-y-2 border-t border-border pt-4">
          <input name="name" required placeholder="Name" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
          <input name="phone" placeholder="Telefon (optional)" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
          <button className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-soft">Fahrer hinzufügen</button>
        </form>
      </section>
    </div>
  );
}
