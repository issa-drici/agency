export type ClientDetailResponse = {
  clientId: string;
  messages: Array<{
    id: string;
    role: string;
    content: string;
    createdAtLabel: string;
  }>;
  notes: Array<{
    id: string;
    contenu: string;
    createdAtLabel: string;
  }>;
  userStories: Array<{
    id: string;
    titre: string;
    statut: string;
    priorite: number;
  }>;
  livrable: {
    audit: unknown;
    roadmap: unknown;
    v1: unknown;
  } | null;
  refreshedAt: string;
};

export async function fetchAdminClientDetail(
  clientId: string,
): Promise<ClientDetailResponse> {
  const response = await fetch(`/api/admin/clients/${encodeURIComponent(clientId)}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Impossible de charger le detail client.");
  }
  return response.json() as Promise<ClientDetailResponse>;
}
