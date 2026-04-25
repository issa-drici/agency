"use server";

import { prisma } from "@/lib/db/client";

const QUESTIONS = [
  "Bonjour. Quel est le principal problème qui vous fait perdre du temps aujourd'hui ?",
  "Combien de commandes traitez-vous par semaine en moyenne ?",
  "Quels outils utilisez-vous actuellement pour piloter votre activité ?",
  "Où avez-vous le plus de friction: acquisition, opérations, ou suivi client ?",
  "Quel serait le résultat concret que vous voulez voir d'ici 90 jours ?",
  "Combien de personnes utilisent l'outil aujourd'hui dans votre équipe ?",
  "Quelles tâches vous aimeriez automatiser en priorité ?",
  "Avez-vous des contraintes techniques ou réglementaires à prendre en compte ?",
  "Quel budget mensuel pouvez-vous allouer à cette transformation ?",
  "Parfait. Souhaitez-vous un plan d'action en 3 phases ou une feuille de route détaillée ?",
];

type SendMessageInput = {
  message: string;
  questionIndex: number;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Crée ou réassocie l’email pour autoriser l’envoi du lien magique (contrôlé côté `signIn` NextAuth). */
export async function registerChatLeadEmail(
  rawEmail: string,
): Promise<{ ok: true } | { ok: false; code: "INVALID" | "DB" }> {
  const email = rawEmail.trim().toLowerCase();
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

export async function sendMessage(input: SendMessageInput) {
  const { message, questionIndex } = input;

  // TODO: brancher ici l'API Fortyn / Anthropic.
  // Pour le MVP: aucune persistance locale des messages/conversations.
  void message;
  const nextQuestion = QUESTIONS[Math.min(questionIndex + 1, QUESTIONS.length - 1)];

  return { reply: nextQuestion };
}
