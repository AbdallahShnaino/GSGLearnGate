import { StudentCourseTasks } from "@/types";
import Link from "next/link";
import React from "react";

interface IProps {
  task: StudentCourseTasks;
  number: number;
  courseId: string;
  studentId: string;
}
const CourseTask = (props: IProps) => {
  return (
    <Link
      href={`/${props.studentId}/my-courses/${props.courseId}/tasks/${props.task.taskId}`}
      className="p-4"
    >
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold">
          Assignment {props.number}: {props.task.taskTitle}
        </h3>
        <p className="text-sm text-gray-500">
          Deadline: {props.task.deadline.toLocaleDateString("en-GB")}{" "}
          {props.task.deadline.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          | Status: {props.task.status}
        </p>
      </div>
    </Link>
  );
};

export default CourseTask;
