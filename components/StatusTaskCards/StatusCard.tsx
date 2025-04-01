import React, { ReactNode } from 'react'
interface StatusCardProps{
  title: string,
  icon: ReactNode,
  iconColor: string,
  value: string | number,
  subtitle?: string,
  progress?: number,
}
const StatusCard = ({ title, icon, iconColor, value, subtitle, progress }:StatusCardProps) => {
  return (
    <div className="bg-white border border-[#FFA41F]/30 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <div className={`bg-${iconColor}-100 p-2 rounded-full`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-[#FFA41F] mt-2">{value}</p>
      <div className="flex items-center mt-1 text-sm text-gray-500">
        {subtitle && <span>{subtitle}</span>}
        {progress && (
          <div className="w-16 h-1.5 bg-gray-200 rounded-full ml-2">
            <div className="h-full bg-[#FFA41F] rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatusCard
