import CourseCard from "@/components/CourseCard/CourseCard";
import React from "react";
import SoonLessonsTable from "@/components/SoonLessonsTable/SoonLessonsTable";

const Dashboard = () => {
  return (
    <div className="px-6 py-3 w-full min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 my-4">My Courses</h1>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center w-full">
        <CourseCard />
        <CourseCard />
        <button className="px-10 py-2 bg-[#FFA41F] text-white rounded-lg hover:bg-[#FFA41F] transition cursor-pointer">
          Show All
        </button>
      </div>
      <hr className="border-t border-gray-300 my-4" />
      <h1 className="text-4xl font-bold text-gray-800 my-4">Soon lessons</h1>
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        <SoonLessonsTable />
        <div className="w-full max-w-sm min-w-[250px] px-4 py-20 bg-white shadow-lg rounded-2xl border border-gray-200 flex flex-col justify-center items-center gap-5">
          <h3 className="text-lg font-semibold">
            You are registered for 3 courses
          </h3>
          <button className="mt-3 px-4 py-2 bg-[#FFA41F] text-white rounded-lg hover:bg-[#FFA41F] transition cursor-pointer w-full sm:w-auto">
            Show All Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
