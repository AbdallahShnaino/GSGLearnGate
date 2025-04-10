import StudentRequestsTable from "@/components/StudentRequestsTable/StudentRequestsTable";
import { useAuth } from "@/context/user";
import { getMonitorCoursesNames } from "@/services/courses";

export default async function joiningRequestsPage() {
  const { userId } = useAuth();

  const coursesList = await getMonitorCoursesNames(userId ?? -1);
  return (
    <div>
      <h2 className="mx-8 mt-11 font-bold ">Students Joining Requests</h2>
      <StudentRequestsTable monitorCoursesList={coursesList} />
    </div>
  );
}
