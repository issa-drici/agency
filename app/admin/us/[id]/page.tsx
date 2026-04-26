import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDateTime(value: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `US ${id} | Admin Fortyn`,
  };
}

export default async function UserStoryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const story = await prisma.userStory.findUnique({
    where: { id },
  });

  if (!story) notFound();

  return (
    <main className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/admin/us"
          className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline"
        >
          ← Retour liste US
        </Link>
        <Link
          href={`/admin/clients/${encodeURIComponent(story.clientId)}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline"
        >
          Voir client
        </Link>
      </div>

      <header className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
            User Story
          </p>
          <h1 className="text-xl font-semibold text-slate-900">{story.titre}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-sky-100 px-2 py-1 text-sky-700">
              Client: {story.clientId}
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
              Statut: {story.statut}
            </span>
            <span className="rounded-full bg-violet-100 px-2 py-1 text-violet-700">
              Priorite: {story.priorite}
            </span>
            <span className="rounded-full bg-stone-100 px-2 py-1 text-stone-700">
              Type: {story.type ?? "fonctionnelle"}
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            <p>ID: {story.id}</p>
            <p>Creation: {formatDateTime(story.createdAt)}</p>
            <p>Mise a jour: {formatDateTime(story.updatedAt)}</p>
            {story.usParentId ? <p>US parent: {story.usParentId}</p> : null}
          </div>
      </header>

      <div className="grid gap-3">
        <DetailBlock title="Description" content={story.description} />
        <DetailBlock title="Contexte" content={story.contexte} />
        <DetailBlock title="Criteres d'acceptance" content={story.criteresAcceptance} />
        <DetailBlock title="Hors scope" content={story.horsScope} />
        <DetailBlock title="Dependances" content={story.dependances} />
        <DetailBlock title="Specs techniques" content={story.specsTechniques} />
      </div>
    </main>
  );
}
