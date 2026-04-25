"use server";

import { prisma } from "@/lib/db";
import { isValidLoginPhoneNormalized, normalizeLoginPhone } from "@/lib/login-phone";
import { sendMagicLinkWhatsApp } from "@/lib/magiclink";

export async function sendLoginLink(
  rawPhone: string,
): Promise<{ ok: boolean; error?: string }> {
  const normalizedPhone = normalizeLoginPhone(rawPhone.trim());

  if (!isValidLoginPhoneNormalized(normalizedPhone)) {
    return { ok: false, error: "Numéro invalide." };
  }

  const user = await prisma.user.findUnique({
    where: { phone: normalizedPhone },
  });

  if (!user) {
    return { ok: true };
  }

  try {
    await sendMagicLinkWhatsApp(normalizedPhone);
  } catch (err) {
    console.error("[sendLoginLink] envoi WhatsApp:", err);
  }

  return { ok: true };
}
