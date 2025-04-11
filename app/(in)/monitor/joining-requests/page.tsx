import StudentRequestsTable from "@/components/StudentRequestsTable/StudentRequestsTable";
import { getMonitorCoursesNames } from "@/services/courses";

export default async function joiningRequestsPage() {
  const HELLO = 1;

  const coursesList = await getMonitorCoursesNames(HELLO ?? -1);
  return (
    <div>
      <h2 className="mx-8 mt-11 font-bold ">Students Joining Requests</h2>
      <StudentRequestsTable monitorCoursesList={coursesList} />
    </div>
  );
}
