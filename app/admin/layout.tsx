import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Vue d'ensemble" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/us", label: "User stories" },
];

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Fortyn
            </p>
            <h1 className="text-lg font-semibold">Dashboard admin</h1>
          </div>
          <Link
            href="/"
            className="rounded-md border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-slate-700 hover:bg-stone-100"
          >
            Retour site
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-xl border border-stone-200 bg-white p-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
