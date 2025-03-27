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
    const pageSize = 10;

    const CO_MONITOR_ID = 4;

    const fetchRequestsMeeting = async () => {
        try {
            const requests = await getCoMonitorAppointments(CO_MONITOR_ID, courseId, currentPage, pageSize);
            setMeetingRequests(requests.appointments);
            console.log(meetingRequests);
        } catch (error) {
            console.error('Error fetching meeting requests:', error);
        }
    };
    useEffect(() => {
        setCourseId(Number(searchParams.get("courseId")) || undefined);
        console.log(meetingRequests);
        fetchRequestsMeeting();
    }, [currentPage, searchParams, courseId]);

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
            fetchRequestsMeeting();
            handleCloseApproveModal();
        } catch (error) {
            console.error('Error approving meeting request:', error);
        }
    };

    const handleReject = async (id: number) => {
        try {
            await updateMeetingRequestStatus(id, Status.REJECTED);
            fetchRequestsMeeting();
            handleCloseRejectModal();
        } catch (error) {
            console.error('Error rejecting meeting request:', error);
        }
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
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
        handlePreviousPage,
        handleNextPage,
    };
};
