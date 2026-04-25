import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { ButtonLink } from "@/components/molecules/ButtonLink";
import { getDashboardLivrableContext } from "@/lib/dashboard-livrable";
import { parseAuditJson } from "@/lib/livrables-json";

export default async function AuditPage() {
  const { livrable } = await getDashboardLivrableContext();
  const auditData = parseAuditJson(livrable?.audit ?? null);
  if (!auditData || typeof auditData.score !== "number") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#fafaf9] text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="inline-flex" aria-label="Fortyn — accueil">
            <BrandLogo size="md" />
          </Link>
          <ButtonLink href="/dashboard" variant="textMuted" size="inline">
            ← Tableau de bord
          </ButtonLink>
        </div>

        <h1 className="font-serif text-3xl text-[#0c1322]">Audit métier</h1>
        <p className="mt-2 text-sm text-slate-600">Synthèse de votre maturité digitale et opérationnelle.</p>

        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Score global</p>
          <p className="mt-2 font-serif text-5xl text-sky-600">{auditData.score}</p>
          <p className="text-sm text-slate-500">sur 100</p>
        </div>

        <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-800">Dimensions</h2>
          <ul className="mt-4 space-y-4">
            {(auditData.dimensions ?? []).map((d) => (
              <li key={d.label}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{d.label}</span>
                  <span className="text-slate-600">{d.value}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-stone-100">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, Math.max(0, d.value))}%`,
                      backgroundColor: d.color || "#0ea5e9",
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-800">Points critiques</h2>
          <ul className="mt-4 space-y-3">
            {(auditData.pointsCritiques ?? []).map((p, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-lg border border-stone-100 bg-stone-50/80 px-3 py-3 text-sm text-slate-700"
              >
                <span className="shrink-0 text-lg" style={{ color: p.color }}>
                  {p.icon}
                </span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
