import { test } from "node:test";
import assert from "node:assert/strict";
import { generateReference, bookingSchema } from "./booking.ts";

test("generateReference hat Format TT-XXXXXX", () => {
  const ref = generateReference();
  assert.match(ref, /^TT-[A-Z2-9]{6}$/);
});

test("generateReference ist (praktisch) eindeutig", () => {
  const set = new Set(Array.from({ length: 500 }, () => generateReference()));
  assert.ok(set.size > 490); // sehr geringe Kollisionswahrscheinlichkeit
});

test("bookingSchema akzeptiert gültige Eingabe", () => {
  const r = bookingSchema.safeParse({
    pickupAddress: "Bregenz",
    dropoffAddress: "Dornbirn",
    pickupAt: "2026-07-01T10:00",
    passengers: "2",
    luggage: "1",
    customerName: "Max Muster",
    customerPhone: "+4312345",
  });
  assert.equal(r.success, true);
  if (r.success) {
    assert.equal(r.data.passengers, 2); // coerce zu number
    assert.equal(r.data.tripType, "ONE_WAY"); // default
  }
});

test("bookingSchema lehnt fehlende Pflichtfelder ab", () => {
  const r = bookingSchema.safeParse({ pickupAddress: "B" });
  assert.equal(r.success, false);
});
