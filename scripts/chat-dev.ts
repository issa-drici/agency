import dotenv from "dotenv";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const DEFAULT_CLIENT_ID = "+33600000001";
const GREY = "\x1b[90m";
const RESET = "\x1b[0m";

async function main() {
  process.env.CHAT_DEV_MODE = "true";
  dotenv.config({ path: ".env" });
  dotenv.config({ path: ".env.local", override: true });

  if (!process.env.DATABASE_URL) {
    console.error("Erreur > DATABASE_URL manquant. Ajoute-le dans .env ou .env.local.");
    process.exit(1);
  }

  const [{ chat }, { prisma }] = await Promise.all([
    import("../lib/agents/po"),
    import("../lib/db"),
  ]);

  const clientId = process.argv[2]?.trim() || DEFAULT_CLIENT_ID;
  const rl = readline.createInterface({ input, output });

  console.log("=== Mode dev Fortyn ===");
  console.log(`Client ID : ${clientId}`);
  console.log("Tape 'quit' pour quitter, 'reset' pour effacer l'historique");
  console.log("");

  try {
    while (true) {
      const raw = await rl.question("Prospect > ");
      const message = raw.trim();

      if (!message) continue;

      if (message === "quit" || message === "exit") {
        break;
      }

      if (message === "reset") {
        await prisma.conversation.deleteMany({ where: { clientId } });
        console.log("Historique efface.");
        continue;
      }

      if (message === "backlog") {
        const stories = await prisma.userStory.findMany({
          where: { clientId },
          orderBy: [{ priorite: "desc" }, { createdAt: "asc" }],
        });

        if (stories.length === 0) {
          console.log("Backlog vide.");
          continue;
        }

        console.log("Backlog :");
        for (const us of stories) {
          console.log(`- [${us.statut}] ${us.titre} (${us.id})`);
        }
        continue;
      }

      try {
        const { response, actions } = await chat(clientId, message);
        console.log(`Agent > ${response}`);
        for (const action of actions) {
          console.log(`${GREY}  ⚡ ${action}${RESET}`);
        }
      } catch (error) {
        const messageText =
          error instanceof Error ? error.message : "Erreur inconnue";
        console.error(`Erreur > ${messageText}`);
      }
    }
  } finally {
    rl.close();
  }
}

void main();
