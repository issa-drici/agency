import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "800", "900"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "[NOM] — Audit digital gratuit pour dirigeants de PME",
  description: "Décrivez votre projet en 20 minutes. Audit métier gratuit, roadmap priorisée et définition V1 — sans inscription, sans engagement.",
  openGraph: {
    title: "[NOM] — Audit digital gratuit pour dirigeants de PME",
    description: "20 minutes pour savoir exactement quoi construire, dans quel ordre, et pourquoi. Gratuit.",
    type: "website",
  },
};

const S = {
  // Layout
  wrap: { background: "#fafaf9", color: "#1c1917" } as React.CSSProperties,
  maxW: { maxWidth: 1140, margin: "0 auto", padding: "0 32px" } as React.CSSProperties,

  // Colors
  accent: "#0ea5e9",
  accentDim: "rgba(14,165,233,0.1)",
  dark: "#0c1322",
  card: "#f5f4f2",
  cardDark: "#111827",

  // Text
  label: { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#0ea5e9", display: "flex", alignItems: "center", gap: 10, marginBottom: 16 } as React.CSSProperties,
  labelLine: { width: 28, height: 1, background: "#0ea5e9", display: "inline-block" } as React.CSSProperties,
  h2Light: { fontSize: "clamp(30px,3.5vw,46px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#0c1322" } as React.CSSProperties,
  h2Dark: { fontSize: "clamp(30px,3.5vw,46px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fff" } as React.CSSProperties,
  bodyLight: { fontSize: 15, lineHeight: 1.7, color: "#57534e" } as React.CSSProperties,
  bodyDark: { fontSize: 15, lineHeight: 1.7, color: "#94a3b8" } as React.CSSProperties,

  // CTA
  ctaPrimary: { display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 30px", background: "#0ea5e9", color: "#fff", fontSize: 14, fontWeight: 500, textDecoration: "none", borderRadius: 6, boxShadow: "0 4px 20px rgba(14,165,233,0.3)" } as React.CSSProperties,
  ctaSecondary: { display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 30px", background: "transparent", color: "#0ea5e9", fontSize: 14, fontWeight: 500, textDecoration: "none", borderRadius: 6, border: "1.5px solid #0ea5e9" } as React.CSSProperties,
};

// ─── MINI COMPONENTS ──────────────────────────────────────

function Tag({ children, color = "#0ea5e9", bg = "rgba(14,165,233,0.08)" }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", background: bg, borderRadius: 100, fontSize: 11, color, letterSpacing: "0.04em", fontWeight: 500 }}>
      {children}
    </span>
  );
}

function Dot({ color = "#0ea5e9" }: { color?: string }) {
  return <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />;
}

// ─── MOCKUP: CHAT ─────────────────────────────────────────
function MockupChat() {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#111827", boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(14,165,233,0.05)" }}>
      {/* Chrome */}
      <div style={{ padding: "11px 16px", background: "#0f172a", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
        </div>
        <span className={inter.className} style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#475569" }}>Analyse de projet</span>
        <span className={inter.className} style={{ fontSize: 9, color: "#0ea5e9", background: "rgba(14,165,233,0.1)", padding: "3px 10px", borderRadius: 100, display: "flex", alignItems: "center", gap: 5 }}>
          <Dot /> IA active
        </span>
      </div>
      {/* Messages */}
      <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          { side: "po", text: "Quel est le principal problème qui freine votre activité aujourd'hui ?" },
          { side: "user", text: "On gère tout sur Excel. On perd des commandes chaque semaine." },
          { side: "po", text: "Combien de commandes par semaine ? Je veux comprendre l'échelle avant de proposer quoi que ce soit." },
          { side: "user", text: "Entre 80 et 120 selon la saison." },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 10, maxWidth: "86%", alignSelf: m.side === "user" ? "flex-end" : "flex-start", flexDirection: m.side === "user" ? "row-reverse" : "row" }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600, background: m.side === "po" ? "linear-gradient(135deg,#0ea5e9,#0369a1)" : "#1e293b", border: m.side === "user" ? "1px solid rgba(255,255,255,0.1)" : "none", color: m.side === "po" ? "#fff" : "#64748b", fontFamily: inter.style.fontFamily }}>
              {m.side === "po" ? "PO" : "MD"}
            </div>
            <div className={inter.className} style={{ padding: "9px 12px", fontSize: 12, lineHeight: 1.6, background: m.side === "po" ? "#1e293b" : "#0ea5e9", color: m.side === "po" ? "#94a3b8" : "#fff", borderRadius: m.side === "po" ? "0 8px 8px 8px" : "8px 0 8px 8px", borderLeft: m.side === "po" ? "2px solid #0ea5e9" : undefined }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      {/* Input */}
      <div style={{ margin: "0 16px 16px", background: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className={inter.className} style={{ fontSize: 11, color: "#334155", fontStyle: "italic" }}>Votre réponse…</span>
        <div style={{ width: 26, height: 26, background: "#0ea5e9", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
      </div>
    </div>
  );
}

// ─── MOCKUP: AUDIT ────────────────────────────────────────
function MockupAudit() {
  return (
    <div className={inter.className} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #e7e5e4", background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", background: "#0c1322", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(14,165,233,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <span style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 600 }}>Audit métier — Crewlines</span>
        </div>
        <span style={{ fontSize: 10, color: "#0ea5e9", background: "rgba(14,165,233,0.12)", padding: "3px 10px", borderRadius: 100 }}>Généré le 21 avr. 2025</span>
      </div>
      {/* Score global */}
      <div style={{ padding: "20px", background: "#f8f7f5", borderBottom: "1px solid #e7e5e4", display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#0c1322", lineHeight: 1, fontFamily: playfair.style.fontFamily }}>74</div>
          <div style={{ fontSize: 10, color: "#78716c", marginTop: 4, letterSpacing: "0.05em" }}>SCORE /100</div>
        </div>
        <div style={{ flex: 1 }}>
          {[
            { label: "Processus métier", val: 62, color: "#fb923c" },
            { label: "Outils existants", val: 28, color: "#ef4444" },
            { label: "Potentiel digital", val: 88, color: "#22c55e" },
          ].map(r => (
            <div key={r.label} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: "#57534e" }}>{r.label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: r.color }}>{r.val}%</span>
              </div>
              <div style={{ height: 5, background: "#e7e5e4", borderRadius: 100, overflow: "hidden" }}>
                <div style={{ width: `${r.val}%`, height: "100%", background: r.color, borderRadius: 100 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Findings */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#78716c", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Points critiques identifiés</div>
        {[
          { icon: "⚠", text: "Gestion des commandes 100% manuelle — risque de perte élevé", severity: "#fb923c" },
          { icon: "✗", text: "Aucune visibilité temps réel sur le statut des équipages", severity: "#ef4444" },
          { icon: "✓", text: "Processus documenté et reproductible — bonne base technique", severity: "#22c55e" },
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: i < 2 ? "1px solid #f5f4f2" : "none" }}>
            <span style={{ fontSize: 13, color: f.severity, flexShrink: 0, marginTop: 1 }}>{f.icon}</span>
            <span style={{ fontSize: 12, color: "#44403c", lineHeight: 1.5 }}>{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MOCKUP: ROADMAP ──────────────────────────────────────
function MockupRoadmap() {
  return (
    <div className={inter.className} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #e7e5e4", background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
      <div style={{ padding: "14px 20px", background: "#0c1322", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <span style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 600 }}>Roadmap — 3 phases</span>
        </div>
        <span style={{ fontSize: 10, color: "#22c55e", background: "rgba(34,197,94,0.12)", padding: "3px 10px", borderRadius: 100 }}>Priorisée</span>
      </div>
      {/* Timeline */}
      <div style={{ padding: "20px" }}>
        {[
          {
            phase: "Phase 1", label: "Urgent — 0 à 6 semaines", color: "#ef4444", bg: "#fef2f2", items: [
              "Formulaire de demande en ligne",
              "Espace de gestion des demandes",
              "Notifications automatiques",
            ]
          },
          {
            phase: "Phase 2", label: "Important — 6 à 12 semaines", color: "#fb923c", bg: "#fff7ed", items: [
              "Suivi de statut côté client",
              "Tableau de bord opérationnel",
            ]
          },
          {
            phase: "Phase 3", label: "Valeur ajoutée — 3 à 6 mois", color: "#0ea5e9", bg: "#f0f9ff", items: [
              "Reporting et analytics",
              "API partenaires",
            ]
          },
        ].map((p, pi) => (
          <div key={pi} style={{ display: "flex", gap: 14, marginBottom: pi < 2 ? 14 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: p.bg, border: `1.5px solid ${p.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: p.color }}>P{pi + 1}</span>
              </div>
              {pi < 2 && <div style={{ width: 1, flex: 1, background: "#e7e5e4", marginTop: 4 }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: pi < 2 ? 14 : 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#0c1322" }}>{p.phase}</span>
                <span style={{ fontSize: 10, color: p.color, background: p.bg, padding: "2px 8px", borderRadius: 100 }}>{p.label}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {p.items.map((it, ii) => (
                  <div key={ii} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#57534e" }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: p.color, flexShrink: 0 }} />{it}
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

// ─── MOCKUP: V1 ───────────────────────────────────────────
function MockupV1() {
  return (
    <div className={inter.className} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #e7e5e4", background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
      <div style={{ padding: "14px 20px", background: "#0c1322", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(251,146,60,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <span style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 600 }}>Définition V1 — 8 fonctionnalités</span>
        </div>
        <span style={{ fontSize: 10, color: "#fb923c", background: "rgba(251,146,60,0.12)", padding: "3px 10px", borderRadius: 100 }}>MVP stratégique</span>
      </div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderBottom: "1px solid #f5f4f2" }}>
        {[
          { val: "8", label: "Fonctionnalités", color: "#0ea5e9" },
          { val: "6 sem.", label: "Délai estimé", color: "#22c55e" },
          { val: "100%", label: "ROI mesurable", color: "#fb923c" },
        ].map(s => (
          <div key={s.label} style={{ padding: "14px 16px", textAlign: "center", borderRight: "1px solid #f5f4f2" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: playfair.style.fontFamily, lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 10, color: "#a8a29e", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* Features */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { name: "Formulaire de demande client", prio: "Critique", pc: "#ef4444", pb: "#fef2f2" },
          { name: "Espace de gestion interne", prio: "Critique", pc: "#ef4444", pb: "#fef2f2" },
          { name: "Notifications & alertes", prio: "Haute", pc: "#fb923c", pb: "#fff7ed" },
          { name: "Suivi de statut", prio: "Haute", pc: "#fb923c", pb: "#fff7ed" },
          { name: "Tableau de bord", prio: "Normale", pc: "#0ea5e9", pb: "#f0f9ff" },
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#fafaf9", borderRadius: 6, border: "1px solid #f5f4f2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: f.pb, border: `1px solid ${f.pc}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={f.pc} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span style={{ fontSize: 12, color: "#1c1917" }}>{f.name}</span>
            </div>
            <span style={{ fontSize: 10, color: f.pc, background: f.pb, padding: "2px 8px", borderRadius: 100, fontWeight: 500 }}>{f.prio}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────
export default function Home() {
  return (
    <div className={inter.className} style={S.wrap}>
      <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #0ea5e9 40%, #38bdf8 60%, transparent)" }} />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: "rgba(250,250,249,0.92)", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ ...S.maxW, height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className={playfair.className} style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 18, color: "#0c1322" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            [NOM]
          </span>
          <Link href="/chat" style={{ padding: "9px 20px", background: "#0c1322", color: "#fff", fontSize: 12, textDecoration: "none", borderRadius: 4, letterSpacing: "0.02em" }}>
            Analyser mon projet →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "#0c1322", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, left: -100, width: 600, height: 600, background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, right: -80, width: 400, height: 400, background: "radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ ...S.maxW, padding: "88px 32px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 100, fontSize: 11, color: "#0ea5e9", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32 }}>
              <Dot /> Audit IA gratuit · Cadrage projet
            </div>
            <h1 className={playfair.className} style={{ fontSize: "clamp(38px,5vw,60px)", lineHeight: 1.05, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 28 }}>
              Votre projet digital mérite d&apos;être <em style={{ color: "#0ea5e9", fontStyle: "italic" }}>vraiment</em> compris.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#94a3b8", maxWidth: 460, marginBottom: 44 }}>
              En 20 minutes, notre agent IA analyse votre métier et vous remet un plan d&apos;action concret — <strong style={{ color: "#e2e8f0", fontWeight: 500 }}>avant d&apos;écrire la moindre ligne de code.</strong>
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginBottom: 24 }}>
              <Link href="/chat" style={S.ctaPrimary}>Démarrer mon audit gratuit →</Link>
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {["Sans inscription", "Sans engagement", "Résultat dans la journée"].map(h => (
                <span key={h} style={{ fontSize: 12, color: "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#0ea5e9", fontSize: 14 }}>✓</span>{h}
                </span>
              ))}
            </div>
          </div>
          {/* CHAT MOCKUP */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -20, right: -16, zIndex: 2, background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#94a3b8", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", animation: "float2 5s ease-in-out infinite" }}>
              <Dot color="#22c55e" /> Agent PO actif
            </div>
            <MockupChat />
            <div style={{ position: "absolute", bottom: -20, left: -24, zIndex: 2, background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.4)", animation: "float1 4s ease-in-out infinite" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(14,165,233,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>Audit généré</div>
                <div className={playfair.className} style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>En 20 min</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ background: "#f5f4f2", borderTop: "1px solid #e7e5e4", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ ...S.maxW, padding: "20px 32px", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#a8a29e", letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Secteurs ciblés</span>
          <div style={{ width: 1, height: 18, background: "#e7e5e4" }} />
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["PME industrielles", "Logistique & transport", "Commerce & distribution", "Services B2B"].map(item => (
              <span key={item} style={{ fontSize: 13, color: "#78716c", display: "flex", alignItems: "center", gap: 7 }}>
                <Dot color="#d4c5b0" />{item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* POUR QUI */}
      <section style={{ background: "#fafaf9", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ ...S.maxW, padding: "88px 32px" }}>
          <div style={S.label}><span style={S.labelLine} />Pour qui</div>
          <h2 className={playfair.className} style={{ ...S.h2Light, marginBottom: 52 }}>
            Vous vous reconnaissez<br />dans l&apos;une de ces situations ?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { num: "01", title: "Le dev qui n'a pas compris", text: "Vous avez déjà payé un développeur qui a livré autre chose que ce que vous vouliez. Le résultat ne correspondait pas à votre métier." },
              { num: "02", title: "Le projet qui traîne", text: "Vous avez un projet en tête depuis 6 mois mais vous ne savez pas comment l'expliquer ni estimer ce que ça va coûter." },
              { num: "03", title: "Le budget gaspillé", text: "Vous avez peur de vous engager sur un devis au doigt mouillé et de payer pour des fonctionnalités inutiles." },
              { num: "04", title: "La dépendance à Excel", text: "Vous gérez votre activité sur des fichiers et des WhatsApp. Vous savez que c'est un frein mais vous ne savez pas quoi faire." },
            ].map((item) => (
              <div key={item.num} style={{ padding: "24px 28px", background: "#fff", border: "1px solid #e7e5e4", borderRadius: 10, display: "flex", gap: 18, alignItems: "flex-start" }}>
                <span className={playfair.className} style={{ fontSize: 28, fontWeight: 900, color: "#e7e5e4", lineHeight: 1, flexShrink: 0, userSelect: "none" }}>{item.num}</span>
                <div>
                  <h3 className={playfair.className} style={{ fontSize: 17, fontWeight: 700, color: "#0c1322", marginBottom: 8, lineHeight: 1.2 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "#78716c" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIT SECTION */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ ...S.maxW, padding: "88px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            <div>
              <Tag color="#0ea5e9" bg="rgba(14,165,233,0.08)">01 — Audit métier</Tag>
              <h2 className={playfair.className} style={{ ...S.h2Light, marginTop: 20, marginBottom: 20 }}>
                Ce qui bloque vraiment votre activité
              </h2>
              <p style={{ ...S.bodyLight, marginBottom: 28 }}>
                Pas une liste de fonctionnalités génériques. Une analyse précise de vos processus, de vos outils actuels, et des points de friction qui coûtent du temps et de l&apos;argent chaque jour.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Cartographie de vos processus métier actuels",
                  "Identification des goulots d'étranglement",
                  "Score de maturité digitale sur 100",
                  "Opportunités d'optimisation classées par impact",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: "rgba(14,165,233,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: 14, color: "#44403c", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <MockupAudit />
          </div>
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section style={{ background: "#f8f7f5", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ ...S.maxW, padding: "88px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            <MockupRoadmap />
            <div>
              <Tag color="#22c55e" bg="rgba(34,197,94,0.08)">02 — Roadmap priorisée</Tag>
              <h2 className={playfair.className} style={{ ...S.h2Light, marginTop: 20, marginBottom: 20 }}>
                Quoi construire, dans quel ordre, et pourquoi
              </h2>
              <p style={{ ...S.bodyLight, marginBottom: 28 }}>
                Une roadmap claire avec 3 phases priorisées. Ce qui est urgent, ce qui peut attendre. Chaque item est justifié par un impact métier concret — pas par des intuitions de dev.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "3 phases de développement avec délais réalistes",
                  "Chaque fonctionnalité justifiée par son ROI",
                  "Dépendances techniques identifiées",
                  "Budget estimé par phase",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: 14, color: "#44403c", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* V1 SECTION */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ ...S.maxW, padding: "88px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            <div>
              <Tag color="#fb923c" bg="rgba(251,146,60,0.08)">03 — Définition V1</Tag>
              <h2 className={playfair.className} style={{ ...S.h2Light, marginTop: 20, marginBottom: 20 }}>
                La V1 qui génère de la valeur sans gaspiller votre budget
              </h2>
              <p style={{ ...S.bodyLight, marginBottom: 28 }}>
                Le périmètre exact des fonctionnalités indispensables pour démarrer. Chaque feature est justifiée. Rien d&apos;inutile, rien d&apos;oublié. Vous savez exactement ce que vous allez recevoir.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Liste des fonctionnalités avec niveau de priorité",
                  "Critères d'acceptation par feature",
                  "Estimation de complexité technique",
                  "Ce qui est exclu du périmètre (et pourquoi)",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: "rgba(251,146,60,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: 14, color: "#44403c", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <MockupV1 />
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section style={{ background: "#0c1322" }}>
        <div style={{ ...S.maxW, padding: "88px 32px" }}>
          <div style={S.label}><span style={{ ...S.labelLine, background: "#0ea5e9" }} />Process</div>
          <h2 className={playfair.className} style={{ ...S.h2Dark, marginBottom: 60 }}>
            Trois étapes, pas de surprise
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: 27, left: "calc(16.66% + 16px)", right: "calc(16.66% + 16px)", height: 1, background: "linear-gradient(90deg, #0ea5e9 0%, rgba(14,165,233,0.2) 50%, #0ea5e9 100%)", zIndex: 0 }} />
            {[
              { num: "01", title: "Vous décrivez votre activité", text: "L'agent IA pose des questions précises sur votre métier. 20 minutes. Pas un formulaire — une conversation.", tag: "~20 minutes" },
              { num: "02", title: "L'IA structure et analyse", text: "Votre besoin est transformé en un document fonctionnel clair, priorisé, sans jargon. Automatiquement.", tag: "Automatique" },
              { num: "03", title: "Votre audit vous attend", text: "Un document complet dans votre espace. Consultable, partageable avec votre équipe, actionnable le jour même.", tag: "Dans la journée" },
            ].map((s, i) => (
              <div key={s.num} style={{ padding: i === 0 ? "0 40px 0 0" : i === 2 ? "0 0 0 40px" : "0 40px", position: "relative", zIndex: 1 }}>
                <div style={{ width: 54, height: 54, borderRadius: 12, background: "#111827", border: "1.5px solid #0ea5e9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, boxShadow: "0 0 0 6px rgba(14,165,233,0.06)" }}>
                  <span className={playfair.className} style={{ fontSize: 20, fontWeight: 800, color: "#0ea5e9" }}>{s.num}</span>
                </div>
                <h3 className={playfair.className} style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.25 }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "#64748b", marginBottom: 16 }}>{s.text}</p>
                <Tag>{s.tag}</Tag>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: "#fafaf9", borderTop: "1px solid #e7e5e4" }}>
        <div style={{ ...S.maxW, padding: "88px 32px" }}>
          <div style={{ background: "#0c1322", borderRadius: 16, padding: "72px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 500, height: 300, background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <h2 className={playfair.className} style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 16, lineHeight: 1.1, position: "relative" }}>
              Votre projet mérite mieux<br />qu&apos;un devis au doigt mouillé.
            </h2>
            <p style={{ fontSize: 14, color: "#475569", letterSpacing: "0.08em", marginBottom: 40, position: "relative" }}>
              20 minutes · Gratuit · Sans engagement
            </p>
            <Link href="/chat" style={{ ...S.ctaPrimary, padding: "17px 40px", fontSize: 15, boxShadow: "0 12px 40px rgba(14,165,233,0.4)", position: "relative" }}>
              Je démarre mon audit →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0c1322", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ ...S.maxW, padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className={playfair.className} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 800, color: "#334155" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1e3a52", display: "inline-block" }} />[NOM]
          </span>
          <p style={{ fontSize: 11, color: "#334155" }}>
            Développé par Issa Drici — Freelance React / Next.js ·{" "}
            <a href="#" style={{ color: "#475569", textDecoration: "underline", textUnderlineOffset: 3 }}>LinkedIn</a>
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}
        @keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
      `}</style>
    </div>
  );
}