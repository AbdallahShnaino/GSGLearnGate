import { CheckCircle } from '@phosphor-icons/react/dist/icons/CheckCircle'
import { Clock } from '@phosphor-icons/react/dist/icons/Clock'
import { Warning } from '@phosphor-icons/react/dist/icons/Warning'
import React from 'react'

const StatusTaskCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="bg-white border border-[#FFA41F]/30 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 text-sm">Active Tasks</h3>
        <div className="bg-green-100 p-2 rounded-full">
          <CheckCircle size={20} weight="fill" className="text-green-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-[#FFA41F] mt-2">2</p>
      <div className="flex items-center mt-1 text-sm text-gray-500">
        <span>Submissions: 23/84</span>
        <div className="w-16 h-1.5 bg-gray-200 rounded-full ml-2">
          <div className="h-full bg-[#FFA41F] rounded-full" style={{ width: "27%" }}></div>
        </div>
      </div>
    </div>

    <div className="bg-white border border-[#FFA41F]/30 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 text-sm">Upcoming Tasks</h3>
        <div className="bg-blue-100 p-2 rounded-full">
          <Clock size={20} weight="fill" className="text-blue-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-[#FFA41F] mt-2">2</p>
      <div className="flex items-center mt-1 text-sm text-gray-500">
        <span>Next deadline: Mar 30, 2025</span>
      </div>
    </div>

    <div className="bg-white border border-[#FFA41F]/30 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 text-sm">Late Submissions</h3>
        <div className="bg-red-100 p-2 rounded-full">
          <Warning size={20} weight="fill" className="text-red-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-[#FFA41F] mt-2">5</p>
      <div className="flex items-center mt-1 text-sm text-gray-500">
        <span>From 3 different tasks</span>
      </div>
    </div>
  </div>

  )
}

export default StatusTaskCard
