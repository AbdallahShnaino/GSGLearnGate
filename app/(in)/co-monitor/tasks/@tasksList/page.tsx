import { TaskStatus } from "@/types";
import { getTasksWithSubmissionsByCoMonitors } from "@/services/task";
import { STATIC_COMONITOR_ID } from "@/context/keys";
import TaskList from "@/components/TasksList/TaskList";

const ITEMS_PER_PAGE = 10;

export default async function CoMonitorTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ taskStatus?: TaskStatus; page?: string }>;
}) {
  const params = await searchParams;

  const taskStatus = params.taskStatus || TaskStatus.ALL;
  const page = Number(params.page) || 1;

  const { tasks, total } = await getTasksWithSubmissionsByCoMonitors(
    STATIC_COMONITOR_ID,
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
      role="co-monitor"
    />
  );
}
