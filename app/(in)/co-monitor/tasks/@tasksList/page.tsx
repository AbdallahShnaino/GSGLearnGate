import { TaskStatus } from "@/types";
import { getTasksWithSubmissionsByCoMonitors } from "@/services/task";
import TaskList from "@/components/TasksList/TaskList";
import { requireAuth } from "@/context/auth";

const ITEMS_PER_PAGE = 10;

export default async function CoMonitorTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ taskStatus?: TaskStatus; page?: string }>;
}) {
  const params = await searchParams;
  const { userId } = await requireAuth();
  const taskStatus = params.taskStatus || TaskStatus.ALL;
  const page = Number(params.page) || 1;

  const { tasks, total } = await getTasksWithSubmissionsByCoMonitors(
    userId,
    taskStatus,
    page,
    ITEMS_PER_PAGE
  );

  return (
    <TaskList
      initialTasks={tasks}
      initialTotal={total}
      initialPage={page}
      initialStatus={taskStatus}
    />
  );
}
