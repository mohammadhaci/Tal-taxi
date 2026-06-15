"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createBooking, type BookingState } from "./actions";
import { calculateFare, formatPrice, type TariffConfig } from "@/lib/tariff";

type FixedRoute = { id: string; label: string; price: number };

const initial: BookingState = {};

const inputCls =
  "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand";

export function BookingForm({
  config,
  fixedRoutes,
  vehicleTypes,
}: {
  config: TariffConfig;
  fixedRoutes: FixedRoute[];
  vehicleTypes: string[];
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(createBooking, initial);
  const [step, setStep] = useState(1);

  // Felder für Live-Preisschätzung
  const [tripType, setTripType] = useState("ONE_WAY");
  const [distanceKm, setDistanceKm] = useState("");
  const [fixedRouteId, setFixedRouteId] = useState("");
  const [pickupAt, setPickupAt] = useState("");

  useEffect(() => {
    if (state.ok && state.reference) {
      router.push(`/buchen/danke?ref=${state.reference}`);
    }
  }, [state, router]);

  const estimate = useMemo(() => {
    if (fixedRouteId) {
      const r = fixedRoutes.find((x) => x.id === fixedRouteId);
      return r ? r.price : null;
    }
    const km = parseFloat(distanceKm);
    if (!km || km <= 0) return null;
    return calculateFare(
      { distanceKm: km, dateTime: pickupAt ? new Date(pickupAt) : new Date() },
      config
    ).total;
  }, [fixedRouteId, distanceKm, pickupAt, fixedRoutes, config]);

  return (
    <form action={action} className="max-w-2xl">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <Steps step={step} />

      {/* Schritt 1: Strecke */}
      <div className={step === 1 ? "block" : "hidden"}>
        <fieldset className="space-y-4">
          <div>
            <span className="text-sm font-medium text-ink">Fahrttyp</span>
            <div className="mt-1 flex gap-2">
              {[
                { v: "ONE_WAY", l: "Einfache Fahrt" },
                { v: "RETURN", l: "Hin & Rück" },
              ].map((o) => (
                <label
                  key={o.v}
                  className={`cursor-pointer rounded-lg border px-4 py-2 text-sm ${
                    tripType === o.v
                      ? "border-brand bg-brand/10 font-semibold text-ink"
                      : "border-border text-ink-soft"
                  }`}
                >
                  <input
                    type="radio" name="tripType" value={o.v}
                    checked={tripType === o.v}
                    onChange={(e) => setTripType(e.target.value)}
                    className="sr-only"
                  />
                  {o.l}
                </label>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-ink">Von (Abholadresse)</span>
            <input name="pickupAddress" required className={inputCls} placeholder="z. B. Bahnhof Bregenz" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Nach (Ziel)</span>
            <input name="dropoffAddress" required className={inputCls} placeholder="z. B. Flughafen Zürich" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-ink">Datum & Uhrzeit</span>
              <input
                type="datetime-local" name="pickupAt" required value={pickupAt}
                onChange={(e) => setPickupAt(e.target.value)} className={inputCls}
              />
            </label>
            {tripType === "RETURN" && (
              <label className="block">
                <span className="text-sm font-medium text-ink">Rückfahrt</span>
                <input type="datetime-local" name="returnAt" className={inputCls} />
              </label>
            )}
          </div>
        </fieldset>
        <StepNav onNext={() => setStep(2)} />
      </div>

      {/* Schritt 2: Details & Preis */}
      <div className={step === 2 ? "block" : "hidden"}>
        <fieldset className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-ink">Personen</span>
              <input type="number" name="passengers" min={1} max={16} defaultValue={1} className={inputCls} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Gepäckstücke</span>
              <input type="number" name="luggage" min={0} max={20} defaultValue={0} className={inputCls} />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-ink">Fahrzeugtyp</span>
            <select name="vehicleType" className={inputCls}>
              <option value="">Egal</option>
              {vehicleTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>

          <div className="rounded-lg border border-dashed border-border p-4">
            <p className="text-sm font-medium text-ink">Preisschätzung (optional)</p>
            <p className="text-xs text-muted">
              Wählen Sie ein Festpreis-Ziel oder geben Sie die ungefähre Distanz an.
            </p>
            {fixedRoutes.length > 0 && (
              <label className="mt-3 block">
                <span className="text-sm text-ink-soft">Festpreis-Ziel</span>
                <select
                  name="fixedRouteId" value={fixedRouteId}
                  onChange={(e) => setFixedRouteId(e.target.value)} className={inputCls}
                >
                  <option value="">— keines —</option>
                  {fixedRoutes.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </label>
            )}
            {!fixedRouteId && (
              <label className="mt-3 block">
                <span className="text-sm text-ink-soft">Ungefähre Distanz (km)</span>
                <input
                  type="number" name="distanceKm" min={0} step={0.1} value={distanceKm}
                  onChange={(e) => setDistanceKm(e.target.value)} className={inputCls}
                />
              </label>
            )}
            {estimate !== null && (
              <p className="mt-3 text-lg font-bold text-ink">
                ≈ {formatPrice(estimate, config.currency)}
                <span className="ml-2 text-xs font-normal text-muted">unverbindlich</span>
              </p>
            )}
          </div>

          <label className="block">
            <span className="text-sm font-medium text-ink">Anmerkungen</span>
            <textarea name="notes" rows={3} className={inputCls} placeholder="z. B. Kindersitz, Rollstuhl, Flugnummer …" />
          </label>
        </fieldset>
        <StepNav onBack={() => setStep(1)} onNext={() => setStep(3)} />
      </div>

      {/* Schritt 3: Kontakt */}
      <div className={step === 3 ? "block" : "hidden"}>
        <fieldset className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-ink">Name</span>
            <input name="customerName" required className={inputCls} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-ink">Telefon</span>
              <input name="customerPhone" required className={inputCls} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">E-Mail (optional)</span>
              <input type="email" name="customerEmail" className={inputCls} />
            </label>
          </div>
          <p className="text-xs text-muted">
            Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß
            unserer Datenschutzerklärung zu. Bezahlung erfolgt beim Fahrer.
          </p>
          {state.error && <p className="text-sm text-danger">{state.error}</p>}
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => setStep(2)} className="text-sm font-medium text-ink-soft hover:text-ink">
              ← Zurück
            </button>
            <button
              type="submit" disabled={pending}
              className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-dark disabled:opacity-60"
            >
              {pending ? "Wird gesendet…" : "Buchung absenden"}
            </button>
          </div>
        </fieldset>
      </div>
    </form>
  );
}

function Steps({ step }: { step: number }) {
  const labels = ["Strecke", "Details", "Kontakt"];
  return (
    <ol className="mb-8 flex items-center gap-2">
      {labels.map((l, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <li key={l} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                active || done ? "bg-brand text-brand-foreground" : "bg-surface text-muted"
              }`}
            >
              {n}
            </span>
            <span className={`text-sm ${active ? "font-semibold text-ink" : "text-muted"}`}>{l}</span>
            {n < 3 && <span className="hidden h-px flex-1 bg-border sm:block" />}
          </li>
        );
      })}
    </ol>
  );
}

function StepNav({ onBack, onNext }: { onBack?: () => void; onNext: () => void }) {
  return (
    <div className="mt-6 flex items-center justify-between">
      {onBack ? (
        <button type="button" onClick={onBack} className="text-sm font-medium text-ink-soft hover:text-ink">
          ← Zurück
        </button>
      ) : (
        <span />
      )}
      <button
        type="button" onClick={onNext}
        className="rounded-lg bg-ink px-6 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft"
      >
        Weiter →
      </button>
    </div>
  );
}
