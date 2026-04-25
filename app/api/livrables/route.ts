import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function bearerToken(request: Request): string | null {
  const h = request.headers.get("authorization");
  if (!h?.toLowerCase().startsWith("bearer ")) return null;
  return h.slice(7).trim();
}

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.LIVRABLES_API_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "LIVRABLES_API_SECRET non configuré." }, { status: 500 });
  }

  const token = bearerToken(request);
  if (!token || token !== secret) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalide." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Corps attendu : objet JSON." }, { status: 400 });
  }

  const { clientId, audit, roadmap, v1 } = body as Record<string, unknown>;
  if (typeof clientId !== "string" || !clientId.trim()) {
    return NextResponse.json({ ok: false, error: "clientId requis." }, { status: 400 });
  }

  const auditStr = JSON.stringify(audit ?? {});
  const roadmapStr = JSON.stringify(roadmap ?? {});
  const v1Str = JSON.stringify(v1 ?? {});

  await prisma.livrable.upsert({
    where: { clientId: clientId.trim() },
    create: {
      id: randomUUID(),
      clientId: clientId.trim(),
      audit: auditStr,
      roadmap: roadmapStr,
      v1: v1Str,
    },
    update: {
      audit: auditStr,
      roadmap: roadmapStr,
      v1: v1Str,
    },
  });

  return NextResponse.json({ ok: true });
}
