import React from "react";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import SendAnnouncementForm from "@/components/SendAnnouncementForm/SendAnnouncementForm";
import { getMonitorCoursesNames } from "@/services/courses";

const SendAnnouncementPage = async () => {
  const MONITOR_ID = 13;
  const courses:
    | {
        courseId: number;
        courseName: string;
      }[]
    | null = await getMonitorCoursesNames(MONITOR_ID);

  return courses == null ? (
    <h1 className="text-xl font-semibold">
      No Courses Assigned To Send Announcement
    </h1>
  ) : (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Send Announcement</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Hi, Admin</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>
      <SendAnnouncementForm courses={courses} />
    </div>
  );
};

export default SendAnnouncementPage;
