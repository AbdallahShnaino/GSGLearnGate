import CreateTaskForm from "@/components/Task/CreateTaskForm/CreateTaskForm";
import { STATIC_COMONITOR_ID } from "@/context/keys";
import { getMonitorCoursesNames } from "@/services/courses";

export default async function CreateTaskPage() {
  const coursesList = await getMonitorCoursesNames(STATIC_COMONITOR_ID);

  return <CreateTaskForm coursesList={coursesList} />;
}
