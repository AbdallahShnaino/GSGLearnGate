import MeetingRequestsTable from '@/components/MeetingRequestsTable/MeetingRequestsTable'
import React from 'react'

const page = () => {
  return (
    <>
    <h1 className="text-3xl font-bold mb-6 ml-8">Meeting Requests</h1>
    
    {/* Use Table Component */}
   <MeetingRequestsTable />
  </>
  )
}

export default page
