import type { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { Livrable, User } from "@/lib/generated/prisma/client";

export type DashboardLivrableContext = {
  session: Session;
  user: User;
  clientId: string | null;
  livrable: Livrable | null;
};

/** Session + user + ligne livrable (si `user.phone` renseigné). */
export async function getDashboardLivrableContext(): Promise<DashboardLivrableContext> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  const clientId = user.phone ?? null;
  const livrable = clientId
    ? await prisma.livrable.findUnique({ where: { clientId } })
    : null;

  return { session, user, clientId, livrable };
}
