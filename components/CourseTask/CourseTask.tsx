import { StudentCourseTasks } from "@/types";
import Link from "next/link";
import React from "react";

interface IProps {
  task: StudentCourseTasks;
  number: number;
}
const CourseTask = (props: IProps) => {
  return (
    <Link href="/student/my-courses/course/task" className="p-4">
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold">
          Assignment {props.number}: {props.task.taskTitle}
        </h3>
        <p className="text-sm text-gray-500">
          Deadline: {props.task.deadline.toLocaleDateString("en-GB")} | Status:{" "}
          {props.task.status}
        </p>
      </div>
    </Link>
  );
};

export default CourseTask;
