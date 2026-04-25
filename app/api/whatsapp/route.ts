import { chat } from "@/lib/agents/po";
type MetaWebhookPayload = {
  object?: string;
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: Array<{
          from?: string;
          text?: { body?: string };
          type?: string;
        }>;
        metadata?: { phone_number_id?: string };
      };
    }>;
  }>;
};

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const hubMode = searchParams.get("hub.mode");
  const hubVerifyToken = searchParams.get("hub.verify_token");
  const hubChallenge = searchParams.get("hub.challenge");

  const expectedToken = process.env.META_WEBHOOK_VERIFY_TOKEN;

  if (
    hubMode === "subscribe" &&
    hubVerifyToken &&
    expectedToken &&
    hubVerifyToken === expectedToken
  ) {
    return new Response(hubChallenge ?? "", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response("Forbidden", { status: 403 });
}

async function sendMetaWhatsAppMessage(
  phoneNumberId: string,
  to: string,
  body: string,
): Promise<void> {
  const token = process.env.META_WHATSAPP_TOKEN;
  if (!token) {
    throw new Error("META_WHATSAPP_TOKEN manquant");
  }

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Echec envoi Meta WhatsApp (${response.status}): ${errorBody}`,
    );
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const payload = (await request.json()) as MetaWebhookPayload;
    const value = payload.entry?.[0]?.changes?.[0]?.value;
    const messages = value?.messages;

    if (!messages || messages.length === 0) {
      return new Response("OK", { status: 200 });
    }

    const incomingMessage = messages[0];
    if (incomingMessage.type !== "text") {
      return new Response("OK", { status: 200 });
    }

    const from = incomingMessage.from ?? "";
    const messageBody = incomingMessage.text?.body ?? "";
    const phoneNumberId = value?.metadata?.phone_number_id ?? "";

    if (!from || !messageBody || !phoneNumberId) {
      return new Response("OK", { status: 200 });
    }

    const clientId = `+${from}`;
    const { response: agentResponse } = await chat(clientId, messageBody);
    await sendMetaWhatsAppMessage(phoneNumberId, from, agentResponse);
  } catch (error) {
    console.error("[whatsapp webhook] erreur interne Meta:", error);
  }

  // Meta attend un 200 même en cas d'erreur interne.
  return new Response("OK", { status: 200 });
}
