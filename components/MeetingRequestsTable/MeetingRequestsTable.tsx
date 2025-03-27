"use client";
import Image from 'next/image';
import { CheckCircle, XCircle } from 'phosphor-react';
import ApproveModal from '../ApproveModal/ApproveModal';
import RejectModal from '../RejectModal/RejectModal';
import SearchBar from "../SearchBar/SearchBar";
import { useSearch } from "@/hooks/useSearch";
import { useMeetingRequests } from '@/hooks/useMeetingRequests';

const MeetingRequestsTable = () => {
  const { value: searchQuery, updateSearchParam } = useSearch('search');
  const {
    meetingRequests,
    filterRequests,
    selectedRequest,
    isApproveModalOpen,
    isRejectModalOpen,
    handleOpenRejectModal,
    handleOpenApproveModal,
    handleCloseRejectModal,
    handleCloseApproveModal,
    handleApprove,
    handleReject
  } = useMeetingRequests();


  const filteredRequests = filterRequests(searchQuery);

  return (
    <div className="container mx-auto p-4">
      <SearchBar updateSearchParam={updateSearchParam} placeholderText="Search Request... " />
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Request Date</th>
                <th className="px-6 py-3">Meeting Date</th>
                <th className="px-6 py-3">Day</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Caption</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((student) => (
                <tr className="bg-white hover:bg-gray-50 border-b border-gray-100" key={student.id}>
                  <td className="flex items-center px-6 py-1.5 text-gray-900">
                    <Image className="rounded-full" src={`${student.profileImage}`} alt="User" width={25} height={25} />
                    <div className="ml-3">
                      <div className="text-xs font-semibold">{student.studentName}</div>
                      <div className="text-gray-500 text-[10px]">{student.studentEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-1.5 text-xs">{student.createdAt}</td>
                  <td className="px-6 py-1.5 text-xs">{student.date.toISOString().split("T")[0]}</td> 
                  <td className="px-6 py-1.5 text-xs">{student.date.toLocaleDateString("en-US", { weekday: "long" })}</td>
                  <td className="px-6 py-1.5 text-xs">{student.date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</td>
                  <td className="px-6 py-1.5 text-xs max-w-[170px] truncate">{student.caption}</td>
                  <td className="px-6 py-1.5">
                    <div className="flex gap-1 items-center">
                      {student.status === 'ACCEPTED' ? (
                        <div className="flex items-center bg-[#a4e6c7] text-gray-800 rounded-2xl px-2 py-1">
                          <CheckCircle size={14} weight="bold" className="mr-1 text-emerald-600" />
                          <span className='text-xs'>Approved</span>
                        </div>
                      ) : student.status === 'REJECTED' ? (
                        <div className="flex items-center bg-[#ffc9c5] text-gray-800 rounded-2xl px-2 py-1">
                          <XCircle size={14} weight="bold" className="mr-1 text-red-500" />
                          <span className='text-xs'>Rejected</span>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => handleOpenRejectModal(student)} className="text-red-500 hover:text-red-800 cursor-pointer">
                            <XCircle size={28} className='rounded-2xl' />
                          </button>
                          <button onClick={() => handleOpenApproveModal(student)} className="flex items-center bg-gray-800 text-white rounded-md px-2 py-1 hover:bg-gray-700 cursor-pointer">
                            <CheckCircle size={14} weight="bold" className="mr-1" />
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
  );
};

export default MeetingRequestsTable;
