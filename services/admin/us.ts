export type UsListResponse = {
  rows: Array<{
    id: string;
    titre: string;
    clientId: string;
    statut: string;
    priorite: number;
    description: string | null;
    updatedAtLabel: string;
  }>;
  refreshedAt: string;
};

export type UsDetailResponse = {
  id: string;
  clientId: string;
  titre: string;
  statut: string;
  priorite: number;
  type: string;
  usParentId: string | null;
  description: string | null;
  contexte: string | null;
  criteresAcceptance: string | null;
  horsScope: string | null;
  dependances: string | null;
  specsTechniques: string | null;
  createdAtLabel: string;
  updatedAtLabel: string;
  refreshedAt: string;
};

export async function fetchAdminUsList(
  q: string,
  statut: string,
): Promise<UsListResponse> {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (statut) params.set("statut", statut);

  const response = await fetch(`/api/admin/us?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Impossible de charger les user stories.");
  }
  return response.json() as Promise<UsListResponse>;
}

export async function fetchAdminUsDetail(id: string): Promise<UsDetailResponse> {
  const response = await fetch(`/api/admin/us/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Impossible de charger le detail de l'US.");
  }
  return response.json() as Promise<UsDetailResponse>;
}
