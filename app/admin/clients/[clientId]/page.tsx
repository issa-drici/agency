"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminClientDetail } from "@/services/admin/client-detail";

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

export default function AdminClientDetailPage() {
  const params = useParams<{ clientId: string }>();
  const clientId = params?.clientId ? decodeURIComponent(params.clientId) : "";
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-client-detail", clientId],
    queryFn: () => fetchAdminClientDetail(clientId),
    enabled: Boolean(clientId),
    refetchInterval: 10_000,
  });

  return (
    <main className="space-y-4">
      {isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {(error as Error).message}
        </div>
      ) : null}
      <header className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Client</p>
            <h2 className="font-mono text-lg font-semibold">
              {isLoading ? "Chargement..." : data?.clientId}
            </h2>
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
            Conversation ({data?.messages.length ?? 0})
          </h3>
          <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
            {!data || data.messages.length === 0 ? (
              <p className="text-sm text-slate-500">Aucun message.</p>
            ) : (
              data.messages.map((message) => {
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
                        {ui.label} · {message.createdAtLabel}
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
            <h3 className="text-sm font-semibold text-slate-700">
              Notes PO ({data?.notes.length ?? 0})
            </h3>
            <div className="mt-2 space-y-2">
              {!data || data.notes.length === 0 ? (
                <p className="text-sm text-slate-500">Aucune note.</p>
              ) : (
                data.notes.map((note) => (
                  <article key={note.id} className="rounded border border-stone-200 bg-stone-50 p-2 text-sm">
                    <p className="text-xs text-slate-500">{note.createdAtLabel}</p>
                    <p className="mt-1 whitespace-pre-wrap">{note.contenu}</p>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">
              User stories ({data?.userStories.length ?? 0})
            </h3>
            <div className="mt-2 space-y-2">
              {!data || data.userStories.length === 0 ? (
                <p className="text-sm text-slate-500">Aucune US.</p>
              ) : (
                data.userStories.map((story) => (
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
            {data?.livrable ? (
              <div className="mt-2 space-y-2 text-sm">
                <details className="rounded border border-stone-200 p-2">
                  <summary className="cursor-pointer font-medium">Audit (JSON parse)</summary>
                  <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                    {JSON.stringify(data.livrable.audit, null, 2)}
                  </pre>
                </details>
                <details className="rounded border border-stone-200 p-2">
                  <summary className="cursor-pointer font-medium">Roadmap (JSON parse)</summary>
                  <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                    {JSON.stringify(data.livrable.roadmap, null, 2)}
                  </pre>
                </details>
                <details className="rounded border border-stone-200 p-2">
                  <summary className="cursor-pointer font-medium">V1 (JSON parse)</summary>
                  <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                    {JSON.stringify(data.livrable.v1, null, 2)}
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
