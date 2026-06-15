"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth/session";
import { hashPassword } from "@/lib/auth/password";
import { SETTING_KEYS } from "@/lib/site-settings";

export async function saveSettings(formData: FormData) {
  await requireSession();
  for (const key of SETTING_KEYS) {
    const value = String(formData.get(key) ?? "");
    await db.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  revalidatePath("/", "layout"); // gesamte Website neu rendern
}

export type PasswordState = { ok?: boolean; error?: string };

export async function changePassword(
  _prev: PasswordState,
  formData: FormData
): Promise<PasswordState> {
  const session = await requireSession();
  const pw = String(formData.get("password") || "");
  if (pw.length < 8) return { error: "Passwort muss mind. 8 Zeichen haben." };
  await db.user.update({
    where: { id: session.sub },
    data: { passwordHash: hashPassword(pw) },
  });
  return { ok: true };
}
