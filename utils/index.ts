import { MonitorsTasks } from "@/types/tasksOperations";

export function isTaskActive(task: MonitorsTasks): boolean {
  const now = new Date();
  return task.deadline < now;
}
