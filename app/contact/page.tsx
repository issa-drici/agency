import type { Metadata } from "next";
import Link from "next/link";
import { LegalTopNav } from "@/components/organisms/LegalTopNav";

export const metadata: Metadata = {
  title: "Contact | Fortyn",
  description: "Coordonnees de contact Fortyn.",
};

export default function ContactPage() {
  return (
    <>
      <LegalTopNav />
      <main className="mx-auto max-w-3xl px-6 py-12 text-slate-800">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Contact</h1>
        <p className="mb-8 text-slate-600">
          Pour toute demande commerciale, technique ou legale, vous pouvez nous contacter via les canaux ci-dessous.
        </p>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <p>
          <strong>Email :</strong> contact@fortyn.fr
        </p>
        <p>
          <strong>WhatsApp Business :</strong> disponible apres validation de la demande.
        </p>
        <p>
          <strong>Delai de reponse :</strong> 24 a 48h ouvrees.
        </p>
        <p>
          <strong>Objet recommande :</strong> "Support", "Demande commerciale", "Donnees personnelles", ou "Suppression des donnees".
        </p>
      </div>

        <p className="mt-8 text-sm text-slate-500">
          Pour la gestion des donnees personnelles, consultez aussi{" "}
          <Link href="/privacy" className="text-sky-600 underline underline-offset-2">
            la politique de confidentialite
          </Link>{" "}
          et{" "}
          <Link href="/data-deletion" className="text-sky-600 underline underline-offset-2">
            la procedure de suppression des donnees
          </Link>
          .
        </p>
      </main>
    </>
  );
}
