import type { Livrable } from "@/lib/generated/prisma/client";

export type DashboardNavModel = {
  auditHref: string | null;
  roadmapHref: string | null;
  v1Href: string | null;
};

export function getDashboardNavModel(livrable: Livrable | null): DashboardNavModel {
  return {
    auditHref: livrable?.audit?.trim() ? "/dashboard/audit" : null,
    roadmapHref: livrable?.roadmap?.trim() ? "/dashboard/roadmap" : null,
    v1Href: livrable?.v1?.trim() ? "/dashboard/v1" : null,
  };
}
