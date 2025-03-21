
import AttendedTable from '@/components/AttendenTabel/AttendedTable'
import React from 'react'

const page = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>
      
      {/* Use Table Component */}
     <AttendedTable />
    </>
 
    
  )
}

export default page
