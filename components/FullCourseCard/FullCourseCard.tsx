import Link from "next/link";
import React from "react";

const FullCourseCard = () => {
  return (
    <div className="w-full bg-white shadow-lg rounded-2xl border border-gray-200 p-4 flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-gray-800">React & Next.js</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Attendance</p>
          <p className="text-gray-600">15/25 lessons</p>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <span
            className="block h-full bg-[#FFA41F] rounded-full"
            style={{ width: `60%` }}
          ></span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Status</p>
          <p className="text-gray-600 font-medium">In Progress</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Start Date</p>
          <p className="text-gray-600">2025-02-01</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Assignments</p>
          <p className="text-gray-600">6/10 completed</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Monitor</p>
          <p className="text-gray-600">Mohammad Ahmad</p>
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
