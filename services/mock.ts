import { Course } from "@/types/course";
import { Student } from "@/types/students";
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