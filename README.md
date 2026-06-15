# Tal Taxi

Website mit Online-Buchung und professionellem Admin-Bereich für ein
Taxiunternehmen in Vorarlberg (Österreich). Sprache der Website: **Deutsch**.

> Die vollständige Projektplanung steht in [`PLAN.md`](./PLAN.md).

## Funktionen

- **Öffentliche Website (Deutsch):** Start, Dienstleistungen, Preisrechner,
  Online-Buchung, Über uns, FAQ, Kontakt + rechtliche Seiten.
- **Preisrechner:** Tarif-Engine nach Vorarlberger Tarif (Degression, Nacht,
  Wartezeit) + Festpreis-Ziele.
- **Online-Buchung:** mehrstufiges Formular, Live-Preisschätzung,
  Buchungsnummer, E-Mail-Benachrichtigungen.
- **Admin-Bereich:** Dashboard, Buchungsverwaltung (bestätigen/ablehnen,
  Zuweisung), Tarifverwaltung, Flotte & Fahrer, bearbeitbare Inhalte/Einstellungen,
  Passwort ändern.
- **DSGVO:** Cookie-Banner, Impressum, Datenschutz, AGB.
- **SEO:** Metadaten, OpenGraph, JSON-LD (LocalBusiness), Sitemap, robots.

## Tech-Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **Prisma 6** ORM (lokal SQLite, Produktion PostgreSQL)
- **jose** (JWT-Session) · **Zod** (Validierung) · **Resend** (E-Mail)

## Entwicklung

```bash
npm install
cp .env.example .env      # Werte eintragen (AUTH_SECRET setzen!)
npm run db:push           # Datenbankschema anwenden
npm run db:seed           # Tarif, Festpreise, Fahrzeuge & Admin anlegen
npm run dev               # http://localhost:3000
```

**Standard-Admin nach Seed:** `admin@tal-taxi.at` / `admin1234`
(unbedingt nach dem ersten Login unter *Einstellungen* ändern).
Admin-Login: `/admin/login`

### Skripte

| Befehl | Beschreibung |
|--------|--------------|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Produktions-Build |
| `npm test` | Unit-Tests (Tarif & Buchung) |
| `npm run db:push` | Schema in DB übernehmen |
| `npm run db:seed` | Beispieldaten + Admin anlegen |
| `npm run db:studio` | Prisma Studio |

## Deployment (Vercel + PostgreSQL)

1. PostgreSQL-Datenbank anlegen (z. B. Neon/Vercel Postgres).
2. In `prisma/schema.prisma` `provider` von `sqlite` auf `postgresql` ändern.
3. Auf Vercel die Umgebungsvariablen aus `.env.example` setzen
   (insb. `DATABASE_URL`, `AUTH_SECRET`, `SITE_URL`).
4. Deploy. `prisma generate` läuft via `postinstall` automatisch.
5. Einmalig `prisma db push` und Seed gegen die Produktions-DB ausführen.

## Projektstruktur

```
src/
  app/
    (site)/         # Öffentliche Seiten (Deutsch)
    admin/          # Admin-Login + geschützter (panel)-Bereich
  components/       # UI (Header, Footer, Admin-Shell, …)
  lib/              # tariff, booking, auth, db, site-settings, mail
  middleware.ts     # Schutz von /admin
prisma/
  schema.prisma     # Datenmodell
  seed.ts           # Beispieldaten
```

## Status

- ✅ Phase 0: Setup, Design-System, Datenmodell
- ✅ Phase 1: Öffentliche Website, SEO, Kontakt, Cookie-Consent
- ✅ Phase 2: Tarif-Engine & Preisrechner (getestet)
- ✅ Phase 3: Buchungssystem & Benachrichtigungen
- ✅ Phase 4: Admin-Bereich (Buchungen, Tarif, Flotte, Inhalte, Einstellungen)
- ✅ Phase 5: Recht (DSGVO), SEO, Feinschliff, Deployment-Vorbereitung

### Offene Punkte (vor Go-Live)
- Echte Firmendaten, Tarifwerte & Festpreise im Admin eintragen.
- Rechtstexte (Impressum/Datenschutz/AGB) juristisch prüfen lassen.
- Optional: Google-Maps-Key für automatische Distanzberechnung.
- Produktive PostgreSQL-DB + Domain + E-Mail-Absender einrichten.
