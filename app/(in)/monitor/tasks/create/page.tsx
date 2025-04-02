import CreateTaskForm from "@/components/Task/CreateTaskForm/CreateTaskForm";
import { getMonitorCoursesNames } from "@/services/courses";

export default async function CreateTaskPage() {
  const STATIC_MONITOR_ID = 13;
  const coursesList = await getMonitorCoursesNames(STATIC_MONITOR_ID);

  return <CreateTaskForm coursesList={coursesList} />;
}
