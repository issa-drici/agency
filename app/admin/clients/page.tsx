"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminClients } from "@/services/admin/clients";

export default function AdminClientsPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-clients"],
    queryFn: fetchAdminClients,
    refetchInterval: 10_000,
  });

  return (
    <main className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Clients</h2>
        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-md border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-slate-700 hover:bg-stone-100"
        >
          {isFetching ? "Rafraichissement..." : "Rafraichir"}
        </button>
      </div>
      <p className="mt-1 text-sm text-slate-600">
        Liste des prospects avec acces direct a leur conversation complete.
      </p>
      {data ? (
        <p className="mt-1 text-xs text-slate-500">
          Derniere MAJ: {new Date(data.refreshedAt).toLocaleString("fr-FR")}
        </p>
      ) : null}

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-1">Client</th>
              <th className="px-3 py-1">Messages</th>
              <th className="px-3 py-1">Notes</th>
              <th className="px-3 py-1">US</th>
              <th className="px-3 py-1">Livrable</th>
              <th className="px-3 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {isError ? (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-sm text-red-600">
                  {(error as Error).message}
                </td>
              </tr>
            ) : isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <tr key={idx} className="text-sm">
                  <td className="px-3 py-2" colSpan={6}>
                    <div className="h-8 animate-pulse rounded bg-stone-200" />
                  </td>
                </tr>
              ))
            ) : (
              data?.rows.map((row) => (
                <tr key={row.clientId} className="rounded-lg border border-stone-200 bg-stone-50 text-sm">
                  <td className="px-3 py-2 font-mono">{row.clientId}</td>
                  <td className="px-3 py-2">{row.messages}</td>
                  <td className="px-3 py-2">{row.notes}</td>
                  <td className="px-3 py-2">{row.us}</td>
                  <td className="px-3 py-2">
                    {row.hasLivrable ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">OK</span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700">Absent</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/admin/clients/${encodeURIComponent(row.clientId)}`}
                      className="rounded-md bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-500"
                    >
                      Ouvrir
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
