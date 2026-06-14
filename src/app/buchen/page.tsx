import { PageShell, PlaceholderNote } from "@/components/page-shell";

export const metadata = { title: "Online buchen" };

export default function Page() {
  return (
    <PageShell
      title="Online buchen"
      intro="Buchen Sie Ihre Fahrt in wenigen Schritten. Sie erhalten eine Bestätigung, sobald wir Ihre Buchung geprüft haben. Bezahlung bequem beim Fahrer."
    >
      <PlaceholderNote phase="Phase 3 (Buchungssystem & Benachrichtigungen)" />
    </PageShell>
  );
}
