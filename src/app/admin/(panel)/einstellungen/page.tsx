import { getSiteSettings } from "@/lib/site-settings";
import { saveSettings } from "./actions";
import { PasswordForm } from "./password-form";

function Text({
  label,
  name,
  value,
  textarea,
}: {
  label: string;
  name: string;
  value: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {textarea ? (
        <textarea name={name} defaultValue={value} rows={3} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand" />
      ) : (
        <input name={name} defaultValue={value} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand" />
      )}
    </label>
  );
}

export default async function SettingsPage() {
  const s = await getSiteSettings();

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-2xl font-bold text-ink">Einstellungen</h1>

      <form action={saveSettings} className="space-y-6 rounded-xl border border-border bg-background p-6">
        <section>
          <h2 className="mb-3 font-bold text-ink">Startseite</h2>
          <div className="space-y-4">
            <Text label="Hero-Überschrift" name="heroTitle" value={s.heroTitle} />
            <Text label="Hero-Untertitel" name="heroSubtitle" value={s.heroSubtitle} textarea />
            <Text label="Slogan (Footer)" name="tagline" value={s.tagline} />
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-bold text-ink">Firmendaten</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Text label="Firmenname" name="companyName" value={s.companyName} />
            <Text label="Telefon" name="phone" value={s.phone} />
            <Text label="WhatsApp" name="whatsapp" value={s.whatsapp} />
            <Text label="E-Mail" name="email" value={s.email} />
            <Text label="Straße" name="street" value={s.street} />
            <Text label="PLZ" name="zip" value={s.zip} />
            <Text label="Ort" name="city" value={s.city} />
            <Text label="Öffnungszeiten" name="hours" value={s.hours} />
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-bold text-ink">Impressum</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Text label="Rechtl. Firmenname" name="legalCompany" value={s.legalCompany} />
            <Text label="Inhaber" name="legalOwner" value={s.legalOwner} />
            <Text label="UID-Nummer" name="uid" value={s.uid} />
            <Text label="GISA-Zahl" name="gisa" value={s.gisa} />
          </div>
        </section>

        <button className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-dark">
          Speichern
        </button>
      </form>

      <div className="rounded-xl border border-border bg-background p-6">
        <h2 className="mb-3 font-bold text-ink">Passwort ändern</h2>
        <PasswordForm />
      </div>
    </div>
  );
}
