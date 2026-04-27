import Link from "next/link";
import { LogoutButton } from "@/app/dashboard/LogoutButton";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { getDashboardLivrableContext } from "@/lib/dashboard-livrable";
import { getDashboardNavModel } from "@/lib/dashboard-nav";

const navItemClass =
  "block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-stone-50";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, livrable } = await getDashboardLivrableContext();
  const nav = getDashboardNavModel(livrable);

  const emailPrefix = session.user.email?.split("@")[0] ?? "";
  const inferredName = emailPrefix
    .split(/[._-]/)[0]
    ?.trim()
    .replace(/^\w/, (char) => char.toUpperCase());
  const firstName = session.user.name ?? inferredName ?? "vous";

  return (
    <main className="min-h-screen bg-[#fafaf9] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden min-h-screen w-72 shrink-0 border-r border-stone-200 bg-white p-6 lg:flex lg:flex-col">
          <Link href="/" className="inline-flex" aria-label="Fortyn — accueil">
            <BrandLogo size="md" />
          </Link>
          <nav className="mt-8 space-y-1 text-sm">
            <Link href="/dashboard" className={navItemClass}>
              Tableau de bord
            </Link>
            <Link href="/dashboard/chat" className={navItemClass}>
              Entretien
            </Link>
            {nav.auditHref ? (
              <Link href={nav.auditHref} className={navItemClass}>
                Audit métier
              </Link>
            ) : (
              <span className="block rounded-md px-3 py-2 text-sm text-slate-400">Audit métier</span>
            )}
            {nav.roadmapHref ? (
              <Link href={nav.roadmapHref} className={navItemClass}>
                Roadmap
              </Link>
            ) : (
              <span className="block rounded-md px-3 py-2 text-sm text-slate-400">Roadmap</span>
            )}
            {nav.v1Href ? (
              <Link href={nav.v1Href} className={navItemClass}>
                Définition V1
              </Link>
            ) : (
              <span className="block rounded-md px-3 py-2 text-sm text-slate-400">Définition V1</span>
            )}
          </nav>

          <div className="mt-auto rounded-lg border border-stone-200 p-3 text-sm">
            <p className="font-medium text-slate-800">{firstName}</p>
            <p className="truncate text-xs text-slate-500">{session.user.email}</p>
            <div className="mt-3">
              <LogoutButton />
            </div>
          </div>
        </aside>

        <div className="min-h-screen min-w-0 flex-1 overflow-y-auto p-5 sm:p-8">{children}</div>
      </div>
    </main>
  );
}
