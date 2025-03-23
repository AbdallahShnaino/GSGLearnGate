import { db } from "./../index";
import {
  usersTable,
  adminsTable,
  monitorsTable,
  coMonitorsTable,
  studentsTable,
  coursesTable,
  announcementsTable,
  appointmentsTable,
  studentsCoursesTable,
  submissionsTable,
  tasksTable,
  attachmentsTable,
  attendancesTable,
} from "./../schema";
import {
  Admin,
  Announcement,
  Appointment,
  Attachment,
  Attendance,
  CoMonitor,
  Course,
  Monitor,
  Student,
  StudentCourse,
  Submission,
  Task,
  User,
} from "@/types/index";
export async function getAllUsers(): Promise<User[]> {
  return await db.select().from(usersTable).all();
}

export async function getAllAdmins(): Promise<Admin[]> {
  return await db.select().from(adminsTable).all();
}

export async function getAllMonitors(): Promise<Monitor[]> {
  return await db.select().from(monitorsTable).all();
}

export async function getAllCoMonitors(): Promise<CoMonitor[]> {
  return await db.select().from(coMonitorsTable).all();
}

export async function getAllStudents(): Promise<Student[]> {
  return await db.select().from(studentsTable).all();
}

export async function getAllCourses(): Promise<Course[]> {
  return await db.select().from(coursesTable).all();
}

export async function getAllAnnouncements(): Promise<Announcement[]> {
  return await db.select().from(announcementsTable).all();
}

export async function getAllAppointments(): Promise<Appointment[]> {
  return await db.select().from(appointmentsTable).all();
}

export async function getAllStudentCourses(): Promise<StudentCourse[]> {
  return await db.select().from(studentsCoursesTable).all();
}

export async function getAllSubmissions(): Promise<Submission[]> {
  return await db.select().from(submissionsTable).all();
}

export async function getAllTasks(): Promise<Task[]> {
  return await db.select().from(tasksTable).all();
}

export async function getAllAttachments(): Promise<Attachment[]> {
  return await db.select().from(attachmentsTable).all();
}

export async function getAllAttendances(): Promise<Attendance[]> {
  return await db.select().from(attendancesTable).all();
}
