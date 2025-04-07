import StudentSubmissionsTable from "@/components/StudentSubmissionsTable/StudentSubmissionsTable";
import React from "react";

const page = () => {
  const ID: number = 4;
  return (
    <div>
      <div className="bg-gradient-to-r from-[#FFA41F] to-orange-400 rounded-xl p-6 shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-white">
          Student Submissions Dashboard
        </h1>
        <p className="text-orange-100 mt-2">
          Manage and track all student submissions
        </p>
      </div>
      <StudentSubmissionsTable TaskId={ID} />
    </div>
  );
};

export default page;
