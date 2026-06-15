import { PageShell, PlaceholderNote } from "@/components/page-shell";

export const metadata = { title: "Datenschutzerklärung" };

export default function Page() {
  return (
    <PageShell
      title="Datenschutzerklärung"
      intro="Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO."
    >
      <PlaceholderNote phase="Phase 5 (rechtlich geprüfte Endfassung)" />
    </PageShell>
  );
}
