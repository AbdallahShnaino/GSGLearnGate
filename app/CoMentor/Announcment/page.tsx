import AnnouncmentTable from '@/components/AnnouncmentTable/AnnouncmentTable'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className="flex min-h-screen">
      
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
