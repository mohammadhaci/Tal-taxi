import { LoginForm } from "./login-form";

export const metadata = { title: "Admin-Login", robots: { index: false } };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-background p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand font-extrabold text-brand-foreground">
            T
          </span>
          <span className="text-lg font-bold text-ink">Tal Taxi — Admin</span>
        </div>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
