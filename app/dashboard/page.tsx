import Link from "next/link";
import { LogoutButton } from "@/app/dashboard/LogoutButton";
import { Button } from "@/components/atoms/Button";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { ButtonLink } from "@/components/molecules/ButtonLink";
import { getDashboardLivrableContext } from "@/lib/dashboard-livrable";

type StatusColor = "emerald" | "orange" | "amber";

type DeliverableCard = {
  title: string;
  status: string;
  statusColor: StatusColor;
  description: string;
  href: string | null;
  icon: string;
  accent: string;
};

function fieldState(
  livrable: { audit: string | null; roadmap: string | null; v1: string | null } | null,
  value: string | null | undefined,
): { status: string; statusColor: StatusColor; ready: boolean } {
  if (!livrable) {
    return { status: "En attente", statusColor: "orange", ready: false };
  }
  if (value?.trim()) {
    return { status: "Prêt", statusColor: "emerald", ready: true };
  }
  return { status: "En cours de génération", statusColor: "amber", ready: false };
}

function statusBadgeClasses(color: StatusColor): string {
  switch (color) {
    case "emerald":
      return "bg-emerald-50 text-emerald-700";
    case "amber":
      return "bg-amber-50 text-amber-800";
    default:
      return "bg-orange-50 text-orange-800";
  }
}

export default async function DashboardPage() {
  const { session, livrable } = await getDashboardLivrableContext();

  const emailPrefix = session.user.email?.split("@")[0] ?? "";
  const inferredName = emailPrefix
    .split(/[._-]/)[0]
    ?.trim()
    .replace(/^\w/, (char) => char.toUpperCase());
  const firstName = session.user.name ?? inferredName ?? "vous";

  const auditState = fieldState(livrable, livrable?.audit);
  const roadmapState = fieldState(livrable, livrable?.roadmap);
  const v1State = fieldState(livrable, livrable?.v1);

  const deliverables: DeliverableCard[] = [
    {
      title: "Audit métier",
      status: auditState.status,
      statusColor: auditState.statusColor,
      description: auditState.ready
        ? "Analyse complète de vos processus et points de friction."
        : livrable
          ? "Génération en cours, revenez bientôt."
          : "Sera disponible une fois votre entretien terminé.",
      href: auditState.ready ? "/dashboard/audit" : null,
      icon: "🔎",
      accent: "text-sky-600",
    },
    {
      title: "Roadmap priorisée",
      status: roadmapState.status,
      statusColor: roadmapState.statusColor,
      description: roadmapState.ready
        ? "Plan de déploiement progressif priorisé par impact."
        : livrable
          ? "Génération en cours, revenez bientôt."
          : "Sera disponible une fois votre entretien terminé.",
      href: roadmapState.ready ? "/dashboard/roadmap" : null,
      icon: "📈",
      accent: "text-emerald-600",
    },
    {
      title: "Définition V1",
      status: v1State.status,
      statusColor: v1State.statusColor,
      description: v1State.ready
        ? "Périmètre fonctionnel initial pour une mise en production rapide."
        : livrable
          ? "Génération en cours, revenez bientôt."
          : "Sera disponible une fois votre entretien terminé.",
      href: v1State.ready ? "/dashboard/v1" : null,
      icon: "⚡",
      accent: "text-orange-500",
    },
  ];

  const generatedDate = livrable
    ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(livrable.updatedAt)
    : new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date());

  const headerSubtitle = livrable?.audit?.trim()
    ? `Votre audit a été généré le ${generatedDate}.`
    : "Suivez l’avancement de vos livrables ci-dessous.";

  const auditRowDone = Boolean(livrable);
  const headerBadgeLabel = auditRowDone ? "Audit complété" : "Entretien en cours";
  const headerBadgeClass = auditRowDone
    ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
    : "rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800";

  return (
    <main className="min-h-screen bg-[#fafaf9] text-slate-900">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden min-h-screen w-72 border-r border-stone-200 bg-white p-6 lg:flex lg:flex-col">
          <Link href="/" className="inline-flex" aria-label="Fortyn — accueil">
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
            <Link href="/" className="inline-flex" aria-label="Fortyn — accueil">
              <BrandLogo size="md" />
            </Link>
          </div>

          <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-serif text-2xl">Bonjour, {firstName}</h1>
              <p className="mt-1 text-sm text-slate-600">{headerSubtitle}</p>
            </div>
            <div className="flex max-w-sm flex-col items-end gap-1 text-right">
              <span className={headerBadgeClass}>{headerBadgeLabel}</span>
              {!auditRowDone ? (
                <p className="text-xs text-orange-800">
                  Votre espace sera alimenté au fur et à mesure de votre entretien WhatsApp.
                </p>
              ) : null}
            </div>
          </header>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {deliverables.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-stone-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className={`text-xl ${item.accent}`}>{item.icon}</p>
                <h2 className="mt-3 text-base font-semibold">{item.title}</h2>
                <span
                  className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClasses(item.statusColor)}`}
                >
                  {item.status}
                </span>
                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                <div className="mt-4">
                  {item.href ? (
                    <ButtonLink href={item.href} variant="text" size="inline" className="text-sm">
                      Consulter →
                    </ButtonLink>
                  ) : (
                    <Button type="button" disabled variant="secondary" size="inline" className="text-sm">
                      Bientôt disponible
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>

          <section className="mt-6 rounded-xl border border-stone-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-800">Prochaines étapes</h3>
            <p className="mt-2 text-sm text-slate-600">
              {livrable?.audit?.trim()
                ? "Votre audit est prêt. Vous souhaitez en discuter ?"
                : "Une fois vos livrables disponibles, vous pourrez planifier un échange avec l’équipe."}
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
