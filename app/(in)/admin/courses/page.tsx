import CoursesTable from '@/components/CoursesTable/CoursesTable';
import { UserCircle } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import React from 'react';

const CoursesPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center p-4 sm:flex-row sm:justify-between sm:text-left">
        <h1 className="text-xl font-semibold">Courses</h1>
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <Link 
            href="/admin/add-course" 
            className="bg-[#FFA41F] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#ff9100] transition"
          >
            + Add Course
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Hi, Admin</span>
            <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
          </div>
        </div>
      </div>

      <CoursesTable />
    </div>
  );
};

export default CoursesPage;