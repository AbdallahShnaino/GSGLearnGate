import { getLateSubmissionsCountByMonitor } from "@/src/db/queries/select";

export async function getLateSubmissionsCount(monitorId: number) {
  return await getLateSubmissionsCountByMonitor(monitorId);
}
