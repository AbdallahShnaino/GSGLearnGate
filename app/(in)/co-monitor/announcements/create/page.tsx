import React from "react";
import SendAnnouncementForm from "@/components/SendAnnouncementForm/SendAnnouncementForm";
import { getCoMonitorCoursesNames } from "@/services/courses";
import { STATIC_COMONITOR_ID } from "@/context/keys";

const SendAnnouncementPage = async () => {
  const courses:
    | {
        courseId: number;
        courseName: string;
      }[]
    | null = await getCoMonitorCoursesNames(STATIC_COMONITOR_ID);

  return courses == null ? (
    <h1 className="text-xl font-semibold">
      No Courses Assigned To Send Announcement
    </h1>
  ) : (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Send Announcement</h1>
      </div>
      <SendAnnouncementForm courses={courses} />
    </div>
  );
};

export default SendAnnouncementPage;
