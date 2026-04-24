import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/app/login/LoginForm";
import { BrandLogo } from "@/components/atoms/BrandLogo";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#fafaf9] px-4 py-6 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col justify-center">
        <div className="flex justify-center">
          <section className="w-full max-w-[420px] rounded-xl border border-stone-200 bg-white p-6 sm:p-10">
            <div className="mb-8 flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
                aria-label="CREWDEV — retour à l&apos;accueil"
              >
                <BrandLogo size="md" priority />
                <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-sky-500" />
              </Link>
            </div>

            <h1 className="font-serif text-[28px] text-[#0c1322]">Retrouvez votre espace</h1>
            <p className="mt-2 text-sm text-slate-600">
              Entrez l&apos;email utilisé lors de votre entretien.
            </p>

            <div className="mt-8">
              <LoginForm theme="light" />
            </div>

            <div className="mt-8 border-t border-stone-100 pt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 underline-offset-2 transition hover:text-sky-600 hover:underline"
              >
                <span aria-hidden>←</span>
                Retour à l&apos;accueil du site
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
