"use server";

import { chat } from "@/lib/agents/po";
import { prisma } from "@/lib/db/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeChatEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

/** Identifiant stable côté conversations / US / notes (distinct des numéros WhatsApp). */
function webChatClientId(email: string): string {
  return `mail:${normalizeChatEmail(email)}`;
}

/** Crée ou réassocie l’email pour autoriser l’envoi du lien magique (contrôlé côté `signIn` NextAuth). */
export async function registerChatLeadEmail(
  rawEmail: string,
): Promise<{ ok: true } | { ok: false; code: "INVALID" | "DB" }> {
  const email = normalizeChatEmail(rawEmail);
  if (!EMAIL_RE.test(email)) return { ok: false, code: "INVALID" };
  try {
    await prisma.user.upsert({
      where: { email },
      create: { email },
      update: {},
    });
    return { ok: true };
  } catch {
    return { ok: false, code: "DB" };
  }
}

export async function loadWebChatMessages(rawEmail: string): Promise<
  { id: string; role: "user" | "assistant"; content: string }[]
> {
  const email = normalizeChatEmail(rawEmail);
  if (!EMAIL_RE.test(email)) return [];

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return [];

  const clientId = webChatClientId(email);
  const rows = await prisma.conversation.findMany({
    where: { clientId },
    orderBy: { createdAt: "asc" },
    select: { id: true, role: true, content: true },
  });

  return rows
    .filter((r) => r.role === "user" || r.role === "assistant")
    .map((r) => ({
      id: r.id,
      role: r.role as "user" | "assistant",
      content: r.content,
    }));
}

export async function sendWebChatMessage(input: {
  email: string;
  message: string;
}): Promise<{ reply: string }> {
  const email = normalizeChatEmail(input.email);
  if (!EMAIL_RE.test(email)) {
    throw new Error("Email invalide.");
  }
  const message = input.message.trim();
  if (!message) {
    throw new Error("Message vide.");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error(
      "Compte introuvable : indiquez d’abord votre email pour recevoir le lien.",
    );
  }

  const clientId = webChatClientId(email);
  const { response } = await chat(clientId, message, { skipMagicLink: true });
  return { reply: response };
}
