/**
 * Tarif-Engine für Tal Taxi (Vorarlberger Tarif).
 *
 * Reine Berechnungslogik (ohne DB/IO), damit sie leicht testbar und
 * sowohl auf Server als auch Client nutzbar ist.
 *
 * Modell:
 *  - Grundtaxe (baseFare)
 *  - Kilometerpreis mit Degression in 3 Stufen
 *  - Tag-/Nacht-Aufschlag (prozentual)
 *  - Wartezeit (pro Minute, mit Freiminuten)
 *  - Mindestfahrpreis
 */

export type TariffConfig = {
  baseFare: number;
  pricePerKmTier1: number;
  tier1EndKm: number;
  pricePerKmTier2: number;
  tier2EndKm: number;
  pricePerKmTier3: number;
  nightSurchargePct: number;
  nightStartHour: number;
  nightEndHour: number;
  waitingPricePerMin: number;
  freeWaitingMin: number;
  minFare: number;
  currency: string;
};

/** Sinnvolle Standardwerte (Vorarlberger Tarif, ca.). Im Admin anpassbar. */
export const DEFAULT_TARIFF: TariffConfig = {
  baseFare: 3.5,
  pricePerKmTier1: 1.9,
  tier1EndKm: 7.5,
  pricePerKmTier2: 1.7,
  tier2EndKm: 15,
  pricePerKmTier3: 1.5,
  nightSurchargePct: 0,
  nightStartHour: 22,
  nightEndHour: 6,
  waitingPricePerMin: 0.5,
  freeWaitingMin: 0,
  minFare: 0,
  currency: "EUR",
};

export type FareInput = {
  distanceKm: number;
  /** Zeitpunkt der Fahrt (für Tag/Nacht-Aufschlag). */
  dateTime?: Date;
  /** Wartezeit in Minuten. */
  waitingMin?: number;
};

export type FareBreakdown = {
  baseFare: number;
  tier1: { km: number; price: number };
  tier2: { km: number; price: number };
  tier3: { km: number; price: number };
  distanceTotal: number;
  waiting: number;
  nightSurcharge: number;
  isNight: boolean;
  subtotal: number;
  total: number;
  currency: string;
};

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function isNightTime(date: Date, cfg: TariffConfig): boolean {
  const h = date.getHours();
  // Nachtfenster kann über Mitternacht gehen (z. B. 22–6 Uhr)
  if (cfg.nightStartHour <= cfg.nightEndHour) {
    return h >= cfg.nightStartHour && h < cfg.nightEndHour;
  }
  return h >= cfg.nightStartHour || h < cfg.nightEndHour;
}

/** Berechnet den (unverbindlichen) Fahrpreis nach dem Tarifmodell. */
export function calculateFare(
  input: FareInput,
  cfg: TariffConfig = DEFAULT_TARIFF
): FareBreakdown {
  const distance = Math.max(0, input.distanceKm || 0);

  const km1 = Math.min(distance, cfg.tier1EndKm);
  const km2 = Math.min(
    Math.max(distance - cfg.tier1EndKm, 0),
    Math.max(cfg.tier2EndKm - cfg.tier1EndKm, 0)
  );
  const km3 = Math.max(distance - cfg.tier2EndKm, 0);

  const p1 = km1 * cfg.pricePerKmTier1;
  const p2 = km2 * cfg.pricePerKmTier2;
  const p3 = km3 * cfg.pricePerKmTier3;
  const distanceTotal = p1 + p2 + p3;

  const waitingBillable = Math.max(
    0,
    (input.waitingMin ?? 0) - cfg.freeWaitingMin
  );
  const waiting = waitingBillable * cfg.waitingPricePerMin;

  const date = input.dateTime ?? new Date();
  const isNight = isNightTime(date, cfg);

  let subtotal = cfg.baseFare + distanceTotal + waiting;
  const nightSurcharge =
    isNight && cfg.nightSurchargePct > 0
      ? subtotal * (cfg.nightSurchargePct / 100)
      : 0;
  subtotal += nightSurcharge;

  const total = Math.max(cfg.minFare, subtotal);

  return {
    baseFare: round2(cfg.baseFare),
    tier1: { km: round2(km1), price: round2(p1) },
    tier2: { km: round2(km2), price: round2(p2) },
    tier3: { km: round2(km3), price: round2(p3) },
    distanceTotal: round2(distanceTotal),
    waiting: round2(waiting),
    nightSurcharge: round2(nightSurcharge),
    isNight,
    subtotal: round2(subtotal),
    total: round2(total),
    currency: cfg.currency,
  };
}

export function formatPrice(value: number, currency = "EUR"): string {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency,
  }).format(value);
}
