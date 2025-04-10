import CreateTaskForm from "@/components/Task/CreateTaskForm/CreateTaskForm";
import { useAuth } from "@/context/user";
import { getMonitorCoursesNames } from "@/services/courses";

export default async function CreateTaskPage() {
  const { user } = useAuth();

  const coursesList = await getMonitorCoursesNames(user.userId);

  return <CreateTaskForm coursesList={coursesList} />;
}
