"use server";

import { insertTask } from "@/src/db/queries/insert";

export async function createTaskByMonitor(
  monitorId: number,
  courseId: number,
  deadline: Date,
  startedAt: Date,
  title: string,
  description: string,
  points: number,
  coMonitorId: number = 1
) {
  return await insertTask({
    coMonitorId,
    title,
    courseId,
    deadline,
    description,
    monitorId,
    startedAt,
    points,
  });
}
