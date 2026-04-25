import type { Metadata } from "next";
import Link from "next/link";
import { LegalTopNav } from "@/components/organisms/LegalTopNav";

export const metadata: Metadata = {
  title: "Politique de confidentialite | Fortyn",
  description: "Politique de confidentialite de Fortyn et traitement des donnees personnelles.",
};

export default function PrivacyPage() {
  return (
    <>
      <LegalTopNav />
      <main className="mx-auto max-w-3xl px-6 py-12 text-slate-800">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Politique de confidentialite</h1>
      <p className="mb-6 text-sm text-slate-500">Derniere mise a jour : 25 avril 2026</p>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">1. Responsable du traitement</h2>
        <p>
          Le service Fortyn est exploite par Issa Drici. Pour toute question relative aux donnees personnelles :
          <br />
          Email : contact@fortyn.fr
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">2. Donnees personnelles traitees</h2>
        <p>Nous pouvons collecter les donnees suivantes :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>identite et coordonnees (nom, email, numero de telephone) ;</li>
          <li>informations professionnelles et metier partagees pendant l'audit ;</li>
          <li>messages et metadonnees d'echange via WhatsApp Business Platform ;</li>
          <li>donnees techniques de navigation (logs, adresse IP, navigateur, terminal) ;</li>
          <li>donnees de suivi operationnel (horodatage, statut de traitement, erreurs techniques).</li>
        </ul>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">3. Finalites et bases legales</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>fourniture du service Fortyn (audit, roadmap, V1) - execution contractuelle ;</li>
          <li>reponse aux sollicitations WhatsApp - execution de votre demande ;</li>
          <li>securisation et prevention de la fraude - interet legitime ;</li>
          <li>respect des obligations fiscales, comptables et legales - obligation legale ;</li>
          <li>amelioration du service et de la qualite - interet legitime ;</li>
          <li>envoi d'informations non essentielles (si active) - consentement.</li>
        </ul>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">4. Utilisation de WhatsApp Business Platform (Meta)</h2>
        <p>
          Fortyn utilise WhatsApp Business Platform pour recevoir et envoyer des messages transactionnels et de support.
          L'utilisation de ce canal implique un traitement de certaines donnees par Meta en tant que fournisseur de la
          plateforme.
        </p>
        <p>
          Fortyn traite uniquement les donnees necessaires a la gestion de vos demandes. Nous n'envoyons pas de messages
          promotionnels sans base legale appropriee (consentement, relation client ou autre fondement applicable).
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">5. Destinataires et sous-traitants</h2>
        <p>Les donnees peuvent etre accessibles, dans la limite de leurs besoins, a :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>l'equipe interne Fortyn ;</li>
          <li>nos prestataires d'hebergement et d'infrastructure ;</li>
          <li>nos outils de base de donnees et de supervision technique ;</li>
          <li>Meta (WhatsApp Business Platform) pour le transport et le traitement des messages.</li>
        </ul>
        <p>Les donnees ne sont ni revendues, ni louees a des tiers.</p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">6. Duree de conservation</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>donnees de compte et de contact : duree de la relation + obligations legales ;</li>
          <li>messages de support et echanges WhatsApp : jusqu'a 36 mois max ;</li>
          <li>logs techniques : entre 6 et 12 mois selon finalite de securite ;</li>
          <li>donnees supprimees sur demande : voir la page de suppression des donnees.</li>
        </ul>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">7. Securite</h2>
        <p>
          Fortyn met en oeuvre des mesures de securite techniques et organisationnelles adaptees : gestion des acces,
          journalisation, chiffrement en transit, politique de moindre privilege, sauvegardes et surveillance des erreurs.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">8. Transferts hors Union europeenne</h2>
        <p>
          Certains fournisseurs peuvent traiter des donnees en dehors de l'UE. Dans ce cas, Fortyn s'assure de garanties
          adequates (clauses contractuelles types ou mecanismes reconnus).
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">9. Vos droits</h2>
        <p>
          Vous pouvez exercer vos droits d'acces, rectification, effacement, opposition, limitation et portabilite en
          ecrivant a contact@fortyn.fr.
        </p>
        <p>
          Vous pouvez egalement introduire une reclamation aupres de l'autorite de controle competente (ex. CNIL en France).
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">10. Cookies et traceurs</h2>
        <p>
          Le site peut utiliser des cookies strictement necessaires au fonctionnement et, le cas echeant, des cookies de
          mesure d'audience selon la configuration du service. Les choix de consentement sont appliques conformement a la
          reglementation.
        </p>
      </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">11. Suppression des donnees</h2>
          <p>
            Pour demander la suppression de vos donnees, consultez la page{" "}
            <Link href="/data-deletion" className="text-sky-600 underline underline-offset-2">
              Suppression des donnees
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
}
