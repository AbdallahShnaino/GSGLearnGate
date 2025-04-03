"use server";

import { db } from "./../index";
import { eq, sql, and, count, lte, gt, or, gte, lt } from "drizzle-orm";

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
  joiningRequestsTable,
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
  UsersNames,
  CourseWithNames,
  TaskStatus,
  UsersNames,
  StudentCourseBigCard,
  CourseStatus,
  StudentCourseDetails,
  StudentAppointments,
} from "@/types/index";
import { alias } from "drizzle-orm/sqlite-core";
import { MonitorsTasks } from "@/types/tasksOperations";
import { MonitorTasksResponse } from "@/types/tasks";
//   UsersNames,
//   StudentCourseBigCard,
//   CourseStatus,
// } from "@/types/index";
import { StudentCourseSmallCard } from "../../../types";

export async function getAllUsers(): Promise<User[]> {
  return await db.select().from(usersTable).all();
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


export async function getCourseById(id: number): Promise<CourseWithNames | null> {
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
  coMonitorId: number;
  appointments: AppointmentWithStudent[];
  totalCount: number;
}> {
  const offset = (page - 1) * pageSize;

  const whereConditions = [eq(appointmentsTable.coMonitorId, coMonitorId)];

  if (courseId !== undefined) {
    whereConditions.push(eq(coursesTable.id, courseId));
  }

  const results = await db
    .select({
      id: appointmentsTable.id,
      studentId: appointmentsTable.studentId,
      date: appointmentsTable.date,
      caption: appointmentsTable.caption,
      coMonitorId: appointmentsTable.coMonitorId,
      status: appointmentsTable.status,
      createdAt: appointmentsTable.createdAt,
      profileImage: usersTable.image,
      studentName: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
      studentEmail: usersTable.email,
      courseName: coursesTable.title,
      courseId: coursesTable.id,
    })
    .from(appointmentsTable)
    .innerJoin(studentsTable, eq(appointmentsTable.studentId, studentsTable.id))
    .innerJoin(usersTable, eq(studentsTable.userId, usersTable.id))
    .innerJoin(
      coursesTable,
      eq(coursesTable.coMonitorId, appointmentsTable.coMonitorId)
    )
    .where(and(...whereConditions))
    .limit(pageSize)
    .offset(offset);

  const uniqueResults = Array.from(
    new Map(results.map((item) => [item.studentId, item])).values()
  );

  const countResults = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(appointmentsTable)
    .innerJoin(studentsTable, eq(appointmentsTable.studentId, studentsTable.id))
    .innerJoin(usersTable, eq(studentsTable.userId, usersTable.id))
    .innerJoin(
      coursesTable,
      eq(coursesTable.coMonitorId, appointmentsTable.coMonitorId)
    )
    .where(and(...whereConditions));

  return {
    coMonitorId,
    appointments: uniqueResults.length > 0 ? uniqueResults : [],
    totalCount: countResults[0]?.count || 0,
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

  const whereCondition = and(
    eq(monitorsTable.userId, monitorId),
    status === TaskStatus.IN_PROGRESS
      ? and(
          lte(tasksTable.startedAt, new Date()),
          gte(tasksTable.deadline, new Date())
        )
      : status === TaskStatus.COMPLETED
      ? or(
          gt(tasksTable.startedAt, new Date()),
          lt(tasksTable.deadline, new Date())
        )
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

  const tasks = await db
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
      submissionCount: sql<number>`
        count(distinct ${submissionsTable.id})
      `.as("submission_count"),
      studentCount: sql<number>`
        count(distinct ${studentsCoursesTable.studentId})
      `.as("student_count"),
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
  return await db.select().from(attendancesTable).all();
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
export async function getTaskById(taskId: number) {
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
      absence: attendancesTable.absence,
    })
    .from(studentsCoursesTable)
    .innerJoin(coursesTable, eq(coursesTable.id, studentsCoursesTable.courseId))
    .innerJoin(monitorsTable, eq(coursesTable.monitorId, monitorsTable.id))
    .innerJoin(usersTable, eq(monitorsTable.userId, usersTable.id))
    .innerJoin(attendancesTable, eq(coursesTable.id, attendancesTable.courseId))
    .where(eq(studentsCoursesTable.studentId, studentId))
    .groupBy(
      coursesTable.id,
      coursesTable.title,
      usersTable.firstName,
      usersTable.lastName
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
      absence: attendancesTable.absence,
      startDate: coursesTable.courseStartDate,
      endDate: coursesTable.courseEndDate,
      status: sql<CourseStatus>`CASE 
      WHEN ${coursesTable.courseStartDate} > CURRENT_DATE THEN 'Not Started'
      WHEN ${coursesTable.courseEndDate} < CURRENT_DATE THEN 'Finished'
      ELSE 'In Progress'
      END`,
      totalTasks: sql<number>`(SELECT COUNT(*) FROM tasks WHERE course_id = ${coursesTable.id})`,
      completedTasks: sql<number>`(SELECT COUNT(*) FROM submissions WHERE course_id = ${coursesTable.id} AND status = "submitted" AND student_id = ${studentId})`,
    })
    .from(studentsCoursesTable)
    .innerJoin(coursesTable, eq(coursesTable.id, studentsCoursesTable.courseId))
    .innerJoin(monitorsTable, eq(coursesTable.monitorId, monitorsTable.id))
    .innerJoin(usersTable, eq(monitorsTable.userId, usersTable.id))
    .innerJoin(attendancesTable, eq(coursesTable.id, attendancesTable.courseId))
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
      absence: attendancesTable.absence,
      coMonitors: sql<string>`${coMonitorsUsers.firstName} || ' ' || ${coMonitorsUsers.lastName}`,

      // tasks: sql<string[]>`
      //   (
      //     SELECT JSON_GROUP_ARRAY(
      //       JSON_OBJECT(
      //         'title', ${tasksTable.title},
      //         'submissionStatus', ${submissionsTable.status},
      //         'deadline', ${tasksTable.deadline}
      //       )
      //     )
      //     FROM ${tasksTable}
      //       JOIN ${submissionsTable} ON ${tasksTable.id} = ${submissionsTable.taskId}
      //       )
      //       // WHERE ${tasksTable.} = ${coursesTable.id}
      //       `,

      // coMonitors: sql<
      //   string[]
      // >`ARRAY_AGG(${usersTable.firstName} || ' ' || ${usersTable.lastName})`,
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
    .innerJoin(attendancesTable, eq(coursesTable.id, attendancesTable.courseId))
    .where(eq(coursesTable.id, courseId));

  return results.length > 0 ? results : null;
}

export async function getStudentAppointments(
  studentId: number
): Promise<StudentAppointments[] | null> {
  const results = await db
    .selectDistinct({
      id: appointmentsTable.id,
      // courseTitle: coursesTable.title,
      // monitor: sql<string>`${monitorUsers.firstName} || ' ' || ${monitorUsers.lastName}`,
      // coMonitor: sql<string>`${coMonitorsUsers.firstName} || ' ' || ${coMonitorsUsers.lastName}`,
      // date: appointmentsTable.date,
      // time: appointmentsTable.caption,
      // status: appointmentsTable.status,
    })
    .from(appointmentsTable)
    // .innerJoin(coursesTable, eq(coursesTable.id, appointmentsTable.))
    .innerJoin(studentsTable, eq(studentsTable.id, appointmentsTable.studentId))
    // .innerJoin(
    //   coMonitorsTable,
    //   eq(coMonitorsTable.id, appointmentsTable.coMonitorId)
    // )
    // .innerJoin(coMonitorsTable, eq(coMonitorsTable.userId, monitorUsers.id))
    // .innerJoin(
    //   coMonitorsTable,
    //   eq(coursesTable.coMonitorId, coMonitorsTable.id)
    // )
    // .innerJoin(coMonitorsUsers, eq(coMonitorsTable.userId, coMonitorsUsers.id))
    // .innerJoin(attendancesTable, eq(coursesTable.id, attendancesTable.courseId))
    .where(eq(studentsTable.id, studentId));

  return results.length > 0 ? results : null;
}
