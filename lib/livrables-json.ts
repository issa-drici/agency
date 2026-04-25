/** Structure JSON attendue pour `livrables.audit` (stringifiée). */
export type AuditDimension = { label: string; value: number; color: string };
export type AuditPointCritique = { icon: string; text: string; color: string };
export type AuditData = {
  score: number;
  dimensions: AuditDimension[];
  pointsCritiques: AuditPointCritique[];
};

export type RoadmapPhase = {
  phase: string;
  label: string;
  color: string;
  bg: string;
  items: string[];
};
export type RoadmapData = { phases: RoadmapPhase[] };

export type V1Feature = {
  name: string;
  priorite: string;
  pc: string;
  pb: string;
};
export type V1Data = {
  stats: { nbFeatures: number; delai: string };
  features: V1Feature[];
};

export function parseAuditJson(raw: string | null | undefined): AuditData | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuditData;
  } catch {
    return null;
  }
}

export function parseRoadmapJson(raw: string | null | undefined): RoadmapData | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RoadmapData;
  } catch {
    return null;
  }
}

export function parseV1Json(raw: string | null | undefined): V1Data | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as V1Data;
  } catch {
    return null;
  }
}
