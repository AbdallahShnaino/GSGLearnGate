import UsersTable from '@/components/UsersTables/UsersTable';
import { mockUsers } from '@/services/mock';
import { UserCircle } from '@phosphor-icons/react/dist/ssr';
import React from 'react'

const ViewStudentsPage = () => {
  return (
    <div className="flex flex-col">
    <div className="flex items-center justify-between p-2">
      <h1 className="text-xl font-semibold">Students</h1>
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Hi, Admin</span>
        <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
      </div>
    </div>
    <UsersTable users={mockUsers} />
  </div>
  )
}

export default ViewStudentsPage;