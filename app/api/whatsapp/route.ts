import twilio from "twilio";
import { chat } from "@/lib/agents/po";
import { prisma } from "@/lib/db";
import { WHATSAPP_FROM, twilioClient } from "@/lib/twilio";

const PREMIER_MESSAGE_TAG = "[PREMIER MESSAGE DU PROSPECT] ";

const TWIML_EMPTY = "<Response></Response>";
const TWIML_HEADERS = { "Content-Type": "text/xml; charset=utf-8" };

const GENERIC_ERROR_WA =
  "Désolé, une erreur s'est produite. Réessayez dans quelques instants.";

function formDataToParams(formData: FormData): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    params[key] = typeof value === "string" ? value : value.name;
  }
  return params;
}

function whatsappClientId(from: string): string {
  return from.replace(/^whatsapp:/i, "");
}

/** Même identifiant WhatsApp (E.164), sans tenir compte du préfixe `whatsapp:` ni de la casse. */
function whatsappRecipientKey(addr: string): string {
  return addr.trim().toLowerCase().replace(/^whatsapp:/i, "");
}

function isSameWhatsAppRecipient(a: string, b: string): boolean {
  return whatsappRecipientKey(a) === whatsappRecipientKey(b);
}

/**
 * Twilio refuse `from === to` (erreur 63031). Il faut que `TWILIO_WHATSAPP_FROM` soit le numéro
 * **sandbox / Business** Twilio (ex. whatsapp:+14155238886), jamais le numéro du prospect.
 */
async function sendWhatsApp(to: string, body: string): Promise<void> {
  const from = WHATSAPP_FROM?.trim();
  if (!from) {
    console.warn(
      "[whatsapp webhook] TWILIO_WHATSAPP_FROM manquant : impossible d’envoyer la réponse WhatsApp.",
    );
    return;
  }
  if (isSameWhatsAppRecipient(from, to)) {
    console.warn(
      "[whatsapp webhook] Envoi ignoré : TWILIO_WHATSAPP_FROM est identique au destinataire (From). " +
        "Corrigez .env : FROM = numéro Twilio sandbox / ligne WhatsApp Business, pas le numéro client.",
    );
    return;
  }
  await twilioClient.messages.create({
    from,
    to,
    body,
  });
}

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const params = formDataToParams(formData);

  const from = params.From ?? "";
  const messageBody = params.Body ?? "";

  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const signature = request.headers.get("x-twilio-signature") ?? "";

  if (process.env.NODE_ENV !== "development") {
    if (!authToken) {
      return new Response("Configuration Twilio incomplète.", { status: 500 });
    }
    const valid = twilio.validateRequest(
      authToken,
      signature,
      request.url,
      params,
    );
    if (!valid) {
      return new Response("Forbidden", { status: 403 });
    }
  }

  const twilioTo = from;
  const clientId = from ? whatsappClientId(from) : "";

  if (!twilioTo || !clientId) {
    return new Response(TWIML_EMPTY, { status: 200, headers: TWIML_HEADERS });
  }

  try {
    const messageCount = await prisma.conversation.count({
      where: { clientId },
    });
    const textePourChat =
      messageCount === 0 ? `${PREMIER_MESSAGE_TAG}${messageBody}` : messageBody;

    const { response } = await chat(clientId, textePourChat);
    await sendWhatsApp(twilioTo, response);
  } catch (err) {
    console.error("[whatsapp webhook] chat ou envoi Twilio:", err);
    try {
      await sendWhatsApp(twilioTo, GENERIC_ERROR_WA);
    } catch (sendErr) {
      console.error("[whatsapp webhook] envoi message d’erreur:", sendErr);
    }
  }

  return new Response(TWIML_EMPTY, { status: 200, headers: TWIML_HEADERS });
}
