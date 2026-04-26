import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function formatDateTime(value: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const statut = searchParams.get("statut")?.trim() ?? "";

  const stories = await prisma.userStory.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { titre: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
              { clientId: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(statut ? { statut } : {}),
    },
    orderBy: [{ priorite: "desc" }, { updatedAt: "desc" }],
    take: 300,
  });

  return NextResponse.json(
    {
      rows: stories.map((story) => ({
        id: story.id,
        titre: story.titre,
        clientId: story.clientId,
        statut: story.statut,
        priorite: story.priorite,
        description: story.description,
        updatedAtLabel: formatDateTime(story.updatedAt),
      })),
      refreshedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
