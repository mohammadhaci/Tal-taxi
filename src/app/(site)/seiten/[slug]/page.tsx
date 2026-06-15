import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PageShell } from "@/components/page-shell";

export const dynamic = "force-dynamic";

async function getPage(slug: string) {
  try {
    return await db.page.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? undefined,
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page || !page.published) notFound();

  const paragraphs = page.content.split(/\n{2,}/).filter(Boolean);

  return (
    <PageShell title={page.title}>
      <div className="max-w-2xl space-y-4 text-ink-soft">
        {paragraphs.length > 0 ? (
          paragraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-line">{p}</p>
          ))
        ) : (
          <p className="text-muted">Diese Seite hat noch keinen Inhalt.</p>
        )}
      </div>
    </PageShell>
  );
}
