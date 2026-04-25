import type { Metadata } from "next";
import { LegalFooter } from "@/components/organisms/LegalFooter";
import { LegalTopNav } from "@/components/organisms/LegalTopNav";

export const metadata: Metadata = {
  title: "Mentions legales | Fortyn",
  description: "Mentions legales du site Fortyn.",
};

export default function LegalNoticePage() {
  return (
    <>
      <LegalTopNav />
      <main className="mx-auto max-w-3xl px-6 py-12 text-slate-800">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Mentions legales</h1>
      <p className="mb-6 text-sm text-slate-500">Derniere mise a jour : 25 avril 2026</p>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Editeur du site</h2>
        <p>
          Fortyn
          <br />
          Responsable : Issa Drici
          <br />
          Email : contact@fortyn.fr
          <br />
          Adresse : [A completer]
          <br />
          Forme juridique / SIREN : [A completer]
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Hebergement</h2>
        <p>
          Le site est heberge sur une infrastructure cloud securisee.
          <br />
          Hebergeur : [Nom hebergeur]
          <br />
          Adresse hebergeur : [A completer]
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Propriete intellectuelle</h2>
        <p>
          L'ensemble des contenus du site (textes, visuels, code, marque) est protege par le droit de la propriete
          intellectuelle. Toute utilisation non autorisee est interdite.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Activite reglementee et communication</h2>
        <p>
          Fortyn propose des services d'accompagnement digital, de cadrage produit et de support operationnel. Les contenus
          publies ne constituent pas un conseil juridique, fiscal ou financier.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Protection des donnees</h2>
        <p>
          Les modalites de traitement des donnees personnelles sont detaillees dans la Politique de confidentialite et la
          procedure de suppression des donnees.
        </p>
      </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p>Pour toute demande legale ou administrative : contact@fortyn.fr</p>
        </section>
      </main>
      <LegalFooter />
    </>
  );
}
