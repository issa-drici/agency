import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function formatDateTime(value: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}

export async function GET(): Promise<Response> {
  const [conversations, notes, userStories, livrables, recentMessages] =
    await Promise.all([
      prisma.conversation.findMany({ select: { clientId: true } }),
      prisma.notePO.findMany({ select: { clientId: true } }),
      prisma.userStory.findMany({ select: { clientId: true } }),
      prisma.livrable.findMany({ select: { clientId: true } }),
      prisma.conversation.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
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

  const payload = {
    metrics: [
      {
        label: "Clients actifs",
        value: clientIds.length,
        tone: "text-sky-700 bg-sky-100",
      },
      {
        label: "Messages",
        value: conversations.length,
        tone: "text-violet-700 bg-violet-100",
      },
      {
        label: "Notes PO",
        value: notes.length,
        tone: "text-amber-700 bg-amber-100",
      },
      {
        label: "User stories",
        value: userStories.length,
        tone: "text-emerald-700 bg-emerald-100",
      },
      {
        label: "Livrables",
        value: livrables.length,
        tone: "text-slate-700 bg-slate-100",
      },
    ],
    recentMessages: recentMessages.map((msg) => ({
      id: msg.id,
      clientId: msg.clientId,
      content: msg.content,
      createdAtLabel: formatDateTime(msg.createdAt),
    })),
    refreshedAt: new Date().toISOString(),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
