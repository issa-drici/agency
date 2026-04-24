import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { LogoutButton } from "@/app/dashboard/LogoutButton";
import { authOptions } from "@/lib/auth";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { ButtonLink } from "@/components/molecules/ButtonLink";

const deliverables = [
  {
    title: "Audit métier",
    status: "Prêt",
    description: "Vue claire des blocages actuels et des opportunités immédiates.",
    accent: "text-sky-600",
    icon: "🔎",
  },
  {
    title: "Roadmap priorisée",
    status: "3 phases",
    description: "Plan de déploiement progressif priorisé par impact business.",
    accent: "text-emerald-600",
    icon: "📈",
  },
  {
    title: "Définition V1",
    status: "8 fonctionnalités",
    description: "Périmètre fonctionnel initial pour une mise en production rapide.",
    accent: "text-orange-500",
    icon: "⚡",
  },
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const emailPrefix = session.user.email?.split("@")[0] ?? "";
  const inferredName = emailPrefix
    .split(/[._-]/)[0]
    ?.trim()
    .replace(/^\w/, (char) => char.toUpperCase());
  const firstName = session.user.name ?? inferredName ?? "vous";
  const generatedDate = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
  }).format(new Date());

  return (
    <main className="min-h-screen bg-[#fafaf9] text-slate-900">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden min-h-screen w-72 border-r border-stone-200 bg-white p-6 lg:flex lg:flex-col">
          <Link href="/" className="inline-flex" aria-label="CREWDEV — accueil">
            <BrandLogo size="md" />
          </Link>
          <nav className="mt-8 space-y-1 text-sm">
            {["Tableau de bord", "Audit métier", "Roadmap", "Définition V1"].map((item, index) => (
              <div
                key={item}
                className={`rounded-md px-3 py-2 ${
                  index === 0 ? "bg-sky-50 text-sky-700" : "text-slate-600"
                }`}
              >
                {item}
              </div>
            ))}
          </nav>

          <div className="mt-auto rounded-lg border border-stone-200 p-3 text-sm">
            <p className="font-medium text-slate-800">{firstName}</p>
            <p className="text-xs text-slate-500">{session.user.email}</p>
            <div className="mt-3">
              <LogoutButton />
            </div>
          </div>
        </aside>

        <section className="w-full p-5 sm:p-8">
          <div className="mb-6 flex items-center lg:hidden">
            <Link href="/" className="inline-flex" aria-label="CREWDEV — accueil">
              <BrandLogo size="md" />
            </Link>
          </div>

          <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-serif text-2xl">Bonjour, {firstName}</h1>
              <p className="mt-1 text-sm text-slate-600">
                Votre audit a été généré le {generatedDate}.
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              Audit complété
            </span>
          </header>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {deliverables.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-stone-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className={`text-xl ${item.accent}`}>{item.icon}</p>
                <h2 className="mt-3 text-base font-semibold">{item.title}</h2>
                <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                  {item.status}
                </span>
                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                <div className="mt-4">
                  <ButtonLink href="#" variant="text" size="inline" className="text-sm">
                    Consulter →
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-6 rounded-xl border border-stone-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-800">Prochaines étapes</h3>
            <p className="mt-2 text-sm text-slate-600">
              Votre audit est prêt. Vous souhaitez en discuter ?
            </p>
            <ButtonLink
              href="https://calendly.com"
              target="_blank"
              variant="accent"
              size="md"
              className="mt-4"
            >
              Prendre rendez-vous →
            </ButtonLink>
          </section>
        </section>
      </div>
    </main>
  );
}
