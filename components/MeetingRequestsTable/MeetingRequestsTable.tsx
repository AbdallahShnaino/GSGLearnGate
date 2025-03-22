'use client'
import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { meeting } from '@/services/mock'
import { MeetingRequest } from '@/types/students'
import Image from 'next/image'
import { Check, XSquare } from '@phosphor-icons/react'
import { CheckCircle, DiceSix, XCircle } from 'phosphor-react'
import ApproveModal from '../ApproveModal/ApproveModal'
import RejectModal from '../RejectModal/RejectModal'

const MeetingRequestsTable = () => {
  const [meetingRequests, setMeetingRequests] = useState<MeetingRequest[]>(meeting);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MeetingRequest | null>(null);

  const handleOpenRegectModal = (request: MeetingRequest) => {
    setSelectedRequest(request);
    setIsRejectModalOpen(true);
  };
  const handleOpenApproveModal = (request: MeetingRequest) => {
    setSelectedRequest(request);
    setIsApproveModalOpen(true);
    
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
    setSelectedRequest(null);
  };
  const handleCloseApproveModal = () => {
    setIsApproveModalOpen(false);
    setSelectedRequest(null);
  };


  const handleApprove = (id: number) => {
    setMeetingRequests(prevRequests => prevRequests.map(request => 
      request.id === id ? { ...request, statusRequest: 'Accepted' } : request
    ));
    handleCloseApproveModal();
  };

  const handleReject = (id: number) => {
    setMeetingRequests(prevRequests => prevRequests.map(request => 
      request.id === id ? { ...request, statusRequest: 'Rejected' } : request
    ));
    handleCloseRejectModal();
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar />
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 items-center">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Request Date</th>
                <th className="px-6 py-3">Meeting Date</th>
                <th className="px-6 py-3">Day</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Caption</th>
                <th className="px-6 py-3">
                  <div className='flex gap-1 items-center'>
                    <DiceSix size={16} weight="bold" />
                    <span>Action</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {meetingRequests.map((student) => (
                <tr className="bg-white hover:bg-gray-50 h-full border-b border-gray-100" key={student.id}>
                  <td className="flex items-center px-6 py-1.5 text-gray-900">
                    <Image className="rounded-full" src={student.profilePicture} alt="User" width={25} height={25} />
                    <div className="ml-3">
                      <div className="text-xs font-semibold">{student.name}</div>
                      <div className="text-gray-500 text-[10px]">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-1.5 text-xs">{student.RequestDate}</td>
                  <td className="px-6 py-1.5 text-xs">{student.MeetingDate}</td>
                  <td className="px-6 py-1.5 text-xs">{student.day}</td>
                  <td className="px-6 py-1.5 text-xs">{student.time}</td>
                  <td className="px-6 py-1.5 text-xs max-w-[170px] truncate">{student.caption}</td>
                  <td className="px-6 py-1.5">
                    <div className="flex gap-1 items-center">
                      {student.statusRequest === 'Accepted' ? (
                        <div className="flex items-center bg-[#a4e6c7] text-gray-800 rounded-2xl px-2 py-1">
                        <CheckCircle size={14} weight="bold" className="mr-1 text-emerald-600"  />
                        <span className='text-xs'>Approve</span>
                      </div>
                      ) : student.statusRequest === 'Rejected' ? (
                        <div className="flex items-center bg-[#ffc9c5] text-gray-800 rounded-2xl px-2 py-1">
                           <XCircle size={14} weight="bold" className="mr-1 text-red-500"  />
                            <span className='text-xs'>Rejected</span>
                          </div>
                      ) : (
                        <>
                          <button onClick={() => handleOpenRegectModal(student)} className="text-red-500 hover:text-red-800 cursor-pointer">
                            <XSquare size={28} className='rounded-2xl' />
                          </button>
                          <button onClick={() => handleOpenApproveModal(student)} className="flex items-center bg-gray-800 text-white rounded-md px-2 py-1 hover:bg-gray-700 cursor-pointer">
                            <Check size={14} weight="bold" className="mr-1" />
                            <span className='text-xs'>Approve</span>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedRequest && (
        <ApproveModal 
          isOpen={isApproveModalOpen} 
          onClose={handleCloseApproveModal}
          request={selectedRequest}
          onApprove={() => handleApprove(selectedRequest.id)}
        />
      )}
      {selectedRequest && (
        <RejectModal
          isOpen={isRejectModalOpen} 
          onClose={handleCloseRejectModal}
          request={selectedRequest}
          onApprove={() => handleReject(selectedRequest.id)}
        />
      )}
    </div>
  )
}

export default MeetingRequestsTable;
