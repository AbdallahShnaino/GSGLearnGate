import { getLateSubmissionsCountByCoMonitor, getLateSubmissionsCountByMonitor } from "@/src/db/queries/select";

export async function getLateSubmissionsCount(monitorId: number) {
  return await getLateSubmissionsCountByMonitor(monitorId);
}

export async function getLateSubmissionsCoMonitorsCount(coMonitorId: number) {
  return await getLateSubmissionsCountByCoMonitor(coMonitorId);
}