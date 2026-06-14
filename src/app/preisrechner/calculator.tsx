"use client";

import { useMemo, useState } from "react";
import {
  calculateFare,
  formatPrice,
  type TariffConfig,
} from "@/lib/tariff";

type FixedRoute = { id: string; label: string; price: number };

export function PriceCalculator({
  config,
  fixedRoutes,
}: {
  config: TariffConfig;
  fixedRoutes: FixedRoute[];
}) {
  const [tab, setTab] = useState<"distance" | "fixed">("distance");
  const [km, setKm] = useState("10");
  const [waiting, setWaiting] = useState("0");
  const [when, setWhen] = useState("");
  const [routeId, setRouteId] = useState(fixedRoutes[0]?.id ?? "");

  const result = useMemo(() => {
    const distanceKm = parseFloat(km) || 0;
    const waitingMin = parseInt(waiting) || 0;
    const dateTime = when ? new Date(when) : new Date();
    return calculateFare({ distanceKm, waitingMin, dateTime }, config);
  }, [km, waiting, when, config]);

  const selectedRoute = fixedRoutes.find((r) => r.id === routeId);

  return (
    <div className="max-w-2xl">
      <div className="mb-6 inline-flex rounded-lg border border-border p-1">
        <button
          onClick={() => setTab("distance")}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            tab === "distance" ? "bg-brand text-brand-foreground" : "text-ink-soft"
          }`}
        >
          Nach Distanz
        </button>
        {fixedRoutes.length > 0 && (
          <button
            onClick={() => setTab("fixed")}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              tab === "fixed" ? "bg-brand text-brand-foreground" : "text-ink-soft"
            }`}
          >
            Festpreis-Ziele
          </button>
        )}
      </div>

      {tab === "distance" ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="text-sm font-medium text-ink">Distanz (km)</span>
              <input
                type="number" min="0" step="0.1" value={km}
                onChange={(e) => setKm(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Wartezeit (Min.)</span>
              <input
                type="number" min="0" value={waiting}
                onChange={(e) => setWaiting(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Zeitpunkt</span>
              <input
                type="datetime-local" value={when}
                onChange={(e) => setWhen(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </label>
          </div>

          <FareResult result={result} />
        </div>
      ) : (
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-ink">Ziel auswählen</span>
            <select
              value={routeId}
              onChange={(e) => setRouteId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
            >
              {fixedRoutes.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </label>
          {selectedRoute && (
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="text-sm text-muted">{selectedRoute.label}</p>
              <p className="mt-1 text-3xl font-bold text-ink">
                {formatPrice(selectedRoute.price, config.currency)}
              </p>
              <p className="mt-1 text-xs text-muted">Festpreis</p>
            </div>
          )}
        </div>
      )}

      <p className="mt-6 text-xs text-muted">
        Alle Preise sind unverbindliche Schätzungen nach dem Vorarlberger Tarif.
        Der endgültige Preis kann je nach Strecke, Verkehr und Wartezeit
        abweichen.
      </p>
    </div>
  );
}

function FareResult({
  result,
}: {
  result: ReturnType<typeof calculateFare>;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted">Geschätzter Preis</span>
        <span className="text-3xl font-bold text-ink">
          {formatPrice(result.total, result.currency)}
        </span>
      </div>
      <dl className="mt-4 space-y-1 border-t border-border pt-4 text-sm text-ink-soft">
        <Row label="Grundtaxe" value={formatPrice(result.baseFare, result.currency)} />
        {result.tier1.km > 0 && (
          <Row label={`Strecke Stufe 1 (${result.tier1.km} km)`} value={formatPrice(result.tier1.price, result.currency)} />
        )}
        {result.tier2.km > 0 && (
          <Row label={`Strecke Stufe 2 (${result.tier2.km} km)`} value={formatPrice(result.tier2.price, result.currency)} />
        )}
        {result.tier3.km > 0 && (
          <Row label={`Strecke Stufe 3 (${result.tier3.km} km)`} value={formatPrice(result.tier3.price, result.currency)} />
        )}
        {result.waiting > 0 && (
          <Row label="Wartezeit" value={formatPrice(result.waiting, result.currency)} />
        )}
        {result.nightSurcharge > 0 && (
          <Row label="Nachtaufschlag" value={formatPrice(result.nightSurcharge, result.currency)} />
        )}
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt>{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
