import AddCourseForm from '@/components/AddCourseForm/AddCourseForm';
import { getCoMonitorsNames, getMonitorsNames } from '@/src/db/queries/select';
import { UserCircle } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const AddCoursePage = async() => {
  const monitors = await getMonitorsNames();
  const coMonitors = await getCoMonitorsNames();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center p-4 sm:flex-row sm:justify-between sm:text-left">
        <h1 className=" text-sm sm:text-xl font-semibold">Add Course</h1>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="text-gray-600">Hi, Admin</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>

      <AddCourseForm monitors={monitors} coMonitors={coMonitors}/>
    </div>
  );
};

export default AddCoursePage;