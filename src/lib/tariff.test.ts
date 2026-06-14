import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateFare, DEFAULT_TARIFF, type TariffConfig } from "./tariff.ts";

// Feste Tarifkonfiguration für reproduzierbare Tests
const cfg: TariffConfig = {
  ...DEFAULT_TARIFF,
  baseFare: 3.5,
  pricePerKmTier1: 2,
  tier1EndKm: 5,
  pricePerKmTier2: 1.5,
  tier2EndKm: 10,
  pricePerKmTier3: 1,
  nightSurchargePct: 20,
  nightStartHour: 22,
  nightEndHour: 6,
  waitingPricePerMin: 0.5,
  freeWaitingMin: 2,
  minFare: 6,
};

// Tagfahrt (12 Uhr), damit kein Nachtaufschlag greift
const day = new Date("2026-06-14T12:00:00");
const night = new Date("2026-06-14T23:00:00");

test("Grundtaxe bei 0 km, aber Mindestfahrpreis greift", () => {
  const f = calculateFare({ distanceKm: 0, dateTime: day }, cfg);
  // baseFare 3.5 < minFare 6 → total = 6
  assert.equal(f.total, 6);
});

test("Kurzstrecke nur in Tier 1", () => {
  const f = calculateFare({ distanceKm: 3, dateTime: day }, cfg);
  // 3.5 + 3*2 = 9.5
  assert.equal(f.tier1.km, 3);
  assert.equal(f.tier2.km, 0);
  assert.equal(f.total, 9.5);
});

test("Degression über alle drei Stufen", () => {
  const f = calculateFare({ distanceKm: 15, dateTime: day }, cfg);
  // Tier1: 5*2=10 | Tier2: 5*1.5=7.5 | Tier3: 5*1=5 | base 3.5 => 26
  assert.equal(f.tier1.km, 5);
  assert.equal(f.tier2.km, 5);
  assert.equal(f.tier3.km, 5);
  assert.equal(f.total, 26);
});

test("Wartezeit mit Freiminuten", () => {
  const f = calculateFare({ distanceKm: 3, dateTime: day, waitingMin: 7 }, cfg);
  // 9.5 + (7-2)*0.5 = 9.5 + 2.5 = 12
  assert.equal(f.waiting, 2.5);
  assert.equal(f.total, 12);
});

test("Nachtaufschlag wird angewendet", () => {
  const f = calculateFare({ distanceKm: 3, dateTime: night }, cfg);
  // subtotal 9.5 * 1.2 = 11.4
  assert.equal(f.isNight, true);
  assert.equal(f.total, 11.4);
});

test("Kein Nachtaufschlag tagsüber", () => {
  const f = calculateFare({ distanceKm: 3, dateTime: day }, cfg);
  assert.equal(f.isNight, false);
  assert.equal(f.nightSurcharge, 0);
});
