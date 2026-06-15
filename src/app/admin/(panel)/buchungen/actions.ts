"use server";

import { revalidatePath } from "next/cache";
import type { BookingStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/mail";
import { COMPANY } from "@/lib/company";
import { requireSession } from "@/lib/auth/session";

const VALID: BookingStatus[] = [
  "PENDING",
  "CONFIRMED",
  "REJECTED",
  "COMPLETED",
  "CANCELLED",
];

export async function setBookingStatus(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as BookingStatus;
  if (!id || !VALID.includes(status)) return;

  const booking = await db.booking.update({
    where: { id },
    data: { status },
  });

  // Kunden bei Bestätigung/Ablehnung informieren (best effort)
  if (booking.customerEmail && (status === "CONFIRMED" || status === "REJECTED")) {
    const confirmed = status === "CONFIRMED";
    await sendMail({
      to: booking.customerEmail,
      subject: `Ihre Buchung ${booking.reference} wurde ${confirmed ? "bestätigt" : "abgelehnt"}`,
      html: confirmed
        ? `<h2>Ihre Fahrt ist bestätigt!</h2>
           <p>Buchungsnummer: <strong>${booking.reference}</strong></p>
           <p>${booking.pickupAddress} → ${booking.dropoffAddress}</p>
           <p>Wir freuen uns auf Sie. Bei Fragen: ${COMPANY.phone}.</p>`
        : `<h2>Buchung leider nicht möglich</h2>
           <p>Ihre Anfrage ${booking.reference} konnten wir leider nicht bestätigen.
           Bitte kontaktieren Sie uns unter ${COMPANY.phone}.</p>`,
    }).catch((e) => console.error("[admin] Mail-Fehler:", e));
  }

  revalidatePath("/admin/buchungen");
  revalidatePath("/admin");
}

export async function assignBooking(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id"));
  const vehicleId = String(formData.get("vehicleId") || "");
  const driverId = String(formData.get("driverId") || "");
  const finalPriceRaw = formData.get("finalPrice");

  await db.booking.update({
    where: { id },
    data: {
      assignedVehicleId: vehicleId || null,
      assignedDriverId: driverId || null,
      finalPrice: finalPriceRaw ? Number(finalPriceRaw) || null : undefined,
    },
  });
  revalidatePath("/admin/buchungen");
}
