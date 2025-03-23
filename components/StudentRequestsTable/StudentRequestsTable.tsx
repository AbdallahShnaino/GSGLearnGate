"use client";
import { useState } from "react";
import { meeting } from "@/services/mock";
import { MeetingRequest } from "@/types/students";
import { CheckCircle, XCircle } from "phosphor-react";
import ApproveModal from "../ApproveModal/ApproveModal";
import RejectModal from "../RejectModal/RejectModal";
import SearchBar from "../SearchBar/SearchBar";
import { useSearch } from "@/hooks/useSearch";
import PersonCard from "../PersonCard/PersonCard";
import { getJoiningRequests } from "@/services/joiningRequest";

export default function StudentRequestsTable() {
  getJoiningRequests();
  const { value: searchQuery, updateSearchParam } = useSearch("search");
  const [meetingRequests, setMeetingRequests] =
    useState<MeetingRequest[]>(meeting);
  const filteredRequests = meetingRequests.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MeetingRequest | null>(
    null
  );

  const handleOpenRejectModal = (request: MeetingRequest) => {
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
    setMeetingRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, statusRequest: "Accepted" } : request
      )
    );
    handleCloseApproveModal();
  };

  const handleReject = (id: number) => {
    setMeetingRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, statusRequest: "Rejected" } : request
      )
    );
    handleCloseRejectModal();
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar updateSearchParam={updateSearchParam} />
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 items-center">
              <tr>
                <th className="px-6 py-3"></th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Interview Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((student) => (
                <tr
                  className="bg-white hover:bg-gray-50 h-full border-b border-gray-100"
                  key={student.id}
                >
                  <td>
                    <PersonCard
                      email="email@email.com"
                      imageURL={student.profilePicture}
                      name="mohammed ali"
                    />
                  </td>
                  <td className="px-6 py-1.5 text-xs">React</td>
                  <td className="px-6 py-1.5 text-xs">Interview Status</td>

                  <td className="px-6 py-1.5">
                    <div className="flex gap-1 items-center">
                      {student.statusRequest === "Accepted" ? (
                        <div className="flex items-center bg-[#a4e6c7] text-gray-800 rounded-2xl px-2 py-1">
                          <CheckCircle
                            size={14}
                            weight="bold"
                            className="mr-1 text-emerald-600"
                          />
                          <span className="text-xs">Approve</span>
                        </div>
                      ) : student.statusRequest === "Rejected" ? (
                        <div className="flex items-center bg-[#ffc9c5] text-gray-800 rounded-2xl px-2 py-1">
                          <XCircle
                            size={14}
                            weight="bold"
                            className="mr-1 text-red-500"
                          />
                          <span className="text-xs">Rejected</span>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleOpenRejectModal(student)}
                            className="text-red-500 hover:text-red-800 cursor-pointer"
                          >
                            <XCircle size={28} className="rounded-2xl" />
                          </button>
                          <button
                            onClick={() => handleOpenApproveModal(student)}
                            className="flex items-center bg-gray-800 text-white rounded-md px-2 py-1 hover:bg-gray-700 cursor-pointer"
                          >
                            <CheckCircle
                              size={14}
                              weight="bold"
                              className="mr-1"
                            />
                            <span className="text-xs">Approve</span>
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
}
