import { StudentCourseTasks } from "@/types";
import Link from "next/link";

interface IProps {
  task: StudentCourseTasks;
}
const TaskCard = (props: IProps) => {
  const statusBg = {
    GRADED: "bg-green-100 text-green-600",
    SUBMITTED: "bg-yellow-100 text-yellow-600",
    PENDING: "bg-gray-100 text-gray-600",
    LATE: "Bg-red-100 text-red-600",
  };

  return (
    <Link href="/student/my-courses/course" className="block w-full">
      <div className="w-full border rounded-2xl p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
          {/* Title and Deadline */}
          <div>
            <h2 className="text-xl font-semibold text-[#FFA41F]">
              {props.task.taskTitle}
            </h2>
            <p className="text-sm text-neutral-600">
              Deadline: {props.task.deadline.toLocaleDateString("en-GB")}{" "}
              {props.task.deadline.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
            </p>
          </div>

          {/* Status */}
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
              statusBg[props.task.status]
            }`}
          >
            Status: {props.task.status}
          </span>

          {/* Grade and Grader */}
          <div className="flex flex-col sm:items-end text-sm">
            <p className="text-neutral-800 font-medium">
              Grade: {props.task.grade} / 1000
            </p>
            <p className="text-neutral-600">
              Graded At: {props.task.gradedAt.toLocaleDateString("en-GB")}{" "}
              {props.task.gradedAt.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
            </p>
            <p className="text-neutral-600">Graded By: Ali Ahmad</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
