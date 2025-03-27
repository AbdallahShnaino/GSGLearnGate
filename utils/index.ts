import { MonitorsTasks } from "@/types/tasksOperations";

export function isTaskActive(task: MonitorsTasks): boolean {
  const now = new Date();
  console.log(task.startedAt, task.deadline);
  return task.deadline < now;
}
