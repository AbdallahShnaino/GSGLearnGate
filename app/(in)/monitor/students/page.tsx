import StudentsTable from "@/components/StudentsTable/StudentsTable";
import { useAuth } from "@/context/user";
import {
  getCoMonitorCoursesNames,
  getMonitorCoursesNames,
} from "@/services/courses";
import { Role } from "@/types";

export default async function StudentsPage() {
  const { userId, user } = useAuth();
  const role = user.role as Role;

  let coursesList: { courseId: number; courseName: string }[] | null = [];
  if (role == Role.MONITOR) {
    coursesList = await getMonitorCoursesNames(userId ?? -1);
  } else {
    coursesList = await getCoMonitorCoursesNames(userId ?? -1);
  }

  return (
    <div>
      <h2 className="mx-8 mt-11 font-bold ">Students List</h2>
      <StudentsTable coursesList={coursesList} role={role} />
    </div>
  );
}
