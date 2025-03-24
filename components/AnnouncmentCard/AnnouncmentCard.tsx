import { Trash } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const AnnouncmentCard = () => {
  return (
    <li className="relative p-6 md:p-4 rounded-xl shadow-lg bg-gradient-to-r from-[#f1f5f9] to-[#e5e7eb] hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-full max-w-7xl ml-auto">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#319DC4] rounded-l-xl"></div>
      <div className="flex flex-row justify-between items-center mb-4 pl-6">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 hover:text-[#FFA41F] transition-all duration-300 ease-in-out">
          Task on Class Room
        </h3>
        <button 
          className="text-red-500 hover:text-red-700 transition-colors duration-300 ease-in-out flex items-center"
        >
          <Trash size={24} weight="bold" />
        </button>
      </div>
      <p className="text-gray-600 mt-2 text-sm md:text-base line-clamp-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, sapiente voluptates minus provident aliquid vero, consequatur accusamus dolore reiciendis.
      </p>
      <div className="flex justify-end mt-3">
        <span className="text-sm text-[#FFA41F] font-medium">Date:</span>
        <span className="text-sm text-gray-500 ml-1">04/02/2025</span>
      </div>
    </li>
  );
};

export default AnnouncmentCard;
