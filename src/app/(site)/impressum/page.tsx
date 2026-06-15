import { PageShell } from "@/components/page-shell";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata = { title: "Impressum" };

export default async function Page() {
  const s = await getSiteSettings();
  return (
    <PageShell title="Impressum">
      <div className="max-w-2xl space-y-4 text-sm text-ink-soft">
        <div className="space-y-1">
          <p className="font-semibold text-ink">{s.legalCompany}</p>
          <p>Inhaber: {s.legalOwner}</p>
          <p>{s.street}, {s.zip} {s.city}, Österreich</p>
          <p>Tel.: {s.phone} · E-Mail: {s.email}</p>
          <p>UID: {s.uid} · GISA: {s.gisa}</p>
        </div>
        <div className="space-y-1 border-t border-border pt-4">
          <p className="font-semibold text-ink">Unternehmensgegenstand</p>
          <p>Personenbeförderung (Taxi- und Mietwagengewerbe).</p>
        </div>
        <div className="space-y-1 border-t border-border pt-4">
          <p className="font-semibold text-ink">Online-Streitbeilegung</p>
          <p>
            Verbraucher haben die Möglichkeit, Beschwerden an die
            Online-Streitbeilegungsplattform der EU zu richten:
            https://ec.europa.eu/odr
          </p>
        </div>
        <p className="text-xs text-muted">
          Hinweis: Bitte vor Veröffentlichung rechtlich prüfen lassen.
        </p>
      </div>
    </PageShell>
  );
}
