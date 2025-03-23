import React from "react";

const CourseDetails = () => {
  return (
    <div className="w-full flex flex-col min-h-screen bg-[#FFF5E8]">
      <header className="w-full bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Course: React & Nextjs
        </h1>
        <p className="text-gray-600 mt-1">Trainer: Mohammad Ali</p>
        <p className="text-gray-600 mt-1">
          Co-Monitors: <span className="text-gray-600 mt-1">Yosef Jamal</span>,
          <span className="text-gray-600 mt-1"> Hassan Malek</span>
        </p>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <main className="flex-1 p-6">
          <section id="overview" className="mb-10">
            <h2 className="text-2xl font-bold text-[#FFA41F]">Overview</h2>
            <p className="text-gray-600 mt-2">
              Master React with this advanced course covering hooks, context
              API, and building complex web apps. Perfect for developers aiming
              to level up.
            </p>
          </section>

          <section id="assignments" className="mb-10">
            <h2 className="text-2xl font-bold text-[#FFA41F]">Assignments</h2>
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold">
                  Assignment 1: Using Hooks
                </h3>
                <p className="text-sm text-gray-500">
                  Deadline: March 22, 2025 | Status: Completed
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold">
                  Assignment 2: Context API
                </h3>
                <p className="text-sm text-gray-500">
                  Deadline: April 5, 2025 | Status: Pending
                </p>
              </div>
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
                <p className="text-gray-600">80%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="h-full bg-[#E99375] rounded-full"
                  style={{ width: "80%" }}
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
