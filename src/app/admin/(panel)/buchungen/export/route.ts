import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { STATUS_LABELS } from "@/lib/admin-format";

function csvCell(value: unknown): string {
  const s = value == null ? "" : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const bookings = await db.booking.findMany({ orderBy: { createdAt: "desc" } });

  const header = [
    "Buchungsnummer", "Status", "Erstellt", "Termin", "Von", "Nach",
    "Personen", "Gepäck", "Name", "Telefon", "E-Mail", "Preis (ca.)",
  ];
  const rows = bookings.map((b) =>
    [
      b.reference,
      STATUS_LABELS[b.status],
      b.createdAt.toISOString(),
      b.pickupAt.toISOString(),
      b.pickupAddress,
      b.dropoffAddress,
      b.passengers,
      b.luggage,
      b.customerName,
      b.customerPhone,
      b.customerEmail ?? "",
      b.estimatedPrice ?? "",
    ]
      .map(csvCell)
      .join(",")
  );

  // BOM für korrekte Umlaute in Excel
  const csv = "﻿" + [header.map(csvCell).join(","), ...rows].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="buchungen-${date}.csv"`,
    },
  });
}
