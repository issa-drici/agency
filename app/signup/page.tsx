import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SignupForm } from "@/app/signup/SignupForm";
import { AuthCard } from "@/components/organisms/AuthCard";
import { AuthPageLayout } from "@/components/templates/AuthPageLayout";
import { prisma } from "@/lib/db/client";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user) {
      redirect("/dashboard");
    }
  }

  return (
    <AuthPageLayout>
      <AuthCard
        title="Créez votre compte"
        subtitle="Renseignez vos informations pour accéder à votre espace."
      >
        <SignupForm />
      </AuthCard>
    </AuthPageLayout>
  );
}
