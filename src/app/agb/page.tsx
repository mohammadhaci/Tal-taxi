import { PageShell, PlaceholderNote } from "@/components/page-shell";

export const metadata = { title: "AGB" };

export default function Page() {
  return (
    <PageShell
      title="Allgemeine Geschäftsbedingungen"
      intro="Die Bedingungen für die Nutzung unserer Dienstleistungen."
    >
      <PlaceholderNote phase="Phase 5 (rechtlich geprüfte Endfassung)" />
    </PageShell>
  );
}
