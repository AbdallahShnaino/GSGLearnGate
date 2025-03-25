"use client";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "phosphor-react";
import { useSearchParams } from "next/navigation";
import PersonCard from "../PersonCard/PersonCard";
import {
  getJoiningRequests,
  updateJoiningRequestStatus,
} from "@/services/joiningRequest";
import { JoiningOrder, Status } from "@/types";
import ApproveJoiningModal from "../modals/ApproveJoiningModal/ApproveJoiningModal";
import RejectJoiningModal from "../modals/RejectJoiningModal/RejectJoiningModal";
import SelectCourse from "../Dropdowns/SelectCourse";
import { addStudentToCourse, getMonitorCoursesNames } from "@/services/courses";
import Loader from "../Shared/Loader";

export default function StudentRequestsTable() {
  const searchParams = useSearchParams();
  const [courseId, setCourseId] = useState<number | undefined>(
    Number(searchParams.get("courseId")) || undefined
  );

  const [joiningOrders, setJoiningOrders] = useState<JoiningOrder[]>([]);
  const [monitorCoursesList, setMonitorCoursesList] = useState<
    { courseId: number; courseName: string }[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<JoiningOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const STATIC_MONITOR_ID = 13;
  const fetchRequests = async () => {
    setIsLoading(true);
    const requests = await getJoiningRequests(
      STATIC_MONITOR_ID,
      courseId,
      currentPage,
      pageSize
    );
    setJoiningOrders(requests);
    setIsLoading(false);
  };
  const fetchMonitorCourses = async () => {
    const coursesList = await getMonitorCoursesNames(STATIC_MONITOR_ID);
    setMonitorCoursesList(coursesList ?? []);
  };

  useEffect(() => {
    setCourseId(Number(searchParams.get("courseId")) || undefined);
    fetchRequests();
    fetchMonitorCourses();
  }, [currentPage, searchParams, courseId]);

  const handleOpenRejectModal = (order: JoiningOrder) => {
    setSelectedOrder(order);
    setIsRejectModalOpen(true);
  };

  const handleOpenApproveModal = (order: JoiningOrder) => {
    setSelectedOrder(order);
    setIsApproveModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCloseApproveModal = () => {
    setIsApproveModalOpen(false);
    setSelectedOrder(null);
  };

  const handleApprove = async (
    id: number,
    courseId: number,
    studentId: number
  ) => {
    addStudentToCourse(studentId, courseId);
    await updateJoiningRequestStatus(id, Status.ACCEPTED);
    await fetchRequests();
    handleCloseApproveModal();
  };

  const handleReject = async (id: number) => {
    updateJoiningRequestStatus(id, Status.REJECTED);
    handleCloseRejectModal();
    await fetchRequests();
  };
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  if (isLoading) {
    return <Loader message="Loading data..." />;
  }
  return (
    <div className="container mx-auto p-4">
      <SelectCourse options={monitorCoursesList} value={courseId} />
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="h-[400px] overflow-x-auto border border-gray-200">
          {joiningOrders.length > 0 ? (
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
                {joiningOrders.map((joiningOrder) => (
                  <tr
                    className="bg-white hover:bg-gray-50 h-full border-b border-gray-100"
                    key={joiningOrder.id}
                  >
                    <td>
                      <PersonCard
                        email={joiningOrder.email ?? ""}
                        imageURL={joiningOrder.image ?? "/profile (1).png"}
                        name={
                          joiningOrder.firstName + " " + joiningOrder.lastName
                        }
                      />
                    </td>
                    <td className="px-6 py-1.5 text-xs">
                      {joiningOrder.courseName}
                    </td>
                    <td className="px-6 py-1.5 text-xs">
                      {joiningOrder.interviewStatus}
                    </td>

                    <td className="px-6 py-1.5">
                      <div className="flex gap-1 items-center">
                        {joiningOrder.joiningStatus === Status.ACCEPTED ? (
                          <div className="flex items-center bg-[#a4e6c7] text-gray-800 rounded-2xl px-2 py-1">
                            <CheckCircle
                              size={14}
                              weight="bold"
                              className="mr-1 text-emerald-600"
                            />
                            <span className="text-xs">Approve</span>
                          </div>
                        ) : joiningOrder.joiningStatus === Status.REJECTED ? (
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
                              onClick={() =>
                                handleOpenRejectModal(joiningOrder)
                              }
                              className="text-red-500 hover:text-red-800 cursor-pointer"
                            >
                              <XCircle size={28} className="rounded-2xl" />
                            </button>
                            <button
                              onClick={() =>
                                handleOpenApproveModal(joiningOrder)
                              }
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
          ) : (
            <div className="p-4 border-none text-center">No data to view</div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center p-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={joiningOrders.length < pageSize}
          className={`px-4 py-2 rounded-md ${
            joiningOrders.length < pageSize
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          Next
        </button>
      </div>

      {selectedOrder && (
        <ApproveJoiningModal
          isOpen={isApproveModalOpen}
          onClose={handleCloseApproveModal}
          order={selectedOrder}
          onApprove={() =>
            handleApprove(
              selectedOrder.id,
              selectedOrder.courseId ?? -1,
              selectedOrder.studentId ?? -1
            )
          }
        />
      )}

      {selectedOrder && (
        <RejectJoiningModal
          isOpen={isRejectModalOpen}
          onClose={handleCloseRejectModal}
          order={selectedOrder}
          onApprove={() => handleReject(selectedOrder.id)}
        />
      )}
    </div>
  );
}
