"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth/session";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function upsertPage(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const slug = slugify(String(formData.get("slug") || title));
  const content = String(formData.get("content") || "");
  const published = formData.get("published") === "on";
  const metaTitle = String(formData.get("metaTitle") || "") || null;
  const metaDescription = String(formData.get("metaDescription") || "") || null;
  if (!title || !slug) return;

  if (id) {
    await db.page.update({
      where: { id },
      data: { title, slug, content, published, metaTitle, metaDescription },
    });
  } else {
    await db.page.create({
      data: { title, slug, content, published, metaTitle, metaDescription },
    });
  }
  revalidatePath("/admin/inhalte");
  revalidatePath(`/seiten/${slug}`);
}

export async function deletePage(formData: FormData) {
  await requireSession();
  await db.page.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/inhalte");
}
