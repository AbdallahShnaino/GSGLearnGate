import StudentRequestsTable from "@/components/StudentRequestsTable/StudentRequestsTable";
import { STATIC_MONITOR_ID } from "@/context/keys";
import { getMonitorCoursesNames } from "@/services/courses";

export default async function joiningRequestsPage() {
  const coursesList = await getMonitorCoursesNames(STATIC_MONITOR_ID);
  return (
    <div>
      <h2 className="mx-8 mt-11 font-bold ">Students Joining Requests</h2>
      <StudentRequestsTable monitorCoursesList={coursesList} />
    </div>
  );
}
