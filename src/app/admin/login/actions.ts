"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  next: z.string().optional(),
});

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: "Bitte E-Mail und Passwort eingeben." };

  const { email, password, next } = parsed.data;
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "E-Mail oder Passwort ist falsch." };
  }

  await createSession({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name ?? undefined,
  });

  redirect(next && next.startsWith("/admin") ? next : "/admin");
}
