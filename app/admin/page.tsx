"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminOverview } from "@/services/admin/overview";

export default function AdminPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: fetchAdminOverview,
    refetchInterval: 10_000,
  });

  return (
    <main className="space-y-4">
      <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Vue d&apos;ensemble</h2>
          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-md border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-slate-700 hover:bg-stone-100"
          >
            {isFetching ? "Rafraichissement..." : "Rafraichir"}
          </button>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          Pilotage rapide de l&apos;activite WhatsApp: clients, conversations et backlog.
        </p>
        {data ? (
          <p className="mt-2 text-xs text-slate-500">
            Derniere MAJ: {new Date(data.refreshedAt).toLocaleString("fr-FR")}
          </p>
        ) : null}
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <article
                key={idx}
                className="animate-pulse rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div className="h-3 w-24 rounded bg-stone-200" />
                <div className="mt-3 h-8 w-16 rounded bg-stone-200" />
              </article>
            ))
          : data?.metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {metric.label}
                </p>
                <p
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xl font-semibold ${metric.tone}`}
                >
                  {metric.value}
                </p>
              </article>
            ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Navigation rapide</h3>
          <div className="mt-3 grid gap-2">
            <Link
              href="/admin/clients"
              className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm hover:bg-stone-100"
            >
              Ouvrir la liste clients
            </Link>
            <Link
              href="/admin/us"
              className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm hover:bg-stone-100"
            >
              Ouvrir la liste des user stories
            </Link>
          </div>
        </article>

        <article className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Derniers messages</h3>
          <div className="mt-3 space-y-2">
            {isError ? (
              <p className="text-sm text-red-600">
                {(error as Error).message}
              </p>
            ) : !data || data.recentMessages.length === 0 ? (
              <p className="text-sm text-slate-500">Aucune activite recente.</p>
            ) : (
              data.recentMessages.map((msg) => (
                <div key={msg.id} className="rounded-lg border border-stone-200 bg-stone-50 p-2">
                  <p className="text-xs text-slate-500">
                    {msg.clientId} · {msg.createdAtLabel}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm">{msg.content}</p>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
