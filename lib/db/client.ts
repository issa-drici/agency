import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type Prisma } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function requireDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL est requis.");
  }
  return url;
}

function clientLogLevels(): Prisma.LogLevel[] {
  if (process.env.NODE_ENV !== "development") return ["error"];
  if (process.env.PRISMA_LOG_QUERIES === "true") return ["query", "error", "warn"];
  return ["error", "warn"];
}

function createPrismaClient() {
  const adapter = new PrismaPg(requireDatabaseUrl());
  return new PrismaClient({
    adapter,
    log: clientLogLevels(),
  });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
