import { TaskStatus } from "@/types";
import { getTasksWithSubmissions } from "@/services/task";
import TaskListClient from "@/components/TasksList/TaskListCom";
import { useAuth } from "@/context/user";

const ITEMS_PER_PAGE = 10;

export default async function MonitorTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ taskStatus?: TaskStatus; page?: string }>;
}) {
  const params = await searchParams;
  const { user } = useAuth();

  const taskStatus = params.taskStatus || TaskStatus.ALL;
  const page = Number(params.page) || 1;

  const { tasks, total } = await getTasksWithSubmissions(
    user.userId,
    taskStatus,
    page,
    ITEMS_PER_PAGE
  );

  return (
    <TaskListClient
      initialTasks={tasks}
      initialTotal={total}
      initialPage={page}
      initialStatus={taskStatus}
      role="monitor"
    />
  );
}
