import Link from "next/link";
import React from "react";

type StatusColor = "green" | "red" | "gray";
interface IProps {
  title: string;
  deadline: string;
  status: string;
  statusColor: StatusColor;
  grade: string;
  gradedBy: string;
}
const TaskCard = (props: IProps) => {
  const statusBg = {
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <Link href="/student/my-courses/course" className="block w-full">
      <div className="w-full border rounded-2xl p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
          {/* Title and Deadline */}
          <div>
            <h2 className="text-xl font-semibold text-[#FFA41F]">
              {props.title}
            </h2>
            <p className="text-sm text-neutral-600">
              Deadline: {props.deadline}
            </p>
          </div>

          {/* Status */}
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
              statusBg[props.statusColor]
            }`}
          >
            Status: {props.status}
          </span>

          {/* Grade and Grader */}
          <div className="flex flex-col sm:items-end text-sm">
            <p className="text-neutral-800 font-medium">Grade: {props.grade}</p>
            <p className="text-neutral-600">Graded By: {props.gradedBy}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
