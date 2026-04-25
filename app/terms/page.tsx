import type { Metadata } from "next";
import { LegalTopNav } from "@/components/organisms/LegalTopNav";

export const metadata: Metadata = {
  title: "Conditions d'utilisation | Fortyn",
  description: "Conditions generales d'utilisation des services Fortyn.",
};

export default function TermsPage() {
  return (
    <>
      <LegalTopNav />
      <main className="mx-auto max-w-3xl px-6 py-12 text-slate-800">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Conditions d'utilisation</h1>
      <p className="mb-6 text-sm text-slate-500">Derniere mise a jour : 25 avril 2026</p>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">1. Objet</h2>
        <p>
          Les presentes conditions generales d'utilisation (CGU) definissent les regles d'utilisation du site et des
          services proposes par Fortyn.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">2. Acceptation des conditions</h2>
        <p>
          L'utilisation du site et des services implique l'acceptation pleine et entiere des presentes CGU. En cas de
          desaccord, l'utilisateur doit cesser l'utilisation du service.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">3. Acces au service</h2>
        <p>
          L'utilisateur s'engage a fournir des informations exactes. L'acces peut etre suspendu temporairement pour
          maintenance, securite, mise a jour ou toute operation technique necessaire.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">4. Description des services</h2>
        <p>
          Fortyn fournit des services d'analyse et d'accompagnement digital, notamment audit, recommandations
          operationnelles, roadmap et specification fonctionnelle de version initiale (V1).
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">5. Utilisation de WhatsApp</h2>
        <p>
          Certains echanges peuvent etre realises via WhatsApp Business Platform (Meta). L'utilisateur peut interrompre
          ce canal a tout moment en formulant sa demande explicite.
        </p>
        <p>
          L'utilisateur s'engage a ne pas envoyer de contenus illicites, diffamatoires, violents, frauduleux ou portant
          atteinte aux droits de tiers.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">6. Obligations de l'utilisateur</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>fournir des informations sinceres et a jour ;</li>
          <li>ne pas usurper l'identite d'un tiers ;</li>
          <li>ne pas tenter de perturber le fonctionnement du service ;</li>
          <li>respecter la legislation applicable.</li>
        </ul>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">7. Propriete intellectuelle</h2>
        <p>
          Les contenus, marques, textes, methodes et livrables de Fortyn sont proteges. Toute reproduction ou diffusion non
          autorisee est interdite.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">8. Limitation de responsabilite</h2>
        <p>
          Fortyn fournit un service d'analyse et de recommandation. Les decisions de mise en oeuvre et leurs consequences
          restent sous la responsabilite du client.
        </p>
        <p>
          Fortyn ne peut etre tenu responsable des dommages indirects, pertes d'exploitation, pertes de donnees ou pertes
          de chance liees a l'utilisation du service.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">9. Disponibilite et evolution du service</h2>
        <p>
          Fortyn peut faire evoluer, suspendre ou interrompre tout ou partie du service pour des raisons techniques,
          juridiques ou operationnelles.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">10. Donnees personnelles</h2>
        <p>
          Le traitement des donnees est detaille dans la Politique de confidentialite. L'utilisateur dispose de droits
          d'acces, rectification et suppression.
        </p>
      </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">11. Droit applicable et litiges</h2>
          <p>
            Les presentes CGU sont soumises au droit francais. En cas de litige, une resolution amiable est recherchee en
            priorite avant toute procedure judiciaire.
          </p>
        </section>
      </main>
    </>
  );
}
