import { Course } from "@/types/course";
import { MeetingRequest, Student } from "@/types/students";
import { User } from "@/types/user";

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    dob: "1990-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    dob: "1985-09-23",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    dob: "1992-11-07",
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
