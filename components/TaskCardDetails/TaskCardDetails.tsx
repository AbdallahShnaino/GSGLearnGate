'use client'
import { CalendarBlank } from '@phosphor-icons/react/dist/icons/CalendarBlank'
import { Clock } from '@phosphor-icons/react/dist/icons/Clock'
import { FileText } from '@phosphor-icons/react/dist/icons/FileText'
import React from 'react'
import Attachments from '../Attachments/Attachments'


const TaskCardDetails = () => {
  return (
          <>
               <div className="bg-orange-50 p-4 border-b border-orange-100">
                 <div className="flex items-center justify-between">
                   <div>
                     <h2 className="text-xl font-semibold text-[#FFA41F]">Assignment #4: Database Design</h2>
                     <p className="text-sm text-gray-500">Task ID: 1 • Created on Mar 15, 2025</p>
                   </div>
                   <div className="bg-[#FFA41F] text-white px-3 py-1 rounded-full text-sm font-medium">100 Points</div>
                 </div>
               </div>
       
               <div className="p-4">
                
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                   <div className="flex items-center gap-2">
                     <CalendarBlank size={20} weight="fill" className="text-[#FFA41F]" />
                     <div>
                       <p className="text-sm text-gray-500">Start Date</p>
                       <p className="font-medium">Mar 20, 2025</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <Clock size={20} weight="fill" className="text-[#FFA41F]" />
                     <div>
                       <p className="text-sm text-gray-500">Deadline</p>
                       <p className="font-medium">Mar 28, 2025 11:59 PM</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <FileText size={20} weight="fill" className="text-[#FFA41F]" />
                     <div>
                       <p className="text-sm text-gray-500">Last Updated</p>
                       <p className="font-medium">Mar 15, 2025</p>
                     </div>
                   </div>
                   <div className="bg-orange-50 p-3 rounded-lg">
                     <p className="text-sm text-gray-500">Time Remaining</p>
                     <p className="text-lg font-bold text-[#FFA41F]">4 days</p>
                     <p className="text-xs text-gray-500">Due Mar 28, 2025</p>
                   </div>
                 </div>
       
             
                 <div className="h-px bg-orange-100 my-6"></div>
       
                
                 <div className="mb-6">
                   <h3 className="text-lg font-medium text-[#FFA41F] mb-4">Description</h3>
                   <div className="bg-orange-50 p-4 rounded-lg text-sm leading-relaxed">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, error eos, alias, quidem facilis quia ullam enim animi in autem placeat? Ratione libero, blanditiis modi fuga quaerat repudiandae eligendi velit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quae harum cumque ea nemo minus eveniet error vel qui natus iste omnis consectetur, veritatis quod inventore nostrum. Perferendis, consequatur recusandae. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia neque labore impedit ab distinctio voluptates cupiditate ullam, quis eos dignissimos blanditiis id accusantium? Accusantium necessitatibus pariatur, ea nostrum veritatis odit.
                   </div>
                 </div>
   
                 
                <Attachments/>
               </div>
       </>
             
  )
}

export default TaskCardDetails
