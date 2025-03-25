import Link from "next/link";
import React from "react";

const CourseTask = () => {
  return (
    <Link href="/student/my-courses/course/task" className="p-4">
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold">Assignment 1: Using Hooks</h3>
        <p className="text-sm text-gray-500">
          Deadline: March 22, 2025 | Status: Completed
        </p>
      </div>
    </Link>
  );
};

export default CourseTask;
