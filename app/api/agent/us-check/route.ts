import { NextResponse } from "next/server";
import { chat } from "@/lib/agents/po";

type Payload = {
  clientId?: string;
};

function isAuthorized(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const auth = request.headers.get("authorization") ?? "";
  return auth === `Bearer ${secret}`;
}

export async function POST(request: Request): Promise<Response> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const clientId = body.clientId?.trim() ?? "";
  if (!clientId) {
    return NextResponse.json({ error: "clientId requis." }, { status: 400 });
  }

  try {
    const { actions } = await chat(clientId, "[INTERNAL_US_CHECK]");
    return NextResponse.json({ actions }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur interne us-check.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
