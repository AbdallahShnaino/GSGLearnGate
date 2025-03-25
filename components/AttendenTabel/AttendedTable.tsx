'use client';
import { useState } from 'react';
import { Plus, Minus } from '@phosphor-icons/react';
import Image from 'next/image';
import { Student } from '@/types/students';
import { Students } from '@/services/mock';
import SearchBar from '../SearchBar/SearchBar';
import { useSearch } from '@/hooks/useSearch';

const AttendedTable = () => {
  const [students, setStudents] = useState<Student[]>(Students);
  const { value: searchQuery, updateSearchParam } = useSearch('search');
  const filteredAttended = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Function to update absence count
  const updateAbsent = (userId: number, change: number) => {
    setStudents((prevList) =>
      prevList.map((user) => {
        if (user.id === userId) {
          let newAbsences = user.absences + change;
          if (newAbsences < 0) {
            newAbsences = 0;
          }
          return { ...user, absences: newAbsences };
        }
        return user; 
      })
    );
  };
  

  // Function to determine status based on absences
  const getStatus = (absences: number) => {
    if (absences === 0) return 'Attended';
    if (absences < 5) return 'Sporadic';
    return 'Absentee';
  };



  return (
    <div className="container mx-auto p-4">
       <SearchBar updateSearchParam={updateSearchParam}  placeholderText="Search student..."  />

      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      
       

      
        <div className="overflow-x-auto border border-gray-200  ">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">course</th>
                <th className="px-6 py-3">Absent</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Notification</th>
                <th className="px-6 py-3">Cancel</th>
                <th className="px-6 py-3">Modify Absences</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttended.map((student) => (
                <tr className="bg-white hover:bg-gray-50 h-full border-b border-gray-100" key={student.id}>
                  <td className="flex items-center px-6 py-1.5 text-gray-900">
                    <Image
                      className="rounded-full"
                      src={student.profilePicture}
                      alt="User"
                      width={25}
                      height={25}
                    />
                    <div className="ml-3">
                      <div className="text-xs font-semibold">{student.name}</div>
                      <div className="text-gray-500 text-[10px]">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-1.5 text-xs ">{student.course}</td>
                  <td className="px-6 py-1.5 text-xs ">{student.absences}</td>
                  <td className="px-6 py-1.5">
                    <div
                      className={`text-xs ${
                        getStatus(student.absences) === 'Attended'
                          ? 'text-green-800'
                          : getStatus(student.absences) === 'Sporadic'
                          ? 'text-yellow-800'
                          : 'text-red-800'
                      }`}
                    >
                      {getStatus(student.absences)}
                    </div>
                  </td>
                  <td className="px-6 py-1.5">
                    <button className="text-[#FFA41F] cursor-pointer m-0.5 text-xs ">Notify</button>
                  </td>
                  <td className="px-6 py-1.5">
                    <button className="text-red-600 cursor-pointer text-xs ">Cancel</button>
                  </td>
                  <td className="px-6 py-1.5">
                    <div className="flex gap-3">
                      <button onClick={() => updateAbsent(student.id, 1)}>
                        <Plus
                          size={27}
                          weight="bold"
                          className="bg-[#393E46] text-white rounded-md p-2 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                        />
                      </button>
                      <button onClick={() => updateAbsent(student.id, -1)}>
                        <Minus
                          size={27}
                          weight="bold"
                          className="text-[#393E46] bg-[#FFA41F] rounded-md p-2 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendedTable;
