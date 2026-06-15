"use server";

import { db } from "@/lib/db";
import { sendMail } from "@/lib/mail";
import { COMPANY } from "@/lib/company";
import { bookingSchema, generateReference } from "@/lib/booking";
import { getTariffConfig } from "@/lib/tariff-settings";
import { calculateFare, formatPrice } from "@/lib/tariff";

export type BookingState = {
  ok?: boolean;
  reference?: string;
  error?: string;
};

export async function createBooking(
  _prev: BookingState,
  formData: FormData
): Promise<BookingState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." };
  }
  const d = parsed.data;
  if (d.website) return { ok: true, reference: "TT-XXXXXX" }; // Bot

  // Preis serverseitig ermitteln (Vertrauensgrenze)
  let estimatedPrice: number | null = null;
  if (d.fixedRouteId) {
    const route = await db.fixedRoute.findUnique({ where: { id: d.fixedRouteId } });
    if (route) estimatedPrice = route.price;
  }
  if (estimatedPrice === null && d.distanceKm && d.distanceKm > 0) {
    const cfg = await getTariffConfig();
    estimatedPrice = calculateFare(
      { distanceKm: d.distanceKm, dateTime: new Date(d.pickupAt) },
      cfg
    ).total;
  }

  // Eindeutige Referenz erzeugen (mit kleiner Wiederholung bei Kollision)
  let reference = generateReference();
  for (let i = 0; i < 5; i++) {
    const exists = await db.booking.findUnique({ where: { reference } });
    if (!exists) break;
    reference = generateReference();
  }

  try {
    await db.booking.create({
      data: {
        reference,
        tripType: d.tripType,
        pickupAddress: d.pickupAddress,
        dropoffAddress: d.dropoffAddress,
        pickupAt: new Date(d.pickupAt),
        returnAt: d.returnAt ? new Date(d.returnAt) : null,
        passengers: d.passengers,
        luggage: d.luggage,
        vehicleType: d.vehicleType || null,
        notes: d.notes || null,
        distanceKm: d.distanceKm ?? null,
        estimatedPrice,
        customerName: d.customerName,
        customerPhone: d.customerPhone,
        customerEmail: d.customerEmail || null,
      },
    });
  } catch (e) {
    console.error("[buchen] Fehler beim Speichern:", e);
    return { error: "Buchung fehlgeschlagen. Bitte rufen Sie uns an." };
  }

  // Benachrichtigungen (best effort)
  const priceLine =
    estimatedPrice !== null
      ? `<p><strong>Geschätzter Preis:</strong> ${formatPrice(estimatedPrice)}</p>`
      : "";
  const summary = `
    <p><strong>Buchungsnummer:</strong> ${reference}</p>
    <p><strong>Von:</strong> ${d.pickupAddress}</p>
    <p><strong>Nach:</strong> ${d.dropoffAddress}</p>
    <p><strong>Zeit:</strong> ${new Date(d.pickupAt).toLocaleString("de-AT")}</p>
    <p><strong>Personen:</strong> ${d.passengers} · <strong>Gepäck:</strong> ${d.luggage}</p>
    ${priceLine}`;

  try {
    await sendMail({
      to: process.env.BOOKING_NOTIFY_EMAIL ?? COMPANY.email,
      subject: `Neue Buchung ${reference} — ${d.customerName}`,
      html: `<h2>Neue Buchungsanfrage</h2>${summary}
        <p><strong>Kontakt:</strong> ${d.customerName}, ${d.customerPhone}${
          d.customerEmail ? `, ${d.customerEmail}` : ""
        }</p>
        ${d.notes ? `<p><strong>Hinweis:</strong> ${d.notes}</p>` : ""}`,
    });
    if (d.customerEmail) {
      await sendMail({
        to: d.customerEmail,
        subject: `Ihre Buchung bei ${COMPANY.name} (${reference})`,
        html: `<h2>Vielen Dank für Ihre Buchung!</h2>
          <p>Wir haben Ihre Anfrage erhalten und bestätigen sie in Kürze.</p>
          ${summary}
          <p>Bei Fragen erreichen Sie uns unter ${COMPANY.phone}.</p>`,
      });
    }
  } catch (e) {
    console.error("[buchen] E-Mail-Fehler (Buchung gespeichert):", e);
  }

  return { ok: true, reference };
}
