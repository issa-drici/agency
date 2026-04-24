import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SignupForm } from "@/app/signup/SignupForm";
import { AuthCard } from "@/components/organisms/AuthCard";
import { AuthPageLayout } from "@/components/templates/AuthPageLayout";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
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
