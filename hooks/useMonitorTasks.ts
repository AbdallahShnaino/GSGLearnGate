import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTasksWithSubmissions } from "@/services/task";
import { TaskStatus } from "@/types";
import { MonitorsTask } from "@/types/tasks";
import { useAuth } from "@/context/user";

const ITEMS_PER_PAGE = 10;

export function useMonitorTasks() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const taskStatus =
    (searchParams.get("taskStatus") as TaskStatus) || TaskStatus.ALL;
  const page = Number(searchParams.get("page")) || 1;

  const [tasks, setTasks] = useState<MonitorsTask[]>([]);
  const [total, setTotal] = useState(0);
  const [_, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const { tasks, total } = await getTasksWithSubmissions(
          user.userId,
          taskStatus,
          page,
          ITEMS_PER_PAGE
        );

        console.log(tasks);

        setTasks(tasks);
        setTotal(total);
        setError(null);
      } catch (err) {
        setError("Error loading tasks");
      } finally {
        setLoading(false);
      }
    }
    try {
      fetchTasks();
    } catch (error) {
      throw new Error("CODE:1000");
    }
  }, [taskStatus, page]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const updatePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("taskStatus", taskStatus);
    newParams.set("page", String(newPage));
    router.push(`/monitor/tasks?${newParams.toString()}`, { scroll: false });
  };

  return {
    tasks,
    total,
    page,
    loading,
    totalPages,
    updatePage,
  };
}
