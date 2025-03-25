import { CaretDown } from '@phosphor-icons/react/dist/icons/CaretDown'
import { FunnelSimple } from '@phosphor-icons/react/dist/icons/FunnelSimple'
import React from 'react'

const Filter = () => {
  return (
    <div>
      <button className="flex items-center px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50">
         <FunnelSimple size={18} className="mr-2 text-gray-500" />
         Filter
        <CaretDown size={14} className="ml-2 text-gray-500" />
    </button>
    </div>
  )
}

export default Filter
