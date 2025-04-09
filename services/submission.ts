import {
  getLateSubmissionsCountByCoMonitor,
  getLateSubmissionsCountByMonitor,
  getTaskSubmissionStats,
} from "@/src/db/queries/select";

export async function getLateSubmissionsCount(monitorId: number) {
  return await getLateSubmissionsCountByMonitor(monitorId);
}

export async function getLateSubmissionsCoMonitorsCount(coMonitorId: number) {
  return await getLateSubmissionsCountByCoMonitor(coMonitorId);
}
export async function getTaskSubmissionsOverStudentsCount(
  monitorId: number,
  taskId: number
) {
  return await getTaskSubmissionStats(monitorId, taskId);
}
