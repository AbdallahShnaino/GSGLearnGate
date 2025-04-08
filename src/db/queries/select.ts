"use server";

import { db } from "./../index";
import {
  eq,
  sql,
  and,
  count,
  lte,
  gt,
  or,
  gte,
  lt,
  inArray,
  asc,desc,
} from "drizzle-orm";

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
  joiningRequestsTable,
  courseSchedulesTable,
  attendanceRecordsTable,
  coMonitorAvailabilityTable,
  commentsTable,
} from "./../schema";
import {
  Admin,
  Announcement,
  Appointment,
  Attachment,
  Attendance,
  CoMonitor,
  Course,
  JoiningRequest,
  JoiningOrder,
  Monitor,
  Student,
  StudentCourse,
  Submission,
  Task,
  User,
  AppointmentWithStudent,
  MonitorsJoinUsers,
  CourseJoinStudent,
  SubmissionsTask,
  CourseWithNames,
  TaskStatus,
  CourseStatus,
  StudentCourseSmallCard,
  StudentCourseBigCard,
  StudentCourseDetails,
  StudentAppointments,
  StudentCourseTasks,
  StudentCourseTask,
  coMonitorName,
  UsersNames,
  CourseSchedule,
  AttendanceRecordStatus,
  PrivateComment,
  SubmissionView,
  SubmissionAttachment,
  CourseWithPresenter,
  SoonLectures,
  AttendanceRecordOne,
  Comments,
  SubmissionId,
  newAnnouncements,
  PublicComment,
  Attachments,
} from "@/types/index";
import { alias } from "drizzle-orm/sqlite-core";
import { MonitorTasksResponse } from "@/types/tasks";
import { MonitorsTasks } from "@/types/tasksOperations";
import {
  CourseScheduleList,
  CourseStudentsList,
} from "@/types/attendanceOperations";
import { CoMonitorAppointment } from "@/types/appointments";
import { addDays, getDay, isAfter, setHours, setMinutes } from "date-fns";
import { boolean } from "drizzle-orm/gel-core";


export async function getAllUsers(): Promise<User[]> {
  return await db.select().from(usersTable).all();
}
export async function getCourseSchedule(
  courseId?: number
): Promise<CourseScheduleList[]> {
  let query = db
    .select({
      id: courseSchedulesTable.id,
      courseId: courseSchedulesTable.courseId,
      courseName: coursesTable.title,
      dayOfWeek: courseSchedulesTable.dayOfWeek,
      startTime: courseSchedulesTable.startTime,
      endTime: courseSchedulesTable.endTime,
    })
    .from(courseSchedulesTable)
    .leftJoin(coursesTable, eq(courseSchedulesTable.courseId, coursesTable.id));

  if (courseId !== undefined) {
    query = query.where(eq(courseSchedulesTable.courseId, courseId));
  }

  const result = await query.all();
  return result;
}
export async function getUserByEmail(
  email: string
): Promise<Omit<User, "password"> | null> {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllAdmins(): Promise<Admin[]> {
  return await db.select().from(adminsTable).all();
}

export async function getAllMonitors(): Promise<Monitor[]> {
  return await db.select().from(monitorsTable).all();
}

export async function getMonitorsNames(): Promise<UsersNames[]> {
  return await db
    .select({
      id: monitorsTable.id,
      userId: monitorsTable.userId,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    })
    .from(monitorsTable)
    .leftJoin(usersTable, eq(usersTable.id, monitorsTable.userId))
    .all();
}

export async function getMonitors(
  page: number = 1,
  pageSize: number = 10
): Promise<{ users: MonitorsJoinUsers[]; totalCount: number } | null> {
  const offset = (page - 1) * pageSize;

  const result = await db
    .select({
      id: monitorsTable.id,
      userId: monitorsTable.userId,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      dateOfBirth: usersTable.dateOfBirth,
      image: usersTable.image,
      role: usersTable.role,
      city: usersTable.city,
    })
    .from(monitorsTable)
    .leftJoin(usersTable, eq(usersTable.id, monitorsTable.userId))
    .limit(pageSize)
    .offset(offset)
    .all();

  const totalCount = await db
    .select({
      monitorId: monitorsTable.id,
      userId: monitorsTable.userId,
    })
    .from(monitorsTable)
    .leftJoin(usersTable, eq(usersTable.id, monitorsTable.userId))
    .all();

  return { users: result, totalCount: totalCount.length };
}

export async function getAllCoMonitors(): Promise<CoMonitor[]> {
  return await db.select().from(coMonitorsTable).all();
}

export async function getCoMonitorsNames(): Promise<UsersNames[]> {
  return await db
    .select({
      id: coMonitorsTable.id,
      userId: coMonitorsTable.userId,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    })
    .from(coMonitorsTable)
    .leftJoin(usersTable, eq(usersTable.id, coMonitorsTable.userId))
    .all();
}

export async function getCoMonitors(
  page: number = 1,
  pageSize: number = 10
): Promise<{ users: MonitorsJoinUsers[]; totalCount: number } | null> {
  const offset = (page - 1) * pageSize;
  const result = await db
    .select({
      id: coMonitorsTable.id,
      userId: coMonitorsTable.userId,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      dateOfBirth: usersTable.dateOfBirth,
      image: usersTable.image,
      role: usersTable.role,
      city: usersTable.city,
    })
    .from(coMonitorsTable)
    .leftJoin(usersTable, eq(usersTable.id, coMonitorsTable.userId))
    .limit(pageSize)
    .offset(offset)
    .all();

  const totalCount = await db
    .select({
      monitorId: coMonitorsTable.id,
      userId: coMonitorsTable.userId,
    })
    .from(coMonitorsTable)
    .leftJoin(usersTable, eq(usersTable.id, coMonitorsTable.userId))
    .all();

  return { users: result, totalCount: totalCount.length };
}

export async function getAllStudents(): Promise<Student[]> {
  return await db.select().from(studentsTable).all();
}

export async function getStudents(
  page: number = 1,
  pageSize: number = 10
): Promise<{ users: MonitorsJoinUsers[]; totalCount: number } | null> {
  const offset = (page - 1) * pageSize;
  const result = await db
    .select({
      id: studentsTable.id,
      userId: studentsTable.userId,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      dateOfBirth: usersTable.dateOfBirth,
      image: usersTable.image,
      role: usersTable.role,
      city: usersTable.city,
    })
    .from(studentsTable)
    .leftJoin(usersTable, eq(usersTable.id, studentsTable.userId))
    .limit(pageSize)
    .offset(offset)
    .all();

  const totalCount = await db
    .select({
      monitorId: studentsTable.id,
      userId: studentsTable.userId,
    })
    .from(studentsTable)
    .leftJoin(usersTable, eq(usersTable.id, studentsTable.userId))
    .all();

  return { users: result, totalCount: totalCount.length };
}


export async function getAllCourses(): Promise<Course[]> {
  return await db.select().from(coursesTable).all();
}

export async function getCourseById(
  id: number
): Promise<CourseWithNames | null> {
  const monitorUsers = alias(usersTable, "monitorUsers");
  const coMonitorUsers = alias(usersTable, "coMonitorUsers");

  const result = await db
    .select({
      id: coursesTable.id,
      image: coursesTable.image,
      title: coursesTable.title,
      duration: coursesTable.duration,
      description: coursesTable.description,
      entryRequirements: coursesTable.entryRequirements,
      details: coursesTable.details,
      difficulty: coursesTable.difficulty,
      monitorId: monitorsTable.userId,
      monitorName: monitorUsers.firstName,
      coMonitorId: coMonitorsTable.userId,
      coMonitorName: coMonitorUsers.firstName,
      adminId: coursesTable.adminId,
      applyStartDate: coursesTable.applyStartDate,
      applyEndDate: coursesTable.applyEndDate,
      courseStartDate: coursesTable.courseStartDate,
      courseEndDate: coursesTable.courseEndDate,
    })
    .from(coursesTable)
    .leftJoin(monitorsTable, eq(coursesTable.monitorId, monitorsTable.id))
    .leftJoin(monitorUsers, eq(monitorsTable.userId, monitorUsers.id))
    .leftJoin(coMonitorsTable, eq(coursesTable.coMonitorId, coMonitorsTable.id))
    .leftJoin(coMonitorUsers, eq(coMonitorsTable.userId, coMonitorUsers.id))
    .where(eq(coursesTable.id, id))
    .get();

  return result || null;
}

export async function getCoursesByStudent(
  studentId: number
): Promise<Course[] | null> {
  const results = await db
    .select({
      id: coursesTable.id,
      title: coursesTable.title,
      description: coursesTable.description,
      image: coursesTable.image,
      difficulty: coursesTable.difficulty,
      duration: coursesTable.duration,
      applyStartDate: coursesTable.applyStartDate,
      applyEndDate: coursesTable.applyEndDate,
      courseStartDate: coursesTable.courseStartDate,
      courseEndDate: coursesTable.courseEndDate,
      monitorId: coursesTable.monitorId,
      coMonitorId: coursesTable.coMonitorId,
      adminId: coursesTable.adminId,
      details: coursesTable.details,
      entryRequirements: coursesTable.entryRequirements,
      createdAt: coursesTable.createdAt,
      updatedAt: coursesTable.updatedAt,
      deletedAt: coursesTable.deletedAt,
    })
    .from(studentsCoursesTable)
    .innerJoin(coursesTable, eq(coursesTable.id, studentsCoursesTable.courseId))
    .where(eq(studentsCoursesTable.studentId, studentId));

  return results.length > 0 ? results : null;
}

export async function getCoursesByMonitor(
  monitorId: number
): Promise<Course[] | null> {
  const results = await db
    .select({
      id: coursesTable.id,
      title: coursesTable.title,
      description: coursesTable.description,
      image: coursesTable.image,
      difficulty: coursesTable.difficulty,
      duration: coursesTable.duration,
      applyStartDate: coursesTable.applyStartDate,
      applyEndDate: coursesTable.applyEndDate,
      courseStartDate: coursesTable.courseStartDate,
      courseEndDate: coursesTable.courseEndDate,
      monitorId: coursesTable.monitorId,
      coMonitorId: coursesTable.coMonitorId,
      adminId: coursesTable.adminId,
      details: coursesTable.details,
      entryRequirements: coursesTable.entryRequirements,
      createdAt: coursesTable.createdAt,
      updatedAt: coursesTable.updatedAt,
      deletedAt: coursesTable.deletedAt,
    })
    .from(coursesTable)
    .where(eq(coursesTable.monitorId, monitorId));

  return results.length > 0 ? results : null;
}

export async function getCoursesNamesByMonitor(
  monitorId: number
): Promise<{ courseId: number; courseName: string }[] | null> {
  const results = await db
    .select({
      title: coursesTable.title,
      id: coursesTable.id,
    })
    .from(coursesTable)
    .where(eq(coursesTable.monitorId, monitorId));
  try {
    return results.map((course: { id: any; title: any }) => ({
      courseId: course.id,
      courseName: course.title,
    }));
  } catch (e) {
    return null;
  }
}

export async function getCoursesNamesByCoMonitor(
  coMonitorId: number
): Promise<{ courseId: number; courseName: string }[] | null> {
  const results = await db
    .select({
      title: coursesTable.title,
      id: coursesTable.id,
    })
    .from(coursesTable)
    .where(eq(coursesTable.coMonitorId, coMonitorId));
  try {
    return results.map((course: { id: any; title: any }) => ({
      courseId: course.id,
      courseName: course.title,
    }));
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getCoursesByCoMonitor(
  coMonitorId: number
): Promise<Course[] | null> {
  const results = await db
    .select({
      id: coursesTable.id,
      title: coursesTable.title,
      description: coursesTable.description,
      image: coursesTable.image,
      difficulty: coursesTable.difficulty,
      duration: coursesTable.duration,
      applyStartDate: coursesTable.applyStartDate,
      applyEndDate: coursesTable.applyEndDate,
      courseStartDate: coursesTable.courseStartDate,
      courseEndDate: coursesTable.courseEndDate,
      monitorId: coursesTable.monitorId,
      coMonitorId: coursesTable.coMonitorId,
      adminId: coursesTable.adminId,
      details: coursesTable.details,
      entryRequirements: coursesTable.entryRequirements,
      createdAt: coursesTable.createdAt,
      updatedAt: coursesTable.updatedAt,
      deletedAt: coursesTable.deletedAt,
    })
    .from(coursesTable)
    .where(eq(coursesTable.coMonitorId, coMonitorId));

  return results.length > 0 ? results : null;
}

export async function getAllAnnouncements(): Promise<Announcement[]> {
  return await db.select().from(announcementsTable).all();
}

export async function getAnnouncementsByCourse(
  courseId: number
): Promise<Announcement[] | null> {
  const results = await db
    .select({
      id: announcementsTable.id,
      title: announcementsTable.title,
      description: announcementsTable.description,
      courseId: announcementsTable.courseId,
      postedBy: announcementsTable.postedBy,
      updatedAt: announcementsTable.updatedAt,
      createdAt: announcementsTable.createdAt,
    })
    .from(announcementsTable)
    .where(eq(announcementsTable.courseId, courseId));

  return results.length > 0 ? results : null;
}

export async function getAllAppointments(): Promise<Appointment[]> {
  return await db.select().from(appointmentsTable).all();
}

export async function getAppointmentsByStudent(
  studentId: number
): Promise<Appointment[] | null> {
  const results = await db
    .select({
      id: appointmentsTable.id,
      studentId: appointmentsTable.studentId,
      date: appointmentsTable.date,
      caption: appointmentsTable.caption,
      coMonitorId: appointmentsTable.coMonitorId,
      status: appointmentsTable.status,
      createdAt: appointmentsTable.createdAt,
    })
    .from(appointmentsTable)
    .where(eq(appointmentsTable.studentId, studentId));

  return results.length > 0 ? results : null;
}

export async function getAppointmentsByCoMonitor(
  coMonitorId: number
): Promise<Appointment[] | null> {
  const results = await db
    .select({
      id: appointmentsTable.id,
      studentId: appointmentsTable.studentId,
      date: appointmentsTable.date,
      caption: appointmentsTable.caption,
      coMonitorId: appointmentsTable.coMonitorId,
      status: appointmentsTable.status,
      createdAt: appointmentsTable.createdAt,
    })
    .from(appointmentsTable)
    .where(eq(appointmentsTable.coMonitorId, coMonitorId));

  return results.length > 0 ? results : null;
}

export async function getCoMonitorAppointments(
  coMonitorId: number,
  courseId?: number,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  appointments: AppointmentWithStudent[];
  totalCount: number;
}> {
  const offset = (page - 1) * pageSize;

 
  const whereConditions = [eq(appointmentsTable.coMonitorId, coMonitorId)];

  
  if (courseId !== undefined) {
    whereConditions.push(eq(appointmentsTable.courseId, courseId));
  }

  const results = await db
    .select({
      id: appointmentsTable.id,
      studentId: appointmentsTable.studentId,
      date: appointmentsTable.dateTime,
      caption: appointmentsTable.caption,
      status: appointmentsTable.status,
      createdAt: appointmentsTable.createdAt,
      profileImage: usersTable.image,
      studentName: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      studentEmail: usersTable.email,
      courseName: coursesTable.title,
    })
    .from(appointmentsTable)
    .innerJoin(studentsTable, eq(appointmentsTable.studentId, studentsTable.id))
    .innerJoin(usersTable, eq(studentsTable.userId, usersTable.id))
    .innerJoin(coursesTable, eq(appointmentsTable.courseId, coursesTable.id))
    .where(and(...whereConditions))
    .orderBy(desc(appointmentsTable.createdAt))
    .limit(pageSize)
    .offset(offset);

  
  const countResults = await db
    .select({ count: sql<number>`count(*)` })
    .from(appointmentsTable)
    .innerJoin(studentsTable, eq(appointmentsTable.studentId, studentsTable.id))
    .innerJoin(usersTable, eq(studentsTable.userId, usersTable.id))
    .innerJoin(coursesTable, eq(appointmentsTable.courseId, coursesTable.id))
    .where(and(...whereConditions));

  return {
    appointments: results,
    totalCount: Number(countResults[0]?.count) || 0,
  };
}

export async function getAllStudentsCourses(): Promise<StudentCourse[]> {
  return await db.select().from(studentsCoursesTable).all();
}

export async function getStudentsByCourse(
  courseId: number
): Promise<Student[] | null> {
  const results = await db
    .select({
      id: studentsTable.id,
      userId: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      dateOfBirth: sql<Date>`DATETIME(${usersTable.dateOfBirth}, 'unixepoch')`,
      image: usersTable.image,
      city: usersTable.city,
    })
    .from(studentsCoursesTable)
    .innerJoin(
      studentsTable,
      eq(studentsTable.id, studentsCoursesTable.studentId)
    )
    .innerJoin(usersTable, eq(usersTable.id, studentsTable.userId))
    .where(eq(studentsCoursesTable.courseId, courseId));

  return results.length > 0 ? results : null;
}

export async function getCoursesWithStudentCount(
  page: number = 1,
  pageSize: number = 10
): Promise<{ courses: CourseJoinStudent[]; totalCount: number } | null> {
  const offset = (page - 1) * pageSize;
  const monitorUser = alias(usersTable, "monitorUser");
  const coMonitorUser = alias(usersTable, "coMonitorUser");

  const results = await db
    .select({
      id: coursesTable.id,
      title: coursesTable.title,
      difficulty: coursesTable.difficulty,
      monitorId: coursesTable.monitorId,
      coMonitorId: coursesTable.coMonitorId,
      monitorName: monitorUser.firstName,
      coMonitorName: coMonitorUser.firstName,
      studentCount: sql<number>`COUNT(${studentsCoursesTable.studentId})`.as(
        "studentCount"
      ),
    })
    .from(coursesTable)
    .leftJoin(
      studentsCoursesTable,
      eq(coursesTable.id, studentsCoursesTable.courseId)
    )
    .leftJoin(monitorsTable, eq(coursesTable.monitorId, monitorsTable.id))
    .leftJoin(monitorUser, eq(monitorsTable.userId, monitorUser.id))
    .leftJoin(coMonitorsTable, eq(coursesTable.coMonitorId, coMonitorsTable.id))
    .leftJoin(coMonitorUser, eq(coMonitorsTable.userId, coMonitorUser.id))
    .groupBy(coursesTable.id, monitorUser.firstName, coMonitorUser.firstName)
    .limit(pageSize)
    .offset(offset)
    .all();

  const totalCount = await db
    .select({
      id: coursesTable.id,
      title: coursesTable.title,
      difficulty: coursesTable.difficulty,
      monitorId: monitorsTable.userId,
      monitorName: monitorUser.firstName,
      coMonitorId: coMonitorsTable.userId,
      coMonitorName: coMonitorUser.firstName,
      studentCount: sql<number>`COUNT(${studentsCoursesTable.studentId})`.as(
        "studentCount"
      ),
    })
    .from(coursesTable)
    .leftJoin(
      studentsCoursesTable,
      eq(coursesTable.id, studentsCoursesTable.courseId)
    )
    .leftJoin(monitorsTable, eq(coursesTable.id, monitorsTable.id))
    .leftJoin(monitorUser, eq(monitorsTable.userId, monitorUser.id))
    .leftJoin(coMonitorsTable, eq(coursesTable.id, coMonitorsTable.id))
    .leftJoin(coMonitorUser, eq(coMonitorsTable.userId, coMonitorUser.id))
    .groupBy(coursesTable.id, monitorUser.firstName, coMonitorUser.firstName)
    .all();

  return { courses: results, totalCount: totalCount.length };
}

export async function getMonitorTasksDeadlines(
  monitorId: number
): Promise<Date[]> {
  const results = await db
    .select({
      deadline: tasksTable.deadline,
    })
    .from(tasksTable)
    .innerJoin(monitorsTable, eq(monitorsTable.userId, tasksTable.creatorId))
    .where(eq(monitorsTable.userId, monitorId));

  const deadlines = results.map(
    (result: { deadline: string | number | Date }) => new Date(result.deadline)
  );
  return deadlines;
}

export async function getMonitorSubmissionsNotGradedCount(
  monitorId: number
): Promise<number> {
  const result = await db
    .select({ total: count() })
    .from(submissionsTable)
    .innerJoin(coursesTable, eq(submissionsTable.courseId, coursesTable.id))
    .where(
      and(eq(coursesTable.monitorId, monitorId), lte(submissionsTable.grade, 0))
    );
  return result[0]?.total || 0;
}

export async function getTasksByMonitor(
  monitorId: number,
  status: TaskStatus,
  page: number = 1,
  pageSize: number = 10
): Promise<MonitorTasksResponse> {
  const offset = (page - 1) * pageSize;
  const now = new Date().toISOString().replace("T", " ").slice(0, 19);
  const whereCondition = and(
    eq(monitorsTable.userId, monitorId),
    status === TaskStatus.IN_PROGRESS
      ? and(
          lte(tasksTable.startedAt, now),
          gte(tasksTable.deadline, new Date())
        )
      : status === TaskStatus.COMPLETED
      ? or(gt(tasksTable.startedAt, now), lt(tasksTable.deadline, new Date()))
      : undefined
  );

  const countQuery = await db
    .select({
      total: sql<number>`count(distinct ${tasksTable.id})`.as("total"),
    })
    .from(tasksTable)
    .innerJoin(monitorsTable, eq(monitorsTable.userId, tasksTable.creatorId))
    .where(whereCondition);

  const total = countQuery[0]?.total || 0;

  const rawTasks = await db
    .select({
      id: tasksTable.id,
      title: tasksTable.title,
      description: tasksTable.description,
      courseId: tasksTable.courseId,
      startedAt: tasksTable.startedAt,
      deadline: tasksTable.deadline,
      points: tasksTable.points,
      createdAt: tasksTable.createdAt,
      updatedAt: tasksTable.updatedAt,
      courseTitle: coursesTable.title,
      submissionCount: sql<number>`count(distinct ${submissionsTable.id})`.as(
        "submission_count"
      ),
      studentCount:
        sql<number>`count(distinct ${studentsCoursesTable.studentId})`.as(
          "student_count"
        ),
    })
    .from(tasksTable)
    .innerJoin(monitorsTable, eq(monitorsTable.userId, tasksTable.creatorId))
    .leftJoin(coursesTable, eq(tasksTable.courseId, coursesTable.id))
    .leftJoin(submissionsTable, eq(tasksTable.id, submissionsTable.taskId))
    .leftJoin(
      studentsCoursesTable,
      eq(tasksTable.courseId, studentsCoursesTable.courseId)
    )
    .where(whereCondition)
    .groupBy(
      tasksTable.id,
      tasksTable.title,
      tasksTable.description,
      tasksTable.courseId,
      tasksTable.startedAt,
      tasksTable.deadline,
      tasksTable.points,
      tasksTable.createdAt,
      tasksTable.updatedAt,
      coursesTable.title
    )
    .limit(pageSize)
    .offset(offset);

  const tasks: MonitorsTasks[] = rawTasks.map((task) => ({
    ...task,
    startedAt: new Date(task.startedAt),
    deadline: task.deadline,
  }));

  return {
    tasks,
    total,
  };
}

export async function getStudentCountByCourse(courseId: number) {
  const result = await db
    .select({ count: count() })
    .from(studentsCoursesTable)
    .where(eq(studentsCoursesTable.courseId, courseId));
  return result[0]?.count || 0;
}

export async function getAllSubmissions(): Promise<Submission[]> {
  return await db.select().from(submissionsTable).all();
}

export async function getSubmissionsByCourse(
  courseId: number
): Promise<Submission[] | null> {
  const results = await db
    .select({
      id: submissionsTable.id,
      taskId: submissionsTable.taskId,
      studentId: submissionsTable.studentId,
      courseId: submissionsTable.courseId,
      grade: submissionsTable.grade,
      feedback: submissionsTable.feedback,
      gradedAt: submissionsTable.gradedAt,
      status: submissionsTable.status,
      createdAt: submissionsTable.createdAt,
      updatedAt: submissionsTable.updatedAt,
      deletedAt: submissionsTable.deletedAt,
    })
    .from(submissionsTable)
    .where(eq(submissionsTable.courseId, courseId));

  return results.length > 0 ? results : null;
}

export async function getAllAttachments(): Promise<Attachment[]> {
  return await db.select().from(attachmentsTable).all();
}

export async function getAllAttendances(): Promise<Attendance[]> {
  return await db.select().from(attendanceRecordsTable).all();
}

export async function getAllJoiningRequests(): Promise<JoiningRequest[]> {
  return await db.select().from(joiningRequestsTable).all();
}

export async function getAllJoiningRequestsWithDetails(
  monitorId: number,
  courseId: number | undefined,
  page: number = 1,
  pageSize: number = 10
): Promise<JoiningOrder[]> {
  const offset = (page - 1) * pageSize;
  const whereConditions = [eq(coursesTable.monitorId, monitorId)];
  if (courseId !== undefined) {
    whereConditions.push(eq(coursesTable.id, courseId));
  }
  const results = await db
    .select({
      id: joiningRequestsTable.id,
      courseName: coursesTable.title,
      courseId: coursesTable.id,
      studentId: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      image: usersTable.image,
      interviewStatus: joiningRequestsTable.interviewStatus,
      joiningStatus: joiningRequestsTable.joiningStatus,
    })
    .from(joiningRequestsTable)
    .leftJoin(coursesTable, eq(joiningRequestsTable.courseId, coursesTable.id))
    .leftJoin(
      studentsTable,
      eq(joiningRequestsTable.studentId, studentsTable.id)
    )
    .leftJoin(usersTable, eq(studentsTable.userId, usersTable.id))
    .where(and(...whereConditions))
    .limit(pageSize)
    .offset(offset)
    .all();
  return results.map(
    (result: {
      id: any;
      courseId: any;
      studentId: any;
      courseName: any;
      firstName: any;
      lastName: any;
      email: any;
      image: any;
      interviewStatus: any;
      joiningStatus: any;
    }) => ({
      id: result.id,
      courseId: result.courseId,
      studentId: result.studentId,
      courseName: result.courseName ?? "Unknown Course",
      firstName: result.firstName ?? "Unknown",
      lastName: result.lastName,
      email: result.email,
      image: result.image,
      interviewStatus: result.interviewStatus,
      joiningStatus: result.joiningStatus,
    })
  );
}

export async function updateJoiningRequest(
  id: number,
  updates: Partial<JoiningRequest>
): Promise<JoiningRequest[]> {
  return await db
    .update(joiningRequestsTable)
    .set(updates)
    .where(eq(joiningRequestsTable.id, id))
    .returning();
}

export async function getSubmissionsAndNonSubmissionsForTask(
  taskId: number,
  courseId: number,
  page: number = 1,
  pageSize: number = 10
): Promise<{ submissions: SubmissionsTask[]; totalCount: number }> {
  const offset = (page - 1) * pageSize;

  const taskAndCourse = await db
    .select({
      taskName: tasksTable.title,
      courseName: coursesTable.title,
    })
    .from(tasksTable)
    .innerJoin(coursesTable, eq(tasksTable.courseId, coursesTable.id))
    .where(and(eq(tasksTable.id, taskId), eq(coursesTable.id, courseId)))
    .all();

  const taskName = taskAndCourse[0]?.taskName || "Unknown Task";
  const courseName = taskAndCourse[0]?.courseName || "Unknown Course";

  const submissions = await db
    .select({
      submissionId: submissionsTable.id,
      studentId: studentsTable.id,
      studentName: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      email: usersTable.email,
      submissionDate: submissionsTable.createdAt,
      status: submissionsTable.status,
      grade: submissionsTable.grade,
      profilePicture: usersTable.image,
      taskName: tasksTable.title,
      courseName: coursesTable.title,
      taskId: submissionsTable.taskId,
    })
    .from(submissionsTable)
    .leftJoin(studentsTable, eq(submissionsTable.studentId, studentsTable.id))
    .leftJoin(usersTable, eq(studentsTable.userId, usersTable.id))
    .leftJoin(tasksTable, eq(submissionsTable.taskId, tasksTable.id))
    .leftJoin(coursesTable, eq(tasksTable.courseId, coursesTable.id))
    .where(eq(submissionsTable.taskId, taskId))
    .groupBy(
      submissionsTable.id,
      studentsTable.id,
      usersTable.id,
      tasksTable.id,
      coursesTable.id
    )
    .all();

  const allStudentsInCourse = await db
    .select({
      studentId: studentsTable.id,
      studentName: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      email: usersTable.email,
      profilePicture: usersTable.image,
    })
    .from(studentsCoursesTable)
    .innerJoin(
      studentsTable,
      eq(studentsCoursesTable.studentId, studentsTable.id)
    )
    .innerJoin(usersTable, eq(studentsTable.userId, usersTable.id))
    .where(eq(studentsCoursesTable.courseId, courseId))
    .all();

  const submittedStudentIds = submissions.map(
    (submission) => submission.studentId
  );
  const nonSubmissions = allStudentsInCourse
    .filter((student) => !submittedStudentIds.includes(student.studentId))
    .map((student) => ({
      submissionId: `non-${student.studentId}`,
      studentId: student.studentId,
      studentName: student.studentName,
      email: student.email ?? "",
      submissionDate: "__",
      status: "NOT SUBMITTED",
      grade: 0,
      profilePicture: student.profilePicture ?? "",
      taskName: taskName,
      courseName: courseName,
      taskId: taskId,
    }));

  const combinedResults = [...submissions, ...nonSubmissions];

  const paginatedResults = combinedResults.slice(offset, offset + pageSize);

  return {
    submissions: paginatedResults as SubmissionsTask[], // Ensure type compatibility
    totalCount: combinedResults.length,
  };
}

export async function getLateSubmissionsCountByMonitor(monitorId: number) {
  const result = await db
    .select({ count: count() })
    .from(submissionsTable)
    .innerJoin(tasksTable, eq(submissionsTable.taskId, tasksTable.id))
    .innerJoin(coursesTable, eq(submissionsTable.courseId, coursesTable.id))
    .where(
      and(
        eq(coursesTable.monitorId, monitorId),
        gt(submissionsTable.createdAt, tasksTable.deadline)
      )
    );

  return result[0]?.count ?? 0;
}

export async function getTaskById(taskId: number): Promise<Task> {
  const task = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.id, taskId))
    .limit(1);

  return task[0] || null;
}

export async function getLimitCoursesByStudent(
  studentId: number,
  limit?: number
): Promise<StudentCourseSmallCard[] | null> {
  const results = await db
    .selectDistinct({
      id: coursesTable.id,
      title: coursesTable.title,
      monitorName: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      duration: coursesTable.duration,
      startDate: coursesTable.courseStartDate,
      endDate: coursesTable.courseEndDate,
    })
    .from(studentsCoursesTable)
    .innerJoin(coursesTable, eq(coursesTable.id, studentsCoursesTable.courseId))
    .innerJoin(monitorsTable, eq(coursesTable.monitorId, monitorsTable.id))
    .innerJoin(usersTable, eq(monitorsTable.userId, usersTable.id))
    .where(eq(studentsCoursesTable.studentId, studentId))
    .groupBy(
      coursesTable.id,
      coursesTable.title,
      usersTable.firstName,
      usersTable.lastName,
      coursesTable.duration
    )
    .limit(limit);

  return results.length > 0 ? results : null;
}

export async function getCoursesDataByStudent(
  studentId: number
): Promise<StudentCourseBigCard[] | null> {
  const results = await db
    .selectDistinct({
      id: coursesTable.id,
      title: coursesTable.title,
      monitorName: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      startDate: coursesTable.courseStartDate,
      endDate: coursesTable.courseEndDate,
      duration: coursesTable.duration,
      status: sql<CourseStatus>`CASE
      WHEN ${coursesTable.courseStartDate} > CAST(strftime('%s','now') AS INTEGER) THEN 'Not Started'
      WHEN ${coursesTable.courseEndDate} < CAST(strftime('%s','now') AS INTEGER) THEN 'Finished'
      ELSE 'In Progress'
      END`,
      totalTasks: sql<number>`(SELECT COUNT(*) FROM ${tasksTable} WHERE course_id = ${coursesTable.id})`,
      completedTasks: sql<number>`(SELECT COUNT(*) FROM ${submissionsTable} WHERE course_id = ${coursesTable.id} AND status = 'SUBMITTED' AND student_id = ${studentId})`,
    })
    .from(studentsCoursesTable)
    .innerJoin(coursesTable, eq(coursesTable.id, studentsCoursesTable.courseId))
    .innerJoin(monitorsTable, eq(coursesTable.monitorId, monitorsTable.id))
    .innerJoin(usersTable, eq(monitorsTable.userId, usersTable.id))
    .where(eq(studentsCoursesTable.studentId, studentId))
    .groupBy(
      coursesTable.id,
      coursesTable.title,
      usersTable.firstName,
      usersTable.lastName
    );

  return results.length > 0 ? results : null;
}

const monitorUsers = alias(usersTable, "monitor_users");
const coMonitorsUsers = alias(usersTable, "co_monitor_users");
export async function getCoursesById(
  courseId: number
): Promise<StudentCourseDetails[] | null> {
  const results = await db
    .selectDistinct({
      id: coursesTable.id,
      title: coursesTable.title,
      monitor: sql<string>`${monitorUsers.firstName} || ' ' || ${monitorUsers.lastName}`,
      description: coursesTable.description,
      // attendance: attendanceRecordsTable.status,
      coMonitors: sql<string>`${coMonitorsUsers.firstName} || ' ' || ${coMonitorsUsers.lastName}`,
      startDate: coursesTable.courseStartDate,
      endDate: coursesTable.courseEndDate,
    })
    .from(studentsCoursesTable)
    .innerJoin(coursesTable, eq(coursesTable.id, studentsCoursesTable.courseId))
    .innerJoin(monitorsTable, eq(coursesTable.monitorId, monitorsTable.id))
    .innerJoin(monitorUsers, eq(monitorsTable.userId, monitorUsers.id))
    .innerJoin(
      coMonitorsTable,
      eq(coursesTable.coMonitorId, coMonitorsTable.id)
    )
    .innerJoin(coMonitorsUsers, eq(coMonitorsTable.userId, coMonitorsUsers.id))
    // .innerJoin(
    //   attendanceRecordsTable,
    //   eq(coursesTable.id, attendanceRecordsTable.courseId)
    // )
    .where(eq(coursesTable.id, courseId));

  return results.length > 0 ? results : null;
}

export async function getStudentAppointments(
  studentId: number
): Promise<StudentAppointments[] | null> {
  const results = await db
    .selectDistinct({
      id: coMonitorAvailabilityTable.id,
      coMonitor: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      date: coMonitorAvailabilityTable.date,
      startTime: coMonitorAvailabilityTable.startTime,
      courseTitle: coursesTable.title,
    })
    .from(coMonitorAvailabilityTable)
    .innerJoin(
      studentsTable,
      eq(studentsTable.id, coMonitorAvailabilityTable.bookedByStudentId)
    )
    .innerJoin(
      coMonitorsTable,
      eq(coMonitorsTable.id, coMonitorAvailabilityTable.coMonitorId)
    )
    .innerJoin(usersTable, eq(coMonitorsTable.userId, usersTable.id))
    .innerJoin(
      coursesTable,
      eq(coursesTable.id, coMonitorAvailabilityTable.courseId)
    )
    .where(eq(studentsTable.id, studentId));

  return results.length > 0 ? results : null;
}

export async function getMonitorAnnouncements(
  courseId: number | undefined,
  courseIds?: number[],
  page: number = 1,
  pageSize: number = 10
): Promise<{ announcements: Announcement[] | null; total: number }> {
  let allResults: Announcement[];

  if (courseId !== undefined) {
    allResults = await db
      .select()
      .from(announcementsTable)
      .where(eq(announcementsTable.courseId, courseId))
      .all();
  } else if (courseIds && courseIds.length > 0) {
    allResults = await db
      .select()
      .from(announcementsTable)
      .where(inArray(announcementsTable.courseId, courseIds))
      .all();
  } else {
    return { announcements: null, total: 0 };
  }

  const total = allResults.length;

  const offset = (page - 1) * pageSize;
  const paginatedResults = allResults.slice(offset, offset + pageSize);

  return {
    announcements: paginatedResults.length > 0 ? paginatedResults : null,
    total,
  };
}
export async function getTasksByCourseId(
  courseId: number
): Promise<StudentCourseTasks[] | null> {
  const results = await db
    .selectDistinct({
      taskId: tasksTable.id,
      taskTitle: tasksTable.title,
      deadline: tasksTable.deadline,
      status: submissionsTable.status,
      grade: submissionsTable.grade,
      gradedAt: submissionsTable.gradedAt,
      maxGrade: tasksTable.points,
    })
    .from(tasksTable)
    .innerJoin(coursesTable, eq(coursesTable.id, tasksTable.courseId))
    .innerJoin(submissionsTable, eq(tasksTable.id, submissionsTable.taskId))
    .innerJoin(studentsTable, eq(studentsTable.id, submissionsTable.studentId))
    .where(eq(coursesTable.id, courseId));

  return results.length > 0 ? results : null;
}

export async function getUserById(
  id: number
): Promise<Omit<User, "password"> | null> {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, Number(id)))
    .get();
  return result || null;
}

export async function getTaskByTaskId(
  taskId: number
): Promise<StudentCourseTask[] | null> {
  const results = await db
    .selectDistinct({
      courseTitle: coursesTable.title,
      taskTitle: tasksTable.title,
      creator: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      createdAt: tasksTable.createdAt,
      updatedAt: tasksTable.updatedAt,
      description: tasksTable.description,
      deadline: tasksTable.deadline,
    })
    .from(tasksTable)
    .innerJoin(coursesTable, eq(coursesTable.id, tasksTable.courseId))
    .innerJoin(usersTable, eq(usersTable.id, tasksTable.creatorId))
    .where(eq(tasksTable.id, taskId));

  return results.length > 0 ? results : null;
}

export async function getCoMonitorByCourseId(
  courseId: number
): Promise<coMonitorName[] | null> {
  const results = await db
    .selectDistinct({
      coMonitorId: coMonitorsTable.id,
      coMonitorName: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
    })
    .from(coursesTable)
    .innerJoin(
      coMonitorsTable,
      eq(coMonitorsTable.id, coursesTable.coMonitorId)
    )
    .innerJoin(usersTable, eq(usersTable.id, coMonitorsTable.userId))
    .where(eq(coursesTable.id, courseId));

  return results.length > 0 ? results : null;
}
export async function getStudentsByCourseId(
  courseId: number
): Promise<CourseStudentsList[]> {
  const students = await db
    .select({
      id: studentsTable.id,
      userId: studentsTable.userId,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      image: usersTable.image,
    })
    .from(studentsCoursesTable)
    .innerJoin(
      studentsTable,
      eq(studentsCoursesTable.studentId, studentsTable.id)
    )
    .innerJoin(usersTable, eq(studentsTable.userId, usersTable.id))
    .where(eq(studentsCoursesTable.courseId, courseId))
    .all();

  return students;
}

export async function insertAttendanceRecord({
  sessionId,
  courseId,
  studentId,
  status,
  recordedById,
}: {
  sessionId: number;
  courseId: number;
  studentId: number;
  status: AttendanceRecordStatus;
  recordedById: number;
}) {
  console.log(sessionId, courseId, studentId, status, recordedById);
  const existing = await db
    .select()
    .from(attendanceRecordsTable)
    .where(
      and(
        eq(attendanceRecordsTable.sessionId, sessionId),
        eq(attendanceRecordsTable.studentId, studentId)
      )
    )
    .get();

  if (existing) {
    return await db
      .update(attendanceRecordsTable)
      .set({
        status,
        recordedById,
        updatedAt: sql`(current_timestamp)`, // Use SQL function for timestamp
      })
      .where(
        and(
          eq(attendanceRecordsTable.sessionId, sessionId),
          eq(attendanceRecordsTable.studentId, studentId)
        )
      )
      .returning()
      .get();
  }

  return await db
    .insert(attendanceRecordsTable)
    .values({
      sessionId,
      courseId,
      studentId,
      status,
      recordedById,
      createdAt: sql`(current_timestamp)`,
      updatedAt: sql`(current_timestamp)`,
      deletedAt: sql`(current_timestamp)`,
    })
    .returning()
    .get();
}

export async function getAllCoMonitorAppointments(
  coMonitorId: number
): Promise<CoMonitorAppointment[]> {
  return await db
    .select({
      id: coMonitorAvailabilityTable.id,
      date: coMonitorAvailabilityTable.date,
      startTime: coMonitorAvailabilityTable.startTime,
      endTime: coMonitorAvailabilityTable.endTime,
      isBooked: coMonitorAvailabilityTable.isBooked,
      course: {
        id: coursesTable.id,
        title: coursesTable.title,
      },
      student: {
        id: studentsTable.id,
        userId: studentsTable.userId,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
      },
    })
    .from(coMonitorAvailabilityTable)
    .leftJoin(
      coursesTable,
      eq(coMonitorAvailabilityTable.courseId, coursesTable.id)
    )
    .leftJoin(
      studentsTable,
      eq(coMonitorAvailabilityTable.bookedByStudentId, studentsTable.id)
    )
    .leftJoin(
      usersTable,
      eq(studentsTable.userId, usersTable.id) // Join users table
    )
    .where(eq(coMonitorAvailabilityTable.coMonitorId, coMonitorId))
    .all();
}

export async function getSubmissionById(submissionId: number): Promise<{
  submission: SubmissionView | null;
  attachments: SubmissionAttachment;
}> {
  const result = await db
    .select({
      id: submissionsTable.id,
      taskId: submissionsTable.taskId,
      studentId: submissionsTable.studentId,
      courseId: submissionsTable.courseId,
      grade: submissionsTable.grade,
      feedback: submissionsTable.feedback,
      gradedAt: submissionsTable.gradedAt,
      status: submissionsTable.status,
      createdAt: submissionsTable.createdAt,
      updatedAt: submissionsTable.updatedAt,
      deletedAt: submissionsTable.deletedAt,
      StudentName: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      StudentEmail: usersTable.email,
      StudentImage: usersTable.image,
      TaskTitle: tasksTable.title,
    })
    .from(submissionsTable)
    .leftJoin(usersTable, eq(submissionsTable.studentId, usersTable.id))
    .leftJoin(tasksTable, eq(submissionsTable.taskId, tasksTable.id))
    .where(eq(submissionsTable.id, submissionId))
    .get();

  if (!result) {
    return {
      submission: null,
      attachments: {
        attachmentId: 0,
        attachmentPath: "",
        attachmentType: undefined,
      },
    };
  }

  const submission: SubmissionView = {
    ...result,
    createdAt: new Date(result.createdAt),
    updatedAt: new Date(result.updatedAt),
    deletedAt: result.deletedAt ? new Date(result.deletedAt) : null,
    gradedAt: result.gradedAt ? new Date(result.gradedAt) : null,
  };

  const attachmentsResult = await db
    .select({
      attachmentId: attachmentsTable.id,
      attachmentPath: attachmentsTable.path,
      attachmentType: attachmentsTable.type,
    })
    .from(attachmentsTable)
    .innerJoin(
      submissionsTable,
      eq(attachmentsTable.id, submissionsTable.attachmentId)
    )
    .where(eq(submissionsTable.id, submissionId))
    .all();

  return {
    submission,
    attachments: attachmentsResult[0] || {
      attachmentId: 0,
      attachmentPath: "",
      attachmentType: undefined,
    },
  };
}
export async function getPrivateCommentsBySubmission(
  submissionId: number
): Promise<PrivateComment[]> {
  const submission = await db
    .select({
      studentId: submissionsTable.studentId,
    })
    .from(submissionsTable)
    .where(eq(submissionsTable.id, submissionId))
    .get();

  if (!submission) {
    throw new Error("Submission not found.");
  }

  const comments = await db
    .select({
      commentId: commentsTable.id,
      commentText: commentsTable.content,
      createdAt: commentsTable.createdAt,
      createdBy: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      image: usersTable.image,
    })
    .from(commentsTable)
    .innerJoin(usersTable, eq(commentsTable.studentId, usersTable.id))
    .where(
      and(
        eq(commentsTable.submissionId, submissionId),
        eq(commentsTable.studentId, submission.studentId),
        eq(commentsTable.isPublic, false)
      )
    )
    .orderBy(commentsTable.createdAt);

  console.log("Comments: ", comments);
  return comments.map((comment) => ({
    ...comment,
    createdAt: new Date(comment.createdAt),
  }));
}
export async function getPrivateCommentsReplyBySubmission(
  submissionId: number,
  ComentorId: number
): Promise<PrivateComment[]> {
  const comments = await db
    .select({
      commentId: commentsTable.id,
      commentText: commentsTable.content,
      createdAt: commentsTable.createdAt,
      createdBy: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      image: usersTable.image,
    })
    .from(commentsTable)
    .innerJoin(usersTable, eq(commentsTable.coMonitorId, usersTable.id))
    .where(
      and(
        eq(commentsTable.submissionId, submissionId),
        eq(commentsTable.coMonitorId, ComentorId),
        eq(commentsTable.isPublic, false)
      )
    )
    .orderBy(commentsTable.createdAt);

  return comments.map((comment) => ({
    ...comment,
    createdAt: new Date(comment.createdAt),
  }));
}

export async function getAllCoursesWithMonitors(): Promise<Course[]> {
  const results = await db
    .select({
      id: coursesTable.id,
      title: coursesTable.title,
      description: coursesTable.description,
      image: coursesTable.image,
      difficulty: coursesTable.difficulty,
      duration: coursesTable.duration,
      applyStartDate: coursesTable.applyStartDate,
      applyEndDate: coursesTable.applyEndDate,
      courseStartDate: coursesTable.courseStartDate,
      courseEndDate: coursesTable.courseEndDate,
      monitorId: coursesTable.monitorId,
      coMonitorId: coursesTable.coMonitorId,
      adminId: coursesTable.adminId,
      details: coursesTable.details,
      entryRequirements: coursesTable.entryRequirements,
      createdAt: coursesTable.createdAt,
      updatedAt: coursesTable.updatedAt,
      deletedAt: coursesTable.deletedAt,

      monitorUserId: monitorsTable.userId,
      monitorFirstName: usersTable.firstName,
      monitorLastName: usersTable.lastName,
      monitorImage: usersTable.image,
    })
    .from(coursesTable)
    .leftJoin(monitorsTable, eq(coursesTable.monitorId, monitorsTable.id))
    .leftJoin(usersTable, eq(monitorsTable.userId, usersTable.id));

  return results.map((course) => ({
    ...course,
    presenterName: course.monitorFirstName
      ? `${course.monitorFirstName} ${course.monitorLastName}`
      : "Unknown",
    presenterImage: course.monitorImage || null,
  }));
}

export async function getCourseWithMonitor(
  id: number
): Promise<CourseWithPresenter> {
  const results = await db
    .select({
      id: coursesTable.id,
      title: coursesTable.title,
      description: coursesTable.description,
      image: coursesTable.image,
      difficulty: coursesTable.difficulty,
      duration: coursesTable.duration,
      applyStartDate: coursesTable.applyStartDate,
      applyEndDate: coursesTable.applyEndDate,
      courseStartDate: coursesTable.courseStartDate,
      courseEndDate: coursesTable.courseEndDate,
      monitorId: coursesTable.monitorId,
      coMonitorId: coursesTable.coMonitorId,
      adminId: coursesTable.adminId,
      details: coursesTable.details,
      entryRequirements: coursesTable.entryRequirements,
      createdAt: coursesTable.createdAt,
      updatedAt: coursesTable.updatedAt,
      deletedAt: coursesTable.deletedAt,

      monitorUserId: monitorsTable.userId,
      monitorFirstName: usersTable.firstName,
      monitorLastName: usersTable.lastName,
      monitorImage: usersTable.image,
    })
    .from(coursesTable)
    .leftJoin(monitorsTable, eq(coursesTable.monitorId, monitorsTable.id))
    .leftJoin(usersTable, eq(monitorsTable.userId, usersTable.id))
    .where(eq(coursesTable.id, id))
    .get();

  return {
    ...results,
    presenterName: results.monitorFirstName
      ? `${results.monitorFirstName} ${results.monitorLastName}`
      : "Unknown",
    presenterImage: results.monitorImage || null,
  };
}

export async function getStudentAttendanceById(
  studentId: number,
  courseId: number
): Promise<number | null> {
  const results: AttendanceRecordOne[] = await db
    .select({
      attendanceStatus: attendanceRecordsTable.status,
    })
    .from(attendanceRecordsTable)
    .innerJoin(
      courseSchedulesTable,
      eq(courseSchedulesTable.id, attendanceRecordsTable.sessionId)
    )
    .innerJoin(
      coursesTable,
      eq(coursesTable.id, attendanceRecordsTable.courseId)
    )
    .innerJoin(
      studentsTable,
      eq(studentsTable.id, attendanceRecordsTable.studentId)
    )
    .where(and(eq(studentsTable.id, studentId), eq(coursesTable.id, courseId)));

  if (results.length === 0) return null;

  const presentCount = results.filter(
    (item: AttendanceRecordOne) => item.attendanceStatus !== "ABSENT"
  ).length;

  return presentCount;
}

export async function getCommentsByTaskId(
  courseId: number,
  TaskId: number
): Promise<Comments[]> {
  const students = await db
    .select({
      id: commentsTable.id,
      content: commentsTable.content,
      userName: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      isPublic: commentsTable.isPublic,
      createdAt: commentsTable.createdAt,
    })
    .from(commentsTable)
    .innerJoin(usersTable, eq(usersTable.id, commentsTable.privateRecipientId))
    .innerJoin(coursesTable, eq(coursesTable.id, commentsTable.courseId))
    .innerJoin(tasksTable, eq(tasksTable.id, commentsTable.taskId))
    .where(and(eq(coursesTable.id, courseId), eq(tasksTable.id, TaskId)))
    .all();

  return students;
}

export async function getSubmissionIdByTaskId(
  courseId: number,
  TaskId: number
): Promise<{ submissionId: number }[]> {
  const SubmissionId = await db
    .select({
      submissionId: submissionsTable.id,
    })
    .from(submissionsTable)
    .innerJoin(tasksTable, eq(tasksTable.id, submissionsTable.taskId))
    .innerJoin(coursesTable, eq(coursesTable.id, tasksTable.courseId))
    .where(and(eq(coursesTable.id, courseId), eq(tasksTable.id, TaskId)));

  return SubmissionId;
}

export async function getStudentAnnouncementsById(
  studentId: number
): Promise<newAnnouncements[] | null> {
  const results = await db
    .select({
      id: announcementsTable.id,
      postedBy: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      courseId: coursesTable.id,
      title: announcementsTable.title,
      description: announcementsTable.description,
      createdAt: announcementsTable.createdAt,
      courseTitle: coursesTable.title,
    })
    .from(announcementsTable)
    .innerJoin(usersTable, eq(usersTable.id, announcementsTable.postedBy))
    .innerJoin(coursesTable, eq(coursesTable.id, announcementsTable.courseId))
    .innerJoin(
      studentsCoursesTable,
      eq(coursesTable.id, studentsCoursesTable.courseId)
    )
    .where(eq(studentsCoursesTable.studentId, studentId));

  return results.length > 0 ? results : null;
}

export async function getPublicCommentsByTaskId(
  taskId: number
): Promise<PublicComment[]> {
  const publicComments = await db
    .select({
      commentId: commentsTable.id,
      commentText: commentsTable.content,
      createdAt: commentsTable.createdAt,
      isPublic: commentsTable.isPublic,
      userName: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      userEmail: usersTable.email,
      userImage: usersTable.image,
      userType: sql<string>`CASE
        WHEN ${commentsTable.studentId} IS NOT NULL THEN 'Student'
        WHEN ${commentsTable.coMonitorId} IS NOT NULL THEN 'Co-Mentor'
        WHEN ${commentsTable.monitorId} IS NOT NULL THEN 'Mentor'
        ELSE 'Unknown'
      END`,
      userId: sql<number>`CASE
        WHEN ${commentsTable.studentId} IS NOT NULL THEN ${studentsTable.userId}
        WHEN ${commentsTable.coMonitorId} IS NOT NULL THEN ${coMonitorsTable.userId}
        WHEN ${commentsTable.monitorId} IS NOT NULL THEN ${monitorsTable.userId}
        ELSE NULL
      END`,
    })
    .from(commentsTable)
    .leftJoin(studentsTable, eq(commentsTable.studentId, studentsTable.id))
    .leftJoin(
      coMonitorsTable,
      eq(commentsTable.coMonitorId, coMonitorsTable.id)
    )
    .leftJoin(monitorsTable, eq(commentsTable.monitorId, monitorsTable.id))
    .innerJoin(
      usersTable,
      sql`
      ${usersTable.id} = COALESCE(
        ${studentsTable.userId},
        ${coMonitorsTable.userId},
        ${monitorsTable.userId}
      )
    `
    )
    .where(
      and(eq(commentsTable.taskId, taskId), eq(commentsTable.isPublic, true))
    )
    .orderBy(asc(commentsTable.createdAt));

  return publicComments;
}

export async function getAttachmentPathsByTaskId(
  taskId: number
): Promise<string[]> {
  const attachments = await db
    .select({ path: attachmentsTable.path })
    .from(attachmentsTable)
    .where(eq(attachmentsTable.taskId, taskId))
    .execute();

  return attachments.map((attachment: Attachment) => attachment.path);
}
