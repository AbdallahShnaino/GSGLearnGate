

export enum Role {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  MONITOR = "MONITOR",
  CO_MONITOR = "CO_MONITOR",
}

export enum Difficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum Status {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export enum AssignmentStatus {
  PENDING = "PENDING",
  SUBMITTED = "SUBMITTED",
  GRADED = "GRADED",
}

export enum Attachments {
  LINK = "LINK",
  FILE = "FILE",
}

interface Timestamps {
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  image: string;
  role: Role;
  city: string;
} & Timestamps;

export type Admin = {
  id: number;
  userId: number;
};

export type Monitor = {
  id: number;
  userId: number;
};

export type CoMonitor = {
  id: number;
  userId: number;
};

export type Student = {
  id: number;
  userId: number;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: Difficulty;
  duration: number;
  applyStartDate: Date;
  applyEndDate: Date;
  courseStartDate: Date;
  courseEndDate: Date;
  monitorId: number | null;
  coMonitorId: number | null;
  adminId: number | null;
  details: string;
  entryRequirements: string;
} & Timestamps;

export type Announcement = {
  id: number;
  postedBy: number;
  courseId: number;
  title: string;
  description: string;
} & Timestamps;

export type Appointment = {
  id: number;
  coMonitorId: number;
  studentId: number;
  caption: string;
  date: Date;
  status: Status;
} & Timestamps;

export type StudentCourse = {
  id: number;
  courseId: number;
  studentId: number;
} & Timestamps;

export type Submission = {
  id: number;
  taskId: number;
  studentId: number;
  courseId: number;
  grade: number | null;
  feedback: string;
  gradedAt: Date;
  status: AssignmentStatus;
} & Timestamps;

export type Task = {
  id: number;
  title: string;
  description: string;
  startedAt: string;
  deadline: Date;
  points: number | null;
} & Timestamps;

export type Attachment = {
  id: number;
  taskId: number;
  studentId: number;
  courseId: number;
  type: Attachments;
  path: string;
} & Timestamps;

export type Attendance = {
  id: number;
  studentId: number;
  courseId: number;
  absence: number | null;
} & Timestamps;

export type JoiningRequest = {
  id: number;
  studentId: number;
  courseId: number;
  interviewStatus: Status;
  joiningStatus: Status;
} & Timestamps;

export interface JoiningOrder {
  id: number;
  courseId: number | null;
  studentId: number | null;
  courseName: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  image: string | null;
  interviewStatus: Status;
  joiningStatus: Status;
}
export interface StudentCourseChart {
  course: string;
  students: number;
}
export interface AppointmentWithStudent {
  id: number;
  coMonitorId: number;
  studentId: number;
  studentName: string;
  studentEmail: string;
  profileImage: string;
  caption: string;
  date: Date;
  status: Status;
  createdAt: string,

}
export interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: number) => void;
  request: AppointmentWithStudent;
}
