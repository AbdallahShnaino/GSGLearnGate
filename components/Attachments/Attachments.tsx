import React from 'react'

const Attachments = () => {
  return (
    <div className="border border-orange-100 rounded-lg p-4">
        <h3 className="font-medium text-[#FFA41F]  mb-2">Attachments</h3>
        <div className="space-y-2">
        <div className="flex items-center justify-between bg-orange-50 p-3 rounded-md text-sm">
            <span>assignment_instructions.pdf</span>
            <button className="text-[#FFA41F]  hover:text-orange-800 font-medium cursor-pointer">Download</button>
        </div>
        <div className="flex items-center justify-between bg-orange-50 p-3 rounded-md text-sm">
            <span>sample_schema.sql</span>
            <button className="text-[#FFA41F]  hover:text-orange-800 font-medium cursor-pointer">Download</button>
        </div>
     </div>
    </div>
  )
}

export default Attachments
