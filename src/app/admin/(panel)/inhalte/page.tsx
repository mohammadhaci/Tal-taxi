import Link from "next/link";
import { db } from "@/lib/db";
import { upsertPage, deletePage } from "./actions";

const inputCls =
  "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand";

export default async function ContentPage() {
  const pages = await db.page.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink">Inhalte</h1>
        <p className="mt-1 text-sm text-muted">
          Erstellen und bearbeiten Sie zusätzliche Seiten. Diese sind unter
          <code className="mx-1 rounded bg-surface px-1">/seiten/…</code>
          erreichbar.
        </p>
      </div>

      {/* Bestehende Seiten */}
      <div className="space-y-4">
        {pages.length === 0 && (
          <p className="rounded-xl border border-border bg-background px-5 py-6 text-sm text-muted">
            Noch keine Seiten erstellt.
          </p>
        )}
        {pages.map((p) => (
          <details key={p.id} className="rounded-xl border border-border bg-background p-5">
            <summary className="cursor-pointer text-sm font-medium text-ink">
              {p.title}{" "}
              <span className="text-muted">
                /seiten/{p.slug} {p.published ? "" : "· (Entwurf)"}
              </span>
            </summary>
            <form action={upsertPage} className="mt-4 space-y-3">
              <input type="hidden" name="id" value={p.id} />
              <PageFields
                title={p.title}
                slug={p.slug}
                content={p.content}
                published={p.published}
                metaTitle={p.metaTitle ?? ""}
                metaDescription={p.metaDescription ?? ""}
              />
              <div className="flex items-center justify-between">
                <button className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand-dark">
                  Speichern
                </button>
                {p.published && (
                  <Link href={`/seiten/${p.slug}`} className="text-sm text-brand-dark" target="_blank">
                    Ansehen ↗
                  </Link>
                )}
              </div>
            </form>
            <form action={deletePage} className="mt-2">
              <input type="hidden" name="id" value={p.id} />
              <button className="text-xs text-danger hover:underline">Seite löschen</button>
            </form>
          </details>
        ))}
      </div>

      {/* Neue Seite */}
      <div className="rounded-xl border border-border bg-background p-6">
        <h2 className="mb-4 font-bold text-ink">Neue Seite</h2>
        <form action={upsertPage} className="space-y-3">
          <PageFields />
          <button className="rounded-lg bg-ink px-5 py-2 text-sm font-semibold text-white hover:bg-ink-soft">
            Erstellen
          </button>
        </form>
      </div>
    </div>
  );
}

function PageFields({
  title = "",
  slug = "",
  content = "",
  published = true,
  metaTitle = "",
  metaDescription = "",
}: {
  title?: string;
  slug?: string;
  content?: string;
  published?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}) {
  return (
    <>
      <label className="block">
        <span className="text-sm font-medium text-ink">Titel</span>
        <input name="title" defaultValue={title} required className={inputCls} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">URL-Kürzel (optional)</span>
        <input name="slug" defaultValue={slug} placeholder="wird aus dem Titel erzeugt" className={inputCls} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Inhalt</span>
        <textarea name="content" defaultValue={content} rows={6} className={inputCls} placeholder="Text der Seite … (Absätze durch Leerzeilen trennen)" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Meta-Titel (SEO)</span>
          <input name="metaTitle" defaultValue={metaTitle} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Meta-Beschreibung</span>
          <input name="metaDescription" defaultValue={metaDescription} className={inputCls} />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="published" defaultChecked={published} className="h-4 w-4" />
        Veröffentlicht
      </label>
    </>
  );
}
