export interface Student {
    id: number;
    name: string;
    email: string;
    profilePicture: string;
    absences: number;
    status: 'Attended' | 'Sporadic' | 'Absentee';
    course: string;
}