import CreateTaskForm from "@/components/Task/CreateTaskForm/CreateTaskForm";
import { useAuth } from "@/context/user";
import { getMonitorCoursesNames } from "@/services/courses";

export default async function CreateTaskPage() {
  const { userId } = useAuth();

  const coursesList = await getMonitorCoursesNames(userId ?? -1);

  return <CreateTaskForm coursesList={coursesList} />;
}
