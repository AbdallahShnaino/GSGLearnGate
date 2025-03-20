import AnnouncmentTable from '@/components/AnnouncmentTable/AnnouncmentTable'
import SideBar from '@/components/SideBar/SideBar'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className="flex min-h-screen">
      <SideBar />
    {/* Main Content */}
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Announcment</h1>
      
      {/* Use Table Component */}
     <AnnouncmentTable />
    </div>
  </div>
    </div>
  )
}

export default page
