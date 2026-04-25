import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { ButtonLink } from "@/components/molecules/ButtonLink";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "800", "900"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Fortyn · Audit digital gratuit pour dirigeants de PME",
  description:
    "Décrivez votre activité dans un entretien guidé, à votre rythme. Audit métier, roadmap priorisée et définition V1, gratuit, sans rendez-vous, sans engagement.",
  openGraph: {
    title: "Fortyn · Audit digital gratuit pour dirigeants de PME",
    description:
      "Ce que les grands groupes paient 15 000€ pour obtenir, vous l'obtenez dans un échange structuré, sans chronomètre. Gratuitement.",
    type: "website",
  },
};

/* ─────────────────────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────────────────────── */

function Tag({
  children,
  color = "#0ea5e9",
  bg = "rgba(14,165,233,0.08)",
}: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide"
      style={{ color, background: bg }}
    >
      {children}
    </span>
  );
}

function Check({ color = "#0ea5e9" }: { color?: string }) {
  const bgs: Record<string, string> = {
    "#0ea5e9": "rgba(14,165,233,0.1)",
    "#22c55e": "rgba(34,197,94,0.1)",
    "#fb923c": "rgba(251,146,60,0.1)",
  };
  return (
    <div
      className="flex items-center justify-center shrink-0 mt-0.5 rounded"
      style={{
        width: 20,
        height: 20,
        background: bgs[color] ?? "rgba(14,165,233,0.1)",
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MOCKUP HERO — Option « avant / après » (fichier mockups v2)
───────────────────────────────────────────────────────── */

function MockupBeforeAfter() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        background: "#111827",
        boxShadow: "0 48px 96px rgba(0,0,0,0.55), 0 0 0 1px rgba(14,165,233,0.06)",
        fontFamily: inter.style.fontFamily,
      }}
    >
      {/* Chrome */}
      <div
        className="flex items-center gap-2.5 px-4 py-2.5"
        style={{ background: "#080f1e", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="rounded-full" style={{ width: 10, height: 10, background: c }} />
          ))}
        </div>
        <div className="flex flex-1 justify-center px-1">
          <div
            className="flex max-w-full items-center gap-1.5 rounded-md px-3 py-1 text-[10px] sm:px-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#475569",
            }}
          >
            <span className="truncate">Votre situation aujourd&apos;hui → votre outil demain</span>
          </div>
        </div>
      </div>

      <div className="relative grid min-h-[320px] grid-cols-1 md:min-h-[360px] md:grid-cols-2">
        {/* Séparateur central (desktop) */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-base font-bold text-white md:flex"
          style={{
            background: "#0ea5e9",
            boxShadow: "0 0 0 4px rgba(14,165,233,0.2), 0 0 0 8px rgba(14,165,233,0.08)",
          }}
          aria-hidden
        >
          →
        </div>

        {/* AVANT — chaos */}
        <div className="order-1 border-b-2 border-sky-500 bg-white p-5 md:order-1 md:border-b-0 md:border-r-[3px] md:border-r-sky-500 md:p-6">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
            Aujourd&apos;hui — le chaos
          </div>

          <div className="mb-3">
            <div
              className="flex items-center gap-1.5 rounded-t px-2.5 py-1.5"
              style={{ background: "#217346" }}
            >
              <svg width={12} height={12} viewBox="0 0 24 24" fill="white">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
              </svg>
              <span className="text-[11px] font-semibold text-white">Suivi_commandes_AVRIL_FINAL_v3.xlsx</span>
            </div>
            <div className="overflow-hidden rounded-b border border-t-0 border-neutral-300" style={{ borderColor: "#d0d0d0" }}>
              <div className="grid border-b border-neutral-300 bg-[#e8f4e8]" style={{ gridTemplateColumns: "0.6fr 1.2fr 0.8fr 0.8fr" }}>
                {["N°", "Client", "Date", "Statut"].map((h) => (
                  <div
                    key={h}
                    className="border-r border-neutral-300 px-2 py-1 text-[10px] font-semibold text-[#217346]"
                  >
                    {h}
                  </div>
                ))}
              </div>
              {[
                ["#2841", "Laforge Ind.", "15/04", "???", "missing"],
                ["#2842", "CB Industrie", "12/04", "RETARD !", "overdue"],
                ["#2843", "Solvay Trans.", "18/04", "À relancer", "muted"],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="grid border-b border-neutral-300 last:border-b-0"
                  style={{ gridTemplateColumns: "0.6fr 1.2fr 0.8fr 0.8fr" }}
                >
                  <div className="border-r border-neutral-300 px-2 py-1 text-[10px] text-neutral-800">{row[0]}</div>
                  <div className="border-r border-neutral-300 px-2 py-1 text-[10px] text-neutral-800">{row[1]}</div>
                  <div
                    className="border-r border-neutral-300 px-2 py-1 text-[10px]"
                    style={{
                      background: row[4] === "overdue" ? "#fef2f2" : undefined,
                      color: row[4] === "overdue" ? "#991b1b" : "#333",
                    }}
                  >
                    {row[2]}
                  </div>
                  <div
                    className="px-2 py-1 text-[10px]"
                    style={{
                      background: row[4] === "missing" ? "#fff8e6" : row[4] === "overdue" ? "#fef2f2" : undefined,
                      color: row[4] === "missing" ? "#92400e" : row[4] === "overdue" ? "#991b1b" : "#999",
                      fontStyle: row[4] === "muted" ? "italic" : undefined,
                    }}
                  >
                    {row[3]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg" style={{ background: "#075e54" }}>
            <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#128c7e" }}>
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: "#25d366" }}
              >
                C
              </div>
              <div>
                <div className="text-xs font-semibold text-white">CB Industrie</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                  vu hier à 17h42
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 p-2.5" style={{ background: "#ece5dd" }}>
              <div className="max-w-[80%] self-start rounded-md bg-white px-2.5 py-1.5 text-[10px] leading-snug text-neutral-800">
                Bonjour, toujours pas reçu la commande #2842 ?
              </div>
              <div className="max-w-[80%] self-end rounded-md px-2.5 py-1.5 text-[10px] leading-snug text-neutral-800" style={{ background: "#dcf8c6" }}>
                Bonjour ! Je vérifie ça tout de suite…
              </div>
              <div className="max-w-[80%] self-start rounded-md bg-white px-2.5 py-1.5 text-[10px] leading-snug text-neutral-800">
                C&apos;est urgent, on est bloqués en prod.
              </div>
              <div className="pr-1 text-right text-[9px] text-slate-400">Lu ✓✓</div>
            </div>
          </div>

          <div
            className="mt-3 flex items-start gap-1.5 rounded-md border px-3 py-2 text-[11px]"
            style={{ background: "#fef2f2", borderColor: "#fecaca", color: "#991b1b" }}
          >
            <span aria-hidden>⏱</span>
            <span>
              Estimation : <strong>6 à 8h/semaine</strong> perdues en recherche d&apos;infos et relances manuelles
            </span>
          </div>
        </div>

        {/* Flèche mobile entre les deux blocs */}
        <div
          className="order-2 flex items-center justify-center py-2 md:hidden"
          style={{ background: "#111827", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          aria-hidden
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: "#0ea5e9" }}
          >
            →
          </span>
        </div>

        {/* APRÈS — outil */}
        <div className="order-3 bg-[#0f172a] p-5 md:order-2 md:p-6">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#0ea5e9" }}>
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-sky-500" />
            Votre outil — tout sous contrôle
          </div>

          <div
            className="mb-2.5 flex items-center justify-between rounded-lg border px-3.5 py-3"
            style={{ background: "#1e293b", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div>
              <div className="text-[13px] font-semibold text-slate-200">MétalPro — Gestion commandes</div>
              <div className="mt-0.5 text-[10px]" style={{ color: "#475569" }}>
                14 commandes actives · Mis à jour il y a 2 min
              </div>
            </div>
            <div
              className="flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-[10px]"
              style={{ color: "#22c55e", background: "rgba(34,197,94,0.1)" }}
            >
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
              En direct
            </div>
          </div>

          <div className="mb-2.5 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-white/10 bg-[#1e293b] px-2 py-3 text-center">
              <div className={`${playfair.className} text-[22px] font-extrabold leading-none text-emerald-500`}>87</div>
              <div className="mt-1 text-[9px] uppercase tracking-wide text-slate-500">Livrées</div>
            </div>
            <div
              className="rounded-lg border px-2 py-3 text-center"
              style={{ background: "#1e293b", borderColor: "rgba(239,68,68,0.2)" }}
            >
              <div className={`${playfair.className} text-[22px] font-extrabold leading-none text-red-500`}>3</div>
              <div className="mt-1 text-[9px] uppercase tracking-wide text-slate-500">En retard</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#1e293b] px-2 py-3 text-center">
              <div className={`${playfair.className} text-[22px] font-extrabold leading-none text-white`}>48k€</div>
              <div className="mt-1 text-[9px] uppercase tracking-wide text-slate-500">CA en attente</div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div
              className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5"
              style={{ background: "rgba(239,68,68,0.04)", borderColor: "rgba(239,68,68,0.2)" }}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md" style={{ background: "rgba(239,68,68,0.12)" }}>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="min-w-0 flex-1 text-[11px] leading-snug text-slate-400">
                <strong className="font-medium text-slate-200">#2846 CB Industrie</strong> — 3 jours de retard. Relance
                automatique envoyée.
              </div>
              <span className="shrink-0 whitespace-nowrap text-[10px] text-slate-600">il y a 2h</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#1e293b] px-3.5 py-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md" style={{ background: "rgba(34,197,94,0.12)" }}>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2}>
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <div className="min-w-0 flex-1 text-[11px] leading-snug text-slate-400">
                <strong className="font-medium text-slate-200">#2847 Laforge Industries</strong> — Livraison confirmée.
                Client notifié automatiquement.
              </div>
              <span className="shrink-0 whitespace-nowrap text-[10px] text-slate-600">il y a 4h</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#1e293b] px-3.5 py-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md" style={{ background: "rgba(14,165,233,0.12)" }}>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div className="min-w-0 flex-1 text-[11px] leading-snug text-slate-400">
                <strong className="font-medium text-slate-200">Nouvelle commande</strong> — Solvay Transport, 12
                palettes, livraison 28 avr.
              </div>
              <span className="shrink-0 whitespace-nowrap text-[10px] text-slate-600">ce matin</span>
            </div>
            <div
              className="mt-1 rounded-lg border px-3.5 py-2.5 text-center text-[11px]"
              style={{
                background: "rgba(14,165,233,0.06)",
                borderColor: "rgba(14,165,233,0.15)",
                color: "#0ea5e9",
              }}
            >
              ↓ <strong>0h/semaine</strong> en relances manuelles — tout est automatisé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MOCKUP: CHAT FULL WIDTH (steps)
───────────────────────────────────────────────────────── */

function MockupChatFullWidth() {
  const messages = [
    { side: "po", text: "Bonjour. Quel est le principal problème qui vous prend le plus de temps dans votre activité en ce moment ?" },
    { side: "user", text: "On gère tout sur Excel. On perd des commandes, on passe des heures à relancer les clients." },
    { side: "po", text: "Combien de commandes traitez-vous par semaine ? Je veux comprendre l'échelle avant de proposer quoi que ce soit." },
    { side: "user", text: "Entre 80 et 120 selon la saison." },
    { side: "po", text: "Parfait. Et est-ce que vous avez aujourd'hui un outil pour suivre où en est chaque commande en temps réel ?" },
  ];
  const notes = [
    { label: "Secteur", value: "Commerce B2B", ok: true },
    { label: "Volume", value: "80–120 cmd/sem.", ok: true },
    { label: "Outil actuel", value: "Excel + WhatsApp", ok: false },
    { label: "Suivi temps réel", value: "En attente…", ok: null },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid #e2e8f0",
        background: "#fff",
        boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
        fontFamily: inter.style.fontFamily,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3" style={{ background: "#0c1322" }}>
        <div className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="rounded-full" style={{ width: 9, height: 9, background: c }} />
          ))}
        </div>
        <span className="flex-1 text-center text-[11px]" style={{ color: "#475569" }}>Entretien de cadrage</span>
        <span
          className="flex items-center gap-1.5 text-[9px] px-2.5 py-1 rounded-full"
          style={{ color: "#22c55e", background: "rgba(34,197,94,0.1)" }}
        >
          <span className="rounded-full" style={{ width: 5, height: 5, background: "#22c55e", animation: "pulse 2s ease-in-out infinite" }} />
          En ligne
        </span>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Messages */}
        <div className="flex flex-col gap-3 p-5" style={{ borderRight: "1px solid #f1f5f9" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              className="flex gap-2 max-w-[90%]"
              style={{ alignSelf: m.side === "user" ? "flex-end" : "flex-start", flexDirection: m.side === "user" ? "row-reverse" : "row" }}
            >
              <div
                className="flex items-center justify-center rounded shrink-0 text-[9px] font-semibold"
                style={{
                  width: 24, height: 24,
                  background: m.side === "po" ? "linear-gradient(135deg,#0ea5e9,#0369a1)" : "#f1f5f9",
                  color: m.side === "po" ? "#fff" : "#94a3b8",
                }}
              >
                {m.side === "po" ? "EX" : "MD"}
              </div>
              <div
                className="text-[12px] leading-relaxed px-3 py-2"
                style={{
                  background: m.side === "po" ? "#f8fafc" : "#0ea5e9",
                  color: m.side === "po" ? "#475569" : "#fff",
                  borderRadius: m.side === "po" ? "0 8px 8px 8px" : "8px 0 8px 8px",
                  border: m.side === "po" ? "1px solid #e2e8f0" : "none",
                  borderLeft: m.side === "po" ? "2px solid #0ea5e9" : undefined,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div
            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg mt-1"
            style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
          >
            <span className="text-[12px] italic" style={{ color: "#cbd5e1" }}>Votre réponse…</span>
            <div className="flex items-center justify-center rounded-md" style={{ width: 28, height: 28, background: "#0ea5e9" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Notes panel */}
        <div className="p-5" style={{ background: "#fafaf9" }}>
          <div className="text-[10px] uppercase tracking-widest mb-3.5" style={{ color: "#a8a29e" }}>Notes en cours</div>
          <div className="flex flex-col gap-2.5">
            {notes.map((note, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-2.5 py-2 rounded-md"
                style={{ background: "#fff", border: "1px solid #e7e5e4" }}
              >
                <span className="text-[11px]" style={{ color: "#78716c" }}>{note.label}</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: note.ok === null ? "#a8a29e" : "#0c1322", fontStyle: note.ok === null ? "italic" : "normal" }}
                  >
                    {note.value}
                  </span>
                  {note.ok === true && (
                    <span className="flex items-center justify-center rounded-full" style={{ width: 14, height: 14, background: "rgba(34,197,94,0.1)" }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                  )}
                  {note.ok === false && (
                    <span className="flex items-center justify-center rounded-full" style={{ width: 14, height: 14, background: "rgba(239,68,68,0.1)" }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3.5 p-2.5 rounded-lg" style={{ background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.12)" }}>
            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "#0ea5e9" }}>Progression</div>
            <div className="rounded-full" style={{ height: 4, background: "rgba(14,165,233,0.1)" }}>
              <div className="rounded-full h-full" style={{ width: "60%", background: "#0ea5e9" }} />
            </div>
            <div className="text-[10px] mt-1" style={{ color: "#64748b" }}>Question 6 sur 10</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MOCKUP: ROADMAP
───────────────────────────────────────────────────────── */

function MockupRoadmap() {
  const phases = [
    { phase: "Phase 1", label: "Urgent — 0 à 6 semaines", color: "#ef4444", bg: "#fef2f2", items: ["Formulaire de demande en ligne", "Espace de gestion des demandes", "Notifications automatiques"] },
    { phase: "Phase 2", label: "Important — 6 à 12 semaines", color: "#fb923c", bg: "#fff7ed", items: ["Suivi de statut côté client", "Tableau de bord opérationnel"] },
    { phase: "Phase 3", label: "Valeur ajoutée — 3 à 6 mois", color: "#0ea5e9", bg: "#f0f9ff", items: ["Reporting et analytics", "Intégrations partenaires"] },
  ];
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e7e5e4", background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between px-5 py-3.5" style={{ background: "#0c1322" }}>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center rounded-md" style={{ width: 28, height: 28, background: "rgba(34,197,94,0.15)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
          </div>
          <span className="text-[12px] font-semibold" style={{ color: "#e2e8f0" }}>Roadmap — 3 phases</span>
        </div>
        <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ color: "#22c55e", background: "rgba(34,197,94,0.12)" }}>Priorisée par impact</span>
      </div>
      <div className="p-5">
        {phases.map((p, pi) => (
          <div key={pi} className="flex gap-3.5" style={{ marginBottom: pi < 2 ? 14 : 0 }}>
            <div className="flex flex-col items-center">
              <div
                className="flex items-center justify-center rounded-lg shrink-0"
                style={{ width: 32, height: 32, background: p.bg, border: `1.5px solid ${p.color}` }}
              >
                <span className="text-[9px] font-bold" style={{ color: p.color }}>P{pi + 1}</span>
              </div>
              {pi < 2 && <div className="flex-1 mt-1" style={{ width: 1, background: "#e7e5e4" }} />}
            </div>
            <div className="flex-1" style={{ paddingBottom: pi < 2 ? 14 : 0 }}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[12px] font-semibold" style={{ color: "#0c1322" }}>{p.phase}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ color: p.color, background: p.bg }}>{p.label}</span>
              </div>
              <div className="flex flex-col gap-1">
                {p.items.map((it, ii) => (
                  <div key={ii} className="flex items-center gap-1.5 text-[12px]" style={{ color: "#57534e" }}>
                    <span className="rounded-full shrink-0" style={{ width: 4, height: 4, background: p.color }} />{it}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MOCKUP: DÉFINITION V1
───────────────────────────────────────────────────────── */

function MockupV1() {
  const stats = [
    { val: "8", label: "Fonctionnalités", color: "#0ea5e9" },
    { val: "6 sem.", label: "Délai estimé", color: "#22c55e" },
    { val: "0€", label: "Fonctionnel inutile", color: "#fb923c" },
  ];
  const features = [
    { name: "Formulaire de demande client", prio: "Critique", pc: "#ef4444", pb: "#fef2f2" },
    { name: "Espace de gestion interne", prio: "Critique", pc: "#ef4444", pb: "#fef2f2" },
    { name: "Notifications & alertes auto", prio: "Haute", pc: "#fb923c", pb: "#fff7ed" },
    { name: "Suivi de statut client", prio: "Haute", pc: "#fb923c", pb: "#fff7ed" },
    { name: "Tableau de bord dirigeant", prio: "Normale", pc: "#0ea5e9", pb: "#f0f9ff" },
  ];
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e7e5e4", background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between px-5 py-3.5" style={{ background: "#0c1322" }}>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center rounded-md" style={{ width: 28, height: 28, background: "rgba(251,146,60,0.15)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </div>
          <span className="text-[12px] font-semibold" style={{ color: "#e2e8f0" }}>Définition V1 — 8 fonctionnalités</span>
        </div>
        <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ color: "#fb923c", background: "rgba(251,146,60,0.12)" }}>MVP stratégique</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", borderBottom: "1px solid #f5f4f2" }}>
        {stats.map((s) => (
          <div key={s.label} className="p-3.5 text-center" style={{ borderRight: "1px solid #f5f4f2" }}>
            <div className="text-[20px] font-extrabold leading-none" style={{ color: s.color, fontFamily: playfair.style.fontFamily }}>{s.val}</div>
            <div className="text-[10px] mt-1" style={{ color: "#a8a29e" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 p-3.5">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-3 py-2 rounded-md"
            style={{ background: "#fafaf9", border: "1px solid #f5f4f2" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex items-center justify-center rounded"
                style={{ width: 18, height: 18, background: f.pb, border: `1px solid ${f.pc}33` }}
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={f.pc} strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <span className="text-[12px]" style={{ color: "#1c1917" }}>{f.name}</span>
            </div>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ color: f.pc, background: f.pb }}>{f.prio}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className={`${inter.className} bg-[#fafaf9] text-[#1c1917]`}>

      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, #0ea5e9 40%, #38bdf8 60%, transparent)" }} />

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-[#e7e5e4] backdrop-blur-md" style={{ background: "rgba(250,250,249,0.92)" }}>
        <div className="max-w-[1140px] mx-auto px-8 h-[60px] flex items-center justify-between">
          <Link href="/" className="inline-flex items-center" aria-label="Fortyn — accueil">
            <BrandLogo size="md" priority />
          </Link>
          <div className="flex items-center gap-5">
            <ButtonLink href="/login" variant="textMuted" size="sm" className="hidden sm:inline-flex px-0">
              Se connecter
            </ButtonLink>
            <ButtonLink href="/chat" variant="dark" size="sm" className="px-5 rounded">
              Démarrer mon audit →
            </ButtonLink>
          </div>
        </div>
      </nav>

      {/* ── HERO — texte centré ── */}
      <section className="bg-[#0c1322] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]" style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.1) 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-[1140px] mx-auto px-8 pt-24 pb-16 relative z-10">
          <div className="max-w-[760px] mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest mb-8" style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)", color: "#0ea5e9" }}>
              <span className="rounded-full animate-pulse" style={{ width: 5, height: 5, background: "#0ea5e9" }} />
              Entretien de cadrage · Analyse expert · Gratuit
            </div>

            {/* H1 */}
            <h1
              className={`${playfair.className} font-black text-white mb-7 leading-[1.05] tracking-tight`}
              style={{ fontSize: "clamp(40px,5.5vw,68px)" }}
            >
              Votre activité tourne.<br />
              Mais vous perdez<br />
              <em style={{ color: "#0ea5e9", fontStyle: "italic" }}>de l&apos;argent sans le voir.</em>
            </h1>

            {/* Sous-titre */}
            <p className="text-[16px] leading-[1.8] max-w-[560px] mx-auto mb-12" style={{ color: "#94a3b8" }}>
              Excel, WhatsApp, post-its — vous gérez. Mais chaque semaine, des commandes glissent, des heures partent en fumée, des clients s&apos;impatientent.
              <br /><br />
              Ce que les grands groupes paient{" "}
              <strong style={{ color: "#e2e8f0", fontWeight: 500 }}>15 000€ à des cabinets</strong>{" "}
              pour identifier, vous l&apos;obtenez dans un entretien fluide, à votre rythme.{" "}
              <strong style={{ color: "#0ea5e9", fontWeight: 500 }}>Gratuitement. Sans rendez-vous.</strong>
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4">
              <ButtonLink
                href="/chat"
                variant="accent"
                size="lg"
                className="rounded-lg"
                style={{ boxShadow: "0 4px 24px rgba(14,165,233,0.35)" }}
              >
                Identifier ce qui me coûte de l&apos;argent →
              </ButtonLink>
              <div className="flex items-center gap-6 flex-wrap justify-center">
                {["Gratuit", "À votre rythme", "Sans engagement"].map((h) => (
                  <span key={h} className="flex items-center gap-1.5 text-[12px]" style={{ color: "#475569" }}>
                    <span style={{ color: "#0ea5e9" }}>✓</span> {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mockup extranet sous le texte */}
        <div className="max-w-[1140px] mx-auto px-8 pb-12 relative z-10">
          <div className="relative max-w-[960px] mx-auto">
            <div
              className="absolute -top-4 -right-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-lg text-[12px]"
              style={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                animation: "float2 5s ease-in-out infinite",
              }}
            >
              <span className="rounded-full animate-pulse" style={{ width: 6, height: 6, background: "#22c55e" }} />
              Votre outil livré clé en main
            </div>
            <MockupBeforeAfter />
            <div
              className="absolute -bottom-4 -left-6 z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg"
              style={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                animation: "float1 4s ease-in-out infinite",
              }}
            >
              <div className="flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, background: "rgba(14,165,233,0.12)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] mb-0.5" style={{ color: "#475569" }}>Audit livré</div>
                <div className={`${playfair.className} text-[13px] font-bold text-white`}>Sous 24h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="bg-[#f5f4f2] border-y border-[#e7e5e4]">
        <div className="max-w-[1140px] mx-auto px-8 py-5 flex items-center gap-8 flex-wrap">
          <span className="text-[11px] uppercase tracking-widest whitespace-nowrap" style={{ color: "#a8a29e" }}>Secteurs ciblés</span>
          <div className="w-px h-4.5 bg-[#e7e5e4]" />
          <div className="flex gap-6 flex-wrap">
            {["PME industrielles", "Logistique & transport", "Commerce & distribution", "Services B2B"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[13px]" style={{ color: "#78716c" }}>
                <span className="rounded-full" style={{ width: 4, height: 4, background: "#d4c5b0", display: "inline-block" }} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── POUR QUI ── */}
      <section className="bg-[#fafaf9] border-b border-[#e7e5e4]">
        <div className="max-w-[1140px] mx-auto px-8 py-24">
          <div className="flex items-center gap-2.5 mb-4 text-[11px] uppercase tracking-[0.18em]" style={{ color: "#0ea5e9" }}>
            <span style={{ width: 28, height: 1, background: "#0ea5e9", display: "inline-block" }} />
            Vous vous reconnaissez ?
          </div>
          <h2 className={`${playfair.className} font-extrabold leading-[1.08] tracking-tight text-[#0c1322] mb-14`} style={{ fontSize: "clamp(26px,3.5vw,40px)" }}>
            Vous gérez.<br />Mais quelque chose coince.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[
              { num: "01", title: "Les commandes qui passent entre les mailles", text: "Vous avez le sentiment de perdre du chiffre sans savoir exactement où. Trop de choses gérées à la main, pas assez de visibilité sur ce qui se passe vraiment." },
              { num: "02", title: "Les heures qui disparaissent dans les relances", text: "Vous (ou votre équipe) passez un temps fou à faire des choses qui devraient être automatiques. Vous le savez. Vous ne savez pas par où commencer." },
              { num: "03", title: "Le projet informatique qui fait peur", text: "Vous avez eu des devis. 40 000€, 6 mois, un jargon incompréhensible. Vous avez rangé ça dans un tiroir. Pourtant le problème est toujours là." },
              { num: "04", title: "La croissance qui plafonne par manque d'outils", text: "Votre activité pourrait faire 30% de plus, mais vos process actuels ne tiendraient pas la charge. Alors vous ne scalez pas." },
            ].map((item) => (
              <div key={item.num} className="flex gap-4 items-start p-6 bg-white rounded-xl border border-[#e7e5e4]">
                <span className={`${playfair.className} text-[28px] font-black leading-none shrink-0 select-none`} style={{ color: "#e7e5e4" }}>{item.num}</span>
                <div>
                  <h3 className={`${playfair.className} text-[17px] font-bold leading-tight text-[#0c1322] mb-2`}>{item.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#78716c" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIT ── */}
      <section className="bg-white border-b border-[#e7e5e4]">
        <div className="max-w-[1140px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <Tag color="#0ea5e9" bg="rgba(14,165,233,0.08)">01 · Audit métier</Tag>
              <h2 className={`${playfair.className} font-extrabold leading-tight tracking-tight text-[#0c1322] mt-5 mb-5`} style={{ fontSize: "clamp(26px,3.5vw,40px)" }}>
                Quelques questions bien posées suffisent pour chiffrer ce que vous perdez chaque mois.
              </h2>
              <p className="text-[15px] leading-[1.75] mb-7" style={{ color: "#57534e" }}>
                Pas une liste de fonctionnalités génériques. Une analyse précise de vos processus, de vos outils actuels et des points de friction qui coûtent du temps et de l&apos;argent chaque semaine, sans que vous le voyiez.
              </p>
              <div className="flex flex-col gap-3">
                {["Cartographie de vos processus actuels (là où ça fuit)", "Les 3 frictions qui vous coûtent le plus en temps et argent", "Score de maturité digitale sur 100", "Les gains rapides activables sans dev, dès cette semaine"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check color="#0ea5e9" />
                    <span className="text-[14px] leading-snug" style={{ color: "#44403c" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink href="/chat" variant="accent" size="md" className="rounded-md">
                  Lancer mon audit métier →
                </ButtonLink>
              </div>
            </div>
            {/* Audit mockup clair */}
            <div className="rounded-2xl overflow-hidden border border-[#e7e5e4]" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.08)", fontFamily: inter.style.fontFamily }}>
              <div className="flex items-center justify-between px-5 py-3.5" style={{ background: "#0c1322" }}>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center rounded-md" style={{ width: 28, height: 28, background: "rgba(14,165,233,0.2)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  </div>
                  <span className="text-[12px] font-semibold" style={{ color: "#e2e8f0" }}>Audit métier</span>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ color: "#0ea5e9", background: "rgba(14,165,233,0.12)" }}>Rendu sous 24h</span>
              </div>
              <div className="flex items-center gap-5 p-5 border-b border-[#e7e5e4]" style={{ background: "#f8f7f5" }}>
                <div className="text-center">
                  <div className={`${playfair.className} text-[44px] font-extrabold leading-none text-[#0c1322]`}>74</div>
                  <div className="text-[10px] mt-1 tracking-wide" style={{ color: "#78716c" }}>SCORE /100</div>
                </div>
                <div className="flex-1">
                  {[{ label: "Processus métier", val: 62, color: "#fb923c" }, { label: "Outils existants", val: 28, color: "#ef4444" }, { label: "Potentiel digital", val: 88, color: "#22c55e" }].map((r) => (
                    <div key={r.label} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-[11px]" style={{ color: "#57534e" }}>{r.label}</span>
                        <span className="text-[11px] font-semibold" style={{ color: r.color }}>{r.val}%</span>
                      </div>
                      <div className="rounded-full overflow-hidden" style={{ height: 5, background: "#e7e5e4" }}>
                        <div className="h-full rounded-full" style={{ width: `${r.val}%`, background: r.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: "#78716c" }}>Points critiques</div>
                {[
                  { icon: "⚠", text: "Gestion des commandes 100% manuelle — risque de perte élevé", color: "#fb923c" },
                  { icon: "✗", text: "Aucune visibilité temps réel — 4h/semaine perdues en relances", color: "#ef4444" },
                  { icon: "✓", text: "Processus documenté et reproductible — bonne base pour scaler", color: "#22c55e" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 py-2.5" style={{ borderBottom: i < 2 ? "1px solid #f5f4f2" : "none" }}>
                    <span className="text-[13px] shrink-0" style={{ color: f.color }}>{f.icon}</span>
                    <span className="text-[12px] leading-snug" style={{ color: "#44403c" }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section className="border-b border-[#e7e5e4]" style={{ background: "#f8f7f5" }}>
        <div className="max-w-[1140px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <MockupRoadmap />
            <div>
              <Tag color="#22c55e" bg="rgba(34,197,94,0.08)">02 · Roadmap priorisée</Tag>
              <h2 className={`${playfair.className} font-extrabold leading-tight tracking-tight text-[#0c1322] mt-5 mb-5`} style={{ fontSize: "clamp(26px,3.5vw,40px)" }}>
                Ce plan prenait 3 mois et 10 000€ en cabinet. Vous l&apos;avez en 24 heures.
              </h2>
              <p className="text-[15px] leading-[1.75] mb-7" style={{ color: "#57534e" }}>
                Une roadmap claire avec 3 phases séquencées. Ce qui est urgent, ce qui peut attendre. Chaque item est justifié par un impact métier concret, pas par des intuitions de développeur.
              </p>
              <div className="flex flex-col gap-3">
                {["3 phases avec délais et budget estimé par phase", "Chaque feature justifiée par son impact sur votre activité", "Ce qui peut attendre, et combien ça vous économise", "Un plan que vous pouvez montrer à un banquier ou un associé"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check color="#22c55e" />
                    <span className="text-[14px] leading-snug" style={{ color: "#44403c" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink href="/chat" variant="dark" size="md" className="rounded-md">
                  Obtenir ma roadmap en 24h →
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── V1 ── */}
      <section className="bg-white border-b border-[#e7e5e4]">
        <div className="max-w-[1140px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <Tag color="#fb923c" bg="rgba(251,146,60,0.08)">03 · Définition V1</Tag>
              <h2 className={`${playfair.className} font-extrabold leading-tight tracking-tight text-[#0c1322] mt-5 mb-3`} style={{ fontSize: "clamp(26px,3.5vw,40px)" }}>
                Avant, seuls les grands groupes pouvaient se permettre un cahier des charges sérieux.
              </h2>
              <p className={`${playfair.className} font-bold italic mb-5`} style={{ fontSize: "clamp(18px,2vw,22px)", color: "#0ea5e9" }}>
                Maintenant vous l&apos;avez aussi.
              </p>
              <p className="text-[15px] leading-[1.75] mb-7" style={{ color: "#57534e" }}>
                Le périmètre exact des fonctionnalités indispensables pour démarrer. Chaque feature est justifiée. Rien d&apos;inutile, rien d&apos;oublié. Vous savez exactement ce que vous allez recevoir, avant de signer quoi que ce soit.
              </p>
              <div className="flex flex-col gap-3">
                {["Les fonctionnalités indispensables, rien de plus", "Ce qui est exclu du périmètre et pourquoi (vous économisez sur chaque ligne)", "Critères d'acceptation par feature, vous savez ce que vous payez", "Livrable prêt à envoyer directement à un développeur"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check color="#fb923c" />
                    <span className="text-[14px] leading-snug" style={{ color: "#44403c" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink href="/chat" variant="accent" size="md" className="rounded-md">
                  Recevoir ma définition V1 →
                </ButtonLink>
              </div>
            </div>
            <MockupV1 />
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="bg-[#0c1322]">
        <div className="max-w-[1140px] mx-auto px-8 py-24">
          <div className="flex items-center gap-2.5 mb-4 text-[11px] uppercase tracking-[0.18em]" style={{ color: "#0ea5e9" }}>
            <span style={{ width: 28, height: 1, background: "#0ea5e9", display: "inline-block" }} />
            Comment ça marche
          </div>
          <h2 className={`${playfair.className} font-extrabold leading-tight tracking-tight text-white mb-14`} style={{ fontSize: "clamp(26px,3.5vw,40px)" }}>
            Trois étapes, pas de surprise
          </h2>

          {/* Step 01 full width */}
          <div className="mb-14">
            <div className="flex items-start gap-5 mb-7">
              <div
                className="flex items-center justify-center rounded-xl shrink-0"
                style={{ width: 54, height: 54, background: "#111827", border: "1.5px solid #0ea5e9", boxShadow: "0 0 0 6px rgba(14,165,233,0.06)" }}
              >
                <span className={`${playfair.className} text-[20px] font-extrabold`} style={{ color: "#0ea5e9" }}>01</span>
              </div>
              <div>
                <h3 className={`${playfair.className} text-[22px] font-bold text-white mb-2 leading-tight`}>
                  Vous décrivez votre activité, à votre rythme.
                </h3>
                <p className="text-[14px] leading-[1.75] max-w-[600px]" style={{ color: "#64748b" }}>
                  Un entretien structuré vous pose les bonnes questions, une par une. Pas de formulaire à remplir. Pas de rendez-vous à caler. Vous répondez quand vous voulez.
                </p>
                <div className="mt-3">
                  <Tag>Conversation fluide</Tag>
                </div>
              </div>
            </div>
            <MockupChatFullWidth />
          </div>

          {/* Steps 02 + 03 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { num: "02", title: "On analyse et on structure.", text: "Vos réponses sont travaillées et transformées en un document fonctionnel clair : audit, roadmap, définition V1. Sans jargon. Sans raccourci.", tag: "Analyse expert" },
              { num: "03", title: "Votre plan est prêt. Dès aujourd'hui.", text: "Un document complet dans votre espace. Consultable, partageable avec votre équipe ou votre banquier, actionnable immédiatement.", tag: "Sous 24h" },
            ].map((s) => (
              <div key={s.num}>
                <div
                  className="flex items-center justify-center rounded-xl mb-5"
                  style={{ width: 54, height: 54, background: "#111827", border: "1.5px solid #0ea5e9", boxShadow: "0 0 0 6px rgba(14,165,233,0.06)" }}
                >
                  <span className={`${playfair.className} text-[20px] font-extrabold`} style={{ color: "#0ea5e9" }}>{s.num}</span>
                </div>
                <h3 className={`${playfair.className} text-[20px] font-bold text-white mb-3 leading-tight`}>{s.title}</h3>
                <p className="text-[14px] leading-[1.75] mb-4" style={{ color: "#64748b" }}>{s.text}</p>
                <Tag>{s.tag}</Tag>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-[#fafaf9] border-t border-[#e7e5e4]">
        <div className="max-w-[1140px] mx-auto px-8 py-24">
          <div className="bg-[#0c1322] rounded-2xl px-14 py-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: 500, height: 300, background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)" }} />
            <p className="relative mb-5 text-[12px] font-medium uppercase tracking-[0.15em] text-slate-300">
              Ce que les grands groupes paient des mois à des cabinets pour obtenir
            </p>
            <h2 className={`${playfair.className} font-black tracking-tight text-white mb-3 leading-tight relative`} style={{ fontSize: "clamp(28px,4vw,46px)" }}>
              Vous l&apos;avez ici,<br />gratuitement, sans rendez-vous.
            </h2>
            <p className="relative mb-3 text-[15px] italic leading-relaxed text-slate-200">
              Le seul risque, c&apos;est de continuer à reporter.
            </p>
            <p className="relative mb-10 text-[12px] font-medium tracking-widest text-slate-300">
              Gratuit · À votre rythme · Sans engagement
            </p>
            <ButtonLink
              href="/chat"
              variant="accent"
              size="lg"
              className="relative rounded-lg px-10"
              style={{ boxShadow: "0 12px 40px rgba(14,165,233,0.4)" }}
            >
              Je veux mon audit gratuit →
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#e7e5e4] bg-[#fafaf9]">
        <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-4 px-8 py-8">
          <Link href="/" className="inline-flex" aria-label="Fortyn — accueil">
            <BrandLogo size="sm" />
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-600">
            <Link href="/privacy" className="underline underline-offset-2 hover:text-sky-600">
              Politique de confidentialite
            </Link>
            <Link href="/terms" className="underline underline-offset-2 hover:text-sky-600">
              Conditions d'utilisation
            </Link>
            <Link href="/data-deletion" className="underline underline-offset-2 hover:text-sky-600">
              Suppression des donnees
            </Link>
            <Link href="/legal-notice" className="underline underline-offset-2 hover:text-sky-600">
              Mentions legales
            </Link>
            <Link href="/contact" className="underline underline-offset-2 hover:text-sky-600">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
      `}</style>
    </div>
  );
}   