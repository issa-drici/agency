import Link from "next/link";
import { prisma } from "@/lib/db";
import { getClientIds } from "@/app/admin/_lib";

export default async function AdminClientsPage() {
  const clientIds = await getClientIds();

  const rows = await Promise.all(
    clientIds.map(async (clientId) => {
      const [messages, notes, us, livrable] = await Promise.all([
        prisma.conversation.count({ where: { clientId } }),
        prisma.notePO.count({ where: { clientId } }),
        prisma.userStory.count({ where: { clientId } }),
        prisma.livrable.findUnique({ where: { clientId } }),
      ]);

      return {
        clientId,
        messages,
        notes,
        us,
        hasLivrable: Boolean(livrable),
      };
    }),
  );

  return (
    <main className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Clients</h2>
      <p className="mt-1 text-sm text-slate-600">
        Liste des prospects avec acces direct a leur conversation complete.
      </p>

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
            {rows.map((row) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
