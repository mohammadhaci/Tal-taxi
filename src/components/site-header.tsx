import Link from "next/link";
import { NAV_LINKS } from "@/lib/company";
import { getSiteSettings, telHref } from "@/lib/site-settings";

export async function SiteHeader() {
  const s = await getSiteSettings();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand font-extrabold text-brand-foreground">
            T
          </span>
          <span className="text-lg font-bold tracking-tight text-ink">
            {s.companyName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-brand-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(s.phone)}
            className="hidden text-sm font-semibold text-ink sm:inline"
          >
            {s.phone}
          </a>
          <Link
            href="/buchen"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-dark"
          >
            Jetzt buchen
          </Link>
        </div>
      </div>
    </header>
  );
}
