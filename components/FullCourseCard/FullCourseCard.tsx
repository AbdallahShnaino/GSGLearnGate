import { StudentCourseBigCard } from "@/types";
import Link from "next/link";
import React from "react";

interface IProps {
  course: StudentCourseBigCard;
}
const FullCourseCard = (props: IProps) => {
  const attendance = 25 - props.course.absence!;
  return (
    <div className="w-full bg-white shadow-lg rounded-2xl border border-gray-200 p-4 flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-gray-800">
        {props.course.title}
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Attendance</p>
          <p className="text-gray-600">{attendance}/25 lessons</p>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <span
            className="block h-full bg-[#FFA41F] rounded-full"
            style={{ width: `${(attendance / 25) * 100}%` }}
          ></span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Status</p>
          <p className="text-gray-600 font-medium">{props.course.status}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Start Date</p>
          <p className="text-gray-600">
            {props.course.startDate.toLocaleDateString("en-GB")}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Assignments</p>
          <p className="text-gray-600">
            {props.course.completedTasks}/{props.course.totalTasks} completed
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Monitor</p>
          <p className="text-gray-600">{props.course.monitorName}</p>
        </div>
      </div>
      <Link
        href="/student/my-courses/course"
        className="mt-3 px-4 py-2 bg-[#FFA41F] text-white rounded-lg hover:bg-[#FFA41F] transition cursor-pointer flex justify-center"
      >
        More Details
      </Link>
    </div>
  );
};

export default FullCourseCard;
