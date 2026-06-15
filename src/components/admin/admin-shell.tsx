import Link from "next/link";
import { logout } from "@/app/admin/(panel)/logout-action";

const NAV = [
  { href: "/admin", label: "Übersicht", icon: "📊" },
  { href: "/admin/buchungen", label: "Buchungen", icon: "📅" },
  { href: "/admin/tarif", label: "Tarif & Preise", icon: "💶" },
  { href: "/admin/flotte", label: "Flotte & Fahrer", icon: "🚖" },
  { href: "/admin/inhalte", label: "Inhalte", icon: "📝" },
  { href: "/admin/einstellungen", label: "Einstellungen", icon: "⚙️" },
];

export function AdminShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName?: string;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-background md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand font-extrabold text-brand-foreground">
            T
          </span>
          <span className="font-bold text-ink">Tal Taxi Admin</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-surface"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <Link href="/" className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface">
            ← Zur Website
          </Link>
        </div>
      </aside>

      {/* Hauptbereich */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-5">
          {/* Mobile-Navigation */}
          <nav className="flex gap-3 overflow-x-auto md:hidden">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap text-sm text-ink-soft">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:inline">{userName ?? "Admin"}</span>
            <form action={logout}>
              <button className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-ink-soft hover:bg-surface">
                Abmelden
              </button>
            </form>
          </div>
        </header>
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
