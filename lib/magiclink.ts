import { createHash, randomBytes, randomUUID } from "node:crypto";
import { prisma } from "@/lib/db";

function hashVerificationToken(token: string): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET est requis pour les liens magiques.");
  }
  return createHash("sha256").update(`${token}${secret}`).digest("hex");
}

function normalizePhone(phone: string): string {
  return phone.trim();
}

function normalizePhoneForMetaTo(phone: string): string {
  return normalizePhone(phone).replace(/^\+/, "");
}

function syntheticEmailForPhone(phone: string): string {
  const p = normalizePhone(phone);
  return `phone:${p}@whatsapp.local`.toLowerCase();
}

export async function generateMagicLink(phone: string): Promise<string> {
  const normalized = normalizePhone(phone);
  const email = syntheticEmailForPhone(normalized);

  let user = await prisma.user.findUnique({ where: { phone: normalized } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        phone: normalized,
      },
    });
  }

  const identifier = user.email;
  const token = randomBytes(32).toString("hex");
  const hashed = hashVerificationToken(token);
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await prisma.verificationToken.deleteMany({ where: { identifier } });
  await prisma.verificationToken.create({
    data: {
      identifier,
      token: hashed,
      expires,
    },
  });

  const baseUrl = (process.env.NEXTAUTH_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  return `${baseUrl}/api/auth/callback/email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(identifier)}`;
}

export async function sendMagicLinkWhatsApp(
  phone: string,
  precomputedMagicLink?: string,
): Promise<string> {
  const magicLink = precomputedMagicLink ?? (await generateMagicLink(phone));
  const to = normalizePhoneForMetaTo(phone);
  const token = process.env.META_WHATSAPP_TOKEN;
  const phoneNumberId = process.env.META_PHONE_NUMBER_ID;

  if (!token) {
    throw new Error(
      "META_WHATSAPP_TOKEN est requis pour envoyer le magic link WhatsApp.",
    );
  }
  if (!phoneNumberId) {
    throw new Error(
      "META_PHONE_NUMBER_ID est requis pour envoyer le magic link WhatsApp.",
    );
  }

  const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;
  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: {
      body:
        "Votre audit est pret !\n\nAccedez a votre espace ici (lien valable 24h) :\n" +
        magicLink,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Echec envoi magic link Meta WhatsApp (${response.status}): ${errorBody}`,
    );
  }

  return magicLink;
}
