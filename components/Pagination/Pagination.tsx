import { CaretLeft } from '@phosphor-icons/react/dist/icons/CaretLeft'
import { CaretRight } from '@phosphor-icons/react/dist/icons/CaretRight'
import React from 'react'

const Pagination = () => {
  return (
    <div className="flex items-center justify-between">
    <p className="text-sm text-gray-500">Showing 5 of 12 tasks</p>
    <div className="flex items-center gap-1">
      <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-500">
        <CaretLeft size={16} />
      </button>
      <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700">1</button>
      <button className="px-3 py-1 bg-[#FFA41F] text-white rounded-md">2</button>
      <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700">3</button>
      <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-500">
        <CaretRight size={16} />
      </button>
    </div>
  </div>
  )
}

export default Pagination
