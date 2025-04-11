import CreateTaskForm from "@/components/Task/CreateTaskForm/CreateTaskForm";
import { getMonitorCoursesNames } from "@/services/courses";
const HELLO = 1;
export default async function CreateTaskPage() {
  const coursesList = await getMonitorCoursesNames(HELLO ?? -1);

  return <CreateTaskForm coursesList={coursesList} />;
}
