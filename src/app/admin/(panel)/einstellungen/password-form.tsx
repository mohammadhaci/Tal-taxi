"use client";

import { useActionState } from "react";
import { changePassword, type PasswordState } from "./actions";

const initial: PasswordState = {};

export function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, initial);
  return (
    <form action={action} className="flex flex-wrap items-end gap-2">
      <label className="text-sm">
        <span className="font-medium text-ink">Neues Passwort</span>
        <input
          name="password" type="password" required minLength={8}
          className="mt-1 block w-64 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </label>
      <button
        type="submit" disabled={pending}
        className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-soft disabled:opacity-60"
      >
        {pending ? "…" : "Ändern"}
      </button>
      {state.ok && <span className="text-sm text-success">Gespeichert ✓</span>}
      {state.error && <span className="text-sm text-danger">{state.error}</span>}
    </form>
  );
}
