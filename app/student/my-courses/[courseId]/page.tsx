import CourseTask from "@/components/CourseTask/CourseTask";
import { getCoursesById, getTasksByCourseId } from "@/src/db/queries/select";
import Link from "next/link";
import React from "react";

interface IProps {
  params: Promise<{ courseId: string }>;
}
const CourseDetails = async (props: IProps) => {
  const { courseId } = await props.params;
  const courseData = await getCoursesById(Number(courseId));
  const attendance = 25 - courseData![0].absence!;
  const attendancePercent = `${(attendance / 25) * 100}%`;

  const courseTasks = await getTasksByCourseId(Number(courseId));
  console.log(courseTasks);

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#FFF5E8]">
      <header className="w-full bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Course: {courseData![0].title}
        </h1>
        <p className="text-gray-600 mt-1">Monitor: {courseData![0].monitor}</p>
        <p className="text-gray-600 mt-1">
          Co-Monitors:{" "}
          <span className="text-gray-600 mt-1">
            {courseData![0].coMonitors}
          </span>
          {/* , */}
          {/* <span className="text-gray-600 mt-1"> Hassan Malek</span> */}
        </p>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <main className="flex-1 p-6">
          <section id="overview" className="mb-10">
            <h2 className="text-2xl font-bold text-[#FFA41F]">Description</h2>
            <p className="text-gray-600 mt-2">{courseData![0].description}</p>
          </section>

          <section id="assignments" className="mb-10">
            <h2 className="text-2xl font-bold text-[#FFA41F]">Assignments</h2>
            <div className="space-y-4">
              {courseTasks?.map((task, index) => {
                return (
                  <CourseTask key={index} task={task} number={index + 1} />
                );
              })}
            </div>
            <div className="flex justify-center sm:justify-end  mt-4 mb-6">
              <Link
                href="/student/my-courses/course/tasks"
                className="px-4 py-2 text-sm sm:text-base text-white bg-[#FFA41F] hover:bg-[#FF8700] rounded-lg font-semibold shadow-md transition-all duration-300 focus:ring-2 focus:ring-[#FFA41F] focus:ring-offset-2"
              >
                Show Details
              </Link>
            </div>
          </section>

          <section id="progress" className="mb-10">
            <h2 className="text-2xl font-bold text-[#FFA41F]">Progress</h2>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Course Completion</p>
                <p className="text-gray-600">60%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="h-full bg-[#FFA41F] rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </section>

          <section id="attendance" className="mb-10">
            <h2 className="text-2xl font-bold text-[#FFA41F]">Attendance</h2>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Attendance Rate</p>
                <p className="text-gray-600">{attendancePercent}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="h-full bg-[#E99375] rounded-full"
                  style={{ width: attendancePercent }}
                ></div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CourseDetails;
