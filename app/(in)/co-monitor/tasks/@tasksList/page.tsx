"use client";
import TempPagination from "@/components/Pagination/TempPagination";
import TaskListCom from "@/components/TasksList/TaskListCom";
import Loader from "@/components/Shared/Loader";
import { useCoMonitorTasks } from "@/hooks/useCoMonitorTasks";

export default function TasksList() {
  const { loading, studentCounts, tasks, totalPages, page, updatePage } =
    useCoMonitorTasks();

  if (loading) {
    return <Loader message="Loading data..." />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">
          There are no results for your filters.
        </p>
      ) : (
        <>
          <TaskListCom
            tasks={tasks}
            courseStudentCount={studentCounts}
            role="co-monitor"
          />
          <TempPagination
            currentPage={page}
            totalPages={totalPages}
            handleNextPage={() => updatePage(Math.min(page + 1, totalPages))}
            handlePreviousPage={() => updatePage(Math.max(page - 1, 1))}
            onPageChange={(newPage) =>
              updatePage(Math.max(1, Math.min(newPage, totalPages)))
            }
          />
        </>
      )}
    </div>
  );
}
