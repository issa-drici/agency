import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type RouteProps = {
  params: Promise<{ id: string }>;
};

function formatDateTime(value: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}

export async function GET(_: Request, { params }: RouteProps): Promise<Response> {
  const { id } = await params;
  const story = await prisma.userStory.findUnique({ where: { id } });

  if (!story) {
    return NextResponse.json(
      { error: "US introuvable." },
      { status: 404, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    {
      id: story.id,
      clientId: story.clientId,
      titre: story.titre,
      statut: story.statut,
      priorite: story.priorite,
      type: story.type ?? "fonctionnelle",
      usParentId: story.usParentId,
      description: story.description,
      contexte: story.contexte,
      criteresAcceptance: story.criteresAcceptance,
      horsScope: story.horsScope,
      dependances: story.dependances,
      specsTechniques: story.specsTechniques,
      createdAtLabel: formatDateTime(story.createdAt),
      updatedAtLabel: formatDateTime(story.updatedAt),
      refreshedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
