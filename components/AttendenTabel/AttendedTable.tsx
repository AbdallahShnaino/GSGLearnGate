'use client'
import { Plus } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Minus } from '@phosphor-icons/react/dist/ssr';
 
const AttendedTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [Absent, setAbsent] = useState(0);
  const [status, setStatus] = useState('Attended');
  const addAbsent = () => {
    setAbsent(Absent + 1);
    
    }
  const removeAbsent = () => {
    if(Absent > 0)
    setAbsent(Absent - 1);
    
    }  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    
  };
  const handleStatusChange = () => {
    if(Absent==0)
    setStatus('Attended');
    else if(Absent<5)
    setStatus('Sporadic');
    else
    setStatus('Absentee');

  }
  useEffect(() => {
    handleStatusChange();
  }, [Absent]);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Search & Actions */}
        <div className="flex items-center justify-between flex-wrap space-y-4 md:space-y-0 p-4 bg-[#E99375]">

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-64 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for users"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
              <tr>
               
                  
               
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Absent</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Notification</th>
                <th className="px-6 py-3">Cancel</th>
                <th className="px-6 py-3">Modify Absences</th>
              </tr>
            </thead>
            <tbody>
            <tr className="bg-white border-b hover:bg-gray-50 h-full ">
                <td className="flex items-center px-6 py-1.5 text-gray-900">
                    <Image className="rounded-full" src={"/docs/images/people/profile-picture-4.jpg"} alt="User" width={20} height={20}/>
                    <div className="ml-3">
                    <div className="text-base font-semibold">Neil Sims</div>
                    <div className="text-gray-500 text-xs">neil.sims@flowbite.com</div>
                    </div>
                </td>
                <td className="px-6 py-1.5 table-cell align-middle ">{Absent}</td>
                <td className="px-6 py-1.5">
                    <div className={` ${status === 'Attended' ? ' text-green-800' : status === 'Sporadic' ? ' text-yellow-800' : 'text-red-800'}`}>
                        {status}
                    </div>
                </td>
                <td className="px-6 py-1.5 table-cell align-middle ">
                    <button className="text-green-600 cursor-pointer m-0.5">Notify</button>
                    
                    
                </td>
                <td className="px-6 py-1.5 table-cell align-middle">
                <button className="text-red-600 cursor-pointer">Cancel</button>
                </td>
                <td className="px-6 py-1.5 table-cell align-middle">
                    <div className="flex  gap-3">
                    <button>
                    <Plus 
                        size={27} 
                        weight="bold"
                        className="bg-[#393E46] text-white rounded-md p-2 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                        onClick={addAbsent}
                    />
                    </button>
                    <button>
                    <Minus 
                    size={27} 
                    weight="bold"
                    className=" text-[#393E46] bg-[#319DC4] rounded-md p-2 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                    onClick={removeAbsent}
                    />
                    </button>
                    </div> 
                </td>
                </tr>

              {/* More Rows Can Be Added */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendedTable;
