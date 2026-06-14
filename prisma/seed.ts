import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth/password.ts";

const db = new PrismaClient();

async function main() {
  // Standard-Tarif
  await db.tariffSettings.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  });

  // Festpreis-Ziele (Flughäfen) — Platzhalterpreise
  const routes = [
    { label: "Bregenz → Flughafen Zürich (ZRH)", price: 220 },
    { label: "Bregenz → Flughafen Friedrichshafen (FDH)", price: 70 },
    { label: "Bregenz → Flughafen Memmingen (FMM)", price: 160 },
    { label: "Bregenz → Flughafen Altenrhein (ACH)", price: 60 },
    { label: "Dornbirn → Flughafen Zürich (ZRH)", price: 230 },
    { label: "Feldkirch → Flughafen Zürich (ZRH)", price: 200 },
  ];
  for (const r of routes) {
    const exists = await db.fixedRoute.findFirst({ where: { label: r.label } });
    if (!exists) await db.fixedRoute.create({ data: r });
  }

  // Fahrzeuge
  const vehicles = [
    { name: "Standard-Limousine", type: "Standard", seats: 4 },
    { name: "Großraum-Van", type: "Van", seats: 8 },
    { name: "Barrierefreies Fahrzeug", type: "Barrierefrei", seats: 4 },
  ];
  for (const v of vehicles) {
    const exists = await db.vehicle.findFirst({ where: { name: v.name } });
    if (!exists) await db.vehicle.create({ data: v });
  }

  // Admin-Benutzer (Standardzugang — nach erstem Login ändern!)
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@tal-taxi.at";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin1234";
  await db.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Administrator",
      passwordHash: hashPassword(adminPassword),
      role: "OWNER",
    },
  });

  console.log("✅ Seed abgeschlossen.");
  console.log(`   Admin-Login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
