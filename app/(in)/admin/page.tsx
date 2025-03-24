import CustomBarChart from "@/components/BarChart/CustomBarChart";
import StatisticCard from "@/components/StatisticCard/StatisticCard";
import { chartData } from "@/services/mock";
import { Notebook, Student, UserCircle } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="w-11/12 m-auto flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Hi, Admin</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>
      <div className="w-11/12 m-auto">
        <div className="grid grid-cols-1 ml-11 sm:grid-cols-3 sm:ml-11 md:ml-0 gap-10 p-4">
          <StatisticCard title={"Total Students"} total={50} icon={<Student size={32} color="#FFA41F" weight="duotone"  />}/>
          <StatisticCard title={"Total Monitors"} total={50} icon={<UserCircle size={32} color="#FFA41F" weight="duotone"  />}/>
          <StatisticCard title={"Total Courses"} total={10} icon={<Notebook size={32} color="#FFA41F" weight="duotone"  />}/>
        </div>
      </div>
      <CustomBarChart chartData={chartData}/>
    </div>
  );
};

export default AdminDashboard;
