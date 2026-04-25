import { prisma } from "@/lib/db";
import { parseAuditJson, parseRoadmapJson, parseV1Json } from "@/lib/livrables-json";

type ClientSection = {
  clientId: string;
  messages: Awaited<ReturnType<typeof prisma.conversation.findMany>>;
  notes: Awaited<ReturnType<typeof prisma.notePO.findMany>>;
  userStories: Awaited<ReturnType<typeof prisma.userStory.findMany>>;
  livrable: Awaited<ReturnType<typeof prisma.livrable.findUnique>>;
};

function formatDateTime(value: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}

function groupByClientId<T extends { clientId: string }>(rows: T[]): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const row of rows) {
    const arr = map.get(row.clientId) ?? [];
    arr.push(row);
    map.set(row.clientId, arr);
  }
  return map;
}

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

export default async function AdminPage() {
  const [conversations, notes, userStories, livrables] = await Promise.all([
    prisma.conversation.findMany({
      orderBy: { createdAt: "asc" },
    }),
    prisma.notePO.findMany({
      orderBy: { createdAt: "asc" },
    }),
    prisma.userStory.findMany({
      orderBy: [{ createdAt: "asc" }],
    }),
    prisma.livrable.findMany({
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const clientIds = Array.from(
    new Set([
      ...conversations.map((c) => c.clientId),
      ...notes.map((n) => n.clientId),
      ...userStories.map((u) => u.clientId),
      ...livrables.map((l) => l.clientId),
    ]),
  ).sort((a, b) => a.localeCompare(b));

  const convByClient = groupByClientId(conversations);
  const notesByClient = groupByClientId(notes);
  const storiesByClient = groupByClientId(userStories);
  const livrableByClient = new Map(livrables.map((l) => [l.clientId, l]));

  const sections: ClientSection[] = clientIds.map((clientId) => ({
    clientId,
    messages: convByClient.get(clientId) ?? [],
    notes: notesByClient.get(clientId) ?? [],
    userStories: storiesByClient.get(clientId) ?? [],
    livrable: livrableByClient.get(clientId) ?? null,
  }));

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-6 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-2xl font-semibold">Admin interne</h1>
        <p className="mb-6 text-sm text-slate-600">
          Vue conversationnelle par client WhatsApp, avec notes, US et livrables.
        </p>

        <div className="space-y-4">
          {sections.map((section) => {
            const audit = parseAuditJson(section.livrable?.audit);
            const roadmap = parseRoadmapJson(section.livrable?.roadmap);
            const v1 = parseV1Json(section.livrable?.v1);

            return (
              <details
                key={section.clientId}
                className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
              >
                <summary className="cursor-pointer list-none bg-stone-50 px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-sm font-semibold text-slate-900">{section.clientId}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-sky-100 px-2 py-1 text-sky-700">
                        {section.messages.length} messages
                      </span>
                      <span className="rounded-full bg-violet-100 px-2 py-1 text-violet-700">
                        {section.notes.length} notes
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
                        {section.userStories.length} US
                      </span>
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700">
                        {section.livrable ? "livrable OK" : "pas de livrable"}
                      </span>
                    </div>
                  </div>
                </summary>

                <div className="grid gap-4 p-4 lg:grid-cols-[2fr_1fr]">
                  <section className="rounded-lg border border-stone-200 bg-stone-50/70 p-3">
                    <h2 className="mb-3 text-sm font-semibold text-slate-700">
                      Conversation ({section.messages.length})
                    </h2>
                    <div className="max-h-[65vh] space-y-3 overflow-y-auto pr-1">
                      {section.messages.length === 0 ? (
                        <p className="text-sm text-slate-500">Aucun message.</p>
                      ) : (
                        section.messages.map((message) => {
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
                                  {ui.label} • {formatDateTime(message.createdAt)}
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
                    <details className="rounded-lg border border-stone-200 bg-white p-3" open>
                      <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                        Notes PO ({section.notes.length})
                      </summary>
                      <div className="mt-2 space-y-2">
                        {section.notes.length === 0 ? (
                          <p className="text-sm text-slate-500">Aucune note.</p>
                        ) : (
                          section.notes.map((note) => (
                            <article key={note.id} className="rounded border border-stone-200 bg-stone-50 p-2 text-sm">
                              <p className="text-xs text-slate-500">{formatDateTime(note.createdAt)}</p>
                              <p className="mt-1 whitespace-pre-wrap">{note.contenu}</p>
                            </article>
                          ))
                        )}
                      </div>
                    </details>

                    <details className="rounded-lg border border-stone-200 bg-white p-3">
                      <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                        User stories ({section.userStories.length})
                      </summary>
                      <div className="mt-2 space-y-2">
                        {section.userStories.length === 0 ? (
                          <p className="text-sm text-slate-500">Aucune US.</p>
                        ) : (
                          section.userStories.map((story) => (
                            <article key={story.id} className="rounded border border-stone-200 bg-stone-50 p-2 text-sm">
                              <p className="font-medium">{story.titre}</p>
                              <p className="text-xs text-slate-500">Statut: {story.statut}</p>
                              <p className="mt-1 whitespace-pre-wrap">
                                {story.description ?? "Sans description."}
                              </p>
                            </article>
                          ))
                        )}
                      </div>
                    </details>

                    <details className="rounded-lg border border-stone-200 bg-white p-3">
                      <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                        Livrables
                      </summary>
                      {section.livrable ? (
                        <div className="mt-2 space-y-2 text-sm">
                          <details className="rounded border border-stone-200 p-2">
                            <summary className="cursor-pointer font-medium">Audit (JSON parsé)</summary>
                            <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                              {JSON.stringify(audit, null, 2)}
                            </pre>
                          </details>
                          <details className="rounded border border-stone-200 p-2">
                            <summary className="cursor-pointer font-medium">Roadmap (JSON parsé)</summary>
                            <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                              {JSON.stringify(roadmap, null, 2)}
                            </pre>
                          </details>
                          <details className="rounded border border-stone-200 p-2">
                            <summary className="cursor-pointer font-medium">V1 (JSON parsé)</summary>
                            <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                              {JSON.stringify(v1, null, 2)}
                            </pre>
                          </details>
                        </div>
                      ) : (
                        <p className="mt-2 text-sm text-slate-500">Aucun livrable.</p>
                      )}
                    </details>
                  </aside>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </main>
  );
}
