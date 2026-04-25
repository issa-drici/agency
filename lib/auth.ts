import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib/db/client";
import { sendMagicLinkEmail } from "@/lib/mail";

export const authOptions: NextAuthOptions = {
  // Client généré hors `@prisma/client` : typage de l’adaptateur aligné à l’exécution.
  adapter: PrismaAdapter(prisma as never),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    EmailProvider({
      server: "",
      from: process.env.EMAIL_FROM ?? "App <noreply@localhost>",
      maxAge: 15 * 60,
      async sendVerificationRequest({ identifier: email, url }) {
        await sendMagicLinkEmail(email, url);
      },
    }),
  ],
  callbacks: {
    /**
     * Connexion par email : uniquement si une ligne `User` existe déjà (créée depuis le chat).
     * Sinon pas d’envoi de lien (étape « verificationRequest ») et pas de session au clic sur un ancien lien.
     */
    async signIn({ user, account }) {
      if (account?.provider !== "email") return true;
      const email = user.email?.toLowerCase();
      if (!email) return false;
      /** Inclut les comptes créés depuis WhatsApp (`phone:+33…@whatsapp.local`). */
      const existing = await prisma.user.findUnique({ where: { email } });
      return existing !== null;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },
};
