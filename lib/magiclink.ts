import { createHash, randomBytes, randomUUID } from "node:crypto";
import { prisma } from "@/lib/db";
import { WHATSAPP_FROM, twilioClient } from "@/lib/twilio";

/** Même algorithme que `next-auth/core/lib/utils` (`hashToken`). */
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

  const baseUrl = (process.env.NEXTAUTH_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return `${baseUrl}/api/auth/callback/email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(identifier)}`;
}

export async function sendMagicLinkWhatsApp(phone: string): Promise<void> {
  const magicLink = await generateMagicLink(phone);
  const normalized = normalizePhone(phone);
  await twilioClient.messages.create({
    from: WHATSAPP_FROM,
    to: `whatsapp:${normalized}`,
    body:
      "Votre audit est prêt 🎉\n\nAccédez à votre espace ici (lien valable 24h) :\n" +
      magicLink,
  });
}
