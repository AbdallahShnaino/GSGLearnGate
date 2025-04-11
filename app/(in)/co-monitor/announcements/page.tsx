import { getCoMonitorCoursesNames } from "@/services/courses";
import CreateTaskButton from "@/components/CreateTaskButtom/CreateTaskButtom";
import AnnouncementsTableByCoMonitor from "@/components/AnnouncementsTable/AnnouncementsTableByCoMonitor";
import { requireAuth } from "@/context/auth";

export default async function Page() {
  const user = await requireAuth();
  const coursesList = await getCoMonitorCoursesNames(user.userId);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Announcements</h1>
        <CreateTaskButton link="/co-monitor/announcements/create" />
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <AnnouncementsTableByCoMonitor coMonitorCoursesList={coursesList} />
      </div>
    </div>
  );
}
