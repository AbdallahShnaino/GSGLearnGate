import React from "react";

const CourseCard = () => {
  return (
    <div className="w-full min-w-0 sm:max-w-md p-4 bg-white shadow-lg rounded-2xl border border-gray-200 flex-grow">
      <h3 className="text-xl font-semibold text-gray-800">React & Next.js</h3>

      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Attendance</p>
          <p className="text-gray-600">15/25 lessons</p>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <span className="block h-full bg-[#FFA41F] rounded-full w-[60%]"></span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-700">
          Trainer: <span className="font-medium">Mohammad Ahmad</span>
        </p>
        <button className="mt-3 px-4 py-2 bg-[#FFA41F] text-white rounded-lg hover:bg-[#FFA41F] transition cursor-pointer">
          More Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
