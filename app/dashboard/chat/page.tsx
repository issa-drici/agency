import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { ButtonLink } from "@/components/molecules/ButtonLink";
import { DashboardChatPanel } from "@/components/dashboard/DashboardChatPanel";
import { getDashboardLivrableContext } from "@/lib/dashboard-livrable";

export default async function DashboardChatPage() {
  const { session } = await getDashboardLivrableContext();
  const email = session.user.email?.trim().toLowerCase() ?? "";
  if (!email.includes("@")) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 lg:hidden">
        <Link href="/" className="inline-flex" aria-label="Fortyn — accueil">
          <BrandLogo size="md" />
        </Link>
        <ButtonLink href="/dashboard" variant="textMuted" size="inline">
          ← Tableau de bord
        </ButtonLink>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col">
        <header className="mb-4">
          <h1 className="font-serif text-2xl text-[#0c1322]">Entretien de cadrage</h1>
          <p className="mt-1 text-sm text-slate-600">
            Reprenez la même conversation que sur la page publique <strong>/chat</strong>, avec
            l’assistant.
          </p>
        </header>

        <DashboardChatPanel sessionEmail={email} layout="page" />
      </div>
    </>
  );
}
