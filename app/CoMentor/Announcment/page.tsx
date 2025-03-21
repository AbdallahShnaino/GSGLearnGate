import AnnouncmentTable from '@/components/AnnouncmentTable/AnnouncmentTable'
import React from 'react'

const page = () => {
  return (
    <>
      
      <h1 className="text-3xl font-bold mb-6">Announcment</h1>
      
      {/* Use Table Component */}
     <AnnouncmentTable />
    
    </>
  )
}

export default page
