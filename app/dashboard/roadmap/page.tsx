import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { ButtonLink } from "@/components/molecules/ButtonLink";
import { getDashboardLivrableContext } from "@/lib/dashboard-livrable";
import { parseRoadmapJson } from "@/lib/livrables-json";

export default async function RoadmapPage() {
  const { livrable } = await getDashboardLivrableContext();
  const roadmapData = parseRoadmapJson(livrable?.roadmap ?? null);
  if (!roadmapData?.phases?.length) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 lg:hidden">
        <Link href="/" className="inline-flex" aria-label="Fortyn — accueil">
          <BrandLogo size="md" />
        </Link>
        <ButtonLink href="/dashboard" variant="textMuted" size="inline">
          ← Tableau de bord
        </ButtonLink>
      </div>

      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl text-[#0c1322]">Roadmap priorisée</h1>
        <p className="mt-2 text-sm text-slate-600">Phases et jalons recommandés pour votre projet.</p>

        <div className="mt-8 space-y-6">
          {roadmapData.phases.map((phase) => (
            <section
              key={phase.phase}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <div
                className="border-b border-stone-100 px-5 py-4 sm:px-6"
                style={{ backgroundColor: phase.bg || "#f8fafc" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: phase.color }}>
                  {phase.phase}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">{phase.label}</h2>
              </div>
              <ul className="list-disc space-y-2 px-8 py-5 text-sm text-slate-700 sm:px-10">
                {(phase.items ?? []).map((item) => (
                  <li key={item} className="marker:text-slate-400">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
