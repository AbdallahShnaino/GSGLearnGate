import AnnouncementsTable from "@/components/AnnouncementsTable/AnnouncementsTable";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import { getMonitorCoursesNames } from "@/services/courses";
import CreateTaskButton from "@/components/CreateTaskButtom/CreateTaskButtom";
import { requireAuth } from "@/context/auth";

export default async function Page() {
  const { userId } = await requireAuth();

  const coursesList = await getMonitorCoursesNames(userId);

  return (
    <div className="w-11/12 m-auto flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold max-sm:text-sm">Announcements</h1>
        <div className="flex items-center gap-2">
          <CreateTaskButton link="/monitor/announcements/create" />
          <span className="text-gray-600">Hi, monitor</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>
      <AnnouncementsTable monitorCoursesList={coursesList} />
    </div>
  );
}
