import type { Metadata } from "next";
import { LegalFooter } from "@/components/organisms/LegalFooter";
import { LegalTopNav } from "@/components/organisms/LegalTopNav";

export const metadata: Metadata = {
  title: "Suppression des donnees | Fortyn",
  description: "Procedure de demande de suppression des donnees personnelles.",
};

export default function DataDeletionPage() {
  return (
    <>
      <LegalTopNav />
      <main className="mx-auto max-w-3xl px-6 py-12 text-slate-800">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Suppression des donnees</h1>
      <p className="mb-6 text-sm text-slate-500">Derniere mise a jour : 25 avril 2026</p>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Comment faire une demande</h2>
        <p>
          Pour supprimer vos donnees personnelles, envoyez un email a <strong>contact@fortyn.fr</strong> avec :
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>vos nom et prenom ;</li>
          <li>le numero WhatsApp et/ou l'email utilises ;</li>
          <li>la mention "Demande de suppression des donnees".</li>
        </ul>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Verification d'identite</h2>
        <p>
          Pour proteger vos donnees, Fortyn peut demander des informations complementaires raisonnables afin de verifier
          que la demande provient bien de la personne concernee.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Delais de traitement</h2>
        <p>
          Nous accusons reception sous 7 jours ouvrables et traitons la demande dans un delai maximum de 30 jours,
          sauf obligation legale contraire.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Perimetre de suppression</h2>
        <p>
          Les donnees de conversation, informations de profil et donnees associees au service sont supprimees ou
          anonymisees, sous reserve des obligations de conservation legales et comptables.
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>suppression des profils et identifiants associes dans nos outils applicatifs ;</li>
          <li>suppression ou anonymisation des historiques de conversation ;</li>
          <li>conservation minimale des donnees strictement necessaires pour les obligations legales.</li>
        </ul>
      </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Canal WhatsApp (Meta)</h2>
          <p>
            Si vous avez interagi via WhatsApp, la suppression est appliquee a nos systemes. Certaines donnees techniques
            peuvent aussi etre traitees par Meta selon leurs propres politiques.
          </p>
          <p>
            Pour exercer vos droits directement aupres de Meta, vous pouvez egalement utiliser les mecanismes prevus dans
            leurs parametres de confidentialite.
          </p>
        </section>
      </main>
      <LegalFooter />
    </>
  );
}
