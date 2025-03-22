
import { Trash } from '@phosphor-icons/react/dist/ssr';
import React from 'react'

const AnnouncmentCard = () => {
  return (
    <div>
      <li className="relative p-6 md:p-8 rounded-xl shadow-lg bg-gradient-to-r from-[#f1f5f9] to-[#e5e7eb] hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-110 cursor-pointer">
  <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#319DC4] rounded-l-xl"></div> {/* الحافة المائلة */}
  <div className="flex flex-col sm:flex-row justify-between items-center mb-4 pl-6">
    <h3 className="text-2xl sm:text-xl md:text-2xl font-semibold text-gray-900 hover:text-[#FFA41F] transition-all duration-300 ease-in-out">
      Task on Class Room
    </h3>
    <button 
      className="text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-300 ease-in-out"
    >
      <Trash size={28} weight="bold" />
    </button>
  </div>
  <p className="text-gray-700 mt-2 text-xs sm:text-sm md:text-xs line-clamp-3">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, sapiente voluptates minus provident aliquid vero, consequatur accusamus dolore reiciendis dignissimos delectus dolores corporis fuga tempore magnam unde porro sunt consequuntur?
  </p>
  <div className="flex flex-col sm:flex-row items-center mt-3 fixed">
    <span className="text-sm text-[#FFA41F] font-medium">Date</span>
    <span className="text-sm text-gray-500">: 2/4/2025</span>
  </div>
</li>


    </div>
  )
}

export default AnnouncmentCard
