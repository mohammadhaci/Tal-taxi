import { Resend } from "resend";

/**
 * E-Mail-Versand mit Resend. Wenn kein API-Key gesetzt ist (z. B. in der
 * Entwicklung), wird der Versand übersprungen und nur protokolliert —
 * die App funktioniert trotzdem.
 */
const apiKey = process.env.RESEND_API_KEY;
const from = process.env.MAIL_FROM ?? "Tal Taxi <onboarding@resend.dev>";

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!apiKey) {
    console.info("[mail] RESEND_API_KEY fehlt — E-Mail wird nicht gesendet:", {
      to: opts.to,
      subject: opts.subject,
    });
    return { skipped: true };
  }
  const resend = new Resend(apiKey);
  await resend.emails.send({ from, ...opts });
  return { skipped: false };
}
