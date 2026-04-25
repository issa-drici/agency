import Link from "next/link";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { ButtonLink } from "@/components/molecules/ButtonLink";

type ErrorCopy = { title: string; description: string };

const ERROR_MESSAGES: Record<string, ErrorCopy> = {
  Verification: {
    title: "Lien invalide ou expiré",
    description:
      "Ce lien de connexion n’est plus valide ou a déjà été utilisé. Demandez un nouveau lien depuis la page de connexion.",
  },
  AccessDenied: {
    title: "Connexion interrompue",
    description:
      "La connexion n’a pas pu être finalisée. Vous pouvez réessayer depuis la page de connexion ou après un nouvel entretien.",
  },
  Configuration: {
    title: "Service temporairement indisponible",
    description:
      "Une erreur de configuration empêche la connexion. Réessayez plus tard ou contactez le support si le problème persiste.",
  },
  EmailSignin: {
    title: "Demande non traitée",
    description:
      "La demande de connexion n’a pas pu être envoyée. Vérifiez votre numéro et réessayez.",
  },
  Callback: {
    title: "Connexion interrompue",
    description:
      "Une erreur est survenue pendant la connexion. Réessayez en demandant un nouveau lien depuis la page de connexion.",
  },
};

const DEFAULT_COPY: ErrorCopy = {
  title: "Une erreur s’est produite",
  description:
    "Réessayez depuis la page de connexion. Si le problème persiste, demandez un nouveau lien de connexion.",
};

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AuthErrorPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const code = params.error ?? "";
  const copy = ERROR_MESSAGES[code] ?? DEFAULT_COPY;

  return (
    <main className="min-h-screen bg-[#fafaf9] px-4 py-6 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col justify-center">
        <div className="mb-8">
          <ButtonLink href="/" variant="textMuted" size="inline">
            ← Retour à l&apos;accueil
          </ButtonLink>
        </div>

        <div className="flex justify-center">
          <section className="w-full max-w-[420px] rounded-xl border border-stone-200 bg-white p-6 sm:p-10">
            <div className="mb-8 flex items-center gap-3">
              <Link href="/" className="inline-flex items-center gap-3" aria-label="Fortyn — accueil">
                <BrandLogo size="md" priority />
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500/80" />
              </Link>
            </div>

            <p className="text-xs font-medium uppercase tracking-widest text-sky-600">Authentification</p>
            <h1 className="mt-2 font-serif text-[28px] leading-tight text-[#0c1322]">{copy.title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{copy.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/login" variant="accent" size="md" className="justify-center sm:inline-flex">
                Page de connexion →
              </ButtonLink>
              <ButtonLink href="/chat" variant="textMuted" size="inline" className="justify-center sm:inline-flex">
                Démarrer un audit →
              </ButtonLink>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
