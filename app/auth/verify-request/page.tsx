import Link from "next/link";
import { ButtonLink } from "@/components/molecules/ButtonLink";

export default function VerifyRequestPage() {
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
            <h1 className="font-serif text-[28px] text-[#0c1322]">Lien envoyé</h1>
            <p className="mt-2 text-sm text-slate-600">
              Un lien de connexion vous a été envoyé sur WhatsApp. Il expire dans 24 heures. Vous
              pouvez fermer cet onglet.
            </p>
            <p className="mt-6 text-sm text-slate-600">
              <Link href="/login" className="font-medium text-sky-600 hover:text-sky-500">
                ← Retour à la connexion
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
