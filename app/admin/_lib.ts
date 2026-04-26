import { prisma } from "@/lib/db";

export function formatDateTime(value: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}

export function groupByClientId<T extends { clientId: string }>(
  rows: T[],
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const row of rows) {
    const arr = map.get(row.clientId) ?? [];
    arr.push(row);
    map.set(row.clientId, arr);
  }
  return map;
}

export async function getClientIds(): Promise<string[]> {
  const [conversations, notes, stories, livrables] = await Promise.all([
    prisma.conversation.findMany({ select: { clientId: true } }),
    prisma.notePO.findMany({ select: { clientId: true } }),
    prisma.userStory.findMany({ select: { clientId: true } }),
    prisma.livrable.findMany({ select: { clientId: true } }),
  ]);

  return Array.from(
    new Set([
      ...conversations.map((r) => r.clientId),
      ...notes.map((r) => r.clientId),
      ...stories.map((r) => r.clientId),
      ...livrables.map((r) => r.clientId),
    ]),
  ).sort((a, b) => a.localeCompare(b));
}
