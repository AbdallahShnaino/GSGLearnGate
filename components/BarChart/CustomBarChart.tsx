"use client"
import { StudentCourseChart} from "@/types";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
interface IProps{
  chartData: StudentCourseChart[];
}
const CustomBarChart = (props:IProps) => {
  return (
    <div className="w-full h-96 shadow-md shadow-gray-300/80 rounded-lg bg-[#f7fdff] mb-10">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={props.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="course" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="students" fill="#FFA41F" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
