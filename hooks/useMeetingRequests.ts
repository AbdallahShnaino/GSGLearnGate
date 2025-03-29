'use client'
import { useEffect, useState } from "react";
import { AppointmentWithStudent, Status } from '@/types';
import { updateMeetingRequestStatus } from "@/services/co-mentor-func";
import { useSearchParams } from "next/navigation";
import { getCoMonitorAppointments } from "@/src/db/queries/select";

export const useMeetingRequests = () => {
    const searchParams = useSearchParams();
    const [courseId, setCourseId] = useState<number | undefined>(
        Number(searchParams.get("courseId")) || undefined
    );
    const [meetingRequests, setMeetingRequests] = useState<AppointmentWithStudent[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<AppointmentWithStudent | null>(null);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const pageSize = 10;
    const CO_MONITOR_ID = 4;

    const fetchRequestsMeeting = async () => {
        try {
            setIsLoading(true);
            const response = await getCoMonitorAppointments(CO_MONITOR_ID, courseId, currentPage, pageSize);
            if (response && response.appointments) {
                setMeetingRequests(response.appointments);
                setTotalPages(Math.ceil(response.totalCount / 10));
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        setCourseId(Number(searchParams.get("courseId")) || undefined);
        fetchRequestsMeeting();
    }, [currentPage, courseId]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages]);

    const filterRequests = (query: string) => {
        return meetingRequests.filter((appointment) =>
            appointment.studentName.toLowerCase().includes(query.toLowerCase())
        );
    };

    const handleOpenRejectModal = (request: AppointmentWithStudent) => {
        setSelectedRequest(request);
        setIsRejectModalOpen(true);
    };

    const handleOpenApproveModal = (request: AppointmentWithStudent) => {
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

    const handleApprove = async (id: number) => {
        try {
            await updateMeetingRequestStatus(id, Status.ACCEPTED);
            await fetchRequestsMeeting();
            handleCloseApproveModal();
        } catch (error) {
            console.error('Error approving meeting request:', error);
        }
    };

    const handleReject = async (id: number) => {
        try {
            await updateMeetingRequestStatus(id, Status.REJECTED);
            await fetchRequestsMeeting();
            handleCloseRejectModal();
        } catch (error) {
            console.error('Error rejecting meeting request:', error);
        }
    };


    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    return {
        courseId,
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
        handleReject,
        currentPage,
        pageSize,
        totalPages,
        handlePreviousPage,
        handleNextPage,
        onPageChange,
        isLoading
    };
};
