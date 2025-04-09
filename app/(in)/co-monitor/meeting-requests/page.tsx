import MeetingRequestsTable from "@/components/MeetingRequestsTable/MeetingRequestsTable";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import { getCoMonitorCoursesNames } from "@/services/courses";
import React from "react";
import { STATIC_COMONITOR_ID } from "@/context/keys";
export async function page() {
  const coursesList = await getCoMonitorCoursesNames(STATIC_COMONITOR_ID);
  return (
    <div className="w-11/12 m-auto flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Meeting Requests</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Hi, CO-Monitor</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>
      <MeetingRequestsTable coMonitorCoursesList={coursesList} />
    </div>
  );
}

export default page;
