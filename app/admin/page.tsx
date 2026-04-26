import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDateTime, getClientIds } from "@/app/admin/_lib";

export default async function AdminPage() {
  const [clientIds, messagesCount, notesCount, usCount, livrablesCount, recentMessages] =
    await Promise.all([
      getClientIds(),
      prisma.conversation.count(),
      prisma.notePO.count(),
      prisma.userStory.count(),
      prisma.livrable.count(),
      prisma.conversation.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

  const metrics = [
    { label: "Clients actifs", value: clientIds.length, tone: "text-sky-700 bg-sky-100" },
    { label: "Messages", value: messagesCount, tone: "text-violet-700 bg-violet-100" },
    { label: "Notes PO", value: notesCount, tone: "text-amber-700 bg-amber-100" },
    { label: "User stories", value: usCount, tone: "text-emerald-700 bg-emerald-100" },
    { label: "Livrables", value: livrablesCount, tone: "text-slate-700 bg-slate-100" },
  ];

  return (
    <main className="space-y-4">
      <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Vue d'ensemble</h2>
        <p className="mt-1 text-sm text-slate-600">
          Pilotage rapide de l'activite WhatsApp: clients, conversations et backlog.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
            <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-xl font-semibold ${metric.tone}`}>
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
            {recentMessages.length === 0 ? (
              <p className="text-sm text-slate-500">Aucune activite recente.</p>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg.id} className="rounded-lg border border-stone-200 bg-stone-50 p-2">
                  <p className="text-xs text-slate-500">
                    {msg.clientId} · {formatDateTime(msg.createdAt)}
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
