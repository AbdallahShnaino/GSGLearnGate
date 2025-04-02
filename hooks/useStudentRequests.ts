import { JoiningOrder, Status } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getJoiningRequests,
  updateJoiningRequestStatus,
} from "@/services/joiningRequest";
import { addStudentToCourse, getMonitorCoursesNames } from "@/services/courses";

export default function useStudentRequests() {
  const searchParams = useSearchParams();
  const [courseId, setCourseId] = useState<number | undefined>(
    Number(searchParams.get("courseId")) || undefined
  );
  const [joiningOrders, setJoiningOrders] = useState<JoiningOrder[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<JoiningOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const STATIC_MONITOR_ID = 13;

  const fetchRequests = async () => {
    const requests = await getJoiningRequests(
      STATIC_MONITOR_ID,
      courseId,
      currentPage,
      pageSize
    );
    setJoiningOrders(requests);
    setIsLoading(false);
  };

  useEffect(() => {
    setCourseId(Number(searchParams.get("courseId")) || undefined);
    fetchRequests();
  }, [currentPage, searchParams, courseId]);

  const handleOpenRejectModal: Function = (order: JoiningOrder) => {
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
    await addStudentToCourse(studentId, courseId);
    await updateJoiningRequestStatus(id, Status.ACCEPTED);
    await fetchRequests();
    handleCloseApproveModal();
  };

  const handleReject = async (id: number) => {
    await updateJoiningRequestStatus(id, Status.REJECTED);
    handleCloseRejectModal();
    await fetchRequests();
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return {
    courseId,
    joiningOrders,
    currentPage,
    pageSize,
    isApproveModalOpen,
    isRejectModalOpen,
    selectedOrder,
    isLoading,
    handleOpenRejectModal,
    handleOpenApproveModal,
    handleCloseRejectModal,
    handleCloseApproveModal,
    handleApprove,
    handleReject,
    handlePreviousPage,
    handleNextPage,
  };
}
