export type OverviewResponse = {
  metrics: Array<{ label: string; value: number; tone: string }>;
  recentMessages: Array<{
    id: string;
    clientId: string;
    content: string;
    createdAtLabel: string;
  }>;
  refreshedAt: string;
};

export async function fetchAdminOverview(): Promise<OverviewResponse> {
  const response = await fetch("/api/admin/overview", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Impossible de charger les donnees admin.");
  }
  return response.json() as Promise<OverviewResponse>;
}
