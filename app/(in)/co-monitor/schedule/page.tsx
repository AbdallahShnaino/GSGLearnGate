import SelectCourse from "@/components/Dropdowns/SelectCourse";
import { getCourseLectures } from "@/services/attendance";
import { getCoMonitorCoursesNames } from "@/services/courses";
import { CourseScheduleList } from "@/types/attendanceOperations";
import Link from "next/link";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";

const SchedulePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const MONITOR_ID = 20;
  const coursesList = await getCoMonitorCoursesNames(MONITOR_ID);

  const selectedCourseId = searchParams.courseId
    ? Number(searchParams.courseId)
    : coursesList?.[0]?.courseId;

  const schedules: CourseScheduleList[] = selectedCourseId
    ? await getCourseLectures(selectedCourseId)
    : await getCourseLectures();

  if (!schedules || schedules.length === 0) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Team Training Schedule</h1>
        <SelectCourse
          options={coursesList}
          value={selectedCourseId}
          appendSearchParams={true}
        />
        <p className="text-gray-500 mt-5">No schedules found</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 m-auto flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Team Training Schedule</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Hi, CO-Monitor</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>
      <div className="max-w-xs mb-4 mt-4">
        {coursesList && (
          <SelectCourse
            options={coursesList}
            value={selectedCourseId}
            appendSearchParams={true}
          />
        )}
      </div>
      <div className="overflow-hidden border border-gray-200 shadow-sm rounded-xl mb-10 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Course Name</th>
              <th className="py-3 px-4 text-left">Day of Week</th>
              <th className="py-3 px-4 text-left">Start Time</th>
              <th className="py-3 px-4 text-left">End Time</th>
              <th className="py-3 px-4 text-left">Assign Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{schedule.courseName}</td>
                <td className="py-3 px-4">{schedule.dayOfWeek}</td>
                <td className="py-3 px-4">{schedule.startTime}</td>
                <td className="py-3 px-4">{schedule.endTime}</td>
                <td className="py-3 px-4">
                  <Link
                    className="text-amber-500"
                    href={`/co-monitor/schedule/${schedule.courseId}/${schedule.id}`}
                  >
                    Mark
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePage;
