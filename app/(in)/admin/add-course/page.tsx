import AddCourseForm from '@/components/AddCourseForm/AddCourseForm';
import { UserCircle } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const AddCoursePage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center p-4 sm:flex-row sm:justify-between sm:text-left">
        <h1 className=" text-sm sm:text-xl font-semibold">Add Course</h1>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="text-gray-600">Hi, Admin</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>

      <AddCourseForm />
    </div>
  );
};

export default AddCoursePage;
