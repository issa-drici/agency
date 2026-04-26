import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { parseAuditJson, parseRoadmapJson, parseV1Json } from "@/lib/livrables-json";
import { formatDateTime } from "@/app/admin/_lib";

type PageProps = {
  params: Promise<{ clientId: string }>;
};

function roleUi(role: string): { label: string; align: "left" | "right"; bubble: string } {
  if (role === "assistant") {
    return {
      label: "PO",
      align: "left",
      bubble: "bg-white border border-stone-200 text-slate-800",
    };
  }
  return {
    label: "Prospect",
    align: "right",
    bubble: "bg-sky-500 text-white",
  };
}

export default async function AdminClientDetailPage({ params }: PageProps) {
  const { clientId: rawClientId } = await params;
  const clientId = decodeURIComponent(rawClientId);

  const [messages, notes, userStories, livrable] = await Promise.all([
    prisma.conversation.findMany({
      where: { clientId },
      orderBy: { createdAt: "asc" },
    }),
    prisma.notePO.findMany({
      where: { clientId },
      orderBy: { createdAt: "asc" },
    }),
    prisma.userStory.findMany({
      where: { clientId },
      orderBy: [{ priorite: "desc" }, { createdAt: "asc" }],
    }),
    prisma.livrable.findUnique({
      where: { clientId },
    }),
  ]);

  if (
    messages.length === 0 &&
    notes.length === 0 &&
    userStories.length === 0 &&
    !livrable
  ) {
    notFound();
  }

  const audit = parseAuditJson(livrable?.audit);
  const roadmap = parseRoadmapJson(livrable?.roadmap);
  const v1 = parseV1Json(livrable?.v1);

  return (
    <main className="space-y-4">
      <header className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Client</p>
            <h2 className="font-mono text-lg font-semibold">{clientId}</h2>
          </div>
          <Link
            href="/admin/clients"
            className="rounded-md border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm hover:bg-stone-100"
          >
            Retour liste clients
          </Link>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">
            Conversation ({messages.length})
          </h3>
          <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
            {messages.length === 0 ? (
              <p className="text-sm text-slate-500">Aucun message.</p>
            ) : (
              messages.map((message) => {
                const ui = roleUi(message.role);
                return (
                  <article
                    key={message.id}
                    className={`flex ${ui.align === "right" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${ui.bubble}`}>
                      <p
                        className={`mb-1 text-[11px] ${
                          ui.align === "right" ? "text-sky-100" : "text-slate-500"
                        }`}
                      >
                        {ui.label} · {formatDateTime(message.createdAt)}
                      </p>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        <aside className="space-y-3">
          <section className="rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">Notes PO ({notes.length})</h3>
            <div className="mt-2 space-y-2">
              {notes.length === 0 ? (
                <p className="text-sm text-slate-500">Aucune note.</p>
              ) : (
                notes.map((note) => (
                  <article key={note.id} className="rounded border border-stone-200 bg-stone-50 p-2 text-sm">
                    <p className="text-xs text-slate-500">{formatDateTime(note.createdAt)}</p>
                    <p className="mt-1 whitespace-pre-wrap">{note.contenu}</p>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">User stories ({userStories.length})</h3>
            <div className="mt-2 space-y-2">
              {userStories.length === 0 ? (
                <p className="text-sm text-slate-500">Aucune US.</p>
              ) : (
                userStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/admin/us/${story.id}`}
                    className="block rounded border border-stone-200 bg-stone-50 p-2 text-sm hover:border-sky-300 hover:bg-sky-50"
                  >
                    <p className="font-medium">{story.titre}</p>
                    <p className="text-xs text-slate-500">
                      {story.statut} · priorite {story.priorite}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">Livrables</h3>
            {livrable ? (
              <div className="mt-2 space-y-2 text-sm">
                <details className="rounded border border-stone-200 p-2">
                  <summary className="cursor-pointer font-medium">Audit (JSON parse)</summary>
                  <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                    {JSON.stringify(audit, null, 2)}
                  </pre>
                </details>
                <details className="rounded border border-stone-200 p-2">
                  <summary className="cursor-pointer font-medium">Roadmap (JSON parse)</summary>
                  <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                    {JSON.stringify(roadmap, null, 2)}
                  </pre>
                </details>
                <details className="rounded border border-stone-200 p-2">
                  <summary className="cursor-pointer font-medium">V1 (JSON parse)</summary>
                  <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                    {JSON.stringify(v1, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-500">Aucun livrable.</p>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}
