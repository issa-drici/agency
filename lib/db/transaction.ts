import type { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/db/client";

/**
 * Transaction interactive : toutes les opérations passent par `tx` pour un commit atomique.
 */
export async function runTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
  return prisma.$transaction(fn);
}
