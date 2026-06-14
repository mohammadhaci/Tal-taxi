import { z } from "zod";

/** Erzeugt eine gut lesbare Buchungsnummer, z. B. "TT-7F3K9Q". */
export function generateReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // ohne verwechselbare Zeichen
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `TT-${code}`;
}

/** Validierungsschema für eingehende Buchungen. */
export const bookingSchema = z.object({
  tripType: z.enum(["ONE_WAY", "RETURN"]).default("ONE_WAY"),
  pickupAddress: z.string().min(2, "Bitte Abholadresse angeben."),
  dropoffAddress: z.string().min(2, "Bitte Zieladresse angeben."),
  pickupAt: z.string().min(1, "Bitte Datum und Uhrzeit angeben."),
  returnAt: z.string().optional(),
  passengers: z.coerce.number().int().min(1).max(16).default(1),
  luggage: z.coerce.number().int().min(0).max(20).default(0),
  vehicleType: z.string().optional(),
  notes: z.string().max(1000).optional(),
  distanceKm: z.coerce.number().min(0).optional(),
  fixedRouteId: z.string().optional(),
  customerName: z.string().min(2, "Bitte Namen angeben."),
  customerPhone: z.string().min(5, "Bitte Telefonnummer angeben."),
  customerEmail: z.string().email("Ungültige E-Mail.").optional().or(z.literal("")),
  // Honeypot
  website: z.string().max(0).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
