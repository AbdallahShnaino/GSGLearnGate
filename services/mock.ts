import { Role, User } from "@/types";
import { Course } from "@/types/course";
import { MeetingRequest, Student } from "@/types/students";

export const mockUsers: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "hashed_password_123",
    dateOfBirth: new Date("1995-06-15"),
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    role: Role.ADMIN,
    city: "New York",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-03-22T15:45:00Z",
    deletedAt: undefined,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "hashed_password_456",
    dateOfBirth: new Date("1998-09-25"),
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    role: Role.MONITOR,
    city: "Los Angeles",
    createdAt: "2024-01-10T08:30:00Z",
    updatedAt: "2024-02-15T10:10:00Z",
    deletedAt: undefined,
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    password: "hashed_password_789",
    dateOfBirth: new Date("2000-02-18"),
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    role: Role.CO_MONITOR,
    city: "Chicago",
    createdAt: "2024-04-01T14:20:00Z",
    updatedAt: "2024-04-05T16:50:00Z",
    deletedAt: "2024-06-01T10:00:00Z",
  },
];


export const courses: Course[] = [
  {
    id: "C-101",
    title: "Introduction to Computer Science",
    monitor: "Alice Johnson",
    coMonitor: "Bob Smith",
    attendance: 92,
  },
  {
    id: "C-102",
    title: "Data Structures and Algorithms",
    monitor: "David Brown",
    coMonitor: "Eve Davis",
    attendance: 85,
  },
  {
    id: "C-103",
    title: "Operating Systems",
    monitor: "Charlie Adams",
    coMonitor: "Sophia White",
    attendance: 78,
  },
  {
    id: "C-104",
    title: "Database Management Systems",
    monitor: "Emma Wilson",
    coMonitor: "Liam Miller",
    attendance: 88,
  },
  {
    id: "C-105",
    title: "Software Engineering",
    monitor: "Olivia Taylor",
    coMonitor: "James Anderson",
    attendance: 95,
  },
];
export const Students: Student[] = [
  {
    id: 1,
    name: 'Neil Sims',
    email: 'neil.sims@flowbite.com',
    profilePicture: '/profile (7).png',
    absences: 0,
    status: 'Attended',
    course: 'React.js for Beginners',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: '/profile (7).png',
    absences: 3,
    status: 'Sporadic',
    course: 'Angular for Professionals',
  },

];
export const meeting: MeetingRequest[] = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed.ali@example.com",
    RequestDate: "2025-03 - 25",
    MeetingDate: "2025-03 - 26",
    day: "Monday",
    time: "10:00 AM",
    statusRequest: "Pending",
    profilePicture: '/profile (7).png',
    caption: "Explanation of how to handle state in React and use hooks."
  },
  {
    id: 2,
    name: "Sara Khaled",
    email: "sara.khaled@example.com",
    RequestDate: "2025-03 - 26",
    MeetingDate: "2025-03 - 26",
    day: "Tuesday",
    time: "02: 30 PM",
    statusRequest: "Accepted",
    profilePicture: '/profile (7).png',
    caption: "Explanation of how to handle state in React and use hooks."
  },
  {
    id: 3,
    name: "Mohammed Hassan",
    email: "mohammed.hassan@example.com",
    RequestDate: "2025-03 - 27",
    MeetingDate: "2025-03 - 26",
    day: "Wednesday",
    time: "09:00 AM",
    statusRequest: "Rejected",
    profilePicture: '/profile (7).png',
    caption: "Explanation of how to handle state in React and use hooks."
  },
  {
    id: 4,
    name: "Lina Omar",
    email: "lina.omar@example.com",
    RequestDate: "2025-03 - 28",
    MeetingDate: "2025-03 - 26",
    day: "Thursday",
    time: "03: 45 PM",
    statusRequest: "Pending",
    profilePicture: '/profile (7).png',
    caption: " 6Explanation of how to handle state in React and use hooks Explanation of how to handle state in React and use hooks."
  },
  {
    id: 5,
    name: "Omar Youssef",
    email: "omar.youssef@example.com",
    RequestDate: "2025-03 - 29",
    MeetingDate: "2025-03 - 26",
    day: "Friday",
    time: "01: 15 PM",
    statusRequest: "Accepted",
    profilePicture: '/profile (7).png',
    caption: "Explanation of how to handle state in React and use hooks."
  }
]
