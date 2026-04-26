"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminUsDetail } from "@/services/admin/us";

function DetailBlock({
  title,
  content,
}: {
  title: string;
  content: string | null | undefined;
}) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-4">
      <h2 className="mb-2 text-sm font-semibold text-slate-700">{title}</h2>
      <p className="whitespace-pre-wrap text-sm text-slate-800">
        {content && content.trim().length > 0 ? content : "Non renseigne."}
      </p>
    </section>
  );
}

export default function UserStoryDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const { data: story, isLoading, isError, error } = useQuery({
    queryKey: ["admin-us-detail", id],
    queryFn: () => fetchAdminUsDetail(id),
    enabled: Boolean(id),
    refetchInterval: 10_000,
  });

  return (
    <main className="space-y-4">
      {isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {(error as Error).message}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/admin/us"
          className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline"
        >
          ← Retour liste US
        </Link>
        <Link
          href={story ? `/admin/clients/${encodeURIComponent(story.clientId)}` : "/admin/clients"}
          className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline"
        >
          Voir client
        </Link>
      </div>

      <header className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
            User Story
          </p>
          <h1 className="text-xl font-semibold text-slate-900">
            {isLoading ? "Chargement..." : story?.titre}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-sky-100 px-2 py-1 text-sky-700">
              Client: {story?.clientId ?? "-"}
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
              Statut: {story?.statut ?? "-"}
            </span>
            <span className="rounded-full bg-violet-100 px-2 py-1 text-violet-700">
              Priorite: {story?.priorite ?? "-"}
            </span>
            <span className="rounded-full bg-stone-100 px-2 py-1 text-stone-700">
              Type: {story?.type ?? "fonctionnelle"}
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            <p>ID: {story?.id ?? "-"}</p>
            <p>Creation: {story?.createdAtLabel ?? "-"}</p>
            <p>Mise a jour: {story?.updatedAtLabel ?? "-"}</p>
            {story?.usParentId ? <p>US parent: {story.usParentId}</p> : null}
          </div>
      </header>

      <div className="grid gap-3">
        <DetailBlock title="Description" content={story?.description} />
        <DetailBlock title="Contexte" content={story?.contexte} />
        <DetailBlock title="Criteres d'acceptance" content={story?.criteresAcceptance} />
        <DetailBlock title="Hors scope" content={story?.horsScope} />
        <DetailBlock title="Dependances" content={story?.dependances} />
        <DetailBlock title="Specs techniques" content={story?.specsTechniques} />
      </div>
    </main>
  );
}
