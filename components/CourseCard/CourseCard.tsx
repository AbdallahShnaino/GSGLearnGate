import { StudentCourseSmallCard } from "@/types";
import React from "react";

interface IProps {
  course: StudentCourseSmallCard;
}
const CourseCard = (props: IProps) => {
  return (
    <div className="w-full min-w-0 sm:max-w-md p-4 bg-white shadow-lg rounded-2xl border border-gray-200 flex-grow">
      <h3 className="text-xl font-semibold text-gray-800">
        {props.course.title}
      </h3>

      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Attendance</p>
          <p className="text-gray-600">
            {25 - props.course.absence}/25 lessons
          </p>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <span className="block h-full bg-[#FFA41F] rounded-full w-[60%]"></span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-700">
          Monitor:{" "}
          <span className="font-medium">{props.course.monitorName}</span>
        </p>
        <button className="mt-3 px-4 py-2 bg-[#FFA41F] text-white rounded-lg hover:bg-[#FF8C00] transition cursor-pointer">
          More Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
