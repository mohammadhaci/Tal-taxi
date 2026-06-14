import { PageShell, PlaceholderNote } from "@/components/page-shell";

export const metadata = { title: "Preisrechner" };

export default function Page() {
  return (
    <PageShell
      title="Preisrechner"
      intro="Berechnen Sie den ungefähren Fahrpreis nach dem Vorarlberger Tarif — inklusive Festpreisen für beliebte Strecken wie Flughafentransfers."
    >
      <PlaceholderNote phase="Phase 2 (Tarif-Engine & Distanzberechnung)" />
    </PageShell>
  );
}
