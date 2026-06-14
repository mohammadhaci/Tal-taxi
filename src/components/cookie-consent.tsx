"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "tt-cookie-consent";

/** DSGVO-Cookie-Hinweis (in Österreich/EU erforderlich). */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function decide(value: "accepted" | "declined") {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          Wir verwenden Cookies, um unsere Website bestmöglich bereitzustellen.
          Mehr dazu in unserer{" "}
          <Link href="/datenschutz" className="font-medium text-brand-dark underline">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide("declined")}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink-soft hover:bg-surface"
          >
            Ablehnen
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand-dark"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
