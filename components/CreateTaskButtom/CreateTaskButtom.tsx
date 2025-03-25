import { Plus } from '@phosphor-icons/react/dist/icons/Plus'
import Link from 'next/link';
import React from 'react'

const CreateTaskButtom = () => {
  return (
    <div>
       <Link href='/co-mentor/add-task' className="flex items-center px-4 py-2 bg-[#FFA41F] text-white rounded-md hover:bg-[#F59000] self-start md:self-auto">
          <Plus size={18} weight="bold" className="mr-2" />
          Create New Task
        </Link>
    </div>
  )
}

export default CreateTaskButtom;
