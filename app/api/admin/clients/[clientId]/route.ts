import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseAuditJson, parseRoadmapJson, parseV1Json } from "@/lib/livrables-json";

type RouteProps = {
  params: Promise<{ clientId: string }>;
};

function formatDateTime(value: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}

export async function GET(_: Request, { params }: RouteProps): Promise<Response> {
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
    return NextResponse.json(
      { error: "Client introuvable." },
      { status: 404, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    {
      clientId,
      messages: messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        createdAtLabel: formatDateTime(m.createdAt),
      })),
      notes: notes.map((n) => ({
        id: n.id,
        contenu: n.contenu,
        createdAtLabel: formatDateTime(n.createdAt),
      })),
      userStories: userStories.map((u) => ({
        id: u.id,
        titre: u.titre,
        statut: u.statut,
        priorite: u.priorite,
      })),
      livrable: livrable
        ? {
            audit: parseAuditJson(livrable.audit),
            roadmap: parseRoadmapJson(livrable.roadmap),
            v1: parseV1Json(livrable.v1),
          }
        : null,
      refreshedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
