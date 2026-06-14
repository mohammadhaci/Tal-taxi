"use server";

import { z } from "zod";
import { COMPANY } from "@/lib/company";
import { sendMail } from "@/lib/mail";

const schema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen an."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  message: z.string().min(5, "Bitte schreiben Sie eine Nachricht."),
  // Honeypot gegen Spam
  website: z.string().max(0).optional(),
});

export type ContactState = {
  ok?: boolean;
  error?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." };
  }
  if (parsed.data.website) {
    // Honeypot ausgefüllt → vermutlich Bot
    return { ok: true };
  }

  const { name, email, message } = parsed.data;
  try {
    await sendMail({
      to: COMPANY.email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>E-Mail:</strong> ${email}</p>
             <p><strong>Nachricht:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
    });
    return { ok: true };
  } catch (e) {
    console.error("[kontakt] Fehler beim Senden:", e);
    return { error: "Senden fehlgeschlagen. Bitte rufen Sie uns an." };
  }
}
