import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getClientIds } from "@/app/admin/_lib";

export async function GET(): Promise<Response> {
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

  return NextResponse.json(
    { rows, refreshedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
