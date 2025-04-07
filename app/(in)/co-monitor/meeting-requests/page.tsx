import MeetingRequestsTable from "@/components/MeetingRequestsTable/MeetingRequestsTable";
import { getCoMonitorCoursesNames } from "@/services/courses";
import React from "react";
import { STATIC_COMONITOR_ID } from "@/context/keys";
export async function page() {
  const coursesList = await getCoMonitorCoursesNames(STATIC_COMONITOR_ID);
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 ml-8">Meeting Requests</h1>

      <MeetingRequestsTable coMonitorCoursesList={coursesList} />
    </>
  );
}

export default page;
