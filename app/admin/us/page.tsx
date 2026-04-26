"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAdminUsList } from "@/services/admin/us";

const allowedStatuts = ["backlog", "todo", "in_progress", "done"];

export default function AdminUsPage() {
  const [q, setQ] = useState("");
  const [statut, setStatut] = useState("");
  const [search, setSearch] = useState({ q: "", statut: "" });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-us", search.q, search.statut],
    queryFn: () => fetchAdminUsList(search.q, search.statut),
    refetchInterval: 10_000,
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch({ q: q.trim(), statut: statut.trim() });
  }

  return (
    <main className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">User stories</h2>
      <p className="mt-1 text-sm text-slate-600">
        Recherche rapide et acces detail de chaque US.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-4 grid gap-2 rounded-lg border border-stone-200 bg-stone-50 p-3 md:grid-cols-[1fr_160px_auto]"
      >
        <input
          type="text"
          name="q"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Recherche titre, description, client..."
          className="rounded-md border border-stone-300 px-3 py-2 text-sm"
        />
        <select
          name="statut"
          value={statut}
          onChange={(event) => setStatut(event.target.value)}
          className="rounded-md border border-stone-300 px-3 py-2 text-sm"
        >
          <option value="">Tous statuts</option>
          {allowedStatuts.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-500"
        >
          Filtrer
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {isError ? (
          <p className="text-sm text-red-600">{(error as Error).message}</p>
        ) : isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-20 animate-pulse rounded-lg bg-stone-200" />
          ))
        ) : !data || data.rows.length === 0 ? (
          <p className="text-sm text-slate-500">Aucune user story pour ces filtres.</p>
        ) : (
          data.rows.map((story) => (
            <Link
              key={story.id}
              href={`/admin/us/${story.id}`}
              className="block rounded-lg border border-stone-200 bg-stone-50 p-3 transition hover:border-sky-300 hover:bg-sky-50"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{story.titre}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Client: {story.clientId} · MAJ: {story.updatedAtLabel}
                  </p>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
                    {story.statut}
                  </span>
                  <span className="rounded-full bg-violet-100 px-2 py-1 text-violet-700">
                    P{story.priorite}
                  </span>
                </div>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-slate-700">
                {story.description ?? "Sans description."}
              </p>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
