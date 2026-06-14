import "server-only";
import { db } from "@/lib/db";
import { DEFAULT_TARIFF, type TariffConfig } from "@/lib/tariff";

/**
 * Lädt die Tarifkonfiguration aus der Datenbank.
 * Fällt auf sinnvolle Standardwerte zurück, falls noch nichts gespeichert ist.
 */
export async function getTariffConfig(): Promise<TariffConfig> {
  try {
    const row = await db.tariffSettings.findUnique({ where: { id: "default" } });
    if (!row) return DEFAULT_TARIFF;
    return {
      baseFare: row.baseFare,
      pricePerKmTier1: row.pricePerKmTier1,
      tier1EndKm: row.tier1EndKm,
      pricePerKmTier2: row.pricePerKmTier2,
      tier2EndKm: row.tier2EndKm,
      pricePerKmTier3: row.pricePerKmTier3,
      nightSurchargePct: row.nightSurchargePct,
      nightStartHour: row.nightStartHour,
      nightEndHour: row.nightEndHour,
      waitingPricePerMin: row.waitingPricePerMin,
      freeWaitingMin: row.freeWaitingMin,
      minFare: row.minFare,
      currency: row.currency,
    };
  } catch {
    return DEFAULT_TARIFF;
  }
}

export async function getActiveFixedRoutes() {
  try {
    return await db.fixedRoute.findMany({
      where: { active: true },
      orderBy: { label: "asc" },
    });
  } catch {
    return [];
  }
}
