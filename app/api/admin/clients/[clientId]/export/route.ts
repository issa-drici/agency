import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { prisma } from "@/lib/db";
import { parseAuditJson, parseRoadmapJson, parseV1Json } from "@/lib/livrables-json";

export const runtime = "nodejs";

type RouteProps = {
  params: Promise<{ clientId: string }>;
};

function formatDateTime(value: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}

function safeFileName(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function wrapText(text: string, maxChars = 105): string[] {
  const lines: string[] = [];
  for (const rawLine of text.split("\n")) {
    let line = rawLine.trimEnd();
    if (!line) {
      lines.push("");
      continue;
    }
    while (line.length > maxChars) {
      const cut = line.lastIndexOf(" ", maxChars);
      const idx = cut > 20 ? cut : maxChars;
      lines.push(line.slice(0, idx).trimEnd());
      line = line.slice(idx).trimStart();
    }
    lines.push(line);
  }
  return lines;
}

function sanitizePdfText(input: string): string {
  return input
    .replace(/\r\n/g, "\n")
    .replace(/\u2019/g, "'")
    .replace(/\u2018/g, "'")
    .replace(/\u201c|\u201d/g, '"')
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, "?");
}

export async function GET(_: Request, { params }: RouteProps): Promise<Response> {
  const { clientId: rawClientId } = await params;
  const clientId = decodeURIComponent(rawClientId);

  const [messages, notes, userStories, livrable] = await Promise.all([
    prisma.conversation.findMany({
      where: { clientId },
      orderBy: { createdAt: "asc" },
    }),
    prisma.notePO.findMany({
      where: { clientId },
      orderBy: { createdAt: "asc" },
    }),
    prisma.userStory.findMany({
      where: { clientId },
      orderBy: [{ priorite: "desc" }, { createdAt: "asc" }],
    }),
    prisma.livrable.findUnique({
      where: { clientId },
    }),
  ]);

  if (
    messages.length === 0 &&
    notes.length === 0 &&
    userStories.length === 0 &&
    !livrable
  ) {
    return NextResponse.json({ error: "Client introuvable." }, { status: 404 });
  }

  const pdf = await PDFDocument.create();
  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 40;
  const lineHeight = 14;

  let page = pdf.addPage([pageWidth, pageHeight]);
  let cursorY = pageHeight - margin;

  function ensureSpace(lines = 1): void {
    if (cursorY - lines * lineHeight < margin) {
      page = pdf.addPage([pageWidth, pageHeight]);
      cursorY = pageHeight - margin;
    }
  }

  function drawLine(text: string, bold = false, size = 10): void {
    const safeText = sanitizePdfText(text);
    ensureSpace(1);
    page.drawText(safeText, {
      x: margin,
      y: cursorY,
      size,
      font: bold ? fontBold : fontRegular,
    });
    cursorY -= lineHeight;
  }

  function drawParagraph(text: string, bold = false, size = 10): void {
    const lines = wrapText(sanitizePdfText(text));
    for (const line of lines) {
      drawLine(line, bold, size);
    }
  }

  function drawSectionTitle(title: string): void {
    cursorY -= 4;
    drawLine(title, true, 13);
    cursorY -= 2;
  }

  drawLine("Export client - Fortyn Admin", true, 17);
  drawLine(`Client: ${clientId}`);
  drawLine(`Exporte le: ${new Date().toLocaleString("fr-FR")}`);
  drawParagraph(
    `Resume: ${messages.length} message(s), ${notes.length} note(s), ${userStories.length} user stor${userStories.length > 1 ? "ies" : "y"}, livrable ${livrable ? "present" : "absent"}.`,
  );

  drawSectionTitle("1. Conversation complete (A a Z)");
  if (messages.length === 0) {
    drawLine("Aucun message.");
  } else {
    for (const message of messages) {
      drawLine(`${message.role.toUpperCase()} - ${formatDateTime(message.createdAt)}`, true);
      drawParagraph(message.content || "(vide)");
      cursorY -= 4;
    }
  }

  drawSectionTitle("2. Notes PO");
  if (notes.length === 0) {
    drawLine("Aucune note.");
  } else {
    for (const note of notes) {
      drawLine(`- ${formatDateTime(note.createdAt)}`, true);
      drawParagraph(note.contenu || "(vide)");
      cursorY -= 3;
    }
  }

  drawSectionTitle("3. User stories");
  if (userStories.length === 0) {
    drawLine("Aucune user story.");
  } else {
    for (const story of userStories) {
      drawLine(
        `${story.titre} (priorite ${story.priorite}, statut ${story.statut})`,
        true,
      );
      drawParagraph(`ID: ${story.id}`);
      drawParagraph(`Creee: ${formatDateTime(story.createdAt)}`);
      drawParagraph(`MAJ: ${formatDateTime(story.updatedAt)}`);
      drawParagraph(`Description: ${story.description ?? "-"}`);
      drawParagraph(`Contexte: ${story.contexte ?? "-"}`);
      drawParagraph(`Criteres d'acceptance: ${story.criteresAcceptance ?? "-"}`);
      drawParagraph(`Hors scope: ${story.horsScope ?? "-"}`);
      drawParagraph(`Dependances: ${story.dependances ?? "-"}`);
      drawParagraph(`Type: ${story.type ?? "-"}`);
      drawParagraph(`Specs techniques: ${story.specsTechniques ?? "-"}`);
      drawParagraph(`US parent: ${story.usParentId ?? "-"}`);
      cursorY -= 4;
    }
  }

  drawSectionTitle("4. Livrables (JSON)");
  if (!livrable) {
    drawLine("Aucun livrable.");
  } else {
    drawLine("Audit", true);
    drawParagraph(JSON.stringify(parseAuditJson(livrable.audit), null, 2));
    cursorY -= 2;
    drawLine("Roadmap", true);
    drawParagraph(JSON.stringify(parseRoadmapJson(livrable.roadmap), null, 2));
    cursorY -= 2;
    drawLine("V1", true);
    drawParagraph(JSON.stringify(parseV1Json(livrable.v1), null, 2));
  }

  const pdfBytes = await pdf.save();
  const fileName = safeFileName(`client-${clientId}-export.pdf`);

  return new Response(new Uint8Array(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
