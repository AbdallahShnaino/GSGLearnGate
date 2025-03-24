'use client'
import { ArrowLeft } from '@phosphor-icons/react/dist/icons/ArrowLeft'
import { NotePencil } from '@phosphor-icons/react/dist/icons/NotePencil'
import React from 'react'

const CardTskHeader = () => {
  return (
     <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <button className="p-2 text-[#FFA41F]  hover:bg-orange-50 rounded-full mr-2 cursor-pointer">
                    <ArrowLeft size={20} weight="bold" />
                  </button>
                  <h1 className="text-2xl font-bold text-[#FFA41F] ">Task Details</h1>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center px-3 py-2 border cursor-pointer border-orange-200 text-[#FFA41F]  rounded-md hover:bg-orange-50">
                    <NotePencil size={18} weight="bold" className="mr-2" />
                    Edit Task
                  </button>
                </div>
              </div>
  )
}

export default CardTskHeader
