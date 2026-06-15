import { db } from "@/lib/db";
import { getTariffConfig } from "@/lib/tariff-settings";
import { formatPrice } from "@/lib/tariff";
import {
  updateTariff,
  addFixedRoute,
  deleteFixedRoute,
  toggleFixedRoute,
} from "./actions";

function Field({
  label,
  name,
  value,
  step = "0.1",
  hint,
}: {
  label: string;
  name: string;
  value: number | string;
  step?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        name={name}
        type="number"
        step={step}
        defaultValue={value}
        className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
      />
      {hint && <span className="mt-0.5 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export default async function TariffPage() {
  const [cfg, routes] = await Promise.all([
    getTariffConfig(),
    db.fixedRoute.findMany({ orderBy: { label: "asc" } }),
  ]);

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-2xl font-bold text-ink">Tarif & Preise</h1>

      <form action={updateTariff} className="space-y-6 rounded-xl border border-border bg-background p-6">
        <section>
          <h2 className="mb-3 font-bold text-ink">Grundwerte</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Grundtaxe (€)" name="baseFare" value={cfg.baseFare} />
            <Field label="Mindestfahrpreis (€)" name="minFare" value={cfg.minFare} />
            <label className="block">
              <span className="text-sm font-medium text-ink">Währung</span>
              <input name="currency" defaultValue={cfg.currency} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm" />
            </label>
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-bold text-ink">Kilometerpreise (Degression)</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Preis/km Stufe 1 (€)" name="pricePerKmTier1" value={cfg.pricePerKmTier1} />
            <Field label="Stufe 1 bis (km)" name="tier1EndKm" value={cfg.tier1EndKm} />
            <div />
            <Field label="Preis/km Stufe 2 (€)" name="pricePerKmTier2" value={cfg.pricePerKmTier2} />
            <Field label="Stufe 2 bis (km)" name="tier2EndKm" value={cfg.tier2EndKm} />
            <div />
            <Field label="Preis/km Stufe 3 (€)" name="pricePerKmTier3" value={cfg.pricePerKmTier3} hint="ab Stufe-2-Grenze" />
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-bold text-ink">Nacht & Wartezeit</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Nachtaufschlag (%)" name="nightSurchargePct" value={cfg.nightSurchargePct} step="1" />
            <Field label="Nacht ab (Stunde)" name="nightStartHour" value={cfg.nightStartHour} step="1" />
            <Field label="Nacht bis (Stunde)" name="nightEndHour" value={cfg.nightEndHour} step="1" />
            <Field label="Wartezeit (€/Min.)" name="waitingPricePerMin" value={cfg.waitingPricePerMin} />
            <Field label="Freiminuten" name="freeWaitingMin" value={cfg.freeWaitingMin} step="1" />
          </div>
        </section>

        <button className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-dark">
          Tarif speichern
        </button>
      </form>

      {/* Festpreis-Ziele */}
      <div className="rounded-xl border border-border bg-background p-6">
        <h2 className="mb-4 font-bold text-ink">Festpreis-Ziele</h2>

        <ul className="mb-4 divide-y divide-border">
          {routes.length === 0 && (
            <li className="py-3 text-sm text-muted">Noch keine Festpreise angelegt.</li>
          )}
          {routes.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-3">
              <div className={r.active ? "" : "opacity-50"}>
                <span className="text-sm font-medium text-ink">{r.label}</span>
                <span className="ml-2 text-sm text-muted">{formatPrice(r.price)}</span>
                {!r.active && <span className="ml-2 text-xs text-muted">(inaktiv)</span>}
              </div>
              <div className="flex gap-2">
                <form action={toggleFixedRoute}>
                  <input type="hidden" name="id" value={r.id} />
                  <button className="rounded-lg border border-border px-3 py-1 text-xs text-ink-soft hover:bg-surface">
                    {r.active ? "Deaktivieren" : "Aktivieren"}
                  </button>
                </form>
                <form action={deleteFixedRoute}>
                  <input type="hidden" name="id" value={r.id} />
                  <button className="rounded-lg border border-border px-3 py-1 text-xs text-danger hover:bg-danger/5">
                    Löschen
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>

        <form action={addFixedRoute} className="flex flex-wrap items-end gap-2 border-t border-border pt-4">
          <label className="flex-1 text-sm">
            <span className="font-medium text-ink">Bezeichnung</span>
            <input name="label" required placeholder="z. B. Bregenz → Flughafen Zürich" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="font-medium text-ink">Preis (€)</span>
            <input name="price" type="number" step="0.1" required className="mt-1 w-28 rounded-lg border border-border px-3 py-2 text-sm" />
          </label>
          <button className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-soft">
            Hinzufügen
          </button>
        </form>
      </div>
    </div>
  );
}
