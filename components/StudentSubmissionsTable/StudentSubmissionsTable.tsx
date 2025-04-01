
"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Clock, MagnifyingGlass, Users, Funnel } from "phosphor-react";
import StatusTaskCard from "../StatusTaskCards/StatusTaskCard";
import StatusCard from "../StatusTaskCards/StatusCard";
import { ClockUser, Share } from "@phosphor-icons/react/dist/ssr";

export default function StudentSubmissionsTable() {
 
    const [selectedCourse, setSelectedCourse] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    { id: "1", name: "Math" },
    { id: "2", name: "Science" },
  ];

  const students = [
    { id: "1", name: "John Doe", email: "john@example.com", submissionDate: "2025-03-01", status: "Evaluated", grade: "A",profilePicture:"/profile (6).png",taskName:"react",course:"next" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", submissionDate: "2025-03-02", status: "Pending", grade: null , profilePicture:"/profile (6).png" ,taskName:"react",course:"next"},
    { id: "3", name: "Jane Smith", email: "jane@example.com", submissionDate: "2025-03-02", status: "Pending", grade: null , profilePicture:"/profile (6).png" ,taskName:"react",course:"next"},
    { id: "4", name: "Jane Smith", email: "jane@example.com", submissionDate: "2025-03-02", status: "Pending", grade: null , profilePicture:"/profile (6).png" ,taskName:"react",course:"next"},
    { id: "5", name: "Jane Smith", email: "jane@example.com", submissionDate: "2025-03-02", status: "Pending", grade: null , profilePicture:"/profile (6).png" ,taskName:"react",course:"next"},
  
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto flex-col gap-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatusCard title="Total Submissions" icon={<Users size={22}  className="text-orange-600" />}  iconColor="orange" subtitle="Active submissions" value={24} progress={4}/>
        <StatusCard title="Evaluated" icon={<CheckCircle size={22} weight="fill" className="text-green-600" />}  iconColor="green" subtitle="Graded submissions" value={24} progress={4}/>
        <StatusCard title="Pending" icon={<ClockUser size={22} weight="fill" className="text-red-600" />}  iconColor="red" subtitle="Awaiting review" value={24} progress={4}/>
        </div>
        <div className="bg-white p-4 mb-7 shadow-md rounded-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg">
              <Funnel size={20}  className=" text-[#FFA41F]" />
              <select className="w-[180px] border-orange-200 focus:ring-orange-200"> value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="all">All Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
        
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-4">Student Submissions</h2>
          <div className="container mx-auto p-6">
      
       

      
        <div className="overflow-x-auto border border-gray-200 rounded-lg ">
          <table className="w-full text-sm text-left text-gray-800 ">
            <thead className="text-m text-orange-800 uppercase  bg-[#FFA41F]/10 ">
              <tr className="h-15">
                <th className="px-6 py-3">student</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">course</th>
                <th className="px-6 py-3">Task</th>
                <th className="px-6 py-3">grade</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">action</th>
              </tr>
            </thead>
            <tbody>
              { students.map((student) => (
                <tr className="bg-white hover:bg-gray-50 border-b border-gray-100 h-15" key={student.id}>
                  <td className="flex items-center px-6 py-1.5 text-gray-900  align-middle">
                    <Image
                      className="rounded-full"
                      src={student.profilePicture}
                      alt="User"
                      width={25}
                      height={25}
                    />
                    <div className="ml-3">
                      <div className="text-s font-semibold">{student.name}</div>
                      <div className="text-gray-500 text-[10px]">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-1.5 text-s ">{student.submissionDate}</td>
                  <td className="px-6 py-1.5 text-s ">{student.course}</td>
                  <td className="px-6 py-1.5 text-s ">{student.taskName}</td>
                  <td className="px-6 py-1.5 text-s ">{student.grade}</td>
                  <td className="px-6 py-1.5 text-s ">{student.status}</td>
                  <td className="px-6 py-1.5 text-s ">
                  <Link href="#">
                      <button className="bg-[#FFA41F] hover:bg-orange-500 text-white w-3/4 rounded-xl flex h-9 justify-center items-center">
                        <Share size={20} className=" mr-2"/>
                        <span>View</span>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </div>
      </div>
   
  );
}
