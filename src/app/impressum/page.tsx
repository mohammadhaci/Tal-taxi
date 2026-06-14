import { PageShell, PlaceholderNote } from "@/components/page-shell";
import { COMPANY } from "@/lib/company";

export const metadata = { title: "Impressum" };

export default function Page() {
  return (
    <PageShell title="Impressum">
      <div className="max-w-2xl space-y-2 text-sm text-ink-soft">
        <p className="font-semibold text-ink">{COMPANY.legal.company}</p>
        <p>Inhaber: {COMPANY.legal.owner}</p>
        <p>{COMPANY.address.street}, {COMPANY.address.zip} {COMPANY.address.city}, {COMPANY.address.country}</p>
        <p>Tel.: {COMPANY.phone} · E-Mail: {COMPANY.email}</p>
        <p>UID: {COMPANY.legal.uid} · GISA: {COMPANY.legal.gisa}</p>
      </div>
      <div className="mt-8 max-w-2xl">
        <PlaceholderNote phase="Phase 5 (rechtlich geprüfte Endfassung)" />
      </div>
    </PageShell>
  );
}
