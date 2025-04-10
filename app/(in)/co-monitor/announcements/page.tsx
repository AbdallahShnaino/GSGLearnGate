import { getCoMonitorCoursesNames } from "@/services/courses";
import CreateTaskButton from "@/components/CreateTaskButtom/CreateTaskButtom";
import { STATIC_COMONITOR_ID } from "@/context/keys";
import AnnouncementsTableByCoMonitor from "@/components/AnnouncementsTable/AnnouncementsTableByCoMonitor";

export default async function Page() {
  const coursesList = await getCoMonitorCoursesNames(STATIC_COMONITOR_ID);

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
