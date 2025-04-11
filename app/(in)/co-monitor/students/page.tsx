import StudentsTable from "@/components/StudentsTable/StudentsTable";
import {
  getCoMonitorCoursesNames,
  getMonitorCoursesNames,
} from "@/services/courses";
import { Role } from "@/types";

export default async function StudentsPage() {
  const role = Role.MONITOR;
  let coursesList: { courseId: number; courseName: string }[] | null = [];
  if (role === Role.MONITOR) {
    coursesList = await getMonitorCoursesNames(1);
  } else {
    coursesList = await getCoMonitorCoursesNames(1);
  }
  return (
    <div>
      <h2 className="mx-8 mt-11 font-bold ">Students List</h2>
      <StudentsTable coursesList={coursesList} />
    </div>
  );
}
