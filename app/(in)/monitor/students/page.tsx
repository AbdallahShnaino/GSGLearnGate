import StudentsTable from "@/components/StudentsTable/StudentsTable";
import { STATIC_COMONITOR_ID, STATIC_MONITOR_ID } from "@/context/keys";
import {
  getCoMonitorCoursesNames,
  getMonitorCoursesNames,
} from "@/services/courses";
import { Role } from "@/types";

export default async function StudentsPage() {
  const role = Role.MONITOR;
  let coursesList: { courseId: number; courseName: string }[] | null = [];
  role == Role.MONITOR
    ? (coursesList = await getMonitorCoursesNames(STATIC_MONITOR_ID))
    : (coursesList = await getCoMonitorCoursesNames(STATIC_COMONITOR_ID));

  return (
    <div>
      <h2 className="mx-8 mt-11 font-bold ">Students List</h2>
      <StudentsTable coursesList={coursesList} role={role} />
    </div>
  );
}
