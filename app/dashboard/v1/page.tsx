import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { ButtonLink } from "@/components/molecules/ButtonLink";
import { getDashboardLivrableContext } from "@/lib/dashboard-livrable";
import { parseV1Json } from "@/lib/livrables-json";

export default async function V1Page() {
  const { livrable } = await getDashboardLivrableContext();
  const v1Data = parseV1Json(livrable?.v1 ?? null);
  if (!v1Data?.features?.length) {
    redirect("/dashboard");
  }

  const stats = v1Data.stats ?? { nbFeatures: v1Data.features.length, delai: "—" };

  return (
    <main className="min-h-screen bg-[#fafaf9] text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="inline-flex" aria-label="CREWDEV — accueil">
            <BrandLogo size="md" />
          </Link>
          <ButtonLink href="/dashboard" variant="textMuted" size="inline">
            ← Tableau de bord
          </ButtonLink>
        </div>

        <h1 className="font-serif text-3xl text-[#0c1322]">Définition V1</h1>
        <p className="mt-2 text-sm text-slate-600">Fonctionnalités prioritaires pour une première mise en ligne.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Fonctionnalités</p>
            <p className="mt-2 font-serif text-3xl text-sky-600">{stats.nbFeatures}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Délai indicatif</p>
            <p className="mt-2 font-serif text-3xl text-emerald-600">{stats.delai}</p>
          </div>
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div className="border-b border-stone-100 px-5 py-4 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-800">Périmètre</h2>
          </div>
          <div className="divide-y divide-stone-100">
            {v1Data.features.map((f) => (
              <div
                key={f.name}
                className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <p className="font-medium text-slate-800">{f.name}</p>
                <span
                  className="inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ color: f.pc, backgroundColor: f.pb }}
                >
                  {f.priorite}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
