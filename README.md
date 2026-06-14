# Tal Taxi

Website mit Online-Buchung und professionellem Admin-Bereich für ein
Taxiunternehmen in Vorarlberg (Österreich). Sprache der Website: **Deutsch**.

> Die vollständige Projektplanung steht in [`PLAN.md`](./PLAN.md).

## Tech-Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** + eigenes Design-System
- **Prisma 6** ORM (lokal SQLite, Produktion PostgreSQL)
- **Zod** für Validierung
- Geplant: Auth.js (Admin), Google Maps (Distanz/Tarif), Resend (E-Mails)

## Entwicklung

```bash
npm install
cp .env.example .env      # Werte eintragen
npm run db:push           # Datenbankschema anwenden
npm run dev               # http://localhost:3000
```

### Nützliche Skripte

| Befehl | Beschreibung |
|--------|--------------|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Produktions-Build |
| `npm run db:push` | Prisma-Schema in DB übernehmen |
| `npm run db:studio` | Prisma Studio (DB-Oberfläche) |

## Projektstruktur

```
src/
  app/            # Seiten (Deutsch) — Start, Dienstleistungen, Preisrechner,
                  #   Buchen, FAQ, Kontakt, Über uns, Impressum, Datenschutz, AGB
  components/     # UI-Komponenten (Header, Footer, Page-Shell)
  lib/            # company.ts (Firmendaten), db.ts (Prisma-Client)
prisma/
  schema.prisma   # Datenmodell (Buchungen, Tarif, CMS, Flotte, Nutzer)
```

## Status

- ✅ **Phase 0:** Projekt-Setup, Design-System, Datenmodell, Grundseiten (Platzhalter)
- ⏳ Phase 1: Öffentliche Website mit Inhalten
- ⏳ Phase 2: Tarif-Engine & Preisrechner
- ⏳ Phase 3: Buchungssystem & Benachrichtigungen
- ⏳ Phase 4: Admin-Bereich (CMS, Buchungen, Tarif)
- ⏳ Phase 5: Recht, SEO, Feinschliff, Deployment
