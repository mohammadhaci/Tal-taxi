import { PageShell } from "@/components/page-shell";
import { getTariffConfig, getActiveFixedRoutes } from "@/lib/tariff-settings";
import { PriceCalculator } from "./calculator";

export const metadata = { title: "Preisrechner" };

export default async function Page() {
  const [config, routes] = await Promise.all([
    getTariffConfig(),
    getActiveFixedRoutes(),
  ]);

  const fixedRoutes = routes.map((r) => ({
    id: r.id,
    label: r.label,
    price: r.price,
  }));

  return (
    <PageShell
      title="Preisrechner"
      intro="Berechnen Sie den ungefähren Fahrpreis nach dem Vorarlberger Tarif — inklusive Festpreisen für beliebte Strecken wie Flughafentransfers."
    >
      <PriceCalculator config={config} fixedRoutes={fixedRoutes} />
    </PageShell>
  );
}
