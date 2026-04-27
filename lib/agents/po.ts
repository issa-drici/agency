import Anthropic from "@anthropic-ai/sdk";
import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/db";
import { generateMagicLink, sendMagicLinkWhatsApp } from "@/lib/magiclink";

/** Aligné sur `agents/po.py` (référence Python). */
const SYSTEM_PROMPT = `Tu es le Product Owner de Fortyn, une agence de développement ultra-rapide propulsée par IA.

RÈGLE ABSOLUE : une seule question par message, jamais plus. 1 à 3 lignes max. Pas de listes.
Pas de gras. Ton WhatsApp naturel.

DÉROULÉ DE LA CONVERSATION :

1. Tu collectes les besoins du client question par question, de façon naturelle.
   Tu prends des notes en interne avec /note au fil de la discussion.
   Tu ne parles jamais de "user stories", "backlog", "sprint" ou tout terme technique.

2. Quand tu as assez d'infos, tu fais un récapitulatif fonctionnel simple en langage client :
   "Voilà ce que j'ai compris de ton projet : ..."
   Tu attends sa validation. Si ok, tu dis juste "Parfait, je transmets à l'équipe !"
   Puis tu crées les US en silence avec /us sans en parler au client.

3. Tu ne demandes JAMAIS le budget. Tu ne parles jamais de délais ni de prix.

4. Tu ne demandes PAS l'avis du client sur l'organisation interne du travail.

5. Tu pars toujours sur un MVP. Quand tu récapitules, tu identifies naturellement ce qui est
   essentiel pour lancer versus ce qui peut venir ensuite. Tu dis "pour démarrer" et
   "dans un second temps", jamais "MVP" ou "V2".

6. Lors de la collecte des besoins, tu dois toujours demander explicitement quels sont
   TOUS les champs et informations nécessaires au processus, sans les déduire toi-même.
   Par exemple : "Quels sont tous les champs obligatoires que vous devez avoir pour
   traiter une demande ?" plutôt que de supposer depuis les informations manquantes citées.

7. Dans ton récapitulatif final, tu te limites STRICTEMENT à ce que le client gère
   lui-même : la collecte des demandes, le suivi, les communications avec ses propres
   clients. Tu ne promets jamais d'automatiser ou d'interfacer avec des systèmes
   externes (sites gouvernementaux, portails de visa, APIs tierces) car ce n'est pas
   dans ton périmètre de collecte. Si le client mentionne un site externe, tu notes
   juste qu'il existe sans proposer de l'intégrer.

8. Après avoir dit "Parfait, je transmets à l'équipe !" et créé les US en silence,
   si le prospect continue à envoyer des messages de confirmation ou de remerciement
   ("oui c'est ça", "merci", "parfait", "super", etc.), tu réponds simplement de façon
   naturelle et courte SANS créer de nouvelles US et SANS relancer une nouvelle collecte.
   Tu attends qu'il aborde explicitement un nouveau sujet ou un nouveau problème avant
   de reprendre la collecte. Si le prospect dit qu'il a d'autres sujets à traiter,
   tu réponds "Dis-moi !" et tu reprends la collecte normalement pour ce nouveau sujet.

9. Tu ne génères pas d'audit, de roadmap ni de document. Tu collectes les besoins et crées
   des user stories. C'est tout ton périmètre.

10. Tu ne te présentes jamais avec un prénom. Tu ne mentionnes jamais Fortyn ni aucun autre
   produit. Tu représentes uniquement Fortyn.

11. Tu dois continuer la collecte tant qu'il manque des informations critiques pour écrire des
   US fonctionnelles exploitables. Ne fais PAS le récapitulatif final ni "Parfait, je transmets
   à l'équipe !" tant que ces points ne sont pas suffisamment clairs.

EXEMPLE DE BON MESSAGE :
"Cool ! C'est plutôt sur place, à emporter, ou les deux ?"

EXEMPLE DE MAUVAIS MESSAGE :
"Super projet ! Voici mes questions :
- Sur place ou livraison ?
- Combien de tables ?
- Vous avez des livreurs ?"

Commandes internes (invisibles pour le client) :
/note <clé> | <valeur> — sauvegarder ou mettre à jour une info.
La clé identifie le sujet (ex: "secteur", "équipe", "problème principal", "volumétrie").
Si une note avec la même clé existe déjà, elle sera remplacée, pas dupliquée.
Utilise des clés courtes et stables. Exemples :
/note secteur | industriel et logistique
/note équipe | 2 personnes - founder + commercial
/note problème | identifier entreprises cibles
/note volumétrie | 700 entreprises/semaine, taux conversion 0.7%

/us
TITRE: <titre court et précis>
DESCRIPTION: En tant que <rôle>, je veux <action> afin de <bénéfice>
CONTEXTE: <informations métier importantes, règles, contraintes spécifiques au projet>
CRITERES:
- <critère d'acceptance 1 précis et testable>
- <critère d'acceptance 2 précis et testable>
HORS_SCOPE: <ce qui n'est explicitement PAS dans cette US>
DEPENDANCES: <US dont celle-ci dépend, ou "aucune">

NIVEAU DE DÉTAIL OBLIGATOIRE POUR /us (US fonctionnelles) :
- Les US doivent être suffisamment détaillées pour servir de base à des US techniques ensuite.
- CONTEXTE doit inclure : acteurs impliqués, déclencheur, données manipulées, contraintes métier,
  règles de gestion, exceptions connues, volumétrie approximative si disponible.
- CRITERES doit contenir 6 à 10 critères testables quand c'est pertinent, avec cas nominal + cas limites
  + erreurs attendues (ex: champ manquant, statut invalide, doublon, action non autorisée).
- HORS_SCOPE doit être explicite pour éviter le scope creep.
- DEPENDANCES doit référencer les autres US fonctionnelles réellement nécessaires, sinon "aucune".
- Ne jamais écrire des US vagues. Si une info manque pour détailler correctement, continue la collecte
  avant de générer les /us.

CHECKLIST MINIMALE AVANT RÉCAP ET /us :
- Profil de l'entreprise/organisation : activité précise, type de structure, taille (effectif),
  volume d'activité (ordre de grandeur), et contexte opérationnel.
- Personnes impliquées : qui fait quoi aujourd'hui, qui décide, qui exécute, qui suit les dossiers.
- Acteurs exacts et rôles (client final, assistante, admin, prestataire externe).
- Déclencheur du processus et étapes métier dans l'ordre.
- Statuts métier attendus et règles de passage d'un statut à l'autre.
- Données obligatoires à collecter dès le départ (liste explicite champ par champ).
- Documents obligatoires, formats acceptés, et moment de vérification.
- Événements qui déclenchent notifications/emails et destinataires.
- Cas limites et erreurs fréquentes (infos manquantes, doublons, retard, refus, etc.).
- Ce qui est dans le périmètre "pour démarrer" vs "dans un second temps".

Si la checklist n'est pas couverte, continue de poser UNE seule question ciblée à la fois.
Important : pour un besoin de formulaire, tu dois obtenir explicitement la liste des champs/données
obligatoires avant de clôturer la collecte.
Important : tu dois aussi obtenir la fiche entreprise minimale (activité précise + taille + organisation)
avant de clôturer la collecte.

/backlog — afficher les US

Quand tu vois [PREMIER MESSAGE DU PROSPECT] au début d'un message, c'est le tout premier
contact. Ignorer ce tag complètement. Ne pas supposer que le prospect veut développer quoi
que ce soit. Commencer par lui demander ce qui lui prend le plus de temps dans son activité
en ce moment, ou quel est son principal problème opérationnel. Ne pas se présenter avec un
prénom. Ne pas mentionner le développement web ou les applications.

Quand tu reçois [INTERNAL_US_CHECK], relis toute la conversation de ce client et vérifie
si des user stories importantes manquent dans le backlog actuel. Crée uniquement les US
manquantes avec /us. Ne réponds rien au prospect, retourne juste une réponse vide avec les
commandes /us nécessaires.

Ne jamais utiliser de balises XML ou marqueurs dans tes réponses.
Écrire uniquement le message destiné au client, suivi éventuellement des commandes /note ou /us.
Tu réponds toujours en français.`;

export type AgentResponse = { response: string; actions: string[] };

export type ParsedUS = {
  titre: string;
  description: string;
  contexte: string;
  criteres: string;
  horsScope: string;
  dependances: string;
};

type UsExtras = {
  type: string | null;
  specsTechniques: string;
  usParentId: string | null;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const XML_TAG_LINE_RE = /^<\/?(answer|metadata|note)>$/i;
const XML_TAG_INLINE_RE = /<\/?(answer|metadata|note)>/gi;

function appendMultiline(current: string, stripped: string, sep: "\n" | " "): string {
  if (!current) return stripped;
  return sep === "\n" ? `${current}\n${stripped}` : `${current} ${stripped}`;
}

async function saveMessage(clientId: string, role: string, content: string): Promise<void> {
  await prisma.conversation.create({
    data: {
      id: randomUUID(),
      clientId,
      role,
      content,
    },
  });
}

async function getHistory(clientId: string, limit = 20) {
  const rows = await prisma.conversation.findMany({
    where: { clientId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.reverse();
}

const NOTE_KEY_VALUE_SEP = " | ";

/** Sans séparateur ` | ` : création simple (comportement historique). Avec : upsert par clé + clientId. */
async function saveNote(
  clientId: string,
  rawContent: string,
): Promise<{ kind: "created" | "updated"; summary: string }> {
  const trimmed = rawContent.trim();
  const sepIdx = trimmed.indexOf(NOTE_KEY_VALUE_SEP);

  if (sepIdx === -1) {
    await prisma.notePO.create({
      data: {
        id: randomUUID(),
        clientId,
        contenu: trimmed,
      },
    });
    return { kind: "created", summary: trimmed };
  }

  const cle = trimmed.slice(0, sepIdx).trim();
  const valeur = trimmed.slice(sepIdx + NOTE_KEY_VALUE_SEP.length).trim();
  if (!cle) {
    await prisma.notePO.create({
      data: {
        id: randomUUID(),
        clientId,
        contenu: trimmed,
      },
    });
    return { kind: "created", summary: trimmed };
  }

  const contenu = `${cle}${NOTE_KEY_VALUE_SEP}${valeur}`;
  const prefix = `${cle}${NOTE_KEY_VALUE_SEP}`;

  const existing = await prisma.notePO.findFirst({
    where: {
      clientId,
      contenu: { startsWith: prefix },
    },
    orderBy: { createdAt: "desc" },
  });

  if (existing) {
    await prisma.notePO.update({
      where: { id: existing.id },
      data: { contenu },
    });
    await prisma.notePO.deleteMany({
      where: {
        clientId,
        id: { not: existing.id },
        contenu: { startsWith: prefix },
      },
    });
    return { kind: "updated", summary: contenu };
  }

  await prisma.notePO.create({
    data: {
      id: randomUUID(),
      clientId,
      contenu,
    },
  });
  return { kind: "created", summary: contenu };
}

async function getNotes(clientId: string) {
  return prisma.notePO.findMany({
    where: { clientId },
    orderBy: { createdAt: "desc" },
  });
}

async function createUserStory(
  clientId: string,
  fields: ParsedUS,
  extras: UsExtras,
): Promise<string> {
  const titre = fields.titre.trim().slice(0, 200);
  const row = await prisma.userStory.create({
    data: {
      id: randomUUID(),
      clientId,
      titre,
      description: fields.description.trim() || null,
      contexte: fields.contexte.trim() || null,
      criteresAcceptance: fields.criteres.trim() || null,
      horsScope: fields.horsScope.trim() || null,
      dependances: fields.dependances.trim() || null,
      type: extras.type?.trim() || null,
      specsTechniques: extras.specsTechniques.trim() || null,
      usParentId: extras.usParentId && UUID_RE.test(extras.usParentId) ? extras.usParentId : null,
    },
  });
  return row.id;
}

async function getBacklog(clientId: string) {
  return prisma.userStory.findMany({
    where: { clientId },
    orderBy: [{ priorite: "desc" }, { createdAt: "asc" }],
  });
}

async function parseCommands(
  responseText: string,
  clientId: string,
): Promise<{ cleanResponse: string; actions: string[] }> {
  const lines = responseText.split("\n");
  const cleanResponse: string[] = [];
  const actions: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const stripped = line.trim();

    if (/^\/note\b/i.test(stripped)) {
      const noteContent = stripped.replace(/^\/note\b/i, "").trim();
      if (noteContent) {
        const { kind, summary } = await saveNote(clientId, noteContent);
        actions.push(
          kind === "updated"
            ? `Note mise à jour : ${summary}`
            : `Note sauvegardée : ${summary}`,
        );
      }
      i += 1;
    } else if (/^\/us\b/i.test(stripped)) {
      const usBlockLines: string[] = [];
      i += 1;
      while (i < lines.length) {
        const nextLine = lines[i];
        const nextTrim = nextLine.trim();
        if (nextTrim.startsWith("/")) break;
        usBlockLines.push(nextLine);
        i += 1;
      }

      let titre = "";
      let description = "";
      let contexte = "";
      let criteres = "";
      let horsScope = "";
      let dependances = "";
      let currentField: keyof ParsedUS | null = null;

      for (const blockLine of usBlockLines) {
        const s = blockLine.trim();
        if (s.startsWith("TITRE:")) {
          currentField = "titre";
          titre = s.slice(6).trim();
        } else if (s.startsWith("DESCRIPTION:")) {
          currentField = "description";
          description = s.slice(12).trim();
        } else if (s.startsWith("CONTEXTE:")) {
          currentField = "contexte";
          contexte = s.slice(9).trim();
        } else if (s.startsWith("CRITERES:")) {
          currentField = "criteres";
          criteres = s.slice(9).trim();
        } else if (s.startsWith("HORS_SCOPE:")) {
          currentField = "horsScope";
          horsScope = s.slice(11).trim();
        } else if (s.startsWith("DEPENDANCES:")) {
          currentField = "dependances";
          dependances = s.slice(12).trim();
        } else if (currentField === "titre") {
          titre = appendMultiline(titre, s, " ");
        } else if (currentField === "description") {
          description = appendMultiline(description, s, " ");
        } else if (currentField === "contexte") {
          contexte = appendMultiline(contexte, s, "\n");
        } else if (currentField === "criteres") {
          criteres = appendMultiline(criteres, s, "\n");
        } else if (currentField === "horsScope") {
          horsScope = appendMultiline(horsScope, s, "\n");
        } else if (currentField === "dependances") {
          dependances = appendMultiline(dependances, s, "\n");
        }
      }

      if (titre && description) {
        const parsed: ParsedUS = {
          titre,
          description,
          contexte,
          criteres,
          horsScope,
          dependances,
        };
        try {
          const usId = await createUserStory(clientId, parsed, {
            type: null,
            specsTechniques: "",
            usParentId: null,
          });
          actions.push(`US #${usId} créée : [fonctionnelle] ${titre}`);
        } catch {
          actions.push(`Echec creation US : ${titre}`);
        }
      }
    } else if (stripped === "/backlog") {
      const backlog = await getBacklog(clientId);
      if (backlog.length > 0) {
        let backlogText = "\nBacklog actuel :\n";
        for (const us of backlog) {
          backlogText += `  • US #${us.id} [${us.statut}] ${us.titre}\n`;
        }
        cleanResponse.push(backlogText);
      } else {
        cleanResponse.push("Le backlog est vide pour l'instant.");
      }
      i += 1;
    } else {
      if (!XML_TAG_LINE_RE.test(stripped)) {
        cleanResponse.push(line);
      }
      i += 1;
    }
  }

  const cleanResponseText = cleanResponse
    .join("\n")
    .replace(XML_TAG_INLINE_RE, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { cleanResponse: cleanResponseText, actions };
}

function extractAssistantText(message: Anthropic.Messages.Message): string {
  const parts: string[] = [];
  for (const block of message.content) {
    if (block.type === "text") parts.push(block.text);
  }
  return parts.join("");
}

export type ChatOptions = {
  /** Canal web : ne pas envoyer de magic link / WhatsApp en fin de collecte. */
  skipMagicLink?: boolean;
};

export async function chat(
  clientId: string,
  userMessage: string,
  options?: ChatOptions,
): Promise<AgentResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY est requis pour l’agent PO.");
  }

  const existingUsCount = await prisma.userStory.count({
    where: { clientId },
  });

  const priorTurnCount = await prisma.conversation.count({
    where: { clientId },
  });

  await saveMessage(clientId, "user", userMessage);
  const history = await getHistory(clientId, 20);
  const notes = await getNotes(clientId);

  const messages: Anthropic.MessageParam[] = [];
  for (const msg of history.slice(0, -1)) {
    const role = msg.role === "assistant" ? "assistant" : "user";
    messages.push({ role, content: msg.content });
  }
  const userContentForModel =
    priorTurnCount === 0
      ? `[PREMIER MESSAGE DU PROSPECT]\n${userMessage}`
      : userMessage;
  messages.push({ role: "user", content: userContentForModel });

  let systemWithContext = SYSTEM_PROMPT;
  if (notes.length > 0) {
    systemWithContext += "\n\n## Tes notes sur ce client :\n";
    for (const note of notes) {
      systemWithContext += `- ${note.contenu}\n`;
    }
  }

  const anthropic = new Anthropic({ apiKey });
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 2048,
    system: systemWithContext,
    messages,
  });

  const rawResponse = extractAssistantText(response);
  const { cleanResponse, actions } = await parseCommands(rawResponse, clientId);

  await saveMessage(clientId, "assistant", cleanResponse);

  const hasCreatedUs = actions.some((action) => action.startsWith("US #"));
  const finConversationExplicite =
    cleanResponse.includes("Parfait, je transmets à l'équipe") ||
    cleanResponse.includes("je transmets à l'équipe");
  const finConversationImplicite = hasCreatedUs && existingUsCount === 0;

  if (
    (finConversationExplicite || finConversationImplicite) &&
    !options?.skipMagicLink
  ) {
    const isDevMode =
      process.env.NODE_ENV === "development" ||
      process.env.CHAT_DEV_MODE === "true";
    /** Script `pnpm chat` : pas d'appel Graph Meta (token / WhatsApp hors scope dev). */
    const skipWhatsAppMagicLink = process.env.CHAT_DEV_MODE === "true";

    if (skipWhatsAppMagicLink) {
      try {
        const magicLink = await generateMagicLink(clientId);
        actions.push(
          `Magic link (dev, envoi WhatsApp ignore — reactiver quand Meta est OK) : ${magicLink}`,
        );
      } catch (error) {
        const reason =
          error instanceof Error ? error.message : "erreur inconnue";
        actions.push(`Echec generation magic link: ${reason}`);
      }
    } else {
      let devMagicLink: string | null = null;

      try {
        const magicLink = await sendMagicLinkWhatsApp(
          clientId,
          devMagicLink ?? undefined,
        );
        actions.push("Magic link envoye sur WhatsApp.");
        if (isDevMode) {
          if (!devMagicLink) {
            devMagicLink = magicLink;
          }
          actions.push(`Magic link (dev): ${magicLink}`);
        }
      } catch (error) {
        const reason =
          error instanceof Error ? error.message : "erreur inconnue";
        actions.push(`Echec envoi magic link WhatsApp: ${reason}`);
        if (isDevMode) {
          try {
            if (!devMagicLink) {
              devMagicLink = await generateMagicLink(clientId);
            }
            actions.push(`Magic link (dev fallback): ${devMagicLink}`);
          } catch (fallbackError) {
            const fallbackReason =
              fallbackError instanceof Error
                ? fallbackError.message
                : "erreur inconnue";
            actions.push(
              `Echec generation magic link (dev fallback): ${fallbackReason}`,
            );
          }
        }
      }
    }
  }

  return { response: cleanResponse, actions };
}
