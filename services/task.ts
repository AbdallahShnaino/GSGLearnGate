"use server";

import { insertTask } from "@/src/db/queries/insert";
import {
  getMonitorTasksDeadlines,
  getMonitorTasksNotGradedCount,
  getTasksByMonitor,
} from "@/src/db/queries/select";

export async function createTaskByMonitor(
  creatorId: number,
  courseId: number,
  deadline: Date,
  startedAt: Date,
  title: string,
  description: string,
  points: number
) {
  return await insertTask({
    creatorId,
    title,
    courseId,
    deadline,
    description,
    startedAt,
    points,
  });
}
export async function getMonitorTasks(monitorId: number) {
  return await getTasksByMonitor(monitorId);
}
export async function getActiveTasksCount(monitorId: number) {
  const today = new Date();
  const dates = await getMonitorTasksDeadlines(monitorId);
  let count = 0;
  dates.forEach((date: Date) => {
    if (date > today) {
      count++;
    }
  });
  return count;
}

export async function getNotGradedTasksCount(monitorId: number) {
  return await getMonitorTasksNotGradedCount(monitorId);
}
