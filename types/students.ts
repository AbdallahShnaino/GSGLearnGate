export interface Student {
    id: number;
    name: string;
    email: string;
    profilePicture: string;
    absences: number;
    status: 'Attended' | 'Sporadic' | 'Absentee';
    course: string;
}

export interface MeetingRequest {
    id: number;
    name: string;
    email: string;
    RequestDate: string;
    MeetingDate: string;
    day: string;
    time: string;
    statusRequest: "Pending" | "Accepted" | "Rejected";
    profilePicture: string;
    caption: string;
};
export interface ApproveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApprove: (id: number) => void;
    request: MeetingRequest;
}
