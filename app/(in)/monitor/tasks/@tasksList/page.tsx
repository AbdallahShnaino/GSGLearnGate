import TaskListCom from "@/components/TasksList/TaskListCom";
import { getMonitorTasks } from "@/services/task";

export default async function TasksList() {
  const tasks = await getMonitorTasks(13);
  console.log(tasks);
  return <TaskListCom tasks={tasks} />;
}
