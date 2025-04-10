import AnnouncementsTable from "@/components/AnnouncementsTable/AnnouncementsTable";
import { getMonitorCoursesNames } from "@/services/courses";
import CreateTaskButton from "@/components/CreateTaskButtom/CreateTaskButtom";
import { useAuth } from "@/context/user";

export default async function Page() {
  const { userId } = useAuth();
  const coursesList = await getMonitorCoursesNames(userId ?? -1);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Announcements</h1>
        <CreateTaskButton link="/monitor/announcements/create" />
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <AnnouncementsTable monitorCoursesList={coursesList} />
      </div>
    </div>
  );
}
