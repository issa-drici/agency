/**
 * Point d’entrée base de données côté serveur.
 *
 * - `prisma` : client singleton (adapter pg).
 * - `runTransaction` : opérations atomiques multi-tables.
 */
export { prisma } from "@/lib/db/client";
export { runTransaction } from "@/lib/db/transaction";
export { getPrismaErrorCode, isPrismaRecordNotFound, isPrismaUniqueViolation } from "@/lib/db/errors";
