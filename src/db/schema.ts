import {
  AnySQLiteColumn,
  int,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import {
  AssignmentStatus,
  Attachments,
  Difficulty,
  Role,
  Status,
} from "@/types/index";

const timestamps = {
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  deletedAt: text("deleted_at")
    .notNull()
    .default(sql`(current_timestamp)`),
};
export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  dateOfBirth: integer("date_of_birth", { mode: "timestamp" }).notNull(),
  image: text("image").notNull(),
  role: text("role", {
    enum: [Role.ADMIN, Role.STUDENT, Role.MONITOR, Role.CO_MONITOR],
  }).notNull(),
  city: text("city").notNull(),
  ...timestamps,
});

export const adminsTable = sqliteTable("admins", {
  id: int().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references((): AnySQLiteColumn => usersTable.id),
});

export const monitorsTable = sqliteTable("monitors", {
  id: int().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references((): AnySQLiteColumn => usersTable.id),
});

export const coMonitorsTable = sqliteTable("co_monitors", {
  id: int().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references((): AnySQLiteColumn => usersTable.id),
});
export const studentsTable = sqliteTable("students", {
  id: int().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references((): AnySQLiteColumn => usersTable.id),
});

export const coursesTable = sqliteTable("courses", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  difficulty: text("difficulty", {
    enum: [Difficulty.BEGINNER, Difficulty.INTERMEDIATE, Difficulty.ADVANCED],
  }).notNull(),
  duration: integer("duration").notNull(),
  applyStartDate: integer("apply_start_date", { mode: "timestamp" }).notNull(),
  applyEndDate: integer("apply_end_date", { mode: "timestamp" }).notNull(),
  courseStartDate: integer("course_start_date", {
    mode: "timestamp",
  }).notNull(),
  courseEndDate: integer("course_end_date", { mode: "timestamp" }).notNull(),
  monitorId: int("monitor_id").references(
    (): AnySQLiteColumn => monitorsTable.id
  ),
  coMonitorId: int("co_monitor_id").references(
    (): AnySQLiteColumn => coMonitorsTable.id
  ),
  adminId: int("admin_id").references((): AnySQLiteColumn => adminsTable.id),
  details: text("details").notNull(),

  entryRequirements: text("entry_requirements").notNull(),

  ...timestamps,
});
export const announcementsTable = sqliteTable("announcements", {
  id: int().primaryKey({ autoIncrement: true }),
  postedBy: int("posted_by")
    .notNull()
    .references((): AnySQLiteColumn => usersTable.id),
  courseId: int("course_id")
    .notNull()
    .references((): AnySQLiteColumn => coursesTable.id, {
      onDelete: "cascade",
    }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ...timestamps,
});

export const appointmentsTable = sqliteTable("appointments", {
  id: int().primaryKey({ autoIncrement: true }),
  coMonitorId: int("co_monitor_id")
    .notNull()
    .references((): AnySQLiteColumn => coMonitorsTable.id),
  studentId: int("student_id")
    .notNull()
    .references((): AnySQLiteColumn => studentsTable.id),
  caption: text("caption").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),

  status: text("status", {
    enum: [Status.ACCEPTED, Status.PENDING, Status.REJECTED],
  }).notNull(),
  ...timestamps,
});
export const studentsCoursesTable = sqliteTable("students_courses", {
  id: int().primaryKey({ autoIncrement: true }),
  courseId: int("course_id")
    .notNull()
    .references((): AnySQLiteColumn => coursesTable.id),
  studentId: int("student_id")
    .notNull()
    .references((): AnySQLiteColumn => studentsTable.id),
  ...timestamps,
});

export const submissionsTable = sqliteTable("submissions", {
  id: int().primaryKey({ autoIncrement: true }),
  taskId: int("task_id")
    .notNull()
    .references((): AnySQLiteColumn => tasksTable.id),
  studentId: int("student_id")
    .notNull()
    .references((): AnySQLiteColumn => studentsTable.id),
  courseId: int("course_id")
    .notNull()
    .references((): AnySQLiteColumn => coursesTable.id, {
      onDelete: "cascade",
    }),
  grade: int("grade"),
  feedback: text("feedback").notNull(),
  gradedAt: integer("graded_at", { mode: "timestamp" }).notNull(),

  status: text("status", {
    enum: [
      AssignmentStatus.PENDING,
      AssignmentStatus.SUBMITTED,
      AssignmentStatus.GRADED,
    ],
  }).notNull(),
  ...timestamps,
});

export const tasksTable = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  startedAt: text("started_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  creatorId: int("creator_id")
    .notNull()
    .references((): AnySQLiteColumn => usersTable.id, {
      onDelete: "cascade",
    }),
  courseId: int("course_id")
    .notNull()
    .references((): AnySQLiteColumn => coursesTable.id, {
      onDelete: "cascade",
    }),
  deadline: integer("deadline", { mode: "timestamp" }).notNull(),
  points: int("grade"),
  ...timestamps,
});

export const attachmentsTable = sqliteTable("attachments", {
  id: int().primaryKey({ autoIncrement: true }),
  taskId: int("task_id")
    .notNull()
    .references((): AnySQLiteColumn => tasksTable.id),
  creatorId: int("student_id")
    .notNull()
    .references((): AnySQLiteColumn => studentsTable.id),
  courseId: int("course_id")
    .notNull()
    .references((): AnySQLiteColumn => coursesTable.id, {
      onDelete: "cascade",
    }),
  type: text("status", {
    enum: [Attachments.FILE, Attachments.LINK],
  }).notNull(),
  path: text("path").notNull(),
  ...timestamps,
});

export const attendancesTable = sqliteTable("attendances", {
  id: int().primaryKey({ autoIncrement: true }),
  studentId: int("student_id")
    .notNull()
    .references((): AnySQLiteColumn => studentsTable.id),
  courseId: int("course_id")
    .notNull()
    .references((): AnySQLiteColumn => coursesTable.id, {
      onDelete: "cascade",
    }),
  absence: int("absence"),
  ...timestamps,
});
export const joiningRequestsTable = sqliteTable("joining_requests", {
  id: int().primaryKey({ autoIncrement: true }),
  studentId: int("student_id")
    .notNull()
    .references((): AnySQLiteColumn => studentsTable.id),
  courseId: int("course_id")
    .notNull()
    .references((): AnySQLiteColumn => coursesTable.id, {
      onDelete: "cascade",
    }),
  interviewStatus: text("interview_status", {
    enum: [Status.ACCEPTED, Status.PENDING, Status.REJECTED],
  }).notNull(),
  joiningStatus: text("joining_status", {
    enum: [Status.ACCEPTED, Status.PENDING, Status.REJECTED],
  }).notNull(),
  ...timestamps,
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUsers = typeof usersTable.$inferSelect;

export type InsertAdmin = typeof adminsTable.$inferInsert;
export type SelectAdmins = typeof adminsTable.$inferSelect;

export type InsertMonitor = typeof monitorsTable.$inferInsert;
export type SelectMonitors = typeof monitorsTable.$inferSelect;

export type InsertCoMonitor = typeof coMonitorsTable.$inferInsert;
export type SelectCoMonitors = typeof coMonitorsTable.$inferSelect;

export type InsertStudent = typeof studentsTable.$inferInsert;
export type SelectStudents = typeof studentsTable.$inferSelect;

export type InsertCourse = typeof coursesTable.$inferInsert;
export type SelectCourses = typeof coursesTable.$inferSelect;

export type InsertAnnouncement = typeof announcementsTable.$inferInsert;
export type SelectAnnouncements = typeof announcementsTable.$inferSelect;

export type InsertAppointment = typeof appointmentsTable.$inferInsert;
export type SelectAppointments = typeof appointmentsTable.$inferSelect;

export type InsertStudentCourse = typeof studentsCoursesTable.$inferInsert;
export type SelectStudentCourses = typeof studentsCoursesTable.$inferSelect;

export type InsertSubmission = typeof submissionsTable.$inferInsert;
export type SelectSubmissions = typeof submissionsTable.$inferSelect;

export type InsertTask = typeof tasksTable.$inferInsert;
export type SelectTasks = typeof tasksTable.$inferSelect;

export type InsertAttachment = typeof attachmentsTable.$inferInsert;
export type SelectAttachments = typeof attachmentsTable.$inferSelect;

export type InsertAttendance = typeof attendancesTable.$inferInsert;
export type SelectAttendances = typeof attendancesTable.$inferSelect;

export type InsertJoiningRequest = typeof joiningRequestsTable.$inferInsert;
export type SelectJoiningRequests = typeof joiningRequestsTable.$inferSelect;
