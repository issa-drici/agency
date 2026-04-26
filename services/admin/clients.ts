export type ClientsResponse = {
  rows: Array<{
    clientId: string;
    messages: number;
    notes: number;
    us: number;
    hasLivrable: boolean;
  }>;
  refreshedAt: string;
};

export async function fetchAdminClients(): Promise<ClientsResponse> {
  const response = await fetch("/api/admin/clients", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Impossible de charger la liste des clients.");
  }
  return response.json() as Promise<ClientsResponse>;
}
