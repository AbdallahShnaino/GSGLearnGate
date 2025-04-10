import { StudentCourseSmallCard } from "@/types";
import Link from "next/link";
import React from "react";

interface IProps {
  course: StudentCourseSmallCard;
  studentId: string;
}

const CourseCard = async (props: IProps) => {
  const progressPercentage = (4 / (props.course.duration * 6)) * 100;
  return (
    <div className="w-full min-w-0 sm:max-w-md p-4 bg-white shadow-lg rounded-2xl border border-gray-200 flex-grow">
      <h3 className="text-xl font-semibold text-gray-800">
        {props.course.title}
      </h3>

      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Progress</p>
          <p className="text-gray-600">4/{props.course.duration * 6} hours</p>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <span
            className={`block h-full bg-[#FFA41F] rounded-full`}
            style={{ width: `${progressPercentage}%` }}
          ></span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-700">
          Monitor:{" "}
          <span className="font-medium">{props.course.monitorName}</span>
        </p>
        <Link
          href={`/student/${props.studentId}/my-courses/${props.course.id}`}
          className="mt-3 px-4 py-2 bg-[#FFA41F] text-white rounded-lg hover:bg-[#FF8C00] transition cursor-pointer"
        >
          More Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
