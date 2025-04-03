import { MonitorsTasks } from "./tasksOperations";

export interface MonitorTasksResponse {
  tasks: MonitorsTasks[];
  total: number;
}
