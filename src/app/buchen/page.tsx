import { PageShell } from "@/components/page-shell";
import { db } from "@/lib/db";
import { getTariffConfig, getActiveFixedRoutes } from "@/lib/tariff-settings";
import { BookingForm } from "./booking-form";

export const metadata = { title: "Online buchen" };
export const dynamic = "force-dynamic";

async function getVehicleTypes(): Promise<string[]> {
  try {
    const rows = await db.vehicle.findMany({
      where: { active: true },
      select: { type: true },
    });
    return Array.from(new Set(rows.map((r) => r.type)));
  } catch {
    return ["Standard", "Van", "Barrierefrei"];
  }
}

export default async function Page() {
  const [config, routes, vehicleTypes] = await Promise.all([
    getTariffConfig(),
    getActiveFixedRoutes(),
    getVehicleTypes(),
  ]);

  return (
    <PageShell
      title="Online buchen"
      intro="Buchen Sie Ihre Fahrt in wenigen Schritten. Sie erhalten eine Bestätigung, sobald wir Ihre Buchung geprüft haben. Die Bezahlung erfolgt bequem beim Fahrer."
    >
      <BookingForm
        config={config}
        fixedRoutes={routes.map((r) => ({ id: r.id, label: r.label, price: r.price }))}
        vehicleTypes={vehicleTypes}
      />
    </PageShell>
  );
}
